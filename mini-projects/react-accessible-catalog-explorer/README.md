# React Accessible Catalog Explorer

## Status

Planned. This directory currently contains the project brief only.

## Purpose

Build an independent React + TypeScript product catalog that demonstrates route-driven state, explicit request lifecycles, runtime-validated data, accessible interactions, and behavior-focused tests.

This project is intentionally smaller than the SellerHub capstone. It should prove that the React concepts learned in the main workspace can be transferred into a clean project without copying the capstone architecture wholesale.

## Repository Learning Mapping

This project validates concepts from:

- React component and props boundaries.
- Controlled search and filter inputs.
- URL search parameters as shareable application state.
- Reducer-based async request state.
- Derived filtering, sorting, and pagination.
- Runtime response validation before state updates.
- Accessible loading, error, empty, and success states.
- React Testing Library, user-event, and MSW.
- Memoization only after measured or observable need.

## Product Scenario

Users browse a catalog, search by keyword, filter by category and stock status, choose a sort order, and open a product detail route. Filters must survive refresh and be shareable through the URL.

## MVP

1. A catalog route with URL-backed search, category, stock, sort, and page criteria.
2. A product detail route with a missing-product state.
3. Explicit idle, pending, success, empty, and error request states.
4. Runtime validation of mock API responses before rendering.
5. Abort handling or obsolete-result protection when criteria changes quickly.
6. Keyboard-accessible controls and visible labels.
7. Focus management for route or error transitions where needed.
8. MSW-backed tests for success, empty, malformed response, network error, and rapid criteria changes.

## State Ownership Model

```text
URL search parameters
  -> committed catalog criteria
  -> request owner
  -> runtime-validated response
  -> reducer request state
  -> derived visible products
  -> accessible UI states
```

Temporary text being edited may remain local component state until the user submits or commits it to the URL.

## Suggested Structure

```text
react-accessible-catalog-explorer/
├── package.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx
│   │   └── router.tsx
│   ├── catalog/
│   │   ├── api/
│   │   │   ├── fetchProducts.ts
│   │   │   └── validateProductResponse.ts
│   │   ├── components/
│   │   │   ├── CatalogFilters.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── RequestStatePanel.tsx
│   │   ├── hooks/
│   │   │   └── useCatalogRequest.ts
│   │   ├── state/
│   │   │   └── catalogRequestReducer.ts
│   │   └── routes/
│   │       ├── CatalogRoute.tsx
│   │       └── ProductDetailRoute.tsx
│   └── test/
│       ├── handlers.ts
│       └── server.ts
└── tests/
    ├── catalogRoute.test.tsx
    └── productDetailRoute.test.tsx
```

## Engineering Constraints

- Do not duplicate URL criteria in Context or global state.
- Do not treat TypeScript interfaces as runtime response validation.
- Do not fetch directly inside presentation-only components.
- Do not use an effect to derive filtered or sorted arrays from existing state.
- Do not memoize every callback or computed value by default.
- Do not use array indexes as product keys.
- Loading indicators must have accessible status semantics without causing noisy announcements.

## Quality Gates

The completed project should provide:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Tests should interact through labels, roles, visible text, and navigation behavior rather than internal component state.

## Out of Scope

- Authentication and authorization.
- Seller workflows, checkout, payments, or inventory mutation.
- A design-system package.
- Server rendering or a Next.js migration.
- Premature virtualization or complex caching libraries.

## Definition of Done

The MVP is complete when a reviewer can copy a filtered URL into a fresh tab, reproduce the same catalog state, observe all request branches, navigate by keyboard, and verify the critical behavior through automated tests.

## Extension Ideas

- Add a measured code-splitting boundary for product details.
- Add a comparison drawer while preserving URL ownership rules.
- Record React Profiler evidence before introducing memoization.
- Add a Next.js implementation as a separate comparison project, not as an in-place rewrite.