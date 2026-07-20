# Node.js Learning Guide Standard

Use this standard for substantial Markdown learning guides about Node.js, backend JavaScript, server-side TypeScript, Node platform APIs, packages, tooling, backend frameworks, testing, security, deployment, and full-stack Node integration.

## Contents

- Core output principles and explanation-first teaching
- Label quality, concept boundaries, and mechanism evidence
- Research, language, title, structure, and stable-anchor rules
- Core section, structure-type, real-file, and code-window contracts
- Code-example and Node.js topic-specific requirements
- Final mini project, companion-file boundaries, knowledge transfer, review tasks, and delivery

## Core Output Principles

- Write a teaching-oriented guide, not a summary, checklist, API list, scaffold walkthrough, or snippet collection.
- Teach Node.js as a JavaScript runtime and platform outside the browser.
- Use professional terminology, rigorous explanations, and mechanism-first teaching.
- Explain the problem a concept solves, its responsible layer, the runtime or tool behavior, the resulting lifecycle transition, why the observed result occurs, why contrasting forms differ, why common errors occur, and how the concept appears in real projects.
- Do not assume the learner already understands closures, promises, microtasks, the event loop, libuv, descriptors, sockets, streams, module loading, package resolution, type erasure, native type stripping, or server/runtime boundaries.
- Do not add unrelated frameworks, databases, tools, or architecture merely to make a chapter look production-like.

## Explanation-First Rule

A full chapter must derive most of its value from mechanism-focused explanation. Code, learning-evidence paths, API tables, debugging methods, review tasks, and the final mini project support the teaching; they do not replace it. Separate companion documents may support later recall, but they are not embedded sections in the main guide.

When space is limited, preserve content in this order:

1. Core concept explanation.
2. Underlying mechanism and lifecycle.
3. Line-by-line explanation.
4. Execution process and resource changes.
5. Error causes and violated rules.
6. Real-project recognition and application.

Reject a guide that provides mostly structures and source code, uses the final project instead of section-by-section teaching, substitutes an API table for explanation, or gives each concept a short overview before moving directly to code.

## No Label-Only Filling Rule

Required teaching labels are an outline, not evidence of quality. Bind each explanation to the subsection's actual command, values, objects, APIs, resources, transitions, output, errors, and project scenario.

Apply a portability test: if a paragraph can be copied unchanged into an unrelated Node.js, JavaScript, or TypeScript chapter, it is too generic. Rewrite it with section-specific evidence.

Do not use statements such as “Node.js handles asynchronous work,” “TypeScript checks the type,” “middleware runs in order,” or “streams save memory” as complete mechanism explanations. Name the exact callback, promise, request, response, stream state, module record, package field, scheduler, resource, owner, transition, and observation.

## Required Concept Boundaries

Separate the relevant layers:

| Layer | Required distinction |
| --- | --- |
| Syntax | Grammar, fixed names, call signatures, and language constructs |
| JavaScript runtime | Evaluation, stacks, closures, promises, microtasks, objects, prototypes, and exceptions |
| Node platform API | Built-in modules, globals, native bindings, lifecycle events, and Node-specific contracts |
| Event loop and libuv | Scheduling phases, I/O completion, timer behavior, thread-pool work, and blocking implications |
| Operating system | Files, descriptors, sockets, processes, signals, threads, permissions, and kernel buffers |
| Stream model | Chunks, Buffer or string boundaries, readable/writable state, backpressure, and termination |
| Module system | CommonJS and ESM loading, evaluation, caching, live bindings, and interop |
| Package resolution | File extensions, nearest `package.json`, entry points, conditions, exports, imports, and dependency metadata |
| TypeScript | Static checking, type erasure, native type stripping, transpilation, emission, and resolution |
| Tooling | npm, scripts, lockfiles, linters, formatters, test runners, builds, and CI |
| Framework convention | Routing, middleware, hooks, plugins, dependency injection, encapsulation, and adapters |
| Deployment/runtime environment | Environment variables, proxies, containers, process managers, networks, filesystems, and platform limits |

Do not claim that TypeScript validates HTTP bodies, environment variables, database rows, parsed JSON, messages, or other external data at runtime. Show the runtime validation boundary.

## Mechanism Evidence Chain

Every core `9.x` section must include at least one concrete chain:

1. Trigger: command, request, file operation, import, event, timer, stream operation, child process, worker, or test execution.
2. Values: strings, arguments, objects, callbacks, promises, closures, buffers, chunks, streams, requests, responses, errors, module records, or package metadata.
3. API: the exact Node.js or framework API that receives or creates those values.
4. Scheduling: synchronous evaluation, microtask, timer, I/O callback, libuv work, thread-pool work, process event, or worker execution.
5. Resource: descriptor, file, socket, process, signal, kernel buffer, thread, environment, or external service.
6. Transition: open, read, write, end, close, abort, error, resolve, reject, load, evaluate, cache, route, delegate, reply, test, or exit.
7. TypeScript boundary: what is checked, erased, stripped, emitted, or left unvalidated.
8. Observation: output, response, header, status, file state, stream state, error, test result, timing, or process state.
9. Failure rule: the exact violated contract and why the wrong result follows.
10. Recognition: logs, stack traces, symptoms, inspection commands, or tests that identify the same class of failure.

When a link is not relevant, state why instead of adding generic filler.

## Research Requirement

- Inspect local project files and learning materials first.
- Use the GitHub frontend writer files as the structural and quality baseline.
- Verify factual and version-sensitive claims against current official documentation.
- Follow `node-source-policy.md`.
- Do not rely only on model memory for Node.js, npm, TypeScript, frameworks, tests, security, publishing, CI, or deployment.
- Add `Verification Needed` when required official documentation cannot be accessed.
- List local files, GitHub baseline files, and official documentation used in the final response.

## Language and Heading Rules

- Write the guide body and ordinary structural headings in Chinese.
- Keep technical terms in English or introduce them as Chinese with English in parentheses.
- Keep identifiers, filenames, commands, APIs, package names, runtime strings, code comments, and raw errors in English.
- Do not put Chinese/CJK characters inside source-code blocks.
- Do not leave English template headings in the final guide.
- Allow clear English table headers when they improve scanability.
- Use `###` for core `9.x` concepts and bold labels inside them rather than many H4 headings.

## Chapter Title Rule

The H1 of every full guide must contain:

1. The technology or technical topic.
2. The chapter number.
3. The concrete chapter name.

Keep a new chapter's identity consistent across its directory, filename, H1, TOC, learning evidence map, and code-window paths. Do not rename an established existing path merely to satisfy this rule; align the in-document identity instead.

## Required Full Chapter Structure

Use this order unless the user explicitly asks for a smaller document:

1. H1 with technology, chapter number, and concrete chapter name.
2. Opening self-contained code-window style block when examples are present.
3. `## 目录`.
4. `## 本章代码定位索引` when real practice or final-project files are present.
5. `## 0. 章前定位`.
6. `## 1. 学习目标`.
7. `## 2. 前置知识`.
8. `## 3. 环境与运行基线`.
9. `## 4. 第一性原理`.
10. `## 5. 技术边界模型`.
11. `## 6. 底层机制模型`.
12. `## 7. 核心术语`.
13. `## 8. 本章实践路线`.
14. `## 9. 核心教学`.
15. `## 10. API 与规则索引`.
16. `## 11. 常见错误对照表`.
17. `## 12. 调试与验证方法`.
18. `## 13. 分项练习说明`.
19. `## 14. 最终迷你项目`.
20. `## 15. 知识迁移与真实项目场景`.
21. `## 16. 本章复盘任务`.
22. `## 17. 最终心智模型`.
23. `## 18. 官方资料`.

The TOC must list every numbered top-level section, every core `9.x` subsection, and important `14.x` final-project subsections. Do not include internal bold teaching labels in the TOC.

## Learning-Only Guide Body Rule

The main guide is a teaching document. It may contain:

- chapter positioning, learning goals, prerequisites, environment and runtime baselines
- first-principles explanation, technology boundaries, underlying mechanism models, and core terms
- a practice route and a learning-facing code evidence map
- section-by-section mechanism teaching, API and rule indexes, common-error tables, and debugging methods
- practice reasoning, a final mini project, knowledge transfer, chapter review tasks, a final mental model, and official reading

The guide body must not contain:

- a final file inventory or a list of files created, updated, moved, or deleted
- delivery reports, audit reports, self-check tables, Codex execution notes, or validation command output
- `PASS` / `FAIL` / `UNKNOWN` tables
- companion-file usage instructions or sections titled `速查表使用方式` or `面试题使用方式`
- sections titled `最终文件清单`
- status language such as `本章交付文件如下`, `已创建并可运行`, `真实练习文件`, or `Status`
- `当前项目结构` or `本章文档结构` when it serves only as a repository or file-status inventory

Keep debugging and verification commands only when they teach the chapter mechanism. Never paste Codex validation logs or delivery evidence into the guide.

Create or update a chapter cheatsheet and chapter interview questions as separate companion files when project rules request them. Do not add companion-use sections to the main guide. Report those companion files in the final response.

The final response, not the guide body, contains files created, updated, moved, and deleted; companion files; local files inspected; GitHub baselines; official sources; exact validation commands and results; limitations; and an evidence table using `检查项`, `结果`, and `证据`.

## Stable Section Anchor Rule

For every core subsection:

- Link the TOC entry for `9.1` to `#section-9-1`.
- Place `<a id="section-9-1"></a>` immediately before `### 9.1 ...`.
- Keep at most one blank line between the anchor and heading.
- Continue the same pattern through the actual final `9.x` subsection.
- Keep anchor IDs unique.
- Do not rely on complex automatic slugs or change meaningful heading text merely to influence slug generation.

A missing, mismatched, or duplicate stable anchor is a delivery failure.

## Core Section Contract

Use these bold labels where relevant:

- **结论**
- **本节解决的问题**
- **技术意义**
- **概念解释**
- **边界：语法、JavaScript 运行时、Node 平台 API、模块系统、类型系统、工具链与框架约定**
- **底层机制**
- **API / 语法规则**
- **固定属性名 / 固定方法名 / 参数签名**
- **示例结构**
- **示例代码**
- **逐行解释**
- **运行方式**
- **预期输出**
- **执行过程**
- **变量、引用、资源与生命周期变化**
- **为什么会得到这个结果**
- **对比情况**
- **常见错误为什么错**
- **与真实项目的关系**
- **与当前学习路径的关系**
- **最终记忆模型**

Do not force irrelevant labels into a section. Do not leave a label with a generic one-line answer. If no new API exists, state that the section focuses on mechanism.

## Structure Type Rules

Distinguish:

- `概念示例结构`: logical snippets used only for teaching; no files need to be created.
- `练习结构`: verified practice paths used as learning evidence.
- `最终迷你项目结构`: files and responsibilities needed to explain the integrated project.

Use a structure only when it teaches ownership, module boundaries, execution flow, or project responsibilities. Do not add `当前项目结构` or `本章文档结构` merely to inventory repository contents or describe delivery status.

## Code Location and Real File Rules

- Add `## 本章代码定位索引` after the TOC when real practice or final-project files exist.
- Treat it as a learning evidence map with exactly these columns: `学习目标`, `文件或片段`, and `可观察证据`.
- Connect each learning goal to an exact real relative path, `Snippet: name`, `Terminal`, `Output`, or `Error`.
- Do not use `类型`, `Status`, `已创建`, `已更新`, `已创建并可运行`, `真实练习文件`, or `模板` as evidence-map columns or values.
- Verify every path presented as real in the map, practice instructions, title bars, and final-project structure.
- Make real paths agree across all these locations.
- Use `Snippet:` for conceptual evidence that does not correspond to a verified file.
- `Template:` remains valid for a reusable code-window pattern but is not a learning-evidence-map label.
- Never describe a missing file as created, updated, or real in the guide body.
- Treat real-path verification as final-response evidence rather than delivery prose inside the guide.

## macOS Code-Window Rule

Every major code, terminal, output, and error example must use the exact HTML title-bar and fenced Markdown structure from `../assets/macos-code-window-template.md`.

- The title bar is HTML.
- The real code is a normal Markdown fenced code block.
- Place the fenced code block inside the same `.macos-code-window` container immediately after the title bar.
- Place the closing `</div>` for `.macos-code-window` after the fenced code block.
- Every title uses `macos-code-title`, never `macos-code-filename`.
- Include red, yellow, and green dots. Every dot uses `macos-code-dot` plus `macos-code-dot-red`, `macos-code-dot-yellow`, or `macos-code-dot-green`.
- Keep decorative HTML outside the fenced source.
- Use a real path only when the file exists in the nearby project structure.
- Use `Snippet:` for conceptual examples and `Template:` for reusable patterns.
- Use `Terminal` for commands, `Output` for expected output, and `Error` for error output.
- Use an accurate language identifier: `js`, `mjs`, `cjs`, `ts`, `mts`, `cts`, `bash`, `json`, `html`, `css`, or `txt`.
- Never put source code inside raw HTML `<pre><code>` tags.
- Keep source code, comments, commands, runtime strings, and identifiers in English only.
- Keep Chinese explanations outside source-code blocks.
- Include a self-contained opening style block defining `.macos-code-window`, `.macos-code-titlebar`, `.macos-code-dot`, all three dot colors, `.macos-code-title`, `.macos-code-titlebar + pre`, and `.macos-code-titlebar + pre code`.
- Never generate `macos-code-filename`, `macos-code-dot red`, `macos-code-dot yellow`, `macos-code-dot green`, or `.macos-code-window + pre`.

## Code Example Requirements

Every non-trivial example must include:

- correct code
- expected output, response, file state, stream state, process state, or compiler result
- line-by-line explanation of significant lines
- runtime and resource execution process
- values, references, resources, and lifecycle changes
- a meaningful contrasting case
- a common incorrect form
- the exact violated rule
- a corrected form
- a real-project recognition method

For TypeScript, separate checking, native type stripping or transpilation, emitted JavaScript, Node.js execution, and runtime validation.

## Topic-Specific Requirements

### Runtime and asynchronous work

Explain V8, Node.js bindings, libuv, event-loop implications, microtasks, timers, I/O callbacks, thread-pool work, and blocking versus non-blocking behavior where relevant. Avoid unconditional scheduling-order claims when context, runtime version, or operating system changes the result.

### Processes and command-line execution

Trace arguments, environment variables, standard streams, signals, exit codes, listeners, pending resources, and process termination. Explain why setting `process.exitCode` differs from abruptly terminating when relevant.

### Modules and packages

Explain CommonJS and ESM as separate systems. Cover relevant extensions, nearest `package.json`, `type`, `exports`, `imports`, `main`, `bin`, scripts, dependency fields, entry points, resolution, caching, live bindings, interop, and `NodeNext`. Distinguish Node.js resolution from TypeScript and bundler resolution.

### HTTP

Trace method, URL, headers, body chunks, request object, response object, status, writes, `end` or framework send/reply calls, aborts, errors, timeouts, and termination.

### Middleware and frameworks

Explain handler ordering, delegation, short-circuiting, error propagation, and completion. For Express, cover `next()`, error middleware, and hanging requests. For Fastify, cover schemas, plugins, hooks, encapsulation, replies, and TypeScript. For NestJS, map architecture features and the selected adapter to runtime flow. For Hono, explain Web Standards objects and the selected runtime adapter.

### Streams and buffers

Explain chunks, Buffer/string boundaries, readable and writable states, `pipe`, `pipeline`, backpressure, high-water marks when relevant, errors, aborts, cleanup, and resource closure. Do not define streams only as “processing data in pieces.”

### Filesystem, child processes, and workers

Trace paths, handles or descriptors, callbacks or promises, stdio, exit codes, signals, IPC, worker messages, structured cloning or transfer, cleanup, and failure ownership. Distinguish asynchronous I/O from CPU parallelism.

### TypeScript

Explain type erasure, native type stripping constraints, transform-requiring syntax where relevant, transpilation, `tsc --noEmit`, emitted JavaScript, source maps, `module`, `moduleResolution`, `NodeNext`, declarations, and runtime validation.

### npm and tooling

Explain relevant `package.json` fields, scripts, lifecycle scripts, lockfiles, `npm ci`, `npm install`, `npm run`, workspaces, audits, linting, formatting, testing, CI, package contents, and publishing. Verify external writes, authentication, access, provenance, and secrets against current official documentation.

### Security and deployment

Trace untrusted input, parsing, runtime validation, authorization, URL and filesystem boundaries, size/rate limits, timeouts, cancellation, cleanup, dependency risk, logs, secrets, proxies, processes, containers, and platform limits when relevant. Do not present a single package call as a complete security model.

## Final Mini Project

Every full guide must include a final mini project that integrates already-taught mechanisms. Open the section with a natural sentence stating that the project integrates the chapter and does not replace earlier section-by-section teaching.

Include:

- project goal and scope
- why the project fits the chapter
- verified or explicitly proposed structure
- each file's responsibility
- complete required code
- run and test commands
- expected behavior
- core execution and lifecycle flow
- failure paths and cleanup
- common errors
- possible extensions

Reject the chapter when a core concept appears only in the project or when project code overwhelms shallow `9.x` teaching.

## Companion Files

When requested by project rules, maintain three separate document roles:

- chapter learning guide: first-time, mechanism-first teaching
- chapter cheatsheet: concise recall, comparison, and error diagnosis
- chapter interview questions: mechanism explanation and transfer practice

Do not embed instructions for using the companion files inside the main guide. The final response reports which companion files were created or updated.

## Knowledge Transfer and Chapter Review

Section 15 connects the chapter mechanism to real backend or full-stack projects, framework behavior, production debugging, infrastructure, and deployment boundaries where relevant.

Section 16 gives review tasks that require the learner to explain, reproduce, contrast, diagnose, and transfer the mechanism. It is not a companion interview-file usage section.

## Delivery Requirement

Perform an evidence-based self-check against `node-output-checklist.md`. Use the columns `检查项`, `结果`, and `证据`. Mark each result `PASS`, `FAIL`, or `UNKNOWN` and cite reproducible evidence.

Keep Delivery Gate text, self-check tables, execution notes, and change summaries in the final response, not in the learning guide body.

The final response must list files created, updated, moved, and deleted; companion files created or updated; local files inspected; GitHub baseline files; official documentation sources; exact validation commands and results; limitations or `Verification Needed`; and the evidence table.

If any critical item is `FAIL`, continue revising. Do not present the guide as delivered.
