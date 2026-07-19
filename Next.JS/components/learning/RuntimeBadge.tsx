export type RuntimeKind = "nodejs" | "browser" | "edge" | "build" | "unknown";

const runtimeStyles: Record<RuntimeKind, string> = {
  nodejs:
    "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-300",
  browser:
    "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  edge: "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300",
  build:
    "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-300",
  unknown:
    "border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300",
};

const runtimeLabels: Record<RuntimeKind, string> = {
  nodejs: "Node.js",
  browser: "Browser",
  edge: "Edge",
  build: "Build process",
  unknown: "Unknown",
};

export function RuntimeBadge({ runtime }: { runtime: RuntimeKind }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${runtimeStyles[runtime]}`}
    >
      {runtimeLabels[runtime]}
    </span>
  );
}
