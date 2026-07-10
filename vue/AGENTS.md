# Vue 学习工作区规则

本目录是 `Vue 3 + TypeScript` 学习工作区。学习目标是从语法使用逐步进入运行机制、工程边界和生产级实践，而不是只收集 API、代码片段或项目模板。

## 教学要求

- Vue 学习文档必须先说明概念解决的问题，再解释运行过程、边界、错误原因和真实项目用途。
- 必须区分 Vue template 语法、JavaScript 运行时行为、Vue 运行时行为、Vue 响应式机制、TypeScript 类型系统行为、SFC 编译器行为、Vite 工具行为和浏览器平台 API。
- 讲解 Vue 组件时，应连接 template、编译结果的概念模型、组件实例、响应式依赖、DOM patch、props、emits、slots、directives 和 lifecycle hooks。
- 讲解 TypeScript 时，应区分类型检查、`vue-tsc` / IDE 诊断、类型擦除后的 JavaScript 和实际运行时验证。
- 不得把 Vue 解释成另一种框架的语法变体，也不得使用其他框架的内部术语作为 Vue 的主要心智模型。

## 资料优先级

1. Vue 官方文档：`vuejs.org`
2. Vue 官方 TypeScript 指南
3. Vue Router 官方文档
4. Pinia 官方文档
5. Vite 官方文档
6. Vitest 官方文档
7. TypeScript Handbook 与 TSConfig Reference
8. 当前仓库已有的学习笔记与练习代码

本地资料和当前官方文档冲突时，以官方文档为准，并明确标记本地资料中过时的内容。版本敏感内容不得只依赖模型记忆。

## 工具与类型检查边界

- Vite dev server 负责开发期模块转换与服务，不等于完整的 Vue SFC 类型检查。
- 创建 Vue 应用后，Vue SFC 命令行类型检查应使用 `vue-tsc`。
- 不得在当前章节或项目设置不需要依赖时提前添加依赖。
- 不得把 transpilation、bundling、linting、testing 和 type checking 混为同一个工具阶段。

## 文档与练习文件

- 完整章节文档放在 `docs/vue/`。
- 可运行练习在 Vue 应用创建后放在 `src/learning/vue/`。
- 每章应让文档中的真实路径、代码窗口标题栏和实际练习文件互相对应。
- 一个练习文件聚焦一个主要概念，文件名应说明知识点或组件职责。
- 使用描述性英文文件名，不使用 `demo.vue`、`test.vue`、`example.vue`、`1.vue`、`2.vue`，也不得用多个无关概念反复覆盖 `App.vue`。

## 语言与代码

- 学习指南、速查表和中文学习文档的正文可使用中文。
- 标识符、文件名、命令、API、包名、错误原文、运行时 UI 字符串和源码注释保持英文。
- 源码代码块不得包含中文字符。
- 不使用 emoji。

## 当前阶段边界

当前任务只建立 `AGENTS.md`、`README.md`、skill、reference 和 asset 基础设施。后续第一次 Vue 项目设置任务可以创建应用配置，但当前阶段不得创建 runnable Vue app、章节 01 或安装依赖。
