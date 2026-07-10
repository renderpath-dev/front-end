export type CodeSplittingTechnique =
  | "dynamic-import"
  | "route-lazy-loading"
  | "async-component"
  | "vendor-splitting"
  | "preload-error";

export interface CodeSplittingRecord {
  readonly technique: CodeSplittingTechnique;
  readonly syntax: string;
  readonly chunkOwner: string;
  readonly benefit: string;
  readonly risk: string;
}

export const codeSplittingRecords: ReadonlyArray<CodeSplittingRecord> = [
  {
    technique: "dynamic-import",
    syntax: "import('./FeatureView.vue')",
    chunkOwner: "Bundler",
    benefit: "Creates an async dependency boundary",
    risk: "Too many small chunks can add request overhead",
  },
  {
    technique: "route-lazy-loading",
    syntax: "component: () => import('./DashboardView.vue')",
    chunkOwner: "Vue Router and Vite",
    benefit: "Loads route component code on first route visit",
    risk: "Direct refresh still requires server fallback",
  },
  {
    technique: "async-component",
    syntax: "defineAsyncComponent(() => import('./Panel.vue'))",
    chunkOwner: "Vue runtime and bundler",
    benefit: "Splits optional component trees",
    risk: "Loading and error states must be designed",
  },
  {
    technique: "vendor-splitting",
    syntax: "manualChunks or bundler default split",
    chunkOwner: "Build config",
    benefit: "Can isolate rarely changed dependency code",
    risk: "Manual chunks can hurt caching or request count if guessed",
  },
  {
    technique: "preload-error",
    syntax: "window.addEventListener('vite:preloadError', handler)",
    chunkOwner: "Browser runtime",
    benefit: "Can recover from old HTML referencing missing chunks",
    risk: "Blind reload can hide a broken deployment",
  },
];
