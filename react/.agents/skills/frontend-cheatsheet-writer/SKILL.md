---
name: frontend-cheatsheet-writer
description: "Create, update, compress, review, or reorganize standalone cheatsheets, quick references, API tables, comparison tables, error tables, syntax summaries, framework references, and minimal code templates for JavaScript, TypeScript, React, Node.js, Next.js, browser Web APIs, testing, tooling, and frontend engineering topics. Use when the requested output is a cheatsheet or quick-reference document. Do not use for full chapter learning guides, long-form tutorials, feature implementation, UI generation, bug fixing, or project code unless the requested deliverable is a cheatsheet or quick-reference document."
---

# Frontend Cheatsheet Writer

## Purpose

Write standalone technical cheatsheet Markdown files for serious modern frontend and full-stack JavaScript study. The output must support fast recall, fast comparison, fast error diagnosis, and practical project usage without expanding into a full tutorial.

This is an instruction-only skill. Do not add scripts or new project dependencies for cheatsheet-writing tasks.

## Resource Map

- Read `references/cheatsheet-standard.md` before creating, compressing, reorganizing, reviewing, or substantially updating a cheatsheet.
- Read `references/source-policy.md` before writing framework, library, tool, runtime, or version-sensitive content.
- Read `references/output-checklist.md` before finalizing any cheatsheet output.
- Use `assets/cheatsheet-template.md` for new standalone cheatsheets unless the user explicitly asks for a smaller file.
- Use `assets/comparison-table-template.md` for similar-concept comparison sections.
- Use `assets/error-table-template.md` for common error sections.
- Use `assets/minimal-code-template.md` for copyable minimal code template sections.
- Use `assets/macos-code-window-template.md` when adding source-code, terminal command, expected output, or error output examples.

## Workflow

1. Inspect the repository first.
   - Read the nearest applicable `AGENTS.md` if present.
   - Read relevant `README.md`, `package.json`, configuration files, existing learning guides, and existing cheatsheets.
   - Ignore `node_modules`, build outputs, generated files, and archived material unless the task specifically targets them.
   - If enough information exists locally, make a grounded assumption instead of asking for clarification.

2. Establish the cheatsheet scope.
   - Identify the topic, target file, learner level, and whether the task is create, update, compress, review, or reorganize.
   - Keep the output as a cheatsheet, not a full learning guide or long-form tutorial.
   - If the user needs first-time learning material rather than recall/reference material, recommend `frontend-learning-guide-writer`.
   - For review tasks, inspect first and report findings before editing unless the user explicitly asks for direct edits.

3. Select and verify sources.
   - Inspect relevant local reference files first, including existing guides that should be compressed.
   - Then use the latest official documentation available to Codex.
   - Do not rely only on model memory for React, Next.js, Node.js, TypeScript, testing tools, build tools, package managers, deployment platforms, browser APIs, or framework behavior.
   - If official documentation cannot be accessed, explicitly say which part could not be verified and add a `Verification Needed` note.
   - Prefer official documentation over blogs.

4. Write the cheatsheet.
   - The cheatsheet body must be Chinese.
   - Include important technical terms in English in parentheses on first introduction.
   - Keep code, identifiers, filenames, commands, APIs, package names, runtime UI strings, code comments, and raw error messages in English.
   - Do not put Chinese characters inside source-code blocks.
   - Make the output concise but not shallow; preserve mechanisms where they prevent misunderstanding.
   - If a standalone cheatsheet becomes long enough for navigation to matter, add `## 目录` near the top, after the title and any local `<style>` block, and before `## 0. Scope`.
   - The cheatsheet directory should list actual cheatsheet sections only. Do not import the full chapter guide structure, final mini-project requirements, or `## 本章代码定位索引` unless the user explicitly asks for a learning guide.
   - Prioritize one-sentence concept summaries, syntax patterns, runtime behavior, TypeScript compile-time behavior, API tables, comparison tables, error tables, project usage scenarios, and minimal code templates.

5. Preserve technical boundaries.
   - For JavaScript, separate syntax, runtime behavior, language mechanism, object model/prototype model, and platform API when relevant.
   - For TypeScript, separate TypeScript syntax, type-system behavior, emitted JavaScript, JavaScript runtime behavior, and IDE or `tsc` diagnostics.
   - For React, include quick-reference coverage for components, props, state, event handlers, JSX transformation, hooks, closures, render snapshots, effects, and dependency arrays when relevant.
   - For Node.js, include quick-reference coverage for request/response objects, route handlers, middleware flow, asynchronous I/O, and CommonJS/ESM boundaries when relevant.
   - For Next.js, include quick-reference coverage for file-system routing, server/browser runtimes, Server Components, Client Components, `params`, `searchParams`, `headers`, `cookies`, data fetching location, client bundle boundary, caching, and rendering mode when relevant.

6. Validate before final response.
   - Check the output against `references/output-checklist.md`.
   - Check that comparison tables explain differences instead of only listing names.
   - For long standalone cheatsheets, check that `## 目录` appears before `## 0. Scope` and matches the actual cheatsheet headings.
   - Check that common errors include wrong code, error type, violated rule, why it fails, correct code, and how to recognize the same error later.
   - Check that minimal code templates are short, practical, safe to copy, and free of unrelated boilerplate.
   - Check that source-code blocks contain no Chinese characters.
   - Check that source-code, terminal command, expected output, and error output examples use the mandatory macOS-style code window wrapper.

## Mandatory macOS-Style Code Window Policy

1. All generated learning guides and cheatsheets must keep the mandatory macOS-style title bar for every code example.
2. Use an HTML title bar followed immediately by a normal Markdown fenced code block.
3. Do not put real source code inside raw HTML `<pre><code>`.
4. Every major code example must display red, yellow, and green traffic-light dots in the upper-left title bar and a file name, logical snippet name, `Terminal`, `Output`, or `Error` in the title bar.
   - Use a real file path only when the cheatsheet explicitly shows the matching project or template structure nearby.
   - Use logical names such as `Snippet: JSX class mistake` or `Template: minimal fetch helper` for conceptual examples, mistakes, contrasts, or copy templates that should not be created as files.
5. The traffic-light dots, title bar, file name, shell labels, and decorative UI elements must be outside the actual source code.
6. Real source code must remain clean, copyable, and executable. Do not place decorative dots, fake title bars, file names, or shell prompts inside the source-code content.
7. Use this Markdown-compatible structure for source-code examples:

````markdown
<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: value binding</span>
  </div>

```ts
const message = "Hello";

console.log(message);
```
</div>
````

8. Use the correct fenced code language identifier for syntax highlighting: `ts`, `tsx`, `js`, `jsx`, `bash`, `json`, `html`, `css`, or `txt`.
9. For terminal commands, use the same title bar and `bash` fenced code block, with `Terminal` or the command context as the title:

````markdown
<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run dev
```
</div>
````

10. For expected output, use the same title bar and `txt` fenced code block, with `Output` as the title:

````markdown
<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Output</span>
  </div>

```txt
Hello
```
</div>
````

11. Add or reuse the CSS from `assets/macos-code-window-template.md` when the output target needs local styling. The CSS must include `.macos-code-titlebar + pre` so the title bar visually connects to the fenced code block rendered as `<pre>`.
12. Use `assets/macos-code-window-template.md` for examples covering a TypeScript file, React TSX file, terminal command, expected output, and error output.
13. Preserve the existing language rule: body text can be Chinese; code identifiers, code comments, and source-code comments must be English; source-code comments must not contain Chinese characters.

## Relationship To Full Guide Skill

- Use this skill to create a standalone cheatsheet from scratch.
- Use this skill to compress an existing learning guide into a cheatsheet.
- Do not expand a cheatsheet into a full tutorial unless the user explicitly asks.
- Recommend `frontend-learning-guide-writer` when the user asks for first-time learning material, chapter guides, or mechanism-first long-form tutorials.

## Final Response

After creating or updating cheatsheet files, include:

- Files created or updated.
- Source files or official documentation sources used.
- What was intentionally compressed.
- What should be reviewed in the full guide.
- A self-check checklist.
- Limitations or outdated references found.

If no file was edited, say so clearly and summarize the review or guidance instead.
