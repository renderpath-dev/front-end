# Node.js Source Policy

Use this policy for Node.js, backend JavaScript, server-side TypeScript, packages, tooling, frameworks, tests, security, publishing, CI, and deployment topics.

## Contents

- Required source order
- Required local inspection
- GitHub quality baseline
- Preferred official sources
- MDN and Web Standards
- Version-sensitive checks
- Citation and uncertainty rules

## Required Source Order

1. Inspect local files in `D:\node.js` first to establish real structure, configuration, versions, scripts, examples, and the learner's current path.
2. Read the existing writer files from `renderpath-dev/front-end` as the quality and presentation baseline.
3. Use local uploaded references, books, `nodebook`, existing guides, and cheatsheets when relevant.
4. Verify factual and version-sensitive claims with the latest applicable official documentation.
5. Never use model memory as the only source for version-sensitive behavior.

This order governs investigation. When technical sources conflict, current official documentation for the actual installed or targeted version is authoritative. Treat the GitHub writer files as quality rules, not Node.js API authority. Treat local books and older notes as supporting material and mark outdated content explicitly.

## Required Local Inspection

Read the nearest applicable `AGENTS.md` or filename case variant. Then inspect relevant:

- `README.md`
- `package.json` and lockfiles
- `tsconfig*.json`
- ESLint and Prettier configuration
- runtime version files
- source and test files
- existing learning guides and cheatsheets
- roadmaps and chapter indexes
- CI and deployment configuration

Verify file existence before presenting a path as real. Use `Snippet:` or `Template:` when an example does not correspond to a verified local file.

## GitHub Quality Baseline

Fetch these paths read-only from `renderpath-dev/front-end` when available:

- `react/.agents/skills/frontend-learning-guide-writer/SKILL.md`
- `react/.agents/skills/frontend-learning-guide-writer/references/learning-guide-standard.md`
- `react/.agents/skills/frontend-learning-guide-writer/references/frontend-framework-doc-policy.md`
- `react/.agents/skills/frontend-learning-guide-writer/references/output-checklist.md`
- `react/.agents/skills/frontend-learning-guide-writer/assets/macos-code-window-template.md`
- `react/.agents/skills/frontend-cheatsheet-writer/SKILL.md`

Use them for explanation quality, stable anchors, code-location rules, real-file verification, code-window presentation, evidence-based self-checks, and the guide-versus-cheatsheet boundary. Do not modify remote files, create branches, create commits, or create pull requests.

If these files cannot be fetched, use the bundled Node-specific rules and add `Verification Needed` to the final response for the unavailable comparison.

## Preferred Official Sources

### Node.js

- API documentation: https://nodejs.org/api/
- Learn documentation: https://nodejs.org/learn
- CommonJS modules: https://nodejs.org/api/modules.html
- ECMAScript modules: https://nodejs.org/api/esm.html
- Packages and `package.json` fields: https://nodejs.org/api/packages.html
- Test runner: https://nodejs.org/api/test.html
- TypeScript and native type stripping: https://nodejs.org/api/typescript.html

Use the documentation matching the target Node.js major version when behavior differs. Consult the applicable API pages for HTTP, HTTPS, filesystem, paths, URLs, streams, events, process, child processes, workers, tests, assertions, crypto, Buffer, timers, OS, networking, DNS, diagnostics, permissions, and Fetch-compatible globals.

### npm

- npm Docs: https://docs.npmjs.com/
- `package.json`: https://docs.npmjs.com/cli/v11/configuring-npm/package-json
- scripts: https://docs.npmjs.com/cli/v11/using-npm/scripts
- audit: https://docs.npmjs.com/cli/v11/commands/npm-audit
- workspaces: https://docs.npmjs.com/cli/v11/using-npm/workspaces
- `npm ci`: https://docs.npmjs.com/cli/v11/commands/npm-ci
- `npm install`: https://docs.npmjs.com/cli/v11/commands/npm-install
- `npm run`: https://docs.npmjs.com/cli/v11/commands/npm-run
- `npm publish`: https://docs.npmjs.com/cli/v11/commands/npm-publish

Prefer the documentation version matching the installed npm CLI. Recheck authentication, registry, access, package contents, provenance, lifecycle scripts, and publish behavior immediately before documenting or performing a publish workflow.

### TypeScript

- Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- TSConfig Reference: https://www.typescriptlang.org/tsconfig/
- Modules reference: https://www.typescriptlang.org/docs/handbook/modules/reference.html
- Module resolution: https://www.typescriptlang.org/docs/handbook/modules/reference.html#the-moduleresolution-compiler-option

Use Node.js TypeScript documentation together with TypeScript documentation. Distinguish native type stripping, third-party runners, `tsc --noEmit`, transpilation, emitted JavaScript, and runtime execution.

### Tooling

- ESLint: https://eslint.org/docs/latest/
- Prettier: https://prettier.io/docs/

Use the official CLI and configuration documentation for the tool and version actually present. Do not infer configuration format from another project.

### Backend frameworks

- Express: https://expressjs.com/
- Express routing: https://expressjs.com/en/guide/routing.html
- Express middleware: https://expressjs.com/en/guide/using-middleware.html
- Express error handling: https://expressjs.com/en/guide/error-handling.html
- Express request/response API: https://expressjs.com/en/api.html
- Fastify: https://fastify.dev/docs/latest/
- Fastify routes: https://fastify.dev/docs/latest/Reference/Routes/
- Fastify schemas: https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/
- Fastify plugins: https://fastify.dev/docs/latest/Reference/Plugins/
- Fastify hooks: https://fastify.dev/docs/latest/Reference/Hooks/
- Fastify encapsulation: https://fastify.dev/docs/latest/Reference/Encapsulation/
- Fastify TypeScript: https://fastify.dev/docs/latest/Reference/TypeScript/
- NestJS: https://docs.nestjs.com/
- NestJS controllers: https://docs.nestjs.com/controllers
- NestJS modules: https://docs.nestjs.com/modules
- NestJS providers: https://docs.nestjs.com/providers
- Hono: https://hono.dev/docs/
- Hono getting started: https://hono.dev/docs/getting-started/basic

For Express, verify routing, middleware, error propagation, and request/response lifecycle. For Fastify, verify routing, schemas, plugins, hooks, encapsulation, replies, and TypeScript. For NestJS, verify the architecture feature in scope and the selected HTTP adapter. For Hono, verify Web Standards behavior, Fetch-style handlers, runtime adapters, edge compatibility, and multi-runtime constraints.

### Other systems

Use official documentation for every selected database, ORM, query builder, validation library, authentication system, security control, testing tool, logging or observability system, deployment platform, container runtime, and CI provider. Do not introduce a system only because it is popular.

## MDN and Web Standards

Use MDN when JavaScript language behavior or a Web-standard API is involved, including Fetch, URL, streams, AbortController, Web Crypto, and related globals. Confirm Node.js support and Node-specific differences in Node.js documentation.

## Version-Sensitive Checks

Verify current behavior before making definitive claims about:

- Node.js release status and API stability.
- event-loop ordering and timer behavior.
- CommonJS/ESM loading, package fields, conditions, extension rules, and interop.
- native TypeScript execution and type stripping.
- Fetch-compatible globals and Web APIs.
- the Node.js test runner, mocks, snapshots, coverage, and watch behavior.
- npm install, lockfile, workspace, audit, lifecycle, and publish behavior.
- framework error propagation, request lifecycle, plugin or middleware behavior, and TypeScript support.
- security, permissions, deployment, runtime limits, and CI behavior.

## Citation and Uncertainty Rules

Record:

- local files inspected
- GitHub baseline files inspected
- runtime, package-manager, TypeScript, and framework versions when relevant
- official pages consulted
- access failures and unresolved version questions
- claims that remain `UNKNOWN`

If official documentation cannot be accessed, add a visible `Verification Needed` note near the affected claim and list the limitation in the final response. Never silently convert an unverified claim into `PASS`.
