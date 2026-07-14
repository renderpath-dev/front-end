# React 第 23 章：Router、URL Design、Navigation State 与 SPA Deployment Boundary

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
  - [9.1 Router boundary：URL-to-UI synchronization，不是隐藏 component state](#section-9-1)
  - [9.2 Browser URL anatomy：pathname、search、hash、params 与 location object](#section-9-2)
  - [9.3 Link 与 NavLink：client-side navigation、anchor semantics 与 active state](#section-9-3)
  - [9.4 useNavigate 与 Navigate：imperative 和 declarative navigation boundary](#section-9-4)
  - [9.5 Route matching：Routes、Route、nested routes、layout routes、Outlet 与 index routes](#section-9-5)
  - [9.6 Route params：dynamic segments、parsing、validation 与 missing entity boundary](#section-9-6)
  - [9.7 Search params：shareable filters 与 Chapter 22 URL state 的关系](#section-9-7)
  - [9.8 Relative links 与 resolved paths：route-relative 与 path-relative thinking](#section-9-8)
  - [9.9 Not found 与 catch-all routes：unknown paths、invalid params 与 recovery UI](#section-9-9)
  - [9.10 Protected routes：authentication UI boundary 与 real authorization](#section-9-10)
  - [9.11 Route identity 与 state preservation：location key、entity key、remount 与 reset](#section-9-11)
  - [9.12 Route-level code splitting：lazy、Suspense fallback 与 chunk failure boundary](#section-9-12)
  - [9.13 Navigation accessibility：active links、page heading、focus repair 与 scroll boundary](#section-9-13)
  - [9.14 SPA deployment boundary：refresh、deep link、static rewrites、Vite base 与 basename](#section-9-14)
  - [9.15 HashRouter boundary：deployment workaround 与 tradeoffs](#section-9-15)
  - [9.16 Testing routed UI：MemoryRouter、initial entries、role assertions 与 navigation evidence](#section-9-16)
  - [9.17 SellerHub route architecture mapping：catalog、orders、dashboard、settings、help 与 not found](#section-9-17)
  - [9.18 Final mini project：SellerHub Route Boundary Lab](#section-9-18)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [项目目标](#项目目标)
  - [为什么适合本章](#为什么适合本章)
  - [最终小项目结构](#最终小项目结构)
  - [文件职责](#文件职责)
  - [完整代码入口](#完整代码入口)
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

| Mechanism | Owner / Boundary | Runtime Layer | Project Scenario | Source Reading Path |
| --- | --- | --- | --- | --- |
| URL-to-UI synchronization | Browser URL owns selected page | browser platform + React Router | `/react/chapter-23` 根据 URL 渲染练习页 | `src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/01-router-boundary/router-url-ui-boundary-panel.tsx` |
| URL anatomy | pathname/search/hash 分别拥有不同含义 | Web URL API | SellerHub catalog detail + filter + anchor target | `src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/02-url-anatomy/url-location-model.ts` |
| Link semantics | anchor element owns navigation affordance | React Router + HTML anchor | Catalog、Orders、Help 使用 link 而不是 button | `src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/03-link-navlink/link-navlink-panel.tsx` |
| Route matching | route config owns URL pattern to UI mapping | React Router framework convention | SellerHub shell + nested route page | `src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/sellerhub-route-boundary-lab/sellerhub-memory-router-lab.tsx` |
| Route params | dynamic segment owns entity identity | React Router + TypeScript boundary | `product-201` 和 `order-501` 需要 runtime parser | `src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/06-route-params/route-param-parser.ts` |
| Search params | URL search owns shareable filter state | URLSearchParams + React Router hook | catalog channel filter 可复制、可刷新 | `src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/07-search-params/search-param-route-panel.tsx` |
| Protected route UI boundary | client auth state owns visible branch only | React Router redirect + application state | settings page redirect to login | `src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/sellerhub-route-boundary-lab/sellerhub-protected-route-panel.tsx` |
| SPA deployment boundary | static host owns rewrite behavior | Vite build + hosting platform | BrowserRouter deep link refresh | `src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/14-spa-deployment/spa-deployment-model.ts` |
| Routed UI tests | MemoryRouter owns isolated test history | Vitest + Testing Library + React Router | initial entries、link click、redirect、not found | `src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/__tests__/sellerhub-memory-router-lab.test.tsx` |

## 0. 本章工程问题与边界

本章把 routing 当作“browser URL 与 React UI 的同步协议”，而不是把 `Route`、`Link`、`useNavigate` 逐个背 API。URL 是用户可见、可复制、可刷新、可进入 history stack 的状态容器；router 的职责是读取 location、匹配 route config、渲染对应 UI，并在 navigation 发生时更新 history entry。

本章必须区分这些 ownership：

- `pathname` 选择 page 或 entity detail；
- route params 标识 entity identity，但进入组件时仍是 string；
- `search` 编码 shareable filters 或 view state；
- `hash` 指向页面内 fragment target；
- `location.state` 是 client-side history state，不适合存放刷新后必须存在的事实；
- protected route 只是 UI boundary，不是 backend authorization；
- route-level lazy chunk 是 JavaScript module loading，不是 server data loading；
- BrowserRouter deep link 是否刷新成功由 static host rewrite 决定，client code 不能单独修复缺失 rewrite；
- Vite `base` 影响 built asset URLs，BrowserRouter `basename` 影响 route matching，它们相关但不是同一个边界。

本章不创建真实生产部署、不迁移到 React Router Framework Mode、不迁移到 Next.js、不伪造 SSR、不伪造 static hosting rewrite、不声称 `vite preview` 是 production server。

## 1. 本章解决的问题

完成本章后，你应该能解释为什么 `/sellerhub/catalog/product-201?channel=online#reviews` 不是一个普通 string，而是四个不同 ownership 的组合：pathname 决定页面和 entity route，param 决定 product identity，search 决定 filter，hash 决定 in-page target。你还应该能判断什么时候用 `Link`，什么时候用 `useNavigate`，什么时候用 `Navigate`，什么时候需要 not found branch，什么时候需要 host rewrite，而不是把所有问题都归结为“路由没配好”。

## 2. 前置概念

- React render snapshot：导航后 route component 会重新 render，但旧 render 中的 local state 是否保留取决于 component identity。
- Chapter 22 URL state：search params 是 URL-owned state，本章只讨论它与 routing 的同步关系，不重讲 codec 全章。
- Browser URL 与 History API：push、replace、back/forward 都改变 history entry。
- TypeScript narrowing：`useParams` 返回 string 或 undefined；TypeScript 不会替你验证 URL 是否存在对应 entity。
- Vite build：`vite build` 产出 static assets；host rewrite 是 deployment 边界。

## 3. 学习目标

1. 解释 router 如何从 location 匹配 UI。
2. 区分 pathname、search、hash、route params、search params 与 location state。
3. 使用当前项目已有的 `react-router` 包，不切换 router package。
4. 设计 nested route、layout route、index route、catch-all route 和 not found route。
5. 解释 route identity 如何 preserve 或 reset component state。
6. 将 protected route 识别为 UI boundary，而不是安全机制。
7. 区分 route-level code splitting、route fallback、route-level error boundary reading 与 server data loading。
8. 解释 static SPA deployment 中 refresh、deep link、Vite base、BrowserRouter basename、HashRouter 的边界。
9. 用 MemoryRouter 测试 routed UI 的 visible behavior。

## 4. 机制依赖图

| First Understand | Then Understand | Dependency Reason | Failure If Skipped |
| --- | --- | --- | --- |
| Browser URL parts | route matching | router 读取的是 location，不是 component 自己 invent 的 page state | 把 page tab 存在 local state，刷新后丢失 deep link |
| History entry | push vs replace | navigation 修改的是 stack entry | filter typing 产生过多 back entries，或 login redirect 污染 back stack |
| Route match | nested layout route | child UI 需要 parent shell 与 Outlet | 重复 parent path，导致 descendant route 无法匹配 |
| Route param string | runtime parser | TypeScript 不解析 URL | `Number(params.id)` 得到 `NaN` 后仍继续查询 entity |
| Search params | URL state | filter 可分享、可刷新、可 back/forward | 同步 local state 和 URL 时产生双 owner |
| Component identity | route identity reset | React state cell 保留取决于 tree position/key | settings form 在 seller 切换后保留旧 draft |
| Vite base | BrowserRouter basename | asset public path 和 route base path 是不同配置 | asset 加载正确但 route deep link 仍 404，或相反 |
| MemoryRouter | routed UI tests | test 需要可控 history，不依赖真实 browser navigation | 只测 route object，不证明用户能点击进入页面 |

## 5. 核心术语表

| Term | 中文说明 | Layer | Why It Matters |
| --- | --- | --- | --- |
| `location` | 当前 URL snapshot，包含 pathname、search、hash、state、key | React Router + History | route render 的输入 |
| `pathname` | URL path，不含 query/hash | browser platform | page 与 entity route 的主要 owner |
| route param | dynamic route segment 读取到的 string | React Router | 标识 entity，但需要 runtime validation |
| search param | query string key/value | URLSearchParams | shareable filter 或 navigation state |
| `Link` | client-side router anchor wrapper | React Router + HTML | 保留 anchor semantics |
| `NavLink` | active-aware Link | React Router | 给 active route 提供 `aria-current` |
| `Navigate` | declarative redirect component | React Router | render branch 中声明 redirect result |
| `Outlet` | layout route 渲染 child route 的位置 | React Router | 组合 shared shell 与 child page |
| `basename` | router 匹配时的 base path | React Router | subpath deployment 时影响 route matching |
| Vite `base` | build asset public base path | Vite tooling | 影响 built asset URL，不自动修复 routes |
| HashRouter | hash fragment 中保存 route | React Router + browser URL | 可绕过 host rewrite，但改变 URL tradeoff |

## 6. 底层心智模型

一次 route navigation 的底层流程是：用户点击 anchor 或代码调用 navigate；React Router 决定 push 或 replace；browser history 产生或替换 entry；router 读取新的 location；route config 重新匹配；React 按匹配结果创建新的 element tree；layout route 保留 shared shell，Outlet 渲染 child；如果 component identity 未变，state cell 可能保留；如果 key 或 route branch 变了，state 可能 reset。TypeScript 只检查你如何读取和传递这些值，不执行 URL parsing、entity lookup、host rewrite 或 authorization。

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
  index.html
  src/
    App.tsx
    site/
      data/
        learning-manifest.ts
    learning/
      react/
        chapter-23-router-url-navigation-spa-deployment-boundary/
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
    chapter-23-router-url-navigation-spa-deployment-boundary/
      react-chapter-23-learning-guide.md
```
</div>

### 概念示例结构

这些 snippets 用于解释机制和错误边界，不代表都要创建真实文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">概念示例结构</span>
  </div>

```txt
Conceptual snippets:
  Snippet: local page state switcher
  Snippet: route tree with layout outlet
  Snippet: protected route redirect
  Snippet: deployment checklist model
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
src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/
  chapter-23-practice-root.tsx
  sellerhub-route-boundary-lab/
    sellerhub-route-boundary-lab.tsx
    sellerhub-memory-router-lab.tsx
    sellerhub-route-shell.tsx
    sellerhub-route-pages.tsx
    sellerhub-protected-route-panel.tsx
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

打开 Vite 输出的本地 URL，然后进入 `/react/chapter-23`。本章 practice root 运行在当前项目的 `BrowserRouter` 下；最终 SellerHub MemoryRouter lab 为避免 nested Router invariant，挂载在独立 React root 内。

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 Router boundary：URL-to-UI synchronization，不是隐藏 component state

**结论：**

Routing 的 owner 是 browser URL；React Router 的 route config 是 URL pattern 到 UI 的匹配规则。把页面选择藏进 `useState('catalog')` 会丢失 refresh、deep link、back/forward 和 link sharing。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: local page state vs route config</span>
  </div>

```tsx
function LocalPageSwitcher() {
  const [page, setPage] = useState('catalog')
  return page === 'catalog' ? <CatalogPage /> : <OrdersPage />
}

function RoutedPages() {
  return (
    <Routes>
      <Route path="/sellerhub/catalog" element={<CatalogPage />} />
      <Route path="/sellerhub/orders" element={<OrdersPage />} />
    </Routes>
  )
}
```
</div>

**逐行解释：**

`LocalPageSwitcher` 的 `page` 只存在于当前 component state cell；刷新或复制 URL 时 browser 不知道它。`RoutedPages` 则让 `/sellerhub/catalog` 与 `/sellerhub/orders` 成为 browser-visible state，router 根据 location 匹配 element。TypeScript 只检查 JSX 与 string literal，不知道哪个 URL 应该存在。

**执行过程：**

点击 link 后，history entry 改变；router 读取新的 `location.pathname`；`Routes` 遍历 route patterns；匹配成功后 React render 对应 element。错误版本中，button 只改 state cell，不写 history stack。

**机制证据链：**

触发动作是 link click；JavaScript runtime 调用 router click handler；history stack push 新 entry；React Router 读取 location snapshot；React 按匹配 branch render page；TypeScript 不执行 route matching。违反规则的形式是“page identity 没有进入 URL”，真实项目信号是刷新后回到默认 tab、分享链接无法还原页面、back button 不工作。

<a id="section-9-2"></a>

### 9.2 Browser URL anatomy：pathname、search、hash、params 与 location object

**结论：**

URL 不是一个普通字符串。`pathname` 选择 page，dynamic segment 选择 entity，`search` 保存 shareable state，`hash` 指向页面内目标，`location.state` 保存 client-side history state。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/02-url-anatomy/url-location-model.ts</span>
  </div>

```ts
export function parseUrlLocation(input: string) {
  const parsedUrl = new URL(input, 'https://sellerhub.example')

  return {
    pathname: parsedUrl.pathname,
    search: parsedUrl.search,
    hash: parsedUrl.hash,
    routeSegments: parsedUrl.pathname.split('/').filter(Boolean),
    searchEntries: Array.from(parsedUrl.searchParams.entries()),
  }
}
```
</div>

**逐行解释：**

`new URL` 使用 platform URL parser；relative path 通过 fallback origin 变成可解析 URL；`pathname` 不含 query/hash；`searchParams.entries()` 把 query string 转成 key/value pairs，但每个 value 仍是 string。

**执行过程：**

输入 `/sellerhub/catalog/product-201?channel=online#reviews`；URL parser 生成 URL object；route segments 变成数组；search params 变成 entries；hash 保留 `#reviews`。TypeScript 知道 return object 的 shape，但不证明 `product-201` 一定存在。

**常见错误为什么错：**

把 product id 放到 `?productId=201` 不一定错，但如果它决定 detail page identity，pathname 更清晰；把大对象放进 `location.state` 刷新后不可依赖；把 hash 当 route param 会混淆 in-page target 和 route match。

<a id="section-9-3"></a>

### 9.3 Link 与 NavLink：client-side navigation、anchor semantics 与 active state

**结论：**

`Link` 是 anchor wrapper，不是 button replacement。导航到另一个 URL 应使用 link semantics；`NavLink` 额外暴露 active state，并在 active 时提供 `aria-current="page"`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: link semantics</span>
  </div>

```tsx
function SellerHubNav() {
  return (
    <nav aria-label="SellerHub routes">
      <NavLink to="/sellerhub/catalog">Catalog</NavLink>
      <Link to={{ pathname: '/sellerhub/help', hash: '#faq' }}>Help FAQ</Link>
      <button type="button" onClick={() => navigate('/sellerhub/orders')}>
        Orders
      </button>
    </nav>
  )
}
```
</div>

**逐行解释：**

`NavLink` 适合 persistent nav，因为 active route 可以被样式和 accessibility tree 识别；object `to` 明确拆分 pathname/hash；button 版本是错误对比，因为它没有 `href`，不能天然支持 open in new tab、copy link、context menu。

**执行过程：**

用户点击 `Link`；React Router 拦截同站导航；history push 或 replace；location 更新；route tree rerender。`NavLink` 在 render 时比较当前 route 与 `to`，active 时输出 active evidence。

**常见错误为什么错：**

用 button 做页面跳转违反了“导航是 link”的语义规则。真实项目中可通过 keyboard interaction、screen reader link list、右键菜单缺失和测试无法 `getByRole('link')` 识别。

<a id="section-9-4"></a>

### 9.4 useNavigate 与 Navigate：imperative 和 declarative navigation boundary

**结论：**

`useNavigate` 用于事件、effect 或异步完成后的 imperative navigation；`Navigate` 用于 render branch 中声明 redirect result。不要在 render body 中直接调用 `navigate()`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: navigation boundaries</span>
  </div>

```tsx
function SaveAndReturn() {
  const navigate = useNavigate()

  function handleSave() {
    navigate('/sellerhub/orders', { replace: true })
  }

  return <button onClick={handleSave}>Save</button>
}

function RedirectBranch({ canView }: { canView: boolean }) {
  return canView ? <SettingsPage /> : <Navigate replace to="/sellerhub/login" />
}
```
</div>

**逐行解释：**

`handleSave` 由 user event 触发，因此 navigation 是 event result；`replace: true` 替换当前 entry，适合完成页或 login redirect；`RedirectBranch` 通过 returned element 表达当前 render 应该跳到 login。

**执行过程：**

event handler 调用 navigate；router 修改 history；location 更新；routes 重新匹配。`Navigate` 则在 render branch 被 React 创建为 element，router 在 commit 期间执行 redirect 意图。

**常见错误为什么错：**

在 component render body 直接 `navigate('/login')` 是 render side effect，会让 render 不再是纯 UI 描述。识别信号是 Strict Mode 下重复跳转、测试 render 后立刻改 history、或 warning 指向 update during render。

<a id="section-9-5"></a>

### 9.5 Route matching：Routes、Route、nested routes、layout routes、Outlet 与 index routes

**结论：**

Nested route 表示 UI composition，不表示 child path 要重复父路径。layout route 拥有 shared shell，`Outlet` 是 child route 的插入点，index route 是 parent URL 的默认 child。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: nested route tree</span>
  </div>

```tsx
<Routes>
  <Route element={<SellerHubShell />} path="/sellerhub">
    <Route element={<Navigate replace to="catalog" />} index />
    <Route element={<CatalogPage />} path="catalog" />
    <Route element={<OrdersPage />} path="orders" />
    <Route element={<NotFoundPage />} path="*" />
  </Route>
</Routes>
```
</div>

**逐行解释：**

父 route 匹配 `/sellerhub` 并 render shell；index child 没有 path，表示 `/sellerhub` 的默认内容；`catalog` 和 `orders` 是相对 child paths；`*` 捕获 shell 内未知 child。

**执行过程：**

输入 `/sellerhub/orders`；router 先匹配 parent；在 parent 的剩余 path 中匹配 `orders`；React render shell；shell 内 `Outlet` render `OrdersPage`。

**常见错误为什么错：**

在 child route 写 `path="/sellerhub/orders"` 会把 child 当 absolute path，破坏 nested mental model。识别信号是 parent shell 没出现、Outlet 不渲染、或 descendant route 写出重复 prefix。

<a id="section-9-6"></a>

### 9.6 Route params：dynamic segments、parsing、validation 与 missing entity boundary

**结论：**

`useParams` 返回 URL 中的 string 或 undefined。TypeScript 可以描述 parser result，但不能证明 param 格式正确，也不能证明 entity 存在。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/06-route-params/route-param-parser.ts</span>
  </div>

```ts
export function parseSellerHubEntityId(value: string | undefined) {
  if (value === undefined || value.trim().length === 0) {
    return { status: 'missing', reason: 'Route param is required for this detail page.' }
  }

  const match = /^(product|order)-(\d{3})$/.exec(value)

  if (match === null) {
    return { status: 'invalid', reason: 'Expected a product-000 or order-000 route id.', received: value }
  }

  return { status: 'valid', entityId: value, numericId: Number(match[2]) }
}
```
</div>

**逐行解释：**

第一条 branch 处理 missing param；regex branch 处理格式错误；valid branch 保留原始 entity id，同时提取 numeric suffix。这个 parser 把 unknown URL string 转成 discriminated union，UI 才能安全分支。

**执行过程：**

route `/sellerhub/catalog/:productId` 匹配后，`useParams()` 提供 `productId`；parser 判断 missing/invalid/valid；valid 后再查 entity collection；查不到 entity 仍进入 not found boundary。

**常见错误为什么错：**

`Number(params.id)` 对 `abc` 得到 `NaN`，但 TypeScript 仍认为它是 number。违反规则是“static type 不等于 runtime validation”。真实项目信号是 invalid URL 进入 loading 或 detail UI，而不是 recovery UI。

<a id="section-9-7"></a>

### 9.7 Search params：shareable filters 与 Chapter 22 URL state 的关系

**结论：**

Search params 是 route 上的 URL state。它适合小型、可序列化、用户可见、可分享的 filters。它不是隐藏 component state，也不适合 secrets 或大型对象。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/07-search-params/search-param-route-panel.tsx</span>
  </div>

```tsx
function setChannel(nextChannel: string): void {
  const nextParams = new URLSearchParams(searchParams)

  if (nextChannel === 'all') {
    nextParams.delete('channel')
  } else {
    nextParams.set('channel', nextChannel)
  }

  setSearchParams(nextParams, { replace: true })
}
```
</div>

**逐行解释：**

先 clone 当前 `searchParams`，避免直接 mutate stable object；`all` 删除 param，让 default URL 更干净；其它 channel 写入 query string；`setSearchParams` 发起 navigation，`replace` 避免每次 filter 点击都制造过多 back entries。

**执行过程：**

用户点击 Online；handler 创建新的 URLSearchParams；router replace 当前 history entry；location.search 更新；读取 search params 的 component 重新 render。

**常见错误为什么错：**

`searchParams.set('channel', 'online')` 后不调用 setter，只是改了本地 object，URL 和 router location 不会更新。识别信号是 UI 可能暂时显示旧值、address bar 不变、刷新后 filter 丢失。

<a id="section-9-8"></a>

### 9.8 Relative links 与 resolved paths：route-relative 与 path-relative thinking

**结论：**

Relative link 能减少硬编码 prefix，但必须明确是 route-relative 还是 path-relative。布局层级变化时，误解 relative resolution 会把链接指向错误 sibling。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/08-relative-links/relative-link-model.ts</span>
  </div>

```ts
export function resolvePathRelativeLink(currentPath: string, target: string): string {
  if (target.startsWith('/')) {
    return normalizeResolvedPath(target)
  }

  const currentSegments = currentPath.split('/').filter(Boolean)
  const targetSegments = target.split('/').filter(Boolean)
  const resolvedSegments = [...currentSegments]

  for (const segment of targetSegments) {
    if (segment === '..') {
      resolvedSegments.pop()
    } else if (segment !== '.') {
      resolvedSegments.push(segment)
    }
  }

  return normalizeResolvedPath(`/${resolvedSegments.join('/')}`)
}
```
</div>

**逐行解释：**

absolute target 直接返回；relative target 被拆成 segments；`..` 移除一个 path segment；`.` 不改变路径；普通 segment 追加到 resolved path。

**执行过程：**

从 `/sellerhub/catalog/product-201` 到 `../orders`，path-relative resolution 会先移除 `product-201`，再追加 `orders`，得到 `/sellerhub/catalog/orders`。如果实际要 sibling `/sellerhub/orders`，应使用 absolute path 或 route-aware helper。

**常见错误为什么错：**

把 `../orders` 当成“去 sibling feature”但当前 path 位于 detail 下，会得到错误 URL。识别信号是链接在 list page 正常，在 detail page 错误。

<a id="section-9-9"></a>

### 9.9 Not found 与 catch-all routes：unknown paths、invalid params 与 recovery UI

**结论：**

Not found 分三层：route pattern 未匹配、param 格式无效、entity 不存在。Client-only SPA 的 not found UI 不等于 static host 的 HTTP 404。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: catch-all route and entity boundary</span>
  </div>

```tsx
<Route element={<SellerHubNotFoundPanel />} path="*" />

function ProductRoute() {
  const product = findProduct()
  return product ? <ProductDetail product={product} /> : <SellerHubNotFoundPanel />
}
```
</div>

**逐行解释：**

`path="*"` 捕获未知 child route；entity branch 捕获已匹配 route 但数据不存在的情况。两者都应提供 recovery UI，而不是静默跳回 home。

**执行过程：**

未知 path 进入 catch-all；invalid param 先经过 parser；missing entity 经过 collection lookup；三者都能显示 path 或 id 相关信息，帮助用户恢复。

**常见错误为什么错：**

把所有 unknown URLs redirect 到 `/` 会隐藏错误来源，用户无法知道链接是否拼错、entity 是否不存在、host rewrite 是否缺失。识别信号是 404 monitoring 无数据、用户反馈“页面跳走了”。

<a id="section-9-10"></a>

### 9.10 Protected routes：authentication UI boundary 与 real authorization

**结论：**

Protected route 在 browser 内只能保护 UI branch。真实授权必须由 server 对 request、session、token、permission 做验证。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/sellerhub-route-boundary-lab/sellerhub-protected-route-panel.tsx</span>
  </div>

```tsx
export function SellerHubProtectedRoutePanel({ children, isAuthenticated }) {
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate replace state={{ returnTo: location.pathname }} to="/sellerhub/login" />
  }

  return <>{children}</>
}
```
</div>

**逐行解释：**

`useLocation` 读取当前 path；anonymous branch 返回 `Navigate`；`replace` 避免 back button 回到 protected URL 再 redirect；`state.returnTo` 保存 client redirect intention；authenticated branch render private UI。

**执行过程：**

用户 deep link 到 settings；protected route render；auth state 为 false；router replace 到 login；login 读取 location state；demo session 后 navigate 回 return path。

**常见错误为什么错：**

把 protected route 当安全机制会暴露真实数据风险。真实项目信号是 API 仍返回 private data，或用户手工调用 endpoint 可绕过 UI。

<a id="section-9-11"></a>

### 9.11 Route identity 与 state preservation：location key、entity key、remount 与 reset

**结论：**

Navigation 不总是 reset state。React 是否保留 state 取决于 component identity、tree position 和 key；route param 改变时，如果 form 应该重置，就用稳定 entity key。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: entity key reset</span>
  </div>

```tsx
function ProductEditorRoute() {
  const { productId } = useParams()
  return <ProductDraftForm key={productId} productId={productId} />
}

function WrongResetKey() {
  return <ProductDraftForm key={Date.now()} productId="product-201" />
}
```
</div>

**逐行解释：**

`key={productId}` 让不同 product 拥有不同 state cell identity；相同 product rerender 时 key 不变，draft 可保留。`Date.now()` 每次 render 都变，导致每次 render 都 remount。

**执行过程：**

从 product-201 到 product-202；param 变化；key 变化；React 丢弃旧 form subtree state；新 form 用 product-202 initial values。错误版本每次 render 都像换 entity。

**常见错误为什么错：**

不加 key 会让 product-202 看到 product-201 的 draft；使用不稳定 key 会让用户每次输入都被 reset。识别信号是 entity 切换时 draft 泄漏，或输入框每次键入后清空。

<a id="section-9-12"></a>

### 9.12 Route-level code splitting：lazy、Suspense fallback 与 chunk failure boundary

**结论：**

Route-level code splitting 延迟加载 JavaScript chunk；Suspense fallback 是 module loading UI，不是 data loading UI。chunk failure 应交给 Error Boundary 阅读和恢复策略。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: lazy route chunk boundary</span>
  </div>

```tsx
const OrdersPage = lazy(() => import('./OrdersPage'))

function RouteArea() {
  return (
    <Suspense fallback={<p>Loading route chunk...</p>}>
      <OrdersPage />
    </Suspense>
  )
}
```
</div>

**逐行解释：**

`lazy` 接收 dynamic import loader；首次 render 时 module promise pending；Suspense 显示 fallback；promise resolve 后 React 再 render loaded component。TypeScript 检查 module default component shape，但 runtime chunk load 可能失败。

**执行过程：**

用户进入 orders route；route element render；lazy component throw promise 给 Suspense；browser 请求 chunk；chunk 返回后 component render。这个过程不代表 orders data 已经加载。

**常见错误为什么错：**

把 code fallback 文案写成 “Loading orders data” 会混淆 module loading 与 server data loading。识别信号是 chunk 已加载但 data 仍 pending，或 chunk failure 被误报为 API failure。

<a id="section-9-13"></a>

### 9.13 Navigation accessibility：active links、page heading、focus repair 与 scroll boundary

**结论：**

Route navigation 不只是视觉切换。用户需要 active nav、页面主标题、focus repair、scroll restoration boundary 和可测试的语义证据。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/13-navigation-accessibility/navigation-accessibility-panel.tsx</span>
  </div>

```tsx
const location = useLocation()
const headingRef = useRef<HTMLHeadingElement>(null)

useEffect(() => {
  headingRef.current?.focus()
}, [location.pathname])
```
</div>

**逐行解释：**

`useLocation` 提供 navigation snapshot；`headingRef` 指向页面 heading；effect 在 pathname 改变后运行；focus target 是 heading，不是装饰容器。

**执行过程：**

用户导航到新 route；location.pathname 改变；component commit 新 heading；effect 调用 `focus()`；keyboard user 获得新的阅读起点。`NavLink` 同时可给 active link 添加 `aria-current`。

**常见错误为什么错：**

只有颜色变化的 active nav 对非视觉用户不可见；导航后 focus 留在旧 link 可能让用户不知道页面变了。识别信号是 Testing Library 能找到 link，但没有 active state 或 heading focus evidence。

<a id="section-9-14"></a>

### 9.14 SPA deployment boundary：refresh、deep link、static rewrites、Vite base 与 basename

**结论：**

BrowserRouter 的 deep link refresh 成功与否取决于 host 是否把 app routes rewrite 到 `index.html`。Vite `base` 影响 asset URL；BrowserRouter `basename` 影响 route matching；`vite preview` 只是 local preview。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/14-spa-deployment/spa-deployment-model.ts</span>
  </div>

```ts
if (input.routerMode === 'browser' && !input.hostHasRewrite) {
  findings.push({
    level: 'warning',
    message: 'BrowserRouter deep links need a host rewrite to index.html.',
  })
}
```
</div>

**逐行解释：**

BrowserRouter 使用 clean path；static host 收到 `/sellerhub/orders` 请求时，如果没有 rewrite，就可能找不到真实文件；model 将此标为 warning。这个判断不创建真实 host，只表达 boundary。

**执行过程：**

用户直接刷新 `/sellerhub/orders`；browser 向 host 请求该 path；host 若返回 `index.html`，client router 接管；host 若返回 404，React app 甚至无法启动。

**常见错误为什么错：**

用 dev server 或 `vite preview` 成功来证明生产 host 成功，是 deployment boundary 混淆。识别信号是 local preview 正常，GitHub Pages repo subpath 或静态 host deep link 404。

<a id="section-9-15"></a>

### 9.15 HashRouter boundary：deployment workaround 与 tradeoffs

**结论：**

HashRouter 把 route 放在 `#` 后面，server 不会收到 hash fragment，因此可以绕过缺失 rewrite 的静态 host。但它牺牲 clean URL，并可能影响 analytics、SEO 和 in-page hash 语义。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: BrowserRouter vs HashRouter URL</span>
  </div>

```txt
BrowserRouter URL:
  /sellerhub/orders

HashRouter URL:
  /#/sellerhub/orders
```
</div>

**逐行解释：**

BrowserRouter path 进入 HTTP request path；HashRouter 中 `#/sellerhub/orders` 的 route 部分属于 fragment，通常不会发送给 server。client 启动后再从 hash 还原 route。

**执行过程：**

用户刷新 `/#/sellerhub/orders`；host 只收到 `/`；返回 index.html；client router 读取 hash 并渲染 orders。代价是 URL 设计和 scroll hash target 语义变复杂。

**常见错误为什么错：**

为了逃避 deployment 学习而默认切 HashRouter，会隐藏 host rewrite 问题。可接受场景是 host 无法配置 rewrite 且 clean URL 不是项目目标。

<a id="section-9-16"></a>

### 9.16 Testing routed UI：MemoryRouter、initial entries、role assertions 与 navigation evidence

**结论：**

Routed UI test 应控制 initial entries、渲染真实 route tree、断言用户可见结果。不要只测试 route object，也不要每个 unit test 都依赖 BrowserRouter。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/__tests__/sellerhub-memory-router-lab.test.tsx</span>
  </div>

```tsx
render(<SellerHubMemoryRouterLab initialEntries={['/sellerhub/catalog/product-201']} />)

expect(
  screen.getByRole('heading', { name: 'Product route param detail' }),
).toBeInTheDocument()
```
</div>

**逐行解释：**

`initialEntries` 创建 controlled test history；render 真实 lab route tree；heading assertion 证明用户看到 product detail page，而不是只证明某个 function 被调用。

**执行过程：**

MemoryRouter 以指定 path 初始化；Routes 匹配 catalog detail；component 读取 params；parser 验证 id；UI render detail heading；test 通过 role/name 读取 DOM。

**常见错误为什么错：**

只 assert route config array 包含 path 不证明用户可点击、不证明 redirect、不证明 not found。识别信号是 test 改 route object 仍通过，但页面点击实际失败。

<a id="section-9-17"></a>

### 9.17 SellerHub route architecture mapping：catalog、orders、dashboard、settings、help 与 not found

**结论：**

SellerHub route architecture 要把 page identity、entity identity、shareable filter state、protected UI boundary、help anchor target、not found recovery、deployment assumption 分开评审。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: SellerHub route map</span>
  </div>

```txt
/sellerhub/catalog
/sellerhub/catalog/:productId
/sellerhub/catalog?channel=online
/sellerhub/orders/:orderId
/sellerhub/settings
/sellerhub/help#faq
/sellerhub/*
```
</div>

**逐行解释：**

catalog list 是 page route；product/order detail 是 entity route；channel 是 search state；settings 是 protected UI branch；help hash 指向 in-page target；catch-all route 保留 recovery UI。

**执行过程：**

code review 先看 URL 是否表达用户想分享或恢复的 state；再看 params 是否有 parser；再看 protected route 是否只声明 UI boundary；最后看 deployment 是否有 rewrite/base/basename 证据。

**常见错误为什么错：**

把 dashboard tab、catalog filter、product id 都塞进 local state 会让 refresh 和 share link 失败；把 settings guard 当 security 会错过 API authorization review。

<a id="section-9-18"></a>

### 9.18 Final mini project：SellerHub Route Boundary Lab

**结论：**

最终小项目把本章机制组合成一个 client-side lab：MemoryRouter route shell、nested pages、param detail、search filter、protected route redirect、not found recovery、deployment boundary card、route review table。它不部署、不授权、不 SSR、不切换全局 router。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/sellerhub-route-boundary-lab/sellerhub-memory-router-lab.tsx</span>
  </div>

```tsx
<MemoryRouter initialEntries={initialEntries}>
  <Routes>
    <Route element={<SellerHubRouteShell />} path="/sellerhub">
      <Route element={<Navigate replace to="catalog" />} index />
      <Route element={<SellerHubCatalogPage />} path="catalog" />
      <Route element={<SellerHubCatalogDetailPage />} path="catalog/:productId" />
      <Route element={<SellerHubNotFoundPanel />} path="*" />
    </Route>
  </Routes>
</MemoryRouter>
```
</div>

**逐行解释：**

MemoryRouter owns isolated history；Routes owns match rules；layout route owns shell；index route redirects to catalog；catalog detail owns dynamic param branch；catch-all route owns unknown child recovery。

**执行过程：**

进入 `/react/chapter-23`；practice root render final lab；isolated root mount MemoryRouter；initial entry `/sellerhub/catalog?channel=online` 匹配 shell + catalog；用户点击 product link 后 param detail branch render；点击 settings 时 protected route redirect 到 login。

**常见错误为什么错：**

如果直接在已有 BrowserRouter 下再渲染 MemoryRouter，会触发 nested Router invariant。当前 lab 用独立 React root 隔离 MemoryRouter，这是为了让学习模拟可运行，同时不改变项目全局 router。

## 10. API / 语法索引

| API / Syntax | Layer | Meaning | Common Mistake |
| --- | --- | --- | --- |
| `BrowserRouter` | React Router declarative router | 使用 browser history 与 clean URLs | 以为 client code 可单独修复 host deep link 404 |
| `MemoryRouter` | React Router declarative router | 测试或隔离模拟中的 in-memory history | 在已有 Router 下直接嵌套 |
| `Routes` / `Route` | React Router matching | 声明 URL pattern 到 element 的匹配 | child path 重复 parent prefix |
| `Outlet` | React Router composition | layout route 渲染 child route | 忘记 Outlet 导致 child 不显示 |
| `Link` | HTML + router | client-side anchor navigation | 用 button 做页面导航 |
| `NavLink` | router active state | active link 与 `aria-current` evidence | 只做视觉 active class |
| `useNavigate` | router hook | event/effect 中 imperative navigation | render body 里直接 navigate |
| `Navigate` | router component | render branch 中 declarative redirect | 用于普通 button click |
| `useParams` | router hook | 读取 dynamic segment string | 不做 runtime parser |
| `useSearchParams` | router hook + URLSearchParams | 读取和设置 search state | mutate params 不调用 setter |

## 11. 常见错误表

| Error | Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| page tab only in `useState` | architecture | page identity should be URL-owned | use route path or search params | refresh/share/back fail |
| button used for route navigation | accessibility + semantics | navigation should expose link semantics | use `Link` or `NavLink` | no `getByRole('link')`, no open in new tab |
| `Number(params.id)` without guard | runtime parsing | URL params are strings | use parser union and not found branch | invalid URL enters detail UI |
| direct `searchParams.set` | router state | setter must create navigation | clone params and call `setSearchParams` | address bar does not update |
| nested MemoryRouter under BrowserRouter | router invariant | one Router per React tree | isolate test router or use existing router | runtime error about nested Router |
| treating protected route as security | security | browser UI cannot authorize data | enforce backend authorization | API still leaks private data |
| assuming preview equals production | deployment | preview is local build preview | verify host rewrite/base/basename | static host deep link 404 |

## 12. 最终小项目

最终小项目只用于整合本章机制，不替代前面的分节教学。前面每个 9.x 小节已经分别讲过 URL owner、route matching、params、search、redirect、identity、accessibility、deployment 和 testing 的核心边界。

### 项目目标

实现 `SellerHub Route Boundary Lab`：在 Chapter 23 页面里展示一个 isolated SellerHub route simulation，同时显示 deployment boundary card 和 route review table。

### 为什么适合本章

SellerHub 同时需要 catalog list、product detail、orders、dashboard、settings、help、login、not found、search filters 和 protected UI branch。它足够小，可以在 Vite client runtime 内运行；也足够真实，能暴露 URL design、route identity、deployment boundary 和 testing evidence。

### 最终小项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终小项目结构</span>
  </div>

```txt
sellerhub-route-boundary-lab/
  sellerhub-route-boundary-lab.tsx
  sellerhub-route-boundary-data.ts
  sellerhub-memory-router-lab.tsx
  sellerhub-route-shell.tsx
  sellerhub-route-pages.tsx
  sellerhub-link-navigation-panel.tsx
  sellerhub-param-detail-panel.tsx
  sellerhub-protected-route-panel.tsx
  sellerhub-not-found-panel.tsx
  sellerhub-deployment-boundary-card.tsx
  sellerhub-route-review-table.tsx
```
</div>

### 文件职责

| File | Responsibility |
| --- | --- |
| `sellerhub-route-boundary-lab.tsx` | final lab shell and isolated MemoryRouter mount |
| `sellerhub-memory-router-lab.tsx` | MemoryRouter route tree and demo auth state |
| `sellerhub-route-shell.tsx` | nav links, active state, shell, Outlet |
| `sellerhub-route-pages.tsx` | catalog, detail, orders, dashboard, settings, help, login pages |
| `sellerhub-protected-route-panel.tsx` | client UI redirect boundary |
| `sellerhub-deployment-boundary-card.tsx` | BrowserRouter/base/basename/rewrite/HashRouter tradeoff |
| `sellerhub-route-review-table.tsx` | URL design review evidence |

### 完整代码入口

完整可运行代码位于本章 source root。阅读顺序建议从 final lab shell 到 MemoryRouter route tree，再进入 route pages。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/sellerhub-route-boundary-lab/sellerhub-route-boundary-lab.tsx</span>
  </div>

```tsx
export function SellerHubRouteBoundaryLab() {
  return (
    <section className="sellerhub-route-lab" aria-labelledby="sellerhub-route-lab-title">
      <h2 id="sellerhub-route-lab-title">SellerHub Route Boundary Lab</h2>
      <IsolatedMemoryRouterMount />
      <SellerHubDeploymentBoundaryCard />
      <SellerHubRouteReviewTable />
    </section>
  )
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

访问 `/react/chapter-23`。

### 预期输出或交互结果

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Output</span>
  </div>

```txt
SellerHub Route Boundary Lab
SellerHub route shell
Catalog route boundary
SellerHub deployment boundary card
SellerHub route review table
```
</div>

### 核心执行流程

Chapter route 被 manifest lazy-load；practice root render 18 个 panels；final lab 发现外层已有 BrowserRouter，于是把 MemoryRouter simulation 放进独立 React root；MemoryRouter 以 `/sellerhub/catalog?channel=online` 作为 initial entry；nested route tree render shell + catalog；用户点击 link 后 in-memory history 更新，visible route content 改变。

### 常见错误

- 直接嵌套 MemoryRouter：会触发 Router invariant；
- 把 `settings` protected route 当安全机制：会漏掉 backend authorization；
- 把 deployment card 当真实部署：本章只建立 boundary model；
- 只测试 route config：不能证明用户点击和 redirect 行为。

### 可选扩展

- 给 catalog 添加 `sort` search param；
- 给 orders 添加 `status` search param；
- 给 login redirect 流程添加 role-based branch；
- 给 deployment model 添加 Netlify、Cloudflare Pages、GitHub Pages 的 host rewrite policy notes；
- 给 route tests 添加 focus repair assertion。

## 13. 额外速查表

**一句话总结：**

Routing 是 URL、history、route match、component identity、accessibility 和 deployment host 的边界协作，不是 `Route` API 列表。

| Choose | When |
| --- | --- |
| Pathname | page identity 或 entity detail identity |
| Route param | entity id 是 path identity 的一部分 |
| Search param | filter/sort/view 可分享、可刷新 |
| Hash | 页面内目标或 fragment |
| Location state | 只在 client history entry 内短期传递 |
| Link | 用户导航到 URL |
| useNavigate | event/effect 后 imperative navigation |
| Navigate | render branch redirect |
| MemoryRouter | isolated routed UI tests |
| HashRouter | host rewrite 不可用时的 tradeoff |

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: route review question</span>
  </div>

```txt
Route:
Page owner:
Entity param:
Search params:
Protected UI boundary:
Not found recovery:
Refresh behavior:
Base path:
Test evidence:
```
</div>

## 14. 工程迁移与代码审查要点

- URL design review：pathname 是否表达 page/entity identity，search 是否只保存可分享的小型 state；
- route hierarchy review：layout route 是否拥有 shared shell，child path 是否重复 parent prefix；
- link semantics review：导航是否使用 Link/NavLink，而不是 button；
- param parsing review：每个 dynamic segment 是否有 runtime parser 和 missing entity branch；
- search param review：是否 clone + setter，是否避免 secrets 和大对象；
- protected route review：是否明确 client UI boundary 与 backend authorization 分离；
- not found recovery review：unknown path、invalid param、missing entity 是否有不同 recovery evidence；
- route identity reset review：form 是否用 stable entity key reset，是否避免 unstable key；
- code splitting review：route fallback 是否表达 chunk loading，不冒充 data loading；
- navigation accessibility review：active nav、page heading、focus repair、scroll boundary 是否可测试；
- SPA deployment review：BrowserRouter deep link 是否需要 host rewrite；
- base/basename review：Vite base 与 BrowserRouter basename 是否分别评审；
- HashRouter tradeoff review：是否只有在 host rewrite 不可用时才选择；
- routed UI test evidence review：是否覆盖 initialEntries、link click、redirect、not found。

## 15. 如何转换成个人笔记

把本章整理成四张表：URL part ownership table、route hierarchy table、navigation API decision table、deployment boundary table。每张表都写一个真实 SellerHub URL，不要只写抽象定义。

## 16. 必须能回答的问题

- 为什么 routing 是 URL-to-UI synchronization？
- pathname、route param、search param、hash、location state 分别适合保存什么？
- `Link` 和 button navigation 的语义差异是什么？
- `useNavigate` 和 `Navigate` 的边界差异是什么？
- nested route 为什么不等于 child path 重复 parent path？
- TypeScript 为什么不能证明 URL param 有效？
- search params 为什么要 clone 后 setter？
- protected route 为什么不是 real authorization？
- route param 改变时，form state 什么时候 preserve，什么时候 reset？
- route-level code splitting 与 data loading fallback 有什么区别？
- BrowserRouter deep link refresh 为什么需要 host rewrite？
- Vite `base` 和 BrowserRouter `basename` 为什么不是同一个设置？
- HashRouter 解决了什么，又牺牲了什么？
- MemoryRouter test 应该断言什么用户可见 evidence？

## 17. 最终记忆模型

URL 是 route state 的公开协议。Router 读取 location，不替你设计 URL；Link 写 history entry，不替你做授权；params 是 string，不替你验证 entity；search params 是 shareable state，不替你保存 secrets；layout route 保留 shell，不替你 reset form；lazy route 加载 chunk，不替你加载 data；BrowserRouter 需要 host rewrite，不替你部署；HashRouter 是 workaround，不是默认架构；MemoryRouter 是 test harness，不应该直接嵌套进已有 Router。

## 18. 官方文档阅读清单

1. React Router `Link`、`NavLink`、`Navigate`：理解 link semantics、active state、replace/state。
2. React Router `Routes`、`Route`、`Outlet`：理解 declarative matching 与 layout composition。
3. React Router `BrowserRouter`、`MemoryRouter`、`HashRouter`：理解 router mode 与 deployment/test boundary。
4. React Router `useLocation`、`useNavigate`、`useParams`、`useSearchParams`、`useResolvedPath`、`useMatch`、`useNavigationType`：理解 route hooks 如何读取或改变 location。
5. React Router `ScrollRestoration` 与 Error Boundaries 文档：作为 route-level accessibility 和 failure boundary 阅读。
6. React Router State Management / URL Values 与 Single Page App 文档：理解 URL state 与 SPA fallback。
7. MDN `URL`、`URLSearchParams`、History API、`popstate`：理解 browser platform 层。
8. Vite Building for Production、Deploying a Static Site、Config `base`：理解 `dist`、`vite preview`、GitHub Pages subpath、public base path。
