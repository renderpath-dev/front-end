# Frontend Framework Documentation Policy

Use this policy when selecting sources for JavaScript, TypeScript, React, Node.js, Next.js, frontend framework, testing, tooling, or browser API learning guides.

## Source Order

1. Before writing any framework, library, tool, runtime, or version-sensitive content, inspect the relevant local reference files first.
2. Then use the latest official documentation available to Codex.
3. Do not rely only on model memory for React, Next.js, Node.js, TypeScript, testing tools, build tools, package managers, or deployment platforms.
4. If official documentation cannot be accessed, explicitly say which part could not be verified and add a `Verification Needed` note.
5. In the final response, list the local files and official documentation sources that were used.
6. Inspect existing project files and local reference materials before external sources.
7. Identify the official documentation needed for the current chapter.
8. Cross-check framework version-sensitive behavior against official documentation.
9. Use local books or existing learning files as reference material, but do not blindly copy them.
10. If a local book or guide is outdated, mark what is outdated and replace that part with current official documentation.
11. If uncertainty remains, state it in the guide as `Verification Needed`.

## Preferred Official Sources

- JavaScript language and browser APIs: MDN Web Docs.
- TypeScript: TypeScript Handbook, TypeScript Reference, and TSConfig Reference.
- React: `react.dev`.
- Next.js: `nextjs.org/docs`.
- Node.js: `nodejs.org/api`.
- Vite: `vite.dev`.
- Testing: official documentation for the chosen testing library.
- Build tools and linters: official documentation for the tool already present in the repository.

## Version-Sensitive Checks

Verify current behavior before writing definitive claims about:

- React rendering behavior, hooks rules, Server Components, and framework-specific React integrations.
- Next.js routing, caching, rendering modes, Server Actions, metadata, middleware, route handlers, and deployment behavior.
- TypeScript compiler options, strictness behavior, module resolution, emitted JavaScript, and JSX emit settings.
- Node.js ESM/CommonJS behavior, runtime APIs, fetch support, test runner behavior, and version-specific APIs.
- Vite configuration, plugin behavior, dev server behavior, and build output.
- Testing library APIs, default environment, async utilities, and runner configuration.

## Citation and Uncertainty Rules

- In the final response, list the local files and official documentation sources that were used.
- In the guide, include an official documentation reading list.
- Do not invent current APIs, default configs, framework behavior, or deployment behavior.
- If official documentation cannot be accessed or was not checked, say exactly which part could not be verified.
- If a detail is likely version-sensitive and unverified, include a `Verification Needed` note in the guide.
