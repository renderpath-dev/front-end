export type DeploymentCheckStatus = "pending" | "passed" | "failed" | "skipped";

export interface DeploymentChecklistItem {
  readonly id: string;
  readonly label: string;
  readonly commandOrEvidence: string;
  readonly requiredBeforeDeploy: boolean;
  readonly status: DeploymentCheckStatus;
}

export const deploymentChecklist: ReadonlyArray<DeploymentChecklistItem> = [
  {
    id: "lint",
    label: "Lint gate completed",
    commandOrEvidence: "npm run lint",
    requiredBeforeDeploy: true,
    status: "pending",
  },
  {
    id: "typecheck",
    label: "Vue SFC type gate completed",
    commandOrEvidence: "npm run typecheck",
    requiredBeforeDeploy: true,
    status: "pending",
  },
  {
    id: "unit-tests",
    label: "Unit and integration tests completed",
    commandOrEvidence: "npm run test:unit",
    requiredBeforeDeploy: true,
    status: "pending",
  },
  {
    id: "e2e",
    label: "E2E tests completed or explicitly skipped",
    commandOrEvidence: "npm run test:e2e",
    requiredBeforeDeploy: true,
    status: "pending",
  },
  {
    id: "build",
    label: "Production build completed",
    commandOrEvidence: "npm run build",
    requiredBeforeDeploy: true,
    status: "pending",
  },
  {
    id: "preview",
    label: "Built files preview verified",
    commandOrEvidence: "npm run preview",
    requiredBeforeDeploy: true,
    status: "pending",
  },
  {
    id: "route-refresh",
    label: "Route refresh verified through static fallback",
    commandOrEvidence: "route-refresh-checklist.md",
    requiredBeforeDeploy: true,
    status: "pending",
  },
  {
    id: "env-exposure",
    label: "Env exposure checked",
    commandOrEvidence: "npm run verify:env",
    requiredBeforeDeploy: true,
    status: "pending",
  },
  {
    id: "bundle-report",
    label: "Bundle report reviewed",
    commandOrEvidence: "npm run build:analyze",
    requiredBeforeDeploy: false,
    status: "pending",
  },
  {
    id: "rollback-plan",
    label: "Rollback plan written",
    commandOrEvidence: "rollbackChecklist.ts",
    requiredBeforeDeploy: true,
    status: "pending",
  },
];
