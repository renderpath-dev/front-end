# Source Policy

Use this policy when selecting sources for JavaScript, TypeScript, React, Node.js, Next.js, browser Web APIs, testing, tooling, package manager, deployment, or frontend engineering cheatsheets.

## Source Order

1. Inspect existing project files and local reference materials first.
2. If compressing an existing guide, inspect the guide before writing the cheatsheet.
3. Identify the official documentation needed for the current topic.
4. Use the latest official documentation available to Codex.
5. Cross-check framework, library, tool, runtime, package manager, and deployment platform version-sensitive information.
6. Do not rely only on model memory for React, Next.js, Node.js, TypeScript, testing tools, build tools, package managers, deployment platforms, browser APIs, or framework behavior.
7. Do not invent current APIs, default configs, framework behavior, runtime behavior, or deployment behavior.
8. If official documentation cannot be accessed, explicitly say which part could not be verified and add a `Verification Needed` note.
9. In the final response, list the local files and official documentation sources that were used.

## Preferred Official Sources

- JavaScript language and browser APIs: MDN Web Docs.
- TypeScript: TypeScript Handbook, TypeScript Reference, and TSConfig Reference.
- React: `react.dev`.
- Next.js: `nextjs.org/docs`.
- Node.js: `nodejs.org/api`.
- Vite: `vite.dev`.
- Testing: official documentation for the chosen testing library.
- Build tools, linters, package managers, and deployment platforms: official documentation for the tool already present in the repository or requested by the user.

## Local Reference Rules

- Use local books or existing learning guide files as reference material, but do not blindly copy them.
- If a local book or guide is outdated, explicitly mark the outdated part and replace it with current official documentation.
- When compressing a guide, preserve the guide's correct scope and terminology but reduce long explanations into accurate quick-reference entries.
- In the final response, state what was intentionally compressed.

## Uncertainty Rules

- If web access is unavailable or official documentation was not checked, say exactly which topic could not be verified.
- If a detail is likely version-sensitive and unverified, include a `Verification Needed` note in the cheatsheet.
- Prefer a narrow verified claim over a broad unverified claim.
