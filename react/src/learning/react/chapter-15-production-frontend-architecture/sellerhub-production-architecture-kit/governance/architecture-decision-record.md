# ADR-001: Feature Public APIs and Design System Boundary

## Status

Accepted

## Context

SellerHub needs catalog and orders features that can evolve without exposing internal files. Shared UI must remain free of product-specific requests and permissions.

## Decision

Each feature publishes a small public API. Product features may depend on shared contracts and design-system primitives. Shared modules must not import product features.

## Alternatives

- Keep a technical folder structure and allow deep imports.
- Place all reusable code in a global shared directory.
- Create package workspaces before module ownership is stable.

## Consequences

- Consumers have fewer supported import paths.
- Internal feature refactors do not require application-wide changes.
- Public API changes require explicit migration notes.
- Dependency direction must be checked during review.

## Follow-up

- Add import-boundary automation when the repository needs it.
- Review feature exports before each release.
- Supersede this ADR if the project later adopts package workspaces.
