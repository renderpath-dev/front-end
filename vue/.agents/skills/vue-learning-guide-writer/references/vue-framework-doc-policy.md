# Vue 框架资料策略

本策略用于 Vue 3、Vue TypeScript、Vue Router、Pinia、Vite、testing 和 Nuxt 边界相关学习文档。

## 检查顺序

1. 先检查当前仓库的 `AGENTS.md`、README、package 文件、配置、现有指南、练习代码和本地参考资料。
2. 再使用当前可访问的官方文档核对版本敏感行为。
3. 官方文档优先于博客、视频摘要、旧教程和模型记忆。
4. 本地材料与当前官方文档冲突时，标明本地内容已过时，并采用官方文档。
5. 无法访问所需官方页面时，在对应内容附近加入 `Verification Needed`，并在最终响应中说明未验证项。

## 首选官方来源

1. Vue official docs: `https://vuejs.org/`
2. Vue TypeScript guide: `https://vuejs.org/guide/typescript/overview`
3. Vue Router official docs: `https://router.vuejs.org/`
4. Pinia official docs: `https://pinia.vuejs.org/`
5. Vite official docs: `https://vite.dev/`
6. Vitest official docs: `https://vitest.dev/`
7. Vue Test Utils official docs: `https://test-utils.vuejs.org/`
8. TypeScript Handbook: `https://www.typescriptlang.org/docs/handbook/intro.html`
9. TSConfig Reference: `https://www.typescriptlang.org/tsconfig/`
10. Nuxt official docs: `https://nuxt.com/docs/`，仅在讨论 SSR、hydration 或 Nuxt boundary 时使用

## 必须重点核对的行为

- `createApp`、app instance、plugin registration 和 mount boundary。
- SFC 与 `<script setup>` 的 compile-time behavior。
- `ref`、`reactive`、`computed`、`watch`、`watchEffect` 与 effect tracking。
- `defineProps`、`defineEmits`、`defineModel`、`defineSlots`、`withDefaults` 的当前 macro 行为与版本边界。
- `v-model` 的 component contract 与 modifier behavior。
- lifecycle hooks、template refs、provide/inject 与 directives。
- Vue Router 创建、history mode、navigation、route state 与 guards。
- Pinia store、state、getters、actions、plugins、SSR 和 testing。
- `vue-tsc` 的 SFC type checking 与 declaration generation 行为。
- Vite Vue plugin、dev server、HMR、transpilation、build 和 type-checking 边界。
- Vitest 与 Vue Test Utils 的当前 API、test environment、async update 和 component mounting。
- Nuxt server/client execution、SSR、hydration、data transfer 和 route rendering boundary。

## 引用与不确定性

- 最终响应列出实际读取的本地文件与官方 URL。
- 完整章节包含官方文档阅读清单。
- 不虚构默认配置、当前版本、macro 支持范围或 runtime behavior。
- 若官方页面只验证了原则而未验证某个具体 API 签名，对该签名继续标记 `Verification Needed`。
