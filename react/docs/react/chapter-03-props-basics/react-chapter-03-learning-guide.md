# React 第三章：Props 基础、组件输入对象与 TypeScript Props 类型

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
  - [9.1 props object 的运行时本质](#91-props-object-的运行时本质)
  - [9.2 JSX custom component attributes 如何变成 props](#92-jsx-custom-component-attributes-如何变成-props)
  - [9.3 destructuring props 与完整 props object 写法](#93-destructuring-props-与完整-props-object-写法)
  - [9.4 required props、optional props 与 default values](#94-required-propsoptional-props-与-default-values)
  - [9.5 boolean props 的正确写法](#95-boolean-props-的正确写法)
  - [9.6 children prop 基础](#96-children-prop-基础)
  - [9.7 props readonly 原则](#97-props-readonly-原则)
  - [9.8 TypeScript props 类型检查与运行时边界](#98-typescript-props-类型检查与运行时边界)
  - [9.9 props 与 state 的边界预告](#99-props-与-state-的边界预告)
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
| Props object creation | Parent JSX attributes become a props object for the child. | React component call model | Profile cards receive display data through explicit inputs. | `src/learning/react/chapter-03-props-basics/props-object-boundary/props-object-runtime-demo.tsx` |
| Required and optional props | TypeScript checks parent-child contracts before runtime. | TypeScript type system | Card variants can require core data while allowing optional badges. | `src/learning/react/chapter-03-props-basics/props-type-boundary/optional-props-demo.tsx` |
| Default prop values | The receiving component owns fallback display behavior. | JavaScript parameter destructuring | Missing optional labels still render predictably. | `src/learning/react/chapter-03-props-basics/props-type-boundary/default-prop-values-demo.tsx` |
| Children composition | The parent owns nested content; the child owns layout slots. | React component model | Reusable shells render supplied content without knowing its internals. | `src/learning/react/chapter-03-props-basics/children-props-basics/children-basic-composition.tsx` |

## 0. 本章工程问题与边界

本章解决的工程问题是：组件之间如何通过显式输入协作。props 不是全局变量，也不是子组件可以随意修改的共享对象；它是父组件向子组件传递渲染信息的边界。

本章不进入 Context、状态提升、运行时 schema 校验或复杂数据获取。TypeScript 在这里用于表达组件契约，但它不会在浏览器运行时自动验证外部数据。

## 1. 本章解决的问题

学完 JSX 和 component 后，学习者通常会遇到一个核心混淆：自定义组件上写的 attribute 到底是不是 HTML attribute？

答案是：不是。写在小写 DOM tag 上的 attribute，例如 `<img alt="..." />`，最终由 React DOM 映射到浏览器 DOM；写在大写 custom component 上的 attribute，例如 `<ProfileCard name="Mia" />`，会进入这个组件的 props object。子组件接收到的是一个普通 JavaScript object，只是它被 React 按组件调用约定传入。

本章解决这些问题：

- 为什么 `props` 是父组件传给子组件的输入对象。
- JSX custom component attributes 如何变成 props object。
- function component 的 props parameter 和普通 JavaScript function parameter 有什么关系。
- props 为什么应该被当成只读输入。
- TypeScript 如何表达 required、optional、default、boolean、children props。
- TypeScript 为什么只能做 compile-time checking，不能在 browser runtime 验证外部数据。
- props 如何支撑 component reuse 和 component composition。

本章的最终结论：

`props` 是 React component 的外部输入边界。父组件在 JSX 中声明子组件需要的数据，React 在渲染时把这些 attribute 组合成 props object，然后调用子组件 function。TypeScript 可以检查这个 object 的类型，但类型会在运行时被擦除；因此 props 类型能防止你在源码里误用组件，却不能替代真实 runtime data validation。

## 2. 前置概念

| Concept | Why It Is Required |
| --- | --- |
| JSX custom component | props 主要通过大写 component tag 上的 attributes 传递。 |
| JavaScript object | props 在运行时就是 object，属性来自 JSX attributes。 |
| JavaScript function parameter | function component 通过 parameter 接收 props object。 |
| Object destructuring | React component 常用 `{ title, size }` 直接读取 props。 |
| TypeScript object type | `type Props = { title: string }` 描述 props object 形状。 |
| Optional property | `summary?: string` 表示 prop 可以缺失。 |
| JSX children | 嵌套在 component tag 里的 JSX 会进入 `children` prop。 |
| React render | 每次 render 都会重新调用 function component，并传入当前 props。 |
| DOM attribute / property | 帮助区分 DOM tag props 和 custom component props。 |
| Vite module graph | 练习文件必须被入口 import，页面才会显示。 |

## 3. 学习目标

学完本章后，你应该能做到：

- 用一句话解释 props 是什么。
- 解释 JSX custom component attributes 如何变成 props object。
- 分清 custom component props、HTML attribute、DOM property。
- 写出完整 props object parameter 和 destructuring props 两种写法。
- 用 TypeScript 表达 required props、optional props 和 default prop values。
- 正确写 boolean props，例如 `<ProfileBadge isFeatured />` 与 `isFeatured={false}`。
- 用基础 `children` prop 组合组件。
- 解释为什么不能在子组件里修改 props。
- 说明 TypeScript props 类型检查发生在 compile time，不发生在 browser runtime。
- 说明 props 与 state 的边界。
- 设计第三章真实练习文件结构，方便后续复习和扩展。
- 完成 `Props Composition Gallery` 静态小项目。

## 4. 机制依赖图

这些依赖不是阅读顺序清单，而是本章概念成立的前置关系。

| First Understand | Then Understand | Dependency Reason | Failure If Skipped |
| --- | --- | --- | --- |
| JSX attributes | Props object | 先理解属性如何变成对象，才能理解解构和类型声明。 | 会把参数列表写成多个独立参数。 |
| Required fields | Optional/default fields | 必须先区分必需输入，才能安全设计 fallback。 | 会隐藏真正缺失的数据问题。 |
| Readonly input | Callback output | 子组件不能改 props，需要通过 callback 表达事件意图。 | 会尝试直接 mutate props。 |
| Renderable children | Slot composition | children 依赖上一章的可渲染值规则。 | 会把布局壳和业务内容耦合在一起。 |

## 5. 核心术语表

| Term | 中文说明 | Layer | Why It Matters |
| --- | --- | --- | --- |
| Props | 父组件传给子组件的输入对象 | React convention / JavaScript object model | 本章主线。 |
| Parent component | 渲染并配置子组件的组件 | React component tree | props 从 parent 流向 child。 |
| Child component | 接收 props 并返回 UI 描述的组件 | React runtime / component convention | props 的接收方。 |
| Custom component attribute | JSX 中写在大写组件上的 attribute | JSX syntax / React runtime | 会进入 props object。 |
| Intrinsic element prop | JSX 中写在小写 DOM tag 上的 prop | React DOM / platform API | 会被 React DOM 处理为 DOM 更新。 |
| Props object | function component 接收的第一个参数 | JavaScript runtime | 运行时真实存在。 |
| Destructuring | 从 object 中取属性绑定为局部变量 | JavaScript syntax | React component 常用写法。 |
| Required prop | TypeScript 中必须传入的 prop | Type system | 不传会在 compile time 报错。 |
| Optional prop | TypeScript 中可以省略的 prop | Type system | 读取时通常是 `T | undefined`。 |
| Default value | destructuring 中为缺失或 `undefined` prop 设置默认值 | JavaScript runtime / TypeScript narrowing | 让组件内部拿到稳定值。 |
| Boolean prop | 值为 boolean 的 prop | JSX syntax / JavaScript value | 可写成 `isFeatured` 或 `isFeatured={false}`。 |
| Children prop | JSX 嵌套内容形成的 prop | React runtime / TypeScript ReactNode | 支撑基础组合。 |
| Read-only props | 把 props 当作不可修改输入 | React rule / immutability | 保持 render 可预测。 |
| Type erasure | TypeScript 类型不会进入运行时 | TypeScript tooling | 类型不能验证外部数据。 |
| State | 组件内部由 React 管理的数据 | React runtime | 本章只和 props 对比。 |

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
parent component render
  -> JSX custom component attributes
  -> props object
  -> child function component parameter
  -> child returns React UI description
  -> React DOM updates browser DOM
```
</div>

把这个模型拆开：

- JSX 中 `<ProfileCard name="Mia" isFeatured />` 是源码层写法。
- TypeScript 在 `.tsx` 文件里检查 `ProfileCard` 是否允许 `name` 和 `isFeatured`。
- Vite 和 React plugin 处理 TSX / JSX transform。
- 浏览器运行的是 JavaScript，不运行 TypeScript 类型。
- React runtime 会把 custom component attributes 组织成 props object。
- 子组件 function 接收 props object，读取它，返回 UI 描述。
- props 是这次 render 的输入快照；子组件不应该修改它。

## 7. 推荐目录结构

本章设计原则：

- 第三章不继续把 props 练习塞进 `src/App.tsx`。根级 `App.tsx` 只适合作为临时挂载 adapter。
- 继续沿用 `src/learning/react/`，让每章练习独立、可回看、可扩展。
- 目录按 props 学习边界分组，而不是按“第几个例子”命名。
- 文件名直接说明练习目标，例如 `required-props-demo.tsx`、`children-basic-composition.tsx`。
- 最终小项目独立放在 `props-composition-gallery/`，避免和普通概念练习混在一起。

### 当前项目结构

这是当前 repository 中与本章相关的真实结构。注意：当前 Vite 入口仍在 `src/sudoku/main.tsx`，它导入根级 `src/App.tsx`，而根级 `App.tsx` 现在临时挂载第二章练习。

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
    App.tsx
    App.sudoku.backup.tsx
    assets/
      react.svg
    sudoku/
      main.tsx
      App.tsx
      App.css
      index.css
      leaderboard.ts
      sudoku.ts
    learning/
      react/
        chapter-02-jsx-and-components/
          chapter-02-practice-root.tsx
          chapter-02-practice.css
          jsx-source-boundary/
          component-basics/
```
</div>

当前结构说明：

- `index.html` 是 Vite 的 HTML entry，它加载 `/src/sudoku/main.tsx`。
- `src/sudoku/main.tsx` 是当前实际 React root 创建位置。
- `src/App.tsx` 当前是学习练习的临时 adapter，不是长期塞所有章节代码的地方。
- `src/sudoku/App.tsx` 是原 Sudoku 应用，包含 hooks，第三章不修改它。
- 第三章建议新增 `src/learning/react/chapter-03-props-basics/`。

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
    chapter-03-props-basics/
      react-chapter-03-learning-guide.md
references/
  books/
    react/
      the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf
```
</div>

### 真实练习结构

本章建议创建下面的真实练习文件。它们用于普通 props 练习，不是最终小项目文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">真实练习结构</span>
  </div>

```txt
src/
  learning/
    react/
      chapter-03-props-basics/
        chapter-03-practice-root.tsx
        chapter-03-practice.css
        props-object-boundary/
          props-object-runtime-demo.tsx
          jsx-attributes-to-props-demo.tsx
          props-destructuring-demo.tsx
          props-readonly-mistake.tsx
        props-type-boundary/
          required-props-demo.tsx
          optional-props-demo.tsx
          default-prop-values-demo.tsx
          boolean-props-demo.tsx
          typescript-runtime-boundary-demo.tsx
        children-props-basics/
          children-basic-composition.tsx
          children-renderable-boundary.tsx
```
</div>

目录设计理由：

- `props-object-boundary/` 关注运行时：props 是 object，function component 如何接收，为什么不修改。
- `props-type-boundary/` 关注 TypeScript：required、optional、default、boolean、type erasure。
- `children-props-basics/` 单独分组，因为 children 是 props，但使用方式不同于命名 attribute。
- `chapter-03-practice-root.tsx` 负责把普通练习集中渲染，避免每次手动改多个入口。
- `chapter-03-practice.css` 只服务本章普通练习，不和第二章样式或最终小项目样式混在一起。

### 概念示例结构

这些是只用于解释机制、错误对比或编译结果的 snippet，不需要创建成真实文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">概念示例结构</span>
  </div>

```txt
Conceptual snippets:
  Snippet: function parameter comparison
  Snippet: DOM prop versus component prop
  Snippet: destructuring type annotation mistake
  Snippet: missing required prop error
  Snippet: boolean prop string mistake
  Snippet: children object mistake
  Snippet: mutate props mistake
  Snippet: erased props type boundary
  Snippet: props versus state boundary
  Template: typed props component
```
</div>

### 最终小项目结构

最终小项目 `Props Composition Gallery` 使用独立目录，重点练习 typed props、children 和 component composition。

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
      chapter-03-props-basics/
        props-composition-gallery/
          profile-card-data.ts
          profile-avatar.tsx
          profile-badge.tsx
          profile-card.tsx
          profile-card-grid.tsx
          props-composition-gallery.tsx
          props-composition-gallery.css
```
</div>

## 8. 示例运行方式

如果你只阅读本章，不需要创建源码文件。如果你跟着创建真实练习文件，可以用 `chapter-03-practice-root.tsx` 临时挂载本章全部普通练习。

建议临时把根级 `src/App.tsx` 改成：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/App.tsx</span>
  </div>

```tsx
import { Chapter03PracticeRoot } from './learning/react/chapter-03-props-basics/chapter-03-practice-root'

function App() {
  return <Chapter03PracticeRoot />
}

export default App
```
</div>

本章普通练习总入口：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/chapter-03-practice-root.tsx</span>
  </div>

```tsx
import { ChildrenBasicComposition } from './children-props-basics/children-basic-composition'
import { ChildrenRenderableBoundary } from './children-props-basics/children-renderable-boundary'
import './chapter-03-practice.css'
import { JsxAttributesToPropsDemo } from './props-object-boundary/jsx-attributes-to-props-demo'
import { PropsDestructuringDemo } from './props-object-boundary/props-destructuring-demo'
import { PropsObjectRuntimeDemo } from './props-object-boundary/props-object-runtime-demo'
import { PropsReadonlyMistake } from './props-object-boundary/props-readonly-mistake'
import { BooleanPropsDemo } from './props-type-boundary/boolean-props-demo'
import { DefaultPropValuesDemo } from './props-type-boundary/default-prop-values-demo'
import { OptionalPropsDemo } from './props-type-boundary/optional-props-demo'
import { RequiredPropsDemo } from './props-type-boundary/required-props-demo'
import { TypeScriptRuntimeBoundaryDemo } from './props-type-boundary/typescript-runtime-boundary-demo'

export function Chapter03PracticeRoot() {
  return (
    <main className="props-practice-shell">
      <header className="props-practice-header">
        <p className="chapter-eyebrow">React Chapter 03</p>
        <h1>Props basics</h1>
        <p>
          This page renders the chapter practice components for props, children,
          default values, boolean props, and TypeScript boundaries.
        </p>
      </header>

      <div className="props-practice-grid" aria-label="Chapter 03 practice exercises">
        <PropsObjectRuntimeDemo />
        <JsxAttributesToPropsDemo />
        <PropsDestructuringDemo />
        <RequiredPropsDemo />
        <OptionalPropsDemo />
        <DefaultPropValuesDemo />
        <BooleanPropsDemo />
        <ChildrenBasicComposition />
        <ChildrenRenderableBoundary />
        <PropsReadonlyMistake />
        <TypeScriptRuntimeBoundaryDemo />
      </div>
    </main>
  )
}
```
</div>

本章普通练习共享样式：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/chapter-03-practice.css</span>
  </div>

```css
.props-practice-shell {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0;
}

.props-practice-header {
  margin-bottom: 28px;
}

.chapter-eyebrow {
  margin: 0 0 8px;
  color: #335c81;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.props-practice-header h1 {
  margin: 0;
  color: #172033;
  font-size: clamp(2rem, 4vw, 3.25rem);
  line-height: 1;
}

.props-practice-header p:last-child {
  max-width: 760px;
  margin: 16px 0 0;
  color: #526070;
  line-height: 1.6;
}

.props-practice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
}

.props-panel {
  min-height: 220px;
  padding: 22px;
  border: 1px solid #d8e0ea;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 16px 40px rgb(23 32 51 / 8%);
}

.props-panel h2,
.props-panel h3 {
  margin: 0 0 12px;
  color: #172033;
  line-height: 1.15;
}

.props-panel p {
  margin: 8px 0;
  color: #526070;
  line-height: 1.5;
}

.props-pill {
  display: inline-flex;
  align-items: center;
  margin: 6px 8px 0 0;
  padding: 6px 10px;
  border-radius: 999px;
  background: #e8f0f8;
  color: #24496c;
  font-size: 0.86rem;
  font-weight: 700;
}

.props-card {
  padding: 16px;
  border: 1px solid #c8d5e3;
  border-radius: 8px;
  background: #f8fbff;
}
```
</div>

运行命令：

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

## 9. 分节教学与练习

### 9.1 props object 的运行时本质

**结论：**

`props` 在运行时就是一个 JavaScript object。父组件决定传什么属性，React 在渲染 custom component 时把这些属性收集成 object，并作为 function component 的第一个参数传入。

**本节解决的问题：**

很多初学者把 props 当成 React 的神秘语法。其实从子组件角度看，`props` 更像普通 function parameter：React 调用你的 component function 时传入一个 object。

**技术意义：**

理解 props object 后，你会知道 component reuse 的本质：同一个子组件 function，可以被不同父组件用不同 props object 调用，返回不同 UI 描述。

**边界：语法、运行时、对象模型、类型系统、框架约定与平台 API：**

| Layer | Meaning |
| --- | --- |
| JSX syntax | `<ProfileSummary name="Mia" role="React learner" />` 是源码写法。 |
| React runtime | React 把 custom component attributes 组织成 props object。 |
| JavaScript object model | 子组件读取 `props.name`、`props.role`。 |
| TypeScript type system | `ProfileSummaryProps` 描述 object 形状。 |
| Platform API | 还没有进入 DOM attribute；这是 custom component 输入。 |

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/props-object-boundary/props-object-runtime-demo.tsx</span>
  </div>

```tsx
type ProfileSummaryProps = {
  name: string
  role: string
  lessonCount: number
}

function ProfileSummary(props: ProfileSummaryProps) {
  return (
    <article className="props-card">
      <h2>{props.name}</h2>
      <p>{props.role}</p>
      <p>{props.lessonCount} lessons completed</p>
    </article>
  )
}

export function PropsObjectRuntimeDemo() {
  return (
    <section className="props-panel">
      <ProfileSummary name="Mia" role="React learner" lessonCount={3} />
    </section>
  )
}
```
</div>

**逐行解释：**

- `ProfileSummaryProps` 是 TypeScript object type，用来描述 props object。
- `ProfileSummary(props: ProfileSummaryProps)` 接收完整 props object。
- `props.name`、`props.role`、`props.lessonCount` 都是读取 object property。
- `<ProfileSummary ... />` 是父组件传入属性的位置。
- `lessonCount={3}` 使用 JSX expression 传入 number，而不是 string。

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
  Snippet: function parameter comparison
```
</div>

普通 function parameter 对比：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: function parameter comparison</span>
  </div>

```ts
type ProfileSummaryInput = {
  name: string
  role: string
}

function formatProfileSummary(input: ProfileSummaryInput) {
  return `${input.name}: ${input.role}`
}

formatProfileSummary({ name: 'Mia', role: 'React learner' })
```
</div>

**执行过程：**

1. `PropsObjectRuntimeDemo` render 时返回 `<ProfileSummary ... />`。
2. React 识别 `ProfileSummary` 是 custom component。
3. React 准备一个 props object，形状近似 `{ name: "Mia", role: "React learner", lessonCount: 3 }`。
4. React 调用 `ProfileSummary(props)`。
5. `ProfileSummary` 根据 props 返回 `article`、`h2`、`p` 等 UI 描述。

**预期输出：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Output</span>
  </div>

```txt
Mia
React learner
3 lessons completed
```
</div>

**与真实项目的关系：**

真实项目中，card、list item、avatar、badge、layout section 往往都是通过 props 接收数据。你不是为每条数据写一个新 component，而是写一个可复用 component，再用不同 props 配置它。

**最终记忆模型：**

custom component 上的 JSX attributes 是父组件给子组件的输入；子组件运行时收到的是 props object。

### 9.2 JSX custom component attributes 如何变成 props

**结论：**

小写 DOM tag 和大写 custom component 的 attribute 处理方式不同。`<img alt="..." />` 的 props 由 React DOM 按浏览器 DOM 规则处理；`<ProfileBadge label="Featured" />` 的 `label` 会进入 `ProfileBadge` 的 props object。

**本节解决的问题：**

第二章已经讲过 JSX attribute 与 HTML attribute 不完全相同。本节进一步区分：写在 DOM tag 上和写在 custom component 上，后续去向不同。

**技术意义：**

这决定了你在设计 component API 时应该如何命名 props。`label`、`tone`、`isFeatured` 是你的 component 输入，不是浏览器内置 attribute。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/props-object-boundary/jsx-attributes-to-props-demo.tsx</span>
  </div>

```tsx
type LearningBadgeProps = {
  label: string
  tone: 'blue' | 'green'
}

function LearningBadge({ label, tone }: LearningBadgeProps) {
  return <span className={`props-pill props-pill-${tone}`}>{label}</span>
}

export function JsxAttributesToPropsDemo() {
  return (
    <section className="props-panel">
      <h2>JSX attributes to props</h2>
      <LearningBadge label="Required prop" tone="blue" />
      <LearningBadge label="Typed union" tone="green" />
    </section>
  )
}
```
</div>

**逐行解释：**

- `label` 和 `tone` 是 `LearningBadge` 自己定义的 props。
- `tone` 被限制为 `'blue' | 'green'`，传其他 string 会被 TypeScript 拦截。
- `<LearningBadge label="Required prop" tone="blue" />` 在运行时会形成 props object。
- `className` 写在 `<span>` 上，属于 React DOM common prop，会影响真实 DOM class。

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
  Snippet: DOM prop versus component prop
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: DOM prop versus component prop</span>
  </div>

```tsx
function AvatarImage() {
  return <img alt="Profile avatar" className="avatar" src="/avatar.png" />
}

function AvatarCard() {
  return <AvatarImage />
}
```
</div>

**为什么这个对比重要：**

- `alt`、`className`、`src` 写在 `img` 上，React DOM 知道如何处理它们。
- `AvatarImage` 没有 props parameter，因为 `<AvatarImage />` 没有传 custom props。
- 如果写 `<AvatarImage alt="..." />`，这个 `alt` 不会自动传给内部 `<img>`，除非 `AvatarImage` 明确接收并转发。

**执行过程：**

1. 父组件 render `LearningBadge`。
2. JSX attributes 被收集为 props object。
3. `LearningBadge` 读取 props 并返回 `<span>`。
4. React DOM 再处理 `<span>` 上的 `className` 和 children。

**最终记忆模型：**

大写 component attribute 先进入 component props；小写 DOM tag prop 才交给 React DOM 和浏览器。

### 9.3 destructuring props 与完整 props object 写法

**结论：**

完整 props object 写法更直观看出“props 是 object”；destructuring 写法更常用、更短。两者运行时本质一样：都是从同一个 props object 中读取属性。

**本节解决的问题：**

你会看到两种代码：

- `function Card(props: CardProps) { return <h2>{props.title}</h2> }`
- `function Card({ title }: CardProps) { return <h2>{title}</h2> }`

它们不是两套 React 机制，只是 JavaScript parameter 写法不同。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/props-object-boundary/props-destructuring-demo.tsx</span>
  </div>

```tsx
type LessonCardProps = {
  title: string
  summary: string
}

function LessonCardWithObject(props: LessonCardProps) {
  return (
    <article className="props-card">
      <h2>{props.title}</h2>
      <p>{props.summary}</p>
    </article>
  )
}

function LessonCardWithDestructuring({ title, summary }: LessonCardProps) {
  return (
    <article className="props-card">
      <h2>{title}</h2>
      <p>{summary}</p>
    </article>
  )
}

export function PropsDestructuringDemo() {
  return (
    <section className="props-panel">
      <LessonCardWithObject
        summary="Read properties from the props object."
        title="Object parameter"
      />
      <LessonCardWithDestructuring
        summary="Bind properties as local variables."
        title="Destructured parameter"
      />
    </section>
  )
}
```
</div>

**逐行解释：**

- `LessonCardProps` 是两个 component 共享的 props type。
- `LessonCardWithObject` 保留完整 `props` object。
- `LessonCardWithDestructuring` 在 parameter 位置直接取出 `title`、`summary`。
- 两个 component 的调用方式完全一样：父组件仍然用 JSX attributes 传值。

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
  Snippet: destructuring type annotation mistake
```
</div>

常见 TypeScript destructuring 误解：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: destructuring type annotation mistake</span>
  </div>

```tsx
function BrokenCard({ title: string }) {
  return <h2>{title}</h2>
}
```
</div>

**为什么错：**

在 JavaScript destructuring 语法里，`{ title: string }` 的意思不是“`title` 是 string”，而是“把 `title` 属性重命名为局部变量 `string`”。所以 `title` 在函数体里不存在。

正确写法：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: destructuring type annotation correction</span>
  </div>

```tsx
type CardProps = {
  title: string
}

function FixedCard({ title }: CardProps) {
  return <h2>{title}</h2>
}
```
</div>

**最终记忆模型：**

destructuring 是 JavaScript 参数语法；props type 标注应该放在整个 parameter 后面，而不是 destructuring 属性名后面。

### 9.4 required props、optional props 与 default values

**结论：**

required prop 在 TypeScript object type 中没有 `?`，调用组件时必须传。optional prop 使用 `?`，组件内部读取时要考虑 `undefined`。default value 是 JavaScript destructuring 机制：当 prop 缺失或值为 `undefined` 时使用默认值。

**本节解决的问题：**

props 类型不是只有“写不写 type”这么简单。你需要明确哪些输入是组件正常工作必需的，哪些输入可以省略，以及省略时组件内部应该使用什么默认值。

**示例代码：required props**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/props-type-boundary/required-props-demo.tsx</span>
  </div>

```tsx
type RequiredLessonProps = {
  title: string
  durationMinutes: number
}

function RequiredLesson({ title, durationMinutes }: RequiredLessonProps) {
  return (
    <article className="props-card">
      <h2>{title}</h2>
      <p>{durationMinutes} minutes</p>
    </article>
  )
}

export function RequiredPropsDemo() {
  return (
    <section className="props-panel">
      <RequiredLesson title="Props object" durationMinutes={18} />
    </section>
  )
}
```
</div>

**示例代码：optional props**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/props-type-boundary/optional-props-demo.tsx</span>
  </div>

```tsx
type OptionalLessonProps = {
  title: string
  summary?: string
}

function OptionalLesson({ title, summary }: OptionalLessonProps) {
  return (
    <article className="props-card">
      <h2>{title}</h2>
      {summary ? <p>{summary}</p> : <p>No summary provided.</p>}
    </article>
  )
}

export function OptionalPropsDemo() {
  return (
    <section className="props-panel">
      <OptionalLesson title="Required title" />
      <OptionalLesson title="Optional summary" summary="This card has more detail." />
    </section>
  )
}
```
</div>

**示例代码：default prop values**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/props-type-boundary/default-prop-values-demo.tsx</span>
  </div>

```tsx
type DefaultLessonProps = {
  title: string
  level?: 'beginner' | 'intermediate'
}

function DefaultLesson({ title, level = 'beginner' }: DefaultLessonProps) {
  return (
    <article className="props-card">
      <h2>{title}</h2>
      <p>{level}</p>
    </article>
  )
}

export function DefaultPropValuesDemo() {
  return (
    <section className="props-panel">
      <DefaultLesson title="Default level" />
      <DefaultLesson title="Explicit level" level="intermediate" />
    </section>
  )
}
```
</div>

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
  Snippet: missing required prop error
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: missing required prop error</span>
  </div>

```tsx
type LessonProps = {
  title: string
  durationMinutes: number
}

function Lesson({ title, durationMinutes }: LessonProps) {
  return <p>{title}: {durationMinutes}</p>
}

function BrokenUsage() {
  return <Lesson title="Props object" />
}
```
</div>

**预期错误：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Error</span>
  </div>

```txt
Property 'durationMinutes' is missing in type '{ title: string; }' but required in type 'LessonProps'.
```
</div>

**执行过程：**

- required props 在调用处被检查，缺失会阻止 `tsc -b` 通过。
- optional props 在组件内部可能是 `undefined`，需要条件渲染或默认值。
- default value 在 JavaScript runtime 生效，不只是 TypeScript 标注。

**最终记忆模型：**

required 决定“调用者必须传”；optional 决定“调用者可以不传”；default value 决定“组件内部没拿到值时用什么”。

### 9.5 boolean props 的正确写法

**结论：**

boolean props 应传 boolean value，不要传 `"true"` 或 `"false"` string。对 custom component，`<ProfileBadge isFeatured />` 等价于 `isFeatured={true}`；如果要传 false，写 `isFeatured={false}` 或省略后用 default value。

**本节解决的问题：**

HTML boolean attribute 和 React custom component boolean prop 很容易混淆。HTML 中 boolean attribute 看的是 attribute 是否存在；React custom component props 是 JavaScript value。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/props-type-boundary/boolean-props-demo.tsx</span>
  </div>

```tsx
type BooleanBadgeProps = {
  label: string
  isFeatured?: boolean
}

function BooleanBadge({ label, isFeatured = false }: BooleanBadgeProps) {
  return (
    <article className="props-card">
      <h2>{label}</h2>
      <p>{isFeatured ? 'Featured profile' : 'Standard profile'}</p>
    </article>
  )
}

export function BooleanPropsDemo() {
  return (
    <section className="props-panel">
      <BooleanBadge label="Mia" isFeatured />
      <BooleanBadge label="Noah" isFeatured={false} />
      <BooleanBadge label="Ava" />
    </section>
  )
}
```
</div>

**逐行解释：**

- `isFeatured?: boolean` 表示 prop 可省略。
- `isFeatured = false` 给省略或 `undefined` 的情况默认值。
- `<BooleanBadge label="Mia" isFeatured />` 传入 `true`。
- `<BooleanBadge label="Noah" isFeatured={false} />` 明确传入 `false`。
- `<BooleanBadge label="Ava" />` 触发默认值 `false`。

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
  Snippet: boolean prop string mistake
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: boolean prop string mistake</span>
  </div>

```tsx
type BadgeProps = {
  isFeatured: boolean
}

function Badge({ isFeatured }: BadgeProps) {
  return <p>{isFeatured ? 'Featured' : 'Standard'}</p>
}

function BrokenUsage() {
  return <Badge isFeatured="false" />
}
```
</div>

**预期错误：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Error</span>
  </div>

```txt
Type 'string' is not assignable to type 'boolean'.
```
</div>

**与 HTML boolean attribute 的区别：**

HTML 的 `disabled="false"` 仍然因为 attribute 存在而可能表现为 true；React custom component 的 `isFeatured="false"` 是 string，不是 boolean。TypeScript 可以帮你在源码里阻止这种误用。

**最终记忆模型：**

custom component boolean props 是 JavaScript boolean；不要把 HTML 字符串属性习惯搬到 typed props 上。

### 9.6 children prop 基础

**结论：**

`children` 是一个特殊但仍然普通的 prop。嵌套在 component tag 中间的 JSX 会作为 `children` 传给子组件。本章只讲基础 children：用它包装内容、组合静态 UI，不讲 render props、compound components 或高级 children 模式。

**本节解决的问题：**

有些组件的输入不适合用 `title`、`summary` 这类命名 props 完全表达。例如 card、panel、layout section 常常需要接收一块 JSX 内容，这时就用 `children`。

**示例代码：基础组合**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/children-props-basics/children-basic-composition.tsx</span>
  </div>

```tsx
import type { ReactNode } from 'react'

type LearningPanelProps = {
  title: string
  children: ReactNode
}

function LearningPanel({ title, children }: LearningPanelProps) {
  return (
    <article className="props-card">
      <h2>{title}</h2>
      <div>{children}</div>
    </article>
  )
}

export function ChildrenBasicComposition() {
  return (
    <section className="props-panel">
      <LearningPanel title="Children prop">
        <p>Nested JSX becomes the children prop.</p>
        <span className="props-pill">ReactNode</span>
      </LearningPanel>
    </section>
  )
}
```
</div>

**示例代码：可渲染边界**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/children-props-basics/children-renderable-boundary.tsx</span>
  </div>

```tsx
import type { ReactNode } from 'react'

type RenderableBoxProps = {
  children: ReactNode
}

function RenderableBox({ children }: RenderableBoxProps) {
  return <article className="props-card">{children}</article>
}

export function ChildrenRenderableBoundary() {
  return (
    <section className="props-panel">
      <RenderableBox>
        <h2>Renderable children</h2>
        <p>String, number, JSX elements, null, and arrays can be React nodes.</p>
        {null}
        {false}
      </RenderableBox>
    </section>
  )
}
```
</div>

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
  Snippet: children object mistake
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: children object mistake</span>
  </div>

```tsx
const profile = {
  name: 'Mia',
  role: 'React learner',
}

function BrokenChildren() {
  return <section>{profile}</section>
}
```
</div>

**为什么错：**

普通 object 不是可渲染 React child。应该渲染 object 的具体属性，或者把 object 转成数组、string、JSX element。

**修正：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: children object correction</span>
  </div>

```tsx
const profile = {
  name: 'Mia',
  role: 'React learner',
}

function FixedChildren() {
  return (
    <section>
      <h2>{profile.name}</h2>
      <p>{profile.role}</p>
    </section>
  )
}
```
</div>

**最终记忆模型：**

`children` 是嵌套 JSX 形成的 prop；它可以是很多 React node，但不能直接是普通 object。

### 9.7 props readonly 原则

**结论：**

props 应该被当作只读输入。子组件可以读取 props、根据 props 计算局部值、把 props 传给更深层组件，但不应该修改 props object 或 props object 里的数据。

**本节解决的问题：**

如果子组件能随意修改 props，那么父组件的数据来源、render 输出和调试过程都会变得不可预测。React 文档把 props 称作每次 render 的只读快照。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/props-object-boundary/props-readonly-mistake.tsx</span>
  </div>

```tsx
type ReadonlyProfileProps = {
  profile: {
    name: string
    role: string
  }
}

function ReadonlyProfile({ profile }: ReadonlyProfileProps) {
  const displayName = profile.name.toUpperCase()

  return (
    <article className="props-card">
      <h2>{displayName}</h2>
      <p>{profile.role}</p>
    </article>
  )
}

export function PropsReadonlyMistake() {
  const profile = {
    name: 'Mia',
    role: 'React learner',
  }

  return (
    <section className="props-panel">
      <ReadonlyProfile profile={profile} />
    </section>
  )
}
```
</div>

**逐行解释：**

- `ReadonlyProfile` 接收 `profile` prop。
- 它没有修改 `profile.name`，而是创建局部值 `displayName`。
- 这是允许的：render 期间创建新的局部变量不污染外部数据。
- 父组件仍然拥有 `profile` 的来源。

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
  Snippet: mutate props mistake
```
</div>

错误写法：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: mutate props mistake</span>
  </div>

```tsx
type ProfileProps = {
  profile: {
    name: string
    role: string
  }
}

function BrokenProfile({ profile }: ProfileProps) {
  profile.name = profile.name.toUpperCase()

  return <h2>{profile.name}</h2>
}
```
</div>

**为什么错：**

这会修改父组件传入的 object。即使 TypeScript 默认不一定阻止这种 deep mutation，React 的 mental model 也要求你把 props 当成只读快照。如果确实需要变更 UI，应让父组件传入新的 props；如果需要组件内部记住变化，应进入 state 章节。

**TypeScript 强化写法：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: readonly props type</span>
  </div>

```tsx
type ProfileProps = {
  readonly profile: {
    readonly name: string
    readonly role: string
  }
}
```
</div>

**最终记忆模型：**

props 是输入，不是子组件的存储空间。读取它、派生局部值、渲染它；不要修改它。

### 9.8 TypeScript props 类型检查与运行时边界

**结论：**

TypeScript 检查的是源码中 component 使用方式是否符合 props type。它不会在浏览器运行时保留 `type Props`，也不会自动验证来自 API、localStorage、URL、用户输入等外部来源的数据。

**本节解决的问题：**

初学者很容易以为写了 `type ProfileProps = { name: string }`，运行时就一定不会收到非 string。事实是：TypeScript 类型会被擦除，浏览器只看到 JavaScript value。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/props-type-boundary/typescript-runtime-boundary-demo.tsx</span>
  </div>

```tsx
type RuntimeBoundaryProfileProps = {
  name: string
  completedLessons: number
}

function RuntimeBoundaryProfile({
  name,
  completedLessons,
}: RuntimeBoundaryProfileProps) {
  return (
    <article className="props-card">
      <h2>{name}</h2>
      <p>{completedLessons} completed lessons</p>
    </article>
  )
}

export function TypeScriptRuntimeBoundaryDemo() {
  const profile = {
    name: 'Mia',
    completedLessons: 3,
  }

  return (
    <section className="props-panel">
      <RuntimeBoundaryProfile
        name={profile.name}
        completedLessons={profile.completedLessons}
      />
    </section>
  )
}
```
</div>

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
  Snippet: erased props type boundary
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: erased props type boundary</span>
  </div>

```tsx
type ProfileProps = {
  name: string
}

function Profile({ name }: ProfileProps) {
  return <h2>{name.toUpperCase()}</h2>
}
```
</div>

运行时近似只剩下 value-level 逻辑：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Output</span>
  </div>

```txt
function Profile({ name }) {
  return jsx("h2", { children: name.toUpperCase() })
}
```
</div>

**为什么重要：**

如果 `name` 来自外部数据，TypeScript 不能保证运行时它一定是 string。你需要在数据进入系统边界时做 runtime validation。本章不展开 data fetching 和 validation library，只建立边界。

**最终记忆模型：**

TypeScript 检查你写的 TSX；浏览器运行 JavaScript。props type 是开发期契约，不是运行时保险。

### 9.9 props 与 state 的边界预告

**结论：**

`props` 是外部输入，由父组件决定；`state` 是组件内部由 React 管理、会随交互或时间变化的数据。本章只建立边界，不学习 `useState`。

**本节解决的问题：**

当你想“修改 props”时，通常说明你需要换一个模型：

- 如果值来自父组件，让父组件传入新的 props。
- 如果值属于子组件内部交互，后续用 state。
- 如果只是显示格式变化，在 render 中创建派生局部值。

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
  Snippet: props versus state boundary
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: props versus state boundary</span>
  </div>

```tsx
type ProfileCardProps = {
  name: string
}

function ProfileCard({ name }: ProfileCardProps) {
  const displayName = name.toUpperCase()

  return <h2>{displayName}</h2>
}
```
</div>

**解释：**

- `name` 是 props，来自父组件。
- `displayName` 是 render 中的派生局部值，不是 state。
- 如果未来需要用户点击按钮修改名字，那不是修改 props，而是 state 或父组件数据流的问题。

**最终记忆模型：**

props 回答“外部给我什么”；state 回答“我自己记住什么”。第三章只学外部输入。

## 10. API / 语法索引

| API / Syntax | Layer | Meaning | Common Mistake |
| --- | --- | --- | --- |
| `<Component propName={value} />` | JSX / React runtime | 向 custom component 传 prop。 | 以为它是 HTML attribute。 |
| `function Component(props: Props)` | JavaScript function / TypeScript | 用完整 object 接收 props。 | 忘记 props 是 object。 |
| `function Component({ title }: Props)` | JavaScript destructuring / TypeScript | 从 props object 中取属性。 | 写成 `{ title: string }`。 |
| `type Props = { title: string }` | TypeScript object type | 定义 required prop。 | 调用时不传。 |
| `summary?: string` | TypeScript optional property | 定义 optional prop。 | 读取时忽略 `undefined`。 |
| `{ size = 100 }: Props` | JavaScript default parameter | 为缺失或 `undefined` 的 prop 提供默认值。 | 以为 default value 会改变调用方。 |
| `<Badge isFeatured />` | JSX boolean shorthand | 等价于 `isFeatured={true}`。 | 写成 `isFeatured="true"`。 |
| `children: ReactNode` | React type / JSX children | 接收嵌套 JSX。 | 用普通 object 作为 children。 |
| `readonly` | TypeScript property modifier | 阻止源码层赋值。 | 以为它会冻结 runtime object。 |
| `ReactNode` | React type | 表示可作为 children 的广泛 React node。 | 误以为能限制具体 JSX element 类型。 |

## 11. 常见错误表

| Error | Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| Missing required prop | TypeScript | Required property must be present. | Pass the prop or make it optional. | Error includes `Property ... is missing`. |
| Passing string to boolean prop | TypeScript / JSX | Boolean prop expects boolean value. | Use `isFeatured` or `isFeatured={false}`. | Error includes `Type 'string' is not assignable to type 'boolean'`. |
| Destructuring type annotation mistake | JavaScript syntax / TypeScript | `{ title: string }` renames property, not type annotation. | Use `function Card({ title }: CardProps)`. | Local variable `title` cannot be found. |
| Mutating props | React rule / object model | Props are read-only snapshots. | Derive local values or ask parent for new props. | Code assigns to a prop or nested prop. |
| Rendering object children | React runtime | Plain object is not a React node. | Render object properties or JSX. | Browser error mentions objects are not valid as a React child. |
| Expecting TypeScript runtime validation | TypeScript boundary | Types are erased. | Validate external data at runtime. | Bug appears only with API or stored data. |
| Using `React.FC` as default habit | Type style | It can hide beginner mental model. | Use explicit props type on function parameter first. | You cannot explain where children came from. |

## 12. 最终小项目

### 项目目标

最终小项目：`Props Composition Gallery`。

目标是用多个 typed components 组成一个静态资料卡片页面，展示：

- parent-to-child props
- required props
- optional props
- default values
- boolean props
- children prop
- component composition
- TypeScript props checking
- CSS class 与 JSX `className` 的边界

不使用 state、effect、router、外部 UI 库、data fetching 或测试框架。

### 为什么适合本章

这个项目把 props 放在真实 component tree 中，而不是只看一个孤立函数。`PropsCompositionGallery` 是 parent，负责准备数据并把数据传给 `ProfileCardGrid`；`ProfileCardGrid` 把每个 profile 继续传给 `ProfileCard`；`ProfileCard` 再把 avatar、badge、children 分给更小组件。你可以看到 props 如何沿着 component tree 从上往下流动。

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
      chapter-03-props-basics/
        props-composition-gallery/
          profile-card-data.ts
          profile-avatar.tsx
          profile-badge.tsx
          profile-card.tsx
          profile-card-grid.tsx
          props-composition-gallery.tsx
          props-composition-gallery.css
```
</div>

### 文件职责

| File | Responsibility |
| --- | --- |
| `src/App.tsx` | Thin adapter；临时挂载 `PropsCompositionGallery`。 |
| `src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card-data.ts` | 定义 profile 数据类型和静态数据。 |
| `src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-avatar.tsx` | 接收 required props，渲染头像占位 UI。 |
| `src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-badge.tsx` | 接收 optional / default / boolean props，渲染 badge。 |
| `src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card.tsx` | 组合 avatar、badge、children，展示单个 profile。 |
| `src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card-grid.tsx` | 接收 profile array，向每个 card 传 props。 |
| `src/learning/react/chapter-03-props-basics/props-composition-gallery/props-composition-gallery.tsx` | 项目 root component，准备页面结构。 |
| `src/learning/react/chapter-03-props-basics/props-composition-gallery/props-composition-gallery.css` | 小项目样式。 |

### 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/App.tsx</span>
  </div>

```tsx
import { PropsCompositionGallery } from './learning/react/chapter-03-props-basics/props-composition-gallery/props-composition-gallery'

function App() {
  return <PropsCompositionGallery />
}

export default App
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card-data.ts</span>
  </div>

```ts
export type ProfileCardData = {
  id: string
  name: string
  role: string
  initials: string
  completedLessons: number
  isFeatured?: boolean
  badgeLabel?: string
  focusAreas: string[]
}

export const profileCards: ProfileCardData[] = [
  {
    id: 'mia',
    name: 'Mia Chen',
    role: 'React learner',
    initials: 'MC',
    completedLessons: 3,
    isFeatured: true,
    badgeLabel: 'Featured',
    focusAreas: ['props', 'children', 'composition'],
  },
  {
    id: 'noah',
    name: 'Noah Smith',
    role: 'TypeScript beginner',
    initials: 'NS',
    completedLessons: 2,
    focusAreas: ['required props', 'optional props'],
  },
  {
    id: 'ava',
    name: 'Ava Patel',
    role: 'Frontend student',
    initials: 'AP',
    completedLessons: 4,
    isFeatured: false,
    badgeLabel: 'Practice',
    focusAreas: ['boolean props', 'default values'],
  },
]
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-avatar.tsx</span>
  </div>

```tsx
type ProfileAvatarProps = {
  initials: string
  name: string
}

export function ProfileAvatar({ initials, name }: ProfileAvatarProps) {
  return (
    <div className="profile-avatar" aria-label={`${name} avatar`}>
      {initials}
    </div>
  )
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-badge.tsx</span>
  </div>

```tsx
type ProfileBadgeProps = {
  label?: string
  isFeatured?: boolean
}

export function ProfileBadge({
  label = 'Learning',
  isFeatured = false,
}: ProfileBadgeProps) {
  const className = isFeatured ? 'profile-badge featured-badge' : 'profile-badge'

  return <span className={className}>{label}</span>
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card.tsx</span>
  </div>

```tsx
import type { ReactNode } from 'react'
import { ProfileAvatar } from './profile-avatar'
import { ProfileBadge } from './profile-badge'

type ProfileCardProps = {
  name: string
  role: string
  initials: string
  completedLessons: number
  isFeatured?: boolean
  badgeLabel?: string
  children: ReactNode
}

export function ProfileCard({
  name,
  role,
  initials,
  completedLessons,
  isFeatured = false,
  badgeLabel,
  children,
}: ProfileCardProps) {
  return (
    <article className="profile-card">
      <header className="profile-card-header">
        <ProfileAvatar initials={initials} name={name} />
        <div>
          <h2>{name}</h2>
          <p>{role}</p>
        </div>
      </header>

      <ProfileBadge label={badgeLabel} isFeatured={isFeatured} />

      <p className="profile-progress">
        {completedLessons} completed lessons
      </p>

      <div className="profile-card-children">{children}</div>
    </article>
  )
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/props-composition-gallery/profile-card-grid.tsx</span>
  </div>

```tsx
import type { ProfileCardData } from './profile-card-data'
import { ProfileCard } from './profile-card'

type ProfileCardGridProps = {
  profiles: ProfileCardData[]
}

export function ProfileCardGrid({ profiles }: ProfileCardGridProps) {
  return (
    <section className="profile-grid" aria-label="Profile cards">
      {profiles.map((profile) => (
        <ProfileCard
          badgeLabel={profile.badgeLabel}
          completedLessons={profile.completedLessons}
          initials={profile.initials}
          isFeatured={profile.isFeatured}
          key={profile.id}
          name={profile.name}
          role={profile.role}
        >
          <ul className="focus-list">
            {profile.focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </ProfileCard>
      ))}
    </section>
  )
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/props-composition-gallery/props-composition-gallery.tsx</span>
  </div>

```tsx
import { profileCards } from './profile-card-data'
import { ProfileCardGrid } from './profile-card-grid'
import './props-composition-gallery.css'

export function PropsCompositionGallery() {
  return (
    <main className="props-gallery-shell">
      <header className="props-gallery-header">
        <p className="props-gallery-eyebrow">React Chapter 03</p>
        <h1>Props Composition Gallery</h1>
        <p>
          A static component tree for practicing typed props, default values,
          boolean props, children, and parent-to-child data flow.
        </p>
      </header>

      <ProfileCardGrid profiles={profileCards} />
    </main>
  )
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-03-props-basics/props-composition-gallery/props-composition-gallery.css</span>
  </div>

```css
.props-gallery-shell {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 56px 0;
}

.props-gallery-header {
  max-width: 760px;
  margin-bottom: 28px;
}

.props-gallery-eyebrow {
  margin: 0 0 8px;
  color: #335c81;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.props-gallery-header h1 {
  margin: 0;
  color: #172033;
  font-size: clamp(2rem, 4vw, 3.35rem);
  line-height: 1;
}

.props-gallery-header p:last-child {
  margin: 16px 0 0;
  color: #526070;
  line-height: 1.6;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
}

.profile-card {
  padding: 22px;
  border: 1px solid #d8e0ea;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 16px 40px rgb(23 32 51 / 8%);
}

.profile-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.profile-avatar {
  display: grid;
  width: 56px;
  height: 56px;
  place-items: center;
  border-radius: 8px;
  background: #335c81;
  color: #ffffff;
  font-weight: 800;
}

.profile-card h2 {
  margin: 0;
  color: #172033;
}

.profile-card p {
  margin: 6px 0;
  color: #526070;
  line-height: 1.5;
}

.profile-badge {
  display: inline-flex;
  margin-bottom: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: #e8f0f8;
  color: #24496c;
  font-size: 0.85rem;
  font-weight: 700;
}

.featured-badge {
  background: #e7f4ef;
  color: #1f5b4d;
}

.profile-progress {
  font-weight: 700;
}

.profile-card-children {
  margin-top: 14px;
}

.focus-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.focus-list li {
  padding: 6px 10px;
  border-radius: 999px;
  background: #f3f6fa;
  color: #334155;
  font-size: 0.85rem;
}
```
</div>

### 运行方式

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

页面会展示一个静态资料卡片 gallery：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Output</span>
  </div>

```txt
Props Composition Gallery
Mia Chen
React learner
Featured
3 completed lessons
props children composition
```
</div>

### 核心执行流程

1. `src/sudoku/main.tsx` 创建 React root 并渲染 `App`。
2. `src/App.tsx` 渲染 `PropsCompositionGallery`。
3. `PropsCompositionGallery` import `profileCards`，把它作为 `profiles` prop 传给 `ProfileCardGrid`。
4. `ProfileCardGrid` 遍历 `profiles`，把每个 profile 的字段拆成 props 传给 `ProfileCard`。
5. `ProfileCard` 把 `initials`、`name` 传给 `ProfileAvatar`，把 `badgeLabel`、`isFeatured` 传给 `ProfileBadge`。
6. `ProfileCardGrid` 嵌套的 `<ul>` 进入 `ProfileCard` 的 `children` prop。
7. TypeScript 在 compile time 检查每个 component 是否收到正确 props。
8. 浏览器 runtime 不知道 `ProfileCardData` type；它只运行最终 JavaScript。

### 常见错误

| Error | Why It Happens | Fix |
| --- | --- | --- |
| Missing `profiles` on `ProfileCardGrid` | `profiles` 是 required prop。 | Pass `profiles={profileCards}`. |
| Passing `isFeatured="false"` | string 不是 boolean。 | Use `isFeatured={false}`. |
| Forgetting `children` in `ProfileCardProps` | `ProfileCard` renders `children` but props type does not include it. | Add `children: ReactNode`. |
| Mutating `profile` in `ProfileCardGrid` | props data should be treated as read-only render input. | Create derived local values instead. |
| Expecting runtime validation | TypeScript types are erased. | Validate external data before rendering. |

### 可选扩展

- 为 `badgeLabel` 添加 union type，例如 `'Featured' | 'Practice' | 'Learning'`。
- 把 `ProfileBadge` 的 visual tone 拆成独立 optional prop。
- 增加 `empty profile list` 的静态展示分支。
- 等学习 state 后，让 gallery 支持筛选；不要在本章提前实现。

## 13. 额外速查表

### 一句话概念总结

Props 是父组件传给子组件的只读输入对象；JSX custom component attributes 会在 React runtime 中变成 props object，TypeScript 在 compile time 检查这个 object 的形状。

### 常用 API 表

| API / Syntax | Layer | Purpose | Common Mistake |
| --- | --- | --- | --- |
| `<Component title="..." />` | JSX / React runtime | 传 string prop。 | 以为它是 DOM attribute。 |
| `<Component count={3} />` | JSX / JavaScript value | 传 number prop。 | 写成 `"3"`。 |
| `<Component isActive />` | JSX boolean shorthand | 传 `true`。 | 用 `"true"`。 |
| `<Component isActive={false} />` | JSX expression | 传 `false`。 | 误写成 `"false"`。 |
| `<Panel>...</Panel>` | JSX children | 传 children prop。 | 在 props type 中漏写 `children`。 |
| `type Props = { title: string }` | TypeScript | 定义 required prop。 | 调用时不传。 |
| `summary?: string` | TypeScript | 定义 optional prop。 | 不处理 `undefined`。 |
| `{ level = 'beginner' }` | JavaScript default value | 设置默认值。 | 以为它能验证外部数据。 |

### 相似概念对照表

| Concept A | Concept B | Key Difference | Practical Rule |
| --- | --- | --- | --- |
| props | state | props 来自外部；state 属于组件内部。 | 本章只写 props，不写 state。 |
| custom component prop | HTML attribute | 前者进入 component function；后者由 React DOM 映射到 DOM。 | 大写组件和小写 tag 分开想。 |
| required prop | optional prop | required 调用时必须传；optional 可以省略。 | 用 `?` 标记 optional。 |
| optional prop | default value | optional 是 type 层；default value 是 runtime 层。 | 两者经常一起使用。 |
| `children` | named props | children 来自嵌套 JSX；named props 来自 attributes。 | layout/wrapper 用 children。 |
| TypeScript props type | runtime validation | type 会擦除；runtime validation 需要额外代码。 | 外部数据不要只信 TS。 |

### 错误类型表

| Error | Error Type | Violated Rule | Correction |
| --- | --- | --- | --- |
| Missing required prop | TypeScript | Required property must be passed. | Pass prop or mark optional. |
| Wrong prop type | TypeScript | Value type does not match props type. | Pass the correct JavaScript value. |
| Mutating props | React rule | Props are read-only snapshots. | Derive local value or change parent data. |
| Object child | React runtime | Plain object is not renderable. | Render properties or JSX. |
| Wrong destructuring annotation | JavaScript syntax | Destructuring rename is not type annotation. | Type the whole parameter. |
| Runtime data mismatch | Runtime | TypeScript was erased. | Validate external data. |

### 真实项目使用表

| Scenario | Why It Appears | Practical Rule |
| --- | --- | --- |
| Card component | Many items share UI shape but have different data. | Use props for item data. |
| Badge component | Small reusable visual unit. | Use optional and boolean props carefully. |
| Layout wrapper | Wrapper does not know exact nested content. | Use basic `children`. |
| Static gallery | Good props practice before state. | Keep data static in this chapter. |
| API data later | External data can be malformed. | Runtime validation belongs at data boundary. |

### 最小代码模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: typed props component</span>
  </div>

```tsx
type InfoCardProps = {
  title: string
  summary?: string
  isHighlighted?: boolean
}

export function InfoCard({
  title,
  summary = 'No summary provided.',
  isHighlighted = false,
}: InfoCardProps) {
  return (
    <article className={isHighlighted ? 'info-card highlighted' : 'info-card'}>
      <h2>{title}</h2>
      <p>{summary}</p>
    </article>
  )
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: typed children wrapper</span>
  </div>

```tsx
import type { ReactNode } from 'react'

type SectionPanelProps = {
  title: string
  children: ReactNode
}

export function SectionPanel({ title, children }: SectionPanelProps) {
  return (
    <section className="section-panel">
      <h2>{title}</h2>
      {children}
    </section>
  )
}
```
</div>

## 14. 工程迁移与代码审查要点

### Code review questions

- 组件的 required props 是否表达了真正不可缺少的业务输入？
- 默认值是否只处理展示 fallback，而不是吞掉数据错误？
- 子组件是否通过 callback 通知父级，而不是修改 props？

### Migration checks

- 拆分旧组件时，先列出子组件真正需要的 props，再写类型。
- 把隐式全局读取改成显式 props 传入，便于测试和复用。
- children 适合布局槽，不适合绕过清晰的数据契约。

### Production risk signals

- 组件参数越来越多时，检查是否需要拆分业务对象或组件职责。
- 大量 optional props 组合可能说明组件承担了过多变体。
- props 类型和运行时数据不一致时，需要补充边界转换或校验。

## 15. 如何转换成个人笔记

建议把本章整理成六张卡片：

| Card | Must Include |
| --- | --- |
| Props runtime model | Parent JSX attributes -> props object -> child parameter。 |
| Props typing | required、optional、default、boolean 的写法和边界。 |
| Children basics | `children: ReactNode`、嵌套 JSX、object child 错误。 |
| Readonly rule | props 是只读快照，不能在子组件里修改。 |
| TypeScript boundary | compile time checking、type erasure、runtime validation 边界。 |
| Props vs state | props 是外部输入；state 是内部 React-managed data。 |

做笔记时，不要只抄代码。每个 props 写法都要回答三件事：

- 调用者在 JSX 中写什么？
- 子组件运行时收到什么 object？
- TypeScript 在 compile time 检查什么？

## 16. 必须能回答的问题

学完本章后，你必须能回答：

1. props 是什么？
2. `<ProfileCard name="Mia" />` 中的 `name` 如何进入子组件？
3. custom component prop 和 HTML attribute 有什么区别？
4. `props` 和普通 function parameter 有什么关系？
5. destructuring props 写法的 TypeScript 标注应该放在哪里？
6. required prop 和 optional prop 的语法区别是什么？
7. default value 在什么时候生效？
8. `<Badge isFeatured />` 和 `<Badge isFeatured={false} />` 分别传入什么？
9. children prop 从哪里来？
10. 为什么不能在子组件里修改 props？
11. TypeScript props type 为什么不能验证 browser runtime 的外部数据？
12. props 和 state 的边界是什么？
13. 为什么第三章练习文件不应该继续堆到 `App.tsx`？
14. 如何检查真实路径引用、目录结构和代码窗口 title bar 是否服务同一个学习目标？

## 17. 最终记忆模型

本章最终要记住：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终记忆模型</span>
  </div>

```txt
Props are parent-owned input.
JSX custom component attributes become a props object.
The child component receives that object as a function parameter.
TypeScript checks the object shape before runtime.
The browser runs JavaScript after TypeScript types are erased.
Props should be treated as read-only render snapshots.
```
</div>

换成中文理解：

- props 是父组件给子组件的输入，不是子组件自己的存储空间。
- JSX attributes 写在大写 component 上，会成为 props object。
- function component 是 function，props 是它的 parameter。
- TypeScript 帮你检查 props 的形状，但不会在浏览器 runtime 保留类型。
- 如果想改变输入，让父组件传新的 props；如果想记住内部变化，进入 state 章节。

## 18. 官方文档阅读清单

建议按这个顺序阅读：

| Source | Link | 本章重点 |
| --- | --- | --- |
| React | [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component) | props 传递、读取、default values、children、readonly snapshots。 |
| React | [Using TypeScript](https://react.dev/learn/typescript) | React component props typing、`.tsx`、`ReactNode` children 类型。 |
| React | [Keeping Components Pure](https://react.dev/learn/keeping-components-pure) | props readonly 与 render purity 的关系。 |
| React DOM | [Common components](https://react.dev/reference/react-dom/components/common) | built-in DOM props、`children`、`className`、`style`、`htmlFor`。 |
| TypeScript | [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html) | optional properties、default destructuring、readonly properties。 |
| TypeScript | [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html) | intrinsic elements、value-based elements、attribute checking、children checking。 |
| TypeScript | [TSConfig jsx](https://www.typescriptlang.org/tsconfig/#jsx) | `react-jsx` transform 与当前项目 `tsconfig.app.json` 的关系。 |
| MDN | [HTML attribute reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes) | HTML attribute、content attribute、IDL attribute、boolean attribute。 |
| MDN | [Boolean attribute](https://developer.mozilla.org/en-US/docs/Glossary/Boolean/HTML) | HTML boolean attribute 的 presence/absence 规则。 |
| Vite | [Getting Started](https://vite.dev/guide/) | `index.html`、module graph、dev/build 命令边界。 |

本地辅助资料：

- `references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf`

使用方式：

- 该 PDF 的 `React Props` 章节用于辅助理解 parent-to-child data flow、props object 和 props immutable 原则。
- 该 PDF 的示例多使用 `App.jsx` 和 JavaScript 写法；本章根据当前项目改写为 React + TypeScript + Vite 的 `.tsx` 练习结构。
- 如果 PDF 与当前 React 官方文档冲突，以 React 官方文档为准。

Verification Needed：

- 本章只创建学习指导文档，没有实际创建第三章源码练习文件。
- 文档中的所有最终小项目代码需要在真实创建文件后运行 `npm run build` 验证。
- 当前项目入口处于第二章练习挂载状态；执行第三章小项目时需要临时替换 `src/App.tsx`，完成后按学习计划恢复或继续下一章。
