# Vue 学习指南标准

本标准用于 Vue 3、Vue TypeScript、Vue SFC、Vue Router、Pinia、Vite、Vue testing、Nuxt 边界和项目式 Vue 学习的完整 Markdown 指南。

## 核心输出原则

- 写成教学型指南，不写成摘要、API 列表、目录树、检查清单或片段集合。
- 面向从基础走向生产实践的学习者，不假设其已理解闭包、模块绑定、响应式 effect、组件实例、编译阶段、类型擦除或 server/browser 边界。
- 对每个核心概念解释：解决什么问题，属于哪一层，具体值如何流动，Vue 或工具如何处理，结果为什么发生，错误违反了什么规则，以及真实项目中如何识别。
- 只加入支撑当前章节的内容，不以“完整”为理由扩张到无关高级主题。

## 解释优先规则

完整章节的主要价值必须来自机制讲解。代码、API 表、目录、最终项目、检查清单和速查表只能支撑解释，不能替代解释。

内容受限时，按以下顺序保留：

1. 核心概念和问题边界。
2. 底层机制与数据流。
3. 逐行解释。
4. 执行过程与更新时机。
5. 错误原因、违反规则和识别方法。
6. 真实项目关系。

不得只给项目结构和完整代码，也不得用最终项目覆盖前面的分节教学。

## 禁止标签式填充

`结论`、`技术意义`、`底层机制`、`执行过程`、`变量与引用变化`、`常见错误为什么错`、`与真实项目的关系` 和 `最终记忆模型` 是教学提纲，不是完成证据。

每段解释必须绑定当前小节的具体响应式值、变量、函数、组件、模板表达式、更新触发点、编译诊断或 DOM 结果。若一段文字不改内容就能移到另一个 Vue 章节，它过于泛化，必须补充当前小节的机制证据。

不能只说“Vue 会更新界面”“TypeScript 会检查类型”或“这样更易维护”。必须说明哪个值被读取、谁建立依赖、哪次写入触发哪个 effect、哪个组件实例需要更新，以及类型检查与运行时验证的边界。

## Vue 机制证据链

每个核心 `9.x` 小节至少提供一条完整证据链，依次追踪：

1. 启动过程的用户操作或代码操作。
2. JavaScript 运行时创建或读取的具体值、变量、对象、函数、闭包或 module binding。
3. 涉及的 Vue reactive source：`ref`、reactive object、computed getter、watcher source、props、emits payload、slot function、provide/inject value 或 component-local state。
4. 依赖跟踪关系：读取了哪个响应式值，哪个 effect、render 或 update 依赖它，以及哪次 mutation 触发重新执行。
5. 涉及的 Vue component 或 SFC boundary：template、`<script setup>`、component instance、props contract、emits contract、slots contract、lifecycle hook 或 directive。
6. TypeScript compiler 或 `vue-tsc` 检查的类型关系，以及它不会在运行时验证什么。
7. 为什么上述步骤产生观察到的 UI、输出、DOM 变化、compiler diagnostic 或 runtime error。
8. 错误写法违反的确切 Vue、JavaScript、TypeScript 或 tooling 规则。
9. 在真实 Vue 项目中识别同类失败的方法。

证据链可以是连续文字、编号步骤或紧凑表格，但必须从触发动作追踪到结果，不能只有术语。

## 研究要求

- 先检查当前仓库、现有章节、配置、真实练习文件和本地参考材料。
- 再使用当前可访问的最新官方文档验证版本敏感内容。
- Vue core、compiler macros、Router、Pinia、Vite、Vitest、Vue Test Utils、TypeScript 和 Nuxt 行为不得只依赖模型记忆。
- 官方文档无法访问时，明确写出未验证内容并添加 `Verification Needed`。
- 最终响应列出实际使用的本地材料和官方 URL。

## 语言与标题规则

- 指南正文和普通结构标题使用中文。
- 重要技术词首次出现时可采用中文加 English term。
- 表头可在更清晰时使用 `Concept`、`Layer`、`Runtime Behavior`、`TypeScript Behavior`、`Common Mistake` 等英文。
- 标识符、文件名、命令、API、包名、错误原文、运行时 UI 字符串和源码注释使用英文。
- 源码代码块不得包含中文字符。
- 不把模板中的英文占位标题原样留在最终文档。

## 章节标题规则

完整章节 H1 必须同时包含：

1. `Vue` 或当前具体 Vue 技术。
2. 章节编号。
3. 具体章节名。

可接受的标题形式包括 `# Vue 第 3 章：ref、reactive 与 computed`。`# Vue 学习指南`、`# Chapter Guide` 或 `# Reactivity` 过于泛化。

新章节的目录名、文件名、H1、目录、代码定位索引、代码窗口路径和最终文件清单应保持同一章节身份。更新已有章节时，不为满足格式而无理由改名。

## 完整章节必需结构

除非用户明确要求较小文档，完整章节按以下顺序组织：

1. H1 与自给自足的 macOS code-window style。
2. `## 目录`。
3. 存在真实文件时的 `## 本章代码定位索引`。
4. `## 0. 文件定位`。
5. `## 1. 本章解决的问题`。
6. `## 2. 前置概念`。
7. `## 3. 学习目标`。
8. `## 4. 推荐学习顺序`。
9. `## 5. 核心术语表`。
10. `## 6. 底层心智模型`。
11. `## 7. 推荐目录结构`。
12. `## 8. 示例运行方式`。
13. `## 9. 分节教学与练习`。
14. `## 10. API / 语法索引`。
15. `## 11. 常见错误表`。
16. `## 12. 最终小项目`。
17. `## 13. 额外速查表`。
18. `## 14. 最终文件清单`。
19. `## 15. 如何转换成个人笔记`。
20. `## 16. 必须能回答的问题`。
21. `## 17. 最终记忆模型`。
22. `## 18. 官方文档阅读清单`。

## 目录与代码定位索引

- `## 目录` 位于 H1 和 style block 之后、`## 0. 文件定位` 之前。
- 目录列出实际存在的全部编号顶层章节、每个核心 `9.x` 小节，以及最终小项目的重要三级标题。
- 目录不收录 `结论`、`逐行解释` 等内部 bold labels。
- 有真实练习或最终项目文件时，使用 `## 本章代码定位索引` 连接学习目标、准确路径或 `Snippet:` 名称、类型和章节位置。
- 索引中的真实路径必须与推荐结构、代码窗口标题栏、最终项目结构和最终文件清单一致。
- 不存在的概念文件用 `Snippet:` 或 `Template:` 标记，不得标为真实练习文件。

## 稳定 section anchor 规则

每个核心 `9.x` 小节在标题前放置唯一显式 anchor，例如 `<a id="section-9-1"></a>`，目录使用 `#section-9-1`。anchor 与对应标题之间最多一个空行。

从 `9.1` 连续应用到实际最后一个核心小节。目录 target、anchor id 和小节编号必须一致。不得依赖包含中文或复杂标点的自动 heading slug，也不得为了生成 slug 改写有意义的标题。

## 核心概念小节结构

`## 9. 分节教学与练习` 下使用 `### 9.x` 标题。小节内部用 bold labels 组织，避免堆叠大量四级标题。根据主题使用：

- `结论`
- `本节解决的问题`
- `技术意义`
- `概念解释`
- `边界：template、JavaScript runtime、Vue runtime、reactivity、TypeScript、SFC compiler、tooling 与 browser API`
- `底层机制`
- `API / 语法规则`
- `概念示例结构`
- `示例代码`
- `逐行解释`
- `运行方式`
- `预期输出`
- `执行过程`
- `变量与引用变化`
- `依赖跟踪与组件更新`
- `为什么会得到这个结果`
- `对比情况`
- `常见错误为什么错`
- `与真实项目的关系`
- `最终记忆模型`

没有新增 API 的小节应明确说明其重点是机制，不得为了填表虚构 API。

## 代码解释规则

每个非平凡代码示例必须包含：

- 正确示例。
- 预期输出、DOM 结果或 compiler result。
- 逐行解释。
- JavaScript 执行过程。
- 相关响应式依赖与组件更新过程。
- 有意义的对比情况。
- 错误示例和错误类型。
- 违反的确切规则。
- 修正版本。
- 后续识别同类错误的方法。

代码窗口真实路径必须在最近的真实结构中出现。临时示例、错误对比和 copy template 使用逻辑 `Snippet:` / `Template:` 名称。

## Vue runtime 与 TypeScript 边界

- template syntax 不等于浏览器原生 HTML；说明 SFC/template compiler 如何把模板转成可执行 render 逻辑的概念边界。
- JavaScript 值的创建、闭包、模块作用域和异步调度属于 JavaScript runtime。
- reactive dependency tracking、component render effect、scheduler 与 DOM patch 属于 Vue runtime。
- props、emits、slots 和 provide/inject 同时包含组件 contract 与实际运行时值传递，不能只写类型签名。
- TypeScript 与 `vue-tsc` 提供静态诊断，不执行业务逻辑，也不自动验证网络响应或用户输入。
- Vue - Official / Volar 的 IDE 提示、`vue-tsc` CLI 诊断、Vite transpilation 和 production bundling 是不同工具行为。

## 最终小项目规则

完整章节必须包含最终小项目，并在开头自然说明：最终小项目只整合本章机制，不替代前面的分节教学。

最终小项目应包括目标、与本章的关系、真实目录结构、每个文件职责、完整代码、运行方法、预期交互、状态所有权、数据流、执行流、常见错误和可选扩展。

若核心概念只在项目中出现、项目代码压过浅薄的 `9.x` 教学，或增加文件并未改善机制理解，章节不得交付。

## 速查表规则

每章额外速查表至少包含：

- 一句话概念结论。
- 常用 API / syntax table。
- 相似概念比较。
- 常见 error type。
- 真实项目用途。
- 可安全复制的最小代码模板。

速查表用于复习，不替代首次学习所需的解释。

## 最终文件清单规则

最终文件清单只列：

- 本次实际创建或更新的指南文件。
- 最终小项目要求创建、保留或替换的真实练习文件。

每行包含 path、role 和 status。不得列入仅供参考的配置、官方文档、概念 snippet 或不存在的文件。概念示例另行说明为不需创建。

## 交付要求

交付前执行 `references/output-checklist.md`，并在最终响应输出 `检查项`、`结果`、`证据` 三列的自检表。只有存在准确路径、heading、anchor、selector、命令结果或文件映射等可复现证据时才标为 `PASS`；未执行的检查使用 `UNKNOWN`。
