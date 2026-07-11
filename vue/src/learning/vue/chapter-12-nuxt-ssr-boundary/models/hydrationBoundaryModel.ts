export interface HydrationBoundaryRisk {
  readonly source: string;
  readonly risk: string;
  readonly safePattern: string;
}

export const hydrationBoundaryRisks: ReadonlyArray<HydrationBoundaryRisk> = [
  {
    source: "Current time",
    risk: "Server HTML and client render produce different text",
    safePattern: "Render a deterministic placeholder, then update in onMounted",
  },
  {
    source: "Random value",
    risk: "The client cannot reproduce the server value during hydration",
    safePattern: "Generate on the server and serialize through payload or avoid initial render",
  },
  {
    source: "Viewport size",
    risk: "The server has no browser viewport",
    safePattern: "Read window size inside a client-only component",
  },
  {
    source: "localStorage",
    risk: "The server runtime cannot access browser storage",
    safePattern: "Read browser storage after hydration or behind ClientOnly",
  },
];
