export const testFailureCatalog = [
  {
    signal: "Import resolution failure",
    meaning: "A module path or package boundary cannot be resolved.",
    nextStep:
      "Verify the path, export, extension policy, and installed package.",
  },
  {
    signal: "Missing DOM API",
    meaning: "The jsdom environment does not implement a required browser API.",
    nextStep: "Provide a focused test polyfill or move the behavior to E2E.",
  },
  {
    signal: "Vue warning",
    meaning: "The mounted component violated a Vue runtime contract.",
    nextStep:
      "Inspect required props, plugin installation, and template bindings.",
  },
  {
    signal: "AssertionError",
    meaning: "The observed behavior differs from the declared contract.",
    nextStep: "Inspect the assertion inputs and the last behavior change.",
  },
  {
    signal: "Timeout",
    meaning: "The expected asynchronous state did not become observable.",
    nextStep: "Check awaited work, fake timers, and network scenario latency.",
  },
  {
    signal: "Missing emitted event",
    meaning: "The component public event contract was not observed.",
    nextStep: "Check the user action, validation state, and event name.",
  },
  {
    signal: "Stale DOM assertion",
    meaning: "The assertion ran before Vue or a Promise completed its update.",
    nextStep:
      "Await trigger, nextTick, or flushPromises at the owning boundary.",
  },
  {
    signal: "Unhandled request",
    meaning: "The test crossed a network boundary without an explicit handler.",
    nextStep: "Add or correct the MSW handler for the intended endpoint.",
  },
  {
    signal: "Playwright timeout",
    meaning: "The real browser did not observe the expected condition in time.",
    nextStep: "Inspect the trace and verify the locator and application state.",
  },
  {
    signal: "Strict locator violation",
    meaning: "The browser locator matched more than one user-visible target.",
    nextStep: "Scope the locator to the owning region and accessible name.",
  },
  {
    signal: "Typecheck failure",
    meaning: "A TypeScript or Vue template static contract is broken.",
    nextStep:
      "Read the first vue-tsc diagnostic and follow its source location.",
  },
  {
    signal: "Lint failure",
    meaning: "Source violates an enabled static quality rule.",
    nextStep:
      "Identify the rule and fix the behavior or justified configuration.",
  },
  {
    signal: "Build failure",
    meaning: "The production transform or bundle graph cannot complete.",
    nextStep: "Inspect the first build diagnostic and its imported dependency.",
  },
] as const;
