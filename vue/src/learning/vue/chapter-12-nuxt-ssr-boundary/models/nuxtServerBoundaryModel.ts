export interface ServerBoundaryEntry {
  readonly layer: string;
  readonly pathPattern: string;
  readonly runtime: string;
  readonly authority: string;
}

export const serverBoundaryEntries: ReadonlyArray<ServerBoundaryEntry> = [
  {
    layer: "API route",
    pathPattern: "server/api/products/index.get.ts",
    runtime: "Nitro server",
    authority: "Can validate input and return JSON for app pages",
  },
  {
    layer: "Custom route",
    pathPattern: "server/routes/health.get.ts",
    runtime: "Nitro server",
    authority: "Can return a non-/api server response",
  },
  {
    layer: "Server middleware",
    pathPattern: "server/middleware/request-log.ts",
    runtime: "Nitro request pipeline",
    authority: "Can observe requests without exposing private values",
  },
];
