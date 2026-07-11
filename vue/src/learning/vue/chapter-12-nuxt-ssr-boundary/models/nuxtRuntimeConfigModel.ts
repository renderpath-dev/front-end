export interface RuntimeConfigBoundaryEntry {
  readonly key: string;
  readonly visibility: "server-only" | "client-visible";
  readonly safeUse: string;
}

export const runtimeConfigBoundaryEntries: ReadonlyArray<RuntimeConfigBoundaryEntry> =
  [
    {
      key: "runtimeConfig.apiSecret",
      visibility: "server-only",
      safeUse: "Server handlers can derive safe results without returning the secret",
    },
    {
      key: "runtimeConfig.public.apiBase",
      visibility: "client-visible",
      safeUse: "Pages and components can build public API paths",
    },
    {
      key: "runtimeConfig.public.appTitle",
      visibility: "client-visible",
      safeUse: "Pages can display a non-secret application title",
    },
  ];
