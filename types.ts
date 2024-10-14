export type AnonymizationPattern = {
  name: string;
  regex: RegExp;
  replacement: string;
};

export type AnonymizerConfig = {
  patterns?: AnonymizationPattern[];
  customPattern?: AnonymizationPattern[];
}
