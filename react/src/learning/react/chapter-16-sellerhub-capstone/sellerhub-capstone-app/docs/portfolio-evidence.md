# SellerHub Capstone Portfolio Evidence

## What This Capstone Demonstrates

It demonstrates how requirements, routes, runtime data, state ownership, accessibility,
tests, and release evidence work together in one local React feature slice.

## Technical Scope

React 19 components, reducer and Context state, React Router URL state, runtime DTO guards,
TypeScript view models, controlled forms, mock async mutation, design-system primitives,
locale formatting, observability context, budgets, security findings, and Vitest behavior
tests.

## Product Flows

SellerHub connects a buyer catalog and checkout journey with a seller order workflow.
It also exposes operations and documentation routes so a reviewer can inspect engineering
claims instead of inferring them from screenshots.

## Architecture Evidence

| Claim | Evidence |
| --- | --- |
| Shareable catalog criteria | `features/catalog/catalog-page.tsx` and router integration test |
| Runtime-safe DTO boundary | `shared/api/sellerhub-dto-contract.ts` and adapter unit test |
| Explicit cart transitions | `features/cart/cart-model.ts` and reducer unit test |
| Controlled checkout lifecycle | `features/checkout/checkout-form.tsx` and behavior test |
| Permission-gated mutation | `features/orders/seller-orders-page.tsx` |
| Accessible reusable controls | `design-system/field.tsx` and `design-system/status-tabs.tsx` |
| Operational boundaries | `features/operations/operations-page.tsx` |
| Reviewable decisions | This document, the ADR, requirements, and release checklist |

## Testing Evidence

- Adapter unit tests prove runtime validation precedes DTO adaptation.
- Cart unit tests prove immutable transitions, totals, and the storage contract.
- Checkout behavior tests prove validation, known conflict, and success feedback.
- The integration test proves route navigation, URL filtering, and error reporting.

## Quality Gates

The delivery requires separate lint, typecheck, test, and production build results. A
green build alone does not prove lint rules, TypeScript contracts, or user behavior.

## Engineering Tradeoffs

- Declarative routing is sufficient because the mock gateway owns its own lifecycle.
- Context carries cross-route app services and cart state, while URL and feature state
  remain in their narrower owners.
- The mock gateway avoids network instability but cannot prove HTTP, backend, or database
  behavior.
- Action-like async handlers make pending and rollback explicit without claiming server
  Actions.

## Honest Limitations

This project does not include real identity, server authorization, payment processing,
durable storage, production monitoring, field performance data, deployment configuration,
or incident response. Those are documented roadmap prerequisites, not completed features.

## How This Becomes a Real Full-Stack Project

1. Define and review a real HTTP or framework contract.
2. Replace the mock gateway without bypassing DTO guards and adapters.
3. Add server-owned identity, authorization, validation, persistence, and audit events.
4. Integrate a compliant payment boundary without exposing sensitive fields to this UI.
5. Add deployment, field telemetry, alerting, and rollback automation with verified owners.

## Resume Bullet Candidates

- Built a local React and TypeScript commerce capstone with routed catalog, cart, checkout,
  seller order workflows, runtime DTO validation, and behavior tests.
- Designed feature public APIs, reducer and Context ownership, accessible primitives, and
  reviewable ADR and release evidence for a non-production SellerHub simulation.
- Verified the local project with lint, TypeScript, Vitest, and Vite build gates without
  claiming real backend, payment, authentication, deployment, or production monitoring.
