import { AnonymizationPattern, AnonymizerConfig } from './types';
import { defaultPatterns } from './defaultPatterns';


export class Anonymizer {
  private patterns: AnonymizationPattern[];

  constructor(config: AnonymizerConfig = {}) {
    this.patterns = config.patterns || defaultPatterns;
    if (config.customPattern) {
      this.patterns = [...this.patterns, ...config.customPattern ];
    }
  }

  anonymizeLine(line: string): string {
    return this.patterns.reduce((anonymizedLine, pattern) => {
      return anonymizedLine.replace(pattern.regex, pattern.replacement);
    }, line);
  }

  addPattern(pattern: AnonymizationPattern): void {
    this.patterns.push(pattern);
  }

  removePattern(name: string): void {
    this.patterns = this.patterns.filter(p => p.name !== name);
  }
}

