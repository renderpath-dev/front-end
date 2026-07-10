export type TestLayer = {
  name: string;
  scope: string;
  speed: "fast" | "medium" | "slow";
  failureMeaning: string;
};

export const testLayers: ReadonlyArray<TestLayer> = [
  {
    name: "Unit",
    scope: "Pure logic, composables, and stores",
    speed: "fast",
    failureMeaning: "A focused behavior contract is broken.",
  },
  {
    name: "Component",
    scope: "Props, emits, slots, and user interaction",
    speed: "medium",
    failureMeaning: "A component public interface is broken.",
  },
  {
    name: "Integration",
    scope: "Router, store, component, and mocked network boundary",
    speed: "medium",
    failureMeaning: "Multiple application boundaries no longer cooperate.",
  },
  {
    name: "End-to-end",
    scope: "Critical workflows in a real browser",
    speed: "slow",
    failureMeaning: "A user-visible workflow is broken.",
  },
];
