# React 第五章：Lists、Keys 与 Conditional Rendering

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
  border-radius: 999px;
  flex: 0 0 auto;
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
  - [9.1 JSX 中渲染数组：从 JavaScript array.map 到 React nodes](#91-jsx-中渲染数组从-javascript-arraymap-到-react-nodes)
  - [9.2 conditional rendering：用表达式选择 UI description](#92-conditional-rendering用表达式选择-ui-description)
  - [9.3 loading、error、empty、success 的 UI 状态分支](#93-loadingerroremptysuccess-的-ui-状态分支)
  - [9.4 key 的作用：让 React 识别同级元素身份](#94-key-的作用让-react-识别同级元素身份)
  - [9.5 为什么 key 不会作为普通 props 传入组件](#95-为什么-key-不会作为普通-props-传入组件)
  - [9.6 为什么不能随便用 array index 作为 key](#96-为什么不能随便用-array-index-作为-key)
  - [9.7 filter、sort、map 与不可变数组更新边界](#97-filtersortmap-与不可变数组更新边界)
  - [9.8 TypeScript 中列表数据、props 和联合 UI 状态的类型](#98-typescript-中列表数据props-和联合-ui-状态的类型)
  - [9.9 SellerHub 场景预告：products、cart items、orders 如何渲染](#99-sellerhub-场景预告productscart-itemsorders-如何渲染)
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
| Array rendering | The component maps data records to React elements. | JavaScript array methods plus React rendering | Product cards are generated from product records. | `src/learning/react/chapter-05-rendering-data/01-array-rendering/array-rendering-with-map.tsx` |
| Key identity | React uses keys to match sibling elements across renders. | React reconciliation | Product rows keep stable identity when filters or sorts change. | `src/learning/react/chapter-05-rendering-data/04-key-identity/key-identity-stable-id.tsx` |
| Conditional branch | The component selects which UI branch represents current state. | JavaScript control flow in render | Empty, loading, error, and success views remain explicit. | `src/learning/react/chapter-05-rendering-data/02-conditional-rendering/conditional-rendering-branches.tsx` |
| Derived collection | Filtering and sorting create render data without mutating source data. | JavaScript runtime | Product list controls produce a visible subset safely. | `src/learning/react/chapter-05-rendering-data/07-filter-sort-map-boundary/filter-sort-map-boundary.tsx` |

## 0. 本章工程问题与边界

本章解决的工程问题是：真实 UI 往往来自集合数据，而不是手写重复 JSX。学习重点是把数据数组、条件分支、key identity 和派生列表分开理解。

本章不负责远程请求、缓存、分页 API 或虚拟列表性能优化。它只处理已经在组件内可用的数据如何安全、稳定、可审查地渲染。

## 1. 本章解决的问题

第四章已经能更新数组，但“数组更新正确”不等于“列表渲染和身份判断正确”。真实列表页还必须回答以下问题：

1. JavaScript 数组怎样转换成 JSX？
2. loading、error、empty、success 为什么不能只靠一个 `items.length` 判断？
3. React 为什么要求数组中的直接元素具有 `key`？
4. 排序、插入和删除后，React 怎样知道哪个 row 仍是原来的 row？
5. 为什么 JSX 中写了 `key={product.id}`，child component 却读不到 `props.key`？
6. 为什么 `array.sort()` 可能悄悄修改 props 或 state 引用？
7. TypeScript 怎样让每一种 UI 状态携带恰当的数据？

这些问题会直接出现在 SellerHub 的商品、购物车、订单和审核列表中。

## 2. 前置概念

| 前置概念 | 为什么需要 |
| --- | --- |
| JavaScript array、object 与 callback | `map`、`filter`、`sort` 都通过 callback 处理数组元素。 |
| JSX expression boundary | `{...}` 接受 expression，不接受普通 statement。 |
| React component 与 props | 列表通常拆成 list component 和 item component。 |
| `useState` 与 render snapshot | key 错误最容易通过 child local state 的错位观察。 |
| 不可变数组更新 | 第四章已经说明 state array 不应直接 `push`、`splice` 或原地修改。 |
| TypeScript object type 与 union | 本章用它们精确描述元素和 UI 状态。 |

## 3. 学习目标

完成本章后，你应该能够：

- 解释 array rendering 是 `map()` 返回 React nodes，而不是 React 专用循环语法。
- 用 early return、ternary 和 `&&` 表达不同 UI description，并识别它们的边界。
- 区分 React element、React 跟踪的 component identity 与 browser DOM node。
- 解释 `key` 的 siblings scope、stable、unique 三个要求。
- 解释为什么 `key` 不进入普通 props。
- 通过排序、插入和删除复现 index key 导致的 local state 错位。
- 在 render 中使用 `filter`、复制后 `sort`、再 `map`，不修改输入数组。
- 用 TypeScript 为 `Product[]`、`ReadonlyArray<Order>`、list props 和 discriminated union state 建模。
- 把同一套机制迁移到 SellerHub 的 products、cart items、orders 和 admin review lists。

## 4. 机制依赖图

这些依赖不是阅读顺序清单，而是本章概念成立的前置关系。

| First Understand | Then Understand | Dependency Reason | Failure If Skipped |
| --- | --- | --- | --- |
| Array item shape | Map to elements | 先知道每条数据的结构，才能把它映射成稳定 UI。 | 会在 JSX 中混入不清楚的数据访问。 |
| Stable record id | React key | key 必须表达兄弟节点身份，而不是展示顺序。 | 过滤或排序后组件状态可能错位。 |
| State branch | Conditional rendering | 条件 UI 依赖清晰的状态枚举或布尔判断。 | 会出现空状态、错误状态和成功状态互相覆盖。 |
| Source data | Derived filtered data | 派生列表应来自原始数据计算，而不是破坏原数组。 | 切换筛选条件后无法恢复完整数据。 |

## 5. 核心术语表

| Term | 中文说明 | Layer | Why It Matters |
| --- | --- | --- | --- |
| array rendering | 把数组元素转换成可渲染 node 的过程 | JavaScript + React runtime | 真实业务数据通常是数组。 |
| React node | React 可以渲染的值，如 element、string、number、`null` 或 node array | React runtime | `map()` 的结果通常是 React node array。 |
| conditional rendering | 根据条件选择本次返回的 UI description | JavaScript expression + React convention | 同一组件必须表达多个界面状态。 |
| React element | JSX 转换后形成的轻量 UI description | React runtime | 它不是 DOM node，也不是有状态的 class instance。 |
| component identity | React 用 type、tree position 和 key 关联状态的身份 | React reconciliation | 决定 child state 被保留还是重置。 |
| DOM node | 浏览器创建并维护的真实节点对象 | Browser DOM API | React 在 commit 阶段才更新它。 |
| key | React 用来识别同级列表项的特殊 prop | React convention | 排序、插入、删除时帮助正确匹配。 |
| siblings scope | key 只需在同一组兄弟元素中唯一 | React convention | 不要求全应用全局唯一。 |
| discriminated union | 用共同判别字段描述互斥状态 | TypeScript type system | 防止 error state 携带 items 或 success state 缺少 items。 |
| immutable transformation | 不修改输入数组，返回派生数组 | JavaScript data model | 保持 props/state 输入纯净且可推理。 |

## 6. 底层心智模型

从业务数组到屏幕可以分为六步：

1. JavaScript 执行 component function。
2. `filter()`、复制后的 `sort()` 和 `map()` 产生新的数组值。
3. JSX 被工具链转换为 React element descriptions。
4. conditional expression 决定哪些 descriptions 出现在结果中。
5. React 在同一父级下用 element type 和 `key` 匹配前后两次 render 的身份。
6. React 在 commit 阶段把必要变化应用到 browser DOM nodes。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: element identity layers</span>
  </div>

```txt
Product object
  -> map callback
  -> React element description
  -> sibling match by type and key
  -> component state association
  -> DOM commit
```
</div>

必须分清三个对象层次：

- **React element**：不可把它理解成真实节点。它是描述“希望看到什么”的轻量值。
- **component identity**：function component 本身不会返回一个可供业务代码操作的“组件实例对象”。React 内部根据 tree position、type 和 key 保存该位置的状态身份。
- **DOM node**：`HTMLLIElement`、`HTMLButtonElement` 等浏览器对象，只在 React commit 后反映到页面。

因此，重新创建 element description 不代表一定重建 DOM，也不代表 child state 一定重置。匹配是否延续取决于 type、position 和 key。

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
  AGENTS.MD
  README.md
  package.json
  src/
    App.tsx
    sudoku/
    learning/react/
      chapter-04-state-and-events/
      chapter-05-rendering-data/
```
</div>

`src/sudoku/` 是独立练习应用，本章不修改。

### 本章文档结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">本章文档结构</span>
  </div>

```txt
docs/react/
  chapter-04-state-and-events/
    react-chapter-04-learning-guide.md
  chapter-05-rendering-data/
    react-chapter-05-learning-guide.md
```
</div>

### 真实练习结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">真实练习结构</span>
  </div>

```txt
src/learning/react/chapter-05-rendering-data/
  chapter-05-practice-root.tsx
  chapter-05-practice.css
  01-array-rendering/
    array-rendering-with-map.tsx
  02-conditional-rendering/
    conditional-rendering-branches.tsx
  03-ui-state-branches/
    ui-state-branches.tsx
  04-key-identity/
    key-identity-stable-id.tsx
  05-key-is-not-prop/
    key-is-not-prop.tsx
  06-index-key-mistake/
    index-key-mistake.tsx
  07-filter-sort-map-boundary/
    filter-sort-map-boundary.tsx
  08-typed-list-rendering/
    typed-list-rendering.tsx
  product-list-mini-project/
    product-list-types.ts
    product-list-seed-data.ts
    product-filter-controls.tsx
    product-card.tsx
    product-grid.tsx
    product-list-summary.tsx
    product-list-mini-project.tsx
    product-list-mini-project.css
```
</div>

### 概念示例结构

这些 labels 只表示文档中的机制片段，不是待创建文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">概念示例结构</span>
  </div>

```txt
Conceptual snippets:
  Snippet: element identity layers
  Snippet: statement inside JSX expression
  Snippet: direct sort mutation
  Template: discriminated list state
```
</div>

### 最终小项目结构

最终小项目只使用上述 `product-list-mini-project/` 八个文件，不新增依赖、后端或路由。

## 8. 示例运行方式

`src/App.tsx` 按学习入口约定挂载 `Chapter05PracticeRoot`。当前 `index.html` 仍指向独立的 `src/sudoku/main.tsx`，本章不修改 `src/sudoku/` 或该入口；因此 lint 和 build 会验证第五章源码，但浏览器默认仍显示 Sudoku。若需要在浏览器中切换学习入口，应单独安排入口切换任务。

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

这两个命令分别验证 ESLint 规则、TypeScript 编译边界和 Vite production build。

## 9. 分节教学与练习

### 9.1 JSX 中渲染数组：从 JavaScript array.map 到 React nodes

**结论：** JSX 没有独立的 list loop 语法。JavaScript `map()` 对每个数据元素执行 callback，并返回一个由 React element descriptions 组成的新数组。

**本节解决的问题：** 把“React 渲染列表”还原成 JavaScript array transformation，避免把 JSX 当成另一个模板语言。

**边界：**

- `map()` 是 JavaScript `Array` method。
- JSX 是 source syntax，由工具链转换，不是浏览器原生语法。
- React 接收 callback 返回的 node array，并在 render 阶段处理它。
- TypeScript 根据 `CatalogItem` 推导 callback parameter type。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-05-rendering-data/01-array-rendering/array-rendering-with-map.tsx</span>
  </div>

```tsx
type CatalogItem = {
  id: string
  name: string
  category: string
}

const catalogItems: CatalogItem[] = [
  { id: 'product-keyboard', name: 'Mechanical Keyboard', category: 'Electronics' },
  { id: 'product-chair', name: 'Ergonomic Chair', category: 'Office' },
  { id: 'product-lamp', name: 'Desk Lamp', category: 'Home' },
]

export function ArrayRenderingWithMap() {
  const productNodes = catalogItems.map((item) => (
    <li key={item.id}>
      <strong>{item.name}</strong>
      <span>{item.category}</span>
    </li>
  ))

  return (
    <article className="practice-panel">
      <p className="practice-kicker">01 · Array rendering</p>
      <h2>JavaScript arrays become React nodes</h2>
      <ul className="rendered-list">{productNodes}</ul>
    </article>
  )
}
```
</div>

**逐行解释：**

1. `CatalogItem[]` 约束数组中的每个对象必须有稳定 `id`、`name` 和 `category`。
2. `map()` 不修改 `catalogItems`，而是创建 `productNodes` 新数组。
3. callback 每次返回一个 `<li>` element description。
4. `{productNodes}` 把整个 node array 作为 children 交给 React。
5. `key={item.id}` 只服务于这一组 `<li>` siblings 的匹配。

**执行过程：** 第一次 render 时 component function 执行一次；`map()` 同步执行三次；返回三个 element descriptions；React 再将它们与当前 tree 比较并 commit DOM。

**预期输出：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Output</span>
  </div>

```txt
Mechanical Keyboard  Electronics
Ergonomic Chair      Office
Desk Lamp            Home
```
</div>

**常见错误为什么错：** 使用 `{ catalogItems }` 会尝试直接渲染普通 objects，而不是 React nodes；忘记 callback 的 `return` 会得到 `[undefined, undefined, undefined]`。看到 `map(() => { ... })` 的 block body 时，应立即检查是否存在显式 `return`。

**与真实项目的关系：** `ProductListPage`、`CartPage` 和订单页的核心入口都是把 API 或 state 中的 typed array 映射为 item components。

**最终记忆模型：** 数据数组不等于 UI；`map()` 是从 data item 到 React node 的纯转换边界。

### 9.2 conditional rendering：用表达式选择 UI description

**结论：** conditional rendering 不是特殊渲染引擎，而是 JavaScript control flow 或 expression 决定 component 本次返回哪个 UI description。

**API / 语法规则：**

- component function body 可以使用 `if` statement 和 early return。
- JSX `{...}` 内必须放 expression，可使用 ternary `condition ? a : b`。
- `condition && node` 适合“有或没有”分支，但左侧数字 `0` 可能被渲染。
- 复杂分支优先提前计算变量或拆 component，不要嵌套多层 ternary。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-05-rendering-data/02-conditional-rendering/conditional-rendering-branches.tsx</span>
  </div>

```tsx
type InventoryPreview = {
  id: string
  name: string
  stock: number
}

const inventoryPreviews: InventoryPreview[] = [
  { id: 'inventory-monitor', name: 'Studio Monitor', stock: 8 },
  { id: 'inventory-microphone', name: 'USB Microphone', stock: 0 },
]

export function ConditionalRenderingBranches() {
  return (
    <ul className="rendered-list">
      {inventoryPreviews.map((product) => (
        <li key={product.id}>
          <strong>{product.name}</strong>
          {product.stock > 0 ? (
            <span className="status-badge status-badge-success">In stock</span>
          ) : (
            <span className="status-badge status-badge-muted">Out of stock</span>
          )}
        </li>
      ))}
    </ul>
  )
}
```
</div>

**底层机制：** `product.stock > 0` 先由 JavaScript 求值得到 boolean；ternary 只返回其中一个 element description。两个 `<span>` 都不是 DOM nodes，也不是两个有状态 component instances，只是本次 render 的候选 descriptions。

**非法写法：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: statement inside JSX expression</span>
  </div>

```tsx
return <div>{if (isLoading) { return <p>Loading...</p> }}</div>
```
</div>

`if` 是 statement，不能直接成为 JSX expression 的值。修正方法是在 `return` 前 early return，或改用 ternary。

**识别方法：** 如果 `{...}` 中需要写 `if`、`for`、变量声明或多条语句，就把逻辑移到 JSX 之前。

**与真实项目的关系：** product stock badge、order status badge、button disabled label 都属于局部 conditional rendering。

### 9.3 loading、error、empty、success 的 UI 状态分支

**结论：** 四种状态表达不同事实，不能都退化为 `items.length === 0`。

- loading：结果尚未确定。
- error：操作失败，应携带错误信息或恢复入口。
- empty：操作成功，但有效结果为零。
- success：操作成功且有可渲染数据。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-05-rendering-data/03-ui-state-branches/ui-state-branches.tsx</span>
  </div>

```tsx
import { useState } from 'react'

type UiState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'empty' }
  | { status: 'success'; items: string[] }

function UiStatePreview({ state }: { state: UiState }) {
  if (state.status === 'loading') {
    return <p>Loading products...</p>
  }

  if (state.status === 'error') {
    return <p>{state.message}</p>
  }

  if (state.status === 'empty') {
    return <p>No products match this view.</p>
  }

  return (
    <ul>
      {state.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function UiStateBranches() {
  const [state, setState] = useState<UiState>({ status: 'empty' })

  return (
    <div>
      <button
        type="button"
        onClick={() => setState({ status: 'success', items: ['Mechanical Keyboard'] })}
      >
        Show success
      </button>
      <UiStatePreview state={state} />
    </div>
  )
}
```
</div>

**TypeScript 编译期：** 判别字段 `status` 让 control-flow narrowing 知道只有 error branch 能读取 `message`，只有 success branch 能读取 `items`。`{ status: 'success' }` 会直接产生 type error，因为缺少 `items`。

**JavaScript 运行时：** TypeScript types 被擦除；运行时只是普通 objects、string comparisons 和 early returns。类型不会自动请求数据，也不会自动验证外部 JSON。

**常见错误为什么错：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: collapsed loading and empty state</span>
  </div>

```tsx
if (items.length === 0) {
  return <p>No products found.</p>
}
```
</div>

初次请求时 `items` 也可能为空，因此用户会先看到错误的 empty message。必须先根据请求状态判断 loading/error，再判断成功结果是否 empty。

**SellerHub 关系：** 每个真实 list page 都应有明确状态分支，尤其是 `ProductListPage`、`BuyerOrdersPage` 和 `AdminProductsPage`。

### 9.4 key 的作用：让 React 识别同级元素身份

**结论：** `key` 是 React 在同一父级 children 中匹配 item identity 的提示。它帮助 React 判断某个 item 是保留、移动、新增还是删除。

**规则：**

1. key 在 siblings 范围内唯一；不同数组可以复用相同 key。
2. key 在 item 生命周期中稳定；不要在 render 中用 `Math.random()` 生成。
3. key 来自数据身份，如 `product.id`、`cartItem.id`、`order.id`。
4. key 放在 `map()` callback 直接返回的最外层 element 或 component 上。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-05-rendering-data/04-key-identity/key-identity-stable-id.tsx</span>
  </div>

```tsx
import { useState } from 'react'

type KeyedProduct = {
  id: string
  name: string
}

function KeyedProductRow({ product }: { product: KeyedProduct }) {
  const [note, setNote] = useState('')

  return (
    <li>
      <label>
        <span>{product.name}</span>
        <input value={note} onChange={(event) => setNote(event.target.value)} />
      </label>
    </li>
  )
}

export function KeyIdentityStableId() {
  const [products, setProducts] = useState<KeyedProduct[]>([
    { id: 'product-alpha', name: 'Alpha Keyboard' },
    { id: 'product-bravo', name: 'Bravo Headset' },
  ])

  function handleReverse() {
    setProducts((currentProducts) => [...currentProducts].reverse())
  }

  return (
    <>
      <button type="button" onClick={handleReverse}>Reverse products</button>
      <ul>
        {products.map((product) => (
          <KeyedProductRow key={product.id} product={product} />
        ))}
      </ul>
    </>
  )
}
```
</div>

**执行过程：**

1. 每个 `KeyedProductRow` 在 React tree 中获得与 `product.id` 对应的 sibling identity。
2. input value 是 child local state，不是 product object 字段。
3. reverse 创建新数组并改变顺序。
4. React 看到相同 keys，只是位置移动，因此将 note state 继续关联到相同 product identity。
5. commit 阶段移动或更新必要 DOM，而不是把 note 绑定到新位置。

**错误位置：** 如果 callback 返回 `<li><ProductRow key={id} /></li>`，真正的 list siblings 是无 key 的 `<li>`；key 放在更深层不能帮助父列表匹配。

**最终记忆模型：** key 不是 DOM id，也不是全局 primary key 约束；它是“这个父节点下，这个 child 前后仍是谁”的 React identity hint。

### 9.5 为什么 key 不会作为普通 props 传入组件

**结论：** `key` 和 `ref` 是 React 消费的特殊 props。React 不会把 `key` 转发给 component function 的 props object。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-05-rendering-data/05-key-is-not-prop/key-is-not-prop.tsx</span>
  </div>

```tsx
type KeyBoundaryItemProps = {
  productId: string
  name: string
}

function KeyBoundaryItem({ productId, name }: KeyBoundaryItemProps) {
  return (
    <li>
      <strong>{name}</strong>
      <span>Readable prop: {productId}</span>
    </li>
  )
}

const products = [
  { id: 'sku-100', name: 'Wireless Mouse' },
  { id: 'sku-200', name: 'Laptop Stand' },
]

export function KeyIsNotProp() {
  return (
    <ul>
      {products.map((product) => (
        <KeyBoundaryItem key={product.id} productId={product.id} name={product.name} />
      ))}
    </ul>
  )
}
```
</div>

**底层边界：** `key={product.id}` 是 React reconciliation hint；`productId={product.id}` 是 application data。虽然值相同，职责不同，所以显式传两次并不冗余。

**常见错误为什么错：** 给 props type 添加 `{ key: string }` 不会迫使 React 转发 key。child 若需要这个值，必须使用另一个业务 prop 名，如 `id`、`productId` 或 `orderId`。

**识别方法：** 只要 child 业务逻辑要读取一个值，就不要依赖 `key`；把它作为普通命名 prop 显式传递。

### 9.6 为什么不能随便用 array index 作为 key

**结论：** index 描述的是当前位置，不是数据身份。当 item 被插入、删除或排序时，同一个 index 会指向另一个 item，child local state 可能因此跟错数据。

**何时风险较低：** 列表完全静态、永不重排、永不增删、items 没有稳定 ID，也没有 child state。即使满足这些条件，稳定数据 ID 仍更容易维护。

**真实错误练习：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-05-rendering-data/06-index-key-mistake/index-key-mistake.tsx</span>
  </div>

```tsx
import { useState } from 'react'

type SortableOrder = {
  id: string
  label: string
}

function EditableOrderRow({ order }: { order: SortableOrder }) {
  const [note, setNote] = useState('')

  return (
    <li>
      <label>
        <span>{order.label}</span>
        <input value={note} onChange={(event) => setNote(event.target.value)} />
      </label>
    </li>
  )
}

export function IndexKeyMistake({ orders }: { orders: SortableOrder[] }) {
  return (
    <div>
      <ul>
        {orders.map((order, index) => (
          <EditableOrderRow key={index} order={order} />
        ))}
      </ul>
      <ul>
        {orders.map((order) => (
          <EditableOrderRow key={order.id} order={order} />
        ))}
      </ul>
    </div>
  )
}
```
</div>

**为什么会错：** 假设 index `0` 原来对应 `order-401`，child state note 为 `"Call buyer"`。删除第一项后，index `0` 改为 `order-402`。React 仍看到 key `0`，于是保留该位置身份；UI 就把旧 note 显示在 `order-402` 下。stable ID 版本会删除 key `order-401`，并保留 key `order-402` 自己的 state。

**错误类型：** 这通常不是 TypeScript error，也不一定产生 runtime exception，而是 reconciliation identity bug。它只有在数据变化和 child state 组合时显现，因此更难排查。

**识别方法：** 看到 `key={index}` 时询问三个问题：列表会排序吗？会插入或删除吗？row 有 input、expanded state、animation 或 focus 吗？任一答案为“会/有”，就应使用 stable ID。

### 9.7 filter、sort、map 与不可变数组更新边界

**结论：** `filter()` 和 `map()` 返回新数组；`sort()` 修改调用它的数组。render 中需要排序时，应先复制，再排序。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-05-rendering-data/07-filter-sort-map-boundary/filter-sort-map-boundary.tsx</span>
  </div>

```tsx
import { useState } from 'react'

type InventoryItem = {
  id: string
  name: string
  category: 'electronics' | 'office'
  price: number
}

export function FilterSortMapBoundary({ items }: { items: InventoryItem[] }) {
  const [category, setCategory] = useState<'all' | InventoryItem['category']>('all')
  const [ascending, setAscending] = useState(true)

  const filteredItems = items.filter(
    (item) => category === 'all' || item.category === category,
  )
  const sortedItems = [...filteredItems].sort((left, right) =>
    ascending ? left.price - right.price : right.price - left.price,
  )

  return (
    <ul>
      {sortedItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
```
</div>

**变量与引用变化：**

- `items`：输入引用，不修改。
- `filteredItems`：`filter()` 创建的新 array reference；元素 objects 仍与输入共享引用。
- `[...filteredItems]`：再创建一个可安全重排的 shallow copy。
- `sort()`：原地修改这个 copy 的元素顺序。
- `sortedItems`：最终派生数组，不需要进入 state，因为它可由 inputs 重新计算。

**错误示例：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: direct sort mutation</span>
  </div>

```tsx
const sortedProducts = products.sort((left, right) => left.price - right.price)
```
</div>

这行会改变 `products` 所指数组。如果它来自 props、state 或 module-level seed data，就破坏了 input purity，并可能让其他组件观察到意外顺序。

**与第四章的关系：** 第四章强调 state update 返回新数组；本节把相同原则扩展到 render-time derivation。不要把可派生结果重复存入 state，也不要修改输入。

### 9.8 TypeScript 中列表数据、props 和联合 UI 状态的类型

**结论：** 列表类型应回答三个问题：单个 item 有什么字段、list component 接受什么容器、UI state 在每个分支携带什么数据。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-05-rendering-data/08-typed-list-rendering/typed-list-rendering.tsx</span>
  </div>

```tsx
type OrderStatus = 'pending' | 'paid' | 'shipped'

type Order = {
  id: string
  customerName: string
  total: number
  status: OrderStatus
}

type TypedOrderListProps = {
  orders: ReadonlyArray<Order>
}

function TypedOrderList({ orders }: TypedOrderListProps) {
  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          {order.id} · {order.customerName} · ${order.total} · {order.status}
        </li>
      ))}
    </ul>
  )
}
```
</div>

**TypeScript 层：**

- `Order[]` 和 `Array<Order>` 表示可变数组。
- `ReadonlyArray<Order>` 表示调用方传入后，组件不能通过该引用 `push`、`splice` 或 `sort`。
- string literal union 把 status 限定为三个已知值，避免任意 `string`。
- TypeScript 从 `orders.map` 推导 `order` 为 `Order`，因此 item component props 清晰。

**运行时层：** `OrderStatus`、`Order` 和 props type 都会被擦除。运行时仍然必须信任已验证的数据来源；如果真实 API 返回未知 JSON，需要在边界做 runtime validation，本章不引入相关库。

**过宽类型错误：** `Record<string, unknown>[]` 或 `object[]` 会让 list component 无法安全访问 `id`、`status` 和 `total`。`any[]` 更会关闭后续检查。应根据页面实际使用字段定义语义明确的 item type。

**联合 UI 状态模板：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: discriminated list state</span>
  </div>

```ts
type ListState<Item> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'empty' }
  | { status: 'success'; items: ReadonlyArray<Item> }
```
</div>

### 9.9 SellerHub 场景预告：products、cart items、orders 如何渲染

**结论：** SellerHub 的多个页面共享“typed list state -> conditional branch -> map -> stable key -> item component”这条渲染管线，但每个页面的 item type 和业务行为不同。

| 页面 | 数组 | Stable key | Item component | 典型状态 |
| --- | --- | --- | --- | --- |
| `ProductListPage` | `Product[]` | `product.id` | `ProductCard` | category empty、out of stock |
| `CartPage` | `CartItem[]` | `cartItem.id` | `CartItemRow` | empty cart、quantity limit |
| `BuyerOrdersPage` | `Order[]` | `order.id` | `BuyerOrderCard` | loading、error、no orders |
| `SellerOrdersPage` | `Order[]` | `order.id` | `SellerOrderRow` | status filter、empty |
| `SellerOrdersPage` 内部 | `OrderItem[]` | `orderItem.id` | `OrderItemRow` | item availability |
| `AdminProductsPage` | `Product[]` | `product.id` | `ProductReviewRow` | pending review、empty |

**边界：** 本章只预告渲染关系，不创建这些 SellerHub 页面，也不假设 API、router、database 或 data-fetching library 已存在。

**迁移规则：**

1. API 数据进入页面后先形成明确的 typed state。
2. 先区分 loading/error，再区分 empty/success。
3. 派生筛选和排序结果，不修改原数组。
4. `map()` 直接返回 item component。
5. key 使用 domain stable ID，不使用 display position。
6. child 若需要 ID，另外传 `productId`、`orderId` 等普通 prop。

## 10. API / 语法索引

| API / Syntax | Layer | Meaning | Common Mistake |
| --- | --- | --- | --- |
| `array.map(callback)` | JavaScript runtime | 返回逐项转换后的新数组 | block callback 忘记 `return` |
| `array.filter(predicate)` | JavaScript runtime | 返回满足条件元素的新数组 | 把 filter result 重复存入 state |
| `[...array].sort(compare)` | JavaScript runtime | 复制后安全重排 copy | 直接 `array.sort()` 修改输入 |
| `condition ? a : b` | JavaScript expression | 二选一返回值 | 多层嵌套降低可读性 |
| `condition && node` | JavaScript expression | 条件为 truthy 时返回 node | `0 && node` 会返回数字 `0` |
| early `return` | JavaScript control flow | 提前返回一种 UI description | 在 JSX braces 中直接写 `if` |
| `key={item.id}` | React special prop | 标识同级 item identity | 放在 map 结果的更深层 |
| `ReadonlyArray<Item>` | TypeScript type system | 描述只读 array view | 误以为会冻结 runtime array |
| discriminated union | TypeScript type system | 表达互斥状态及分支数据 | 使用多个可能矛盾的 booleans |

## 11. 常见错误表

| Error | Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| 忘记 list item key | React warning / identity risk | map 直接 children 需要 key | 使用数据中的 stable ID | Console 出现 unique key warning |
| key 放在 child 内层 | React warning / identity risk | key 必须位于 siblings 的直接返回层 | 把 key 移到 map callback 最外层 | 检查 callback 实际返回什么 |
| 读取 `props.key` | React special prop boundary | key 不转发 | 另传 `productId` 等业务 prop | child 需要 ID 时查 props 声明 |
| `key={index}` | reconciliation bug | position 不是 stable identity | 使用 domain ID | 列表会排序、增删或有 child state |
| render 中直接 `sort()` | mutation bug | props/state input 应保持纯净 | `[...items].sort(...)` | 查找会原地修改的 array methods |
| JSX braces 中写 `if` | syntax error | braces 需要 expression | JSX 前 early return 或 ternary | `{` 内出现 statement keyword |
| empty 与 loading 混合 | state modeling bug | 未区分“未知”和“成功为零” | 显式 union branches | 初次加载闪现 empty UI |
| 元素类型过宽 | TypeScript design issue | props contract 不明确 | 定义 domain item type | 大量断言、optional chaining 或 `any` |
| render 中生成随机 key | identity reset bug | key 每次 render 都变化 | 创建数据时生成一次 ID | input state 每次 render 重置 |

## 12. 最终小项目

### 项目目标

创建 `Product List Panel`：用 SellerHub 风格商品数据演示 category filter、stock conditional rendering、empty state、derived visible count、stable product ID key 和 typed component props。

### 为什么适合本章

这个项目把本章机制放进一条完整渲染链：

`Product[] -> category state -> filter -> visibleProducts -> empty/success branch -> map -> ProductCard`

项目没有后端和异步请求，因此 loading/error 在 9.3 独立练习中完整建模；小项目专注于列表变换、empty state、stock state 和 key identity。

### 最终小项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终小项目结构</span>
  </div>

```txt
src/learning/react/chapter-05-rendering-data/product-list-mini-project/
  product-list-types.ts
  product-list-seed-data.ts
  product-filter-controls.tsx
  product-card.tsx
  product-grid.tsx
  product-list-summary.tsx
  product-list-mini-project.tsx
  product-list-mini-project.css
```
</div>

### 文件职责

| File | Responsibility |
| --- | --- |
| `product-list-types.ts` | 定义 `Product`、category 和 filter 类型。 |
| `product-list-seed-data.ts` | 提供只读商品数组和 filter options。 |
| `product-filter-controls.tsx` | 渲染 category buttons 并向上通知选择。 |
| `product-card.tsx` | 渲染单个商品与 stock conditional branch。 |
| `product-grid.tsx` | 处理 empty state，并用 stable ID map cards。 |
| `product-list-summary.tsx` | 显示 derived visible count。 |
| `product-list-mini-project.tsx` | 持有 filter state 并组合项目。 |
| `product-list-mini-project.css` | 提供小项目布局与状态样式。 |

### 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-list-types.ts</span>
  </div>

```ts
export type ProductCategory = 'electronics' | 'office' | 'home'

export type CategoryFilter = 'all' | ProductCategory

export type Product = Readonly<{
  id: string
  name: string
  category: ProductCategory
  price: number
  stock: number
  description: string
}>

export type CategoryOption = Readonly<{
  value: CategoryFilter
  label: string
}>
```
</div>

`Readonly` 表达 child 不应修改 product fields；它是 compile-time contract，不会在 runtime 调用 `Object.freeze()`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-list-seed-data.ts</span>
  </div>

```ts
import type { CategoryOption, Product } from './product-list-types'

export const productListSeedData: ReadonlyArray<Product> = [
  {
    id: 'product-mechanical-keyboard',
    name: 'Mechanical Keyboard',
    category: 'electronics',
    price: 129,
    stock: 12,
    description: 'Hot-swappable switches with a compact layout.',
  },
  {
    id: 'product-studio-headphones',
    name: 'Studio Headphones',
    category: 'electronics',
    price: 189,
    stock: 0,
    description: 'Closed-back monitoring headphones for focused work.',
  },
  {
    id: 'product-ergonomic-chair',
    name: 'Ergonomic Chair',
    category: 'office',
    price: 349,
    stock: 4,
    description: 'Adjustable lumbar support and breathable mesh.',
  },
  {
    id: 'product-desk-organizer',
    name: 'Desk Organizer',
    category: 'office',
    price: 42,
    stock: 18,
    description: 'Modular trays for stationery and small devices.',
  },
]

export const productCategoryOptions: ReadonlyArray<CategoryOption> = [
  { value: 'all', label: 'All products' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'office', label: 'Office' },
  { value: 'home', label: 'Home' },
]
```
</div>

`home` option 故意没有 seed product，用于稳定复现 empty state；它不是 error state。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-filter-controls.tsx</span>
  </div>

```tsx
import type { CategoryFilter, CategoryOption } from './product-list-types'

type ProductFilterControlsProps = {
  options: ReadonlyArray<CategoryOption>
  selectedCategory: CategoryFilter
  onCategoryChange: (category: CategoryFilter) => void
}

export function ProductFilterControls({
  options,
  selectedCategory,
  onCategoryChange,
}: ProductFilterControlsProps) {
  return (
    <div className="product-filter-controls" aria-label="Product category filter">
      {options.map((option) => (
        <button
          className={option.value === selectedCategory ? 'is-selected' : undefined}
          key={option.value}
          type="button"
          onClick={() => onCategoryChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
```
</div>

这里的 list items 是 buttons，所以 key 直接放在 `map()` 返回的 `<button>` 上。callback prop 把 filter intent 传回 state owner。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-card.tsx</span>
  </div>

```tsx
import type { Product } from './product-list-types'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const isInStock = product.stock > 0

  return (
    <article className="product-card">
      <div className="product-card-heading">
        <p>{product.category}</p>
        <span className={isInStock ? 'stock-badge in-stock' : 'stock-badge out-of-stock'}>
          {isInStock ? `${product.stock} in stock` : 'Out of stock'}
        </span>
      </div>
      <h3>{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price}</p>
      <button type="button" disabled={!isInStock}>
        {isInStock ? 'View product' : 'Unavailable'}
      </button>
    </article>
  )
}
```
</div>

`isInStock` 是由 props 派生的普通 boolean，不需要 state。两个 ternaries 分别选择 CSS class/text 和 button label。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-grid.tsx</span>
  </div>

```tsx
import { ProductCard } from './product-card'
import type { Product } from './product-list-types'

type ProductGridProps = {
  products: ReadonlyArray<Product>
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="product-empty-state">
        <p className="product-empty-state-label">Empty state</p>
        <h3>No products match this category.</h3>
        <p>Choose another category to return to the product grid.</p>
      </div>
    )
  }

  return (
    <div className="product-grid" aria-label="Visible products">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```
</div>

early return 把 empty branch 与 success list branch 完全分开。`key` 在 `ProductCard` siblings 上，而 `product` 作为普通 prop 传入。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-list-summary.tsx</span>
  </div>

```tsx
type ProductListSummaryProps = {
  visibleCount: number
  totalCount: number
}

export function ProductListSummary({ visibleCount, totalCount }: ProductListSummaryProps) {
  return (
    <p className="product-list-summary" aria-live="polite">
      Showing <strong>{visibleCount}</strong> of <strong>{totalCount}</strong> products
    </p>
  )
}
```
</div>

`visibleCount` 来自 `visibleProducts.length`，是 derived value，不额外同步 state。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-list-mini-project.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import { ProductFilterControls } from './product-filter-controls'
import { ProductGrid } from './product-grid'
import { ProductListSummary } from './product-list-summary'
import { productCategoryOptions, productListSeedData } from './product-list-seed-data'
import type { CategoryFilter } from './product-list-types'
import './product-list-mini-project.css'

export function ProductListMiniProject() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all')

  const visibleProducts = productListSeedData.filter(
    (product) => selectedCategory === 'all' || product.category === selectedCategory,
  )

  return (
    <section className="product-list-panel">
      <div className="product-list-header">
        <div>
          <p className="product-list-eyebrow">SellerHub learning connection</p>
          <h2>Product List Panel</h2>
          <p>
            Stable product IDs, derived category results, and explicit empty and stock
            states.
          </p>
        </div>
        <ProductListSummary
          visibleCount={visibleProducts.length}
          totalCount={productListSeedData.length}
        />
      </div>

      <ProductFilterControls
        options={productCategoryOptions}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <ProductGrid products={visibleProducts} />
    </section>
  )
}
```
</div>

state 只保存用户选择的 category。visible array 和 count 都可从 seed data 与 category 计算，因此不进入 state，也不需要 effect。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-05-rendering-data/product-list-mini-project/product-list-mini-project.css</span>
  </div>

```css
.product-list-panel {
  overflow: hidden;
  border: 1px solid #cfd7e3;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 18px 50px rgb(16 24 40 / 8%);
}

.product-list-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  padding: 28px;
  color: #ffffff;
  background: #14213d;
}

.product-list-eyebrow {
  margin: 0;
  color: #93c5fd;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.product-list-header h2 {
  margin: 8px 0 0;
  font-size: clamp(1.8rem, 4vw, 3rem);
}

.product-list-header > div > p:last-child {
  max-width: 620px;
  margin: 12px 0 0;
  color: #cbd5e1;
  line-height: 1.55;
}

.product-list-summary {
  flex: 0 0 auto;
  margin: 0;
  color: #cbd5e1;
}

.product-list-summary strong {
  color: #ffffff;
  font-size: 1.2rem;
}

.product-filter-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 20px 28px;
  border-bottom: 1px solid #e4e7ec;
  background: #f8fafc;
}

.product-filter-controls button {
  color: #344054;
  border-color: #cbd5e1;
  background: #ffffff;
}

.product-filter-controls button:hover {
  color: #ffffff;
  background: #344054;
}

.product-filter-controls .is-selected {
  color: #ffffff;
  border-color: #2563eb;
  background: #2563eb;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  padding: 28px;
}

.product-card {
  display: flex;
  min-width: 0;
  padding: 20px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  flex-direction: column;
  background: #ffffff;
}

.product-card-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.product-card-heading > p {
  margin: 0;
  color: #2563eb;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.stock-badge {
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 800;
}

.stock-badge.in-stock {
  color: #067647;
  background: #ecfdf3;
}

.stock-badge.out-of-stock {
  color: #b42318;
  background: #fef3f2;
}

.product-card h3 {
  margin: 18px 0 0;
  color: #101828;
  font-size: 1.25rem;
}

.product-description {
  flex: 1;
  margin: 10px 0 0;
  color: #667085;
  line-height: 1.55;
}

.product-price {
  margin: 20px 0 14px;
  color: #101828;
  font-size: 1.5rem;
  font-weight: 850;
}

.product-card button {
  width: 100%;
}

.product-empty-state {
  margin: 28px;
  padding: 48px 24px;
  border: 1px dashed #98a2b3;
  border-radius: 8px;
  text-align: center;
  background: #f8fafc;
}

.product-empty-state-label {
  margin: 0;
  color: #2563eb;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.product-empty-state h3 {
  margin: 8px 0 0;
  color: #101828;
}

.product-empty-state > p:last-child {
  margin: 10px 0 0;
  color: #667085;
}

@media (max-width: 720px) {
  .product-list-header {
    align-items: start;
    flex-direction: column;
  }

  .product-grid {
    grid-template-columns: 1fr;
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
npm run lint
npm run build
```
</div>

当前默认 browser entry 是 Sudoku，所以这两个命令用于验证第五章全部 TSX/CSS import 边界。视觉运行需要后续明确切换入口，不在本章改动范围内。

### 预期输出或交互结果

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Output</span>
  </div>

```txt
All products: 4 visible products
Electronics: 2 visible products
Office: 2 visible products
Home: empty state
Studio Headphones: Out of stock
```
</div>

### 核心执行流程

1. `ProductListMiniProject` 初次 render，category state 为 `all`。
2. `filter()` 返回四个 products 的新 array。
3. summary 读取派生 `length`，controls map options。
4. grid 检查 non-empty 后 map products。
5. React 用 `product.id` 匹配 card siblings。
6. card 根据 `stock > 0` 选择 badge 和 button description。
7. 点击 `Home` 后 state update 触发新 render。
8. filter 返回空数组，grid early return empty state。

### 常见错误

- 把 `visibleProducts` 和 `visibleCount` 都存入 state：制造需要同步的重复状态。
- 对 `productListSeedData.sort()`：修改共享 seed array。
- 在 `ProductCard` 内设置 key：父 `ProductGrid` 无法用它匹配 card siblings。
- 用 option index 或 product index 作 key：未来重排时身份不稳定。
- 以 `visibleProducts.length === 0` 代表请求 loading：混淆不同业务事实。

### 可选扩展

- 增加 price sort，但必须复制后排序。
- 增加 search text，并从 category + search 派生 visible array。
- 把 UI state 升级为 loading/error/empty/success discriminated union。
- 增加 order list 练习，沿用 stable domain ID 规则。

这些扩展不需要引入 router、后端或第三方 state library。

## 13. 额外速查表

### 一句话概念总结

JavaScript 把 typed arrays 转换为 React node descriptions，conditional branches 选择本次 UI，而 React 用同级 stable keys 在前后 renders 之间保持正确身份。

### 常用 API 表

| API / Syntax | Layer | Purpose | Input | Output / Effect | Common Mistake |
| --- | --- | --- | --- | --- | --- |
| `map` | JavaScript | 转换每个 item | callback | 新数组 | 忘记 return、忘记 key |
| `filter` | JavaScript | 选择部分 items | predicate | 新数组 | 重复存入 state |
| `sort` | JavaScript | 原地重排数组 | compare function | 同一数组引用 | 直接修改 props/state |
| ternary | JavaScript expression | 二选一 | boolean-like condition | 一个值 | 多层嵌套 |
| early return | JavaScript control flow | 分离完整 UI branch | condition | 提前结束 function | 重复大量 markup |
| `key` | React convention | sibling identity | stable string/number | reconciliation hint | index/random key |
| union | TypeScript | 限定可能状态 | member types | compile-time narrowing | 使用任意 string |

### 相似概念对照表

| Concept A | Concept B | Key Difference | Use A | Use B |
| --- | --- | --- | --- | --- |
| React element | DOM node | description vs browser object | render result | commit 后的真实页面 |
| key | normal prop | React hint vs application data | sibling identity | child 业务逻辑 |
| empty | loading | 已成功但零结果 vs 尚未确定 | successful zero result | pending operation |
| `map` | `forEach` | 返回新数组 vs 通常只执行 side effect | 生成 node array | 非渲染遍历任务 |
| `filter` | conditional item body | 先缩小数据集合 vs item 内局部分支 | 整项排除 | 同一项的局部状态 |
| stable ID | array index | domain identity vs position | 动态列表 | 极少数完全静态列表 |

### 错误类型表

| Error | Error Type | Violated Rule | Correction | Recognition |
| --- | --- | --- | --- | --- |
| unique key warning | React tooling warning | list siblings 缺少 key | 使用 stable ID | 检查 map return root |
| note 跑到另一行 | identity bug | index key 匹配了位置 | domain ID key | 排序/删除后复现 |
| `props.key` 为不可用 | framework boundary | special prop 不转发 | 显式传普通 prop | child 需要读取 key value |
| `if` in JSX | syntax error | JSX braces 要 expression | early return/ternary | braces 内有 statement |
| 原数组顺序改变 | mutation bug | `sort` 原地修改 | copy then sort | 多处共享数组时出现 |
| success 缺少 items | TypeScript error | union member contract | 补 items 或换 status | discriminant narrowing |

### 真实项目使用表

| Scenario | Why It Appears | Mechanism | Risk | Practical Rule |
| --- | --- | --- | --- | --- |
| product grid | 商品集合展示 | filter + map + key | stock/empty 混淆 | 先派生，再分支 |
| cart rows | 数量和删除变化 | stable key + item props | index key state 错位 | 使用 `cartItem.id` |
| buyer orders | 异步订单列表 | union UI state | loading 闪成 empty | 显式四分支 |
| seller order items | 嵌套列表 | 每层 siblings keys | key scope 放错 | 每层各用本层 ID |
| admin review | filter/sort results | immutable derivation | mutation shared input | copy before sort |

### 最小代码模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: typed keyed list</span>
  </div>

```tsx
type Item = {
  id: string
  label: string
}

export function ItemList({ items }: { items: ReadonlyArray<Item> }) {
  if (items.length === 0) {
    return <p>No items found.</p>
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.label}</li>
      ))}
    </ul>
  )
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: immutable filtered and sorted list</span>
  </div>

```ts
const visibleItems = items
  .filter((item) => item.isVisible)
  .slice()
  .sort((left, right) => left.label.localeCompare(right.label))
```
</div>

## 14. 工程迁移与代码审查要点

### Code review questions

- 列表 key 是否来自稳定业务 id，而不是 array index？
- 条件分支是否覆盖空、错误、加载和成功场景？
- 过滤和排序是否保持源数据不可变？

### Migration checks

- 把重复 JSX 迁移为 map 前，先定义 item type 和稳定 id。
- 把多个 `&&` 条件迁移为更清楚的分支模型，避免互相遮挡。
- 把派生数据放在 render 计算或 memo 边界，而不是写回原 state。

### Production risk signals

- 筛选后输入框状态跑到其他行，检查 key 是否不稳定。
- 空列表没有反馈，说明 conditional branch 设计缺失。
- 排序后数据永久改变，说明派生逻辑污染了源数据。

## 15. 如何转换成个人笔记

建议把本章整理成四张图和三组错误复现：

1. 画出 `array -> map -> element descriptions -> key match -> DOM commit`。
2. 画出 loading/error/empty/success 状态机，标出每个分支携带的数据。
3. 画出 `key` 与普通 prop 的双通道：React identity 与 child application data。
4. 画出 `filter -> copy -> sort -> map` 的引用变化。
5. 亲自复现无 key warning、index key state 错位和 direct sort mutation。
6. 把 `Product` 替换为 `CartItem` 和 `Order`，验证模型仍成立。

## 16. 必须能回答的问题

1. 为什么 JSX 中的 list rendering 本质上仍是 JavaScript？
2. `map()` callback 返回的 JSX 在 runtime 是什么角色？
3. React element、component identity 和 DOM node 有何区别？
4. key 在什么范围内必须唯一？为什么不要求全局唯一？
5. key 为什么必须稳定？随机 key 会发生什么？
6. key 应放在 `map()` 返回结构的哪个位置？
7. 为什么 child 读不到 `props.key`？
8. index key 为什么会让 input state 跟错 row？
9. `sort()` 与 `map()`、`filter()` 的 mutation 行为有什么差异？
10. empty state 和 loading state 分别表达什么事实？
11. discriminated union 怎样防止矛盾状态？
12. TypeScript types 在 runtime 是否仍存在？
13. SellerHub 的 product、cart、order 列表分别应使用什么 stable key？

## 17. 最终记忆模型

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终记忆模型</span>
  </div>

```txt
Typed data array
  -> immutable derivation
  -> explicit UI state branch
  -> map to React elements
  -> stable sibling keys
  -> React preserves the right identities
  -> commit the necessary DOM changes
```
</div>

最终要记住：

- `map`、`filter`、ternary 和 `if` 属于 JavaScript；React 使用它们产生的 description。
- element 是 description，不是 DOM node；component state 由 React 根据 tree identity 关联。
- key 的职责是 sibling identity，不是 child data；需要数据时另传普通 prop。
- dynamic list 使用 domain stable ID，不使用 position。
- UI state 应明确，派生数组应保持输入不可变，TypeScript 应表达真实业务边界。

## 18. 官方文档阅读清单

1. [React: Rendering Lists](https://react.dev/learn/rendering-lists)：重点阅读 `map`、`filter`、keys、siblings scope、stable key 与 index key pitfall。
2. [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)：重点阅读 early return、ternary、`&&`，以及 JSX elements 不是 instances 或 DOM nodes 的说明。
3. [React: Keeping Components Pure](https://react.dev/learn/keeping-components-pure)：重点阅读 mutation boundary 与 render purity。
4. [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)：重点阅读 state 与 render-tree position、type、key 的关系。
5. [React: Special Props Warning](https://react.dev/warnings/special-props)：确认 `key` 和 `ref` 不转发给 component props。
6. [TypeScript Handbook: Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)：复习 arrays、union types 和 narrowing 基础。

本地补充资料：`references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf` 第 31-35 页解释 `map()`、list rendering、stable key 和 index key，第 53-56 页展示 list/item props。该 PDF 第 33 页把 key 描述为 “HTML attribute”，这个表述不够精确；本章遵循当前 React 19.2 官方文档，把 `key` 视为 React 消费且不转发的特殊 prop。
