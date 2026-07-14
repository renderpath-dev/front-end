# React 第 8 章：State Architecture、useReducer、Context 与 Custom Hooks

<style>
.macos-code-window {
  overflow: hidden;
  margin: 16px 0;
  border: 1px solid #30363d;
  border-radius: 12px;
  background: #0d1117;
}

.macos-code-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 0 12px;
  border-bottom: 1px solid #30363d;
  background: #161b22;
}

.macos-code-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  flex: 0 0 auto;
  border-radius: 999px;
}

.macos-code-dot-red { background: #ff5f57; }
.macos-code-dot-yellow { background: #ffbd2e; }
.macos-code-dot-green { background: #28c840; }

.macos-code-title {
  margin-left: 8px;
  color: #c9d1d9;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
}

.macos-code-titlebar + pre {
  overflow-x: auto;
  margin: 0;
  padding: 16px;
  border-radius: 0 0 12px 12px;
  background: transparent;
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
  - [9.1 Minimal state 与 derived data](#91-minimal-state-与-derived-data)
  - [9.2 State shape：避免 redundant、duplicate 与 contradictory state](#92-state-shape避免-redundantduplicate-与-contradictory-state)
  - [9.3 State owner 与 lifting state up](#93-state-owner-与-lifting-state-up)
  - [9.4 Callback props 与 dispatch intent](#94-callback-props-与-dispatch-intent)
  - [9.5 Preserving state 与使用 key reset state](#95-preserving-state-与使用-key-reset-state)
  - [9.6 useReducer 心智模型](#96-usereducer-心智模型)
  - [9.7 Pure reducer 与 immutable transition](#97-pure-reducer-与-immutable-transition)
  - [9.8 Typed action union 与 exhaustiveness check](#98-typed-action-union-与-exhaustiveness-check)
  - [9.9 Context provider 与 consumer boundary](#99-context-provider-与-consumer-boundary)
  - [9.10 Reducer 与 Context 组合](#910-reducer-与-context-组合)
  - [9.11 Custom hook 提取 stateful logic](#911-custom-hook-提取-stateful-logic)
  - [9.12 相同 custom hook 的独立 state](#912-相同-custom-hook-的独立-state)
  - [9.13 SellerHub 状态架构映射](#913-sellerhub-状态架构映射)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目名称与目标](#121-项目名称与目标)
  - [12.2 最终小项目结构](#122-最终小项目结构)
  - [12.3 完整代码](#123-完整代码)
  - [12.4 完整执行过程](#124-完整执行过程)
  - [12.5 机制边界与错误识别](#125-机制边界与错误识别)
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
| Minimal state | The nearest owner stores only data that cannot be derived. | React state model | Cart totals are derived instead of duplicated. | `src/learning/react/chapter-08-state-architecture/01-minimal-state/minimal-cart-state.tsx` |
| State owner lifting | The common parent owns state needed by multiple children. | React component tree | Shared filters update multiple cart or checkout views consistently. | `src/learning/react/chapter-08-state-architecture/03-state-owner-lifting/shared-filter-owner.tsx` |
| Reducer transition | Events become explicit actions and pure transitions. | React reducer hook plus JavaScript pure function | Cart changes are auditable as action records. | `src/learning/react/chapter-08-state-architecture/06-reducer-mental-model/cart-reducer-transition.tsx` |
| Context delivery | Context distributes state access without making all state global. | React Context runtime | Cart state is provided to the workspace while keeping reducer ownership clear. | `src/learning/react/chapter-08-state-architecture/10-reducer-context/reducer-context-boundary.tsx` |

## 0. 本章工程问题与边界

本章解决的工程问题是：状态应该放在哪里、怎样变化、如何传递。随着组件变多，随手加 state 会制造重复来源、错位 owner 和难以测试的更新逻辑。

本章不引入外部状态管理库、服务端缓存或持久化方案。边界是 React 内部的 state shape、owner、reducer、Context 和 custom hook 提取。

## 1. 本章解决的问题

第 4 章已经说明 state update、render snapshot 和 immutable object/array update；第 5 章说明 list、`key` 与 conditional rendering；第 6、7 章分别处理 form state 与外部同步。本章解决更高一层的问题：当多个组件需要协作时，哪一份数据才是 source of truth、谁拥有它、更新意图怎样到达 owner、复杂 transition 放在哪里、深层组件怎样读取，以及逻辑如何复用。

需要避免两个极端：一是把每个计算结果都保存成 state，制造同步负担；二是把所有 state 都抬到顶层 Context，制造无关耦合。State architecture 的目标不是“更多抽象”，而是让每个事实只有一个 owner，让每条更新路径可追踪。

## 2. 前置概念

- 会编写 function component、JSX、props 和 callback props。
- 理解 `useState`、event handler、render snapshot 和 functional updater。
- 能用 `map`、`filter` 与 object spread 做 immutable update。
- 理解 list `key` 用于 sibling identity，而不是传给 component 的普通 prop。
- 知道 TypeScript union、literal type、type narrowing 与 `never` 的基础含义。
- 能区分 render calculation、event logic 与 effect synchronization。

## 3. 学习目标

完成本章后，你应该能够：

- 从 UI 需要反推 minimal source state，并在 render 中计算 derived data。
- 识别 redundant、duplicate 与 contradictory state。
- 把 state 放在需要读写它的最近公共父组件，而不是机械地“越高越好”。
- 解释 lifting state up 是移动 source of truth，而不是复制 state。
- 用 callback props 或 `dispatch(action)` 表达 child intent。
- 根据 UI tree position、component type 与 `key` 预测 state preserve/reset。
- 解释 `useReducer` 的输入、输出、snapshot 与 dispatch 行为。
- 编写 pure、immutable、typed reducer，并用 discriminated union 做 exhaustiveness check。
- 设计有明确 provider / consumer 范围的 typed Context。
- 用 custom hook 复用 stateful logic，同时解释为什么 hook call 不自动共享 state。
- 把这些判断映射到 SellerHub 的 cart、checkout、filter、selection 与 auth 边界。

## 4. 机制依赖图

这些依赖不是阅读顺序清单，而是本章概念成立的前置关系。

| First Understand | Then Understand | Dependency Reason | Failure If Skipped |
| --- | --- | --- | --- |
| Derived data | Minimal state shape | 先识别可计算值，才能避免重复存储。 | 两个 state 来源会互相矛盾。 |
| Common consumer | Lifted state owner | 多个子组件共享数据时，需要上移到共同 owner。 | 兄弟组件会各自维护不一致副本。 |
| Event intent | Reducer action | 复杂更新需要先表达发生了什么，再计算新状态。 | setter 分散导致业务规则难审查。 |
| Stable provider boundary | Context delivery | Context 负责传递，不应该隐藏 reducer 规则。 | 所有组件都会变成隐式依赖全局状态。 |

## 5. 核心术语表

| 术语 | 准确定义 | 所属层 |
| --- | --- | --- |
| source state | 不能从当前 props/state 直接计算、需要由交互保留的最小事实 | architecture convention |
| derived data | 每次 render 可由当前输入计算得到的值 | JavaScript runtime / React render |
| redundant state | 可从其他 state/props 计算，却被重复保存的 state | architecture problem |
| duplicate state | 同一实体或事实以多份独立副本保存 | architecture problem |
| contradictory state | 多个 state 组合可表达不可能或互斥状态 | architecture problem |
| state owner | 保存 source state 并决定更新规则的 component | React architecture |
| lifting state up | 把 source of truth 移到需要共享它的最近公共父组件 | React architecture |
| reducer | `(state, action) => nextState` 的 pure transition function | JavaScript / React contract |
| action object | 描述“发生了什么”的 plain object，通常含 discriminant `type` | JavaScript object / TypeScript union |
| dispatch | 把 action 排入 React state update 的 function | React framework |
| Context | 让 descendants 读取最近 provider value 的 React 机制 | React framework |
| provider boundary | 某个 Context value 对 component subtree 生效的范围 | React framework / architecture |
| custom hook | 名称以 `use` 开头、可组合其他 Hooks 的 function | React convention / JavaScript |
| hook call identity | React 根据 component 内稳定调用顺序关联 hook state | React framework |

## 6. 底层心智模型

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">State architecture mental model</span></div>

```txt
User event
  -> child reports intent through callback or dispatch(action)
  -> state owner receives the update request
  -> useState updater or reducer(currentState, action) computes next source state
  -> React schedules and calls affected components with a new render snapshot
  -> derived data is recalculated from current source state
  -> Context consumers read the nearest provider value
  -> React commits the resulting UI

Tree position + component type + key define state identity.
Custom hooks reuse logic; each hook call gets its own hook state.
TypeScript checks shapes before runtime; React performs runtime state work.
```
</div>

五层边界必须分开：

- **JavaScript runtime behavior：** object/array reference、function call、closure、`switch`、`map`、`filter` 与普通 object creation。
- **React framework behavior：** hook state、render snapshot、update queue、dispatch、tree identity、Context lookup 与 consumer re-render。
- **TypeScript type-system behavior：** state/action/context/hook return type 检查、union narrowing 与 `never` exhaustiveness；类型会从运行时代码中擦除。
- **tooling behavior：** Vite 转换 TSX、TypeScript/ESLint 报告静态问题、React Fast Refresh 改善开发反馈。
- **architecture convention：** 选择 minimal state、owner、transition 与 provider scope；这是设计决策，不是 React 自动替你完成的工作。

## 7. 推荐目录结构

**真实练习结构：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Chapter 08 real file structure</span></div>

```txt
src/learning/react/chapter-08-state-architecture/
  chapter-08-practice-root.tsx
  chapter-08-practice.css
  01-minimal-state/
    minimal-cart-state.tsx
  02-state-shape-boundaries/
    state-shape-boundaries.tsx
  03-state-owner-lifting/
    shared-filter-owner.tsx
  04-callback-dispatch-intent/
    callback-intent-boundary.tsx
  05-preserving-resetting-state/
    keyed-checkout-draft.tsx
  06-reducer-mental-model/
    cart-reducer-transition.tsx
  07-pure-reducer-immutability/
    pure-reducer-immutability.tsx
  08-typed-action-union/
    typed-action-union.tsx
  09-context-boundary/
    context-provider-boundary.tsx
  10-reducer-context/
    reducer-context-boundary.tsx
  11-custom-hook-extraction/
    custom-hook-extraction.tsx
  12-independent-hook-state/
    independent-hook-state.tsx
  cart-state-workspace/
    cart-state-model.ts
    cart-state-reducer.ts
    cart-state-context.ts
    cart-state-provider.tsx
    use-cart-state.ts
    cart-item-row.tsx
    cart-summary.tsx
    checkout-draft.tsx
    cart-state-workspace.tsx
    cart-state-workspace.css
```
</div>

采用编号目录，是为了让阅读顺序和官方学习顺序可直接对应；采用机制名而不是 `demo.tsx`，是为了以后复习时仅看路径就知道练习目标。最终项目独立分层，是为了展示 model、transition、delivery、consumer 与 presentation 的职责边界，而不是建立通用“全局状态框架”。

**概念 snippet：**

本文中的错误写法与短机制片段只用 `Snippet:` 标题，不需要在项目中创建，也不用于交付验证记录。

## 8. 示例运行方式

`src/App.tsx` 已按当前项目约定挂载 `Chapter08PracticeRoot`。在项目根目录执行：

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Terminal</span></div>

```bash
npm run dev
```
</div>

在浏览器打开 Vite 输出的本地 URL，通常是 `http://localhost:5173/`。建议按编号逐卡操作，并在每次点击前预测 owner、action、next state、render snapshot 和 derived output。

**本章练习入口：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/chapter-08-practice-root.tsx</span></div>

```tsx
import { MinimalCartState } from './01-minimal-state/minimal-cart-state'
import { StateShapeBoundaries } from './02-state-shape-boundaries/state-shape-boundaries'
import { SharedFilterOwner } from './03-state-owner-lifting/shared-filter-owner'
import { CallbackIntentBoundary } from './04-callback-dispatch-intent/callback-intent-boundary'
import { KeyedCheckoutDraft } from './05-preserving-resetting-state/keyed-checkout-draft'
import { CartReducerTransition } from './06-reducer-mental-model/cart-reducer-transition'
import { PureReducerImmutability } from './07-pure-reducer-immutability/pure-reducer-immutability'
import { TypedActionUnion } from './08-typed-action-union/typed-action-union'
import { ContextProviderBoundary } from './09-context-boundary/context-provider-boundary'
import { ReducerContextBoundary } from './10-reducer-context/reducer-context-boundary'
import { CustomHookExtraction } from './11-custom-hook-extraction/custom-hook-extraction'
import { IndependentHookState } from './12-independent-hook-state/independent-hook-state'
import { CartStateWorkspace } from './cart-state-workspace/cart-state-workspace'
import './chapter-08-practice.css'

const practiceSections = [
  { id: 'minimal-state', component: <MinimalCartState /> },
  { id: 'state-shape', component: <StateShapeBoundaries /> },
  { id: 'state-owner', component: <SharedFilterOwner /> },
  { id: 'callback-intent', component: <CallbackIntentBoundary /> },
  { id: 'state-identity', component: <KeyedCheckoutDraft /> },
  { id: 'reducer-model', component: <CartReducerTransition /> },
  { id: 'pure-reducer', component: <PureReducerImmutability /> },
  { id: 'action-union', component: <TypedActionUnion /> },
  { id: 'context-boundary', component: <ContextProviderBoundary /> },
  { id: 'reducer-context', component: <ReducerContextBoundary /> },
  { id: 'custom-hook', component: <CustomHookExtraction /> },
  { id: 'hook-identity', component: <IndependentHookState /> },
]

export function Chapter08PracticeRoot() {
  return (
    <main className="chapter-eight-shell">
      <header className="chapter-eight-header">
        <p className="chapter-eight-eyebrow">React Chapter 08</p>
        <h1>State Architecture, Reducers, Context, and Custom Hooks</h1>
        <p>
          Model source state, ownership, transition logic, delivery boundaries, and
          reusable stateful contracts before scaling SellerHub workflows.
        </p>
      </header>

      <section aria-labelledby="chapter-eight-practice-title">
        <div className="chapter-eight-section-heading">
          <div>
            <p>Mechanism practice</p>
            <h2 id="chapter-eight-practice-title">One state architecture decision per directory</h2>
          </div>
          <p>Predict the owner, source of truth, identity, transition, and consumer boundary.</p>
        </div>

        <div className="chapter-eight-practice-grid">
          {practiceSections.map((practice) => (
            <div id={practice.id} key={practice.id}>
              {practice.component}
            </div>
          ))}
        </div>
      </section>

      <CartStateWorkspace />
    </main>
  )
}
```
</div>

**本章共享样式：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/chapter-08-practice.css</span></div>

```css
:root {
  color: #182230;
  background: #edf3f1;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

body {
  margin: 0;
}

button,
input,
select,
textarea {
  font: inherit;
}

.chapter-eight-shell {
  width: min(100% - 32px, 1180px);
  margin: 0 auto;
  padding: 56px 0 72px;
}

.chapter-eight-header {
  max-width: 930px;
  margin-bottom: 48px;
}

.chapter-eight-eyebrow,
.chapter-eight-section-heading > div > p,
.practice-label,
.project-eyebrow {
  margin: 0;
  color: #0b6b58;
  font-size: 0.75rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.chapter-eight-header h1 {
  max-width: 920px;
  margin: 10px 0 0;
  color: #182230;
  font-size: clamp(2.2rem, 6vw, 4.5rem);
  line-height: 1.02;
}

.chapter-eight-header > p:last-child {
  margin: 22px 0 0;
  color: #526071;
  font-size: 1.08rem;
  line-height: 1.7;
}

.chapter-eight-section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 20px;
}

.chapter-eight-section-heading h2 {
  margin: 6px 0 0;
  color: #182230;
  font-size: 1.8rem;
}

.chapter-eight-section-heading > p {
  max-width: 430px;
  margin: 0;
  color: #667085;
  text-align: right;
}

.chapter-eight-practice-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.practice-card {
  height: 100%;
  box-sizing: border-box;
  padding: 22px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #ffffff;
}

.practice-card h3 {
  margin: 8px 0 18px;
  color: #182230;
  font-size: 1.15rem;
}

.practice-card p:not(.practice-label) {
  color: #667085;
  line-height: 1.55;
}

.practice-card label {
  display: grid;
  gap: 6px;
  margin-bottom: 12px;
  color: #344054;
  font-size: 0.9rem;
  font-weight: 750;
}

.practice-card input:not([type='checkbox']),
.practice-card select,
.practice-card textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 9px 10px;
  color: #182230;
  border: 1px solid #94a3b8;
  border-radius: 7px;
  background: #ffffff;
}

.practice-card textarea {
  min-height: 82px;
  resize: vertical;
}

.practice-card button {
  padding: 9px 12px;
  color: #ffffff;
  border: 1px solid #0b6b58;
  border-radius: 7px;
  background: #0b6b58;
  font-weight: 800;
  cursor: pointer;
}

.practice-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.practice-list {
  display: grid;
  gap: 10px;
}

.practice-list label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

@media (max-width: 960px) {
  .chapter-eight-practice-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .chapter-eight-shell {
    width: min(100% - 20px, 1180px);
    padding: 36px 0 48px;
  }

  .chapter-eight-section-heading {
    align-items: start;
    flex-direction: column;
  }

  .chapter-eight-section-heading > p {
    text-align: left;
  }

  .chapter-eight-practice-grid {
    grid-template-columns: 1fr;
  }
}
```
</div>

## 9. 分节教学与练习

### 9.1 Minimal state 与 derived data

**本节解决的问题：**

购物车数量、总件数和 subtotal 都会变化，但不代表三者都应该是 state。本节要判断哪些值必须被记住，哪些值可以从当前 render snapshot 计算。

**技术意义：**

只保存 `quantities`，让 `totalCount` 与 `subtotal` 在 render 中派生，意味着系统只有一份 source of truth。任意一次 quantity update 都不会漏掉“同步 totals”的第二次 update。

**新关键字和新概念：**

`minimal state`、`source state`、`derived data`、`redundant state`。本节没有新 API，重点是状态归属和架构边界。

**五层边界：**

- JavaScript runtime 用 `reduce` 读取当前 `quantities` object 并返回 number。
- React framework 保存 `quantities`，调用 component 产生新的 render snapshot。
- TypeScript 检查 `Record<string, number>`、product shape 与 number operation。
- tooling 把 TSX 转换成浏览器可执行模块，并在不兼容类型处报错。
- architecture convention 决定 totals 不进入 state；React 不会自动替你删除 redundant state。

**底层机制：**

每次 component function 被调用时，`totalCount` 和 `subtotal` 都是该次调用中的新 lexical bindings。它们读取同一 render 的 `quantities` snapshot；事件处理函数请求 next quantities 后，旧函数调用中的 totals 不会原地变化，React 下一次 render 才重新计算。

**机制推演：**

React 实际长期保存的是 `MinimalCartState` 对应 Hook cell 中的 quantities object reference。React 不保存 `totalCount`、`subtotal`、`products.map(...)` 的 button array，也不保存本次 function call 的局部变量；这些都是 JavaScript 在每次 render 调用期间重新创建或重新计算的结果。初次 render 中，两个 `reduce` 分别生成 number 值，JSX 又创建描述当前 UI 的 React elements。

点击 Add 时，browser 先触发 click，React 调用该次 render 创建的 `onClick` closure。Closure 记住目标 `product.id`，setter 收到 functional updater 后把它加入该 state Hook 的 update queue。Updater 被处理时读取 queue 中的最新 quantities，而不是闭包里的旧 object；它返回新 object reference。React 随后调用 component 形成下一份 snapshot，两个 derived numbers 才随之重算。

TypeScript 只证明 updater 返回值兼容 `Record<string, number>`，并检查 `product.price * quantity` 是 number 运算。Emit 后 `Record` 消失；如果运行时输入含 `NaN` 或负数，TypeScript 不会自动校验或修复。SellerHub 中看到“修改 quantity 的同时还调用 `setSubtotal`”时，应立即怀疑重复 source of truth。

**API / 语法规则：**

`useState<Record<string, number>>(initialValue)` 返回当前 snapshot 与 setter。`setQuantities(current => next)` 使用 queued previous state；`reduce((total, item) => nextTotal, 0)` 是 JavaScript array API，不是 React API。

**固定属性名、方法名与签名：**

- Hook 名固定为 `useState`。
- functional updater 形状是 `(currentState) => nextState`。
- `reduce` callback 的前两个参数在这里是 accumulator 与 current item。
- `product.id` 只是本地数据字段，不是 React 固定字段；`key` 才是 React list identity attribute。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/01-minimal-state/minimal-cart-state.tsx</span></div>

```tsx
import { useState } from 'react'

const products = [
  { id: 'keyboard', name: 'Mechanical keyboard', price: 89 },
  { id: 'mouse', name: 'Wireless mouse', price: 45 },
]

export function MinimalCartState() {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    keyboard: 1,
    mouse: 0,
  })

  const totalCount = products.reduce(
    (total, product) => total + (quantities[product.id] ?? 0),
    0,
  )
  const subtotal = products.reduce(
    (total, product) => total + product.price * (quantities[product.id] ?? 0),
    0,
  )

  function increaseQuantity(productId: string) {
    setQuantities((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }))
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Minimal state</p>
      <h3>Derive totals during render</h3>
      <div className="practice-stack">
        {products.map((product) => (
          <button key={product.id} onClick={() => increaseQuantity(product.id)}>
            Add {product.name}
          </button>
        ))}
      </div>
      <p>
        {totalCount} items · ${subtotal.toFixed(2)}
      </p>
    </article>
  )
}
```
</div>

**代码逐行解释：**

1. `products` 是稳定的 module data，不需要 state。
2. `quantities` 保存用户操作后必须跨 render 保留的最小事实。
3. 两次 `reduce` 只读取当前 snapshot，不触发 update。
4. updater 用 spread 创建新 object，并只替换目标 property。
5. list button 的 `key` 建立 sibling identity；click closure 传入对应 `product.id`。

**执行过程：**

初次 render 读取 `{ keyboard: 1, mouse: 0 }`，得到 `totalCount = 1`、`subtotal = 89`。点击 mouse button 后，handler enqueue 一个 updater；React 应用 updater 得到新 object，再 render，两个 `reduce` 读取新 object，输出 `2 items · $134.00`。

**变量、引用与 snapshot 变化：**

旧 `quantities` reference 不变，新 updater 返回不同 object reference。旧 render 的 `totalCount` 仍是 `1`；新 render 创建新的 `totalCount = 2`。没有 action object、Context value 或 reducer state；props 也没有承担 owner 传递职责。

**为什么得到这个结果：**

因为 totals 是 deterministic calculation，只依赖 products 与当前 quantities。source state 一更新，下一次 render 必然从同一事实重新得到一致 totals。

**对比写法：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: redundant cart totals</span></div>

```tsx
const [quantities, setQuantities] = useState<Record<string, number>>({})
const [totalCount, setTotalCount] = useState(0)
const [subtotal, setSubtotal] = useState(0)
```
</div>

这段错误设计要求每条 quantity update 同时维护三份 state；漏掉任意 setter 就产生不一致 UI。

**常见错误违反的规则：**

把可由当前 props/state 计算的值再次保存，违反“一份事实一个 source of truth”。直接 mutation `quantities[productId] += 1` 还会违反 immutable update 规则。

**如何识别类似错误：**

看到某个 state 的 setter 总是和另一个 setter 成对出现，先问：“删掉它以后，能否在 render 中由现有输入计算？”如果答案是能，它通常是 derived data。

**与 SellerHub 的关系：**

`CartPage` 应保存 cart item quantities，不单独保存 subtotal 与 total count；`ProductListPage` 保存 filter criteria，不保存第二份 visible products。

**与当前 React 学习主线的关系：**

本节复用第 4 章的 updater 与 immutable object update，把注意力从“怎样更新”提升到“究竟该保存什么”。

**本节最终记忆模型：**

State 保存无法从当前输入重建的事实；render 负责从这些事实计算 UI 所需结果。

### 9.2 State shape：避免 redundant、duplicate 与 contradictory state

**本节解决的问题：**

多个 boolean state 容易表达 `isDraft && isPublished` 这类不可能组合；同时保存 `selectedProductId` 和完整 `selectedProduct` 会制造 duplicate entity snapshot。

**技术意义：**

良好的 state shape 让非法状态难以表达。一个 literal union 表示互斥 status，一个 stable id 指向 module data，既减少更新路径，也让 TypeScript 帮助 narrowing。

**新关键字和新概念：**

`contradictory state`、`duplicate state`、normalized reference、single discriminant。本节没有新 API，重点是状态归属和架构边界。

**五层边界：**

- JavaScript runtime 用 string id 和 `find` 得到当前 product object。
- React framework 分别保留 status 与 selected id snapshots。
- TypeScript 把 status 限制为三个 literal 之一。
- tooling 在 `setStatus('archived')` 处提供静态错误。
- architecture convention 选择 id 而不是复制 entity object，选择一个 status 而不是多个互斥 booleans。

**底层机制：**

`selectedProduct` 每次 render 由 id 查询得到，不拥有独立 setter。若 products 的 name 变化，下一次 render 查询到新 object，不需要再同步一份 selected product state。

**机制推演：**

React 这里只保存两个 Hook cells：一个保存单个 status string，一个保存 selected id string。JavaScript 每次调用 component 都执行 `find`，把当前 id 映射为 products array 中的 object reference；`selectedProduct` 是当前调用的局部 binding，不是第三份 React state。Status buttons 的 `map` 又为本次 render 创建一组 element objects 和 click closures。

选择新 product 时，`onChange` 从 browser select event 读取 `event.target.value`，setter 将新 string 加入 selected-id update queue。React 下一次 render 才用新 id 再次 `find`。点击 status button 走另一条 Hook queue，因此两个 source facts 可以独立更新，但 status 自身不会出现多个 boolean 同时为 true 的组合。

TypeScript 的 literal union 会拒绝源码中的 `setStatus('archived')`，却不会验证从 storage、URL 或 API 得到的普通 string。若 SellerHub 把 selected product object 与 selected id 都存入 state，更新产品名称后 object 副本可能仍显示旧名称；识别信号是“同一 entity 在 state 中出现 id 和完整副本，并各自有更新路径”。

**API / 语法规则：**

`type ProductStatus = 'draft' | 'review' | 'published'` 是 TypeScript literal union。`Array.prototype.find` 返回 element 或 `undefined`；optional chaining 处理未找到情况。

**固定属性名、方法名与签名：**

`find(predicate)` 是 JavaScript 固定方法；`value`、`onChange` 是受控 `<select>` 的 React props。`status`、`selectedProductId` 是领域命名，不是 React 固定名称。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/02-state-shape-boundaries/state-shape-boundaries.tsx</span></div>

```tsx
import { useState } from 'react'

type ProductStatus = 'draft' | 'review' | 'published'

const products = [
  { id: 'sku-101', name: 'Desk lamp' },
  { id: 'sku-102', name: 'Monitor stand' },
]

export function StateShapeBoundaries() {
  const [status, setStatus] = useState<ProductStatus>('draft')
  const [selectedProductId, setSelectedProductId] = useState(products[0].id)
  const selectedProduct = products.find((product) => product.id === selectedProductId)

  return (
    <article className="practice-card">
      <p className="practice-label">State shape</p>
      <h3>Store one source of truth</h3>
      <label>
        Product
        <select
          value={selectedProductId}
          onChange={(event) => setSelectedProductId(event.target.value)}
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
      <div className="practice-stack">
        {(['draft', 'review', 'published'] as const).map((nextStatus) => (
          <button key={nextStatus} onClick={() => setStatus(nextStatus)}>
            {nextStatus}
          </button>
        ))}
      </div>
      <p>
        {selectedProduct?.name} is {status}.
      </p>
    </article>
  )
}
```
</div>

**代码逐行解释：**

1. `ProductStatus` 把互斥状态收进一个 discriminant。
2. component 只保存 `status` 与 `selectedProductId`。
3. `find` 从 canonical products 计算 selected object。
4. `<select>` 更新 id；status buttons 更新唯一 status。
5. `as const` 保留 array element 的 literal types，避免被 widening 为普通 `string`。

**执行过程：**

选择 `sku-102` 时 React 保存新的 id snapshot；下一次 render 的 `find` 返回 Monitor stand。点击 published 时 status 变为单一 `'published'`，不存在另一个 `isDraft` 遗留为 true 的路径。

**变量、引用与 snapshot 变化：**

products array reference 不变；selected id string 变化；`selectedProduct` binding 指向 array 中另一个既有 object。新 status string 替换旧 snapshot，不会合并多个 boolean。

**为什么得到这个结果：**

因为互斥状态被建模为单值 union，同一时刻只能选一个 member；selected object 又始终由当前 id 与 canonical array 决定。

**对比写法：**

不要同时保存 `isDraft`、`isReviewing`、`isPublished`，也不要同时保存 `selectedProductId` 与可独立修改的 `selectedProduct`。

**常见错误违反的规则：**

同一事实出现多份可独立更新的 state，违反 single source of truth；多个互斥 boolean 允许 contradictory combinations。

**如何识别类似错误：**

列出所有 state 的笛卡尔组合。如果其中有业务上不可能的组合，应该考虑 union/status object；如果两个 state 总表示同一 entity，保留稳定 id 并派生 object。

**与 SellerHub 的关系：**

checkout step 使用 `'address' | 'payment' | 'review'`，而不是三个 `is...Step`；seller order selection 保存 order id，而不是复制一份可能过期的 order object。

**与当前 React 学习主线的关系：**

本节把第 4 章的 TypeScript state typing 用到架构约束，让类型系统减少不可能状态。

**本节最终记忆模型：**

State shape 应让一个事实只有一个表示，让互斥状态只有一个 discriminant。

### 9.3 State owner 与 lifting state up

**本节解决的问题：**

filter input 要写 query，result list 要读 query。如果各自保存 query，sibling state 会分叉；如果把 query 放到整个 app 根部，又会让无关页面耦合。

**技术意义：**

最近公共父组件是共享事实的最小 owner。lifting state up 不是把 state 复制到父层，而是从 children 移除 local source state，在 parent 建立唯一 source，并通过 props 形成单向数据流。

**新关键字和新概念：**

`state owner`、closest common parent、lifting state up、controlled child、single source of truth。本节没有新 API，重点是状态归属和架构边界。

**五层边界：**

- JavaScript runtime 调用 child functions，并通过普通 function argument 传 props object。
- React framework 让 parent state update 触发 parent 与相关 descendants 的新 render。
- TypeScript 检查 `query` 与 `onQueryChange` prop contract。
- tooling 解析 TSX import/export 并检查未满足的 required props。
- architecture convention 决定 `SharedFilterOwner` 是最近 owner，而不是 `ProductFilterInput` 或全局 Context。

**底层机制：**

input event 调用 child 收到的 callback reference；该 reference 最终指向 parent setter。更新进入 parent state queue，parent 再 render 时给两个 children 传同一个 query snapshot。

**机制推演：**

Owner 的精确定义不是“页面上最外层 component”，而是 React 将 query Hook cell 关联到 `SharedFilterOwner` 在 render tree 中的 identity。初次 render 时，JavaScript 得到 query binding `''`、稳定的 `setQuery` function reference，并分别为两个 child 创建 props objects。`ProductFilterInput` 又创建 `onChange` closure；`ProductFilterResults` 创建 `visibleProducts` array。React 只保存 parent 的 query state，不保存 child 的 filtered array。

用户输入 `stand` 后，browser event object 进入 `onChange`。Child 从 event 读取 string，并调用 props 中的 `onQueryChange`；该值正是 parent 传下来的 setter。React 把新 string 放入 parent Hook queue，随后从 owner 开始形成新 render snapshot。Parent 用同一个新 query 创建两份 child props：input 的 `value` 与 results 的 filter 因而不会分叉。

把 owner 放在 input 内部会让 sibling results 没有同一 source；在 results 中再复制 query 则会产生两条 queue。反过来，把 query 放到 app 根 Context 会让无关路由也依赖这个页面级事实。SellerHub 的识别方法是列出所有 readers 与 writers：覆盖它们的最低共同 ancestor 是候选 owner，再检查该 state 的 lifetime 是否也与该 subtree 一致。

**API / 语法规则：**

本节复用 controlled input 的 `value`/`onChange` 与 callback prop。`onQueryChange` 是自定义 prop 名，不会自动变成 browser event；它只是 parent 传下来的 function value。

**固定属性名、方法名与签名：**

- DOM input 固定使用 `value` 和 `onChange` props。
- 自定义 callback 可命名为 `onQueryChange`，签名在此为 `(nextQuery: string) => void`。
- `.filter` 与 `.includes` 是 JavaScript methods。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/03-state-owner-lifting/shared-filter-owner.tsx</span></div>

```tsx
import { useState } from 'react'

const productNames = ['Desk lamp', 'Monitor stand', 'Mechanical keyboard']

type ProductFilterInputProps = {
  query: string
  onQueryChange: (nextQuery: string) => void
}

function ProductFilterInput({ query, onQueryChange }: ProductFilterInputProps) {
  return (
    <label>
      Product search
      <input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search products"
      />
    </label>
  )
}

function ProductFilterResults({ query }: { query: string }) {
  const visibleProducts = productNames.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase()),
  )

  return <p>{visibleProducts.join(', ') || 'No matching products'}</p>
}

export function SharedFilterOwner() {
  const [query, setQuery] = useState('')

  return (
    <article className="practice-card">
      <p className="practice-label">State owner</p>
      <h3>Lift shared state to the closest parent</h3>
      <ProductFilterInput query={query} onQueryChange={setQuery} />
      <ProductFilterResults query={query} />
    </article>
  )
}
```
</div>

**代码逐行解释：**

1. `ProductFilterInputProps` 公开受控 input 的 value/callback contract。
2. input 不保存 local query，只报告 `event.target.value`。
3. results 不保存 visible list，只从 query 派生。
4. `SharedFilterOwner` 保存唯一 query，并把同一 snapshot 传给两个 siblings。

**执行过程：**

用户键入 `stand`；browser 产生 input event，React handler 调用 `onQueryChange('stand')`。parent setter enqueue update，parent 下一次 render 向 input 与 results 传 `'stand'`，results 的 filter 只保留 Monitor stand。

**变量、引用与 snapshot 变化：**

event object 只存在于 handler 调用期间；next query string 进入 parent state。两个 child props objects 在新 render 中重新创建，但它们的 `query` value 相同。没有 Context；owner 边界由 component tree 直接表达。

**为什么得到这个结果：**

两个 siblings 都依赖共同 parent 的唯一 query，因此不会出现 input 显示 A、results 仍按 B 过滤的独立 snapshots。

**对比写法：**

在 input 与 results 各自 `useState('')` 会产生两个无法自动同步的 owners；把 query 放到 app-wide Context 又超出实际共享范围。

**常见错误违反的规则：**

owner 太低会复制 shared state；owner 太高会让无关 subtree 依赖同一 update boundary。

**如何识别类似错误：**

画出所有 readers 和 writers，找到包含它们的最低共同 ancestor。若只有一个 component 需要 state，不要提升；若 siblings 都需要，提升到最近公共 parent。

**与 SellerHub 的关系：**

`ProductListPage` 可以拥有 filter query，toolbar 写、product grid 读；不需要把页面局部 filter 提升到 Dashboard layout 或 Auth Context。

**与当前 React 学习主线的关系：**

本节把第 3 章的 props/callback props 与第 4 章的 state 合成可追踪的 parent-to-child value、child-to-parent intent 路径。

**本节最终记忆模型：**

共享 state 放在所有 readers/writers 的最近公共 parent；向下传值，向上传意图。

### 9.4 Callback props 与 dispatch intent

**本节解决的问题：**

Child 可以知道“用户选择了订单”，但不应该直接修改 parent 的 `selectedOrderId`。本节让 child 报告领域意图，由 owner 决定 state transition。

**技术意义：**

把 callback payload 命名为 intent，为后续 reducer action 建立同一思路：调用方描述发生了什么，owner 保留如何更新的权限。这样 child 不依赖 parent 的具体 state shape。

**新关键字和新概念：**

callback prop、intent object、event boundary、owner-controlled transition。本节没有新 API，重点是状态归属和架构边界。

**五层边界：**

- JavaScript runtime 创建 plain object，调用 `onIntent(intent)`，再用 `if` narrowing。
- React framework 处理 click handler 与 state update scheduling。
- TypeScript 根据 `intent.type` 缩小 union，确认 `orderId` 只存在于正确 member。
- tooling 检查缺失 payload 或错误 action literal。
- architecture convention 让 child 发送意图，而不是得到可 mutation 的 parent object。

**底层机制：**

每次 render，`OrderSelector` 收到一个 callback function reference。click 时 child 创建新的 action-like object；parent handler 同步读取 object，并根据 discriminant enqueue 对应 setter update。

**机制推演：**

Parent render 时，JavaScript 创建 `handleIntent` function，并把它放进 `OrderSelector` 的 props object。Child render 再创建两个 click closures。React 不理解 `order_selected` 的业务含义，也不会把 `SelectionIntent` 当作特殊事件；它只在 click 时调用 closure。Plain JavaScript object `{ type, orderId }` 先被创建，然后作为普通 argument 传给 parent callback。

Parent callback 在当前 render snapshot 中执行，读取 intent 并调用 setter。Setter 只登记 next selected id，当前 `selectedOrderId` binding 不会同步变化。下一次 render 才创建新 parent callback、新 child props object 与新 UI description。TypeScript 在源码阶段保证 `order_selected` 携带 `orderId`，但运行时 object 不带 union metadata。

具体 bug 通常出现在 child 收到 parent entity 后直接赋值：mutation 改了同一个 object，却没有经过 owner queue，React 可能没有新的 state reference 可用于下一次 render。SellerHub 的 row、toolbar 或 modal 若知道 parent 的多个 setters 和内部 shape，说明 callback contract 过度泄漏；应改成最小领域 intent。

**API / 语法规则：**

Custom component attribute `onIntent={handleIntent}` 只是 prop passing。它不要求 `on` 前缀，但按 event callback 约定使用 `on...` 更容易识别。

**固定属性名、方法名与签名：**

DOM button 的固定 prop 是 `onClick`；`onIntent` 是自定义名。签名为 `(intent: SelectionIntent) => void`。`type` 不是 React 强制字段，但作为 discriminated union 的共享 literal property 是稳定惯例。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/04-callback-dispatch-intent/callback-intent-boundary.tsx</span></div>

```tsx
import { useState } from 'react'

type SelectionIntent =
  | { type: 'order_selected'; orderId: string }
  | { type: 'selection_cleared' }

type OrderSelectorProps = {
  onIntent: (intent: SelectionIntent) => void
}

function OrderSelector({ onIntent }: OrderSelectorProps) {
  return (
    <div className="practice-stack">
      <button onClick={() => onIntent({ type: 'order_selected', orderId: 'ORD-204' })}>
        Select ORD-204
      </button>
      <button onClick={() => onIntent({ type: 'selection_cleared' })}>Clear</button>
    </div>
  )
}

export function CallbackIntentBoundary() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  function handleIntent(intent: SelectionIntent) {
    if (intent.type === 'order_selected') {
      setSelectedOrderId(intent.orderId)
      return
    }

    setSelectedOrderId(null)
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Callback intent</p>
      <h3>Children report what happened</h3>
      <OrderSelector onIntent={handleIntent} />
      <p>Selection: {selectedOrderId ?? 'none'}</p>
    </article>
  )
}
```
</div>

**代码逐行解释：**

1. union 为两种合法 intent 分别定义 payload。
2. child 只依赖 `onIntent` contract，不知道 setter 名称。
3. click 创建对应 object；clear action 不携带无意义 order id。
4. parent 按 `type` narrowing，决定 next state。

**执行过程：**

点击 Select 后，child 创建 `{ type: 'order_selected', orderId: 'ORD-204' }`。parent handler 进入第一分支，enqueue `'ORD-204'`。新 render 把 selection 文本更新为该 id。

**变量、引用与 snapshot 变化：**

每次点击产生新的 intent object reference。handler 读取的是当前点击 object；旧 `selectedOrderId` snapshot 在当前 handler 内不会被同步改写，新 string 在下一次 render 可见。

**为什么得到这个结果：**

Child 没有 parent state 的写权限，只能调用 callback；所有 transition 决策集中在 owner，所以更新路径单向、可定位。

**对比写法：**

把 parent object 传给 child 后执行 `selection.orderId = 'ORD-204'` 既 mutation props，也绕过 React setter，不会形成可靠 render update。

**常见错误违反的规则：**

Child mutation parent data 违反 props readonly 与 owner-controlled update；callback 直接暴露过多 setter 细节会让 child 与 state shape 耦合。

**如何识别类似错误：**

如果 child 代码必须知道“parent 有哪几个 setters”，尝试把 callback 改成业务意图；如果 props object 被赋值或 push，立即检查 mutation。

**与 SellerHub 的关系：**

Seller order row 应报告 `order_selected`，cart row 应报告 quantity change/remove intent；页面 owner 或 reducer 决定最终 state。

**与当前 React 学习主线的关系：**

这是从第 3 章 callback props 过渡到第 8 章 action/dispatch 的桥梁：接口从 value callback 逐步变成领域事件对象。

**本节最终记忆模型：**

Child 不改 owner state；child 报告发生了什么，owner 决定如何变。

### 9.5 Preserving state 与使用 `key` reset state

**本节解决的问题：**

切换 customer 时，checkout note 是应保留还是应清空？答案不由 variable name 决定，而由 React 如何识别 component 在 UI tree 中的 identity 决定。

**技术意义：**

理解 state 与 tree position 绑定，可以预测 conditional UI、tab、form draft 的 preserve/reset。`key` 不只用于 list；它也可以在同一 JSX position 明确声明“这是另一个 component identity”。

**新关键字和新概念：**

UI tree position、component type、state identity、preserve、reset、`key`。本节没有新 API，重点是状态归属和架构边界。

**五层边界：**

- JavaScript runtime 创建 JSX element objects 与 props values。
- React framework 按 tree position、element type 与 key 协调旧树和新树。
- TypeScript 检查 `customerId` prop 与 textarea event types。
- tooling 转换 JSX；它不决定 state identity。
- architecture convention 决定 customer change 是否应该代表新的 checkout draft identity。

**底层机制：**

当 `<CheckoutDraft>` 在同一 parent position、type 和 key 下再次出现时，React 复用其 hook state。`key` 从 `customer-a` 变为 `customer-b` 时，旧 fiber identity 不再匹配，旧 component unmount，新 component mount，`useState('')` 重新初始化。

**机制推演：**

React 保存 note state 的位置不在 `CheckoutDraft` function object 里，也不在 JSX element object 里；它保存在 React 内部，并与“parent 下的这个 position + component type + key”关联。初次 render 时 JavaScript 创建 `{ customerId: 'customer-a' }` props object、textarea change closure 与 JSX element description；React 在对应 child identity 上找到或初始化 note Hook cell。

点击 Customer B 时，parent handler 把 `'customer-b'` 加入 parent Hook queue。下一次 parent render 创建 `<CheckoutDraft key="customer-b" ...>`。Reconciliation 比较旧 identity `CheckoutDraft/customer-a` 与新 identity `CheckoutDraft/customer-b`，判定不是同一个 child：旧 child 被移除，其 note Hook cell 一起丢弃；新 child mount，再执行 `useState('')`。这不是 setter 主动把 note 写成空字符串，而是旧 state owner 不再存在。

`key` 由 React 消费，不进入 child props；`customerId` 才进入新的 props object。TypeScript 只能检查 key/prop 的可赋值类型，不会判断 key 是否稳定、是否真的代表领域 identity。SellerHub 中切换订单后 editor draft 意外保留，应先检查 position/type/key；若使用 `Math.random()`，每次 parent render 都会变成新 identity，用户每输入一个字符都可能被 reset。

**API / 语法规则：**

`key` 是 React special prop，不会出现在 `CheckoutDraftProps`。若 component 本身需要 customer id，必须另外传 `customerId={customerId}`。

**固定属性名、方法名与签名：**

特殊属性名固定为 `key`。它接受 string/number identity；在 siblings 中应稳定且唯一。`key` 不是全局唯一 id，也不能在 child 中读取为 `props.key`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/05-preserving-resetting-state/keyed-checkout-draft.tsx</span></div>

```tsx
import { useState } from 'react'

type CheckoutDraftProps = {
  customerId: string
}

function CheckoutDraft({ customerId }: CheckoutDraftProps) {
  const [note, setNote] = useState('')

  return (
    <label>
      Note for {customerId}
      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Delivery note"
      />
    </label>
  )
}

export function KeyedCheckoutDraft() {
  const [customerId, setCustomerId] = useState('customer-a')

  return (
    <article className="practice-card">
      <p className="practice-label">State identity</p>
      <h3>Reset a draft with an explicit key</h3>
      <div className="practice-stack">
        <button onClick={() => setCustomerId('customer-a')}>Customer A</button>
        <button onClick={() => setCustomerId('customer-b')}>Customer B</button>
      </div>
      <CheckoutDraft key={customerId} customerId={customerId} />
    </article>
  )
}
```
</div>

**代码逐行解释：**

1. Child owns a local note draft because only that draft edits it.
2. Parent owns customer identity because it chooses which draft is active.
3. Both `key` and `customerId` receive the same domain id for different jobs.
4. Key changes reset hook state; customerId prop renders the label.

**执行过程：**

在 Customer A 输入 note 后，note state 属于 key `customer-a` 的 child。点击 Customer B 使 parent render key `customer-b`；React removes old child identity，mounts a new child，note initializes to empty string。

**变量、引用与 snapshot 变化：**

Parent customer id snapshot changes. Old child note snapshot is discarded on unmount; new child gets a new hook state cell. `key` is consumed by React reconciliation and never appears in the child props object.

**为什么得到这个结果：**

React state is associated with a position in the rendered tree, refined by type and key. Changing key tells React this position now represents a different identity.

**对比写法：**

如果没有 `key`，只改变 `customerId` 会保留同一位置上的 `CheckoutDraft` state。只有当 note 应跟随 component、而不是跟随 customer 时，这才是正确行为。

**常见错误违反的规则：**

假设 unmounted component 的 state 仍会保留，违反 state 绑定 tree identity 的规则；使用 array index 或 random key 会让 identity 不稳定，导致意外保留或反复 reset。

**如何识别类似错误：**

当 form state 意外保留或消失时，先检查 JSX position、element type、conditional branches 与 `key`，不要先添加 effect 或成组 reset setters。

**与 SellerHub 的关系：**

CheckoutPage can key a draft by checkout session or customer; SellerOrdersPage can key an editor by order id when switching orders must discard local edits.

**与当前 React 学习主线的关系：**

本节把第 5 章 list `key` 的 sibling matching 扩展为完整的 state identity 模型。

**本节最终记忆模型：**

State 属于 tree identity，而不是 JSX variable；当领域 identity 变化应重置时，改变 `key`。

### 9.6 `useReducer` 心智模型

**本节解决的问题：**

当多个 event handlers 都在修改同一 complex state 时，transition rules 会散落在 component 中。`useReducer` 将“event occurred”与“next state calculation”分离。

**技术意义：**

Reducer 不是 `useState` 的高级替代品。它适合 action kinds 增多、state fields 关联、需要集中审查 transition 的场景；简单独立 state 继续用 `useState` 更直接。

**新关键字和新概念：**

`useReducer`、reducer、action、dispatch、current state、next state、render snapshot。

**五层边界：**

- JavaScript runtime 调用 pure reducer function，执行 `switch` 并创建 next object。
- React framework 保存 reducer state、提供 dispatch、排队 action 并触发 render。
- TypeScript 检查 reducer parameter/return type 与 dispatch action shape。
- tooling 通过 eslint/react-hooks 检查 Hook call position。
- architecture convention 决定何时 transition complexity 足以采用 reducer。

**底层机制：**

调用 `dispatch(action)` 不会同步改写当前 lexical `cart`。React 将 action 加入 update queue；处理 update 时调用 `cartReducer(currentState, action)`，保存返回值作为 next state，并用新 snapshot 再次调用 component。

**机制推演：**

React 为 `CartReducerTransition` 保存一个 reducer Hook cell，其中包含 committed state 与待处理 update queue；React 还返回 identity 稳定的 dispatch function。JavaScript 在每次 render 中创建 `cart` binding、buttons 的 click closures 与 JSX objects。`cartReducer` 本身只是普通 function；React 赋予它 reducer contract，是因为它被传给 `useReducer`。

点击 Add 时，closure 创建 `{ type: 'item_added' }` plain object 并调用 dispatch。Dispatch 将 action 记录到该 Hook queue，并请求 render；它不直接调用 DOM，也不把当前 `cart` object 改成新值。React 处理 queue 时，以 queue 起点 state 依次调用 reducer，因此连续 actions 会以前一个 reducer result 作为下一个 action 的 current state。完成后，component 重新执行，新的 `cart` binding 才指向 next state object。

这解释了两个常见误判：第一，dispatch 后立刻记录 `cart.quantity` 仍得到旧 snapshot，不是 action 丢失；第二，reducer 中执行 request/timer 会把副作用放进 React 可能重复调用的计算路径。开发 Strict Mode 可能额外调用 reducer/initializer 来暴露 impurity，其中一次结果被忽略，所以 pure reducer 必须允许相同输入重复计算。TypeScript 检查 action/state shapes，但不管理 queue，也不保证外部 runtime action 合法。

**API / 语法规则：**

完整签名是 `const [state, dispatch] = useReducer(reducer, initialArg, init?)`。Reducer 形状为 `(state, action) => nextState`。`dispatch(action)` 没有返回 next state。

**固定属性名、方法名与签名：**

API 名固定为 `useReducer`；tuple 中变量名可自定义，但 `state`/`dispatch` 是标准语义名。Action 的 `type` 是约定而非 React 强制字段；reducer 必须为每个 action 返回合法 state。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/06-reducer-mental-model/cart-reducer-transition.tsx</span></div>

```tsx
import { useReducer } from 'react'

type CartState = {
  quantity: number
}

type CartAction =
  | { type: 'item_added' }
  | { type: 'item_removed' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'item_added':
      return { quantity: state.quantity + 1 }
    case 'item_removed':
      return { quantity: Math.max(0, state.quantity - 1) }
  }
}

export function CartReducerTransition() {
  const [cart, dispatch] = useReducer(cartReducer, { quantity: 1 })

  return (
    <article className="practice-card">
      <p className="practice-label">Reducer model</p>
      <h3>Describe transitions with actions</h3>
      <div className="practice-stack">
        <button onClick={() => dispatch({ type: 'item_removed' })}>Remove one</button>
        <button onClick={() => dispatch({ type: 'item_added' })}>Add one</button>
      </div>
      <p>Quantity: {cart.quantity}</p>
    </article>
  )
}
```
</div>

**代码逐行解释：**

1. `CartState` defines the stored shape; `CartAction` defines legal events.
2. Reducer reads current state and one action, then returns a new object.
3. `Math.max` enforces the quantity invariant in the transition boundary.
4. Component dispatches semantic actions and renders the current cart snapshot.

**执行过程：**

当 quantity 为 1 时，点击 Add 创建 `{ type: 'item_added' }`。React 把当前 `{ quantity: 1 }` 与 action 传给 reducer；reducer 返回 `{ quantity: 2 }`，React 保存它并 render 2。

**变量、引用与 snapshot 变化：**

Action 是新 object。Reducer 参数 `state` 指向当前 reducer state object，返回的 state 是新 reference。即使已经 dispatch，click handler 中该次 render 的 `cart.quantity` 仍为 1；下一次 render 才读取 2。

**为什么得到这个结果：**

Dispatch 请求 transition；reducer 从 queue 中的 current state 计算结果。Next snapshot 何时可见由 React 管理，不由 handler 同步改写。

**对比写法：**

对于一个独立 boolean，`useState(false)` 更简单。只有 explicit action semantics 与集中 transition rules 能降低复杂度时，`useReducer` 才提供额外价值。

**常见错误违反的规则：**

Reading state immediately after dispatch as if it changed synchronously violates snapshot semantics. Using reducer for every trivial field violates the goal of keeping architecture proportional.

**如何识别类似错误：**

Choose reducer when many handlers repeat related update rules or when action history is easier to reason about than setter sequences. Do not choose it merely because a project is “large.”

**与 SellerHub 的关系：**

Cart quantity/remove/clear 与多步骤 checkout transitions 适合 named actions；local modal open flag 通常不需要 reducer。

**与当前 React 学习主线的关系：**

Reducer 继续遵守第 4 章 snapshot 与 batching 规则；变化的只是 transition 从零散 setters 改为集中 action processing。

**本节最终记忆模型：**

Dispatch 描述发生了什么；reducer 把 current state 与 action 映射为 next state；下一次 render 才展示结果。

### 9.7 Pure reducer 与 immutable transition

**本节解决的问题：**

Reducer 会在 render/update 计算路径中执行。如果它 mutation 旧 state、写 storage、启动 timer 或发 request，相同输入就可能得到不稳定结果，旧 snapshot 也会被污染。

**技术意义：**

Pure reducer 让每个 transition 可单独推理：只读取参数，只返回 next state，不影响外部系统。Immutable update 保留旧 references，使 React 和开发者都能区分前后 snapshots。

**新关键字和新概念：**

pure function、immutable transition、referential identity、side effect boundary。本节没有新 API，重点是状态归属和架构边界。

**五层边界：**

- JavaScript 允许 object mutation，但 `map` 与 spread 可创建新 array/object references。
- React 要求 reducer 纯；开发 Strict Mode 可能额外调用 reducer 以暴露 accidental impurity。
- TypeScript 检查 shapes，但默认不会证明函数纯，也不会阻止所有 mutation。
- tooling 可报告部分 mutation/style 问题，却不能代替架构审查。
- architecture convention 把 request、timer、storage 等工作留在 event/effect boundary，不放进 reducer。

**底层机制：**

`map` 创建新 array；未命中的 item 复用旧 object，命中的 item 用 spread 创建新 object。这样只有实际变化路径获得新 reference，旧 state graph 保持不变。

**机制推演：**

React 的 reducer Hook cell 保存 products array reference。Checkbox change 时，JavaScript 创建 action object；React queue 处理 action 时调用 reducer。`map` 创建新 array，predicate 逐个读取旧 product objects：目标 object 通过 spread 产生新 reference，其他 objects 保持 structural sharing。Reducer 返回后，React 可把 next array 作为下一份 state snapshot，而旧 render 的 closures 仍安全地引用旧 array graph。

如果执行 `product.selected = !product.selected`，JavaScript 确实会立即改写旧 object；这正是 bug 的根源，因为 previous snapshot、日志或尚未执行的 closure 也会看到被篡改后的 property。返回同一个 array 还可能让 React 通过 `Object.is` 判断 state 没有变化。Immutable update 不是为了“迎合 TypeScript”，而是保护 snapshot 隔离和 reference-based change detection。

TypeScript 能检查 `selected` 是 boolean，却不能从普通 mutable type 证明 reducer pure。ESLint 也只能捕捉部分模式。SellerHub 审查 cart/admin reducer 时，应搜索 parameter property assignment、`push`、`splice`、外部变量写入与 browser API；这些都是 reducer 越过 pure calculation boundary 的证据。

**API / 语法规则：**

Reducer 只能根据 `state` 与 `action` 计算返回值。`Array.prototype.map` 返回新 array；object spread 是 JavaScript syntax。不得在 reducer 中调用 setter、`fetch`、`localStorage.setItem` 或 mutation parameter。

**固定属性名、方法名与签名：**

`map(callback)` 是固定 JavaScript method；`checked`/`onChange` 是 checkbox 的 React props。Reducer 签名保持 `(products: Product[], action: ProductAction): Product[]`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/07-pure-reducer-immutability/pure-reducer-immutability.tsx</span></div>

```tsx
import { useReducer } from 'react'

type Product = {
  id: string
  name: string
  selected: boolean
}

type ProductAction = {
  type: 'selection_toggled'
  productId: string
}

function productReducer(products: Product[], action: ProductAction): Product[] {
  return products.map((product) =>
    product.id === action.productId
      ? { ...product, selected: !product.selected }
      : product,
  )
}

const initialProducts: Product[] = [
  { id: 'sku-201', name: 'Packing tape', selected: false },
  { id: 'sku-202', name: 'Shipping labels', selected: true },
]

export function PureReducerImmutability() {
  const [products, dispatch] = useReducer(productReducer, initialProducts)

  return (
    <article className="practice-card">
      <p className="practice-label">Pure reducer</p>
      <h3>Return new references without effects</h3>
      <div className="practice-list">
        {products.map((product) => (
          <label key={product.id}>
            <input
              type="checkbox"
              checked={product.selected}
              onChange={() =>
                dispatch({ type: 'selection_toggled', productId: product.id })
              }
            />
            {product.name}
          </label>
        ))}
      </div>
    </article>
  )
}
```
</div>

**代码逐行解释：**

1. Reducer 接收 array state 与带 product id 的 action。
2. `map` 遍历旧 array，不执行 `products[index] = ...`。
3. 目标 product 用 spread 复制并翻转 selected；其他 object reference 可安全复用。
4. Checkbox 从 current state 读取 `checked`，change 时只 dispatch intent。

**执行过程：**

点击 Packing tape checkbox 后，dispatch action。Reducer 遍历两个 products，为 `sku-201` 创建新 object，为 `sku-202` 复用旧 object，返回新 array。下一次 render 读取新 selected value。

**变量、引用与 snapshot 变化：**

旧 array、旧 Packing tape object 与旧 snapshot 都不变。Next state 有新 array reference 和新 Packing tape object reference；Shipping labels reference 不变。Action object 只描述目标 id。

**为什么得到这个结果：**

React 接收到 reducer 返回的新 state graph，下一次 render 从新 graph 读取 checkbox value；旧 graph 仍能准确代表 previous snapshot。

**对比写法：**

`products.find(...).selected = true; return products` 会修改旧 object 并返回同一 array reference，破坏 snapshot 隔离，也可能让更新不被正确观察。

**常见错误违反的规则：**

Reducer mutation 违反 pure transition；reducer 中 request/timer/storage 违反 render/update calculation 不执行副作用的边界。

**如何识别类似错误：**

审查 reducer 中的 assignment、`.push`、`.splice`、外部变量写入、browser API 和 async call。Reducer 应几乎只包含 branch、calculation、spread、map/filter 与 return。

**与 SellerHub 的关系：**

AdminProductsPage 的 selection state、cart item updates 都应返回新 references；analytics、storage persistence 或 API mutation 放在 reducer 外部。

**与当前 React 学习主线的关系：**

本节把第 4 章 object/array immutable update 变成 reducer 的硬约束，并承接第 7 章 side effect boundary。

**本节最终记忆模型：**

Reducer 是无副作用的 transition calculator：不改旧 state，只返回 next state。

### 9.8 Typed action union 与 exhaustiveness check

**本节解决的问题：**

如果 action 只是 `{ type: string; payload?: unknown }`，TypeScript 无法知道哪个 type 必须携带哪个 payload，也无法在新增 action 后提醒 reducer 补分支。

**技术意义：**

Discriminated union 把每种 action 的 type 和 payload 绑定。Switch narrowing 让每个 case 只访问合法字段，`never` default 让遗漏 member 变成 compile-time error。

**新关键字和新概念：**

discriminated union、literal type、narrowing、exhaustiveness、`never`。本节没有新 API，重点是状态归属和架构边界。

**五层边界：**

- JavaScript runtime 只看到普通 object、string 与 switch；没有 union type。
- React framework 只把 action 交给 reducer，不理解业务 union。
- TypeScript 根据共享 `type` property narrowing，并用 `never` 检查遗漏。
- tooling 在编辑器/`tsc` 阶段报告 invalid action 和 non-exhaustive switch。
- architecture convention 选择描述业务事件的 action names 与最小 payload。

**底层机制：**

进入 `case 'review_started'` 后，TypeScript 排除其他 union member，因此 action 必有 `orderId`。若 union 新增 member 而 switch 未处理，default 中的 action 不再是 `never`，传给 `assertNever` 会报错。

**机制推演：**

TypeScript 在 compile time 读取 `ReviewAction` 的两个 object members，并把共享 `type` property 当作 discriminant。源码进入 `review_started` case 后，control-flow analysis 将 action 缩小为带 `orderId` 的 member；进入 `review_closed` 时则知道该字段不存在。若两种 member 都已排除，default 中理论上只剩 `never`。

Emit 后 union、`ReviewState`、parameter annotation 和 `never` 全部消失。Browser runtime 只执行普通 JavaScript `switch`，action 仍是 plain object。因此 typed `dispatch` 能阻止项目源码写出缺 payload 的 call，却不能阻止被 `as ReviewAction` 强制断言的值、反序列化 JSON 或未验证的第三方数据进入 reducer。`assertNever` 的 throw 是 runtime fallback，不是 runtime schema validation。

Dispatch start action 时，React queue 保存的是 object value；处理 queue 时 reducer 返回新的关联 state，下一次 render 才读取它。若把 action 写成 `{ type: string; orderId?: string }`，TypeScript 无法把某个 type 与 required payload 绑定，reducer 中就会出现 `!`、cast 或 undefined branch。SellerHub 中 action payload 到处 optional，是 union 建模失效的直接识别信号。

**API / 语法规则：**

Union 用 `|` 组合 object types；所有 members 共享 literal discriminant。`never` 表示正常类型分析下不应存在的值，不会在浏览器中自动验证外部 object。

**固定属性名、方法名与签名：**

`type` 是常见 discriminant 名但并非 TypeScript 强制；`assertNever(value: never): never` 是本地 helper，不是内置 API。每个 action literal 必须严格满足对应 member。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/08-typed-action-union/typed-action-union.tsx</span></div>

```tsx
import { useReducer } from 'react'

type ReviewState = {
  selectedOrderId: string | null
  status: 'idle' | 'reviewing'
}

type ReviewAction =
  | { type: 'review_started'; orderId: string }
  | { type: 'review_closed' }

function assertNever(value: never): never {
  throw new Error(`Unhandled action: ${JSON.stringify(value)}`)
}

function reviewReducer(_state: ReviewState, action: ReviewAction): ReviewState {
  switch (action.type) {
    case 'review_started':
      return { selectedOrderId: action.orderId, status: 'reviewing' }
    case 'review_closed':
      return { selectedOrderId: null, status: 'idle' }
    default:
      return assertNever(action)
  }
}

export function TypedActionUnion() {
  const [review, dispatch] = useReducer(reviewReducer, {
    selectedOrderId: null,
    status: 'idle',
  })

  return (
    <article className="practice-card">
      <p className="practice-label">Action union</p>
      <h3>Narrow payloads by action type</h3>
      <div className="practice-stack">
        <button onClick={() => dispatch({ type: 'review_started', orderId: 'ORD-411' })}>
          Review order
        </button>
        <button onClick={() => dispatch({ type: 'review_closed' })}>Close review</button>
      </div>
      <p>
        {review.status}: {review.selectedOrderId ?? 'no order'}
      </p>
    </article>
  )
}
```
</div>

**代码逐行解释：**

1. `ReviewAction` 把 start payload 与 close no-payload 分开。
2. `assertNever` 同时提供 compile-time exhaustiveness 与意外 runtime input 的错误。
3. Switch case narrowing 后，只有 start branch 读取 `action.orderId`。
4. Dispatch call sites 必须构造完整 member。

**执行过程：**

点击 Review order 创建合法 start action。Reducer 返回关联一致的 `{ selectedOrderId: 'ORD-411', status: 'reviewing' }`。Close action 返回两个字段同时复位的 state，避免 contradictory shape。

**变量、引用与 snapshot 变化：**

每次 dispatch 创建新 action object；reducer 返回新 state object。TypeScript union 在 emit 后消失，runtime 只保留 `type` 与 payload properties。当前 render 的 review snapshot 不会被 dispatch 原地改写。

**为什么得到这个结果：**

Type narrowing 确保 transition 代码只使用该 action member 的 payload；reducer 又一次性返回互相关联的 next fields。

**对比写法：**

`dispatch({ type: 'review_started' })` 缺少 `orderId` 会在 compile time 报错；但从 JSON 解析出的未知 object 不会因 type annotation 自动获得 runtime validation。

**常见错误违反的规则：**

把 `type` 声明成普通 `string` 会丢失 discriminant；用大量 optional payload fields 会允许无效组合；以为 TypeScript 会验证网络数据则混淆 compile time 与 runtime。

**如何识别类似错误：**

查看 reducer case 是否需要 `as` cast 或 non-null assertion 才能访问 payload。若需要，action union 通常没有正确绑定 type 与 payload。

**与 SellerHub 的关系：**

Cart actions、checkout step actions 与 seller order selection actions 都适合 typed union；API response 仍需要未来单独的 runtime validation boundary。

**与当前 React 学习主线的关系：**

本节深化前几章的 TypeScript 边界：类型帮助写对 reducer，但不参与 React runtime transition。

**本节最终记忆模型：**

每个 action member 表达一个合法事件；discriminant 决定 payload，`never` 检查分支完整性。

### 9.9 Context provider 与 consumer boundary

**本节解决的问题：**

深层 component 需要 store region，但中间 layout components 不使用它。逐层透传 props 会让中间层承担无关 contract；Context 提供有范围的跨层读取。

**技术意义：**

Context 解决 data delivery，不自动决定 state shape、owner 或 transition。Provider 应尽量靠近真实 consumers；普通 props 仍是显式、局部协作的默认工具。

**新关键字和新概念：**

`createContext`、`useContext`、provider value、nearest provider、consumer、default value、provider boundary。

**五层边界：**

- JavaScript runtime 创建 context object 与普通 string value。
- React framework 根据 component tree 查找最近 provider，并让读取 value 的 consumers 响应变化。
- TypeScript 建模 `string | null`，custom hook runtime guard 去掉 null branch。
- tooling 检查 Hook 顶层调用与 provider value type。
- architecture convention 决定 region 是否值得跨层提供，以及 provider scope 多大。

**底层机制：**

`useContext(StoreRegionContext)` 不按 import location 查找，而按调用 component 在 rendered tree 中向上寻找最近 matching provider。Provider value 从 North America 变为 European Union 后，读取该 Context 的 descendant 会使用新 value render。

**机制推演：**

Module 初始化时，JavaScript 只创建一次 `StoreRegionContext` object；provider 与 consumer 必须引用同一个 object identity。`ContextProviderBoundary` render 时，React 保存 region Hook cell，JavaScript 创建当前 region binding、button closure 和 provider element。`DeepShippingNotice` 调用 custom hook，custom hook 再调用 `useContext`；React 从这个 consumer 在当前 render tree 中向上查找最近的 `StoreRegionContext` value。

点击 Change region 后，setter 把 next string 放入 owner queue。新 render 的 provider 收到不同 primitive value，React 用 `Object.is` 比较前后 value；读取该 Context 的 descendants 会获得新 value 并重新 render。Provider 必须位于 consumer 之上；在同一个 component 的 return 中“包住自己”不能影响该 component 已经执行的 `useContext` call。

`createContext<string | null>(null)` 的 union 只存在于类型系统。Runtime guard 才真正处理 provider 缺失；没有 guard 时 runtime 仍可能拿到 null。若 provider 每次 render 都创建 `{ region }` object，即使 region string 未变，object reference 也不同，Context 会把它视为新 value。SellerHub 看到 Context value 包含许多页面局部字段时，应分别追踪哪些 consumers 真正读取它们，避免把 Context 当无边界 global store。

**API / 语法规则：**

`createContext(defaultValue)` 在没有 matching provider 时返回 default。React 19 可用 `<StoreRegionContext value={region}>` 提供 value。`useContext(SomeContext)` 必须在 component/custom hook 顶层调用。

**固定属性名、方法名与签名：**

- API 名固定为 `createContext` 与 `useContext`。
- Provider prop 固定为 `value`。
- `createContext<string | null>(null)` 明确默认边界。
- `useStoreRegion` 名以 `use` 开头，使 Rules of Hooks 可识别。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/09-context-boundary/context-provider-boundary.tsx</span></div>

```tsx
import { createContext, useContext, useState } from 'react'

const StoreRegionContext = createContext<string | null>(null)

function useStoreRegion() {
  const region = useContext(StoreRegionContext)

  if (region === null) {
    throw new Error('useStoreRegion must be used within StoreRegionContext')
  }

  return region
}

function DeepShippingNotice() {
  const region = useStoreRegion()

  return <p>Shipping rules: {region}</p>
}

export function ContextProviderBoundary() {
  const [region, setRegion] = useState('North America')

  return (
    <article className="practice-card">
      <p className="practice-label">Context boundary</p>
      <h3>Provide data to deep descendants</h3>
      <button
        onClick={() =>
          setRegion((current) =>
            current === 'North America' ? 'European Union' : 'North America',
          )
        }
      >
        Change region
      </button>
      <StoreRegionContext value={region}>
        <section>
          <DeepShippingNotice />
        </section>
      </StoreRegionContext>
    </article>
  )
}
```
</div>

**代码逐行解释：**

1. Context type 如实包含 provider 缺失时的 `null`。
2. Custom hook 调用 `useContext` 并执行 runtime guard。
3. Deep consumer 不需要 region prop chain。
4. Owner 仍是 `ContextProviderBoundary` 的 `useState`；Context 只交付该 value。
5. React 19 provider 使用 Context object 本身加 `value` prop。

**执行过程：**

初次 render 的 provider value 为 North America，consumer 读取它。点击后 owner state update，provider 在下一次 render 获得 European Union，React 重新 render 读取该 Context 的 descendant。

**变量、引用与 snapshot 变化：**

Region string snapshot 改变；provider value 从一个 primitive value 变为另一个。Context object 本身是 module-level stable reference。Consumer 读取 nearest provider 的 current render value，而不是全局 variable。

**为什么得到这个结果：**

Consumer 订阅的是特定 Context 的 provider value。Value 变化时 React 能找到读取者；不读取该 Context 的 component 不因“Context 是全局变量”自动获得 value。

**对比写法：**

把所有页面 state 放进一个 `{ region, cart, modal, filter }` context object 会扩大 consumer coupling；对一两层 component，显式 props 通常更清楚。

**常见错误违反的规则：**

在 provider 外调用 hook 会得到 null；把 Context 当任意 mutable singleton 会丢失 React update model；每次 render 随意创建巨大 value object 会改变 reference 并扩大 consumer updates。

**如何识别类似错误：**

先数透传层级和 consumers。如果中间层确实只转交值且 consumer 跨多层，再考虑 Context；若 value 只服务局部 child，保持 props。

**与 SellerHub 的关系：**

Authenticated user、store region 或 cart owner 可有受控 provider boundary；Dashboard 内单个 modal open state 不应自动进入 app-wide Context。

**与当前 React 学习主线的关系：**

Context 不替代第 3 章 props，也不替代本章 owner/reducer；它只改变数据跨层到达 consumer 的方式。

**本节最终记忆模型：**

Context 是 tree-scoped delivery channel：consumer 读取最近 provider，owner 与 transition 仍需单独设计。

### 9.10 Reducer 与 Context 组合

**本节解决的问题：**

Reducer 集中 transition，但深层 component 若仍需逐层接收 `state` 和 `dispatch`，delivery 会变得冗长。本节组合 reducer owner 与两个 Context，同时保持 transition 和 delivery 的职责分离。

**技术意义：**

State Context 与 Dispatch Context 分开后，只发送 action 的 component 不必读取 state value。这个模式适合明确 subtree 内的复杂共享 state，不代表应把整个 app 合并成一个 reducer/context。

**新关键字和新概念：**

state context、dispatch context、provider component、reducer owner、deep dispatch。本节没有新 API，重点是状态归属和架构边界。

**五层边界：**

- JavaScript runtime 执行 reducer、创建 state/action objects 并调用 dispatch function。
- React framework 在 provider 中拥有 reducer state，并按最近 provider 解析两个 Context。
- TypeScript 用 `Dispatch<SelectionAction>` 表达 dispatch contract，用 `ReactNode` 表达 children。
- tooling 检查 provider values 与 consumer types。
- architecture convention 决定拆分两个 Context，以及 provider 只包住 order selection subtree。

**底层机制：**

`SelectionProvider` 是 state owner。它把同一个 reducer tuple 拆成两个 delivery channels：state channel 交给 readers，dispatch channel 交给 writers。Deep child dispatch action 后，owner reducer 计算 next state，provider value 更新，state consumer 再 render。

**机制推演：**

`SelectionProvider` render 时，React 的 reducer Hook cell 返回 current state object 与稳定 dispatch function。JavaScript 随后创建两个 provider elements：外层 state Context 的 value 是当前 state reference，内层 dispatch Context 的 value 是 dispatch reference。`children` 不是被复制的数据；它是 React node value，被放在这两个 provider boundaries 之下。

`DeepOrderControls` 执行时，两次 `useContext` 分别向上匹配两个 Context objects。点击 Select 创建 action object，dispatch 把它放入 provider 的 reducer queue；React 调用 reducer得到新 state object。下一次 provider render 中，state Context value reference 改变，state consumers 读取新 selection；dispatch identity 保持稳定，因此 dispatch Context 本身没有 value change。

拆成两个 Context 只隔离 Context value change 的订阅原因，不承诺 child 永远不因普通 parent render 而执行；是否需要 `memo` 属于有实际性能证据后的另一层问题。本章的核心收益是 contract 分离：只写的 child 不必获得 state object，只读的 child 不必获得 transition 细节。TypeScript 检查 `Dispatch<SelectionAction>`，运行时仍只有普通 function。SellerHub 若把 cart、auth、filter、modal 全塞进同一 provider，任何 state object change 都会扩大耦合范围。

**API / 语法规则：**

本节组合 `useReducer`、`createContext`、`useContext`。`Dispatch<A>` 是 React TypeScript type，描述接收一个 action 且不返回业务结果的 function。

**固定属性名、方法名与签名：**

- Provider 固定 prop 为 `value`。
- Reducer 签名为 `(state: SelectionState, action: SelectionAction) => SelectionState`。
- Dispatch type 为 `Dispatch<SelectionAction>`。
- `children` 是 React composition 惯用 prop，类型为 `ReactNode`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/10-reducer-context/reducer-context-boundary.tsx</span></div>

```tsx
import { createContext, useContext, useReducer } from 'react'
import type { Dispatch, ReactNode } from 'react'

type SelectionState = {
  orderId: string | null
}

type SelectionAction =
  | { type: 'order_selected'; orderId: string }
  | { type: 'selection_cleared' }

const SelectionStateContext = createContext<SelectionState | null>(null)
const SelectionDispatchContext = createContext<Dispatch<SelectionAction> | null>(null)

function selectionReducer(
  _state: SelectionState,
  action: SelectionAction,
): SelectionState {
  switch (action.type) {
    case 'order_selected':
      return { orderId: action.orderId }
    case 'selection_cleared':
      return { orderId: null }
  }
}

function SelectionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(selectionReducer, { orderId: null })

  return (
    <SelectionStateContext value={state}>
      <SelectionDispatchContext value={dispatch}>{children}</SelectionDispatchContext>
    </SelectionStateContext>
  )
}

function DeepOrderControls() {
  const state = useContext(SelectionStateContext)
  const dispatch = useContext(SelectionDispatchContext)

  if (state === null || dispatch === null) {
    throw new Error('DeepOrderControls must be used within SelectionProvider')
  }

  return (
    <div>
      <div className="practice-stack">
        <button onClick={() => dispatch({ type: 'order_selected', orderId: 'ORD-508' })}>
          Select ORD-508
        </button>
        <button onClick={() => dispatch({ type: 'selection_cleared' })}>Clear</button>
      </div>
      <p>Selected: {state.orderId ?? 'none'}</p>
    </div>
  )
}

export function ReducerContextBoundary() {
  return (
    <article className="practice-card">
      <p className="practice-label">Reducer with context</p>
      <h3>Separate transition logic from delivery</h3>
      <SelectionProvider>
        <DeepOrderControls />
      </SelectionProvider>
    </article>
  )
}
```
</div>

**代码逐行解释：**

1. 两个 Context 分别精确建模 state 与 dispatch nullable defaults。
2. Reducer 只负责 selection transition。
3. Provider 是唯一 owner，并把 tuple 两端分别提供给 subtree。
4. Deep controls 读取两个 channels，先执行 missing-provider guard。
5. Root component 决定 provider scope，只包含需要共享 selection 的 subtree。

**执行过程：**

Deep button dispatches `order_selected`。Action 到达 provider 的 reducer；reducer 返回 `{ orderId: 'ORD-508' }`。State provider value 成为新 object，读取 state Context 的 controls 用新 snapshot render。

**变量、引用与 snapshot 变化：**

Dispatch function identity 由 React 保持稳定；state object reference 每次有效 transition 都改变。Action object 是一次性 intent。Provider children prop 表示 subtree，不是 state copy。

**为什么得到这个结果：**

Reducer 决定 next state，Context 决定 state/dispatch 如何跨层到达 descendants；两个机制按各自职责组合，没有互相替代。

**对比写法：**

单一 `{ state, dispatch }` value object 也可工作，但每次 state render 都会创建/改变组合 value。拆分 Context 让只依赖 dispatch 的 consumers 不必读取 state channel；是否值得取决于实际 subtree。

**常见错误违反的规则：**

Provider 包住整个 app 会把局部 selection 变成全局耦合；在 context module 外直接 mutation state 绕过 reducer；省略 guard 会让 null error 延迟到深处。

**如何识别类似错误：**

画出 provider 边界与 consumers。如果无关页面也能读取/dispatch 某个局部 domain state，provider 很可能过高；如果 transition 仍散落在 consumers，reducer ownership 仍不清楚。

**与 SellerHub 的关系：**

Cart subtree 或 checkout stepper 可采用 reducer + Context；SellerOrdersPage 的 row、detail、bulk actions 也可共享 selection owner。局部 hover、accordion state 仍留在 component。

**与当前 React 学习主线的关系：**

本节把 9.6 transition 与 9.9 delivery 组合，但继续遵守第 3 章 props 边界和第 4 章 snapshot 规则。

**本节最终记忆模型：**

Reducer 管“怎么变”，Context 管“怎么到达”；Provider 是明确 owner，不是全局变量。

### 9.11 Custom hook 提取 stateful logic

**本节解决的问题：**

多个 component 可能重复相同的 state + handlers 组合。复制代码会让 contract 漂移，但把所有 state 提升或放进 Context 又会错误地共享数据。

**技术意义：**

Custom hook 复用的是 hook composition 和返回 contract。它让 component 关注 UI，同时保留每个调用位置自己的 state ownership。

**新关键字和新概念：**

custom hook、stateful logic、hook composition、return contract、Rules of Hooks。本节没有新 API，重点是状态归属和架构边界。

**五层边界：**

- JavaScript runtime 调用普通 function 并创建 return object/functions。
- React framework 识别其中的 Hook calls，并按 caller component 的调用顺序保存 state。
- TypeScript 推断 `{ isOpen, open, close }` 的 return type，也可显式声明。
- tooling 依赖 `use` 命名识别 Hooks rules，并由 eslint 检查调用位置。
- architecture convention 决定提取稳定复用逻辑，而不是为了隐藏每一行 state code。

**底层机制：**

调用 `useDisclosure()` 会在当前 component 的 hook list 中执行 `useState`。`open` 与 `close` closures 捕获 setter，不共享 module variable。Custom hook 自己没有独立于 caller 的 component instance。

**机制推演：**

React 不会像 render component 那样单独 mount `useDisclosure`。`CustomHookExtraction` function 执行到 `useDisclosure()` 时，JavaScript 进入这个普通 function；其中的 `useState` call 仍登记在 caller component 当前的 Hook call sequence 上。Custom hook 返回后，JavaScript 得到新的 `{ isOpen, open, close }` object；这个 return object 和两个 closures 都属于本次 render。

点击 Open 时，button 调用本次 render 的 `open` closure。Closure 调用稳定 setter，把 true 加入 caller 的 Hook queue。下一次 render 再次调用 custom hook，`useState` 从同一 Hook position 取得 true，然后创建新的 return object 和 closures。旧 return object 不会被 React“更新”，只是旧 snapshot 的普通 JavaScript value。

TypeScript 可推断 return object 中 boolean 与 function signatures，也可以用显式 return type 固定公共 contract；这些类型在 runtime 消失。命名以 `use` 开头不是让函数获得共享能力，而是向 React tooling 声明它会调用 Hooks。若在 condition 中调用，某次 render 会跳过 Hook slot，后续 state 与 call position 无法稳定对应。SellerHub 只有在多个 components 重复同一 state transition contract 时才提取 hook；真正共享 data 仍需要共同 owner 或 Context。

**API / 语法规则：**

Custom hook 名必须以 `use` 开头，并只能在 React function component 或另一个 custom hook 顶层调用。它可以返回 object、tuple 或单值；返回 shape 是本地 API 设计。

**固定属性名、方法名与签名：**

固定约定是 `use...` 名称与顶层调用。`initialOpen`、`isOpen`、`open`、`close` 是本地 contract，可根据领域命名。示例签名由 TypeScript 推断为 `(initialOpen?: boolean) => { isOpen: boolean; open: () => void; close: () => void }`。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/11-custom-hook-extraction/custom-hook-extraction.tsx</span></div>

```tsx
import { useState } from 'react'

function useDisclosure(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen)

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }
}

export function CustomHookExtraction() {
  const productDetails = useDisclosure()

  return (
    <article className="practice-card">
      <p className="practice-label">Custom hook</p>
      <h3>Reuse a stateful contract</h3>
      <div className="practice-stack">
        <button onClick={productDetails.open}>Open details</button>
        <button onClick={productDetails.close}>Close details</button>
      </div>
      <p>{productDetails.isOpen ? 'Details are open' : 'Details are closed'}</p>
    </article>
  )
}
```
</div>

**代码逐行解释：**

1. `useDisclosure` 以 `use` 开头并在顶层调用 `useState`。
2. Return object 公开 read value 和两个 intent methods，不泄漏 setter 名称。
3. Component 每次 render 调用 hook，React 通过稳定顺序找回同一 state cell。
4. Buttons 调用 return contract，UI 读取 current `isOpen` snapshot。

**执行过程：**

点击 Open 调用 closure，setter enqueue true。React 再 render component，并再次执行 `useDisclosure`；这次 `useState` 返回 true，paragraph 显示 Details are open。

**变量、引用与 snapshot 变化：**

每次 render 返回新的 object 和 handler function references，但 hook state cell 由 React 保留。旧 `isOpen` boolean binding 不变，新 render 获得 true。这里没有 Context，因此 state 没有跨 component 共享。

**为什么得到这个结果：**

Custom hook 只是复用调用 Hooks 的 JavaScript function；实际 state identity 仍属于调用它的 component instance 与 hook position。

**对比写法：**

把 `let isOpen = false` 放在 module scope 会变成 React 外部的共享 mutable variable，既不会可靠触发 render，也会跨 instances 泄漏。

**常见错误违反的规则：**

不以 `use` 开头会让工具无法可靠识别 hook semantics；在 condition/loop/event handler 中调用会破坏稳定 hook order；把 custom hook 当共享 store 会误解 ownership。

**如何识别类似错误：**

如果函数内部调用 Hook，它必须命名 `use...`，并检查所有调用点是否位于 component/custom hook 顶层。若真正需要共享同一 state，应寻找共同 owner 或 Context，而不是只提取 hook。

**与 SellerHub 的关系：**

可提取 `useOrderSelection`、`useCheckoutStepper` 或 `useDisclosure` 复用局部逻辑；auth/cart 的共享来自 provider owner，不来自两个 components 恰好调用同名 hook。

**与当前 React 学习主线的关系：**

本节把前面 state/reducer/context 机制封装成可复用 contract，同时继续遵守所有 Hooks rules 与 snapshot semantics。

**本节最终记忆模型：**

Custom hook 共享逻辑，不共享 state；state 仍属于每个调用位置。

### 9.12 相同 custom hook 的独立 state

**本节解决的问题：**

两个 components 调用同一个 custom hook，是否会自动读取同一份 quantity？本节用两个 controls 证明：复用函数定义不等于共享 hook state。

**技术意义：**

区分 logic reuse 与 state sharing，可以避免把 custom hook 误当 Redux/Context store。需要共享时必须显式选择共同 owner 或 provider；需要独立时，custom hook 天然保持实例隔离。

**新关键字和新概念：**

independent hook state、component instance、call position、logic reuse versus data sharing。本节没有新 API，重点是状态归属和架构边界。

**五层边界：**

- JavaScript runtime 对每个 `QuantityControl` 调用相同 function definition。
- React framework 为每个 component instance 的 hook position 保存独立 state cell。
- TypeScript 检查 `initialQuantity` 与 return values 的 number/function types。
- tooling 检查 `useQuantity` 调用位于 component 顶层。
- architecture convention 决定 Cart A/B 应独立，还是应由共同 cart owner 共享。

**底层机制：**

Rendered tree 中有两个 `QuantityControl` identities。每个 identity 的第一个 Hook slot 都调用 `useQuantity` 内的 `useState`，但 state cells 分属不同 component instances，因此点击 A 不会更新 B。

**机制推演：**

JavaScript 中只有一个 `useQuantity` function definition，但 React tree 中有两个 `QuantityControl` component identities。Render A 时，`useQuantity(0)` 的 `useState` 连接到 A 的第一个 Hook cell；render B 时，相同源码 call 连接到 B 的第一个 Hook cell。两次调用还分别创建 return objects 与 `increase` closures，它们捕获各自 cell 对应的 setter。

点击 Cart A 时，A closure 把 updater 放入 A 的 state queue。React 处理后只改变 A 的 quantity source state；B 的 queue 为空，所以 B 的 snapshot 仍为 0。TypeScript 看到两个调用具有相同 return type，却没有“这两个值共享 identity”的类型语义；共享与否由 React tree owner 决定。

对比之下，如果 custom hook 内部调用 `useContext(CartStateContext)`，不同 callers 可以读到同一个 provider value；共享来源是 provider，不是 custom hook。SellerHub 的 Header badge 与 CartPage 数量若不一致，应检查它们是否各自调用了 local `useState` hook；只有都读取同一 cart owner，数据才会同步。

**API / 语法规则：**

本节复用 `useState` 与 custom hook rules。Custom hook function definition 可以共享；每次调用产生的 React hook state 按 caller identity 隔离。

**固定属性名、方法名与签名：**

`useQuantity(initialQuantity: number)` 返回 `{ quantity: number; increase: () => void }`。`label` 是 required custom prop。没有“shared”固定选项；共享必须由 owner/Context 另行建立。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/12-independent-hook-state/independent-hook-state.tsx</span></div>

```tsx
import { useState } from 'react'

function useQuantity(initialQuantity: number) {
  const [quantity, setQuantity] = useState(initialQuantity)

  return {
    quantity,
    increase: () => setQuantity((current) => current + 1),
  }
}

function QuantityControl({ label }: { label: string }) {
  const control = useQuantity(0)

  return (
    <button onClick={control.increase}>
      {label}: {control.quantity}
    </button>
  )
}

export function IndependentHookState() {
  return (
    <article className="practice-card">
      <p className="practice-label">Hook call identity</p>
      <h3>Each hook call owns independent state</h3>
      <div className="practice-stack">
        <QuantityControl label="Cart A" />
        <QuantityControl label="Cart B" />
      </div>
    </article>
  )
}
```
</div>

**代码逐行解释：**

1. `useQuantity` 封装 number state 与 functional updater。
2. 每个 `QuantityControl` 在自身顶层调用一次 hook。
3. Parent render 两个同 type siblings；各自 component identity 拥有独立 hook list。
4. 两个 buttons 复用相同逻辑 contract，但读取各自 quantity。

**执行过程：**

初次两者都为 0。点击 Cart A 时，A instance 的 updater enqueue 1；React 再 render A，A 读取 1。B 的 state cell 未收到 update，仍读取 0。

**变量、引用与 snapshot 变化：**

A 的 quantity snapshot 从 0 到 1；B 的 snapshot/reference path 不变。两个 controls 的 return objects 和 callbacks 各自创建；它们不通过 Context 或共同 owner 连接。

**为什么得到这个结果：**

React 关联 state 的依据是 component tree identity 与 Hook call position，不是 custom hook function 的源码地址。

**对比写法：**

若两个 controls 应同步显示同一 cart quantity，应把 state 提升到共同 parent 或从同一 Cart Context 读取；重复调用 local custom hook 不会同步。

**常见错误违反的规则：**

把“共享 hook implementation”误认为“共享 data source”混淆 logic reuse 与 state ownership。

**如何识别类似错误：**

问清每次 hook call 的 owner。若 DevTools 中是不同 component instances，且没有共同 provider/source，它们就是独立 state。

**与 SellerHub 的关系：**

两个独立 product-card disclosure 可调用同一 hook；Header cart badge 与 CartPage 若需同一 cart state，则必须读取同一 provider owner。

**与当前 React 学习主线的关系：**

本节将 custom hook 与本章最初的 owner 问题闭环：抽取代码不会改变 state ownership。

**本节最终记忆模型：**

相同 hook 代码可以运行多次；每个 caller identity 获得自己的 state，除非显式读取共同 source。

### 9.13 SellerHub 状态架构映射

**本节解决的问题：**

学习单个 API 后，容易把 reducer、Context 或 lifting state 机械地应用到所有页面。本节按真实页面范围选择 source state、owner、derived data 与 delivery boundary。

**技术意义：**

架构质量取决于 ownership 与 scope，而不是 Hook 数量。页面局部 filter、跨 row selection、checkout workflow 与 auth user 的共享范围不同，应该采用不同 owner。

**新关键字和新概念：**

page owner、layout owner、domain provider、local UI state、shared workflow state。本节没有新 API，重点是状态归属和架构边界。

**五层边界：**

- JavaScript runtime 负责计算 visible products、totals 和 transition functions。
- React framework 保存 chosen owners 的 state，并按 tree/provider 传播 updates。
- TypeScript 建模 domain state/action/context contracts。
- tooling 验证模块与 types，但不会替代 owner decision。
- architecture convention 根据 readers、writers、lifetime 与 reset identity 选择范围。

**底层机制：**

每个场景先列出 source facts，再列出 derived values、所有 readers/writers、需要保留的生命周期和 reset identity。最近能覆盖这些需求的 component/provider 成为 owner；复杂 transition 才进入 reducer，跨多层 delivery 才进入 Context。

**机制推演：**

把 SellerHub 状态设计拆成可验证的 worksheet，而不是先选择 Hook：

| 场景 | Source state 与 owner | JavaScript 每次 render 派生 | 写入路径 | Delivery / reset boundary |
| --- | --- | --- | --- | --- |
| `CartPage` | `items` 由 `CartStateProvider` 拥有 | `totalCount`、`subtotal` | Row dispatch typed cart action | 深层 readers 用 Context；cart session 决定 lifetime |
| `ProductListPage` | query/category 由页面 owner 保存 | `visibleProducts` array | Filter callback props | 页面内 props；离开页面是否 reset 由 tree identity 决定 |
| `CheckoutPage` | step 与 validated draft 由 checkout owner 保存 | 当前 step label、completion state | Form/step children dispatch intent | Provider 只包 checkout；new session key reset local draft |
| `SellerOrdersPage` | selected order id(s) 由 table/detail 最近公共 owner 保存 | selected order object、bulk count | Row callback 或 reducer action | 不提升到整个 dashboard |
| Auth user | 已验证的 current user 由 layout 上方 owner 保存 | permissions/view labels | 登录/登出边界更新 | 多页面 consumers 才使用 Auth Context |
| Local modal | open/close 由 modal trigger 最近 owner 保存 | button label | Local callback | 不进入 app-wide Context |

具体 update 发生时仍遵守同一链条：browser event 进入 handler，JavaScript 创建 callback payload 或 action object，React owner queue 保存 update，下一次 render 创建新 snapshot，derived values 重算，props objects 或 Context values 再把当前事实交给 readers。Custom hook 可以把这条读写逻辑包装成 contract，但不会改变 owner。

TypeScript 可以让 cart action、checkout status 与 context value 在源码中保持一致，却不会验证 API 回来的 user/cart JSON。若某个字段既出现在 reducer state、Context value object、child local state 又出现在 derived cache 中，说明 source boundary 很可能重复。SellerHub 中的识别顺序应固定为：列 readers/writers → 确定 lifetime/reset identity → 选择 owner → 设计 intent → 最后决定 props、Context 或 custom hook。

**API / 语法规则：**

本节不引入 API。规则顺序是：先最小 state，再 owner，再 update contract，再决定 reducer，最后才判断 Context/custom hook。

**固定属性名、方法名与签名：**

没有 React 强制的 `CartPageState` 或 `AuthContext` 名称。固定的是 Hook rules、provider `value`、reducer/dispatch contract；领域命名应准确描述事实与事件。

**示例代码：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: SellerHub owner map</span></div>

```ts
type StateBoundary = {
  owner: string
  sourceState: string[]
  derivedData: string[]
  delivery: 'props' | 'context'
}

const cartBoundary: StateBoundary = {
  owner: 'CartStateProvider',
  sourceState: ['items', 'quantity'],
  derivedData: ['totalCount', 'subtotal'],
  delivery: 'context',
}
```
</div>

这是概念模型，不是本章要创建的真实文件。它强制先写 ownership facts，再选 delivery mechanism。

**代码逐行解释：**

1. `owner` 记录唯一 source owner。
2. `sourceState` 只列必须保留的事实。
3. `derivedData` 明确不能复制进 state 的计算结果。
4. `delivery` 是最后的传递选择，不等同于 storage。

**执行过程：**

在 CartPage 设计时，先确认 items/quantity 需要跨 components 保留，再从其 render snapshot 计算 count/subtotal；当 Header、rows、summary 跨多层读取时，Cart provider 才提供 value/dispatch。

**变量、引用与 snapshot 变化：**

Cart item transition 创建新 state references；subtotal/count 只是新 render bindings。Filter query 可由 ProductListPage owner 保存；visible products 是 derived array。Checkout session key 变化时 local draft state reset。

**为什么得到这个结果：**

不同 state 的 readers、writers 与 lifetime 不同。把它们全部放进一个 Context 会把独立更新绑定在一起；按 domain boundary 分开能保持可预测 scope。

**对比写法：**

不要创建 `GlobalAppContext` 同时保存 auth、cart、filters、modals、hover 与 form drafts。也不要为跨多个 siblings 的 cart 各自复制 local state。

**常见错误违反的规则：**

Owner 过低导致 duplicate state，过高导致无关 coupling；所有复杂性都交给 Context 混淆 storage、transition 与 delivery；所有 local state 都进入 reducer 增加 ceremony。

**如何识别类似错误：**

为每个 state 回答四问：谁读、谁写、保留多久、何时 reset。无法回答时，不应先选 Context 或 reducer。

**与 SellerHub 的关系：**

- `CartPage`：items/quantity 为 source；subtotal/count 为 derived；cart subtree 或跨页需求决定 provider scope。
- `CheckoutPage`：step 与 validated draft fields 可由 page reducer owner 管理；session key 可 reset local subform。
- `ProductListPage`：filter state 留在页面；visible products 在 render 派生。
- `SellerOrdersPage`：selected order ids 放在覆盖 table/detail/bulk actions 的最近 owner。
- `AdminProductsPage`：audit selection 只提升到 audit workspace，不进入全局 app。
- Auth user：若 layout 与多页面都读，可设受控 Auth provider，但外部数据验证不由 TypeScript 自动完成。
- Dashboard local UI：accordion、hover、single modal open state 留在最近 component。

**与当前 React 学习主线的关系：**

本节汇总第 3–8 章：props 定 contract，state 保存事实，lists/key 定 identity，forms 建受控输入，effects 只同步外部系统，本章组织 owner/transition/delivery/reuse。

**本节最终记忆模型：**

先画事实和边界，再选 Hook：minimal source、closest owner、explicit intent、pure transition、narrow provider、honest custom hook。

## 10. API / 语法索引

| API / 语法 | 核心签名 | 运行时职责 | TypeScript 职责 |
| --- | --- | --- | --- |
| `useState` | `useState(initialState)` | 保存简单 source state | 推断或约束 state/setter 类型 |
| `useReducer` | `useReducer(reducer, initialArg, init?)` | 保存 reducer state、排队 action | 推断 state、action、dispatch contract |
| reducer | `(state, action) => nextState` | 纯计算 next state | 检查参数与返回 shape |
| `dispatch` | `dispatch(action)` | 请求一次 reducer update | 只允许 action union member |
| `createContext` | `createContext(defaultValue)` | 创建 Context identity 与 default | 约束 provider/consumer value type |
| React 19 provider | `<SomeContext value={value}>` | 向 descendants 提供 value | 检查 `value` 类型 |
| `useContext` | `useContext(SomeContext)` | 读取最近 provider value | 返回 Context 声明的 value type |
| custom hook | `function useSomething(...)` | 组合 Hooks，复用 stateful logic | 推断 parameter/return contract |
| `key` | `<Component key={identity} />` | 参与 tree reconciliation 与 state identity | 检查可接受 key 类型 |
| discriminated union | `{ type: 'a' } | { type: 'b'; value: T }` | Emit 后是普通 objects | Narrow payload，检查 action completeness |
| `never` exhaustiveness | `assertNever(value: never)` | 意外输入时可 throw | 新 union member 未处理时产生 error |

**React 19 Context 语法说明：**

当前项目使用 React 19.2，因此文档与源码采用 `<SomeContext value={...}>`。旧资料常见 `<SomeContext.Provider value={...}>` 仍解释同一 provider 概念，但不是本章的现代默认写法。

## 11. 常见错误表

| 错误 | 违反的规则 | 可见症状 | 识别与修正 |
| --- | --- | --- | --- |
| 把 subtotal 保存成 state | derived data 不应复制 source | quantity 与 subtotal 不一致 | 删除 subtotal state，在 render 中 `reduce` |
| 同时保存 id 与完整 entity 副本 | 一个事实一个 source | entity 更新后 selection 过期 | 保存 id，从 canonical collection 派生 object |
| 多个互斥 booleans | state shape 可表达 contradiction | 两个状态同时 true | 用 literal union/status object |
| Child mutation parent data | props readonly、owner 更新 | UI 不更新或旧 snapshot 被污染 | callback/dispatch intent |
| Owner 太低 | shared readers 没有共同 source | siblings 各自显示不同值 | 提升到最近公共 parent |
| Owner 太高 | provider/update scope 过大 | 无关组件依赖页面局部 state | owner 下移到最小共同边界 |
| 以为 unmount 后 state 保留 | state 绑定 tree identity | 返回页面后 draft 消失 | 明确是否要提升/persist；不要假设保留 |
| 不理解 `key` | key 参与 identity | draft 意外保留或不断 reset | 使用 stable domain key，检查 position/type |
| Reducer mutation state | reducer 必须 pure/immutable | snapshot 污染、更新异常 | map/filter/spread 返回新 references |
| Reducer 执行 effect | reducer 只计算 next state | Strict Mode 重复请求/timer | 移到 event/effect boundary |
| Action `type: string` | 失去 discriminated union | payload 需要 cast，遗漏 case | literal union + `never` check |
| Context 当 global variable | Context 是 tree-scoped delivery | owner 不清、测试与复用困难 | 定义 provider scope 与 owner |
| 每次创建巨大 context value | consumer boundary 未审查 | value 变化扩大 re-render | 拆职责/拆 Context，先测再优化 |
| Custom hook 不以 `use` 开头 | tooling 无法识别 Hooks rules | lint 漏检或命名误导 | 改为 `use...` |
| 条件/循环调用 Hook | hook order 必须稳定 | state 对位错误、lint error | 所有 Hooks 放顶层 |
| 以为同 hook 自动共享 state | logic reuse 不等于 state sharing | 两个 controls 不同步 | 共同 owner 或 Context |
| 以为 TypeScript 验证 runtime data | types emit 后擦除 | 外部非法 action/data 进入 runtime | 在外部边界做 runtime validation（后续主题） |

## 12. 最终小项目

最终小项目只用于整合本章机制，不替代 9.x 分节教学。

### 12.1 项目名称与目标

最终小项目是 **Cart State Workspace**。它不是完整 SellerHub，而是一个静态前端状态工作区，用最少领域数据演示：

- `CartStateProvider` 是明确的 cart state owner。
- Reducer 保存 minimal source state：cart items、unit price、quantity。
- `totalCount` 与 `subtotal` 每次 render 派生，不存第二份 state。
- Child rows dispatch typed actions，不直接 mutation cart。
- 两个 typed Context 分别交付 state 与 dispatch。
- `useCartState` / `useCartDispatch` 封装 consumer guard。
- Checkout draft 维持 local state，并通过 session `key` 明确 reset。
- Reducer 内没有 request、storage、timer 或其他副作用。

### 12.2 最终小项目结构

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Cart State Workspace file structure</span></div>

```txt
src/learning/react/chapter-08-state-architecture/cart-state-workspace/
  cart-state-model.ts
  cart-state-reducer.ts
  cart-state-context.ts
  cart-state-provider.tsx
  use-cart-state.ts
  cart-item-row.tsx
  cart-summary.tsx
  checkout-draft.tsx
  cart-state-workspace.tsx
  cart-state-workspace.css
```
</div>

| 文件 | 职责 |
| --- | --- |
| `cart-state-model.ts` | 定义 source state、action union 与初始 state factory |
| `cart-state-reducer.ts` | 纯 transition、immutable update、exhaustiveness check |
| `cart-state-context.ts` | 定义 typed state/dispatch Context identities |
| `cart-state-provider.tsx` | 创建 reducer owner 并提供两个 values |
| `use-cart-state.ts` | 封装 Context 读取与 missing-provider runtime guard |
| `cart-item-row.tsx` | 展示 item，并从 child dispatch quantity/remove actions |
| `cart-summary.tsx` | 从 source state 派生 count/subtotal，并 dispatch clear/reset |
| `checkout-draft.tsx` | 展示独立 local draft 与 Context read |
| `cart-state-workspace.tsx` | 组合 provider、list、summary 与 keyed draft |
| `cart-state-workspace.css` | 最终项目局部布局与状态样式 |

### 12.3 完整代码

**State 与 action model：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-model.ts</span></div>

```ts
export type CartItem = {
  id: string
  name: string
  unitPrice: number
  quantity: number
}

export type CartState = {
  items: CartItem[]
}

export type CartAction =
  | { type: 'quantity_changed'; itemId: string; nextQuantity: number }
  | { type: 'item_removed'; itemId: string }
  | { type: 'cart_cleared' }
  | { type: 'cart_reset' }

export function createInitialCartState(): CartState {
  return {
    items: [
      { id: 'sku-keyboard', name: 'Mechanical keyboard', unitPrice: 89, quantity: 1 },
      { id: 'sku-mouse', name: 'Wireless mouse', unitPrice: 45, quantity: 2 },
      { id: 'sku-stand', name: 'Monitor stand', unitPrice: 64, quantity: 1 },
    ],
  }
}
```
</div>

逐行看：`CartState` 只保存 item source facts；`CartAction` 用 literal union 绑定 payload；factory 每次 reset 可返回新的 state graph。TypeScript 在 compile time 检查这些 shapes，browser runtime 不会保留 type declarations。

**Pure reducer：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-reducer.ts</span></div>

```ts
import type { CartAction, CartState } from './cart-state-model'
import { createInitialCartState } from './cart-state-model'

function assertNever(action: never): never {
  throw new Error(`Unhandled cart action: ${JSON.stringify(action)}`)
}

export function cartStateReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'quantity_changed':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.itemId
            ? { ...item, quantity: Math.max(1, action.nextQuantity) }
            : item,
        ),
      }
    case 'item_removed':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.itemId),
      }
    case 'cart_cleared':
      return { ...state, items: [] }
    case 'cart_reset':
      return createInitialCartState()
    default:
      return assertNever(action)
  }
}
```
</div>

逐行看：每个 case 都返回 next state；quantity branch 用 `map` 与 spread，remove branch 用 `filter`，clear/reset 返回新 graph。Reducer 不写 storage、不请求 API、不启动 timer。`assertNever` 让 action union 扩展时必须同步更新 switch。

**Typed Context identities：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-context.ts</span></div>

```ts
import { createContext } from 'react'
import type { Dispatch } from 'react'
import type { CartAction, CartState } from './cart-state-model'

export const CartStateContext = createContext<CartState | null>(null)
export const CartDispatchContext = createContext<Dispatch<CartAction> | null>(null)
```
</div>

这里不创建 state，只创建两条 typed delivery channels。`null` 如实表示“没有 matching provider”；custom hook 稍后负责 runtime guard。

**Reducer owner 与 provider：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-provider.tsx</span></div>

```tsx
import { useReducer } from 'react'
import type { ReactNode } from 'react'
import { CartDispatchContext, CartStateContext } from './cart-state-context'
import { createInitialCartState } from './cart-state-model'
import { cartStateReducer } from './cart-state-reducer'

type CartStateProviderProps = {
  children: ReactNode
}

export function CartStateProvider({ children }: CartStateProviderProps) {
  const [state, dispatch] = useReducer(
    cartStateReducer,
    undefined,
    createInitialCartState,
  )

  return (
    <CartStateContext value={state}>
      <CartDispatchContext value={dispatch}>{children}</CartDispatchContext>
    </CartStateContext>
  )
}
```
</div>

`CartStateProvider` 是唯一 cart owner。第三个 `init` argument 让 initial state factory 在初始化时执行；React 19 Context syntax 用 `value` 提供 tuple 的两部分。

**Custom Context hooks：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/cart-state-workspace/use-cart-state.ts</span></div>

```ts
import { useContext } from 'react'
import { CartDispatchContext, CartStateContext } from './cart-state-context'

export function useCartState() {
  const state = useContext(CartStateContext)

  if (state === null) {
    throw new Error('useCartState must be used within CartStateProvider')
  }

  return state
}

export function useCartDispatch() {
  const dispatch = useContext(CartDispatchContext)

  if (dispatch === null) {
    throw new Error('useCartDispatch must be used within CartStateProvider')
  }

  return dispatch
}
```
</div>

两个 hooks 复用 consumer lookup 与 guard。它们共享同一 provider value，是因为都读取 provider，不是因为 custom hook 名称自动共享 state。

**Child dispatch：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-item-row.tsx</span></div>

```tsx
import type { CartItem } from './cart-state-model'
import { useCartDispatch } from './use-cart-state'

type CartItemRowProps = {
  item: CartItem
}

export function CartItemRow({ item }: CartItemRowProps) {
  const dispatch = useCartDispatch()

  return (
    <article className="cart-item-row">
      <div>
        <h3>{item.name}</h3>
        <p>${item.unitPrice.toFixed(2)} each</p>
      </div>
      <div className="quantity-controls" aria-label={`Quantity for ${item.name}`}>
        <button
          type="button"
          onClick={() =>
            dispatch({
              type: 'quantity_changed',
              itemId: item.id,
              nextQuantity: item.quantity - 1,
            })
          }
          disabled={item.quantity === 1}
        >
          -
        </button>
        <output>{item.quantity}</output>
        <button
          type="button"
          onClick={() =>
            dispatch({
              type: 'quantity_changed',
              itemId: item.id,
              nextQuantity: item.quantity + 1,
            })
          }
        >
          +
        </button>
      </div>
      <button
        className="text-button"
        type="button"
        onClick={() => dispatch({ type: 'item_removed', itemId: item.id })}
      >
        Remove
      </button>
    </article>
  )
}
```
</div>

Row 通过 props 读取当前 item snapshot，通过 Context hook 取得 dispatch。它只能构造合法 action，不能直接修改 item；quantity invariant 同时由 disabled UI 与 reducer clamp 防守。

**Derived summary：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-summary.tsx</span></div>

```tsx
import { useCartDispatch, useCartState } from './use-cart-state'

export function CartSummary() {
  const { items } = useCartState()
  const dispatch = useCartDispatch()
  const totalCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  )

  return (
    <aside className="cart-summary" aria-labelledby="cart-summary-title">
      <p className="project-eyebrow">Derived during render</p>
      <h3 id="cart-summary-title">Cart summary</h3>
      <dl>
        <div>
          <dt>Total items</dt>
          <dd>{totalCount}</dd>
        </div>
        <div>
          <dt>Subtotal</dt>
          <dd>${subtotal.toFixed(2)}</dd>
        </div>
      </dl>
      <div className="summary-actions">
        <button type="button" onClick={() => dispatch({ type: 'cart_cleared' })}>
          Clear cart
        </button>
        <button type="button" onClick={() => dispatch({ type: 'cart_reset' })}>
          Restore sample cart
        </button>
      </div>
    </aside>
  )
}
```
</div>

`totalCount` 与 `subtotal` 是 render-local variables。任何 item transition 后，它们由新 items snapshot 重算；没有 total setters，也不存在第二份 source of truth。

**Keyed checkout draft：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/cart-state-workspace/checkout-draft.tsx</span></div>

```tsx
import { useState } from 'react'
import { useCartState } from './use-cart-state'

type CheckoutDraftProps = {
  sessionId: number
}

export function CheckoutDraft({ sessionId }: CheckoutDraftProps) {
  const [deliveryNote, setDeliveryNote] = useState('')
  const { items } = useCartState()

  return (
    <section className="checkout-draft" aria-labelledby="checkout-draft-title">
      <div>
        <p className="project-eyebrow">Keyed local state</p>
        <h3 id="checkout-draft-title">Checkout draft #{sessionId}</h3>
      </div>
      <label>
        Delivery note
        <textarea
          value={deliveryNote}
          onChange={(event) => setDeliveryNote(event.target.value)}
          placeholder="Add delivery instructions"
        />
      </label>
      <p>{items.length} product lines are available to this checkout draft.</p>
    </section>
  )
}
```
</div>

Delivery note 只服务一个 draft，因此由 child local state 保存；cart items 来自共享 provider。两种 owner 可以在同一 component 中被读取，但不能混为一份 state。

**Workspace composition：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-workspace.tsx</span></div>

```tsx
import { useState } from 'react'
import { CartItemRow } from './cart-item-row'
import { CartStateProvider } from './cart-state-provider'
import { CartSummary } from './cart-summary'
import { CheckoutDraft } from './checkout-draft'
import { useCartState } from './use-cart-state'
import './cart-state-workspace.css'

function CartWorkspaceContent() {
  const { items } = useCartState()
  const [checkoutSessionId, setCheckoutSessionId] = useState(1)

  return (
    <section className="cart-workspace" aria-labelledby="cart-workspace-title">
      <header className="cart-workspace-header">
        <div>
          <p className="project-eyebrow">Final mini project</p>
          <h2 id="cart-workspace-title">Cart State Workspace</h2>
          <p>
            One reducer owns source state while descendants read and dispatch through typed
            context hooks.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCheckoutSessionId((current) => current + 1)}
        >
          Reset checkout draft
        </button>
      </header>

      <div className="cart-workspace-grid">
        <div className="cart-item-list">
          {items.length > 0 ? (
            items.map((item) => <CartItemRow key={item.id} item={item} />)
          ) : (
            <p className="empty-cart-message">The sample cart is empty.</p>
          )}
        </div>
        <CartSummary />
      </div>

      <CheckoutDraft key={checkoutSessionId} sessionId={checkoutSessionId} />
    </section>
  )
}

export function CartStateWorkspace() {
  return (
    <CartStateProvider>
      <CartWorkspaceContent />
    </CartStateProvider>
  )
}
```
</div>

Provider 必须在 `CartWorkspaceContent` 外部，因为 content 自身调用 Context hook。`checkoutSessionId` 不属于 cart reducer；它只决定 local draft identity。点击 reset 增加 id，`key` 变化使旧 draft unmount、新 draft mount。

**项目样式：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-08-state-architecture/cart-state-workspace/cart-state-workspace.css</span></div>

```css
.cart-workspace {
  margin-top: 64px;
  padding: 30px;
  border: 1px solid #b8c7c2;
  border-radius: 8px;
  background: #ffffff;
}

.cart-workspace-header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #d8e1de;
}

.cart-workspace-header h2 {
  margin: 8px 0;
  color: #182230;
  font-size: 2rem;
}

.cart-workspace-header p:last-child {
  max-width: 680px;
  margin: 0;
  color: #5f6c7b;
  line-height: 1.6;
}

.cart-workspace button {
  padding: 9px 12px;
  color: #ffffff;
  border: 1px solid #0b6b58;
  border-radius: 7px;
  background: #0b6b58;
  font-weight: 800;
  cursor: pointer;
}

.cart-workspace button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.cart-workspace-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(260px, 0.8fr);
  gap: 22px;
  padding: 24px 0;
}

.cart-item-list {
  display: grid;
  gap: 12px;
}

.cart-item-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 18px;
  padding: 18px;
  border: 1px solid #d8e1de;
  border-radius: 8px;
}

.cart-item-row h3,
.cart-item-row p {
  margin: 0;
}

.cart-item-row p {
  margin-top: 5px;
  color: #667085;
}

.quantity-controls {
  display: grid;
  grid-template-columns: 36px 36px 36px;
  align-items: center;
  text-align: center;
}

.quantity-controls button {
  padding: 7px;
}

.quantity-controls output {
  font-weight: 850;
}

.cart-workspace .text-button {
  color: #a33a2b;
  border-color: transparent;
  background: transparent;
}

.cart-summary,
.checkout-draft {
  padding: 22px;
  border: 1px solid #b8c7c2;
  border-radius: 8px;
  background: #f6f9f8;
}

.cart-summary h3,
.checkout-draft h3 {
  margin: 8px 0 18px;
  color: #182230;
}

.cart-summary dl {
  display: grid;
  gap: 12px;
  margin: 0 0 20px;
}

.cart-summary dl div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.cart-summary dd {
  margin: 0;
  font-weight: 850;
}

.summary-actions {
  display: grid;
  gap: 8px;
}

.checkout-draft {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  align-items: start;
  gap: 24px;
}

.checkout-draft label {
  display: grid;
  gap: 7px;
  color: #344054;
  font-weight: 750;
}

.checkout-draft textarea {
  min-height: 86px;
  padding: 10px;
  color: #182230;
  border: 1px solid #94a3b8;
  border-radius: 7px;
  resize: vertical;
}

.checkout-draft > p,
.empty-cart-message {
  margin: 0;
  color: #667085;
  line-height: 1.55;
}

.empty-cart-message {
  padding: 32px;
  border: 1px dashed #94a3b8;
  border-radius: 8px;
  text-align: center;
}

@media (max-width: 800px) {
  .cart-workspace-header,
  .checkout-draft {
    grid-template-columns: 1fr;
    flex-direction: column;
  }

  .cart-workspace-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .cart-workspace {
    padding: 20px;
  }

  .cart-item-row {
    grid-template-columns: 1fr;
  }
}
```
</div>

CSS 只负责 presentation，不参与 state ownership、Context lookup 或 reducer transition。Responsive rules 保持窄屏布局不重叠。

### 12.4 完整执行过程

1. `CartStateWorkspace` mount `CartStateProvider`，provider 初始化 reducer state。
2. Content、rows、summary、draft 通过 custom hooks 读取最近 provider。
3. Row click 创建 typed action；dispatch 把 action 送到 provider owner。
4. Pure reducer 读取 current reducer state，返回 immutable next state。
5. React 产生新 render snapshot；rows 读取 next items，summary 重算 count/subtotal。
6. 点击 Reset checkout draft 只更新 session id；key 变化重建 draft local state，不重建 cart provider state。

### 12.5 机制边界与错误识别

- **React runtime：** 保存 reducer/local state、处理 dispatch、Context lookup 与 key identity。
- **JavaScript runtime：** 执行 reducer、reduce/map/filter、创建 objects 与 closures。
- **TypeScript：** 检查 action/context/hooks/props；不会验证运行时外部 JSON。
- **Tooling：** Vite 转换 TSX，ESLint 检查 Hooks rules，`tsc` 在 build 中检查类型。
- **错误识别：** Reducer 出现 assignment/browser API 是 pure boundary 错误；summary 出现 setter 是 redundant state 信号；hook 在 provider 外抛错说明 provider scope 错误；两个 hook callers 不同步说明没有共同 owner。

## 13. 额外速查表

| 判断问题 | 优先答案 |
| --- | --- |
| 能从当前 props/state 算出来吗？ | 不保存，在 render 派生 |
| 两个 state 是否表达同一事实？ | 保留一个 source，另一个派生 |
| 多个 booleans 是否互斥？ | 改用 literal union/status |
| 只有一个 component 使用吗？ | 保持 local state |
| 多个 siblings 读写吗？ | 提升到最近公共 parent |
| Transition 是否散落、关联且增多？ | 考虑 `useReducer` |
| 是否只是跨一两层？ | 优先 props |
| 是否跨多层且中间层不使用？ | 考虑窄范围 Context |
| 是否只想复用 stateful code？ | 提取 custom hook |
| 是否要让多个 callers 共享同一 state？ | 共同 owner/Context，不靠同名 hook |
| 是否要重置 local component state？ | 检查 tree position/type，必要时使用 stable `key` |
| Reducer 中出现 request/storage/timer？ | 移出 reducer |

**Action union template：**

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Template: typed reducer action</span></div>

```ts
type State = {
  selectedId: string | null
}

type Action =
  | { type: 'selection_changed'; selectedId: string }
  | { type: 'selection_cleared' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'selection_changed':
      return { selectedId: action.selectedId }
    case 'selection_cleared':
      return { selectedId: null }
  }
}
```
</div>

## 14. 工程迁移与代码审查要点

### Code review questions

- 当前 state 是否有重复或可派生字段？
- state owner 是否是所有读写方的最近共同边界？
- reducer action 是否表达业务意图，而不是 UI 细节？

### Migration checks

- 先删除重复派生 state，再考虑 lifting 或 reducer。
- 把多个相关 setter 合并为 reducer 前，先定义 action union。
- Context 迁移时保持 provider 范围最小，避免全应用依赖。

### Production risk signals

- 同一数据显示多个版本，检查 state source of truth。
- 多个 handler 复制同一业务规则，适合提取 reducer。
- 任意组件都能改全局状态时，Context owner 已经过宽。

## 15. 如何转换成个人笔记

建议每个机制只保留一张四列卡片：

| 问题 | 你的答案 |
| --- | --- |
| Source fact 是什么？ | 写出不能派生、必须跨 render 保留的最小字段 |
| Owner 在哪里？ | 写出最近公共 readers/writers ancestor |
| Update 如何表达？ | setter callback、intent callback 或 action union |
| Delivery 如何到达？ | props 或窄范围 Context |

再为每次练习记录一次完整 transition：旧 snapshot、action/intent、next reference、derived output、哪些 consumers render。不要只摘抄 API 签名。

## 16. 必须能回答的问题

1. 为什么 subtotal 通常不应该与 cart items 同时保存为 state？
2. Redundant、duplicate 与 contradictory state 有什么区别？
3. 如何找到 shared state 的最近公共 owner？
4. Lifting state up 为什么不是复制 state？
5. Callback prop 与 dispatch action 在“表达意图”上有什么共同点？
6. React 根据什么 preserve 或 reset component state？
7. `key` 为什么不会出现在 child props 中？
8. `dispatch` 后为什么当前 handler 仍读取旧 render snapshot？
9. Reducer 为什么必须 pure，为什么不能执行 request/localStorage/timer？
10. Typed action union 如何把 action type 与 payload 绑定？
11. `never` 如何帮助 exhaustiveness checking？
12. Context 解决的是 storage、transition 还是 delivery？
13. Provider value 改变时，哪些 descendants 与它相关？
14. Reducer + Context 的 owner 在哪里？
15. Custom hook 为什么必须以 `use` 开头并在顶层调用？
16. 为什么两个 components 调用同一 custom hook 不会自动共享 state？
17. TypeScript 在 reducer/context 中检查什么，又不会在 browser runtime 做什么？
18. SellerHub 的 cart、filter、checkout、selection、auth 与 local modal 应分别如何判断 owner？

## 17. 最终记忆模型

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Final memory model</span></div>

```txt
1. Store the minimum source facts.
2. Derive everything else during render.
3. Place the source at the closest common owner.
4. Pass values down; report intent up.
5. Use tree position and key to control state identity.
6. Use a reducer when transition rules need one pure home.
7. Use action unions to make legal events explicit.
8. Use Context only to deliver values across a real subtree boundary.
9. Use custom hooks to reuse logic, not to imply shared state.
10. Keep runtime, React, types, tooling, and architecture as separate layers.
```
</div>

一句话总结：**State architecture 先确定事实、owner、identity 与 transition，再选择 `useReducer`、Context 或 custom hook；工具服务边界，而不是替代边界。**

## 18. 官方文档阅读清单

**React 官方文档（主要依据）：**

- [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)：minimal、redundant、duplicate 与 contradictory state。
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)：state owner 与 lifting state up。
- [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)：tree position、type 与 `key` identity。
- [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)：action、reducer 与 dispatch mental model。
- [`useReducer` Reference](https://react.dev/reference/react/useReducer)：签名、snapshot、dispatch、purity 与 Strict Mode caveats。
- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)：provider/consumer boundary 与 Context trade-offs。
- [Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)：reducer + Context pattern。
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)：logic reuse 与 independent state。
- [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)：顶层调用与合法调用位置。
- [Using TypeScript](https://react.dev/learn/typescript)：React reducer、Context 与 event typing。

**TypeScript 官方文档：**

- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)：discriminated union 与 control-flow narrowing。
- [The `never` type](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type)：exhaustiveness checking。
- [React JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)：TSX 的静态检查与 emit 边界。

**MDN 辅助文档：**

- [`Array.prototype.reduce()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)：derived total calculation。
- [`Array.prototype.map()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 与 [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)：immutable array transitions。
- [`Event`](https://developer.mozilla.org/docs/Web/API/Event)：browser event object 与 React handler 边界。

**本地辅助资料：**

- `references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf`：callback props、lifting state、derived filtering、reducer 与 custom hooks 章节作为辅助解释。
- `references/books/react/full-stack-react-projects.pdf`：仅用于对照传统 React 项目中的 Context 使用场景。

本章以当前 `react.dev` 为准。若本地 PDF 使用旧 provider 写法、旧生命周期术语或与 React 19 文档冲突，应视为历史资料，不覆盖官方当前行为。
