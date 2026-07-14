# React 第 22 章：State Architecture、Server State、URL State 与 Form State Boundary

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
  - [9.1 State architecture boundary：state owner before state API](#section-9-1)
  - [9.2 Local UI state and derived values：avoid redundant state](#section-9-2)
  - [9.3 Duplicated state and normalized state：entity identity and selection](#section-9-3)
  - [9.4 Form draft state：controlled inputs, touched, dirty, and validation owner](#section-9-4)
  - [9.5 Lifted state：shared state and closest common owner](#section-9-5)
  - [9.6 State colocation vs over-lifting：keeping state near its true owner](#section-9-6)
  - [9.7 Reducer state：action-driven transitions and impossible states](#section-9-7)
  - [9.8 Context boundary：provider scope, value identity, and read-many state](#section-9-8)
  - [9.9 Reducer plus context：scaling local domain state without external libraries](#section-9-9)
  - [9.10 URL state：search params, shareable filters, and navigation boundary](#section-9-10)
  - [9.11 URLSearchParams parsing：strings, arrays, defaults, and runtime validation](#section-9-11)
  - [9.12 Server state boundary：remote source of truth and request lifecycle state](#section-9-12)
  - [9.13 Request status model：idle, pending, success, error, refetch, and empty](#section-9-13)
  - [9.14 Optimistic state and rollback：pending user intent vs confirmed server data](#section-9-14)
  - [9.15 State preservation and reset：key, route identity, entity identity](#section-9-15)
  - [9.16 External store vs React state vs URL state：choosing the right owner](#section-9-16)
  - [9.17 SellerHub state architecture mapping：catalog, filters, orders, dashboard, settings](#section-9-17)
  - [9.18 Final mini project：SellerHub State Boundary Lab](#section-9-18)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标](#121-项目目标)
  - [12.2 为什么适合本章](#122-为什么适合本章)
  - [12.3 最终小项目结构](#123-最终小项目结构)
  - [12.4 文件职责](#124-文件职责)
  - [12.5 运行方式](#125-运行方式)
  - [12.6 预期交互结果](#126-预期交互结果)
  - [12.7 核心执行流程](#127-核心执行流程)
  - [12.8 常见错误](#128-常见错误)
  - [12.9 可选扩展](#129-可选扩展)
- [13. 额外速查表](#13-额外速查表)
- [14. 工程迁移与代码审查要点](#14-工程迁移与代码审查要点)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章机制地图

| Mechanism | Owner / Boundary | Runtime Layer | Project Scenario | Source Reading Path |
| --- | --- | --- | --- | --- |
| State owner | 改变该值并承担同步责任的 owner | React framework + JavaScript runtime | 先判断 SellerHub filter、selection、orders、form draft 分别由谁拥有 | `src/learning/react/chapter-22-state-architecture-server-url-form-boundary/01-state-owner-boundary/state-owner-boundary-panel.tsx` |
| Derived state | 从 source state 在 render 中计算出的值 | React render snapshot | catalog query 推导 visible products 和 count | `src/learning/react/chapter-22-state-architecture-server-url-form-boundary/02-local-derived-state/local-derived-state-model.ts` |
| Normalized entity state | entity collection 拥有对象，selection 只保存 id | JavaScript object identity + React state snapshot | selected product 不复制 product object | `src/learning/react/chapter-22-state-architecture-server-url-form-boundary/03-normalized-state/normalized-entity-state-panel.tsx` |
| Form draft boundary | form component 拥有尚未提交的 draft、touched、dirty | Browser input event + React controlled field | settings form 修改前不污染 server snapshot | `src/learning/react/chapter-22-state-architecture-server-url-form-boundary/sellerhub-state-boundary-lab/settings-form-state-panel.tsx` |
| Reducer transition | reducer 拥有复杂状态转换规则 | JavaScript pure function + TypeScript union | orders workflow 和 request status 阻止 impossible state | `src/learning/react/chapter-22-state-architecture-server-url-form-boundary/13-request-status/request-status-reducer.ts` |
| Context provider scope | provider 拥有可被 descendants 读取的 value boundary | React context propagation | small SellerHub domain 不变成 app-wide dumping ground | `src/learning/react/chapter-22-state-architecture-server-url-form-boundary/08-context-boundary/context-provider-boundary-panel.tsx` |
| URL state | URL search params 拥有可分享、可回退、可收藏的 navigation state | Browser URL + React Router hook | catalog filter 可复制链接 | `src/learning/react/chapter-22-state-architecture-server-url-form-boundary/10-url-state/url-search-state-panel.tsx` |
| Server state boundary | remote source owns confirmed data；client owns request snapshot | Remote boundary + client state | orders data 不是 `useState` 真正拥有的业务事实 | `src/learning/react/chapter-22-state-architecture-server-url-form-boundary/12-server-state-boundary/server-state-boundary-panel.tsx` |
| Optimistic boundary | pending intent 与 confirmed server data 分离 | React state + async boundary | order note 可 rollback | `src/learning/react/chapter-22-state-architecture-server-url-form-boundary/sellerhub-state-boundary-lab/optimistic-order-note-panel.tsx` |
| External store boundary | external source 负责订阅和 snapshot | React `useSyncExternalStore` + external subscription | inventory feed 可能在 React event 外更新 | `src/learning/react/chapter-22-state-architecture-server-url-form-boundary/16-external-url-react-state/state-owner-comparison-panel.tsx` |

## 0. 本章工程问题与边界

本章把 state architecture 当作“谁拥有值、谁负责同步、谁只是读取 snapshot”的工程问题，而不是把更多 `useState`、`useReducer`、Context、URL params 放进同一个工具箱里。React 文档强调 redundant 或 duplicate state 会成为常见 bug 来源；本章把这个原则扩展到 SellerHub 这类真实页面：catalog filter、selected product、orders request、settings form draft、dashboard tab、optimistic note、inventory feed 都不能被同一个“全局 state bucket”吞掉。

本章边界如下：

- derived state 通常在 render 中从 source state 计算，不用 effect 再同步一份；
- duplicated state 会制造“两个 owner 同时声称自己是事实来源”的同步 bug；
- URL state 是 user-visible navigation state，适合小型、可序列化、可分享的 filter；
- server state 的 owner 是 remote source，client 只能保存 data snapshot、request status、cache key 和 refetch boundary；
- Context 传递 value，不自动提供完整 state-management discipline；
- TypeScript 能约束 state model 的静态形状，但不能替你 parse URL string、HTTP payload 或 browser storage；
- 本章不安装 Redux、Zustand、Jotai、MobX、TanStack Query、SWR、React Hook Form、Zod、Valibot，也不创建 backend、database 或 fake server cache。

## 1. 本章解决的问题

你会在真实项目里遇到这些症状：filter 改了但表格没改、URL 不能分享当前页面、settings form 切 seller 后保留了上一个 seller 的 draft、orders 已经 refetch 失败但页面仍显示成 success、Context provider 把无关值放进一个对象导致大量 consumer 重渲染。它们表面上是“状态太多”，本质上是 owner 和 boundary 没有定义。

本章解决三个判断问题：

1. 一个值应由 component、closest common parent、reducer、context provider、URL、remote source、external store，还是 form owner 拥有？
2. 一个值是 source state、derived value、request status、form draft、validation result、optimistic intent，还是 confirmed server data？
3. 当 identity 改变时，是应 preserve state，还是用 key / route identity / entity identity reset？

## 2. 前置概念

| Concept | Why It Matters |
| --- | --- |
| React render snapshot | state setter 不会改写当前 render 中的 binding，下一次 render 才拿到新 snapshot。 |
| Controlled input | form draft state 通过 `value` 和 `onChange` 把 browser 候选值送回 React owner。 |
| Array/object immutability | normalized state 和 reducer transition 都依赖新 reference 表示变更。 |
| TypeScript union | request status、workflow status、action object 需要 discriminated union 阻止 impossible state。 |
| Browser URL | `URLSearchParams` 把所有值变成 string boundary，需要 runtime parser。 |
| React Router search params | 当前项目已安装 `react-router`，本章 runnable URL state 示例复用现有 router。 |

## 3. 学习目标

完成本章后，你应该能：

- 画出一个 feature 的 state owner map；
- 判断哪些值应 derived，而不是 stored；
- 识别 duplicated entity object、selected object、redundant count、over-lifted dropdown flag；
- 用 reducer 表达复杂 transition，而不是散落多个 boolean setter；
- 给 Context provider 划定 scope，并解释 provider value identity 对 consumer 的影响；
- 解析和序列化 URL search params，解释为什么 TypeScript 不会自动做 runtime parsing；
- 把 server data、request status、cache key、refetching、optimistic pending item 分开建模；
- 用 key、route identity 和 entity identity 控制 preserve/reset；
- 为 SellerHub state architecture 写出 test evidence。

## 4. 机制依赖图

| First Understand | Then Understand | Dependency Reason | Failure If Skipped |
| --- | --- | --- | --- |
| Render snapshot | Derived state | derived value 必须从本次 render 的 source snapshot 计算 | 把 `filteredCount` 存成第二份 state，忘记同步 |
| State owner | Lifting state | lifting 不是“往上搬”，而是把 owner 移到 closest common owner | app root 拥有所有 dropdown、tab、form draft |
| Entity identity | Normalized state | selected id 只有在 entity collection 是 source of truth 时才安全 | selected object 与 list object 分叉 |
| Action object | Reducer transition | reducer 用 action 描述事件，再由 pure function 计算 next state | 多个 booleans 组成 impossible state |
| Provider scope | Reducer plus context | context consumer 会订阅 provider value identity | 一个 app-wide provider 触发无关 consumer 更新 |
| Runtime string parsing | URL state | URL 只有 string，不能直接相信 TypeScript 类型 | `Boolean(params.get('inStock'))` 把 `"false"` 解析成 true |
| Remote ownership | Request status | server data 与 request lifecycle 是不同值 | loading、error、data 同时存在且互相矛盾 |
| Component identity | Key reset | key 改变意味着 React 把 state cell 当作新 owner | seller 切换后保留了上一个 seller 的 draft |

## 5. 核心术语表

| Term | 中文说明 | Layer | Why It Matters |
| --- | --- | --- | --- |
| State owner | 唯一负责写入和同步某个 source state 的位置 | React framework | 决定 state 放在哪，而不是先决定用什么 hook |
| Derived value | 从 source state 计算出的值 | JavaScript runtime + React render | 避免 redundant state 和 effect synchronization |
| Normalized state | entity map / array 保存 entity，selection 保存 id | JavaScript object identity | 避免 selected object 与 source list 分叉 |
| Form draft | 用户正在编辑但尚未提交的字段 snapshot | Browser input + React state | 不应默认进入 URL、global context 或 server snapshot |
| URL state | URL search params 中的 navigation state | Browser platform + router | 可分享、可 bookmark、参与 back/forward |
| Server state | remote source 拥有的 confirmed data | network / remote boundary | client 只能持有 snapshot、status、cache key |
| Request status | request lifecycle 的 state | reducer / component state | 与 server data 是不同值 |
| Optimistic state | 暂时展示 pending user intent | async UI boundary | 必须能 rollback 或标记 pending |
| External store | React 外部拥有 snapshot 和 subscription 的 store | external runtime | 用 `useSyncExternalStore` 读取，而不是复制多份 |
| Key identity | React 用于区分 sibling identity 的 key | React reconciliation | 控制 state preserve / reset |

## 6. 底层心智模型

React state architecture 的第一问题不是“这个值用不用 hook”，而是“这个值的事实来源在哪里”。一个 component function 每次 render 只拿到一组固定 snapshot。event handler 捕获该 snapshot；setter、dispatch、router setter 或 external subscription 会请求下一次 snapshot。只要你把同一个事实复制到两个 owner，就必须写同步逻辑；同步逻辑越多，越容易出现过期 closure、遗漏 branch、wrong URL parsing、request impossible state。

因此本章用一条判断链贯穿所有例子：

1. 这个值是否由用户可见导航决定？如果是，优先考虑 URL state。
2. 这个值是否是 remote confirmed data？如果是，client 只保存 snapshot 与 request lifecycle。
3. 这个值是否只是当前 render 可从 source state 算出？如果是，derived，不存。
4. 多个 sibling 是否必须同步读取和更新同一值？如果是，lifting 到 closest common owner。
5. transition 是否复杂到多个 setter 难以保证合法状态？如果是，reducer。
6. 多个 distant descendants 是否都需要读同一 domain value？如果是，再考虑 scoped Context。
7. 值是否来自 React 外部并需要 subscription？如果是，external store boundary。

## 7. 推荐目录结构

### 当前项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Current project structure</span>
  </div>

```txt
D:/vite_ts/
  README.md
  package.json
  src/
    App.tsx
    site/
      data/
        learning-manifest.ts
    learning/
      react/
        chapter-22-state-architecture-server-url-form-boundary/
```
</div>

### 本章文档结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Chapter document structure</span>
  </div>

```txt
docs/
  react/
    chapter-22-state-architecture-server-url-form-boundary/
      react-chapter-22-learning-guide.md
```
</div>

### 本章代码定位索引

| Learning Area | Source Reading Path |
| --- | --- |
| owner boundary | `src/learning/react/chapter-22-state-architecture-server-url-form-boundary/01-state-owner-boundary/state-owner-boundary-panel.tsx` |
| derived state model | `src/learning/react/chapter-22-state-architecture-server-url-form-boundary/02-local-derived-state/local-derived-state-model.ts` |
| URL codec | `src/learning/react/chapter-22-state-architecture-server-url-form-boundary/11-url-search-params/search-param-codec.ts` |
| request status reducer | `src/learning/react/chapter-22-state-architecture-server-url-form-boundary/13-request-status/request-status-reducer.ts` |
| final lab | `src/learning/react/chapter-22-state-architecture-server-url-form-boundary/sellerhub-state-boundary-lab/sellerhub-state-boundary-lab.tsx` |

### 概念示例结构

这些 snippets 只用于解释机制，不表示需要创建真实文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Conceptual snippets</span>
  </div>

```txt
Conceptual snippets:
  Snippet: wrong state bucket
  Snippet: corrected owner map
  Snippet: invalid URL boolean parser
  Snippet: keyed settings reset
```
</div>

### 最终小项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Final mini project structure</span>
  </div>

```txt
src/learning/react/chapter-22-state-architecture-server-url-form-boundary/
  sellerhub-state-boundary-lab/
    sellerhub-state-boundary-lab.tsx
    catalog-filter-url-state.tsx
    catalog-filter-codec.ts
    catalog-filter-codec-panel.tsx
    orders-request-state-panel.tsx
    orders-request-reducer.ts
    settings-form-state-panel.tsx
    dashboard-selection-state-panel.tsx
    optimistic-order-note-panel.tsx
    state-owner-decision-table.tsx
    state-architecture-review-card.tsx
```
</div>

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

打开 Vite 打印的本地 URL 后进入 `/react/chapter-22`。该页面是 client-side Vite React lab，不创建 backend，不安装 state/data/form libraries。

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 State architecture boundary：state owner before state API

**结论：**

先找 state owner，再选择 API。`useState`、`useReducer`、Context、URL、server snapshot、external store 不是同一种 owner，只是不同 owner boundary 的实现方式。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: corrected owner map</span>
  </div>

```ts
type StateOwner =
  | 'component'
  | 'closest-parent'
  | 'url'
  | 'remote-source'
  | 'external-store';

type OwnedState = {
  name: string;
  owner: StateOwner;
  reason: string;
};

const sellerHubStateMap: OwnedState[] = [
  { name: 'catalogQueryDraft', owner: 'component', reason: 'private typing state' },
  { name: 'catalogFilters', owner: 'url', reason: 'shareable navigation state' },
  { name: 'ordersData', owner: 'remote-source', reason: 'confirmed by server' },
];
```
</div>

**逐行解释：**

`StateOwner` 把可选 owner 限制为明确 union；`OwnedState` 把每个 state value 绑定到 owner 和 reason；`sellerHubStateMap` 不存真实数据，只描述 ownership decision。它的重点是让 code review 先讨论“谁写入、谁同步、谁读取”，而不是先争论 hook 名称。

**执行过程：**

当你为 `catalogFilters` 做 owner review 时，JavaScript runtime 只会创建普通 object；React 不会因为 object 名字自动知道它是否可分享；TypeScript 只能检查 `owner` 是否是 union 成员。工程判断必须来自你对 feature 的同步需求：filter 要进入 back/forward 和 bookmark，所以 owner 是 URL。

**错误边界：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: wrong state bucket</span>
  </div>

```ts
type AppStateBucket = {
  catalogQueryDraft: string;
  catalogFilters: Record<string, string>;
  ordersData: unknown[];
  settingsDraft: Record<string, string>;
};
```
</div>

这个 bucket 违反的规则是：同一个 object 不等于同一个 owner。它把 form draft、URL state、server snapshot、local UI state 放进一个容器，却没有说明哪一个值能被谁写入、何时 reset、如何 rollback。真实项目中，如果一个 `AppState` 类型同时出现 draft、server data、URL filter 和 toast flag，基本就是 owner review 的信号。

**机制证据链：**

触发动作是 code review 发现一个新 state；JavaScript 只创建 object reference；React 只在某个 component 或 provider 中保存 snapshot；TypeScript 只检查 property 是否存在；UI bug 来自多个 writer 同时改写同一事实；修正方式是给每个值一个 owner 和 boundary。

<a id="section-9-2"></a>

### 9.2 Local UI state and derived values：avoid redundant state

**结论：**

local UI state 保存 source value；derived value 从 source value 在 render 中计算。不要把 `visibleCount`、`fullName`、`filteredProducts` 这类可计算结果再存成第二份 state。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-22-state-architecture-server-url-form-boundary/02-local-derived-state/local-derived-state-model.ts</span>
  </div>

```ts
export function deriveLocalProductState(products: Product[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  const visibleProducts =
    normalizedQuery.length === 0
      ? products
      : products.filter((product) => product.name.toLowerCase().includes(normalizedQuery));

  return {
    query,
    visibleProducts,
    visibleCount: visibleProducts.length,
    totalCount: products.length,
    hasRedundantCountState: false,
  };
}
```
</div>

**逐行解释：**

函数参数 `products` 与 `query` 是 source values；`normalizedQuery` 是本次调用内的普通 local binding；`visibleProducts` 是从 source values 计算出的 derived array；返回对象中的 `visibleCount` 来自 `visibleProducts.length`，不是独立 state cell；`hasRedundantCountState` 明确表达该模型没有第二份 count owner。

**执行过程：**

用户在 input 中输入 `lamp` 后，handler 更新 `query` state；React 重新调用 owner component；本次 render 调用 `deriveLocalProductState(products, 'lamp')`；JavaScript 重新 filter array 并计算 count；UI 一次性读取 products、count 和 query 的同一 snapshot。

**错误边界：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: redundant count state</span>
  </div>

```tsx
const [query, setQuery] = useState('');
const [visibleCount, setVisibleCount] = useState(0);

function handleQueryChange(nextQuery: string) {
  setQuery(nextQuery);
  setVisibleCount(products.filter((product) => product.name.includes(nextQuery)).length);
}
```
</div>

错误点是 `visibleCount` 有了第二个 owner：它依赖 `query` 和 `products`，但代码只在 query handler 中更新。只要 products 从 server snapshot 更新、filter rule 改变、或 handler 使用过期 closure，count 就可能不一致。修正方式是在 render 中计算，或用 memoization 优化计算成本，但 memoized value 仍不是 source state。

**机制证据链：**

触发动作是 input change；JavaScript 创建 next query string；React queue 更新 query state cell；下一次 render 产生新 query snapshot；TypeScript 检查 query 是 string，但不会阻止 redundant state；结果正确来自 `visibleCount` 总是从本次 `visibleProducts` reference 读取。

<a id="section-9-3"></a>

### 9.3 Duplicated state and normalized state：entity identity and selection

**结论：**

如果 selected product 复制了 product object，就有两个 entity owner。更安全的结构是 source collection 拥有 entity，selection state 只保存 `selectedProductId`，render 时再派生 selected entity。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: selected id and entity map</span>
  </div>

```ts
type Product = { id: string; name: string; margin: number };

const productsById: Record<string, Product> = {
  'prd-101': { id: 'prd-101', name: 'Aurora Desk Lamp', margin: 28 },
  'prd-102': { id: 'prd-102', name: 'Mesa Storage Basket', margin: 18 },
};

const selectedProductId = 'prd-101';
const selectedProduct = productsById[selectedProductId];
```
</div>

**逐行解释：**

`Product` 定义 entity shape；`productsById` 是 entity source；`selectedProductId` 是 selection state 的最小值；`selectedProduct` 是 derived read。selection 变更只替换 id string，不复制 product reference。

**执行过程：**

用户点击第二个 product，handler 设置 `selectedProductId` 为 `prd-102`；React 下次 render 读取同一个 entity map，再用 id 查出 entity。若 product margin 后续更新，selected entity 会读取最新 map，而不是旧 object copy。

**错误边界：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: duplicated selected object</span>
  </div>

```ts
const selectedProduct = products.find((product) => product.id === selectedProductId);
const selectedProductState = selectedProduct;
```
</div>

如果 `selectedProductState` 被单独存入 state，它就可能和 `products` array 中的 object 分叉。识别信号是：更新 product list 后 detail panel 仍显示旧 name、旧 price 或旧 stock。

**机制证据链：**

触发动作是 selection click；JavaScript 保存 id string；React state cell 只保存 primitive id；TypeScript 检查 id 是 string，却不验证 id 是否存在于 runtime map；UI 通过 map lookup 得到当前 entity reference；错误形式违反 single source of truth。

<a id="section-9-4"></a>

### 9.4 Form draft state：controlled inputs, touched, dirty, and validation owner

**结论：**

form draft 是用户正在编辑的临时 source state；touched 表示交互过的字段；dirty 表示 draft 与 initial snapshot 不同；validation 可 derived，也可在 submit attempt 后显示。它们不应默认进入 URL、global Context 或 server state。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: settings draft owner</span>
  </div>

```tsx
const [draft, setDraft] = useState({
  storeName: initialSettings.storeName,
  supportEmail: initialSettings.supportEmail,
});
const [touched, setTouched] = useState({ supportEmail: false });

const isDirty =
  draft.storeName !== initialSettings.storeName ||
  draft.supportEmail !== initialSettings.supportEmail;

const supportEmailError =
  touched.supportEmail && !draft.supportEmail.includes('@')
    ? 'Support email must contain @.'
    : '';
```
</div>

**逐行解释：**

`draft` 拥有当前 input value；`touched` 拥有用户是否离开字段的 UI state；`isDirty` 是 derived value，不存；`supportEmailError` 是由 `draft` 与 `touched` 推导出的 validation display state。submit 前 draft 仍是 client-local intent，不是 remote confirmed settings。

**执行过程：**

browser input event 产生候选 string；handler 更新 `draft.supportEmail`；blur handler 设置 touched；下一次 render 计算 dirty 和 error；submit handler 才决定是否提交或显示 form-level alert。

**错误边界：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: wrong global form context</span>
  </div>

```tsx
<AppFormContext value={{ settingsDraft, setSettingsDraft }}>
  <SettingsPage />
</AppFormContext>
```
</div>

一个小型 settings form 如果只有自己读写 draft，把它放进 app-wide Context 会扩大 render blast radius，也让 reset by seller identity 变难。识别信号是：离开 settings page 后 draft 仍影响 unrelated page。

**机制证据链：**

触发动作是 input edit；JavaScript event handler 读取 `event.currentTarget.value`；React 保存 draft state cell；TypeScript 检查 field 是 string，但不验证 email；UI error 来自 render-time derived validation；错误形式违反 owner scope 最小化。

<a id="section-9-5"></a>

### 9.5 Lifted state：shared state and closest common owner

**结论：**

lifting state 不是把 state 放到最高层，而是移动到所有需要同步读写该值的 closest common owner。两个 sibling 各自保存同一 selection，就会分叉。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: closest common owner</span>
  </div>

```tsx
function RegionWorkspace() {
  const [selectedRegion, setSelectedRegion] = useState('North');

  return (
    <>
      <CatalogRegionFilter value={selectedRegion} onChange={setSelectedRegion} />
      <OrdersRegionReport region={selectedRegion} />
    </>
  );
}
```
</div>

**逐行解释：**

`RegionWorkspace` 是 `CatalogRegionFilter` 与 `OrdersRegionReport` 的 closest common owner；`selectedRegion` source state 只在父组件出现一次；child 通过 props 读取 value 或发送 event；sibling 不互相同步。

**执行过程：**

用户点击 filter；child 调用 `onChange('South')`；父组件 setter 排队；下一次 render 中两个 child 都收到同一个 `selectedRegion` snapshot。

**错误边界：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: duplicated sibling state</span>
  </div>

```tsx
function CatalogRegionFilter() {
  const [selectedRegion, setSelectedRegion] = useState('North');
  return <button onClick={() => setSelectedRegion('South')}>{selectedRegion}</button>;
}

function OrdersRegionReport() {
  const [selectedRegion] = useState('North');
  return <p>{selectedRegion}</p>;
}
```
</div>

这违反 closest common owner 规则。真实项目中，filter chip 已显示 South，但 report 仍查 North，就是 sibling duplicated state 的表现。

**机制证据链：**

触发动作是 child event；JavaScript 调用 callback prop；React 更新父 state cell；TypeScript 检查 callback 接受 string；UI 同步来自两个 child 共享同一父 snapshot；错误形式来自两个 state cell 各自保存同一事实。

<a id="section-9-6"></a>

### 9.6 State colocation vs over-lifting：keeping state near its true owner

**结论：**

如果一个值只有组件自己需要，应该 colocate；如果多个位置必须同步，才 lift。over-lifting 会扩大 render scope、增加 prop drilling、让 unrelated state reset 更难推理。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: colocated dropdown flag</span>
  </div>

```tsx
function ColumnMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <button onClick={() => setIsOpen((current) => !current)}>Columns</button>
      {isOpen ? <ColumnChoices /> : null}
    </section>
  );
}
```
</div>

**逐行解释：**

`ColumnMenu` 是 open flag 的真实 owner；`isOpen` 不影响 URL、server data 或 sibling；setter 只重算该 subtree；`ColumnChoices` 根据 local snapshot conditional render。

**执行过程：**

点击 button 后，JavaScript handler 调用 functional updater；React 用该 hook cell 的 previous value 计算 next value；下一次 render 决定是否渲染 `ColumnChoices`。

**错误边界：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: over-lifted dropdown flag</span>
  </div>

```tsx
function AppShell() {
  const [isCatalogColumnMenuOpen, setIsCatalogColumnMenuOpen] = useState(false);
  return <CatalogPage isMenuOpen={isCatalogColumnMenuOpen} onMenuOpenChange={setIsCatalogColumnMenuOpen} />;
}
```
</div>

这个写法不是语法错，而是 boundary 错：app shell 不需要知道某个 dropdown 是否打开。识别信号是 props 链很长、测试需要渲染 app shell 才能测试 dropdown、unrelated app state update 影响局部 UI。

**机制证据链：**

触发动作是局部 toggle；React state cell 如果位于 child，只影响 child owner；TypeScript 不知道 state 是否 over-lifted；UI blast radius 来自 owner 放置位置；修正方式是让 state 靠近唯一读写者。

<a id="section-9-7"></a>

### 9.7 Reducer state：action-driven transitions and impossible states

**结论：**

当状态转换有顺序、约束和非法路径时，reducer 比多个 scattered setters 更适合。reducer 不自动 global，它只是把 transition logic 从 component body 移到 pure function。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-22-state-architecture-server-url-form-boundary/07-reducer-transitions/order-workflow-reducer.ts</span>
  </div>

```ts
type OrderWorkflowState =
  | { status: 'draft'; selectedOrderId: string | null }
  | { status: 'reviewing'; selectedOrderId: string }
  | { status: 'submitting'; selectedOrderId: string };

type OrderWorkflowAction =
  | { type: 'select'; orderId: string }
  | { type: 'review' }
  | { type: 'submit' };

function orderWorkflowReducer(state: OrderWorkflowState, action: OrderWorkflowAction) {
  switch (action.type) {
    case 'review':
      return state.status === 'draft' && state.selectedOrderId !== null
        ? { status: 'reviewing', selectedOrderId: state.selectedOrderId }
        : state;
    case 'submit':
      return state.status === 'reviewing'
        ? { status: 'submitting', selectedOrderId: state.selectedOrderId }
        : state;
  }
}
```
</div>

**逐行解释：**

`OrderWorkflowState` 用 status discriminator 把合法形状拆开；draft 可以没有 selected order，reviewing 和 submitting 必须有 id；action union 表达用户 intent；reducer 根据 current state 和 action 返回 next state；invalid transition 返回原 state，避免 UI 进入 “submitting but no selected order”。

**执行过程：**

handler dispatch `{ type: 'submit' }`；React 把 current reducer state 与 action 交给 reducer；JavaScript switch 读取 action type；TypeScript 在每个 branch 缩窄 action；next state 被 React 保存到 reducer state cell。

**错误边界：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: scattered impossible booleans</span>
  </div>

```tsx
const [isReviewing, setIsReviewing] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
```
</div>

三个 independent state cells 可以组成 `isSubmitting=true` 且 `selectedOrderId=null`。违反的规则是：互斥状态不应拆成多个没有 transition guard 的 booleans。

**机制证据链：**

触发动作是 dispatch；JavaScript 创建 action object；React reducer hook cell 保存 current state；TypeScript discriminated union 检查 branch shape；observed UI 正确来自 reducer 阻止 illegal transition；识别信号是多个 boolean 名称互相排斥却没有统一 transition function。

<a id="section-9-8"></a>

### 9.8 Context boundary：provider scope, value identity, and read-many state

**结论：**

Context 解决的是“descendants 读 value 不想逐层传 props”，不是默认 global store。provider scope 越大，value identity 变化影响的 consumer 越多。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: scoped provider value</span>
  </div>

```tsx
const SellerViewContext = createContext<SellerView | null>(null);

function SellerViewProvider({ sellerId, region, children }: PropsWithChildren<SellerView>) {
  const value = useMemo(() => ({ sellerId, region }), [sellerId, region]);

  return <SellerViewContext value={value}>{children}</SellerViewContext>;
}
```
</div>

**逐行解释：**

context object 表示可提供的 value type；provider component 接收 domain inputs；`useMemo` 让 value object identity 只在 sellerId 或 region 改变时变化；provider scope 包住需要读取 SellerView 的 subtree，而不是整个 app。

**执行过程：**

region 改变后，React 重新调用 provider；`useMemo` 返回新 object；React 用 `Object.is` 比较 provider value；读取该 context 的 consumers 重新 render；不读该 context 的组件不应该为了这个 domain value 被包进同一 provider。

**错误边界：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: app-wide unrelated context</span>
  </div>

```tsx
<AppContext value={{ theme, cart, settingsDraft, catalogFilters, toast }}>
  <App />
</AppContext>
```
</div>

它违反 scope 和 value identity 规则：toast 改变可能让 settings consumer 也收到新 value object。真实项目中，Context 文件越来越大、consumer 只读一个字段却因无关字段更新重渲染，是 provider scope 失控信号。

**机制证据链：**

触发动作是 provider value 改变；JavaScript 创建或复用 object reference；React context propagation 通知 consumers；TypeScript 只检查 context value shape，不检查 scope 合理性；UI performance 问题来自过宽 provider。

<a id="section-9-9"></a>

### 9.9 Reducer plus context：scaling local domain state without external libraries

**结论：**

小型 domain state 可以用 reducer plus context：provider 拥有 reducer state，state context 提供 read，dispatch context 提供 write。它仍然是 scoped local architecture，不是 external library 的替代宣传。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: split state and dispatch contexts</span>
  </div>

```tsx
const DomainStateContext = createContext<DomainState | null>(null);
const DomainDispatchContext = createContext<Dispatch<DomainAction> | null>(null);

function DomainProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(domainReducer, initialDomainState);

  return (
    <DomainStateContext value={state}>
      <DomainDispatchContext value={dispatch}>{children}</DomainDispatchContext>
    </DomainStateContext>
  );
}
```
</div>

**逐行解释：**

两个 context 分离 read 和 write boundary；provider 拥有 reducer state cell；dispatch identity 由 React reducer hook 提供；children 在 scope 内读取 state 或 dispatch；scope 外读取必须被 guard 阻止。

**执行过程：**

consumer 调用 custom hook；hook 读取最近 provider；event dispatch action；React 用 reducer 计算 next domain state；state context consumers 读取新 state；dispatch-only consumer 不需要读取 state。

**错误边界：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: missing provider guard</span>
  </div>

```tsx
function useDomainState() {
  return useContext(DomainStateContext);
}
```
</div>

这个 hook 可能返回 null，让错误延迟到更深处。修正方式是发现 null 立即 throw 明确错误。识别信号是测试报 `Cannot read properties of null`，但不知道缺哪个 provider。

**机制证据链：**

触发动作是 custom hook call；React 通过 hook call position 执行 `useContext`；context lookup 向上找 provider；TypeScript 知道 return 可能是 null；guard 把错误定位到 boundary；reducer 可被独立单元测试。

<a id="section-9-10"></a>

### 9.10 URL state：search params, shareable filters, and navigation boundary

**结论：**

URL state 是 navigation state。适合放入 URL 的值应小、可序列化、可分享、用户可见，并能参与 back/forward。不是每次 keystroke 都必须 push history；当前项目可用 `react-router` 的 `useSearchParams`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: URL-backed catalog query</span>
  </div>

```tsx
function CatalogFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = parseCatalogFilters(searchParams);

  function updateQuery(query: string) {
    const nextFilters = { ...filters, query };
    setSearchParams(encodeCatalogFilters(nextFilters), { replace: true });
  }

  return <input value={filters.query} onChange={(event) => updateQuery(event.currentTarget.value)} />;
}
```
</div>

**逐行解释：**

`useSearchParams` 读取当前 URL search snapshot；parser 把 string boundary 变成 typed filters；handler 只创建 next filters，不直接 mutate old params；`setSearchParams` 更新 URL；`replace: true` 适合避免每个字符都增加一个 history entry。

**执行过程：**

用户输入 `lamp`；handler 编码 next filters；router 更新 URL；React location 变化后重新 render；parser 从 URL 读取同一个 query；input value 与 URL 同步。

**错误边界：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: local-only shareable filter failure</span>
  </div>

```tsx
const [query, setQuery] = useState('');
```
</div>

local-only query 不一定错；如果产品要求复制链接保留 filter，它就违反 navigation boundary。识别信号是刷新、复制 URL、back/forward 后 filter 丢失。

**机制证据链：**

触发动作是 URL search update；browser location 保存 string；React Router 提供 params snapshot；TypeScript 只知道 parser return type；UI 可分享来自 URL owner，而不是 component state。

<a id="section-9-11"></a>

### 9.11 URLSearchParams parsing：strings, arrays, defaults, and runtime validation

**结论：**

URLSearchParams 是 string boundary。`get` 返回 first string 或 null；`getAll` 返回 array；number、boolean、union、array 都要 runtime parser。TypeScript 不会替你 parse URL。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-22-state-architecture-server-url-form-boundary/11-url-search-params/search-param-codec.ts</span>
  </div>

```ts
export function parseCatalogFilters(params: URLSearchParams): CatalogFilters {
  return {
    query: params.get('q')?.trim() ?? '',
    minMargin: parseNonNegativeNumber(params.get('minMargin')),
    inStockOnly: params.get('inStock') === 'true',
    channels: parseChannels(params.getAll('channel')),
    sort: parseSort(params.get('sort')),
  };
}
```
</div>

**逐行解释：**

`params.get('q')` 处理 missing value；`minMargin` 交给 number parser，避免 `NaN`；boolean 只接受 exact `'true'`；channels 用 `getAll` 支持 duplicate keys；sort 用 union parser 拒绝未知值。

**执行过程：**

URL 中 `channel=marketplace&channel=direct` 进入 `URLSearchParams`；JavaScript `getAll` 返回 string array；parser filter allowed values；TypeScript 看到 return type 是 `CatalogFilters`，但这个可信度来自 runtime parser，而不是 annotation。

**错误边界：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: invalid URL boolean parser</span>
  </div>

```ts
const inStockOnly = Boolean(params.get('inStock'));
```
</div>

`Boolean('false')` 是 true，因为非空 string truthy。这违反 runtime parsing rule。真实项目中，如果 URL 写 `inStock=false` 仍只显示 in-stock items，就是这个错误。

**机制证据链：**

触发动作是读取 URL；JavaScript 把所有 search params 暴露为 string/null；React Router 不 parse domain model；TypeScript 不执行 runtime validation；正确 UI 来自 explicit parser。

<a id="section-9-12"></a>

### 9.12 Server state boundary：remote source of truth and request lifecycle state

**结论：**

server state 的 owner 是 remote source。client 可以缓存 snapshot、保存 request status、生成 cache key、触发 refetch，但不能声称本地 `useState` 拥有 confirmed server data。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: server snapshot boundary</span>
  </div>

```ts
type OrdersResource = {
  cacheKey: string;
  requestStatus: 'idle' | 'pending' | 'success' | 'error';
  dataSnapshot: Order[];
  lastUpdatedAt: string | null;
};
```
</div>

**逐行解释：**

`cacheKey` 标识这个 request 对应的 remote resource；`requestStatus` 描述 lifecycle；`dataSnapshot` 是 client 当前看到的 rows，不是 server 事实本身；`lastUpdatedAt` 帮助判断 staleness。这个类型没有 fake cache invalidation，也不创建 backend。

**执行过程：**

用户打开 orders；client 根据 sellerId 和 filter 生成 cache key；request pending；response 到达后保存 snapshot；remote source 以后仍可能改变，client 只能 refetch。

**错误边界：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: treating fetched rows as permanent owner</span>
  </div>

```ts
const [orders, setOrders] = useState<Order[]>([]);
```
</div>

这行不是永远错误；错误在于把 `orders` 命名和使用成 confirmed owner，不保存 status、cache key、staleness 或 refetch boundary。识别信号是 mutation 后本地 rows 被手工改了，但没有 refetch 或 invalidation 说明。

**机制证据链：**

触发动作是 request；remote source 负责事实；JavaScript promise 只返回一次 snapshot；React 保存 client data state；TypeScript 不知道数据是否 stale；UI 正确来自同时展示 data snapshot 与 request lifecycle。

<a id="section-9-13"></a>

### 9.13 Request status model：idle, pending, success, error, refetch, and empty

**结论：**

request status 应建模为 discriminated union，而不是 `isLoading`、`error`、`data` 三个可任意组合的值。empty 与 success 是不同 UI state；refetching 可能保留 last successful data。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-22-state-architecture-server-url-form-boundary/13-request-status/request-status-reducer.ts</span>
  </div>

```ts
type RequestState<TData> =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; data: TData }
  | { status: 'empty' }
  | { status: 'error'; message: string; previousData?: TData }
  | { status: 'refetching'; data: TData };
```
</div>

**逐行解释：**

idle 没有 data；pending 没有 data；success 必须带 data；empty 明确表示请求成功但无 rows；error 可带 previousData；refetching 必须带 old data。这个类型让 UI branch 根据 `status` 缩窄可访问字段。

**执行过程：**

dispatch start 后 state 变 pending；resolve rows 后变 success；再次 start 从 success 变 refetching 并保留 data；reject 后变 error with previousData。React 只保存一个 reducer state cell，而不是三个互相矛盾的 cells。

**错误边界：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: impossible request booleans</span>
  </div>

```ts
type RequestFlags<TData> = {
  isLoading: boolean;
  error: string | null;
  data: TData | null;
};
```
</div>

这个类型允许 `isLoading=true`、`error='Failed'`、`data=null` 或 `data=[]` 等 ambiguous combination。识别信号是 UI 同时显示 spinner、error 和 empty state。

**机制证据链：**

触发动作是 reducer action；JavaScript switch 返回 next object；React 保存一个 reducer state cell；TypeScript 根据 `status` 做 narrowing；observed UI branch 与 legal state shape 一一对应。

<a id="section-9-14"></a>

### 9.14 Optimistic state and rollback：pending user intent vs confirmed server data

**结论：**

optimistic state 表示 pending user intent，不是 confirmed server data。每个 optimistic item 必须能标记 pending、confirm 或 rollback。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: optimistic note model</span>
  </div>

```ts
type OrderNote = {
  id: string;
  text: string;
  status: 'confirmed' | 'pending';
};

function rollbackPendingNotes(notes: OrderNote[]) {
  return notes.filter((note) => note.status === 'confirmed');
}
```
</div>

**逐行解释：**

`status` 把 pending intent 和 confirmed note 分开；temporary id 可以用于 UI key；rollback function 只保留 confirmed notes；pending item 不会污染 server-owned confirmed data。

**执行过程：**

用户点击 add note；component 立即添加 pending note；request 成功时把 pending note 标成 confirmed；request 失败时 rollback；UI 期间必须显示 pending boundary，避免用户以为 server 已接受。

**错误边界：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: mutating confirmed rows as optimistic state</span>
  </div>

```ts
confirmedNotes.push({ id: 'note-2', text: 'Fragile label' });
```
</div>

它违反 immutability 和 server boundary：直接 mutation 既不产生 React 可追踪的新 reference，也把 pending intent 当成 confirmed data。识别信号是失败后 UI 无法知道要撤销哪一条。

**机制证据链：**

触发动作是 optimistic submit；JavaScript 创建 pending object；React 保存 local pending state；TypeScript 检查 status union；UI pending badge 来自 status；rollback 根据 status 删除 pending item。

<a id="section-9-15"></a>

### 9.15 State preservation and reset：key, route identity, entity identity

**结论：**

React 按 tree position 和 key 识别 component identity。same identity preserve state；different key reset state。route identity 和 entity identity 常用来决定 form draft 是否应该保留。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: keyed settings reset</span>
  </div>

```tsx
function SettingsRoute({ sellerId }: { sellerId: string }) {
  return <SettingsDraftForm key={sellerId} sellerId={sellerId} />;
}
```
</div>

**逐行解释：**

`sellerId` 是 entity identity；`key={sellerId}` 告诉 React 不同 seller 的 draft form 不是同一个 identity；切 seller 时旧 hook state cell 被丢弃，新 form 用新 initial settings 初始化。

**执行过程：**

URL route 或 select 改变 sellerId；父组件返回同一 component type 但 key 不同；React unmount old identity；new identity 创建新的 state cells；draft reset 到新 seller。

**错误边界：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: unwanted remount key</span>
  </div>

```tsx
<SettingsDraftForm key={Date.now()} sellerId={sellerId} />
```
</div>

这个 key 每次 render 都变，违反 stable identity rule。识别信号是用户每输入一个字符，input draft 就 reset 或 focus 丢失。

**机制证据链：**

触发动作是 identity 变化；JavaScript 计算 key string；React reconciliation 用 type+key 判断 state cell 是否复用；TypeScript 不判断 key 稳定性；UI preserve/reset 结果来自 identity。

<a id="section-9-16"></a>

### 9.16 External store vs React state vs URL state：choosing the right owner

**结论：**

React local state、URL state、server state、external store 是不同 owner。browser storage 也是 external persistence boundary，不是 universal state solution。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: owner decision function</span>
  </div>

```ts
function chooseOwner(valueName: string) {
  if (valueName.endsWith('UrlFilter')) return 'url';
  if (valueName.endsWith('Draft')) return 'component';
  if (valueName.endsWith('InventoryFeed')) return 'external-store';
  return 'review-required';
}
```
</div>

**逐行解释：**

这个函数是 review aid，不是 framework API；URL filter 归 URL；draft 归 component；inventory feed 可能来自 external subscription；无法判断时必须 review，而不是默认 global。

**执行过程：**

inventory feed 从 WebSocket、BroadcastChannel 或 store subscription 更新；React event handler 不一定参与；`useSyncExternalStore` 通过 subscribe 和 getSnapshot 读取外部 owner 的 snapshot。

**错误边界：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: multiple manual sync effects</span>
  </div>

```tsx
useEffect(() => setLocalFilter(urlFilter), [urlFilter]);
useEffect(() => writeExternalStore(localFilter), [localFilter]);
useEffect(() => setSearchParams(localFilter), [localFilter]);
```
</div>

三个 effects 在三个 owner 之间互相同步，容易循环、过期、覆盖用户输入。修正方式是选择一个 owner，其它地方 derive 或 subscribe。

**机制证据链：**

触发动作可能来自 browser navigation、React event 或 external subscription；JavaScript event source 不同；React state cell、URL string、external snapshot 是不同 storage；TypeScript 不保证同步；正确性来自单 owner。

<a id="section-9-17"></a>

### 9.17 SellerHub state architecture mapping：catalog, filters, orders, dashboard, settings

**结论：**

SellerHub review 的目标不是“把所有状态集中起来”，而是给每个场景确定 owner、reset rule、test evidence。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: SellerHub owner mapping rows</span>
  </div>

```ts
const stateOwnerRows = [
  ['Catalog text input', 'Catalog form draft', 'Role query and typing test'],
  ['Catalog filters', 'URL search params', 'Codec test and navigation smoke test'],
  ['Selected product', 'Selected product id', 'Entity selection assertion'],
  ['Orders request', 'Request reducer', 'Reducer transition test'],
  ['Settings validation', 'Settings form owner', 'Role and error message test'],
];
```
</div>

**逐行解释：**

每一行包含 scenario、owner、evidence；catalog text input 是 typing draft；catalog filters 是 URL state；selected product 是 id；orders request 是 reducer；settings validation 属于 form boundary。表格不证明正确性，测试和交互才提供 evidence。

**执行过程：**

code review 时先列 scenario；每个 scenario 写 owner；再写识别证据：role query、codec test、reducer test、integration smoke。没有 evidence 的 owner decision 不应进入 shared architecture 文档。

**错误边界：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: vague state map</span>
  </div>

```txt
All SellerHub state lives in app state.
```
</div>

这不是 architecture decision，因为它没有区分 URL、server、form、external、local、optimistic。识别信号是无法解释 refresh、share link、seller switch、request retry、rollback 时 state 如何变化。

**机制证据链：**

触发动作是 feature review；JavaScript 和 React 不自动给 owner；TypeScript 只能描述 shape；UI correctness 来自每个 owner 的 update path；测试策略必须覆盖 owner boundary。

<a id="section-9-18"></a>

### 9.18 Final mini project：SellerHub State Boundary Lab

**结论：**

最终小项目把本章机制组合到一个 client-side Vite React lab：URL filters、codec、request reducer、settings draft、dashboard selection、optimistic note、owner decision table 和 review card。它不创建 backend、不安装 state library、不 fake server cache。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-22-state-architecture-server-url-form-boundary/sellerhub-state-boundary-lab/sellerhub-state-boundary-lab.tsx</span>
  </div>

```tsx
export function SellerHubStateBoundaryLab() {
  return (
    <section aria-labelledby="sellerhub-state-lab-title">
      <h2 id="sellerhub-state-lab-title">SellerHub State Boundary Lab</h2>
      <CatalogFilterUrlState />
      <CatalogFilterCodecPanel />
      <OrdersRequestStatePanel />
      <SettingsFormStatePanel />
      <DashboardSelectionStatePanel />
      <OptimisticOrderNotePanel />
      <StateOwnerDecisionTable />
      <StateArchitectureReviewCard />
    </section>
  );
}
```
</div>

**逐行解释：**

root section 给最终 lab 一个 accessible heading；每个 child 负责一个 owner boundary；URL filter panel 依赖 router search params；codec panel 展示 parse/encode；orders panel 展示 request reducer；settings form 展示 draft/touched/dirty/validation/reset；dashboard tab 是 local selection；optimistic note 区分 pending 与 confirmed；decision table 和 review card 把机制转成 code review evidence。

**执行过程：**

进入 `/react/chapter-22` 后，App 的 manifest route lazy-load practice root；practice root 渲染 chapter panels 和 final lab；URL-backed panel 从当前 location 读取 search params；其它 panel 使用 local state 或 reducer；没有 network request、database 或 persistent cache。

**错误边界：**

如果把 final lab 改成静态说明页，就失去 runnable evidence；如果把 server state 做成 fake backend cache，就会误导 server ownership；如果把所有值放入 Context，就会隐藏本章核心的 owner decision。

**机制证据链：**

触发动作是 route render；React Router 提供 route identity 和 search params；React lazy route 载入 component；每个 panel 创建自己的 state cell、reducer cell 或 URL reader；TypeScript 检查 component contracts；测试通过 role/text query 验证主要 boundary 可见。

## 10. API / 语法索引

| API / Syntax | Layer | Meaning | Common Mistake |
| --- | --- | --- | --- |
| `useState` | React Hook | 保存 component-owned local source state | 保存可 derived 的 redundant value |
| `useReducer` | React Hook | 用 reducer 管理复杂 transition | 以为 reducer 自动 global |
| `createContext` / `useContext` | React Context | 让 descendants 读取 provider value | app-wide unrelated dumping ground |
| `useMemo` | React Hook | 稳定 provider value 或重计算成本较高的 derived value | 用 memo 掩盖错误 owner |
| `useSearchParams` | React Router Hook | 读取和更新 URL search params | 直接 mutate existing params object |
| `URLSearchParams` | Browser API | 处理 query string key/value pairs | 把 string 当 number/boolean 直接用 |
| `useSyncExternalStore` | React Hook | 订阅 React 外部 store snapshot | 把 external source 复制到多个 local state |
| `key` | React identity hint | 控制 sibling identity preserve/reset | 使用 unstable key 导致频繁 remount |

## 11. 常见错误表

| Error | Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| Storing `filteredCount` separately | state architecture | Derived value should not have a second owner | Calculate from visible rows during render | Count mismatches list after data refresh |
| Storing selected object copy | entity state | Entity collection should own entity object | Store selected id and derive entity | Detail panel shows stale product data |
| Putting one small form in global context | provider scope | Form draft owner should stay local unless shared | Keep draft in form owner and reset by key | Draft leaks after leaving page |
| Multiple request booleans | request model | Mutually exclusive lifecycle states need one union | Use discriminated union reducer | Spinner, empty state, and error appear together |
| `Boolean(params.get('x'))` | URL parsing | URL values are strings | Parse exact string values | `false` query acts like true |
| Key from `Date.now()` | identity | Key must be stable for intended identity | Key by entity id or route id | Input resets on every render |
| Treating optimistic data as confirmed | async boundary | Pending intent is not server data | Mark pending and rollback on failure | Failed mutation cannot be reverted |

## 12. 最终小项目

最终小项目只用于整合本章机制，不替代前面的分节教学。它把 state ownership、URL codec、request lifecycle、form draft、selection、optimistic rollback 和 review evidence 放在同一个可运行页面中。

### 12.1 项目目标

SellerHub State Boundary Lab 的目标是让学习者在一个页面内看到四类常见 owner：React local owner、URL owner、remote/server boundary、external store boundary。它不追求业务完整性，而追求 state architecture 可解释、可测试、可迁移。

### 12.2 为什么适合本章

SellerHub 场景天然包含 catalog filters、orders request、settings form、dashboard UI、optimistic order note。它们外观看起来都是“状态”，但 owner 完全不同：URL filter 能分享，settings draft 只属于 form，orders data 属于 remote source，request status 属于 client reducer，optimistic note 属于 pending intent。

### 12.3 最终小项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Final mini project structure</span>
  </div>

```txt
sellerhub-state-boundary-lab/
  sellerhub-state-boundary-lab.tsx
  sellerhub-state-boundary-data.ts
  catalog-filter-url-state.tsx
  catalog-filter-codec.ts
  catalog-filter-codec-panel.tsx
  orders-request-state-panel.tsx
  orders-request-reducer.ts
  settings-form-state-panel.tsx
  dashboard-selection-state-panel.tsx
  optimistic-order-note-panel.tsx
  state-owner-decision-table.tsx
  state-architecture-review-card.tsx
```
</div>

### 12.4 文件职责

| File | Responsibility |
| --- | --- |
| `sellerhub-state-boundary-lab.tsx` | 组合最终 lab，并声明 client-side boundary |
| `catalog-filter-url-state.tsx` | 用 `useSearchParams` 展示 URL-owned filter |
| `catalog-filter-codec.ts` | 复用 URL parser/encoder |
| `orders-request-state-panel.tsx` | 展示 request lifecycle reducer |
| `settings-form-state-panel.tsx` | 展示 draft、dirty、validation、seller identity reset |
| `dashboard-selection-state-panel.tsx` | 展示 local tab selection |
| `optimistic-order-note-panel.tsx` | 展示 pending note、confirm、rollback |
| `state-owner-decision-table.tsx` | 把 scenarios 映射到 owner |
| `state-architecture-review-card.tsx` | 给 code review 提供 evidence checklist |

### 12.5 运行方式

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

然后访问 `/react/chapter-22`。

### 12.6 预期交互结果

- 修改 catalog search 会改变 URL search params；
- codec panel 能展示 parse 后的 query、margin、channels 和 serialized search；
- orders panel 可从 idle 到 pending、success、empty、error；
- settings form 能显示 dirty、validation error，并按 seller identity reset；
- dashboard tab selection 不进入 URL 或 context；
- optimistic note 可以 pending、confirm、rollback。

### 12.7 核心执行流程

route render 触发 practice root；React lazy component 完成加载；URL filter panel 从 router location 读 search params；form panel 建立 draft state；orders panel 建立 request reducer；optimistic panel 保存 pending local intent；review table 把 owner decision 显示出来。

### 12.8 常见错误

- 把 URL filter 改回 local state，导致 copy link 丢失 filter；
- 把 settings draft 提升到 app context，导致 seller 切换不 reset；
- 把 orders request status 和 data 混成多个 boolean；
- 把 optimistic note 直接写入 confirmed rows；
- 在 final lab 中创建 fake backend cache，从而混淆 server-state boundary。

### 12.9 可选扩展

- 给 URL filter 添加 sort，并保持 codec test；
- 给 request reducer 添加 retry count；
- 给 settings form 添加 submit success branch；
- 给 external store panel 添加真实 subscribe/unsubscribe instrumentation；
- 将 owner decision table 转成 code review template。

## 13. 额外速查表

**一句话总结：**

State architecture 的核心是 owner、identity、synchronization boundary，而不是 hook 数量。

| Choose | When |
| --- | --- |
| Local state | 值只属于一个 component 或局部 UI |
| Derived value | 值能从当前 render 的 source state 计算 |
| Lifted state | 多个 sibling 必须共享同一 source value |
| Reducer | transition 多、互斥状态多、需要 action evidence |
| Context | distant descendants 需要读同一 scoped value |
| URL state | 值可分享、可 bookmark、参与 navigation |
| Request state | 描述 pending/success/error/refetch/empty lifecycle |
| External store | 值由 React 外部 source 和 subscription 拥有 |

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: owner review question</span>
  </div>

```txt
State value:
Who writes it:
Who reads it:
Can it be derived:
Can it be shared through URL:
Does a remote source own it:
What resets it:
What test proves the boundary:
```
</div>

## 14. 工程迁移与代码审查要点

- owner review：每个 state value 必须有唯一 owner 和写入路径；
- redundant state review：检查 `count`、`filteredRows`、`fullName`、`isDirty` 是否能 derived；
- duplicated state review：selected object、copied entity、server rows local mutation 都要重新审查；
- form state review：draft、touched、dirty、validation、submit status 是否在 form boundary 内；
- URL state review：search params 是否小型、可序列化、可 parse、可默认；
- server state review：是否把 remote data、request status、cache key、refetch boundary 分开；
- reducer transition review：是否有 impossible states、action object、exhaustive branch；
- context provider scope review：provider 是否过宽，value identity 是否稳定，dispatch 是否可分离；
- cache key review：key 是否包含影响 remote resource 的 sellerId、filter、pagination；
- optimistic rollback review：pending item 是否可识别、confirm、rollback；
- reset key review：entity identity 改变时是否 preserve 或 reset 正确；
- test evidence review：是否存在 codec test、reducer test、role-based component test、integration smoke。

## 15. 如何转换成个人笔记

建议把本章整理成三张表：

1. owner decision table：value、owner、write path、read path、reset rule；
2. state type table：local、derived、form draft、URL、server、request、optimistic、external；
3. bug recognition table：症状、违反的 owner rule、修复方式、测试证据。

不要只摘录 hook API。把每个 hook 放回 owner boundary 才有工程意义。

## 16. 必须能回答的问题

- 为什么 state architecture 先问 owner，而不是先问 `useState` 还是 `useReducer`？
- 为什么 `visibleCount` 常常不该存入 state？
- selected product 为什么通常保存 id，而不是复制 object？
- form draft、touched、dirty、validation 分别由谁拥有？
- lifting state 与 over-lifting 的边界是什么？
- reducer 如何阻止 impossible request state？
- Context value identity 为什么影响 consumer render？
- URL search params 为什么必须 runtime parse？
- server state 与 request status 为什么是不同值？
- optimistic pending item 为什么不能直接当 confirmed data？
- key、route identity、entity identity 如何影响 reset？
- external store 与 local React state 的 owner 差异是什么？

## 17. 最终记忆模型

一个 React feature 的状态不是“放在哪里方便”，而是“谁拥有事实”。source state 只有一个 owner；derived value 不复制；URL 拥有 shareable navigation state；remote source 拥有 server data；client reducer 拥有 request lifecycle；form owner 拥有 draft；Context 只传递 scoped value；key 决定 state cell identity；external store 通过 subscription 提供 snapshot。每次你想新增 state，都先写 owner、write path、read path、reset rule 和 test evidence。

## 18. 官方文档阅读清单

推荐按这个顺序阅读：

1. React `State as a Snapshot`：理解 setter 不改写当前 render binding。
2. React `Managing State`：理解 redundant / duplicate state 是 bug 来源。
3. React `Choosing the State Structure`：把 derived、duplicate、normalized decision 放进同一套结构原则。
4. React `Sharing State Between Components`：理解 closest common owner。
5. React `Preserving and Resetting State`：理解 key、position、identity。
6. React `Extracting State Logic into a Reducer` 与 `useReducer` reference：理解 action object、pure reducer、dispatch。
7. React `Passing Data Deeply with Context`、`Scaling Up with Reducer and Context` 与 `useContext` reference：理解 provider scope 与 context propagation。
8. React `useOptimistic` 与 `useActionState` reference：只作为 optimistic UI 与 form/action state boundary 阅读，不在本章重讲 React 19 Actions。
9. React `useSyncExternalStore` reference：理解 external store snapshot 与 subscription boundary。
10. React Router `useSearchParams` 与 state-management explanation：理解 URL values 作为 router state。
11. MDN `URLSearchParams`：理解 string parsing、duplicate keys、encoding、`get` / `getAll` / `toString`。
12. TypeScript narrowing / discriminated unions：理解 reducer status 和 action union 的 static narrowing；同时记住 TypeScript 不执行 URL runtime parsing。
