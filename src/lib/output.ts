type TestCoverageMetadata = {
  type: "test-coverage";
  line: number;
  statement: number;
  function: number;
  branch: number;
};

type TestResultMetadata = {
  type: "test-result";
  pass: number;
  fail: number;
  skip: number;
};

type DocumentationMetadata = {
  type: "documentation";
};

type CodeQualityMetadata = {
  type: "code-quality";
  qualityRating: string;
};

type Metadata =
  | CodeQualityMetadata
  | TestCoverageMetadata
  | DocumentationMetadata
  | TestResultMetadata;

type Output = {
  name: string;
  url: string;
  data: Metadata;
};

export type {
  TestCoverageMetadata,
  TestResultMetadata,
  DocumentationMetadata,
  CodeQualityMetadata,
  Metadata,
  Output,
};
