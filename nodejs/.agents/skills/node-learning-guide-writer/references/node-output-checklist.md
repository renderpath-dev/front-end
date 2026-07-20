# Node.js Guide Output Checklist

Before finishing, verify every applicable item. Use `PASS`, `FAIL`, or `UNKNOWN`, and record concrete evidence. Treat `UNKNOWN` as unresolved, not successful.

## Contents

- Scope, sources, teaching quality, structure, anchors, files, and language
- Runtime, asynchronous work, process, HTTP, middleware, stream, module, and TypeScript gates
- npm, tooling, filesystem, child process, worker, diagnostics, security, and deployment gates
- macOS code-window, final project, React integration boundary, and final response gates
- Hard-fail conditions and evidence-based self-check

## Scope and Sources

- [ ] The guide topic, learner level, target file, chapter identity, Node.js version, npm version, module system, TypeScript mode, and framework are explicit when relevant.
- [ ] The nearest applicable `AGENTS.md` or filename case variant was read.
- [ ] Relevant local guides, cheatsheets, configuration, scripts, and real practice files were inspected.
- [ ] The GitHub frontend writer files were inspected read-only as the quality baseline, or the unavailable comparison is marked `Verification Needed`.
- [ ] Current official documentation was used for version-sensitive behavior.
- [ ] Local books and older notes were treated as supporting sources rather than final API authority.
- [ ] No claim relies only on model memory where current verification is required.

## Teaching Quality

- [ ] The guide is teaching-oriented, not a summary or scaffold walkthrough.
- [ ] The body is primarily mechanism-focused explanation.
- [ ] Every core `9.x` section contains substantially more than a brief overview.
- [ ] Required labels contain subsection-specific evidence rather than generic filler.
- [ ] Each core `9.x` section contains at least one mechanism chain from trigger through values, API, scheduling/resource boundary, lifecycle transition, TypeScript boundary, observation, violated rule, and real-project recognition.
- [ ] Explanations cannot be copied unchanged into an unrelated Node.js, JavaScript, or TypeScript chapter.
- [ ] Code, API tables, structures, debugging methods, review tasks, and the mini project do not replace concept explanations.
- [ ] Every non-trivial code block has significant line explanations, execution process, variable/reference/resource/lifecycle changes, result reasoning, a contrast, and common-error analysis.
- [ ] Incorrect examples identify the exact violated rule, correction, and recognition method.

## Structure and Language

- [ ] The H1 contains the technology, chapter number, and concrete chapter name.
- [ ] A new chapter uses a consistent identity across directory, filename, H1, TOC, learning evidence map, and title bars.
- [ ] The body and ordinary structural headings are Chinese.
- [ ] Technical terms retain English names where useful.
- [ ] English template headings are removed.
- [ ] `## 目录` appears after the title and optional style block but before `## 0. 章前定位`.
- [ ] The TOC lists every numbered top-level section from `0` through `18`.
- [ ] The TOC lists every core `9.x` subsection through the actual final subsection.
- [ ] The TOC lists important `14.x` final-project subsections.
- [ ] The TOC does not list internal bold teaching labels.
- [ ] `## 本章代码定位索引` is present when real practice or final-project files exist.
- [ ] Core sections use `### 9.x` headings and bold teaching labels instead of a long stack of H4 headings.
- [ ] Sections `0` through `18` use the required learning-only headings.
- [ ] Section 15 is `知识迁移与真实项目场景`.
- [ ] Section 16 is `本章复盘任务`.
- [ ] The guide includes a final mini project, final mental model, and official reading list.

## Stable Anchors and File Integrity

- [ ] Every core `9.x` TOC link uses the matching `#section-9-x` target.
- [ ] Every core `9.x` heading has the matching explicit `<a id="section-9-x"></a>` immediately before it.
- [ ] Anchor IDs are unique and numbering continues through the final core subsection.
- [ ] Meaningful heading text was not changed only to influence slug generation.
- [ ] The code location index is a learning evidence map using exactly `学习目标`, `文件或片段`, and `可观察证据`.
- [ ] The learning evidence map uses only verified real relative paths, `Snippet: name`, `Terminal`, `Output`, or `Error`.
- [ ] The learning evidence map does not use delivery columns or values such as `类型`, `Status`, `已创建`, `已更新`, `已创建并可运行`, `真实练习文件`, or `模板`.
- [ ] Every path labeled as real exists locally.
- [ ] Real paths agree across the learning evidence map, practice instructions, title bars, and final-project structure.
- [ ] Conceptual evidence uses `Snippet:` and does not masquerade as a real file.
- [ ] `Template:` is used only for reusable code-window patterns, not as a learning-evidence-map label.
- [ ] Practice and project structures appear only when they explain learning flow, ownership, boundaries, or responsibilities.

## Guide Body Boundary Gate

- [ ] The guide body contains learning content only.
- [ ] It contains no final file inventory and no list of files created, updated, moved, or deleted.
- [ ] It contains no delivery report, audit report, self-check table, Codex execution notes, or validation command output.
- [ ] It contains no `PASS` / `FAIL` / `UNKNOWN` evidence table.
- [ ] It contains no companion-file usage instructions.
- [ ] It contains no sections titled `速查表使用方式`, `面试题使用方式`, or `最终文件清单`.
- [ ] It contains no status language such as `本章交付文件如下`, `已创建并可运行`, `真实练习文件`, or `Status`.
- [ ] `当前项目结构` and `本章文档结构` are absent when they would only inventory repository contents or file status.
- [ ] Debugging and validation commands in section 12 teach the chapter mechanism rather than report Codex validation activity.
- [ ] A requested cheatsheet or interview-question document is a separate companion file, not a section in the main guide.

## Language Inside Examples

- [ ] Code identifiers, comments, filenames, commands, APIs, packages, runtime strings, raw output, and raw errors are English-only.
- [ ] No Chinese/CJK characters appear inside source-code fences.
- [ ] Fenced language identifiers are accurate: `js`, `mjs`, `cjs`, `ts`, `mts`, `cts`, `bash`, `json`, `html`, `css`, or `txt`.

## Node.js Runtime Gate

- [ ] The guide explains Node.js as a JavaScript runtime and platform, not only through framework templates.
- [ ] Core sections distinguish JavaScript runtime behavior, Node platform APIs, TypeScript behavior, emitted JavaScript, tooling, and framework conventions.
- [ ] Runtime sections identify V8, Node bindings, libuv, event-loop implications, and operating-system boundaries to the depth required by the topic.

## Asynchronous Work Gate

- [ ] Relevant sections explain microtasks, timers, I/O callbacks, thread-pool work, event-loop implications, and blocking versus non-blocking behavior.
- [ ] Scheduling-order claims state context and version constraints rather than claiming a universal order.
- [ ] CPU-heavy work is distinguished from asynchronous I/O.

## Process Gate

- [ ] Relevant sections trace process startup, arguments, environment variables, standard streams, signals, exit codes, pending resources, and termination.
- [ ] Abrupt termination and graceful lifecycle completion are distinguished.

## HTTP Gate

- [ ] HTTP sections trace method, URL, request object, response object, headers, body chunks, status code, `write`, `end` or framework send/reply behavior, and lifecycle termination.
- [ ] Aborts, errors, timeouts, cancellation, and cleanup are explained when relevant.
- [ ] External input is treated as runtime data requiring parsing and validation.

## Middleware and Framework Gate

- [ ] Middleware sections explain ordering, delegation, short-circuiting, error propagation, response completion, and hanging requests.
- [ ] Express sections explain `next()`, error middleware, and request/response completion.
- [ ] Fastify sections explain applicable schemas, plugins, hooks, encapsulation, replies, and TypeScript behavior.
- [ ] NestJS sections connect modules, controllers, providers, guards, pipes, interceptors, filters, and adapters to runtime flow when applicable.
- [ ] Hono sections explain Web Standards request/response objects, Fetch-style handlers, runtime adapters, edge compatibility, and multi-runtime constraints when applicable.
- [ ] Framework teaching compares route-handler and middleware, hook, plugin, or adapter mechanics instead of presenting templates only.

## Stream and Buffer Gate

- [ ] Stream sections explain chunks, Buffer/string boundaries, readable and writable lifecycle, `pipe` or `pipeline`, backpressure, high-water marks when relevant, errors, aborts, and cleanup.
- [ ] The guide explains resource closure and error ownership.

## Module and Package Gate

- [ ] Module sections explain relevant CommonJS, ESM, extension rules, nearest `package.json`, `type`, `exports`, `imports`, entry points, caching, live bindings, and interop.
- [ ] Package sections explain relevant `main`, `bin`, scripts, dependency fields, conditions, and public entry points.
- [ ] Node.js resolution is distinguished from TypeScript and bundler resolution.

## TypeScript Gate

- [ ] TypeScript sections explain type erasure, native type stripping, transform-requiring syntax constraints when relevant, transpilation, and Node.js runtime execution.
- [ ] `tsc --noEmit`, emitted JavaScript, `module`, `moduleResolution`, `NodeNext`, declarations, and source maps are covered when relevant.
- [ ] The guide states what TypeScript checks and what it does not validate at runtime.
- [ ] External data has an explicit runtime validation boundary.

## npm and Tooling Gate

- [ ] Package/tooling sections explain relevant npm scripts, `package.json`, lockfiles, `npm ci` versus `npm install`, `npm run`, workspaces, audits, lint/format/test commands, and CI relevance.
- [ ] Install and lifecycle-script behavior is sourced from the matching npm version.
- [ ] Publishing sections verify package contents, registry, access, version, authentication, provenance, secrets, and current official behavior.
- [ ] The guide does not imply that audit output alone proves an application is secure.

## Filesystem, Child Process, Worker, and Diagnostics Gate

- [ ] Relevant sections trace paths, handles or descriptors, callbacks or promises, stdio, exit codes, signals, IPC, worker messages, clone/transfer behavior, cleanup, and failure ownership.
- [ ] Worker threads, child processes, libuv thread-pool work, and the main JavaScript thread are not conflated.
- [ ] Diagnostics claims identify the measured signal and its limitations.

## Security and Deployment Gate

- [ ] Untrusted input, parsing, runtime validation, authentication, authorization, resource limits, timeouts, cancellation, cleanup, logging, and secret boundaries are identified where relevant.
- [ ] URL, filesystem, process, network, proxy, container, and platform boundaries are explicit when applicable.
- [ ] A library or framework call is not presented as a complete security model.
- [ ] Security-sensitive and deployment behavior uses current official documentation.

## macOS Code-Window Gate

- [ ] The guide's self-contained style block defines `.macos-code-window`.
- [ ] It defines `.macos-code-titlebar`.
- [ ] It defines `.macos-code-dot`, `.macos-code-dot-red`, `.macos-code-dot-yellow`, and `.macos-code-dot-green`.
- [ ] It defines `.macos-code-title`.
- [ ] It defines `.macos-code-titlebar + pre` and `.macos-code-titlebar + pre code`.
- [ ] No generated Markdown defines or uses `.macos-code-window + pre`.
- [ ] Every title bar is HTML and is followed by a normal Markdown fenced code block inside the same `.macos-code-window` container.
- [ ] Every `.macos-code-window` closing `</div>` appears after its fenced code block.
- [ ] Every title bar uses `macos-code-title`, not `macos-code-filename`.
- [ ] Every title bar contains red, yellow, and green dots.
- [ ] Every dot uses `macos-code-dot` plus exactly one color class.
- [ ] No generated window uses `macos-code-dot red`, `macos-code-dot yellow`, or `macos-code-dot green`.
- [ ] Every title bar uses a verified file path, `Snippet:`, `Template:`, `Terminal`, `Output`, or `Error`.
- [ ] Real file paths are used only when the file exists in the nearby project structure.
- [ ] Conceptual examples use `Snippet:` labels and reusable patterns use `Template:` labels.
- [ ] Commands use `Terminal`, expected output uses `Output`, and error output uses `Error`.
- [ ] Decorative HTML stays outside the real source code.
- [ ] No source code appears inside raw HTML `<pre><code>` tags.
- [ ] Source code blocks contain no Chinese/CJK characters.
- [ ] Source code, comments, commands, runtime strings, and identifiers are English-only; Chinese explanations stay outside source-code blocks.
- [ ] Source remains clean, copyable, and executable.
- [ ] Generated Chapter 01 Markdown files use the same code-window structure and selectors as the React learning-guide template.

## Final Mini Project Gate

- [ ] The section begins by stating that the project integrates the chapter and does not replace prior teaching.
- [ ] No core concept appears only in the final project.
- [ ] The project does not outweigh or hide shallow `9.x` teaching.
- [ ] The project explains scope, structure, file responsibilities, data flow, resource ownership, execution flow, failure paths, cleanup, run/test commands, expected behavior, common errors, and validation.

## React Integration Boundary

- [ ] React snapshots, hooks, reconciliation, Fiber, or React-specific state evidence is required only when the guide explicitly covers React integration.
- [ ] A Node-only guide does not fail because React-specific evidence is absent.

## Final Response Gate

- [ ] The final response separately lists files created, updated, moved, and deleted.
- [ ] It lists companion files created or updated.
- [ ] It lists GitHub baseline files used.
- [ ] It lists local `D:\node.js` files inspected.
- [ ] It lists official documentation used.
- [ ] It lists exact validation commands and exact results.
- [ ] It lists limitations and `Verification Needed` notes.
- [ ] It includes an evidence-based table with `检查项`, `结果`, and `证据`.
- [ ] No unperformed validation is reported as passed.

## Hard-Fail Conditions

Treat any applicable condition as `FAIL`:

1. The guide teaches Node.js only through framework scaffolds and never explains the runtime or platform boundary.
2. A core `9.x` section contains label-only filler and no concrete mechanism evidence chain.
3. The TOC omits a core `9.x` subsection.
4. A core `9.x` TOC entry lacks its matching explicit stable anchor or an anchor ID is duplicated.
5. A real path does not exist or disagrees across the learning evidence map, practice instructions, title bars, and final-project structure.
6. The learning evidence map uses delivery/status columns or presents conceptual evidence as a real file.
7. HTTP, middleware, stream, module, package, process, or TypeScript lifecycle boundaries are materially wrong or missing.
8. The guide implies TypeScript validates external data at runtime.
9. Version-sensitive or security-sensitive behavior relies only on model memory.
10. A source-code fence contains Chinese/CJK characters.
11. A major code, terminal, output, or error fence violates the macOS code-window policy.
12. Source code is placed inside raw HTML `<pre><code>`.
13. The final mini project substitutes for or overwhelms the core teaching.
14. A validation result is marked `PASS` without reproducible evidence.
15. A command was not run, but the response claims it passed.
16. The guide body contains delivery inventory, audit/self-check output, Codex execution notes, validation logs, or companion-file usage instructions.
17. Section 15 is not `知识迁移与真实项目场景` or section 16 is not `本章复盘任务`.

## Evidence-Based Self-Check

Use this table in the final response:

| 检查项 | 结果 | 证据 |
| --- | --- | --- |
| Replace with a specific check | PASS / FAIL / UNKNOWN | Cite an exact path, heading, command result, verified count, selector, or complete-file mapping. |

If a critical item is `FAIL`, continue revising. Do not deliver the guide as complete.
