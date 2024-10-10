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
//

const fs = require('fs');
const fspromises = require('fs').promises;
const { pipeline } = require('stream');
const path = require('path')
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);

const args = process.argv.slice(2);
const arg = args[0];

if (!arg) {
    console.log('no argument passed \nplease specify filename');
    process.exit(1);
} 

const filename = path.basename(arg);
// const isItAbsolutePath = path.resolve(filename);
let filePath = null;

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

if (!path.isAbsolute(arg)) {
    filePath = path.join(__dirname, arg); //Resolve relative to current directory
} else {
    filePath = arg
}

async function readTransformWrite() {
    try {
        await fspromises.access(filePath)

        const readStream = fs.createReadStream(filePath)
            .on('data', (chunk) => {
                console.log(chunk);
            })
            .on('error', (error) => {
            console.error('Error reading the file:', error.message);
        })

        await pipelineAsync(
            readStream,
            process.stdout
        );
    } catch(error) {
        if (error.code === 'ENOENT') {
            console.error('File does not exist');
        } else if (error.code === 'EACCES' || error.code === 'EPERM') {
            console.error('Permission denied');
        } else {
        console.error('Pipeline failed:', error.message);
        }
    }
}

readTransformWrite();
