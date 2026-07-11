export type TestStatus = "planned" | "passing" | "failing";

export interface TestBoundaryItem {
  readonly name: string;
  readonly status: TestStatus;
  readonly evidence: string;
}
