# Simple File Processing CLI Tool

This project implements a command-line interface (CLI) tool for processing and anonymizing large log files. It's designed to handle sensitive data by transforming it into a more secure format.

## Project Structure

- `anonymize.ts`: Contains the core anonymization logic.
- `generate-test-file.js`: Script to generate a large test file with mock sensitive data.
- `simple-file-processing-cli-tool.ts`: Main CLI tool for processing files.

## Features

- **File Generation**: Creates a large log file with simulated sensitive data.
- **Anonymization**: Transforms sensitive data to protect privacy, including:
  - Email addresses
  - Phone numbers
  - Social Security Numbers (SSN)
  - Customer IDs
- **Asynchronous Processing**: Utilizes Node.js streams for efficient file handling.
- **Command-line Interface**: Accepts file paths as arguments for processing.

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

### Processing Files

To anonymize a log file:

```bash
ts-node simple-file-processing-cli-tool.ts path/to/your/logfile.log
```

This will process the input file and create an anonymized version named `cleanedFullCompanyLogs.log` in the same directory as the script.

## How It Works

1. The tool reads the input file using a readable stream.
2. Each chunk of data is passed through a custom `TransformFile` class, which applies the anonymization function.
3. The anonymized data is then written to the output file using a writable stream.
4. The entire process is handled asynchronously using Node.js streams and the `pipeline` function.

## Anonymization Process

The `anonymize.ts` file contains the logic for anonymizing sensitive data:

- Email addresses are replaced with `[EMAIL_REDACTED]`
- Phone numbers are replaced with `[PHONE_REDACTED]`
- Social Security Numbers are replaced with `[SSN_REDACTED]`
- Customer IDs are replaced with `[CUSTOMER_ID_REDACTED]`

## Error Handling

The tool includes basic error handling for common issues such as:
- File not found
- Permission denied
- General pipeline failures

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

- Implement more robust logging and error reporting.
- Add command-line options for customizing anonymization rules.
- Create unit tests for the anonymization logic.
- Optimize performance for very large files.
- Add progress indicators for long-running operations.

## Contributing

Contributions are welcome. Please feel free to submit a Pull Request.
