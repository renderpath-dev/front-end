# SellerHub Frontend Architecture Migration Plan

## Goal

Move from cross-feature imports and direct DTO rendering to feature public APIs, adapters, and governed shared modules without a full rewrite.

## Inventory

- Record deep imports between catalog, orders, checkout, and shared modules.
- Record DTO fields consumed directly by React components.
- Record duplicate buttons, formatters, error handlers, and permission checks.
- Classify each dependency as low, medium, or high risk.

## Compatibility Layer

- Publish public APIs while existing deep imports still work.
- Add DTO-to-domain adapters beside the existing request layer.
- Wrap legacy controls with token-driven primitive components.
- Keep old routes available while new feature entry points are verified.

## Migration Sequence

1. Migrate catalog reads through runtime validation and adapters.
2. Migrate orders imports to the feature public API.
3. Replace duplicate controls with reviewed primitives.
4. Add release flags with owners and cleanup dates.
5. Remove compatibility exports only after quality gates pass.

## Quality Gates

- Lint, typecheck, tests, and production build pass.
- Route performance samples stay within the approved budget.
- Accessibility and security review findings are resolved.
- Error events include release, route, and feature context without secrets.

## Rollback

- Restore the previous feature export for the affected route.
- Disable the release flag for migrated behavior.
- Route API data through the legacy mapper.
- Revert retirement commits independently from compatibility commits.

## Completion Criteria

- No application code deep-imports feature internals.
- React components consume view models instead of raw DTOs.
- Deprecated compatibility exports have no consumers.
- The final release checklist includes migration and rollback evidence.
