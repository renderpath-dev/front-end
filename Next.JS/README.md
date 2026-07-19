# Next.js Learning Site

## Purpose

This is the local docs-style learning website at `D:\next.js_learning`. It
turns the Chapter 1 execution-boundary baseline into an extensible App Router
site while preserving the complete Chinese learning documents under `docs/`.

The site favors mechanism evidence over visual spectacle. Each example should
make its owner, execution phase, runtime, browser output, and contrasting
failure case understandable.

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- PostCSS
- ESLint

No UI library, MDX renderer, syntax highlighter, database, authentication
system, CMS, search integration, analytics, or deployment configuration is
included.

## Local commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

- `pnpm dev` starts the development server.
- `pnpm lint` runs the repository ESLint configuration.
- `pnpm typecheck` checks TypeScript without emitting files.
- `pnpm build` creates and validates the production output.
- `pnpm start` serves an existing production build.

Development success does not prove production success. Run lint, typecheck,
and build separately.

## Routes

- `/` — learning-site landing page.
- `/chapters` — chapter index.
- `/chapters/chapter-01-positioning-project-structure-boundaries` — curated
  Chapter 1 learning route.
- `/api/runtime-check` — request-time Node.js Route Handler evidence.
- `/boundary-report` — compatibility redirect to the Chapter 1 boundary audit.

Chapter source-document links return the preserved Markdown files as plain
Markdown without introducing MDX.

## Project structure

```text
app/
  (learn)/
    chapters/
      [slug]/
      page.tsx
    layout.tsx
  api/runtime-check/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  learning/
  site/
content/
  chapter-01.ts
  chapters.ts
docs/
  nextjs/
```

The `(learn)` route group applies the documentation shell without changing the
public URL. Shared UI stays in Server Components except for the focused mobile
navigation toggle.

## Content model

`content/chapters.ts` is the chapter registry. It stores the slug, route,
number, status, phase, tags, description, and paths to the preserved guide,
cheatsheet, and interview questions.

`content/chapter-01.ts` stores concise, typed, web-ready content: objectives,
the mechanism chain, the boundary audit, comparisons, experiments, common
mistakes, Tailwind utility mappings, and the table of contents. It does not
duplicate the complete guide.

## Tailwind CSS setup

- `postcss.config.mjs` registers `@tailwindcss/postcss`.
- `app/globals.css` imports Tailwind with `@import "tailwindcss";`.
- Global CSS contains shared color tokens and true document-wide base rules.
- Components use explicit utility strings so Tailwind can detect them
  statically.
- Representative utilities are mapped to their underlying CSS behavior on the
  Chapter 1 route.

## Boundary rules

- Pages and layouts are Server Components by default.
- Add `"use client"` only to the smallest component that needs state, effects,
  event handlers, or browser-only APIs.
- Do not read `window`, `document`, or `localStorage` in Server Components.
- Distinguish build-time prerendering from request-time server execution.
- Keep secrets out of `NEXT_PUBLIC_` variables, rendered output, logs, and JSON
  responses.
- Treat Vercel or another host as a deployment platform, not as the owner of
  React or Next.js framework behavior.

## How future chapters are added

1. Generate or update the chapter guide using
   `nextjs-learning-guide-writer`.
2. Add chapter metadata to `content/chapters.ts`.
3. Add curated web content to `content/chapter-XX.ts`.
4. Add a route through the shared `[slug]` renderer.
5. Run lint, typecheck, build.
6. Record what is `PASS`, `FAIL`, or `UNKNOWN`.

## Validation checklist

- [ ] `pnpm lint` exits successfully.
- [ ] `pnpm typecheck` exits successfully.
- [ ] `pnpm build` exits successfully.
- [ ] Required routes return the expected page or JSON response.
- [ ] Desktop and mobile navigation work in a real browser.
- [ ] Browser console and network checks show no unexplained failures.
- [ ] Source code and the site-builder skill contain no CJK characters.
- [ ] `"use client"` appears only in the intended interactive island.
- [ ] Existing Chapter 1 documents remain unchanged.

## What not to add yet

Do not add MDX, a search engine, command palette, syntax-highlighting or copy
dependencies, authentication, a database, a CMS, analytics, deployment
configuration, UI libraries, animation libraries, or copied third-party
branding until a later chapter explicitly requires them.
