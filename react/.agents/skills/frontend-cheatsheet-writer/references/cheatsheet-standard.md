# Cheatsheet Standard

Use this standard for standalone cheatsheets, quick references, API tables, comparison tables, error tables, syntax summaries, framework references, and minimal code templates about JavaScript, TypeScript, React, Node.js, Next.js, browser Web APIs, testing, tooling, and frontend engineering topics.

## Core Output Principles

- Write a standalone cheatsheet, not a full learning guide, chapter tutorial, loose summary, or random API list.
- Help a serious modern frontend learner recall quickly, compare concepts accurately, diagnose errors quickly, and apply the topic in practical projects.
- Keep the output concise but not shallow.
- Preserve mechanisms where they are needed to avoid misunderstanding.
- Prioritize core concept in one sentence, syntax patterns, runtime behavior, TypeScript compile-time behavior when relevant, API tables, similar concept comparison, common mistakes and violated rules, project usage scenarios, and minimal code templates.
- Do not expand the cheatsheet into a long-form tutorial unless the user explicitly asks.

## Language Rules

- The cheatsheet body must be Chinese.
- Important technical terms should include English in parentheses on first introduction.
- Keep code identifiers, filenames, package names, commands, APIs, raw errors, runtime UI strings, and source-code comments in English.
- Do not write Chinese characters inside source-code blocks.

## Mandatory macOS-Style Code Window Policy

1. All generated learning guides and cheatsheets must keep the mandatory macOS-style title bar for every code example.
2. Use an HTML title bar followed immediately by a normal Markdown fenced code block.
3. Do not put real source code inside raw HTML `<pre><code>`.
4. Every major code example must display red, yellow, and green traffic-light dots in the upper-left title bar and a file name, logical snippet name, `Terminal`, `Output`, or `Error` in the title bar.
   - Use a real file path only when the cheatsheet includes the matching project or template structure nearby.
   - Use logical title-bar names such as `Snippet: JSX class mistake`, `Snippet: object child correction`, or `Template: minimal API helper` for conceptual examples, mistakes, contrasts, and copy templates that are not intended as exact files to create.
   - Do not make readers think every snippet title is a real file path.
5. The traffic-light dots, title bar, file name, shell labels, and decorative UI elements must be outside the actual source code.
6. Real source code must remain clean, copyable, and executable. Do not place decorative dots, fake title bars, file names, or shell prompts inside the source-code content.
7. Use the Markdown-compatible structure documented in `assets/macos-code-window-template.md`.
8. Use the correct fenced code language identifier for syntax highlighting: `ts`, `tsx`, `js`, `jsx`, `bash`, `json`, `html`, `css`, or `txt`.
9. For terminal commands, use the same title bar and `bash` fenced code block, with `Terminal` or the command context as the title.
10. For expected output, use the same title bar and `txt` fenced code block, with `Output` as the title.
11. Add or reuse the CSS from `assets/macos-code-window-template.md` when the output target needs local styling. The CSS must include `.macos-code-titlebar + pre` so the title bar visually connects to the fenced code block rendered as `<pre>`.
12. Use `assets/macos-code-window-template.md` for examples covering a TypeScript file, React TSX file, terminal command, expected output, and error output.
13. Preserve the existing language rule: body text can be Chinese; code identifiers, code comments, and source-code comments must be English; source-code comments must not contain Chinese characters.

## Required Standalone Cheatsheet Structure

Use this structure unless the user explicitly asks for a smaller file:

```markdown
# Cheatsheet Title

## 目录

- [0. Scope](#0-scope)
- [1. Core Mental Model](#1-core-mental-model)
- [2. One-Sentence Concept Map](#2-one-sentence-concept-map)
- [3. Syntax / API Quick Table](#3-syntax--api-quick-table)
- [4. Runtime Behavior Table](#4-runtime-behavior-table)
- [5. TypeScript Type System Table](#5-typescript-type-system-table)
- [6. Framework Behavior Table](#6-framework-behavior-table)
- [7. Similar Concepts Comparison](#7-similar-concepts-comparison)
- [8. Common Error Table](#8-common-error-table)
- [9. Project Usage Table](#9-project-usage-table)
- [10. Minimal Code Templates](#10-minimal-code-templates)
- [11. Debugging Checklist](#11-debugging-checklist)
- [12. What to Review in the Full Learning Guide](#12-what-to-review-in-the-full-learning-guide)
- [13. Official Documentation Links](#13-official-documentation-links)

## 0. Scope

## 1. Core Mental Model

## 2. One-Sentence Concept Map

## 3. Syntax / API Quick Table

## 4. Runtime Behavior Table

## 5. TypeScript Type System Table

## 6. Framework Behavior Table

## 7. Similar Concepts Comparison

## 8. Common Error Table

## 9. Project Usage Table

## 10. Minimal Code Templates

## 11. Debugging Checklist

## 12. What to Review in the Full Learning Guide

## 13. Official Documentation Links
```

The directory is required for long standalone cheatsheets where navigation matters. It must match the actual cheatsheet headings and must not import the full chapter learning guide structure.

## Required Content Rules

- Every comparison table must explain differences, not only list names.
- Every common error must include wrong code, error type, violated rule, why the wrong code fails, correct code, and how to recognize the same error later.
- Every minimal code template must be short, practical, and safe to copy into practice files.
- Minimal code templates should use meaningful file names when they are real files, or `Template:` title-bar labels when they are reusable patterns.
- If a cheatsheet includes real practice file paths, the paths should match a nearby project or template structure.
- Do not add unrelated boilerplate.
- Include official documentation links when documentation was accessible.
- If a section is not relevant to the topic, keep the heading and state that the section is not applicable for the scoped topic.

## Topic-Specific Rules

### JavaScript

Always separate syntax, runtime behavior, language mechanism, object model or prototype model, and platform API when relevant.

### TypeScript

Always separate TypeScript syntax, TypeScript type-system behavior, JavaScript runtime behavior, emitted JavaScript after type erasure, and IDE or `tsc` diagnostics when relevant.

### React

Include quick-reference sections for component as function or component object, props as object contract, state as React-managed render data, event handlers as function values, JSX transformation boundary, hooks, closures, render snapshots, effects, and dependency arrays when relevant.

### Node.js

Include quick-reference sections for request and response objects, route handlers, middleware flow, asynchronous I/O, and CommonJS/ESM boundaries when relevant.

### Next.js

Include quick-reference sections for file-system routing, server runtime versus browser runtime, Server Components and Client Components, `params`, `searchParams`, `headers`, `cookies`, data fetching location, client bundle boundary, caching, and rendering mode when relevant.

## Relationship With Full Learning Guides

- This skill can create a standalone cheatsheet from scratch.
- This skill can compress an existing learning guide into a cheatsheet.
- Do not expand the cheatsheet into a full tutorial unless the user explicitly asks.
- If the user needs first-time learning material, recommend `frontend-learning-guide-writer`.
