function anonymizeLine(line: string): string {
    // Replace email addresses
    line = line.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL_REDACTED]');
    
    // Replace phone numbers
    line = line.replace(/\+\d{1,2}\s?\(\d{3}\)\s?\d{3}-\d{4}/g, '[PHONE_REDACTED]');
    
    // Replace SSN
    line = line.replace(/\d{3}-\d{2}-\d{4}/g, '[SSN_REDACTED]');

    // Replace customer ID
    line = line.replace(/\b\d{4}-\d{4}-\d{4}-\d{4}\b/g, '[CUSTOMER_ID_REDACTED]');
    
    // Add more replacements as needed
    
    return line;
}

module.exports = anonymizeLine
