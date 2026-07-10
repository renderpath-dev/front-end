export type DependencyScope = "runtime" | "development" | "test-only";

export interface DependencyRiskRecord {
  readonly packageName: string;
  readonly scope: DependencyScope;
  readonly sourceOwner: string;
  readonly productionBundleRisk: string;
  readonly reviewSignal: string;
}

export const dependencyRiskRecords: ReadonlyArray<DependencyRiskRecord> = [
  {
    packageName: "element-plus",
    scope: "runtime",
    sourceOwner: "Chapter 08 UI plugin",
    productionBundleRisk: "Can dominate admin UI chunks when imported broadly",
    reviewSignal: "Large dependency area in bundle report",
  },
  {
    packageName: "@element-plus/icons-vue",
    scope: "runtime",
    sourceOwner: "Chapter 08 icon components",
    productionBundleRisk: "Global registration can pull unnecessary icons",
    reviewSignal: "Many icon modules in report",
  },
  {
    packageName: "zod",
    scope: "runtime",
    sourceOwner: "Chapter 09 runtime validators",
    productionBundleRisk: "Validation code ships when imported by client paths",
    reviewSignal: "Validator modules in route or API chunks",
  },
  {
    packageName: "axios",
    scope: "runtime",
    sourceOwner: "Chapter 09 API client",
    productionBundleRisk: "Usually acceptable but still part of client code",
    reviewSignal: "HTTP client module in initial or API chunk",
  },
  {
    packageName: "vitest",
    scope: "test-only",
    sourceOwner: "Chapter 10 tests",
    productionBundleRisk:
      "Should not enter production if test imports stay isolated",
    reviewSignal:
      "Test runner modules appearing in dist would be a boundary bug",
  },
  {
    packageName: "@playwright/test",
    scope: "development",
    sourceOwner: "Chapter 10 E2E tests",
    productionBundleRisk: "Should never be imported by runtime source",
    reviewSignal: "Browser automation package in dist would be a hard failure",
  },
];
