export const testNamingConventions = {
  unit: "*.test.ts",
  integration: "*.integration.test.ts",
  endToEnd: "*.spec.ts",
  suite: "Name the public contract under test",
  case: "Describe an observable result and its condition",
} as const;
