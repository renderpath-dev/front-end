# React 第二章：JSX 基础、组件基础与真实练习文件组织

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

- [本章机制地图](#本章机制地图)
- [0. 本章工程问题与边界](#0-本章工程问题与边界)
- [1. 本章解决的问题](#1-本章解决的问题)
- [2. 前置概念](#2-前置概念)
- [3. 学习目标](#3-学习目标)
- [4. 机制依赖图](#4-机制依赖图)
- [5. 核心术语表](#5-核心术语表)
- [6. 底层心智模型](#6-底层心智模型)
- [7. 推荐目录结构](#7-推荐目录结构)
- [8. 示例运行方式](#8-示例运行方式)
- [9. 分节教学与练习](#9-分节教学与练习)
  - [9.1 JSX 是源码层 UI 描述语法](#91-jsx-是源码层-ui-描述语法)
  - [9.2 JSX attribute 与 HTML attribute 的差异](#92-jsx-attribute-与-html-attribute-的差异)
  - [9.3 JSX child 的可渲染值边界](#93-jsx-child-的可渲染值边界)
  - [9.4 自定义组件为什么必须大写开头](#94-自定义组件为什么必须大写开头)
  - [9.5 Component file 的命名、导入、导出与组合](#95-component-file-的命名导入导出与组合)
  - [9.6 TypeScript 在 TSX 中检查什么](#96-typescript-在-tsx-中检查什么)
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
- [14. 工程迁移与代码审查要点](#14-工程迁移与代码审查要点)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章机制地图

这张表只保留能帮助理解机制的工程路径；它不是文件盘点，也不记录文件状态。

| Mechanism | Owner / Boundary | Runtime Layer | Project Scenario | Source Reading Path |
| --- | --- | --- | --- | --- |
| JSX expression slot | JavaScript expressions are evaluated before React receives children or props. | JavaScript runtime plus JSX transform | Product labels, prices, and badges are inserted through expression positions. | `src/learning/react/chapter-02-jsx-and-components/jsx-source-boundary/jsx-expression-values.tsx` |
| JSX attribute boundary | Attributes become prop values and must follow JavaScript value rules. | JSX transform | Static and dynamic card attributes show where strings differ from expressions. | `src/learning/react/chapter-02-jsx-and-components/jsx-source-boundary/jsx-attribute-boundary.tsx` |
| Renderable children | React decides which values can become UI children. | React render runtime | Invalid object children are rejected before they can become DOM text. | `src/learning/react/chapter-02-jsx-and-components/jsx-source-boundary/jsx-child-values.tsx` |
| Component composition | Capitalized functions become custom React components. | React component model | Small UI pieces are assembled without hiding the module boundary. | `src/learning/react/chapter-02-jsx-and-components/component-basics/component-module-composition.tsx` |

## 0. 本章工程问题与边界

本章解决的工程困惑是：JSX 看起来像 HTML，但它实际是 JavaScript 表达式和 React element 描述的组合。组件函数不是模板文件，它们是返回 UI 描述的 JavaScript 函数。

本章不讨论 state、effect、form 或路由，也不引入 UI 库抽象。边界是把 JSX 的表达式位置、属性规则、children 可渲染值和组件命名规则讲清楚。

## 1. 本章解决的问题

第一章之后，学习者通常会遇到两个问题。

第一个问题是语法边界不清：JSX 看起来像 HTML，但它是 JavaScript / TypeScript 源码层的 UI 描述语法。浏览器不原生执行 JSX，TypeScript 也不会把类型带到运行时。你必须知道 `{}` 中能放什么、attribute 为什么写成 `className` / `htmlFor`、children 为什么不能直接渲染普通 object。

第二个问题是练习文件组织失控：很多教程把所有内容都堆进 `App.tsx`，初期很快，后期复习困难。第二章开始，真实练习应该使用有意义的目录和文件名。看到 `jsx-expression-values.tsx`，你应该立刻知道它练的是 JSX expression；看到 `component-module-composition.tsx`，你应该知道它练的是组件导入、导出和组合。

本章的核心结论：

React 的 JSX 是“源码层的 UI 描述语法”；function component 是 JavaScript function，但在 React 中必须遵守组件命名、返回值、组合和渲染约定；第二章开始应把真实练习放到按概念分组的目录里，而不是长期依赖 `App.tsx` 承载所有知识点。

## 2. 前置概念

| Concept | Why It Is Required |
| --- | --- |
| JavaScript expression | JSX `{}` 只能放表达式，不能直接放 statement。 |
| JavaScript object | JSX attribute、component props、style object 都依赖 object 模型。 |
| JavaScript module | Component file 通过 `import` / `export` 组合。 |
| HTML attribute | 理解 JSX attribute 差异必须先知道 HTML attribute。 |
| DOM attribute / property | React DOM 把 JSX props 转换为真实 DOM attribute / property 更新。 |
| TypeScript type checking | TSX 中的 component 输入、attribute、children 会被 TypeScript 检查。 |
| React component | Component 是 React 组织 UI 的核心单位。 |
| Vite module graph | 新增 TSX 文件需要被 import，Vite 才会纳入模块图。 |

## 3. 学习目标

学完本章后，你应该能做到：

- 解释 JSX 为什么不是浏览器原生 HTML。
- 判断 JSX `{}` 中哪些值可渲染，哪些值不可渲染。
- 写出 `className`、`htmlFor`、`style`、boolean attribute 的正确 TSX 写法。
- 解释 JSX child 的可渲染值边界。
- 解释自定义 component 为什么必须大写开头。
- 定义、导出、导入并组合多个 function component。
- 轻量理解 props 是 component 的输入对象，但不进入系统性 props 章节。
- 说明 TypeScript 在 TSX 中检查什么，以及类型为什么不会进入运行时。
- 设计第二章真实练习文件结构，避免所有练习堆到 `App.tsx`。
- 完成 `JSX Component Gallery` 静态小项目。

## 4. 机制依赖图

这些依赖不是阅读顺序清单，而是本章概念成立的前置关系。

| First Understand | Then Understand | Dependency Reason | Failure If Skipped |
| --- | --- | --- | --- |
| JavaScript expression | JSX expression slot | JSX 中 `{}` 只能接收表达式，不能随意放语句。 | 会把 `if`、`for` 或对象字面量错误地塞进 JSX。 |
| Renderable value rules | Children rendering | React 只接受可渲染值或 element，普通对象不是 DOM 文本。 | 会遇到 object child runtime error 却不知道原因。 |
| Capitalized identifier | Custom component resolution | React 通过首字母区分原生标签和组件引用。 | 会把组件当成小写 DOM tag 渲染。 |
| Module export/import | Component composition | 组件拆分依赖 JavaScript 模块边界。 | 会把所有 JSX 堆进一个文件，无法复用和审查。 |

## 5. 核心术语表

| Term | 中文说明 | Layer | Why It Matters |
| --- | --- | --- | --- |
| JSX | JavaScript / TypeScript 源码层的 HTML-like UI 描述语法 | syntax / tooling | 本章主线，浏览器不原生执行它。 |
| TSX | TypeScript 文件中包含 JSX 的源码形式 | TypeScript syntax / tooling | 当前项目用 `.tsx` 写 React component。 |
| JSX expression | JSX `{}` 中的 JavaScript expression | JavaScript syntax / JSX syntax | 决定动态值如何进入 UI 描述。 |
| JSX attribute | JSX tag 上的属性写法 | JSX syntax / React DOM | 与 HTML attribute 相似但不完全相同。 |
| JSX child | JSX tag 内部的内容 | React runtime / renderable value | 决定什么值可以显示在 UI 中。 |
| Function component | 返回 React node 的 JavaScript function | JavaScript runtime / React convention | 当前项目的组件主形式。 |
| Component composition | 用组件嵌套组件构成 UI tree | React convention | 第二章开始练习组件拆分和组合。 |
| Props | 传给组件的输入对象 | React convention / object model | 本章只作为“组件输入对象”预告。 |
| Intrinsic element | JSX 中小写 tag，例如 `<section>` | React DOM / JSX typing | 会映射到平台 DOM element。 |
| Custom component | JSX 中大写 tag，例如 `<GalleryCard />` | React convention | React 将它当作组件调用。 |
| Type erasure | TypeScript 类型在运行后不存在 | TypeScript tooling | 解释类型检查和运行时行为的边界。 |
| Module boundary | 文件之间通过 `import` / `export` 连接 | JavaScript module system | 支撑真实练习文件组织。 |

## 6. 底层心智模型

本章的心智模型：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">底层心智模型</span>
  </div>

```txt
TSX source file
  -> TypeScript checks JSX and component usage
  -> Vite and React plugin transform JSX
  -> browser runs JavaScript modules
  -> React calls function components
  -> components return React UI descriptions
  -> React DOM updates browser DOM
```
</div>

关键边界：

- JSX 是源码层语法，不是浏览器原生语法。
- JSX `{}` 中放的是 JavaScript expression 的结果。
- JSX attribute 是 React DOM 能理解的 props，不是纯 HTML 字符串复制。
- Function component 是 JavaScript function，但 React 要求大写命名、纯返回 UI 描述、可组合。
- TypeScript 能检查 TSX 写法和 component 输入，但类型不会在浏览器运行时保留。
- Vite 只处理被 import 到模块图中的文件；真实练习文件如果不被入口引用，不会自动显示在页面上。

## 7. 推荐目录结构

本章设计原则：

- 当前 `src/App.tsx` 已经是 Sudoku 应用，包含 `useState`、`useEffect`、`useMemo` 等后续章节内容。第二章不应继续在这个文件里堆 JSX 基础练习。
- 使用 `src/learning/react/chapter-02-jsx-and-components/` 隔离学习练习，避免干扰现有应用。
- 按核心概念分目录，而不是按“第几个例子”命名。
- 文件名必须表达知识点和练习目标。
- 未来章节可以自然扩展到 `chapter-03-props`、`chapter-04-state`、`chapter-05-effects`。

### 当前项目结构

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
  tsconfig.json
  tsconfig.app.json
  tsconfig.node.json
  vite.config.ts
  src/
    main.tsx
    App.tsx
    App.css
    index.css
    leaderboard.ts
    sudoku.ts
    assets/
      react.svg
```
</div>

当前结构说明：

- `src/main.tsx` 是 Vite browser app 的 React root 入口。
- `src/App.tsx` 当前是 Sudoku 应用，不适合作为第二章全部练习文件。
- `src/leaderboard.ts` 和 `src/sudoku.ts` 属于当前应用逻辑，不是本章目标。
- 第二章练习建议新增到 `src/learning/react/chapter-02-jsx-and-components/`，作为学习用代码区。

### 本章文档结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">本章文档结构</span>
  </div>

```txt
docs/
  react/
    chapter-01-react-introduction/
      react-chapter-01-learning-guide.md
    chapter-02-jsx-and-components/
      react-chapter-02-learning-guide.md
```
</div>

### 真实练习结构

本章建议创建下面的真实练习文件。它们不是本次自动创建的源码文件，而是你跟着本章实践时应该创建或替换的文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">真实练习结构</span>
  </div>

```txt
src/
  App.tsx
  learning/
    react/
      chapter-02-jsx-and-components/
        jsx-source-boundary/
          jsx-expression-values.tsx
          jsx-attribute-boundary.tsx
          jsx-child-values.tsx
        component-basics/
          component-name-boundary.tsx
          component-module-composition.tsx
        jsx-component-gallery/
          gallery-topic-data.ts
          gallery-badge.tsx
          gallery-card.tsx
          gallery-section.tsx
          jsx-component-gallery.tsx
          jsx-component-gallery.css
```
</div>

目录设计理由：

- `jsx-source-boundary/`：集中练 JSX 语法、attribute、children，避免和组件拆分问题混在一起。
- `component-basics/`：集中练 component 命名、导入、导出和组合。
- `jsx-component-gallery/`：最终小项目目录，保留完整静态页面实现。
- `src/App.tsx`：只作为把最终小项目挂到当前 Vite app 的入口适配文件，不作为本章知识点堆放区。
- 没有使用 `example.tsx`、`demo.tsx`、`test.tsx`，因为这些名字无法帮助复习。

### 概念示例结构

本章仍会用少量 snippet 解释错误和对比情况。它们不需要创建为真实文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">概念示例结构</span>
  </div>

```txt
Conceptual snippets:
  Snippet: JSX statement mistake
  Snippet: object child mistake
  Snippet: lowercase component mistake
  Snippet: TypeScript erased type boundary
```
</div>

### 最终小项目结构

最终小项目使用 `jsx-component-gallery/` 下的真实文件，并通过 `src/App.tsx` 临时挂载到当前 Vite app。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终小项目结构</span>
  </div>

```txt
src/
  App.tsx
  learning/
    react/
      chapter-02-jsx-and-components/
        jsx-component-gallery/
          gallery-topic-data.ts
          gallery-badge.tsx
          gallery-card.tsx
          gallery-section.tsx
          jsx-component-gallery.tsx
          jsx-component-gallery.css
```
</div>

## 8. 示例运行方式

本次只创建学习指导文档，不自动创建或替换 `src` 练习文件。你实际练习第 12 节代码时，运行：

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

如果只创建了练习文件但没有从 `src/App.tsx` 或其他入口导入它们，Vite 不会把它们显示在页面上。真实运行小项目时，需要按第 12 节替换 `src/App.tsx` 为 thin adapter。

## 9. 分节教学与练习

### 9.1 JSX 是源码层 UI 描述语法

**结论：**

JSX 是 JavaScript / TypeScript 源码层的 UI 描述语法，不是浏览器原生 HTML。浏览器最终执行的是工具链转换后的 JavaScript。

**本节解决的问题：**

本节解决“为什么 `.tsx` 文件里能写 `<section>`，但浏览器又不认识 TSX”的问题。你看到的是开发源码；浏览器看到的是 Vite 和 React 插件处理后的 JavaScript module。

**技术意义：**

JSX 的技术意义是把渲染逻辑和 markup 放在同一个 component 中。React 官方文档强调，交互变复杂后，内容越来越由 JavaScript 逻辑决定，所以 React 把 rendering logic 和 markup 放在 component 内部。

**概念解释：**

JSX 看起来像 HTML，但它更严格：

- component 只能返回一个根节点或一个 Fragment。
- 标签必须闭合。
- 大多数 attribute 使用 camelCase。
- `class` 写成 `className`。
- `for` 写成 `htmlFor`。
- `{}` 中写 JavaScript expression。

**边界：语法、运行时、对象模型、类型系统、框架约定与平台 API：**

| Layer | Boundary |
| --- | --- |
| Syntax | JSX / TSX 是源码语法。 |
| Runtime | 浏览器运行转换后的 JavaScript，不运行 TSX。 |
| Object model | JSX 会变成 React element / React node 描述。 |
| Type system | TypeScript 检查 JSX attribute 和 component 使用方式。 |
| Framework convention | React component 返回 JSX 描述 UI。 |
| Platform API | 最终由 React DOM 更新 browser DOM。 |

**底层机制：**

当前项目 `tsconfig.app.json` 中的 `jsx: "react-jsx"` 表示 TSX 会使用 React automatic JSX runtime 形式处理。Vite 的 React plugin 也参与开发转换和 Fast Refresh。你不需要手写转换过程，但必须知道源码不是浏览器原生语法。

**API / 语法规则：**

- JSX 必须返回一个根。
- JSX tag 必须闭合。
- JSX attribute 使用 React DOM 支持的命名。
- TSX 文件使用 `.tsx` 扩展名。

**固定属性名 / 固定方法名 / 参数签名：**

- `jsx: "react-jsx"`
- `.tsx`
- `className`
- `htmlFor`
- `style`
- `children`

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
  Snippet: JSX statement mistake
  Snippet: JSX transform mental model
```
</div>

**示例代码：**

真实练习文件：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-02-jsx-and-components/jsx-source-boundary/jsx-expression-values.tsx</span>
  </div>

```tsx
const courseName = "React";
const chapterNumber = 2;
const isPracticeReady = true;
const topics = ["JSX", "Components", "TypeScript"];

function formatTopicCount(count: number) {
  return `${count} topics`;
}

export function JsxExpressionValues() {
  return (
    <section className="practice-panel">
      <h2>{courseName}</h2>
      <p>Chapter {chapterNumber}</p>
      <p>{isPracticeReady ? "Practice ready" : "Practice pending"}</p>
      <p>{formatTopicCount(topics.length)}</p>
    </section>
  );
}
```
</div>

**逐行解释：**

- `courseName`、`chapterNumber`、`isPracticeReady`、`topics` 是普通 JavaScript / TypeScript 值。
- `formatTopicCount` 是普通 function，它返回 string。
- `JsxExpressionValues` 是 function component，因为它以大写开头并返回 JSX。
- `{courseName}`、`{chapterNumber}`、`{... ? ... : ...}`、`{formatTopicCount(...)}` 都是 JSX expression。
- TypeScript 检查 `count: number`，但 `number` 类型不会出现在浏览器运行时。

**运行方式：**

这个文件是本章真实练习文件。要显示它，需要在某个已挂载 component 中 import 并渲染它。最终小项目会演示完整挂载方式。

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
Chapter 2
Practice ready
3 topics
```
</div>

**执行过程：**

1. Vite 处理 `.tsx` 模块。
2. TypeScript 检查 `count` 的类型和 JSX 使用方式。
3. React 调用 `JsxExpressionValues()`。
4. 函数返回 UI 描述。
5. React DOM 把文本插入真实 DOM。

**变量与引用变化：**

- 这些值都是静态 module-scope 值。
- component 调用时读取它们，不改变它们。
- JSX `{}` 只读取 expression 结果，不自动保存状态。

**为什么会得到这个结果：**

因为 JSX 中的 `{}` 会进入 JavaScript expression 位置，React 读取表达式结果并把可渲染结果放入 UI 描述。

**对比情况：**

`if` statement 不是 expression，不能直接放在 JSX `{}` 中。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: JSX statement mistake</span>
  </div>

```tsx
export function StatementMistake() {
  return <p>{if (true) "Ready"}</p>;
}
```
</div>

**常见错误为什么错：**

错误类型：JSX syntax error。

违反规则：JSX `{}` 中需要 JavaScript expression，`if` 是 statement。可以改用 ternary expression。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: JSX expression correction</span>
  </div>

```tsx
export function StatementCorrection() {
  return <p>{true ? "Ready" : "Pending"}</p>;
}
```
</div>

识别方法：如果 `{}` 内部像一段“语句流程”，而不是产生一个值，通常不能直接放进 JSX expression。

**与真实项目的关系：**

当前 `src/App.tsx` 中已经大量使用 JSX expression，例如 `{puzzle.displayDate}`、`${completionPercent}%`、`leaderboard.map(...)`。本章只学习 expression 入口，不深入列表渲染和 state。

**与当前学习路径的关系：**

本节为后续 props、state、事件处理打基础，因为这些机制最终都会把 JavaScript 值带进 JSX。

**最终记忆模型：**

JSX `{}` 不是一个“小脚本区域”，而是一个 JavaScript expression 位置。

### 9.2 JSX attribute 与 HTML attribute 的差异

**结论：**

JSX attribute 类似 HTML attribute，但不是纯 HTML 复制。React DOM 会根据 JSX props 更新真实 DOM attribute 或 property。

**本节解决的问题：**

本节解决从 HTML 复制到 JSX 时最常见的问题：`class`、`for`、`style`、boolean attribute 写法不同。

**技术意义：**

React DOM 的 common components 文档说明，所有内置 browser components 都支持若干 common props。JSX attribute 是给 React DOM 的输入，不是浏览器原始 HTML 文本。

**概念解释：**

关键差异：

- `class` -> `className`
- `for` -> `htmlFor`
- `style` 接收 object，不是 CSS string
- boolean attribute 使用 boolean expression
- 大多数 DOM property / event prop 使用 camelCase

**边界：语法、运行时、对象模型、类型系统、框架约定与平台 API：**

| Layer | Boundary |
| --- | --- |
| JSX syntax | attribute 写在 JSX tag 上。 |
| Object model | `style` 是 object，props 也是 object-like 输入。 |
| TypeScript | 检查 `style`、`className`、`htmlFor` 等 prop 类型。 |
| React DOM | 把 props 应用到 DOM。 |
| Browser | 最终看到真实 DOM attribute / property。 |

**底层机制：**

JSX `<label htmlFor="topic">` 被转换成 React element 描述。React DOM 在 commit 时把它映射到浏览器 label 的关联行为。`style={{ color: "red" }}` 中外层 `{}` 进入 JavaScript expression，内层 `{}` 是 object literal。

**API / 语法规则：**

- `className="name"`
- `htmlFor="input-id"`
- `style={{ propertyName: value }}`
- `disabled={condition}`
- `aria-*` 和 `data-*` 通常保留小写连字符形式。

**固定属性名 / 固定方法名 / 参数签名：**

- `className`
- `htmlFor`
- `style`
- `disabled`
- `aria-label`
- `data-*`

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
  Snippet: HTML attribute copied into JSX
  Snippet: style string mistake
```
</div>

**示例代码：**

真实练习文件：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-02-jsx-and-components/jsx-source-boundary/jsx-attribute-boundary.tsx</span>
  </div>

```tsx
const topicInputId = "chapter-topic";
const isInputDisabled = false;

export function JsxAttributeBoundary() {
  return (
    <section className="practice-panel" aria-labelledby="attribute-title">
      <h2 id="attribute-title">JSX attribute boundary</h2>

      <label className="field-label" htmlFor={topicInputId}>
        Topic
      </label>

      <input
        aria-label="Topic name"
        className="text-input"
        data-practice-id="jsx-attribute-boundary"
        disabled={isInputDisabled}
        id={topicInputId}
        style={{ borderColor: "#28715f" }}
        type="text"
        defaultValue="JSX attributes"
      />
    </section>
  );
}
```
</div>

**逐行解释：**

- `topicInputId` 是 JavaScript string，被 `htmlFor` 和 `id` 共享。
- `className` 是 JSX / React DOM prop，最终影响 DOM class。
- `htmlFor` 对应 HTML label 的 `for` 关联。
- `disabled={isInputDisabled}` 传入 boolean，不是 string。
- `style={{ borderColor: "#28715f" }}` 传入 object。
- `aria-label` 和 `data-practice-id` 保持 HTML attribute 风格。

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
JSX attribute boundary
Topic
JSX attributes
```
</div>

**执行过程：**

1. TypeScript 检查 JSX attribute 名称和类型。
2. React 执行 `JsxAttributeBoundary()`。
3. React DOM 创建 label 和 input。
4. Browser 通过 `htmlFor` / `id` 关联 label 和 input。

**变量与引用变化：**

- `topicInputId` 是同一个 string value，被两个 attribute 读取。
- `style` object 是创建 UI 描述时传给 React DOM 的对象。
- 没有 state，也没有 DOM 手写引用。

**为什么会得到这个结果：**

React DOM 理解这些 JSX props，并把它们同步到真实 DOM。浏览器最终处理 label/input、style、disabled 等平台行为。

**对比情况：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: HTML attribute copied into JSX</span>
  </div>

```tsx
export function AttributeMistake() {
  return (
    <label for="topic" class="field-label">
      Topic
    </label>
  );
}
```
</div>

**常见错误为什么错：**

错误类型：JSX / React DOM prop error。

违反规则：JSX 中 label 关联使用 `htmlFor`，CSS class 使用 `className`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: JSX attribute correction</span>
  </div>

```tsx
export function AttributeCorrection() {
  return (
    <label className="field-label" htmlFor="topic">
      Topic
    </label>
  );
}
```
</div>

识别方法：从 HTML 复制代码到 TSX 后，优先检查 `class`、`for`、`style` 和 boolean attribute。

**与真实项目的关系：**

当前 Sudoku `App.tsx` 已经使用 `className`、`aria-label`、`aria-selected`、`disabled`。本章把这些写法抽出来单独练习，避免直接在复杂 Sudoku 逻辑中学习。

**与当前学习路径的关系：**

后续 props 章节会系统学习组件输入。本节先把内置 DOM element 的 attribute 边界讲清楚。

**最终记忆模型：**

JSX attribute 是 React DOM 的 props 输入；写法接近 HTML，但规则属于 JSX + React DOM。

### 9.3 JSX child 的可渲染值边界

**结论：**

JSX child 可以渲染 string、number、React element、array 中的可渲染项、`null` / `undefined` / boolean 的“空结果”；不能直接渲染普通 object。

**本节解决的问题：**

本节解决“为什么 `{user}` 报错但 `{user.name}` 正常”的问题。JSX `{}` 可以执行 JavaScript expression，但 expression 的结果还必须是 React 能作为 child 处理的值。

**技术意义：**

JSX child 是 React 生成 UI tree 的一部分。React 需要知道每个 child 如何变成 DOM 文本、DOM element 或空内容。

**概念解释：**

常见可渲染 child：

- string
- number
- JSX element
- array of renderable values
- `null`
- `undefined`
- `true` / `false`

不可直接渲染：

- 普通 object
- function object
- symbol

**边界：语法、运行时、对象模型、类型系统、框架约定与平台 API：**

| Layer | Boundary |
| --- | --- |
| JSX syntax | `{value}` 是合法语法。 |
| JavaScript runtime | `value` 会求值。 |
| React runtime | 求值结果必须是可渲染 child。 |
| TypeScript | 某些 child 类型可被检查，但 runtime 数据仍可能出错。 |
| Browser | 只看到最终 DOM 文本或 element。 |

**底层机制：**

React 执行 component 后得到 child 值。string 和 number 可变成 text node；React element 可递归处理；`null` 等空值不产生 DOM；普通 object 没有明确 UI 表达方式，因此不能直接作为 child。

**API / 语法规则：**

本节没有新的 API，重点是 React child 的运行时边界。

**固定属性名 / 固定方法名 / 参数签名：**

- `children`
- `ReactNode`
- `ReactElement`

本章只认识这些术语，不深入类型定义。

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
  Snippet: object child mistake
  Snippet: object child correction
```
</div>

**示例代码：**

真实练习文件：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-02-jsx-and-components/jsx-source-boundary/jsx-child-values.tsx</span>
  </div>

```tsx
const learner = {
  name: "Mia",
  role: "React learner",
};

const skills = ["JSX", "Components", "TypeScript"];

export function JsxChildValues() {
  return (
    <section className="practice-panel">
      <h2>{learner.name}</h2>
      <p>{learner.role}</p>
      <p>{skills.length}</p>
      <p>{null}</p>
      <p>{false}</p>
      <div>
        {skills.map((skill) => (
          <span className="skill-pill" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
```
</div>

**逐行解释：**

- `learner` 是 object，但 JSX 中只渲染 `learner.name` 和 `learner.role`。
- `skills.length` 是 number，可以渲染。
- `{null}` 和 `{false}` 不产生可见 DOM 文本。
- `skills.map(...)` 返回 React elements array。
- `key={skill}` 是数组渲染时用于标识元素的值。本章只轻微出现，不深入列表章节。

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
Mia
React learner
3
JSX Components TypeScript
```
</div>

**执行过程：**

1. React 调用 `JsxChildValues()`。
2. 读取 object 属性和 array 长度。
3. 对 `skills` 执行 `map`，得到 React element array。
4. `null` 和 `false` 被当作空内容处理。
5. React DOM 提交文本和 `span` 元素。

**变量与引用变化：**

- `learner` object 没有被改变。
- `skills.map` 创建新 array，不改变原 array。
- React element 是 UI 描述，不是真实 DOM node。

**为什么会得到这个结果：**

React child 渲染的是 expression 结果。object 属性是 string，可渲染；object 本身没有默认 UI 表示，不能直接渲染。

**对比情况：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: object child mistake</span>
  </div>

```tsx
const learner = {
  name: "Mia",
};

export function ObjectChildMistake() {
  return <p>{learner}</p>;
}
```
</div>

**常见错误为什么错：**

错误类型：React runtime error。

违反规则：普通 object 不是可渲染 child。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: object child correction</span>
  </div>

```tsx
const learner = {
  name: "Mia",
};

export function ObjectChildCorrection() {
  return <p>{learner.name}</p>;
}
```
</div>

识别方法：看到 “Objects are not valid as a React child” 一类错误时，检查 JSX `{}` 中是否直接放了 object。

**与真实项目的关系：**

当前 Sudoku 项目中，`board.map(...)` 返回按钮数组，`value` 是 number 或 null。它依赖的正是 child 可渲染值边界。

**与当前学习路径的关系：**

后续 props、state、列表渲染都会遇到 child 边界。第二章先建立“能放进 `{}` 不等于能渲染”的判断。

**最终记忆模型：**

JSX child 要看两个问题：语法上能否求值，React 运行时能否渲染求值结果。

### 9.4 自定义组件为什么必须大写开头

**结论：**

JSX 中小写 tag 表示平台内置 element，例如 `<section>`；大写 tag 表示自定义 component，例如 `<TopicCard />`。自定义组件必须大写开头，否则 React 不会按组件调用它。

**本节解决的问题：**

本节解决“为什么 `topicCard()` 是函数，但 `<topicCard />` 不按组件运行”的问题。React 需要通过 JSX tag 命名区分 DOM element 和 custom component。

**技术意义：**

Function component 是 JavaScript function，但不是所有 function 都会被 React 当成 component。React component 还需要遵守命名、返回 React node、被 JSX 使用等约定。

**概念解释：**

两种 JSX tag：

- `<section>`：小写，React DOM 认为它是 browser DOM element。
- `<TopicCard />`：大写，React 认为它是 component reference，需要调用 `TopicCard`。

**边界：语法、运行时、对象模型、类型系统、框架约定与平台 API：**

| Layer | Boundary |
| --- | --- |
| JavaScript runtime | Component 是 function value。 |
| JSX syntax | 大写 tag 表示 custom component。 |
| React convention | Component function 使用 PascalCase。 |
| TypeScript | 检查 component 是否可作为 JSX component 使用。 |
| Browser | 不认识 `TopicCard`，只看到 React DOM 生成的 DOM。 |

**底层机制：**

JSX 转换后，小写 tag 通常以 string 形式表达，例如 `"section"`；大写 tag 使用变量引用，例如 `TopicCard`。这就是为什么大小写决定 React 如何理解 tag。

**API / 语法规则：**

- 自定义 component 使用 PascalCase。
- Component function 返回 React node。
- Component 可以 default export 或 named export。

**固定属性名 / 固定方法名 / 参数签名：**

本节不涉及固定 API，重点是 component 命名约定。

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
  Snippet: lowercase component mistake
  Snippet: capitalized component correction
```
</div>

**示例代码：**

真实练习文件：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-02-jsx-and-components/component-basics/component-name-boundary.tsx</span>
  </div>

```tsx
function TopicCard() {
  return (
    <article className="topic-card">
      <h2>Component naming</h2>
      <p>Custom components use PascalCase names.</p>
    </article>
  );
}

export function ComponentNameBoundary() {
  return (
    <section className="practice-panel">
      <TopicCard />
    </section>
  );
}
```
</div>

**逐行解释：**

- `TopicCard` 是 JavaScript function。
- 它以大写开头，因此可作为 React custom component。
- `<TopicCard />` 在 JSX 中引用 function value。
- `ComponentNameBoundary` 组合了 `TopicCard`。

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
Component naming
Custom components use PascalCase names.
```
</div>

**执行过程：**

1. React 调用 `ComponentNameBoundary()`。
2. 返回值中包含 `<TopicCard />`。
3. React 识别 `TopicCard` 是 custom component。
4. React 调用 `TopicCard()`。
5. React DOM 渲染 `article`、`h2`、`p`。

**变量与引用变化：**

- `TopicCard` 是 function binding。
- JSX 中 `<TopicCard />` 使用这个 function reference。
- 没有创建 class instance，也没有保存 state。

**为什么会得到这个结果：**

React 根据大写 tag 把 `TopicCard` 当成 component 调用。component 返回的 JSX 再继续被 React 处理。

**对比情况：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: lowercase component mistake</span>
  </div>

```tsx
function topicCard() {
  return <article>Component naming</article>;
}

export function LowercaseComponentMistake() {
  return <topicCard />;
}
```
</div>

**常见错误为什么错：**

错误类型：React component convention error / JSX typing error。

违反规则：custom component 必须大写开头。小写 tag 会被当成 intrinsic element。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: capitalized component correction</span>
  </div>

```tsx
function TopicCard() {
  return <article>Component naming</article>;
}

export function CapitalizedComponentCorrection() {
  return <TopicCard />;
}
```
</div>

识别方法：如果自定义组件没有执行、TypeScript 说 JSX intrinsic element 不存在，先检查组件名称是否大写。

**与真实项目的关系：**

当前 Sudoku 项目中 `GameMetric` 是大写 function，并通过 `<GameMetric />` 使用。它是本节规则的真实应用。

**与当前学习路径的关系：**

后续 props 章节会让 `<TopicCard title="..." />` 变得系统化。现在只需理解大写 tag 和 function reference 的关系。

**最终记忆模型：**

Function component 是 function value；JSX 大写 tag 告诉 React “这里要调用组件”。

### 9.5 Component file 的命名、导入、导出与组合

**结论：**

第二章开始，component file 应该按知识点和职责命名，而不是所有内容都叫 `App.tsx` 或 `example.tsx`。文件名、导出名和 import 路径共同构成复习地图。

**本节解决的问题：**

本节解决“组件会写了，但文件越来越乱”的问题。真实练习需要可扩展结构，否则第三章 props、第四章 state、第五章 effect 会难以复习。

**技术意义：**

JavaScript module system 让组件可以拆到多个文件中。React component composition 让这些 function component 组合成 UI tree。TypeScript 在 import/export 和 JSX component 使用时提供检查。

**概念解释：**

本章采用 named export 优先的练习方式：

- `export function ComponentName()`
- `import { ComponentName } from "./component-file"`

原因：

- 学习阶段能明确看到文件导出了哪些练习组件。
- 组件名和文件名可以共同表达知识点。
- 以后迁移、重命名时更容易定位。

不是说 default export 错。当前项目 `App.tsx` 使用 default export，这是 Vite starter 常见写法。学习练习文件用 named export 更利于多个小组件并列复习。

**边界：语法、运行时、对象模型、类型系统、框架约定与平台 API：**

| Layer | Boundary |
| --- | --- |
| Module syntax | `export` / `import` 连接文件。 |
| React convention | 被导入的 function 作为 component 使用。 |
| Runtime | Browser 执行 Vite 转换后的 ESM modules。 |
| TypeScript | 检查导出名、导入名、路径和 JSX component 类型。 |
| Tooling | Vite 只处理模块图中的 imported files。 |

**底层机制：**

当 `ComponentModuleComposition` import 其他组件时，Vite 会把这些文件加入模块图。React 渲染 `<TopicSummary />` 时，会调用 `TopicSummary` function 并读取它的返回值。

**API / 语法规则：**

- 一个文件可以导出一个或多个 component。
- 文件名用 kebab-case 表达主题，例如 `component-module-composition.tsx`。
- Component 名用 PascalCase，例如 `ComponentModuleComposition`。
- Import 路径应指向真实文件。

**固定属性名 / 固定方法名 / 参数签名：**

- `export`
- `import`
- `from`
- `default`

**概念示例结构：**

本节主要使用真实练习文件，不需要额外概念 snippet。

**示例代码：**

真实练习文件：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-02-jsx-and-components/component-basics/component-module-composition.tsx</span>
  </div>

```tsx
type TopicSummaryProps = {
  title: string;
  summary: string;
};

function TopicSummary({ title, summary }: TopicSummaryProps) {
  return (
    <article className="topic-summary">
      <h2>{title}</h2>
      <p>{summary}</p>
    </article>
  );
}

export function ComponentModuleComposition() {
  return (
    <section className="practice-panel">
      <h1>Component module composition</h1>
      <TopicSummary
        summary="JSX describes UI from JavaScript values."
        title="JSX"
      />
      <TopicSummary
        summary="Components are functions with React naming and return conventions."
        title="Components"
      />
    </section>
  );
}
```
</div>

**逐行解释：**

- `TopicSummaryProps` 是 TypeScript type，只在检查阶段使用。
- `TopicSummary` 接收一个 props object。这里轻微预告 props，但不系统展开。
- `ComponentModuleComposition` 组合两个 `TopicSummary`。
- `summary` 和 `title` attribute 对 custom component 来说会进入 props object。

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
Component module composition
JSX
JSX describes UI from JavaScript values.
Components
Components are functions with React naming and return conventions.
```
</div>

**执行过程：**

1. Vite 加载 `component-module-composition.tsx`。
2. TypeScript 检查 `TopicSummaryProps`。
3. React 调用 `ComponentModuleComposition()`。
4. React 遇到 `<TopicSummary />`，调用 `TopicSummary()`。
5. React DOM 渲染最终 DOM tree。

**变量与引用变化：**

- `TopicSummary` 是内部 function reference。
- `title` 和 `summary` 是 props object 中的属性。
- TypeScript type 不进入运行时。

**为什么会得到这个结果：**

Component composition 让一个组件返回另一个组件。React 会继续展开组件，直到得到 DOM element 描述。

**对比情况：**

如果文件名叫 `example.tsx`，短期能跑，长期复习时你无法从文件名知道它练的是 module composition。

**常见错误为什么错：**

常见错误：导出名和导入名不一致。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: named import mismatch</span>
  </div>

```tsx
import { ComponentComposition } from "./component-module-composition";
```
</div>

错误原因：真实导出名是 `ComponentModuleComposition`，不是 `ComponentComposition`。

修正：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: named import correction</span>
  </div>

```tsx
import { ComponentModuleComposition } from "./component-module-composition";
```
</div>

识别方法：看到 module export 相关错误时，检查文件路径、导出方式、导入名称三者是否一致。

**与真实项目的关系：**

当前项目已有 `leaderboard.ts`、`sudoku.ts`、`App.tsx` 的模块边界。第二章开始把 React component 练习也纳入同样清晰的文件组织。

**与当前学习路径的关系：**

第三章 props 会更系统地使用 component 输入对象。现在先用轻量 props 体验 component 组合。

**最终记忆模型：**

文件名帮助复习，导出名帮助导入，组件名帮助 React 识别；三者应共同表达同一个学习目标。

### 9.6 TypeScript 在 TSX 中检查什么

**结论：**

TypeScript 在 TSX 中检查 JSX 语法、attribute 类型、component props 使用方式、module import/export，但类型在运行时会被擦除。

**本节解决的问题：**

本节解决“TypeScript 会不会在浏览器里保护我”的误解。TypeScript 提前发现很多错误，但 browser runtime 不会携带 TypeScript type。

**技术意义：**

React 官方 TypeScript 文档说明 TypeScript 可以和 JSX 一起使用，TypeScript Handbook 说明 JSX 是可嵌入的 XML-like syntax，并通过 compiler option 控制输出。当前项目 `noEmit: true` 表示 `tsc` 用于检查，实际构建输出由 Vite 负责。

**概念解释：**

TypeScript 在本章能帮你检查：

- `style` 是否是正确 object。
- custom component 是否传了必需 props。
- import 的名称是否存在。
- `.tsx` JSX 是否语法有效。
- intrinsic element attribute 是否可用。

TypeScript 不能自动做：

- 验证来自 API 的未知数据。
- 在浏览器运行时保留 `type` alias。
- 替 React 决定普通 object 如何渲染成 UI。

**边界：语法、运行时、对象模型、类型系统、框架约定与平台 API：**

| Layer | Boundary |
| --- | --- |
| TypeScript syntax | `type TopicSummaryProps = ...` |
| Type system | 检查 props 和 JSX attribute。 |
| Emitted JS | type 会被擦除。 |
| Runtime | React 运行 JavaScript value。 |
| Tooling | `npm run build` 先 `tsc -b` 再 `vite build`。 |

**底层机制：**

TypeScript 读取 `.tsx`，解析 JSX 和类型，给出 IDE / `tsc` 诊断。类型检查通过后，运行时依然是 JavaScript function、object、array、string、number。

**API / 语法规则：**

- `.tsx` 用于包含 JSX 的 TypeScript 文件。
- `type` / `interface` 用于静态检查。
- `as` 是类型断言，不是运行时验证。

**固定属性名 / 固定方法名 / 参数签名：**

- `jsx`
- `react-jsx`
- `noEmit`
- `strict`
- `moduleResolution`

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
  Snippet: missing prop type error
  Snippet: TypeScript erased type boundary
```
</div>

**示例代码：**

本节复用 `component-module-composition.tsx` 中的 `TopicSummaryProps`。下面是会被 TypeScript 检查出来的问题：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: missing prop type error</span>
  </div>

```tsx
type TopicSummaryProps = {
  title: string;
  summary: string;
};

function TopicSummary({ title, summary }: TopicSummaryProps) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{summary}</p>
    </article>
  );
}

export function MissingPropExample() {
  return <TopicSummary title="JSX" />;
}
```
</div>

**逐行解释：**

- `summary` 在 `TopicSummaryProps` 中是必需 string。
- `<TopicSummary title="JSX" />` 缺少 `summary`。
- TypeScript 可以在运行前发现这个 component 使用错误。

**运行方式：**

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

真实错误文本会随 TypeScript 版本变化，但核心含义是缺少 `summary` 属性。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Error</span>
  </div>

```txt
Property 'summary' is missing.
```
</div>

**执行过程：**

1. `tsc -b` 读取 project references。
2. TypeScript 检查 `.tsx`。
3. 发现 component props 不完整。
4. build 在 Vite production build 前失败。

**变量与引用变化：**

没有运行时变量变化，因为错误发生在 compile time。

**为什么会得到这个结果：**

TypeScript 使用 `TopicSummaryProps` 检查 JSX component 使用方式，发现缺少必需属性。

**对比情况：**

TypeScript 类型不会自动验证 runtime JSON。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: TypeScript erased type boundary</span>
  </div>

```ts
type GalleryTopic = {
  title: string;
};

const parsedTopic = JSON.parse('{"title": 42}') as GalleryTopic;

console.log(parsedTopic.title.toUpperCase());
```
</div>

**常见错误为什么错：**

错误类型：runtime error risk。

违反规则：`as GalleryTopic` 只是类型断言，不是运行时验证。`title` 实际可能是 number。

识别方法：数据来自 JSON、network、URL、localStorage、用户输入时，不要把 TypeScript type 当作 runtime validator。

**与真实项目的关系：**

当前项目的 `LeaderboardEntry`、`SudokuBoard` 等类型帮助检查本地代码，但如果数据来自外部输入，仍需要 runtime guard。

**与当前学习路径的关系：**

第三章 props 会更系统讲 component 输入类型。本节只建立 TSX 检查和类型擦除边界。

**最终记忆模型：**

TypeScript 在运行前帮你检查 TSX；浏览器运行时只剩 JavaScript value。

## 10. API / 语法索引

| API / Syntax | Layer | Meaning | Common Mistake |
| --- | --- | --- | --- |
| `.tsx` | TypeScript syntax / tooling | 包含 JSX 的 TypeScript 文件。 | 在 `.ts` 中写 JSX。 |
| `{expression}` | JSX syntax | 在 JSX 中插入 JavaScript expression。 | 直接写 `if` statement。 |
| `className` | JSX / React DOM | 设置 DOM class。 | 写成 `class`。 |
| `htmlFor` | JSX / React DOM | 关联 label 和 input。 | 写成 `for`。 |
| `style={{ ... }}` | JSX / object model | 传入 style object。 | 写成 CSS string。 |
| `disabled={boolean}` | JSX / React DOM | 传入 boolean attribute。 | 写成 `"false"` string。 |
| `<section>` | JSX intrinsic element | 创建 browser DOM element 描述。 | 以为它是 custom component。 |
| `<TopicCard />` | JSX custom component | 引用并调用 component function。 | 组件名小写。 |
| `export function Name()` | JavaScript module / React convention | 导出可导入的 component。 | 导出名和导入名不一致。 |
| `import { Name } from "...";` | JavaScript module | 导入 named export。 | 和 default export 混淆。 |
| `type Props = ...` | TypeScript type system | 描述 component 输入对象。 | 以为 type 在运行时存在。 |

## 11. 常见错误表

| Error | Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| JSX uses `if` inside `{}` | Syntax | JSX braces require expression, not statement. | Use ternary or compute value before return. | `{}` 中出现 control statement。 |
| JSX uses `class` | JSX / React DOM | JSX uses `className`. | Use `className`. | 从 HTML 复制到 TSX。 |
| JSX uses `for` | JSX / React DOM | JSX uses `htmlFor`. | Use `htmlFor`. | label/input 代码复制后出错。 |
| `style="..."` in JSX | TypeScript / React DOM | `style` expects object. | Use `style={{ color: "red" }}`. | style prop type error。 |
| Object rendered as child | React runtime | Plain object is not renderable. | Render object property. | Error says object child is invalid. |
| Lowercase custom component | React convention / TypeScript | Custom components must be capitalized. | Use PascalCase. | JSX intrinsic element diagnostic。 |
| Missing prop | TypeScript | Required prop is absent. | Pass the required prop or make it optional. | `Property ... is missing`。 |
| Import/export mismatch | Module / tooling | Imported name is not exported. | Align export and import forms. | Vite or TypeScript module error。 |
| Generic file names everywhere | Learning workflow | File name does not reveal knowledge point. | Use concept-specific directory and file names. | Later review cannot locate the topic. |

## 12. 最终小项目

### 项目目标

最终小项目：`JSX Component Gallery`。

目标是用多个小组件组成一个静态 React 页面，展示：

- JSX expression。
- JSX attribute。
- JSX child。
- Component composition。
- TypeScript type checking。
- CSS class 与 React DOM 的边界。

不使用 state、effect、router、外部 UI 库或 data fetching。

### 为什么适合本章

这个项目把本章所有边界放进一个静态页面。它不是为了做复杂交互，而是为了让你能从文件结构、组件组合和 TSX 代码中看清楚 React 的基础运行模型。

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
  App.tsx
  learning/
    react/
      chapter-02-jsx-and-components/
        jsx-component-gallery/
          gallery-topic-data.ts
          gallery-badge.tsx
          gallery-card.tsx
          gallery-section.tsx
          jsx-component-gallery.tsx
          jsx-component-gallery.css
```
</div>

### 文件职责

| File | Responsibility |
| --- | --- |
| `src/App.tsx` | Thin adapter；只负责把本章 gallery 挂到当前 Vite app。 |
| `src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-topic-data.ts` | 静态数据和类型定义；展示 TypeScript compile-time 边界。 |
| `src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-badge.tsx` | 小型展示组件；练习 className、children、props 预告。 |
| `src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-card.tsx` | 卡片组件；展示 JSX expression、attribute、boolean value。 |
| `src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-section.tsx` | 组合组件；把多个 card 组合成 section。 |
| `src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/jsx-component-gallery.tsx` | 项目 root component；组合所有 gallery UI。 |
| `src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/jsx-component-gallery.css` | 本小项目样式；展示 CSS class 与 JSX `className` 的关系。 |

### 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/App.tsx</span>
  </div>

```tsx
import { JsxComponentGallery } from "./learning/react/chapter-02-jsx-and-components/jsx-component-gallery/jsx-component-gallery";

export default function App() {
  return <JsxComponentGallery />;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-topic-data.ts</span>
  </div>

```ts
export type GalleryTopic = {
  id: string;
  title: string;
  layer: "syntax" | "runtime" | "type-system" | "tooling";
  summary: string;
  isCore: boolean;
};

export const galleryTopics: GalleryTopic[] = [
  {
    id: "jsx-expression",
    title: "JSX Expression",
    layer: "syntax",
    summary: "Curly braces read JavaScript expression results.",
    isCore: true,
  },
  {
    id: "jsx-attribute",
    title: "JSX Attribute",
    layer: "runtime",
    summary: "React DOM maps JSX props to browser DOM updates.",
    isCore: true,
  },
  {
    id: "component-composition",
    title: "Component Composition",
    layer: "runtime",
    summary: "Components combine function return values into a UI tree.",
    isCore: true,
  },
  {
    id: "tsx-checking",
    title: "TSX Checking",
    layer: "type-system",
    summary: "TypeScript checks component usage before runtime.",
    isCore: false,
  },
];
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-badge.tsx</span>
  </div>

```tsx
type GalleryBadgeProps = {
  children: string;
  isHighlighted?: boolean;
};

export function GalleryBadge({ children, isHighlighted = false }: GalleryBadgeProps) {
  const badgeClassName = isHighlighted ? "gallery-badge highlighted" : "gallery-badge";

  return <span className={badgeClassName}>{children}</span>;
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-card.tsx</span>
  </div>

```tsx
import type { GalleryTopic } from "./gallery-topic-data";
import { GalleryBadge } from "./gallery-badge";

type GalleryCardProps = {
  topic: GalleryTopic;
};

export function GalleryCard({ topic }: GalleryCardProps) {
  const cardClassName = topic.isCore ? "gallery-card core-topic" : "gallery-card";

  return (
    <article className={cardClassName} data-topic-id={topic.id}>
      <div className="gallery-card-header">
        <GalleryBadge isHighlighted={topic.isCore}>{topic.layer}</GalleryBadge>
        <span aria-label="Core topic">{topic.isCore ? "Core" : "Support"}</span>
      </div>

      <h2>{topic.title}</h2>
      <p>{topic.summary}</p>
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
    <span class="macos-code-title">src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/gallery-section.tsx</span>
  </div>

```tsx
import type { GalleryTopic } from "./gallery-topic-data";
import { GalleryCard } from "./gallery-card";

type GallerySectionProps = {
  heading: string;
  topics: GalleryTopic[];
};

export function GallerySection({ heading, topics }: GallerySectionProps) {
  return (
    <section className="gallery-section" aria-labelledby="gallery-section-title">
      <h1 id="gallery-section-title">{heading}</h1>
      <div className="gallery-grid">
        {topics.map((topic) => (
          <GalleryCard key={topic.id} topic={topic} />
        ))}
      </div>
    </section>
  );
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/jsx-component-gallery.tsx</span>
  </div>

```tsx
import { galleryTopics } from "./gallery-topic-data";
import { GallerySection } from "./gallery-section";
import "./jsx-component-gallery.css";

const coreTopicCount = galleryTopics.filter((topic) => topic.isCore).length;

export function JsxComponentGallery() {
  return (
    <main className="gallery-page">
      <header className="gallery-hero">
        <p className="eyebrow">React Chapter 02</p>
        <h1>JSX Component Gallery</h1>
        <p>
          This static page shows JSX expressions, attributes, children, component
          composition, TypeScript checking, and CSS class boundaries.
        </p>
        <p>{coreTopicCount} core topics are highlighted.</p>
      </header>

      <GallerySection heading="Chapter concepts" topics={galleryTopics} />
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
    <span class="macos-code-title">src/learning/react/chapter-02-jsx-and-components/jsx-component-gallery/jsx-component-gallery.css</span>
  </div>

```css
.gallery-page {
  width: min(1080px, 100%);
  margin: 0 auto;
  padding: 48px 24px;
}

.gallery-hero {
  display: grid;
  gap: 12px;
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

.gallery-hero h1 {
  margin: 0;
  color: #172033;
  font-size: clamp(2.3rem, 7vw, 4.5rem);
  line-height: 1;
}

.gallery-hero p {
  max-width: 760px;
  margin: 0;
  color: #4c5870;
  font-size: 1.04rem;
}

.gallery-section {
  display: grid;
  gap: 18px;
}

.gallery-section h1 {
  margin: 0;
  color: #172033;
  font-size: 1.6rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.gallery-card {
  display: grid;
  gap: 12px;
  min-width: 0;
  padding: 16px;
  border: 1px solid #d7dde8;
  border-radius: 8px;
  background: #ffffff;
}

.core-topic {
  border-color: #28715f;
}

.gallery-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.gallery-card h2 {
  margin: 0;
  color: #172033;
  font-size: 1.12rem;
}

.gallery-card p {
  margin: 0;
  color: #4c5870;
}

.gallery-badge {
  width: fit-content;
  border-radius: 999px;
  background: #eef2f7;
  color: #4c5870;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 5px 9px;
  text-transform: uppercase;
}

.gallery-badge.highlighted {
  background: #effaf6;
  color: #28715f;
}

@media (max-width: 860px) {
  .gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .gallery-page {
    padding: 28px 16px;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
```
</div>

### 运行方式

创建或替换第 12 节列出的真实文件后运行：

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
React Chapter 02
JSX Component Gallery
3 core topics are highlighted.
Chapter concepts
JSX Expression
JSX Attribute
Component Composition
TSX Checking
```
</div>

### 核心执行流程

React runtime 做的事：

1. `src/App.tsx` 返回 `<JsxComponentGallery />`。
2. React 调用 `JsxComponentGallery()`。
3. `JsxComponentGallery` 读取 `galleryTopics` 和 `coreTopicCount`。
4. React 遇到 `<GallerySection />`，继续调用 `GallerySection()`。
5. `GallerySection` 使用 `topics.map(...)` 生成多个 `<GalleryCard />`。
6. `GalleryCard` 调用 `GalleryBadge`，组合成最终 UI tree。
7. React DOM 把 UI tree commit 到 browser DOM。

TypeScript compile time 做的事：

1. 检查 `GalleryTopic` union type 中的 `layer` 是否只使用允许值。
2. 检查 `GalleryCard` 是否收到 `topic`。
3. 检查 `GalleryBadge` 的 `children` 是 string。
4. 检查 import/export 名称和路径是否正确。
5. 类型检查结束后，类型定义在运行时被擦除。

JSX 工具链做的事：

1. TSX 源码被 TypeScript / Vite / React plugin 解析。
2. JSX 被转换成 JavaScript 调用形式。
3. Browser 执行转换后的 module。
4. Browser 不直接执行原始 JSX。

### 常见错误

| Error | Why It Happens | How to Recognize | Fix |
| --- | --- | --- | --- |
| `Cannot find module ...` | import 路径和真实文件结构不一致。 | Vite overlay 或 TypeScript module diagnostic。 | 对照最终小项目结构检查路径。 |
| `Property 'topic' is missing` | 使用 `GalleryCard` 时没有传 `topic`。 | TypeScript props error。 | 传入 `topic={topic}`。 |
| `Type '"other"' is not assignable...` | `layer` 不在 union type 中。 | TypeScript literal union error。 | 使用 `"syntax"`、`"runtime"`、`"type-system"` 或 `"tooling"`。 |
| Page has no gallery styles | 没有 import CSS。 | 页面有文本但没有样式。 | 检查 `import "./jsx-component-gallery.css"`。 |
| Object child runtime error | 直接渲染 topic object。 | Browser console 指向 invalid React child。 | 渲染 `topic.title` 等属性。 |
| Lowercase component tag | 自定义组件名小写。 | JSX intrinsic element error。 | 改成 PascalCase。 |

### 可选扩展

本章允许的扩展：

- 增加一个 `JSX Children` gallery card。
- 增加一个 `CSS Class Boundary` gallery card。
- 把 `galleryTopics` 中的 `layer` 拆成更严格的 union type。

不要在本章扩展 state、effect、router、data fetching、Redux、Next.js 或测试。

## 13. 额外速查表

### 一句话概念总结

JSX 是源码层 UI 描述语法；function component 是 JavaScript function 加 React 组件约定；第二章开始应使用按知识点命名的真实练习文件，而不是把所有内容堆到 `App.tsx`。

### 常用 API 表

| API / Syntax | Layer | Purpose | Common Mistake |
| --- | --- | --- | --- |
| `{expression}` | JSX syntax | 插入 JavaScript expression 结果。 | 放入 `if` statement。 |
| `className` | JSX / React DOM | 设置 class。 | 写成 `class`。 |
| `htmlFor` | JSX / React DOM | 关联 label 和 input。 | 写成 `for`。 |
| `style={{ ... }}` | JSX / object model | 设置 inline style object。 | 写成 style string。 |
| `disabled={value}` | JSX / React DOM | 设置 boolean attribute。 | 写成 `"false"`。 |
| `<Component />` | React convention | 使用自定义组件。 | 组件名小写。 |
| `export function Component()` | JavaScript module | 导出 named component。 | 和 default import 混用。 |
| `type Props = ...` | TypeScript | 检查 component 输入。 | 以为 runtime 会验证。 |

### 相似概念对照表

| Concept A | Concept B | Key Difference | Practical Rule |
| --- | --- | --- | --- |
| JSX | HTML | JSX 是源码语法；HTML 是浏览器文档语言。 | 不要直接复制 HTML attribute。 |
| JSX expression | JavaScript statement | expression 产生值；statement 控制流程。 | `{}` 中放 expression。 |
| `className` | `class` | JSX prop 与 HTML attribute 名称不同。 | TSX 中写 `className`。 |
| Component function | Ordinary function | Component 遵守 React 命名和返回约定。 | 自定义组件用 PascalCase。 |
| TypeScript type | Runtime value | type 被擦除；value 运行时存在。 | 外部数据需要 runtime check。 |
| Concept snippet | Real practice file | snippet 解释机制；real file 需要创建并可运行。 | Snippet 用逻辑标题，真实文件用路径。 |

### 错误类型表

| Error | Error Type | Violated Rule | Correction |
| --- | --- | --- | --- |
| `if` inside JSX braces | syntax | JSX braces need expression. | Use ternary or precomputed value. |
| `class` in JSX | JSX prop | React DOM uses `className`. | Use `className`. |
| object as child | runtime | Plain object is not renderable child. | Render object property. |
| lowercase component | React convention | Custom component uses PascalCase. | Rename to uppercase component. |
| missing prop | type system | Required prop not provided. | Pass required prop. |
| generic filename | learning workflow | File name does not reveal topic. | Use concept-specific names. |

### 真实项目使用表

| Scenario | Why It Appears | Practical Rule |
| --- | --- | --- |
| JSX attribute conversion | HTML examples often get copied into TSX. | Convert `class`, `for`, and `style`. |
| Static component composition | Before state, UI can still be composed from components. | Split by responsibility, not by random example number. |
| TypeScript props preview | Components need input contracts. | Use simple props only as preview in chapter 2. |
| Learning file organization | Later chapters need reviewable practice history. | One concept directory, descriptive file names. |
| Final project mounting | Vite needs imported modules to display UI. | Keep `App.tsx` as a thin adapter. |

### 最小代码模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: static typed component</span>
  </div>

```tsx
type StaticCardProps = {
  title: string;
  summary: string;
};

export function StaticCard({ title, summary }: StaticCardProps) {
  return (
    <article className="static-card">
      <h2>{title}</h2>
      <p>{summary}</p>
    </article>
  );
}
```
</div>

## 14. 工程迁移与代码审查要点

### Code review questions

- JSX 中的动态值是否都是表达式，而不是伪模板语法？
- 组件名称、文件导入和 JSX 使用位置是否一致？
- children 是否只传递 React 可渲染值，而不是原始对象或未格式化数据？

### Migration checks

- 从 HTML 迁移到 JSX 时逐项处理 `className`、表达式插值和自闭合标签。
- 拆分组件前先确认哪个 UI 片段有独立输入和复用价值。
- 保留数据格式化在 render 前的可读位置，避免 JSX 里塞复杂转换。

### Production risk signals

- 控制台出现 object child 错误，通常是把原始对象直接放进 JSX。
- 组件不生效且页面出现未知标签，检查组件名是否小写或 import 是否错误。
- JSX 变得难读时，通常是表达式边界和组件边界没有拆清。

## 15. 如何转换成个人笔记

建议把本章笔记整理成五张卡片：

| Card | Must Include |
| --- | --- |
| JSX source boundary | JSX 不是 HTML，浏览器不直接执行 TSX。 |
| JSX expression | `{}` 中放 expression，结果还必须可渲染。 |
| JSX attribute | `className`、`htmlFor`、`style`、boolean attribute。 |
| Component convention | 大写组件、function return、composition。 |
| File organization | 一个概念一个目录，文件名表达学习目标。 |

每个真实练习文件的笔记都回答三件事：

- 这个文件练哪个知识点？
- 它被哪个文件 import？
- TypeScript 检查什么，React runtime 做什么？

## 16. 必须能回答的问题

1. JSX 为什么不是浏览器原生 HTML？
2. JSX `{}` 中能放什么，不能直接放什么？
3. 为什么 `if` 不能直接放进 JSX `{}`？
4. `className` 和 HTML `class` 的关系是什么？
5. `htmlFor` 和 HTML `for` 的关系是什么？
6. JSX `style` 为什么是 object？
7. Boolean attribute 为什么应传 boolean，而不是 `"false"`？
8. JSX child 哪些值可渲染，哪些值不可渲染？
9. 为什么普通 object 不能直接作为 JSX child？
10. 自定义 component 为什么必须大写开头？
11. Function component 和普通 function 有什么相同点和不同点？
12. Named export 和 default export 在学习文件中如何选择？
13. TypeScript 在 TSX 中能检查什么？
14. TypeScript 类型为什么不会进入运行时？
15. 为什么第二章开始不继续把所有练习堆到 `App.tsx`？
16. 本章真实练习结构如何扩展到后续 props、state、effect 章节？

## 17. 最终记忆模型

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终记忆模型</span>
  </div>

```txt
descriptive practice file
  -> exports a PascalCase component
  -> component returns JSX
  -> JSX uses expressions, attributes, and children
  -> TypeScript checks TSX before runtime
  -> Vite transforms the module graph
  -> React calls components
  -> React DOM updates browser DOM
```
</div>

最短版本：

JSX 是源码层 UI 描述；component 是 JavaScript function 加 React 约定；TypeScript 检查 TSX 但运行时类型被擦除；第二章开始用描述性目录和文件名保存真实练习，方便后续章节长期复习。

## 18. 官方文档阅读清单

推荐阅读顺序：

1. React: [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
   - 重点看 JSX 是 JavaScript syntax extension、JSX 与 HTML 的差异、单一根节点、标签闭合和 camelCase。
2. React: [JavaScript in JSX with Curly Braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
   - 重点看 `{}` 中如何使用 JavaScript expression，以及 double curlies 如何表示 object。
3. React: [Your First Component](https://react.dev/learn/your-first-component)
   - 重点看 component 是 JavaScript function、组件名称大写、返回 markup。
4. React: [Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components)
   - 重点看 default export、named export、文件拆分与组合。
5. React: [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
   - 本章只读 props 是 component 输入对象的部分，不进入系统性 props 学习。
6. React DOM: [Common components](https://react.dev/reference/react-dom/components/common)
   - 重点看 common props、`className`、`style`、`children`、`aria-*` 和 DOM component props。
7. React: [Using TypeScript](https://react.dev/learn/typescript)
   - 重点看 TSX、`@types/react`、component typing 的边界。
8. TypeScript Handbook: [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)
   - 重点看 JSX 是可嵌入语法、`.tsx`、JSX emit。
9. TypeScript TSConfig Reference: [`jsx`](https://www.typescriptlang.org/tsconfig/#jsx)
   - 重点看 `react-jsx` 对当前项目的意义。
10. MDN: [HTML attribute reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes)
    - 重点看 HTML attribute 是浏览器平台概念。
11. MDN: [Boolean attribute](https://developer.mozilla.org/en-US/docs/Glossary/Boolean/HTML)
    - 重点看 HTML boolean attribute 与 JSX boolean value 的差异。
12. MDN: [`<label>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label)
    - 重点看 label 与 form control 的关联，理解 `htmlFor`。
13. Vite: [Getting Started](https://vite.dev/guide/)
    - 重点看 Vite dev server、build command、module graph 和 `index.html` 入口。

本地辅助资料：

- `references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf`
  - 参考了 `Meet the React Component`、`React JSX`、`React Component Instantiation`、`React DOM`、`TypeScript in React` 相关内容。
  - 该 PDF 多用 `App.jsx` 和单文件教程路径。本章以当前项目的 TypeScript / TSX 结构和官方 React 文档为准，不机械照搬它的目录。

Verification Needed：

- 本章只创建文档，没有实际创建或运行第 12 节源码文件。练习时需要手动创建文件后运行 `npm run dev` 和 `npm run build`。
- Vite 官方站点当前显示的是最新文档；当前项目依赖是 `vite` `^7.2.4`。本章只使用稳定的 Vite dev server、module graph、build 概念；如果后续写 Vite 版本敏感章节，需要再按项目实际安装版本核对。
