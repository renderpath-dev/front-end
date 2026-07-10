export type BasePathStrategy = "root" | "subpath" | "relative";

export interface BasePathRecord {
  readonly strategy: BasePathStrategy;
  readonly viteBase: string;
  readonly exampleUrl: string;
  readonly assetEffect: string;
  readonly routerEffect: string;
  readonly failureSignal: string;
}

export const basePathRecords: ReadonlyArray<BasePathRecord> = [
  {
    strategy: "root",
    viteBase: "/",
    exampleUrl: "https://example.com/",
    assetEffect: "Assets are emitted with root-relative URLs",
    routerEffect: "Router history base can use import.meta.env.BASE_URL",
    failureSignal: "Usually not a base mismatch unless hosted under a subpath",
  },
  {
    strategy: "subpath",
    viteBase: "/vue/",
    exampleUrl: "https://example.com/vue/",
    assetEffect: "Generated asset URLs start with the subpath",
    routerEffect: "Router base must match the deployed subpath",
    failureSignal: "The page loads but assets request from the wrong root path",
  },
  {
    strategy: "relative",
    viteBase: "./",
    exampleUrl: "https://example.com/static/vue/",
    assetEffect: "Asset URLs are relative to the current HTML location",
    routerEffect: "Clean history routes still need careful server fallback",
    failureSignal:
      "Nested route refresh can resolve relative assets incorrectly",
  },
];
