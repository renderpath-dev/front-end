export type UiLibraryComparison = {
  library: "Element Plus" | "Naive UI" | "Ant Design Vue";
  strongestFit: string;
  tradeoff: string;
  installed: boolean;
};

export const uiLibraryComparisons: ReadonlyArray<UiLibraryComparison> = [
  {
    library: "Element Plus",
    strongestFit: "Vue 3 admin forms, tables, and established component APIs",
    tradeoff: "Requires a deliberate project wrapper and theme boundary",
    installed: true,
  },
  {
    library: "Naive UI",
    strongestFit: "Theme-driven Vue interfaces with strong TypeScript ergonomics",
    tradeoff: "A different component contract and ecosystem choice",
    installed: false,
  },
  {
    library: "Ant Design Vue",
    strongestFit: "Enterprise interfaces aligned with Ant Design conventions",
    tradeoff: "A larger design-system commitment",
    installed: false,
  },
];
