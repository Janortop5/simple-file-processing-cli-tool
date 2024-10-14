import { AnonymizationPattern } from './types';

export const defaultPatterns: AnonymizationPattern[] = [
  {
    name: 'email',
    regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    replacement: '[EMAIL_REDACTED]'
  },
  {
    name: 'phone_us',
    regex: /\b(?:\+1|1)?[-.\s]?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
    replacement: '[PHONE_REDACTED]'
  },
  {
    name: 'phone_international',
    regex: /\b\+(?:[0-9] ?){6,14}[0-9]\b/g,
    replacement: '[PHONE_REDACTED]'
  },
  {
    name: 'ssn_us',
    regex: /\b(?!000|666|9\d{2})\d{3}-(?!00)\d{2}-(?!0000)\d{4}\b/g,
    replacement: '[SSN_REDACTED]'
  },
  {
    name: 'customer_id',
    regex: /\b\d{4}-\d{4}-\d{4}-\d{4}\b/g,
    replacement: '[CUSTOMER_ID_REDACTED]'
  },
  {
    name: 'credit_card',
    regex: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})\b/g,
    replacement: '[CREDIT_CARD_REDACTED]'
  },
]
