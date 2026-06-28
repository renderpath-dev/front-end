# SellerHub Capstone Release Checklist

## Automated Gates

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run test`
- [ ] `npm run build`

## Contract and State Checks

- [ ] Invalid product DTOs fail before adaptation.
- [ ] Every cart action is handled exhaustively.
- [ ] Cart totals are derived from line values.
- [ ] Checkout validation prevents invalid submission.
- [ ] Known checkout conflict preserves actionable feedback.
- [ ] Seller order failure restores the confirmed order state.

## Route Smoke Checks

- [ ] `/react/chapter-16/catalog` renders the catalog.
- [ ] Catalog controls update URL search parameters.
- [ ] A product detail link reaches a product route.
- [ ] Cart and checkout routes preserve shared cart state.
- [ ] Seller orders respect role and feature-flag boundaries.
- [ ] Operations can record a normalized local smoke event.
- [ ] Evidence lists all four review documents.

## Accessibility Checks

- [ ] Every form control has an accessible label.
- [ ] Status tabs expose tab roles and keyboard navigation.
- [ ] Pending and error feedback uses appropriate live semantics.
- [ ] Focus indicators remain visible.
- [ ] Content remains usable at a narrow viewport.

## Operational Review

- [ ] Route-level performance budgets pass their evaluator.
- [ ] Security findings cover external links, unsafe HTML, token storage, and logging.
- [ ] Observability events contain route, feature, release, and privacy context.
- [ ] Feature flags have an owner, test path, and cleanup decision.

## Honest Boundary Checks

- [ ] UI states that the gateway is local and non-production.
- [ ] No real credentials, tokens, payment fields, or personal data are present.
- [ ] Documentation does not claim server authorization or durable persistence.
- [ ] Performance values are documented local budgets, not field telemetry.

## Rollback Plan

The capstone is isolated under the Chapter 16 source root and mounted through one lazy
entry in `src/App.tsx`. Rollback removes that mount and the Chapter 16 files without
changing dependencies or earlier chapter behavior.

## Feature Flag Cleanup

Remove `sellerOrderMutation` when the rollout decision is permanent. Until then, test both
enabled and disabled behavior and keep server authorization independent from the UI flag.
