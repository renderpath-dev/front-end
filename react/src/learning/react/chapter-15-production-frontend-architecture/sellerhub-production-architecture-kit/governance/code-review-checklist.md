# SellerHub Frontend Code Review Checklist

## Component and State

- [ ] Component responsibility is narrow and named clearly.
- [ ] State owner is the lowest common owner that needs the value.
- [ ] Derived values are calculated instead of duplicated in state.
- [ ] Effects synchronize external systems and are not used for ordinary calculations.

## Boundaries

- [ ] Feature consumers import from the public API.
- [ ] Shared modules do not import business features.
- [ ] Network DTOs pass runtime validation before adaptation.
- [ ] UI permission checks are not described as server authorization.

## User Experience

- [ ] Interactive controls have accessible names and keyboard behavior.
- [ ] Loading, error, empty, success, and disabled states are explicit.
- [ ] Locale-sensitive numbers, dates, and currency use approved formatters.

## Quality and Risk

- [ ] Tests cover the changed business behavior and failure path.
- [ ] Performance evidence exists for route-cost changes.
- [ ] Logs exclude tokens, passwords, and direct session identifiers.
- [ ] Unsafe HTML and external links pass security review.
- [ ] Feature flags have an owner and cleanup date.
- [ ] Rollback steps are documented before release approval.
