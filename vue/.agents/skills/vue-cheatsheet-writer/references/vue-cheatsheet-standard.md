# Vue 速查表标准

## 速查表目的

Vue 速查表用于快速回忆、比较概念、诊断常见错误和选择项目写法。它不是首次学习教程，也不替代完整机制指南。

优秀速查表应让读者快速回答：

- 这个概念属于 template、JavaScript runtime、Vue runtime、reactivity、TypeScript、SFC compiler 还是 tooling？
- 它读取和产生什么值？
- 它何时执行或更新？
- 与相似概念的关键差异是什么？
- 常见错误违反哪条规则？
- 在真实项目中何时使用或避免？

## 应包含的内容

- 一句话概念结论。
- 重要术语及所属层。
- 可扫描的 syntax / API table。
- runtime behavior 与 TypeScript behavior。
- 相似概念 comparison table。
- 包含识别方法的 error table。
- 真实 project usage 与 decision rule。
- 短小、安全、可复制的 minimal code template。
- 实际使用的官方文档链接。

## 不应包含的内容

- 完整章节式长篇推导。
- 与主题无关的历史背景。
- 没有选择条件的 API 罗列。
- 未经官方文档核对的版本敏感结论。
- 伪造的真实文件路径。
- 大量应用 boilerplate、完整业务功能或未请求依赖。
- 用表格替代必须理解的关键机制边界。

若用户需要从零理解 dependency tracking、component update、compiler macro 或 SSR/hydration，推荐 `vue-learning-guide-writer`。

## 概念比较表规则

比较表至少包含：

- Comparison Question。
- 两个或多个 concept。
- Owner / source value。
- Read behavior。
- Update / execution trigger。
- Runtime cost 或 lifecycle effect。
- TypeScript boundary。
- Best fit。
- Avoid when。
- 一句 decision rule。

必须解释差异，不能只列名称。例如 `computed` 与 `watch` 的核心不是语法不同，而是 derived value 与 side effect 的职责不同。

## API 表规则

API 表根据主题选择以下列：

- API / Syntax。
- Layer。
- Input。
- Return / Exposed Value。
- Dependency Behavior。
- Runtime Effect。
- TypeScript Relationship。
- Project Use。
- Common Mistake。

只收录当前主题真正需要的 API。Macro 必须标明 compile-time 边界，runtime API 必须说明实际运行行为。

## 错误表规则

每个错误必须包含：

- Wrong Code。
- Error Type：compiler diagnostic、`vue-tsc` diagnostic、runtime warning、runtime error、stale UI 或 logic error。
- Violated Rule。
- Why It Fails。
- Correct Form。
- Recognition Method。

错误不能只给“不要这样写”。必须指出例如 props readonly contract、missing stable key、ref unwrapping boundary 或 Vite/type-checking boundary。

## 最小代码模板规则

- 每个模板只演示一个主要知识点。
- 使用 `Snippet:` 或 `Template:` title bar，除非对应真实文件已在附近结构中声明。
- 保持英文 identifier、string、comment 和 output。
- 不省略会导致误用的类型、event contract 或 `key`。
- 不加入与主题无关的 Router、Pinia、networking 或 UI library。
- 每个模板附一条适用条件和一条不适用条件。

## Vue 机制边界规则

- `ref`：说明 ref object、`.value` 和 template unwrapping boundary。
- `reactive`：说明 Proxy identity、property tracking 和直接解构风险。
- `computed`：说明 cached derived value 与 reactive dependency。
- `watch` / `watchEffect`：说明 source、side effect、cleanup 和 timing，必要时核对官方文档。
- props / emits / slots：说明 component contract 与 runtime value flow。
- directives：区分 template syntax 与 runtime directive behavior。
- lifecycle hooks：说明 component instance timing 与 DOM availability。
- template refs：说明 mount timing 和 nullable value。
- Vite：区分 dev server、transpilation、HMR 和 bundling。
- `vue-tsc`：区分 SFC static diagnostics 与 JavaScript runtime validation。

## TypeScript 边界规则

- 区分 TypeScript syntax、type inference、type compatibility、diagnostics、emitted JavaScript 和 runtime behavior。
- 说明 `defineProps` / `defineEmits` 等 macro 如何参与 SFC type analysis，但不把类型声明描述成运行时输入验证。
- 说明 IDE diagnostics、`vue-tsc` command 和 Vite behavior 是不同工具输出。
- 网络数据、storage 数据和用户输入需要运行时验证；TypeScript 类型不会自动验证外部值。

## 来源策略

遵循 `vue-source-policy.md`。先检查本地项目和被压缩的原指南，再用官方文档核对版本敏感内容。官方页面无法访问时添加 `Verification Needed`。

## 校验摘要

交付前确认：

- 输出保持 quick-reference 范围。
- 比较表包含机制差异和 decision rule。
- 错误表包含完整 error chain。
- minimal code 可复制且没有无关代码。
- 源码块没有中文字符。
- 所有代码示例符合 macOS-style code-window 规则。
- 官方来源已列出。
- 没有声称未运行的 command 已通过。
