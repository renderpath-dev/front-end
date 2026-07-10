export type MswScenario =
  "success" | "forbidden" | "validation" | "server" | "slow";

let activeScenario: MswScenario = "success";

export function setMswScenario(scenario: MswScenario): void {
  activeScenario = scenario;
}

export function getMswScenario(): MswScenario {
  return activeScenario;
}

export function resetMswScenario(): void {
  activeScenario = "success";
}
