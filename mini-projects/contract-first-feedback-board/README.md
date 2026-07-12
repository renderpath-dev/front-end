# Contract-First Feedback Board

## Status

Planned. This directory currently contains the project brief only.

## Purpose

Build a small full-stack feedback board that connects the repository's TypeScript, Node.js, React, and Vue learning tracks through one explicit contract boundary.

The system accepts feedback items, lists and filters them, and allows status updates. The central learning goal is not the product itself; it is proving how shared static contracts, runtime validation, server behavior, and framework-specific state ownership fit together without pretending that a TypeScript type validates network data.

## Repository Learning Mapping

This project validates concepts from:

- Shared TypeScript DTO and domain contracts.
- Runtime validation at request and response boundaries.
- Node.js HTTP routing, errors, persistence, and process lifecycle.
- React request-state ownership and accessible mutations.
- Vue Router, Pinia, permission-aware actions, and forms.
- Separation between reusable domain logic and framework adapters.
- Integration tests across client, API, and persisted state.

## Product Scenario

A user submits product feedback containing category, title, description, and priority. Reviewers can filter feedback, inspect details, and move an item through allowed states such as `new`, `reviewing`, `planned`, and `closed`.

The React and Vue clients should implement the same user-visible contract while preserving their own framework-native state models.

## MVP

1. A shared contract package containing versioned request and response DTOs.
2. Runtime validators for every external payload.
3. A Node.js API with endpoints to create, list, read, and update feedback.
4. File-based or in-memory persistence behind a repository interface.
5. A React client with URL-backed filters and explicit mutation states.
6. A Vue client with Router, Pinia session or permission state, and controlled forms.
7. The same status-transition domain rule reused by the API and both clients.
8. Normalized error responses with stable error codes.
9. Integration tests for valid creation, invalid payload rejection, filtering, denied transitions, and missing records.
10. Independent quality commands for contracts, API, React client, and Vue client.

## Contract Boundary

```text
client form values
  -> client-side validation
  -> versioned request DTO
  -> HTTP transport
  -> server runtime validation
  -> domain command
  -> persistence repository
  -> response DTO
  -> client runtime validation
  -> framework-specific state and UI
```

Shared TypeScript types reduce duplication inside the repository. They do not remove the need for runtime validation on either side of the network.

## Suggested Structure

```text
contract-first-feedback-board/
├── package.json
├── apps/
│   ├── api/
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── server.ts
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   └── repositories/
│   │   └── tests/
│   ├── react-client/
│   │   ├── package.json
│   │   ├── src/
│   │   └── tests/
│   └── vue-client/
│       ├── package.json
│       ├── src/
│       ├── tests/
│       └── e2e/
├── packages/
│   ├── contracts/
│   │   ├── package.json
│   │   └── src/
│   └── domain/
│       ├── package.json
│       └── src/
└── docs/
    ├── architecture.md
    └── api-contract.md
```

A workspace tool may be introduced when implementation starts. The project should not adopt a monorepo orchestrator until ordinary package workspaces become insufficient.

## Engineering Constraints

- Do not import server persistence models into client code.
- Do not expose database or storage records as public API DTOs.
- Do not trust shared TypeScript types across HTTP without runtime validation.
- Keep domain transition rules independent from React, Vue, and Node request objects.
- Use stable error codes and map them to framework-specific presentation messages.
- Keep React local or URL state separate from Vue Pinia ownership decisions.
- Do not require both clients to share hooks, composables, or UI components.
- Do not implement authentication as a fake security claim; a local role simulation must be documented honestly.

## Quality Gates

The completed project should expose reproducible workspace commands similar to:

```bash
npm run lint
npm run typecheck
npm run test
npm run test:integration
npm run test:e2e
npm run build
```

The exact scripts must be defined by the implemented workspace. A root command should fail when any required package gate fails.

## Out of Scope

- Production authentication or identity-provider integration.
- Payments, notifications, or file attachments.
- Real-time collaboration.
- A production database in the MVP.
- Microservices or distributed messaging.
- Forced visual parity between React and Vue clients.
- Deployment before local contracts and integration tests are stable.

## Definition of Done

The MVP is complete when both clients can perform the same contract-backed workflow, malformed data is rejected at every external boundary, invalid status transitions are enforced by shared domain logic, API integration tests pass, and each framework client retains a clear native ownership model.

## Extension Ideas

- Add SQLite or PostgreSQL behind the existing repository interface.
- Add an OpenAPI document generated from the stabilized public contract.
- Deploy one client at a time and compare operational evidence.
- Extract the project into a dedicated portfolio repository after its release history, deployment, and issue tracking need independent ownership.