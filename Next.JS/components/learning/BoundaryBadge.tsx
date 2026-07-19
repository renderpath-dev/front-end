export type BoundaryKind =
  | "server"
  | "client"
  | "build"
  | "request"
  | "browser"
  | "platform";

const boundaryStyles: Record<BoundaryKind, string> = {
  server: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  client:
    "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  build:
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  request:
    "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  browser:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  platform:
    "border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300",
};

const boundaryLabels: Record<BoundaryKind, string> = {
  server: "Server",
  client: "Client",
  build: "Build",
  request: "Request",
  browser: "Browser",
  platform: "Platform",
};

export function BoundaryBadge({ kind }: { kind: BoundaryKind }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${boundaryStyles[kind]}`}
    >
      {boundaryLabels[kind]}
    </span>
  );
}
