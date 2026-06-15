---
name: frontend-learning-guide-writer
description: "Create, update, expand, or review teaching-oriented Markdown learning guides, chapter guides, framework learning documents, cheatsheets, and study notes for JavaScript, TypeScript, React, Node.js, Next.js, frontend frameworks, backend JavaScript, web APIs, testing, tooling, and project-based frontend learning. Use when the requested output is a technical learning document. Do not use for ordinary code implementation, UI generation, bug fixing, or feature development unless the requested deliverable is a learning document."
---

# Frontend Learning Guide Writer

## Purpose

Write high-quality technical learning guide Markdown files for serious modern frontend and full-stack JavaScript study. The output must teach mechanisms, boundaries, and real project usage instead of producing a shallow summary, API list, checklist, or snippet collection.

This is an instruction-only skill. Do not add scripts or new project dependencies for guide-writing tasks.

## Resource Map

- Read `references/learning-guide-standard.md` before creating, expanding, or substantially updating a guide.
- Read `references/frontend-framework-doc-policy.md` when choosing sources, checking official documentation, or writing version-sensitive framework sections.
- Read `references/output-checklist.md` before finalizing any guide output.
- Use `assets/chapter-guide-template.md` for new full chapter guides unless the user explicitly asks for a smaller file.
- Use `assets/cheatsheet-template.md` for standalone cheatsheets or the guide's extra cheatsheet section.
- Use `assets/macos-code-window-template.md` when adding source-code, terminal command, expected output, or error output examples.

## Workflow

1. Inspect the repository first.
   - Read the nearest applicable `AGENTS.md` if present.
   - Read relevant `README.md`, `package.json`, configuration files, and existing guide files.
   - Ignore `node_modules`, build outputs, generated files, and archived material unless the task specifically targets them.
   - If enough information exists locally, make a grounded assumption instead of asking for clarification.

2. Establish the guide scope.
   - Identify the topic, learner level, target file, and whether the task is create, update, expand, or review.
   - For review tasks, inspect first and report findings before editing unless the user explicitly asks for direct edits.
   - Keep changes small and scoped to the requested learning document.

3. Select and verify sources.
   - Prefer local project materials first when they explain the learner's current path.
   - Before writing any framework, library, tool, runtime, or version-sensitive content, inspect the relevant local reference files first.
   - Then use the latest official documentation available to Codex.
   - Do not rely only on model memory for React, Next.js, Node.js, TypeScript, testing tools, build tools, package managers, or deployment platforms.
   - If official documentation cannot be accessed, explicitly say which part could not be verified and add a `Verification Needed` note.
   - Prefer official documentation over blogs for external sources.

4. Write the guide.
   - The guide body must be Chinese.
   - Use Chinese for ordinary structural headings in the final guide. Keep important technical terms in English or Chinese with English in parentheses on first introduction.
   - Do not leave English template headings such as `File Positioning`, `What Problem This Chapter Solves`, `Clear Conclusion`, or `Technical Meaning` as final document headings.
   - Table headers do not need to be Chinese when English headers such as `Concept`, `Layer`, `Meaning`, or `Common Mistake` are clearer.
   - Include important technical terms in English in parentheses on first introduction.
   - Keep code, identifiers, filenames, commands, APIs, package names, runtime UI strings, code comments, and raw error messages in English.
   - Do not put Chinese characters inside source-code blocks.
   - Explain the concept layer explicitly: syntax, runtime behavior, language mechanism, object model/prototype model, type system, framework convention, platform API, or tooling behavior.
   - In full chapter guides, add `## 目录` near the top, after the chapter title and any local `<style>` block, and before `## 0. 文件定位`.
   - The directory must list all numbered top-level sections, all core `### 9.x` sections, and important `###` sections under `## 12. 最终小项目`. Do not include internal bold teaching labels such as `结论`, `技术意义`, `逐行解释`, or `最终记忆模型`.
   - From React chapter 2 onward, if the guide contains real practice files or final mini-project files, add `## 本章代码定位索引` after the directory. Use it to connect learning goals, exact real file paths or `Snippet:` labels, file/snippet type, and section location.
   - In full chapter guides, keep `## 9. 分节教学与练习` with `###` core concept headings, but use bold labels inside each concept section instead of many `####` headings.
   - Distinguish `当前项目结构`, `本章文档结构`, `概念示例结构`, and `最终小项目结构`.
   - For React chapter 1, concept snippets are acceptable because the goal is the first mental model. From React chapter 2 onward, add real practice file structures with one concept per directory and descriptive file names that reveal the learning goal.

5. Teach mechanisms.
   - For JavaScript, separate syntax, runtime behavior, language mechanism, object model/prototype model, and platform API when relevant.
   - For TypeScript, separate TypeScript syntax, type-system behavior, emitted JavaScript, JavaScript runtime behavior, and tooling behavior.
   - For React, connect JSX, components, props, state, event handlers, rendering, hooks, closures, render snapshots, side effects, async behavior, and dependency arrays.
   - For Node.js, connect request/response objects, route handlers, middleware composition, asynchronous I/O, event loop implications, and CommonJS/ESM boundaries.
   - For Next.js, connect file-system routing, module boundaries, server/browser runtimes, Server Components, Client Components, request data, data fetching, client bundles, caching, rendering mode, and deployment implications.

6. Validate before final response.
   - Check the generated Markdown against `references/output-checklist.md`.
   - Check that every full chapter guide has `## 目录` before `## 0. 文件定位`.
   - Check that the directory matches the actual headings and does not include internal bold teaching labels.
   - Check that guides with real practice files include `## 本章代码定位索引`, and that paths or `Snippet:` labels in the index match the guide structures, code-window title bars, and final file list.
   - Check that non-trivial code examples include correct code, expected output or compiler result, line-by-line explanation, execution process, common mistake, violated rule, correction, and recognition method.
   - Check that every full chapter guide includes a final mini project and an extra cheatsheet.
   - Check that real code-window file paths appear in the nearest relevant structure block. Concept snippets should use `Snippet:` or `Template:` title-bar labels instead of fake file paths.
   - Check that final file lists include only the created guide and real final mini-project practice files, not source references, official documentation, configuration files used only for inspection, or concept snippets.
   - Check that source-code blocks contain no Chinese characters.
   - Check that source-code, terminal command, expected output, and error output examples use the mandatory macOS-style code window wrapper.

## Mandatory macOS-Style Code Window Policy

1. All generated learning guides and cheatsheets must keep the mandatory macOS-style title bar for every code example.
2. Use an HTML title bar followed immediately by a normal Markdown fenced code block.
3. Do not put real source code inside raw HTML `<pre><code>`.
4. Every major code example must display red, yellow, and green traffic-light dots in the upper-left title bar and a file name, logical snippet name, `Terminal`, `Output`, or `Error` in the title bar.
   - Use a real file path only when that file appears in the nearest relevant `当前项目结构`, `最终小项目结构`, or explicit example structure.
   - Use logical names such as `Snippet: JSX class mistake` or `Template: basic component` for conceptual examples, mistakes, contrasts, or copy templates that should not be created as files.
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

## Final Response

After creating or updating guide files, include:

- Files created or updated.
- Sources used, including local files and official documentation sources.
- Official docs still needing manual verification, if any.
- A self-check checklist.
- Limitations or outdated references found.

If no file was edited, say so clearly and summarize the review or guidance instead.
