export type WebVitalsDataSource = "lab" | "field";

export interface WebVitalRecord {
  readonly name: "LCP" | "INP" | "CLS";
  readonly fullName: string;
  readonly measures: string;
  readonly goodThreshold: string;
  readonly primaryDataSource: WebVitalsDataSource;
}

export const webVitalRecords: ReadonlyArray<WebVitalRecord> = [
  {
    name: "LCP",
    fullName: "Largest Contentful Paint",
    measures: "Loading performance of the largest visible content",
    goodThreshold: "2.5s or less",
    primaryDataSource: "field",
  },
  {
    name: "INP",
    fullName: "Interaction to Next Paint",
    measures: "Interaction responsiveness",
    goodThreshold: "200ms or less",
    primaryDataSource: "field",
  },
  {
    name: "CLS",
    fullName: "Cumulative Layout Shift",
    measures: "Visual stability",
    goodThreshold: "0.1 or less",
    primaryDataSource: "field",
  },
];
