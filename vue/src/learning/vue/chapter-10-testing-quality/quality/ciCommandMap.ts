import { qualityGateChecklist } from "./qualityGateChecklist";

export const ciCommandMap = {
  localEntry: "npm run ci:local",
  commands: qualityGateChecklist.map((gate) => gate.command),
  stopPolicy: "Stop on the first failed gate",
} as const;
