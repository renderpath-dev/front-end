export type BundleRiskLevel = "low" | "medium" | "high";

export interface BundleBudgetRecord {
  readonly dependency: string;
  readonly usedByChapter: string;
  readonly importPattern: string;
  readonly productionRisk: BundleRiskLevel;
  readonly reviewAction: string;
}

export const bundleBudgetRecords: ReadonlyArray<BundleBudgetRecord> = [
  {
    dependency: "element-plus",
    usedByChapter: "Chapter 08",
    importPattern: "Local plugin registration",
    productionRisk: "high",
    reviewAction: "Measure actual chunks before changing import strategy",
  },
  {
    dependency: "@element-plus/icons-vue",
    usedByChapter: "Chapter 08",
    importPattern: "Named icon component imports",
    productionRisk: "medium",
    reviewAction: "Avoid global icon registration unless measured",
  },
  {
    dependency: "axios",
    usedByChapter: "Chapter 09",
    importPattern: "Central API client",
    productionRisk: "low",
    reviewAction: "Keep request code out of UI components",
  },
  {
    dependency: "zod",
    usedByChapter: "Chapter 09",
    importPattern: "Runtime validation modules",
    productionRisk: "medium",
    reviewAction: "Validate API boundaries and review bundle contribution",
  },
  {
    dependency: "vitest",
    usedByChapter: "Chapter 10",
    importPattern: "Test files only",
    productionRisk: "low",
    reviewAction: "Confirm test-only imports do not enter source modules",
  },
];
