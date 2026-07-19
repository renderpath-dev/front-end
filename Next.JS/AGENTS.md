# Next.js Learning Site Agent Instructions

## Project identity

- This is a Next.js and TypeScript learning project.
- It belongs to the local learning root `D:\next.js_learning`.
- The current scope is the docs-style learning site foundation and Chapter 1:
  Next.js positioning, project structure, and execution boundaries.

## Learning objective

- Do not optimize examples for visual design.
- Optimize examples for explainable execution boundaries.
- Every example must identify whether code runs on the server, in the browser, during build, during request handling, or on the deployment platform.
- Use Tailwind CSS utilities for the site shell and explain the underlying CSS
  meaning of representative layout utilities.

## Language rules

- Learning explanations may use Chinese in Markdown documentation.
- Source code, source-code comments, identifiers, file names, commands, package names, API names, environment variable names, and error messages must remain English.
- Source-code comments must not contain Chinese characters.

## Code style

- Prefer simple, explicit TypeScript.
- Avoid clever abstractions.
- Avoid unnecessary dependencies.
- Do not introduce UI libraries unless the task explicitly asks for them.
- Do not turn this project into a design demo.

## Next.js boundary rules

- `app/page.tsx` is a Server Component by default.
- Use `"use client"` only in files that need React state, effects, event handlers, or browser-only APIs.
- Keep Client Components as small and deep as possible.
- Do not read `window`, `document`, or `localStorage` in Server Components.
- Do not expose secrets with the `NEXT_PUBLIC_` prefix.
- Document whether a value is created at build time, request time, server runtime, or browser runtime.

## File change rules

- Do not delete learning documentation unless explicitly asked.
- Do not overwrite chapter guide files unless explicitly asked.
- Keep examples small and runnable.
- After editing, run type-check and build commands when they are available.

## Verification rules

- Report changed files.
- Report commands that were run.
- Report errors honestly.
- If a command was not run, mark it as `NOT RUN`, not `PASS`.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
