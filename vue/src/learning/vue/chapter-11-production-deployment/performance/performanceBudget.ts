export type WebVitalMetricName = "LCP" | "INP" | "CLS";
export type AssetBudgetName =
  "initial-javascript" | "initial-css" | "route-chunk" | "total-asset-count";

export interface SizeBudgetRecord {
  readonly name: AssetBudgetName;
  readonly limit: number;
  readonly unit: "kb" | "count";
  readonly scope: string;
}

export interface WebVitalBudgetRecord {
  readonly name: WebVitalMetricName;
  readonly target: number;
  readonly unit: "ms" | "score";
  readonly evidenceType: "lab" | "field";
}

export const sizeBudgets: ReadonlyArray<SizeBudgetRecord> = [
  {
    name: "initial-javascript",
    limit: 350,
    unit: "kb",
    scope: "Learning budget for initial JavaScript transfer",
  },
  {
    name: "initial-css",
    limit: 90,
    unit: "kb",
    scope: "Learning budget for initial CSS transfer",
  },
  {
    name: "route-chunk",
    limit: 180,
    unit: "kb",
    scope: "Learning budget for a lazy route chunk",
  },
  {
    name: "total-asset-count",
    limit: 45,
    unit: "count",
    scope: "Learning budget for generated asset files",
  },
];

export const webVitalBudgets: ReadonlyArray<WebVitalBudgetRecord> = [
  {
    name: "LCP",
    target: 2500,
    unit: "ms",
    evidenceType: "field",
  },
  {
    name: "INP",
    target: 200,
    unit: "ms",
    evidenceType: "field",
  },
  {
    name: "CLS",
    target: 0.1,
    unit: "score",
    evidenceType: "field",
  },
];
