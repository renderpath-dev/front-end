# Learning Guide Standard

Use this standard for substantial Markdown learning guides about JavaScript, TypeScript, React, Node.js, Next.js, frontend frameworks, backend JavaScript, web APIs, testing, tooling, and project-based frontend learning.

## Core Output Principles

- Write a teaching-oriented learning guide, not a summary, checklist, API list, or snippet collection.
- Teach a serious learner studying modern frontend development from fundamentals.
- Use professional terminology, rigorous explanations, and mechanism-first teaching.
- Explain what problem the concept solves, what layer it belongs to, what the runtime or compiler does, why outputs happen, what changes in contrasting cases, why common errors happen, and how the concept appears in real projects.
- Do not assume the learner already understands `this`, prototypes, closures, module scope, async scheduling, type erasure, generic inference, framework rendering, or server/browser boundaries.
- Do not add unrelated advanced topics unless they directly support the chapter.

## Explanation-First Content Rule

A full chapter guide must derive most of its value from mechanism-focused teaching explanation. Code, API tables, the final mini project, directory trees, checklists, and cheatsheets are supporting material; they must not replace conceptual explanation.

When space is limited, preserve content in this order:

1. Core concept explanation.
2. Underlying mechanism.
3. Line-by-line explanation.
4. Execution process.
5. Error causes and violated rules.
6. Relationship to real projects.

Do not provide only file structures and source code, use the final mini project instead of section-by-section teaching, use API tables or checklists instead of explanation, or give each section only a short overview before moving directly to code.

## No Label-Only Filling Rule

Required teaching labels are an outline, not proof of teaching quality. A core section is incomplete when labels such as `技术意义`, `底层机制`, `执行过程`, `变量与引用变化`, `常见错误为什么错`, `与真实项目的关系`, and `最终记忆模型` are present but the text beneath them remains generic.

Bind every explanation to the current subsection's actual concept, variables, values, references, code path, UI result, compiler result, and project scenario. Apply this portability test: if a paragraph can be copied unchanged into a different React, JavaScript, or TypeScript chapter, it is too generic and must be rewritten with section-specific evidence.

Do not use statements such as `React 会重新渲染`, `TypeScript 会检查类型`, `这样可以提高可维护性`, or `这个写法更清晰` as the main mechanism explanation. Continue by naming the concrete render owner, state snapshot, consumer, key identity, reducer transition, hook position, runtime value, or compiler relationship.

## Mechanism Evidence Chain Rule

Every core `9.x` section must include at least one mechanism evidence chain that explains all of the following:

1. The user action or code operation that starts the process.
2. The concrete variables, objects, arrays, closures, functions, or calls created or read by the JavaScript runtime.
3. The render snapshot, state or hook cell, context value, ref object, fiber or key identity, reducer transition, or hook call position React stores or reads.
4. The exact type relationship TypeScript checks and what it does not validate or execute at runtime.
5. Why these steps produce the observed UI, output, error, or type-check result.
6. The exact mechanism rule violated by an incorrect form.
7. How to recognize the same class of failure in a real project.

The chain may be prose, a numbered sequence, or a compact table, but it must trace concrete values and identities from trigger to result.

## Research Requirement

- Before writing any framework, library, tool, runtime, or version-sensitive content, inspect the relevant local reference files first.
- Then use the latest official documentation available to Codex.
- Do not rely only on model memory for React, Next.js, Node.js, TypeScript, testing tools, build tools, package managers, or deployment platforms.
- If official documentation cannot be accessed, explicitly say which part could not be verified and add a `Verification Needed` note.
- In the final response, list the local files and official documentation sources that were used.

## Language and Heading Rules

- The guide body must be Chinese.
- Ordinary structural headings in the final guide must be Chinese.
- Important technical terms may remain English or appear as Chinese with English in parentheses on first introduction.
- Table headers do not need to be Chinese. Use clear English headers such as `Concept`, `Layer`, `Meaning`, `Common Mistake`, `File`, `Role`, and `Status` when they improve scanability.
- Keep code identifiers, filenames, package names, commands, APIs, raw errors, runtime UI strings, and source-code comments in English.
- Do not write Chinese characters inside source-code blocks.
- Do not leave English template headings such as `File Positioning`, `What Problem This Chapter Solves`, `Clear Conclusion`, `Technical Meaning`, or `Final Memory Model` in the final document.

## Chapter Title Rule

The H1 of every full chapter learning guide must contain all three of these elements:

1. The technology or technical topic.
2. The chapter number.
3. The concrete chapter name.

Examples:

```markdown
# React 第 6 章：Forms 与 Controlled Components
# React 第 7 章：Effects、Refs 与外部系统同步
# TypeScript 第 9 章：Framework Types 与 React TSX 边界
# React 06：Forms-Controlled-Components
```

Do not use generic H1 titles such as `# React 学习指导`, `# Chapter Learning Guide`, `# Forms Guide`, or `# React Chapter`.

For a new chapter, keep the chapter identity consistent across the directory name, file name, H1, directory, code location index, code-window paths, and final file list. For an existing guide revision, do not rename established paths only to satisfy this rule; update the H1 and in-document file locations so they identify the specific chapter.

## Required Full Chapter Structure

Use this structure unless the user explicitly asks for a smaller file:

```markdown
# Chapter Title

<style>
...
</style>

## 目录

- [0. 文件定位](#0-文件定位)
- [1. 本章解决的问题](#1-本章解决的问题)
- [2. 前置概念](#2-前置概念)
- [3. 学习目标](#3-学习目标)
- [4. 推荐学习顺序](#4-推荐学习顺序)
- [5. 核心术语表](#5-核心术语表)
- [6. 底层心智模型](#6-底层心智模型)
- [7. 推荐目录结构](#7-推荐目录结构)
- [8. 示例运行方式](#8-示例运行方式)
- [9. 分节教学与练习](#9-分节教学与练习)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
- [13. 额外速查表](#13-额外速查表)
- [14. 最终文件清单](#14-最终文件清单)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标 | 对应文件 / 片段 | 类型 | 所在章节 |
| --- | --- | --- | --- |
| Replace with actual concept | `replace-with-actual-file-path.tsx` | 真实练习文件 | 9.x |

## 0. 文件定位

## 1. 本章解决的问题

## 2. 前置概念

## 3. 学习目标

## 4. 推荐学习顺序

## 5. 核心术语表

## 6. 底层心智模型

## 7. 推荐目录结构

## 8. 示例运行方式

## 9. 分节教学与练习

## 10. API / 语法索引

## 11. 常见错误表

## 12. 最终小项目

## 13. 额外速查表

## 14. 最终文件清单

## 15. 如何转换成个人笔记

## 16. 必须能回答的问题

## 17. 最终记忆模型

## 18. 官方文档阅读清单
```

The directory and code location index are mandatory structure rules, but the template rows are placeholders. Replace them with the actual headings, section titles, file paths, snippet names, and section numbers for the current chapter.

## Directory and Code Location Index Rules

- Every full chapter learning guide must include `## 目录`.
- Place the directory near the top of the document, after the chapter title and any local `<style>` block, and before `## 0. 文件定位`.
- The directory must list every numbered top-level section from `## 0` through `## 18`.
- The directory must include every core `### 9.x` section under `## 9. 分节教学与练习`.
- Listing only `9. 分节教学与练习` is not sufficient. Expand the TOC with `9.1`, `9.2`, `9.3`, and every later core subsection through the chapter's final `9.x` heading.
- If `## 9. 分节教学与练习` is the chapter's main teaching body and any core child heading is absent from the TOC, the delivery check must fail.
- The directory must include important `###` sections under `## 12. 最终小项目`, such as project goal, structure, complete code, run command, expected output, execution flow, and common errors.
- Do not include internal bold teaching labels in the directory, such as `结论`, `本节解决的问题`, `技术意义`, `逐行解释`, `执行过程`, or `最终记忆模型`.
- Prefer Markdown heading links. If the target renderer has uncertain support for Chinese heading anchors, a plain text reading index is acceptable, but it must stay complete and ordered.
- From the second chapter onward in framework learning documents, if the chapter contains real practice files or final mini-project files, include `## 本章代码定位索引` after the directory.
- The code location index connects learning goals, exact real file paths or `Snippet:` labels, type, and section location.
- Real paths in the code location index must exactly match the recommended directory structure, code-window title bars, and final file list.
- Concept snippets in the code location index must be marked as `概念 snippet` and must not look like real file paths.

## Required Core Concept Section Structure

Within `## 9. 分节教学与练习`, use `###` headings for core concepts, such as `### 9.1 React 到底是什么`.

Inside each core concept section, use bold labels instead of many H4 headings. This keeps the Markdown outline readable and prevents tiny heading levels.

Recommended labels:

```markdown
**结论：**

**本节解决的问题：**

**技术意义：**

**概念解释：**

**边界：语法、运行时、对象模型、类型系统、框架约定与平台 API：**

**底层机制：**

**API / 语法规则：**

**固定属性名 / 固定方法名 / 参数签名：**

**概念示例结构：**

**示例代码：**

**逐行解释：**

**运行方式：**

**预期输出：**

**执行过程：**

**变量与引用变化：**

**为什么会得到这个结果：**

**对比情况：**

**常见错误为什么错：**

**与真实项目的关系：**

**与当前学习路径的关系：**

**最终记忆模型：**
```

If a concept section has no new API, explicitly say that the section has no new API and focuses on mechanism.

Every core `9.x` section must be led by explanation rather than code. Code may be included, but sufficient explanation must appear before and after it. After every non-trivial code block, explain the code line by line, describe the execution process, track relevant variable and reference changes, explain why the result occurs, compare a meaningful contrasting case, identify common mistakes and their violated rules, and explain how to recognize similar mistakes later. If a section needs a long example, explain the core mechanism first and then show only the necessary code.

## React Section-Specific Data-Flow Rule

Every core `9.x` section in a React chapter must trace the subsection's most important data flow from creation through transfer, reading, and update. Select the concrete trace that matches the topic:

- Props chapter: props object, child parameter, and callback prop.
- State chapter: state snapshot, setter, and update queue.
- Lists and keys chapter: array element, key, sibling scope, and retained identity.
- Forms chapter: `event.currentTarget.value` or `checked`, controlled prop, and form state object.
- Effects and refs chapter: effect closure, dependency, cleanup, ref object, and `ref.current`.
- State architecture chapter: source state, derived data, state owner, action object, reducer state, dispatch, context value, and custom-hook call identity.

A section that does not trace any specific value's creation, transfer, read, and update is incomplete.

## Structure Type Rules

Every full chapter guide must clearly distinguish these structures:

- `当前项目结构`: Real files and folders in the current repository or current learning app.
- `本章文档结构`: The guide file and local reference/documentation positions.
- `概念示例结构`: A list of snippet names used only to explain mechanisms. These do not mean the learner must create files.
- `最终小项目结构`: Files to create or replace only when doing the final mini project.

Do not use vague labels such as `File Structure` or `Project Structure` without explaining which structure type it is.

## React Chapter File Organization Rules

React chapter 1 may be mostly conceptual because it establishes the first mental model: what React is, why React exists, JSX boundaries, app startup, and runtime/tooling boundaries.

From React chapter 2 onward:

- Each core concept must have its own directory.
- Each directory must use a name that reveals the learning topic.
- Do not keep stacking multiple learning goals into `App.tsx`.
- Do not put all exercises into `main.tsx`.
- Do not repeatedly use generic names such as `example.tsx`, `demo.tsx`, or `test.tsx` as primary learning files.
- File names must reveal the knowledge point, exercise goal, or component responsibility.
- The learner should be able to recall the topic by reading the file name during later review.

Recommended structures:

```txt
src/
  concepts/
    jsx-basics/
      jsx-expression-demo.tsx
      jsx-attribute-demo.tsx

    component-basics/
      user-card-component.tsx
      product-card-component.tsx

    props-basics/
      props-passing-demo.tsx
      props-readonly-demo.tsx

    state-basics/
      counter-state-demo.tsx
      toggle-state-demo.tsx
```

or:

```txt
src/
  chapter-02-jsx/
    jsx-expression-demo.tsx
    jsx-list-render-demo.tsx

  chapter-03-components/
    user-profile-component.tsx
    dashboard-card-component.tsx

  chapter-04-props/
    props-passing-demo.tsx
    props-validation-demo.tsx
```

## Code Window Title-Bar Path Rules

macOS-style code window title bars may show a real file path, logical snippet name, `Terminal`, `Output`, or `Error`.

- If the title bar uses a real file path such as `src/App.tsx`, `src/main.tsx`, `vite.config.ts`, or `tsconfig.app.json`, that exact file must appear in the nearest relevant `当前项目结构`, `最终小项目结构`, or explicit example structure.
- If the code is a conceptual explanation, mistake example, contrasting case, temporary snippet, or copy template, do not use a fake real-looking path.
- Use logical titles for conceptual examples, such as `Snippet: manual DOM update`, `Snippet: JSX class mistake`, `Snippet: object child correction`, `Snippet: explicit root check`, or `Template: basic component`.
- Do not make readers think every snippet title is a file they must create.
- When a chapter requires learners to actually create files, prefer real file-path title bars and make those paths exactly match the recommended directory structure.

## Self-Contained macOS Code Window Rule

If a guide uses `.macos-code-window`, `.macos-code-titlebar`, `.macos-code-dot`, or related HTML, place a `<style>` block near the beginning of the Markdown file and define all of these selectors:

- `.macos-code-window`
- `.macos-code-titlebar`
- `.macos-code-dot`
- `.macos-code-dot-red`
- `.macos-code-dot-yellow`
- `.macos-code-dot-green`
- `.macos-code-title`
- `.macos-code-titlebar + pre`
- `.macos-code-titlebar + pre code`

Missing any required selector is a delivery failure. If a future project intentionally uses an external stylesheet, identify its exact source in the guide and preserve enough in-document explanation that standalone Markdown readers still understand the code-window structure.

## Real File Existence Rule

Every path presented as a real file in the code location index, recommended directory structure, real-file code-window title bar, final file list, or final mini-project structure must exist in the local repository before delivery. If it does not exist, either create the file or relabel the example as `Snippet:`, `Template:`, or explicitly not required.

Do not mark a missing path as `已创建`, `已更新`, or `真实练习文件`. Real-file title bars, directory structures, and final file lists must agree. Concept snippets must never enter the real final file list.

## Concept Snippet Rules

- Each core section with multiple snippets should first include a `概念示例结构` block listing the snippet names.
- The concept example structure must clearly state that these snippets explain mechanisms and do not represent files to create.
- Concept snippets must not appear in the final file list as final files.
- React chapter 1 may use many concept snippets.
- React chapter 2 and later must gradually increase the proportion of real practice files while still allowing concept snippets for small contrasts and mistakes.

## Code Example Requirements

Every non-trivial code example must include:

- Correct example.
- Expected output or expected compiler result.
- Line-by-line explanation.
- Runtime execution process.
- Common mistake example.
- Explanation of the violated rule.
- Corrected version.
- How to recognize similar mistakes later.

For TypeScript examples, separate:

- TypeScript compile-time process.
- JavaScript runtime process.
- Emitted JavaScript behavior when relevant.

For framework examples, separate:

- Framework runtime behavior.
- JavaScript mechanism underneath.
- TypeScript type checking if TypeScript is used.
- Browser or server runtime boundary.

## Topic-Specific Requirements

### JavaScript

Always distinguish syntax, runtime behavior, language mechanism, object model or prototype model, and platform API when relevant.

### TypeScript

Always distinguish TypeScript syntax, TypeScript type-system behavior, JavaScript runtime behavior, emitted JavaScript after type erasure, and tooling behavior such as IDE diagnostics, `tsc` errors, and lint warnings.

### React

Do not only write component templates. Explain components as functions or component objects, props as objects, state as React-managed values, event handlers as function values, JSX as syntax transformation rather than native browser syntax, rendering as returning a UI description from data, and hooks in relation to closures, render snapshots, side effects, async behavior, and dependency arrays.

### Node.js

Do not only write server templates. Explain request and response as objects, route handlers as functions, middleware as function composition, asynchronous I/O and event loop implications, and CommonJS/ESM boundaries when relevant.

### Next.js

Do not only write directory structure. Explain file-system routing and module boundaries, server runtime versus browser runtime, Server Components and Client Components, request, response, `params`, `searchParams`, `headers`, `cookies`, where data fetching happens, which code can enter the client bundle, caching, rendering mode, and deployment implications when relevant.

## Final Mini Project

Every full guide must include a final mini project. The project must integrate the chapter's core mechanism instead of randomly combining APIs.

The final mini project is a chapter summary and integration exercise, not a substitute for the core `9.x` teaching sections. Do not increase the project's code or prose to justify reducing mechanism explanations earlier in the guide. Even when project code is long, keep the project explanation-led by covering file responsibilities, state ownership, data flow, execution flow, decomposition decisions, and common errors.

Open the final mini project section with a natural sentence equivalent to: `最终小项目只用于整合本章机制，不替代前面的分节教学。`

Reject the chapter when any core concept appears only in the final project, when final-project code and explanation clearly outweigh shallow `9.x` teaching, or when adding project files and code does not improve mechanism understanding. Preserve complete project code, but complete code is not a substitute for evidence-led explanations in the earlier sections.

Include:

- Project goal.
- Why the project fits the chapter.
- Final mini project structure.
- Each file's responsibility.
- Complete code.
- How to run.
- Expected output or interaction result.
- Core execution flow.
- Common errors.
- Possible extensions.

For React chapter 2 and later, the final mini project should use descriptive concept directories and file names instead of only `App.tsx` and `main.tsx` unless the chapter is specifically about app startup.

## Final File List

The `最终文件清单` must list only:

- The guide file actually created or updated.
- Real files that the final mini project asks the learner to create, keep, or replace.

Do not include configuration files, source references, official documentation links, or concept snippets as final files unless the task actually created or changed them as deliverables.

Each final file row should include:

- file path
- role
- status

Use status values such as:

- 已创建并保留
- 仅在执行最终小项目练习时替换
- 本次未修改
- 不需要创建

If some files were only concept snippets, list them separately under a note such as `不需要创建这些概念示例文件`.

From React chapter 2 onward, the final file list should expose meaningful concept directories and file names rather than many repeated `App.tsx`, `main.tsx`, or `example.tsx` entries.

## Extra Cheatsheet

Every full guide must include an extra cheatsheet with:

- One-sentence concept summary.
- Common API table.
- Similar concept comparison table.
- Error type table.
- Real project usage table.
- Minimal code templates.

## Delivery Requirement

After completing a chapter, perform an evidence-based self-check against `output-checklist.md`.

The self-check must use this table structure:

| 检查项 | 结果 | 证据 |
| --- | --- | --- |

Mark each result as `PASS`, `FAIL`, or `UNKNOWN` and provide specific evidence. Do not write only `已检查`.

Delivery Gate instructions, self-check tables, `PASS` / `FAIL` / `UNKNOWN`, change summaries, and Codex execution notes belong only in the final response. Do not place them in the learning guide body. A guide must read like a natural textbook and must not contain `Delivery Gate`, `evidence-based self-check`, `本次修订`, `按照 skill 检查`, or `Codex 已完成` as instructional prose.

Use `UNKNOWN` when a check was not actually performed. Never mark `PASS` without verifiable evidence such as an exact path, heading, command result, file count, required style selector, or complete-code mapping.

If any critical item is `FAIL`:

- Do not end the task.
- Do not deliver the guide as the final result.
- Continue revising until all critical checks pass.
