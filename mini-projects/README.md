# Mini Projects

This directory contains focused projects that transfer concepts from the repository's learning workspaces into independent, reviewable implementations.

A mini project is not a duplicate chapter exercise and should not become a second capstone. Each project must have a narrow product goal, an explicit technical boundary, and quality evidence that can be reviewed without reading the entire repository.

## Project Catalog

| Project | Primary track | Main engineering focus | Level | Status |
| --- | --- | --- | --- | --- |
| [`javascript-runtime-observatory/`](./javascript-runtime-observatory/) | JavaScript | Execution order, closures, modules, DOM events, Promise jobs, and timer tasks | Foundation | Planned |
| [`typescript-contract-workbench/`](./typescript-contract-workbench/) | TypeScript | `unknown` boundaries, type guards, discriminated unions, generics, and runtime validation | Foundation | Planned |
| [`react-accessible-catalog-explorer/`](./react-accessible-catalog-explorer/) | React | URL state, request lifecycle, reducer state, accessibility, MSW, and behavior tests | Intermediate | Planned |
| [`vue-permission-operations-console/`](./vue-permission-operations-console/) | Vue | Router permissions, Pinia ownership, typed API boundaries, forms, and admin UI behavior | Intermediate | Planned |
| [`nodejs-static-site-audit-cli/`](./nodejs-static-site-audit-cli/) | Node.js | File-system traversal, streams, process arguments, reports, errors, and exit codes | Intermediate | Planned |
| [`contract-first-feedback-board/`](./contract-first-feedback-board/) | Cross-stack | Shared contracts, Node API boundaries, runtime validation, and framework client integration | Advanced | Planned |

## Recommended Progression

```text
JavaScript Runtime Observatory
  -> TypeScript Contract Workbench
  -> Node.js Static Site Audit CLI
  -> React Accessible Catalog Explorer
  -> Vue Permission Operations Console
  -> Contract-First Feedback Board
```

The order moves from language and runtime evidence to typed boundaries, framework state ownership, and finally cross-stack integration.

## Directory Structure

```text
mini-projects/
├── README.md
├── javascript-runtime-observatory/
│   └── README.md
├── typescript-contract-workbench/
│   └── README.md
├── react-accessible-catalog-explorer/
│   └── README.md
├── vue-permission-operations-console/
│   └── README.md
├── nodejs-static-site-audit-cli/
│   └── README.md
└── contract-first-feedback-board/
    └── README.md
```

The project directories currently contain implementation briefs. Source files, dependencies, and scripts should be added only when implementation starts.

## Project Rules

Every mini project must:

1. Solve one concrete user or developer problem.
2. Identify which repository learning track it validates.
3. Separate syntax, runtime behavior, TypeScript checking, framework behavior, and platform APIs.
4. Define an MVP and keep unrelated product features out of scope.
5. Include a project-specific `README.md`, setup commands, architecture notes, and quality gates.
6. Use descriptive English file names, identifiers, and code comments.
7. Validate untrusted external data at runtime instead of relying only on static types.
8. Include tests for important behavior and failure paths when the chosen stack supports testing.
9. Avoid committing dependencies, build output, secrets, local databases, or editor state.
10. Record limitations honestly; planned behavior must not be documented as completed behavior.

## Status Definitions

- **Planned**: the project brief exists, but implementation has not started.
- **In progress**: runnable source exists, but the MVP or quality gates are incomplete.
- **Complete**: the MVP works and all documented quality gates pass.
- **Archived**: the project is retained for historical learning value but is no longer maintained.

## Completion Evidence

A project should be marked complete only when its README can point to reproducible evidence:

```text
install
  -> run locally
  -> lint
  -> typecheck when applicable
  -> test
  -> production build or executable package
  -> documented limitations
```

Commands are project-specific. The project's own `package.json` and README are the source of truth.