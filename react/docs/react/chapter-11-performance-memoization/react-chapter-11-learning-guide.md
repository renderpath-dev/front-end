# React 第 11 章：Performance、Memoization 与 Code Splitting

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

- [本章代码定位索引](#本章代码定位索引)
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
  - [9.1 Render 与 commit 不是同一件事](#91-render-与-commit-不是同一件事)
  - [9.2 Parent render 与 child render 边界](#92-parent-render-与-child-render-边界)
  - [9.3 Reconciliation、key 与 state identity](#93-reconciliationkey-与-state-identity)
  - [9.4 memo 与 shallow prop comparison](#94-memo-与-shallow-prop-comparison)
  - [9.5 Referential equality 与 object/function props](#95-referential-equality-与-objectfunction-props)
  - [9.6 useMemo 缓存昂贵 pure derivation](#96-usememo-缓存昂贵-pure-derivation)
  - [9.7 useCallback 缓存 function identity](#97-usecallback-缓存-function-identity)
  - [9.8 memo 与 useCallback 组合](#98-memo-与-usecallback-组合)
  - [9.9 State colocation 优先于 memoization](#99-state-colocation-优先于-memoization)
  - [9.10 Context value identity 与 consumer 更新](#910-context-value-identity-与-consumer-更新)
  - [9.11 Profiler：以证据决定优化](#911-profiler以证据决定优化)
  - [9.12 lazy、Suspense 与 code splitting](#912-lazysuspense-与-code-splitting)
  - [9.13 SellerHub 性能决策映射](#913-sellerhub-性能决策映射)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标](#121-项目目标)
  - [12.2 文件职责](#122-文件职责)
  - [12.3 完整代码](#123-完整代码)
  - [12.4 完整执行链](#124-完整执行链)
  - [12.5 Runtime、类型与工具链边界](#125-runtime类型与工具链边界)
  - [12.6 验证步骤](#126-验证步骤)
- [13. 额外速查表](#13-额外速查表)
- [14. 最终文件清单](#14-最终文件清单)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标 | 对应文件 / 片段 | 类型 | 所在章节 |
| --- | --- | --- | --- |
| 区分 render work 与 DOM commit | `src/learning/react/chapter-11-performance-memoization/01-render-commit-boundary/render-commit-boundary.tsx` | 核心机制练习 | 9.1 |
| 理解 parent render 对 child function 的默认影响 | `src/learning/react/chapter-11-performance-memoization/02-parent-child-render/parent-child-render-boundary.tsx` | 核心机制练习 | 9.2 |
| 观察 type、position 与 key identity | `src/learning/react/chapter-11-performance-memoization/03-reconciliation-key-identity/reconciliation-key-identity.tsx` | 核心机制练习 | 9.3 |
| 验证 memo 的 shallow props comparison | `src/learning/react/chapter-11-performance-memoization/04-react-memo-shallow-compare/react-memo-shallow-compare.tsx` | 核心机制练习 | 9.4 |
| 比较 object reference identity | `src/learning/react/chapter-11-performance-memoization/05-referential-equality-props/referential-equality-props.tsx` | 核心机制练习 | 9.5 |
| 缓存昂贵纯派生结果 | `src/learning/react/chapter-11-performance-memoization/06-usememo-derived-data/usememo-expensive-derived-data.tsx` | 核心机制练习 | 9.6 |
| 观察 callback identity dependency | `src/learning/react/chapter-11-performance-memoization/07-usecallback-identity/usecallback-function-identity.tsx` | 核心机制练习 | 9.7 |
| 组合 memo 与稳定 callback | `src/learning/react/chapter-11-performance-memoization/08-memo-callback-composition/memo-callback-composition.tsx` | 核心机制练习 | 9.8 |
| 用 state colocation 缩小 render owner | `src/learning/react/chapter-11-performance-memoization/09-state-colocation/state-colocation-render-scope.tsx` | 核心机制练习 | 9.9 |
| 稳定 Context provider value | `src/learning/react/chapter-11-performance-memoization/10-context-value-boundary/context-value-identity-boundary.tsx` | 核心机制练习 | 9.10 |
| 用 Profiler 获取 commit timing | `src/learning/react/chapter-11-performance-memoization/11-profiler-evidence/profiler-render-evidence.tsx` | 核心机制练习 | 9.11 |
| 观察 lazy module Promise 与 Suspense | `src/learning/react/chapter-11-performance-memoization/12-lazy-suspense-code-splitting/lazy-suspense-code-splitting.tsx` | 核心机制练习 | 9.12 |
| 提供 lazy 默认导出模块 | `src/learning/react/chapter-11-performance-memoization/12-lazy-suspense-code-splitting/lazy-dashboard-panel.tsx` | 核心机制练习 | 9.12 |
| 挂载章节 Router、练习页和最终 workspace | `src/learning/react/chapter-11-performance-memoization/chapter-11-practice-root.tsx` | 入口 adapter | 7、8、14 |
| 提供章节和 workspace 通用样式 | `src/learning/react/chapter-11-performance-memoization/chapter-11-practice.css` | 章节 shell CSS | 7、14 |
| 提供 SellerHub typed mock data | `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-data.ts` | 最终小项目 | 12 |
| 隔离昂贵产品派生计算 | `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/derive-visible-products.ts` | 最终小项目 | 12 |
| 建立产品 row memo boundary | `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/memoized-product-row.tsx` | 最终小项目 | 12 |
| 组合 catalog draft、URL 与 memoization | `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/product-catalog-performance-page.tsx` | 最终小项目 | 12 |
| 建立订单 row memo boundary | `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/memoized-order-row.tsx` | 最终小项目 | 12 |
| 对比 cheap filter 与 stable callback | `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/seller-orders-performance-page.tsx` | 最终小项目 | 12 |
| 定义 preferences Context contract | `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/performance-preferences-context.ts` | 最终小项目 | 12 |
| 稳定 Provider value identity | `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/performance-preferences-provider.tsx` | 最终小项目 | 12 |
| 展示 dashboard expensive calculation | `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/dashboard-performance-page.tsx` | 最终小项目 | 12 |
| 提供 eager route shell | `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-layout.tsx` | 最终小项目 | 12 |
| 组合 lazy routes、Suspense 与 Profiler | `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-workspace.tsx` | 最终小项目 | 12 |

## 0. 文件定位

本章位于 routing 之后。第 10 章让 Catalog、Orders 与 Dashboard 成为不同 route branches；第 11 章开始判断这些 branches 中的 work 究竟来自 component calculation、descendant render、reconciliation、DOM commit、browser layout/paint，还是首次加载的 JavaScript chunk。

本章使用当前项目已有的 React 19.2、TypeScript、Vite 与 React Router，不新增依赖，也不配置 React Compiler。官方文档指出 React Compiler 可以自动应用等价 memoization，但当前项目没有 compiler setup；因此本章的手工 API 只用于理解机制与有证据的优化，不作为全局默认写法。

## 1. 本章解决的问题

“组件又 render 了”不是完整性能诊断。Component function 被调用后，可能只产生便宜的新 JSX objects；reconciliation 可能发现 DOM 输出没有差异；browser 也可能无需 layout 或 paint。相反，一个只 render 一次的页面仍可能因为大 bundle、网络 chunk、昂贵 calculation 或 layout thrashing 而慢。

本章建立一套顺序：先确认可感知问题，再区分 work layer，再修正 owner、derived data、key 与 component boundary，最后才使用 `memo`、`useMemo`、`useCallback`、`lazy` 或 `Suspense`。优化必须改变已测量成本，而不是只让源码出现更多缓存 API。

## 2. 前置概念

- **Props 与 readonly input：** `memo` 比较的是前后 props values，不改变 props 数据流。
- **State snapshot 与 owner：** state 放置位置决定 update 从哪里开始影响 subtree。
- **List key 与 identity：** key 同时影响 correctness、state preserve/reset 与 reconciliation work。
- **Pure render：** `useMemo` calculation、memoized component 与 ordinary component 都必须保持 render purity。
- **Effects 与 dependencies：** dependency array 不是“少写更快”，缺失 dependency 会产生 stale behavior。
- **Derived data：** filter/sort/summary 默认可在 render 中派生；只有证据显示昂贵时才缓存结果。
- **Routing：** route pages 是天然 code-splitting boundary，但本章不使用 loader/action。
- **Async boundary：** `Suspense` 对 lazy code 有效，不会自动观察 Effect 中的数据请求。

## 3. 学习目标

完成本章后，你应该能够：

1. 解释 render、reconciliation、commit、layout 与 paint 的顺序和责任层。
2. 判断 child function 被调用是否真的产生 DOM mutation。
3. 用 element type、position 与 key 解释 state preserve、remount 和 list reorder。
4. 说明 `memo` 比较什么，以及 state/context 为什么仍能让 memoized component render。
5. 用 `Object.is` 和 referential equality 解释 object/array/function prop 的“总是新”。
6. 区分 `useMemo` 的 calculation result cache 与 `useCallback` 的 function identity cache。
7. 证明 `memo + useCallback/useMemo` 组合何时有收益，何时只是复杂度。
8. 优先通过 state colocation 与 provider boundary 缩小 work 范围。
9. 阅读 Profiler 的 `actualDuration`、`baseDuration`、phase 与 commit evidence。
10. 解释 `lazy` 的 module Promise cache、Suspense fallback 和 Vite chunk output。
11. 为 SellerHub 的 product rows、order rows、dashboard metrics 与 route pages选择不同优化层。

## 4. 推荐学习顺序

先学 render/commit 与 parent-child 默认调用，避免把“re-render”直接等同于“重建 DOM”。接着学 reconciliation/key，因为 memoization 建立在 tree identity 正确之上。然后依次学习 memo shallow comparison、reference identity、useMemo、useCallback 与组合条件。最后处理更高层的 state colocation、Context boundary、Profiler evidence 和 code splitting。

推荐顺序是：`render -> reconciliation -> identity -> memo comparison -> cache dependencies -> owner boundaries -> measurement -> chunk loading`。这个顺序让优化成为推理结果，而不是 API 清单。

## 5. 核心术语表

| Term | 中文说明 | Layer | Why It Matters |
| --- | --- | --- | --- |
| render phase | React 调用 component 并计算新 UI description | React render behavior | 这里必须纯，可被重复或丢弃 |
| reconciliation | 比较新旧 element trees 并决定保留/替换 identity | React reconciliation | re-render 不等于 DOM rebuild |
| commit phase | 把需要的变更应用到 host DOM | React + browser boundary | 只有差异需要 mutation |
| referential equality | 两个 values 是否指向同一 object/function | JavaScript runtime | shallow comparison 使用 identity |
| shallow props comparison | 对每个 prop 使用 `Object.is` | React memoization | 一个 always-new prop 会让 memo 失效 |
| memo cache | React 保存的 component result、calculation result 或 function reference | React memoization | 只在 dependencies/props 稳定时复用 |
| state colocation | 把 transient state 放在最小需要它的 owner | Architecture convention | 从源头缩小 update scope |
| context value identity | Provider 前后 value 的 `Object.is` 结果 | React Context | 新 object 会通知所有 consumers |
| actualDuration | 当前 Profiler commit 中 subtree render 时间 | Tooling/profiling | 观察优化后的真实 work |
| baseDuration | 未优化地 render 整个 subtree 的估算时间 | Tooling/profiling | 与 actualDuration 对比 memo 效果 |
| dynamic import | 异步加载 module namespace 的 Promise 表达式 | JavaScript + bundler | 为 chunk split 提供语法边界 |
| lazy component | 缓存 load Promise 与 default component 的 React component type | React code loading | 第一次 render 时触发 module load |
| Suspense fallback | child suspend 时显示的替代 React node | React rendering | 处理等待 UI，不处理 error |

## 6. 底层心智模型

性能调查按以下九层展开：

1. **Trigger：** 哪个 state、props、context、route 或 lazy render触发了 work？
2. **JavaScript runtime：** 创建了哪些 arrays、objects、closures 和 calculation results？
3. **React render：** 哪些 component functions 被调用？render 是否纯？
4. **Reconciliation：** 前后 element type、key 与 position 是否对应？
5. **Memoization：** props/dependencies 哪一项通过或未通过 `Object.is`？缓存复用了什么？
6. **Commit/browser：** 是否真的有 DOM mutation、style recalculation、layout 或 paint？
7. **Code loading：** dynamic import 是否产生 network chunk request、module evaluation 与 Promise settlement？
8. **TypeScript：** 只检查 props/callback/result types，不测量 runtime cost，也不自动优化代码。
9. **Evidence：** Profiler、React DevTools、Performance/Network panels 与 production build说明了什么？

核心判断公式是：

`observable slowdown -> locate expensive layer -> fix ownership/identity -> measure -> add the smallest effective optimization`

## 7. 推荐目录结构

### 当前项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">当前项目结构</span>
  </div>

```txt
D:/vite_ts/
  package.json
  package-lock.json
  README.md
  src/
    App.tsx
    learning/react/chapter-11-performance-memoization/
      chapter-11-practice-root.tsx
      chapter-11-practice.css
      01-render-commit-boundary/render-commit-boundary.tsx
      02-parent-child-render/parent-child-render-boundary.tsx
      03-reconciliation-key-identity/reconciliation-key-identity.tsx
      04-react-memo-shallow-compare/react-memo-shallow-compare.tsx
      05-referential-equality-props/referential-equality-props.tsx
      06-usememo-derived-data/usememo-expensive-derived-data.tsx
      07-usecallback-identity/usecallback-function-identity.tsx
      08-memo-callback-composition/memo-callback-composition.tsx
      09-state-colocation/state-colocation-render-scope.tsx
      10-context-value-boundary/context-value-identity-boundary.tsx
      11-profiler-evidence/profiler-render-evidence.tsx
      12-lazy-suspense-code-splitting/
        lazy-dashboard-panel.tsx
        lazy-suspense-code-splitting.tsx
      sellerhub-performance-workspace/
        sellerhub-performance-data.ts
        derive-visible-products.ts
        memoized-product-row.tsx
        product-catalog-performance-page.tsx
        memoized-order-row.tsx
        seller-orders-performance-page.tsx
        performance-preferences-context.ts
        performance-preferences-provider.tsx
        dashboard-performance-page.tsx
        sellerhub-performance-layout.tsx
        sellerhub-performance-workspace.tsx
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
docs/react/chapter-11-performance-memoization/
  react-chapter-11-learning-guide.md
```
</div>

### 真实练习结构

`01` 到 `12` 对应 9.1 到 9.12。第 9.12 有两个文件，因为 lazy loader 与被加载 module 是 code-splitting 边界的两端。9.13 只映射 architecture，不伪造第 13 个练习目录。

### 概念示例结构

错误对比若使用 `Snippet:`，只解释无效优化或错误 dependency，不表示需要创建真实文件，也不会进入最终文件清单。

### 最终小项目结构

最终项目把 domain data、pure derivation、memoized rows、Context boundary、三个 lazy pages、layout 与 route composition 分开。章节 adapter/CSS 只承担挂载和样式，不在正文重复展开完整代码。

## 8. 示例运行方式

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

访问 `/performance/practice` 运行独立机制练习，访问 `/performance/catalog`、`/performance/orders`、`/performance/dashboard` 观察 page-level lazy chunks。DevTools 的 Network 面板应在首次访问页面时显示对应 module/chunk；production build 输出用于验证 Vite 的实际分块结果。开发期 Strict Mode 可能重复调用 render/calculation 以发现不纯逻辑，因此 timing evidence 应结合 production build 和目标设备理解，不应为减少日志而删除 Strict Mode。

## 9. 分节教学与练习

### 9.1 Render 与 commit 不是同一件事

**结论：** React 调用 component function 计算下一份 UI 是 render；把必要变化写入 DOM 是 commit。发生 re-render 不等于每个 DOM node 都被重建。

**本节解决的问题：** 避免把“函数再次执行”“virtual tree 被比较”“浏览器 DOM 被修改”误认为同一动作。

**技术意义：** 性能分析首先要确认成本发生在 render calculation、React reconciliation、DOM mutation，还是 browser layout/paint；否则优化目标会错位。

**新关键字和分层边界：** `render`、`commit`、`reconciliation`。JavaScript runtime 执行 component function；React framework 计算并提交最小 DOM 变化；browser platform 保存 input node 等真实 DOM 状态并完成 layout/paint；TypeScript 只检查 JSX、state 和 handler 类型；tooling 在开发期转换 TSX，Strict Mode 还可能额外调用 render 来暴露不纯逻辑。本节没有新 API，重点是 render work、identity 和性能边界；具体落点是 render、commit 与 browser work 的职责分离。

**底层机制与固定规则：** state update 把一次 render 加入队列。React 调用 component，比较本次与上次输出，并只在 commit 阶段修改发生变化的 DOM 属性、文本或节点。`data-render-version` 是普通 DOM attribute；`defaultValue` 只给 uncontrolled input 初始值，后续编辑值由浏览器 node 持有。

**完整示例：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/01-render-commit-boundary/render-commit-boundary.tsx</span>
  </div>

```tsx
import { useState } from 'react'

export function RenderCommitBoundary() {
  const [renderVersion, setRenderVersion] = useState(0)

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">01 / Render and commit</p>
      <h2>A re-render does not require rebuilding every DOM node</h2>
      <p data-render-version={renderVersion}>Rendered description version: {renderVersion}</p>
      <label className="performance-field">
        <span>Uncontrolled DOM value</span>
        <input defaultValue="Edit this value before rendering again" />
      </label>
      <button onClick={() => setRenderVersion((version) => version + 1)} type="button">
        Queue another render
      </button>
      <p className="performance-practice-note">
        The paragraph changes. The existing input node keeps its browser-owned edited value.
      </p>
    </article>
  )
}
```
</div>

**逐行解释与机制证据链：** `useState(0)` 建立当前 render snapshot；点击 handler 使用 updater function 排队更新；React 再次调用 `RenderCommitBoundary`；新 JSX 中 paragraph 文本和 `data-render-version` 改变，而 input 的 type、position 与 props 仍可复用；commit 只更新 paragraph 相关 DOM。先手动编辑 input，再点击按钮，可看到浏览器持有的值没有被清空。

**变量与引用变化：** `renderVersion` 从 `0` 变为 `1`，旧 handler closure 读取自己的 snapshot，但 updater parameter 接收队列中的最新值。JSX object 是新计算结果；现有 input DOM node identity 保持；没有 ref 或 effect closure。

**为什么得到这个结果：** React render 的输出是“下一份 UI 描述”，不是“必须重建 DOM”的命令。相同 type/position 的 input 被 reconciliation 匹配，因此 browser-owned value 继续留在同一 node 上。

**对比、错误与识别：** 手写 `container.innerHTML = ...` 会替换 subtree，通常丢失 input node identity。看到“日志执行两次”时不要直接断言 DOM 更新两次；用 Elements mutation、Profiler commit 和 node identity 分别确认。把 render 次数当作 DOM mutation 次数，违反了 render/commit 分层规则。

**与 SellerHub 和学习主线的关系：** SellerHub 搜索框输入时，页面 component 可能 render，但未变化的 DOM 不必全部重建。本节承接 state snapshot，并为 memo、Profiler 和 code splitting 建立“先定位成本发生在哪一层”的前提。

**最终记忆模型：** `state update -> render calculation -> reconciliation -> necessary commit -> browser layout/paint`，这些阶段相关但不等价。

### 9.2 Parent render 与 child render 边界

**结论：** parent state 更新后，React 默认会继续调用其 descendant component functions；child 被调用不代表其 DOM 一定变化。

**本节解决的问题：** 解释为什么“child props 没变”时 child function 仍可能执行，以及为什么这不自动构成性能问题。

**技术意义：** 只有确认 descendant render work 昂贵且可跳过后，`memo` 才有明确目标。

**新关键字和分层边界：** `parent render`、`descendant render`、`bailout`。JavaScript runtime 只是依次调用函数；React 决定从更新位置继续计算哪些 descendant；browser 只看到最终 commit；TypeScript 检查 component 返回值和 handler；tooling/Profiler 可提供开发证据。本节没有新 API，重点是 render work、identity 和性能边界；具体落点是默认 render 传播与 DOM commit 的区别。

**底层机制与规则：** 更新 parent 自有 state 会以 parent 为起点生成下一棵 element tree。普通 child 默认重新计算；React 之后比较其输出。`memo` 是可选的 bailout 边界，不是 component 默认语义。

**完整示例：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/02-parent-child-render/parent-child-render-boundary.tsx</span>
  </div>

```tsx
import { useState } from 'react'

function StaticSellerSummary() {
  return (
    <section className="performance-result-box">
      <strong>Seller summary</strong>
      <p>12 active products and 4 pending orders</p>
    </section>
  )
}

export function ParentChildRenderBoundary() {
  const [searchDraft, setSearchDraft] = useState('')

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">02 / Parent and child</p>
      <h2>Parent state updates call descendant component functions by default</h2>
      <label className="performance-field">
        <span>Parent-owned search draft</span>
        <input
          onChange={(event) => setSearchDraft(event.currentTarget.value)}
          placeholder="Type to update the parent"
          value={searchDraft}
        />
      </label>
      <p>
        Parent snapshot: <code>{searchDraft || 'empty'}</code>
      </p>
      <StaticSellerSummary />
      <p className="performance-practice-note">
        React can call StaticSellerSummary again while committing no changes inside its DOM output.
      </p>
    </article>
  )
}
```
</div>

**逐行解释与机制证据链：** input 变更时，`setSearchDraft` 更新 parent snapshot；React 调用 `ParentChildRenderBoundary`，也再次求值 `<StaticSellerSummary />`；summary 返回相同内容，reconciliation 找不到需要提交的 DOM 差异。可临时用 Profiler 观察 render，但不应把教学日志永久留在 component body。

**变量与引用变化：** `searchDraft` 字符串变化；input handler 和 JSX elements 每次 render 都是新 JS references；`StaticSellerSummary` function definition 是稳定 module binding；summary 没有 state、ref 或 effect closure。

**为什么得到这个结果：** React 的默认正确性模型是从发生更新的 component 继续计算 descendants，再通过 reconciliation 缩小 commit，而不是先深度比较所有 props 再决定是否调用每个 function。

**对比、错误与识别：** 在每个 child 外层机械加 `memo` 会增加比较和认知成本。先用 Profiler 确认 child render 的 `actualDuration` 与交互影响；如果 child 很便宜，默认重新计算通常更简单。错误规则是“没有证据就把 render 次数当成用户可感知瓶颈”。

**与 SellerHub 和学习主线的关系：** catalog 的 query draft 若放在高层 layout，会扩大 render scope；理解默认传播后，才能判断是 state colocation、component composition，还是 memoization 更合适。

**最终记忆模型：** parent render 默认带动 descendant calculation；DOM 是否变更由后续 reconciliation/commit 决定。

### 9.3 Reconciliation、key 与 state identity

**结论：** React 通过 component type、tree position 和 `key` 识别 state 属于谁；`key` 首先是 identity/correctness 工具，不是 memoization API。

**本节解决的问题：** 解释重排列表时为什么 index key 会把 row state 关联到错误业务对象。

**技术意义：** identity 错误会先造成行为 bug，再谈性能。稳定 domain ID 让 React 正确复用或重置实例。

**新关键字和分层边界：** `reconciliation`、`key`、`state identity`。JavaScript 的 `reverse()`/spread 生成新 array；React 用 type/position/key 匹配 fiber/component state；browser DOM node 随匹配结果复用或移动；TypeScript 只约束 `keyMode` union，不能判断 key 是否具备业务稳定性；tooling 不会替你发现 index key 的语义错误。本节没有新 API，重点是 render work、identity 和性能边界；具体落点是 reconciliation identity 规则。

**底层机制与固定属性名：** `key` 是 React 保留的特殊属性，不会作为普通 prop 传入 `CatalogDraftRow`。同一 parent 下 sibling keys 必须唯一且在数据生命周期内稳定。重排列表应使用 `item.id`，不要用当前 `index` 或 render 时随机值。

**完整示例：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/03-reconciliation-key-identity/reconciliation-key-identity.tsx</span>
  </div>

```tsx
import { useState } from 'react'

type CatalogItem = {
  id: string
  name: string
}

const catalogItems: CatalogItem[] = [
  { id: 'lamp-101', name: 'Arc Desk Lamp' },
  { id: 'chair-204', name: 'Mesh Task Chair' },
  { id: 'light-305', name: 'Studio Floor Light' },
]

function CatalogDraftRow({ item }: { item: CatalogItem }) {
  const [draftLabel, setDraftLabel] = useState(item.name)

  return (
    <li className="performance-list-row">
      <code>{item.id}</code>
      <input
        aria-label={`Draft label for ${item.name}`}
        onChange={(event) => setDraftLabel(event.currentTarget.value)}
        value={draftLabel}
      />
    </li>
  )
}

export function ReconciliationKeyIdentity() {
  const [isReversed, setIsReversed] = useState(false)
  const [keyMode, setKeyMode] = useState<'stable' | 'index'>('stable')
  const visibleItems = isReversed ? [...catalogItems].reverse() : catalogItems

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">03 / Reconciliation identity</p>
      <h2>Type, position, and key determine which state is preserved</h2>
      <div className="performance-control-row">
        <button onClick={() => setIsReversed((reversed) => !reversed)} type="button">
          Reverse rows
        </button>
        <label>
          Key mode
          <select
            onChange={(event) => setKeyMode(event.currentTarget.value as 'stable' | 'index')}
            value={keyMode}
          >
            <option value="stable">Stable domain ID</option>
            <option value="index">Array index</option>
          </select>
        </label>
      </div>
      <ul className="performance-list">
        {visibleItems.map((item, index) => (
          <CatalogDraftRow item={item} key={keyMode === 'stable' ? item.id : index} />
        ))}
      </ul>
      <p className="performance-practice-note">
        Edit a row, then reverse it. Index keys preserve state by position instead of product ID.
      </p>
    </article>
  )
}
```
</div>

**逐行解释与机制证据链：** 每个 row 初始化自己的 `draftLabel`。编辑第二行后反转：stable mode 中 `item.id` 跟随产品，React 把 state 与同一个 ID 匹配；index mode 中 `0/1/2` 留在位置，业务 item 改了但 row state 仍按位置保留，于是输入内容与产品 ID 错配。

**变量与引用变化：** `visibleItems` 在 reversed 分支是新 array；item objects 仍是原 references；`isReversed` 和 `keyMode` 是 parent snapshots；每个 row 的 state 存在 React 管理的独立 identity slot；没有 ref/effect。

**为什么得到这个结果：** state 不存放在 JSX tag 中，而由 React 按 tree identity 关联。index 描述的是“当前位置”，不是“这个产品”。

**对比、错误与识别：** `key={Math.random()}` 会让每次 render 都产生新 identity，导致 remount 和 state 丢失；`key={index}` 在插入、删除、排序时容易错配。识别方法是检查列表是否会变化，以及 key 是否来自稳定 domain identity。

**与 SellerHub 和学习主线的关系：** 产品、订单、通知都应使用数据库/domain ID。它承接第 5 章列表 key，并说明 reconciliation 正确性是后续 memoized row 的前提。

**最终记忆模型：** `key` 告诉 React “这是哪个 sibling”，稳定 key 保护业务 identity；它不缓存计算。

### 9.4 `memo` 与 shallow prop comparison

**结论：** `memo(Component)` 可在 parent render 时，当所有 props 通过 `Object.is` 比较均未变化，跳过该 component 的一次 render；它是性能优化，不是语义保证。

**本节解决的问题：** 建立 `memo` 的准确触发条件，并避免把它误解成“component 永不重新渲染”。

**技术意义：** 对昂贵且经常收到相同 props 的 child，memo bailout 可以缩小 render work；便宜 child 可能得不偿失。

**新 API 与分层边界：** `memo(Component, arePropsEqual?)` 返回 memoized component；默认逐项使用 JavaScript `Object.is`。React 仍会因 component 自身 state 或所读 context 更新而 render；browser 不理解 memo；TypeScript 保留 wrapped component 的 props contract；tooling/React Compiler 可能改变手工 memo 的必要性，但本项目没有配置 React Compiler。

**固定签名和规则：** 默认写法是 `const Memoized = memo(function Name(props) { ... })`。本章不使用 custom comparator，因为遗漏 function prop 会产生 stale closure，深比较也可能比 render 更慢。

**完整示例：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/04-react-memo-shallow-compare/react-memo-shallow-compare.tsx</span>
  </div>

```tsx
import { memo, useState } from 'react'

type OrderSummaryProps = {
  pendingCount: number
}

const MemoizedOrderSummary = memo(function OrderSummary({ pendingCount }: OrderSummaryProps) {
  return (
    <section className="performance-result-box">
      <strong>Memoized order summary</strong>
      <p>{pendingCount} pending orders</p>
    </section>
  )
})

export function ReactMemoShallowCompare() {
  const [pendingCount, setPendingCount] = useState(4)
  const [isCompact, setIsCompact] = useState(false)

  return (
    <article className={isCompact ? 'performance-practice-panel performance-panel-compact' : 'performance-practice-panel'}>
      <p className="performance-practice-kicker">04 / React.memo</p>
      <h2>memo can skip a child when every prop is shallowly equal</h2>
      <div className="performance-control-row">
        <button onClick={() => setIsCompact((compact) => !compact)} type="button">
          Toggle parent density
        </button>
        <button onClick={() => setPendingCount((count) => count + 1)} type="button">
          Add pending order
        </button>
      </div>
      <MemoizedOrderSummary pendingCount={pendingCount} />
      <p className="performance-practice-note">
        Density changes only parent state. Count changes the memoized child prop.
      </p>
    </article>
  )
}
```
</div>

**逐行解释与机制证据链：** `memo` 包装 `OrderSummary`。切换 `isCompact` 只改变 parent class；传入 child 的 primitive `pendingCount` 仍通过 `Object.is`，React 可 bailout。增加订单后 count 从 `4` 到 `5`，比较失败，child render 并提交新文本。

**变量与引用变化：** 两个 state snapshots 独立；primitive count 按值比较；parent 的 JSX/handlers 是新 references，但它们不是 `MemoizedOrderSummary` props；child 无 state/ref/effect closure。

**为什么得到这个结果：** `memo` 比较的是传给 wrapped component 的 props，不比较 parent 的所有 state，也不保证跨 context/state 更新跳过。

**对比、错误与识别：** 普通 `OrderSummary` 会随 parent 默认重新计算。机械 memo 化、依赖 custom deep comparator 或认为 memo 修复不纯 render，都违反 API 的“纯 component + 性能优化”前提。用 Profiler 对比 `actualDuration`，并检查 props 是否大部分时间稳定。

**与 SellerHub 和学习主线的关系：** SellerHub 大列表 row 是典型候选：row 渲染有成本、数量多、单次选择通常只改变少量 props。本节为 function/object props identity 和 `useCallback` 铺路。

**最终记忆模型：** `memo = props Object.is comparison + optional render bailout`；不是 cache 数据、不是阻止 state/context、不是正确性工具。

### 9.5 Referential equality 与 object/function props

**结论：** 两个 object 内容相同，不代表它们是同一个 reference；inline object/function 会让 `memo` 的 shallow comparison 看到 prop 变化。

**本节解决的问题：** 解释为什么 child 已经被 `memo` 包装，仍可能在每次 parent render 时重新执行。

**技术意义：** memoization 是否有效取决于 prop identity；必须先理解 JavaScript reference semantics，再决定是否稳定引用。

**新关键字和分层边界：** `referential equality`、`Object.is`、`stable reference`。JavaScript runtime 每次求值 object literal 都分配新 object；React `memo` 使用 `Object.is(previousProp, nextProp)`；browser 与 TypeScript 都不会把等内容 object 自动合并；tooling 也不会改变此 runtime identity。本节没有新 API，重点是 render work、identity 和性能边界；具体落点是 JavaScript identity 与 React shallow comparison 的连接。

**底层机制与规则：** primitive 常按值表现为稳定；object、array、function 按 reference 比较。module-level immutable value 的 reference 在 module lifetime 内稳定，但只能用于不依赖 component state/props 的值。

**完整示例：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/05-referential-equality-props/referential-equality-props.tsx</span>
  </div>

```tsx
import { memo, useState } from 'react'

type PricingPolicy = {
  currency: 'USD'
  taxRate: number
}

const stablePricingPolicy: PricingPolicy = {
  currency: 'USD',
  taxRate: 0.08,
}

const MemoizedPricingPolicy = memo(function PricingPolicyView({
  policy,
}: {
  policy: PricingPolicy
}) {
  return (
    <section className="performance-result-box">
      <strong>Pricing policy</strong>
      <p>
        {policy.currency} / {policy.taxRate * 100}% tax
      </p>
    </section>
  )
})

export function ReferentialEqualityProps() {
  const [parentTick, setParentTick] = useState(0)
  const [useStableReference, setUseStableReference] = useState(false)
  const policy = useStableReference
    ? stablePricingPolicy
    : { currency: 'USD' as const, taxRate: 0.08 }

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">05 / Referential equality</p>
      <h2>Equal object contents do not imply equal object identity</h2>
      <label className="performance-toggle-row">
        <input
          checked={useStableReference}
          onChange={(event) => setUseStableReference(event.currentTarget.checked)}
          type="checkbox"
        />
        <span>Reuse a stable module-level policy object</span>
      </label>
      <button onClick={() => setParentTick((tick) => tick + 1)} type="button">
        Re-render parent ({parentTick})
      </button>
      <MemoizedPricingPolicy policy={policy} />
      <p className="performance-practice-note">
        The inline object is new on every parent render, so Object.is reports a changed prop.
      </p>
    </article>
  )
}
```
</div>

**逐行解释与机制证据链：** unstable mode 每次调用 parent 都求值 `{ currency, taxRate }`，获得新 reference；即使字段相同，`Object.is` 为 false，child 重新 render。stable mode 复用 module binding，`parentTick` 更新后 policy reference 不变，memo 可 bailout。

**变量与引用变化：** `parentTick` snapshot 递增；inline `policy` identity 每次变化；`stablePricingPolicy` identity 不变；字段 primitive 值相同并不能覆盖外层 object identity。没有 ref/effect closure。

**为什么得到这个结果：** shallow comparison 不递归检查 object 内容，这使比较成本可预测，也避免任意深层结构比较。

**对比、错误与识别：** 为了 memo 而把依赖动态值的 object 错搬到 module scope 会造成共享或过期数据。先问 object 是否静态；动态且昂贵/作为 memo prop 时再考虑 `useMemo`。在 React DevTools/Profiler 中看到 memoized child 仍 render，应逐项检查 object/array/function props identity。

**与 SellerHub 和学习主线的关系：** filter options、context value、row callbacks 都可能因 inline allocation 破坏 bailout。本节连接普通 JavaScript object model 与接下来的 `useMemo`/`useCallback`。

**最终记忆模型：** 内容相等不等于 reference 相等；React shallow comparison 观察 reference，不替你深比较业务数据。

### 9.6 `useMemo` 缓存昂贵 pure derivation

**结论：** `useMemo(calculateValue, dependencies)` 缓存 calculation result；只有 dependency 变化时才需要重新计算。它只应用于纯计算和性能优化。

**本节解决的问题：** 区分“derived data 每次都可重新计算”与“计算确实昂贵，值得缓存”。

**技术意义：** 对稳定输入上的昂贵 filter/sort/aggregation，`useMemo` 可避免 unrelated render 重复工作；对便宜表达式会增加依赖管理成本。

**新 API 与分层边界：** `useMemo` 是 React Hook；JavaScript 执行 callback 并产生 result；React 保存 result/dependency tuple，并用 `Object.is` 比较每个 dependency；browser 不参与 cache；TypeScript 推断 result type 但不保证计算纯；tooling 的 Strict Mode 在 development 可能调用 calculation 两次以发现 mutation。

**固定签名和规则：** `const cachedValue = useMemo(calculateValue, dependencies)`；`calculateValue` 必须无参数、纯、同步返回值；dependency list 必须 inline、长度固定，并包含 calculation 中读取的所有 reactive values；不能用它保证程序正确性。

**完整示例：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/06-usememo-derived-data/usememo-expensive-derived-data.tsx</span>
  </div>

```tsx
import { useMemo, useState } from 'react'

type Product = {
  id: number
  name: string
  revenue: number
}

const products: Product[] = Array.from({ length: 120 }, (_, index) => ({
  id: index + 1,
  name: `Product ${String(index + 1).padStart(3, '0')}`,
  revenue: ((index * 37) % 500) + 50,
}))

function deriveVisibleProducts(query: string, sortDirection: 'asc' | 'desc') {
  let checksum = 0

  for (let index = 0; index < 40_000; index += 1) {
    checksum = (checksum + index) % 997
  }

  const normalizedQuery = query.trim().toLowerCase()
  const visibleProducts = products
    .filter((product) => product.name.toLowerCase().includes(normalizedQuery))
    .sort((left, right) =>
      sortDirection === 'asc' ? left.revenue - right.revenue : right.revenue - left.revenue,
    )

  return { checksum, visibleProducts }
}

export function UseMemoExpensiveDerivedData() {
  const [query, setQuery] = useState('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [isHighlighted, setIsHighlighted] = useState(false)
  const result = useMemo(
    () => deriveVisibleProducts(query, sortDirection),
    [query, sortDirection],
  )

  return (
    <article className={isHighlighted ? 'performance-practice-panel performance-panel-highlighted' : 'performance-practice-panel'}>
      <p className="performance-practice-kicker">06 / useMemo result cache</p>
      <h2>Cache an expensive pure derivation behind stable dependencies</h2>
      <label className="performance-field">
        <span>Product query</span>
        <input onChange={(event) => setQuery(event.currentTarget.value)} value={query} />
      </label>
      <div className="performance-control-row">
        <button
          onClick={() => setSortDirection((direction) => (direction === 'asc' ? 'desc' : 'asc'))}
          type="button"
        >
          Sort {sortDirection}
        </button>
        <button onClick={() => setIsHighlighted((highlighted) => !highlighted)} type="button">
          Toggle unrelated highlight
        </button>
      </div>
      <p>
        {result.visibleProducts.length} products / checksum {result.checksum}
      </p>
      <p className="performance-practice-note">
        Highlight updates re-render the component but reuse the cached derivation result.
      </p>
    </article>
  )
}
```
</div>

**逐行解释与机制证据链：** module-level products 保持稳定。首次 render 执行 loop/filter/sort；query 或 sort 改变时 dependency comparison 失败并重算；只切换 highlight 时 component 仍 render，但 React 返回前次 result reference，不再执行 derivation。

**变量、snapshot 与 cache 变化：** `query`、`sortDirection`、`isHighlighted` 各自是 state snapshot；`result` 在依赖相同时复用同一 reference，依赖变化时换成新 object；calculation closure 捕获当前 query/sort；没有 ref/effect。

**为什么得到这个结果：** React 将 result 与 dependency list 关联到当前 Hook slot。cache 命中由 dependency identity 决定，不由函数体内容或运行时间自动判断。

**对比、错误与识别：** 直接调用 `deriveVisibleProducts` 每次 render 都重算，但逻辑仍正确。漏 dependency 会返回 stale result；在 calculation 中 mutate props/state 会被 Strict Mode 双调用放大。先用 Profiler/CPU evidence 证明计算昂贵，再加 `useMemo`，并确认移除它不改变正确结果。

**与 SellerHub 和学习主线的关系：** catalog 大数据 filter/sort、dashboard aggregation 是候选；简单 `orders.filter` 不一定需要。本节把第 5 章 derived list 与测量驱动性能优化连接起来。

**最终记忆模型：** `useMemo = cache calculation result by reactive dependencies`；不是 state、不是 effect、不是永久 cache。

### 9.7 `useCallback` 缓存 function identity

**结论：** `useCallback(fn, dependencies)` 缓存 function reference，不执行 `fn`，也不缓存调用结果。

**本节解决的问题：** 解释 inline callback 为什么每次 render 都是新 reference，以及稳定 callback 何时有可观察价值。

**技术意义：** 当 function 是 memoized child prop 或其他 Hook dependency 时，稳定 identity 可阻止无意义失效；否则 `useCallback` 通常没有收益。

**新 API 与分层边界：** JavaScript 创建 closure；React 保存 function/dependencies 并在依赖相同时间返回同一 reference；browser 只在 event 时调用 handler；TypeScript 检查参数和返回类型；Effect 只在 dependency identity 改变后重新同步。本节的 `useEffect` 仅用于观察 identity，不是优化工具。

**固定签名和规则：** `const cachedFn = useCallback(fn, dependencies)`；dependency list 规则与其他 Hooks 相同。使用 functional state updater 可减少只为读取旧 state 而产生的 dependency。

**完整示例：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/07-usecallback-identity/usecallback-function-identity.tsx</span>
  </div>

```tsx
import { useCallback, useEffect, useState } from 'react'

type CallbackIdentityReporterProps = {
  label: string
  onAction: () => void
}

function CallbackIdentityReporter({ label, onAction }: CallbackIdentityReporterProps) {
  useEffect(() => {
    console.info(`${label} callback identity changed`)
  }, [label, onAction])

  return <button onClick={onAction} type="button">Run {label} callback</button>
}

export function UseCallbackFunctionIdentity() {
  const [parentTick, setParentTick] = useState(0)
  const [actionCount, setActionCount] = useState(0)
  const stableAction = useCallback(() => {
    setActionCount((count) => count + 1)
  }, [])
  const inlineAction = () => {
    setActionCount((count) => count + 1)
  }

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">07 / useCallback identity</p>
      <h2>useCallback caches a function reference, not its execution result</h2>
      <button onClick={() => setParentTick((tick) => tick + 1)} type="button">
        Re-render parent ({parentTick})
      </button>
      <div className="performance-control-row">
        <CallbackIdentityReporter label="inline" onAction={inlineAction} />
        <CallbackIdentityReporter label="stable" onAction={stableAction} />
      </div>
      <p>Actions completed: {actionCount}</p>
      <p className="performance-practice-note">
        Watch the console: the inline dependency changes on each render; the cached callback does not.
      </p>
    </article>
  )
}
```
</div>

**逐行解释与机制证据链：** 每次 parent render 都创建 `inlineAction`；`stableAction` 在空依赖不变时复用。点击 parent tick 后，两个 reporter 都因 parent 默认传播而 render，但 commit 后 inline reporter 的 Effect dependency 变了，stable reporter 的没有。点击 callback 时，两者都使用 functional updater 增加 count。

**变量、closure 与引用变化：** `parentTick`/`actionCount` 是 snapshots；inline closure reference 每次变化；cached closure reference 稳定，且不捕获 actionCount，因此不会 stale；Effect closure 在 dependency 变化时替换。没有 ref。

**为什么得到这个结果：** function expression 是 object-like reference value。`useCallback` 不让 function 更快，只控制 React 返回哪一个 closure reference。

**对比、错误与识别：** 单独给普通 button handler 加 `useCallback` 通常没有收益；空 dependency 却读取 changing state 会产生 stale closure。识别时问“谁观察这个 function identity？”若没有 memoized child 或 Hook dependency，通常不必缓存。

**与 SellerHub 和学习主线的关系：** product/order row 的 `onSelect`/`onOpen` 是 memoized child props；稳定它们才能让 row 的其他 props 稳定时 bailout。

**最终记忆模型：** `useCallback = cache function reference`；function 仍在 event 时运行，closure 仍受 dependency 规则约束。

### 9.8 `memo` 与 `useCallback` 组合

**结论：** `useCallback` 的典型价值是保持传给 `memo` child 的 function prop identity；两者缺一时，这条特定 bailout 链路可能不成立。

**本节解决的问题：** 把独立 API 组合成一条可验证的 optimization mechanism。

**技术意义：** 在 parent 有 unrelated state，而 child render 较昂贵时，可用稳定 data props + stable callback + memoized child 缩小 render work。

**新概念和分层边界：** `memoization composition`。JavaScript closure reference 是比较对象；React 先比较 child props 再决定 bailout；browser event 触发 cached handler；TypeScript 检查 `(productId: string) => void` contract；Profiler 才能证明组合是否值得。本节没有新 API，重点是 render work、identity 和性能边界；具体落点是 `memo` 与 `useCallback` 的协作条件。

**固定规则：** child 必须 pure；传入的每个 prop 都要稳定或确实未变；callback dependencies 必须完整。只稳定 callback 不能抵消另一个每次新建的 object prop。

**完整示例：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/08-memo-callback-composition/memo-callback-composition.tsx</span>
  </div>

```tsx
import { memo, useCallback, useState } from 'react'

type ProductActionRowProps = {
  productId: string
  productName: string
  onRestock: (productId: string) => void
}

const MemoizedProductActionRow = memo(function ProductActionRow({
  productId,
  productName,
  onRestock,
}: ProductActionRowProps) {
  return (
    <section className="performance-result-box">
      <strong>{productName}</strong>
      <button onClick={() => onRestock(productId)} type="button">
        Restock
      </button>
    </section>
  )
})

export function MemoCallbackComposition() {
  const [searchDraft, setSearchDraft] = useState('')
  const [lastRestockedId, setLastRestockedId] = useState<string | null>(null)
  const handleRestock = useCallback((productId: string) => {
    setLastRestockedId(productId)
  }, [])

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">08 / memo and useCallback</p>
      <h2>Stable callback identity matters when a memoized child receives it</h2>
      <label className="performance-field">
        <span>Unrelated parent search draft</span>
        <input
          onChange={(event) => setSearchDraft(event.currentTarget.value)}
          value={searchDraft}
        />
      </label>
      <MemoizedProductActionRow
        onRestock={handleRestock}
        productId="lamp-101"
        productName="Arc Desk Lamp"
      />
      <p>Last restocked: {lastRestockedId ?? 'none'}</p>
      <p className="performance-practice-note">
        Without useCallback, a new onRestock function would invalidate the memo comparison.
      </p>
    </article>
  )
}
```
</div>

**逐行解释与机制证据链：** typing 更新 parent `searchDraft`；primitive product props 不变，`handleRestock` reference 也不变，memo comparison 全部通过，row 可跳过。点击 Restock 时 child 的 local wrapper 调用稳定 parent callback，更新 `lastRestockedId`；若 ID 从 `null` 变为 `lamp-101`，parent render，但 child props 仍可相等。

**变量、closure 与引用变化：** search/last ID snapshots 变化；`handleRestock` closure 稳定且只调用 stable setter；child 内 `() => onRestock(productId)` 会在 child render 时创建，但它不是从 parent 传入的比较 prop。无 ref/effect。

**为什么得到这个结果：** bailout 发生在进入 wrapped child 之前；React 比较 parent 传入的三个 props。内部 event wrapper 只有 child 真正 render 时才重新创建。

**对比、错误与识别：** 将 `onRestock={(id) => setLastRestockedId(id)}` 直接传入会每次产生新 function，破坏 shallow equality。若 child 本身便宜，组合仍可能没有可感知收益。识别路径是 Profiler -> changed props -> JS identity -> dependencies。

**与 SellerHub 和学习主线的关系：** 大量 product/order rows 接收 stable domain object 与 shared action callback，是最终项目的核心优化边界。

**最终记忆模型：** `memo child` 只在“所有 props identity 稳定”时有机会 bailout；`useCallback` 只负责其中的 function prop。

### 9.9 State colocation 优先于 memoization

**结论：** 把 transient state 放到最小必要 owner，通常比在过大的 subtree 上增加 memoization 更直接。

**本节解决的问题：** 避免把高层 state 导致的大 render scope 当成只能靠 `memo` 修复的问题。

**技术意义：** state colocation 同时改善 ownership、可读性和 render scope，不引入 dependency/cache invalidation。

**新概念和分层边界：** `state colocation`、`render scope`。JavaScript function scope 表达 ownership；React 从 state owner 开始安排更新；browser 只提交变化；TypeScript 约束 local union/string；tooling 无法替代组件边界设计。本节没有新 API，重点是 render work、identity 和性能边界；具体落点是 state ownership 与 render boundary。

**底层机制与规则：** state update 以持有该 Hook 的 component 为更新起点。若 sibling 不需要该 state，就不应为了“集中管理”无条件 lifting state up。只有多个组件确实共享同一 source of truth 时才提升。

**完整示例：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/09-state-colocation/state-colocation-render-scope.tsx</span>
  </div>

```tsx
import { useState } from 'react'

function LocalOrderFilterDraft() {
  const [statusDraft, setStatusDraft] = useState('all')

  return (
    <label className="performance-field">
      <span>Locally owned status draft</span>
      <select
        onChange={(event) => setStatusDraft(event.currentTarget.value)}
        value={statusDraft}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="shipped">Shipped</option>
      </select>
    </label>
  )
}

function StableSellerSummary() {
  return (
    <section className="performance-result-box">
      <strong>Independent seller summary</strong>
      <p>$18,420 monthly revenue</p>
    </section>
  )
}

export function StateColocationRenderScope() {
  const [shellDensity, setShellDensity] = useState<'comfortable' | 'compact'>('comfortable')

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">09 / State colocation</p>
      <h2>Move transient state to the smallest owner before adding memoization</h2>
      <button
        onClick={() =>
          setShellDensity((density) => (density === 'comfortable' ? 'compact' : 'comfortable'))
        }
        type="button"
      >
        Shell density: {shellDensity}
      </button>
      <LocalOrderFilterDraft />
      <StableSellerSummary />
      <p className="performance-practice-note">
        Editing the draft updates its component, not this parent or the independent summary.
      </p>
    </article>
  )
}
```
</div>

**逐行解释与机制证据链：** status draft 位于 `LocalOrderFilterDraft`。修改 select 时 React 从该 child 更新，不调用 parent 与 sibling summary。切换 density 才更新 parent，并按默认规则计算 descendants。

**变量与引用变化：** `statusDraft` 属于 child snapshot；`shellDensity` 属于 parent snapshot；两个 state queues/identities 分离。select event closure 随 child render 更新；没有 ref/effect。

**为什么得到这个结果：** React 更新起点由 state owner 决定。component tree 的 ownership 结构天然形成 render work boundary。

**对比、错误与识别：** 把 `statusDraft` 放进 parent，再给 summary 加 `memo`，能部分跳过工作，却让不相关 parent 每次 render。识别方式是画出“谁读、谁写”关系；只有一个局部 consumer 的 state 应优先下移。

**与 SellerHub 和学习主线的关系：** catalog 的输入 draft 留在 filter form，提交后才写入 URL state；这减少 typing 对产品列表的影响，也承接 state ownership 与 URL state 章节。

**最终记忆模型：** 先缩小 state owner，后评估 memo；最少受影响的 tree 往往是最好的优化。

### 9.10 Context value identity 与 consumer 更新

**结论：** Context provider 的 `value` 通过 `Object.is` 判断是否变化；consumer 即使被 `memo` 包装，也会在所读 context value 改变时更新。

**本节解决的问题：** 解释 inline context object/function 如何导致所有 consumers 在 provider owner 的 unrelated render 后更新。

**技术意义：** 高频 provider 下，稳定 value identity 可减少无关 consumer work；但更重要的是保持 context 粒度合理。

**新 API 与分层边界：** `createContext`、`useContext`、Provider `value`，以及用于 identity 的 `useMemo`/`useCallback`。JavaScript object/function references 构成 value identity；React 传播 changed context；browser 不理解 context；TypeScript 的 `PerformancePreferences | null` 强制处理 missing provider；tooling 可用 React DevTools/Profiler观察 consumer updates。

**固定签名和规则：** `createContext(defaultValue)` 的 default 只在没有 matching provider 时使用；`useContext(Context)` 读取最近 provider；provider 的固定 prop 名是 `value`。`memo` 只比较 props，不能拦截组件自己订阅的 context。

**完整示例：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/10-context-value-boundary/context-value-identity-boundary.tsx</span>
  </div>

```tsx
import { createContext, memo, useCallback, useContext, useMemo, useState } from 'react'

type Density = 'comfortable' | 'compact'

type PerformancePreferences = {
  density: Density
  toggleDensity: () => void
}

const PerformancePreferencesContext = createContext<PerformancePreferences | null>(null)

const MemoizedPreferenceConsumer = memo(function PreferenceConsumer() {
  const preferences = useContext(PerformancePreferencesContext)

  if (!preferences) {
    throw new Error('PreferenceConsumer requires PerformancePreferencesContext')
  }

  return (
    <section className="performance-result-box">
      <strong>Context consumer</strong>
      <p>Density: {preferences.density}</p>
      <button onClick={preferences.toggleDensity} type="button">
        Toggle density
      </button>
    </section>
  )
})

export function ContextValueIdentityBoundary() {
  const [density, setDensity] = useState<Density>('comfortable')
  const [unrelatedTick, setUnrelatedTick] = useState(0)
  const toggleDensity = useCallback(() => {
    setDensity((currentDensity) =>
      currentDensity === 'comfortable' ? 'compact' : 'comfortable',
    )
  }, [])
  const contextValue = useMemo(
    () => ({ density, toggleDensity }),
    [density, toggleDensity],
  )

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">10 / Context value identity</p>
      <h2>Consumers update when the provided value changes by Object.is</h2>
      <button onClick={() => setUnrelatedTick((tick) => tick + 1)} type="button">
        Re-render provider owner ({unrelatedTick})
      </button>
      <PerformancePreferencesContext.Provider value={contextValue}>
        <MemoizedPreferenceConsumer />
      </PerformancePreferencesContext.Provider>
      <p className="performance-practice-note">
        The memoized value stays stable during unrelated owner updates.
      </p>
    </article>
  )
}
```
</div>

**逐行解释与机制证据链：** `toggleDensity` 的 identity 在空依赖下稳定；`contextValue` 只在 density 改变时成为新 object。unrelated tick 更新会 render owner，但 provider value 通过 `Object.is`，memoized consumer 可跳过。点击 consumer 按钮后 density 变化，value 变化，React 必须更新 consumer。

**变量、closure 与引用变化：** `density`/`unrelatedTick` 是 snapshots；toggle closure 稳定且通过 functional updater 读取最新值；context value 在 density 不变时复用；consumer 每次实际 render 都读取当前 context。无 ref/effect。

**为什么得到这个结果：** context subscription 是独立更新通道，不是 ordinary prop。稳定 provider value 可避免发出无意义的 context change。

**对比、错误与识别：** `value={{ density, toggleDensity: () => ... }}` 每次生成两层新 references。给 consumer 加 `memo` 但不稳定 provider value无法解决。识别时检查 provider `value` 是否 inline、context 是否过大、consumer 是否读取变化频繁但不需要的字段。

**与 SellerHub 和学习主线的关系：** density/preferences 是适合 context 的跨页面配置；catalog filter 不是。最终项目拆分 context contract 与 provider，避免 Fast Refresh export 冲突并保持 value identity。

**最终记忆模型：** context consumer 由 provider value identity 驱动；`memo` 不屏蔽真实 context updates。

### 9.11 Profiler：以证据决定优化

**结论：** `<Profiler id onRender>` 测量其 subtree 的 committed render cost；先测量，再选择 state colocation、memoization 或 code boundary。

**本节解决的问题：** 把“感觉慢”和“render 次数多”转成可比较的 duration/phase evidence。

**技术意义：** Profiler 能显示优化前后 `actualDuration` 变化，并用 `baseDuration` 估计无 memoization 时的成本基线。

**新 API 与分层边界：** `Profiler` 是 React instrumentation component；JavaScript callback 接收 timing arguments；React 在 commit 后调用 `onRender`；browser timing API 提供时钟但 Profiler 不等于完整 layout/paint trace；TypeScript 的 `ProfilerOnRenderCallback` 校验签名；development tooling 有 profiling overhead，production profiling build 默认关闭。

**固定属性名和签名：** 必填 props 是 `id: string` 与 `onRender: ProfilerOnRenderCallback`。主要参数是 `id`、`phase`、`actualDuration`、`baseDuration`、`startTime`、`commitTime`；回调只记录证据，不应更新 state 形成循环。

**完整示例：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/11-profiler-evidence/profiler-render-evidence.tsx</span>
  </div>

```tsx
import { Profiler, useState } from 'react'
import type { ProfilerOnRenderCallback } from 'react'

function DashboardMetricPanel({ orderCount }: { orderCount: number }) {
  let checksum = 0

  for (let index = 0; index < 50_000; index += 1) {
    checksum = (checksum + orderCount + index) % 1_009
  }

  return (
    <section className="performance-result-box">
      <strong>Dashboard metric</strong>
      <p>{orderCount} orders / checksum {checksum}</p>
    </section>
  )
}

const handleProfileRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
) => {
  console.info('Profiler evidence', {
    actualDuration,
    baseDuration,
    commitTime,
    id,
    phase,
    startTime,
  })
}

export function ProfilerRenderEvidence() {
  const [orderCount, setOrderCount] = useState(12)

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">11 / Profiler evidence</p>
      <h2>Measure a committed subtree before choosing an optimization</h2>
      <button onClick={() => setOrderCount((count) => count + 1)} type="button">
        Add order
      </button>
      <Profiler id="DashboardMetricPanel" onRender={handleProfileRender}>
        <DashboardMetricPanel orderCount={orderCount} />
      </Profiler>
      <p className="performance-practice-note">
        Inspect actualDuration and baseDuration in the browser console.
      </p>
    </article>
  )
}
```
</div>

**逐行解释与机制证据链：** dashboard calculation 在 render 中执行；React 完成 subtree commit 后调用 typed callback。首次 phase 为 mount，后续为 update；`actualDuration` 是本次 render 所花时间，`baseDuration` 估计不使用 memo optimization 的整棵 subtree 成本。

**变量与证据变化：** orderCount snapshot 递增；checksum 是每次 render 的局部变量；callback 是稳定 module binding；Profiler values 每次 commit 新产生，没有 ref/effect closure。

**为什么得到这个结果：** Profiler instrument 记录 React render work；它不会自动优化，也不完整测量 network、DOM layout、paint 或 device-level interaction latency。

**对比、错误与识别：** `console.time` 放在 render 中容易被 Strict Mode/aborted work误读；只看一次 development 数值也不可靠。应固定 interaction/data/device，多次比较，结合 React DevTools Profiler、Performance panel 与 production-like build。

**与 SellerHub 和学习主线的关系：** 用 Profiler 比较 catalog typing、filter commit、row selection 与 route navigation，决定瓶颈属于 calculation、child render 还是 chunk loading。

**最终记忆模型：** Profiler 提供 React render evidence；真实性能结论需要可重复场景和 browser/network evidence 共同支持。

### 9.12 `lazy`、`Suspense` 与 code splitting

**结论：** `lazy(load)` 延迟执行 dynamic `import()` 并缓存 Promise/已解析 component；`Suspense` 在 code module 尚未就绪时渲染 `fallback`。这解决 JavaScript delivery，不自动获取业务数据。

**本节解决的问题：** 区分 render optimization 与 bundle/code delivery optimization，并明确 React、JavaScript module、Vite 和 browser network 的职责。

**技术意义：** page/feature boundary 可减少 initial JavaScript，而过细分块会增加请求、fallback 和维护成本。

**新 API 与分层边界：** JavaScript `import()` 返回 Promise，解析 module namespace；React `lazy` 读取 module `default` export 并让 subtree suspend；`Suspense` 接收固定 prop `fallback`；Vite/Rollup 把 dynamic import 建成独立 chunk并处理 preload/common chunks；browser 请求、解析、执行 chunk；TypeScript 检查 module/default component shape。

**固定签名和规则：** `const LazyComponent = lazy(() => import('./module'))` 应声明在 component 外；被加载 module 必须提供 default export；使用 `<Suspense fallback={...}>` 包围可能 suspend 的 subtree。普通 Effect/event data fetching 不会自动触发 Suspense。

**完整示例，加载目标：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/12-lazy-suspense-code-splitting/lazy-dashboard-panel.tsx</span>
  </div>

```tsx
export default function LazyDashboardPanel() {
  return (
    <section className="performance-result-box">
      <strong>Lazy dashboard panel loaded</strong>
      <p>This module arrived through a dynamic import chunk.</p>
    </section>
  )
}
```
</div>

**完整示例，lazy boundary：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/12-lazy-suspense-code-splitting/lazy-suspense-code-splitting.tsx</span>
  </div>

```tsx
import { lazy, Suspense, useState } from 'react'

const LazyDashboardPanel = lazy(() => import('./lazy-dashboard-panel'))

export function LazySuspenseCodeSplitting() {
  const [showPanel, setShowPanel] = useState(false)

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">12 / Lazy code boundary</p>
      <h2>lazy caches a module promise; Suspense renders the loading fallback</h2>
      <button onClick={() => setShowPanel((visible) => !visible)} type="button">
        {showPanel ? 'Hide lazy panel' : 'Load lazy panel'}
      </button>
      {showPanel && (
        <Suspense fallback={<p className="performance-loading-state">Loading code chunk...</p>}>
          <LazyDashboardPanel />
        </Suspense>
      )}
      <p className="performance-practice-note">
        This boundary loads component code. It does not fetch dashboard data.
      </p>
    </article>
  )
}
```
</div>

**逐行解释与机制证据链：** 初始 show 为 false，不请求 lazy module。首次显示时 React 调用 load function，Vite 生成的 dynamic import 请求 chunk；Promise pending 时 boundary 显示 fallback；module 解析且 default component 可用后 React 重试 render 并 commit panel。隐藏再显示会复用 lazy 缓存，不重新调用 load。

**变量、Promise 与引用变化：** `showPanel` snapshot 改变；module-scope Lazy component identity 稳定；首次 request 创建 Promise，React 缓存 Promise 与 resolved component；Suspense fallback 是 pending render 的替代 UI。没有 ref/effect closure。

**为什么得到这个结果：** `import()` 是语言/host module loading mechanism，Vite 把静态可分析的 dynamic import 转成 chunk graph，React 只协调“component code 未就绪”的 render 状态。

**对比、错误与识别：** static import 会把 module 放入当前 eager graph；在 component 内声明 `lazy` 会每次创建新 component type并重置 state；缺 default export 会在 load 后失败；把 data fetch Effect 当作 Suspense source 违反支持边界。Network 面板与 `vite build` chunk names 是 code splitting 的直接证据。

**与 SellerHub 和学习主线的关系：** catalog/orders/dashboard 是自然 page boundaries；常用 shell/navigation 保持 eager，页面实现 lazy。它承接 routing，并为未来 framework/data APIs 留出边界，但本章不引入新 data library。

**最终记忆模型：** `dynamic import -> bundler chunk -> browser request -> lazy promise -> Suspense fallback -> resolved component commit`。

### 9.13 SellerHub 性能决策映射

**结论：** SellerHub 优化顺序应是：确认交互目标，测量瓶颈，修正 state/component boundary，再选择 memoization 或 code splitting，最后复测。

**本节解决的问题：** 把 API 知识转成可审查的工程决策，而不是给所有 component 添加 cache。

**技术意义：** 不同问题属于不同层：typing 卡顿可能是 render scope/derivation，导航慢可能是 chunk/network，layout shift 可能是 browser/CSS；单一 React API 不能覆盖全部。

**新概念和分层边界：** 本节没有新 API，重点是 render work、identity 和性能边界。JavaScript 层看计算与 reference allocation；React 层看 update source、render tree、memo/context；browser 层看 network、DOM、layout、paint；TypeScript 层只提供 contracts，不提高 runtime speed；tooling 层用 Profiler、Network、Performance 与 build output 收集证据。

**底层决策规则：**

| SellerHub 场景 | 先确认 | 优先手段 | 不应先做 |
|---|---|---|---|
| Catalog typing | draft owner、derived list 是否每键计算 | state colocation；提交后才更新 URL | 全树 `memo` |
| Product/order rows | row 数量、render cost、changed props | stable domain object、stable callback、`memo` | custom deep comparator |
| Dashboard aggregation | calculation duration、dependency | pure function + `useMemo` | 把结果复制进 state/Effect |
| Preferences | provider value identity、context 粒度 | split context；稳定 value | 用 `memo` 阻止真实 context change |
| Route navigation | initial JS、chunk waterfall、fallback | route-level `lazy` + `Suspense` | 每个小 icon 单独 chunk |
| 不明确的“慢” | reproducible interaction | Profiler + browser evidence | 凭 render log 猜测 |

**概念示例代码：** 这份 decision record 只用于复习判断步骤，不是需要创建的真实文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: performance decision record</span>
  </div>

```ts
type PerformanceDecision = {
  interaction: string
  measuredProblem: string
  change: string
  evidence: string
}

const catalogDecision: PerformanceDecision = {
  interaction: 'Commit catalog filters',
  measuredProblem: 'The expensive visible-list derivation repeats for unrelated updates',
  change: 'Keep draft state local and memoize only the pure committed derivation',
  evidence: 'Compare Profiler durations before and after the boundary change',
}
```
</div>

**机制证据链与变化追踪：** 以 catalog 为例：local draft 只更新 form；submit 后 URL search params 改变；page render 得到新 committed query；`useMemo` dependency 变化并生成新 visible products array；memoized rows 比较 product/callback props；React commit 必要 list changes；browser 绘制结果。这里没有 ref/effect closure，callback closure 由完整 dependencies 或 functional updater 保持正确。

**为什么得到这个结果：** 每个手段针对不同 invalidation source。state colocation 改变 update 起点，`memo` 改变 child bailout，`useMemo` 改变 calculation reuse，`useCallback` 改变 function identity，lazy 改变 delivery time。

**对比、错误与识别：** “用了 memo 就更快”违反 evidence-first 原则；“bundle 变小所以 interaction 一定更快”忽略请求/解析/fallback；“TypeScript 会优化类型”混淆 compile time 与 runtime。识别类似错误时，要求陈述 metric、layer、invalidation source、before/after evidence。

**与学习主线的关系：** 本章把 props、state、lists、effects、context、reducers、routing 组合成性能视角；最终项目不是完整 SellerHub，而是验证这些机制边界的受控工作区。

**后续工具的位置：** virtualization 解决超长可见列表的 DOM/paint 规模；server pagination 先减少传输与 client data volume；TanStack Query cache 管理 server-state request/cache lifecycle，不替代 render memoization；React Compiler 可自动化部分 component/value memoization，但不修复 state ownership、network 或 key correctness。本章只标出边界，不安装或配置它们。

**最终记忆模型：** `measure -> locate layer -> reduce invalidation/work/delivery -> measure again`；没有证据时，简单正确的代码优先。

## 10. API / 语法索引

| API / 语法 | 保存或比较什么 | 适用条件 | 不负责什么 |
|---|---|---|---|
| `memo(Component)` | 使用 `Object.is` shallow compare props | 昂贵 child 经常收到相同 props | 不阻止自身 state/context update |
| `useMemo(calculate, deps)` | calculation result 与 deps | 昂贵 pure derivation、稳定依赖 | 不保证正确性，不执行副作用 |
| `useCallback(fn, deps)` | function reference 与 deps | function identity 被 memo/dependency 观察 | 不缓存调用结果，不让函数更快 |
| `<Profiler id onRender>` | committed subtree timing | 可重复的 render measurement | 不完整覆盖 network/layout/paint |
| `lazy(load)` | load Promise 与 resolved default component | 较大的 page/feature code boundary | 不获取业务数据，不处理 error |
| `<Suspense fallback>` | pending subtree 的替代 UI | lazy 或其他 Suspense-enabled source | 不是 error boundary |
| `import('./module')` | Promise/module namespace | bundler 可静态分析的 dynamic import | 不由 TypeScript 自动优化 |
| `key` | sibling identity | list reorder、显式 reset identity | 不作为普通 prop 传递，不缓存 render |
| `Object.is(a, b)` | SameValue equality | React deps/props/context identity model | 不递归比较 object 内容 |

## 11. 常见错误表

| 错误 | 违反的规则 | 可观察后果 | 识别与修正 |
|---|---|---|---|
| child function 被调用就认定 DOM 重建 | render 不等于 commit | 错误优化目标 | 用 Profiler + DOM mutation 分层确认 |
| 所有 component 都套 `memo` | memo 必须有可跳过的昂贵工作 | 比较与认知成本增加 | 先测量稳定 props 和 duration |
| 所有计算都用 `useMemo` | cache 只服务明确收益 | dependency 噪音 | cheap derivation 直接算 |
| 认为 `useCallback` 让调用更快 | 它只缓存 identity | 没有 consumer 时零收益 | 找到观察 identity 的 memo/Hook |
| memo child 收到 inline object/function | shallow compare 看见新 reference | bailout 失效 | 缩小 props 或按证据稳定 reference |
| 为 memo 扭曲 state owner | architecture 优先于 cache | ownership 复杂、依赖扩大 | 先 state colocation |
| dependency 少写 | reactive dependency 必须完整 | stale result/closure | 读取值与 dependency 逐项核对 |
| `useMemo` 中 request、storage、`setState` | render calculation 必须 pure | 重复副作用或 render loop | 移到 event/effect/正确 external boundary |
| Provider inline value | context value 按 identity 比较 | consumers 无关更新 | 缩小 context；必要时 memoize value |
| random key | key 必须稳定 | 每次 remount、state 丢失 | 使用 domain ID |
| reorder list 使用 index key | index 不是业务 identity | row state 错位 | 使用稳定 sibling key |
| 认为 `lazy` 加速数据 request | lazy 只加载 code module | 数据时序完全未改变 | 分开 code loading 与 data lifecycle |
| lazy subtree 没有 Suspense | pending code 需要 fallback boundary | nearest boundary 缺失/UX 破碎 | 在合适 page boundary 包围 |
| 每个小 component 都 lazy | chunk boundary 应有足够粒度 | 请求过碎、fallback 频繁 | 优先 route/page/large feature |
| 没有基线就优化 | evidence-first | 优化不存在的问题 | 固定场景，记录 before/after |

## 12. 最终小项目

最终小项目只用于整合本章机制，不替代前面的分节教学。

### 12.1 项目目标

`SellerHub Performance Workspace` 使用 local mock products/orders 组合三个 page-like route：catalog 展示 local draft、committed URL state、昂贵 derived list、memoized rows 和 stable callbacks；orders 展示 cheap derivation 不必机械 `useMemo`；dashboard 展示受控昂贵 calculation；workspace 用 Context、Profiler、`lazy` 和 `Suspense` 建立页面级边界。

### 12.2 文件职责

| 文件 | 职责 |
|---|---|
| `sellerhub-performance-data.ts` | typed immutable mock products/orders |
| `derive-visible-products.ts` | 可独立推理的 pure expensive derivation |
| `memoized-product-row.tsx` | catalog memoized row 与 typed callback prop |
| `product-catalog-performance-page.tsx` | local draft、URL commit、memo/callback composition |
| `memoized-order-row.tsx` | orders memoized row |
| `seller-orders-performance-page.tsx` | cheap filter、status URL state、stable open callback |
| `performance-preferences-context.ts` | Context contract 与 typed consumer hook |
| `performance-preferences-provider.tsx` | stable provider value 与 state owner |
| `dashboard-performance-page.tsx` | expensive dashboard metric 与 unrelated state |
| `sellerhub-performance-layout.tsx` | shared eager shell、navigation、context consumer |
| `sellerhub-performance-workspace.tsx` | route-level lazy imports、Suspense、Profiler |

### 12.3 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-data.ts</span>
  </div>

```ts
export type PerformanceProduct = {
  id: string
  name: string
  category: 'lighting' | 'office'
  price: number
  inventory: number
}

export type PerformanceOrder = {
  id: string
  customer: string
  status: 'pending' | 'shipped'
  total: number
}

export const performanceProducts: PerformanceProduct[] = Array.from(
  { length: 80 },
  (_, index) => ({
    id: `product-${String(index + 1).padStart(3, '0')}`,
    name: `${index % 2 === 0 ? 'Studio Light' : 'Task Chair'} ${index + 1}`,
    category: index % 2 === 0 ? 'lighting' : 'office',
    price: 60 + ((index * 29) % 240),
    inventory: 3 + ((index * 11) % 40),
  }),
)

export const performanceOrders: PerformanceOrder[] = Array.from(
  { length: 60 },
  (_, index) => ({
    id: `order-${String(index + 1).padStart(3, '0')}`,
    customer: `Customer ${index + 1}`,
    status: index % 3 === 0 ? 'pending' : 'shipped',
    total: 75 + ((index * 47) % 500),
  }),
)
```
</div>

`PerformanceProduct`/`PerformanceOrder` 是 compile-time contracts；browser runtime 得到的只是 arrays/objects。stable module arrays 让 row `product`/`order` references 在无数据变化时可复用。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/derive-visible-products.ts</span>
  </div>

```ts
import type { PerformanceProduct } from './sellerhub-performance-data'

export type ProductSort = 'price-asc' | 'price-desc'

export type VisibleProductResult = {
  checksum: number
  products: PerformanceProduct[]
}

export function deriveVisibleProducts(
  products: PerformanceProduct[],
  query: string,
  sort: ProductSort,
): VisibleProductResult {
  let checksum = 0

  for (let index = 0; index < 80_000; index += 1) {
    checksum = (checksum + index + products.length) % 2_009
  }

  const normalizedQuery = query.trim().toLowerCase()
  const visibleProducts = products
    .filter((product) => product.name.toLowerCase().includes(normalizedQuery))
    .sort((left, right) =>
      sort === 'price-asc' ? left.price - right.price : right.price - left.price,
    )

  return { checksum, products: visibleProducts }
}
```
</div>

该 function 只读取 parameters，返回新 result/array，不 mutate source。人工 loop 让教学场景可测量；真实项目应先用真实数据和 Profiler 证明成本，而不是制造计算。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/memoized-product-row.tsx</span>
  </div>

```tsx
import { memo } from 'react'
import type { PerformanceProduct } from './sellerhub-performance-data'

type MemoizedProductRowProps = {
  product: PerformanceProduct
  onSelect: (productId: string) => void
}

export const MemoizedProductRow = memo(function ProductRow({
  product,
  onSelect,
}: MemoizedProductRowProps) {
  return (
    <li className="sellerhub-performance-row">
      <div>
        <strong>{product.name}</strong>
        <span>{product.category} / {product.inventory} in stock</span>
      </div>
      <span>${product.price}</span>
      <button onClick={() => onSelect(product.id)} type="button">
        Inspect
      </button>
    </li>
  )
})
```
</div>

row 的 bailout 前提是 `product` 与 `onSelect` reference 都稳定。TypeScript 检查 callback 参数，却不检查 parent 是否每次创建新 function。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/product-catalog-performance-page.tsx</span>
  </div>

```tsx
import { useCallback, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router'
import { deriveVisibleProducts } from './derive-visible-products'
import type { ProductSort } from './derive-visible-products'
import { MemoizedProductRow } from './memoized-product-row'
import { performanceProducts } from './sellerhub-performance-data'

type CatalogFilterFormProps = {
  initialQuery: string
  initialSort: ProductSort
  onCommit: (query: string, sort: ProductSort) => void
}

function CatalogFilterForm({ initialQuery, initialSort, onCommit }: CatalogFilterFormProps) {
  const [queryDraft, setQueryDraft] = useState(initialQuery)
  const [sortDraft, setSortDraft] = useState<ProductSort>(initialSort)

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    onCommit(queryDraft, sortDraft)
  }

  return (
    <form className="sellerhub-performance-filters" onSubmit={handleSubmit}>
      <label className="performance-field">
        <span>Local query draft</span>
        <input onChange={(event) => setQueryDraft(event.currentTarget.value)} value={queryDraft} />
      </label>
      <label className="performance-field">
        <span>Sort draft</span>
        <select
          onChange={(event) => setSortDraft(event.currentTarget.value as ProductSort)}
          value={sortDraft}
        >
          <option value="price-asc">Price ascending</option>
          <option value="price-desc">Price descending</option>
        </select>
      </label>
      <button type="submit">Commit filters to URL</button>
    </form>
  )
}

function parseSort(value: string | null): ProductSort {
  return value === 'price-asc' ? 'price-asc' : 'price-desc'
}

export default function ProductCatalogPerformancePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const committedQuery = searchParams.get('q') ?? ''
  const committedSort = parseSort(searchParams.get('sort'))
  const visibleResult = useMemo(
    () => deriveVisibleProducts(performanceProducts, committedQuery, committedSort),
    [committedQuery, committedSort],
  )
  const handleCommitFilters = useCallback(
    (query: string, sort: ProductSort) => {
      const nextParams = new URLSearchParams()

      if (query.trim()) {
        nextParams.set('q', query.trim())
      }

      nextParams.set('sort', sort)
      setSearchParams(nextParams)
    },
    [setSearchParams],
  )
  const handleSelectProduct = useCallback((productId: string) => {
    setSelectedProductId(productId)
  }, [])

  return (
    <section>
      <div className="sellerhub-performance-heading">
        <div>
          <p>Lazy route page</p>
          <h3>Catalog performance boundary</h3>
        </div>
        <code>{visibleResult.products.length} visible / checksum {visibleResult.checksum}</code>
      </div>
      <CatalogFilterForm
        initialQuery={committedQuery}
        initialSort={committedSort}
        key={`${committedQuery}:${committedSort}`}
        onCommit={handleCommitFilters}
      />
      <p>Selected product: {selectedProductId ?? 'none'}</p>
      <ul className="sellerhub-performance-list">
        {visibleResult.products.slice(0, 12).map((product) => (
          <MemoizedProductRow
            key={product.id}
            onSelect={handleSelectProduct}
            product={product}
          />
        ))}
      </ul>
    </section>
  )
}
```
</div>

输入 draft state 下沉到 form，因此 typing 不触发 page derivation；submit 更新 URL 后，committed dependencies 改变，`useMemo` 重算。`key` 显式按 committed criteria 重置 form draft。错误对比是把 draft 提升到 page 并在每次 keypress 重算列表，或把 inline callback 传给 memoized rows。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/memoized-order-row.tsx</span>
  </div>

```tsx
import { memo } from 'react'
import type { PerformanceOrder } from './sellerhub-performance-data'

type MemoizedOrderRowProps = {
  onOpen: (orderId: string) => void
  order: PerformanceOrder
}

export const MemoizedOrderRow = memo(function OrderRow({
  onOpen,
  order,
}: MemoizedOrderRowProps) {
  return (
    <li className="sellerhub-performance-row">
      <div>
        <strong>{order.id}</strong>
        <span>{order.customer} / {order.status}</span>
      </div>
      <span>${order.total}</span>
      <button onClick={() => onOpen(order.id)} type="button">
        Open
      </button>
    </li>
  )
})
```
</div>

order row 与 product row 使用同一机制：domain object + typed stable action prop。这里不写 custom comparator，保持 correctness 与 comparison cost 可预测。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/seller-orders-performance-page.tsx</span>
  </div>

```tsx
import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router'
import { MemoizedOrderRow } from './memoized-order-row'
import { performanceOrders } from './sellerhub-performance-data'
import type { PerformanceOrder } from './sellerhub-performance-data'

type OrderStatus = 'all' | PerformanceOrder['status']

function parseStatus(value: string | null): OrderStatus {
  return value === 'pending' || value === 'shipped' ? value : 'all'
}

export default function SellerOrdersPerformancePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [openedOrderId, setOpenedOrderId] = useState<string | null>(null)
  const status = parseStatus(searchParams.get('status'))
  const visibleOrders = performanceOrders.filter(
    (order) => status === 'all' || order.status === status,
  )
  const handleOpenOrder = useCallback((orderId: string) => {
    setOpenedOrderId(orderId)
  }, [])

  function selectStatus(nextStatus: OrderStatus): void {
    setSearchParams(nextStatus === 'all' ? {} : { status: nextStatus })
  }

  return (
    <section>
      <div className="sellerhub-performance-heading">
        <div>
          <p>Lazy route page</p>
          <h3>Seller orders render boundary</h3>
        </div>
        <code>{visibleOrders.length} orders</code>
      </div>
      <div className="performance-segmented-control" role="group" aria-label="Order status">
        {(['all', 'pending', 'shipped'] as const).map((option) => (
          <button
            aria-pressed={status === option}
            key={option}
            onClick={() => selectStatus(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
      <p>Opened order: {openedOrderId ?? 'none'}</p>
      <ul className="sellerhub-performance-list">
        {visibleOrders.slice(0, 14).map((order) => (
          <MemoizedOrderRow key={order.id} onOpen={handleOpenOrder} order={order} />
        ))}
      </ul>
    </section>
  )
}
```
</div>

本页刻意不 memoize `performanceOrders.filter`：60 条 local mock data 的筛选便宜，直接计算更清楚。这是“不是所有 derived data 都要 `useMemo`”的 intentional contrast；row callback identity 才是 memoized child 实际观察的边界。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/performance-preferences-context.ts</span>
  </div>

```ts
import { createContext, useContext } from 'react'

export type Density = 'comfortable' | 'compact'

export type PerformancePreferences = {
  density: Density
  toggleDensity: () => void
}

export const PerformancePreferencesContext = createContext<PerformancePreferences | null>(null)

export function usePerformancePreferences(): PerformancePreferences {
  const preferences = useContext(PerformancePreferencesContext)

  if (!preferences) {
    throw new Error('usePerformancePreferences requires PerformancePreferencesProvider')
  }

  return preferences
}
```
</div>

Context contract 与 provider component 分开，使 consumer hook 只暴露 typed non-null result。runtime guard 处理 missing provider；TypeScript type 在 browser 中不会自动检查 provider presence。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/performance-preferences-provider.tsx</span>
  </div>

```tsx
import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { PerformancePreferencesContext } from './performance-preferences-context'
import type { Density } from './performance-preferences-context'

export function PerformancePreferencesProvider({ children }: { children: ReactNode }) {
  const [density, setDensity] = useState<Density>('comfortable')
  const toggleDensity = useCallback(() => {
    setDensity((currentDensity) =>
      currentDensity === 'comfortable' ? 'compact' : 'comfortable',
    )
  }, [])
  const value = useMemo(() => ({ density, toggleDensity }), [density, toggleDensity])

  return (
    <PerformancePreferencesContext.Provider value={value}>
      {children}
    </PerformancePreferencesContext.Provider>
  )
}
```
</div>

Provider 的 callback 与 value identity 只在语义依赖变化时失效。错误对比是 `value={{ density, toggleDensity: () => ... }}`，它会在 provider 每次 render 时通知 consumers。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/dashboard-performance-page.tsx</span>
  </div>

```tsx
import { useMemo, useState } from 'react'
import { performanceOrders, performanceProducts } from './sellerhub-performance-data'

function calculateDashboardMetric(sampleSize: number) {
  let checksum = 0

  for (let index = 0; index < sampleSize * 20_000; index += 1) {
    checksum = (checksum + index + performanceOrders.length) % 4_009
  }

  const revenue = performanceOrders
    .slice(0, sampleSize)
    .reduce((total, order) => total + order.total, 0)
  const lowInventory = performanceProducts.filter((product) => product.inventory < 10).length

  return { checksum, lowInventory, revenue }
}

export default function DashboardPerformancePage() {
  const [sampleSize, setSampleSize] = useState(12)
  const [noteDraft, setNoteDraft] = useState('')
  const metric = useMemo(() => calculateDashboardMetric(sampleSize), [sampleSize])

  return (
    <section>
      <div className="sellerhub-performance-heading">
        <div>
          <p>Lazy route page</p>
          <h3>Dashboard metric calculation</h3>
        </div>
        <code>checksum {metric.checksum}</code>
      </div>
      <label className="performance-field">
        <span>Order sample size: {sampleSize}</span>
        <input
          max="30"
          min="4"
          onChange={(event) => setSampleSize(Number(event.currentTarget.value))}
          type="range"
          value={sampleSize}
        />
      </label>
      <label className="performance-field">
        <span>Unrelated dashboard note</span>
        <input onChange={(event) => setNoteDraft(event.currentTarget.value)} value={noteDraft} />
      </label>
      <div className="sellerhub-metric-grid">
        <article>
          <span>Sample revenue</span>
          <strong>${metric.revenue}</strong>
        </article>
        <article>
          <span>Low inventory products</span>
          <strong>{metric.lowInventory}</strong>
        </article>
      </div>
    </section>
  )
}
```
</div>

sample size 改变时 metric 重算；只编辑 note 时 result cache 命中。calculation 保持 pure，不把 metric 复制进 state，也不使用 Effect 同步 derived data。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-layout.tsx</span>
  </div>

```tsx
import { NavLink, Outlet } from 'react-router'
import { usePerformancePreferences } from './performance-preferences-context'

function performanceLinkClassName({ isActive }: { isActive: boolean }): string {
  return isActive
    ? 'sellerhub-performance-link sellerhub-performance-link-active'
    : 'sellerhub-performance-link'
}

export function SellerHubPerformanceLayout() {
  const preferences = usePerformancePreferences()

  return (
    <section className={`sellerhub-performance-workspace density-${preferences.density}`}>
      <header className="sellerhub-performance-header">
        <div>
          <p className="performance-practice-kicker">Final project</p>
          <h2>SellerHub Performance Workspace</h2>
        </div>
        <button onClick={preferences.toggleDensity} type="button">
          Density: {preferences.density}
        </button>
      </header>
      <nav aria-label="Performance workspace" className="sellerhub-performance-nav">
        <NavLink className={performanceLinkClassName} to="/performance/catalog">
          Catalog
        </NavLink>
        <NavLink className={performanceLinkClassName} to="/performance/orders">
          Orders
        </NavLink>
        <NavLink className={performanceLinkClassName} to="/performance/dashboard">
          Dashboard
        </NavLink>
      </nav>
      <div className="sellerhub-performance-stage">
        <Outlet />
      </div>
    </section>
  )
}
```
</div>

Layout 是 eager shell，避免每个 page chunk 重复导航。它读取 preferences context；density 真正变化时 layout 更新是必要 work，而不是应被 memo 阻止的 work。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-workspace.tsx</span>
  </div>

```tsx
import { lazy, Profiler, Suspense } from 'react'
import type { ProfilerOnRenderCallback } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { PerformancePreferencesProvider } from './performance-preferences-provider'
import { SellerHubPerformanceLayout } from './sellerhub-performance-layout'

const LazyCatalogPage = lazy(() => import('./product-catalog-performance-page'))
const LazyOrdersPage = lazy(() => import('./seller-orders-performance-page'))
const LazyDashboardPage = lazy(() => import('./dashboard-performance-page'))

const handleWorkspaceRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
) => {
  console.info('SellerHub performance profile', {
    actualDuration,
    baseDuration,
    id,
    phase,
  })
}

export function SellerHubPerformanceWorkspace() {
  return (
    <PerformancePreferencesProvider>
      <Profiler id="SellerHubPerformanceWorkspace" onRender={handleWorkspaceRender}>
        <Suspense
          fallback={<p className="performance-loading-state">Loading page code chunk...</p>}
        >
          <Routes>
            <Route element={<SellerHubPerformanceLayout />} path="/performance">
              <Route element={<Navigate replace to="catalog" />} index />
              <Route element={<LazyCatalogPage />} path="catalog" />
              <Route element={<LazyOrdersPage />} path="orders" />
              <Route element={<LazyDashboardPage />} path="dashboard" />
              <Route element={<Navigate replace to="catalog" />} path="*" />
            </Route>
          </Routes>
        </Suspense>
      </Profiler>
    </PerformancePreferencesProvider>
  )
}
```
</div>

三个 module-scope lazy declarations 建立 page-level chunks。route change 让 React 尝试 render 对应 lazy component；首次访问触发 network request，Suspense 提供 code-loading fallback，成功后 Profiler 记录 committed subtree。该 fallback 不表示业务数据 request 状态，也不处理 module load error。

### 12.4 完整执行链

1. `BrowserRouter` adapter 将当前 URL 提供给 workspace；`Routes` 选择 page branch。
2. 首次进入 route 时 dynamic import 请求对应 Vite chunk，`Suspense` 暂时显示 fallback。
3. Catalog draft 只更新 form owner；submit 才修改 search params 并触发 page derivation。
4. `useMemo` 复用或重算 visible result；rows 通过 stable domain objects 与 callbacks 决定 memo bailout。
5. Preferences provider 只在 density 改变时产生新 value；真实 consumers 更新。
6. Profiler 在 commit 后提供 `actualDuration`/`baseDuration`，browser Network/Performance 面板补充 chunk、layout、paint 证据。

### 12.5 Runtime、类型与工具链边界

| 层 | 本项目实际职责 |
|---|---|
| JavaScript runtime | 创建 arrays/objects/closures，执行 derivation，运行 dynamic import Promise |
| React render/reconciliation | 调用 components，按 type/key/position 匹配，执行 memo/dependency/context decisions |
| Browser | event、URL、DOM commit 后 layout/paint、chunk network request |
| TypeScript | 检查 props、callback、union、module types；运行时被擦除，不判断性能 |
| Vite/Rollup | 转换 TSX，分析 dynamic imports，输出 route/page chunks |
| Profiling tooling | 提供 render/network/main-thread evidence，不替代机制判断 |

### 12.6 验证步骤

1. 打开 `/performance/practice`，按 01–12 顺序复现实验。
2. 在 catalog 输入 draft，确认 URL 与列表未逐键变化；提交后 URL 和 derived result 同步变化。
3. 在 React Profiler 中比较 row selection、filter commit、density toggle。
4. 打开 Network，禁用 cache 后依次访问三个页面，确认首次出现独立 JavaScript chunk request。
5. 运行 production build，确认 catalog/orders/dashboard 形成独立输出 chunks。

## 13. 额外速查表

| 现象 | 先问什么 | 可能手段 |
|---|---|---|
| parent typing 让大 subtree render | state owner 是否过高 | colocation/composition |
| expensive pure filter 重复执行 | dependencies 是否稳定且有证据 | `useMemo` |
| memo row 仍 render | 哪个 prop reference 变化 | 简化 props、必要时 `useCallback`/`useMemo` |
| context consumers 全部更新 | provider value 是否新 object | context 粒度、stable value |
| 首屏 JS 大 | 哪些 page 并非首屏必需 | route-level `lazy`/`Suspense` |
| 只看到 console render log | DOM/用户体验真的慢吗 | Profiler + browser Performance |

## 14. 最终文件清单

### 本次创建的学习指导文件

- `docs/react/chapter-11-performance-memoization/react-chapter-11-learning-guide.md`

### 本章真实练习与最终项目文件

- `src/learning/react/chapter-11-performance-memoization/chapter-11-practice-root.tsx`
- `src/learning/react/chapter-11-performance-memoization/chapter-11-practice.css`
- `src/learning/react/chapter-11-performance-memoization/01-render-commit-boundary/render-commit-boundary.tsx`
- `src/learning/react/chapter-11-performance-memoization/02-parent-child-render/parent-child-render-boundary.tsx`
- `src/learning/react/chapter-11-performance-memoization/03-reconciliation-key-identity/reconciliation-key-identity.tsx`
- `src/learning/react/chapter-11-performance-memoization/04-react-memo-shallow-compare/react-memo-shallow-compare.tsx`
- `src/learning/react/chapter-11-performance-memoization/05-referential-equality-props/referential-equality-props.tsx`
- `src/learning/react/chapter-11-performance-memoization/06-usememo-derived-data/usememo-expensive-derived-data.tsx`
- `src/learning/react/chapter-11-performance-memoization/07-usecallback-identity/usecallback-function-identity.tsx`
- `src/learning/react/chapter-11-performance-memoization/08-memo-callback-composition/memo-callback-composition.tsx`
- `src/learning/react/chapter-11-performance-memoization/09-state-colocation/state-colocation-render-scope.tsx`
- `src/learning/react/chapter-11-performance-memoization/10-context-value-boundary/context-value-identity-boundary.tsx`
- `src/learning/react/chapter-11-performance-memoization/11-profiler-evidence/profiler-render-evidence.tsx`
- `src/learning/react/chapter-11-performance-memoization/12-lazy-suspense-code-splitting/lazy-dashboard-panel.tsx`
- `src/learning/react/chapter-11-performance-memoization/12-lazy-suspense-code-splitting/lazy-suspense-code-splitting.tsx`
- `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-data.ts`
- `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/derive-visible-products.ts`
- `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/memoized-product-row.tsx`
- `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/product-catalog-performance-page.tsx`
- `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/memoized-order-row.tsx`
- `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/seller-orders-performance-page.tsx`
- `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/performance-preferences-context.ts`
- `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/performance-preferences-provider.tsx`
- `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/dashboard-performance-page.tsx`
- `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-layout.tsx`
- `src/learning/react/chapter-11-performance-memoization/sellerhub-performance-workspace/sellerhub-performance-workspace.tsx`

`src/App.tsx` 与 `README.md` 是已有根文件的必要更新，不属于本章源码清单；文档中的 conceptual contrast 没有伪装为真实文件，也不进入清单。

## 15. 如何转换成个人笔记

为每个交互记录五列：trigger、JS allocation/calculation、React work、browser work、evidence。再记录“未优化版本”“采用的最小优化”“移除优化是否仍正确”。这样复习重点是 invalidation mechanism，不是背 API。

## 16. 必须能回答的问题

1. re-render 为什么不等于 DOM 重建？
2. parent state 更新时普通 child 默认发生什么？
3. type、position 与 key 如何决定 state identity？
4. `memo` 默认比较什么，不能阻止什么？
5. 为什么 inline object/function 会破坏 memo bailout？
6. `useMemo` 与 `useCallback` 分别缓存什么？
7. 为什么 state colocation 常优先于 memoization？
8. Context consumer 为什么可能绕过 props memo？
9. `actualDuration` 与 `baseDuration` 提供什么证据？
10. dynamic import、Vite chunk、`lazy`、`Suspense` 各负责什么？
11. TypeScript 为什么不能判断 render 是否昂贵？
12. SellerHub catalog typing 卡顿时，你会按什么顺序定位？

## 17. 最终记忆模型

性能优化不是“减少所有 render”，而是减少已证实的、昂贵的、可避免的 work：

1. render 是 pure calculation，commit 才接触 DOM，browser 再 layout/paint。
2. React 通过 type/position/key 管理 identity，通过 `Object.is` 管理 props/deps/context comparisons。
3. 优先修正 state owner、derived data 和 component boundary。
4. `memo` 缓存 component render boundary，`useMemo` 缓存 result，`useCallback` 缓存 function reference。
5. `lazy`/`Suspense` 改变 code delivery timing，不改变业务 data lifecycle。
6. Profiler、Network 与 Performance evidence 决定优化是否成立。

## 18. 官方文档阅读清单

### 主要依据

- React：[Render and Commit](https://react.dev/learn/render-and-commit)
- React：[Keeping Components Pure](https://react.dev/learn/keeping-components-pure)
- React：[Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- React API：[memo](https://react.dev/reference/react/memo)
- React API：[useMemo](https://react.dev/reference/react/useMemo)
- React API：[useCallback](https://react.dev/reference/react/useCallback)
- React API：[Profiler](https://react.dev/reference/react/Profiler)
- React API：[lazy](https://react.dev/reference/react/lazy)
- React API：[Suspense](https://react.dev/reference/react/Suspense)
- React API：[useContext](https://react.dev/reference/react/useContext)
- TypeScript：[TypeScript for the New Programmer](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- MDN：[import()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
- Vite：[Features - Dynamic Import](https://vite.dev/guide/features.html#dynamic-import)

### 本地辅助资料与时效说明

- `references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf`：参考 parent/child render、`memo`、`useMemo`、`useCallback` 与“避免过早优化”的教学顺序。书中为减少日志而关闭 Strict Mode 的建议不作为现代默认实践；本章保留 Strict Mode，并解释 development extra calls。
- `references/books/react/full-stack-react-projects.pdf`：仅参考 code-splitting 的历史动机。其 Webpack 4 与 React Loadable 写法已过时，本章采用当前 React `lazy`/`Suspense` 与 Vite dynamic import。

官方 React/Vite/MDN 文档是 API 与 runtime behavior 的主要依据；本地 PDF 只作为辅助材料。后续方向包括 virtualization、server pagination、framework data/cache、server rendering 和 React Compiler，但本章不配置或实现这些能力。
