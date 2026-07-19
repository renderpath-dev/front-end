---
name: nextjs-learning-guide-writer
description: "Create, update, expand, or review teaching-oriented Chinese Markdown chapter guides, learning notes, and cheatsheets for modern Next.js projects. Use for Next.js App Router or Pages Router learning documents that must explain routing conventions, Server and Client Components, RSC, runtime and bundle boundaries, data fetching, caching and revalidation, Route Handlers, Server Actions, metadata, tooling, testing, migration, or deployment. Do not use for ordinary feature implementation unless the requested deliverable is a learning guide."
---

# Next.js Learning Guide Writer

## Purpose

Create rigorous Next.js learning documents for a serious frontend and full-stack JavaScript learner. Teach framework mechanisms, runtime boundaries, type-system boundaries, and production implications. Reject shallow summaries, API inventories, snippet collections, and template-only project output.

Keep this skill instruction-only. Do not add scripts, dependencies, frameworks, test frameworks, databases, authentication systems, or deployment configuration while writing a guide unless the user separately requests that implementation.

## Resource Map

- Read `references/nextjs-learning-guide-standard.md` before creating, expanding, or substantially updating a full guide.
- Read `references/nextjs-official-doc-policy.md` before researching or making any version-sensitive claim.
- Read `references/output-checklist.md` before final delivery.
- Use `assets/chapter-guide-template.md` for a full chapter unless the user asks for a smaller document.
- Use `assets/cheatsheet-template.md` for a standalone cheatsheet or section 13.
- Use `assets/macos-code-window-template.md` for every code, command, output, and error example.

## Workflow

### 1. Inspect the real project

1. Read the nearest applicable `AGENTS.md`.
2. Inspect the target guide, related guides, `README.md`, `package.json`, lockfile, `next.config.*`, `tsconfig.json`, lint configuration, and the actual `app/`, `src/app/`, `pages/`, or `src/pages/` tree.
3. Read relevant documents under `node_modules/next/dist/docs/` before writing Next.js code or behavior claims. Treat these documents as the installed-version reference.
4. Record the installed Next.js, React, TypeScript, package-manager, linter, and test-tool versions that matter to the chapter.
5. Preserve the current router, directory style, module style, formatter, and package manager. Do not invent project files, routes, dependencies, or architecture.
6. For a review request, report findings before editing unless the user explicitly requests direct changes.

### 2. Define scope and router

- Identify whether the task is create, update, expand, or review.
- Identify the learner level, chapter number, concrete topic, target path, practice-file scope, and final-project scope.
- Determine App Router or Pages Router from the repository and request. Never mix their APIs or file conventions without an explicit comparison or migration section.
- Default new modern material to App Router only when the user and repository do not establish another router. State the assumption.
- Keep Pages Router material accurate and clearly labeled as Pages Router. Do not describe it as removed merely because App Router is newer.

### 3. Research current official sources

Follow `references/nextjs-official-doc-policy.md`.

- Use the local installed-version Next.js docs and current `nextjs.org/docs` first.
- Use Vercel docs only for Vercel platform and deployment behavior.
- Use `react.dev` for React-owned behavior such as Server Components, directives, Suspense, hydration, and serialization.
- Use TypeScript official docs for type-system, TSX, module resolution, strictness, and emitted-JavaScript claims.
- Use MDN for `Request`, `Response`, `URL`, `Headers`, cookies-related browser APIs, storage, and other Web APIs.
- Use official documentation for the test tool, linter, formatter, package manager, or deployment adapter actually present.
- If local and latest online docs differ, teach the project-compatible behavior first, identify the newer behavior separately, and add `Verification Needed` where support is unproven.
- If an official source cannot be accessed, identify the exact unverified claim in the guide and final response. Do not infer current behavior from memory.

### 4. Establish the boundary model

Classify each important claim under one or more explicit owners:

1. JavaScript or TypeScript syntax.
2. JavaScript runtime behavior.
3. React runtime or React Server Components behavior.
4. Next.js framework convention.
5. Server runtime behavior.
6. Browser runtime or browser API behavior.
7. Web API behavior.
8. TypeScript type-system and type-erasure behavior.
9. Tooling or bundler behavior.
10. Deployment infrastructure behavior.

Never use “Next.js does this” when the concrete owner is React, JavaScript, a Web API, Node.js, the browser, Turbopack, TypeScript, or Vercel.

### 5. Trace the complete request and navigation path

For each core concept, trace only the stages that actually occur, but evaluate all of these:

- URL request or `<Link>` navigation.
- Proxy execution when applicable.
- File-system route matching and route-segment selection.
- Server Component, Route Handler, Server Action, or Pages Router execution.
- Data access, request memoization, cache lookup, and revalidation.
- RSC Payload generation.
- Initial HTML generation and streaming.
- Client-reference and JavaScript bundle loading.
- Hydration of Client Components.
- Subsequent navigation and router cache behavior.
- Deployment runtime, region, function, CDN, or self-hosted cache behavior.

State explicitly when a stage is absent. For example, a Route Handler response does not participate in layouts or client-side page navigation, and a server-only module does not enter the client bundle.

### 6. Write the guide in Chinese

- Write body prose and ordinary structural headings in Chinese.
- Use English technical terms, or Chinese plus English on first introduction.
- Keep identifiers, filenames, paths, commands, packages, APIs, runtime UI strings, comments, and raw errors in their original language.
- Keep every source-code and command block free of Chinese/CJK characters.
- Do not leave English template headings such as `File Positioning`, `Clear Conclusion`, or `Technical Meaning`.
- Use the exact full-chapter structure and core `9.x` labels defined in `references/nextjs-learning-guide-standard.md`.
- Add `## 目录` after the H1 and self-contained style block.
- Add `## 本章代码定位索引` when real practice or final-project files exist.
- Use explicit `section-9-x` anchors for every core `9.x` heading.
- Lead every core section with explanation. Code supports the mechanism; it does not replace it.

#### Guide body vs final response

- Keep the guide body limited to learning content.
- Put delivery status, the final file inventory, commands run, limitations, and personal-note conversion suggestions in the final response, not in the guide body.
- Use file paths inside the guide only for code positioning, mechanism tracing, or boundary auditing.
- Do not add `最终文件清单`, `如何转换成个人笔记`, `最终学习笔记转换要求`, `Files created or updated`, `Commands run`, or `Final delivery checklist` as guide sections.
- Keep `必须能回答的问题`, `最终记忆模型`, and `官方文档阅读清单` in full chapter guides.

### 7. Build a Next.js mechanism evidence chain

Include at least one section-specific evidence chain in every core `9.x` section. It must cover:

1. Trigger.
2. File convention or module boundary.
3. Server execution path.
4. Browser execution path, if any.
5. RSC Payload, HTML, client bundle, hydration, streaming, or navigation behavior.
6. Concrete values, promises, requests, responses, props, params, searchParams, cookies, headers, or cache entries.
7. What TypeScript checks and what it cannot validate at runtime.
8. Observed output or exact error.
9. The precise rule violated by the incorrect form.
10. Recognition signals in a production project.

Reject generic chains that could be copied unchanged to another chapter.

### 8. Apply Next.js-specific teaching rules

- Explain App Router and Pages Router as distinct router systems.
- Treat folders as route segments and special files as framework conventions, not ordinary React routing.
- Explain `page.tsx`, `layout.tsx`, `template.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`, `proxy.ts`, metadata files, and route-segment configuration only when relevant and version-verified.
- Explain Server Components and Client Components using both the module dependency graph and render tree. Do not say that every descendant rendered under a Client Component automatically becomes a Client Component.
- Explain `"use client"` as a client module-graph boundary and client-bundle decision.
- Explain `"use server"` as a Server Function boundary, not a Server Component marker.
- Explain serializable server-to-client props and treat Server Action inputs as untrusted.
- Separate RSC Payload, HTML, JavaScript client bundle, hydration, and later client navigation.
- Separate Node.js runtime, Edge runtime, browser runtime, and deployment platform. Verify runtime support per file convention and version.
- Verify whether `params`, `searchParams`, `cookies()`, and `headers()` are asynchronous for the installed version before teaching signatures.
- Separate direct server data access, server `fetch`, client fetching, and browser-only APIs.
- Separate React request memoization, Next.js caching, browser HTTP caching, CDN caching, and deployment persistence.
- Determine whether Cache Components is enabled. Do not mix the Cache Components model with the previous caching model.
- Verify `"use cache"`, `cacheLife`, `cacheTag`, `revalidatePath`, `revalidateTag`, `updateTag`, ISR, static shells, and PPR against current docs before use.
- Explain Suspense boundaries, `loading.tsx`, streaming, error boundaries, and not-found behavior by route segment.
- Teach Route Handlers with Web `Request` and `Response`; introduce `NextRequest` and `NextResponse` only for Next.js extensions.
- Separate authentication, session lookup, authorization, and input validation. Never present route protection alone as sufficient authorization.
- Separate framework build output from Vercel Functions, CDN behavior, regions, and self-hosting.
- Verify Turbopack, TypeScript, ESLint or Biome, package-manager, and testing claims against the installed project and official tool docs.

### 9. Handle outdated material

Mark local books or old guides as historical when they teach `getInitialProps` first, imply Pages Router is the only router, use `middleware.ts` for a version that requires `proxy.ts`, assume old caching defaults, conflate ISR with all caching, treat synchronous request APIs as current, or assume Vercel and self-hosting behave identically.

Do not silently modernize an old example while preserving an explanation that depends on the old mechanism.

### 10. Validate

1. Run the evidence checks in `references/output-checklist.md`.
2. Resolve every real path against the repository. Create it only if implementation is within scope; otherwise relabel it `Snippet:` or `Template:`.
3. Verify every code window has red, yellow, and green dots and a fenced block.
4. Verify the guide defines every required CSS selector.
5. Verify all fenced source-code and command blocks contain no Chinese/CJK characters.
6. Run only project commands supported by the repository. Start with the narrowest reliable validation.
7. Never claim lint, type-check, test, build, route, cache, or deployment validation passed unless the command or smoke test actually ran.
8. Continue revising when any critical checklist item is `FAIL`. Use `UNKNOWN` for checks not performed.
9. Verify sections 14 and 15 are learning-focused mechanism-audit and debugging-path sections, not delivery summaries.
10. Verify delivery inventory, command results, limitations, and personal-note conversion suggestions appear only in the final response when relevant.

## Supported Topic Groups

Support at least:

1. Framework boundary and setup.
2. App Router routing, segments, layouts, pages, templates, and route groups.
3. Dynamic routes, params, searchParams, navigation, `<Link>`, redirects, and not-found behavior.
4. Server Components, Client Components, RSC Payload, `"use client"`, and serialization.
5. Server and client data fetching.
6. Cache Components, `"use cache"`, cache lifetime/tags, revalidation, ISR, and static shells.
7. Suspense, streaming, loading, errors, and not-found UI.
8. Route Handlers, Web APIs, cookies, headers, authentication, and sessions.
9. Server Actions, forms, mutations, validation, and optimistic UI.
10. Metadata, SEO, Open Graph, sitemap, robots, and structured data.
11. Image, Font, Link, Script, Form, and built-in components.
12. CSS Modules, global CSS, Tailwind, Sass, and CSS-in-JS constraints.
13. TypeScript, generated route types, typed routes, NextConfig, and strictness.
14. `create-next-app`, Next.js CLI, Turbopack, linting, and package managers.
15. Unit, integration, component, Route Handler, and end-to-end testing with official tool docs.
16. Vercel, self-hosting, runtimes, environment variables, functions, streaming, and ISR persistence.
17. Performance and production architecture.
18. A full-stack Next.js capstone.

## Delivery

After creating or updating a guide, report:

- Files created or updated.
- Local references used.
- Official documentation sources used.
- Official docs still requiring manual verification.
- Commands and smoke tests actually run.
- An evidence-based table with `检查项`, `结果`, and `证据`, using only `PASS`, `FAIL`, or `UNKNOWN`.
- Limitations and outdated references found.
- Personal-note conversion suggestions when they are relevant to the request.

If no file changed, say so and provide only the requested review or guidance.
