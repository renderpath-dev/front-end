export interface NuxtProductionReadinessItem {
  readonly check: string;
  readonly evidence: string;
}

export const nuxtProductionReadinessItems: ReadonlyArray<NuxtProductionReadinessItem> =
  [
    {
      check: "Build output",
      evidence: "npm run build must complete before claiming production readiness.",
    },
    {
      check: "Generate output",
      evidence: "npm run generate must complete before claiming prerendered content.",
    },
    {
      check: "Preview output",
      evidence: "npm run preview must be smoke-tested on port 3041.",
    },
  ];
