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
- Shiki
- Motion

No UI library, MDX renderer, database, authentication system, CMS, search
integration, analytics, or deployment configuration is included.

## Local commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

- `npm run dev` starts the development server.
- `npm run lint` runs the repository ESLint configuration.
- `npm run typecheck` checks TypeScript without emitting files.
- `npm run build` creates and validates the production output.
- `npm run start` serves an existing production build.

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
  motion/
  site/
content/
  chapter-01.ts
  chapters.ts
docs/
  nextjs/
```

The `(learn)` route group applies the documentation shell without changing the
public URL. Shared UI stays in Server Components except for the focused mobile
navigation, code-copy, animation, active table-of-contents, and reading
progress islands.

## Content model

`content/chapters.ts` is the chapter registry. It stores the slug, route,
number, status, phase, tags, description, and paths to the preserved guide,
cheatsheet, and interview questions.

`content/chapter-01.ts` stores concise, typed, web-ready content: objectives,
the mechanism chain, the boundary audit, comparisons, experiments, common
mistakes, code examples, experience boundary notes, Tailwind utility mappings,
and the table of contents. It does not duplicate the complete guide.

## Syntax highlighting architecture

`components/site/CodeWindow.tsx` is an async Server Component. It calls
`lib/codeHighlighter.ts`, which imports `server-only`, uses Shiki, and converts
Shiki HAST into React elements with `hast-util-to-jsx-runtime`. The highlighted
markup is created before the browser receives the route, so Shiki does not need
to run in the client bundle for static structured examples.

`components/site/CopyButton.tsx` is separate and starts with `"use client"`
because `navigator.clipboard.writeText` is a browser API that must run from a
user interaction after hydration.

To add future code examples:

1. Add a typed item to `chapterOneContent.codeExamples` or the matching future
   chapter content file.
2. Include `title`, `language`, `code`, `description`, `boundary`, `runtime`,
   `learningPoint`, and optional `highlightedLines`.
3. Keep code strings and runtime UI strings English-only.
4. Run lint, typecheck, build, source-boundary scans, and browser smoke tests.

## Animation and reading architecture

Motion is isolated to small Client Components:

- `components/motion/AnimatedReveal.tsx` handles subtle section reveal.
- `components/motion/AnimatedList.tsx` handles simple staggered lists.
- `components/motion/PageTransitionShell.tsx` adds entry transitions for route
  content without converting pages or layouts to Client Components.
- `components/site/SiteMobileNav.tsx` owns the animated mobile menu.

These components use `useReducedMotion` so reduced-motion users avoid
non-essential transforms. Static Tailwind hover and focus states remain plain
CSS and do not require client rendering.

`components/site/ActiveTableOfContents.tsx` is a Client Component because it
uses `IntersectionObserver` to read viewport state. `components/site/ReadingProgress.tsx`
is also client-only because it reads scroll position and document height. Both
are intentionally small and are rendered by Server layouts/pages as focused
interactive islands.

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

- [ ] `npm run lint` exits successfully.
- [ ] `npm run typecheck` exits successfully.
- [ ] `npm run build` exits successfully.
- [ ] Required routes return the expected page or JSON response.
- [ ] Desktop and mobile navigation work in a real browser.
- [ ] Syntax-highlighted code windows render line numbers, highlighted lines,
  titles, language badges, and working copy buttons.
- [ ] Section reveal, page entry transitions, active table of contents, and
  reading progress work without console errors.
- [ ] Browser console and network checks show no unexplained failures.
- [ ] Source code and the site-builder skill contain no CJK characters.
- [ ] `"use client"` appears only in focused interactive islands.
- [ ] Existing Chapter 1 documents remain unchanged.

## What not to add yet

Do not add MDX, a search engine, command palette, authentication, a database,
a CMS, analytics, deployment configuration, UI libraries, extra animation
libraries, extra highlighters, or copied third-party branding until a later
chapter explicitly requires them.
