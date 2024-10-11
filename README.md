# Simple File Processing CLI Tool

This project implements a command-line interface (CLI) tool for processing and anonymizing large log files. It's designed to handle sensitive data by transforming it into a more secure format.

## Project Structure

- `anonymize.ts`: Contains the core anonymization logic.
- `generate-test-file.js`: Script to generate a large test file with mock sensitive data.
- `simple-file-processing-cli-tool.ts`: Main CLI tool for processing files (in progress).

## Features

- **File Generation**: Creates a large log file with simulated sensitive data.
- **Anonymization**: Transforms sensitive data to protect privacy.
- **Asynchronous Processing**: Utilizes Node.js streams for efficient file handling.

## Setup

1. Ensure you have Node.js installed.
2. Clone this repository.
3. Run `npm install` to install dependencies.

## Usage

### Generating Test Data

To create a test file with mock sensitive data:

```bash
node generate-test-file.js
```

This will generate a file named `fullCompanyLogs.log` with 1,000,000 log entries.

### Processing Files (In Development)

The main CLI tool for processing files is still under development. Once completed, it will allow users to anonymize sensitive data in log files.

## Development

This project uses TypeScript for type safety. The `tsconfig.json` file is set up with common TypeScript configurations.

To compile TypeScript files:

```bash
npx tsc
```

## Dependencies

- `@types/node`: TypeScript definitions for Node.js.
- `ts-node` and `tsx`: TypeScript execution and REPL for Node.js.

## Future Work

- Complete the implementation of `simple-file-processing-cli-tool.ts`.
- Add more robust error handling and logging.
- Implement additional data transformation options.
- Create unit tests for the anonymization logic.

## Contributing

Contributions are welcome. Please feel free to submit a Pull Request.
