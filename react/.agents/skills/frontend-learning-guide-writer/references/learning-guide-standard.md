# Learning Guide Standard

Use this standard for substantial Markdown learning guides about JavaScript, TypeScript, React, Node.js, Next.js, frontend frameworks, backend JavaScript, web APIs, testing, tooling, and project-based frontend learning.

## Core Output Principles

- Write a teaching-oriented learning guide, not a summary, checklist, API list, or snippet collection.
- Teach a serious learner studying modern frontend development from fundamentals.
- Use professional terminology, rigorous explanations, and mechanism-first teaching.
- Explain what problem the concept solves, what layer it belongs to, what the runtime or compiler does, why outputs happen, what changes in contrasting cases, why common errors happen, and how the concept appears in real projects.
- Do not assume the learner already understands `this`, prototypes, closures, module scope, async scheduling, type erasure, generic inference, framework rendering, or server/browser boundaries.
- Do not add unrelated advanced topics unless they directly support the chapter.

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
