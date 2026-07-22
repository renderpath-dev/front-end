---
name: nextjs-learning-site-builder
description: Build or extend the local docs-style Next.js learning site, including its Tailwind CSS shell, chapter routes, sidebar, table of contents, chapter cards, execution-boundary UI, and integration of existing learning documents. Use when work targets the site experience rather than writing a new chapter guide.
---

# Next.js Learning Site Builder

## Purpose

Build the local docs-style learning website in `D:\next.js_learning`.

Present existing chapter guides without rewriting them. Make Next.js mechanisms visible, especially routing, rendering phases, Server and Client Component boundaries, Route Handlers, and runtime ownership. Use Tailwind CSS for styling while explaining the underlying CSS meaning of important utilities.

## Required Reading

Before editing:

1. Read the closest `AGENTS.md`.
2. Inspect the current site files, content modules, learning documents, scripts, and package versions.
3. Read the relevant installed Next.js guide in `node_modules/next/dist/docs/`.
4. Check the current official Next.js and Tailwind CSS documentation for APIs or setup that may have changed.
5. Preserve existing chapter documents and use them as source material.

## Scope

Use this skill for:

- docs-style site shells;
- Tailwind CSS setup and utility-first styling;
- landing pages, chapter indexes, and chapter routes;
- sidebars, mobile navigation, tables of contents, cards, badges, and code windows;
- structured TypeScript content that points to existing learning documents;
- explicit build-time, request-time, server-runtime, browser-runtime, and platform boundaries.

Do not use this skill to write or substantially rewrite a chapter guide. Use the guide-writer skill for that work.

Do not add authentication, databases, CMSs, Algolia, command palettes, MDX, syntax-highlighting dependencies, animation libraries, deployment configuration, analytics, or UI libraries unless the user explicitly requests them.

Create an original docs-inspired interface. Do not clone another site pixel-for-pixel or copy its brand assets, trademarks, or branded copy.

## Experience Enhancement Mode

Use this mode only when the user explicitly requests experience polish such as syntax highlighting, copyable code blocks, animation, reading progress, active table-of-contents behavior, or comparable learning-site enhancements.

- Add syntax-highlighting or animation dependencies only when explicitly requested.
- Prefer Shiki for syntax highlighting.
- Prefer server-side highlighting for static or structured learning content.
- Prefer Motion for component-level animation when the user explicitly requests animation.
- Keep animation Client Components small and deep in the tree.
- Do not convert pages or layouts to Client Components just to animate static content.
- Server pages may pass server-rendered children into small Client Component wrappers.
- Respect `prefers-reduced-motion`; remove or reduce non-essential transforms when the user requests reduced motion.
- Keep Clipboard API logic in a Client Component because it requires browser APIs and user interaction.
- Keep IntersectionObserver logic in a Client Component because it depends on browser viewport state.
- Tailwind utility classes do not require Client Components.
- Structured TypeScript content is the website layer. Markdown learning documents remain the canonical long-form source.
- Do not add MDX, search engines, command palettes, CMSs, analytics, authentication, databases, UI libraries, additional highlighters, or additional animation libraries in this mode unless the user explicitly requests them.

## Language Rules

- Keep source code, comments, identifiers, filenames, commands, package names, route paths, and runtime UI strings in English.
- Keep `app/`, `components/`, `content/`, and this skill free of CJK characters.
- Use Chinese only in Markdown learning documents when requested.

## Tailwind CSS v4 Rules

- Use `@import "tailwindcss";` in the global stylesheet.
- Configure `@tailwindcss/postcss` in `postcss.config.mjs`.
- Keep global CSS limited to shared tokens and true document-wide base rules.
- Prefer explicit utility class strings in components.
- Do not construct class names such as `bg-${color}` that Tailwind cannot detect statically.
- Use explicit variant maps for badges and other bounded variants.
- Pair important utilities with their underlying CSS meaning in learning UI.
- Do not hide execution-boundary decisions behind styling abstractions.

## Site Architecture

- Keep `app/layout.tsx` as a Server Component.
- Use the `(learn)` route group for the shared learning shell without changing public URLs.
- Provide `/`, `/chapters`, and `/chapters/[slug]`.
- Keep pages and layouts as Server Components by default.
- Restrict `"use client"` to the smallest interactive component, such as the mobile navigation toggle.
- Store chapter metadata and page-ready content in typed TypeScript modules.
- Do not introduce MDX unless the user explicitly asks for it.
- Render unknown chapter slugs with `notFound()`.
- Use `generateStaticParams` for known static chapter slugs when appropriate.
- Treat `params` as asynchronous when required by the installed Next.js version.

## Boundary Method

For each example, identify:

1. the framework or platform owner;
2. the execution phase;
3. the runtime environment;
4. the evidence in the repository;
5. a contrasting case that would cross the boundary.

Keep browser APIs out of Server Components. Keep server secrets out of public environment variables, rendered markup, logs, and Route Handler responses.

## Implementation Workflow

1. Confirm the real project root and package manager from the lockfile.
2. Audit the current routes, content, styles, and starter residue.
3. Confirm installed Next.js, React, Tailwind CSS, and TypeScript versions.
4. Design the smallest typed content model needed by the requested routes.
5. Implement the shared shell with Server Components.
6. Add only the minimal Client Component required for browser interaction.
7. Integrate existing learning documents through metadata or safe links without duplicating their full content.
8. Explain representative Tailwind utilities through explicit utility-to-CSS mappings.
9. Validate the implementation and report unsupported claims as `UNKNOWN`.

## Validation

Run the smallest reliable checks first, then:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Also:

- scan `app/`, `components/`, `content/`, and this skill for CJK characters;
- confirm `"use client"` exists only where browser interactivity requires it;
- confirm required routes return the expected page or JSON response;
- check desktop and mobile layouts in a real browser;
- inspect console errors and failed network requests;
- report every check as `PASS`, `FAIL`, `UNKNOWN`, or `NOT RUN`;
- never claim a check passed unless it actually ran.

### Validation status definitions

- `PASS`: The check ran and produced the expected result.
- `FAIL`: The check ran and produced an error, regression, mismatch, or unexpected result.
- `NOT RUN`: The check was intentionally skipped or could not be executed in the current turn.
- `UNKNOWN`: The available evidence is insufficient to classify the result, even after the relevant safe checks were attempted.
