# React 第四章：State、Events 与交互更新机制

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
  color: #c9d1d9;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
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
  - [9.1 event handler 是传给 React 的 callback function](#91-event-handler-是传给-react-的-callback-function)
  - [9.2 传递函数和调用函数的区别](#92-传递函数和调用函数的区别)
  - [9.3 React event object、event propagation 与 preventDefault](#93-react-event-objectevent-propagation-与-preventdefault)
  - [9.4 useState 创建组件记忆](#94-usestate-创建组件记忆)
  - [9.5 普通变量为什么不能保存 UI 状态](#95-普通变量为什么不能保存-ui-状态)
  - [9.6 state setter 不是立即修改当前变量](#96-state-setter-不是立即修改当前变量)
  - [9.7 state as snapshot：每次 render 都拿到固定快照](#97-state-as-snapshot每次-render-都拿到固定快照)
  - [9.8 batching：多个 state update 会被批处理](#98-batching多个-state-update-会被批处理)
  - [9.9 functional update：基于上一次 state 计算下一次 state](#99-functional-update基于上一次-state-计算下一次-state)
  - [9.10 object state update：替换对象，不直接 mutation](#910-object-state-update替换对象不直接-mutation)
  - [9.11 array state update：创建新数组，不直接 push / splice](#911-array-state-update创建新数组不直接-push--splice)
  - [9.12 TypeScript 中 event handler 与 useState 的类型边界](#912-typescript-中-event-handler-与-usestate-的类型边界)
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
| Event callback | The browser event reaches React, then React calls the provided handler. | Browser event system plus React synthetic event | Cart buttons express user intent without calling setters during render. | `src/learning/react/chapter-04-state-and-events/01-event-handler-callback/event-handler-callback.tsx` |
| State snapshot | Each render sees a fixed state value. | React render runtime | Quantity changes do not mutate the current render's local value. | `src/learning/react/chapter-04-state-and-events/07-state-snapshot/state-snapshot.tsx` |
| Batched updates | React queues related updates before committing a render. | React scheduler | Multiple quantity actions can produce one visible update. | `src/learning/react/chapter-04-state-and-events/08-batched-updates/batched-updates.tsx` |
| Immutable update | The component owns replacement values, not object mutation. | JavaScript object model plus React change detection | Cart item arrays and objects are copied when updated. | `src/learning/react/chapter-04-state-and-events/10-object-state-update/object-state-update.tsx` |

## 0. 本章工程问题与边界

本章解决的工程问题是：用户事件如何转化为可预测的 UI 状态变化。React 不是直接修改 DOM 来记住数据，而是在事件中排队 state 更新，再用新的 render snapshot 生成 UI。

本章不设计全局状态、reducer 架构或服务端同步，也不把本地变量当作持久 UI 状态。边界是事件、handler、state queue、render snapshot 和不可变更新。

## 1. 本章解决的问题

静态 component tree 只说明“给定输入，组件返回什么 JSX”。交互 UI 还需要回答另一组问题：谁在用户点击时运行代码？数据如何跨 render 保留？调用 setter 后为什么当前变量没有立刻变化？为什么连续三次 `setCount(count + 1)` 只得到一次加一，而三次 updater function 可以得到加三？

本章把这些问题放入同一条执行链：

1. 浏览器产生 event。
2. React 调用先前注册的 callback。
3. callback 读取当前 render 的 state snapshot。
4. setter 把 update 放入 React queue。
5. handler 结束后，React 处理 queue 并触发 render。
6. component function 再次执行，获得新的 state snapshot。
7. React 比较前后 UI 描述，只 commit 必要的 DOM 变化。

最终要避免的错误模型是：“setter 像普通赋值一样，马上修改当前函数里的变量”。正确模型是：“setter 请求 React 使用 queued update 产生下一次 render”。

## 2. 前置概念

| Concept | Why It Is Required |
| --- | --- |
| JavaScript function value | event handler 是函数值，不是 JSX 特殊字符串。 |
| Function call expression | 需要区分 `handleClick` 和 `handleClick()`。 |
| Closure | handler 会捕获创建它的那次 render 中的 state snapshot。 |
| Array methods | `map`、`filter`、spread 用于创建下一份 state。 |
| Object spread | 更新一个字段时保留其他字段。 |
| Props | parent 通过 callback props 把操作能力交给 child。 |
| JSX attributes | `onClick`、`onSubmit`、`value` 是 JSX 中的 props。 |
| Browser event | propagation 和 default behavior 属于浏览器事件系统。 |
| TypeScript function type | event handler type 描述 callback parameter 和返回值。 |
| React render | component function 执行并返回当前 UI 描述。 |

## 3. 学习目标

完成本章后，你应该能够：

- 解释为什么 `onClick={handleClick}` 是传递 callback，而 `onClick={handleClick()}` 是 render 期间调用。
- 区分 React event object、browser default behavior、event propagation 和 React state update。
- 用 `useState` 表达需要跨 render 保留且会影响 UI 的数据。
- 解释 local variable 为什么既不会持久化，也不会请求 React render。
- 预测 setter 调用后当前 handler 中变量的值。
- 用 state snapshot 和 closure 解释 delayed callback 的结果。
- 预测 replacement update 与 functional update 在 queue 中的差异。
- 用新 object 和新 array 更新 state，不直接 mutation。
- 为 input、button、form handler 编写合理的 TypeScript event type。
- 在 Cart Quantity Panel 中把 source state 与 derived state 分开。

## 4. 机制依赖图

这些依赖不是阅读顺序清单，而是本章概念成立的前置关系。

| First Understand | Then Understand | Dependency Reason | Failure If Skipped |
| --- | --- | --- | --- |
| Passing a handler | Executing user intent later | 事件需要传函数引用，由 React 在事件发生时调用。 | 会在 render 阶段直接触发更新。 |
| State snapshot | Batched update behavior | 只有理解每次 render 的值固定，才能理解同一事件内多次更新的结果。 | 会期待 `setState` 后变量立即变新。 |
| Functional updater | Repeated updates | 依赖前一次排队结果时必须用 updater。 | 连续点击或多次更新会丢失增量。 |
| Object identity | Immutable state update | React 依赖新引用表达变化。 | 直接 mutation 可能不触发预期 render 或污染旧状态。 |

## 5. 核心术语表

| Term | 中文说明 | Layer | Why It Matters |
| --- | --- | --- | --- |
| Event handler | 用户事件发生时由 React 调用的 callback | JavaScript function / React convention | 交互入口。 |
| React event object | React handler 收到的事件对象 | React event system / browser event | 提供 `currentTarget`、`preventDefault` 等。 |
| Event propagation | event 在 DOM tree 中传播 | Browser platform API | 决定 parent handler 是否也运行。 |
| Default behavior | browser 对 submit、link 等 event 的内建动作 | Browser platform API | 可用 `preventDefault` 阻止。 |
| State | React 为某个 component position 保存的数据 | React runtime | 跨 render 保留 UI memory。 |
| State setter | 请求 React queue 下一次 state 的函数 | React runtime | 不直接改当前变量。 |
| Render | React 调用 component function 计算 UI 描述 | React runtime | 每次 render 有自己的 props、state、handlers。 |
| Commit | React 把必要变化应用到 DOM | React DOM runtime | render 不等于直接操作 DOM。 |
| State snapshot | 某次 render 中固定的 state value | React runtime / closure | 解释 setter 后旧值与 delayed handler。 |
| Batching | React 等 handler 代码结束后集中处理 updates | React runtime | 避免中间的半完成 UI。 |
| Replacement update | 向 queue 提交一个 next value | React runtime | 多次表达式可能读取同一 snapshot。 |
| Functional update | 向 queue 提交 `(previous) => next` | React runtime / JavaScript function | 适合基于 queued previous state 更新。 |
| Immutable update | 用新 object / array 表达下一份 state | React state model | 保留旧 snapshot，提供新引用。 |
| Derived state | render 时从 source state 计算的值 | React rendering / JavaScript | 避免重复 state 和同步问题。 |
| Event type | TypeScript 对 handler parameter 的静态描述 | TypeScript type system | 改善 editor 和 compile-time checking。 |

## 6. 底层心智模型

本章的主执行链必须完整记住：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">底层心智模型</span>
  </div>

```txt
user event
  -> event handler function runs
  -> state setter is called
  -> React queues update
  -> event handler finishes
  -> React processes updates
  -> component function runs again
  -> JSX result changes
  -> React commits DOM changes
```
</div>

三个边界不能混淆：

- JavaScript 层：handler 是 function，closure 捕获 lexical bindings，object/array 方法创建值。
- React runtime 层：React 保存 state、queue updates、重新调用 component、commit DOM differences。
- TypeScript 层：检查 handler parameter、state value 和 setter 输入；这些 type 在 browser runtime 被擦除。

`preventDefault()` 和 `stopPropagation()` 位于 browser event 边界。前者影响浏览器默认动作，后者影响 event 继续传播；二者都不会替代 setter，也不会自动触发 React render。

## 7. 推荐目录结构

本章采用编号 concept directory，因为学习顺序与机制依赖非常强；目录名同时保留知识点，不使用 `example.tsx` 或 `demo.tsx`。最终小项目独立分组，避免把组合代码混入单概念练习。

### 当前项目结构

下面是完成本章后 repository 中真实存在的相关结构：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">当前项目结构</span>
  </div>

```txt
react/
  index.html
  package.json
  README.md
  src/
    App.tsx
    sudoku/
      main.tsx
      App.tsx
    learning/
      react/
        chapter-02-jsx-and-components/
        chapter-04-state-and-events/
  docs/
    react/
      chapter-01-react-introduction/
      chapter-02-jsx-and-components/
      chapter-03-props-basics/
      chapter-04-state-and-events/
```
</div>

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
    chapter-04-state-and-events/
      react-chapter-04-learning-guide.md
references/
  books/
    react/
      README.md
```
</div>

Git repository 没有提交本地 PDF；`references/books/react/README.md` 说明第三方 PDF 被 git ignore。本章编写时另外读取了开发机本地学习目录中的 `the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf`，但文档只记录书名、相关页码和结论，不写入本机绝对路径，也不把 PDF 当作 Git repository 文件。

### 真实练习结构

以下路径用于说明可运行练习结构，不是概念占位符：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">真实练习结构</span>
  </div>

```txt
src/learning/react/chapter-04-state-and-events/
  chapter-04-practice-root.tsx
  chapter-04-practice.css
  01-event-handler-callback/
    event-handler-callback.tsx
  02-pass-vs-call-handler/
    pass-vs-call-handler.tsx
  03-event-object-and-default-behavior/
    event-object-and-default-behavior.tsx
  04-use-state-memory/
    use-state-memory.tsx
  05-local-variable-vs-state/
    local-variable-vs-state.tsx
  06-state-setter-current-render/
    state-setter-current-render.tsx
  07-state-snapshot/
    state-snapshot.tsx
  08-batched-updates/
    batched-updates.tsx
  09-functional-update/
    functional-update.tsx
  10-object-state-update/
    object-state-update.tsx
  11-array-state-update/
    array-state-update.tsx
  12-typed-event-handler/
    typed-event-handler.tsx
```
</div>

### 概念示例结构

下面只列出错误对比和可复用模板，不需要创建文件：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">概念示例结构</span>
  </div>

```txt
Conceptual snippets:
  Snippet: called handler during render
  Snippet: setter does not replace current snapshot
  Snippet: direct object state mutation
  Snippet: direct array state mutation
  Template: typed input handler
  Template: immutable keyed array update
```
</div>

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
  learning/react/chapter-04-state-and-events/
    cart-quantity-mini-project/
      cart-types.ts
      cart-seed-data.ts
      cart-quantity-controls.tsx
      cart-item-row.tsx
      cart-summary.tsx
      cart-quantity-mini-project.tsx
      cart-quantity-mini-project.css
```
</div>

## 8. 示例运行方式

`src/sudoku/main.tsx` 仍负责 `createRoot`，根级 `src/App.tsx` 只挂载 `Chapter04PracticeRoot`。因此不需要修改 `src/sudoku/`，也不需要为每个练习建立独立 Vite entry。

安装锁文件中已有依赖：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm ci
```
</div>

启动练习：

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

静态检查与生产构建：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run lint
npm run build
```
</div>

预期页面先展示 12 个 mechanism panels，再展示 Cart Quantity Panel。若页面仍显示旧章节，检查 `src/App.tsx` 是否 import `Chapter04PracticeRoot`；不要改 `src/sudoku/main.tsx` 来复制另一套 root。

## 9. 分节教学与练习

### 9.1 event handler 是传给 React 的 callback function

**结论：**

Event handler 是普通 JavaScript function value。render 时 React 接收并记住这个 callback；对应 event 发生后，React 才调用它。

**本节解决的问题：**

`onClick` 不是“点击时执行的字符串”，handler 也不是 component render 自动运行的子步骤。它是从当前 JSX output 进入 React event system 的 callback reference。

**边界与底层机制：**

- JavaScript：`handleClick` 表达式求值得到 function object。
- React：`onClick` prop 告诉 React DOM 这个 element 的 click handler。
- Browser：用户 click 产生 event。
- React 再调用 function；函数内部可以请求 state update 或执行其他 event side effect。

**真实练习代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/01-event-handler-callback/event-handler-callback.tsx</span>
  </div>

```tsx
export function EventHandlerCallback() {
  function handleClick() {
    console.log('Event handler callback ran after the click.')
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.1 Callback boundary</p>
      <h2>Event handler callback</h2>
      <p>React receives a function value and calls it after the user clicks.</p>
      <button className="practice-button" onClick={handleClick} type="button">
        Run callback
      </button>
      <p className="practice-note">Open the browser console to inspect the callback log.</p>
    </section>
  )
}
```
</div>

**逐行解释与执行过程：**

1. 每次 component render 都创建这次 render 使用的 `handleClick` function。
2. `onClick={handleClick}` 读取 function value，不加括号。
3. render 完成时日志尚未出现。
4. click 发生后 React 调用 callback，`console.log` 才执行。
5. 本例没有 setter，因此 callback 不会请求新的 React render。

**常见错误与识别方法：**

看到 JSX event prop 右侧时，先问“这里最终得到 function value，还是 call result？”事件 prop 通常需要前者。

**最终记忆模型：**

Handler 是“以后交给 React 调用的函数”，不是“现在由 render 执行的命令”。

### 9.2 传递函数和调用函数的区别

**结论：**

`handleClick` 是 function value；`handleClick()` 是 call expression，它会立即执行并产生返回值。

**技术意义：**

React 官方文档明确区分 passing a function 与 calling a function。把 call expression 写进 `onClick` 会在 render 期间执行，可能立即 queue state update，导致重复 render 或 TypeScript handler type error。

**真实练习代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/02-pass-vs-call-handler/pass-vs-call-handler.tsx</span>
  </div>

```tsx
import { useState } from 'react'

export function PassVsCallHandler() {
  const [message, setMessage] = useState('The handler has not run.')

  function handleClick() {
    setMessage('React called the handler after the click.')
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.2 Function value</p>
      <h2>Pass versus call</h2>
      <p className="code-comparison">onClick={'{handleClick}'}</p>
      <button className="practice-button" onClick={handleClick} type="button">
        Pass the handler
      </button>
      <p className="practice-result" aria-live="polite">
        {message}
      </p>
    </section>
  )
}
```
</div>

**错误对比：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: called handler during render</span>
  </div>

```tsx
function handleClick() {
  setMessage('This runs during render.')
}

return <button onClick={handleClick()}>Save</button>
```
</div>

错误违反两条边界：`handleClick()` 在 JSX 求值期间立即运行；它通常返回 `void`，而 `onClick` 需要 handler function。若 call 内 queue state，React 还可能报告 too many re-renders。

需要参数时，传一个新 callback：`onClick={() => handleSelect(productId)}`。箭头函数本身是交给 React 的 value；内部 call 留到 click 后发生。

### 9.3 React event object、event propagation 与 preventDefault

**结论：**

Handler parameter 是 React 提供的 event object。`stopPropagation()` 控制 event 是否继续到 ancestor handler；`preventDefault()` 控制 browser default action。它们都不负责更新 state。

**底层机制：**

`preventDefault` 不等于“停止事件”，MDN 说明 event 仍会正常传播；`stopPropagation` 不等于“阻止默认动作”，link navigation 等默认行为仍可能发生。React 的 setter 是另一条独立机制。

**真实练习代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/03-event-object-and-default-behavior/event-object-and-default-behavior.tsx</span>
  </div>

```tsx
import { useState, type FormEvent, type MouseEvent } from 'react'

export function EventObjectAndDefaultBehavior() {
  const [eventLog, setEventLog] = useState<string[]>([])

  function appendLog(entry: string) {
    setEventLog((currentLog) => [...currentLog, entry])
  }

  function handlePanelClick() {
    appendLog('Parent panel received a bubbled click.')
  }

  function handleButtonClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    appendLog('Button stopped click propagation.')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    appendLog('Form prevented the browser submit navigation.')
  }

  return (
    <section className="practice-panel" onClick={handlePanelClick}>
      <p className="practice-kicker">9.3 Browser event boundary</p>
      <h2>Event object and default behavior</h2>
      <div className="practice-actions">
        <button className="practice-button" onClick={handleButtonClick} type="button">
          Stop propagation
        </button>
        <form onSubmit={handleSubmit}>
          <button className="practice-button secondary" type="submit">
            Prevent submit default
          </button>
        </form>
      </div>
      <ol className="event-log" aria-live="polite">
        {eventLog.map((entry, index) => (
          <li key={`${entry}-${index}`}>{entry}</li>
        ))}
      </ol>
    </section>
  )
}
```
</div>

**执行过程：**

- 点击第一个 button：child handler 先运行，`stopPropagation` 阻止 event 到 section，随后 functional update 追加一条日志。
- submit form：`preventDefault` 阻止 browser submission/navigation；click 仍可能传播到 section，因此日志可能同时记录 parent click 与 submit handler。
- React 处理 queued log updates 后重新 render list。

**识别方法：**

问清楚你要阻止的是“浏览器动作”还是“事件向 ancestor 传播”。前者用 `preventDefault`，后者用 `stopPropagation`；要改变 UI 数据仍需 setter。

### 9.4 useState 创建组件记忆

**结论：**

`useState(initialState)` 返回当前 render 的 state value 和 setter。React 在 component tree 的对应位置保存 state，使数据能跨 render 保留。

**API / 语法规则：**

`const [count, setCount] = useState(0)` 使用 array destructuring。`count` 不是可变 storage cell；它是这次 render 的 value。`setCount` 请求下一次 state。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/04-use-state-memory/use-state-memory.tsx</span>
  </div>

```tsx
import { useState } from 'react'

export function UseStateMemory() {
  const [count, setCount] = useState(0)

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.4 Component memory</p>
      <h2>useState memory</h2>
      <p className="practice-metric">{count}</p>
      <button
        className="practice-button"
        onClick={() => setCount(count + 1)}
        type="button"
      >
        Increment
      </button>
      <p className="practice-note">The value survives the next component render.</p>
    </section>
  )
}
```
</div>

**执行过程：**

初始 render 读取 `0`。click handler 用当前 snapshot 计算 `1` 并 queue update。handler 结束后 React 再调用 component；第二次 `useState` 读取 React 保存的 `1`，JSX 变成 `1`，React commit 对应文本变化。

**边界：**

`useState` 是 Hook，只能在 component 或 custom Hook 顶层按稳定顺序调用。本章不进入 custom Hook，但不能把它放在 condition、loop 或 event handler 中。

### 9.5 普通变量为什么不能保存 UI 状态

**结论：**

普通 local variable 每次 component call 都会重新创建，而且修改它不会告诉 React 需要 render。UI state 需要同时满足“跨 render 保留”和“变化时请求 render”。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/05-local-variable-vs-state/local-variable-vs-state.tsx</span>
  </div>

```tsx
import { useState } from 'react'

export function LocalVariableVsState() {
  const localCount = 0
  const [stateCount, setStateCount] = useState(0)

  function handleClick() {
    console.log(`Calculated local value: ${localCount + 1}`)
    setStateCount((currentCount) => currentCount + 1)
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.5 Render-local binding</p>
      <h2>Local variable versus state</h2>
      <dl className="value-pair">
        <div>
          <dt>Local variable after render</dt>
          <dd>{localCount}</dd>
        </div>
        <div>
          <dt>State value</dt>
          <dd>{stateCount}</dd>
        </div>
      </dl>
      <button className="practice-button" onClick={handleClick} type="button">
        Update both
      </button>
    </section>
  )
}
```
</div>

**为什么会得到这个结果：**

Handler 能计算 `localCount + 1`，但这个结果没有被保存，也没有成为下一次 component call 的输入。setter 则把 update 交给 React；下一次 render 中 `localCount` 仍由函数体初始化为 `0`，`stateCount` 从 React memory 读取新值。

**常见错误：**

在 handler 中回写 render-local binding 不仅不能建立可靠 UI state，当前 `eslint-plugin-react-hooks` 的 immutability rule 也会报告风险。需要影响 UI 的可变数据应建模为 state。

### 9.6 state setter 不是立即修改当前变量

**结论：**

Setter queue 下一次 state，不会回写当前 render 的 lexical binding。因此调用 `setCount(count + 1)` 后，同一个 handler 中的 `count` 仍是旧 snapshot。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/06-state-setter-current-render/state-setter-current-render.tsx</span>
  </div>

```tsx
import { useState } from 'react'

export function StateSetterCurrentRender() {
  const [count, setCount] = useState(0)
  const [observation, setObservation] = useState('No update has been queued.')

  function handleIncrement() {
    setCount(count + 1)
    setObservation(`The handler still reads the current render snapshot: ${count}.`)
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.6 Setter boundary</p>
      <h2>Setter and current render</h2>
      <p className="practice-metric">{count}</p>
      <button className="practice-button" onClick={handleIncrement} type="button">
        Queue increment
      </button>
      <p className="practice-result" aria-live="polite">
        {observation}
      </p>
    </section>
  )
}
```
</div>

**错误模型对比：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: setter does not replace current snapshot</span>
  </div>

```tsx
function handleClick() {
  setCount(count + 1)
  console.log(count)
}
```
</div>

如果当前 render 的 `count` 是 `0`，日志仍是 `0`。这不是 asynchronous variable assignment；它是 current snapshot 不变，而 React 稍后用 queued next state 创建另一次 render。

### 9.7 state as snapshot：每次 render 都拿到固定快照

**结论：**

每次 render 都有自己的 state values、props、local variables 和 handlers。Handler closure 会捕获创建它的那次 render snapshot，即使 callback 延迟执行。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/07-state-snapshot/state-snapshot.tsx</span>
  </div>

```tsx
import { useState } from 'react'

export function StateSnapshot() {
  const [count, setCount] = useState(0)
  const [snapshotMessage, setSnapshotMessage] = useState('Schedule a snapshot, then increment.')

  function handleScheduleSnapshot() {
    const scheduledCount = count

    window.setTimeout(() => {
      setSnapshotMessage(`The scheduled handler captured count ${scheduledCount}.`)
    }, 1000)
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.7 Snapshot and closure</p>
      <h2>State as a snapshot</h2>
      <p className="practice-metric">{count}</p>
      <div className="practice-actions">
        <button className="practice-button secondary" onClick={handleScheduleSnapshot} type="button">
          Schedule snapshot
        </button>
        <button
          className="practice-button"
          onClick={() => setCount((currentCount) => currentCount + 1)}
          type="button"
        >
          Increment now
        </button>
      </div>
      <p className="practice-result" aria-live="polite">
        {snapshotMessage}
      </p>
    </section>
  )
}
```
</div>

**执行过程：**

先在 `count = 0` 时 schedule，再立即 increment。新的 render 显示 `1`，但 timeout callback 的 closure 保存了旧 render 的 `scheduledCount = 0`。一秒后它显示 captured count `0`。这是 JavaScript closure 与 React snapshot 共同产生的结果，不是 timeout 读取失败。

### 9.8 batching：多个 state update 会被批处理

**结论：**

React 等 event handler 中的代码执行完成后再处理 queued updates。连续三个 `setCount(count + 1)` 都从同一个 render snapshot 求值，因此都 queue replacement value `1`，不是自动累加三次。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/08-batched-updates/batched-updates.tsx</span>
  </div>

```tsx
import { useState } from 'react'

export function BatchedUpdates() {
  const [count, setCount] = useState(0)

  function handleReplacementUpdates() {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.8 Update queue</p>
      <h2>Batched replacement updates</h2>
      <p className="practice-metric">{count}</p>
      <button className="practice-button" onClick={handleReplacementUpdates} type="button">
        Queue count + 1 three times
      </button>
      <p className="practice-note">All three expressions read the same render snapshot.</p>
    </section>
  )
}
```
</div>

**边界：**

Batching 不是“所有 click 永久合并”。React 官方文档说明 intentional events（例如两个独立 clicks）分别处理。这里讨论的是同一个 handler 中、下一次 render 前的 queue。

### 9.9 functional update：基于上一次 state 计算下一次 state

**结论：**

当 next state 依赖 previous state，传 updater function。React 处理 queue 时把前一项结果传给下一项，因此三个 `previousCount => previousCount + 1` 得到加三。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/09-functional-update/functional-update.tsx</span>
  </div>

```tsx
import { useState } from 'react'

export function FunctionalUpdate() {
  const [count, setCount] = useState(0)

  function handleIncrementThreeTimes() {
    setCount((previousCount) => previousCount + 1)
    setCount((previousCount) => previousCount + 1)
    setCount((previousCount) => previousCount + 1)
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.9 Queued previous state</p>
      <h2>Functional update</h2>
      <p className="practice-metric">{count}</p>
      <button className="practice-button" onClick={handleIncrementThreeTimes} type="button">
        Increment by three
      </button>
      <p className="practice-note">Each updater receives the queued previous value.</p>
    </section>
  )
}
```
</div>

**Queue 过程：**

若起始值是 `0`，React 依次计算 `0 -> 1`、`1 -> 2`、`2 -> 3`。Updater parameter 不是 current render binding，而是 React 处理 queue 时提供的 queued previous value。

### 9.10 object state update：替换对象，不直接 mutation

**结论：**

把 state 中的 object 当作 read-only。更新时创建 next object，并把未修改字段复制进去；不要修改当前 snapshot 所引用的 object。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/10-object-state-update/object-state-update.tsx</span>
  </div>

```tsx
import { useState } from 'react'

type LearnerProfile = {
  name: string
  track: string
  isAvailable: boolean
}

const initialProfile: LearnerProfile = {
  name: 'Mia Chen',
  track: 'React foundations',
  isAvailable: true,
}

export function ObjectStateUpdate() {
  const [profile, setProfile] = useState(initialProfile)

  function handleToggleAvailability() {
    setProfile((currentProfile) => ({
      ...currentProfile,
      isAvailable: !currentProfile.isAvailable,
    }))
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.10 Object replacement</p>
      <h2>Object state update</h2>
      <div className="profile-preview">
        <strong>{profile.name}</strong>
        <span>{profile.track}</span>
        <span>{profile.isAvailable ? 'Available' : 'Unavailable'}</span>
      </div>
      <button className="practice-button" onClick={handleToggleAvailability} type="button">
        Toggle availability
      </button>
    </section>
  )
}
```
</div>

**常见错误为什么错：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: direct object state mutation</span>
  </div>

```tsx
profile.isAvailable = false
setProfile(profile)
```
</div>

这段代码修改旧 snapshot 引用并再次传回同一 object reference。它破坏 snapshot 可推理性，也不能可靠表达“下一份 state 是新值”。正确写法返回 `{ ...currentProfile, isAvailable: false }`。

### 9.11 array state update：创建新数组，不直接 push / splice

**结论：**

Array 也是 object。用 spread、`map`、`filter` 等返回新 array；避免对 state array 直接 `push`、`pop`、`splice` 或 index assignment。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/11-array-state-update/array-state-update.tsx</span>
  </div>

```tsx
import { useState } from 'react'

const initialTopics = ['Events', 'State snapshot']

export function ArrayStateUpdate() {
  const [topics, setTopics] = useState(initialTopics)

  function handleAddTopic() {
    setTopics((currentTopics) =>
      currentTopics.includes('Immutable updates')
        ? currentTopics
        : [...currentTopics, 'Immutable updates'],
    )
  }

  function handleRemoveFirstTopic() {
    setTopics((currentTopics) => currentTopics.filter((_, index) => index !== 0))
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.11 Array replacement</p>
      <h2>Array state update</h2>
      <ul className="topic-list">
        {topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
      <div className="practice-actions">
        <button className="practice-button" onClick={handleAddTopic} type="button">
          Add topic
        </button>
        <button
          className="practice-button secondary"
          disabled={topics.length === 0}
          onClick={handleRemoveFirstTopic}
          type="button"
        >
          Remove first
        </button>
      </div>
    </section>
  )
}
```
</div>

**错误对比：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: direct array state mutation</span>
  </div>

```tsx
topics.push('Immutable updates')
setTopics(topics)
```
</div>

`push` 修改当前 array 并返回新 length，不返回 next array。`splice` 也会原地修改。新增用 `[...currentTopics, nextTopic]`，删除用 `filter`，替换某项用 `map`。

### 9.12 TypeScript 中 event handler 与 useState 的类型边界

**结论：**

TypeScript 检查 event parameter、`currentTarget`、state value 和 setter input；浏览器运行时不存在 `ChangeEvent<HTMLInputElement>` 或 `CartItem[]` type。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/12-typed-event-handler/typed-event-handler.tsx</span>
  </div>

```tsx
import { useState, type ChangeEvent, type FormEvent } from 'react'

export function TypedEventHandler() {
  const [searchTerm, setSearchTerm] = useState('')
  const [submittedTerm, setSubmittedTerm] = useState('Nothing submitted yet.')

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.currentTarget.value)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmittedTerm(searchTerm.trim() || 'Empty search')
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.12 Type boundary</p>
      <h2>Typed event handler</h2>
      <form className="typed-form" onSubmit={handleSubmit}>
        <label htmlFor="chapter-search">Search term</label>
        <input
          id="chapter-search"
          onChange={handleChange}
          placeholder="Type a topic"
          type="text"
          value={searchTerm}
        />
        <button className="practice-button" type="submit">
          Submit
        </button>
      </form>
      <p className="practice-result" aria-live="polite">
        {submittedTerm}
      </p>
    </section>
  )
}
```
</div>

**类型推断与显式标注：**

Inline handler 通常能从 JSX prop context 推断 event type；提取为 named function 后，显式 `ChangeEvent<HTMLInputElement>` 能清楚表达 boundary。读取 input value 时优先使用 `event.currentTarget.value`，因为 generic parameter 明确描述当前 handler 所绑定的 element。

`useState('')` 推断 string state；`useState<CartItem[]>(...)` 显式描述复杂 collection。TypeScript 会拒绝错误 setter input，但无法在 runtime 验证 API 或 storage 中的数据。本章没有 external data，因此 seed data 由源码类型检查。

**最终记忆模型：**

Event type 帮助开发阶段正确使用 object；event object 本身在 runtime 真实存在，TypeScript type annotation 不存在。

## 10. API / 语法索引

| API / Syntax | Layer | Meaning | Common Mistake |
| --- | --- | --- | --- |
| `onClick={handleClick}` | JSX / React event | 传递 callback function。 | 写成 `handleClick()`。 |
| `event.preventDefault()` | Browser event API | 阻止 cancelable default action。 | 以为会停止 propagation。 |
| `event.stopPropagation()` | Browser event API | 阻止 event 继续传播。 | 以为会阻止 default action。 |
| `useState(initialState)` | React Hook | 创建当前 component position 的 state。 | 在 condition 或 handler 中调用。 |
| `setState(nextValue)` | React runtime | queue replacement update。 | 以为立即改当前 binding。 |
| `setState(previous => next)` | React runtime | queue updater function。 | updater 中产生 side effect。 |
| `{ ...object, field: next }` | JavaScript syntax | 创建替换字段后的新 object。 | 漏掉 spread 导致其他字段丢失。 |
| `[...array, item]` | JavaScript syntax | 创建包含新 item 的 array。 | 对原 array 先 `push`。 |
| `array.map(...)` | JavaScript API | 创建 transformed array。 | 在 callback 中修改原 item。 |
| `array.filter(...)` | JavaScript API | 创建移除部分 item 的 array。 | 使用 mutating `splice`。 |
| `ChangeEvent<HTMLInputElement>` | TypeScript / React types | 描述 input change event。 | 以为 type 会在 runtime 验证 event。 |
| `useState<CartItem[]>(...)` | TypeScript generic | 显式声明 collection state type。 | 把外部 unknown data 直接断言为该 type。 |

## 11. 常见错误表

| Error | Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| `onClick={handleClick()}` | Render / type | Handler prop needs a function value. | Use `onClick={handleClick}`. | JSX 中出现无参数 call。 |
| `console.log(count)` after setter shows old value | Mental model | Current render snapshot is fixed. | Predict the next render instead. | 把 setter 当普通赋值。 |
| Three `setCount(count + 1)` calls add one | React queue | All expressions read one snapshot. | Use functional updaters. | 多个 next values 依赖同一 state。 |
| Local variable resets | JavaScript / React | Component function runs again. | Store UI memory in state. | 变量在 component body 初始化。 |
| Local mutation does not render | React | No setter requested render. | Use state setter. | 数据变了但 React 不知道。 |
| `profile.name = nextName` | State mutation | Current object snapshot is read-only. | Return a new object. | 对 state object property 赋值。 |
| `items.push(nextItem)` | State mutation | Current array snapshot is read-only. | Return a new array. | 使用 push/pop/splice/sort/reverse。 |
| `preventDefault` expected to stop parent click | Browser API | Default action and propagation differ. | Use `stopPropagation` if justified. | 混淆 browser action 与 event path。 |
| `stopPropagation` expected to stop navigation | Browser API | Propagation and default action differ. | Use `preventDefault`. | Link/form 仍执行默认动作。 |
| Wrong event element generic | TypeScript | `currentTarget` type mismatches bound element. | Match `HTMLInputElement`, `HTMLFormElement`, etc. | editor 中 `value` 等 property 不存在。 |
| Store total in separate state | State modeling | Duplicates derivable data. | Calculate with `reduce` during render. | 两份 state 必须手动保持同步。 |

## 12. 最终小项目

### 项目目标

`Cart Quantity Panel` 用 typed product 和 cart item 组成一个静态前端购物车交互面板。用户可以增加、减少、删除和重置商品；quantity 是 source state，line subtotal、unit count 和 total 是 render 时计算的 derived state。

项目连接未来 SellerHub Marketplace 的 cart quantity 行为，但本章不实现 SellerHub、不请求 backend，也不引入 router、query cache 或 form library。

### 为什么适合本章

一个 quantity click 会完整经过本章主链：callback 运行，读取当前 render snapshot，functional setter queue array update，updater 用 `map` 创建新 array 并为目标 item 创建新 object，React 重新 render，derived totals 重算，最后 commit quantity、disabled state 和金额文本。

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
  learning/react/chapter-04-state-and-events/
    cart-quantity-mini-project/
      cart-types.ts
      cart-seed-data.ts
      cart-quantity-controls.tsx
      cart-item-row.tsx
      cart-summary.tsx
      cart-quantity-mini-project.tsx
      cart-quantity-mini-project.css
```
</div>

### 文件职责

| File | Responsibility |
| --- | --- |
| `cart-types.ts` | 定义 runtime object 在 compile time 应满足的 `Product` 与 `CartItem` shape。 |
| `cart-seed-data.ts` | 提供本地 typed seed data，不模拟 API。 |
| `cart-quantity-controls.tsx` | 接收 quantity、stock 和 callback props，处理 disabled boundary。 |
| `cart-item-row.tsx` | 组合 product info、controls、line subtotal 和 remove callback。 |
| `cart-summary.tsx` | 从 items 派生 units 与 total，不保存重复 state。 |
| `cart-quantity-mini-project.tsx` | 拥有 cart state，定义 functional object/array updates。 |
| `cart-quantity-mini-project.css` | 只负责最终小项目布局和视觉状态。 |
| `src/App.tsx` | Thin adapter，挂载本章总入口。 |

### 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-types.ts</span>
  </div>

```ts
export type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
}

export type CartItem = {
  product: Product
  quantity: number
}
```
</div>

TypeScript 用这些 type 检查源码；build 后 type 被擦除。它们不能自动验证未来 API response。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-seed-data.ts</span>
  </div>

```ts
import type { CartItem } from './cart-types'

export const cartSeedItems: CartItem[] = [
  {
    product: {
      id: 'wireless-keyboard',
      name: 'Wireless Keyboard',
      category: 'Desk setup',
      price: 79,
      stock: 4,
    },
    quantity: 1,
  },
  {
    product: {
      id: 'usb-c-dock',
      name: 'USB-C Dock',
      category: 'Connectivity',
      price: 129,
      stock: 3,
    },
    quantity: 2,
  },
  {
    product: {
      id: 'monitor-light',
      name: 'Monitor Light',
      category: 'Lighting',
      price: 54,
      stock: 6,
    },
    quantity: 1,
  },
]
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-quantity-controls.tsx</span>
  </div>

```tsx
type CartQuantityControlsProps = {
  productName: string
  quantity: number
  stock: number
  onDecrement: () => void
  onIncrement: () => void
}

export function CartQuantityControls({
  productName,
  quantity,
  stock,
  onDecrement,
  onIncrement,
}: CartQuantityControlsProps) {
  return (
    <div className="quantity-control" aria-label={`${productName} quantity`}>
      <button
        aria-label={`Decrease ${productName} quantity`}
        disabled={quantity <= 1}
        onClick={onDecrement}
        type="button"
      >
        -
      </button>
      <output aria-live="polite">{quantity}</output>
      <button
        aria-label={`Increase ${productName} quantity`}
        disabled={quantity >= stock}
        onClick={onIncrement}
        type="button"
      >
        +
      </button>
    </div>
  )
}
```
</div>

`disabled` 完全由当前 `quantity` 和 `stock` 派生：达到 `1` 时不能 decrement，达到 stock 时不能 increment。这里不增加 `isIncrementDisabled` state。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-item-row.tsx</span>
  </div>

```tsx
import { CartQuantityControls } from './cart-quantity-controls'
import type { CartItem } from './cart-types'

type CartItemRowProps = {
  item: CartItem
  onDecrement: (productId: string) => void
  onIncrement: (productId: string) => void
  onRemove: (productId: string) => void
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function CartItemRow({ item, onDecrement, onIncrement, onRemove }: CartItemRowProps) {
  const { product, quantity } = item
  const subtotal = product.price * quantity

  return (
    <article className="cart-item-row">
      <div className="product-symbol" aria-hidden="true">
        {product.name
          .split(' ')
          .map((word) => word[0])
          .join('')}
      </div>
      <div className="product-copy">
        <p>{product.category}</p>
        <h3>{product.name}</h3>
        <span>{currencyFormatter.format(product.price)} each</span>
      </div>
      <CartQuantityControls
        onDecrement={() => onDecrement(product.id)}
        onIncrement={() => onIncrement(product.id)}
        productName={product.name}
        quantity={quantity}
        stock={product.stock}
      />
      <div className="line-total">
        <strong>{currencyFormatter.format(subtotal)}</strong>
        <span>{product.stock} in stock</span>
      </div>
      <button className="remove-item-button" onClick={() => onRemove(product.id)} type="button">
        Remove
      </button>
    </article>
  )
}
```
</div>

`CartItemRow` 没有自己的 quantity state。Parent owns state，row 只接收 snapshot props 和 callbacks；`subtotal` 是 `price * quantity` 的 render-time calculation。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-summary.tsx</span>
  </div>

```tsx
import type { CartItem } from './cart-types'

type CartSummaryProps = {
  items: CartItem[]
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function CartSummary({ items }: CartSummaryProps) {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const merchandiseTotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  return (
    <aside className="cart-summary" aria-labelledby="cart-summary-heading">
      <p className="cart-label">Derived state</p>
      <h3 id="cart-summary-heading">Order summary</h3>
      <dl>
        <div>
          <dt>Units</dt>
          <dd>{itemCount}</dd>
        </div>
        <div>
          <dt>Merchandise</dt>
          <dd>{currencyFormatter.format(merchandiseTotal)}</dd>
        </div>
        <div className="summary-total">
          <dt>Total</dt>
          <dd>{currencyFormatter.format(merchandiseTotal)}</dd>
        </div>
      </dl>
      <p className="summary-note">
        Totals are calculated during render instead of stored as duplicate state.
      </p>
    </aside>
  )
}
```
</div>

两个 `reduce` 都是 pure calculation。若把 total 另存为 state，每次 quantity update 都必须同时维护 cart 和 total，反而制造同步错误。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-quantity-mini-project.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import { CartItemRow } from './cart-item-row'
import { cartSeedItems } from './cart-seed-data'
import { CartSummary } from './cart-summary'
import type { CartItem } from './cart-types'
import './cart-quantity-mini-project.css'

function createInitialCartItems() {
  return cartSeedItems.map((item) => ({
    ...item,
    product: { ...item.product },
  }))
}

export function CartQuantityMiniProject() {
  const [cartItems, setCartItems] = useState<CartItem[]>(createInitialCartItems)
  const [lastAction, setLastAction] = useState('No quantity update has been queued.')

  function handleIncrement(productId: string) {
    const snapshotItem = cartItems.find((item) => item.product.id === productId)

    if (snapshotItem) {
      setLastAction(
        `Event snapshot: ${snapshotItem.product.name} quantity was ${snapshotItem.quantity}.`,
      )
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, item.product.stock),
            }
          : item,
      ),
    )
  }

  function handleDecrement(productId: string) {
    const snapshotItem = cartItems.find((item) => item.product.id === productId)

    if (snapshotItem) {
      setLastAction(
        `Event snapshot: ${snapshotItem.product.name} quantity was ${snapshotItem.quantity}.`,
      )
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.max(item.quantity - 1, 1),
            }
          : item,
      ),
    )
  }

  function handleRemove(productId: string) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    )
    setLastAction('The array update returned a filtered cart.')
  }

  function handleReset() {
    setCartItems(createInitialCartItems())
    setLastAction('The cart was replaced with a fresh seed array.')
  }

  return (
    <div className="cart-project-shell">
      <div className="cart-project-header">
        <div>
          <p className="cart-label">SellerHub learning connection</p>
          <h2>Cart Quantity Panel</h2>
          <p>
            Quantity is state. Subtotals and the order total are derived during each
            render.
          </p>
        </div>
        <button className="reset-cart-button" onClick={handleReset} type="button">
          Reset cart
        </button>
      </div>

      <p className="snapshot-status" aria-live="polite">
        {lastAction}
      </p>

      <div className="cart-layout">
        <div className="cart-items" aria-label="Cart items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItemRow
                item={item}
                key={item.product.id}
                onDecrement={handleDecrement}
                onIncrement={handleIncrement}
                onRemove={handleRemove}
              />
            ))
          ) : (
            <div className="empty-cart">
              <h3>Your learning cart is empty.</h3>
              <p>Reset the cart to continue practicing state updates.</p>
            </div>
          )}
        </div>
        <CartSummary items={cartItems} />
      </div>
    </div>
  )
}
```
</div>

关键更新同时展示三件事：handler 先从 `cartItems` 读取 current render snapshot 写入说明文字；`setCartItems` 接收 functional updater；updater 用 `map` 返回新 array，并只为目标 item 返回新 object。`Math.min` 和 `Math.max` 在 runtime 再守一次 stock 与 minimum boundary，即使 disabled button 阻止正常 UI click 也不依赖它作为唯一保护。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/App.tsx</span>
  </div>

```tsx
import { Chapter04PracticeRoot } from './learning/react/chapter-04-state-and-events/chapter-04-practice-root'

function App() {
  return <Chapter04PracticeRoot />
}

export default App
```
</div>

`App` 不拥有 chapter state，也不复制练习代码。它只连接现有 `src/sudoku/main.tsx` root 与本章 practice root。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-04-state-and-events/cart-quantity-mini-project/cart-quantity-mini-project.css</span>
  </div>

```css
.cart-project-shell {
  overflow: hidden;
  border: 1px solid #cbd3df;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 22px 55px rgb(16 24 40 / 8%);
}

.cart-project-header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 24px;
  padding: 28px;
  color: #ffffff;
  background: #101828;
}

.cart-project-header h2 {
  margin: 7px 0 8px;
  font-size: clamp(1.75rem, 4vw, 2.65rem);
}

.cart-project-header p {
  max-width: 610px;
  margin: 0;
  color: #b9c3d3;
  line-height: 1.6;
}

.cart-label {
  color: #84adff !important;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.reset-cart-button {
  flex: 0 0 auto;
  min-height: 42px;
  padding: 9px 14px;
  border: 1px solid #667085;
  border-radius: 6px;
  color: #ffffff;
  background: transparent;
  cursor: pointer;
  font-weight: 750;
}

.reset-cart-button:hover {
  background: #344054;
}

.snapshot-status {
  margin: 0;
  padding: 12px 28px;
  border-bottom: 1px solid #d0d7e2;
  color: #344054;
  background: #eef4ff;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.86rem;
}

.cart-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  align-items: start;
  gap: 24px;
  padding: 28px;
}

.cart-items {
  min-width: 0;
}

.cart-item-row {
  display: grid;
  grid-template-columns: 54px minmax(150px, 1fr) auto minmax(90px, auto) auto;
  align-items: center;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid #e4e7ec;
}

.cart-item-row:first-child {
  padding-top: 0;
}

.cart-item-row:last-child {
  border-bottom: 0;
}

.product-symbol {
  display: grid;
  width: 54px;
  height: 54px;
  place-items: center;
  border-radius: 7px;
  color: #175cd3;
  background: #eef4ff;
  font-size: 0.82rem;
  font-weight: 850;
}

.product-copy,
.line-total {
  display: grid;
  gap: 3px;
  min-width: 0;
}

.product-copy p,
.product-copy span,
.line-total span {
  margin: 0;
  color: #667085;
  font-size: 0.78rem;
}

.product-copy h3 {
  overflow: hidden;
  margin: 0;
  color: #101828;
  font-size: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.line-total {
  text-align: right;
}

.line-total strong {
  color: #101828;
  font-variant-numeric: tabular-nums;
}

.quantity-control {
  display: grid;
  grid-template-columns: 34px 38px 34px;
  align-items: center;
  overflow: hidden;
  border: 1px solid #98a2b3;
  border-radius: 6px;
}

.quantity-control button {
  height: 34px;
  border: 0;
  color: #344054;
  background: #f9fafb;
  cursor: pointer;
  font-size: 1.15rem;
}

.quantity-control button:hover:not(:disabled) {
  color: #ffffff;
  background: #175cd3;
}

.quantity-control button:disabled {
  cursor: not-allowed;
  opacity: 0.35;
}

.quantity-control output {
  color: #101828;
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  text-align: center;
}

.remove-item-button {
  padding: 5px 0;
  border: 0;
  color: #b42318;
  background: transparent;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 750;
}

.cart-summary {
  padding: 20px;
  border: 1px solid #d0d7e2;
  border-radius: 7px;
  background: #f9fafb;
}

.cart-summary h3 {
  margin: 6px 0 18px;
  color: #101828;
}

.cart-summary dl {
  margin: 0;
}

.cart-summary dl > div {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 9px 0;
  color: #475467;
}

.cart-summary dd {
  margin: 0;
  color: #101828;
  font-variant-numeric: tabular-nums;
  font-weight: 750;
}

.cart-summary .summary-total {
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid #b9c2cf;
  color: #101828;
  font-size: 1.08rem;
  font-weight: 800;
}

.summary-note {
  margin: 16px 0 0;
  color: #667085;
  font-size: 0.82rem;
  line-height: 1.5;
}

.empty-cart {
  padding: 44px 24px;
  border: 1px dashed #98a2b3;
  border-radius: 7px;
  text-align: center;
}

.empty-cart h3 {
  margin: 0;
  color: #101828;
}

.empty-cart p {
  margin: 8px 0 0;
  color: #667085;
}

@media (max-width: 980px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    width: min(100%, 420px);
  }
}

@media (max-width: 720px) {
  .cart-project-header {
    align-items: stretch;
    flex-direction: column;
  }

  .reset-cart-button {
    align-self: start;
  }

  .cart-item-row {
    grid-template-columns: 48px minmax(0, 1fr) auto;
  }

  .product-symbol {
    width: 48px;
    height: 48px;
  }

  .quantity-control {
    grid-column: 2;
  }

  .line-total {
    grid-column: 3;
    grid-row: 2;
  }

  .remove-item-button {
    grid-column: 2;
    justify-self: start;
  }
}

@media (max-width: 480px) {
  .cart-project-header,
  .cart-layout {
    padding: 20px;
  }

  .snapshot-status {
    padding: 11px 20px;
  }

  .cart-item-row {
    grid-template-columns: 42px minmax(0, 1fr);
    gap: 12px;
  }

  .product-symbol {
    width: 42px;
    height: 42px;
  }

  .quantity-control,
  .line-total,
  .remove-item-button {
    grid-column: 2;
    grid-row: auto;
  }

  .line-total {
    text-align: left;
  }
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

构建验证：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run lint
npm run build
```
</div>

### 预期输出或交互结果

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Output</span>
  </div>

```txt
Cart Quantity Panel
Wireless Keyboard  1  $79.00
USB-C Dock         2  $258.00
Monitor Light      1  $54.00
Units                 4
Total                 $391.00
```
</div>

交互检查：

- Wireless Keyboard 初始 quantity 为 `1`，decrement disabled。
- Increment 后 quantity 为 `2`，subtotal 变为 `$158.00`，units 变为 `5`，total 变为 `$470.00`。
- 连续 increment 到 stock `4` 后，increment disabled。
- Remove 返回 filtered array；Reset 返回全新的 seed array。

### 核心执行流程

1. Button 收到 click，React 调用 child 传入的 callback。
2. Row callback 带上 `product.id` 调用 owner component 的 handler。
3. Handler 从 current `cartItems` snapshot 记录操作前 quantity。
4. `setCartItems` queue functional update。
5. React 处理 queue，把 latest queued array 传给 `currentItems`。
6. `map` 创建新 array，目标 item 用 spread 创建新 object，其他 item 保留旧 reference。
7. React 再次调用 cart component 和 children。
8. `CartSummary` 用 `reduce` 从新 items 计算 units 与 total。
9. React commit quantity、disabled attributes、subtotal 和 total 的 DOM differences。

### 常见错误

| Error | Why It Happens | Fix |
| --- | --- | --- |
| Quantity exceeds stock | Only UI button was guarded. | Keep `Math.min` in updater and disable button. |
| Quantity drops below one | Missing domain boundary. | Keep `Math.max` and disabled decrement. |
| Total becomes stale | Total was duplicated in state. | Derive total with `reduce`. |
| Only item object changed in place | `map` returned same mutated item. | Return `{ ...item, quantity: next }`. |
| Remove does not render reliably | Original array was spliced. | Return `filter` result. |
| Reset shares mutated seed objects | Seed objects were previously mutated. | Never mutate seed; clone nested objects for initial state. |

### 可选扩展

- 学完 state modeling 后，讨论是否需要把 cart owner 提升到更高 component。
- 学完 reducer 后，把 increment、decrement、remove 建模为 actions。
- 学完 persistence 后，再考虑 browser storage。
- 进入 SellerHub 项目后，再连接 backend validation、server stock conflict 和 async loading；本章不要提前实现。

## 13. 额外速查表

### 一句话概念总结

Event handler 把用户操作交给 callback；setter 把 next state 或 updater 放入 React queue；React 在 handler 后用新 state 再次 render，并 commit 必要 DOM changes。

### 常用 API 表

| API / Syntax | Layer | Purpose | Required Inputs | Output / Effect | Common Mistake |
| --- | --- | --- | --- | --- | --- |
| `onClick={handler}` | React event | 注册 callback | function value | Event 时调用 | 写成 call expression |
| `useState(initial)` | React Hook | 建立 component memory | initial state | value + setter | 条件调用 Hook |
| `setValue(next)` | React runtime | queue replacement | next value | Request render | 期待当前 value 改变 |
| `setValue(prev => next)` | React runtime | queue calculation | updater | Uses queued previous state | 读取外部旧 snapshot 代替 parameter |
| `preventDefault()` | Browser API | 阻止默认动作 | cancelable event | Default action canceled | 当作 stopPropagation |
| `stopPropagation()` | Browser API | 停止传播 | event | Ancestor path stops | 当作 preventDefault |
| `map` | JavaScript API | 替换 array item | callback | New array | callback 内 mutation |
| `filter` | JavaScript API | 移除 array item | predicate | New array | 使用 splice |

### 相似概念对照表

| Concept A | Concept B | Key Difference | When to Use A | When to Use B |
| --- | --- | --- | --- | --- |
| Local variable | State | Local resets and does not trigger render; state persists and has setter. | Temporary calculation | UI memory |
| Next value | Updater function | Value replaces; updater receives queued previous state. | Independent next value | Depends on previous state |
| Render | Commit | Render calculates UI; commit changes DOM. | Reason about component calls | Reason about visible DOM change |
| `preventDefault` | `stopPropagation` | Browser action vs event path. | Form/link default | Parent handler boundary |
| Source state | Derived state | Stored input vs render-time calculation. | Smallest mutable source | Totals, subtotals, flags |
| TypeScript event type | Runtime event object | Type is erased; object exists. | Compile-time checking | Handler runtime behavior |

### 错误类型表

| Error | Error Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| Handler runs on load | Render behavior | Passed call result | Pass function value | Parentheses in event prop |
| Counter logs old value | Snapshot misunderstanding | Current binding is fixed | Predict next render | Read after setter |
| Triple update adds once | Queue misunderstanding | Same snapshot used | Functional updater | Repeated `state + 1` |
| Object UI does not update | Mutation | Same object snapshot/reference | Return new object | Property assignment |
| Array UI is inconsistent | Mutation | Original array changed | Return map/filter/spread | push/splice/sort |
| Wrong `currentTarget` API | TypeScript | Wrong element generic | Match bound element | Editor property error |

### 真实项目使用表

| Scenario | Why It Appears | Mechanism Used | Risk | Practical Rule |
| --- | --- | --- | --- | --- |
| Cart quantity | User changes a stored count | Functional array/object update | Stock boundary | Guard UI and updater |
| Controlled input | UI value follows state | Change event + setter | Wrong event type | Use currentTarget |
| Form submit | Browser has default navigation | preventDefault | Confuse propagation | Separate browser and React concerns |
| Toggle card | One object field changes | Object spread | Lost fields | Spread before override |
| Remove list item | Collection shape changes | filter | Direct splice | Return new array |
| Order total | Value follows items | reduce during render | Duplicate state | Derive, do not synchronize |

### 最小代码模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: typed input handler</span>
  </div>

```tsx
import { useState, type ChangeEvent } from 'react'

export function SearchField() {
  const [value, setValue] = useState('')

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value)
  }

  return <input onChange={handleChange} value={value} />
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: immutable keyed array update</span>
  </div>

```tsx
setItems((currentItems) =>
  currentItems.map((item) =>
    item.id === targetId ? { ...item, quantity: item.quantity + 1 } : item,
  ),
)
```
</div>

## 14. 工程迁移与代码审查要点

### Code review questions

- 事件 handler 是否传引用，而不是在 render 中调用？
- 依赖旧 state 的更新是否使用 functional updater？
- 对象和数组 state 是否通过复制生成新值？

### Migration checks

- 从直接 DOM 操作迁移时，先把可见 UI 差异建模为 state。
- 从可变对象迁移时，先定位谁拥有 state，再替换为不可变更新。
- 把复杂事件逻辑拆成命名 handler，避免 JSX 中隐藏状态变化。

### Production risk signals

- 点击一次却更新多次，检查 render 阶段是否误调用 handler。
- 状态显示旧值，检查是否误解 snapshot 或 batching。
- 列表项更新污染其他项，检查是否复用了旧对象引用。

## 15. 如何转换成个人笔记

建议整理成五张机制卡，而不是抄整页代码：

1. Event card：function value、call expression、event object、default、propagation。
2. State memory card：local variable、`useState`、setter、render、commit。
3. Snapshot card：closure、current render、delayed callback。
4. Queue card：replacement、batching、functional updater。
5. Immutable state card：object spread、array map/filter、derived state。

每张卡都写一个“预测题”：给出 click 前 state、handler code 和 queue，先手算下一次 render，再运行真实练习验证。不要只记录 API 名称。

## 16. 必须能回答的问题

1. 为什么 `onClick={handleClick}` 不会在 render 时执行？
2. 为什么 `onClick={handleClick()}` 会立即执行？
3. `preventDefault` 与 `stopPropagation` 分别影响什么？
4. 为什么二者都不会自动更新 React UI？
5. `useState` 返回的 value 和 setter 分别是什么？
6. 普通 local variable 为什么不能保存 UI state？
7. 调用 setter 后为什么当前 handler 仍读取旧 value？
8. State snapshot 与 JavaScript closure 有什么关系？
9. 三个 `setCount(count + 1)` 为什么通常只产生一次加一？
10. 三个 functional updaters 如何依次计算？
11. 为什么 object state 应返回新 object？
12. 为什么 `push`、`splice` 不适合直接更新 state array？
13. `map`、`filter`、spread 分别适合什么 collection update？
14. TypeScript event type 在 compile time 检查什么？
15. TypeScript type 为什么不能在 browser runtime 验证 API data？
16. Cart total 为什么不是独立 state？
17. Cart increment 如何同时创建新 array 和新 item object？
18. React 从 click 到 DOM commit 的完整顺序是什么？

## 17. 最终记忆模型

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终记忆模型</span>
  </div>

```txt
Pass handlers; do not call them during render.
Each render receives a fixed state snapshot.
Setters queue work for a future render.
Functional updaters consume queued previous state.
Replace state objects and arrays instead of mutating snapshots.
Derive totals and flags during render when possible.
TypeScript checks source code; React and the browser run JavaScript.
```
</div>

最短中文版本：event 触发 callback；callback queue state update；React 用新 state 再 render；UI difference 才进入 DOM commit。当前 render 不会被 setter 回写，object 和 array 的下一份 state 要用新引用表达。

## 18. 官方文档阅读清单

以下页面已在 2026-06-18 直接访问官方 URL 并取得 HTTP `200`。内置 web 搜索工具当时返回 `403`，但不影响这些官方页面的直接验证。

| Source | Link | 本章重点 |
| --- | --- | --- |
| React | [Responding to Events](https://react.dev/learn/responding-to-events) | Handler 必须 passed not called；propagation；`preventDefault`。 |
| React | [State: A Component's Memory](https://react.dev/learn/state-a-components-memory) | Retain data 与 trigger render；`useState` 的两个返回值。 |
| React | [Render and Commit](https://react.dev/learn/render-and-commit) | Trigger、render、commit 三阶段；只改有 difference 的 DOM。 |
| React | [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot) | Setter 不改当前 snapshot；handler 与 render-time values。 |
| React | [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates) | Handler 后处理 queue；batching；updater function。 |
| React | [Updating Objects in State](https://react.dev/learn/updating-objects-in-state) | Object state read-only；replacement 与 spread。 |
| React | [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state) | Array state read-only；map/filter 与 mutating methods 对照。 |
| React | [Using TypeScript](https://react.dev/learn/typescript) | `React.ChangeEvent<HTMLInputElement>` 和 React types。 |
| React API | [useState](https://react.dev/reference/react/useState) | Setter 后当前 snapshot 不变；`Object.is` 相同值可跳过 re-render；event handler 后批处理。 |
| TypeScript | [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html) | JSX intrinsic/value-based element 与 attribute checking。 |
| TypeScript | [More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html) | Function type expression、callback parameter 与 `void`。 |
| MDN | [Event.preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) | 阻止 default action，但 event 通常继续传播。 |
| MDN | [Event.stopPropagation](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) | 停止 capture/bubble propagation，但不阻止 default behavior。 |
| MDN | [Event bubbling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling) | Bubbling、`target` 与 `currentTarget`。 |

本地辅助资料状态：

- 已检查 `references/books/react/README.md`。
- 已读取 local-only 的 `The Road to React` 2025 edition；该文件存在于开发机学习目录，但按 repository 规则不上传 GitHub。
- PDF 物理页 50-52（书内页 45-47）用于辅助理解 handler function、传递 function value、synthetic event 与 `preventDefault`。
- PDF 物理页 58-64（书内页 53-59）用于辅助理解 local variable、`useState`、state updater 和 callback handler。
- PDF 物理页 67（书内页 62）用于辅助理解由 state 派生 filtered array；物理页 155（书内页 150）用于辅助理解 form submission 与 `preventDefault`。
- PDF 物理页 205、210（书内页 200、205）用于辅助理解 `useState` type inference 与 `React.ChangeEvent<HTMLInputElement>`。

本地资料中需要按当前官方文档纠正或收窄的内容：

- PDF 物理页 51 把 `preventDefault` 的作用放在 React synthetic event 的增强背景下介绍，容易让人误以为它是 React 专有能力。MDN 明确说明 `preventDefault()` 属于 browser `Event` API；React event object 提供兼容调用入口，但默认行为本身属于浏览器平台边界。
- PDF 物理页 59 把 user interaction 直接标成 `side-effect`。本章使用更精确的分层：event 是 browser input，handler 是 callback；handler 内可以执行 side effect，但普通 event-driven state update 不应与后续 `useEffect` 章节混为一谈。
- PDF 物理页 61 用“异步 re-render、出于性能原因”概括 batching，且写成 state update 总会触发 re-render。当前 React 文档的更精确模型是：setter queue update，当前 render snapshot 不变，React 通常在 event handler 结束后处理 queue；若 next state 与 current state 经 `Object.is` 比较相同，React 可以跳过 component children 的 re-render。
- PDF 示例主要使用 `.jsx`、`event.target.value` 和 `React.useState`。它们不是错误，但本章根据当前 TypeScript 项目使用 `.tsx`、specific event type、`event.currentTarget.value` 和 named `useState` import。

Verification Needed：

- 官方页面内容已直接验证，没有仍需人工核对的框架行为。
- 仍建议人工在浏览器中操作 delayed snapshot、stock boundary、remove/reset 和 responsive layout，因为 build/type checking 不能替代交互与视觉检查。
