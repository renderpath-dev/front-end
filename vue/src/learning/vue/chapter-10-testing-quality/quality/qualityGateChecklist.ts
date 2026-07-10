export type QualityGate = {
  command: string;
  protects: string;
  required: boolean;
};

export const qualityGateChecklist: ReadonlyArray<QualityGate> = [
  {
    command: "npm run format:check",
    protects: "Stable formatting and reviewable diffs, not behavior",
    required: true,
  },
  { command: "npm run lint", protects: "Static code rules", required: true },
  {
    command: "npm run typecheck",
    protects: "Type and Vue template contracts",
    required: true,
  },
  {
    command: "npm run test:unit",
    protects: "Unit, component, and integration behavior",
    required: true,
  },
  {
    command: "npm run test:coverage",
    protects: "Executed source paths, not assertion quality",
    required: false,
  },
  {
    command: "npm run test:e2e",
    protects: "Critical browser workflows",
    required: true,
  },
  {
    command: "npm run build",
    protects: "Production bundle construction",
    required: true,
  },
  {
    command: "npm run ci:local",
    protects: "Ordered execution of the required local gates",
    required: true,
  },
];
