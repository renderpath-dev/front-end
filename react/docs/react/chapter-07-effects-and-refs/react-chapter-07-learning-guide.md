# React 第 7 章：Effects、Refs 与外部系统同步

<style>
.macos-code-window { overflow: hidden; margin: 16px 0; border: 1px solid #30363d; border-radius: 12px; background: #0d1117; }
.macos-code-titlebar { display: flex; align-items: center; gap: 8px; min-height: 36px; padding: 0 12px; border-bottom: 1px solid #30363d; background: #161b22; }
.macos-code-dot { display: inline-block; width: 12px; height: 12px; flex: 0 0 auto; border-radius: 999px; }
.macos-code-dot-red { background: #ff5f57; }
.macos-code-dot-yellow { background: #ffbd2e; }
.macos-code-dot-green { background: #28c840; }
.macos-code-title { margin-left: 8px; color: #c9d1d9; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 13px; }
.macos-code-titlebar + pre { overflow-x: auto; margin: 0; padding: 16px; border-radius: 0 0 12px 12px; background: transparent; }
.macos-code-titlebar + pre code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 14px; }
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
  - [9.1 pure render 与 side effect](#91-pure-render-与-side-effect)
  - [9.2 event handler 与 effect](#92-event-handler-与-effect)
  - [9.3 useRef 保存可变值](#93-useref-保存可变值)
  - [9.4 ref 访问 DOM node](#94-ref-访问-dom-node)
  - [9.5 effect setup 与 cleanup](#95-effect-setup-与-cleanup)
  - [9.6 dependency array 与重新同步](#96-dependency-array-与重新同步)
  - [9.7 stale closure](#97-stale-closure)
  - [9.8 timer cleanup 与 Strict Mode](#98-timer-cleanup-与-strict-mode)
  - [9.9 document title 同步](#99-document-title-同步)
  - [9.10 async effect 的 abort 或 ignore](#910-async-effect-的-abort-或-ignore)
  - [9.11 什么时候不需要 effect](#911-什么时候不需要-effect)
  - [9.12 TypeScript ref 与 effect 类型](#912-typescript-ref-与-effect-类型)
  - [9.13 SellerHub 场景映射](#913-sellerhub-场景映射)
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
| Pure render boundary | Render computes UI and must not perform synchronization work. | React render runtime | Seller search rendering stays separate from document or timer effects. | `src/learning/react/chapter-07-effects-and-refs/01-pure-render-boundary/pure-render-boundary.tsx` |
| Ref mutable cell | A ref stores mutable data without scheduling render. | React hook runtime | Timer ids or DOM nodes can be retained without UI state churn. | `src/learning/react/chapter-07-effects-and-refs/03-ref-mutable-value/ref-mutable-value.tsx` |
| Effect setup and cleanup | The component owns external synchronization lifetime. | React commit phase | Subscriptions, timers, and requests are cleaned up when dependencies change. | `src/learning/react/chapter-07-effects-and-refs/05-effect-setup-cleanup/effect-setup-cleanup.tsx` |
| Dependency array | React decides when synchronization must rerun. | React hook dependency model | Search criteria changes drive effect refresh without stale closures. | `src/learning/react/chapter-07-effects-and-refs/06-effect-dependencies/effect-dependencies.tsx` |

## 0. 本章工程问题与边界

本章解决的工程问题是：哪些工作属于 render，哪些工作属于与外部系统同步。Effect 不是“任何逻辑都能放进去”的工具；ref 也不是 state 的替代品。

本章不构建完整数据请求架构、缓存层或性能优化系统。它只处理 DOM node、timer、document title、async cleanup 等外部同步边界。

## 1. 本章解决的问题

组件 function 会被 React 反复调用。如果在 function body 中直接改 DOM、启动 timer 或写 `document.title`，一次被丢弃的 render 也可能留下真实外部影响。另一方面，把所有逻辑都放进 `useEffect` 又会产生多余 render、依赖错误和 stale closure。

本章建立的判断顺序是：

1. 这是从 props/state 计算 JSX 吗？留在 render。
2. 这是某次明确用户操作触发的吗？放进对应 event handler。
3. 这是组件当前可见状态必须持续匹配的外部系统吗？用 effect 描述 setup、dependencies 与 cleanup。
4. 这是跨 render 需要保留、但变化不应触发 UI 的值吗？使用 ref。
5. UI 是否必须显示该值？若是，使用 state，而不是只修改 ref。

## 2. 前置概念

| 前置概念 | 本章用途 |
| --- | --- |
| function 与 closure | 每次 render 创建新的 bindings，异步 callback 会保留创建它时的 lexical environment。 |
| state snapshot | effect setup 与 handler 都读取所属 render 的 snapshot。 |
| event callback | 用户意图明确时，副作用应直接发生在 handler 中。 |
| immutable state | 可渲染数据继续用 setter 更新，不用 ref 绕过 React。 |
| conditional rendering | 挂载 / 卸载子组件可观察 cleanup。 |
| controlled input | search query 是 state；DOM node identity 通过 ref 获取。 |
| browser API | `focus()`、timer、`document.title`、`AbortController` 不属于 React。 |

## 3. 学习目标

完成本章后，你应该能够：

- 解释为什么 render 必须保持纯计算。
- 判断逻辑属于 render、event handler 还是 effect。
- 解释 `useRef` 返回的 object、`current` mutation 和不触发 render 的原因。
- 用 typed ref 访问 input DOM node，并处理初始 `null`。
- 预测 setup、cleanup、依赖变化、unmount 和 Strict Mode 下的执行顺序。
- 从 effect 读取的 reactive values 推导 dependency array，而不是手工“选择”依赖。
- 识别 stale closure，并用正确依赖、functional updater 或重构职责修复。
- cleanup timer、subscription 与 obsolete async result。
- 直接在 render 中计算 derived data，避免 `effect + state` 镜像。
- 把机制映射到 SellerHub 的 search、modal、draft、dashboard 与 request 场景。

## 4. 机制依赖图

这些依赖不是阅读顺序清单，而是本章概念成立的前置关系。

| First Understand | Then Understand | Dependency Reason | Failure If Skipped |
| --- | --- | --- | --- |
| Pure render | Effect necessity | 先判断能否在 render 中派生，才能避免滥用 effect。 | 会把可计算数据放进 effect 造成额外 render。 |
| Mutable value need | Ref usage | 只有不需要触发 UI 更新的数据才适合 ref。 | UI 不更新或状态不可追踪。 |
| External resource lifetime | Cleanup function | 外部订阅或 timer 必须有结束条件。 | 会泄漏订阅、重复 timer 或过期请求。 |
| Closure capture | Dependency list | effect 使用的值来自闭包，依赖数组必须反映同步输入。 | 会产生 stale closure。 |

## 5. 核心术语表

| 术语 | 准确定义 | 所属层 |
| --- | --- | --- |
| pure render | 相同 props/state/context 应计算相同 JSX，不修改外部可观察状态 | React 约定 / JavaScript |
| side effect | 改变函数外部状态或调用外部系统的操作 | JavaScript runtime |
| Effect | 由 render 结果需要而产生的外部同步过程 | React framework |
| setup | 开始或更新一次同步过程的 function | React framework |
| cleanup | 停止或撤销上一次 setup 的 function | React framework |
| reactive value | props、state 及 component body 中声明并被 effect 读取的值 | React / tooling |
| dependency array | effect 所读取 reactive values 的 inline 常量长度列表 | React framework |
| ref object | React 跨 render 保留的 `{ current }` object | React framework / JS object |
| DOM ref | commit 后 `current` 指向 browser DOM node 的 ref | React / browser |
| stale closure | callback 继续读取旧 render lexical bindings | JavaScript runtime |
| abort / ignore | 取消 operation 或阻止过期 completion 更新 UI | Browser / JavaScript |

## 6. 底层心智模型

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">底层心智模型</span></div>

```txt
React calls component -> pure render calculates JSX
  -> React commits DOM changes and ref.current values
  -> browser may paint
  -> React runs effect setup for the committed render

next committed render with changed dependencies
  -> cleanup from the previous render snapshot
  -> setup from the next render snapshot

unmount
  -> final cleanup
```
</div>

- **JavaScript runtime behavior**：function invocation 创建 bindings；closure 保留旧 bindings；object property 可变；timer callback 异步执行。
- **React framework behavior**：React 保留 hook cell、比较 dependencies、在 commit 后调度 setup，并在重新同步或 unmount 前运行 cleanup。
- **Browser platform behavior**：DOM node、focus、timer、document title、online event 和 abort signal 是 browser 能力。
- **TypeScript type-system behavior**：检查 `HTMLInputElement | null`、event type 与 timer handle；类型在 emit 后被擦除。
- **Tooling behavior**：`eslint-plugin-react-hooks` 检查 Hook 规则与 dependencies；`tsc` 检查类型；Vite 转换 TSX 并 bundle。

## 7. 推荐目录结构

采用“一个同步机制一个目录”的原因是：effect bug 通常来自职责混杂。编号固定学习顺序，描述性文件名说明目标，最终项目只负责组合，不替代单项练习。

### 当前项目结构

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">当前项目结构</span></div>

```txt
README.md
package.json
tsconfig.app.json
eslint.config.js
src/
  App.tsx
  sudoku/
  learning/react/
    chapter-05-rendering-data/
    chapter-06-forms/
docs/react/
  chapter-05-rendering-data/
  chapter-06-forms/
```
</div>

### 本章文档结构

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">本章文档结构</span></div>

```txt
docs/react/chapter-07-effects-and-refs/
  react-chapter-07-learning-guide.md
```
</div>

### 真实练习结构

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">真实练习结构</span></div>

```txt
src/learning/react/chapter-07-effects-and-refs/
  chapter-07-practice-root.tsx
  chapter-07-practice.css
  01-pure-render-boundary/pure-render-boundary.tsx
  02-event-handler-vs-effect/event-handler-vs-effect.tsx
  03-ref-mutable-value/ref-mutable-value.tsx
  04-dom-node-ref/dom-node-ref.tsx
  05-effect-setup-cleanup/effect-setup-cleanup.tsx
  06-effect-dependencies/effect-dependencies.tsx
  07-stale-closure/stale-closure-interval.tsx
  08-timer-cleanup/timer-cleanup.tsx
  09-document-title-sync/document-title-sync.tsx
  10-async-effect-cleanup/async-effect-cleanup.tsx
  11-derived-data-without-effect/derived-data-without-effect.tsx
  12-typed-refs-effects/typed-refs-effects.tsx
```
</div>

### 概念示例结构

下列 snippet 只用于错误对比，不需要创建文件：

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">概念示例结构</span></div>

```txt
Snippet: side effect during render
Snippet: missing dependency
Snippet: stale interval closure
Snippet: redundant derived state
Snippet: unsafe ref access
```
</div>

### 最终小项目结构

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">最终小项目结构</span></div>

```txt
src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/
  seller-search-types.ts
  seller-search-data.ts
  seller-search-input.tsx
  seller-search-results.tsx
  seller-search-sync-workspace.tsx
  seller-search-sync-mini-project.css
```
</div>

## 8. 示例运行方式

`src/sudoku/main.tsx` 已有 `StrictMode` 与 React root。本章不修改它；根级 `src/App.tsx` 只切换到 `Chapter07PracticeRoot`。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/chapter-07-practice-root.tsx</span></div>

```tsx
import { PureRenderBoundary } from './01-pure-render-boundary/pure-render-boundary'
import { EventHandlerVsEffect } from './02-event-handler-vs-effect/event-handler-vs-effect'
import { RefMutableValue } from './03-ref-mutable-value/ref-mutable-value'
import { DomNodeRef } from './04-dom-node-ref/dom-node-ref'
import { EffectSetupCleanup } from './05-effect-setup-cleanup/effect-setup-cleanup'
import { EffectDependencies } from './06-effect-dependencies/effect-dependencies'
import { StaleClosureInterval } from './07-stale-closure/stale-closure-interval'
import { TimerCleanup } from './08-timer-cleanup/timer-cleanup'
import { DocumentTitleSync } from './09-document-title-sync/document-title-sync'
import { AsyncEffectCleanup } from './10-async-effect-cleanup/async-effect-cleanup'
import { DerivedDataWithoutEffect } from './11-derived-data-without-effect/derived-data-without-effect'
import { TypedRefsEffects } from './12-typed-refs-effects/typed-refs-effects'
import { SellerSearchSyncWorkspace } from './seller-search-sync-mini-project/seller-search-sync-workspace'
import './chapter-07-practice.css'

const practiceSections = [
  { id: 'pure-render', component: <PureRenderBoundary /> },
  { id: 'event-effect', component: <EventHandlerVsEffect /> },
  { id: 'mutable-ref', component: <RefMutableValue /> },
  { id: 'dom-ref', component: <DomNodeRef /> },
  { id: 'setup-cleanup', component: <EffectSetupCleanup /> },
  { id: 'dependencies', component: <EffectDependencies /> },
  { id: 'stale-closure', component: <StaleClosureInterval /> },
  { id: 'timer-cleanup', component: <TimerCleanup /> },
  { id: 'document-title', component: <DocumentTitleSync /> },
  { id: 'async-cleanup', component: <AsyncEffectCleanup /> },
  { id: 'derived-data', component: <DerivedDataWithoutEffect /> },
  { id: 'typed-refs', component: <TypedRefsEffects /> },
]

export function Chapter07PracticeRoot() {
  return (
    <main className="chapter-seven-shell">
      <header className="chapter-seven-header">
        <p className="chapter-seven-eyebrow">React Chapter 07</p>
        <h1>Effects, Refs, and External Synchronization</h1>
        <p>
          Separate render calculations, user-driven events, retained mutable references,
          and synchronization processes before applying them to SellerHub workflows.
        </p>
      </header>

      <section aria-labelledby="chapter-seven-practice-title">
        <div className="chapter-seven-section-heading">
          <div>
            <p>Mechanism practice</p>
            <h2 id="chapter-seven-practice-title">One synchronization boundary per directory</h2>
          </div>
          <p>Use each card to predict setup, cleanup, dependency, and render behavior.</p>
        </div>

        <div className="chapter-seven-practice-grid">
          {practiceSections.map((practice) => (
            <div id={practice.id} key={practice.id}>
              {practice.component}
            </div>
          ))}
        </div>
      </section>

      <SellerSearchSyncWorkspace />
    </main>
  )
}
```
</div>

**逐行与执行过程：** imports 明确每个机制目录；array 只保存 JSX elements 与 stable IDs；root 先 render 练习 grid，再 render final project。这里不新增业务 state，每个 child 自己拥有对应机制。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/chapter-07-practice.css</span></div>

```css
:root {
  color: #172033;
  background: #eef3f4;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

body { margin: 0; }

button,
input,
select { font: inherit; }

.chapter-seven-shell {
  width: min(100% - 32px, 1180px);
  margin: 0 auto;
  padding: 56px 0 72px;
}

.chapter-seven-header { max-width: 900px; margin-bottom: 48px; }

.chapter-seven-eyebrow,
.chapter-seven-section-heading > div > p,
.practice-label,
.project-eyebrow {
  margin: 0;
  color: #0f766e;
  font-size: 0.75rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.chapter-seven-header h1 {
  margin: 10px 0 0;
  color: #172033;
  font-size: clamp(2.2rem, 6vw, 4.7rem);
  line-height: 1;
}

.chapter-seven-header > p:last-child {
  margin: 22px 0 0;
  color: #526077;
  font-size: 1.08rem;
  line-height: 1.7;
}

.chapter-seven-section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 20px;
}

.chapter-seven-section-heading h2 {
  margin: 6px 0 0;
  color: #172033;
  font-size: 1.8rem;
}

.chapter-seven-section-heading > p {
  max-width: 430px;
  margin: 0;
  color: #667085;
  text-align: right;
}

.chapter-seven-practice-grid {
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
  color: #172033;
  font-size: 1.15rem;
}

.practice-card p:not(.practice-label) { color: #667085; line-height: 1.55; }

.practice-card label {
  display: grid;
  gap: 6px;
  margin-bottom: 12px;
  color: #344054;
  font-size: 0.9rem;
  font-weight: 750;
}

.practice-card input,
.practice-card select {
  width: 100%;
  box-sizing: border-box;
  padding: 9px 10px;
  color: #172033;
  border: 1px solid #94a3b8;
  border-radius: 7px;
  background: #ffffff;
}

.practice-card button {
  padding: 9px 12px;
  color: #ffffff;
  border: 1px solid #0f766e;
  border-radius: 7px;
  background: #0f766e;
  font-weight: 800;
  cursor: pointer;
}

.button-row { display: flex; flex-wrap: wrap; gap: 8px; }
.practice-card .status-positive { color: #067647; font-weight: 800; }
.practice-card .status-negative { color: #b42318; font-weight: 800; }

@media (max-width: 960px) {
  .chapter-seven-practice-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 640px) {
  .chapter-seven-shell {
    width: min(100% - 20px, 1180px);
    padding: 36px 0 48px;
  }

  .chapter-seven-section-heading { align-items: start; flex-direction: column; }
  .chapter-seven-section-heading > p { text-align: left; }
  .chapter-seven-practice-grid { grid-template-columns: 1fr; }
}
```
</div>

**逐行与执行过程：** shared CSS 定义 page、grid、card、form control 与 responsive layout；它只影响 browser presentation，不参与 Hook lifecycle。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/App.tsx</span></div>

```tsx
import { Chapter07PracticeRoot } from './learning/react/chapter-07-effects-and-refs/chapter-07-practice-root'

function App() {
  return <Chapter07PracticeRoot />
}

export default App
```
</div>

**逐行与执行过程：** import 解析本章总入口；`App` 返回该 component element；已有 `createRoot` 调用使 React render 整章。`App` 不保存本章状态，也不承担概念实现。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Terminal</span></div>

```bash
npm run dev
```
</div>

运行后依次操作 12 张机制卡片，再操作最终项目。开发环境中 Strict Mode 可能出现 `setup -> cleanup -> setup`；正确 cleanup 后用户可见结果应与 production 一致。

## 9. 分节教学与练习

### 9.1 pure render 与 side effect

**新关键字和新概念：** `pure render` 指 render phase 只做可重复的计算；`side effect` 指修改函数外部可观察状态；`render phase` 负责计算 UI description；`commit phase` 才允许 React 把已确认的结果应用到 DOM。这里的“纯”不是“函数内部没有变量”，而是相同输入不会因为调用次数不同而额外改变 browser 或其他外部系统。

**边界：JavaScript runtime / React framework / browser platform / TypeScript type system / tooling：** JavaScript runtime 允许普通 function 修改 global object、调用 timer；React framework 依赖 component render 可重复调用，因此要求 render 保持纯；browser platform 真正执行 `document.title`、timer 和 DOM mutation；TypeScript 只检查表达式与类型，不证明 function 纯净；tooling 可以通过 Hooks lint 和部分 purity 规则发现典型问题，但仍需要开发者判断 observable side effect。

**底层机制：** React 调用 component 后先得到 JSX description，再决定是否 commit。若 component 在被调用时已经启动 timer，即使该次 render 被后续 render 替代或没有 commit，timer 也不会自动撤销。纯 render 则只创建局部 primitive、array、object 或 JSX values；这些值没有逃逸到外部时，可随该次计算一起被丢弃。

**API / 语法规则：** 本节没有新 API，重点是职责边界和运行时机制。`quantity * unitPrice` 是 render-time pure calculation；`onClick={() => ...}` 只是把 function value 交给 React，function 不会在 render 期间执行。

**固定属性名 / 固定方法名 / 参数签名：** 本节不新增固定 React 方法。已有 JSX event prop 必须写作 `onClick`；setter updater 继续使用 `(currentValue) => nextValue`。`document.title`、`window.setInterval()` 是用于识别错误层级的 browser API，不属于 render syntax。

**示例代码：** 先看错误 snippet 如何在 render 中立即改变 browser，再看真实练习文件如何只计算 `totalPrice`。

**技术意义：** React 可能多次调用、暂停或丢弃 render。只有 pure calculation 才能让这些调度选择不改变外部世界。

**结论：** component body 应从 props、state、context 计算 JSX。修改 DOM、启动 timer、写 storage 或 document title 都是 side effect，不能在 render 中发生。

**本节解决的问题：** 为什么普通 JavaScript function 可以调用任何 API，而 React component function 需要 purity 约定？因为 React 把它当成可重复执行的计算步骤，而不是一次性命令。

**层级边界：** JavaScript 允许 side effect；React 规定 render purity；browser 执行真实外部变化；TypeScript 不判断业务 purity；ESLint 可发现部分 Hook 误用，但不能证明任意 function 纯净。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: side effect during render</span></div>

```tsx
function OrderSummary({ openOrderCount }: { openOrderCount: number }) {
  document.title = `Orders (${openOrderCount})`
  window.setInterval(refreshOrders, 5000)

  return <p>{openOrderCount} open orders</p>
}
```
</div>

**错误执行过程：** 每次 component invocation 都立即写 title 并创建新 interval；React 即使丢弃该 render，browser timer 已存在。修正时把 title 放入 dependency 正确的 effect，把 timer setup 与 clear cleanup 成对；若 refresh 只由按钮触发，则放 event handler。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/01-pure-render-boundary/pure-render-boundary.tsx</span></div>

```tsx
import { useState } from 'react'

export function PureRenderBoundary() {
  const [quantity, setQuantity] = useState(2)
  const unitPrice = 48
  const totalPrice = quantity * unitPrice

  return (
    <section className="practice-card">
      <p className="practice-label">Pure render</p>
      <h3>Calculate UI without a side effect</h3>
      <p>
        {quantity} items at ${unitPrice} produce a render-time total of ${totalPrice}.
      </p>
      <button onClick={() => setQuantity((currentQuantity) => currentQuantity + 1)}>
        Add one item
      </button>
    </section>
  )
}
```
</div>

**逐行解释：** state 是唯一可变渲染输入；`unitPrice` 是常量；`totalPrice` 每次 render 直接计算；button 只把 callback 交给 React，没有在 render 时调用 setter。

**执行过程：** 初次 render 得到 `2 * 48 = 96`；click 后 handler queue updater；React 以 quantity 3 再次调用 component；新 render 得到 144 并 commit 文本。

**变量与引用变化：** 旧 `quantity` binding 保持 2；新 render 创建值为 3 的 binding。`totalPrice` 没有 state identity，不存在同步问题。

**为什么得到结果：** 总价完全由当前 snapshot 决定，因而无需 effect 或第二份 state。

**错误与修正：** 不要在 function body 调 `document.title = ...` 或 `setInterval(...)`。它们会在每次 render 真实执行；应根据触发原因移到 handler 或 effect。

**为什么会得到这个结果：** `totalPrice` 只依赖当前 render 的 primitive values，计算不会注册 listener、创建 timer 或改 global object；所以 React 调用一次或多次都只得到 description。setter 则只在 click 后进入 update queue，外部可观察变化与 interaction 对齐。

**对比情况：** `const totalPrice = quantity * unitPrice` 一次 render 即得到 current result；若把 total 存 state并在 Effect 中更新，会先 commit old total，再产生 cascading render。若在 render 写 title，则调用 component 的次数会改变 browser state。

**常见错误为什么错：** render 中启动 timer 违反“render 必须纯且可重复调用”的规则；把 derived total 放 Effect 违反“能从 current inputs 计算的值不建立第二份 state”的规则。

**如何识别类似错误：** 看到 component top level 的 assignment、network call、timer、subscription、DOM method 或 setter 时，问“React 只调用它但不 commit，外部世界是否已经变化？”答案为是就不是 pure render。

**与 SellerHub 的关系：** product subtotal、库存 badge、filtered products、checkout total 都应优先从 current props/state 在 render 计算；analytics、autosave、title 等外部变化再按原因进入 handler 或 Effect。

**与当前学习路径的关系：** 本节复用第 4 章 state snapshot 和第 5 章 derived list，给第 7 章 Effect 划定入口条件：不是“值变化了就用 Effect”，而是“确实需要同步外部系统才用 Effect”。

**最终记忆模型：** render 是可重试的计算，不是命令执行区；先算 JSX，再由 event 或 commit 后的 Effect处理真正 side effect。

### 9.2 event handler 与 effect

**本节解决的问题：** 同一段 side-effect code 都能写在 handler 或 effect 中，但两种位置表达的“原因”不同。本节解决如何根据触发原因选择位置，避免 initial mount、无关 state change 或恢复页面时误执行本应只发生一次的业务 command。

**新关键字和新概念：** `event-specific logic` 是由某次明确 interaction 直接触发的逻辑；`reactive synchronization` 是 committed UI 只要处于某种状态，就必须持续匹配外部系统；`cause` 表示逻辑为什么发生，而不只是它何时运行。

**边界：JavaScript runtime / React framework / browser platform / TypeScript type system / tooling：** JavaScript runtime 执行 handler 与 effect callback；React framework 在 browser event 后调用 handler，并在 commit 后安排 effect synchronization；browser platform 产生 click event并保存 `document.body.dataset`；TypeScript 检查 `WorkspaceMode` union 与 callback 参数；tooling 检查 `useEffect` 的调用位置和 dependency completeness。

**底层机制：** click handler 从“用户选择某 mode”这个原因出发，queue `workspaceMode` 与 `lastAction`；React render/commit next snapshot 后，effect 不关心 mode 来自哪个按钮，只负责让 body dataset 匹配 committed mode。这样 user intent 与 external synchronization 不会互相冒充。

**API / 语法规则：** `onClick={handler}` 注册 event handler；`useEffect(setup, [workspaceMode])` 声明由 committed mode 驱动的同步过程。不要调用 `useEffect` 来代替 click command，也不要在 render 中直接调用 handler。

**固定属性名 / 固定方法名 / 参数签名：** 固定 JSX prop 是 `onClick`；Effect 签名是 `useEffect(setup, dependencies?)`，其中 setup 返回 `void` 或 cleanup function；本例 domain handler 签名是 `handleModeChange(nextMode: WorkspaceMode): void`。

**示例代码：** 真实练习把 action message 留在 handler，把 `document.body.dataset.sellerWorkspace` 的持续同步放入 effect。

**技术意义：** event handler 表达“用户做了什么”；effect 表达“当前 committed UI 需要持续和哪个外部系统一致”。混淆二者会丢失触发原因。

**结论：** 明确由 click、submit、change 引起的业务动作放在 handler。无论哪次交互造成 state，都必须保持的外部同步才放 effect。

**底层机制：** handler 在 browser event 后执行；effect setup 在对应 render commit 后执行。两者都闭包捕获 render snapshot，但触发时机和语义不同。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/02-event-handler-vs-effect/event-handler-vs-effect.tsx</span></div>

```tsx
import { useEffect, useState } from 'react'

type WorkspaceMode = 'catalog' | 'orders'

export function EventHandlerVsEffect() {
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>('catalog')
  const [lastAction, setLastAction] = useState('No action recorded.')

  useEffect(() => {
    document.body.dataset.sellerWorkspace = workspaceMode
    return () => {
      delete document.body.dataset.sellerWorkspace
    }
  }, [workspaceMode])

  function handleModeChange(nextMode: WorkspaceMode): void {
    setWorkspaceMode(nextMode)
    setLastAction(`The user selected ${nextMode} mode.`)
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Event or effect</p>
      <h3>Separate intent from synchronization</h3>
      <div className="button-row">
        <button onClick={() => handleModeChange('catalog')}>Catalog</button>
        <button onClick={() => handleModeChange('orders')}>Orders</button>
      </div>
      <p>Current mode: {workspaceMode}</p>
      <p aria-live="polite">{lastAction}</p>
    </section>
  )
}
```
</div>

**逐行解释：** union 限制 mode；handler 记录 click 产生的 intent；effect 读取 committed mode 并同步到 browser DOM dataset；cleanup 撤销自己的旧写入。

**执行过程：** click 调用 handler并 queue 两次 state update；React batching 后 render 一次；commit 更新文本；旧 effect cleanup 删除旧 attribute；新 setup 写入 next mode。

**变量与引用变化：** 当前 handler 的 `workspaceMode` 不被修改；next render 创建新 string binding。`document.body` 是 React tree 外部的 browser object。

**为什么得到结果：** 用户动作消息需要保留 click 原因，所以在 handler；dataset 必须跟任何来源产生的 mode 一致，所以在 effect。

**对比错误：** 若 effect 监听 `workspaceMode` 后再“提交订单”，initial mount 或其他 state source 都可能误触发业务动作。业务 command 应留在产生它的 handler。

**为什么会得到这个结果：** handler 保留“哪次 interaction 导致操作”的信息；Effect 只看到 committed mode，因此适合表达“只要 mode 是 X，外部系统就应是 X”。两者都能执行 side effect，但 data source和cause不同。

**对比情况：** `handleCheckoutSubmit()` 中发送订单保留 submit cause；Effect 根据 `workspaceMode` 更新 dataset不关心 mode 来源。若把发送订单放 Effect，initial mount、state restore或其他更新路径都可能触发。

**常见错误为什么错：** 把用户 command 放 Effect违反“event-specific logic留在对应 handler”的规则；把持续 external sync只放某个按钮 handler则违反“外部系统必须匹配任意来源产生的 current state”的规则。

**如何识别类似错误：** 问“如果页面因 URL restore、parent prop或其他 handler进入同一 state，这段逻辑也应该执行吗？”只有回答“是，必须持续同步”时才倾向 Effect；回答“否，只因这次点击”时留在 handler。

**与 SellerHub 的关系：** `Save product`、`Place order`、`Export report` 是 event commands；document title、global subscription、visible modal的focus synchronization是 Effects。

**与当前学习路径的关系：** 本节把第 4 章 event handler与第 6 章 form submit向前延伸：handler仍负责用户意图，Effect只新增“render造成的外部同步”这一职责。

**最终记忆模型：** handler回答“用户刚做了什么”；Effect回答“当前已提交的 UI 必须与哪个外部系统保持一致”。

### 9.3 useRef 保存可变值

**本节解决的问题：** 普通局部变量不能跨 render 保留，state update 又会请求 render；本节解决如何保存 timer handle、request sequence、interaction counter 等“不参与 UI 计算但需要跨 render 记住”的值。

**新关键字和新概念：** `ref object` 是 React 为 component instance 保留 identity 的普通 JavaScript object；`current` 是可变 property；`non-render value` 表示该值变化本身不应改变 JSX。

**边界：JavaScript runtime / React framework / browser platform / TypeScript type system / tooling：** JavaScript runtime 执行普通 property read/write；React framework 跨 render 返回同一个 ref object，但不订阅 `current` mutation；browser platform 本节不参与 count 保存；TypeScript 从 `useRef(0)` 推导 `current` 为 number；tooling 会限制 render 期间不安全的 ref read/write，但不会把 mutation 变成 state update。

**底层机制：** Hook 调用位置对应 React 内部 hook cell；第一次调用创建 ref object，后续 render 取回同一个 object。`interactionCountRef.current += 1` 替换 number property，却没有调用 React setter，因此 update queue 为空，component 不会因这次 mutation 被重新调用。

**API / 语法规则：** `useRef<T>(initialValue)` 创建 ref；通过 `ref.current` 读写。只有值不用于当前 JSX 时才把它放 ref；若 UI 必须响应变化，使用 state。

**固定属性名 / 固定方法名 / 参数签名：** `current` 是 React ref object 的固定 property name；调用形态是 `useRef(initialValue)` 或 `useRef<Type>(initialValue)`。不要自创 `ref.value` 并期待 JSX `ref` 机制识别。

**示例代码：** 真实练习先静默递增 `current`，再由第二个 handler 把当前 ref value复制到 state，以直观看出“记住”与“触发 render”是两件事。

**技术意义：** 有些值需跨 render 保存，但不是 UI 输入，例如 timer ID、request sequence、previous pointer position。state 会触发 render；普通局部变量每次 render 重建；ref 填补二者之间的边界。

**结论：** `useRef(initialValue)` 返回 React 保留 identity 的 object。修改 `ref.current` 是普通 object property mutation，不会 queue render。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/03-ref-mutable-value/ref-mutable-value.tsx</span></div>

```tsx
import { useRef, useState } from 'react'

export function RefMutableValue() {
  const interactionCountRef = useRef(0)
  const [visibleSnapshot, setVisibleSnapshot] = useState(0)

  function handleSilentIncrement(): void {
    interactionCountRef.current += 1
  }

  function handleReadSnapshot(): void {
    setVisibleSnapshot(interactionCountRef.current)
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Mutable ref value</p>
      <h3>A ref remembers without rendering</h3>
      <div className="button-row">
        <button onClick={handleSilentIncrement}>Increment ref</button>
        <button onClick={handleReadSnapshot}>Read into state</button>
      </div>
      <p>Last rendered ref snapshot: {visibleSnapshot}</p>
    </section>
  )
}
```
</div>

**逐行解释：** ref 保存真实 mutable count；state 只保存需要显示的 snapshot；第一个 handler 仅 mutation；第二个 handler 把当前 ref value 交给 setter。

**执行过程：** 连续点击 Increment ref 时 JavaScript 立即改变同一 object 的 `current`，React 不 render；点击 Read into state 后 setter queue render，paragraph 才显示新值。

**变量与引用变化：** `interactionCountRef` object identity 跨 render 稳定，`current` 数字被替换；`visibleSnapshot` 是每次 render 的 immutable snapshot。

**为什么得到结果：** React 不追踪任意 object property mutation，只追踪 state setter 等 React update source。

**错误与修正：** 若值必须实时显示，直接使用 state。不要修改 ref 后期待 UI 自动刷新，也不要在 render 中随意读写业务 ref，因为并发 render 需要 purity。

**为什么会得到这个结果：** `current` mutation只改变普通 object property，没有调用 React update API；直到 `setVisibleSnapshot` queue state update，React才产生next render并读取可见值。

**对比情况：** local variable在每次 render重建；state跨 render保存且setter触发render；ref跨 render保存但mutation不触发render。选择依据是值是否需要参与当前UI计算。

**常见错误为什么错：** 用 ref保存页面计数却直接在 JSX显示，违反“可见事实必须由React可追踪输入驱动”的规则；render期间随意修改 ref又违反purity，因为被丢弃的render仍可能留下mutation。

**如何识别类似错误：** 若 DevTools/console 中 `current` 已变化但页面不变，这是 ref 正常行为，不是 React故障；若你因此想强制render，通常说明该值本应是state。

**与 SellerHub 的关系：** request sequence、timer handle、previous focus target和imperative widget handle可用ref；cart count、pending status、product draft等可见事实必须用state。

**与当前学习路径的关系：** 第4章用state建立component memory；本节补充“不驱动render的memory”，为后面的DOM ref、timer cleanup和async request identity做准备。

**最终记忆模型：** ref是React保留identity、JavaScript可mutation、UI不会自动订阅的盒子；看得见的事实用state，看不见的handle才用ref。

### 9.4 ref 访问 DOM node

**本节解决的问题：** JSX 描述 DOM，但 focus、scroll、selection 和 measurement 需要真实 node。本节解决 component 如何在不自行查找和接管 DOM lifecycle 的前提下，取得 React 已 commit 的 node。

**新关键字和新概念：** `DOM ref` 保存 browser node identity；JSX `ref` attribute 把 ref object 交给 React；`imperative browser API` 是需要对具体 node 发命令的 API；`null boundary` 表示 node 在 commit 前或 unmount 后不存在。

**边界：JavaScript runtime / React framework / browser platform / TypeScript type system / tooling：** JavaScript runtime 读取 `current` 并调用 method；React framework 在 commit 时设置 node、unmount 时恢复 null；browser platform 实现 `HTMLInputElement` 与 `focus()`；TypeScript 用 `HTMLInputElement | null` 描述 lifecycle；tooling/IDE 根据 element type 提供 DOM method diagnostics。

**底层机制：** initial render 只创建 element description，尚无 input instance；commit 创建或复用 node，并把 reference 写入 ref object。click 到来时 handler 才读取 current node。若该 input unmount，React 会清除 assignment，避免 ref 永久指向不再受管理的 node。

**API / 语法规则：** 用 `const inputRef = useRef<HTMLInputElement>(null)` 建立 typed ref，再写 `<input ref={inputRef}>`。由明确 click 触发的 focus 放 handler；由 node 出现在页面触发的 focus 才考虑 effect。

**固定属性名 / 固定方法名 / 参数签名：** JSX 固定 attribute 是 `ref`；ref 固定 property 是 `current`；browser method 是 `focus(options?)`，返回 `undefined`。本例使用 `inputRef.current?.focus()` 处理 null。

**示例代码：** 真实文件展示 safe focus；`Snippet: unsafe ref access` 展示 commit 前直接解引用为什么失败。

**技术意义：** React 管理 DOM 创建与更新，但 focus、scroll、measurement 等 imperative browser API 需要具体 node。JSX `ref` attribute 让 React 在 commit 时维护该引用。

**结论：** 初次 render 时 DOM 尚未创建，`current` 为 `null`。commit 后 React 把 input node 写入 `current`；unmount 时清回 `null`。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/04-dom-node-ref/dom-node-ref.tsx</span></div>

```tsx
import { useRef } from 'react'

export function DomNodeRef() {
  const searchInputRef = useRef<HTMLInputElement>(null)

  function handleFocusSearch(): void {
    searchInputRef.current?.focus()
  }

  return (
    <section className="practice-card">
      <p className="practice-label">DOM ref</p>
      <h3>Call a browser API from an event</h3>
      <label>
        Product search
        <input ref={searchInputRef} placeholder="Search inventory" />
      </label>
      <button onClick={handleFocusSearch}>Focus search</button>
    </section>
  )
}
```
</div>

**逐行解释：** generic 参数说明目标 node API；initial value 是 `null`；input 的 `ref` attribute 把 object 交给 React；handler 使用 optional chaining 处理 null boundary，再调用 browser `focus()`。

**执行过程：** render 只产生 JSX；commit 创建 input 并写入 `current`；click 后 browser event 触发 handler；handler 对真实 `HTMLInputElement` 调 `focus()`；browser 更新 active element。

**变量与引用变化：** ref object identity 不变，`current` 从 `null` 变为 DOM node。focus state 属于 browser，不是 React state。

**为什么得到结果：** React 负责 node lifecycle，browser 负责 focus 行为，TypeScript 只确保可调用的方法与 null 检查正确。

**对比错误：** render 中直接写 `searchInputRef.current.focus()` 既可能读到 null，又违反 purity。由 click 引起的 focus 放 handler；由 component 出现引起的 focus 才考虑 effect。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: unsafe ref access</span></div>

```tsx
const inputRef = useRef<HTMLInputElement>(null)
inputRef.current.focus()
```
</div>

**错误执行过程：** initial render 时 React 尚未创建 input node，`current` 是 null；TypeScript 会报告可能为 null，runtime 强行绕过类型后会抛错。应在 commit 后的 handler/effect 中使用 `inputRef.current?.focus()`。

**为什么会得到这个结果：** JSX `ref`不是立即求值为node的查询表达式；React只有在commit确认node后才写 `current`，browser focus也只能对真实已存在的element生效。

**对比情况：** click触发的focus在handler读取已commit node；modal出现后自动focus由Effect读取刚commit node；render直接focus既过早又使计算阶段产生browser side effect。

**常见错误为什么错：** 非空断言后在render调用 `current.focus()` 同时违反null lifecycle和render purity两条规则；用 `document.querySelector` 绕过ref则削弱React对node ownership的表达。

**如何识别类似错误：** 遇到“possibly null”、首次render crash、节点切换后指向旧element或focus反复跳动时，检查读取是否发生在commit前、owner是否稳定、触发原因属于event还是Effect。

**与 SellerHub 的关系：** `ProductSearchInput`的Focus按钮、modal打开后的首字段focus、validation失败后的field focus都需要DOM ref，但三者的触发原因可能分别属于handler或Effect。

**与当前学习路径的关系：** 本节把第2章JSX attribute和第4章event handler连接到browser DOM API，并为后续modal与accessibility学习建立node lifecycle基础。

**最终记忆模型：** React在commit时把真实node放进 `ref.current`；何时调用DOM method由触发原因决定，任何读取都必须尊重null boundary。

### 9.5 effect setup 与 cleanup

**本节解决的问题：** component 可见期间建立的 global event subscription 不会在 component unmount 时由 browser 自动移除。本节解决同步过程由谁拥有，以及 dependency change 或 unmount 时怎样可靠停止旧过程。

**新关键字和新概念：** `setup` 开始同步；`cleanup` 停止或撤销同一次 setup；`subscription ownership` 表示创建 listener 的 component 同时负责解除；`symmetric cleanup` 表示 stop operation 与 start operation 使用同一 resource identity。

**边界：JavaScript runtime / React framework / browser platform / TypeScript type system / tooling：** JavaScript closure 让 cleanup 保留 setup 创建的 callback references；React 决定 cleanup/setup 调用顺序；browser 保存 global listeners并派发 online/offline events；TypeScript 检查 listener 与 boolean state；tooling 确认 Effect dependency array 完整。

**底层机制：** commit 后 setup 创建两个 function objects并注册。cleanup closure 捕获的正是这两个 objects，因此 `removeEventListener` 能按 target、event type、callback identity 找到旧 listener。若 component 再次 setup，会创建新的一组 callback，由新的 cleanup 管理。

**API / 语法规则：** Effect setup 可以返回 cleanup；subscription 必须 `addEventListener` / `removeEventListener` 成对。空 dependency array 只在 setup 不读取变化的 reactive values 时成立。

**固定属性名 / 固定方法名 / 参数签名：** 使用 `window.addEventListener(type, listener)` 与 `window.removeEventListener(type, listener)`；event type string 固定为本例的 `'online'`、`'offline'`；Effect 形式是 `useEffect(() => { ...; return () => { ... } }, [])`。

**示例代码：** 真实练习以 browser connectivity subscription 展示 setup 和 cleanup 的 callback identity 对称关系。

**技术意义：** effect 不是“一段 mount callback”，而是一段可以反复开始和停止的同步过程。setup 连接当前 external system，cleanup 撤销同一次 setup。

**结论：** React 在 changed dependencies 的新 setup 前先运行旧 cleanup，并在 unmount 时运行最后一次 cleanup。订阅必须使用同一个 target、event type 和 callback reference 解除。

**层级边界：** browser 保存 listeners；JavaScript function identity 决定能否移除；React 安排 setup / cleanup；TypeScript 检查 listener 签名；hooks linter 检查 dependencies。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/05-effect-setup-cleanup/effect-setup-cleanup.tsx</span></div>

```tsx
import { useEffect, useState } from 'react'

export function EffectSetupCleanup() {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine)

  useEffect(() => {
    function handleOnline(): void {
      setIsOnline(true)
    }

    function handleOffline(): void {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <section className="practice-card">
      <p className="practice-label">Setup and cleanup</p>
      <h3>Subscribe to browser connectivity</h3>
      <p className={isOnline ? 'status-positive' : 'status-negative'}>
        Browser status: {isOnline ? 'Online' : 'Offline'}
      </p>
    </section>
  )
}
```
</div>

**逐行解释：** lazy initializer 在初始 render 读取 browser status；setup 内声明两个 stable-for-that-setup callback 并订阅；cleanup 用完全相同引用解除；空 array 合法，因为 setup 不读取 component body 中会变化的 reactive value。

**执行过程：** commit 后 setup 注册 listeners；browser connectivity event 调 handler；setter queue render；unmount 或 Strict Mode stress-test 时 cleanup 移除 listeners。

**变量与引用变化：** 每次 setup 都创建一对新 callback，但对应 cleanup 闭包保留同一对引用。state 的 boolean 在下一次 render 才变化。

**为什么得到结果：** listener ownership 和 component visibility 对齐；component 不在页面时不再响应 global events。

**错误与修正：** cleanup 中写新的 arrow function 无法移除旧 callback。必须复用 setup 创建的 function reference。

**为什么会得到这个结果：** browser按function identity登记listener；cleanup closure保留setup创建的同一function objects，所以remove能命中。React只负责调用cleanup，不会自动推断和删除browser subscription。

**对比情况：** 对称写法在setup注册 `handleOnline` 并在cleanup移除同一引用；错误写法在remove时新建 `() => setIsOnline(true)`，两个function即使源码相同也不是同一object。

**常见错误为什么错：** 忘记cleanup违反“创建持续resource的owner负责停止resource”；使用新callback解除违反browser event listener identity规则。

**如何识别类似错误：** component反复mount后一次event触发多次、unmount后仍更新、Strict Mode下log数量持续增长，通常说明listener、connection或timer没有被对称清理。

**与 SellerHub 的关系：** online/offline提示、unsaved changes warning、global keyboard shortcut和external inventory subscription都必须由可见owner完成subscribe/unsubscribe。

**与当前学习路径的关系：** 第4章只处理React JSX events；本节首次处理React tree外的global subscription，并把Effect理解为start/stop process而非生命周期名称列表。

**最终记忆模型：** 每个setup只负责开始一个同步周期，每个cleanup用同一resource identity结束它；React安排时机，browser保存resource。

### 9.6 dependency array 与重新同步

**本节解决的问题：** Effect closure 会读取某次 render 的 values；若这些 values 改变而 effect 不重新同步，外部系统仍与旧 snapshot 对齐。本节解决 dependency 从哪里来、React 比较什么，以及为什么不能用空 array 压住 lint warning。

**新关键字和新概念：** `reactive value` 包括 props、state 及 component body 内声明并被 effect 读取的 values；`dependency array` 是 reactive reads 的声明；`re-synchronization` 是 stop old process 后 start next process；`Object.is` 是 React 比较同位置 dependency 的规则。

**边界：JavaScript runtime / React framework / browser platform / TypeScript type system / tooling：** JavaScript closure 固定本次 render bindings；React framework 保存上次 dependency list、用 `Object.is` 比较并安排 cleanup/setup；browser platform 持有被同步的 dataset 或 connection；TypeScript 只检查 dependency expressions 类型，不判断遗漏；`eslint-plugin-react-hooks` 静态分析 setup/cleanup 中的 reactive reads并报告缺失项。

**底层机制：** initial commit 后 setup 捕获 `all`。next render 产生 `warehouse`；React 比较前后 primitive string，发现不同，先调用捕获 `all` 的旧 cleanup，再调用捕获 `warehouse` 的新 setup。cleanup 不是读取“最新 channel”，而是结束自己创建的旧同步周期。

**API / 语法规则：** `useEffect(setup)` 在每次 commit 后重新同步；`useEffect(setup, [])` 表示没有变化的 reactive dependency；`useEffect(setup, [a, b])` 表示 a 或 b 变化时重新同步。dependency list 必须 inline 且长度固定。

**固定属性名 / 固定方法名 / 参数签名：** Effect 签名是 `useEffect(setup, dependencies?)`；dependencies 是 `[dep1, dep2]` 形式的 readonly inline list；本例固定读取 `inventoryChannel`，因此必须出现 `[inventoryChannel]`。不存在“只运行一次”这个独立 magic keyword。

**示例代码：** 真实练习展示 primitive dependency 的 stop-old/start-new；`Snippet: missing dependency` 展示 `[]` 与 effect body 实际读取不一致。

**技术意义：** dependency array 不是“什么时候想运行”的命令列表，而是 effect setup / cleanup 读取的 reactive values 声明。React 用 `Object.is` 比较同位置值，决定是否需要重新同步。

**结论：** props、state，以及 component body 中声明并被 effect 读取的 variables/functions 都可能是 dependencies。不能为减少运行次数而撒谎。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/06-effect-dependencies/effect-dependencies.tsx</span></div>

```tsx
import { useEffect, useState } from 'react'

const inventoryChannels = ['all', 'warehouse', 'storefront'] as const
type InventoryChannel = (typeof inventoryChannels)[number]

export function EffectDependencies() {
  const [inventoryChannel, setInventoryChannel] = useState<InventoryChannel>('all')

  useEffect(() => {
    document.body.dataset.inventoryChannel = inventoryChannel
    return () => {
      delete document.body.dataset.inventoryChannel
    }
  }, [inventoryChannel])

  return (
    <section className="practice-card">
      <p className="practice-label">Reactive dependency</p>
      <h3>Re-synchronize when a dependency changes</h3>
      <label>
        Inventory channel
        <select
          onChange={(event) => setInventoryChannel(event.currentTarget.value as InventoryChannel)}
          value={inventoryChannel}
        >
          {inventoryChannels.map((channel) => (
            <option key={channel} value={channel}>
              {channel}
            </option>
          ))}
        </select>
      </label>
      <p>External dataset value: {inventoryChannel}</p>
    </section>
  )
}
```
</div>

**逐行解释：** readonly tuple 产生 finite union；effect setup 与 cleanup 都由当前 render closure 创建；setup 读取 `inventoryChannel`，所以 dependency 必须包含它；select handler queue next value。

**执行过程：** initial commit 写 `all`；选择 `warehouse` 后 render/commit；React 比较 `all` 与 `warehouse`，先执行旧 cleanup，再执行新 setup。

**变量与引用变化：** 旧 cleanup 捕获旧 render 环境；新 setup 捕获新 channel。`document.body` identity 稳定，但 dataset property 被替换。

**为什么得到结果：** dependency change 表示旧同步事实已不再匹配 committed UI，需要 stop old / start new。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: missing dependency</span></div>

```tsx
useEffect(() => {
  connectToInventory(inventoryChannel)
}, [])
```
</div>

**错误与修正：** 空 array 声称 setup 不依赖任何 reactive value，但 body 读取 `inventoryChannel`。它会永久连接 initial snapshot。应加入 dependency，或重构 effect 使其不再读取该值；不能删除 lint warning 对应的 dependency。

**为什么会得到这个结果：** Effect closure不会自动读取latest render；dependency comparison告诉React旧closure何时不再代表current UI。声明channel后，React才会stop捕获old channel的过程并start捕获next channel的过程。

**对比情况：** `[inventoryChannel]`随channel变化重新同步；`[]`只适合没有变化reactive reads的setup；省略第二参数则每次commit都重新同步。三种写法语义不同，不是性能等级开关。

**常见错误为什么错：** 为消除warning删除dependency违反“dependencies由Effect代码中的reactive reads决定”；把每次render新建的object直接作为dependency又可能违反“先稳定/移除不必要object dependency”的设计要求。

**如何识别类似错误：** 看到Hooks lint的missing dependency、外部connection仍使用旧ID、Effect频繁断开重连时，分别核对遗漏reactive read和不稳定object/function identity，而不是先disable规则。

**与 SellerHub 的关系：** product search query、selected shop、order ID和subscription channel改变时，旧request/subscription必须cleanup；theme-independent listener则可能合法使用空array。

**与当前学习路径的关系：** 本节把第4章render snapshot与JavaScript closure连接到Effect lifecycle，是理解async race、autosave和后续custom Hook dependencies的核心桥梁。

**最终记忆模型：** dependency array不是“我希望何时运行”，而是“这次同步过程读取了哪些可能变化的render values”。

### 9.7 stale closure

**本节解决的问题：** timer、promise callback 或 subscription callback 在稍后执行时，为什么仍读到创建它时的旧 state？本节把问题还原为 JavaScript closure 与 React render snapshot，而不是把它误判成 timer 或 React 更新失败。

**新关键字和新概念：** `lexical closure` 保留 function 创建位置可见的 bindings；`stale closure` 是 callback 所属 snapshot 已不再是 current UI snapshot；`functional updater` 把 transition function交给 React，让 React 提供 update queue 中的 current state。

**边界：JavaScript runtime / React framework / browser platform / TypeScript type system / tooling：** JavaScript runtime 决定 closure 读取哪个 binding；React 每次 render 创建新的 state snapshot，并在调用 functional updater 时提供 current queued value；browser timer 只负责稍后调用 callback；TypeScript 可确认 updater 参数为 number，却不会检测语义上的 stale read；Hooks lint 通过 dependency analysis 能发现部分 stale closure，但 functional updater 是否合适仍取决于业务机制。

**底层机制：** `setElapsedSeconds(elapsedSeconds + 1)` 会把 setup render 的 number 固化进 interval closure；若初始值为 0，每次 tick 都请求 1。改成 `setElapsedSeconds(currentSeconds => currentSeconds + 1)` 后，closure 不再读取 `elapsedSeconds`，React 在处理每次 queued update 时传入当时的 current value。

**API / 语法规则：** 本节没有新 API，重点是职责边界和运行时机制。functional updater 适合“next state 只依赖 previous state”的 transition；若 effect 的 external synchronization 确实读取某 prop/state，则应声明 dependency，不能用 updater 或 ref 隐藏真实关系。

**固定属性名 / 固定方法名 / 参数签名：** state setter 接受 `nextState` 或 `(previousState) => nextState`；本例 updater 是 `(currentSeconds: number) => number`。`setInterval(callback, delay)` 只负责调度 callback，不会为 callback 刷新 lexical environment。

**示例代码：** 真实练习使用 functional updater；错误 snippet 使用 initial render 的 `elapsedSeconds`，用于对比两个 callback 的 data source。

**技术意义：** stale closure 是 JavaScript lexical closure 的正常结果，不是 React 偷偷缓存变量。每次 render 的 callback 都看到创建它的那次 bindings。

**结论：** 若 interval 只需要根据 previous state 计算 next state，functional updater 可移除对某个 snapshot value 的读取。若外部同步本身依赖 reactive value，则应声明 dependency，而不是一律用 ref 隐藏。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/07-stale-closure/stale-closure-interval.tsx</span></div>

```tsx
import { useEffect, useState } from 'react'

export function StaleClosureInterval() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setElapsedSeconds((currentSeconds) => currentSeconds + 1)
    }, 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <section className="practice-card">
      <p className="practice-label">Closure boundary</p>
      <h3>Read previous state in the updater</h3>
      <p>Mounted for {elapsedSeconds} seconds.</p>
      <button onClick={() => setElapsedSeconds(0)}>Reset visible counter</button>
    </section>
  )
}
```
</div>

**逐行解释：** setup 创建一个 browser interval；callback 不读取 `elapsedSeconds`，只把 updater function 交给 React；React 调 updater 时提供最新 pending state；cleanup 用 interval ID 停止 process。

**执行过程：** 每秒 timer queue updater；React 以 current state 调 updater并 render。Reset 与 tick 相邻时，React 按 update queue 顺序计算，不依赖 interval 创建时的 0。

**变量与引用变化：** interval callback closure 保留 setter，但 setter identity 稳定；每次 updater parameter 是 React 传入的 current queued value。

**为什么得到结果：** callback 描述 state transition，而不是读取 setup render 的 stale number。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: stale interval closure</span></div>

```tsx
useEffect(() => {
  const intervalId = window.setInterval(() => {
    setElapsedSeconds(elapsedSeconds + 1)
  }, 1000)
  return () => window.clearInterval(intervalId)
}, [])
```
</div>

**错误与修正：** setup 的 closure 永远看到 initial `elapsedSeconds`，所以重复 queue 1。这里使用 functional updater；若 callback 的外部过程确实需要某个最新 prop，则应重新设计 dependencies 或采用官方“separate events from effects”模式，而不是机械套用 updater。

**为什么会得到这个结果：** stale callback没有被JavaScript改写；它正确读取自己创建时的0。functional updater改变了data flow：timer callback不再读取old snapshot，而是在React处理queue时接收current state。

**对比情况：** `setCount(count + 1)`依赖closure中的count；`setCount(current => current + 1)`依赖React提供的current queued value；把count放dependency会每次tick重建interval，语义虽可工作但引入不必要process churn。

**常见错误为什么错：** 对所有stale问题都改用ref违反“不要隐藏真实reactive dependency”；盲目添加空array违反“closure读取的变化值必须声明或重构”；盲目把count加dependency又可能忽略更合适的functional transition。

**如何识别类似错误：** timer值卡住、async log总是initial prop、subscription callback使用旧filter时，定位callback创建于哪次render，并列出它读取的bindings；再判断应重新同步、用functional updater还是分离event logic。

**与 SellerHub 的关系：** checkout autosave timer、order polling counter、delayed toast和search request completion都可能捕获旧draft/query/status；解决方案取决于外部过程是否应随值变化重建。

**与当前学习路径的关系：** 本节直接复用第4章state snapshot、batching和functional updater，并为9.10 async obsolete result解释为什么每次Effect有独立closure。

**最终记忆模型：** closure不会“变旧”，它始终属于创建它的render；真正问题是旧callback是否仍被允许代表current UI。

### 9.8 timer cleanup 与 Strict Mode

**本节解决的问题：** timer 由 browser 持有，component unmount 不会自动停止它；开发环境 Strict Mode 又会额外执行 setup/cleanup 来暴露不对称过程。本节解决如何让 timer lifetime 与 owner component lifetime 一致。

**新关键字和新概念：** `timer handle` 是 browser 返回的 process identifier；`resource lifetime` 是 timer 从创建到清除的时间区间；`Strict Mode stress-test` 是 development-only 的额外 setup → cleanup → setup，用来验证 cleanup 是否完整。

**边界：JavaScript runtime / React framework / browser platform / TypeScript type system / tooling：** JavaScript callback 执行 state updater；React 安排 Effect lifecycle，并在 Strict Mode 中执行额外测试周期；browser 创建 interval、分配 ID、定期调用 callback；TypeScript 根据 `window.setInterval` 推导 handle；tooling 不会替你清 timer，但 lint 能检查 Effect 结构与 dependencies。

**底层机制：** child commit 后 setup 取得 interval ID；每次 tick 只是 browser callback。parent 切换 conditional branch 后 React unmount child并调用 cleanup，cleanup 把同一 ID 传给 browser。再次 mount 是全新 component instance、hook cells 与 interval process。

**API / 语法规则：** 创建持续 timer 后必须在 cleanup 中调用匹配的 clear method。不要用 ref flag 阻止 Strict Mode 的第二次 setup；应让 setup → cleanup → setup 与 production 的单次 setup 对用户产生等价结果。

**固定属性名 / 固定方法名 / 参数签名：** `window.setInterval(callback, delay)` 返回 interval ID；`window.clearInterval(intervalId)` 停止它；Effect cleanup 是无参数 function并返回 `void`。

**示例代码：** `InventoryPollingProcess` 自己拥有 timer；parent 通过 mount/unmount 显示 cleanup 是否真正停止旧 process。

**技术意义：** timer 是 browser 持有的持续 process。移除 React component 不会自动取消 timer；cleanup 才把 process lifetime 和 owner lifetime 对齐。

**结论：** setup 创建 timer，cleanup 传回同一 timer ID。Strict Mode 开发环境额外执行一次 setup/cleanup/setup 是 stress-test，不是“effect 无故坏了”。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/08-timer-cleanup/timer-cleanup.tsx</span></div>

```tsx
import { useEffect, useState } from 'react'

function InventoryPollingProcess() {
  const [pollCount, setPollCount] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPollCount((currentCount) => currentCount + 1)
    }, 1500)
    return () => window.clearInterval(intervalId)
  }, [])

  return <p>Completed polling cycles: {pollCount}</p>
}

export function TimerCleanup() {
  const [isPollingVisible, setIsPollingVisible] = useState(true)

  return (
    <section className="practice-card">
      <p className="practice-label">Timer cleanup</p>
      <h3>Stop a process when its owner leaves</h3>
      <button onClick={() => setIsPollingVisible((currentValue) => !currentValue)}>
        {isPollingVisible ? 'Unmount polling process' : 'Mount polling process'}
      </button>
      {isPollingVisible ? <InventoryPollingProcess /> : <p>Polling process is unmounted.</p>}
    </section>
  )
}
```
</div>

**逐行解释：** child owns interval 与 count；parent 只控制 child 是否存在；conditional branch 变为 false 时 React unmount child，调用其 effect cleanup。

**执行过程：** mount 后 interval tick；点击 unmount 后 cleanup 清除 ID；再次 mount 是新 component instance、新 state 与新 interval。

**变量与引用变化：** 每次 mount 都有独立 hook cells 和 interval ID。旧 ID 被清除后不会继续 queue updates。

**为什么得到结果：** cleanup 撤销 setup 创建的 browser process，使开发 stress-test 和真实 unmount 都不泄漏 timer。

**错误与修正：** 只把 interval ID 存下来但不 `clearInterval` 仍会泄漏。Strict Mode 出现两个 setup log 时不要用 ref flag 阻止第二次 setup；应补全 cleanup。

**为什么会得到这个结果：** interval属于browser process，不属于React tree。只有cleanup把setup返回的ID交回browser，旧callback才停止；Strict Mode额外周期只是更早暴露缺失cleanup。

**对比情况：** 正确Effect在development经历setup → cleanup → setup后仍只有一个active interval；缺少cleanup时两个interval并存，count增长加倍，之后每次remount还会继续累积。

**常见错误为什么错：** 认为“production只setup一次所以不用cleanup”违反resource lifetime规则；用ref guard跳过第二次setup掩盖bug，也无法解决真实unmount/remount泄漏。

**如何识别类似错误：** development中tick翻倍、关闭panel后network/timer仍运行、重新打开后频率增加时，检查是否保存正确ID并在cleanup调用匹配的clear method。

**与 SellerHub 的关系：** order status refresh placeholder、autosave debounce、local success message timer都必须在筛选条件变化、页面离开或component unmount时停止旧timer。

**与当前学习路径的关系：** 本节把9.5的通用setup/cleanup应用到timer，并用Strict Mode验证模型，为9.10 async cleanup建立resource lifetime直觉。

**最终记忆模型：** timer由browser持有，Effect owner用ID结束它；Strict Mode不是重复bug的原因，而是缺失cleanup的检测器。

### 9.9 document title 同步

**本节解决的问题：** dashboard 页面希望 browser tab title 持续反映当前 open order count，但 title 不属于 React JSX tree。本节解决如何把 committed state 同步到 document，并在 owner 离开时恢复先前外部值。

**新关键字和新概念：** `external document state` 是 React tree 外的 browser state；`restore cleanup` 不只是停止 process，还可以撤销 property write；`single owner` 表示同一时段应避免多个 component 竞争同一 global property。

**边界：JavaScript runtime / React framework / browser platform / TypeScript type system / tooling：** JavaScript 执行 string interpolation 和 property assignment；React 根据 count dependency 安排重新同步；browser 实现 `Document.title` 并更新 tab/title element；TypeScript 从 DOM library 得知 title 是 string；tooling 检查 Effect dependency，但不能自动发现多个 title owners 的业务冲突。

**底层机制：** 每次 setup 先读取当时的 external title，再写 current count。count 变化时旧 cleanup 先恢复旧值，新 setup 再以 next snapshot 接管 title。unmount 时最后 cleanup 归还 component 接管前的值。

**API / 语法规则：** `document.title` 可读可写；对 committed state 的持续同步放 Effect，不在 render 中 assignment。若 application 已有统一 title manager，应让唯一 owner 管理，避免每个 card 独立覆盖。

**固定属性名 / 固定方法名 / 参数签名：** browser property 固定为 `document.title`，value 必须是 string；本例 Effect dependencies 固定为 `[openOrderCount]`。本节没有新的 React Hook，继续使用 `useEffect(setup, dependencies)`。

**示例代码：** 真实练习保存 `previousTitle`，同步 `Orders (count)`，并由 cleanup 恢复。

**技术意义：** `document.title` 是 browser document property，不是 JSX output。它应随 committed React state 同步，并在 owner 离开时恢复先前值。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/09-document-title-sync/document-title-sync.tsx</span></div>

```tsx
import { useEffect, useState } from 'react'

export function DocumentTitleSync() {
  const [openOrderCount, setOpenOrderCount] = useState(3)

  useEffect(() => {
    const previousTitle = document.title
    document.title = `Orders (${openOrderCount})`
    return () => {
      document.title = previousTitle
    }
  }, [openOrderCount])

  return (
    <section className="practice-card">
      <p className="practice-label">Document synchronization</p>
      <h3>Keep the browser tab title current</h3>
      <p>Open orders: {openOrderCount}</p>
      <div className="button-row">
        <button onClick={() => setOpenOrderCount((currentCount) => currentCount + 1)}>
          Add order
        </button>
        <button onClick={() => setOpenOrderCount((currentCount) => Math.max(0, currentCount - 1))}>
          Resolve order
        </button>
      </div>
    </section>
  )
}
```
</div>

**逐行解释：** setup 先保存外部系统旧值，再写 current count；cleanup 恢复本次 setup 观察到的旧 title；dependency 表明 count 变化需重新同步。

**执行过程：** count update 后 React commit paragraph；旧 cleanup 恢复前一 title；新 setup 写 next title。unmount 时最后 cleanup 恢复 owner 接管前的 title。

**变量与引用变化：** 每次 effect closure 有自己的 `previousTitle` 和 `openOrderCount`；`document` 是稳定 global object，其 `title` string property 改变。

**为什么得到结果：** title 的外部状态 lifetime 与 component 同步过程一致。

**错误与修正：** render 中直接赋值会在未 commit 的 render 改 browser。只由明确 click 临时改变一次的 title 则应重新评估是否真需要持续同步。

**为什么会得到这个结果：** Effect只在commit后接管title，dependency变化时先归还旧值再写next值，因此browser tab与已确认UI保持一致；render被放弃时不会提前改title。

**对比情况：** render assignment每次component invocation都执行；Effect同步只对应committed snapshot；event handler中的一次title写入则只适合明确interaction command，不表达持续一致性。

**常见错误为什么错：** 在render写 `document.title` 违反purity；多个component同时写title违反single-owner原则；cleanup固定写死某标题可能覆盖进入本页面前由其他owner设置的值。

**如何识别类似错误：** title闪烁、离开页面后未恢复、不同card互相覆盖时，检查是否有多个owners、是否保存previous value、dependency是否对应title真正读取的数据。

**与 SellerHub 的关系：** seller dashboard可显示open orders或pending tasks；product editor可显示draft name。真实应用通常由route/page-level owner统一管理，而不是每个leaf component直接写title。

**与当前学习路径的关系：** 本节把Effect模型应用到最小browser property，让学习者在进入router/page metadata前先理解React state与global document的边界。

**最终记忆模型：** `document.title`是外部global state；page owner在Effect中接管、随dependency重新同步，并在cleanup归还。

### 9.10 async effect 的 abort 或 ignore

**本节解决的问题：** query A 的异步任务可能晚于 query B 完成，旧 completion 因而覆盖新 UI。cleanup 能在 dependency change 时宣布旧 process 失效，但必须明确“取消底层工作”和“忽略过期结果”是两个相关而不同的防线。

**新关键字和新概念：** `race condition` 表示多个 operation completion order 不受启动顺序保证；`obsolete result` 是不再匹配 current criteria 的结果；`abort` 请求支持 signal 的外部 operation 停止；`ignore flag` 阻止旧 closure commit result；`request identity` 可进一步确认 completion 是否仍属于 latest process。

**边界：JavaScript runtime / React framework / browser platform / TypeScript type system / tooling：** JavaScript event loop 在未来运行 timer/promise callback，closure 保留各自 query 与 ignore binding；React 在 query change 后先 cleanup旧 Effect，再 setup新 Effect，并处理 completion 产生的 state update；browser 提供 timer 与 `AbortController`/`AbortSignal`；TypeScript 检查 status union、string array 和 controller APIs，但不会验证 response freshness；tooling 检查 query dependency，无法替代 runtime race guard。

**底层机制：** 每次 setup 创建独立 ignore binding和 timeout ID。next query commit 后，old cleanup 把旧 binding 设为 true并 clear timer；若真实 async chain 已进入无法取消的后续阶段，旧 callback仍可完成，但 `if (!ignore)` 会拒绝 state update。新 setup 的 ignore 仍为 false，因此只有 latest process有写 UI 的权限。

**API / 语法规则：** 支持 signal 的 operation 使用 `const controller = new AbortController()`、传入 `controller.signal`，cleanup 调 `controller.abort()`；无论是否 abort，都要评估 completion 后的 async steps 是否仍需 ignore/request-ID guard。不要把 async function 直接作为 Effect setup，因为 setup 不能返回 Promise 作为 cleanup。

**固定属性名 / 固定方法名 / 参数签名：** `AbortController` 固定 property 是 `signal`，固定 method 是 `abort(reason?)`；timer 使用 `setTimeout(callback, delay)` / `clearTimeout(id)`；Effect setup 返回 cleanup function，不返回 Promise。本例 handler 类型是 `ChangeEvent<HTMLInputElement>`。

**示例代码：** 真实练习用 `ignore + clearTimeout` 模拟 obsolete result 防护；最终项目再组合 `AbortController + requestSequenceRef` 展示双重保护，但本节不扩大项目代码。

**技术意义：** promise 或 timer completion 顺序不一定等于启动顺序。cleanup 不能让已经发生的网络响应“倒流”，但可以取消支持 abort 的 operation，并阻止 obsolete completion 更新 UI。

**结论：** 每次 setup 拥有自己的 ignore flag / controller。dependencies 变化时，cleanup 标记旧 process 无效；只有当前 process 可以 commit result。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/10-async-effect-cleanup/async-effect-cleanup.tsx</span></div>

```tsx
import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'

const productNames = ['Desk Lamp', 'Mechanical Keyboard', 'Monitor Stand', 'USB-C Hub']

export function AsyncEffectCleanup() {
  const [query, setQuery] = useState('desk')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [status, setStatus] = useState<'pending' | 'success'>('pending')

  useEffect(() => {
    let ignore = false
    const timeoutId = window.setTimeout(() => {
      const nextSuggestions = productNames.filter((productName) =>
        productName.toLowerCase().includes(query.toLowerCase()),
      )
      if (!ignore) {
        setSuggestions(nextSuggestions)
        setStatus('success')
      }
    }, query.length % 2 === 0 ? 700 : 300)

    return () => {
      ignore = true
      window.clearTimeout(timeoutId)
    }
  }, [query])

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.currentTarget.value)
    setStatus('pending')
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Async cleanup</p>
      <h3>Ignore an obsolete async result</h3>
      <label>
        Suggestion query
        <input onChange={handleQueryChange} value={query} />
      </label>
      <p>{status === 'pending' ? 'Loading suggestions...' : `${suggestions.length} matches`}</p>
    </section>
  )
}
```
</div>

**逐行解释：** 每次 setup 创建独立 `ignore` 与 timeout ID；callback 读取该 setup 的 query；cleanup 同时取消 timer 并使旧 callback 即便继续完成也不能 set state；handler 负责用户操作产生的 pending transition。

**执行过程：** 快速输入产生多次 render；每次 query change 先 cleanup previous timeout，再 setup next；只有最后未被忽略的 completion 写 suggestions。

**变量与引用变化：** 每个 closure 的 `query` 和 `ignore` 相互独立。cleanup mutation 的是该 closure 捕获的 boolean binding，不是 React state。

**为什么得到结果：** obsolete process 失去更新 UI 的权限，completion order 不再覆盖 current criteria。

**对比错误：** 只用 `AbortController` 取消 fetch 仍需考虑 fetch 后的异步链；官方文档建议明确 ignore obsolete result。真实 data layer 后续可由 TanStack Query 等管理，但本章不引入。

**为什么会得到这个结果：** 每次Effect closure拥有独立ignore binding；cleanup只把旧closure的binding设为true。无论completion顺序如何，只有未cleanup的latest closure能通过guard并queue state update。

**对比情况：** `clearTimeout`能阻止尚未触发的timer；`abort()`能通知支持signal的operation取消；ignore/request-ID guard控制completion是否有权写UI。三者解决的层级不同，可以组合而不是互相替代。

**常见错误为什么错：** async Effect不cleanup违反“旧process不得影响next snapshot”；只检查response arrival而不检查criteria identity违反current UI ownership；直接写 `useEffect(async () => ...)` 违反Effect setup只能返回cleanup或void的签名。

**如何识别类似错误：** 快速切换query后结果回退、loading状态与input不匹配、unmount后仍set state时，用人工延迟让旧请求更慢，并记录request criteria、cleanup和completion顺序。

**与 SellerHub 的关系：** product search、SKU lookup、shipping quote、seller dashboard refresh都可能发生race。引入TanStack Query前先掌握abort/ignore，之后才能理解data library替你管理了哪些lifecycle。

**与当前学习路径的关系：** 本节组合第5章loading/success branches、第6章controlled input、第7章dependency/closure/cleanup，形成后续真实data fetching的最小机制模型。

**最终记忆模型：** cleanup不能改写已经创建的旧closure；它要么取消旧工作，要么撤销旧completion写UI的资格，最好两者都做。

### 9.11 什么时候不需要 effect

**本节解决的问题：** 初学者容易把“值会随 state 改变”误解为“需要 effect 同步”，于是把 filter result、full name、total price 等 derived data存入第二份 state。本节解决如何先删除不必要 Effect，保持单一事实来源和一次 render。

**新关键字和新概念：** `derived data` 可完全由 current props/state 计算；`redundant state` 重复保存可推导事实；`cascading render` 是 commit 后 Effect set state造成的额外 render；`single source of truth` 表示只保存最小不可推导 state。

**边界：JavaScript runtime / React framework / browser platform / TypeScript type system / tooling：** JavaScript array `filter()` 在 component invocation 中同步计算新 array；React 用同一次 snapshot 计算并 commit input 与 result；browser 只显示 commit 后 DOM，不需要额外 external system；TypeScript 检查 array element和 state类型；tooling 可能报告 Effect 中同步 setState，但最重要的修复是删除 redundant state，而不是换一种 setState 写法。

**底层机制：** query setter请求 next render；next invocation 直接用 next query filter module-level array，结果与 input value属于同一个 snapshot并一次 commit。若用 Effect set `visibleNames`，第一次 commit仍携带旧 result，Effect 再 queue第二次 render，产生暂时不一致和额外工作。

**API / 语法规则：** 本节没有新 API，重点是职责边界和运行时机制。pure `filter`、`map`、string normalization 直接放 render；只有经测量证明确实昂贵时才在后续性能章节讨论 memoization，不能用 Effect 充当 calculation cache。

**固定属性名 / 固定方法名 / 参数签名：** `Array.prototype.filter(predicate)` 返回新 array且不应 mutation source；state setter只更新最小 input `query`。本节没有固定 React effect property需要添加。

**示例代码：** 真实练习只保存 query，错误 snippet 则用 `useEffect + useState` 镜像 `visibleNames`，用于比较 render 次数和一致性。

**技术意义：** effect 在 commit 后运行。若 effect 只是根据 state 计算另一份 state，会先 commit stale UI，再 queue 第二次 render，制造冗余状态和同步风险。

**结论：** 能从 current props/state 计算的值直接在 render 计算；用户点击后的 command 直接在 handler；只有 external synchronization 使用 effect。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/11-derived-data-without-effect/derived-data-without-effect.tsx</span></div>

```tsx
import { useState } from 'react'

const inventoryNames = ['Desk Lamp', 'Mechanical Keyboard', 'Monitor Stand', 'USB-C Hub']

export function DerivedDataWithoutEffect() {
  const [query, setQuery] = useState('')
  const visibleNames = inventoryNames.filter((inventoryName) =>
    inventoryName.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <section className="practice-card">
      <p className="practice-label">No effect required</p>
      <h3>Derive filtered results during render</h3>
      <label>
        Local filter
        <input onChange={(event) => setQuery(event.currentTarget.value)} value={query} />
      </label>
      <p>{visibleNames.join(', ') || 'No matching products'}</p>
    </section>
  )
}
```
</div>

**逐行解释：** query 是 minimal state；filter 是 pure array calculation；visible names 不存 state；JSX 立即读取同一 render 的 result。

**执行过程：** input change queue query；下一次 render 直接算 next array 并一次 commit input 与 result。

**变量与引用变化：** filter 每次创建新 array，但它只在当前 render 使用；没有第二个 state snapshot 可与 query 不一致。

**为什么得到结果：** derived value 与 source state 在同一个 calculation 中产生，不需要 after-commit synchronization。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Snippet: redundant derived state</span></div>

```tsx
const [visibleNames, setVisibleNames] = useState<string[]>([])

useEffect(() => {
  setVisibleNames(inventoryNames.filter((name) => name.includes(query)))
}, [query])
```
</div>

**错误与修正：** 这会额外 commit 一次旧 results，再 effect queue 新 results。删除 state 和 effect，在 render 计算；只有实际昂贵并经测量确认时才讨论 memoization。

**为什么会得到这个结果：** pure filter在next render直接读取next query，因此input和result来自同一snapshot；Effect版本必须等first commit后才set result，天然多出一轮stale commit和render。

**对比情况：** derived list、full name和subtotal直接计算；点击Buy后发request放handler；browser subscription、title或network synchronization才使用Effect。判断依据是data source和external system，不是代码是否“随着state变化”。

**常见错误为什么错：** 为derived data建立state违反single source of truth；Effect立即set state违反“Effect用于external synchronization而非普通数据转换”；为避免额外render改成ref又会让UI失去React更新来源。

**如何识别类似错误：** Effect body若只读取props/state、计算值、再调用本component setter，而且没有browser/network/widget/subscription等external system，优先尝试删除state与Effect并在render计算。

**与 SellerHub 的关系：** filtered products、checkout total、stock label、form completion percentage都通常是derived data；product search remote result、draft persistence才是external synchronization。

**与当前学习路径的关系：** 本节回收第5章filter/map和第6章form values，阻止第7章学习Effect后过度使用，为后续state architecture保持minimal state。

**最终记忆模型：** Effect不是“state A变化后计算B”的工具；能从current snapshot算出的B就在render算，只保存无法推导的最小state。

### 9.12 TypeScript ref 与 effect 类型

**本节解决的问题：** DOM node 在 commit 前为 null，browser timer handle 又与业务 number含义不同；本节解决如何让 type system准确表达 ref lifecycle、element-specific API 和 cleanup handle，而不把 compile-time annotation误当 runtime保证。

**新关键字和新概念：** `generic type argument` 指定 ref target；`DOM interface` 描述 element-specific methods；`nullable ref` 表达 node lifecycle；`ReturnType<typeof window.setTimeout>` 从实际 browser function推导 handle；`type erasure` 表示这些 annotations不进入 browser JavaScript。

**边界：JavaScript runtime / React framework / browser platform / TypeScript type system / tooling：** JavaScript runtime只看到普通 ref objects和 timer IDs；React维护 DOM ref assignment并调用 cleanup；browser实现 input node、focus 与 timer；TypeScript检查 null narrowing、event currentTarget和 handle；`tsc`/IDE在 compile time报告错误，Vite构建的 JavaScript不会进行类型验证。

**底层机制：** initial `inputRef.current` 是 null；commit 后 React写入 `HTMLInputElement`。timeout ref从 null变为 handle，后续输入先清旧 handle再写新 handle；cleanup读取同一 stable ref object中的latest handle。TypeScript通过 control-flow narrowing允许 null check后的 clear调用。

**API / 语法规则：** DOM ref写作 `useRef<HTMLInputElement>(null)`；timer ref写作 `useRef<ReturnType<typeof window.setTimeout> | null>(null)`；type-only import使用 `import type`。类型只描述边界，runtime仍必须 optional chaining/null check与cleanup。

**固定属性名 / 固定方法名 / 参数签名：** ref固定 property是 `current`；input event使用 `ChangeEvent<HTMLInputElement>`；timeout methods是 `window.setTimeout(callback, delay)` 与 `window.clearTimeout(handle)`；Effect cleanup返回 `void`。

**示例代码：** 真实练习同时展示 typed DOM ref、typed timer ref、event type和unmount cleanup。

**技术意义：** TypeScript 能限制 `current` 指向的 DOM interface、timer handle 和 event element，但不会创建 DOM、运行 cleanup 或在 runtime 阻止 null。

**结论：** DOM ref 使用具体 element generic 和 `null` initial value；timer ref 明确 handle 或 null；effect callback 返回 `void` 或 cleanup function，cleanup 本身应返回 `void`。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/12-typed-refs-effects/typed-refs-effects.tsx</span></div>

```tsx
import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'

export function TypedRefsEffects() {
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null)
  const [draftName, setDraftName] = useState('Desk Lamp')
  const [savedName, setSavedName] = useState('Desk Lamp')

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  function handleDraftChange(event: ChangeEvent<HTMLInputElement>): void {
    const nextName = event.currentTarget.value
    setDraftName(nextName)
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => {
      setSavedName(nextName)
    }, 500)
  }

  return (
    <section className="practice-card">
      <p className="practice-label">TypeScript boundary</p>
      <h3>Type DOM and timer refs explicitly</h3>
      <label>
        Draft product name
        <input ref={inputRef} onChange={handleDraftChange} value={draftName} />
      </label>
      <button onClick={() => inputRef.current?.focus()}>Focus typed input</button>
      <p>Last delayed save: {savedName || 'Empty draft'}</p>
    </section>
  )
}
```
</div>

**逐行解释：** `HTMLInputElement` 暴露 `focus()`；timer type 从 browser function 推导；cleanup null-check 后清理；typed change event 保证 `currentTarget.value` 是 string。

**执行过程：** 每次 input event 清旧 timeout、启动新 timeout；500ms 内继续输入会替换 ref handle；最后 callback 更新 saved state；unmount cleanup 清最后 handle。

**变量与引用变化：** DOM ref 与 timer ref 是两个稳定 object；它们的 `current` 分别指 node 与 numeric handle；state snapshots 驱动可见文本。

**为什么得到结果：** ref 保存不参与 render 的 external handles，state 保存需要显示的 values，各自职责明确。

**错误与修正：** 写成 `useRef<HTMLElement>(null)` 会丢失 input-specific type precision；省略 null boundary 会掩盖 commit 前 node 不存在。类型正确也不能代替 runtime cleanup。

**为什么会得到这个结果：** generic和DOM lib types让编译器知道 `focus()`、`value`和null boundary；runtime仍由React写node、browser返回timer handle、JavaScript执行cleanup。类型擦除后没有自动null check。

**对比情况：** `HTMLInputElement`保留input-specific API；宽泛 `HTMLElement`只能保证基础element API；错误的non-null assertion让编译通过但不改变initial null；`ReturnType`比手写不匹配environment的handle类型更稳妥。

**常见错误为什么错：** 过宽DOM type违反type precision；移除null违反真实lifecycle；把TypeScript annotation当runtime validation违反type erasure边界；cleanup遗漏则是runtime resource bug而非type bug。

**如何识别类似错误：** IDE提示method不存在时检查element interface；提示possibly null时检查commit timing；build通过但runtime仍崩溃时检查是否依赖non-null assertion或误以为type会生成guard。

**与 SellerHub 的关系：** search input、modal dialog、form field、timer handle和request status都应有具体类型，使组件边界可读，但external API response仍需后续runtime validation方案。

**与当前学习路径的关系：** 本节延续第2章TSX检查、第3章typed props、第6章typed events，把类型应用到第7章的DOM和Effect资源，不改变JavaScript runtime模型。

**最终记忆模型：** TypeScript描述ref和Effect资源“可能是什么”，React/browser决定它们“何时存在和如何变化”；静态类型不能代替runtime guard与cleanup。

### 9.13 SellerHub 场景映射

**本节解决的问题：** 学会 API 后仍可能在真实页面中不知道该选 render、handler、ref 还是 Effect。本节把前 12 节的机制映射到 SellerHub 场景，并要求先识别“触发原因、外部系统、owner、cleanup”再选工具。

**技术意义：** 场景映射防止把 Hook 名称当架构方案。同样是 focus，按钮点击后的 focus 属于 handler，modal committed appearance后的 focus属于 Effect；同样是 search，local filtering属于 render，remote request synchronization才进入 async Effect或后续data layer。

**新关键字和新概念：** `mechanism mapping` 是从业务事实反推技术层；`resource owner` 负责 setup/cleanup；`external-system boundary` 标记 React tree之外的 browser、network或subscription；`migration path` 表示以后引入 router/data library时仍保留现在的 ownership判断。

**边界：JavaScript runtime / React framework / browser platform / TypeScript type system / tooling：** JavaScript closure和async scheduling解释 handler/timer/request行为；React管理 render、state、refs与Effect lifecycle；browser提供focus、title、navigation event、timer；TypeScript描述SellerHub domain values与DOM/event类型；tooling验证Hook调用和dependencies，但不能替代场景owner设计。

**底层机制：** 对每个场景依次问：UI事实能否从current state计算；是否由某次interaction直接触发；是否存在需要在component可见期间持续同步的external system；哪个component创建resource；dependency change和unmount时怎样stop。答案决定逻辑位置，而不是先写 `useEffect` 再补理由。

**API / 语法规则：** 本节没有新 API，重点是职责边界和运行时机制。复用前文的 render calculation、event handler、`useRef`、`useEffect`、cleanup、dependency array与abort/ignore模式。

**固定属性名 / 固定方法名 / 参数签名：** 本节不新增固定名字。实际映射时继续遵守 `ref.current`、`useEffect(setup, dependencies?)`、`document.title`、`focus()`、timer clear methods和`AbortController.abort()`等已有契约。

**示例代码：** 本节不新增代码块，避免扩大最终项目；下表本身是机制选择练习，前文真实文件与最终项目提供可执行实现。

| SellerHub 场景 | 首选机制 | 原因 |
| --- | --- | --- |
| `ProductSearchInput` 的 Focus 按钮 | DOM ref + event handler | 明确由 click 触发。 |
| `FilterPanel` 打开后 focus | open state + effect + DOM ref | focus 由 panel committed appearance 触发。 |
| Checkout draft autosave | controlled state + timer/async effect cleanup | draft 变化需要同步外部 persistence。 |
| unsaved changes warning | effect subscription + cleanup | 订阅 browser navigation boundary。 |
| order status refresh placeholder | timer effect + cleanup | visible dashboard 拥有 polling process。 |
| dashboard document title | effect + dependency | tab title 持续匹配 current page facts。 |
| local success feedback timer | event handler starts command，cleanup 管 timer | 用户动作产生 feedback，owner 负责停止 timer。 |
| async product search | effect cleanup + abort/ignore | obsolete criteria 不应覆盖 current UI。 |
| modal focus management | DOM ref；必要时 effect | node 只有 modal commit 后存在。 |

本章只建立机制，不实现真实 API、modal system、router 或 data-fetching library。进入真实 SellerHub 时，先保留这里的 ownership 与 cleanup 模型，再把模拟外部系统替换为实际边界。

**逐行解释：** 本节没有新增source code；表格逐行把场景映射为mechanism。第一列给业务事实，第二列选择render/handler/ref/Effect组合，第三列说明选择依据，重点不是复制名称而是复现判断过程。

**执行过程：** 以FilterPanel为例：click handler先queue open state，React render并commit panel与input node，Effect观察open dependency后调用focus；panel关闭或unmount时cleanup结束对应external process。以local product filter为例则在render直接计算，不进入Effect。

**变量与引用变化：** query、open、draft和order status属于各自render snapshot；DOM ref的 `current` 随commit从null变node；timer/request refs跨render保留handle；每次Effect closure捕获本次criteria，cleanup结束该closure拥有的resource。

**为什么会得到这个结果：** 所有场景都可还原为同一组机制问题：是否可纯计算、是否由明确event触发、是否存在external system、resource由谁拥有、何时重新同步或cleanup。业务名称变化不会改变底层规则。

**对比情况：** local product filtering与remote product search看似同为search，前者是render calculation，后者涉及async external system；Focus按钮与modal autofocus看似同为focus，前者是event command，后者由committed appearance触发。

**常见错误为什么错：** 看到“会变化”就用Effect违反职责边界；把所有external logic集中到page-level大Effect违反“一项Effect描述一个独立同步过程”；提前引入data/form library会掩盖本章必须掌握的lifecycle机制。

**如何识别类似错误：** 为新SellerHub需求写代码前填写四项：trigger、current React inputs、external resource、cleanup。无法写出external resource时通常不需要Effect；无法写出cleanup时通常尚未明确owner。

**与 SellerHub 的关系：** 本节就是SellerHub迁移表，覆盖ProductSearchInput、FilterPanel、checkout draft、unsaved warning、order refresh、dashboard title、feedback timer、async search和modal focus。

**与当前学习路径的关系：** 它把第3章props owner、第4章state/events、第5章render branches、第6章forms与本章refs/effects组合起来，为后续router、data fetching、custom hooks和真实SellerHub页面奠定边界。

**最终记忆模型：** 先判断事实属于render、event还是external synchronization，再选择state/ref/Effect；API是结果，owner、cause、dependency与cleanup才是设计起点。

## 10. API / 语法索引

| API / 语法 | 作用 | 关键边界 |
| --- | --- | --- |
| `useRef(initialValue)` | 返回跨 render 稳定的 ref object | mutation 不触发 render。 |
| `ref.current` | 保存 mutable value 或 commit 后 DOM node | render 前 DOM ref 可能为 null。 |
| `<input ref={inputRef}>` | 让 React 管理 node assignment | 写入发生在 commit。 |
| `useEffect(setup, dependencies?)` | 声明 external synchronization | 返回 `undefined`。 |
| `return cleanup` | 停止或撤销当前 setup | dependency change 前、unmount 时运行。 |
| 无第二参数 | 每次 committed render 后重新同步 | 很少是最清晰选择。 |
| `[]` | setup 不读取会变化 reactive value | 开发 Strict Mode 仍会 stress-test。 |
| `[a, b]` | `a` 或 `b` 以 `Object.is` 比较变化时重新同步 | 必须覆盖所有 reactive reads。 |
| functional updater | 从 latest queued state 计算 next state | 可避免读取 stale snapshot。 |
| `AbortController` | 向支持的 async operation 发出 abort signal | 仍需防后续异步链过期结果。 |

## 11. 常见错误表

| 错误 | 根因 | 识别方式 | 修正 |
| --- | --- | --- | --- |
| render 中改 DOM / title / timer | 把计算阶段当 command 阶段 | re-render 次数改变外部结果 | 移到 handler 或 effect。 |
| `effect + state` 保存 derived data | 重复 source of truth | 先显示 stale UI 再 render | render 直接计算。 |
| click 业务逻辑放 effect | 丢失具体触发原因 | initial mount 也可能执行 | 放回 handler。 |
| 忘记 timer/subscription cleanup | 外部 process 不随 unmount 停止 | 重复 callback 或卸载后更新 | 返回对称 cleanup。 |
| effect 读变化值却写 `[]` | closure 固定 initial snapshot | hooks lint warning、旧值行为 | 声明 dependency 或重构。 |
| 为消 lint warning 删除 dependency | 对 React 隐瞒同步输入 | effect 不再匹配 UI | 修改 effect 代码，而非 suppress。 |
| 修改 ref 后期待 UI 更新 | ref mutation 不 queue render | console 值变、页面不变 | 可见值用 state。 |
| render 中直接 `ref.current.focus()` | DOM 未 commit 且 render 不纯 | null error 或重复 focus | handler / effect + null check。 |
| interval 读取旧 state | closure 捕获 setup snapshot | count 卡在同一值 | functional updater 或正确 dependency。 |
| DOM ref 类型过宽/缺 null | type model 不匹配 lifecycle | API 不可用或 unsafe assertion | 具体 DOM type + null boundary。 |
| async 旧结果覆盖新 query | completion race | UI criteria 与 result 不一致 | cleanup abort + ignore obsolete result。 |

## 12. 最终小项目

### 项目目标

`Seller Search Sync Workspace` 是 SellerHub product search 的本地机制练习。它不请求后端：local array filtering 代表纯 derived data；延迟同步代表尚未引入 data layer 前的外部 process；document title 代表 browser synchronization。

### 为什么适合本章

- `requestSequenceRef` 保存不参与 render 的 request sequence。
- `searchInputRef` 获取 DOM input，并由明确 click handler focus。
- browser dataset effect 与 simulated async effect 各自只负责一个同步过程。
- 两个 effect 都有 cleanup 和准确 dependencies。
- visible products 在 render 直接派生，不使用 effect。
- stale async closure 通过 controller、request ID 与 cleanup 失去更新权限。
- 所有 refs、props、domain objects 和 status 都有 TypeScript 类型。

### 最终小项目结构

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">最终小项目结构</span></div>

```txt
src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/
  seller-search-types.ts
  seller-search-data.ts
  seller-search-input.tsx
  seller-search-results.tsx
  seller-search-sync-workspace.tsx
  seller-search-sync-mini-project.css
```
</div>

### 文件职责

| 文件 | 职责 |
| --- | --- |
| `seller-search-types.ts` | domain category、product 与 sync status 类型。 |
| `seller-search-data.ts` | local typed product fixtures 与 category options。 |
| `seller-search-input.tsx` | controlled query/category 输入与 input ref 接线。 |
| `seller-search-results.tsx` | 根据 props 渲染 status、empty 或 product list。 |
| `seller-search-sync-workspace.tsx` | state owner、derived filter、refs、effects 与 handlers。 |
| `seller-search-sync-mini-project.css` | 最终项目独立布局与视觉状态。 |

### 完整代码

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-types.ts</span></div>

```ts
export type SellerProductCategory = 'all' | 'accessories' | 'lighting' | 'workspace'

export type SellerProduct = {
  id: string
  name: string
  category: Exclude<SellerProductCategory, 'all'>
  price: number
  stock: number
}

export type SearchSyncStatus = 'pending' | 'success'
```
</div>

**逐行解释：** category union 同时服务 select 与 product category；`Exclude` 禁止真实 product 使用 filter-only 的 `all`；status union 只允许本项目存在的同步阶段。

**执行与类型边界：** 这些声明只参与 compile time，emit 后不存在。运行时 product object 仍是普通 JavaScript object，外部数据不会被这些类型自动验证。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-data.ts</span></div>

```ts
import type { SellerProduct, SellerProductCategory } from './seller-search-types'

export const sellerProductCategories: SellerProductCategory[] = [
  'all',
  'accessories',
  'lighting',
  'workspace',
]

export const sellerProducts: SellerProduct[] = [
  {
    id: 'product-keyboard',
    name: 'Mechanical Keyboard',
    category: 'accessories',
    price: 89,
    stock: 24,
  },
  {
    id: 'product-hub',
    name: 'USB-C Hub',
    category: 'accessories',
    price: 54,
    stock: 11,
  },
  {
    id: 'product-lamp',
    name: 'Adjustable Desk Lamp',
    category: 'lighting',
    price: 42,
    stock: 8,
  },
  {
    id: 'product-stand',
    name: 'Aluminum Monitor Stand',
    category: 'workspace',
    price: 68,
    stock: 16,
  },
]
```
</div>

**逐行解释：** type-only import 不产生 runtime dependency；两个 exported arrays 是 module-level stable values；domain IDs 为 list keys 提供稳定 identity。

**执行过程与引用变化：** module 首次加载创建 arrays，后续 renders 复用它们；filter 会创建新 result array，但不会 mutation fixtures。

**为什么得到结果：** stable module data 不是 reactive value，effects 不需要把它列为 dependency；真实 API 数据以后仍应进入明确 state/data layer。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-input.tsx</span></div>

```tsx
import type { ChangeEvent, RefObject } from 'react'
import type { SellerProductCategory } from './seller-search-types'
import { sellerProductCategories } from './seller-search-data'

type SellerSearchInputProps = {
  category: SellerProductCategory
  inputRef: RefObject<HTMLInputElement | null>
  onCategoryChange: (category: SellerProductCategory) => void
  onQueryChange: (query: string) => void
  query: string
}

export function SellerSearchInput({
  category,
  inputRef,
  onCategoryChange,
  onQueryChange,
  query,
}: SellerSearchInputProps) {
  function handleQueryChange(event: ChangeEvent<HTMLInputElement>): void {
    onQueryChange(event.currentTarget.value)
  }

  return (
    <div className="seller-search-controls">
      <label>
        Product query
        <input
          onChange={handleQueryChange}
          placeholder="Search product names"
          ref={inputRef}
          value={query}
        />
      </label>

      <label>
        Category
        <select
          onChange={(event) =>
            onCategoryChange(event.currentTarget.value as SellerProductCategory)
          }
          value={category}
        >
          {sellerProductCategories.map((categoryOption) => (
            <option key={categoryOption} value={categoryOption}>
              {categoryOption}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
```
</div>

**逐行解释：** props 把 state ownership 留在 parent；`RefObject<HTMLInputElement | null>` 明确 commit 前后 boundary；typed handler 从 input 读取 string；select cast 把 DOM string 收窄到已知 options。

**执行过程：** parent render 传 values、callbacks 与 ref object；commit 时 React 把 input node 放进该 ref；change event 调 child adapter，再调用 parent handler。

**变量与引用变化：** child 不修改 props object；ref object 是 parent 与 React 共同连接 DOM identity 的稳定引用。

**错误与修正：** 不要在 child render 中调用 focus；也不要把 uncontrolled DOM value 当作 parent state。当前 controlled values 始终由 parent snapshot 提供。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-results.tsx</span></div>

```tsx
import type { SearchSyncStatus, SellerProduct } from './seller-search-types'

type SellerSearchResultsProps = {
  products: SellerProduct[]
  status: SearchSyncStatus
  syncedCriteria: string
}

export function SellerSearchResults({
  products,
  status,
  syncedCriteria,
}: SellerSearchResultsProps) {
  return (
    <section aria-labelledby="seller-search-results-title" className="seller-search-results">
      <div className="seller-search-results-heading">
        <div>
          <p className="project-eyebrow">Derived during render</p>
          <h3 id="seller-search-results-title">Visible inventory</h3>
        </div>
        <span className={`sync-badge sync-badge-${status}`}>
          {status === 'pending' ? 'Syncing' : 'Synchronized'}
        </span>
      </div>

      <p className="sync-summary">
        Last external sync: {syncedCriteria || 'Waiting for the first result'}
      </p>

      {products.length === 0 ? (
        <p className="seller-search-empty">No products match the current render inputs.</p>
      ) : (
        <ul className="seller-product-list">
          {products.map((product) => (
            <li key={product.id}>
              <div>
                <strong>{product.name}</strong>
                <span>{product.category}</span>
              </div>
              <div className="seller-product-metrics">
                <span>${product.price}</span>
                <span>{product.stock} in stock</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
```
</div>

**逐行解释：** component 只读 typed props；status union 选择 label/class；empty branch 与 success list 清晰分离；domain ID 是 key。

**执行过程：** parent 每次 render 先派生 products，再调用 results component；该 component 纯计算 JSX，不启动请求或复制 state。

**变量与引用变化：** `products` array 可能每次 render 都是新引用，但它只参与 render；没有 effect 因 array identity 重跑。

**为什么得到结果：** presentation component 不拥有 synchronization，因而容易预测与复用。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-sync-workspace.tsx</span></div>

```tsx
import { useEffect, useRef, useState } from 'react'
import { sellerProducts } from './seller-search-data'
import { SellerSearchInput } from './seller-search-input'
import { SellerSearchResults } from './seller-search-results'
import type { SearchSyncStatus, SellerProductCategory } from './seller-search-types'
import './seller-search-sync-mini-project.css'

export function SellerSearchSyncWorkspace() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<SellerProductCategory>('all')
  const [searchStatus, setSearchStatus] = useState<SearchSyncStatus>('pending')
  const [syncedCriteria, setSyncedCriteria] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const requestSequenceRef = useRef(0)

  const normalizedQuery = query.trim().toLowerCase()
  const visibleProducts = sellerProducts.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(normalizedQuery)
    const matchesCategory = category === 'all' || product.category === category
    return matchesQuery && matchesCategory
  })

  useEffect(() => {
    document.body.dataset.sellerSearchResultCount = String(visibleProducts.length)

    return () => {
      delete document.body.dataset.sellerSearchResultCount
    }
  }, [visibleProducts.length])

  useEffect(() => {
    const requestId = requestSequenceRef.current + 1
    requestSequenceRef.current = requestId
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => {
      if (!controller.signal.aborted && requestId === requestSequenceRef.current) {
        const criteria = `${query || 'all names'} / ${category}`
        setSyncedCriteria(criteria)
        setSearchStatus('success')
      }
    }, 550)

    return () => {
      controller.abort()
      window.clearTimeout(timeoutId)
    }
  }, [category, query])

  function handleQueryChange(nextQuery: string): void {
    setQuery(nextQuery)
    setSearchStatus('pending')
  }

  function handleCategoryChange(nextCategory: SellerProductCategory): void {
    setCategory(nextCategory)
    setSearchStatus('pending')
  }

  return (
    <section className="seller-search-project" aria-labelledby="seller-search-project-title">
      <header className="seller-search-project-header">
        <div>
          <p className="project-eyebrow">SellerHub learning connection</p>
          <h2 id="seller-search-project-title">Seller Search Sync Workspace</h2>
          <p>
            Keep local derived results separate from browser and asynchronous synchronization.
          </p>
        </div>
        <button onClick={() => searchInputRef.current?.focus()}>Focus product search</button>
      </header>

      <SellerSearchInput
        category={category}
        inputRef={searchInputRef}
        onCategoryChange={handleCategoryChange}
        onQueryChange={handleQueryChange}
        query={query}
      />

      <SellerSearchResults
        products={visibleProducts}
        status={searchStatus}
        syncedCriteria={syncedCriteria}
      />
    </section>
  )
}
```
</div>

**逐行解释：** 四个 states 分别表达 input 与 external sync feedback；两个 refs 分别保存 DOM identity 与 non-render request sequence；filter 在 render 计算；两个 effects 分开同步 browser dataset 与 simulated request；handlers 保留用户操作语义。

**执行过程：** 输入先由 handler queue query/pending；React render 立即得到 local filtered list并 commit；old async cleanup abort/clear；next setup 启动 delay；current completion 更新 synced criteria/status；第二次 render 显示 success。

**变量与引用变化：** query/category 是 snapshot；visibleProducts 是每次 render 新 array；dataset effect 只依赖 primitive length；request ref object identity 稳定，`current` 递增但不 render；每个 controller 与 timeout ID 只属于一次 setup。

**为什么得到结果：** local filtering 是 UI calculation，所以立即更新；simulated external sync 是 after-commit process，所以独立显示 pending/success。旧 process 同时被 abort、clear，并通过 sequence guard 失去写权限。

**stale closure 对比：** 若 timeout callback 没有 cleanup 和 request guard，旧 query closure 可能在新 query 后完成并覆盖 `syncedCriteria`。这里不试图让旧 closure“自动变新”，而是明确宣布旧 process obsolete。

**常见错误与修正：** 不要把 `visibleProducts` 存 state 并用 effect 更新；不要把整个新 array 放进 title dependencies；不要在 render 中递增 request ref；不要省略 query/category dependency。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">src/learning/react/chapter-07-effects-and-refs/seller-search-sync-mini-project/seller-search-sync-mini-project.css</span></div>

```css
.seller-search-project {
  margin-top: 56px;
  padding: 30px;
  color: #172033;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: #ffffff;
}

.seller-search-project-header,
.seller-search-results-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.seller-search-project-header h2,
.seller-search-results-heading h3 {
  margin: 6px 0 0;
}

.seller-search-project-header > div > p:last-child {
  max-width: 680px;
  color: #526077;
  line-height: 1.6;
}

.seller-search-project button {
  padding: 10px 14px;
  color: #ffffff;
  border: 1px solid #0f766e;
  border-radius: 7px;
  background: #0f766e;
  font-weight: 800;
  cursor: pointer;
}

.seller-search-controls {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(180px, 1fr);
  gap: 16px;
  margin-top: 28px;
}

.seller-search-controls label {
  display: grid;
  gap: 7px;
  color: #344054;
  font-size: 0.9rem;
  font-weight: 800;
}

.seller-search-controls input,
.seller-search-controls select {
  width: 100%;
  box-sizing: border-box;
  padding: 11px 12px;
  color: #172033;
  border: 1px solid #94a3b8;
  border-radius: 7px;
  background: #ffffff;
}

.seller-search-results {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #d8dee9;
}

.sync-badge {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 850;
}

.sync-badge-pending {
  color: #92400e;
  background: #fef3c7;
}

.sync-badge-success {
  color: #166534;
  background: #dcfce7;
}

.sync-summary,
.seller-search-empty {
  color: #667085;
}

.seller-product-list {
  display: grid;
  gap: 10px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.seller-product-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border: 1px solid #d8dee9;
  border-radius: 7px;
  background: #f8fafc;
}

.seller-product-list li > div {
  display: grid;
  gap: 4px;
}

.seller-product-list span {
  color: #667085;
  font-size: 0.88rem;
}

.seller-product-metrics {
  justify-items: end;
}

@media (max-width: 680px) {
  .seller-search-project {
    padding: 22px;
  }

  .seller-search-project-header,
  .seller-search-results-heading,
  .seller-product-list li {
    align-items: stretch;
    flex-direction: column;
  }

  .seller-search-controls {
    grid-template-columns: 1fr;
  }

  .seller-product-metrics {
    justify-items: start;
  }
}
```
</div>

**逐行解释：** project、controls、results 与 list 使用独立 classes；pending/success 视觉状态来自 typed status；media query 在窄屏改为单列。

**执行与引用变化：** CSS 由 Vite bundle 后交给 browser style engine；它不参与 React state、effect dependencies 或 TypeScript runtime。

### 运行方式

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Terminal</span></div>

```bash
npm run dev
```
</div>

1. 点击 `Focus product search`，确认 input 获取 focus。
2. 快速输入多个 query，确认 local list 立即变化，sync badge 先 pending 后 success。
3. 切换 category，确认 old delayed process 不覆盖 latest criteria。
4. 在 DevTools 中观察 `document.body.dataset.sellerSearchResultCount`。

### 预期输出或交互结果

- focus 按钮通过 DOM ref 聚焦 input，不改变 query state。
- list 来自 current query/category 的 render-time filter。
- delayed status 只接受 latest criteria completion。
- body dataset 始终保存当前可见数量；离开项目 owner 时 cleanup 删除该字段。

### 核心执行流程

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">最终小项目执行流程</span></div>

```txt
user input event
  -> handler queues query/category and pending state
  -> render derives visible products
  -> commit updates controlled fields and list
  -> previous async cleanup aborts and clears timer
  -> next async setup starts for current criteria
  -> current completion queues success feedback
```
</div>

### 常见错误

- 把 `visibleProducts` 放 state：重复 source of truth。
- `useEffect(..., [])` 读取 query/category：固定 initial snapshot。
- 只 clear timer 不处理真实 fetch 后续链：过期 callback 仍可能写 UI。
- 用 ref 保存需要展示的 status：mutation 不 render。
- 在 render 调 `focus()` 或修改 browser dataset：破坏 purity。

### 可选扩展

只在后续章节扩展：真实 API、TanStack Query、route search params、modal focus trap、autosave persistence。扩展时保留 current ownership、cleanup 与 derived-data 边界。

## 13. 额外速查表

### 一句话概念总结

**render 只计算；event handler 响应具体意图；effect 同步 committed UI 与外部系统；ref 保存 React 不需要追踪渲染的 mutable identity/value。**

### 决策表

| 问题 | 是 | 否 |
| --- | --- | --- |
| 能从 current props/state 算出吗？ | render 计算 | 继续判断 |
| 由明确用户 event 触发吗？ | event handler | 继续判断 |
| 必须随 component visibility/current state 同步外部系统吗？ | effect | 普通 function/module logic |
| 值变化需要立即显示吗？ | state | 可考虑 ref |
| setup 启动持续 process 吗？ | 通常需要 cleanup | 检查是否仍需撤销外部写入 |

### dependencies 速查

| 写法 | 语义 |
| --- | --- |
| `useEffect(setup)` | 每次 committed render 后重新同步。 |
| `useEffect(setup, [])` | setup 不依赖会变化的 reactive value。 |
| `useEffect(setup, [query])` | query 变化时 stop old / start new。 |
| 删除 dependency | 不是优化，通常是 stale closure bug。 |
| object/function 每次新建 | identity 变化可能导致过度重新同步，应重构创建位置。 |

### 最小模板

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Template: external synchronization</span></div>

```tsx
useEffect(() => {
  const connection = connect(resourceId)

  return () => {
    connection.disconnect()
  }
}, [resourceId])
```
</div>

**逐行与执行过程：** setup 使用 current `resourceId` 建立 connection；dependency change 前 cleanup 断开旧 connection；next setup 连接新 resource；unmount 时执行最后 cleanup。

<div class="macos-code-window"><div class="macos-code-titlebar"><span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span><span class="macos-code-title">Template: typed DOM ref</span></div>

```tsx
const inputRef = useRef<HTMLInputElement>(null)

function handleFocus(): void {
  inputRef.current?.focus()
}
```
</div>

**逐行与执行过程：** generic 选择 input DOM interface；initial null 匹配 pre-commit；handler 在 event time 读取 current node并调用 browser focus。

### 不需要创建的概念 snippet

下列名称只标记概念片段、错误对比或模板，不用于交付验证记录：

| 名称 | 角色 | 状态 |
| --- | --- | --- |
| `Snippet: side effect during render` | render 错误对比 | 不创建 |
| `Snippet: missing dependency` | dependency 错误对比 | 不创建 |
| `Snippet: stale interval closure` | stale closure 错误对比 | 不创建 |
| `Snippet: redundant derived state` | redundant state 错误对比 | 不创建 |
| `Snippet: unsafe ref access` | DOM null boundary 提示 | 不创建 |
| `Template: external synchronization` | setup / cleanup 最小模板 | 不创建 |
| `Template: typed DOM ref` | typed DOM ref 最小模板 | 不创建 |

## 14. 工程迁移与代码审查要点

### Code review questions

- 这段 effect 是否真的同步外部系统，还是可以在 render 中计算？
- ref 保存的数据是否不需要触发 UI 更新？
- effect cleanup 是否覆盖组件卸载和依赖变化两种情况？

### Migration checks

- 迁移旧生命周期代码时，先拆出 render 派生值，再保留真正外部同步。
- 把 timer、subscription、request 的 setup/cleanup 放在同一个 effect 中审查。
- 遇到 dependency lint warning 时，先修正数据流，不要默认 suppress。

### Production risk signals

- UI 闪烁或重复请求，检查 effect 是否由派生 state 触发循环。
- 组件卸载后仍有日志或请求回写，检查 cleanup。
- handler 使用旧值，检查 closure 和依赖边界。

## 15. 如何转换成个人笔记

1. 为每个 effect 写一句 external system 名称；写不出来时先删除 effect 再思考。
2. 对每个 setup 写对称 cleanup，说明旧 process 何时停止。
3. 在 dependency array 上方列出 setup / cleanup 读取的 reactive values，再逐项核对。
4. 画出 initial render、commit、setup、dependency change、cleanup、next setup、unmount。
5. 为每个 ref 标注“DOM identity”“timer ID”“request sequence”或其他 non-render purpose。
6. 把一个 effect 改成 render calculation，再比较 render 次数与 source of truth 数量。
7. 用 SellerHub 场景写三列：触发原因、owner、external system。

## 16. 必须能回答的问题

1. 为什么 React component render 必须纯？
2. event handler 与 effect 的触发原因有何不同？
3. `useRef` 返回什么 JavaScript value？为什么 mutation 不 render？
4. DOM ref 的 `current` 何时从 null 变为 node？
5. effect dependency 变化时 cleanup 与 next setup 顺序是什么？
6. dependency array 是“调度选项”还是 reactive read 声明？
7. 为什么 `[]` 可能制造 stale closure？
8. functional updater 如何修复 interval 对 old state 的读取？
9. Strict Mode 为什么额外执行 setup / cleanup？
10. timer、event subscription 和 async request 分别如何 cleanup？
11. 为什么 derived filtered list 不应使用 effect + state？
12. `HTMLInputElement`、`null` 与 timer handle 类型分别解决什么静态问题？
13. TypeScript 为什么不能在 runtime 验证 request result？
14. SellerHub search focus、modal focus、autosave、polling、title 分别属于哪种机制？

## 17. 最终记忆模型

1. **先保持 render 纯。** render 只把 current inputs 变成 JSX。
2. **保留触发原因。** 明确 user action 的逻辑留在 handler。
3. **Effect 是同步过程。** 它不是普通计算或 lifecycle callback collection。
4. **Setup 与 cleanup 成对。** stop old 后才能 start new；unmount 要 stop final。
5. **Dependencies 由代码决定。** 读取 reactive value 就声明它，或重构代码使其不再需要。
6. **Closure 属于某次 render。** stale value 是 lexical environment 的结果。
7. **Ref 不驱动 UI。** 它适合 DOM node 和 non-render mutable handle；可见事实用 state。
8. **Browser 是外部系统。** focus、title、timer、events、abort 都不是 React API。
9. **TypeScript 只做静态检查。** runtime lifecycle 仍由 JavaScript、React 与 browser 执行。
10. **先删除不必要的 effect。** 只有真正跨出 React 与外部系统同步时才保留。

## 18. 官方文档阅读清单

### React 官方文档（主要依据）

- [Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)：ref object、mutable current、ref 与 state 的区别。
- [Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)：commit 后 DOM node、focus 与 safe DOM boundary。
- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)：effect / event、setup、dependencies、cleanup、Strict Mode。
- [Lifecycle of Reactive Effects](https://react.dev/learn/lifecycle-of-reactive-effects)：start/stop synchronization 与 reactive values。
- [Separating Events from Effects](https://react.dev/learn/separating-events-from-effects)：event-specific logic 与 reactive synchronization。
- [Removing Effect Dependencies](https://react.dev/learn/removing-effect-dependencies)：修复 dependency 问题而不是 suppress linter。
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)：derived data 与 user event 不需要 effect。
- [`useRef` reference](https://react.dev/reference/react/useRef) 与 [`useEffect` reference](https://react.dev/reference/react/useEffect)：参数、返回值、caveats 与 client-only behavior。

### TypeScript 官方文档

- [DOM Manipulation](https://www.typescriptlang.org/docs/handbook/dom-manipulation.html)：`HTMLElement`、specific element interfaces 与 null boundary。
- [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)：TSX 静态检查与 emitted JavaScript 边界。

### MDN browser 平台文档

- [`Document.title`](https://developer.mozilla.org/en-US/docs/Web/API/Document/title)：读取与设置 browser document title。
- [`HTMLElement.focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)：programmatic focus 与 browser behavior。
- [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval) / [`clearInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/clearInterval)：timer ID 与停止过程。
- [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)：abort signal 与可取消异步操作。

### 本地辅助资料

- `references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf`：第 80–88 页的 side effect、`useEffect`、dependency 与 cleanup 介绍。
- `references/books/react/full-stack-react-projects.pdf`：只作为旧项目组织与历史写法背景，不作为现代 Hook 行为依据。

本地 PDF 把 effect 概括为 component lifecycle，并倾向把 local storage 写入从 handler 集中到 effect。本章按当前 React 官方模型修正为“外部同步的独立 start/stop process”，并先判断逻辑是否由明确 event 触发或根本不需要 effect。官方文档优先于 PDF 的简化表述。
