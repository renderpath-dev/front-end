# ADR-016: SellerHub Local Capstone Architecture

## Status

Accepted for the React learning workspace.

## Context

The capstone must integrate the React learning path without adding dependencies or
pretending that a local Vite application is a production full-stack system.

## Decisions

### Declarative Client Routing

Use the installed React Router declarative APIs. `BrowserRouter` owns browser history,
`Routes` selects the matching branch, and nested routes render through `Outlet`.
Catalog search parameters remain URL state.

### Runtime Contract Boundary

The mock gateway returns `unknown`. DTO assertion functions validate runtime values.
Adapters then translate DTO naming and values into feature-facing view models.
TypeScript types alone are not treated as runtime validation.

### State Ownership

- URL: catalog query, status, and sort
- Feature component: request lifecycle and controlled form fields
- App Context: locale, role, release metadata, feature flags, reporter, and shared cart
- Reducer: cart transitions
- Derived render values: filtered products and cart totals
- Browser storage: best-effort local cart persistence only

### Design System Boundary

Reusable button, field, status tabs, and tokens live in `design-system`. Feature modules
consume primitives but primitives do not import feature code.

### Mutation Strategy

Checkout uses an action-like async event handler with explicit pending and result states.
Seller orders use an optimistic local projection, then confirm or roll back from the mock
gateway result. The capstone does not claim a server Action or transactional backend.

### Test Strategy

Pure contract and reducer logic receive unit tests. Checkout receives a component behavior
test. The routed application receives an integration test through `MemoryRouter`.

## Alternatives

- A single dashboard component was rejected because it hides ownership and dependency
  direction.
- Direct DTO rendering was rejected because TypeScript does not validate runtime values.
- A global state library was rejected because the installed React reducer and Context
  capabilities cover this local scope.
- Real backend, auth, payment, monitoring, and feature-flag services were rejected because
  they exceed the chapter boundary and would require new dependencies or infrastructure.

## Consequences

- Runtime trust boundaries are visible and testable.
- The capstone is runnable without external services.
- Browser refresh persistence is local and non-authoritative.
- Real authorization, payment, durability, and deployment remain explicit future work.

## Testing and Quality Implications

Contract guards and reducer transitions are tested as pure logic. Checkout is tested
through labels, roles, and visible feedback. Routing is tested through a user journey.
Lint, typecheck, tests, and build remain separate release gates because each detects a
different class of failure.

## Rollback and Migration Notes

The Chapter 16 app is mounted through one lazy entry. A rollback removes that mount and
the isolated Chapter 16 directory. A future real API can replace the mock gateway while
preserving DTO guards, adapters, feature public APIs, and page-facing view models.
