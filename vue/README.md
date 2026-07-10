# Vue + TypeScript Learning Lab

## 目的

这是更广泛前端学习体系中的严肃 Vue 学习工作区。它以 Vue 3、TypeScript、Single-File Components（SFC）、响应式机制和现代工程实践为主线，从基础机制逐步推进到 Router、Pinia、测试、性能、SSR 与生产架构。

## 当前状态

agent 与 skill 基础设施已创建。第 1 章已经加入最小 Vue 3 + Vite + TypeScript 应用、分概念练习、`TaskBoardBasic.vue` 最终整合项目和完整学习指南。第 2 章已经加入响应式系统分概念练习、`VueReactivityLab.vue` 最终整合项目和完整学习指南。第 3 章已经加入组件通信与组件边界练习、`ComponentLibraryLab.vue` 最终整合项目和完整学习指南。第 4 章已经加入 Composition API 与 composables 架构练习、`ComposablesKitDemo.vue` 最终整合项目和完整学习指南。第 5 章已经加入 Vue + TypeScript 类型边界练习、`VueTsContractLab.vue` 最终整合项目和完整学习指南。第 6 章已经安装 Vue Router，并加入权限路由、动态菜单、导航守卫、typed routes、`VueAdminRouterLab.vue` 最终整合项目和完整学习指南。第 7 章已经安装 Pinia 与 Vitest，并加入 store boundary、auth/permission migration、allowlisted persistence、store unit tests、`VuePiniaAdminStateLab.vue` 最终整合项目和完整学习指南。第 8 章已经安装 Element Plus 与 Vue I18n，并加入 admin layout、Router query table、dialog/drawer form、local CRUD、local upload queue、operation permission、scoped theme、locale integration、`VueAdminDashboard.vue` 最终整合项目和完整学习指南。第 9 章已经安装 Axios 与 Zod，并加入 centralized API client、interceptors、local custom adapter、runtime validation、normalized errors、pagination/form request state、cancellation、timeout、safe retry、`VueApiContractLab.vue` 最终整合项目和完整学习指南：

- 第 1 章指南：`docs/vue/chapter-01-application-boundary/vue-chapter-01-learning-guide.md`
- 第 2 章指南：`docs/vue/chapter-02-reactivity-system/vue-chapter-02-learning-guide.md`
- 第 3 章指南：`docs/vue/chapter-03-component-communication/vue-chapter-03-learning-guide.md`
- 第 4 章指南：`docs/vue/chapter-04-composables-architecture/vue-chapter-04-learning-guide.md`
- 第 5 章指南：`docs/vue/chapter-05-vue-typescript-boundaries/vue-chapter-05-learning-guide.md`
- 第 6 章指南：`docs/vue/chapter-06-vue-router-permission/vue-chapter-06-learning-guide.md`
- 第 7 章指南：`docs/vue/chapter-07-pinia-state-management/vue-chapter-07-learning-guide.md`
- 第 8 章指南：`docs/vue/chapter-08-admin-ui-forms/vue-chapter-08-learning-guide.md`
- 第 9 章指南：`docs/vue/chapter-09-api-runtime-boundary/vue-chapter-09-learning-guide.md`
- 入口：`src/learning/vue/chapter-01-application-boundary/main.ts`
- Root component：`src/learning/vue/chapter-01-application-boundary/App.vue`
- 第 2 章组件入口：`src/learning/vue/chapter-02-reactivity-system/ReactivityChapterApp.vue`
- 第 3 章组件入口：`src/learning/vue/chapter-03-component-communication/ComponentsChapterApp.vue`
- 第 4 章组件入口：`src/learning/vue/chapter-04-composables-architecture/ComposablesChapterApp.vue`
- 第 5 章组件入口：`src/learning/vue/chapter-05-vue-typescript-boundaries/VueTypeScriptChapterApp.vue`
- 第 6 章组件入口：`src/learning/vue/chapter-06-vue-router-permission/VueRouterChapterApp.vue`
- 第 6 章 Router：`src/learning/vue/chapter-06-vue-router-permission/router/index.ts`
- 第 7 章组件入口：`src/learning/vue/chapter-07-pinia-state-management/PiniaChapterApp.vue`
- 第 7 章 Pinia root：`src/learning/vue/chapter-07-pinia-state-management/stores/pinia.ts`
- 第 8 章组件入口：`src/learning/vue/chapter-08-admin-ui-forms/AdminUiChapterApp.vue`
- 第 8 章最终项目：`src/learning/vue/chapter-08-admin-ui-forms/admin-dashboard/VueAdminDashboard.vue`
- 第 9 章组件入口：`src/learning/vue/chapter-09-api-runtime-boundary/ApiRuntimeChapterApp.vue`
- 第 9 章最终项目：`src/learning/vue/chapter-09-api-runtime-boundary/api-contract-lab/VueApiContractLab.vue`

后续章节继续在 `docs/vue/` 与 `src/learning/vue/` 下按相同章节身份组织。

## 当前命令

安装依赖后可使用：

```bash
npm install
npm run dev
npm run typecheck
npm run test:unit
npm run build
npm run preview
```

`test:unit` 只覆盖第 7 章的纯 Pinia store unit tests；component、integration、E2E、coverage 与 CI 属于后续质量门禁章节。`lint` 尚未配置。

## 资料优先级

1. [Vue 官方文档](https://vuejs.org/)
2. [Vue TypeScript 指南](https://vuejs.org/guide/typescript/overview)
3. [Vue Router 官方文档](https://router.vuejs.org/)
4. [Pinia 官方文档](https://pinia.vuejs.org/)
5. [Element Plus 官方文档](https://element-plus.org/)
6. [Vue I18n 官方文档](https://vue-i18n.intlify.dev/)
7. [Axios 官方文档](https://axios-http.com/docs/intro)
8. [Zod 官方文档](https://zod.dev/)
9. [Vite 官方文档](https://vite.dev/)
10. [Vitest 官方文档](https://vitest.dev/)
11. [Vue Test Utils 官方文档](https://test-utils.vuejs.org/)
12. [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) 与 [TSConfig Reference](https://www.typescriptlang.org/tsconfig/)
13. [Nuxt 官方文档](https://nuxt.com/docs/)（涉及 SSR、hydration 或 Nuxt 边界时）
14. 当前工作区已有学习笔记和后续练习代码

本地资料与当前官方文档冲突时，以官方文档为准。

## 学习大纲

01. Vue application boundary, Vite, SFC, and createApp
02. Template syntax, directives, and rendering
03. Reactivity fundamentals: ref, reactive, computed
04. Events, v-model, and form binding
05. Components, props, emits, and slots
06. Lifecycle, watch, watchEffect, and template refs
07. Composables and reusable logic
08. Router, URL state, and navigation
09. Pinia and application state architecture
10. Async data, error states, and request lifecycle
11. TypeScript with Vue SFC and vue-tsc
12. Testing Vue components and quality gates
13. Performance, rendering mechanism, KeepAlive, Teleport, Suspense
14. Nuxt boundary: SSR, hydration, server/client runtime
15. Production Vue architecture and capstone project

## 练习原则

- 需要时先解释 JavaScript 运行时如何创建、读取和修改值。
- 再解释 Vue runtime、响应式依赖跟踪或 SFC compiler 如何处理这些值。
- 最后解释 TypeScript、IDE 与 `vue-tsc` 检查了什么，以及它们不会在运行时做什么。
- 每个文件只聚焦一个主要概念，使用能表达学习目标的英文文件名。
- 完整机制讲解放在 `docs/vue/`。
- 可运行练习在应用创建后放在 `src/learning/vue/`。
- 代码、路径和命令必须可以由当前仓库状态验证；尚未创建的内容必须明确标为计划项或 `Snippet:` / `Template:`。
