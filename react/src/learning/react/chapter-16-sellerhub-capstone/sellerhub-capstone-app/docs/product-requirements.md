# SellerHub Capstone Product Requirements

## Problem Statement

The React learning path needs one coherent feature slice that proves product delivery,
runtime boundaries, tests, and review evidence rather than another isolated API demo.

## Product Goal

Deliver a reviewable local frontend slice that demonstrates how a buyer discovers a
product, manages a cart, submits checkout details, and how a seller reviews order status.

## Target Users

- Buyers who browse a local product catalog and prepare a checkout intent
- Sellers who review and update local order status
- Reviewers who inspect architecture, operations, tests, and portfolio evidence

## Primary User Journeys

1. A buyer opens the catalog, searches, filters, sorts, and shares the resulting URL.
2. A buyer opens a product detail route and sees loading, success, not-found, or error UI.
3. A buyer adds products to a cart, changes quantities, and sees derived totals.
4. A buyer submits controlled checkout fields and receives validation, pending, known
   error, or success feedback.
5. A seller filters orders and performs a permission-gated optimistic status update.
6. A reviewer opens operations and evidence routes to inspect release claims.

## Functional Requirements

- Route catalog, product detail, cart, checkout, seller orders, operations, and evidence.
- Keep catalog search, status, and sort in URL search parameters.
- Validate unknown mock responses and adapt DTOs before rendering.
- Support cart transitions, checkout feedback, and seller order status changes.
- Expose locale, role, feature flags, release metadata, and normalized error evidence.

## Non-Functional Requirements

- Use accessible labels, visible focus, and keyboard-operable status tabs.
- Keep feature dependencies behind public API modules.
- Keep reducers and adapters deterministic enough for narrow unit tests.
- Pass lint, typecheck, test, and production build gates.
- State local mock and non-production limitations without exaggeration.

## Acceptance Criteria

- Catalog `query`, `status`, and `sort` criteria are encoded in URL search parameters.
- Unknown mock responses are validated before adapters create view models.
- Cart updates are represented by exhaustive reducer actions.
- Cart totals are derived from cart lines and are not stored as independent state.
- Checkout blocks invalid values before invoking the mock gateway.
- `blocked@example.com` produces a known checkout conflict without clearing the cart.
- Seller order actions require the `seller` role and the release feature flag.
- Optimistic order status rolls back when the mock mutation fails.
- Operations exposes performance budgets, security boundaries, and normalized errors.
- Tests cover the adapter, reducer, checkout behavior, and an integrated route journey.

## Out of Scope

- Real authentication or server-side authorization
- Real payment collection
- Backend persistence or database access
- Production analytics, monitoring, alerting, or deployment
- Next.js migration or server rendering

## Mock Boundary

This capstone is a deterministic local frontend simulation. Mock gateway responses run in
the browser process. They are not a security boundary and do not prove production
availability, durability, or authorization.
