---
name: node-learning-guide-writer
description: "Use this skill for creating, updating, expanding, or reviewing teaching-oriented Markdown learning guides for Node.js, backend JavaScript, server-side TypeScript, Node runtime APIs, package/tooling workflows, HTTP servers, streams, file system, child processes, workers, diagnostics, test runner, security, Express, Fastify, NestJS, Hono, API design, backend project structure, and full-stack Node integration."
---

# Node.js Learning Guide Writer

## Purpose

Write mechanism-first Node.js learning guides for serious backend and full-stack JavaScript study. Teach the runtime, platform, package, tooling, TypeScript, server, and framework boundaries behind the code instead of producing shallow summaries, API lists, scaffold walkthroughs, or snippet collections.

This is an instruction-only skill. Do not add scripts, application code, runtime dependencies, or project dependencies for guide-writing tasks. Only edit the requested learning document unless the user explicitly requests a separate implementation task.

Teach, when relevant:

- Node.js as a JavaScript runtime outside the browser.
- V8, libuv, the event loop, asynchronous I/O, microtasks, timers, the thread pool, and blocking versus non-blocking work.
- Process lifecycle, environment variables, command-line execution, `stdin`, `stdout`, `stderr`, signals, and exit codes.
- CommonJS and ESM loading, package resolution, and `package.json` fields such as `type`, `exports`, `imports`, `main`, `bin`, `scripts`, and dependency fields.
- Built-in APIs including `node:http`, `node:https`, `node:fs`, `node:path`, `node:url`, `node:stream`, `node:events`, `node:process`, `node:child_process`, `node:worker_threads`, `node:test`, `node:assert`, `node:crypto`, `node:buffer`, `node:timers`, `node:os`, `node:net`, and `node:dns`.
- Request/response lifecycles, server behavior, stream lifecycles, chunks, buffers, piping, backpressure, middleware composition, and handler flow.
- Errors, cancellation, timeouts, aborts, cleanup, diagnostics, and security boundaries.
- Type erasure, native type stripping, transpilation, `tsc` checking, `NodeNext` module resolution, emitted JavaScript, and runtime validation.
- npm, `package.json`, lockfiles, scripts, workspaces, `npm ci`, `npm install`, `npm run`, audits, linting, formatting, tests, CI, and publishing.

## Resource Map

- Read `references/node-learning-guide-standard.md` before creating, expanding, reviewing, or substantially updating a guide.
- Read `references/node-source-policy.md` before selecting sources or writing version-sensitive runtime, package, tool, framework, security, publishing, CI, or deployment content.
- Read `references/node-output-checklist.md` before finalizing any guide.
- Use `assets/node-chapter-guide-template.md` for new full chapter guides unless the user explicitly requests a smaller document.
- Use `assets/macos-code-window-template.md` for every source-code, terminal, expected-output, or error-output example.

## Workflow

1. Inspect `D:\node.js` first.
   - Read the nearest applicable `AGENTS.md` or filename case variant.
   - Read relevant `README.md`, `package.json`, lockfiles, `tsconfig` files, ESLint and Prettier configuration, existing guides, existing cheatsheets, and actual practice files.
   - Search before assuming a path, package, framework, version, script, or architecture exists.
   - Ignore generated outputs, dependencies, IDE files, and archived material unless the task specifically targets them.

2. Establish the guide scope.
   - Identify the topic, learner level, target file, chapter identity, Node.js version, npm version, module system, TypeScript mode, framework, and whether the task is create, update, expand, or review.
   - For review tasks, inspect and report findings before editing unless the user explicitly requests direct changes.
   - Keep changes small and limited to the requested learning document.

3. Load the quality baseline.
   - Fetch the existing writer rules read-only from `renderpath-dev/front-end` at `react/.agents/skills/frontend-learning-guide-writer/` when GitHub access is available.
   - Use the writer skill, learning-guide standard, documentation policy, output checklist, and macOS code-window template as structural and quality references.
   - Use `react/.agents/skills/frontend-cheatsheet-writer/SKILL.md` to preserve the guide-versus-cheatsheet boundary.
   - Never update remote files, create commits, create branches, or create pull requests as part of guide writing.
   - If GitHub cannot be accessed, use the bundled Node-specific rules and report `Verification Needed` for the unavailable baseline comparison.

4. Select and verify technical sources.
   - Prefer local project materials for the learner's actual path and repository truth.
   - Use the source order and conflict rules in `references/node-source-policy.md`.
   - Verify version-sensitive claims with current official documentation.
   - Never rely only on model memory for Node.js, TypeScript, npm, tests, backend frameworks, security, publishing, deployment, CI, or module resolution.
   - Add a visible `Verification Needed` note when required official documentation cannot be accessed.

5. Write the guide.
   - Write the guide body and ordinary structural headings in Chinese.
   - Keep important technical terms in English or introduce them as Chinese with English in parentheses.
   - Keep code identifiers, filenames, commands, APIs, package names, runtime UI strings, raw errors, and source-code comments in English.
   - Do not place Chinese/CJK characters inside source-code blocks.
   - Remove English template headings from the final guide.
   - Make every core `9.x` section explanation-led and mechanism-specific.
   - Teach each core concept before using it in the final mini project.

6. Validate before delivery.
   - Check the guide against `references/node-output-checklist.md`.
   - Verify TOC entries, stable anchors, learning-evidence paths, title-bar paths, language rules, fenced language identifiers, macOS selectors, and code-window structure.
   - Run the smallest applicable repository checks before claiming they passed.
   - Keep validation commands, results, execution notes, and `PASS` / `FAIL` / `UNKNOWN` evidence in the final response only.
   - Never place delivery status, file inventories, audit results, or self-check tables in the learning guide body.

## Explain the Responsible Layer

Name the responsible layer explicitly:

- syntax
- JavaScript runtime behavior
- Node platform API
- event loop behavior
- libuv behavior
- operating-system boundary
- object model
- stream model
- module system
- package resolution
- TypeScript type-system behavior
- emitted JavaScript
- tooling behavior
- framework convention
- deployment/runtime environment

For TypeScript, distinguish what the checker proves, what native type stripping removes, whether `tsc` emits JavaScript, what Node.js executes, and what external input still requires runtime validation.

## Require a Node.js Mechanism Evidence Chain

Every core `9.x` section must trace at least one concrete chain:

1. Identify the command, HTTP request, file operation, module import, event, timer, stream operation, child process, worker, or test execution that starts the behavior.
2. Name the JavaScript values, objects, callbacks, promises, closures, buffers, streams, request objects, response objects, errors, module records, or package metadata created or read.
3. Identify the exact Node platform API involved.
4. Identify the event loop, microtask queue, libuv queue, kernel, thread pool, process, socket, file descriptor, or other OS resource boundary when relevant.
5. Trace the request/response, stream, middleware, module-loading, package-resolution, process-lifecycle, or test-runner transition.
6. State what TypeScript checks and what it does not check at runtime.
7. Explain why the output, response, file result, stream result, error, test result, or process behavior occurs.
8. Name the exact rule violated by the incorrect form.
9. Explain how to recognize the same failure in a real Node.js project.

Reject label-only filler. If a paragraph can be copied unchanged into an unrelated Node.js, JavaScript, or TypeScript chapter, replace it with section-specific values, APIs, resources, transitions, results, and diagnostic evidence.

## Full Chapter Structure

For a new full Node.js chapter:

- Use an H1 containing the technology, chapter number, and concrete chapter name.
- Add the self-contained macOS code-window `<style>` block near the opening when code windows are used.
- Put `## 目录` before `## 0. 章前定位`.
- List every numbered top-level section from `0` through `18`.
- List every core `9.x` subsection and important final-project subsections in the TOC.
- Add `## 本章代码定位索引` after the TOC when real practice or final-project files are present.
- Treat `## 本章代码定位索引` as a learning evidence map, not a delivery inventory.
- Use `## 9. 核心教学` as the core teaching body.
- Add a unique explicit anchor such as `<a id="section-9-1"></a>` immediately before each core `### 9.1 ...` heading and link to `#section-9-1` from the TOC.
- Include a final mini project that integrates the chapter without replacing section-by-section teaching.
- Include knowledge transfer, chapter review tasks, a final mental model, and an official documentation reading list.

Use these top-level sections unless the user explicitly asks for a smaller guide:

- `0. 章前定位`
- `1. 学习目标`
- `2. 前置知识`
- `3. 环境与运行基线`
- `4. 第一性原理`
- `5. 技术边界模型`
- `6. 底层机制模型`
- `7. 核心术语`
- `8. 本章实践路线`
- `9. 核心教学`
- `10. API 与规则索引`
- `11. 常见错误对照表`
- `12. 调试与验证方法`
- `13. 分项练习说明`
- `14. 最终迷你项目`
- `15. 知识迁移与真实项目场景`
- `16. 本章复盘任务`
- `17. 最终心智模型`
- `18. 官方资料`

## Learning Guide Body and Final Response Boundary

The main chapter guide is a teaching document. Keep only learning-facing content in its body: chapter positioning, goals, prerequisites, runtime baseline, first principles, boundary and mechanism models, terms, practice route, learning evidence, core teaching, API rules, errors, debugging methods, practice reasoning, the final mini project, knowledge transfer, review tasks, the final mental model, and official sources.

Do not put any of the following in the guide body:

- final file inventory or repository delivery inventory
- files created, updated, moved, or deleted
- delivery reports, audit reports, self-check tables, Codex execution notes, or validation command output
- `PASS` / `FAIL` / `UNKNOWN` result tables
- companion-file usage instructions or sections titled `速查表使用方式` or `面试题使用方式`
- sections titled `最终文件清单`
- status language such as `本章交付文件如下`, `已创建并可运行`, `真实练习文件`, or `Status`
- `当前项目结构` or `本章文档结构` when the content is only a repository or file-status inventory

When project rules request companion documents, create or update the chapter guide, chapter cheatsheet, and chapter interview questions as separate files. Do not add sections to the main guide explaining how to use those companion files. Report every companion file and all delivery evidence in the final response.

Use `PASS`, `FAIL`, and `UNKNOWN` only in the final response. Never put the evidence table or its results in the guide body.

## Core Section Labels

Use `###` for each core `9.x` concept and bold labels inside it instead of a long stack of H4 headings:

- `结论`
- `本节解决的问题`
- `技术意义`
- `概念解释`
- `边界：语法、JavaScript 运行时、Node 平台 API、模块系统、类型系统、工具链与框架约定`
- `底层机制`
- `API / 语法规则`
- `固定属性名 / 固定方法名 / 参数签名`
- `示例结构`
- `示例代码`
- `逐行解释`
- `运行方式`
- `预期输出`
- `执行过程`
- `变量、引用、资源与生命周期变化`
- `为什么会得到这个结果`
- `对比情况`
- `常见错误为什么错`
- `与真实项目的关系`
- `与当前学习路径的关系`
- `最终记忆模型`

Do not force an irrelevant label into a section. Do not leave a required label with generic prose. Preserve the complete mechanism evidence chain when combining labels.

## Topic-Specific Teaching Rules

### Runtime and asynchronous work

Explain V8, Node bindings, libuv, event-loop implications, microtasks, timers, I/O callbacks, thread-pool work, and blocking versus non-blocking behavior where relevant. Avoid universal ordering claims when runtime version, I/O context, or operating-system scheduling changes the result.

### HTTP and middleware

Trace request objects, response objects, methods, URLs, headers, body chunks, status codes, writes, `end` or framework send/reply calls, delegation, short-circuiting, error flow, aborts, timeouts, and lifecycle termination. Explain `next()`, error middleware, and hanging requests when Express is in scope.

### Streams

Trace chunks, Buffer or string boundaries, readable and writable states, `pipe`, `pipeline`, backpressure, high-water marks when relevant, error propagation, aborts, cleanup, and resource closure.

### Modules and packages

Explain CommonJS and ESM separately. Cover relevant extensions, nearest `package.json`, `type`, `exports`, `imports`, `main`, `bin`, scripts, dependency fields, entry points, resolution, caching, live bindings, interop, and TypeScript `NodeNext` behavior. Distinguish Node resolution from TypeScript and bundler resolution.

### Processes, workers, filesystem, and diagnostics

Trace paths, handles or descriptors, stdio, signals, exit codes, IPC, worker messages, clone or transfer behavior, process or worker termination, diagnostics, cleanup, and ownership. Distinguish asynchronous I/O from CPU parallelism.

### TypeScript

Explain type erasure, native type stripping constraints, syntax requiring transformation when relevant, transpilation, `tsc --noEmit`, emitted JavaScript, source maps, `module`, `moduleResolution`, `NodeNext`, declaration files, and runtime validation.

### npm and tooling

Explain relevant `package.json` behavior, scripts, lifecycle scripts, lockfiles, `npm ci` versus `npm install`, `npm run`, workspaces, audits, linting, formatting, tests, CI, packaging, tarball contents, and publishing. Treat publishing and deployment as external write operations requiring explicit user intent and current official documentation.

### Frameworks

Do not teach framework scaffolds alone. Explain route handlers and request lifecycles. For Express, cover middleware and error flow. For Fastify, cover schemas, plugins, hooks, encapsulation, replies, and TypeScript. For NestJS, map modules, controllers, providers, guards, pipes, interceptors, filters, and adapters to runtime flow. For Hono, explain Web Standards request/response objects, Fetch-style handlers, runtime adapters, edge compatibility, and multi-runtime constraints.

### Security

Trace untrusted input, parsing, validation, authentication, authorization, output handling, URL or filesystem boundaries, size and rate limits, timeouts, cancellation, cleanup, dependency risk, logs, and secrets. Do not present one package call as a complete security model.

## Mandatory macOS-Style Code Window Policy

1. Use the exact structure and CSS from `assets/macos-code-window-template.md` for every major source-code, terminal, output, and error example.
2. The title bar is HTML.
3. The real code is a normal Markdown fenced code block.
4. Place the fenced code block inside the same `.macos-code-window` container, immediately after the title bar.
5. Place the closing `</div>` for `.macos-code-window` after the fenced code block.
6. Include red, yellow, and green traffic-light dots. Every dot uses `macos-code-dot` plus exactly one color class: `macos-code-dot-red`, `macos-code-dot-yellow`, or `macos-code-dot-green`.
7. Use `macos-code-title` for the label. Never generate `macos-code-filename`.
8. Use a real file path only when the exact file exists in the nearby project structure.
9. Use `Snippet:` for conceptual examples and `Template:` for reusable patterns.
10. Use `Terminal`, `Output`, and `Error` for commands, expected results, and errors.
11. Keep all decorative HTML outside the source code. Keep source clean, copyable, and executable.
12. Never place source code inside raw HTML `<pre><code>` tags.
13. Keep source code, comments, commands, runtime strings, and identifiers in English only. Keep Chinese explanations outside source-code blocks.
14. Use an accurate fenced language identifier: `js`, `mjs`, `cjs`, `ts`, `mts`, `cts`, `bash`, `json`, `html`, `css`, or `txt`.
15. Include the exact self-contained selectors from `assets/macos-code-window-template.md`, including `.macos-code-titlebar + pre` and `.macos-code-titlebar + pre code`. Never generate `.macos-code-window + pre`.

## Learning Evidence, Real File, and Final Project Rules

- Keep `## 本章代码定位索引` only when real practice or final-project paths materially support learning.
- Use exactly the learning-facing columns `学习目标`, `文件或片段`, and `可观察证据`.
- Use a verified relative path for a real file, `Snippet: name` for conceptual code, `Terminal` for commands, `Output` for expected output, and `Error` for expected errors.
- Do not use delivery columns or values such as `类型`, `Status`, `已创建`, `已更新`, `已创建并可运行`, `真实练习文件`, or `模板`.
- Verify every path presented as real locally before delivery.
- Relabel uncreated conceptual examples as `Snippet:`; use `Template:` only in code-window titles for reusable patterns, not as a learning-evidence-map entry.
- Keep real-file title bars, learning-evidence paths, practice instructions, and final-project structures consistent.
- Treat real path verification as final-response evidence, not as prose about file status in the guide.
- Start the final mini project with a natural statement that it integrates the chapter and does not replace earlier teaching.
- Keep the project explanation-led and cover file responsibilities, data flow, resource ownership, execution flow, failure paths, cleanup, and validation.

## Delivery Gate

Do not deliver a full guide unless all critical checks pass:

1. The H1 contains the technology, chapter number, and concrete chapter name.
2. The body is primarily mechanism-focused teaching.
3. Every core `9.x` section contains sufficient section-specific explanation and a mechanism evidence chain.
4. Every non-trivial code block has line-by-line explanation, execution process, resource or lifecycle changes, result reasoning, a contrast, and common-error analysis.
5. The final mini project does not replace or overwhelm earlier teaching.
6. Every core `9.x` TOC entry and heading passes the stable-anchor rule.
7. Every applicable item in `references/node-output-checklist.md` passes.

Hard-fail delivery for fabricated real paths, missing `9.x` anchors, omitted `9.x` TOC entries, label-only filler, model-memory-only version claims, missing self-contained code-window selectors, raw HTML source blocks, CJK inside source-code fences, incorrect runtime or lifecycle explanations, unverified security-sensitive guidance, or false validation claims.

## Final Response

After creating or updating a guide, include:

- files created
- files updated
- files moved
- files deleted
- companion files created or updated
- local files inspected
- GitHub baseline files used
- official documentation sources used
- exact validation commands and results
- limitations or `Verification Needed` notes
- an evidence-based table with `检查项`, `结果`, and `证据`

Mark every result `PASS`, `FAIL`, or `UNKNOWN`. Cite concrete file paths, headings, command output, counts, selectors, or mappings. If any critical item is `FAIL`, continue revising instead of delivering the guide.
