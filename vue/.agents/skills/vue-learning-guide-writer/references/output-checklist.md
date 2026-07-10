# Vue 学习指南输出检查清单

交付完整 Vue 学习指南前，逐项检查并保留可复现证据。

## 教学与机制

- [ ] 指南是教学文档，不是摘要、API 列表、目录树或 snippet collection。
- [ ] H1 包含 Vue、章节编号和具体章节名。
- [ ] 正文以机制讲解为主。
- [ ] 每个核心 `9.x` 小节都有当前 Vue 概念专属的解释，而不是标签填充。
- [ ] 每个核心 `9.x` 小节都有完整 Vue 机制证据链。
- [ ] 证据链追踪 trigger、JavaScript runtime value、reactive source、dependency tracking、component/SFC boundary、TypeScript relation、observed result、violated rule 和 real-project recognition。
- [ ] Vue runtime、JavaScript runtime、TypeScript type system、SFC compiler 和 Vite tooling 被明确区分。
- [ ] 相关小节说明具体 dependency read、effect/render/update owner 和 mutation trigger。
- [ ] React-specific 机制语言没有被用作 Vue 的主要模型。
- [ ] 非平凡代码之后有逐行解释、执行过程、变量与引用变化、依赖跟踪、结果原因和错误分析。

## 结构与导航

- [ ] `## 目录` 位于 H1 与 style block 之后、`## 0. 文件定位` 之前。
- [ ] TOC 包含实际存在的全部编号顶层章节。
- [ ] TOC 包含每个核心 `9.x` 小节。
- [ ] 每个 `9.x` TOC entry 使用稳定的 `#section-9-x` target。
- [ ] 每个核心 heading 前有匹配且唯一的显式 anchor。
- [ ] anchor 与 heading 之间最多一个空行。
- [ ] 有真实练习文件时存在 `## 本章代码定位索引`。
- [ ] 代码定位索引、目录结构、真实代码窗口 title bar 和最终文件清单中的路径一致。
- [ ] 所有标为真实文件的路径都能在本地解析。
- [ ] 概念示例使用 `Snippet:` / `Template:`，不伪装成真实文件。

## 错误、项目与复习

- [ ] 常见错误包含 wrong code、error type、violated rule、correction 和 recognition method。
- [ ] 最终小项目明确用于整合而非替代分节教学。
- [ ] 最终小项目没有压过核心 `9.x` 的机制解释。
- [ ] 核心概念没有只在最终项目中出现。
- [ ] 存在额外 cheatsheet。
- [ ] 存在 official docs reading list。
- [ ] 最终文件清单只包含本次文档和真实项目文件，并包含 path、role、status。

## 语言与代码窗口

- [ ] 源码代码块不含中文字符。
- [ ] 所有源码、terminal、output 和 error 示例使用 macOS-style code window。
- [ ] 每个 title bar 都包含 red、yellow、green dots 和明确 label。
- [ ] 装饰元素位于源码块外。
- [ ] 没有用 raw HTML `<pre><code>` 包裹源码。
- [ ] fenced language 与内容匹配。
- [ ] 自给自足的 style 定义包含 `.macos-code-window`。
- [ ] style 定义包含 `.macos-code-titlebar`。
- [ ] style 定义包含 `.macos-code-dot` 和三个颜色类。
- [ ] style 定义包含 `.macos-code-title`。
- [ ] style 定义包含 `.macos-code-titlebar + pre`。
- [ ] style 定义包含 `.macos-code-titlebar + pre code`。

## 来源、验证与最终响应

- [ ] 已先检查本地文件，再核对版本敏感官方文档。
- [ ] 无法核对的行为标为 `Verification Needed`。
- [ ] 没有把未运行的 validation command 声称为通过。
- [ ] 最终响应列出文件、来源、实际命令、限制和人工验证项。
- [ ] 最终响应包含 `检查项`、`结果`、`证据` 三列的 evidence-based self-check。
- [ ] 每个 `PASS` 都引用 path、heading、anchor、selector、command result 或 exact count。

## Hard-Fail 条件

出现任一情况即为 `FAIL`，继续修订后才能交付：

1. 使用 macOS code-window HTML，却缺少必需的自给自足 style selectors 或明确的外部样式来源。
2. TOC 漏掉任何核心 `9.x` 小节。
3. 核心 `9.x` 只有通用标签，没有当前 Vue 概念的机制证据链。
4. 机制解释可以原样复制到另一个章节。
5. 最终小项目替代或明显压过分节教学。
6. 任一标为真实文件的路径在本地不存在。
7. 真实 title bar 路径与最终文件清单不一致。
8. `Snippet:` / `Template:` 被列为真实最终文件。
9. 源码块包含中文字符。
10. self-check 只有“已检查”等无法复现的结论。
11. 未运行 lint、build 或 typecheck，却在最终响应声称通过。
12. `9.x` TOC target、显式 anchor 与 heading 编号不匹配，或 anchor id 重复。
