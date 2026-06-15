# React 第一章：React 是什么、为什么需要 React、React 应用的运行边界

<style>
.macos-code-window {
  overflow: hidden;
  border: 1px solid #30363d;
  border-radius: 12px;
  background: #0d1117;
  margin: 16px 0;
}

.macos-code-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 0 12px;
  background: #161b22;
  border-bottom: 1px solid #30363d;
}

.macos-code-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  display: inline-block;
  flex: 0 0 auto;
}

.macos-code-dot-red {
  background: #ff5f57;
}

.macos-code-dot-yellow {
  background: #ffbd2e;
}

.macos-code-dot-green {
  background: #28c840;
}

.macos-code-title {
  margin-left: 8px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  color: #c9d1d9;
}

.macos-code-titlebar + pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  background: transparent;
  border-radius: 0 0 12px 12px;
}

.macos-code-titlebar + pre code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
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
  - [9.1 React 到底是什么](#91-react-到底是什么)
  - [9.2 React 解决了传统 DOM 手写更新的什么问题](#92-react-解决了传统-dom-手写更新的什么问题)
  - [9.3 React 为什么围绕 component 组织 UI](#93-react-为什么围绕-component-组织-ui)
  - [9.4 JSX 是什么，为什么不是浏览器原生语法](#94-jsx-是什么为什么不是浏览器原生语法)
  - [9.5 React app 如何从 `main.tsx` 启动](#95-react-app-如何从-maintsx-启动)
  - [9.6 Vite、React、TypeScript 在当前项目中的分工](#96-vitereacttypescript-在当前项目中的分工)
  - [9.7 React 和 HTML / CSS / JavaScript、Next.js、React Native 的关系](#97-react-和-html--css--javascriptnextjsreact-native-的关系)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [项目目标](#项目目标)
  - [为什么适合本章](#为什么适合本章)
  - [最终小项目结构](#最终小项目结构)
  - [文件职责](#文件职责)
  - [完整代码](#完整代码)
  - [运行方式](#运行方式)
  - [预期输出或交互结果](#预期输出或交互结果)
  - [核心执行流程](#核心执行流程)
  - [常见错误](#常见错误)
  - [可选扩展](#可选扩展)
- [13. 额外速查表](#13-额外速查表)
- [14. 最终文件清单](#14-最终文件清单)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 0. 文件定位

本文件是当前 `React + TypeScript + Vite` 学习项目的 React 第一章学习指导。它放在 `docs/react/chapter-01-react-introduction/` 下，目标是建立第一层 React 心智模型，而不是提前学习完整应用架构。

本章适合已经能读懂基础 HTML、CSS、JavaScript function、object、module import/export，并准备进入 React 的学习者。它解释 React 为什么存在、React app 如何在浏览器中启动、`Vite`、`React`、`TypeScript` 在当前项目里分别负责什么。

本章不深入：

- hooks、state、effect、context、reducer。
- router、Next.js、Redux、React Native、Vue。
- Tailwind、CSS Modules、组件库、测试框架。
- 服务端渲染、React Server Components、数据库、鉴权、部署。

本章会少量提到 `props`、`StrictMode`、`createRoot`、JSX 转换，但只用于说明运行边界，不进入后续章节的细节。

当前项目证据：

- `package.json` 使用 `react`、`react-dom`、`typescript`、`vite`、`@vitejs/plugin-react`。
- `src/main.tsx` 是浏览器端 React 入口。
- `index.html` 通过 `<script type="module" src="/src/main.tsx"></script>` 进入 Vite 模块图。
- `tsconfig.app.json` 使用 `jsx: "react-jsx"`、`strict: true`、`noEmit: true`。

## 1. 本章解决的问题

初学 React 时，最容易把不同层混在一起：

- 把 React 当成一种新 HTML。
- 把 JSX 当成浏览器原生语法。
- 把 TypeScript 类型错误当成浏览器运行时错误。
- 把 Vite 当成 React 本身。
- 把 Next.js、React Native、React、React DOM 混成同一个东西。

本章解决的核心问题是：你要先知道一个 React 应用到底从哪里进入浏览器、谁负责转译、谁负责类型检查、谁负责创建 DOM 更新、哪些代码真的会在浏览器里运行。

本章的最终结论：

React 是一个用于构建用户界面（user interface, UI）的 JavaScript library。它让你把 UI 拆成 component，用 JavaScript function 返回 UI 描述，再由 React DOM 把这些描述同步到浏览器 DOM。TypeScript 在运行前检查类型，Vite 在开发和构建阶段处理模块、转译和打包，浏览器最终执行的是 JavaScript、HTML、CSS 和 Web API。

## 2. 前置概念

| Concept | Why It Is Required |
| --- | --- |
| HTML element | React 最终仍然渲染浏览器能理解的 HTML element。 |
| CSS selector and class | JSX 中常见 `className` 最终会影响浏览器里的 class attribute。 |
| JavaScript function | React function component 本质上是 JavaScript function。 |
| JavaScript object | JSX 会创建 React element object；component props 也是 object 模型。 |
| JavaScript module | 当前项目用 ESM `import` / `export` 连接 `main.tsx`、`App.tsx` 和 CSS 文件。 |
| DOM | React DOM 的工作边界是浏览器 DOM tree，不是 TypeScript 类型系统。 |
| TypeScript type checking | `.tsx` 文件里的类型只在编译检查阶段存在，浏览器不会运行 TypeScript 类型。 |
| Vite dev server | `npm run dev` 启动的是 Vite，Vite 负责提供开发服务器、模块转换和 HMR。 |

如果你对这些概念还不熟，本章仍然可以阅读，但建议边读边回到基础知识做小实验。

## 3. 学习目标

学完本章后，你应该能做到：

- 用一句话准确解释 React 是什么。
- 解释为什么手写 DOM 更新在复杂 UI 中容易失控。
- 解释为什么 React 用 component 组织 UI。
- 判断 JSX 属于语法扩展，不是浏览器原生语法。
- 说明 React component 与 JavaScript function、object、module 的关系。
- 按顺序说出当前项目从 `index.html` 到 `src/main.tsx` 再到 `App` 的启动过程。
- 区分 React runtime behavior、TypeScript compile-time behavior、Vite tooling behavior、browser platform API。
- 说明 React 与 HTML、CSS、JavaScript 的关系。
- 说明 React 不等于 Next.js，也不等于 React Native。

## 4. 推荐学习顺序

推荐顺序：

1. 先理解浏览器原生模型：HTML 变成 DOM tree，CSS 负责样式，JavaScript 通过 DOM API 改页面。
2. 再理解传统手写 DOM 更新的问题：状态和页面容易不同步，更新逻辑分散。
3. 再理解 React 的核心抽象：component 是把 UI 拆成可组合单元的方式。
4. 再理解 JSX：它是写 UI 描述的语法扩展，需要工具转换。
5. 再理解当前项目入口：`index.html` 加载 `main.tsx`，`createRoot` 接管 `#root`。
6. 最后理解边界：React 负责 UI runtime，TypeScript 负责类型检查，Vite 负责开发服务器与构建，浏览器负责执行最终 JavaScript 和 DOM API。

这个顺序能避免一开始就陷入 hooks、状态管理或路由。第一章的重点是把边界看清楚。

## 5. 核心术语表

| Term | 中文说明 | Layer | Why It Matters |
| --- | --- | --- | --- |
| React | 用于构建 UI 的 JavaScript library | framework runtime | 本章的主体，负责根据 component 描述组织 UI 更新。 |
| React DOM | 把 React UI 描述渲染到 browser DOM 的 package | framework runtime / platform bridge | 当前 Web 项目通过 `react-dom/client` 的 `createRoot` 接入 DOM。 |
| Component | 可复用、可嵌套的 UI 单元 | framework convention / JavaScript function | React 用 component 作为 UI 的基本组织单位。 |
| Function Component | 用 function 表达的 React component | JavaScript runtime / framework convention | 当前项目主要使用这种现代 component 写法。 |
| JSX | 在 JavaScript / TypeScript 文件中写 HTML-like markup 的语法扩展 | syntax / tooling | 浏览器不原生执行 JSX，需要 TypeScript、Babel 或 Vite 插件处理。 |
| TSX | TypeScript 文件中包含 JSX 的文件形式 | TypeScript syntax / tooling | 当前项目入口和 component 文件使用 `.tsx`。 |
| React Element | React 用来描述 UI 的普通 object | JavaScript runtime / React runtime | JSX 转换后会产生用于渲染的 React node / element 描述。 |
| DOM | 浏览器把文档表示为 node tree 的 Web API | platform API | React DOM 的最终目标是维护真实 DOM。 |
| `createRoot` | 在 DOM node 内创建 React root 的 API | React DOM API | 当前项目从这里启动 React 渲染。 |
| `root.render` | 把 React node 渲染到 root 内部 | React DOM API | 当前项目用它渲染 `<App />`。 |
| Vite | 前端开发服务器与构建工具 | tooling | 负责 dev server、module graph、HMR、production build。 |
| TypeScript | JavaScript 的静态类型检查器和编译工具 | type system / tooling | 在运行前检查类型，最终类型会被擦除。 |
| `jsx: "react-jsx"` | TypeScript JSX emit 设置 | TypeScript tooling | 当前项目使用 automatic JSX runtime。 |
| Next.js | 基于 React 的 full-stack framework | framework above React | 它使用 React，但不等于 React。 |
| React Native | 用 React 模型构建 native app 的技术 | renderer / platform integration | 它使用 React 思想，但目标不是 browser DOM。 |

## 6. 底层心智模型

React 第一层心智模型可以压缩成四句话：

1. 浏览器只认识 HTML、CSS、JavaScript 和 Web APIs，不原生认识 JSX、TSX、TypeScript 类型。
2. React component 是 JavaScript function，它返回 UI 描述，而不是直接手写一串 DOM 操作。
3. React DOM 把这些 UI 描述转换成对浏览器 DOM 的创建和更新。
4. Vite 和 TypeScript 属于开发/构建工具链；它们帮助你写、检查、转换代码，但不是浏览器 UI runtime 本身。

更细一点：

- HTML 提供初始文档和 `#root` 容器。
- Vite 在开发时把 `index.html` 当入口，解析 `<script type="module">`，把 `.tsx`、CSS、依赖模块交给浏览器或转换器。
- TypeScript 检查 `.ts` / `.tsx` 类型，当前项目 `noEmit: true` 表示类型检查时不由 `tsc` 输出 JS 文件。
- React 执行 component function，得到 React element tree。
- React DOM 把 React element tree commit 到真实 DOM。

## 7. 推荐目录结构

本章涉及四种结构，请先区分清楚：

- 当前项目结构：用于理解当前 `Vite + React + TypeScript` 项目真实入口。
- 本章文档结构：用于说明本学习指导文件的位置。
- 概念示例结构：只用于解释机制，不表示必须创建文件。
- 最终小项目结构：只在你实际练习 `React Component Rendering Demo` 时使用。

当前项目结构如下：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">当前项目结构</span>
  </div>

```txt
vite_ts/
  index.html
  package.json
  tsconfig.app.json
  vite.config.ts
  src/
    main.tsx
    App.tsx
    App.css
    index.css
```
</div>

本章文档结构如下：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">本章文档结构</span>
  </div>

```txt
vite_ts/
  docs/
    react/
      chapter-01-react-introduction/
        react-chapter-01-learning-guide.md
  references/
    books/
      react/
        the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf
```
</div>

当前项目职责说明：

- `index.html`：浏览器最先拿到的 HTML document，包含 `#root` 和模块脚本入口。
- `src/main.tsx`：React app 的 browser entry point。
- `src/App.tsx`：当前应用的 root component 文件。
- `src/index.css`：全局样式。
- `src/App.css`：当前 `App` component 相关样式。
- `vite.config.ts`：启用 Vite React 插件。
- `tsconfig.app.json`：约束浏览器端 TypeScript / TSX 代码。
- `docs/react/...`：学习文档，不参与应用运行。
- `references/books/react/...`：本地 React 辅助资料，不参与应用运行。

## 8. 示例运行方式

本章示例主要是学习用代码块。若你想把第 12 节小项目放进当前项目运行，使用当前项目已有命令：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm install
npm run dev
```
</div>

构建检查：

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

当前 `package.json` 中：

- `npm run dev` 运行 `vite`。
- `npm run build` 先运行 `tsc -b`，再运行 `vite build`。
- `npm run lint` 运行 `eslint .`。
- `npm run preview` 用 Vite 预览 production build。

常见启动失败原因：

- 没有安装依赖：需要先运行 `npm install`。
- Node.js 版本不满足当前 Vite 版本要求。
- 端口被占用：Vite 会提示可用端口或需要你换端口。
- TypeScript 或 ESLint 报错：这属于工具检查失败，不等于浏览器已经运行失败。

## 9. 分节教学与练习

### 9.1 React 到底是什么

**结论：**

React 是一个用于构建用户界面的 JavaScript library。它不是浏览器、不是 HTML、不是 CSS、不是 TypeScript、不是 Vite，也不是完整的 full-stack framework。

**本节解决的问题：**

本节解决“React 是不是一种新语言”的误解。React 不是新语言，它运行在 JavaScript 之上；React 的主要价值是用 component 和声明式渲染组织复杂 UI。

**技术意义：**

React 提供一套 UI runtime 和开发约定。你写 component，component 返回 React 能理解的 UI 描述，React 再决定如何让实际界面变成这个样子。

这里的“UI 描述”不是 HTML 字符串。它更接近 JavaScript object tree。JSX 是写这个 tree 的语法方式。

**概念解释：**

传统 Web 页面由三层组成：

- HTML 描述结构。
- CSS 描述样式。
- JavaScript 描述交互。

当交互很简单时，直接写 DOM 操作没有问题。例如点击按钮后改一段文字，可以用 `textContent`。但当 UI 中有很多数据、很多交互、很多局部更新时，你需要记住“数据现在是什么”和“页面现在显示什么”。这两个东西一旦不同步，bug 就出现了。

React 的思路是：不要到处手写“如何改 DOM 的每一步”，而是写“当前数据应该产生什么 UI”。当数据变化时，React 重新运行相关 component，比较新的 UI 描述，并更新真实 DOM。

**边界：语法、运行时、对象模型、类型系统、框架约定与平台 API：**

| Layer | In This Section |
| --- | --- |
| Syntax | JSX / TSX 是你写 UI 描述的语法。 |
| Runtime behavior | React 在浏览器中运行 component，React DOM 更新 DOM。 |
| Object model | JSX 会变成 React element object，DOM node 也是 object。 |
| Type system | TypeScript 可以检查 component 和 JSX 的类型，但运行时类型会被擦除。 |
| Framework convention | component 名称用 PascalCase，返回 React node。 |
| Platform API | DOM API 是浏览器提供的，不属于 React 或 TypeScript。 |
| Tooling behavior | Vite 和 TypeScript 把源码转换成浏览器可执行的 JavaScript。 |

**底层机制：**

React 不会让浏览器直接执行 `.tsx`。当前项目中：

1. 你写 `.tsx`。
2. TypeScript 检查类型。
3. Vite 和 React 插件处理 JSX / TSX。
4. 浏览器执行 JavaScript module。
5. React 调用 component function。
6. React DOM 更新真实 DOM。

**API / 语法规则：**

本节没有新的 React API，重点是理解机制。

重要规则：

- React component 是 JavaScript function 或 class 等形式的 UI 单元，本项目使用 function component。
- React 不是语言；JSX 也不是浏览器原生语言。
- React DOM 是 Web DOM renderer；没有 React DOM，React 本身不会自动插入浏览器页面。

**固定属性名 / 固定方法名 / 参数签名：**

本节只需要记住几个固定名：

- `react`
- `react-dom/client`
- `createRoot`
- `root.render`

**概念示例结构：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">概念示例结构</span>
  </div>

```txt
Conceptual snippets in this section:
  Snippet: manual DOM update
  Snippet: React component output
  Snippet: JSX class mistake
  Snippet: JSX class correction
```
</div>

**示例代码：**

下面先看一个不使用 React 的手写 DOM 更新示例，理解 React 要解决的问题。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: manual DOM update</span>
  </div>

```ts
const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Root element was not found.");
}

const titleElement = document.createElement("h1");
titleElement.textContent = "Hello DOM";

const descriptionElement = document.createElement("p");
descriptionElement.textContent = "The page was updated by direct DOM calls.";

rootElement.append(titleElement, descriptionElement);
```
</div>

**逐行解释：**

- `document.getElementById("root")` 使用浏览器 DOM API 查找 HTML 中的 root element。
- `if (rootElement === null)` 处理找不到 DOM node 的运行时情况。
- `document.createElement("h1")` 创建真实 DOM element。
- `textContent` 修改 DOM node 上的文本内容。
- `append` 把两个 DOM node 插入 root element。

这段代码没有 React，也没有 JSX。它直接操作浏览器 DOM。

**运行方式：**

可以把它放进一个 Vite TypeScript 入口实验，但本章不要求修改当前源码。若你单独实验，可运行：

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

**预期输出：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Browser UI</span>
  </div>

```txt
Hello DOM
The page was updated by direct DOM calls.
```
</div>

**执行过程：**

1. 浏览器解析 `index.html`，创建 DOM tree。
2. JavaScript module 执行。
3. 代码查找 `#root`。
4. 代码创建真实 DOM node。
5. 代码把 DOM node 插入页面。

**变量与引用变化：**

- `rootElement` 是一个变量绑定，引用浏览器创建的真实 DOM element。
- `titleElement` 和 `descriptionElement` 是新创建的 DOM object 引用。
- `append` 改变真实 DOM tree。

**为什么会得到这个结果：**

输出出现是因为 JavaScript 直接创建并插入了 DOM node。这里没有中间的 React UI 描述，也没有 component tree。

**对比情况：**

React 版本不会直接手写每一个 DOM 创建步骤，而是返回 UI 描述。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: React component output</span>
  </div>

```tsx
export default function App() {
  return (
    <main>
      <h1>Hello React</h1>
      <p>The page was described by a component.</p>
    </main>
  );
}
```
</div>

这段代码描述“UI 应该是什么样”，但不直接调用 `document.createElement`。

**常见错误为什么错：**

常见错误：以为 React component 返回的是浏览器已经认识的 HTML。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: JSX class mistake</span>
  </div>

```tsx
export default function App() {
  return <h1 class="title">Hello React</h1>;
}
```
</div>

错误类型：JSX / React attribute rule error。

违反的规则：JSX 更接近 JavaScript，不是原生 HTML；`class` 在 JSX 中应写为 `className`。

修正：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: JSX class correction</span>
  </div>

```tsx
export default function App() {
  return <h1 className="title">Hello React</h1>;
}
```
</div>

识别方法：如果你把 HTML 复制到 JSX 后出现 attribute 名称错误，优先检查 JSX 与 HTML 的差异，例如 `className`、`htmlFor`、自闭合标签、单一父级。

**与真实项目的关系：**

真实项目中，React 让 UI 逻辑更接近“数据到界面”的映射。你不是到处写 `document.querySelector` 和 `appendChild`，而是拆 component、传数据、返回 JSX。复杂交互仍然需要理解 JavaScript，但 DOM 更新的协调由 React runtime 处理。

**与当前学习路径的关系：**

本节是后续 hooks、state、effect 的基础。只有先知道 component 会被 React 调用，并返回 UI 描述，后续才能理解“state 变化为什么触发重新渲染”。

**最终记忆模型：**

React 不是替代 HTML/CSS/JavaScript 的新语言。React 是用 JavaScript 组织 UI 描述和 DOM 更新的 runtime 与约定。

### 9.2 React 解决了传统 DOM 手写更新的什么问题

**结论：**

React 解决的不是“DOM API 不能用”，而是“复杂 UI 中手写 DOM 更新难以保持数据、结构和交互同步”。

**本节解决的问题：**

当页面只有一个按钮和一段文字时，手写 DOM 更新很直接。当页面有列表、表单、过滤、异步数据、多个组件共享数据时，你必须自己维护大量 DOM 更新路径。React 把问题改成：根据当前数据描述 UI。

**技术意义：**

传统 DOM 写法通常是命令式（imperative）：你告诉浏览器一步一步怎么改。React 写法通常是声明式（declarative）：你描述某个状态下 UI 应该是什么，React 负责把 DOM 调整到对应结果。

**概念解释：**

命令式 DOM 更新的问题不在语法，而在规模：

- 同一份数据可能影响多个 DOM 区域。
- 一个事件可能需要更新文字、按钮状态、class、列表项。
- 更新路径越多，越容易漏改。
- 页面当前状态可能和 JavaScript 数据不一致。

React 的 component model 把 UI 拆成更小单元，每个单元只描述自己负责的部分。这样你更容易定位某块 UI 的来源。

**边界：语法、运行时、对象模型、类型系统、框架约定与平台 API：**

| Layer | Imperative DOM | React |
| --- | --- | --- |
| Syntax | `document.createElement`, `append`, `textContent` | JSX / TSX |
| Runtime behavior | JavaScript 直接改 DOM | React 执行 component 后由 React DOM 更新 DOM |
| Object model | DOM node object | React element object + DOM node object |
| Type system | TypeScript 可检查 DOM API 类型 | TypeScript 可检查 JSX 和 component 类型 |
| Framework convention | 无 React 约定 | component、PascalCase、root render |
| Platform API | DOM API | 最终仍然落到 DOM API |

**底层机制：**

React component 返回的是 UI 描述。React runtime 可以重复调用 component，得到新的 UI 描述，再把它和之前的结果协调到真实 DOM。第一章不深入 reconciliation 算法，只需要记住：React 让你从“手动改 DOM 步骤”转向“声明当前 UI 结果”。

**API / 语法规则：**

本节没有新的 API，重点是理解命令式和声明式的边界。

**固定属性名 / 固定方法名 / 参数签名：**

手写 DOM 常见固定名：

- `document.getElementById(id)`
- `document.createElement(tagName)`
- `node.textContent`
- `parent.append(child)`

React 本章常见固定名：

- `function App()`
- `return (...)`
- `<App />`
- `root.render(<App />)`

**概念示例结构：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">概念示例结构</span>
  </div>

```txt
Conceptual snippets in this section:
  Snippet: data to UI mapping
  Snippet: object child mistake
  Snippet: object child correction
```
</div>

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: data to UI mapping</span>
  </div>

```tsx
const courseName = "React";
const chapterName = "Introduction";

export default function App() {
  return (
    <main>
      <h1>{courseName}</h1>
      <p>{chapterName}</p>
    </main>
  );
}
```
</div>

**逐行解释：**

- `courseName` 和 `chapterName` 是 module scope 里的 JavaScript string。
- `App` 是 JavaScript function，也是 React function component。
- `return (...)` 返回 JSX 表达式。
- `{courseName}` 和 `{chapterName}` 在 JSX 中打开 JavaScript 表达式位置。
- React 会根据 JSX 结果创建 UI 描述，并由 React DOM 渲染。

**运行方式：**

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

**预期输出：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Browser UI</span>
  </div>

```txt
React
Introduction
```
</div>

**执行过程：**

1. Module 被加载，`courseName` 和 `chapterName` 初始化。
2. React DOM 从 root 开始渲染 `<App />`。
3. React 调用 `App()`。
4. `App()` 返回 JSX 对应的 React element tree。
5. React DOM 把结果提交到 `#root` 内部。

**变量与引用变化：**

- `courseName` 和 `chapterName` 绑定到 string primitive。
- JSX 中读取变量值，不会改变变量。
- React DOM 会改变真实 DOM tree，但你没有直接持有 DOM node 引用。

**为什么会得到这个结果：**

输出来自 `App()` 返回的 UI 描述。React 不是把 `App.tsx` 当 HTML 文件解析，而是执行 JavaScript module，调用 component function，再由 React DOM 更新浏览器 DOM。

**对比情况：**

如果直接返回 object，React 不能把普通 object 当作 child 渲染。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: object child mistake</span>
  </div>

```tsx
const course = {
  name: "React",
};

export default function App() {
  return <h1>{course}</h1>;
}
```
</div>

React child 可以是 string、number、React element、array 等可渲染内容，但普通 object 不是直接可渲染文本。

**常见错误为什么错：**

错误类型：React runtime error。

违反的规则：JSX `{}` 可以放 JavaScript expression，但 expression 的结果必须是 React 能渲染的值。

修正：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: object child correction</span>
  </div>

```tsx
const course = {
  name: "React",
};

export default function App() {
  return <h1>{course.name}</h1>;
}
```
</div>

识别方法：看到 “Objects are not valid as a React child” 一类错误时，检查 JSX `{}` 中是否放入了普通 object。

**与真实项目的关系：**

真实项目里的 UI 通常由数据驱动。React 的价值是让你把数据映射为 UI，而不是在每个数据变化点手写 DOM 操作。

**与当前学习路径的关系：**

后续学习 state 时，你会看到 React 如何在数据变化后重新执行 component。现在先理解“component 输出 UI 描述”。

**最终记忆模型：**

手写 DOM 更新是“逐步改页面”。React component 是“根据当前数据描述页面”。

### 9.3 React 为什么围绕 component 组织 UI

**结论：**

React 围绕 component 组织 UI，是因为现代 UI 不是单个页面，而是一组可复用、可嵌套、可组合、可独立理解的界面单元。

**本节解决的问题：**

本节解决“为什么不直接把所有 JSX 都写在一个文件里”的问题。一个小 demo 可以写在一个 `App` 里，但项目变大后，按 component 拆分能降低阅读、复用和维护成本。

**技术意义：**

React component 是一个可被 React 调用的 UI 单元。当前项目主要使用 function component。function component 表面上是函数，React 层面上是 UI 的构造单元，module 层面上可以被 import/export。

**概念解释：**

component 同时连接三件事：

- Markup：这个 UI 长什么样。
- JavaScript logic：这个 UI 如何计算要显示的内容。
- Composition：这个 UI 如何嵌套别的 UI。

React 官方文档把 component 看成 UI building block。你可以把页面拆成 header、card、button、panel、list 等组件，再组合成完整页面。

**边界：语法、运行时、对象模型、类型系统、框架约定与平台 API：**

| Layer | Meaning |
| --- | --- |
| Syntax | `function ComponentName() { return <div />; }` |
| Runtime behavior | React 调用 component function，读取返回值。 |
| Object model | component function 是 function object；JSX 返回 React element object。 |
| Type system | TypeScript 可检查 component 参数、返回 JSX、import/export。 |
| Framework convention | component 名称必须以大写字母开头，JSX 中 `<Component />` 表示 component。 |
| Platform API | component 本身不是 DOM node，React DOM 才把结果同步到 DOM。 |

**底层机制：**

JavaScript function 在运行时是 callable object。React component 借用了这个机制：你定义一个 function，React 在渲染过程中调用它。React 不是把 function source code 插入页面，而是使用 function 的返回值构建 UI tree。

**API / 语法规则：**

- Component name 使用 PascalCase，例如 `LearningCard`。
- Component 返回 React node，例如 JSX element、string、number、`null` 等。
- JSX 中小写标签如 `<section>` 表示 intrinsic DOM element。
- JSX 中大写标签如 `<LearningCard />` 表示你定义或导入的 component。

**固定属性名 / 固定方法名 / 参数签名：**

本节不涉及固定 DOM method。需要记住的是命名约定：

- `function LearningCard()`
- `<LearningCard />`
- `export default LearningCard`
- `import LearningCard from "./LearningCard"`

**概念示例结构：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">概念示例结构</span>
  </div>

```txt
Conceptual snippets in this section:
  Snippet: learning card component
  Snippet: component composition
  Snippet: lowercase component mistake
  Snippet: capitalized component correction
```
</div>

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: learning card component</span>
  </div>

```tsx
type LearningCardProps = {
  title: string;
  summary: string;
};

export default function LearningCard({ title, summary }: LearningCardProps) {
  return (
    <article className="learning-card">
      <h2>{title}</h2>
      <p>{summary}</p>
    </article>
  );
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: component composition</span>
  </div>

```tsx
import LearningCard from "./components/LearningCard";

export default function App() {
  return (
    <main>
      <h1>React Introduction</h1>
      <LearningCard
        title="Component"
        summary="A component describes one reusable part of the UI."
      />
    </main>
  );
}
```
</div>

**逐行解释：**

`LearningCard.tsx`：

- `type LearningCardProps` 是 TypeScript object type，只在检查阶段存在。
- `title: string` 和 `summary: string` 约束传入值的类型。
- `LearningCard` 是 JavaScript function，也是 React component。
- 函数参数通过 object destructuring 读取 `title` 和 `summary`。
- JSX 返回一个 `article`，包含标题和段落。

`App.tsx`：

- `import LearningCard` 使用 JavaScript module 系统导入 component function。
- `<LearningCard ... />` 在 JSX 中创建这个 component 的使用点。
- `title` 和 `summary` 看起来像 HTML attribute，但对 custom component 来说会组成 props object。

**运行方式：**

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

**预期输出：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Browser UI</span>
  </div>

```txt
React Introduction
Component
A component describes one reusable part of the UI.
```
</div>

**执行过程：**

1. Browser 加载 `main.tsx` 对应模块。
2. `App.tsx` 被导入。
3. `LearningCard.tsx` 被导入。
4. React 渲染 `<App />`。
5. `App()` 返回包含 `<LearningCard />` 的 JSX。
6. React 调用 `LearningCard()`，传入 props object。
7. React DOM 提交最终 DOM 更新。

**变量与引用变化：**

- `LearningCard` 是 module import 得到的 function reference。
- JSX 中的 props 会形成 object-like 数据输入。
- TypeScript 的 `LearningCardProps` 不会在浏览器运行时保留。

**为什么会得到这个结果：**

输出来自 component composition：`App` 描述页面级结构，`LearningCard` 描述卡片级结构。React 递归处理 component，最后得到可以交给 React DOM 的元素树。

**对比情况：**

小写 component 名称会被 JSX 当作 intrinsic element 名称，而不是你定义的 component。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: lowercase component mistake</span>
  </div>

```tsx
function learningCard() {
  return <article>Component</article>;
}

export default function App() {
  return <learningCard />;
}
```
</div>

**常见错误为什么错：**

错误类型：React component naming / JSX interpretation error。

违反的规则：custom component 必须以大写字母开头。小写 JSX tag 会被当成 DOM intrinsic element。

修正：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: capitalized component correction</span>
  </div>

```tsx
function LearningCard() {
  return <article>Component</article>;
}

export default function App() {
  return <LearningCard />;
}
```
</div>

识别方法：如果自定义 component 没有按预期执行，先检查 JSX tag 是否以大写开头，检查是否正确 import/export。

**与真实项目的关系：**

真实项目会把重复 UI、复杂 UI、可独立理解的 UI 拆成 component。component 不只是视觉复用，也让逻辑和 markup 靠近，减少跨文件追踪成本。

**与当前学习路径的关系：**

后续学习 props、state、effect 之前，你必须先理解 component 是 React 的组织单位，而不是 HTML 标签的简单别名。

**最终记忆模型：**

React component 是 JavaScript function 在 UI 层的约定化使用：function 输入数据，返回 UI 描述；module 系统负责文件之间的引用。

### 9.4 JSX 是什么，为什么不是浏览器原生语法

**结论：**

JSX 是 JavaScript 的语法扩展，用来在 JavaScript / TypeScript 文件里写 HTML-like markup。浏览器不原生执行 JSX；它必须先被工具转换成 JavaScript。

**本节解决的问题：**

本节解决“为什么 `.tsx` 里能写 `<h1>`”的问题。你看到的是源码语法，不是浏览器最终执行的代码。

**技术意义：**

JSX 表达 UI 描述。TypeScript 官方文档把 JSX 描述为可嵌入的 XML-like syntax，并说明它要被转换成有效 JavaScript。当前项目 `tsconfig.app.json` 设置 `jsx: "react-jsx"`，表示使用 React automatic JSX runtime 形式的转换。

**概念解释：**

JSX 看起来像 HTML，但规则不同：

- `class` 写成 `className`。
- `for` 写成 `htmlFor`。
- tag 通常需要闭合。
- `{}` 里是 JavaScript expression。
- 自定义 component 使用大写 tag。
- JSX 和 React 常一起用，但它们不是同一个东西。

在 `.tsx` 中，TypeScript 还要解析 JSX 和类型语法，所以文件扩展名很重要。包含 JSX 的 TypeScript 文件应使用 `.tsx`。

**边界：语法、运行时、对象模型、类型系统、框架约定与平台 API：**

| Layer | JSX Role |
| --- | --- |
| Syntax | 让你在 JS / TS 中写 HTML-like markup。 |
| Runtime behavior | JSX 本身不运行，转换后的 JavaScript 运行。 |
| Object model | 转换后产生 React element object / React node。 |
| Type system | TypeScript 检查 intrinsic element、component props、attribute 类型。 |
| Framework convention | React 项目常用 JSX 描述 UI。 |
| Platform API | 浏览器 DOM 不认识 JSX，只认识最终 DOM 更新。 |
| Tooling behavior | Vite、TypeScript、React 插件参与转换。 |

**底层机制：**

当前项目里 `jsx: "react-jsx"` 表示 TSX 中的 JSX 会转成 automatic JSX runtime 的 JavaScript 调用形式。概念上：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: JSX transform input</span>
  </div>

```tsx
export const heading = <h1>Hello JSX</h1>;
```
</div>

会变成类似下面的 JavaScript 形态：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: emitted JavaScript concept</span>
  </div>

```js
import { jsx as _jsx } from "react/jsx-runtime";

export const heading = _jsx("h1", {
  children: "Hello JSX",
});
```
</div>

真实输出由工具链决定。本章只要求你记住：JSX 不是浏览器直接执行的语法。

**API / 语法规则：**

- TSX 文件扩展名：`.tsx`。
- JSX expression 中插入 JavaScript：`{expression}`。
- HTML class attribute 在 JSX 中写成 `className`。
- label 的 `for` attribute 在 JSX 中写成 `htmlFor`。
- custom component tag 使用 PascalCase。

**固定属性名 / 固定方法名 / 参数签名：**

常见固定 JSX attribute：

- `className`
- `htmlFor`
- `id`
- `type`
- `children`

注意：`children` 是 React 约定中的常见 prop 名称，本章只认识它，不深入。

**概念示例结构：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">概念示例结构</span>
  </div>

```txt
Conceptual snippets in this section:
  Snippet: JSX transform input
  Snippet: emitted JavaScript concept
  Snippet: JSX attributes
  Snippet: JSX attribute mistake
  Snippet: JSX attribute correction
```
</div>

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: JSX attributes</span>
  </div>

```tsx
const inputId = "topic";

export default function App() {
  return (
    <main className="learning-page">
      <h1>React Introduction</h1>
      <label htmlFor={inputId}>Topic</label>
      <input id={inputId} type="text" defaultValue="JSX" />
    </main>
  );
}
```
</div>

**逐行解释：**

- `inputId` 是普通 JavaScript string。
- `className="learning-page"` 使用 JSX attribute 名称，最终会影响 DOM class。
- `htmlFor={inputId}` 使用 JSX attribute，并通过 `{}` 读取 JavaScript 值。
- `id={inputId}` 把同一个 JavaScript 值传给 input。
- `defaultValue="JSX"` 是 React DOM 对 input 初始值的 attribute / prop 处理方式。

**运行方式：**

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

**预期输出：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Browser UI</span>
  </div>

```txt
React Introduction
Topic
JSX
```
</div>

**执行过程：**

1. TypeScript 解析 `.tsx`。
2. TypeScript 根据 JSX 类型规则检查 attribute。
3. Vite / React 插件处理源码。
4. 浏览器执行转换后的 JavaScript。
5. React DOM 创建或更新真实 input、label、main。

**变量与引用变化：**

- `inputId` 在 module 初始化时创建一次。
- JSX 中多处读取同一个 string value。
- 没有直接创建 DOM reference。

**为什么会得到这个结果：**

React component 返回包含 label 和 input 的 JSX。转换后，React DOM 根据 UI 描述创建真实 DOM。`htmlFor` 最终关联到 input 的 `id`。

**对比情况：**

把 HTML 原样复制到 JSX 中容易失败。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: JSX attribute mistake</span>
  </div>

```tsx
export default function App() {
  return (
    <main class="learning-page">
      <label for="topic">Topic</label>
      <input id="topic" type="text">
    </main>
  );
}
```
</div>

**常见错误为什么错：**

错误类型：JSX syntax / JSX attribute error。

违反的规则：

- JSX 使用 `className`，不是 `class`。
- JSX 使用 `htmlFor`，不是 `for`。
- JSX 中 `<input>` 应该自闭合为 `<input />`。

修正：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: JSX attribute correction</span>
  </div>

```tsx
export default function App() {
  return (
    <main className="learning-page">
      <label htmlFor="topic">Topic</label>
      <input id="topic" type="text" />
    </main>
  );
}
```
</div>

识别方法：从 HTML 迁移到 JSX 时，重点检查 attribute 命名、标签闭合、单一父节点和 `{}` 表达式。

**与真实项目的关系：**

真实项目的 `.tsx` 文件大量使用 JSX。你必须知道 JSX 是源码层语法，项目能运行是因为 TypeScript/Vite/React 插件把它处理成 JavaScript。

**与当前学习路径的关系：**

后续所有 React 代码都会用 JSX / TSX。第一章先掌握 JSX 不是 HTML，也不是浏览器原生语法。

**最终记忆模型：**

JSX 是“用 JavaScript 表达 UI”的语法。浏览器不认识 JSX，工具链必须先把它变成 JavaScript。

### 9.5 React app 如何从 `main.tsx` 启动

**结论：**

当前项目从 `index.html` 进入浏览器，Vite 加载 `/src/main.tsx`，`main.tsx` 找到 `#root`，`createRoot` 创建 React root，`root.render(<App />)` 渲染 root component。

**本节解决的问题：**

本节解决“React 应用从哪里开始运行”的问题。React app 的入口不是 `App.tsx` 单独启动，而是 `index.html` 中的 module script 进入 `main.tsx`，再由 `main.tsx` 渲染 `App`。

**技术意义：**

`main.tsx` 是当前 Web app 的 client entry module。它连接三层：

- Browser DOM：`document.getElementById("root")`
- React DOM：`createRoot(...).render(...)`
- React component：`<App />`

**概念解释：**

当前 `index.html` 里有一个空容器：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: index.html root entry</span>
  </div>

```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```
</div>

`#root` 是 React 插入 UI 的位置。`script type="module"` 是浏览器加载 JavaScript module 的方式。Vite 在开发时会把 `/src/main.tsx` 放进它的 module graph，处理 TSX 和 import。

**边界：语法、运行时、对象模型、类型系统、框架约定与平台 API：**

| Layer | In `main.tsx` |
| --- | --- |
| Syntax | ESM import、JSX、non-null assertion `!`。 |
| Runtime behavior | Browser 执行 module，React DOM 创建 root 并渲染。 |
| Object model | `document.getElementById` 返回 DOM element object 或 `null`。 |
| Type system | TypeScript 根据 DOM lib 知道返回类型可能是 `HTMLElement | null`。 |
| Framework convention | `<App />` 是 root component。 |
| Platform API | `document` 是 browser Web API。 |
| Tooling behavior | Vite 解析 `/src/main.tsx` 和 CSS import。 |

**底层机制：**

当前项目实际入口：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: current main.tsx entry model</span>
  </div>

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```
</div>

执行过程不是“打开 `App.tsx`”。执行过程是：`main.tsx` 被加载，`App` 被 import，React DOM 渲染 `<App />`。

**API / 语法规则：**

- `createRoot(domNode)`：为某个 browser DOM node 创建 React root。
- `root.render(reactNode)`：把 React node 渲染到 root 内。
- `document.getElementById("root")`：浏览器 DOM API，返回 `HTMLElement | null`。
- `!`：TypeScript non-null assertion，只影响类型检查，不会在运行时检查。
- `<StrictMode>`：开发辅助 component，用来帮助发现一些问题；本章不深入。

**固定属性名 / 固定方法名 / 参数签名：**

| Name | Signature / Shape | Layer |
| --- | --- | --- |
| `createRoot` | `createRoot(domNode, options?)` | React DOM API |
| `render` | `root.render(reactNode)` | React DOM API |
| `getElementById` | `document.getElementById(id)` | Browser DOM API |
| `StrictMode` | `<StrictMode>{children}</StrictMode>` | React component |

**当前项目结构：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">当前项目结构</span>
  </div>

```txt
index.html
src/
  main.tsx
  App.tsx
  index.css
```
</div>

**示例代码：**

更显式的 root 检查写法：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: explicit root check</span>
  </div>

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Root element was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```
</div>

**逐行解释：**

- `import { StrictMode } from "react"` 导入 React 提供的开发检查 component。
- `import { createRoot } from "react-dom/client"` 导入 Web DOM renderer 的 client API。
- `import App from "./App"` 导入 root component。
- `import "./index.css"` 让 Vite 把 CSS 纳入模块图。
- `document.getElementById("root")` 在真实 DOM 中查找容器。
- `if (rootElement === null)` 把运行时缺失 root 的问题显式抛出。
- `createRoot(rootElement)` 创建 React root。
- `.render(...)` 开始渲染 React node。

**运行方式：**

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

**预期输出：**

输出取决于 `App.tsx` 当前返回什么。入口成功时，浏览器页面中的 `#root` 内会出现 React 渲染的 UI。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Browser UI</span>
  </div>

```txt
Content returned by App
```
</div>

**执行过程：**

1. Vite dev server serves `index.html`。
2. Browser parses `index.html` and creates `<div id="root"></div>`。
3. Browser requests `/src/main.tsx` as a module.
4. Vite transforms TSX and module imports.
5. Browser executes transformed JavaScript.
6. `document.getElementById("root")` returns the DOM container.
7. `createRoot` creates React root for that container.
8. `render` renders `<App />` inside the container.

**变量与引用变化：**

- `rootElement` references a real DOM object.
- `createRoot(rootElement)` creates a React root object associated with that DOM node.
- `App` is a function reference imported from another module.

**为什么会得到这个结果：**

因为 `root.render(<App />)` 把 root component 交给 React DOM。React DOM 接管 `#root` 内部的 DOM 管理。

**对比情况：**

如果 HTML 中没有 `id="root"`，运行时会失败。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: missing root container</span>
  </div>

```html
<div id="app"></div>
<script type="module" src="/src/main.tsx"></script>
```
</div>

这时 `document.getElementById("root")` 返回 `null`。

**常见错误为什么错：**

错误类型：runtime DOM lookup error / React DOM root error。

违反的规则：`createRoot` 需要真实 DOM element，不能传 `null`。

错误代码：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: root lookup mistake</span>
  </div>

```tsx
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("missing-root")!).render(<App />);
```
</div>

修正：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: root lookup correction</span>
  </div>

```tsx
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Root element was not found.");
}

createRoot(rootElement).render(<App />);
```
</div>

识别方法：看到 target container 相关错误时，检查 `index.html` 中的 id、`getElementById` 参数、script 入口是否一致。

**与真实项目的关系：**

大多数纯 React Web app 只有一个 root。旧系统局部接入 React 时可能有多个 root，但当前学习项目只需要一个 root。

**与当前学习路径的关系：**

后续你写任何 component，都要知道它最终是从 `main.tsx` 的 root render 进入渲染树的。

**最终记忆模型：**

`main.tsx` 是 React 与浏览器 DOM 的连接点：找到 DOM container，创建 React root，渲染 root component。

### 9.6 Vite、React、TypeScript 在当前项目中的分工

**结论：**

Vite 是开发和构建工具，React 是 UI runtime，TypeScript 是静态类型检查和源码转换相关工具。三者协作，但职责不同。

**本节解决的问题：**

本节解决“报错到底来自哪里”的问题。你必须能判断一个问题属于浏览器运行时、React runtime、TypeScript 编译检查、Vite 转换/构建、ESLint 规则，还是包版本问题。

**技术意义：**

当前项目使用：

- `vite.config.ts` 中的 `@vitejs/plugin-react`。
- `tsconfig.app.json` 中的 `jsx: "react-jsx"`、`strict: true`、`noEmit: true`。
- `package.json` 中的 `build: "tsc -b && vite build"`。

这意味着 build 时先用 TypeScript 做项目引用构建检查，再由 Vite 打包生产资源。

**概念解释：**

分工如下：

| Tool | Responsibility | Not Responsible For |
| --- | --- | --- |
| React | component model、rendering、UI runtime | 启动 dev server、类型擦除、打包生产资源 |
| React DOM | 将 React tree 渲染到 browser DOM | TypeScript 类型检查、Vite dev server |
| TypeScript | 类型检查、TS/TSX 语法理解、JSX 类型支持 | 浏览器运行时修复、React DOM 更新 |
| Vite | dev server、module graph、HMR、build | React component 语义本身、类型系统设计 |
| Browser | 执行 JavaScript、维护 DOM、应用 CSS | 直接执行 TSX 或 TypeScript 类型 |

**边界：语法、运行时、对象模型、类型系统、框架约定与平台 API：**

| Example | Layer |
| --- | --- |
| `type AppProps = { title: string }` | TypeScript type system |
| `<App />` | JSX syntax / React convention |
| `createRoot(rootElement)` | React DOM runtime |
| `document.getElementById("root")` | Browser platform API |
| `npm run dev` | Vite tooling |
| `npm run build` | TypeScript tooling + Vite tooling |

**底层机制：**

TypeScript 官方文档强调 TypeScript 在运行前检查代码，类型在编译后会被擦除，运行时仍然是 JavaScript 的行为。React runtime 不会读取你的 TypeScript type alias 来决定怎么渲染。Vite 负责把源码和依赖组织成浏览器可加载的模块或生产构建产物。

**API / 语法规则：**

- `.tsx`：包含 JSX 的 TypeScript 文件。
- `jsx: "react-jsx"`：TSConfig 中控制 JSX emit 模式。
- `noEmit: true`：TypeScript 检查但不由 `tsc` 输出 JS。
- `moduleResolution: "bundler"`：让 TypeScript 按 bundler 场景解析模块。
- `vite.config.ts`：Vite 配置文件。

**固定属性名 / 固定方法名 / 参数签名：**

| Name | File | Meaning |
| --- | --- | --- |
| `plugins: [react()]` | `vite.config.ts` | 启用 Vite React 插件。 |
| `jsx: "react-jsx"` | `tsconfig.app.json` | 使用 automatic JSX runtime。 |
| `strict: true` | `tsconfig.app.json` | 启用严格类型检查。 |
| `noEmit: true` | `tsconfig.app.json` | 类型检查不输出 JS 文件。 |
| `build` | `package.json` | 先 `tsc -b`，再 `vite build`。 |

**当前项目结构：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">当前项目结构</span>
  </div>

```txt
package.json
tsconfig.json
tsconfig.app.json
tsconfig.node.json
vite.config.ts
src/
  main.tsx
```
</div>

**示例代码：**

当前项目 Vite 配置：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: Vite React plugin config</span>
  </div>

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```
</div>

当前项目 TSX 关键设置：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: TSX compiler options</span>
  </div>

```json
{
  "compilerOptions": {
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true
  },
  "include": ["src"]
}
```
</div>

**逐行解释：**

`vite.config.ts`：

- `defineConfig` 提供 Vite 配置辅助。
- `react()` 启用 React 插件能力，例如 JSX transform 和 Fast Refresh 支持。
- `plugins: [react()]` 告诉 Vite 用该插件处理 React 项目。

`tsconfig.app.json`：

- `DOM` lib 让 TypeScript 知道 `document`、`HTMLElement` 等 browser API 类型。
- `moduleResolution: "bundler"` 面向 bundler 工具链解析模块。
- `noEmit: true` 表示 `tsc` 检查但不输出 JS。
- `jsx: "react-jsx"` 表示 JSX 使用 React automatic runtime 形式。
- `strict: true` 提升类型检查严格程度。

**运行方式：**

开发：

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

类型与构建：

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

**预期输出：**

成功时，开发服务器会给出本地访问地址；构建成功时 Vite 会输出 production assets。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Output</span>
  </div>

```txt
Vite dev server or production build output
```
</div>

**执行过程：**

开发时：

1. `npm run dev` 执行 Vite。
2. Vite 读取 `vite.config.ts`。
3. Vite 使用 React 插件处理 React / JSX 相关转换。
4. Browser 请求 `index.html` 和 module。
5. Vite 按需转换模块并提供 HMR。

构建时：

1. `npm run build` 先执行 `tsc -b`。
2. TypeScript 检查项目引用和类型。
3. 若通过，再执行 `vite build`。
4. Vite 打包生产静态资源。

**变量与引用变化：**

这一节主要是工具链，不关注运行时变量引用变化。关键是：TypeScript type 不进入浏览器运行时，Vite 配置也不是 React component。

**为什么会得到这个结果：**

因为 package scripts 明确把开发、构建、检查分给了不同工具。理解 scripts 是定位错误来源的第一步。

**对比情况：**

TypeScript 错误不等于 React runtime 错误。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: TypeScript type error</span>
  </div>

```ts
const count: number = "1";
```
</div>

这个错误在 TypeScript 检查阶段就应该被发现；它不是 React DOM 渲染阶段才发现的问题。

**常见错误为什么错：**

常见错误：以为加了 TypeScript 类型后，浏览器运行时会自动验证数据。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: TypeScript runtime boundary mistake</span>
  </div>

```ts
type User = {
  name: string;
};

const user = JSON.parse('{"name": 123}') as User;

console.log(user.name.toUpperCase());
```
</div>

错误类型：runtime error risk caused by unchecked external data。

违反的规则：TypeScript type assertion 不做运行时验证。`as User` 只是告诉类型检查器如何看待这个值。

修正方向：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: TypeScript runtime boundary correction</span>
  </div>

```ts
type User = {
  name: string;
};

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    typeof value.name === "string"
  );
}

const parsedValue: unknown = JSON.parse('{"name": 123}');

if (isUser(parsedValue)) {
  console.log(parsedValue.name.toUpperCase());
}
```
</div>

识别方法：数据来自 network、storage、URL、JSON、用户输入时，不要把 TypeScript 类型当运行时验证。

**与真实项目的关系：**

真实项目定位 bug 时，先判断错误属于哪一层：

- Terminal 里 `tsc` 报错：TypeScript 检查。
- Terminal 里 Vite transform 报错：工具链转换。
- Browser console 运行时报错：JavaScript / React runtime / DOM API。
- 页面显示不对但无错误：React 数据到 UI 映射或 CSS 问题。

**与当前学习路径的关系：**

React 学习不只是背 API，还要能区分“框架运行时”和“工具链”。这个能力会让后续调试更快。

**最终记忆模型：**

TypeScript 在运行前检查，Vite 在开发/构建阶段转换和打包，React 在浏览器运行时组织 UI，浏览器执行最终 JavaScript 并维护 DOM。

### 9.7 React 和 HTML / CSS / JavaScript、Next.js、React Native 的关系

**结论：**

React 建立在 HTML、CSS、JavaScript 和浏览器 DOM 之上；React 不等于 Next.js，也不等于 React Native。Next.js 是 React 上层的 full-stack framework，React Native 是面向 native UI 的 renderer / platform integration。

**本节解决的问题：**

本节解决“学 React 是不是就等于学 Next.js 或移动端开发”的混淆。当前项目是 Vite + React DOM 的 browser app，不是 Next.js app，也不是 React Native app。

**技术意义：**

React core 提供 component、rendering model 和相关 API。不同 renderer 把 React tree 渲染到不同平台：

- `react-dom` 渲染到 browser DOM。
- React Native 渲染到 native platform UI。
- Next.js 是基于 React 的 framework，它加入 routing、server rendering、data fetching、deployment conventions 等能力。

**概念解释：**

React 与三大 Web 基础的关系：

- HTML：React DOM 最终创建或更新 HTML DOM element。
- CSS：React 不替代 CSS；你仍然写 class、selector、layout、color、responsive rules。
- JavaScript：React component 是 JavaScript function，事件处理、数组、对象、模块、闭包仍然是 JavaScript 知识。

React 与 Next.js 的关系：

- React 是 UI library。
- Next.js 是基于 React 的 framework。
- Next.js 会定义路由、服务器/客户端边界、数据获取等规则。
- 当前项目没有 Next.js 文件系统路由或 server components。

React 与 React Native 的关系：

- React Native 使用 React 的 component 思路。
- React Native 目标不是 browser DOM。
- React Native 使用 native UI primitives，不是普通 HTML tags。

**边界：语法、运行时、对象模型、类型系统、框架约定与平台 API：**

| Technology | Main Layer |
| --- | --- |
| HTML | document structure / browser platform |
| CSS | visual styling / browser platform |
| JavaScript | runtime language |
| TypeScript | compile-time type system |
| React | UI runtime / component model |
| React DOM | browser DOM renderer |
| Vite | tooling |
| Next.js | React framework |
| React Native | native renderer / platform integration |

**底层机制：**

当前项目运行时只涉及 browser renderer。`react-dom/client` 创建 root 后，把 React tree 维护在 `#root` DOM node 内。没有 Next.js 的 server runtime，也没有 React Native 的 native bridge。

**API / 语法规则：**

本节没有新的 API，重点是边界。

**固定属性名 / 固定方法名 / 参数签名：**

本节只需要记住包名边界：

- `react`
- `react-dom`
- `vite`
- `typescript`
- `next`
- `react-native`

当前项目没有 `next` 和 `react-native` 依赖。

**当前项目边界结构：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">当前项目边界</span>
  </div>

```txt
vite_ts/
  index.html
  src/
    main.tsx
    App.tsx
```
</div>

**示例代码：**

当前项目的 Web DOM renderer import：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: React DOM client import</span>
  </div>

```tsx
import { createRoot } from "react-dom/client";
```
</div>

这行说明当前项目使用的是 React DOM client renderer。

**逐行解释：**

- `react-dom/client` 是 Web client renderer 入口。
- `createRoot` 针对 browser DOM node 创建 React root。
- 如果是 Next.js 项目，入口和路由规则通常由 Next.js framework 接管。
- 如果是 React Native 项目，渲染目标不是 `document.getElementById("root")`。

**运行方式：**

当前项目运行方式仍是：

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

**预期输出：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Runtime Target</span>
  </div>

```txt
Browser DOM app served by Vite
```
</div>

**执行过程：**

1. Vite serves browser app.
2. Browser loads `index.html` and module scripts.
3. React DOM renders into `#root`.
4. HTML and CSS are interpreted by browser.
5. JavaScript runs in browser runtime.

**变量与引用变化：**

本节没有新的变量引用变化。

**为什么会得到这个结果：**

因为当前项目依赖和入口都指向 Vite + React DOM，而不是 Next.js 或 React Native。

**对比情况：**

Next.js 中你通常不会手写同样的 `createRoot(document.getElementById("root"))` 入口：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: Next.js structure contrast</span>
  </div>

```txt
app/
  page.tsx
  layout.tsx
```
</div>

这是 Next.js App Router 风格的目录，不属于当前项目。

**常见错误为什么错：**

常见错误：看到 React 官方推荐 framework，就以为学习 React 必须立刻切到 Next.js。

错误原因：React 官方文档会针对生产 app 推荐 framework，但也说明如果只是学习 React app 基础，可以从 build tool 开始。当前学习项目已经是 Vite + React + TypeScript，所以第一章应先理解这个边界，不引入 Next.js。

识别方法：看 `package.json` 和目录结构。如果没有 `next` dependency、没有 `app/` 或 `pages/` route 结构，就不要按 Next.js 规则解释当前项目。

**与真实项目的关系：**

真实工程中，React 可以出现在不同环境：Vite SPA、Next.js full-stack app、React Native app、旧页面局部嵌入。定位项目边界时先看依赖、入口文件、构建命令和运行平台。

**与当前学习路径的关系：**

本章只学习当前 Vite browser app。以后再学 Next.js 时，需要重新学习 server/client boundary、routing、data fetching 等上层规则。

**最终记忆模型：**

React 是 UI library；React DOM 是 browser renderer；Next.js 是 React framework；React Native 是 native renderer。当前项目是 Vite + React DOM browser app。

## 10. API / 语法索引

| API / Syntax | Layer | Meaning | Common Mistake |
| --- | --- | --- | --- |
| `function App()` | JavaScript syntax / React convention | 定义 root function component。 | 写成小写 `app` 后在 JSX 中不能作为 custom component 正常使用。 |
| `return <main />` | JSX syntax | 返回 UI 描述。 | 以为返回的是浏览器原生 HTML。 |
| `{expression}` | JSX syntax | 在 JSX 中插入 JavaScript expression。 | 放入普通 object，导致 React child 错误。 |
| `className` | JSX / React DOM | 对应 HTML class。 | 从 HTML 复制 `class`。 |
| `htmlFor` | JSX / React DOM | 对应 label 的 HTML `for` attribute。 | 从 HTML 复制 `for`。 |
| `.tsx` | TypeScript tooling | 包含 JSX 的 TypeScript 文件扩展名。 | 在 `.ts` 文件中写 JSX。 |
| `jsx: "react-jsx"` | TypeScript config | 使用 React automatic JSX runtime 形式。 | 以为浏览器直接执行 JSX。 |
| `document.getElementById("root")` | DOM API | 查找 HTML 中的 root element。 | 忽略可能返回 `null`。 |
| `createRoot(domNode)` | React DOM API | 创建 React root。 | 传入 `null` 或错误 DOM node。 |
| `root.render(reactNode)` | React DOM API | 渲染 React node。 | 把第二个参数传给 `render`。 |
| `<StrictMode>` | React component | 开发阶段辅助检查。 | 把开发环境行为误判为生产环境行为。 |
| `import App from "./App"` | JavaScript module syntax | 导入 component function。 | 路径、默认导出、命名导出混淆。 |
| `npm run dev` | Vite tooling | 启动开发服务器。 | 以为它是 React API。 |
| `npm run build` | TypeScript + Vite tooling | 类型检查并打包。 | 把 build 报错都归因于 React runtime。 |

## 11. 常见错误表

| Error | Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| `Property 'heigth' does not exist...` | TypeScript type error | 对象属性名不符合类型推断结果。 | 改成正确属性名或修正类型。 | Terminal 或 editor 在运行前提示。 |
| `Target container is not a DOM element` | React DOM runtime error | `createRoot` 需要真实 DOM element。 | 检查 `index.html` 的 `id` 和 `getElementById` 参数。 | Browser console 出现 root/container 相关错误。 |
| `Objects are not valid as a React child` | React runtime error | JSX child 不能直接渲染普通 object。 | 渲染 object 的具体属性。 | JSX `{}` 中放了 object。 |
| `Cannot find module './App'` | Tooling / module resolution | import 路径不正确或文件不存在。 | 检查文件路径、扩展名、默认导出。 | Vite terminal 或 browser overlay 提示 module 解析失败。 |
| JSX uses `class` | JSX attribute error | JSX 使用 `className`。 | 改成 `className`。 | 从 HTML 复制代码后高亮或 lint 提示。 |
| JSX uses `for` | JSX attribute error | JSX 使用 `htmlFor`。 | 改成 `htmlFor`。 | label/input 代码从 HTML 迁移时出现。 |
| Lowercase custom component | React convention error | Custom component 必须大写开头。 | 改成 PascalCase 并更新 JSX 使用点。 | Component function 没有执行或被当作 DOM tag。 |
| Type assertion hides unsafe JSON | Runtime data error | `as` 不做运行时验证。 | 对外部数据做 runtime guard。 | 数据来自 JSON、network、storage、URL 时特别警惕。 |
| `.ts` file contains JSX | TypeScript syntax/tooling error | TypeScript JSX 文件应使用 `.tsx`。 | 改文件扩展名为 `.tsx`。 | TypeScript parser 报 JSX 语法相关错误。 |
| Build fails before Vite output | TypeScript tooling error | `npm run build` 先执行 `tsc -b`。 | 先修复 TypeScript error。 | build output 在 `vite build` 之前停止。 |

## 12. 最终小项目

### 项目目标

最终小项目：`React Component Rendering Demo`。

目标是用最小 React + TypeScript + Vite 项目展示：

- `index.html` 提供 `#root`。
- `main.tsx` 使用 `createRoot` 启动 React。
- `App.tsx` 用 component 返回 JSX。
- `App.css` 和 `index.css` 说明 React 不替代 CSS。
- TypeScript type 只做检查，不是 runtime 数据验证。

### 为什么适合本章

这个项目只整合第一章机制，不引入 hooks、state、effect、router 或外部库。它让你看清楚“入口、component、JSX、CSS、工具链、浏览器 DOM”的第一层关系。

### 最终小项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终小项目结构</span>
  </div>

```txt
src/
  main.tsx
  App.tsx
  App.css
  index.css
```
</div>

### 文件职责

| File | Responsibility |
| --- | --- |
| `src/main.tsx` | Browser entry module；连接 DOM container 和 React root。 |
| `src/App.tsx` | Root component；展示 component composition 和 JSX。 |
| `src/App.css` | Component-level page styling。 |
| `src/index.css` | Global browser defaults and base styling。 |

### 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/main.tsx</span>
  </div>

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Root element was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/App.tsx</span>
  </div>

```tsx
import "./App.css";

type DemoSection = {
  title: string;
  layer: string;
  explanation: string;
};

const sections: DemoSection[] = [
  {
    title: "Component",
    layer: "React runtime and convention",
    explanation: "A component is a JavaScript function that returns a UI description.",
  },
  {
    title: "JSX",
    layer: "Syntax and tooling",
    explanation: "JSX is transformed before the browser runs the app.",
  },
  {
    title: "DOM",
    layer: "Browser platform API",
    explanation: "React DOM updates real browser nodes inside the root element.",
  },
];

function DemoCard({ title, layer, explanation }: DemoSection) {
  return (
    <article className="demo-card">
      <span>{layer}</span>
      <h2>{title}</h2>
      <p>{explanation}</p>
    </article>
  );
}

export default function App() {
  return (
    <main className="demo-page">
      <section className="hero-panel" aria-labelledby="page-title">
        <p className="eyebrow">React Component Rendering Demo</p>
        <h1 id="page-title">React describes UI with components</h1>
        <p className="intro">
          This demo shows the first boundary: TypeScript checks the source,
          Vite serves and builds it, React renders components, and the browser
          displays DOM and CSS.
        </p>
      </section>

      <section className="card-grid" aria-label="Rendering layers">
        {sections.map((section) => (
          <DemoCard
            explanation={section.explanation}
            key={section.title}
            layer={section.layer}
            title={section.title}
          />
        ))}
      </section>
    </main>
  );
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/App.css</span>
  </div>

```css
.demo-page {
  width: min(1040px, 100%);
  margin: 0 auto;
  padding: 48px 24px;
}

.hero-panel {
  display: grid;
  gap: 14px;
  margin-bottom: 28px;
}

.eyebrow {
  margin: 0;
  color: #28715f;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-panel h1 {
  max-width: 760px;
  margin: 0;
  color: #172033;
  font-size: clamp(2.2rem, 6vw, 4rem);
  line-height: 1;
}

.intro {
  max-width: 760px;
  margin: 0;
  color: #4c5870;
  font-size: 1.05rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.demo-card {
  display: grid;
  gap: 10px;
  padding: 18px;
  border: 1px solid #d7dde8;
  border-radius: 8px;
  background: #ffffff;
}

.demo-card span {
  color: #65728a;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.demo-card h2 {
  margin: 0;
  color: #172033;
}

.demo-card p {
  margin: 0;
  color: #4c5870;
}

@media (max-width: 760px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/index.css</span>
  </div>

```css
:root {
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  color: #172033;
  background: #f5f7fb;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
}
```
</div>

### 运行方式

如果你把这些代码替换到对应 `src` 文件中，运行：

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

构建检查：

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

### 预期输出或交互结果

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Browser UI</span>
  </div>

```txt
React Component Rendering Demo
React describes UI with components
Component
JSX
DOM
```
</div>

### 核心执行流程

1. `index.html` 创建 `#root` 并加载 `/src/main.tsx`。
2. Vite 处理 `main.tsx` 的 TSX、CSS 和 module imports。
3. `main.tsx` 读取 DOM 中的 root element。
4. `createRoot(rootElement)` 创建 React root。
5. `render(<App />)` 让 React 开始渲染 root component。
6. `App()` 返回页面结构。
7. `sections.map(...)` 为每个 section 返回一个 `DemoCard`。
8. React DOM 把结果提交到真实 DOM。
9. Browser 应用 `index.css` 和 `App.css`。

### 常见错误

| Error | Why It Happens | Fix |
| --- | --- | --- |
| `Root element was not found.` | `index.html` 中没有 `id="root"`。 | 检查 `index.html`。 |
| `Cannot find module './App'` | import 路径和文件名不匹配。 | 检查 `src/App.tsx` 是否存在。 |
| `Property ... is missing` | `DemoCard` 需要完整 `DemoSection` props。 | 补全 `title`、`layer`、`explanation`。 |
| Page has no styling | CSS import 缺失。 | 检查 `import "./App.css"` 和 `import "./index.css"`。 |
| JSX syntax error | 标签未闭合或 attribute 写法错误。 | 检查 JSX 规则。 |

### 可选扩展

只允许做与第一章机制直接相关的扩展：

- 加一个 `Tooling` card，说明 Vite 的职责。
- 加一个 `TypeScript` card，说明类型检查不进入运行时。
- 把 `sections` 移到单独 `src/demoData.ts`，练习 module boundary。

不要在本章扩展 state、effect、router、Next.js、Redux 或 React Native。

## 13. 额外速查表

### 一句话概念总结

React 是用 component 和 JSX 在 JavaScript 中描述 UI 的 library；TypeScript 在运行前检查类型，Vite 转换和打包源码，React DOM 在浏览器运行时把 UI 描述更新到真实 DOM。

### 常用 API 表

| API / Syntax | Layer | Purpose | Required Inputs | Output / Effect | Common Mistake |
| --- | --- | --- | --- | --- | --- |
| `function App()` | JavaScript / React convention | 定义 root component | 无或 props object | 返回 React node | 小写命名 |
| `<App />` | JSX | 使用 custom component | Component reference | React element description | 忘记 import |
| `{value}` | JSX | 插入 JavaScript expression | 可渲染表达式结果 | 显示动态值 | 插入普通 object |
| `className` | JSX / React DOM | 设置 class | string | DOM class attribute | 写成 `class` |
| `htmlFor` | JSX / React DOM | 关联 label 和 input | string id | DOM for attribute | 写成 `for` |
| `createRoot` | React DOM | 创建 root | DOM element | React root object | 传入 `null` |
| `root.render` | React DOM | 渲染 React node | React node | DOM update | 误传第二个参数 |
| `.tsx` | TypeScript tooling | 允许 TS + JSX | TSX source file | 可被工具解析 | 在 `.ts` 中写 JSX |
| `npm run dev` | Vite tooling | 启动 dev server | installed deps | local dev server | 以为是 React API |
| `npm run build` | TypeScript + Vite | 类型检查并构建 | valid project | production assets | 忽略 `tsc -b` 阶段 |

### 相似概念对照表

| Concept A | Concept B | Key Difference | When to Use A | When to Use B |
| --- | --- | --- | --- | --- |
| React | React DOM | React 是 UI library；React DOM 是 Web renderer。 | 写 component 和 UI 逻辑。 | 把 React 渲染到 browser DOM。 |
| JSX | HTML | JSX 是源码语法扩展；HTML 是浏览器文档语言。 | 在 component 中描述 UI。 | 写 `index.html` 或静态文档结构。 |
| TypeScript type | JavaScript value | Type 运行前被擦除；value 在运行时存在。 | 检查代码正确性。 | 执行业务逻辑和 UI 渲染。 |
| Vite | React | Vite 是工具链；React 是 UI runtime。 | 开发服务器、HMR、构建。 | component rendering。 |
| Component tree | DOM tree | Component tree 是 React 模型；DOM tree 是浏览器模型。 | 理解 UI 组合。 | 理解浏览器实际节点。 |
| Next.js | React | Next.js 是上层 framework；React 是基础 UI library。 | 需要 routing / server / framework conventions。 | 学习 component model 或构建 Vite SPA。 |
| React Native | React DOM | React Native 渲染 native UI；React DOM 渲染 browser DOM。 | 移动端 native app。 | Web browser app。 |

### 错误类型表

| Error | Error Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| `class` in JSX | JSX attribute | JSX uses `className` | Use `className` | Copied HTML into TSX |
| `for` in JSX | JSX attribute | JSX uses `htmlFor` | Use `htmlFor` | Label/input code copied from HTML |
| `createRoot(null)` | Runtime | Root must be DOM element | Check `id="root"` | Root/container error |
| Lowercase component | React convention | Custom components must be capitalized | Use PascalCase | Component not called |
| Object as child | React runtime | Plain object is not renderable child | Render a property | JSX `{}` contains object |
| Unsafe `as` | TypeScript / runtime boundary | Assertion is not validation | Validate unknown data | Data comes from external source |

### 真实项目使用表

| Scenario | Why It Appears | Mechanism Used | Risk | Practical Rule |
| --- | --- | --- | --- | --- |
| App entry setup | Every browser React app needs a root | `createRoot` + `render` | Wrong root id breaks startup | Keep `index.html` and `main.tsx` aligned |
| Component extraction | UI grows beyond one file | JavaScript module + component | Over-splitting too early | Extract when it improves clarity |
| JSX attributes | JSX is not raw HTML | JSX transform | Copy-paste HTML errors | Convert HTML attributes carefully |
| TypeScript props | Component inputs need constraints | Type checking | Thinking types validate runtime data | Use runtime checks for external data |
| CSS import | Vite supports importing CSS | Module graph | Missing styles | Keep CSS imports near entry or component |
| Build failure | `build` runs `tsc -b` first | TypeScript project references | Misreading TS error as React bug | Read first failing tool output |

### 最小代码模板

### Root 入口模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: root entry</span>
  </div>

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Root element was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```
</div>

适合当前 Vite + React DOM browser app。不要把它当作 Next.js 或 React Native 入口模板。

### 基础组件模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: basic component</span>
  </div>

```tsx
export default function App() {
  return (
    <main>
      <h1>Hello React</h1>
      <p>A component returns a UI description.</p>
    </main>
  );
}
```
</div>

适合解释第一章 component 模型。不要在这里加入 state 或 effect。

### 带类型的展示组件模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: typed display component</span>
  </div>

```tsx
type InfoPanelProps = {
  title: string;
  description: string;
};

export default function InfoPanel({ title, description }: InfoPanelProps) {
  return (
    <section>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
```
</div>

适合演示 TypeScript 如何检查 component 输入。不要误以为 `InfoPanelProps` 会在浏览器运行时验证外部数据。

## 14. 最终文件清单

本次实际创建或建议最终保留的文件如下。资料来源、配置文件和概念示例不列入最终文件清单。

| File | Role | Status |
| --- | --- | --- |
| `docs/react/chapter-01-react-introduction/react-chapter-01-learning-guide.md` | 本章学习指导文件。 | 已创建并保留。 |
| `src/main.tsx` | 最终小项目练习的 React root 入口。 | 仅在执行第 12 节练习时替换；本次未修改。 |
| `src/App.tsx` | 最终小项目练习的 root component。 | 仅在执行第 12 节练习时替换；本次未修改。 |
| `src/App.css` | 最终小项目练习的 component-level 样式。 | 仅在执行第 12 节练习时替换；本次未修改。 |
| `src/index.css` | 最终小项目练习的全局样式。 | 仅在执行第 12 节练习时替换；本次未修改。 |

不需要创建这些概念示例文件：

- `manual-dom-example.ts`
- `wrong-model.tsx`
- `correct-model.tsx`
- `object-child-mistake.tsx`
- `object-child-correct.tsx`
- `LearningCard.tsx`
- `lowercase-component-mistake.tsx`
- `capitalized-component.tsx`
- `jsx-input.tsx`
- `html-in-jsx-mistake.tsx`
- `html-in-jsx-correct.tsx`
- `root-mistake.tsx`
- `root-correct.tsx`
- `type-error-example.ts`
- `runtime-type-mistake.ts`
- `runtime-type-correct.ts`
- `InfoPanel.tsx`

## 15. 如何转换成个人笔记

建议用四栏笔记法整理本章：

| Question | Your Answer | Code Evidence | Boundary |
| --- | --- | --- | --- |
| React 是什么？ | 用自己的话写一句话。 | `App.tsx` component。 | React runtime。 |
| JSX 是什么？ | 写出“不是浏览器原生语法”。 | `.tsx` + `jsx: "react-jsx"`。 | Syntax / tooling。 |
| app 从哪里启动？ | 写出 `index.html -> main.tsx -> createRoot -> App`。 | `index.html`, `main.tsx`。 | Browser + React DOM。 |
| TypeScript 做什么？ | 写出“运行前检查，类型擦除”。 | `tsconfig.app.json`。 | Type system / tooling。 |

学习时不要只复制代码。每段代码至少回答：

- 哪些行是 JavaScript runtime？
- 哪些行是 TypeScript type system？
- 哪些行是 React convention？
- 哪些行依赖 browser DOM API？
- 哪些行依赖 Vite tooling？

## 16. 必须能回答的问题

学完本章后，必须能回答：

1. React 是什么，不是什么？
2. React 为什么能减少手写 DOM 更新的复杂度？
3. React component 为什么可以说是 JavaScript function，但又不只是普通业务函数？
4. JSX 为什么看起来像 HTML，但不是 HTML？
5. `.tsx` 和 `.ts` 的关键区别是什么？
6. 当前项目为什么需要 `react-dom/client`？
7. `createRoot(document.getElementById("root")!)` 中每一层分别属于什么？
8. `!` 是运行时检查吗？为什么不是？
9. Vite 在 `npm run dev` 中做什么？
10. `npm run build` 为什么先跑 `tsc -b`？
11. TypeScript 类型在浏览器运行时还存在吗？
12. React 和 HTML/CSS/JavaScript 是替代关系还是协作关系？
13. 为什么 React 不等于 Next.js？
14. 为什么 React DOM 不等于 React Native？
15. 如果页面空白，应该按什么顺序检查入口、DOM root、module import、React render 和 browser console？

## 17. 最终记忆模型

本章最终要记住的模型：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终记忆模型</span>
  </div>

```txt
index.html
  -> browser creates document and #root
  -> Vite serves /src/main.tsx
  -> TypeScript checks TSX before runtime
  -> JSX is transformed into JavaScript
  -> React DOM creates a root
  -> React calls App and child components
  -> Components return UI descriptions
  -> React DOM updates real browser DOM
  -> CSS styles the rendered DOM
```
</div>

最短版本：

React component 用 JavaScript 描述 UI；Vite 和 TypeScript 让源码能被检查和转换；React DOM 把描述同步到浏览器 DOM；浏览器最终只运行 JavaScript、HTML、CSS 和 Web APIs。

## 18. 官方文档阅读清单

推荐按这个顺序读官方文档：

1. React: [Describing the UI](https://react.dev/learn/describing-the-ui)
   - 重点看 React 是 UI library、UI 可以拆成 reusable / nestable components。
2. React: [Your First Component](https://react.dev/learn/your-first-component)
   - 重点看 component 是 JavaScript function、component 名称必须大写开头、component 如何组合。
3. React: [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
   - 重点看 JSX 是 JavaScript syntax extension、React 为什么把 rendering logic 和 markup 放在一起、JSX 与 HTML 的差异。
4. React DOM: [createRoot](https://react.dev/reference/react-dom/client/createRoot)
   - 重点看 `createRoot(domNode)`、`root.render(reactNode)`、一个 React app 通常如何接入 DOM。
5. React: [`<StrictMode>`](https://react.dev/reference/react/StrictMode)
   - 只需要知道当前项目入口使用它做开发辅助检查，本章不深入 Strict Mode 行为。
6. React: [Creating a React App](https://react.dev/learn/creating-a-react-app)
   - 重点看 React 与 framework 的关系，以及从 build tool 学 React app basics 的边界。
7. React: [Using TypeScript](https://react.dev/learn/typescript)
   - 重点看 `.tsx`、`@types/react`、TypeScript 与 React component 的关系。
8. TypeScript Handbook: [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)
   - 重点看 JSX 要转换成 JavaScript、`.tsx`、`jsx` compiler option。
9. TypeScript Handbook: [TypeScript for the New Programmer](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
   - 重点看 static type checking、runtime behavior preservation、erased types。
10. TypeScript TSConfig Reference: [`jsx`](https://www.typescriptlang.org/tsconfig/#jsx)
    - 重点看 `react-jsx` emit 的意义。
11. MDN: [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
    - 重点看 DOM 是 browser Web API，不是 JavaScript core language，也不是 React。
12. MDN: [`Document.getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
    - 重点看它可能找不到 element，和 `main.tsx` 的 root lookup 对应。
13. MDN: [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
    - 重点看 `import` / `export` 如何连接文件。
14. Vite: [Getting Started](https://vite.dev/guide/)
    - 重点看 Vite 是 dev server + build command，`index.html` 是入口，Vite 处理 module graph。

本地辅助资料：

- `references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf`
  - 参考了 `Hello React`、`Setting up a React Project`、`Meet the React Component`、`React JSX`、`React DOM` 相关章节。
  - 该 PDF 使用 `App.jsx` 示例较多；当前项目是 TypeScript + TSX，因此本章以当前项目结构和官方文档为准，没有机械照搬书中目录或 `.jsx` 写法。

Verification Needed：

- 官方 Vite 网站当前显示的是 Vite v8 文档，而当前项目 `package.json` 使用 `vite` `^7.2.4`。本章只使用 Vite 入口、dev server、build、module graph 这些稳定概念；如果后续写 Vite 版本敏感章节，应按当前项目安装版本或 Vite v7 文档再次核对。
- 本章 mini project 是文档示例，没有实际替换当前 `src` 文件运行。若用于练习，应手动替换后运行 `npm run build` 验证。
