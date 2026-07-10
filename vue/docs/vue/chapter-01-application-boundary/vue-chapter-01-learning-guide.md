# Vue 第 1 章：Application Boundary、Vite、SFC 与 createApp

<style>
.macos-code-window {
  margin: 1.25rem 0;
  overflow: hidden;
  border: 1px solid #30363d;
  border-radius: 10px;
  background: #0d1117;
}

.macos-code-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 14px;
  background: #21262d;
}

.macos-code-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.macos-code-dot-red {
  background: #ff5f57;
}

.macos-code-dot-yellow {
  background: #febc2e;
}

.macos-code-dot-green {
  background: #28c840;
}

.macos-code-title {
  margin-left: 6px;
  color: #c9d1d9;
  font: 600 0.82rem/1.2 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.macos-code-titlebar + pre {
  margin: 0;
  border: 0;
  border-radius: 0;
}

.macos-code-titlebar + pre code {
  display: block;
  padding: 1rem;
}
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
  - [9.1 Vue 应用边界：浏览器、Vite、Vue runtime 各自负责什么](#section-9-1)
  - [9.2 Vite 项目入口：index.html、main.ts、App.vue 如何连起来](#section-9-2)
  - [9.3 createApp 与 mount：Vue 应用如何挂载到真实 DOM](#section-9-3)
  - [9.4 Single-File Component：template、script setup、style scoped 的边界](#section-9-4)
  - [9.5 Template syntax：插值、表达式、attribute binding](#section-9-5)
  - [9.6 Event handling：v-on、@、handler function 与事件对象](#section-9-6)
  - [9.7 Conditional rendering：v-if、v-else、v-show 的基础边界](#section-9-7)
  - [9.8 List rendering：v-for、key、数组渲染的身份模型](#section-9-8)
  - [9.9 Form binding：v-model 在 input 上的读写关系](#section-9-9)
  - [9.10 Class and style binding：动态 class / style 的数据来源](#section-9-10)
  - [9.11 Chapter integration：TaskBoardBasic 如何把本章机制串起来](#section-9-11)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标](#121-项目目标)
  - [12.2 文件结构与职责](#122-文件结构与职责)
  - [12.3 完整代码](#123-完整代码)
  - [12.4 运行命令与预期行为](#124-运行命令与预期行为)
  - [12.5 执行流程、状态所有权与 template 数据流](#125-执行流程状态所有权与-template-数据流)
  - [12.6 常见错误与扩展任务](#126-常见错误与扩展任务)
- [13. 额外速查表](#13-额外速查表)
- [14. 最终文件清单](#14-最终文件清单)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标 | 对应文件 | 类型 | 所在章节 |
| --- | --- | --- | --- |
| 理解浏览器根容器和模块入口 | `index.html` | 真实入口文件 | 9.1、9.2、9.3 |
| 理解 Vite 的 Vue SFC transform plugin | `vite.config.ts` | 真实工具配置 | 9.1、9.4 |
| 理解 Vue 应用实例和 root component 挂载 | `src/learning/vue/chapter-01-application-boundary/main.ts` | 真实入口模块 | 9.2、9.3 |
| 理解 root component 如何组合页面 | `src/learning/vue/chapter-01-application-boundary/App.vue` | 真实 root component | 9.2、9.4 |
| 使用最小 `ref()` 产生交互更新 | `src/learning/vue/chapter-01-application-boundary/CounterBasic.vue` | 真实练习组件 | 9.4、9.6 |
| 练习 interpolation 与 attribute binding | `src/learning/vue/chapter-01-application-boundary/TemplateBinding.vue` | 真实练习组件 | 9.5 |
| 区分 `v-if`、`v-else-if`、`v-else` 与 `v-show` | `src/learning/vue/chapter-01-application-boundary/ConditionalRendering.vue` | 真实练习组件 | 9.7 |
| 使用稳定 `key` 渲染数组 | `src/learning/vue/chapter-01-application-boundary/ListRendering.vue` | 真实练习组件 | 9.8 |
| 练习 text、checkbox、select 与 submit binding | `src/learning/vue/chapter-01-application-boundary/FormBinding.vue` | 真实练习组件 | 9.9 |
| 让 class / style 读取 JavaScript 值 | `src/learning/vue/chapter-01-application-boundary/ClassStyleBinding.vue` | 真实练习组件 | 9.10 |
| 整合本章全部基础机制 | `src/learning/vue/chapter-01-application-boundary/TaskBoardBasic.vue` | 真实最终项目组件 | 9.11、12 |

## 0. 文件定位

本章指南位于：

- `docs/vue/chapter-01-application-boundary/vue-chapter-01-learning-guide.md`

本章可运行入口位于：

- `index.html`
- `src/learning/vue/chapter-01-application-boundary/main.ts`
- `src/learning/vue/chapter-01-application-boundary/App.vue`

本章不是把所有代码塞进一个 `App.vue`。入口、root component、单概念练习和最终整合项目各自承担不同职责。阅读指南时，应同时打开代码定位索引里的真实文件，沿着 `index.html → main.ts → App.vue → child component` 追踪值和组件边界。

## 1. 本章解决的问题

第一次运行 Vue 项目时，页面看起来像是“打开一个 `.vue` 文件”。实际过程并不是这样：

1. 浏览器先请求 `index.html`，找到 `#app` 和 module script。
2. Vite dev server 解析 module request，处理 bare import、TypeScript 和 `.vue` SFC。
3. `main.ts` 导入 `createApp` 与 `App.vue` 编译后的 module binding。
4. `createApp(App)` 创建 Vue application instance，并把 `App` 设为 root component。
5. `.mount("#app")` 找到真实 DOM container，创建 root component instance，将 template 的结果渲染到 container 内部。
6. 用户触发事件后，handler 修改最小 reactive state；Vue 重新执行受影响的组件更新并 patch DOM。

如果不先划清这些边界，后续很容易把浏览器、Vite、SFC compiler、Vue runtime 和 TypeScript 的职责混成一句“框架帮我运行了”。本章的目标是让每一个输入文件、module binding、DOM container 和 UI 结果都有明确 owner。

## 2. 前置概念

| 前置概念 | 本章需要理解到什么程度 | 影响 |
| --- | --- | --- |
| HTML document | 知道浏览器解析 element、attribute、form 与 module script | 才能理解 `index.html` 和 `#app` |
| DOM | 知道 `document` 中的 element 可被 selector 找到和更新 | 才能理解 `mount` 的 container |
| JavaScript module | 知道 `import` 建立 module binding，module 由 URL 加载 | 才能追踪 `main.ts`、`App.vue` 和 child import |
| Function | 知道 function value 与 function call 不同 | 才能区分 `@click="increment"` 和 `@click="increment()"` |
| Object / array | 知道属性、数组 element、`find`、`filter`、`push` | 才能理解 task list |
| TypeScript | 知道 type annotation 只参与静态检查 | 才不会把类型写成运行时验证 |
| CSS selector | 知道 `#app` 是 id selector，class selector 选择 class | 才能理解 mount selector 和 scoped CSS output |

本章不要求先掌握 `reactive`、`computed`、`watch`、`watchEffect`、`track`、`trigger` 或 `nextTick`。它们属于第 2 章。

## 3. 学习目标

完成本章后，应能：

- 从浏览器第一次请求开始，解释 `index.html`、Vite、`main.ts`、`createApp`、`mount`、`App.vue` 和 DOM container 的完整连接。
- 解释 `.vue` 为什么不是浏览器原生 module，以及 SFC compiler 如何把它变成 standard JavaScript module 与 CSS。
- 解释 `<script setup>` 为什么让 top-level imports、variables 和 functions 可直接用于 template。
- 区分 interpolation、`v-bind` / `:`、`v-on` / `@`、`v-if`、`v-show`、`v-for`、`v-model`、class binding 和 style binding。
- 使用最小 `ref()` 完成交互，但把深层依赖追踪推迟到第 2 章。
- 说明 TypeScript、`vue-tsc`、Vite dev server 和 production build 分别检查或转换什么。
- 独立运行并扩展 `TaskBoardBasic.vue`，同时保持 local state、稳定 `key` 和清晰 event flow。

## 4. 推荐学习顺序

1. 先读 `index.html`，确认浏览器实际拿到的 root container 和 module URL。
2. 再读 `main.ts`，确认 `createApp`、`App` module binding 和 selector。
3. 打开 `App.vue`，确认 root component 只负责页面组合。
4. 依次运行六个单概念组件，观察每个 directive 的输入值和 DOM 结果。
5. 最后阅读 `TaskBoardBasic.vue`，把 form、event、list、condition、class 和 local state 串成一条数据流。
6. 用 `npm run typecheck` 检查 SFC TypeScript contract，用 `npm run build` 检查 typecheck 加 production bundle。

## 5. 核心术语表

| Concept | Layer | 本章中的具体含义 | 容易混淆的点 |
| --- | --- | --- | --- |
| Application boundary | Architecture | 从 `index.html`、module entry 到 mounted component tree 的范围 | 不等于整个 browser document |
| Vite dev server | Tooling | 按需转换并提供 modules，支持 Vue SFC HMR | 不执行完整 SFC type checking |
| `index.html` | Browser entry | 提供 `#app` 和 module script URL | 不是 Vue component |
| `createApp` | Vue application API | 以 root component 创建 application instance | 还没有把 UI 写进 DOM |
| `mount` | Vue application API / DOM boundary | 选择 container 并挂载 root component | container 本身不属于 app component tree |
| Root component | Vue runtime | application component tree 的顶层 component definition / instance | 不等于 root DOM container |
| SFC | SFC compiler | 将 template、logic、style 共置的 `.vue` file format | 不是浏览器原生文件格式 |
| `<script setup>` | SFC compiler | 编译成 component `setup()` 内容的 compile-time syntax | 不是普通 module script 的别名 |
| Template | SFC compiler + Vue runtime | 被编译为 render logic 的声明式 UI 描述 | 不是任意 HTML string |
| Directive | Template syntax | 以 `v-` 开头、让 expression 参与 DOM / component behavior 的特殊 attribute | 不会保留为最终 DOM attribute |
| `ref` | Vue reactivity | 保存可变 value 的 reactive container | script 中写 `.value`，template 顶层 ref 会自动解包 |
| `vue-tsc` | Type tooling | 对 `.ts` 和 Vue SFC 执行 command-line static type checking | 不运行 UI，也不验证用户实际输入 |

## 6. 底层心智模型

把本章记成三条相互连接但职责不同的链：

1. **加载链**：browser request → `index.html` → module script URL → Vite transform → standard browser modules。
2. **挂载链**：`main.ts` → `createApp(App)` → application instance → `.mount("#app")` → root component instance → DOM children。
3. **交互链**：DOM event → template listener → JavaScript handler → `ref.value` / array mutation → affected component update → DOM patch。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: Chapter 01 boundary model</span>
  </div>

```txt
Browser
  -> index.html
  -> /src/learning/vue/chapter-01-application-boundary/main.ts

Vite
  -> resolves modules
  -> transforms TypeScript
  -> compiles Vue SFC requests through the Vue plugin

Vue runtime
  -> createApp(App)
  -> mount("#app")
  -> create component instances
  -> render and patch DOM children

User interaction
  -> native DOM event
  -> template handler
  -> local ref mutation
  -> component update
```
</div>

这里故意只把 reactive update 写到“读到值、修改值、受影响组件更新”这一层。`track`、`trigger`、effect scheduling 和 `nextTick` 的深层实现留给第 2 章。

## 7. 推荐目录结构

以下是本章已创建的真实结构：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Chapter 01 real file structure</span>
  </div>

```txt
vue/
  docs/
    vue/
      chapter-01-application-boundary/
        vue-chapter-01-learning-guide.md
  src/
    learning/
      vue/
        chapter-01-application-boundary/
          App.vue
          main.ts
          CounterBasic.vue
          TemplateBinding.vue
          ConditionalRendering.vue
          ListRendering.vue
          FormBinding.vue
          ClassStyleBinding.vue
          TaskBoardBasic.vue
  index.html
  package.json
  tsconfig.json
  tsconfig.app.json
  tsconfig.node.json
  vite.config.ts
```
</div>

`App.vue` 负责组合，不负责吞下所有概念。六个基础组件各自暴露一个主要知识点，`TaskBoardBasic.vue` 只在最后做整合。

## 8. 示例运行方式

第一次运行先安装 `package.json` 中的依赖：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm install
```
</div>

启动 Vite dev server：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run dev
```
</div>

单独执行 Vue SFC type checking：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run typecheck
```
</div>

执行 typecheck 后再生成 production build：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run build
```
</div>

`npm run dev` 成功只说明 dev server 能启动并转换当前请求；它不能替代 `vue-tsc --noEmit` 对完整 SFC type graph 的静态检查。

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 Vue 应用边界：浏览器、Vite、Vue runtime 各自负责什么

**结论：**

浏览器负责 document、module request 和真实 DOM；Vite 负责开发期 module resolution、按需 transform、SFC plugin pipeline 与 HMR；Vue runtime 负责 application/component instance、template 对应的 render/update 和 DOM patch。三者协作，但不是同一个运行层。

**本节解决的问题：**

当浏览器地址栏打开 Vite URL 时，为什么它能显示 `App.vue`，但把 `.vue` 文件直接交给浏览器却不能得到同样结果？答案不在 `.vue` 的文本内容，而在请求经过了 Vite 和 Vue SFC compiler。

**技术意义：**

划清边界后，错误位置会变得可判断：

- module URL 404 或 bare import 无法解析，先看 Vite / module graph。
- `#app` 不存在，先看 browser document 与 mount selector。
- template directive 行为不符合预期，先看 SFC compiler 和 Vue runtime。
- SFC type diagnostic，使用 `vue-tsc` 或 IDE，而不是把 dev server 当 type checker。

**概念解释：**

`index.html` 是浏览器入口。它的 module script 指向 `main.ts`。开发时，浏览器向 Vite 请求这个 URL；Vite 转换 TypeScript，并让 `@vitejs/plugin-vue` 处理 `.vue` request。转换后的内容才是浏览器可执行的 standard ES modules。模块执行后，Vue runtime 才开始创建 application instance 和 component tree。

**边界：语法、运行时、Vue runtime、SFC compiler、TypeScript、Vite tooling：**

- HTML syntax：`<div id="app"></div>` 和 `<script type="module">` 由浏览器解析。
- JavaScript runtime：执行 imports、function calls、array methods 和 event handlers。
- Vue runtime：管理 application/component instance、读取 reactive state 并更新 DOM。
- SFC compiler：把 `.vue` 中的 template、script 和 style 转成 JavaScript/CSS 可处理形式。
- TypeScript：静态检查 `.ts` 和 `<script setup lang="ts">`，类型在运行前被擦除。
- Vite tooling：开发期提供 modules/HMR，build 时生成 production assets；不是完整 type checker。

**底层机制：**

机制证据链：

1. 用户访问 dev server URL，浏览器请求 `index.html`。
2. 浏览器创建 `#app` element，并请求 module script 指向的 `main.ts`。
3. Vite 读取 module graph；`createApp`、`App` 等 import declarations 成为转换后 module 的 bindings。
4. `.vue` import 交给 Vue plugin/SFC compiler，template 和 style 不会原样作为浏览器 JavaScript 执行。
5. `main.ts` 调用 `createApp(App).mount("#app")`；Vue runtime 创建 root component instance。
6. component render 读取 template 使用的 state，例如 `CounterBasic.vue` 的 `count`。
7. 用户点击后，handler 修改 `count.value`，受影响的 component update 再把 `Count: 1` patch 到 DOM。
8. TypeScript 可检查 `count.value` 是 number，却不会检查浏览器 document 运行时一定存在 `#app`。
9. 真实项目中若 dev server 能打开但 typecheck 失败，说明 transform boundary 与 static-analysis boundary 不同，不是互相矛盾。

**API / 语法规则：**

本节没有新增复杂 API。只需识别 browser module script、Vite dev server、Vue SFC transform 和 Vue runtime 四个责任边界。

**文件结构：**

- Browser entry：`index.html`
- Tool config：`vite.config.ts`
- JavaScript/TypeScript entry：`src/learning/vue/chapter-01-application-boundary/main.ts`
- Root SFC：`src/learning/vue/chapter-01-application-boundary/App.vue`

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: application boundary trace</span>
  </div>

```txt
GET /
  -> index.html
  -> GET /src/learning/vue/chapter-01-application-boundary/main.ts
  -> Vite transforms the module graph
  -> Vue plugin compiles imported SFCs
  -> Browser executes standard modules
  -> Vue mounts the root component
```
</div>

**逐行解释：**

- `GET /` 是浏览器 document request，不是 Vue API。
- `index.html` 提供 module URL；module URL 决定入口文件。
- Vite 按 module graph 返回可执行内容，而不是让浏览器理解 `.ts` / `.vue` 原文。
- Vue plugin 把每个 imported SFC 的不同 block 编译并组合。
- browser 执行 module 后才调用 Vue application API。
- mount 完成后，root component 的输出才进入 `#app` 内部。

**执行过程：**

启动 `npm run dev` 只是开启 Vite 这一服务边界。真正打开页面后，browser request 才触发 transform；`main.ts` 执行才触发 Vue application creation；template event 发生后才触发 reactive update。

**变量与引用变化：**

启动阶段主要是 module bindings 和 object references：`App` binding 指向编译后的 component definition；`createApp(App)` 返回新的 application object；mount 后该 app 拥有 root component instance。此时不是把字符串形式的 `.vue` 塞进 DOM。

**为什么得到这个结果：**

页面能显示，是因为 browser 最终拿到 standard modules 和 DOM operations；页面能更新，是因为 Vue runtime 读到了 component state 并管理对应更新。缺少 Vite/SFC transform 时，browser 不知道怎样把一个 `.vue` 文件变成可执行 component module。

**对比写法：**

Vue 可以在无 build step 的简单页面中通过 CDN/global build 使用，但该方式不能直接使用 SFC syntax。本章选择 Vite + SFC，是因为目标是完整 Vue + TypeScript application，而不是静态 HTML 的局部增强。

**常见错误为什么错：**

直接在 module script 中写 `src="./App.vue"` 违反 browser module format boundary。常见结果是 MIME/module parse error 或无法识别 SFC syntax。识别信号是 browser 直接请求 `.vue`，中间没有 Vite Vue plugin transform。

**与真实项目的关系：**

真实项目的 dev、typecheck、build、browser runtime 是不同质量阶段。能判断错误属于哪一阶段，才能避免反复修改无关代码。

**与当前学习主线的关系：**

本节先建立 framework/tool/platform boundary，为后续 template、reactivity、Router、Pinia 和 SSR 的分层学习提供坐标。

**最终记忆模型：**

browser 提供页面和 DOM，Vite 提供可执行 module graph，SFC compiler 把 `.vue` 转成模块，Vue runtime 把 component state 与 DOM 更新连接起来。

<a id="section-9-2"></a>

### 9.2 Vite 项目入口：index.html、main.ts、App.vue 如何连起来

**结论：**

入口不是单个文件，而是一条明确引用链：`index.html` 的 module URL 指向 `main.ts`，`main.ts` import `App.vue`，`App.vue` 再 import 并渲染 child components。

**本节解决的问题：**

如果修改 `App.vue` 没有显示，应该检查哪个连接？先确认 `index.html` 是否加载当前 `main.ts`，再确认 `main.ts` 是否 import 当前 `App.vue`，最后确认 `App.vue` template 是否使用了 imported component。

**技术意义：**

入口链决定了哪些文件进入 module graph。一个存在于磁盘但没有被任何入口 import 的 component，不会因为“放在 `src` 里”就自动出现。

**概念解释：**

`index.html` 是 Vite project 的 source entry，也是 browser document。`type="module"` 让 browser 按 ES module 规则加载入口 URL。`main.ts` 是 application bootstrap module；`App.vue` 是传给 `createApp` 的 root component definition。`App.vue` 中 imported component 被 template 引用后，才成为 root component tree 的 child。

**边界：语法、运行时、Vue runtime、SFC compiler、TypeScript、Vite tooling：**

- HTML syntax 声明 container 与 module URL。
- ES module syntax 声明 `createApp` 和 `App` bindings。
- Vite 把 `/src/.../main.ts` 当 source module 处理，并解析 `.vue` import。
- SFC compiler 处理 `App.vue` 的 blocks。
- Vue runtime 从 `App` 开始创建 component tree。
- TypeScript 检查 import/type usage，但不检查运行时 DOM 是否含有 selector。

**底层机制：**

机制证据链：

1. `index.html` parser 读到 module script 的 `src`。
2. Vite 返回转换后的 `main.ts`；JavaScript runtime 建立 `createApp` 与 `App` module bindings。
3. `App` 的静态 import 让 Vite 继续请求/转换 `App.vue`。
4. `App.vue` 的 top-level child imports 同样成为 module graph edges。
5. `createApp(App)` 记录 root component definition。
6. mount 后，root render 使用 `<CounterBasic />` 等 imported component bindings，Vue runtime 创建对应 child instances。
7. child template 读取各自 local refs；mutations 只更新拥有这些 refs 的相关 subtree。
8. TypeScript 可发现不存在的 import 或错误类型，但不会替浏览器创建缺失的 `#app`。
9. 真实项目中的 blank page 若伴随 failed module request，优先沿入口链检查路径和文件名大小写。

**API / 语法规则：**

- module script 使用 `type="module"`。
- Vite source URL 从 project root 解析，本章使用 `/src/learning/vue/chapter-01-application-boundary/main.ts`。
- SFC component 在 `<script setup>` 中 import 后，可直接在同一 SFC template 中用 PascalCase tag 引用。

**文件结构：**

真实连接文件是 `index.html`、`main.ts` 和 `App.vue`，child components 与 `App.vue` 同目录。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">index.html</span>
  </div>

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Runnable Vue 3 and TypeScript Chapter 01 learning workspace."
    />
    <title>Vue Chapter 01 Learning Lab</title>
  </head>
  <body>
    <div id="app"></div>
    <script
      type="module"
      src="/src/learning/vue/chapter-01-application-boundary/main.ts"
    ></script>
  </body>
</html>
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-01-application-boundary/main.ts</span>
  </div>

```ts
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```
</div>

**逐行解释：**

- `<!doctype html>` 选择 standards mode。
- `meta viewport` 让布局适配设备宽度。
- `<div id="app">` 只提供空 container；它不是 root component。
- module script 的 absolute source URL 指向本章真实 `main.ts`。
- `import { createApp }` 从 Vue package 建立 named binding。
- `import App` 从相对路径建立 root component binding。
- 最后一行先调用 `createApp(App)`，再对返回的 application instance 调用 `mount("#app")`。

**执行过程：**

browser 先完成 document element 构造，再加载 module。module dependencies 解析完成后执行 `main.ts`。`App.vue` 在 bootstrap 前已被转换并作为 module dependency 求值，因此 `createApp` 收到的是 component definition，不是文件路径字符串。

**变量与引用变化：**

`createApp` 与 `App` 都是不可重新赋值的 import bindings。`createApp(App)` 创建新的 application object；链式 `.mount` 没有改变 `App` binding，而是让 application object 创建并挂载 root instance。

**为什么得到这个结果：**

入口文件能显示所有组件，是因为 `App.vue` 形成了从 root 到 child 的 import/render tree。磁盘目录本身不产生 UI，module graph 和 template reference 才产生。

**对比写法：**

把 `main.ts` 放到 `src/` 根目录也可以，但本学习项目把入口放在章节目录，使本章所有真实练习路径集中且可回溯。关键不是目录名，而是 `index.html` 的 URL 与实际文件一致。

**常见错误为什么错：**

若 `index.html` 写成不存在的 `/src/main.ts`，Vite 返回 404，`createApp` 根本没有执行。若 `App.vue` import 了 `./counterbasic.vue` 而实际文件为 `CounterBasic.vue`，在大小写敏感环境中 module resolution 失败。识别方法是从 browser network/terminal 的 failed module path 对照真实路径。

**与真实项目的关系：**

生产项目可能有多个 entry 或更复杂 route-based modules，但任何页面仍需从某个入口进入 module graph。先掌握单入口链，才能理解后续 lazy import 和 code splitting。

**与当前学习主线的关系：**

这条链把 HTML、ES modules、SFC 和 component composition 放在同一个可验证路径中，是后续每章“文档路径必须对应真实代码”的基础。

**最终记忆模型：**

文件存在不等于会运行；`index.html` 引入 `main.ts`，`main.ts` 引入 root component，root component 再通过 import 与 template 引入 children。

<a id="section-9-3"></a>

### 9.3 createApp 与 mount：Vue 应用如何挂载到真实 DOM

**结论：**

`createApp(App)` 创建以 `App` 为 root component 的 application instance；`.mount("#app")` 选择第一个匹配的真实 DOM element，在其内部渲染 root component。container element 自身不是 application component tree 的一部分。

**本节解决的问题：**

为什么 `createApp(App)` 之后页面仍可能为空？因为 application instance 尚未 mount。为什么 mount selector 写错后 TypeScript 仍可能通过？因为 selector 是否匹配 element 是 browser runtime fact，不是 string type 能证明的事实。

**技术意义：**

application instance 是配置和 component tree 的边界。一个页面可以创建多个 app instance，但每个 app 要独立 mount；本章只创建一个，以避免不必要的共享/隔离问题。

**概念解释：**

`App` 是 component definition。`createApp` 接收它并返回 application object。`mount` 接收 element 或 selector string；本章传入 `"#app"`。找到 container 后，Vue 创建 root component instance，执行其 setup/render，并把结果放进 container 内部。

**边界：语法、运行时、Vue runtime、SFC compiler、TypeScript、Vite tooling：**

- TypeScript syntax 确保 `createApp` 参数可作为 component，`mount` 参数可为 string。
- JavaScript runtime 真实调用两个 functions/methods。
- Browser DOM API 提供 selector 可匹配的 element。
- Vue runtime 管理 application instance 和 root component instance。
- SFC compiler 早已把 `App.vue` 变成可 import definition。
- Vite 只负责 module 可加载，不替 mount 选择 element。

**底层机制：**

机制证据链：

1. `main.ts` module 执行最后一行。
2. JavaScript 读取 import binding `createApp` 和 component binding `App`。
3. `createApp(App)` 创建 application object，并把 `App` 记录为 root component。
4. 此阶段没有 reactive mutation，也没有向 DOM 写入 root UI。
5. `.mount("#app")` 使用 selector 找到 `index.html` 中的 element。
6. Vue 创建 root component instance，执行 `App.vue` 编译后的 setup/render。
7. root template 引用 child component bindings，形成后续 component instances。
8. TypeScript 能检查 API signature，但无法保证 selector 在某个运行时 HTML document 中存在。
9. selector 错误通常表现为 mount warning 和空页面；沿 `index.html` id 与 `main.ts` selector 比较即可识别。

**API / 语法规则：**

- `createApp(rootComponent)` 返回 application instance。
- `app.mount(rootContainer)` 接受 element 或 selector string。
- 同一个 app instance 只 mount 一次。
- app-level configuration 应在 mount 前完成；本章没有添加 plugin 或 global configuration。

**文件结构：**

`index.html` 拥有 container，`main.ts` 拥有 bootstrap call，`App.vue` 定义 root UI。三种 owner 不应互相替代。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: explicit application instance</span>
  </div>

```ts
import { createApp } from "vue";
import App from "./App.vue";

const application = createApp(App);
application.mount("#app");
```
</div>

**逐行解释：**

- 两个 imports 提供 API function 和 root component definition。
- `application` 保存新建 app object reference。
- `mount` 在该 object 上执行，只挂载这一个 application。
- 真实项目使用链式写法或显式变量写法，机制相同；显式变量更便于讲清 owner。

**执行过程：**

JavaScript 先求值 `createApp(App)`，得到 object；再读取 object 的 `mount` method 并以 `"#app"` 调用。Vue 在 mount 过程中进入 component setup/render，而不是在 import statement 阶段渲染。

**变量与引用变化：**

`application` 从无到有地指向 app object。`App` binding 未变化。container 的 identity 仍是同一个 `div#app`，但其 child nodes 被 root component output 填充。

**为什么得到这个结果：**

页面出现 root UI，是因为 mount 把 component system 与具体 container 连接起来。只有 component definition、没有 mount target 时，Vue 不知道应该把 UI 放进哪个 document element。

**对比写法：**

`application.mount(document.querySelector("#app")!)` 可以传 element，但需要自己处理 `null`。本章使用 selector string，把 lookup 交给 Vue，同时在指南中明确运行时仍可能找不到 element。

**常见错误为什么错：**

`mount("#root")` 与 HTML 的 `id="app"` 不一致，违反 mount target 必须存在的运行时规则。识别方法是同时搜索 `id="..."` 与 `mount("...")`，确认 selector 精确一致。

**与真实项目的关系：**

Router、Pinia 等 plugin 将来会通过同一 application instance 在 mount 前注册，但本章不添加它们。先掌握 app instance，后续才能理解 plugin 为什么属于 application boundary。

**与当前学习主线的关系：**

这一节把“Vue 代码”和“真实页面”之间的最后一步单独拆开，防止把 component definition、component instance 与 DOM element 混为同一对象。

**最终记忆模型：**

`createApp` 选择 root component 并创建 app；`mount` 选择 DOM container 并启动 component tree。

<a id="section-9-4"></a>

### 9.4 Single-File Component：template、script setup、style scoped 的边界

**结论：**

SFC 是需要编译的 framework-specific file format。`<script setup>` 表达每个 component instance 的 setup scope，`<template>` 被编译为 render logic，`<style scoped>` 通过 selector transform 限制样式作用范围；它不是 Shadow DOM。

**本节解决的问题：**

为什么 template 能直接读取 `count` 和 `increment`，明明没有 `return`？为什么 scoped style 不会大面积污染其他组件？为什么 `.vue` 不能直接作为 native browser module？这些都来自 SFC compile-time transforms。

**技术意义：**

SFC 把一个组件的 view、logic 和 style 共置，但三者仍有明确编译职责。理解 block boundary 后，才能判断错误来自 TypeScript、template expression、CSS selector 还是 runtime state。

**概念解释：**

`<script setup lang="ts">` 的内容会被编译为 component `setup()` 内容，并对每个 instance 执行。top-level bindings 对同一 SFC template 可见。template 不是 HTML string，而会被 compiler 转成 render function。scoped style selector 会被改写为带 scope attribute 的 selector，匹配 compiler 给本组件 element 添加的 attribute。

**边界：语法、运行时、Vue runtime、SFC compiler、TypeScript、Vite tooling：**

- SFC syntax 定义 `<script setup>`、`<template>`、`<style scoped>` blocks。
- TypeScript 只处理 script 中的 types 和 template tooling 可推断的 expressions。
- SFC compiler 把 blocks 组合为 component module 与 CSS。
- JavaScript runtime 为每个 instance 执行 setup code，创建 `count` ref 与 functions。
- Vue runtime 在 render 时读取 bindings，event 后执行 handler。
- Vite Vue plugin 把 `.vue` request 接入开发/build pipeline。

**底层机制：**

机制证据链：

1. Vite 解析 `import CounterBasic from "./CounterBasic.vue"`。
2. Vue plugin/SFC compiler 拆分 script、template、style blocks。
3. script transform 产生 component setup logic；`count` 是 ref object，`increment` 和 `reset` 是 function values。
4. template transform 把 `{{ count }}` 与 `@click="increment"` 关联到同一 setup scope。
5. root render 创建 `CounterBasic` instance；setup 每个 instance 执行一次。
6. render 读取 `count`，Vue 记录该 component update 依赖这个 reactive source；本章只保留此高层模型。
7. 点击调用 `increment`，写入 `count.value`，相关 component update 把 text 从 `Count: 0` 改为 `Count: 1`。
8. `vue-tsc` 检查 `count.value += 1` 的 number relation，但不会在运行时阻止用户点击。
9. scoped style transform 只改变 selector matching，不创建独立 DOM tree；浏览器 DevTools 中可看到 scope attribute。

**API / 语法规则：**

- 使用 `<script setup lang="ts">` 启用 Composition API setup syntax 与 TypeScript。
- imports、variables、functions 可在同一 SFC template 直接使用。
- script 中 ref 通过 `.value` 读写；template 中 top-level ref 自动解包。
- `<style scoped>` 限制当前 component style，仍应优先使用 class selector。

**文件结构：**

本节真实练习文件是 `src/learning/vue/chapter-01-application-boundary/CounterBasic.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-01-application-boundary/CounterBasic.vue</span>
  </div>

```vue
<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);

function increment(): void {
  count.value += 1;
}

function reset(): void {
  count.value = 0;
}
</script>

<template>
  <article class="practice-card">
    <p class="topic">Minimal ref</p>
    <h2>Counter Basic</h2>
    <p class="count" aria-live="polite">Count: {{ count }}</p>

    <div class="actions">
      <button type="button" @click="increment">Increment</button>
      <button type="button" class="secondary" @click="reset">Reset</button>
    </div>
  </article>
</template>

<style scoped>
.practice-card {
  padding: 1.25rem;
  border: 1px solid #dce6e1;
  border-radius: 0.9rem;
  background: #ffffff;
}

.count {
  font-size: 1.4rem;
  font-weight: 700;
}
</style>
```
</div>

**逐行解释：**

- `ref(0)` 创建 ref object，inner value 初始为 number `0`。
- `increment` 与 `reset` 是普通 JavaScript functions，只在 event 发生时调用。
- script 使用 `count.value`，因为这里操作的是 ref object property。
- template 的 `{{ count }}` 由 compiler/runtime 处理 top-level ref unwrapping。
- `@click` 把 function binding 注册为 event handler，不在 initial render 时调用它。
- style 中 `.practice-card` 和 `.count` 被 scoped transform 限定到当前 component output。

**执行过程：**

component instance 创建 → setup code 创建 ref/functions → render 读取 count → browser 显示 `Count: 0` → click event 调用 `increment` → `count.value` 变为 `1` → component update → text node patch。

**变量与引用变化：**

`count` 变量始终指向同一个 ref object；改变的是它的 `.value`，从 `0` 到 `1`，reset 后回到 `0`。`increment` function reference 不变。template 读取的是 ref 当前 inner value。

**为什么得到这个结果：**

template 能读到 bindings，不是因为浏览器自动看见 script variables，而是 `<script setup>` 和 template 被同一个 SFC compiler 协同处理。DOM 会更新，是因为 render 读取了 reactive source，随后 handler 写入该 source。

**对比写法：**

普通 `<script>` module scope 通常只在 module import 时执行，而 `<script setup>` 编译到 setup scope，每个 component instance 执行。若用普通 `setup()`，需要显式返回供 template 使用的 bindings；本章采用更直接的 `<script setup>`。

**常见错误为什么错：**

在 script 中写 `count += 1` 试图替换 `const` binding，既没有修改 ref inner value，也会产生 assignment error。识别方法是查看变量由 `ref()` 创建：script 中应访问 `.value`，template 才使用自动解包。

**与真实项目的关系：**

每个业务 component 都需要把 state owner、template consumer 和 local style 放在清晰边界内。SFC 提供文件边界，但是否职责清晰仍取决于组件拆分。

**与当前学习主线的关系：**

本节只使用最小 `ref` 让 UI 可交互，不展开 `reactive`、`computed`、watcher 或 scheduler；第 2 章再进入响应式系统。

**最终记忆模型：**

SFC 是 compiler input：script 提供值与函数，template 声明如何读取它们，style scoped 限制 selector，Vue runtime 执行编译后的 component。

<a id="section-9-5"></a>

### 9.5 Template syntax：插值、表达式、attribute binding

**结论：**

`{{ expression }}` 把表达式结果作为 text content；HTML attribute 不能写 mustache，应使用 `v-bind:attribute="expression"` 或等价 shorthand `:attribute="expression"`。这些 expression 由 template compiler 处理，并在 component render context 中读取值。

**本节解决的问题：**

为什么 `href="{{ docsUrl }}"` 不是正确 Vue binding？因为 mustache 用于 text interpolation，不用于 attribute。attribute 的值来源必须通过 `v-bind` 明确连接。

**技术意义：**

template binding 让 UI 输出和 JavaScript value 建立声明式关系。开发者声明“这个 text/attribute 来自哪个值”，Vue runtime 在 component update 时重新读取必要 expression 并同步 DOM。

**概念解释：**

`chapterTitle` 是 string binding，`{{ chapterTitle }}` 产生 text。`v-bind:for="linkId"` 是完整语法，`:id="linkId"`、`:href="docsUrl"` 和 `:aria-label="linkDescription"` 使用 shorthand。`:` 不是另一套机制，只是省略 `v-bind` 的写法。

**边界：语法、运行时、Vue runtime、SFC compiler、TypeScript、Vite tooling：**

- Template syntax 允许 interpolation 和 directive expression。
- SFC compiler 把这些 expression 编进 render logic，directive 标记不会原样保留为 DOM attribute。
- JavaScript runtime 计算 string expression。
- Vue runtime 把结果设置为 text、DOM property 或 attribute。
- TypeScript/`vue-tsc` 检查 template 可见 binding 和部分 expression relation。
- Vite 提供 SFC transform pipeline，不决定某个 `href` 的业务值。

**底层机制：**

机制证据链：

1. `TemplateBinding` instance setup scope 创建四个 string constants。
2. template render 读取 `chapterTitle`、`linkId`、`docsUrl`、`linkDescription`。
3. 这些值在本例不是 reactive source，因此本例只建立 initial render binding，不触发后续 mutation。
4. interpolation 产生 text；`v-bind` expressions 产生 label `for`、anchor `id`、`href` 和 `aria-label`。
5. SFC boundary 是同一文件的 script setup bindings 与 template。
6. TypeScript 可检查 bindings 是否存在和 string operations，却不会发出网络请求验证 `docsUrl` 一定可访问。
7. browser 最终看到普通 DOM properties/attributes，而不是 `v-bind` directive。
8. 把 mustache 放进 attribute 违反 template binding syntax，结果会成为错误/静态字符串而不是期望的 dynamic binding。
9. 在真实项目中看到 attribute 未更新时，先检查是否使用 `:` / `v-bind`，再检查 expression 的 source value。

**API / 语法规则：**

- Text：`{{ chapterTitle }}`
- Full attribute binding：`v-bind:for="linkId"`
- Shorthand：`:href="docsUrl"`
- expression 必须能求值得到一个值；不要在 binding 中放 assignment 或 side effect。
- `null` / `undefined` binding 通常会移除对应 attribute。

**文件结构：**

真实练习文件是 `src/learning/vue/chapter-01-application-boundary/TemplateBinding.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-01-application-boundary/TemplateBinding.vue</span>
  </div>

```vue
<script setup lang="ts">
const chapterTitle = "Vue Chapter 01";
const docsUrl = "https://vuejs.org/guide/essentials/template-syntax.html";
const linkId = "template-syntax-docs";
const linkDescription = "Open the official Vue template syntax guide";
</script>

<template>
  <article class="practice-card">
    <p class="topic">Interpolation and attributes</p>
    <h2>{{ chapterTitle }}</h2>
    <p>
      The heading uses text interpolation. The link below uses both the long and
      shorthand attribute-binding forms.
    </p>

    <label v-bind:for="linkId">Official reference</label>
    <a
      :id="linkId"
      :href="docsUrl"
      :aria-label="linkDescription"
      target="_blank"
      rel="noreferrer"
    >
      Read template syntax
    </a>
  </article>
</template>
```
</div>

**逐行解释：**

- 四个 `const` 表明值在 component instance 生命周期中不重新赋值。
- H2 的 mustache 读取 `chapterTitle` 并生成 text node。
- label 使用完整 `v-bind:for`，把 `for` 与 anchor `id` 使用同一 source。
- anchor 的 `:id`、`:href`、`:aria-label` 都是 `v-bind` shorthand。
- `target` 和 `rel` 没有 `:`，因此是 static attributes。

**执行过程：**

setup scope 创建 strings → render logic 读取 strings → browser 创建 H2/label/anchor → Vue 设置 text 与 attributes。因为本例没有 mutation，后续不会由本组件主动触发更新。

**变量与引用变化：**

四个 string bindings 保持不变。DOM element 是 runtime 创建的对象，其 `textContent`、`id`、`href`、`aria-label` 根据 render result 设置。

**为什么得到这个结果：**

页面显示 `Vue Chapter 01`，因为 interpolation 读取对应 string；link 指向官方页面，因为 `:href` 读取 `docsUrl`。不是 variable name 本身进入 DOM，而是 expression result。

**对比写法：**

`href="docsUrl"` 是静态字面值 URL `docsUrl`；`:href="docsUrl"` 才读取 JavaScript binding。`href="{{ docsUrl }}"` 混用了 text interpolation 与 attribute syntax。

**常见错误为什么错：**

写 `<a href="docsUrl">` 不会产生 compiler error，但会导航到字面路径 `docsUrl`，属于 observed navigation bug。识别方法是在 DevTools 检查最终 `href`，确认是否等于变量值。

**与真实项目的关系：**

表单 label、accessibility attribute、image source、button disabled state、route link 都依赖 attribute binding。错误使用静态 attribute 常导致 UI 看起来正常但交互指向错误目标。

**与当前学习主线的关系：**

这一节先建立“template expression 读取 JavaScript value”的基础；第 2 章再解释这些 value 变成 reactive source 后如何被追踪。

**最终记忆模型：**

mustache 绑定 text，`v-bind` / `:` 绑定 attribute/property；两者都读取 expression result，不读取字符串形式的 variable name。

<a id="section-9-6"></a>

### 9.6 Event handling：v-on、@、handler function 与事件对象

**结论：**

`v-on:event="handler"` 与 `@event="handler"` 等价。在 native element 上使用 method handler 时，Vue 在 event 发生后调用 function，并把 native DOM event 作为参数；function reference 和 function call expression 要区分。

**本节解决的问题：**

`@click="increment"` 为什么不会在 render 时执行？因为 template compiler 把它识别为 method handler，注册到 click event。`@click="increment()"` 也是合法 inline handler，会在 click 时求值；真正危险的是在 interpolation 或普通 binding 中调用会修改 state 的 function，因为那些 expressions 会在 render 时求值。

**技术意义：**

事件是从 browser DOM 进入 component state 的入口。把 event detail 与业务 mutation 分开，能让 function 的参数、side effect 和触发时机更可读。

**概念解释：**

`CounterBasic.vue` 的 `increment` 是 function value，`@click="increment"` 让 Vue 注册 listener。click 发生时，browser 创建 `MouseEvent`，Vue 调用 handler。若 handler 声明 parameter，可接收这个 native event。`.prevent` 等 modifier 则让 compiler 生成与 DOM event control 相关的 wrapper logic。

**边界：语法、运行时、Vue runtime、SFC compiler、TypeScript、Vite tooling：**

- Template syntax：`v-on:click` / `@click` 与 modifier。
- SFC compiler：识别 method handler 或 inline handler expression，生成 listener logic。
- Browser runtime：dispatch native event，并实现 `preventDefault()`。
- JavaScript runtime：调用 function，读取 `event.currentTarget`，修改 state。
- Vue runtime：把 listener 连接到 rendered element，并在 state mutation 后更新 component。
- TypeScript：可把参数标为 `MouseEvent` / `SubmitEvent`，不会保证事件一定来自业务期望 element。
- Vite tooling：转换 SFC，不决定 click 何时发生。

**底层机制：**

机制证据链：

1. render 读取 `increment` function binding，但不调用 method handler。
2. Vue 把 function 与 button click listener 连接。
3. 用户点击，browser 创建 `MouseEvent` 并 dispatch。
4. Vue 调用 `increment`; 若 function 接收参数，native event 是第一个参数。
5. `increment` 读取 `count` ref object 并写 `count.value += 1`。
6. component render 先前读取过 `count`，因此相关 update 重新读取它并 patch text。
7. `vue-tsc` 检查 function return 和 event type，不验证用户是否真的会点击。
8. 若把 side-effect function 写进 `{{ increment() }}`，render 本身会调用它，违反 render expression 应避免 mutation side effect 的规则。
9. 真实项目中出现“页面一渲染就修改 state”时，搜索 template interpolation / binding 中的 function call，而不只检查 `@event`。

**API / 语法规则：**

- 完整写法：`v-on:click="increment"`
- Shorthand：`@click="increment"`
- Method handler：`@click="handleClick"`
- Inline handler：`@click="handleClick('source', $event)"`
- Native method handler 的默认参数是 native DOM event。
- `.prevent` 等价于在适当时机调用 `event.preventDefault()`，并让 handler 专注数据逻辑。

**文件结构：**

主要练习文件是 `CounterBasic.vue`；`FormBinding.vue` 进一步展示 `@submit.prevent`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: native event handler</span>
  </div>

```vue
<script setup lang="ts">
function reportSource(event: MouseEvent): void {
  const button = event.currentTarget as HTMLButtonElement;
  console.log(button.dataset.source);
}
</script>

<template>
  <button type="button" data-source="chapter-01" @click="reportSource">
    Report source
  </button>
</template>
```
</div>

**逐行解释：**

- `reportSource` 声明 `MouseEvent` parameter，明确这是 native click event。
- `currentTarget` 是 listener 注册的 button，但 DOM typing 仍需根据实际 element narrow/assert。
- `dataset.source` 读取 `data-source` 的 runtime value。
- template 把 function binding 放到 `@click`，没有括号也能在 click 时接收 event。

**执行过程：**

initial render 注册 listener → 用户 click → browser dispatch event → Vue 调用 `reportSource(event)` → function 读取 button dataset → console 输出 `chapter-01`。

**变量与引用变化：**

`reportSource` function reference 不变；每次 click 创建新的 event object reference；`button` 局部变量指向本次 event 的 current target。本 snippet 不修改 reactive state。

**为什么得到这个结果：**

console 能读到 source，是因为 handler 在 event 发生后收到 event object，并从真实 button DOM object 读取 dataset；不是 template compiler 在 build 时计算了 dataset。

**对比写法：**

`@click="reportSource"` 是 method handler；`@click="reportSource($event)"` 是 inline handler，两者都在 click 时执行。`{{ reportSource(...) }}` 则在 render expression 求值时执行，不适合带 side effect。

**常见错误为什么错：**

把 `@click="increment"` 改成 `{{ increment() }}`，违反 render expression 不应修改 state 的规则，可能造成反复更新或意外初始 mutation。识别信号是未点击时 state 已改变，stack/diagnostic 指向 render。

**与真实项目的关系：**

表单提交、button action、keyboard interaction 和 input event 都从 native events 进入业务逻辑。清晰 handler 能隔离 DOM detail 与 state mutation。

**与当前学习主线的关系：**

本节连接 browser platform event 与 Vue template listener；后续组件章节再学习 custom component emits。

**最终记忆模型：**

`@` 是 `v-on` shorthand；render 注册 handler，browser event 触发 handler，handler 再决定是否修改 component state。

<a id="section-9-7"></a>

### 9.7 Conditional rendering：v-if、v-else、v-show 的基础边界

**结论：**

`v-if` chain 决定 branch 是否存在：false branch 不创建或被销毁；`v-show` 始终保留 element，只切换 inline `display`。低频条件结构优先考虑 `v-if`，高频可见性切换可考虑 `v-show`。

**本节解决的问题：**

隐藏 details 后，它的 DOM 是否仍存在？`v-show` 下存在，只是不可见。切换 status 时，未命中的 `v-if` / `v-else-if` branch 不属于当前 DOM。

**技术意义：**

条件指令影响的不只是视觉：`v-if` 改变 element/component lifecycle 和 listener existence，`v-show` 改变 CSS display。选择错误会导致状态保留、initial cost 或 toggle cost 不符合预期。

**概念解释：**

`status` 是 union-typed ref。template 依次判断 `"ready"`、`"learning"`，否则进入 complete branch。`showDetails` 控制 `v-show`。三个 status button 调用同一个 `setStatus`，details button 使用 inline assignment。

**边界：语法、运行时、Vue runtime、SFC compiler、TypeScript、Vite tooling：**

- Template syntax 构成相邻 `v-if` / `v-else-if` / `v-else` chain。
- Compiler 把 conditions 编进 conditional render logic。
- JavaScript runtime 比较 strings，调用 `setStatus`。
- Vue runtime 创建/销毁 if branch，或修改 show element 的 style。
- TypeScript 限制 `LearningStatus` 只接受三种 string。
- Vite 负责转换文件，不选择运行时 branch。

**底层机制：**

机制证据链：

1. component setup 创建 `status` ref，inner value 为 `"ready"`；创建 `showDetails` ref，inner value 为 `true`。
2. render 读取两个 refs，对 status expressions 求值。
3. 初始 render 创建 ready paragraph 和 details paragraph。
4. 用户点击 `Learning`，inline event 调用 `setStatus("learning")`。
5. function 写 `status.value`，相关 component update 重新判断 chain。
6. Vue 移除 ready branch 并创建 learning branch；details branch不受影响。
7. 点击 `Toggle details` 写 `showDetails`，Vue 保留 paragraph，仅更新 display style。
8. `vue-tsc` 会拒绝 `setStatus("unknown")`，但不会判断业务上何时应该完成学习。
9. 真实项目中需要保留 input/component local DOM state 时，应检查是否误用了会销毁 branch 的 `v-if`。

**API / 语法规则：**

- `v-else` 和 `v-else-if` 必须紧邻前一个 `v-if` / `v-else-if` sibling。
- `v-if` 可用于 `<template>` group；`v-show` 需要真实 element，不能配合 `v-else`。
- condition 按 JavaScript truthiness 解释。

**文件结构：**

真实练习文件是 `src/learning/vue/chapter-01-application-boundary/ConditionalRendering.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-01-application-boundary/ConditionalRendering.vue</span>
  </div>

```vue
<script setup lang="ts">
import { ref } from "vue";

type LearningStatus = "ready" | "learning" | "complete";

const status = ref<LearningStatus>("ready");
const showDetails = ref(true);

function setStatus(nextStatus: LearningStatus): void {
  status.value = nextStatus;
}
</script>

<template>
  <article class="practice-card">
    <p v-if="status === 'ready'">Ready to begin.</p>
    <p v-else-if="status === 'learning'">Learning in progress.</p>
    <p v-else>Chapter complete.</p>

    <button type="button" @click="setStatus('ready')">Ready</button>
    <button type="button" @click="setStatus('learning')">Learning</button>
    <button type="button" @click="setStatus('complete')">Complete</button>

    <button type="button" @click="showDetails = !showDetails">
      Toggle details
    </button>
    <p v-show="showDetails">
      This paragraph remains mounted while its display value changes.
    </p>
  </article>
</template>
```
</div>

**逐行解释：**

- union type 定义合法 status vocabulary。
- 两个 refs 分别拥有 branch state 与 visibility state。
- if chain 每次只产生一个 status paragraph。
- buttons 只传 union 中的合法 value。
- `v-show` paragraph 总会 render，condition 只控制 display。

**执行过程：**

initial setup → render ready/details → click status → mutate status → reevaluate if chain → replace branch → click details → mutate boolean → update display style。

**变量与引用变化：**

`status` 和 `showDetails` variables 始终指向原 ref objects；各自 `.value` 改变。branch DOM element identity 在 `v-if` 切换时更换，details DOM element identity 在 `v-show` 切换时保留。

**为什么得到这个结果：**

status paragraph 被替换，因为 compiler/runtime 将 if chain 表达为 mutually exclusive branches；details 只隐藏，因为 `v-show` 的 runtime behavior 是更新 `display`。

**对比写法：**

若 details 内有需要保留的 input state，`v-show` 能保留 DOM；若内容很大且极少显示，`v-if` 避免初始创建。选择依据是 lifecycle 与切换频率，不只是语法偏好。

**常见错误为什么错：**

在 `v-if` 与 `v-else` 之间插入另一个 element 会破坏相邻 sibling 规则，compiler 无法把它们组成同一 chain。识别方法是检查 `v-else` 前一个实际 sibling。

**与真实项目的关系：**

permission placeholder、loading/error/content branch 常用 `v-if`；频繁展开的 toolbar/help panel 可用 `v-show`。需要结合 mount cost 和 state retention 判断。

**与当前学习主线的关系：**

本节只解释 directive 对 branch/DOM 的基础影响；component lifecycle hooks 在后续章节再展开。

**最终记忆模型：**

`v-if` 决定“有没有这个 branch”，`v-show` 决定“已有 element 是否显示”。

<a id="section-9-8"></a>

### 9.8 List rendering：v-for、key、数组渲染的身份模型

**结论：**

`v-for` 把 iterable source 映射为重复 render blocks；`:key="task.id"` 为 sibling 提供稳定 primitive identity，使 Vue 在 insert、delete、reorder 时正确复用或移动对应 DOM/component。

**本节解决的问题：**

为什么不能为了消除 warning 随便写 `:key="index"`？index 表示当前位置，不表示 task identity。列表顺序变化后，同一 index 可能对应另一项，stateful DOM/component 就可能被错误复用。

**技术意义：**

稳定 key 是 data identity 与 UI identity 的桥梁。它影响 DOM reuse、component local state、input value 和 transition，不只是 performance hint。

**概念解释：**

`learningTasks` 是 `ref<LearningTask[]>`。每个 object 的 `id` 是稳定 string，`title` 和 `focus` 是 render data。template 的 `task` 是当前 iteration alias，只在 `v-for` block scope 内可用。

**边界：语法、运行时、Vue runtime、SFC compiler、TypeScript、Vite tooling：**

- Template syntax：`task in learningTasks` 和 `:key="task.id"`。
- Compiler：创建 list render logic 和 iteration scope。
- JavaScript runtime：读取 array/object properties。
- Vue runtime：比较 keyed children，决定 patch/move/create/remove。
- TypeScript：检查 array item shape 和 `task.id` property。
- Vite：转换 SFC，不为业务对象生成 id。

**底层机制：**

机制证据链：

1. setup 创建 ref object，其 inner value 是三个 `LearningTask` objects 的 array。
2. render 读取 `learningTasks`，template 自动解包 top-level ref。
3. `v-for` 逐项创建 alias `task`，读取 `task.id`、`task.title`、`task.focus`。
4. 每个 `task.id` 作为 sibling key，与对应 render block identity 关联。
5. 本组件初始没有 mutation；`TaskBoardBasic` 后面会用 `push` 和 filter 产生列表变化。
6. 当 source order/length 改变时，Vue 根据 key 对比 children，而不是把业务 identity 等同于 array position。
7. TypeScript 可确保 `id` 存在且是 string，却无法证明运行时数据中的 id 全局/兄弟范围内一定唯一。
8. 缺 key 或使用不稳定 key 违反 sibling identity 规则，可能出现 wrong DOM/component state reuse。
9. 真实项目中若排序后输入值、focus 或 row-local state 跟错项，应首先审查 key 的来源和稳定性。

**API / 语法规则：**

- 基本形式：`v-for="task in learningTasks"`
- 需要 index 时：`v-for="(task, index) in learningTasks"`，但 index 不自动成为合适 key。
- key 应使用 string/number primitive，且在当前 sibling group 内唯一、稳定。
- 不推荐在同一个 element 同时使用 `v-if` 与 `v-for`。

**文件结构：**

真实练习文件是 `src/learning/vue/chapter-01-application-boundary/ListRendering.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-01-application-boundary/ListRendering.vue</span>
  </div>

```vue
<script setup lang="ts">
import { ref } from "vue";

type LearningTask = {
  id: string;
  title: string;
  focus: string;
};

const learningTasks = ref<LearningTask[]>([
  {
    id: "application-entry",
    title: "Trace the application entry",
    focus: "index.html to main.ts",
  },
  {
    id: "root-component",
    title: "Identify the root component",
    focus: "createApp and App.vue",
  },
  {
    id: "template-directives",
    title: "Practice template directives",
    focus: "bindings, events, and lists",
  },
]);
</script>

<template>
  <ul>
    <li v-for="task in learningTasks" :key="task.id">
      <strong>{{ task.title }}</strong>
      <span>{{ task.focus }}</span>
    </li>
  </ul>
</template>
```
</div>

**逐行解释：**

- `LearningTask` 描述每项必须提供的 shape，不创建 runtime class。
- ref inner array 保存三个独立 object references。
- `v-for` 每次 iteration 提供一个 `task` alias。
- `:key` 读取 domain id，不读取 index。
- strong/span 分别读取同一 object 的 title/focus。

**执行过程：**

setup 创建 array → render 自动解包 ref → list renderer 遍历 array → 为每项读取 key → 创建三个 keyed `li` → 浏览器显示三项。

**变量与引用变化：**

本例没有 mutation，`learningTasks.value` array 与三个 object references 保持不变。若将来 reorder，array positions 改变，但每个 object 的 `id` 保持不变，Vue 可据此保留 identity。

**为什么得到这个结果：**

DOM 顺序与 array iteration 顺序一致；每项 text 来自当前 alias；key 不显示为普通 text，而作为 patch identity 使用。

**对比写法：**

`:key="index"` 在静态、永不 reorder 的无状态列表可能看似可用，但 TaskBoard 会新增和过滤，position 会改变，因此 domain id 才是正确 identity。

**常见错误为什么错：**

省略 key 或用重复 id，会让 Vue 无法稳定区分 siblings，可能 warning 或错误复用。识别方法是检查每个 rendered item 的 key 是否来自不可变业务标识，而非当前 position 或随机值。

**与真实项目的关系：**

table rows、search results、navigation items 和 form field arrays 都依赖稳定 key。数据 API 设计若没有 id，前端需要建立明确且稳定的 identity strategy。

**与当前学习主线的关系：**

本节建立 identity 基础；后续 component list、transition 和 state architecture 都会复用同一判断。

**最终记忆模型：**

`v-for` 决定“渲染哪些项”，key 决定“下一次更新时哪一项还是同一项”。

<a id="section-9-9"></a>

### 9.9 Form binding：v-model 在 input 上的读写关系

**结论：**

native form control 上的 `v-model` 是 element-specific property/event 配对：text input 使用 `value` + `input`，checkbox/radio 使用 `checked` + `change`，select 使用 `value` + `change`。JavaScript state 是 source of truth。

**本节解决的问题：**

为什么 text input、checkbox 和 select 都能写 `v-model`，但最终 value 类型不同？因为 directive 根据 element/type 选择不同 DOM property 和 event，并把 event 后的新值写回绑定 state。

**技术意义：**

`v-model` 减少重复 wiring，但不会消除 browser form behavior。要理解它，必须能把它展开成“从 state 写入 control”和“从 control event 写回 state”两条方向。

**概念解释：**

`learnerName` 是 string ref，绑定 text input；`.trim` 在写回时去掉首尾空白。`acceptedPracticePlan` 是 boolean ref，绑定 checkbox `checked`。`selectedTrack` 是 union-typed string ref，绑定 select。form 的 `@submit.prevent` 先阻止 browser 默认 navigation/reload，再调用 `submitPlan` 读取三个 refs 并写 `submittedSummary`。

**边界：语法、运行时、Vue runtime、SFC compiler、TypeScript、Vite tooling：**

- Template syntax：`v-model`、`.trim`、`@submit.prevent`。
- Compiler：根据 control 生成 property/event synchronization 与 modifier logic。
- Browser runtime：维护 input value/checked、dispatch input/change/submit，提供 default form navigation。
- JavaScript runtime：构造 summary string。
- Vue runtime：把 state 写入 DOM，并把 event value 写回 refs。
- TypeScript：检查 `LearningTrack` union 和 string/boolean operations，不验证用户输入的业务真实性。
- Vite：转换 SFC，不处理实际 form submission。

**底层机制：**

机制证据链：

1. setup 创建四个 ref objects：name string、accepted boolean、track union string、summary string。
2. initial render 读取这些 refs，把值设置给对应 control property。
3. 用户输入 name，browser dispatch `input`；`v-model.trim` 取得 input value、trim 后写 `learnerName.value`。
4. checkbox/select 通过各自 checked/value 与 change event 写回对应 refs。
5. 用户 submit，browser dispatch submit event；`.prevent` 调用 `preventDefault()`，避免 document navigation/reload。
6. `submitPlan` 读取三个 current values，创建 `displayName`、`planStatus` 和 summary string。
7. 写入 `submittedSummary.value` 后，`v-if` branch 出现并渲染 text。
8. `vue-tsc` 可拒绝不属于 union 的 hard-coded track，却无法保证运行时输入 name 是真实姓名。
9. 真实项目中 form 刷新页面时，检查 submit listener 是否在 `<form>` 上且是否使用 `.prevent` 或手动 preventDefault。

**API / 语法规则：**

- Text：`<input v-model="text">`
- Checkbox：`<input v-model="checked" type="checkbox">`
- Select：`<select v-model="selected">`
- Trim modifier：`v-model.trim`
- Submit modifier：`@submit.prevent="submitPlan"`
- 初始值来自 JavaScript state，不依赖 static `value` / `checked` / `selected` attributes。

**文件结构：**

真实练习文件是 `src/learning/vue/chapter-01-application-boundary/FormBinding.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-01-application-boundary/FormBinding.vue</span>
  </div>

```vue
<script setup lang="ts">
import { ref } from "vue";

type LearningTrack = "template" | "components" | "tooling";

const learnerName = ref("");
const acceptedPracticePlan = ref(false);
const selectedTrack = ref<LearningTrack>("template");
const submittedSummary = ref("");

function submitPlan(): void {
  const displayName = learnerName.value.trim() || "Anonymous learner";
  const planStatus = acceptedPracticePlan.value ? "accepted" : "not accepted";

  submittedSummary.value =
    `${displayName} selected ${selectedTrack.value}; practice plan ${planStatus}.`;
}
</script>

<template>
  <form @submit.prevent="submitPlan">
    <label>
      Name
      <input v-model.trim="learnerName" type="text" placeholder="Ada" />
    </label>

    <label>
      Track
      <select v-model="selectedTrack">
        <option value="template">Template syntax</option>
        <option value="components">Component boundaries</option>
        <option value="tooling">Vite and type checking</option>
      </select>
    </label>

    <label>
      <input v-model="acceptedPracticePlan" type="checkbox" />
      Follow the practice plan
    </label>

    <button type="submit">Save plan</button>
  </form>

  <p v-if="submittedSummary" aria-live="polite">
    {{ submittedSummary }}
  </p>
</template>
```
</div>

**逐行解释：**

- union type 限制 track vocabulary。
- refs 的初始值决定 controls 初始状态。
- submit function 用 `.value` 读取 current state。
- text input 使用 `.trim` modifier。
- select option values 与 union members 对齐。
- checkbox 把 boolean 写回 state。
- submit modifier 阻止默认行为后再调用 handler。
- summary ref 从空 string 变为非空，触发 `v-if` paragraph 出现。

**执行过程：**

render 写 controls → 用户 edit/check/select → control events 写 refs → submit event → prevent default → handler 读取 refs → 写 summary → component update → summary branch 创建。

**变量与引用变化：**

四个 ref object identities 保持不变。inner values 分别随输入变化，例如 `learnerName.value` 从 `""` 到 `"Ada"`，`acceptedPracticePlan.value` 从 `false` 到 `true`。

**为什么得到这个结果：**

页面不 reload，是 `.prevent` 处理了 browser default submit；summary 出现，是 handler 写入非空 reactive string 后 `v-if` condition 变为 truthy。

**对比写法：**

手动写 `:value="learnerName"` 与 `@input` 可以实现相同方向，但需要自己从 event target 读取并写回；`v-model` 是这个常见模式的 directive abstraction，不是两个 component 同时拥有 state。

**常见错误为什么错：**

去掉 `.prevent` 后，handler 可能先运行，但 browser 随后执行 form 默认 navigation/reload，local state 消失。识别方法是 submit 后 address/document reload，而 button click 本身无异常。

**与真实项目的关系：**

登录、搜索、筛选、设置页面都需要 form state。TypeScript 只能描述 state shape；服务端 payload、用户输入与安全规则仍需 runtime validation，后续章节再处理。

**与当前学习主线的关系：**

本节先理解 native controls。custom component `v-model` contract 在组件通信章节再讲。

**最终记忆模型：**

`v-model` 让 state → control property 和 control event → state 成对连接；`@submit.prevent` 单独控制 form 默认行为。

<a id="section-9-10"></a>

### 9.10 Class and style binding：动态 class / style 的数据来源

**结论：**

`:class` 和 `:style` 都是增强后的 `v-bind`。class object 的 key 表示 class name、value 的 truthiness 决定是否存在；style object 的 key/value 产生 inline style property/value。

**本节解决的问题：**

为什么不需要拼接 `"preview " + (isHighlighted ? "highlighted" : "")`？因为 Vue 对 class/style binding 支持 object/array，使 presentation rule 与 source values 更清晰。

**技术意义：**

动态 presentation 应由明确 state 驱动，而不是直接查找 DOM 并修改 `classList` / `style`。这样 render result 可由 component state 推导，也便于 TypeScript 和 template tooling 检查 binding。

**概念解释：**

`isHighlighted` boolean 决定 `highlighted` class；`accentColor` string 决定 color；`fontSize` number 通过 template literal 变成带 `px` 的 CSS value。static class `preview` 与 dynamic class 可同时存在。

**边界：语法、运行时、Vue runtime、SFC compiler、TypeScript、Vite tooling：**

- Template syntax：`:class="{ highlighted: isHighlighted }"` 与 `:style="{ ... }"`。
- Compiler：把 object expressions 编进 render logic。
- JavaScript runtime：创建 object/result strings。
- Vue runtime：normalize class/style 并 patch DOM class/inline style。
- Browser CSS engine：根据最终 class/style 计算 presentation。
- TypeScript：检查 variables 和 template expression 基本关系，不保证 color string 一定符合所有业务格式。
- Vite：处理 SFC/CSS assets，不拥有运行时 presentation state。

**底层机制：**

机制证据链：

1. setup 创建 boolean/string/number refs。
2. render 读取三个 reactive sources。
3. class expression 创建 `{ highlighted: boolean }`，style expression 创建 color/fontSize object。
4. Vue runtime 将 static `preview` 与 truthy dynamic class 合并，并设置 inline styles。
5. 用户改变 checkbox/color/range，`v-model` 写回对应 ref。
6. component update 重新创建/读取 binding object，patch class list 或 style properties。
7. CSS engine 应用 `.highlighted` scoped rule与 inline color/font-size。
8. `vue-tsc` 可检查 `fontSize` number operations，但不会替 browser 计算最终 layout。
9. 真实项目中 class 不切换时，检查 object value truthiness；style 无效时，检查最终 property/value 与 DevTools computed style。

**API / 语法规则：**

- Object class：`:class="{ active: isActive }"`
- Array class：`:class="[baseClass, { active: isActive }]"`
- Object style：`:style="{ color: accentColor, fontSize: `${fontSize}px` }"`
- CSS property 可用 camelCase；static `class` 可与 `:class` 共存。

**文件结构：**

真实练习文件是 `src/learning/vue/chapter-01-application-boundary/ClassStyleBinding.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-01-application-boundary/ClassStyleBinding.vue</span>
  </div>

```vue
<script setup lang="ts">
import { ref } from "vue";

const isHighlighted = ref(false);
const accentColor = ref("#42b883");
const fontSize = ref(18);
</script>

<template>
  <p
    class="preview"
    :class="{ highlighted: isHighlighted }"
    :style="{ color: accentColor, fontSize: `${fontSize}px` }"
  >
    Bind presentation to JavaScript values.
  </p>

  <label>
    <input v-model="isHighlighted" type="checkbox" />
    Highlight preview
  </label>

  <label>
    Accent color
    <input v-model="accentColor" type="color" />
  </label>

  <label>
    Font size
    <input v-model.number="fontSize" type="range" min="14" max="32" />
  </label>
</template>

<style scoped>
.preview {
  padding: 0.8rem;
  border: 1px dashed #b4c8bd;
  border-radius: 0.5rem;
}

.highlighted {
  background: #eaf8f0;
  font-weight: 800;
}
</style>
```
</div>

**逐行解释：**

- three refs 分别代表 semantic state 与 presentation values。
- static `preview` 永远存在。
- class object 只在 boolean truthy 时加入 `highlighted`。
- style object 读取 color string，并给 number 加 `px` unit。
- controls 通过 `v-model` 修改 source values。
- scoped CSS 只定义可复用 class rules；dynamic inline values 来自 state。

**执行过程：**

initial render → static class + no highlighted → default inline color/size → user changes control → v-model writes ref → component update → class/style patch → browser recalculates presentation。

**变量与引用变化：**

ref identities 保持；inner values 如 `false → true`、`"#42b883" → "#ff0000"`、`18 → 24`。每次 render 的 class/style object 可是新 object，但其中 values 来自 refs。

**为什么得到这个结果：**

highlight background 出现是 class condition 变为 truthy；text color/size 改变是 inline style values 变化。它们由不同 binding channel 进入 DOM。

**对比写法：**

直接 `document.querySelector(...).classList.add(...)` 把 DOM mutation 脱离 component state；`:class` 让 state 仍是 owner，DOM 是 derived output。

**常见错误为什么错：**

写 `:style="{ fontSize }"` 会把 number 作为 unitless value；多数需要长度单位的 CSS property 不会得到预期表现。本例显式生成 `${fontSize}px`。识别方法是在 DevTools 检查最终 inline style。

**与真实项目的关系：**

validation state、selected row、theme accent、progress width 等都需要动态 class/style。复杂 design system 后续可以抽 component/token，但 source-of-truth 原则不变。

**与当前学习主线的关系：**

本节建立 state-to-presentation 映射；第 2 章再讨论如何更高效地派生复杂 style object。

**最终记忆模型：**

class/style binding 读取 JavaScript values，Vue patch DOM presentation；state 是 owner，DOM class/style 是结果。

<a id="section-9-11"></a>

### 9.11 Chapter integration：TaskBoardBasic 如何把本章机制串起来

**结论：**

`TaskBoardBasic.vue` 用一个 local component 边界串起 form、event、list、key、condition、class/style 和 minimal refs。它故意用 `filteredTasks()` 而不用 `computed`，因为 derived-state optimization 属于第 2 章。

**本节解决的问题：**

单个 directive 会写之后，怎样形成完整 feature flow？必须从 user action 追踪到 handler、ref/array mutation、function filtering、template branch 和 DOM patch，而不是只确认“页面能用”。

**技术意义：**

整合练习暴露真实边界：谁拥有 task state、add/toggle/filter 各自改变什么、key 如何维护 identity、空状态何时出现、class 如何表达 completed state。

**概念解释：**

`tasks` 拥有 task objects；`newTaskTitle` 拥有 input value；`selectedFilter` 拥有 filter selection；`nextTaskId` 产生稳定 numeric id。`filteredTasks()` 每次 render 调用，根据当前 filter 返回原 array 或新 filtered array。它是普通 JavaScript function，不缓存。

**边界：语法、运行时、Vue runtime、SFC compiler、TypeScript、Vite tooling：**

- Template syntax：`v-model`、`@submit.prevent`、`v-for`、`:key`、`v-if`、`:class`、`@change`。
- JavaScript runtime：`trim`、`push`、`find`、`filter` 和 function branching。
- Vue runtime：读取 refs/array properties，响应 mutation，更新 list/branch/class。
- SFC compiler：让 setup bindings 对 template 可见，编译 directives。
- TypeScript：检查 task/filter types，避免 `any`，不验证用户输入语义。
- Vite：编译和提供 SFC module，不保存 task state。

**底层机制：**

机制证据链：

1. component setup 创建四个 refs 和静态 `filterOptions` array。
2. initial render 读取 `tasks.length`、`newTaskTitle`、`selectedFilter` 和 `filteredTasks()` 中的 tasks/filter。
3. add form 输入通过 `v-model` 写 `newTaskTitle.value`。
4. submit modifier 阻止 reload，`addTask` trim string，向 `tasks.value` push 新 object，并递增 `nextTaskId.value`。
5. list render 读取新 array length/items，每个 item 使用 numeric id 作为 key。
6. checkbox change 调用 `toggleTask(id)`，`find` 返回 existing task object，修改其 `completed` property。
7. filter button 写 `selectedFilter`；`filteredTasks()` 在 update 中返回匹配 objects，`v-if` 根据 result length 选择 list 或 empty state。
8. TypeScript 保证 filter value union 和 task property shape，但不会验证 title 是否符合真实业务规则。
9. 若 row identity 或 completed class 跟错 task，检查 id generation、key、toggle lookup 是否都使用同一 id。

**API / 语法规则：**

- local state 使用 `ref`。
- add 使用 `@submit.prevent`，避免 page reload。
- list 使用 `:key="task.id"`。
- completed class 使用 `:class="{ completed: task.completed }"`。
- filter 使用普通 function；第 2 章再改写/比较 `computed`。

**文件结构：**

真实整合文件是 `src/learning/vue/chapter-01-application-boundary/TaskBoardBasic.vue`，由 `App.vue` 作为 child component render。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: TaskBoardBasic data flow</span>
  </div>

```vue
<script setup lang="ts">
function addTask(): void {
  const title = newTaskTitle.value.trim();

  if (!title) {
    return;
  }

  tasks.value.push({
    id: nextTaskId.value,
    title,
    completed: false,
  });
  nextTaskId.value += 1;
  newTaskTitle.value = "";
}

function filteredTasks(): TaskItem[] {
  if (selectedFilter.value === "active") {
    return tasks.value.filter((task) => !task.completed);
  }

  if (selectedFilter.value === "completed") {
    return tasks.value.filter((task) => task.completed);
  }

  return tasks.value;
}
</script>

<template>
  <form @submit.prevent="addTask">
    <input v-model="newTaskTitle" type="text" />
    <button type="submit">Add task</button>
  </form>

  <ul v-if="filteredTasks().length > 0">
    <li
      v-for="task in filteredTasks()"
      :key="task.id"
      :class="{ completed: task.completed }"
    >
      {{ task.title }}
    </li>
  </ul>
</template>
```
</div>

**逐行解释：**

- `trim` 产生 normalized local string，不直接改变 input ref。
- empty title 提前 return，避免创建无意义 task。
- `push` 保留 array object 并追加新 task object。
- id 使用 `nextTaskId` 当前 number，再单独递增。
- filter function 读取 current filter；active/completed 返回新 array，all 返回 original array。
- template submit、input、condition、loop、key、class 各读取或触发明确数据。

**执行过程：**

input event → title ref → submit → addTask → array push/id increment/input reset → component update → filteredTasks → keyed list patch。toggle/filter flow 同样从 event 进入 handler/assignment，再进入 update。

**变量与引用变化：**

`tasks` ref identity 不变，inner array identity 也不因 `push` 改变；array 新增一个 task object。`nextTaskId.value` 增加；`newTaskTitle.value` 清空。filter 返回的 array 在 active/completed 模式下是新 array，但其中 task object references 来自原 array。

**为什么得到这个结果：**

新增 task 立即出现，是因为 list render 读取 tasks，`push` 改变 reactive array。filter 改变可见 items，是因为 render 调用 function 时读取 selected filter。completed style 出现，是因为 class binding 读取 task object 的 boolean。

**对比写法：**

把 filtered list 复制进另一个 ref 会产生重复 source-of-truth 和同步问题。本章用 function 保持单一 `tasks` owner；第 2 章学习 `computed` 后再讨论缓存 derived value。

**常见错误为什么错：**

用 `Date.now()` 每次 render 生成 key 或用 filtered array index 作为 key，会让 identity 随 render/position 变化。正确做法是在创建 task 时分配稳定 id，并在 add/toggle/key 三处使用同一 id。

**与真实项目的关系：**

Task Board 是 CRUD list 的最小原型：form input、validation guard、local collection、row identity、status mutation、filter 与 empty state。后续可以逐步引入 component split、persistence、API 和 testing，但本章不提前扩张。

**与当前学习主线的关系：**

这是第 1 章整合终点。第 2 章将用同一项目讨论 `reactive`、`computed`、`watch`、`watchEffect`、`track`、`trigger` 和 `nextTick`。

**最终记忆模型：**

TaskBoard 的 UI 是 local refs/array 的声明式结果；events 改 state，render function 重新读取 filtered result，key 保持 item identity，Vue patch DOM。

## 10. API / 语法索引

| API / Syntax | Layer | Input | Output / Effect | TypeScript Boundary | 本章文件 |
| --- | --- | --- | --- | --- | --- |
| `createApp(App)` | Vue application API | root component definition | application instance | 检查 component argument，不创建 runtime DOM | `main.ts` |
| `.mount("#app")` | Vue runtime / DOM boundary | selector string | mounted root component instance | selector 是 string，不能静态证明 element 存在 | `main.ts`、`index.html` |
| SFC | SFC compiler | template/script/style blocks | component ES module + CSS | `vue-tsc` 检查 script/template relation | 所有 `.vue` |
| `<script setup lang="ts">` | SFC compiler + TypeScript | setup declarations | per-instance setup scope | types 被静态检查并擦除 | 所有 `.vue` |
| `<template>` | SFC compiler | declarative markup + expressions | render logic | tooling 检查可见 bindings | 所有 `.vue` |
| `<style scoped>` | SFC CSS transform | CSS selectors | scope-attribute selectors | 不参与 TypeScript | 所有带 CSS 的 `.vue` |
| `{{ value }}` | Template syntax | expression | text content | 检查 expression/binding | `TemplateBinding.vue` 等 |
| `v-bind:href` / `:href` | Template directive | expression | DOM property/attribute sync | 检查 binding expression | `TemplateBinding.vue` |
| `v-on:click` / `@click` | Template directive | handler / inline expression | event listener | 可检查 handler/event type | `CounterBasic.vue` |
| `.prevent` | Event modifier | native event | calls `preventDefault()` | 不替代 runtime browser behavior | `FormBinding.vue` |
| `v-if` | Conditional directive | truthy/falsy expression | create/remove branch | 检查 condition expression | `ConditionalRendering.vue` |
| `v-show` | Conditional directive | truthy/falsy expression | toggle inline display | 检查 condition expression | `ConditionalRendering.vue` |
| `v-for` | List directive | iterable expression | repeated render blocks | 检查 item shape | `ListRendering.vue` |
| `:key` | Special attribute | stable string/number | sibling identity hint | 不能证明 runtime uniqueness | list / TaskBoard |
| `v-model` | Form directive | assignable state | property/event synchronization | 检查 bound value type | `FormBinding.vue` |
| `:class` | Enhanced binding | string/array/object | normalized class list | 检查 expression values | `ClassStyleBinding.vue` |
| `:style` | Enhanced binding | string/array/object | inline style updates | 检查 expression values | `ClassStyleBinding.vue` |
| `ref(value)` | Vue reactivity | initial value | ref object with `.value` | infers `Ref<T>` | interactive components |
| `vue-tsc --noEmit` | Type tooling | project/SFC graph | diagnostics, no output files | 不执行 runtime input validation | `package.json` |

## 11. 常见错误表

以下错误均包含错误写法、错误类型或可观察结果、违反规则、失败原因、修正和识别方法。错误片段很短，因此使用 inline code，避免把表格变成大量重复代码窗口。

| # | Wrong Code | Error / Bug | Violated Rule | Why It Fails | Correct Code | Recognition Method |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `<script type="module" src="./App.vue"></script>` | module/MIME/parse failure | SFC 必须经过 compiler/build setup | 浏览器不原生执行 `.vue` file format | module script 指向 `main.ts`，由 Vite 解析 `.vue` import | Network 直接请求 `.vue`，没有 Vue plugin transform |
| 2 | HTML 为 `<div id="app">`，代码为 `mount("#root")` | mount warning、blank UI | mount selector 必须匹配真实 container | `#root` 在 runtime document 中不存在 | `mount("#app")` | 搜索 HTML id 与 mount selector 是否逐字一致 |
| 3 | template 使用 `<CounterBasic />`，script 未 import | compiler diagnostic / unresolved component warning | `<script setup>` 中 local component 必须有可见 binding | template 找不到对应 component definition | `import CounterBasic from "./CounterBasic.vue";` | diagnostic 指向 unknown component，script 无 matching import |
| 4 | `const count = ref(0); count += 1;` | assignment/type error | script 操作 ref inner value 要用 `.value` | `count` 是 const ref object binding，不是 number binding | `count.value += 1;` | 变量由 `ref()` 创建且错误发生在 script |
| 5 | `<li v-for="task in tasks">` | missing-key warning / identity risk | list siblings 应提供稳定 identity | reorder 时只能按 position patch | `<li v-for="task in tasks" :key="task.id">` | warning 提到 key，或 state 在 reorder 后跟错行 |
| 6 | `<li v-for="(task, index) in tasks" :key="index">` | wrong reuse after insert/filter/reorder | position 不等于 business identity | 同一 index 会指向不同 task | `:key="task.id"` | 过滤/排序后 input、focus 或 local state 跟随位置 |
| 7 | `{{ increment() }}` | render-time mutation、update loop risk | render expression 不应执行 state-changing side effect | component render 会调用 function | `<button @click="increment">Increment</button>` | 未交互时 state 已变化，调用栈来自 render |
| 8 | `<form @submit="submitPlan">` | browser navigation/reload，local state 丢失 | native submit 有默认行为 | handler 后 browser 仍执行 default action | `<form @submit.prevent="submitPlan">` | submit 后 document reload 或 URL 改变 |
| 9 | `const payload = input as TrustedPayload;` | runtime invalid value 被当成可信 | TypeScript assertion 不执行 runtime validation | type 在运行时被擦除 | 检查/解析 runtime value 后再建模 | 外部输入 shape 错误但 typecheck 仍通过 |
| 10 | 只运行 `npm run dev` | CI/typecheck 后才暴露 SFC type error | Vite transform 不等于完整 type checking | dev server 追求按文件快速 transform | 另运行 `npm run typecheck` | browser 能显示，但 `vue-tsc` 报 template/script diagnostic |

特别注意第 7 项：`@click="increment()"` 是合法 inline event handler，它仍在 click 时执行。真正的错误是把有 mutation side effect 的调用放进 interpolation 或普通 render binding。

## 12. 最终小项目

最终小项目只用于整合本章机制，不替代前面的分节教学。`TaskBoardBasic.vue` 的每个 directive 和 state transition 都已经在 9.1–9.10 建立了单独边界。

### 12.1 项目目标

项目提供以下能力：

1. 显示带稳定 id 的 task list。
2. 通过 form 添加 task，并拒绝空标题。
3. 通过 checkbox change 切换 completed state。
4. 按 all / active / completed 过滤。
5. 使用 completed class 显示状态。
6. 过滤为空时显示 conditional empty state。

限制同样重要：所有 state 都属于 component local refs；没有 Router、Pinia、API、test library 或 external UI package；过滤使用普通 function，不使用尚未学习的 `computed`。

### 12.2 文件结构与职责

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Final mini-project structure</span>
  </div>

```txt
src/
  learning/
    vue/
      chapter-01-application-boundary/
        App.vue
        TaskBoardBasic.vue
```
</div>

- `App.vue`：import 并 render `TaskBoardBasic`，不拥有 task state。
- `TaskBoardBasic.vue`：拥有 tasks、input、filter、id generation 和所有操作函数。

### 12.3 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-01-application-boundary/TaskBoardBasic.vue</span>
  </div>

```vue
<script setup lang="ts">
import { ref } from "vue";

type TaskFilter = "all" | "active" | "completed";

type TaskItem = {
  id: number;
  title: string;
  completed: boolean;
};

type FilterOption = {
  value: TaskFilter;
  label: string;
};

const tasks = ref<TaskItem[]>([
  { id: 1, title: "Trace index.html to main.ts", completed: true },
  { id: 2, title: "Explain createApp and mount", completed: false },
  { id: 3, title: "Practice Vue template directives", completed: false },
]);
const newTaskTitle = ref("");
const selectedFilter = ref<TaskFilter>("all");
const nextTaskId = ref(4);

const filterOptions: FilterOption[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

function addTask(): void {
  const title = newTaskTitle.value.trim();

  if (!title) {
    return;
  }

  tasks.value.push({
    id: nextTaskId.value,
    title,
    completed: false,
  });
  nextTaskId.value += 1;
  newTaskTitle.value = "";
}

function toggleTask(taskId: number): void {
  const task = tasks.value.find((currentTask) => currentTask.id === taskId);

  if (task) {
    task.completed = !task.completed;
  }
}

function filteredTasks(): TaskItem[] {
  if (selectedFilter.value === "active") {
    return tasks.value.filter((task) => !task.completed);
  }

  if (selectedFilter.value === "completed") {
    return tasks.value.filter((task) => task.completed);
  }

  return tasks.value;
}
</script>

<template>
  <section class="task-board" aria-labelledby="task-board-title">
    <header class="board-header">
      <div>
        <p class="topic">Chapter integration</p>
        <h2 id="task-board-title">Task Board Basic</h2>
      </div>
      <span class="task-count">{{ tasks.length }} tasks</span>
    </header>

    <form class="task-form" @submit.prevent="addTask">
      <label for="new-task">New learning task</label>
      <div class="task-form-row">
        <input
          id="new-task"
          v-model="newTaskTitle"
          type="text"
          placeholder="Add a Chapter 01 task"
        />
        <button type="submit">Add task</button>
      </div>
    </form>

    <div class="filters" aria-label="Filter tasks">
      <button
        v-for="filterOption in filterOptions"
        :key="filterOption.value"
        type="button"
        :class="{ active: selectedFilter === filterOption.value }"
        :aria-pressed="selectedFilter === filterOption.value"
        @click="selectedFilter = filterOption.value"
      >
        {{ filterOption.label }}
      </button>
    </div>

    <ul v-if="filteredTasks().length > 0" class="task-list">
      <li
        v-for="task in filteredTasks()"
        :key="task.id"
        :class="{ completed: task.completed }"
      >
        <label>
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTask(task.id)"
          />
          <span>{{ task.title }}</span>
        </label>
      </li>
    </ul>
    <p v-else class="empty-state">No tasks match this filter.</p>
  </section>
</template>

<style scoped>
.task-board {
  padding: 1.5rem;
  border: 1px solid #cfe0d7;
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 0 0.75rem 2rem rgba(33, 53, 71, 0.07);
}

.board-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.topic {
  margin: 0;
  color: #18794e;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h2 {
  margin: 0.35rem 0 1rem;
  font-size: 1.75rem;
}

.task-count {
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: #eaf7f0;
  color: #12633f;
  font-size: 0.85rem;
  font-weight: 800;
  white-space: nowrap;
}

.task-form {
  display: grid;
  gap: 0.45rem;
}

.task-form > label {
  font-weight: 800;
}

.task-form-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.6rem;
}

.task-form input {
  min-width: 0;
  padding: 0.75rem;
  border: 1px solid #afc4b9;
  border-radius: 0.55rem;
}

button {
  padding: 0.65rem 0.9rem;
  border: 1px solid #bad0c4;
  border-radius: 0.55rem;
  background: #eff6f2;
  color: #174f37;
  font-weight: 700;
  cursor: pointer;
}

.task-form button {
  border-color: #18794e;
  background: #18794e;
  color: #ffffff;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 1rem 0;
}

.filters button.active {
  border-color: #18794e;
  background: #dff3e8;
}

.task-list {
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.task-list li {
  padding: 0.75rem;
  border: 1px solid #e0e8e4;
  border-radius: 0.6rem;
  background: #fafcfb;
}

.task-list label {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
}

.task-list .completed span {
  color: #718079;
  text-decoration: line-through;
}

.empty-state {
  margin: 0;
  padding: 1rem;
  border-radius: 0.6rem;
  background: #f5f7f6;
  color: #5f6f67;
}

@media (max-width: 560px) {
  .task-form-row {
    grid-template-columns: 1fr;
  }
}
</style>
```
</div>

### 12.4 运行命令与预期行为

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run dev
```
</div>

预期行为：

- 初始显示三项任务，并显示 `3 tasks`。
- 空标题 submit 不新增任务。
- 输入标题并 submit 后，新增 active task，input 清空，count 增加。
- checkbox change 后，对应 task 的 completed class 与 line-through 更新。
- filter buttons 在 all / active / completed 三种结果间切换。
- 当前 filter 没有匹配项时显示 `No tasks match this filter.`。

### 12.5 执行流程、状态所有权与 template 数据流

**状态所有权：**

所有 task state 由一个 `TaskBoardBasic` instance 拥有。`App.vue` 只 render child，不读取或复制其 local refs。

**新增流程：**

`input event → newTaskTitle.value → submit event → preventDefault → addTask → trim/guard → tasks.value.push → nextTaskId increment → input reset → keyed list patch`

**切换流程：**

`checkbox change → toggleTask(task.id) → tasks.value.find → existing task.completed mutation → class/list update`

**过滤流程：**

`filter click → selectedFilter.value → filteredTasks() → matching task object references → keyed render blocks`

**template 数据流：**

template 不保存额外 task copy。`tasks.length`、`task.title`、`task.completed`、filter result 都从 setup-owned values 读取；DOM 是这些 values 的 rendered result。

### 12.6 常见错误与扩展任务

常见错误：

- 忘记 trim/empty guard，产生空 task。
- id 重复，导致 key identity 冲突。
- toggle 根据 index 查找，过滤后修改错误 item。
- filter 直接删除 source tasks，而不是只决定可见结果。
- 把 `filteredTasks()` 改为有 mutation side effect 的 function，使 render 改 state。

完成第 2 章后可做的扩展：

1. 使用 `computed` 表达 filtered tasks，并比较 function 与 cached derived value。
2. 使用 `watch` 持久化 tasks，但先明确 external synchronization boundary。
3. 使用 `nextTick` 只在确实需要读取更新后 DOM 时处理 focus。
4. 对比 `ref<TaskItem[]>` 与 `reactive` collection 的访问和 replacement boundary。

这些扩展现在不实现，避免提前生成第 2 章内容。

## 13. 额外速查表

本速查表用于复习已经完成的分节教学，不替代前面的机制解释。

| Concept | Layer | Syntax / API | Runtime Behavior | TypeScript Behavior | Common Mistake | Project Usage |
| --- | --- | --- | --- | --- | --- | --- |
| `createApp` | Vue application API | `createApp(App)` | 创建以 `App` 为 root 的 application instance | 检查 component argument | 以为调用后已写入 DOM | bootstrap |
| `mount` | Vue runtime / DOM | `.mount("#app")` | 查找 container 并挂载 root instance | 不能证明 selector 匹配 | HTML id 与 selector 不一致 | application start |
| SFC | SFC compiler | `*.vue` | 编译为 JavaScript module 与 CSS | `vue-tsc` 检查 SFC | 直接交给浏览器执行 | component file |
| `template` | SFC compiler | `<template>` | 编译为 render logic | 检查可见 bindings | 当成任意 HTML string | declarative UI |
| `script setup` | SFC compiler | `<script setup lang="ts">` | 每个 instance 执行 setup logic | TypeScript static analysis | 忘记 script 中 ref `.value` | local logic/state |
| `style scoped` | SFC CSS transform | `<style scoped>` | selector 加 scope attribute | 不参与 type checking | 误认为 Shadow DOM | local component CSS |
| `v-bind` / `:` | Template syntax | `:href="url"` | 同步 attribute/property | 检查 expression | 写成 static `href="url"` | dynamic attributes |
| `v-on` / `@` | Template syntax | `@click="handler"` | 注册 event listener | 可检查 event parameter | 在 render expression 调 mutation | interactions |
| `v-if` | Directive | `v-if="condition"` | 创建/移除 branch | 检查 condition | 用于高频切换但忽略 lifecycle | conditional structure |
| `v-show` | Directive | `v-show="condition"` | 保留 element，切换 display | 检查 condition | 以为 false 时不创建 DOM | frequent visibility |
| `v-for` | Directive | `v-for="item in items"` | 重复 render blocks | 检查 item shape | 与 `v-if` 混在同 element | list rendering |
| `key` | Special attribute | `:key="item.id"` | 提供 sibling identity | 不能证明 runtime uniqueness | 用 index/random value | stable list updates |
| `v-model` | Form directive | `v-model="value"` | control property/event sync | 检查 bound type | 假设它做 runtime validation | forms |
| Class binding | Enhanced `v-bind` | `:class="{ active: flag }"` | normalize/patch class list | 检查 expression | 拼接难维护字符串 | state presentation |
| Style binding | Enhanced `v-bind` | `:style="{ fontSize: size + 'px' }"` | patch inline styles | 检查 expression | 忘记 CSS unit | dynamic presentation |
| `@submit.prevent` | Event modifier | `@submit.prevent="save"` | 阻止 default submit 后调用 handler | 不替代 runtime form validation | 忘记 modifier 导致 reload | SPA forms |

最小 bootstrap 模板：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: Vue application bootstrap</span>
  </div>

```ts
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```
</div>

## 14. 最终文件清单

| Path | Role | Status |
| --- | --- | --- |
| `docs/vue/chapter-01-application-boundary/vue-chapter-01-learning-guide.md` | 本章完整学习指南 | 已创建并保留 |
| `index.html` | browser document、root container、module entry | 已创建并保留 |
| `package.json` | dependency 与 script contract | 已创建并保留 |
| `tsconfig.json` | TypeScript project references | 已创建并保留 |
| `tsconfig.app.json` | app/SFC TypeScript options | 已创建并保留 |
| `tsconfig.node.json` | Vite config TypeScript options | 已创建并保留 |
| `vite.config.ts` | Vue SFC Vite plugin | 已创建并保留 |
| `src/learning/vue/chapter-01-application-boundary/main.ts` | Vue application bootstrap | 已创建并保留 |
| `src/learning/vue/chapter-01-application-boundary/App.vue` | root component 与 learning-page composition | 已创建并保留 |
| `src/learning/vue/chapter-01-application-boundary/CounterBasic.vue` | minimal ref 与 click update | 已创建并保留 |
| `src/learning/vue/chapter-01-application-boundary/TemplateBinding.vue` | interpolation 与 attribute binding | 已创建并保留 |
| `src/learning/vue/chapter-01-application-boundary/ConditionalRendering.vue` | `v-if` / `v-show` | 已创建并保留 |
| `src/learning/vue/chapter-01-application-boundary/ListRendering.vue` | `v-for` 与 stable key | 已创建并保留 |
| `src/learning/vue/chapter-01-application-boundary/FormBinding.vue` | native controls 与 submit binding | 已创建并保留 |
| `src/learning/vue/chapter-01-application-boundary/ClassStyleBinding.vue` | dynamic class/style | 已创建并保留 |
| `src/learning/vue/chapter-01-application-boundary/TaskBoardBasic.vue` | 本章最终整合项目 | 已创建并保留 |

`Snippet:` 和 `Template:` code-window 内容只用于机制解释，不是额外需要创建的真实文件。

## 15. 如何转换成个人笔记

建议把本章压缩为四张个人卡片：

1. **Application boundary 卡片**：画出 browser → Vite → SFC compiler → Vue runtime → DOM。
2. **Entry chain 卡片**：写出 `index.html → main.ts → App.vue → child component`，并为每条箭头标注 import/selector/render。
3. **Directive 卡片**：按 text、attribute、event、condition、list、form、presentation 分类。
4. **Error card**：保留 mount selector、missing import、ref `.value`、stable key、submit default、typecheck boundary 六类信号。

个人笔记应保留“谁拥有值、谁读取、谁修改、何时更新”四个问题。只抄 API 名称会丢失本章最重要的边界。

## 16. 必须能回答的问题

1. `.vue` 文件为什么不能直接由浏览器当 standard JavaScript module 执行？
2. Vite dev server、Vue SFC compiler 和 Vue runtime 各自负责什么？
3. `index.html`、`main.ts`、`App.vue` 如何形成入口链？
4. `createApp(App)` 创建什么？它和 root component instance 有什么区别？
5. `.mount("#app")` 做什么？为什么 container 自身不属于 component tree？
6. `<script setup>` top-level bindings 为什么可用于 template？
7. template 为什么不是普通 HTML string？
8. `{{ value }}` 与 `:attribute="value"` 有什么边界？
9. `v-bind` 与 `:`、`v-on` 与 `@` 分别是什么关系？
10. native method handler 会收到什么 event object？
11. 为什么 `@submit.prevent` 能防止页面 reload？
12. `v-if` 与 `v-show` 在 DOM existence 上有什么不同？
13. `v-for` 为什么需要 stable key？为什么 index 不等于 item identity？
14. `v-model` 在 text、checkbox、select 上分别使用什么 property/event pair？
15. class/style binding 如何读取 JavaScript values 并产生 DOM presentation？
16. TypeScript 能检查什么，为什么不能验证 runtime user input？
17. 为什么 `npm run dev` 不能替代 `vue-tsc --noEmit`？
18. 哪些 reactivity 主题必须留到第 2 章？

## 17. 最终记忆模型

本章只需要牢牢记住下面这条完整链：

`index.html` 提供真实 DOM container 和 module URL；Vite 把 TypeScript/SFC module graph 转成 browser 可执行内容；`main.ts` 用 `createApp(App)` 建立 application boundary，再用 `mount("#app")` 连接真实 DOM；SFC compiler 把 script/template/style 组合成 component；template 读取 JavaScript values；native events 调用 handlers；handlers 修改最小 refs；Vue runtime 更新受影响 DOM。

第 1 章的关键不是背 directive，而是能给每一步指出：

- owner 是谁；
- concrete value 是什么；
- operation 在 compile time、tooling、JavaScript runtime、Vue runtime 还是 browser platform；
- TypeScript 检查了什么；
- UI 结果为什么发生。

## 18. 官方文档阅读清单

按本章顺序阅读：

1. [Vue Introduction](https://vuejs.org/guide/introduction.html)
2. [Vue Quick Start](https://vuejs.org/guide/quick-start.html)
3. [Creating a Vue Application](https://vuejs.org/guide/essentials/application.html)
4. [Application API: createApp and mount](https://vuejs.org/api/application.html)
5. [Single-File Components](https://vuejs.org/guide/scaling-up/sfc.html)
6. [`<script setup>`](https://vuejs.org/api/sfc-script-setup.html)
7. [SFC CSS Features](https://vuejs.org/api/sfc-css-features.html)
8. [Template Syntax](https://vuejs.org/guide/essentials/template-syntax.html)
9. [Built-in Directives](https://vuejs.org/api/built-in-directives.html)
10. [Class and Style Bindings](https://vuejs.org/guide/essentials/class-and-style.html)
11. [Conditional Rendering](https://vuejs.org/guide/essentials/conditional.html)
12. [List Rendering](https://vuejs.org/guide/essentials/list.html)
13. [Event Handling](https://vuejs.org/guide/essentials/event-handling.html)
14. [Form Input Bindings](https://vuejs.org/guide/essentials/forms.html)
15. [Using Vue with TypeScript](https://vuejs.org/guide/typescript/overview)
16. [Vite Getting Started](https://vite.dev/guide/)
17. [Vite Features](https://vite.dev/guide/features)

第 2 章再阅读 Vue Reactivity Fundamentals、Reactivity in Depth 和 scheduler/DOM timing 相关资料；本章不提前展开。
