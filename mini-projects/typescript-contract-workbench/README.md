# TypeScript Contract Workbench

## Status

Planned. This directory currently contains the project brief only.

## Purpose

Build a framework-independent TypeScript application that receives unknown JSON input, validates it at runtime, converts valid data into domain models, and displays precise validation failures for invalid data.

The project exists to prove an important boundary: TypeScript can check code that manipulates values, but it cannot guarantee that data arriving from JSON, storage, a network response, or another process is valid at runtime.

## Repository Learning Mapping

This project validates concepts from:

- `unknown`, narrowing, and user-defined type guards.
- Object types, readonly data, and exact domain boundaries.
- Discriminated unions for success and failure results.
- Generic functions and endpoint-style contract maps.
- Utility types used to derive input and output shapes.
- Type erasure and the difference between compile-time and runtime checks.

## Product Scenario

The workbench accepts sample product, user, and order payloads. A user can choose a payload, edit its JSON text, run validation, and inspect either:

- a normalized typed domain object; or
- a structured list of validation issues containing path, expected value, received value, and message.

## MVP

1. A JSON editor or text input with predefined valid and invalid payloads.
2. Runtime validators for three related entities.
3. A reusable `ValidationResult<T>` discriminated union.
4. Nested-path error reporting for arrays and objects.
5. A normalization step that is separate from validation.
6. A typed contract registry that maps a contract name to its validator and output type.
7. Tests for valid payloads, missing properties, wrong primitive types, invalid array elements, and malformed JSON.

## Core Type Boundary

```text
JSON text
  -> JSON.parse()
  -> unknown
  -> runtime validator
  -> ValidationResult<T>
  -> normalized domain model or structured issues
```

No value may enter the domain layer through an unchecked type assertion.

## Suggested Structure

```text
typescript-contract-workbench/
├── package.json
├── tsconfig.json
├── src/
│   ├── main.ts
│   ├── contracts/
│   │   ├── contractRegistry.ts
│   │   ├── productContract.ts
│   │   ├── userContract.ts
│   │   └── orderContract.ts
│   ├── validation/
│   │   ├── validationIssue.ts
│   │   ├── validationResult.ts
│   │   └── primitiveValidators.ts
│   ├── domain/
│   │   ├── product.ts
│   │   ├── user.ts
│   │   └── order.ts
│   └── samples/
│       └── payloadSamples.ts
└── tests/
    ├── productContract.test.ts
    ├── orderContract.test.ts
    └── contractRegistry.test.ts
```

## Engineering Constraints

- Treat parsed JSON as `unknown`.
- Do not use `as Product`, `as User`, or equivalent assertions to bypass validation.
- Keep validation, normalization, and presentation as separate responsibilities.
- Return structured failures instead of throwing for ordinary invalid payloads.
- Use exhaustive checks for discriminated unions.
- Do not duplicate domain types solely to satisfy individual UI components.

## Quality Gates

The project should provide:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Type tests or `@ts-expect-error` examples may be added for compile-time-only rules, but they do not replace runtime validator tests.

## Out of Scope

- Building a production schema-validation library.
- Generating OpenAPI or JSON Schema in the MVP.
- Persisting payloads to a database.
- Supporting arbitrary recursive schemas.
- Hiding validation failures behind broad `catch` blocks.

## Definition of Done

The project is complete when every domain object can only be created after successful runtime validation, invalid nested data produces precise issue paths, and both compile-time and runtime failure cases are covered by reproducible checks.

## Extension Ideas

- Compare handwritten validators with Zod in a separate adapter.
- Export validation issues as JSON.
- Add versioned contracts and migration functions.
- Generate a small API client from the typed contract registry.