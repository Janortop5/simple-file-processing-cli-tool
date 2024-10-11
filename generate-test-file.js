const { pipeline } = require('stream/promises');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

const sensitiveDataLogsFilePath = path.join(__dirname, 'fullCompanyLogs.log')

// Generate a large array of log entries with sensitive information
function* generateLogEntriesIterator(count) {
  const domains = ['example.com', 'company.org', 'test.net', 'domain.co'];
  const names = ['john', 'sarah', 'mike', 'emma', 'david', 'lisa', 'chris', 'anna'];

  for (let i = 0; i < count; i++) {
    const timestamp = new Date(2024, 9, 11, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
    const email = `${names[Math.floor(Math.random() * names.length)]}.${Math.floor(Math.random() * 1000)}@${domains[Math.floor(Math.random() * domains.length)]}`;
    const ip = `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    const customerId = `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const phone = `+1 (${Math.floor(100 + Math.random() * 900)}) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const ssn = `${Math.floor(100 + Math.random() * 900)}-${Math.floor(10 + Math.random() * 90)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const amount = (Math.random() * 10000).toFixed(2);

    const logTypes = [
      `User ${email} (IP: ${ip}) accessed file "financial_report_2024.xlsx"`,
      `Payment processed for customer ID: ${customerId}, amount: $${amount}`,
      `New user registered: ${email}, phone: ${phone}`,
      `Error in transaction for account number: ${customerId}`,
      `User ${email} (IP: ${ip}) updated their profile`,
      `Customer support call from ${phone}, duration: ${Math.floor(Math.random() * 60)} minutes`,
      `New order placed by customer with SSN: ${ssn}, total: $${amount}`,
      `Password reset requested for user ${email}`,
      `Data sync completed for device MAC: ${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}`,
      `User ${email} (IP: ${ip}) logged out`
    ];

    const logEntry = `[${timestamp.toISOString()}] ${logTypes[Math.floor(Math.random() * logTypes.length)]}`;
    yield logEntry + '\n';
  }
}

// Generate large dataset and write to file asynchronously
async function generateLargeDataset(fileName, entryCount) {
  const writeStream = fs.createWriteStream(fileName);
  const readableStream = Readable.from(generateLogEntriesIterator(entryCount));

  try {
    await pipeline(
      readableStream,
      writeStream
    );
    console.log(`successfully generated ${entryCount} log entries in ${fileName}`);
  } catch (err) {
    console.error('Error generating dataset:', err);
  }
}

const fileName = sensitiveDataLogsFilePath;
const entryCount = 1000000;

generateLargeDataset(fileName, entryCount).then(() => {
  console.log('Log generation complete.');
});
