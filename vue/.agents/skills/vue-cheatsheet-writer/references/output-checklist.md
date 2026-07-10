# Vue 速查表输出检查清单

## 范围与质量

- [ ] 输出是 quick-reference，不是完整 tutorial。
- [ ] 内容简洁但没有丢失防止误解所需的 Vue mechanism distinction。
- [ ] Vue template、JavaScript runtime、Vue runtime、reactivity、TypeScript、SFC compiler 和 tooling 在相关处被区分。
- [ ] 表格解释 differences、trigger、cost 和 decision rule，不只列名称。
- [ ] `ref` / `reactive`、`computed` / `watch` 等比较说明机制差异。
- [ ] 用户需要首次学习材料时推荐 `vue-learning-guide-writer`。

## API、错误与模板

- [ ] API table 包含 layer、runtime effect 和 TypeScript relationship。
- [ ] 常见错误包含 wrong code、error type、violated rule、correction 和 recognition method。
- [ ] minimal code template 短小、完整、安全复制且没有无关 boilerplate。
- [ ] `v-for` 示例使用稳定 `key`。
- [ ] `v-model` 示例表达清楚 value/prop 与 update event contract。
- [ ] SFC `<script setup>` 示例保持 compile-time 与 runtime 边界。
- [ ] `vue-tsc` 被描述为 SFC type-checking 工具，Vite dev server 没有被误写成完整 type checker。

## 来源与语言

- [ ] 已先检查本地材料。
- [ ] 版本敏感内容使用当前官方文档。
- [ ] 实际使用的 official docs 已列出。
- [ ] 无法访问的内容标为 `Verification Needed`。
- [ ] 源码代码块不含中文字符。
- [ ] identifiers、filenames、commands、APIs、packages、errors、runtime strings 和 comments 保持英文。

## macOS 风格代码窗口

- [ ] 每个源码、terminal、output 和 error 示例都有 macOS-style HTML title bar。
- [ ] 每个 title bar 包含 red、yellow、green dots。
- [ ] title bar 使用真实路径、`Snippet:`、`Template:`、`Terminal`、`Output` 或 `Error`。
- [ ] 装饰元素在源码块外。
- [ ] 没有 raw HTML `<pre><code>` 源码。
- [ ] 独立速查表包含所有 required style selectors，包括 `.macos-code-titlebar + pre` 和 `.macos-code-titlebar + pre code`。

## 交付

- [ ] 最终响应列出文件、来源、压缩范围、实际检查和限制。
- [ ] 没有把未运行的 command 声称为通过。
- [ ] self-check 的 `PASS` 有具体 path、selector、count 或 command evidence。
