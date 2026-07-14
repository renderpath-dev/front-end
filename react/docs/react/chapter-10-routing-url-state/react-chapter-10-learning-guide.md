# React 第 10 章：Routing、URL State 与 Navigation

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
  - [9.1 Client-side routing 与 full page navigation](#91-client-side-routing-与-full-page-navigation)
  - [9.2 Router location、route tree 与 route matching](#92-router-locationroute-tree-与-route-matching)
  - [9.3 Link、NavLink 与 navigation intent](#93-linknavlink-与-navigation-intent)
  - [9.4 Nested routes、layout route 与 Outlet](#94-nested-routeslayout-route-与-outlet)
  - [9.5 Dynamic route params 与 TypeScript string boundary](#95-dynamic-route-params-与-typescript-string-boundary)
  - [9.6 Search params 作为 URL state](#96-search-params-作为-url-state)
  - [9.7 URL state、local state 与 Context state 的边界](#97-url-statelocal-state-与-context-state-的边界)
  - [9.8 Programmatic navigation 与 event-driven flow](#98-programmatic-navigation-与-event-driven-flow)
  - [9.9 Not found route 与 fallback matching](#99-not-found-route-与-fallback-matching)
  - [9.10 Protected route placeholder 与 auth boundary](#910-protected-route-placeholder-与-auth-boundary)
  - [9.11 Route change、component identity 与 state reset](#911-route-changecomponent-identity-与-state-reset)
  - [9.12 Route params 作为 async request criteria](#912-route-params-作为-async-request-criteria)
  - [9.13 SellerHub route architecture mapping](#913-sellerhub-route-architecture-mapping)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标](#121-项目目标)
  - [12.2 最终小项目结构](#122-最终小项目结构)
  - [12.3 文件职责](#123-文件职责)
  - [12.4 完整代码](#124-完整代码)
  - [12.5 核心执行流程](#125-核心执行流程)
  - [12.6 机制边界与常见错误](#126-机制边界与常见错误)
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
| Client routing boundary | The router maps URL intent to React elements. | React Router runtime | SellerHub pages switch without full document navigation. | `src/learning/react/chapter-10-routing-url-state/01-client-routing-boundary/client-routing-boundary.tsx` |
| Route matching tree | Nested routes inherit layout boundaries. | React Router matcher | Catalog, orders, checkout, and detail pages share shells intentionally. | `src/learning/react/chapter-10-routing-url-state/02-route-matching-tree/route-matching-tree.tsx` |
| URL search state | Shareable UI state belongs in the URL when it identifies the view. | Browser history and URLSearchParams | Catalog filters can be copied and restored. | `src/learning/react/chapter-10-routing-url-state/06-search-params-url-state/search-params-url-state.tsx` |
| Protected route placeholder | Access checks sit at route boundaries, not inside every leaf page. | Routing architecture | Seller-only pages describe the guard even without real auth. | `src/learning/react/chapter-10-routing-url-state/10-protected-route-placeholder/protected-route-placeholder.tsx` |

## 0. 本章工程问题与边界

本章解决的工程问题是：URL 不只是地址栏文本，它是应用状态、导航意图和页面边界的一部分。路由让页面结构、嵌套 layout、URL 参数和本地状态重置变得可审查。

本章不实现真实认证、后端权限、SSR 或完整产品路由架构。边界是 client router、links、nested routes、params、search params、not-found 和 placeholder guard。

## 1. 本章解决的问题

没有 router 时，开发者常用 local state 切换“页面”。这样可以改变 JSX，却没有可分享 URL、History entry、Back/Forward 语义或直接访问路径。另一种极端是所有内部导航都写成 `<a href>`；浏览器会请求新 document，当前 JavaScript heap 和 React tree 随旧 document 一起结束。

本章解决的核心问题是：如何让 URL 成为有边界的应用状态，让 React Router 根据 current location 选择 route branch，同时保留 browser navigation 的可访问性与历史语义；以及如何判断某个值应该属于 URL、component、Context，还是只属于一次 history entry。

## 2. 前置概念

- **Props 与 component composition：** route element 仍是 React element，layout 仍通过 composition 组织。
- **State snapshot 与 event handler：** `navigate()` 和 `setSearchParams()` 都应由事件或同步外部位置的逻辑触发，不应在 render 中调用。
- **Effects 与 cleanup：** route param 成为 request criteria 后，旧请求仍需 abort 或 ignore。
- **State owner、Context 与 key：** URL 不是所有状态的 owner；route branch 改变也不自动等于所有 state reset。
- **Async lifecycle：** product detail 仍需要 runtime validation 和 obsolete-result protection。
- **Browser URL、History API 与 `URLSearchParams`：** React Router 建立在这些 browser platform 能力之上，不替代它们的语义。

## 3. 学习目标

完成本章后，你应该能够：

1. 从一次点击追踪到 History entry、location、route matches、route elements 与 React commit。
2. 解释为什么 `Link` 通常保留当前 document，而普通内部 `<a href>` 会启动 document navigation。
3. 配置 nested routes、layout route、index route、dynamic segment 和 splat fallback。
4. 把 `useParams()` 与 `useSearchParams()` 返回的 runtime string 当作不可信边界，并做 narrowing。
5. 为 URL state、local state、Context state 与 location state 选择正确 owner。
6. 判断 navigation 应该使用 `Link`、`NavLink` 还是 `useNavigate()`。
7. 解释 route change 为什么可能 preserve state，以及何时用 `key={productId}` 显式 reset。
8. 把 route params 接到第 9 章 async request criteria，并清理 obsolete request。
9. 说明 protected route 只是前端 UI boundary，不是后端 authorization。

## 4. 机制依赖图

这些依赖不是阅读顺序清单，而是本章概念成立的前置关系。

| First Understand | Then Understand | Dependency Reason | Failure If Skipped |
| --- | --- | --- | --- |
| URL path | Route match | 先理解 path 如何匹配元素，才能设计页面边界。 | 会把条件渲染误当路由系统。 |
| Layout route | Outlet child route | 嵌套页面需要父 layout 提供稳定壳层。 | 重复 shell 或子页面无法出现。 |
| URL param | Data lookup criteria | 动态段是读取具体资源的条件。 | 详情页无法区分不同产品或订单。 |
| Search param | Shareable filter state | 只有适合分享和恢复的状态才应进入 URL。 | 本地 UI 状态污染地址栏或筛选不可复制。 |

## 5. 核心术语表

| Term | 中文说明 | Layer | Why It Matters |
| --- | --- | --- | --- |
| document navigation | 浏览器请求并装载 document 的导航 | Browser platform | 旧 JavaScript realm 与 React tree 会结束 |
| client-side routing | 在当前 document 内更新 URL 与 UI branch | React Router + History API | 保留 SPA runtime 并提供 URL/history 语义 |
| location | router 对当前 pathname、search、hash、state、key 的表示 | React Router | route matching 与 URL values 的输入 |
| history entry | session history stack 中的一项 | Browser History API | Back/Forward 选择的是 entry，不是 React state |
| route tree | path pattern 与 element 的层级配置 | React Router | nested ownership 和 matching 的结构来源 |
| route branch | current location 匹配到的 parent-to-leaf routes | React Router | 决定本次 render 哪组 route elements |
| dynamic segment | 以 `:` 声明的路径片段 | React Router syntax | 产生 runtime route params |
| search params | `?` 后的 query key/value strings | Browser URL + React Router | 适合可分享筛选条件 |
| location state | 与某个 history entry 关联但不显示在 URL 的值 | History API + React Router | 适合 redirect intent，不适合作为持久数据 |
| layout route | 提供 element nesting、但可不增加 path segment 的 route | React Router | 表达共享 UI owner |
| Outlet | parent route element 中 child element 的插槽 | React Router component | 没有 Outlet，匹配的 child 没有渲染位置 |
| navigation intent | 用户想前往某个可定位资源的意图 | Architecture convention | 优先由 Link/NavLink 表达 |
| UI guard | 根据前端 auth placeholder 决定 route element | Architecture convention | 只能改善 UI，不能授权后端操作 |

## 6. 底层心智模型

一次 declarative client navigation 可以拆成八层：

1. **Browser platform：** 用户点击 anchor，browser 先形成 navigation intent；React Router 只拦截它能安全处理的 same-document client navigation。
2. **History API：** router push 或 replace 一个 session history entry；Back/Forward 以后选择不同 entry。
3. **React Router：** `BrowserRouter` 读取 location，`Routes` 用 path patterns 计算 parent-to-leaf branch。
4. **React framework：** 被选中的 route elements 进入 React tree；React 根据 type、position 与 key preserve 或 reset component state。
5. **JavaScript runtime：** params/search params/location state 都是对象或 strings；handler、parser 与 async closure 在 runtime 执行。
6. **TypeScript type system：** 检查 API 调用和 union narrowing，但不会检查用户手动输入的 URL 是否符合业务规则。
7. **Architecture convention：** 团队决定哪些值可分享、可恢复、可公开，因而应进入 URL；哪些是私有 draft 或跨层 service state。
8. **Tooling：** Vite 转换 TSX 并提供开发期 SPA fallback；生产 host 仍需把未知应用路径回退到 `index.html`。

关键公式是：

`navigation intent -> history entry -> location -> route matching -> route branch -> route elements -> React identity -> committed UI`

## 7. 推荐目录结构

### 当前项目结构

以下文件在本次任务后真实存在。`src/App.tsx` 只负责挂载章节入口，核心机制不堆在入口中。

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
    learning/react/chapter-10-routing-url-state/
      chapter-10-practice-root.tsx
      chapter-10-practice.css
      01-client-routing-boundary/client-routing-boundary.tsx
      02-route-matching-tree/route-matching-tree.tsx
      03-link-navlink-intent/link-navlink-intent.tsx
      04-nested-layout-outlet/nested-layout-outlet.tsx
      05-dynamic-route-params/dynamic-route-params.tsx
      06-search-params-url-state/search-params-url-state.tsx
      07-url-local-context-state/url-local-context-state.tsx
      08-programmatic-navigation/event-driven-navigation.tsx
      09-not-found-route/not-found-fallback-route.tsx
      10-protected-route-placeholder/protected-route-placeholder.tsx
      11-route-state-reset/route-param-state-reset.tsx
      12-route-params-async-criteria/route-param-async-criteria.tsx
      sellerhub-routing-workspace/
        sellerhub-catalog-data.ts
        sellerhub-product-request.ts
        sellerhub-workspace-layout.tsx
        sellerhub-catalog-page.tsx
        sellerhub-product-detail-page.tsx
        sellerhub-seller-layout.tsx
        sellerhub-orders-page.tsx
        sellerhub-checkout-page.tsx
        sellerhub-login-page.tsx
        sellerhub-protected-route.tsx
        sellerhub-not-found-page.tsx
        sellerhub-routing-workspace.tsx
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
docs/react/chapter-10-routing-url-state/
  react-chapter-10-learning-guide.md
```
</div>

### 真实练习结构

`01` 到 `12` 对应 9.1 到 9.12。编号固定学习顺序，目录名表达机制，文件名表达可运行目标。9.13 是架构映射，不伪造额外练习文件；它读取前 12 节的结论并映射到最终 workspace。

### 概念示例结构

本章错误对比优先使用正文和错误表。若出现 `Snippet:`，它只代表短错误片段，不是需要创建的路径，也不用于交付验证记录。

### 最终小项目结构

最终项目独立放在 `sellerhub-routing-workspace/`。route tree、pages、layout、guard、mock request 与 domain data 各自拥有明确模块；章节 adapter 与通用 CSS 不重复进入项目完整代码。

## 8. 示例运行方式

React Router 已安装为 `react-router@7.18.0`，与当前 React 19.2.4、React DOM 19.2.4 和 Node 26.3.0 的 peer/engine 范围兼容。项目使用 Declarative mode，不混用 data router。

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

打开 Vite 输出的本地 URL。默认 route 会 replace 到 `/catalog`；`/practice` 显示 12 个独立机制练习。开发服务器能处理这些 client routes；生产部署必须由 host 配置 SPA fallback，否则直接请求 `/catalog/lamp-101` 可能在 React 启动前由服务器返回 404。

## 9. 分节教学与练习

### 9.1 Client-side routing 与 full page navigation

**结论：**

Client-side routing 不是“没有导航”，而是在同一个 document 内，由 router 借助 History API 更新 location，再让 React 提交新的 route branch。普通内部 `<a href="/catalog">` 仍表达有效链接，但 browser 默认会请求目标 document；该请求成功后，旧 document 的 JavaScript heap、React root、Context 与 local state 都不再存在。

**本节解决的问题与技术意义：**

本节解决“为什么两个控件都渲染为 anchor，却有不同运行结果”。保留真实 anchor 语义很重要：用户仍能用键盘、右键、复制地址和新标签页。React Router 的 `Link` 不把导航降级为普通 button；它在可处理的 click 上执行 client navigation，在 modifier key、外部 URL 或明确 document reload 场景下仍服从 browser。

**新关键字、层级边界与底层机制：**

新概念是 document navigation、client navigation、same-document route transition。Browser platform 决定 anchor 默认动作；History API 保存 session entries；React Router 的 `Link` 处理 navigation intent 并更新 location；React 根据新 branch render elements；JavaScript runtime 执行 click handler；TypeScript 检查 `to` prop，却不验证目标业务页面存在；architecture convention 规定应用内部可定位资源使用 Link；Vite 只在开发期提供 document 与 module tooling。

**API / 语法规则与固定名称：**

`<Link to="/catalog">` 的固定 prop 是 `to`；普通 anchor 使用 `href`。`useLocation(): Location` 返回当前 router location。不要把 `Link` 写成没有 `to` 的 button，也不要把所有 anchor 都替换成 `onClick={() => navigate(...)}`，那会损失原生链接交互。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/01-client-routing-boundary/client-routing-boundary.tsx</span>
  </div>

```tsx
import { Link, useLocation } from 'react-router'

export function ClientRoutingBoundary() {
  const location = useLocation()

  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">01 / Navigation boundary</p>
      <h2>Client navigation and document navigation</h2>
      <p>
        The router location is <code>{location.pathname + location.search}</code>.
      </p>
      <div className="routing-practice-actions">
        <Link to="/catalog">Client navigation to catalog</Link>
        <a href="/catalog">Full document request to catalog</a>
      </div>
      <p className="routing-practice-note">
        Both controls have an anchor destination. The Link lets React Router handle the
        same-origin click without requesting a new document.
      </p>
    </article>
  )
}
```
</div>

**逐行解释：**

第一行同时导入 declarative link 和 location reader。`location` 是本次 render 读取到的 router value；`pathname + search` 让你看到 router 的当前输入。`Link` 生成有目标的 anchor 并注册 router navigation；下一行普通 `<a>` 没有 router handling，因而保留 browser document request。两者文案刻意不同，避免把视觉相同误当成运行机制相同。

**执行过程、对象变化与结果原因：**

点击 `Link` 时，browser 产生 click 和 navigation intent；React Router 判断该 same-origin click 可由 client router 处理，阻止 document navigation，写入/替换 History entry，创建新的 location object。`BrowserRouter` 的 context value 改变，消费 location 的组件获得新 render snapshot，route matcher 选中 `/catalog` branch，React commit catalog elements。点击 `<a href>` 时，browser 发起 document request；新 document 装载后重新执行 Vite bundle，旧 `location` object、组件 state cells 与 closures 全部被销毁。

**机制证据链：**

触发是点击两个不同 anchor；具体 runtime 值分别是 `to='/catalog'` 与 `href='/catalog'`。前者让 router push location，后者让 browser load document；TypeScript 只能检查 JSX props，不能承诺服务器会对 `/catalog` 返回 SPA document。UI 都可能最后显示 Catalog，但前者保留当前 runtime，后者重建 runtime。若内部导航后输入框 draft、Context 或 React DevTools tree 全部重置，并伴随 Network 面板新的 document 请求，就能识别误用了普通 `<a href>`。

**对比、错误规则与识别方法：**

外部站点、文件下载或明确要求 reload 的地址应使用普通 anchor；应用内部 client route 通常用 Link。错误规则不是“永远不能用 `<a>`”，而是没有区分 document resource 与 router-owned location。另一个错误是把 `href="#"` 当导航，再在 click 中改 state：URL/history 不能准确描述页面，刷新和复制链接都失效。

**与 SellerHub 和学习主线的关系：**

Catalog 到 Product Detail、Seller Orders 到 Checkout 都是可定位的应用资源，应使用 Link/NavLink。支付供应商、帮助中心等外部 document 才使用普通 anchor。本节把第 4 章 event、第 8 章 state owner 与 browser navigation 连接起来。

**最终记忆模型：**

`Link` 保留 anchor intent，并把可处理的内部导航交给 router；`<a href>` 默认把目标交给 browser document loader。判断依据是“谁拥有目标资源和 navigation lifecycle”，不是标签外观。

### 9.2 Router location、route tree 与 route matching

**结论：**

Router 不按组件文件名选择页面。它读取 current location 的 pathname，把预先配置的 route tree 与 pathname 做匹配，得到从 parent 到 leaf 的 route branch；branch 上的 elements 才进入本次 React tree。

**本节解决的问题与技术意义：**

本节解释 URL 变化为什么会改变 component tree，而不只是地址栏文字。把 matching 理解为纯输入输出，有助于调试“URL 正确但页面为空”“错误 child 被匹配”“params 被覆盖”等问题：输入是 location，配置是 route objects/elements，输出是 ordered matches。

**新关键字、层级边界与底层机制：**

新概念是 location、route tree、path pattern、route branch 和 match params。Browser/History 负责 current entry；React Router 读取 pathname 并执行 ranked matching；React 只处理 matcher 交来的 elements；JavaScript runtime 创建 `matches` array 和 params objects；TypeScript 检查 `RouteObject[]` 结构，不会检查地址栏字符串一定命中；architecture convention 决定 route tree 是否能表达页面 ownership；tooling 只打包配置。

**API / 语法规则与固定名称：**

`matchRoutes(routes, location)` 返回 matches 或 `null`。每个 match 包含 `route`、`pathname`、`params`。`path: '*'` 是 fallback pattern；`index: true` 表示 parent URL 的默认 child。动态 segment 必须有唯一名称，否则 params object 的同名 key 会发生覆盖。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/02-route-matching-tree/route-matching-tree.tsx</span>
  </div>

```tsx
import { matchRoutes, useLocation } from 'react-router'
import type { RouteObject } from 'react-router'

const learningRouteTree: RouteObject[] = [
  {
    path: '/',
    children: [
      { index: true },
      { path: 'catalog' },
      { path: 'catalog/:productId' },
      {
        path: 'seller',
        children: [{ index: true }, { path: 'orders' }],
      },
      { path: '*' },
    ],
  },
]

export function RouteMatchingTree() {
  const location = useLocation()
  const matches = matchRoutes(learningRouteTree, location)

  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">02 / Route matching</p>
      <h2>Location selects one route branch</h2>
      <p>
        Current pathname: <code>{location.pathname}</code>
      </p>
      <ol className="routing-match-list">
        {matches?.map((match, index) => (
          <li key={`${match.pathname}-${index}`}>
            <code>{match.route.path ?? (match.route.index ? '(index)' : '(layout)')}</code>
            <span>{JSON.stringify(match.params)}</span>
          </li>
        )) ?? <li>No route branch matched.</li>}
      </ol>
    </article>
  )
}
```
</div>

**逐行解释：**

`RouteObject[]` 只描述 patterns 和 nesting，不创建 DOM。root route 的 children 表达 index、catalog、product detail、seller subtree 与 fallback。组件从 context 读取 `location`，再把 route tree 和整个 location 交给 `matchRoutes`。`matches?.map` 按 parent-to-leaf 顺序显示每一级；key 组合 pathname 与 index，因为 parent/leaf 可能共享部分 pathname。

**执行过程、对象变化与结果原因：**

当 location 从 `/catalog` 变为 `/catalog/lamp-101`，History entry 和 location object 首先改变；`learningRouteTree` module constant 引用不变。matcher 先命中 `/`，再命中 `catalog/:productId`，创建 `params = { productId: 'lamp-101' }`。新 `matches` array 的 leaf 与旧 array 不同，组件 render 出不同列表。React Router 在真实 `<Routes>` 中用同类 branch 结果创建 route elements。

**机制证据链：**

触发是导航到 `/seller/orders`；JavaScript 读取 `location.pathname`，matcher 依次返回 `/`、`seller`、`orders` matches；React Router 的 location context value 是变更源，React render 显示三层 branch；TypeScript 只确认 `learningRouteTree` 满足 `RouteObject[]`，不会证明 `/seller/orderz` 拼写正确。若删掉 `*`，未知路径得到 `null`；若 route tree 有 `*`，leaf 是 fallback。真实项目中看到 URL 改变但 `matches` 为 `null`，优先检查 pattern，而不是盲目检查组件 CSS。

**对比、错误规则与识别方法：**

用 `if (window.location.pathname === ...)` 散落在 components 中会复制 matching 规则，失去 nested branch 和 params 解析。错误还包括把 child path 写成不符合预期的 absolute path，或在同一 pattern 重复 `:id`。识别信号是 parent layout 未命中、params object 不完整或 fallback 抢占本应存在的页面。

**与 SellerHub 和学习主线的关系：**

SellerHub 的 `/seller/orders` 不是两个互不相关的页面，而是 root workspace -> protected boundary -> seller layout -> orders leaf 的 branch。第 5 章的 conditional rendering 只在已有 component 内选 JSX；route matching 则先决定哪些 component owners 存在。

**最终记忆模型：**

Location 是输入，route tree 是规则，route branch 是输出。React Router 先匹配，React 再渲染 branch elements；TypeScript 不替 runtime URL 做匹配。

### 9.3 Link、NavLink 与 navigation intent

**结论：**

`Link` 表达“前往一个 route”；`NavLink` 在此基础上向 render callback 暴露 active state。只有导航控件确实需要当前匹配样式或 `aria-current` 语义时，才需要 NavLink。

**本节解决的问题与技术意义：**

本节避免两种误用：所有导航都用 button + navigate，或所有链接都用 NavLink。前者丢失 anchor 能力，后者把 active matching 逻辑传播到不需要它的地方。Navigation intent 应由 declarative link 表达，程序流程才使用 imperative navigation。

**新关键字、层级边界与底层机制：**

新概念是 active match、`end` 与 render callback。Browser 提供 anchor interaction；History 保存目标 entry；React Router 解析 `to` 并计算 `isActive`；React 用 callback 返回 class string；JavaScript runtime 调用 `navLinkClassName`；TypeScript 检查 callback 参数；architecture convention 区分 global nav 与普通内容链接；tooling 保留这些 imports。

**API / 语法规则与固定名称：**

固定 props 包括 `to`、`end`、`className`。`className` 可接收 `({ isActive }) => string`。`end` 要求匹配在 `to` 的末尾结束，常用于避免 `/catalog` 在 `/catalog/lamp-101` 下仍被当作精确 leaf；是否使用取决于导航层级意图。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/03-link-navlink-intent/link-navlink-intent.tsx</span>
  </div>

```tsx
import { Link, NavLink } from 'react-router'

function navLinkClassName({ isActive }: { isActive: boolean }): string {
  return isActive ? 'routing-intent-link routing-intent-link-active' : 'routing-intent-link'
}

export function LinkNavLinkIntent() {
  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">03 / Navigation intent</p>
      <h2>Link moves; NavLink also reports active state</h2>
      <nav aria-label="Navigation intent practice" className="routing-practice-actions">
        <NavLink className={navLinkClassName} end to="/catalog">
          Catalog
        </NavLink>
        <NavLink className={navLinkClassName} to="/seller">
          Seller area
        </NavLink>
        <Link className="routing-intent-link" to="/checkout">
          Checkout
        </Link>
      </nav>
      <p className="routing-practice-note">
        Use NavLink only when the UI needs the current match state. Use Link for ordinary
        navigation intent.
      </p>
    </article>
  )
}
```
</div>

**逐行解释：**

helper 的参数只包含本例使用的 `isActive` boolean，并返回稳定的 CSS class string。Catalog NavLink 使用 `end`，Seller NavLink 允许 descendant route 继续 active，Checkout 不需要 active 状态，所以使用 Link。`nav` 和 `aria-label` 说明这些 anchors 构成导航区域，而不是仅靠样式暗示。

**执行过程、对象变化与结果原因：**

location 为 `/seller/orders?status=pending` 时，React Router 比较每个 `to` 与 pathname；Seller 的 descendant match 令 `isActive=true`，Catalog 的 `end` match 为 false，Checkout Link 不运行 active callback。新 location 产生新 render 时，helper 再被调用并返回对应 class。search string 不改变 pathname match，所以切换 order status 不会让 Seller nav 失活。

**机制证据链：**

触发是点击 Seller area；Link click 更新 History entry 到 `/seller`，Router 生成新 location，NavLink 读取匹配结果并用 `{ isActive: true }` 调用 JavaScript helper，React commit active class。TypeScript 只确认 callback 接收 boolean，不保证 CSS class 存在。若把 Catalog 的 `end` 去掉，在 product detail 下 Catalog 仍 active；这未必是 bug，关键看该 link 表达 section 还是 exact page。真实项目中“多个 nav item 同时高亮”通常是 active boundary 配置错误。

**对比、错误规则与识别方法：**

`button onClick={() => navigate('/catalog')}` 适合“完成流程后前往”，不适合普通导航菜单；它缺少复制链接和新标签页默认能力。把所有普通 content links 换成 NavLink 会让组件不必要地依赖 location。识别时问：该控件是否代表 destination？是否需要 active state？

**与 SellerHub 和学习主线的关系：**

SellerDashboardLayout 的 Dashboard/Orders 使用 NavLink，因为 sidebar 要显示当前 branch；product card 的 View Product 使用 Link，因为卡片只提供 destination。它把第 3 章 props callback 与 router 注入的 render callback 区分开来。

**最终记忆模型：**

Link = declarative destination；NavLink = destination + current match state；useNavigate = event/process 完成后的 imperative transition。

### 9.4 Nested routes、layout route 与 Outlet

**结论：**

Nested routes 同时表达 URL 层级和 UI ownership。Parent route element 负责共享 layout，匹配到的 child route element只能通过 parent 的 `<Outlet />` 进入树；没有 Outlet，child 可能成功匹配但没有渲染插槽。

**本节解决的问题与技术意义：**

本节解决“为什么 `/seller/orders` 地址正确，sidebar 出现了，orders content 却没有显示”。把 layout 作为 route element owner，可以让 header/sidebar 在 child navigation 期间保持同一树位置，而不是每个页面复制一份布局。

**新关键字、层级边界与底层机制：**

新概念是 nested route、layout route、index route 与 Outlet。Browser/History 只知道 `/practice/layout/orders`；React Router 将 parent path 自动加入 child path，并构造 nested branch；React 保留 parent element 的位置，只替换 Outlet subtree；JavaScript runtime 创建 route element objects；TypeScript 检查 `Route` props；architecture convention 让 shared UI 归 parent owner；Vite 不参与 nesting。

**API / 语法规则与固定名称：**

`<Route path="..." element={...}>` 的 fixed props 是 `path`、`element` 与 nested children；`index` route 不能再拥有 children。`<Outlet />` 无必需参数。没有 `path` 的 Route 可以只增加 element nesting；没有 `element` 的 Route 可以只增加 path prefix。本节使用 parent path + element 的最直接形式。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/04-nested-layout-outlet/nested-layout-outlet.tsx</span>
  </div>

```tsx
import { Link, Outlet, Route, Routes } from 'react-router'

function PracticeLayout() {
  return (
    <div className="routing-outlet-frame">
      <strong>Persistent practice layout</strong>
      <nav aria-label="Nested route practice" className="routing-practice-actions">
        <Link to="/practice/layout">Overview</Link>
        <Link to="/practice/layout/orders">Orders</Link>
      </nav>
      <Outlet />
    </div>
  )
}

function LayoutOverview() {
  return <p>The index route renders into the parent Outlet.</p>
}

function LayoutOrders() {
  return <p>The child orders route replaces only the Outlet content.</p>
}

export function NestedLayoutOutlet() {
  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">04 / Nested layout</p>
      <h2>Parent layout owns shared UI; Outlet owns the child slot</h2>
      <div className="routing-practice-actions">
        <Link to="/practice/layout">Open nested layout</Link>
        <Link to="/practice/layout/orders">Open nested orders</Link>
      </div>
      <Routes>
        <Route element={<PracticeLayout />} path="/practice/layout">
          <Route element={<LayoutOverview />} index />
          <Route element={<LayoutOrders />} path="orders" />
        </Route>
      </Routes>
    </article>
  )
}
```
</div>

**逐行解释：**

`PracticeLayout` 提供 persistent label、nested links 和唯一 Outlet。Overview 是 index child，没有额外 segment；Orders child 的相对 `path="orders"` 自动组合为 `/practice/layout/orders`。外层 component 保留打开练习的 links，并用一个独立 Routes 树把两个 URLs 映射到 parent/child elements。

**执行过程、对象变化与结果原因：**

导航到 `/practice/layout` 时，matcher 返回 parent 与 index child；React render `PracticeLayout`，Outlet 读取 route context 中的 child element 并 render `LayoutOverview`。导航到 `/practice/layout/orders` 后，parent route element type 和 position 不变，Outlet 的 child element 从 Overview 变为 Orders。若 parent layout 有 local state，它通常会保留；child 被不同 element type 替换时，child state 会卸载。

**机制证据链：**

触发是点击 Orders；History entry 改为 `/practice/layout/orders`；matcher 的 branch 从 `[layout,index]` 变为 `[layout,orders]`；route context 把 `LayoutOrders` 交给 Outlet；React 保留 `PracticeLayout` identity，只替换 Outlet subtree。TypeScript 检查 `element` 是 ReactNode-compatible，却不检查 parent JSX 中真的放了 Outlet。若删掉 Outlet，URL 和 branch 仍可能正确，但 child 没有可见输出；真实项目中“layout 可见、leaf 消失”就是首要识别信号。

**对比、错误规则与识别方法：**

把 Seller sidebar 复制进每个 page 能暂时显示相同 UI，却改变 owner：每次 route change 都可能重建 sidebar state，并产生重复代码。把 child path 写成 `/orders` 会把意图改成 absolute pattern，容易脱离 parent。调试时同时检查 route tree nesting、relative path 与 Outlet 位置。

**与 SellerHub 和学习主线的关系：**

`SellerHubWorkspaceLayout` 拥有主导航，`SellerHubSellerLayout` 拥有 seller sidebar，各自用 Outlet 接收 child。它直接承接第 8 章“state owner 由树位置决定”：route tree 现在成为组织 owner 的另一种声明方式。

**最终记忆模型：**

Nested route 生成 nested branch；layout element 拥有共享 UI；Outlet 是 child branch 的 render slot。URL nesting 与 UI ownership 可以相关，但只有 route tree 明确声明后才会成立。

### 9.5 Dynamic route params 与 TypeScript string boundary

**结论：**

`path="catalog/:productId"` 只说明该 segment 的名字，不说明它是有效商品 ID。`useParams<'productId'>()` 的值来自 runtime URL，仍是 `string | undefined`；TypeScript generic 不会把地址栏内容变成已验证 domain value。

**本节解决的问题与技术意义：**

本节解决“写了 TypeScript 类型后是否可以直接请求 `/api/products/${productId}`”。Route config、matching 与业务存在性是三个不同问题：pattern 可以匹配任意 string，param 可能因调用位置或 route 配置而缺失，即使存在也可能是 `missing-999`。

**新关键字、层级边界与底层机制：**

新概念是 dynamic segment、params object、string boundary 与 runtime validation。Browser 对 path 做 URL 处理；React Router 从 matched pathname 提取 segment；React component 读取 route context；JavaScript 用 string 查 map；TypeScript 通过 `useParams<'productId'>()` 限制可见 key，但不运行校验；architecture convention 决定 ID grammar；tooling 提供诊断但不拦截用户输入 URL。

**API / 语法规则与固定名称：**

动态 segment 使用固定前缀 `:`。本章签名是 `useParams<'productId'>(): Readonly<Params<'productId'>>`，实际 property 仍可缺失。多个 dynamic segments 必须使用唯一名称。业务 narrowing 应先检查 `if (!productId)`，再做格式、allow-list 或 runtime parser。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/05-dynamic-route-params/dynamic-route-params.tsx</span>
  </div>

```tsx
import { Link, Route, Routes, useParams } from 'react-router'

const productNames: Record<string, string> = {
  'lamp-101': 'Arc Desk Lamp',
  'chair-204': 'Mesh Task Chair',
}

function ProductParamResult() {
  const { productId } = useParams<'productId'>()

  if (!productId) {
    return <p className="routing-error-text">The matched route did not provide productId.</p>
  }

  const productName = productNames[productId]

  return (
    <div className="routing-result-box">
      <p>
        Runtime param: <code>{productId}</code>
      </p>
      <p>{productName ?? 'No local product matches this string.'}</p>
    </div>
  )
}

export function DynamicRouteParams() {
  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">05 / Dynamic params</p>
      <h2>A dynamic path segment becomes a string parameter</h2>
      <div className="routing-practice-actions">
        <Link to="/practice/products/lamp-101">Known product</Link>
        <Link to="/practice/products/missing-999">Unknown product</Link>
      </div>
      <Routes>
        <Route element={<ProductParamResult />} path="/practice/products/:productId" />
      </Routes>
    </article>
  )
}
```
</div>

**逐行解释：**

`productNames` 是本地 domain lookup，不是 route config。`useParams<'productId'>()` 只声明本组件关注的 key。缺失检查把后续 binding narrow 为 string；随后 bracket lookup 仍可能返回 `undefined`，所以 UI 用 nullish fallback。两个 Links 证明“匹配成功”和“domain entity 存在”不是同一结论。

**执行过程、变量变化与结果原因：**

点击 Known Product 后，History pathname 变为 `/practice/products/lamp-101`。Route pattern 匹配并创建 `{ productId: 'lamp-101' }`；component render 读取 string，lookup 得到 `'Arc Desk Lamp'`。点击 Unknown Product 后，同一 route element 仍匹配，params object 变为 `{ productId: 'missing-999' }`，lookup 返回 `undefined`，因此显示 fallback，而不是 route-level 404。

**机制证据链：**

触发是改变 dynamic segment；Router 从 pathname 创建新的 params object并通过 route context 提供；React 再调用同一 `ProductParamResult` type；TypeScript 在 `if (!productId)` 后只知道它是 string，不能知道 `productNames[productId]` 存在。若用 non-null assertion `productId!` 并直接请求，代码违反“外部 runtime string 必须验证”的规则。真实项目中 URL 可以手动改成任意值、日志出现 `undefined` criteria 或 API 频繁 404，都是该错误信号。

**对比、错误规则与识别方法：**

Route not found 处理“没有 pattern 匹配”，entity not found 处理“pattern 匹配但 resource 不存在”。把两者混成一个 `*` route 会失去精确错误语义。不要用 `as ProductId` 伪造校验；type assertion 在 emitted JavaScript 中消失。

**与 SellerHub 和学习主线的关系：**

`/catalog/:productId` 把 productId 交给第 9 章 async lifecycle；先检查 param，再发起 request，再验证 `unknown` response。它把 TypeScript narrowing、route matching 和 async criteria 串成一条边界链。

**最终记忆模型：**

Dynamic segment 产生 named runtime string；generic 约束 key，不验证 value；route match 不等于 domain match。

### 9.6 Search params 作为 URL state

**结论：**

Search params 适合可分享、可刷新、可回退、可用于请求 criteria 的小型字符串状态，例如 `status=pending`。`URLSearchParams.get()` 返回 `string | null`，所以必须把任意 URL 输入解析成受支持的 union。

**本节解决的问题与技术意义：**

本节解决“订单筛选为何不只放 `useState`”。如果 filter 只在 local state，复制链接、刷新或浏览历史不能恢复用户视图；如果把整个 order object JSON 放入 query，URL 又会变得不稳定、公开且难以演进。URL state 应表达身份和筛选 criteria，不承载大型私有对象。

**新关键字、层级边界与底层机制：**

新概念是 query string、`URLSearchParams`、search entry 与 parser。Browser URL 层负责编码 query；History 记录包含 search 的 location；React Router 提供 `[searchParams, setSearchParams]`；React render 读取解析后的 status；JavaScript 的 `includes` 执行 runtime allow-list；TypeScript union 只约束 parser 输出；architecture convention 决定哪些 filter 可公开；tooling 不验证地址栏。

**API / 语法规则与固定名称：**

`useSearchParams(defaultInit?)` 返回 `[URLSearchParams, SetURLSearchParams]`。固定方法有 `get`、`set`、`delete`；本例用 setter object 生成新 search。`setSearchParams({ status: 'pending' })` 会导航到新的 search；它不是普通 local setter。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/06-search-params-url-state/search-params-url-state.tsx</span>
  </div>

```tsx
import { useSearchParams } from 'react-router'

const orderStatuses = ['all', 'pending', 'shipped'] as const

type OrderStatus = (typeof orderStatuses)[number]

function parseOrderStatus(value: string | null): OrderStatus {
  return orderStatuses.includes(value as OrderStatus) ? (value as OrderStatus) : 'all'
}

export function SearchParamsUrlState() {
  const [searchParams, setSearchParams] = useSearchParams()
  const status = parseOrderStatus(searchParams.get('status'))

  function selectStatus(nextStatus: OrderStatus): void {
    setSearchParams(nextStatus === 'all' ? {} : { status: nextStatus })
  }

  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">06 / URL state</p>
      <h2>Search params hold shareable filter criteria</h2>
      <div className="routing-segmented-control" role="group" aria-label="Order status filter">
        {orderStatuses.map((option) => (
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
      <p>
        Parsed status: <code>{status}</code>
      </p>
      <p className="routing-practice-note">
        URLSearchParams returns runtime strings. The parser narrows unknown URL input to the
        supported union.
      </p>
    </article>
  )
}
```
</div>

**逐行解释：**

readonly tuple 同时产生 runtime allow-list 和 TypeScript union。parser 接受 `string | null`，只有 allow-list 命中才返回输入，否则回到 `'all'`。组件从 search params 读取 raw value，UI 只消费 parsed status。点击 button 调用 setter；选择 all 时移除冗余 param，让 canonical URL 保持简洁。

**执行过程、对象变化与结果原因：**

用户点击 pending，handler closure 收到 `'pending'`，`setSearchParams` 创建包含 `?status=pending` 的 navigation。History stack 增加 entry，Router location 的 `search` 改变，下一次 render 获得新的 `URLSearchParams` view，`get` 返回 `'pending'`，parser 返回 union member。手动输入 `?status=hacked` 时 route 仍匹配，但 parser 退回 all。

**机制证据链：**

触发是 status button 或地址栏 query；Browser URL/History entry 保存 query string；React Router 从 location.search 构造 URLSearchParams；JavaScript parser读取 raw string；React 以 parsed status 决定 `aria-pressed`；TypeScript 只保证 `selectStatus` 的调用方传入 union，不能约束地址栏。若直接写 `const status = searchParams.get('status') as OrderStatus`，非法值会进入 UI 和 request criteria；真实项目中看到未知 filter 导致空请求或错误 cache key，就是识别信号。

**对比、错误规则与识别方法：**

Local state 适合未提交输入、popover open 或临时 selection；search params 适合 catalog category、sort、page 和 seller order status。不要放 token、密码、完整 checkout draft 或频繁变化的大对象；URL 会出现在历史、日志、复制链接和 Referer 场景中。

**与 SellerHub 和学习主线的关系：**

`/catalog?category=lighting&q=lamp` 和 `/seller/orders?status=pending` 能直接成为第 9 章 committed request criteria。第 6 章 form draft 可以先留 local state，提交 search 后再进入 URL。

**最终记忆模型：**

Search params 是 public, serializable, string-based URL state；读取后 parse，写入时 canonicalize，不把 TypeScript assertion 当 runtime validation。

### 9.7 URL state、local state 与 Context state 的边界

**结论：**

State owner 由恢复和共享需求决定：可通过链接恢复的 navigation/filter state 属于 URL；只服务当前 component instance 的 draft 属于 local state；跨多层组件共享且不适合 URL 的稳定偏好或 service value 才可能属于 Context。

**本节解决的问题与技术意义：**

本节解决“既然 Context 能全局共享，为什么还要 URL”“既然 URL 能保存，为什么不把所有 draft 放进去”。重复保存同一 category 到 URL、local state 和 Context 会制造同步问题；正确做法是选一个 source owner，其他值直接读取或派生。

**新关键字、层级边界与底层机制：**

本节没有新 React Router API，重点是 URL state 和 route architecture 边界。Browser/History 拥有 category query；React state cell 拥有 `draftNote` snapshot；Context provider 拥有 currency value；JavaScript 读取三种 runtime values；TypeScript 分别检查 string union、state setter 和 context shape；architecture convention 按可分享性/私密性选 owner；tooling 不会替团队做 ownership 决策。

**API / 语法规则与固定名称：**

仍使用 `useSearchParams()`、`useState('')`、`createContext<T | null>(null)` 和 `useContext()`。Context 的 fixed object property 是本例的 `currency`，不是 framework 规定；URL param `category` 也是应用协议，需要 parser 才能成为 domain category。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/07-url-local-context-state/url-local-context-state.tsx</span>
  </div>

```tsx
import { createContext, useContext, useState } from 'react'
import { useSearchParams } from 'react-router'

type WorkspacePreferences = {
  currency: 'USD' | 'EUR'
}

const WorkspacePreferencesContext = createContext<WorkspacePreferences | null>(null)

function StateBoundaryContent() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [draftNote, setDraftNote] = useState('')
  const preferences = useContext(WorkspacePreferencesContext)
  const category = searchParams.get('category') ?? 'all'

  if (!preferences) {
    throw new Error('StateBoundaryContent requires WorkspacePreferencesContext')
  }

  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">07 / State ownership</p>
      <h2>URL, local state, and Context have different owners</h2>
      <label className="routing-field">
        <span>Shareable category</span>
        <select
          onChange={(event) => setSearchParams({ category: event.currentTarget.value })}
          value={category}
        >
          <option value="all">All</option>
          <option value="office">Office</option>
          <option value="lighting">Lighting</option>
        </select>
      </label>
      <label className="routing-field">
        <span>Private unsaved note</span>
        <input
          onChange={(event) => setDraftNote(event.currentTarget.value)}
          placeholder="Keep this out of the URL"
          value={draftNote}
        />
      </label>
      <dl className="routing-boundary-list">
        <div>
          <dt>URL state</dt>
          <dd>{category}</dd>
        </div>
        <div>
          <dt>Local draft</dt>
          <dd>{draftNote || 'empty'}</dd>
        </div>
        <div>
          <dt>Context preference</dt>
          <dd>{preferences.currency}</dd>
        </div>
      </dl>
    </article>
  )
}

export function UrlLocalContextState() {
  return (
    <WorkspacePreferencesContext.Provider value={{ currency: 'USD' }}>
      <StateBoundaryContent />
    </WorkspacePreferencesContext.Provider>
  )
}
```
</div>

**逐行解释：**

Context type 只包含 workspace-wide currency。content 同时读取 router search、local state cell 和 nearest provider。Category select 写 URL，note input 写 local state，definition list 并排显示三个 owners。null guard 让缺失 provider 成为明确 runtime error，而不是 non-null assertion。

**执行过程、变量变化与结果原因：**

选择 lighting 时，History entry 的 search 变为 `?category=lighting`，component 的 local draft state cell 不变，Context value object 也不变。输入 note 时，只有 `draftNote` update queue 和下一 render snapshot 改变，URL 不变。刷新 document 后，URL category 能重新读取；local draft 和本例 memory-only Context 会重新初始化。

**机制证据链：**

触发分别是 select change 与 input change；前者调用 router setter并产生 location/search change，后者调用 React setter并产生 state snapshot；provider 仍提供 `{currency:'USD'}`。TypeScript 检查 `currency` union 和 input string，却不验证 category raw value。若另建 local `category` 并用 Effect 同步 URL，就产生两个 source owners；真实项目中 Back 按钮改变 URL 但 select 没变、Effect 循环或首次 render 闪烁，都是重复 state 信号。

**对比、错误规则与识别方法：**

Context 不提供 history、bookmark 或 share semantics；URL 不适合敏感/私有 draft；local state 不跨刷新。判断时逐项问：它是否需要链接恢复？是否应公开？是否只属于当前实例？是否必须跨深层 subtree 共享？

**与 SellerHub 和学习主线的关系：**

Catalog category 放 URL，Checkout shipping note 放 local state，currency/user capability 可由 app-level Context 或未来 auth service 提供。它复用第 8 章 source-of-truth 原则，并把 URL 加入 owner 候选。

**最终记忆模型：**

URL、component 与 Context 不是三个同步副本，而是三种 ownership。一个事实只选一个 owner，其他 UI 从 owner 读取或派生。

### 9.8 Programmatic navigation 与 event-driven flow

**结论：**

`useNavigate()` 适合在显式事件或流程完成后改变 location，例如 submit 成功、logout 完成或 wizard step 完成。不要在 render body 中根据条件直接调用 navigate；render 必须描述 UI，而 navigation 是会修改 History 的外部动作。

**本节解决的问题与技术意义：**

本节区分 navigation intent 与 navigation consequence。普通“前往 Checkout”应使用 Link；“订单创建成功后回 Catalog”没有一个用户可提前打开的新 destination link，适合在 success handler 中调用 navigate。

**新关键字、层级边界与底层机制：**

新概念是 imperative navigation、history delta、push/replace 和 location state。Browser/History 处理 entry；React Router 返回 navigation function；React event system 调用 handler；JavaScript closure 持有 `navigate`；TypeScript 按 `NavigateFunction` 检查 `(to, options?)` 或 `(delta)`；architecture convention 限制调用时机；tooling 不会判断业务流程何时完成。

**API / 语法规则与固定名称：**

安装版本的签名是 `navigate(to, options?): void | Promise<void>` 和 `navigate(delta): void | Promise<void>`。Declarative mode 本例可忽略返回值。常用 options 是 `replace` 与 `state`。`navigate(-1)` 请求 history delta，不保证一定存在应用内上一页，因此不能作为唯一关键流程出口。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/08-programmatic-navigation/event-driven-navigation.tsx</span>
  </div>

```tsx
import { useNavigate } from 'react-router'

export function EventDrivenNavigation() {
  const navigate = useNavigate()

  function completePracticeCheckout(): void {
    navigate('/checkout?step=review', {
      state: { source: 'programmatic-navigation-practice' },
    })
  }

  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">08 / Programmatic navigation</p>
      <h2>Navigate after an explicit event completes</h2>
      <div className="routing-practice-actions">
        <button onClick={completePracticeCheckout} type="button">
          Complete step and review checkout
        </button>
        <button onClick={() => navigate(-1)} type="button">
          Go back one history entry
        </button>
      </div>
      <p className="routing-practice-note">
        The navigate function is called inside event handlers, never while the component is
        rendering.
      </p>
    </article>
  )
}
```
</div>

**逐行解释：**

`useNavigate` 从 router context 取得 function。`completePracticeCheckout` 是事件 callback；调用时把 pathname/search 和一个 entry-local state object 交给 router。第二个 button 用 number overload 请求回退一个 entry。两个调用都发生在 onClick 之后，不发生在 component render 期间。

**执行过程、对象变化与结果原因：**

初次 render 只创建 handler closure 和 buttons，不修改 URL。点击 Complete 后，React 调用 closure，JavaScript 调用 navigate，Router push `/checkout?step=review` 并把 state 交给 history entry；location object 随后更新，route branch 切换到 Checkout。`state` 不出现在地址栏，也不应被当作 durable database。浏览器通常能在同一 session history entry 中保留 history state，但直接打开、复制 URL、新会话或重新构造 entry 都不能恢复它，因此代码必须有 fallback。

**机制证据链：**

触发是 button click；handler closure 读取 `navigate` function；History 新增 entry；Router location 包含 pathname/search/state；React render Checkout route element；TypeScript 检查 `state` 可传递，却不验证接收端 shape。若在 render 中执行 `if (done) navigate('/catalog')`，每次 render 都可能修改外部 location并触发新 render，违反 render purity；真实项目中 warning、重复 history entries、闪烁或 navigation loop 是识别信号。

**对比、错误规则与识别方法：**

用户直接选择 destination 时优先 Link/NavLink；流程结果驱动 destination 时使用 navigate。`replace: true` 适合不希望 Back 回到一次性中间页的场景，例如成功 login 后替换 login entry；普通页面浏览默认 push。

**与 SellerHub 和学习主线的关系：**

Checkout 的 Continue/Place Order、Login 成功 redirect 与 idle logout 都属于 event/process flow。第 7 章已区分 event logic 与 Effect synchronization；navigation 同样先问“是否由具体事件引起”。

**最终记忆模型：**

Render 描述当前 location 下的 UI；Link 描述可选择 destination；navigate 在事件或流程完成后提交 history transition。

### 9.9 Not found route 与 fallback matching

**结论：**

Not found route 是 route matching 的 fallback，不是网络请求失败，也不是 product entity 不存在。Declarative route tree 中的 `path="*"` 捕获此前没有更具体 branch 处理的 location，并渲染一个可恢复的 UI。

**本节解决的问题与技术意义：**

本节解决未知 URL 只显示空白的问题。Router 能否匹配 path 与页面内部请求能否获得 entity 是两层错误：`/does-not-exist` 属于 route fallback；`/catalog/missing-999` 可能匹配 product route，却在 resource layer 得到 not found。

**新关键字、层级边界与底层机制：**

新概念是 splat/catchall、fallback branch 与 route-level not found。Browser 允许用户输入任意 same-origin path；History 保存它；React Router ranked matching 先考虑具体 patterns，再使用 `*`；React render fallback element；JavaScript 的 `matchRoutes` 返回 leaf match；TypeScript 只检查 route object shape；architecture convention 决定 fallback 的恢复入口；tooling/host 还必须把直接请求回退到 SPA document。

**API / 语法规则与固定名称：**

Fallback pattern 固定写作 `*`，更局部的 catchall 可写 `files/*`。`matchRoutes(routeObjects, location)` 返回 `RouteMatch[] | null`。本节没有新的 browser API，重点是 route matching fallback 与 server SPA fallback 的双层边界。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/09-not-found-route/not-found-fallback-route.tsx</span>
  </div>

```tsx
import { matchRoutes } from 'react-router'
import type { RouteObject } from 'react-router'
import { useState } from 'react'

const fallbackRouteTree: RouteObject[] = [
  { path: '/catalog' },
  { path: '/catalog/:productId' },
  { path: '*' },
]

export function NotFoundFallbackRoute() {
  const [candidatePath, setCandidatePath] = useState('/unknown/path')
  const matches = matchRoutes(fallbackRouteTree, candidatePath)
  const leafPath = matches?.at(-1)?.route.path ?? 'no match'

  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">09 / Fallback matching</p>
      <h2>A splat route handles unmatched locations</h2>
      <label className="routing-field">
        <span>Candidate pathname</span>
        <input
          onChange={(event) => setCandidatePath(event.currentTarget.value)}
          value={candidatePath}
        />
      </label>
      <p>
        Leaf match: <code>{leafPath}</code>
      </p>
      <p className="routing-practice-note">
        Remove the star route and unknown paths produce no route element instead of a useful
        fallback screen.
      </p>
    </article>
  )
}
```
</div>

**逐行解释：**

Route tree 先声明两个具体 patterns，再声明 splat。`candidatePath` 是练习输入，不改变 browser URL；`matchRoutes` 纯计算匹配结果。`.at(-1)` 读取 branch leaf，optional chaining 处理 `null`，fallback string 让移除 splat 后的 no match 也可观察。

**执行过程、变量变化与结果原因：**

输入 `/catalog/lamp-101` 时，local state snapshot 改变，matcher 选择 `/catalog/:productId` 并创建 productId param。输入 `/unknown/path` 时，具体 patterns 都不匹配，`*` 成为 leaf。若从 array 删除 `*`，同一输入得到 `matches=null`，React 显示 `no match`。

**机制证据链：**

触发是编辑 candidate string；JavaScript state update 生成新 snapshot，`matchRoutes` 读取稳定 route tree 与新 string；本练习不改 History entry，真实 route navigation 才会改变 location；React 显示 leaf pattern；TypeScript 保证 optional access 合法，不保证用户 path 有具体 route。若把 `*` 放在错误的 route subtree，可能只捕获局部 descendants 而不是全站；真实项目中“某些未知路径显示 fallback、另一些空白”提示需要检查 tree ownership。

**对比、错误规则与识别方法：**

Router fallback element 在 React 已启动后工作；生产服务器对直接 `/unknown/path` 的 HTTP request 必须先返回 `index.html`，否则 router 没机会运行。不要把 API 404、entity not found 和 route not found 合并成同一状态。

**与 SellerHub 和学习主线的关系：**

SellerHub 的 `*` route 显示 requested pathname 和 Catalog recovery link；product detail 的 invalid response 则留在 product page。它沿用第 5/9 章“区分 UI 状态分支”的原则。

**最终记忆模型：**

Splat 是 route-tree fallback；SPA host fallback 是 document-serving 配置；entity 404 是 data layer。三种 404 必须分层诊断。

### 9.10 Protected route placeholder 与 auth boundary

**结论：**

Protected route placeholder 只能根据前端已知 auth state 选择显示 child 或 redirect login。它不能阻止用户查看已下载的 JavaScript，也不能授权 API、数据库或真实订单操作；真正安全边界必须由后端在每次请求上验证身份与权限。

**本节解决的问题与技术意义：**

本节解决“隐藏 Seller link 是否等于保护 Seller API”。UI guard 改善 navigation flow，避免未登录用户进入无意义页面，并可保存 redirect intent；它不是 security mechanism。把这条边界写进 route architecture，可以防止前端 conditional rendering 被误当作 access control。

**新关键字、层级边界与底层机制：**

新概念是 UI guard、`Navigate` element、redirect intent 与 auth placeholder。Browser/History 保存 login entry；React Router 的 Navigate 在 commit-related routing flow 中替换 location；React local state 保存本例 auth boolean；JavaScript runtime guard 读取 location.state unknown；TypeScript 检查 props但不验证真实 session；architecture convention 将 UI guard 与 backend authorization 分离；tooling 不提供安全保证。

**API / 语法规则与固定名称：**

`<Navigate to="/login" replace state={{ from }} />` 的固定 props 是 `to`、`replace`、`state`。`<Outlet />` 在允许时继续 child branch。`useLocation()` 读取当前 location；`location.state` 应按 `unknown` 思维做 runtime guard。`replace` 避免 Back 立即回到 guard 再次 redirect。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/10-protected-route-placeholder/protected-route-placeholder.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import { Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router'

type RedirectLocationState = {
  from?: string
}

function readRedirectPath(state: unknown): string {
  if (
    typeof state === 'object' &&
    state !== null &&
    'from' in state &&
    typeof (state as RedirectLocationState).from === 'string'
  ) {
    return (state as RedirectLocationState).from ?? '/practice/protected'
  }

  return '/practice/protected'
}

function ProtectedPracticeRoute({ isAuthenticated }: { isAuthenticated: boolean }) {
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        replace
        state={{ from: location.pathname + location.search }}
        to="/practice/login"
      />
    )
  }

  return <Outlet />
}

function ProtectedPracticeContent() {
  return <p className="routing-success-text">The UI guard allowed this route element.</p>
}

function PracticeLoginPlaceholder() {
  const location = useLocation()
  const redirectPath = readRedirectPath(location.state)

  return (
    <div className="routing-result-box">
      <p>This is a local UI login placeholder.</p>
      <p>
        Intended destination: <code>{redirectPath}</code>
      </p>
    </div>
  )
}

export function ProtectedRoutePlaceholder() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">10 / UI access boundary</p>
      <h2>A protected route placeholder is not backend authorization</h2>
      <label className="routing-toggle-row">
        <input
          checked={isAuthenticated}
          onChange={(event) => setIsAuthenticated(event.currentTarget.checked)}
          type="checkbox"
        />
        <span>Local auth placeholder</span>
      </label>
      <div className="routing-practice-actions">
        <Link to="/practice/protected">Open protected practice route</Link>
        <Link to="/practice/login">Open login placeholder</Link>
      </div>
      <Routes>
        <Route element={<ProtectedPracticeRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<ProtectedPracticeContent />} path="/practice/protected" />
        </Route>
        <Route element={<PracticeLoginPlaceholder />} path="/practice/login" />
      </Routes>
    </article>
  )
}
```
</div>

**逐行解释：**

`readRedirectPath` 接受 unknown 并逐步验证 object、property 与 string。Guard 读取 current location；false 时返回 Navigate，true 时返回 Outlet。Practice root local state 只是可切换的教学 placeholder。Protected child 被嵌套在 guard route 下，login route 与它并列。

**执行过程、对象变化与结果原因：**

未勾选 auth 时点击 Protected，History 先到 `/practice/protected`，matcher 创建 guard + child branch；guard render Navigate，router replace 为 `/practice/login` 并附带 `{from:'/practice/protected'}`。Login component 从该 entry 读取 state 并验证。勾选 auth 后，`isAuthenticated` state snapshot 改变；再次导航时 guard 返回 Outlet，child element进入树。

**机制证据链：**

触发是 Protected Link；History location、guard prop、Navigate element、redirect location 与 state object依次变化；React state cell 只保存本地 boolean；TypeScript 检查 boolean prop 和 helper return string，不知道用户是否真的登录。若只隐藏 Seller NavLink 而不 guard route，手动输入 URL 仍显示页面；即使 guard 完整，直接调用 API 仍必须由 server 拒绝未授权请求。Network response 仍成功但 UI 隐藏，是后端授权缺失的识别信号。

**对比、错误规则与识别方法：**

UI guard 是 presentation/navigation boundary；backend authorization 是 trust boundary。Location state 可保存 redirect intent，但它不编码在 URL，不适合作为必须持久的业务数据；直接打开 `/login` 时 helper 必须回退到 `/seller` 或其他安全默认路径。

**与 SellerHub 和学习主线的关系：**

Seller routes 使用 placeholder guard，Catalog/Checkout 保持 public。本章不实现真实 auth；未来 SellerHub 后端仍需对 seller orders、product mutation 等接口做 authorization。它把第 8 章 Context/auth state owner 与 route branch 组合起来。

**最终记忆模型：**

Guard 决定前端显示哪个 route element；server 决定操作是否被允许。前者改善 UX，后者建立安全。

### 9.11 Route change、component identity 与 state reset

**结论：**

Route param 改变不必然卸载 component。若 matcher 仍选择同一个 route element type 且它处在同一 React tree position，local state 通常保留；当业务要求每个 product 拥有独立 draft 时，可把 validated `productId` 作为 `key`，显式改变 identity 并 reset state。

**本节解决的问题与技术意义：**

本节解决“从 lamp 切换到 chair 后，输入框为何还保留 lamp draft”。URL 已变不等于 React component identity 已变。Router 决定 route element，React 根据 type、position 与 key 决定 state cell 是否复用，这是两个连续但不同的机制。

**新关键字、层级边界与底层机制：**

新概念是 route element identity、React tree position、keyed reset。Browser/History 改变 productId segment；React Router 给同一 route element新的 params；React 若看到相同 type/position 就复用 state cell，key 改变时销毁旧 identity；JavaScript 创建新 props binding；TypeScript 检查 productId string；architecture convention 决定保留或重置 draft；tooling 不推断业务意图。

**API / 语法规则与固定名称：**

本节没有新 React Router API，重点是 route param 与 React identity 边界。`key` 是 React 的特殊属性，不会作为普通 prop 传入 component。`key={productId}` 表示不同 productId 对应不同 named position；不要为了“确保更新”到处添加随机 key，那会每次 render 都丢 state。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/11-route-state-reset/route-param-state-reset.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router'

function ProductDraftEditor({ productId }: { productId: string }) {
  const [draftTitle, setDraftTitle] = useState(`Draft for ${productId}`)

  return (
    <div className="routing-result-box">
      <p>
        Editor identity: <code>{productId}</code>
      </p>
      <label className="routing-field">
        <span>Local draft title</span>
        <input
          onChange={(event) => setDraftTitle(event.currentTarget.value)}
          value={draftTitle}
        />
      </label>
    </div>
  )
}

function KeyedProductEditorRoute() {
  const { productId } = useParams<'productId'>()

  if (!productId) {
    return <p className="routing-error-text">Missing productId.</p>
  }

  return <ProductDraftEditor key={productId} productId={productId} />
}

export function RouteParamStateReset() {
  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">11 / Component identity</p>
      <h2>A route param can choose whether local state resets</h2>
      <div className="routing-practice-actions">
        <Link to="/practice/editor/lamp-101">Edit lamp</Link>
        <Link to="/practice/editor/chair-204">Edit chair</Link>
      </div>
      <Routes>
        <Route element={<KeyedProductEditorRoute />} path="/practice/editor/:productId" />
      </Routes>
      <p className="routing-practice-note">
        Changing productId changes the key, so React discards the previous editor state cell.
      </p>
    </article>
  )
}
```
</div>

**逐行解释：**

Editor 的 initial state读取首次 mount 的 productId。Route wrapper 先 narrow param，再把同一个 string 同时传作 key 和 prop。Links 改变 param；Route 仍选择 `KeyedProductEditorRoute`，但其 child `ProductDraftEditor` key 会变。把 wrapper 与 editor 分开，是为了在拿到 param 后把 identity 选择放在明确边界。

**执行过程、变量与 identity 变化：**

在 lamp route 首次 mount 时，React 为 key `lamp-101` 创建 editor state cell，initial title 是 `Draft for lamp-101`。用户编辑后，该 cell 保存新 draft。导航 chair 后，location.params 变为 chair；wrapper 是同 type/position，继续存在；child key 从 lamp 变 chair，React 卸载旧 editor、丢弃旧 cell，并为新 key 创建 title `Draft for chair-204`。

**机制证据链：**

触发是切换 Edit link；History entry 与 params object 改变；Router 仍返回相同 route element type；React 比较 child fiber 的 key，发现不同并创建新 identity；JavaScript 重新执行 `useState` initializer；TypeScript 只检查 key/prop 接收 string，不决定 reset policy。若删除 key，旧 draft 会跨 productId 保留；真实项目中标题显示 chair 但输入仍是 lamp 内容，就是 identity 与业务 entity 不一致的信号。

**对比、错误规则与识别方法：**

有些 state 应保留：例如 seller layout 的 sidebar collapse 在 `/seller` 与 `/seller/orders` 间可继续存在。不要用 `key={Math.random()}`，它会让每次 render 都 remount。先判断 state 是“属于 route component instance”还是“属于具体 param entity”。

**与 SellerHub 和学习主线的关系：**

Product editor、conversation、checkout order 等 entity-specific draft 常需要 param-key reset；workspace layout state 通常要 preserve。本节直接应用第 8 章 preserving/resetting state，但触发来源改为 route param。

**最终记忆模型：**

Router 改变 props/params，React 决定 identity。Param change 本身不 reset；key 是显式 identity policy。

### 9.12 Route params 作为 async request criteria

**结论：**

Route param 可以成为第 9 章 async request criteria，但 URL 切换可能让旧 Promise 晚于新 Promise settle。Effect 必须依赖 narrowed productId，并在 cleanup 中 abort 或 ignore obsolete result，防止旧 product response 覆盖当前 route UI。

**本节解决的问题与技术意义：**

本节解决快速从 slow lamp route 切到 fast chair route 时的 race condition。Router 只负责提供 current param，不会自动取消 component 自己创建的 request。Request ownership 仍属于发起 Effect 的 component/custom hook。

**新关键字、层级边界与底层机制：**

新概念是 route-driven criteria、effect closure、AbortController 与 obsolete result。Browser URL/History 提供 productId；React Router解析 param；React Effect closure 捕获该 render 的 productId；JavaScript Promise 与 timer 异步 settle；browser AbortController 发送 abort signal；TypeScript 检查 union action和 unknown error；architecture convention 让 URL 成为 committed criteria；tooling lint 检查 dependency array。

**API / 语法规则与固定名称：**

Effect dependency 是 `[productId]`，cleanup 调用 `controller.abort()` 并设置 `ignore=true`。`AbortSignal`、`DOMException` 和 `setTimeout` 属于 browser platform。Reducer actions 的 `type` 字符串是应用协议。Route param 缺失时 Effect直接 return，不发请求。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/12-route-params-async-criteria/route-param-async-criteria.tsx</span>
  </div>

```tsx
import { useEffect, useReducer } from 'react'
import { Link, Route, Routes, useParams } from 'react-router'

type ProductRequestState =
  | { status: 'idle' }
  | { status: 'pending'; productId: string }
  | { status: 'success'; productId: string; summary: string }
  | { status: 'error'; productId: string; message: string }

type ProductRequestAction =
  | { type: 'request'; productId: string }
  | { type: 'resolve'; productId: string; summary: string }
  | { type: 'reject'; productId: string; message: string }

function assertNever(action: never): never {
  throw new Error(`Unhandled product request action: ${JSON.stringify(action)}`)
}

function productRequestReducer(
  _state: ProductRequestState,
  action: ProductRequestAction,
): ProductRequestState {
  switch (action.type) {
    case 'request':
      return { status: 'pending', productId: action.productId }
    case 'resolve':
      return { status: 'success', productId: action.productId, summary: action.summary }
    case 'reject':
      return { status: 'error', productId: action.productId, message: action.message }
    default:
      return assertNever(action)
  }
}

function requestProductSummary(productId: string, signal: AbortSignal): Promise<string> {
  return new Promise((resolve, reject) => {
    const timerId = window.setTimeout(() => {
      resolve(`Loaded async criteria for ${productId}`)
    }, productId === 'lamp-101' ? 700 : 300)

    signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timerId)
        reject(new DOMException('Request aborted', 'AbortError'))
      },
      { once: true },
    )
  })
}

function AsyncProductCriteriaResult() {
  const { productId } = useParams<'productId'>()
  const [requestState, dispatch] = useReducer(productRequestReducer, { status: 'idle' })

  useEffect(() => {
    if (!productId) {
      return
    }

    const controller = new AbortController()
    let ignore = false

    dispatch({ type: 'request', productId })

    void requestProductSummary(productId, controller.signal)
      .then((summary) => {
        if (!ignore) {
          dispatch({ type: 'resolve', productId, summary })
        }
      })
      .catch((error: unknown) => {
        if (!ignore && !(error instanceof DOMException && error.name === 'AbortError')) {
          dispatch({
            type: 'reject',
            productId,
            message: error instanceof Error ? error.message : 'Unknown request failure',
          })
        }
      })

    return () => {
      ignore = true
      controller.abort()
    }
  }, [productId])

  if (!productId) {
    return <p className="routing-error-text">Missing productId request criterion.</p>
  }

  if (requestState.status === 'pending') {
    return <p>Loading {requestState.productId}...</p>
  }

  if (requestState.status === 'success') {
    return <p className="routing-success-text">{requestState.summary}</p>
  }

  if (requestState.status === 'error') {
    return <p className="routing-error-text">{requestState.message}</p>
  }

  return <p>Select a product route.</p>
}

export function RouteParamAsyncCriteria() {
  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">12 / Async route criteria</p>
      <h2>Route params can drive an abortable request lifecycle</h2>
      <div className="routing-practice-actions">
        <Link to="/practice/async/lamp-101">Load lamp slowly</Link>
        <Link to="/practice/async/chair-204">Load chair quickly</Link>
      </div>
      <Routes>
        <Route element={<AsyncProductCriteriaResult />} path="/practice/async/:productId" />
      </Routes>
    </article>
  )
}
```
</div>

**逐行解释：**

Discriminated state/action unions禁止 contradictory flags。Reducer 只计算 transition；所有已知 `action.type` 处理完后，default 分支中的 action 必须收窄为 `never`。以后新增 action 却遗漏 case 时，`assertNever(action)` 会产生 TypeScript error，而不是静默返回旧 state。Mock request 接收 productId 与 signal，并让 lamp 比 chair 慢。Route component 读取 param；Effect 为该 snapshot 创建 controller/ignore binding，dispatch pending，再处理 Promise。Cleanup 同时阻止 handler dispatch 与停止 browser timer。Render branches只读取 reducer state。

**执行过程、closure 与 request 变化：**

导航 lamp 后，Effect A 捕获 `'lamp-101'`，request A 计划 700ms。立刻导航 chair，React 先运行 A cleanup：`ignoreA=true`、signalA aborted；然后 Effect B 捕获 `'chair-204'` 并计划 300ms。B resolve 后 dispatch success；A 即使某个外部 transport 不能真正取消，then/catch 也因 ignore 不再提交旧结果。

**机制证据链：**

触发是 dynamic Link；History 与 params 改变；React 在 dependency 改变时先 cleanup旧 effect closure再启动新 closure；JavaScript Promise settlement 和 browser abort signal独立运行；reducer state cell 从 idle -> pending chair -> success chair；TypeScript 检查 action payload，却不会取消 Promise。若 dependency array 是 `[]` 或 cleanup 缺失，URL 显示 chair 而 UI 最后显示 lamp；这种“pathname criteria 与 rendered entity ID 不一致”就是 race signal。

**对比、错误规则与识别方法：**

如果请求由 explicit button 发起，可留在 event handler；这里 request 必须随 committed route param 同步，所以 Effect 合理。Abort 可节省资源，ignore 防止无法取消或已 settle 的结果提交；两者可组合而不是互相替代。

**与 SellerHub 和学习主线的关系：**

ProductDetailPage 用 productId 请求产品；Catalog search params 可以组成 product-list criteria；Seller Orders status 可以组成 order-list criteria。该节直接复用第 7 章 Effect cleanup 和第 9 章 async lifecycle。

**最终记忆模型：**

Route param 是 committed criteria；每个 Effect closure只代表一次 criteria snapshot；criteria 变化先清理旧同步，再允许新结果更新当前 UI。

### 9.13 SellerHub route architecture mapping

**结论：**

SellerHub route architecture 应先表达资源与 layout ownership，再接 local state、Context 与 async data。URL 负责“用户位于哪个资源/筛选视图”，route tree 负责“哪些 layout/page owners 存在”，React state 负责“这些 owners 的临时交互数据”。

**本节解决的问题与技术意义：**

本节把前 12 节映射成一棵可讨论但不等于完整产品的 route tree。它防止按页面文件随意拼 path，也防止把所有 filters 放 Context、把所有 drafts 放 URL、把 UI guard 当安全系统。

**新关键字、层级边界与底层机制：**

本节没有新 API，重点是 URL state 和 route architecture 边界。Browser/History 提供可恢复 navigation；React Router 提供 branch/layout/params；React 按 branch 维护 identities；JavaScript 执行 parser、guards 与 requests；TypeScript 约束 route-adjacent values；architecture convention 定义 public/private、layout owner 和 trust boundary；Vite/host 负责 bundle 与 SPA document fallback。

**API / 语法规则与固定名称：**

本节复用 `Route`、`Outlet`、`NavLink`、`useParams`、`useSearchParams`、`useNavigate`、`Navigate` 与 `key`。固定 URL 协议是项目约定：`/catalog`、`/catalog/:productId`、`/seller`、`/seller/orders`、`/checkout`、`/login` 和 `*`。

**SellerHub 映射表：**

| Route | Owner / Element | State boundary | 后续连接 |
| --- | --- | --- | --- |
| `/catalog?category=lighting&q=lamp` | CatalogPage | category/q 属于 URL；input draft 可先 local | product-list async criteria |
| `/catalog/:productId` | ProductDetailPage | productId 是 string param；resource 是 async state | abort、runtime validation |
| `/seller` | Protected UI guard + SellerDashboardLayout | auth placeholder 不属于 URL | 真实后端 authorization |
| `/seller/orders?status=pending` | SellerOrdersPage | status 属于 URL | order-list async criteria |
| `/checkout?step=review` | CheckoutPage | step 可 URL；shipping note 是 private local draft | form submission |
| `/login` | LoginPage | redirect intent 可用 location.state + fallback | auth service |
| `*` | NotFoundPage | requested pathname 来自 location | host SPA fallback |

**执行过程与值变化：**

用户从 catalog 点击 product：History 从 search URL 增加 product detail entry；matcher 从 Catalog leaf 切到 ProductDetail leaf；root layout 保留，product route param 创建；ProductDetail Effect 以 param 作为 criteria。用户进入 Seller Orders：guard 检查 auth placeholder，seller layout 进入 branch，Outlet render Orders；status search 改变时 layout identity 保留，只更新 orders criteria。

**机制证据链：**

以 `/seller/orders?status=pending` 为证据：Link/NavLink 产生 navigation intent，History entry 保存 pathname/search，Router branch 是 workspace layout -> guard -> seller layout -> orders，React 保留两个 layouts 的 tree positions，Orders parser把 raw `'pending'` 收窄成 domain status，TypeScript 不验证地址栏，未来 request hook 使用 parsed status。若把 status 放 Context，复制 URL/Back 无法恢复；若只隐藏 nav，没有 server authorization，API 仍暴露。真实项目可通过 URL、React tree、Network criteria 与 server response四处对照定位错误。

**对比、错误规则与识别方法：**

Route tree 不是后端 route table，也不是数据库 schema。不要为了“看起来统一”把 checkout draft、auth token 或完整 product object序列化进 URL；也不要用 location.state 替代可分享 productId。Architecture review 时检查：URL 是否可解释、owner 是否单一、layout 是否有 Outlet、guard 是否明确标成 UI boundary、async criteria 是否可取消。

**与当前学习主线的关系：**

第 3 章 props 连接 route elements；第 4 章 events 驱动 navigation；第 5 章渲染状态 branches；第 6 章 local form draft；第 7 章 effect cleanup；第 8 章 owner/reducer/context/custom hook；第 9 章 request lifecycle；本章把这些机制绑定到 location 和 route tree。

**最终记忆模型：**

SellerHub 的 URL 是公开 navigation state，route tree 是 UI ownership map，React state 是 branch 内部交互状态，async layer消费经过验证的 URL criteria，backend 才是权限安全边界。

## 10. API / 语法索引

| API / Syntax | Layer | Signature / Fixed names | 本章用途 | Common Mistake |
| --- | --- | --- | --- | --- |
| `BrowserRouter` | React Router | `basename`、`children`、`window` | 读取 browser history/location 并提供 router context | 与另一个 Router 嵌套 |
| `Routes` | React Router | `children`、可选 `location` | 从 Route elements 计算 branch | 以为它只是普通 conditional wrapper |
| `Route` | React Router | `path`、`element`、`index`、`children` | 定义 pattern 与 element ownership | index route 再声明 children |
| `Link` | React Router + anchor | `to`、`replace`、`state` | declarative destination | 用 button 替代普通 link |
| `NavLink` | React Router + anchor | `to`、`end`、callback props | destination + active state | 不理解 descendant active matching |
| `Outlet` | React Router | `context?` | render matched child element | parent layout 缺少 Outlet |
| `useLocation` | React Router | `(): Location` | 读取 pathname/search/state/key | 把 location object 当普通 mutable object |
| `useParams` | React Router | `<K extends string>(): Readonly<Params<K>>` | 读取 dynamic segments | assertion 替代 runtime validation |
| `useSearchParams` | React Router + URLSearchParams | `(): [URLSearchParams, SetURLSearchParams]` | 读取/更新 query strings | 把 setter 当 local state setter |
| `useNavigate` | React Router | `(to, options?)` / `(delta)` | event/process-driven navigation | render 中调用 |
| `Navigate` | React Router | `to`、`replace`、`state` | declarative redirect element | 当作 security boundary |
| `matchRoutes` | React Router | `(routes, location) => matches | null` | 观察 route branch | 把 entity not found 当 no route match |
| `history.pushState` | Browser History API | `(state, unused, url?)` | router client navigation 的平台基础 | 直接操作后忘记同步应用 UI |
| `URLSearchParams` | Browser URL API | `get`、`set`、`delete`、`toString` | 解析/序列化 query | 把 full URL 直接传给 constructor |
| `key` | React | special JSX attribute | 按 param 显式 reset identity | 随机 key 导致每次 remount |

## 11. 常见错误表

| Error | Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| 内部 route 使用普通 `<a href>` | Browser/runtime | document navigation 会结束当前 runtime | 使用 Link/NavLink | Network 出现新 document，请求后 state 全丢 |
| 认为 URL 只改变显示文字 | Router architecture | location 是 matcher 输入 | 检查 matches 与 route branch | 地址变化伴随 component tree 变化 |
| 直接断言 `productId as string` | Type/runtime | assertion 不做 runtime validation | 缺失检查 + domain parser | 手动 URL 产生 undefined/invalid request |
| 把复杂 object 写入 query | URL architecture | URL 应稳定、可读、可分享 | 只保存 ID/小型 criteria | URL 过长、版本难迁移、信息泄露 |
| 可分享 filter 只放 local state | State owner | local state 不参与 history/share | 使用 search params | 刷新、Back、复制链接后筛选丢失 |
| 私有 draft 放 URL | Privacy/architecture | URL 是公开字符串边界 | 使用 local/form state | draft 出现在地址栏、日志或分享链接 |
| 依赖 location.state 作为持久数据 | History architecture | entry state 不等于 URL/durable store | 接收端提供 fallback；重要值进 URL/store | 新标签页、直接 URL 或新会话无法恢复 |
| render 中调用 navigate | React purity | render 不应修改外部 history | 移到 event/effect 的正确触发点 | redirect loop、重复 entries、闪烁 |
| nested parent 没有 Outlet | Router rendering | child branch 需要 render slot | 在 parent element 放 Outlet | URL/match 正确但 child 不显示 |
| fallback 放错 subtree | Route matching | splat 只在其 route scope 生效 | 按预期 scope 放置 `*` | 部分未知路径 fallback，部分空白 |
| 把 UI guard 当真正权限安全 | Security boundary | client code 不是可信执行环境 | 后端逐请求 authorize | 直接 API 调用仍成功 |
| param 改变后 draft 意外保留 | React identity | same type/position 会 preserve state | 按 entity 使用 stable key | 标题和 draft 属于不同 entity |
| param request 无 cleanup | Async effect | obsolete closure 仍可提交结果 | abort + ignore + correct dependency | URL 与最终 resource ID 不一致 |
| 用 Context 保存 route/filter state | State owner | Context 没有 URL/history 语义 | URL 作为 owner，Context 只共享其他值 | Back 不更新 filter、刷新丢条件 |

## 12. 最终小项目

最终小项目只用于整合本章机制，不替代前面的分节教学。

### 12.1 项目目标

`SellerHub Routing Workspace` 用一棵 Declarative route tree 串联 public catalog、dynamic product detail、protected seller layout、seller order status URL state、checkout event navigation、login redirect intent 和 not-found fallback。它使用 local mock request/auth，只验证 routing architecture，不实现完整 SellerHub。

### 12.2 最终小项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终小项目结构</span>
  </div>

```txt
src/learning/react/chapter-10-routing-url-state/
  sellerhub-routing-workspace/
    sellerhub-catalog-data.ts
    sellerhub-product-request.ts
    sellerhub-workspace-layout.tsx
    sellerhub-catalog-page.tsx
    sellerhub-product-detail-page.tsx
    sellerhub-seller-layout.tsx
    sellerhub-orders-page.tsx
    sellerhub-checkout-page.tsx
    sellerhub-login-page.tsx
    sellerhub-protected-route.tsx
    sellerhub-not-found-page.tsx
    sellerhub-routing-workspace.tsx
```
</div>

### 12.3 文件职责

| File | Responsibility |
| --- | --- |
| `sellerhub-catalog-data.ts` | 定义 domain unions、products 与 order counts。 |
| `sellerhub-product-request.ts` | 提供接收 productId/AbortSignal、返回 unknown 的 local request。 |
| `sellerhub-workspace-layout.tsx` | 拥有全局 navigation 与 root Outlet。 |
| `sellerhub-catalog-page.tsx` | 把 category/query search params 解析为 visible products。 |
| `sellerhub-product-detail-page.tsx` | narrow route param、执行 abortable request、验证 unknown response。 |
| `sellerhub-seller-layout.tsx` | 拥有 seller sidebar 与 nested Outlet。 |
| `sellerhub-orders-page.tsx` | 把 order status 建模为 URL state。 |
| `sellerhub-checkout-page.tsx` | 分开 step URL state 与 private local draft，并在事件后 navigate。 |
| `sellerhub-login-page.tsx` | 验证 redirect location state 并完成 local login flow。 |
| `sellerhub-protected-route.tsx` | 提供前端 UI guard 和 login redirect。 |
| `sellerhub-not-found-page.tsx` | 展示 unmatched pathname 与 recovery link。 |
| `sellerhub-routing-workspace.tsx` | 拥有 auth placeholder 与完整 route tree。 |

### 12.4 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-catalog-data.ts</span>
  </div>

```ts
export type SellerHubCategory = 'all' | 'lighting' | 'office'

export type SellerHubProduct = {
  id: string
  name: string
  category: Exclude<SellerHubCategory, 'all'>
  price: number
}

export type SellerOrderStatus = 'all' | 'pending' | 'shipped'

export const sellerHubProducts: SellerHubProduct[] = [
  { id: 'lamp-101', name: 'Arc Desk Lamp', category: 'lighting', price: 89 },
  { id: 'chair-204', name: 'Mesh Task Chair', category: 'office', price: 249 },
  { id: 'light-305', name: 'Studio Floor Light', category: 'lighting', price: 139 },
]

export const sellerOrderCounts: Record<Exclude<SellerOrderStatus, 'all'>, number> = {
  pending: 4,
  shipped: 11,
}
```
</div>

该文件只定义可复用 domain values，不读取 router。`all` 是 UI filter，不是 product category，所以 product type 用 `Exclude` 移除它；TypeScript 检查 object literals，browser runtime 只得到普通 arrays/objects。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-product-request.ts</span>
  </div>

```ts
import { sellerHubProducts } from './sellerhub-catalog-data'

export function requestSellerHubProduct(productId: string, signal: AbortSignal): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const timerId = window.setTimeout(() => {
      const product = sellerHubProducts.find((candidate) => candidate.id === productId)
      resolve(product ?? { error: 'Product not found' })
    }, productId === 'lamp-101' ? 650 : 350)

    signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timerId)
        reject(new DOMException('Request aborted', 'AbortError'))
      },
      { once: true },
    )
  })
}
```
</div>

请求函数按传入 criteria 查找 local data，并故意返回 `Promise<unknown>`，迫使 consumer 在 runtime 验证 response。AbortSignal listener 清除 timer 并 reject AbortError；它模拟 request lifecycle，不伪装真实 backend。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-workspace-layout.tsx</span>
  </div>

```tsx
import { NavLink, Outlet } from 'react-router'

type SellerHubWorkspaceLayoutProps = {
  isSellerAuthenticated: boolean
}

function workspaceLinkClassName({ isActive }: { isActive: boolean }): string {
  return isActive ? 'sellerhub-nav-link sellerhub-nav-link-active' : 'sellerhub-nav-link'
}

export function SellerHubWorkspaceLayout({
  isSellerAuthenticated,
}: SellerHubWorkspaceLayoutProps) {
  return (
    <section aria-labelledby="sellerhub-workspace-title" className="sellerhub-workspace">
      <header className="sellerhub-workspace-header">
        <div>
          <p className="routing-practice-kicker">Final project</p>
          <h2 id="sellerhub-workspace-title">SellerHub Routing Workspace</h2>
        </div>
        <span className="sellerhub-auth-status">
          {isSellerAuthenticated ? 'Seller session placeholder: active' : 'Seller session placeholder: off'}
        </span>
      </header>
      <nav aria-label="SellerHub workspace" className="sellerhub-main-nav">
        <NavLink className={workspaceLinkClassName} to="/catalog">
          Catalog
        </NavLink>
        <NavLink className={workspaceLinkClassName} to="/seller">
          Seller
        </NavLink>
        <NavLink className={workspaceLinkClassName} to="/checkout">
          Checkout
        </NavLink>
        <NavLink className={workspaceLinkClassName} to="/login">
          Login
        </NavLink>
      </nav>
      <div className="sellerhub-route-stage">
        <Outlet />
      </div>
    </section>
  )
}
```
</div>

Root layout 不知道具体 child page，只拥有 workspace header、NavLinks 与 Outlet。Auth boolean 仅用于显示 placeholder 状态；route security 不由这个文字决定。Location 改变时，NavLink callbacks 重算 active class，Outlet 接收新的 child element。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-catalog-page.tsx</span>
  </div>

```tsx
import { Link, useSearchParams } from 'react-router'
import { sellerHubProducts } from './sellerhub-catalog-data'
import type { SellerHubCategory } from './sellerhub-catalog-data'

const sellerHubCategories: SellerHubCategory[] = ['all', 'lighting', 'office']

function parseCategory(value: string | null): SellerHubCategory {
  return sellerHubCategories.includes(value as SellerHubCategory)
    ? (value as SellerHubCategory)
    : 'all'
}

export function SellerHubCatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = parseCategory(searchParams.get('category'))
  const searchQuery = searchParams.get('q')?.trim().toLowerCase() ?? ''
  const visibleProducts = sellerHubProducts.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category
    const matchesQuery = product.name.toLowerCase().includes(searchQuery)
    return matchesCategory && matchesQuery
  })

  function updateSearchParam(name: 'category' | 'q', value: string): void {
    const nextParams = new URLSearchParams(searchParams)

    if (!value || value === 'all') {
      nextParams.delete(name)
    } else {
      nextParams.set(name, value)
    }

    setSearchParams(nextParams)
  }

  return (
    <section>
      <div className="sellerhub-page-heading">
        <div>
          <p>Public route</p>
          <h3>Catalog</h3>
        </div>
        <code>/catalog?category={category}&amp;q={searchQuery || '...'}</code>
      </div>
      <div className="sellerhub-filter-row">
        <label className="routing-field">
          <span>Category URL state</span>
          <select
            onChange={(event) => updateSearchParam('category', event.currentTarget.value)}
            value={category}
          >
            {sellerHubCategories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="routing-field">
          <span>Search URL state</span>
          <input
            onChange={(event) => updateSearchParam('q', event.currentTarget.value)}
            placeholder="Search products"
            value={searchParams.get('q') ?? ''}
          />
        </label>
      </div>
      <div className="sellerhub-product-grid">
        {visibleProducts.map((product) => (
          <article className="sellerhub-product-card" key={product.id}>
            <span>{product.category}</span>
            <h4>{product.name}</h4>
            <p>${product.price}</p>
            <Link to={`/catalog/${product.id}`}>View product route</Link>
          </article>
        ))}
      </div>
      {visibleProducts.length === 0 && <p>No products match the URL criteria.</p>}
    </section>
  )
}
```
</div>

Catalog 将 raw category parse 为 union，将 q 标准化为 lowercase，然后从 source array 派生 visible products。更新函数复制当前 URLSearchParams，避免 category 与 q 更新时互相覆盖；默认值被删除以保持 canonical URL。Product card Link 把 stable domain ID 放进 path。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-product-detail-page.tsx</span>
  </div>

```tsx
import { useEffect, useReducer } from 'react'
import { Link, useParams } from 'react-router'
import { requestSellerHubProduct } from './sellerhub-product-request'
import type { SellerHubProduct } from './sellerhub-catalog-data'

type ProductDetailState =
  | { status: 'pending'; productId: string }
  | { status: 'success'; product: SellerHubProduct }
  | { status: 'error'; message: string }

type ProductDetailAction =
  | { type: 'request'; productId: string }
  | { type: 'resolve'; product: SellerHubProduct }
  | { type: 'reject'; message: string }

function assertNever(action: never): never {
  throw new Error(`Unhandled product detail action: ${JSON.stringify(action)}`)
}

function productDetailReducer(
  _state: ProductDetailState,
  action: ProductDetailAction,
): ProductDetailState {
  switch (action.type) {
    case 'request':
      return { status: 'pending', productId: action.productId }
    case 'resolve':
      return { status: 'success', product: action.product }
    case 'reject':
      return { status: 'error', message: action.message }
    default:
      return assertNever(action)
  }
}

function isSellerHubProduct(value: unknown): value is SellerHubProduct {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    (candidate.category === 'lighting' || candidate.category === 'office') &&
    typeof candidate.price === 'number'
  )
}

function SellerHubProductResource({ productId }: { productId: string }) {
  const [resourceState, dispatch] = useReducer(productDetailReducer, {
    status: 'pending',
    productId,
  })

  useEffect(() => {
    const controller = new AbortController()
    let ignore = false

    dispatch({ type: 'request', productId })

    void requestSellerHubProduct(productId, controller.signal)
      .then((value) => {
        if (ignore) {
          return
        }

        if (isSellerHubProduct(value)) {
          dispatch({ type: 'resolve', product: value })
        } else {
          dispatch({ type: 'reject', message: 'Product response failed runtime validation.' })
        }
      })
      .catch((error: unknown) => {
        if (!ignore && !(error instanceof DOMException && error.name === 'AbortError')) {
          dispatch({
            type: 'reject',
            message: error instanceof Error ? error.message : 'Unknown product request failure.',
          })
        }
      })

    return () => {
      ignore = true
      controller.abort()
    }
  }, [productId])

  if (resourceState.status === 'pending') {
    return <p>Loading product {resourceState.productId}...</p>
  }

  if (resourceState.status === 'error') {
    return <p className="routing-error-text">{resourceState.message}</p>
  }

  return (
    <article className="sellerhub-detail-card">
      <span>{resourceState.product.category}</span>
      <h3>{resourceState.product.name}</h3>
      <p>${resourceState.product.price}</p>
      <Link to="/checkout">Continue to checkout</Link>
    </article>
  )
}

export function SellerHubProductDetailPage() {
  const { productId } = useParams<'productId'>()

  if (!productId) {
    return <p className="routing-error-text">The route did not provide productId.</p>
  }

  return (
    <section>
      <div className="sellerhub-page-heading">
        <div>
          <p>Dynamic route and async criteria</p>
          <h3>Product detail</h3>
        </div>
        <code>/catalog/{productId}</code>
      </div>
      <SellerHubProductResource key={productId} productId={productId} />
    </section>
  )
}
```
</div>

Route wrapper 先 narrow param，再用相同 value 作为 key/prop。Resource reducer 管理生命周期，并用 `assertNever(action)` 保证 action union 新增成员时必须同步增加 case；Effect 为每个 product snapshot 创建 controller；unknown response 先过 type guard。快速切换 product 时 cleanup 使旧 closure不能提交。这里同时集成第 8 章 identity 与第 9 章 async lifecycle。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-seller-layout.tsx</span>
  </div>

```tsx
import { NavLink, Outlet } from 'react-router'

function sellerLinkClassName({ isActive }: { isActive: boolean }): string {
  return isActive ? 'sellerhub-subnav-link sellerhub-subnav-link-active' : 'sellerhub-subnav-link'
}

export function SellerHubSellerLayout() {
  return (
    <section className="sellerhub-seller-layout">
      <aside>
        <p>Protected UI placeholder</p>
        <nav aria-label="Seller dashboard">
          <NavLink className={sellerLinkClassName} end to="/seller">
            Dashboard
          </NavLink>
          <NavLink className={sellerLinkClassName} to="/seller/orders">
            Orders
          </NavLink>
        </nav>
      </aside>
      <div className="sellerhub-seller-content">
        <Outlet />
      </div>
    </section>
  )
}

export function SellerHubDashboardHome() {
  return (
    <div>
      <p>Nested index route</p>
      <h3>Seller dashboard</h3>
      <p>The seller layout remains mounted while its Outlet changes.</p>
    </div>
  )
}
```
</div>

Seller layout 是第二层 owner：sidebar 在 Dashboard/Orders 切换中保持位置，Outlet subtree 改变。Dashboard 使用 `end`，所以进入 `/seller/orders` 后不会和 Orders 同时高亮。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-orders-page.tsx</span>
  </div>

```tsx
import { useSearchParams } from 'react-router'
import { sellerOrderCounts } from './sellerhub-catalog-data'
import type { SellerOrderStatus } from './sellerhub-catalog-data'

const sellerOrderStatuses: SellerOrderStatus[] = ['all', 'pending', 'shipped']

function parseSellerOrderStatus(value: string | null): SellerOrderStatus {
  return sellerOrderStatuses.includes(value as SellerOrderStatus)
    ? (value as SellerOrderStatus)
    : 'all'
}

export function SellerHubOrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const status = parseSellerOrderStatus(searchParams.get('status'))
  const visibleCount =
    status === 'all' ? sellerOrderCounts.pending + sellerOrderCounts.shipped : sellerOrderCounts[status]

  function selectStatus(nextStatus: SellerOrderStatus): void {
    setSearchParams(nextStatus === 'all' ? {} : { status: nextStatus })
  }

  return (
    <section>
      <div className="sellerhub-page-heading">
        <div>
          <p>Nested route with URL filter</p>
          <h3>Seller orders</h3>
        </div>
        <code>/seller/orders?status={status}</code>
      </div>
      <div className="routing-segmented-control" role="group" aria-label="Seller order status">
        {sellerOrderStatuses.map((option) => (
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
      <p className="sellerhub-order-count">{visibleCount} orders match the current URL state.</p>
    </section>
  )
}
```
</div>

Orders parser 把任意 query string收窄为三种状态，再从 counts 派生 visibleCount。Changing status 更新 history/search，不修改 seller layout identity；未来真实 request 可以直接消费 parsed status，而不是再复制到 Context。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-checkout-page.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

type CheckoutStep = 'shipping' | 'review'

function parseCheckoutStep(value: string | null): CheckoutStep {
  return value === 'review' ? 'review' : 'shipping'
}

export function SellerHubCheckoutPage() {
  const [searchParams] = useSearchParams()
  const [shippingNote, setShippingNote] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const step = parseCheckoutStep(searchParams.get('step'))

  function continueToReview(): void {
    navigate('/checkout?step=review', { state: location.state })
  }

  function placeLocalOrder(): void {
    navigate('/catalog', { replace: true, state: { checkoutComplete: true } })
  }

  return (
    <section>
      <div className="sellerhub-page-heading">
        <div>
          <p>URL step and local draft boundary</p>
          <h3>Checkout</h3>
        </div>
        <code>/checkout?step={step}</code>
      </div>
      <label className="routing-field">
        <span>Private shipping note</span>
        <textarea
          onChange={(event) => setShippingNote(event.currentTarget.value)}
          placeholder="This local draft is not stored in the URL"
          value={shippingNote}
        />
      </label>
      <p>Current step: {step}</p>
      <div className="routing-practice-actions">
        {step === 'shipping' ? (
          <button onClick={continueToReview} type="button">
            Continue to review
          </button>
        ) : (
          <button onClick={placeLocalOrder} type="button">
            Place local order
          </button>
        )}
      </div>
    </section>
  )
}
```
</div>

Checkout step 是可恢复 URL state，shipping note 是 private local draft。两个 navigation 都在 click handler 中：Continue push review entry，Place Order replace 当前 checkout entry。Location state 被透传但不是 checkout data owner。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-login-page.tsx</span>
  </div>

```tsx
import { useLocation, useNavigate } from 'react-router'

type SellerHubLoginPageProps = {
  onLogin: () => void
}

type LoginLocationState = {
  from?: string
}

function getRedirectDestination(state: unknown): string {
  if (
    typeof state === 'object' &&
    state !== null &&
    'from' in state &&
    typeof (state as LoginLocationState).from === 'string'
  ) {
    return (state as LoginLocationState).from ?? '/seller'
  }

  return '/seller'
}

export function SellerHubLoginPage({ onLogin }: SellerHubLoginPageProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const redirectDestination = getRedirectDestination(location.state)

  function completeLocalLogin(): void {
    onLogin()
    navigate(redirectDestination, { replace: true })
  }

  return (
    <section className="sellerhub-login-panel">
      <p>Local auth placeholder</p>
      <h3>Seller login</h3>
      <p>
        Redirect destination: <code>{redirectDestination}</code>
      </p>
      <button onClick={completeLocalLogin} type="button">
        Activate local seller session
      </button>
      <p className="routing-practice-note">
        This route changes local UI access only. A backend must still authorize every protected
        operation.
      </p>
    </section>
  )
}
```
</div>

Login 把 location.state 当 unknown；guard 失败或用户直接进入 `/login` 时回退 `/seller`。Click handler 先更新 workspace-owned auth state，再 replace 到 destination。它不创建 token、不调用 API，也不声称具备真实 authentication。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-protected-route.tsx</span>
  </div>

```tsx
import { Navigate, Outlet, useLocation } from 'react-router'

type SellerHubProtectedRouteProps = {
  isSellerAuthenticated: boolean
}

export function SellerHubProtectedRoute({
  isSellerAuthenticated,
}: SellerHubProtectedRouteProps) {
  const location = useLocation()

  if (!isSellerAuthenticated) {
    return (
      <Navigate
        replace
        state={{ from: location.pathname + location.search }}
        to="/login"
      />
    )
  }

  return <Outlet />
}
```
</div>

Guard false 时返回 redirect element并保存当前 pathname/search；true 时只提供 Outlet，不复制 seller layout。它是 route branch 中的无 path layout boundary，不增加 URL segment。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-not-found-page.tsx</span>
  </div>

```tsx
import { Link, useLocation } from 'react-router'

export function SellerHubNotFoundPage() {
  const location = useLocation()

  return (
    <section className="sellerhub-not-found">
      <p>Fallback route</p>
      <h3>Page not found</h3>
      <p>
        No route branch handles <code>{location.pathname}</code>.
      </p>
      <Link to="/catalog">Return to catalog</Link>
    </section>
  )
}
```
</div>

Fallback page显示 actual unmatched pathname，并提供 declarative recovery destination。它不处理 product response error，也不负责 server HTTP 404。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-10-routing-url-state/sellerhub-routing-workspace/sellerhub-routing-workspace.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { SellerHubCatalogPage } from './sellerhub-catalog-page'
import { SellerHubCheckoutPage } from './sellerhub-checkout-page'
import { SellerHubLoginPage } from './sellerhub-login-page'
import { SellerHubNotFoundPage } from './sellerhub-not-found-page'
import { SellerHubOrdersPage } from './sellerhub-orders-page'
import { SellerHubProductDetailPage } from './sellerhub-product-detail-page'
import { SellerHubProtectedRoute } from './sellerhub-protected-route'
import { SellerHubDashboardHome, SellerHubSellerLayout } from './sellerhub-seller-layout'
import { SellerHubWorkspaceLayout } from './sellerhub-workspace-layout'

export function SellerHubRoutingWorkspace() {
  const [isSellerAuthenticated, setIsSellerAuthenticated] = useState(false)

  return (
    <Routes>
      <Route
        element={
          <SellerHubWorkspaceLayout isSellerAuthenticated={isSellerAuthenticated} />
        }
      >
        <Route element={<Navigate replace to="/catalog" />} index />
        <Route element={<SellerHubCatalogPage />} path="catalog" />
        <Route element={<SellerHubProductDetailPage />} path="catalog/:productId" />
        <Route
          element={
            <SellerHubProtectedRoute isSellerAuthenticated={isSellerAuthenticated} />
          }
        >
          <Route element={<SellerHubSellerLayout />} path="seller">
            <Route element={<SellerHubDashboardHome />} index />
            <Route element={<SellerHubOrdersPage />} path="orders" />
          </Route>
        </Route>
        <Route element={<SellerHubCheckoutPage />} path="checkout" />
        <Route
          element={<SellerHubLoginPage onLogin={() => setIsSellerAuthenticated(true)} />}
          path="login"
        />
        <Route element={<SellerHubNotFoundPage />} path="not-found" />
        <Route element={<SellerHubNotFoundPage />} path="*" />
      </Route>
    </Routes>
  )
}
```
</div>

Workspace 是 auth placeholder 的 owner，也是 route tree 的 composition root。Root layout 没有 path，因此只增加 UI nesting；index Navigate把 `/` canonicalize 为 `/catalog`；guard route没有 path，只包裹 seller branch；Seller route再拥有 index/orders children；最后 `*` 提供 fallback。这里始终使用 Declarative mode，没有 loader、action 或 RouterProvider。

### 12.5 核心执行流程

1. `chapter-10-practice-root.tsx` 用 BrowserRouter 建立 browser history/location context，并把非 `/practice` location 交给 workspace。
2. Workspace Routes 计算 branch；root layout 通过 Outlet render leaf。
3. `/catalog` 从 search params 派生 products；点击 card Link 创建 `/catalog/:productId` entry。
4. Product detail narrow productId，把它用作 key 与 abortable request criteria，并验证 unknown response。
5. `/seller/orders` 先经过 UI guard；未登录时 replace 到 `/login`，local login event 后 replace 回 intended destination。
6. Seller layout 保留 sidebar owner，Orders leaf 从 status query 派生 count。
7. Checkout 将 step 放 URL、shipping note 留 local state，并在事件完成后 navigate。
8. 未知 path 进入 `*` leaf；直接 document request 是否到达 router仍由生产 host fallback 决定。

### 12.6 机制边界与常见错误

- **URL vs local：** catalog/order filter 能分享，checkout note 不公开；不要双向 Effect 同步两份 state。
- **Router vs React：** Router 改 branch/params，React 按 type/position/key preserve/reset cells。
- **TypeScript vs runtime：** generics 和 unions不验证地址栏或 unknown response，parser/type guard 必须存在。
- **UI guard vs security：** `isSellerAuthenticated` 只影响 elements；真实 API 仍必须在 server authorize。
- **History state vs durable data：** redirect intent有 fallback；不要把订单、auth 或 checkout draft 只放 location.state。
- **Client route vs host：** build 成功不等于生产服务器已配置 SPA fallback。

## 13. 额外速查表

**一句话总结：**

React Router 把 browser location 解释为 route branch；URL 保存可分享 navigation state，React 保存 branch 内交互 state，TypeScript 只检查代码关系而不验证 runtime URL。

**常用 API：**

| API | Use when | Avoid when |
| --- | --- | --- |
| `Link` | 用户选择内部 destination | 流程完成后的自动跳转 |
| `NavLink` | 导航需要 active state | 普通内容链接 |
| `Outlet` | Parent route 要显示 child element | 没有 nested child |
| `useParams` | 读取 dynamic segment | 需要 query/filter value |
| `useSearchParams` | 读取/写入 shareable string criteria | 私有 draft 或复杂 object |
| `useNavigate` | event/process完成后跳转 | 普通导航菜单 |
| `Navigate` | route branch declarative redirect | 后端 authorization |
| `key={param}` | entity change 应 reset local state | layout state 应 preserve |

**相似概念比较：**

| Concept A | Concept B | Key Difference |
| --- | --- | --- |
| path param | search param | resource identity/层级 vs optional filter/criteria |
| search params | local state | 可分享历史状态 vs component instance state |
| location.state | search params | entry-local hidden value vs URL-visible value |
| layout route | path prefix route | 前者可提供 element/Outlet，后者可只组合 path |
| route not found | entity not found | 无 pattern match vs pattern match 后无数据 |
| UI guard | backend authorization | UX boundary vs trust/security boundary |

**错误类型速查：**

| Signal | Likely cause | First check |
| --- | --- | --- |
| 内部导航后所有 state reset | document navigation | 是否使用 `<a href>` |
| URL 正确、child 空白 | missing Outlet | Parent layout JSX |
| 多个 nav item active | `end`/nesting intent | NavLink patterns |
| Back 后 filter 不变 | duplicate local filter state | URL 是否唯一 owner |
| 详情 ID 与数据不一致 | obsolete async result | Effect cleanup/dependencies |
| 切换 entity 后 draft 没 reset | same React identity | 是否需要 stable param key |
| 直接 URL 生产环境 404 | host 没有 SPA fallback | server rewrite 配置 |

**真实项目使用：**

| Scenario | Route mechanism | State owner |
| --- | --- | --- |
| Catalog filters | `useSearchParams` | URL |
| Product detail | `:productId` + parser | URL -> async resource |
| Seller sidebar | nested Route + Outlet | Parent layout |
| Checkout note | controlled textarea | Local state |
| Login redirect | location.state + fallback | History entry intent |
| Seller access | guard + backend auth | UI + server分别负责 |

**最小模板：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: declarative nested routes</span>
  </div>

```tsx
import { Outlet, Route, Routes } from 'react-router'

function Layout() {
  return <Outlet />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<p>Home</p>} index />
        <Route element={<p>Item</p>} path="items/:itemId" />
        <Route element={<p>Not found</p>} path="*" />
      </Route>
    </Routes>
  )
}
```
</div>

该 template 只展示 route nesting 形状，不是本章真实文件。真实页面仍要 narrow params、选择 state owner，并配置生产 SPA fallback。

## 14. 工程迁移与代码审查要点

### Code review questions

- 这个状态应该在 URL、route param、本地 state 还是 Context？
- 嵌套路由是否通过 layout 和 Outlet 表达共同外壳？
- not-found 和 protected placeholder 是否在正确边界处理？

### Migration checks

- 从手写 tab state 迁移到 route 时，先定义 URL 是否有分享价值。
- 把页面级数据读取条件从组件内部常量迁移到 route params。
- 不要在没有真实 auth 的章节里伪造认证系统，只保留边界模型。

### Production risk signals

- 刷新后页面回到默认筛选，说明可分享状态没有进入 URL。
- 子页面重复 header，说明 layout route 边界不清。
- 未知路径渲染空白，检查 fallback route。

## 15. 如何转换成个人笔记

建议为每个 9.x 建立一张“导航证据链”卡片，只保留七行：trigger、old/new URL、History push/replace、matched branch、rendered elements、state preserve/reset、runtime validation。然后再为 SellerHub 每条 route 写 owner：URL values、layout owner、local state、async criteria、security boundary。

练习时不要先背 API。打开 Browser DevTools：在 Elements 看 anchor，在 Network 看是否出现 document request，在 Console/React DevTools 看 component identity，在地址栏和 Back/Forward 看 history 语义。能用这些证据解释结果，才算掌握 routing 机制。

## 16. 必须能回答的问题

1. Client navigation 与 full page navigation 分别改变和保留什么？
2. Location、route tree、route branch 与 route element 是什么关系？
3. 什么时候用 Link，什么时候用 NavLink，什么时候用 useNavigate？
4. Parent route 已匹配但 child 不显示时，为什么先检查 Outlet？
5. `useParams<'productId'>()` 为什么不能证明 productId 有效？
6. 哪些 filter 应进入 search params，哪些 draft 不应进入 URL？
7. Location state 与 search params 的恢复边界有何不同？
8. Protected route 为什么不是 security boundary？
9. Param change 为什么可能 preserve local state？
10. `key={productId}` 如何改变 React identity？
11. Route param 驱动 request 时，为什么还需要 abort/ignore？
12. Router fallback、entity not found 与 server 404 如何区分？
13. 生产 host 为什么必须配置 SPA fallback？
14. SellerHub `/seller/orders?status=pending` 的完整 branch 和 criteria flow 是什么？

## 17. 最终记忆模型

把 React Router 想成 browser location 与 React tree 之间的解释器：

1. 用户通过 Link、地址栏、Back/Forward 或 navigate 产生 navigation。
2. Browser History 选择或创建 entry；location 变成新的 pathname/search/state/key。
3. Router 用 location 匹配 route tree，得到 parent-to-leaf branch。
4. Layout elements 进入 React tree，Outlet 接收 child element。
5. Params/search params 仍是 runtime strings；TypeScript 不替它们做业务验证。
6. React 按 type、position 与 key preserve/reset state，不按“URL 看起来不同”自动决定。
7. URL 保存可分享 criteria；local state保存私有交互；Context 共享非 URL owner value。
8. Route-driven async work仍由 Effect/request owner cleanup。
9. UI guard只选择前端 branch，backend authorization才建立信任。

最终公式：

`Browser navigation -> History location -> Router branch -> React identity -> validated URL values -> UI / async criteria`

## 18. 官方文档阅读清单

### React Router 7.18.0 官方文档

1. [Installation - Declarative mode](https://reactrouter.com/start/declarative/installation)：确认从 `react-router` 导入 BrowserRouter。
2. [Routing](https://reactrouter.com/start/declarative/routing)：重点阅读 nested routes、layout routes、index routes、dynamic segments、splats 和 linking。
3. [Navigating](https://reactrouter.com/start/declarative/navigating)：比较 Link、NavLink 与 useNavigate；官方优先建议正常导航使用 links。
4. [URL Values](https://reactrouter.com/start/declarative/url-values)：阅读 route params、search params 和 location object。
5. 本地安装包类型：`node_modules/react-router/dist/development/index.d.ts` 与 `index-react-server-client-*.d.ts`，用于核对 `NavigateFunction`、`useParams`、`useSearchParams`、Route/Link/Outlet props。

### React 官方文档

1. [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)：重点理解 state 与 tree position、type、key 的关系。
2. [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)：复习依赖变化、cleanup 和 obsolete result。

### MDN 浏览器平台文档

1. [Working with the History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API)：理解 pushState、replaceState、popstate 和 SPA history entries。
2. [History.pushState()](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)：确认 state、unused、same-origin URL 参数。
3. [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)：确认 query string 的 get/set/delete/serialization 行为。

### TypeScript 官方文档

1. [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)：把 `string | undefined` 和 `unknown` 收窄为 domain values。
2. [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)：复习 Route elements、props 与 TSX compile-time checking。

### 本地辅助资料

- `references/books/react/full-stack-react-projects.pdf` 的 PDF 199-202、239-242 页展示了历史 React Router 架构和 navigation 场景，但其中 `Switch`、`component` prop、`withRouter`、class components 与旧 Material UI 写法已不是本章现代默认；只用于比较 routing 问题，不复用 API。
- `references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf` 的 URL/search request 示例用于辅助理解 criteria string；该书没有替代 React Router 官方 routing 文档。
