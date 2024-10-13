const fs = require('fs');
const { pipeline, Transform } = require('stream');
const path = require('path');
const { promisify } = require('util');
const masking = require('./anonymize'); 

const pipelineAsync = promisify(pipeline);

// simple file processing CLI tool
// Accepting a file via CLI: should this be done with readline? should the file be passed to the script as an argument? How else can the file be passed to the script?
// How do you process the file asynchronously? by breaking it into chunks? using a stream? is a stream synchronous or asynchronous?
// Read data within the file, transform data within the file: what transformation are we doing?
// diagnostics with flame and perf graph?
// In what areas can we incorporate Typescript tying
// - try readline, try inquirer
// - figure out if those tools allow you to take arguments
// - figure out the various ways to pass your file to a script as argument
// - what processing are we going to do on the file
// - how do you process a file asynchronously?
// - what tool are we to use to read the data in the file
// - carry out diagnostics by running script on ec2 instance
// - where does typescript come in
//
// considerations:
// -- progress.argv is a way to get the filename/path from the cli, but there are edge-ases that could also be explored, cases like special characters or spaces, but the responsibility of this can fall down to the uesr, by them deciding to use quotes or backspaces to ensure the correct filename or path is picked up as one argument. Nodejs handles quoted arguments, but ways to sanitize paths could be explored
// -- nodejs provides the path module for handling path related operations across operating systems, this can also ensure correct behavior across different filesystems
// -- for asynchronicity, the promise versions of the fs module can be imported and used with async/await
// -- Normalizing text and converting to lowercase are valid transformations, but there are others that are commonly used in file processing
// -- How to use typescript

// type for filenames, filepath, arguments
type FilePath = string;

const args: string[] = process.argv.slice(2);
const arg: string | undefined = args[0];

// verify argument was passed with the nodejs script
if (!arg) {
    console.log('no argument passed \nplease specify filename');
    process.exit(1);
} 

//const filename = path.basename(path.normalize(arg));
// const isItAbsolutePath = path.resolve(filename);

// normalize the path to resolve use of different separators and characters like {.., .}
const normalizedArg: FilePath = path.normalize(arg);
let filePath: FilePath = "";
const outputPath: FilePath = path.join(__dirname, 'cleanedFullCompanyLogs.log');

//console.log(isItAbsolutePath);

//const dir = __dirname
// const filePath = path.join(`${dir}`,`${arg}`);

//if (arg == isItAbsolutePath) {
//    filePath = isItAbsolutePath;
//} else {
//    filePath = path.join(`${dir},${arg}`);
//} 

//console.log(filename);
//console.log(typeof dir, dir);
//console.log(typeof basename, basename);

//if (!arg) {
//    console.log('no argument passed \nplease specify filename');
//}

// extend tranform pipe to anonymize data, our transformation function to be used for our custom class
class TransformFile extends Transform {
    private remainder: string = '';
    private maskingFunction: (data: string) => string;

    constructor(options?: typeof Transform) {
        super(options);
        this.maskingFunction = masking;
    }

    _transform(chunk: Buffer, encoding: BufferEncoding, callback: (error?: Error | null, data?: any) => void): void {
        const anonymizedData = this.maskingFunction(chunk.toString());
        this.push(anonymizedData);
        callback();
    }
}

if (!path.isAbsolute(normalizedArg)) {
    filePath = path.join(__dirname, normalizedArg); //Resolve relative to current directory
} else {
    filePath = normalizedArg; // normalized argument path
}

async function readTransformWrite(): Promise<void> {
    try {
        await fs.promises.access(filePath) // check if file exists

        // Stream created immediately after verifying it exists to prevent race condition
        const readStream = fs.createReadStream(filePath)
            .on('error', (error: NodeJS.ErrnoException) => {
                console.error('Error reading the file:', error.message);
            });
        
        // Write stream to write to our output file
        const writeStream = fs.createWriteStream(outputPath);
 
        // Call transformation function and pass data chunks to it
        //function transformFile(readStream, masking) {
        //    let data = null;

        //    readStream
        //    .on('data', (chunk) => {
        //        data = chunk.toString();
                //return data;
        //    })
        //    return(data);
        //    masking(data);
        //}
        
        // create new instance of custom stream for file transformation
        const transformFile = new TransformFile();
       
        // Async pipeline to join our read stream to our write stream with our transform stream inbetween
        await pipelineAsync(
            readStream,
            transformFile,
            writeStream 
        );
    } catch(error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            console.error('File does not exist');
        } else if ((error as NodeJS.ErrnoException).code === 'EACCES' || (error as NodeJS.ErrnoException).code === 'EPERM') {
            console.error('Permission denied');
        } else {
            console.error('Pipeline failed:', (error as Error).message);
        }
    }
}

readTransformWrite();
