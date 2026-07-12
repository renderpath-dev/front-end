# Vue Permission Operations Console

## Status

Planned. This directory currently contains the project brief only.

## Purpose

Build a compact Vue 3 + TypeScript operations console for reviewing and updating a queue of support or fulfillment tasks. The project focuses on route permissions, Pinia state ownership, typed API boundaries, controlled forms, and production-style admin UI behavior.

It is smaller than the main Vue learning application's production chapters. Its purpose is to prove that Vue mechanisms can be applied to a fresh business workflow with explicit boundaries and tests.

## Repository Learning Mapping

This project validates concepts from:

- Single-File Components and Composition API.
- `ref`, `computed`, `watch`, and lifecycle ownership.
- Props, emits, slots, and reusable component contracts.
- Vue Router route metadata and navigation guards.
- Pinia store boundaries and derived state.
- Runtime-validated API responses.
- Form validation, dialogs, drawers, and operation permissions.
- Localization-ready labels and messages.
- Unit, component, and end-to-end tests.

## Product Scenario

Operations users review a queue of tasks such as refund review, shipment exception, or account verification. Permissions determine which routes and actions are available. Users can filter the queue, open a task, add an internal note, and perform allowed status transitions.

## MVP

1. Login simulation with at least two roles and a deterministic permission map.
2. Protected routes for queue, task detail, and audit history.
3. A Pinia store that owns authenticated identity and permission state.
4. URL-backed filters for task type, priority, assignee, and status.
5. Runtime validation for task-list and task-detail responses.
6. A status-transition form that prevents invalid transitions.
7. A note form with pending, success, and failure states.
8. Permission-aware navigation and action controls.
9. Unit tests for store rules and transition logic.
10. End-to-end coverage for login, denied navigation, filtering, and an allowed task update.

## Ownership Model

```text
session adapter
  -> authenticated identity
  -> Pinia permission state
  -> router guard and visible navigation

URL query
  -> queue criteria
  -> API request
  -> validated task data
  -> page and form state
```

Permissions must be represented as domain rules, not scattered string comparisons across templates.

## Suggested Structure

```text
vue-permission-operations-console/
├── package.json
├── vite.config.ts
├── src/
│   ├── main.ts
│   ├── app/
│   │   ├── App.vue
│   │   └── router.ts
│   ├── auth/
│   │   ├── permissionMap.ts
│   │   ├── sessionAdapter.ts
│   │   └── useAuthStore.ts
│   ├── operations/
│   │   ├── api/
│   │   │   ├── operationsClient.ts
│   │   │   └── validateOperationResponse.ts
│   │   ├── components/
│   │   │   ├── OperationFilters.vue
│   │   │   ├── OperationQueue.vue
│   │   │   └── StatusTransitionForm.vue
│   │   ├── domain/
│   │   │   └── operationTransitions.ts
│   │   └── routes/
│   │       ├── OperationsQueueRoute.vue
│   │       ├── OperationDetailRoute.vue
│   │       └── AuditHistoryRoute.vue
│   └── test/
│       └── mockServer.ts
├── tests/
│   ├── permissionMap.test.ts
│   ├── operationTransitions.test.ts
│   └── operationDetail.test.ts
└── e2e/
    └── operationsWorkflow.spec.ts
```

## Engineering Constraints

- Do not use route guards as the only authorization boundary; the UI must also derive permitted actions from the same permission model.
- Do not store URL filter state redundantly in Pinia.
- Do not trust API response types without runtime validation.
- Do not use `watch` for values that can be represented with `computed`.
- Do not mutate props or bypass emits for child-to-parent communication.
- Do not expose secrets or treat client-side permissions as server security.

## Quality Gates

The completed project should provide:

```bash
npm run lint
npm run format:check
npm run typecheck
npm run test:unit
npm run test:e2e
npm run build
```

Tests should verify permission rules and user-visible behavior independently.

## Out of Scope

- Real identity-provider integration.
- Server-enforced authorization in the MVP.
- Real-time WebSocket updates.
- File upload processing.
- A complete enterprise design system.
- Multi-tenant billing or organization management.

## Definition of Done

The project is complete when each role sees the correct routes and actions, invalid transitions are rejected by domain rules, URL filters are shareable, malformed API data produces a controlled error state, and the critical workflows pass automated checks.

## Extension Ideas

- Add optimistic task updates with rollback.
- Add localized date and number formatting.
- Add a production bundle report and performance budget.
- Replace the mock API with the contract-first feedback board API through an adapter.