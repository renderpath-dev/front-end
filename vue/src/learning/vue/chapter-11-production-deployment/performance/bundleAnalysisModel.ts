export type BundleReportSignal =
  | "module-size"
  | "chunk-size"
  | "dependency-contribution"
  | "duplicated-module"
  | "gzip-size"
  | "brotli-size";

export interface BundleAnalysisRecord {
  readonly signal: BundleReportSignal;
  readonly meaning: string;
  readonly action: string;
  readonly limitation: string;
}

export const bundleAnalysisRecords: ReadonlyArray<BundleAnalysisRecord> = [
  {
    signal: "module-size",
    meaning: "How much source or dependency code a module contributes",
    action: "Inspect large modules before changing imports",
    limitation: "Large source does not always equal slow runtime",
  },
  {
    signal: "chunk-size",
    meaning: "The emitted file size that a browser may request",
    action: "Compare initial chunks and lazy route chunks",
    limitation: "Local size is not real network performance",
  },
  {
    signal: "dependency-contribution",
    meaning: "Which package dominates a chunk",
    action: "Review Element Plus, icons, Zod, and Axios contribution",
    limitation: "Tree-shaking depends on actual import style",
  },
  {
    signal: "duplicated-module",
    meaning: "Similar modules may appear in multiple chunks",
    action: "Review split strategy before adding manual chunks",
    limitation: "Some duplication can be a deliberate tradeoff",
  },
  {
    signal: "gzip-size",
    meaning: "Approximate compressed transfer size using gzip",
    action: "Compare against learning transfer budgets",
    limitation: "Server compression and CDN behavior can differ",
  },
  {
    signal: "brotli-size",
    meaning: "Approximate compressed transfer size using Brotli",
    action: "Use as a local estimate, not a deployment claim",
    limitation: "The production server may not use Brotli",
  },
];
