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
   - For a full chapter guide, write a specific H1 containing the technology/topic, chapter number, and concrete chapter name. Do not use generic titles such as `React 学习指导`, `Chapter Learning Guide`, `Forms Guide`, or `React Chapter`.
   - For a newly created chapter, keep the chapter identity consistent across the directory name, file name, H1, directory, code location index, and final file list. When revising an existing guide, do not rename an established path only to satisfy this rule; make the H1 and in-document file locations identify the specific chapter.
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
   - In a full chapter guide, most body content must be teaching explanation. Code, directory trees, API tables, the final project, and checklists must support the explanation rather than replace it.
   - The teaching explanation must cover, where relevant: why the concept exists; what problem it solves; whether it belongs to syntax, JavaScript runtime, React framework, browser platform, TypeScript type system, or tooling; its underlying mechanism and execution process; how variables, references, state snapshots, props, and event objects change; why the result occurs; why contrasting forms differ; which rule a common mistake violates; how to recognize similar errors; and how the mechanism relates to a real project.
   - Do not deliver a guide that only provides file structures and source code, uses the final mini project instead of section-by-section teaching, uses an API table or checklist instead of conceptual explanation, or gives each section only a short overview before moving directly to code.
   - Make every core `### 9.x` section explanation-led. Code may appear, but surround it with enough explanation. After every non-trivial code block, provide a line-by-line explanation, execution process, variable and reference changes, result reasoning, contrasting case, and common-error analysis. For long examples, explain the core mechanism before showing only the necessary code.
   - Do not satisfy a core section by filling required labels with generic prose. Under labels such as `技术意义`, `底层机制`, `执行过程`, `变量与引用变化`, `常见错误为什么错`, `与真实项目的关系`, and `最终记忆模型`, write explanations bound to that section's actual concept, variables, code, and output. If a paragraph can be copied unchanged into a different React, JavaScript, or TypeScript chapter, it is too generic and must be made specific.
   - Include at least one mechanism evidence chain in every core `9.x` section. Trace: the triggering action; concrete JavaScript variables, objects, arrays, closures, or calls; the React snapshot, state/hook cell, context value, ref object, fiber/key identity, reducer transition, or hook call position involved; what TypeScript checks and does not do at runtime; why the observed UI/output/error follows; the exact rule violated by the incorrect form; and how to recognize the same failure in a real project.
   - Do not use sentences such as `React 会重新渲染`, `TypeScript 会检查类型`, `这样可以提高可维护性`, or `这个写法更清晰` as the mechanism explanation by themselves. Name the concrete owner, snapshot, consumer, identity, transition, value, or call position.
   - List every core `9.x` heading in `## 目录`, from `9.1` through the final core subsection. Listing only `9. 分节教学与练习` is a delivery failure.

5. Teach mechanisms.
   - For JavaScript, separate syntax, runtime behavior, language mechanism, object model/prototype model, and platform API when relevant.
   - For TypeScript, separate TypeScript syntax, type-system behavior, emitted JavaScript, JavaScript runtime behavior, and tooling behavior.
   - For React, connect JSX, components, props, state, event handlers, rendering, hooks, closures, render snapshots, side effects, async behavior, and dependency arrays.
   - For Node.js, connect request/response objects, route handlers, middleware composition, asynchronous I/O, event loop implications, and CommonJS/ESM boundaries.
   - For Next.js, connect file-system routing, module boundaries, server/browser runtimes, Server Components, Client Components, request data, data fetching, client bundles, caching, rendering mode, and deployment implications.
   - Treat the final mini project only as a chapter summary and integration exercise. Do not increase final-project length to reduce the mechanism explanation in earlier core `9.x` sections.
   - Keep the final mini project explanation-led even when its code is long: explain file responsibilities, state ownership, data flow, execution flow, decomposition decisions, and common errors.
   - Start the final mini project section with a natural sentence stating that it integrates the chapter mechanisms and does not replace the earlier section-by-section teaching.
   - Reject a guide when final-project code and commentary clearly outweigh shallow `9.x` explanations, when a core concept appears only in the project, or when project growth adds files and code without improving mechanism teaching. Preserve complete project code, but never use completeness as an excuse for weak core sections.

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
   - If the guide uses macOS code-window HTML, verify that the document includes a self-contained `<style>` block defining `.macos-code-window`, `.macos-code-titlebar`, `.macos-code-dot`, all three dot colors, `.macos-code-title`, `.macos-code-titlebar + pre`, and `.macos-code-titlebar + pre code`. If an external stylesheet is used, identify it explicitly and retain enough in-document explanation for standalone Markdown reading.
   - Resolve every path labeled as a real file from the code location index, recommended structures, real-file title bars, final file list, and final-project structure against the local repository. Create the file or relabel the entry as `Snippet:` / `Template:` / not required. Never claim `已创建`, `已更新`, or `真实练习文件` for a missing path.
   - Verify that real-file title bars and the final file list agree, and that snippets never appear as real files in the final file list.
   - Run the necessary repository validation commands before claiming they passed. If a check was not run, report `UNKNOWN` or `FAIL`, never `PASS`.

## Delivery Gate

Do not deliver a full chapter guide unless every requirement below passes:

1. The H1 contains the chapter number and concrete chapter name.
2. The body is primarily mechanism-focused teaching explanation.
3. Every core `9.x` section contains sufficient explanation.
4. Every non-trivial code block is followed by a line-by-line explanation, execution process, variable and reference changes, result reasoning, and common-error analysis.
5. The final mini project does not replace the earlier section-by-section teaching.
6. API tables, directories, file structures, and cheatsheets do not replace core concept explanations.
7. Every critical item in `references/output-checklist.md` passes.

Hard-fail the delivery if any of the following is true:

1. The guide uses macOS code-window HTML but lacks the required style definitions or an explicit, standalone-safe style source.
2. The TOC omits any core `9.x` subsection.
3. A core `9.x` section is label-only filler and has no section-specific mechanism evidence chain.
4. A mechanism explanation can be copied unchanged into another chapter.
5. The final mini project overwhelms or substitutes for the core teaching sections.
6. Any path presented as a real file does not exist locally.
7. Real-file code-window title bars and the final file list disagree.
8. A `Snippet:` or `Template:` is listed as a real final file.
9. The self-check provides only claims such as `已检查` instead of verifiable evidence.
10. Required lint/build commands were not run, but the final response claims they passed.

Before final delivery, produce an evidence-based self-check table with the columns `检查项`, `结果`, and `证据`. Mark every result `PASS`, `FAIL`, or `UNKNOWN`. Cite concrete evidence such as a file path, exact heading, command result, verified file count, required style class, or complete-code mapping; do not write only `已检查`. If any item is `FAIL`, continue revising and do not deliver the guide as a final result. Use `UNKNOWN` when a check was not actually performed and do not present the guide as fully verified.

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
    - A full guide that contains macOS code-window HTML must be self-contained: define `.macos-code-window`, `.macos-code-titlebar`, `.macos-code-dot`, `.macos-code-dot-red`, `.macos-code-dot-yellow`, `.macos-code-dot-green`, `.macos-code-title`, `.macos-code-titlebar + pre`, and `.macos-code-titlebar + pre code` in its opening `<style>` block.
    - If a future guide intentionally uses an external stylesheet, state the exact source in the guide and preserve a standalone explanation of the code-window structure. Do not silently omit styles.
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
