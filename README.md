# Web Engineering Learning Lab

A structured, long-term workspace for studying modern front-end engineering from JavaScript language fundamentals to production-oriented React and Vue application architecture.

This repository combines mechanism-focused documentation, runnable exercises, framework applications, testing workflows, and integrated projects. It is designed to preserve the reasoning behind the code—not only the final implementation.

## Repository Objectives

- Build a rigorous JavaScript and TypeScript foundation.
- Separate language syntax, runtime behavior, object-model behavior, and type-system behavior.
- Apply those foundations in React, Vue, browser, and Node.js environments.
- Practice maintainable architecture, runtime validation, accessibility, testing, performance, and deployment workflows.
- Turn isolated concepts into complete, reviewable engineering evidence.

## Learning Model

Each major topic follows the same progression:

```text
Concept and mechanism
  -> focused runnable example
  -> incorrect or contrasting case
  -> integrated chapter exercise
  -> quality verification
  -> review notes and reusable reference
```

The repository is therefore both a learning archive and an engineering practice environment. It is not intended to be a collection of disconnected tutorial snippets.

## Repository Structure

```text
Web-Engineering/
├── javascript/      # JavaScript language, runtime, Web API, and tooling studies
├── typescript/      # Type-system fundamentals and focused TypeScript exercises
├── react/           # Runnable React 19 + TypeScript learning application
├── vue/             # Runnable Vue 3 + TypeScript learning application
├── nodejs/          # Node.js runtime foundations for front-end engineering
└── mini-projects/   # Small independent features and integration exercises
```

| Workspace | Purpose | Execution model |
| --- | --- | --- |
| [`javascript/`](./javascript/) | Language fundamentals, objects, functions, modules, standard library, async behavior, metaprogramming, browser APIs, Node.js boundaries, and JSX/tooling topics | Individual examples and chapter-based learning guides |
| [`typescript/`](./typescript/) | Type-system foundations including narrowing, generics, object types, function types, and utility types | Focused TypeScript exercises |
| [`react/`](./react/) | React 19, TSX boundaries, state architecture, async data, routing, testing, performance, Next.js boundaries, production architecture, and the SellerHub capstone | Independent Vite application |
| [`vue/`](./vue/) | Vue 3, SFC compilation, reactivity, Router, Pinia, TypeScript boundaries, admin UI, API validation, testing, and production workflows | Independent Vite application |
| [`nodejs/`](./nodejs/) | Node.js runtime, modules, file-system, HTTP, package tooling, and server-side foundations | Focused runtime exercises |
| [`mini-projects/`](./mini-projects/) | Smaller projects that connect multiple concepts into usable features | Project-specific setup |

## Current Engineering Tracks

### JavaScript and TypeScript Foundations

The foundation tracks prioritize operational understanding over syntax memorization. Exercises and notes explain how values are stored, how scope and closures work, how property lookup reaches the prototype chain, how asynchronous work is scheduled, and where TypeScript stops at compile time.

### React + TypeScript

The React workspace is a runnable Vite application containing chapter documentation, focused TSX exercises, route-based practice areas, automated tests, and integrated applications. Its learning path extends from the React application boundary through React 19 features, performance, testing, Next.js server/client boundaries, production architecture, and portfolio evidence.

See [`react/README.md`](./react/README.md) for the current route map, chapter status, commands, and source policy.

### Vue + TypeScript

The Vue workspace is a runnable Vite application focused on Vue 3, Single-File Components, the reactivity system, composables, routing, Pinia, runtime-validated API boundaries, admin application patterns, testing, and production verification.

See [`vue/README.md`](./vue/README.md) for the current chapter map, commands, and source policy.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/renderpath-dev/Web-Engineering.git
cd Web-Engineering
```

The root is a multi-workspace repository, not a single installable package. Install and run dependencies inside the framework workspace you are studying.

### React workspace

```bash
cd react
npm install
npm run dev
```

Primary verification commands:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

### Vue workspace

```bash
cd vue
npm install
npm run dev
```

Primary verification commands:

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
npm run build
```

The Vue workspace also provides combined local and production verification scripts. Check its `package.json` and workspace README before running the full pipeline.

## Tooling

The runnable framework workspaces use modern front-end tooling, including:

- TypeScript
- Vite
- ESLint
- Vitest
- Testing Library
- Mock Service Worker
- React Router in the React workspace
- Vue Router and Pinia in the Vue workspace
- Playwright, Prettier, and production verification scripts in the Vue workspace

Dependency versions and available scripts are workspace-specific. The relevant `package.json` is the source of truth.

## Quality Gates

A change is not considered complete merely because it renders in the browser. Where the workspace supports them, changes should pass these independent gates:

```text
lint
  -> static type checking
  -> unit or component tests
  -> end-to-end tests when applicable
  -> production build
  -> workspace-specific verification
```

These gates validate different properties and should not be treated as interchangeable:

- **Linting** checks configured code-quality and framework rules.
- **Type checking** validates static contracts without proving runtime data correctness.
- **Tests** validate selected behavior and regressions.
- **Builds** validate production compilation and bundling.
- **Runtime validation** protects untrusted external data at execution time.

## Documentation Standards

Documentation in this repository should be usable as a learning and review artifact.

1. Explain the problem before introducing an API or abstraction.
2. Distinguish syntax, JavaScript runtime behavior, object-model behavior, TypeScript type-system behavior, framework behavior, and platform APIs.
3. Use concrete file names and commands that match the repository.
4. Keep code identifiers and code comments in English.
5. Explain non-trivial examples through execution order, stored values, state transitions, and output.
6. Include contrasting or incorrect cases when they clarify a language rule.
7. Prefer official framework and language documentation when reference material conflicts.
8. Keep generated files, dependencies, secrets, and local-only reference material out of version control.

## Source Organization Conventions

Runnable framework workspaces generally follow this separation:

```text
docs/                 # Detailed learning guides and architecture documents
src/learning/         # Runnable chapter exercises and integrated labs
src/                   # Application entry points and shared runtime code
references/            # Supporting source material; some files may be local-only
```

Detailed explanations belong in documentation. Runnable examples should remain focused enough that their behavior can be inspected and tested without unrelated complexity.

## Naming Conventions

Use descriptive English names that identify the concept, boundary, or feature under study.

Preferred:

```text
prototypeLookup.js
requestStateReducer.ts
runtimeResponseValidator.ts
controlledCheckoutForm.tsx
useProductCatalog.ts
```

Avoid names that hide intent:

```text
1.js
test.js
demo.ts
new-file.tsx
temp.vue
```

Directory naming may preserve existing chapter conventions. Do not rename established learning paths only to enforce a new style.

## Change and Commit Discipline

Keep commits narrow enough to review as one coherent learning or engineering step.

Recommended Conventional Commit-style examples:

```text
docs: explain JavaScript prototype lookup
feat(react): add runtime-validated catalog request flow
test(vue): cover permission-aware navigation
refactor(typescript): separate DTO and domain models
fix(nodejs): handle stream error propagation
```

Before committing a framework change:

1. Confirm that documentation and runnable code describe the same behavior.
2. Run the quality gates supported by that workspace.
3. Avoid committing `node_modules`, build output, editor state, secrets, or local reference PDFs.
4. Update the workspace README when routes, scripts, chapter status, or project structure changes.

## Reference Policy

Current official documentation is the primary authority for language and framework behavior. Books, local PDFs, existing notes, and third-party tutorials are supporting sources.

When sources conflict:

```text
official current documentation
  -> current repository behavior and tests
  -> maintained secondary references
  -> older books or archived tutorial material
```

Outdated material may still be useful for historical context, but it should not silently define current implementation decisions.

## Scope

This repository documents the learning and engineering process. Larger deployable portfolio products may live here as capstones or move into dedicated repositories when they require independent release history, infrastructure, issue tracking, and deployment ownership.

## Long-Term Goal

Develop the ability to design, implement, test, explain, and ship modern front-end systems independently—from JavaScript runtime fundamentals through typed framework architecture and full production workflows.