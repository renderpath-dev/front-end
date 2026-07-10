export type RuntimeConfigPattern =
  "build-time-env" | "runtime-json" | "backend-secret";

export interface RuntimeConfigBoundaryRecord {
  readonly pattern: RuntimeConfigPattern;
  readonly owner: string;
  readonly canChangeAfterBuild: boolean;
  readonly secretSafe: boolean;
  readonly note: string;
}

export const runtimeConfigBoundaries: ReadonlyArray<RuntimeConfigBoundaryRecord> =
  [
    {
      pattern: "build-time-env",
      owner: "Vite build",
      canChangeAfterBuild: false,
      secretSafe: false,
      note: "Values are compiled into the client bundle when referenced by source",
    },
    {
      pattern: "runtime-json",
      owner: "Static host or backend",
      canChangeAfterBuild: true,
      secretSafe: false,
      note: "Public runtime config can be fetched before mounting the app",
    },
    {
      pattern: "backend-secret",
      owner: "Server runtime",
      canChangeAfterBuild: true,
      secretSafe: true,
      note: "Secrets must stay outside the static Vue bundle",
    },
  ];
