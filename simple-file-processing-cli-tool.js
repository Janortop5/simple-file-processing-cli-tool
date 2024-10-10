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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var fs = require('fs');
var pipeline = require('stream').pipeline;
var path = require('path');
var promisify = require('util').promisify;
var pipelineAsync = promisify(pipeline);
var args = process.argv.slice(2);
var arg = args[0];
// verify argument was passed with the nodejs script
if (!arg) {
    console.log('no argument passed \nplease specify filename');
    process.exit(1);
}
//const filename = path.basename(path.normalize(arg));
// const isItAbsolutePath = path.resolve(filename);
// normalize the path to resolve use of different separators and characters like {.., .}
var normalizedArg = path.normalize(arg);
var filePath = "";
var outputPath = path.join(__dirname, 'transformedOutput.txt');
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
if (!path.isAbsolute(normalizedArg)) {
    filePath = path.join(__dirname, normalizedArg); //Resolve relative to current directory
}
else {
    filePath = normalizedArg; // normalized argument path
}
function readTransformWrite() {
    return __awaiter(this, void 0, void 0, function () {
        var readStream, writeStream, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fs.promises.access(filePath)
                        // file openeed immediately after verifying it exists to prevent race condition
                    ]; // check if file exists
                case 1:
                    _a.sent(); // check if file exists
                    readStream = fs.createReadStream(filePath)
                        .on('data', function (chunk) {
                        var data = chunk.toString();
                    })
                        .on('error', function (error) {
                        console.error('Error reading the file:', error.message);
                    });
                    writeStream = fs.createWriteStream(outputPath);
                    return [4 /*yield*/, pipelineAsync(readStream, writeStream)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    if (error_1.code === 'ENOENT') {
                        console.error('File does not exist');
                    }
                    else if (error_1.code === 'EACCES' || error_1.code === 'EPERM') {
                        console.error('Permission denied');
                    }
                    else {
                        console.error('Pipeline failed:', error_1.message);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
readTransformWrite();
