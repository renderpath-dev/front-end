# JavaScript Runtime Observatory

## Status

Planned. This directory currently contains the project brief only.

## Purpose

Build a small browser application that makes JavaScript execution order observable. A user selects or runs a predefined scenario and receives a timestamped trace showing synchronous calls, event handlers, Promise reactions, and timer callbacks in the order they actually execute.

The project converts abstract runtime rules into visible evidence. It belongs in `mini-projects/` because it integrates several JavaScript chapters into one focused developer tool without becoming a general-purpose debugger.

## Repository Learning Mapping

This project validates concepts from:

- Functions, callbacks, lexical scope, and closures.
- ES modules and module-local state.
- Promise reactions and asynchronous control flow.
- Browser events, timers, and DOM rendering.
- Error propagation and observable execution order.

## MVP

The first complete version should provide:

1. A scenario selector with at least four built-in scenarios:
   - synchronous function calls;
   - closure state across repeated calls;
   - `Promise.then()` versus `setTimeout()` ordering;
   - DOM event handler ordering.
2. A trace recorder that stores structured events rather than preformatted strings.
3. A timeline view containing sequence number, source, phase, and message.
4. An expected-order panel that can be compared with the actual trace.
5. A reset action that clears both trace data and scenario state.
6. A visible error state when a scenario throws.

## Runtime Model

```text
user action
  -> selected scenario function runs
  -> synchronous trace records are appended
  -> host APIs schedule later work
  -> Promise jobs and task callbacks execute
  -> each callback appends a structured trace record
  -> the UI renders the final observed order
```

The application must not claim to inspect the engine's real call stack or internal queues. It records application-level evidence produced by instrumented scenarios.

## Suggested Structure

```text
javascript-runtime-observatory/
├── index.html
├── package.json
├── src/
│   ├── main.js
│   ├── runtime/
│   │   ├── createTraceRecorder.js
│   │   └── traceEvent.js
│   ├── scenarios/
│   │   ├── synchronousCalls.js
│   │   ├── closureState.js
│   │   ├── promiseAndTimer.js
│   │   └── domEventOrder.js
│   └── ui/
│       ├── renderScenarioList.js
│       ├── renderTimeline.js
│       └── renderErrorState.js
└── tests/
    ├── createTraceRecorder.test.js
    └── scenarioOrdering.test.js
```

## Engineering Constraints

- Do not use `eval()` or execute arbitrary user-provided JavaScript.
- Keep scenario functions independent from DOM rendering.
- Store trace entries as objects with stable fields.
- Do not describe microtasks and tasks as background threads.
- Do not mutate shared scenario state during rendering.
- Use event delegation only when it simplifies a real dynamic-list boundary.

## Quality Gates

The project should eventually provide project-specific commands for:

```bash
npm run lint
npm run test
npm run build
```

Tests should verify trace ordering with controlled scenarios instead of relying only on screenshots.

## Out of Scope

- Parsing arbitrary JavaScript source.
- Replacing browser developer tools.
- Inspecting engine memory, native stack frames, or private queue internals.
- Visualizing Node.js event-loop phases.
- Running untrusted code in the page.

## Definition of Done

The MVP is complete when a reviewer can run every scenario, explain why each trace order occurs, reset the application without stale state, and reproduce the expected behavior through automated tests.

## Extension Ideas

- Add an async/await scenario and display its Promise-based continuation.
- Export a trace as JSON.
- Add a comparison view for two scenarios.
- Add a separate Node.js edition after the browser version is complete.