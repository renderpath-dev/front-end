---
name: vue-learning-guide-writer
description: "Create, update, expand, or review teaching-oriented Markdown learning guides, chapter guides, framework learning documents, and study notes for Vue 3, Vue TypeScript, Vue SFC, Vue Router, Pinia, Vite-based Vue projects, Vue testing, Nuxt boundaries, and project-based Vue learning. Use when the requested output is a technical Vue learning document. Do not use for ordinary code implementation, UI generation, bug fixing, or feature development unless the requested deliverable is a learning document."
---

# Vue 学习指南写作器

## 目的

编写面向严肃学习者的 Vue 3 技术学习文档。输出应通过具体值、组件边界、响应式依赖、编译与运行步骤解释机制，而不是停留在语法罗列、API 摘要、目录树或代码堆积。

本 skill 只提供写作与校验规则。除非任务明确要求实现项目，否则不要创建应用、安装依赖或修改业务代码。

## 资源映射

- 创建、扩写或实质更新完整章节前，读取 `references/vue-learning-guide-standard.md`。
- 选择资料或处理版本敏感行为时，读取 `references/vue-framework-doc-policy.md`。
- 交付前，读取并执行 `references/output-checklist.md`。
- 新建完整章节时，使用 `assets/chapter-guide-template.md`。
- 编写章节内额外速查表时，使用 `assets/cheatsheet-template.md`。
- 添加源码、命令、输出或错误示例时，使用 `assets/macos-code-window-template.md`。

## 工作流

1. 先检查仓库。
2. 读取离目标文件最近且适用的 `AGENTS.md`。
3. 读取相关 `README.md`、package 文件、配置文件、现有指南和真实练习文件；忽略未被任务点名的生成文件与归档文件。
4. 明确指南范围，包括主题、章节编号、学习者层级、目标文件，以及创建、更新、扩写或审查类型。
5. 检查本地参考文件，确认当前学习路径、命名和真实路径。
6. 对版本敏感的 Vue、Router、Pinia、Vite、Vitest、Vue Test Utils、TypeScript 或 Nuxt 行为检查最新官方文档。
7. 按机制优先原则写作，先解释问题和边界，再解释代码与结果。
8. 使用 `references/output-checklist.md` 校验结构、机制证据、路径、代码窗口和语言规则。
9. 报告创建或更新的文件、本地与官方来源、实际执行的检查、限制和仍需人工验证的内容。

审查任务默认先报告问题再修改；只有用户明确要求直接修复时才编辑。信息足够时做有依据的假设，不用不必要的问题阻塞任务。

## Vue 机制教学要求

- 连接 template 语法、template compiler 的概念输出、组件实例状态、响应式依赖跟踪、props、emits、slots、directives、lifecycle hooks、DOM patch 和 TypeScript 边界。
- 对 `ref`、`reactive`、`computed`、`watch` 与 `watchEffect`，说明读取发生在哪里、哪个 effect 或组件更新依赖该读取，以及哪次 mutation 触发重新执行。
- 对组件通信，说明值由谁创建、通过哪个 props / emits / slot contract 传递、由谁读取，以及运行时和类型系统分别保证什么。
- 对 TypeScript，分别说明 TS 语法、类型系统行为、类型擦除后的 JavaScript、JavaScript 运行时行为、Vue - Official / Volar IDE 诊断和 `vue-tsc` 诊断。
- 对 Vite，分别说明 dev server、模块转换、HMR、production bundling 和 type checking。不得声称 Vite dev server 会对 Vue SFC 执行完整类型检查。
- 不要把 Vue 解释为 React 的换皮语法，也不要把 React-specific 机制语言作为 Vue 的主要解释模型。
- 当主题涉及 SSR 或 Nuxt 时，明确区分 server runtime、browser runtime、SSR HTML、hydration 和客户端后续导航。

## 完整章节要求

每份完整 Vue 章节指南必须包含：

- 中文正文，以及包含技术、章节编号和具体章节名的 H1。
- 位于正文前部的 `## 目录`。
- 存在真实练习文件时使用 `## 本章代码定位索引`。
- 每个核心 `9.x` 小节的稳定显式 anchor。
- 以解释为主的核心小节，而不是标签填充。
- 非平凡代码后的逐行解释、执行过程、变量与引用变化和结果原因。
- 相关时的响应式跟踪过程或组件更新过程。
- 包含错误代码、错误类型、违反规则、修正方式和识别方法的常见错误。
- 只用于整合前文机制的最终小项目。
- 额外速查表。
- 官方文档阅读清单。

真实文件路径必须在本地存在，并在目录结构、代码定位索引、代码窗口标题栏和最终文件清单中一致。概念示例使用 `Snippet:` 或 `Template:`，不得伪装成真实文件。

## 来源校验要求

- 先检查本地文件，再核对官方文档。
- 官方文档优先于博客、旧教程和本地过期资料。
- 无法访问所需官方页面时，在文档中加入 `Verification Needed`，并在最终响应中说明未验证的具体行为。
- 不得凭记忆断言 macro、Router、Pinia、testing、tooling 或 SSR 的当前行为。
- 最终响应列出实际使用的本地文件与官方 URL。

## macOS 风格代码窗口强制规则

- 所有源码、命令、预期输出和错误输出示例都使用 HTML title bar，后面紧接普通 Markdown fenced code block。
- title bar 包含 red、yellow、green 三个圆点，以及真实文件路径、`Snippet:`、`Template:`、`Terminal`、`Output` 或 `Error`。
- 装饰元素不得进入源码代码块，不得使用 raw HTML `<pre><code>` 包裹源码。
- 完整指南包含自给自足的 style block，并定义 `.macos-code-window`、`.macos-code-titlebar`、`.macos-code-dot`、三个颜色类、`.macos-code-title`、`.macos-code-titlebar + pre` 和 `.macos-code-titlebar + pre code`。
- 源码代码块只包含英文标识符、注释、字符串和错误原文，不得包含中文字符。

## 最终响应要求

最终响应必须列出：

- 创建或更新的文件。
- 使用的本地材料和官方文档。
- 实际运行的校验命令。
- 仍需人工验证的官方行为或访问限制。
- 使用 `检查项`、`结果`、`证据` 三列的证据型自检表，结果只能是 `PASS`、`FAIL` 或 `UNKNOWN`。

未实际运行的检查不得标为 `PASS`。存在关键 `FAIL` 时继续修订，不得把未通过的完整章节作为最终交付。
