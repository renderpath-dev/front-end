---
name: vue-cheatsheet-writer
description: "Create, update, compress, review, or reorganize standalone cheatsheets, quick references, API tables, comparison tables, error tables, syntax summaries, and minimal code templates for Vue 3, Vue TypeScript, Vue SFC, Vue Router, Pinia, Vite-based Vue projects, Vue testing, Nuxt boundaries, and Vue frontend engineering topics. Use when the requested output is a cheatsheet or quick-reference document. Do not use for full chapter learning guides, long-form tutorials, feature implementation, UI generation, bug fixing, or project code unless the requested deliverable is a cheatsheet or quick-reference document."
---

# Vue 速查表写作器

## 目的

创建适合快速回忆、概念比较、错误定位和项目决策的 Vue 3 技术速查表。输出应简洁但不能因压缩而混淆 template、JavaScript runtime、Vue runtime、reactivity、TypeScript、SFC compiler 或 Vite tooling。

本 skill 只提供写作与校验规则。若用户需要首次学习材料、完整机制推导或章节项目，推荐使用 `vue-learning-guide-writer`。

## 资源映射

- 创建、压缩、重组或实质更新速查表前，读取 `references/vue-cheatsheet-standard.md`。
- 处理版本敏感行为或列出来源时，读取 `references/vue-source-policy.md`。
- 交付前执行 `references/output-checklist.md`。
- 新建独立速查表时使用 `assets/cheatsheet-template.md`。
- 比较相似概念时使用 `assets/comparison-table-template.md`。
- 汇总错误时使用 `assets/error-table-template.md`。
- 提供可复制代码时使用 `assets/minimal-code-template.md`。
- 所有代码、命令、输出和错误示例使用 `assets/macos-code-window-template.md`。

## 工作流

1. 检查当前仓库和离目标文件最近的 `AGENTS.md`。
2. 阅读相关 README、package 文件、配置、现有指南、速查表和真实练习代码。
3. 明确主题、学习者层级、目标文件和任务类型。
4. 判断用户要的是复习资料还是首次学习材料；后者转用 `vue-learning-guide-writer`。
5. 先读取本地材料，再核对最新官方文档中的版本敏感行为。
6. 以表格、决策规则、错误模式和最小代码压缩信息，同时保留必要机制边界。
7. 按 `references/output-checklist.md` 检查来源、语言、代码窗口和可复制性。
8. 报告文件、来源、实际检查、压缩范围和限制。

审查任务先报告发现，除非用户明确要求直接修改。不得把速查表扩写成完整章节或添加未请求的项目代码。

## 内容规则

- 正文使用中文，重要技术词首次出现时可包含 English term。
- 标识符、文件名、命令、API、包名、错误原文、运行时 UI 字符串和源码注释使用英文。
- 源码代码块不得包含中文字符。
- 优先使用一句话结论、syntax pattern、runtime behavior、TypeScript behavior、comparison table、error table、project usage 和 minimal code template。
- 表格必须解释差异和选择条件，不能只并排列出名称。
- 错误项必须包含 wrong code、error type、violated rule、correction 和 recognition method。
- 最小模板只包含理解或安全复制所需代码，不添加无关 boilerplate。

## Vue 机制边界

- `ref` 与 `reactive`：说明容器/Proxy、访问方式、替换与解构影响，而不是只说适用数据类型。
- `computed` 与 `watch`：说明 derived value 与 side effect 的职责差异、依赖读取和执行时机。
- props 与 emits：说明 parent-to-child input 与 child-to-parent event contract，以及运行时值传递。
- `v-if` 与 `v-show`：说明 conditional mount/unmount 与 CSS display 切换的代价。
- `v-for`：强调稳定 `key` 表示 sibling identity，不把 index 当成默认安全选择。
- `v-model`：说明 value/prop 与 update event contract，而不把它描述成神秘的双向 mutation。
- SFC `<script setup>`：说明它是 compile-time syntax，且 top-level bindings 如何供 template 使用。
- `vue-tsc`：说明它提供 Vue SFC CLI type checking；Vite dev server 只负责快速转换和开发服务，不替代完整类型检查。
- Nuxt 内容必须区分 server runtime、browser runtime、SSR output 和 hydration。

## 来源校验

- 版本敏感行为使用官方文档，遵循 `references/vue-source-policy.md`。
- 官方文档无法访问时加入 `Verification Needed`，并避免把未核对行为写成确定结论。
- 不使用博客覆盖官方文档，也不从旧速查表机械复制 API。
- 最终响应列出实际使用的官方 URL 和本地材料。

## macOS 风格代码窗口强制规则

- 每个源码、terminal、output 和 error 示例都使用 HTML title bar 加普通 Markdown fenced code block。
- title bar 包含 red、yellow、green dots 和清晰 label。
- 真实路径只用于附近结构中存在的文件；临时示例使用 `Snippet:` 或 `Template:`。
- 不使用 raw HTML `<pre><code>` 包裹源码，装饰元素不得进入源码。
- 独立速查表包含 `.macos-code-window`、`.macos-code-titlebar`、`.macos-code-dot`、三个颜色类、`.macos-code-title`、`.macos-code-titlebar + pre` 和 `.macos-code-titlebar + pre code`。

## 最终响应要求

最终响应列出：

- 创建或更新的文件。
- 使用的本地材料与官方文档。
- 为保持速查属性而有意压缩的内容。
- 应回到完整指南继续学习的机制。
- 实际执行的检查与命令。
- 限制、`Verification Needed` 项和 evidence-based self-check。

没有编辑文件时明确说明，并只提供审查结论或建议。
