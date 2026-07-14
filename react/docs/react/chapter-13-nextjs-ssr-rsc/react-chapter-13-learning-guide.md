# React 第 13 章：Next.js App Router、SSR、Hydration 与 Server Components

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
  - [9.1 Next.js framework boundary：为什么它不只是 router](#section-9-1)
  - [9.2 App Router file-system routing：segment、page、layout](#section-9-2)
  - [9.3 loading.tsx、error.tsx、not-found.tsx 的 route boundary](#section-9-3)
  - [9.4 Server Component 默认行为与禁止事项](#section-9-4)
  - [9.5 Client Component 与 "use client" module boundary](#section-9-5)
  - [9.6 Server -> Client props serialization boundary](#section-9-6)
  - [9.7 SSR、CSR、SSG、ISR 与 dynamic rendering](#section-9-7)
  - [9.8 Hydration 与 hydration mismatch](#section-9-8)
  - [9.9 Browser-only API guard：window、localStorage、time、random](#section-9-9)
  - [9.10 Suspense streaming 与 segment-level pending UI](#section-9-10)
  - [9.11 Server fetch、cache、revalidate 与 client fetch 的区别](#section-9-11)
  - [9.12 Route Handlers、Proxy / Middleware、Metadata 与 deployment runtime](#section-9-12)
  - [9.13 SellerHub Next.js architecture mapping](#section-9-13)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标](#121-项目目标)
  - [12.2 最终小项目结构](#122-最终小项目结构)
  - [12.3 完整代码](#123-完整代码)
  - [12.4 核心执行流程](#124-核心执行流程)
  - [12.5 Runtime、类型与工具链边界](#125-runtime类型与工具链边界)
  - [12.6 验证步骤](#126-验证步骤)
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
| Framework boundary | Next.js owns routing, server rendering, and file conventions beyond client React. | Framework runtime | The Vite learning app models the concepts without becoming a Next.js app. | `src/learning/react/chapter-13-nextjs-ssr-rsc/01-framework-boundary/framework-boundary-map.tsx` |
| Server component rule | Server components cannot use client-only hooks or browser APIs. | React Server Components boundary | SellerHub architecture separates server-readable data from client interaction. | `src/learning/react/chapter-13-nextjs-ssr-rsc/04-server-component-boundary/server-component-rule-panel.tsx` |
| Serialization boundary | Data crossing server-to-client must be serializable. | React/Next.js transport boundary | Props sent to client components must avoid functions and browser objects. | `src/learning/react/chapter-13-nextjs-ssr-rsc/06-serialization-boundary/serializable-props-panel.tsx` |
| Hydration mismatch | Client markup must match the server-rendered HTML at hydration. | Browser hydration runtime | Time, random values, and browser-only reads need explicit guards. | `src/learning/react/chapter-13-nextjs-ssr-rsc/08-hydration-mismatch/hydration-mismatch-panel.tsx` |

## 0. 本章工程问题与边界

本章解决的工程问题是：React 本身和 Next.js framework boundary 不是一回事。SSR、RSC、App Router、special files、streaming、cache 和 runtime placement 都属于框架语义，需要诚实标注边界。

本章不把当前 Vite 项目迁移为 Next.js，也不伪造 server component 真运行。边界是用可运行的模型解释 Next.js/React Server Components 的工程约束。

## 1. 本章解决的问题

本章解决的是 React 进入生产级 framework boundary 后的运行层问题：URL request、App Router segment、Server Component、Client Component、SSR、streaming、hydration、Route Handler、Proxy/Middleware、Metadata、Node/Edge runtime 和 deployment boundary 如何协同。

## 2. 前置概念

需要掌握 props、state snapshot、events、forms、effects、reducers、context、async data、React Router、Suspense、lazy、quality gates、JavaScript module graph、browser Web API、TypeScript type erasure 和 Request/Response。

## 3. 学习目标

完成本章后，你应能解释 Next.js 为什么不是 React Router 的简单替代；能读懂 App Router fixed files；能区分 Server Component 和 Client Component；能判断 serializable props；能诊断 hydration mismatch；能把 SellerHub catalog、orders、checkout、login 和 API 映射到 server/client/runtime owner。

## 4. 机制依赖图

这些依赖不是阅读顺序清单，而是本章概念成立的前置关系。

| First Understand | Then Understand | Dependency Reason | Failure If Skipped |
| --- | --- | --- | --- |
| Client React app | Framework-owned routing | 先知道普通 client React 的边界，才能理解 Next.js 接管了哪些层。 | 会把 Vite route 写法套到 App Router。 |
| Server-only code | Client component boundary | 必须先区分运行位置，才能判断 hook 和 browser API 是否可用。 | 会在 server component 中使用 client-only API。 |
| Serializable data | Server-to-client props | 跨边界传输要求可序列化。 | 会把函数、class instance 或 DOM 对象传给 client component。 |
| Server HTML | Hydration | 浏览器接管前必须匹配初始 markup。 | 会产生 hydration mismatch。 |

## 5. 核心术语表

| Term | 中文说明 | Layer | Why It Matters |
| --- | --- | --- | --- |
| App Router | file-system routing 与 server/client framework boundary。 | Next.js | 不只是 browser route matching。 |
| Server Component | 默认在 server render 中执行的 component。 | React RSC | 不进入 client bundle。 |
| Client Component | 由 `"use client"` 建立 client module entry。 | React / Next.js | 可以使用 state、effect、event、browser API。 |
| Hydration | client React 接管 server HTML。 | React DOM / Browser | first client render 必须匹配 server output。 |
| Route Handler | `route.ts` 处理 Request/Response。 | Next.js / Web API | 不是 React component。 |
| Proxy / Middleware | request 进入 route 前的 redirect/rewrite boundary。 | Next.js | Next.js 16 使用 `proxy.ts`，旧资料常称 Middleware。 |
| Metadata | server-side head/SEO boundary。 | Next.js | 不管理 client state。 |

## 6. 底层心智模型

底层链路是 `request -> route segment match -> server render -> RSC payload / HTML -> client bundle -> hydration -> interaction`。React 负责 component 语义，Next.js 负责 framework convention 和 server/client build output，browser 负责 DOM/event/storage/hydration target，TypeScript 只做 compile-time 检查，deployment runtime 决定 Node/Edge API surface。

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
  package-lock.json
  tsconfig.app.json
  eslint.config.js
  docs/react/chapter-13-nextjs-ssr-rsc/
  src/App.tsx
  src/learning/react/chapter-13-nextjs-ssr-rsc/
  references/books/react/
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
docs/react/chapter-13-nextjs-ssr-rsc/
  react-chapter-13-learning-guide.md
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
src/learning/react/chapter-13-nextjs-ssr-rsc/
  chapter-13-practice-root.tsx
  chapter-13-practice.css
  01-framework-boundary/framework-boundary-map.tsx
  02-app-router-segments/app-router-segment-tree.ts
  02-app-router-segments/app-router-segment-tree-panel.tsx
  03-route-special-files/route-special-file-boundaries.tsx
  04-server-component-boundary/server-component-rule-model.ts
  04-server-component-boundary/server-component-rule-panel.tsx
  05-client-component-boundary/client-component-boundary-panel.tsx
  06-serialization-boundary/serializable-props-boundary.ts
  06-serialization-boundary/serializable-props-panel.tsx
  07-rendering-strategies/rendering-strategy-matrix.ts
  07-rendering-strategies/rendering-strategy-panel.tsx
  08-hydration-mismatch/hydration-mismatch-lab.ts
  08-hydration-mismatch/hydration-mismatch-panel.tsx
  09-browser-api-guard/browser-api-guard-model.ts
  09-browser-api-guard/browser-api-guard-panel.tsx
  10-suspense-streaming-boundary/streaming-boundary-model.tsx
  11-server-fetch-cache/server-fetch-cache-model.ts
  11-server-fetch-cache/server-fetch-cache-panel.tsx
  12-route-runtime-boundaries/route-runtime-boundary-map.tsx
  sellerhub-nextjs-architecture-lab/
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
src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/
  sellerhub-nextjs-route-tree.ts
  sellerhub-nextjs-boundary-map.ts
  sellerhub-nextjs-architecture-lab.tsx
```
</div>

### 概念示例结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: conceptual Next.js app tree</span>
  </div>

```txt
Conceptual only. Do not create these files at D:/vite_ts root.
app/layout.tsx
app/page.tsx
app/catalog/page.tsx
app/catalog/[productId]/page.tsx
app/catalog/loading.tsx
app/catalog/error.tsx
app/seller/layout.tsx
app/seller/orders/page.tsx
app/checkout/page.tsx
app/login/page.tsx
app/not-found.tsx
app/api/orders/route.ts
proxy.ts
middleware.ts historical name in older docs
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
npm run lint
npm run typecheck
npm run test
npm run build
```
</div>

`src/App.tsx` 已按当前项目约定挂载 `/react/chapter-13`。入口文件和通用 CSS 是 adapter / shell，不作为核心机制文件展开。

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 Next.js framework boundary：为什么它不只是 router

**结论：** Next.js 是 React 的生产框架边界，不是 React Router 的文件版。

**本节解决的问题：** 区分 React、Next.js、browser、TypeScript 和 deployment owner。

**技术意义：** 这节把 framework boundary, RSC, hydration, deployment runtime 放进可运行的 Vite 练习，帮助你在写 SellerHub 前先识别 owner、boundary 和 failure mode。

**新关键字和新概念：** framework boundary, RSC, hydration, deployment runtime。

**边界拆分：** React Server Component 负责 server output；React Client Component 负责 hydrated interaction；Next.js App Router 负责 segment 和 fixed file convention；server rendering 负责 HTML/RSC payload；hydration 发生在 browser；Node/Edge runtime 决定 server API surface；TypeScript 只做 compile-time relation check；bundler 负责 module graph；deployment 决定请求入口。

**底层机制：** 访问 URL 后，Next.js 先处理 request 和 segment，Server Component 产出 HTML/RSC payload，Client Component 再 hydration。

**API / 语法规则：** 本节没有在当前 Vite 项目中运行 Next.js API，重点是 Next.js server/client boundary 和架构机制；如果出现 React API，则只用于让机制练习在 Vite 中可运行。

**固定文件名 / 固定方法名 / 参数签名：** 本节真实文件是 `src/learning/react/chapter-13-nextjs-ssr-rsc/01-framework-boundary/framework-boundary-map.tsx`。Next.js 概念文件名只作为学习结构出现，不代表当前项目根目录。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/01-framework-boundary/framework-boundary-map.tsx</span>
  </div>

```tsx
const frameworkLayers = [
  {
    layer: 'React',
    owns: 'Component model, render tree, Server Component and Client Component semantics.',
    doesNotOwn: 'File-system routing, server deployment, request middleware, or metadata files.',
  },
  {
    layer: 'Next.js',
    owns: 'App Router conventions, route segments, server rendering, streaming, and build output.',
    doesNotOwn: 'The JavaScript language or the browser DOM APIs themselves.',
  },
  {
    layer: 'Browser',
    owns: 'DOM, events, storage, history, network APIs, and hydration target nodes.',
    doesNotOwn: 'Server-only data access or route segment matching before a request is rendered.',
  },
  {
    layer: 'TypeScript',
    owns: 'Compile-time relation checks for props, route models, and serializable data shapes.',
    doesNotOwn: 'Runtime validation for request data or hydration output equality.',
  },
]

export function FrameworkBoundaryMap() {
  return (
    <section className="chapter13-panel" aria-labelledby="framework-boundary-title">
      <p className="chapter13-kicker">Framework boundary</p>
      <h2 id="framework-boundary-title">Next.js is a React framework boundary</h2>
      <p>
        React Router maps client navigation to React elements. Next.js also owns server
        rendering, route files, server and client module graphs, streaming, metadata,
        and deployment runtime decisions.
      </p>
      <div className="chapter13-grid">
        {frameworkLayers.map((layer) => (
          <article className="chapter13-card" key={layer.layer}>
            <h3>{layer.layer}</h3>
            <dl>
              <dt>Owns</dt>
              <dd>{layer.owns}</dd>
              <dt>Does not own</dt>
              <dd>{layer.doesNotOwn}</dd>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**代码逐行解释：**
- `framework-boundary-map` 先声明本节模型或数据结构，决定这个机制的 owner。
- component 或 pure function 再把模型转换为可观察输出，避免把规则藏在 prose 里。
- render 只展示模型；真实 Next.js API 没有在当前 Vite 项目中执行。

**执行过程：** Vite 路由 `/react/chapter-13` lazy-load `Chapter13PracticeRoot`，该入口渲染本节 panel。真实 Next.js 项目中，request 先进入 App Router，segment 选择 layout/page/loading/error/not-found，然后 server output 和 client reference 被发送给 browser。

**变量、引用、state snapshot、server output、client first render、serialized props、route segment、module graph、request object、response object、cache key、hydration target 的变化：** 本节把这些运行时实体压缩成显式对象字段或 React state。对象字段代表 server/request/module/cache/hydration 的证据；state 只代表当前 Vite 页面中的交互筛选或 after-hydration 更新。

**为什么得到这个结果：** 因为 owner 先于代码形态存在；同样是 TSX，放在 Server Component、Client Component、Route Handler、Proxy 或 browser effect 中，运行环境和可用 API 都不同。

**对比写法：** 错误写法是只看 JSX 表面或 URL path；正确写法是先判断 request/server/client/browser/tooling/deployment owner，再决定数据能否跨边界。

**常见错误违反了哪条规则：** 违反 server/client boundary、serializable props、first client render consistency、browser-only API guard、Route Handler non-component 或 Proxy authorization limit。

**如何识别类似错误：** 查找 server 文件中的 browser API、client graph 中的 server-only import、first render 中的 time/random/storage、不可序列化 props、或只靠 redirect 保护敏感数据的写法。

**与 SellerHub 的关系：** Catalog、ProductDetail、SellerOrders、Checkout、Login、Orders API 和 auth redirect 都需要这个边界模型来决定 first output、interactive island、BFF 和 quality gate。

**与当前 React 学习主线的关系：** 本节承接 props、state、forms、effects、reducers、async data、routing、performance 和 testing，把它们放进 Next.js framework boundary。

**本节最终记忆模型：** Next.js 是 React 的生产框架边界，不是 React Router 的文件版。

**机制证据链：** 用户访问 URL 或触发 client event；Next.js App Router 选择 segment、layout、page、loading、error 或 not-found；Server Component 生成 HTML/RSC payload 和 serialized props；Client Component module graph 进入 client bundle；browser hydration 匹配 server output 和 first client render；TypeScript 检查 source relation 但不验证外部 runtime data；错误会落成 boundary violation、serialization error、hydration mismatch、browser-only API crash 或 auth redirect bug。
<a id="section-9-2"></a>

### 9.2 App Router file-system routing：segment、page、layout

**结论：** segment 表达 URL 层级，layout 表达共享 shell，page 表达 leaf UI。

**本节解决的问题：** 理解 App Router 为什么用固定文件名组织 route branch。

**技术意义：** 这节把 route segment, layout.tsx, page.tsx, dynamic segment 放进可运行的 Vite 练习，帮助你在写 SellerHub 前先识别 owner、boundary 和 failure mode。

**新关键字和新概念：** route segment, layout.tsx, page.tsx, dynamic segment。

**边界拆分：** React Server Component 负责 server output；React Client Component 负责 hydrated interaction；Next.js App Router 负责 segment 和 fixed file convention；server rendering 负责 HTML/RSC payload；hydration 发生在 browser；Node/Edge runtime 决定 server API surface；TypeScript 只做 compile-time relation check；bundler 负责 module graph；deployment 决定请求入口。

**底层机制：** request 匹配 segment tree，layout 从根到叶子组合，page 产出当前 route output。

**API / 语法规则：** 本节没有在当前 Vite 项目中运行 Next.js API，重点是 Next.js server/client boundary 和架构机制；如果出现 React API，则只用于让机制练习在 Vite 中可运行。

**固定文件名 / 固定方法名 / 参数签名：** 本节真实文件是 `src/learning/react/chapter-13-nextjs-ssr-rsc/02-app-router-segments/app-router-segment-tree.ts`, `src/learning/react/chapter-13-nextjs-ssr-rsc/02-app-router-segments/app-router-segment-tree-panel.tsx`。Next.js 概念文件名只作为学习结构出现，不代表当前项目根目录。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/02-app-router-segments/app-router-segment-tree.ts</span>
  </div>

```ts
export type SegmentFileKind = 'layout' | 'page' | 'loading' | 'error' | 'not-found' | 'route'

export type RouteSegmentNode = {
  segment: string
  pathname: string
  files: SegmentFileKind[]
  children?: RouteSegmentNode[]
}

export type FlattenedSegment = {
  pathname: string
  segment: string
  fileList: string
  depth: number
}

export const sellerHubSegmentTree: RouteSegmentNode = {
  segment: 'app',
  pathname: '/',
  files: ['layout', 'page', 'not-found'],
  children: [
    {
      segment: 'catalog',
      pathname: '/catalog',
      files: ['page', 'loading', 'error'],
      children: [
        {
          segment: '[productId]',
          pathname: '/catalog/[productId]',
          files: ['page', 'not-found'],
        },
      ],
    },
    {
      segment: 'seller',
      pathname: '/seller',
      files: ['layout'],
      children: [
        {
          segment: 'orders',
          pathname: '/seller/orders',
          files: ['page', 'loading', 'error'],
        },
      ],
    },
    {
      segment: 'checkout',
      pathname: '/checkout',
      files: ['page'],
    },
    {
      segment: 'api/orders',
      pathname: '/api/orders',
      files: ['route'],
    },
  ],
}

export function flattenSegmentTree(
  node: RouteSegmentNode,
  depth = 0,
): FlattenedSegment[] {
  const currentSegment = {
    pathname: node.pathname,
    segment: node.segment,
    fileList: node.files.map((file) => `${file}.tsx`).join(', '),
    depth,
  }

  return [
    currentSegment,
    ...(node.children ?? []).flatMap((child) => flattenSegmentTree(child, depth + 1)),
  ]
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/02-app-router-segments/app-router-segment-tree-panel.tsx</span>
  </div>

```tsx
import {
  flattenSegmentTree,
  sellerHubSegmentTree,
} from './app-router-segment-tree'

export function AppRouterSegmentTreePanel() {
  const segments = flattenSegmentTree(sellerHubSegmentTree)

  return (
    <section className="chapter13-panel" aria-labelledby="segment-tree-title">
      <p className="chapter13-kicker">App Router</p>
      <h2 id="segment-tree-title">Route segments select layouts and pages</h2>
      <p>
        This tree is a learning model inside Vite. It mirrors an App Router structure
        without creating a real Next.js root app directory.
      </p>
      <div className="chapter13-table" role="table" aria-label="App Router segment tree">
        <div role="row" className="chapter13-table-row chapter13-table-head">
          <span role="columnheader">Pathname</span>
          <span role="columnheader">Segment</span>
          <span role="columnheader">Special files</span>
        </div>
        {segments.map((segment) => (
          <div role="row" className="chapter13-table-row" key={segment.pathname}>
            <span role="cell">{segment.pathname}</span>
            <span role="cell">{`${'  '.repeat(segment.depth)}${segment.segment}`}</span>
            <span role="cell">{segment.fileList}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
```
</div>

**代码逐行解释：**
- `app-router-segment-tree` 先声明本节模型或数据结构，决定这个机制的 owner。
- component 或 pure function 再把模型转换为可观察输出，避免把规则藏在 prose 里。
- render 只展示模型；真实 Next.js API 没有在当前 Vite 项目中执行。

**执行过程：** Vite 路由 `/react/chapter-13` lazy-load `Chapter13PracticeRoot`，该入口渲染本节 panel。真实 Next.js 项目中，request 先进入 App Router，segment 选择 layout/page/loading/error/not-found，然后 server output 和 client reference 被发送给 browser。

**变量、引用、state snapshot、server output、client first render、serialized props、route segment、module graph、request object、response object、cache key、hydration target 的变化：** 本节把这些运行时实体压缩成显式对象字段或 React state。对象字段代表 server/request/module/cache/hydration 的证据；state 只代表当前 Vite 页面中的交互筛选或 after-hydration 更新。

**为什么得到这个结果：** 因为 owner 先于代码形态存在；同样是 TSX，放在 Server Component、Client Component、Route Handler、Proxy 或 browser effect 中，运行环境和可用 API 都不同。

**对比写法：** 错误写法是只看 JSX 表面或 URL path；正确写法是先判断 request/server/client/browser/tooling/deployment owner，再决定数据能否跨边界。

**常见错误违反了哪条规则：** 违反 server/client boundary、serializable props、first client render consistency、browser-only API guard、Route Handler non-component 或 Proxy authorization limit。

**如何识别类似错误：** 查找 server 文件中的 browser API、client graph 中的 server-only import、first render 中的 time/random/storage、不可序列化 props、或只靠 redirect 保护敏感数据的写法。

**与 SellerHub 的关系：** Catalog、ProductDetail、SellerOrders、Checkout、Login、Orders API 和 auth redirect 都需要这个边界模型来决定 first output、interactive island、BFF 和 quality gate。

**与当前 React 学习主线的关系：** 本节承接 props、state、forms、effects、reducers、async data、routing、performance 和 testing，把它们放进 Next.js framework boundary。

**本节最终记忆模型：** segment 表达 URL 层级，layout 表达共享 shell，page 表达 leaf UI。

**机制证据链：** 用户访问 URL 或触发 client event；Next.js App Router 选择 segment、layout、page、loading、error 或 not-found；Server Component 生成 HTML/RSC payload 和 serialized props；Client Component module graph 进入 client bundle；browser hydration 匹配 server output 和 first client render；TypeScript 检查 source relation 但不验证外部 runtime data；错误会落成 boundary violation、serialization error、hydration mismatch、browser-only API crash 或 auth redirect bug。
<a id="section-9-3"></a>

### 9.3 loading.tsx、error.tsx、not-found.tsx 的 route boundary

**结论：** loading、error、not-found 是 route boundary，不是所有局部 UI 状态的替代。

**本节解决的问题：** 分清 pending、unexpected error 和 missing resource。

**技术意义：** 这节把 loading.tsx, error.tsx, not-found.tsx, fallback 放进可运行的 Vite 练习，帮助你在写 SellerHub 前先识别 owner、boundary 和 failure mode。

**新关键字和新概念：** loading.tsx, error.tsx, not-found.tsx, fallback。

**边界拆分：** React Server Component 负责 server output；React Client Component 负责 hydrated interaction；Next.js App Router 负责 segment 和 fixed file convention；server rendering 负责 HTML/RSC payload；hydration 发生在 browser；Node/Edge runtime 决定 server API surface；TypeScript 只做 compile-time relation check；bundler 负责 module graph；deployment 决定请求入口。

**底层机制：** segment pending 触发 loading，throw 触发 error，not-found condition 触发 not-found。

**API / 语法规则：** 本节没有在当前 Vite 项目中运行 Next.js API，重点是 Next.js server/client boundary 和架构机制；如果出现 React API，则只用于让机制练习在 Vite 中可运行。

**固定文件名 / 固定方法名 / 参数签名：** 本节真实文件是 `src/learning/react/chapter-13-nextjs-ssr-rsc/03-route-special-files/route-special-file-boundaries.tsx`。Next.js 概念文件名只作为学习结构出现，不代表当前项目根目录。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/03-route-special-files/route-special-file-boundaries.tsx</span>
  </div>

```tsx
const routeSpecialFiles = [
  {
    fileName: 'layout.tsx',
    boundary: 'Shared shell',
    trigger: 'Matched before child page output.',
    sellerHubUse: 'Seller navigation, seller account shell, and nested child segment.',
  },
  {
    fileName: 'page.tsx',
    boundary: 'Route leaf UI',
    trigger: 'Matched when URL resolves to a segment leaf.',
    sellerHubUse: 'Catalog page, product detail page, checkout page, and login page.',
  },
  {
    fileName: 'loading.tsx',
    boundary: 'Pending UI',
    trigger: 'Shown while route segment content streams in.',
    sellerHubUse: 'Catalog skeleton and seller order loading view.',
  },
  {
    fileName: 'error.tsx',
    boundary: 'Unexpected segment error fallback',
    trigger: 'Rendered after a route segment throws during rendering.',
    sellerHubUse: 'Seller order fallback with retry affordance.',
  },
  {
    fileName: 'not-found.tsx',
    boundary: 'Route-level not found UI',
    trigger: 'Rendered when route code raises a not-found condition.',
    sellerHubUse: 'Missing product detail or unknown route branch.',
  },
]

export function RouteSpecialFileBoundaries() {
  return (
    <section className="chapter13-panel" aria-labelledby="special-files-title">
      <p className="chapter13-kicker">Special files</p>
      <h2 id="special-files-title">Fixed file names express route boundaries</h2>
      <div className="chapter13-grid">
        {routeSpecialFiles.map((routeFile) => (
          <article className="chapter13-card" key={routeFile.fileName}>
            <h3>{routeFile.fileName}</h3>
            <p>{routeFile.boundary}</p>
            <dl>
              <dt>Trigger</dt>
              <dd>{routeFile.trigger}</dd>
              <dt>SellerHub</dt>
              <dd>{routeFile.sellerHubUse}</dd>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**代码逐行解释：**
- `route-special-file-boundaries` 先声明本节模型或数据结构，决定这个机制的 owner。
- component 或 pure function 再把模型转换为可观察输出，避免把规则藏在 prose 里。
- render 只展示模型；真实 Next.js API 没有在当前 Vite 项目中执行。

**执行过程：** Vite 路由 `/react/chapter-13` lazy-load `Chapter13PracticeRoot`，该入口渲染本节 panel。真实 Next.js 项目中，request 先进入 App Router，segment 选择 layout/page/loading/error/not-found，然后 server output 和 client reference 被发送给 browser。

**变量、引用、state snapshot、server output、client first render、serialized props、route segment、module graph、request object、response object、cache key、hydration target 的变化：** 本节把这些运行时实体压缩成显式对象字段或 React state。对象字段代表 server/request/module/cache/hydration 的证据；state 只代表当前 Vite 页面中的交互筛选或 after-hydration 更新。

**为什么得到这个结果：** 因为 owner 先于代码形态存在；同样是 TSX，放在 Server Component、Client Component、Route Handler、Proxy 或 browser effect 中，运行环境和可用 API 都不同。

**对比写法：** 错误写法是只看 JSX 表面或 URL path；正确写法是先判断 request/server/client/browser/tooling/deployment owner，再决定数据能否跨边界。

**常见错误违反了哪条规则：** 违反 server/client boundary、serializable props、first client render consistency、browser-only API guard、Route Handler non-component 或 Proxy authorization limit。

**如何识别类似错误：** 查找 server 文件中的 browser API、client graph 中的 server-only import、first render 中的 time/random/storage、不可序列化 props、或只靠 redirect 保护敏感数据的写法。

**与 SellerHub 的关系：** Catalog、ProductDetail、SellerOrders、Checkout、Login、Orders API 和 auth redirect 都需要这个边界模型来决定 first output、interactive island、BFF 和 quality gate。

**与当前 React 学习主线的关系：** 本节承接 props、state、forms、effects、reducers、async data、routing、performance 和 testing，把它们放进 Next.js framework boundary。

**本节最终记忆模型：** loading、error、not-found 是 route boundary，不是所有局部 UI 状态的替代。

**机制证据链：** 用户访问 URL 或触发 client event；Next.js App Router 选择 segment、layout、page、loading、error 或 not-found；Server Component 生成 HTML/RSC payload 和 serialized props；Client Component module graph 进入 client bundle；browser hydration 匹配 server output 和 first client render；TypeScript 检查 source relation 但不验证外部 runtime data；错误会落成 boundary violation、serialization error、hydration mismatch、browser-only API crash 或 auth redirect bug。
<a id="section-9-4"></a>

### 9.4 Server Component 默认行为与禁止事项

**结论：** Server Component 在 server render 中执行，不能拥有 browser interaction。

**本节解决的问题：** 避免把 server data layer 和 client event layer 混在一起。

**技术意义：** 这节把 Server Component, browser API, event handler, client boundary 放进可运行的 Vite 练习，帮助你在写 SellerHub 前先识别 owner、boundary 和 failure mode。

**新关键字和新概念：** Server Component, browser API, event handler, client boundary。

**边界拆分：** React Server Component 负责 server output；React Client Component 负责 hydrated interaction；Next.js App Router 负责 segment 和 fixed file convention；server rendering 负责 HTML/RSC payload；hydration 发生在 browser；Node/Edge runtime 决定 server API surface；TypeScript 只做 compile-time relation check；bundler 负责 module graph；deployment 决定请求入口。

**底层机制：** server render 没有 DOM、storage、effect 和 hydrated instance，只能输出 payload 或引用 Client Component。

**API / 语法规则：** 本节没有在当前 Vite 项目中运行 Next.js API，重点是 Next.js server/client boundary 和架构机制；如果出现 React API，则只用于让机制练习在 Vite 中可运行。

**固定文件名 / 固定方法名 / 参数签名：** 本节真实文件是 `src/learning/react/chapter-13-nextjs-ssr-rsc/04-server-component-boundary/server-component-rule-model.ts`, `src/learning/react/chapter-13-nextjs-ssr-rsc/04-server-component-boundary/server-component-rule-panel.tsx`。Next.js 概念文件名只作为学习结构出现，不代表当前项目根目录。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/04-server-component-boundary/server-component-rule-model.ts</span>
  </div>

```ts
export type ServerRuleStatus = 'allowed' | 'blocked'

export type ServerComponentRule = {
  capability: string
  status: ServerRuleStatus
  reason: string
}

export const serverComponentRules: ServerComponentRule[] = [
  {
    capability: 'Fetch product data before sending UI',
    status: 'allowed',
    reason: 'Server Components run during server rendering and can await server data.',
  },
  {
    capability: 'Read browser localStorage during render',
    status: 'blocked',
    reason: 'The browser storage object exists only in the browser runtime.',
  },
  {
    capability: 'Register an onClick handler',
    status: 'blocked',
    reason: 'Event handlers require client JavaScript and a hydrated browser tree.',
  },
  {
    capability: 'Use component state with useState',
    status: 'blocked',
    reason: 'Server Component output is a render result, not an interactive component instance.',
  },
  {
    capability: 'Render a Client Component boundary',
    status: 'allowed',
    reason: 'Server output can include a reference to a Client Component entry point.',
  },
]

export function countBlockedServerRules(rules: ServerComponentRule[]): number {
  return rules.filter((rule) => rule.status === 'blocked').length
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/04-server-component-boundary/server-component-rule-panel.tsx</span>
  </div>

```tsx
import {
  countBlockedServerRules,
  serverComponentRules,
} from './server-component-rule-model'

export function ServerComponentRulePanel() {
  const blockedCount = countBlockedServerRules(serverComponentRules)

  return (
    <section className="chapter13-panel" aria-labelledby="server-rule-title">
      <p className="chapter13-kicker">Server Components</p>
      <h2 id="server-rule-title">Server Components default to server-only execution</h2>
      <p>
        The model marks which capabilities belong to the server render pass and which
        require a Client Component boundary.
      </p>
      <p className="chapter13-summary">{blockedCount} capabilities require a client boundary.</p>
      <div className="chapter13-grid">
        {serverComponentRules.map((rule) => (
          <article className="chapter13-card" key={rule.capability}>
            <span className={`chapter13-pill chapter13-pill-${rule.status}`}>{rule.status}</span>
            <h3>{rule.capability}</h3>
            <p>{rule.reason}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**代码逐行解释：**
- `server-component-rule-model` 先声明本节模型或数据结构，决定这个机制的 owner。
- component 或 pure function 再把模型转换为可观察输出，避免把规则藏在 prose 里。
- render 只展示模型；真实 Next.js API 没有在当前 Vite 项目中执行。

**执行过程：** Vite 路由 `/react/chapter-13` lazy-load `Chapter13PracticeRoot`，该入口渲染本节 panel。真实 Next.js 项目中，request 先进入 App Router，segment 选择 layout/page/loading/error/not-found，然后 server output 和 client reference 被发送给 browser。

**变量、引用、state snapshot、server output、client first render、serialized props、route segment、module graph、request object、response object、cache key、hydration target 的变化：** 本节把这些运行时实体压缩成显式对象字段或 React state。对象字段代表 server/request/module/cache/hydration 的证据；state 只代表当前 Vite 页面中的交互筛选或 after-hydration 更新。

**为什么得到这个结果：** 因为 owner 先于代码形态存在；同样是 TSX，放在 Server Component、Client Component、Route Handler、Proxy 或 browser effect 中，运行环境和可用 API 都不同。

**对比写法：** 错误写法是只看 JSX 表面或 URL path；正确写法是先判断 request/server/client/browser/tooling/deployment owner，再决定数据能否跨边界。

**常见错误违反了哪条规则：** 违反 server/client boundary、serializable props、first client render consistency、browser-only API guard、Route Handler non-component 或 Proxy authorization limit。

**如何识别类似错误：** 查找 server 文件中的 browser API、client graph 中的 server-only import、first render 中的 time/random/storage、不可序列化 props、或只靠 redirect 保护敏感数据的写法。

**与 SellerHub 的关系：** Catalog、ProductDetail、SellerOrders、Checkout、Login、Orders API 和 auth redirect 都需要这个边界模型来决定 first output、interactive island、BFF 和 quality gate。

**与当前 React 学习主线的关系：** 本节承接 props、state、forms、effects、reducers、async data、routing、performance 和 testing，把它们放进 Next.js framework boundary。

**本节最终记忆模型：** Server Component 在 server render 中执行，不能拥有 browser interaction。

**机制证据链：** 用户访问 URL 或触发 client event；Next.js App Router 选择 segment、layout、page、loading、error 或 not-found；Server Component 生成 HTML/RSC payload 和 serialized props；Client Component module graph 进入 client bundle；browser hydration 匹配 server output 和 first client render；TypeScript 检查 source relation 但不验证外部 runtime data；错误会落成 boundary violation、serialization error、hydration mismatch、browser-only API crash 或 auth redirect bug。
<a id="section-9-5"></a>

### 9.5 Client Component 与 "use client" module boundary

**结论：** "use client" 标记 module entry 和 client dependency graph。

**本节解决的问题：** 控制 client bundle 规模，并让交互只进入小 island。

**技术意义：** 这节把 Client Component, "use client", module graph, client bundle 放进可运行的 Vite 练习，帮助你在写 SellerHub 前先识别 owner、boundary 和 failure mode。

**新关键字和新概念：** Client Component, "use client", module graph, client bundle。

**边界拆分：** React Server Component 负责 server output；React Client Component 负责 hydrated interaction；Next.js App Router 负责 segment 和 fixed file convention；server rendering 负责 HTML/RSC payload；hydration 发生在 browser；Node/Edge runtime 决定 server API surface；TypeScript 只做 compile-time relation check；bundler 负责 module graph；deployment 决定请求入口。

**底层机制：** bundler 从 directive module 开始标记 client graph，browser hydration 后绑定 state 和 event。

**API / 语法规则：** 本节没有在当前 Vite 项目中运行 Next.js API，重点是 Next.js server/client boundary 和架构机制；如果出现 React API，则只用于让机制练习在 Vite 中可运行。

**固定文件名 / 固定方法名 / 参数签名：** 本节真实文件是 `src/learning/react/chapter-13-nextjs-ssr-rsc/05-client-component-boundary/client-component-boundary-panel.tsx`。Next.js 概念文件名只作为学习结构出现，不代表当前项目根目录。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/05-client-component-boundary/client-component-boundary-panel.tsx</span>
  </div>

```tsx
import { useMemo, useState } from 'react'

const moduleGraph = [
  {
    moduleName: 'app/catalog/page.tsx',
    environment: 'server',
    reason: 'Default App Router page module without a client directive.',
  },
  {
    moduleName: 'app/catalog/product-filter.tsx',
    environment: 'client',
    reason: 'The file starts with a client directive and owns interactive search state.',
  },
  {
    moduleName: 'app/catalog/filter-options.ts',
    environment: 'client',
    reason: 'It is a transitive dependency of the client entry module.',
  },
]

export function ClientComponentBoundaryPanel() {
  const [selectedEnvironment, setSelectedEnvironment] = useState<'all' | 'server' | 'client'>(
    'all',
  )

  const visibleModules = useMemo(
    () =>
      moduleGraph.filter(
        (moduleItem) =>
          selectedEnvironment === 'all' || moduleItem.environment === selectedEnvironment,
      ),
    [selectedEnvironment],
  )

  return (
    <section className="chapter13-panel" aria-labelledby="client-boundary-title">
      <p className="chapter13-kicker">Client boundary</p>
      <h2 id="client-boundary-title">Client Components start at a module boundary</h2>
      <div className="chapter13-control-row" aria-label="Module graph filter">
        {(['all', 'server', 'client'] as const).map((environment) => (
          <button
            className={
              selectedEnvironment === environment
                ? 'chapter13-button chapter13-button-active'
                : 'chapter13-button'
            }
            key={environment}
            onClick={() => setSelectedEnvironment(environment)}
            type="button"
          >
            {environment}
          </button>
        ))}
      </div>
      <div className="chapter13-grid">
        {visibleModules.map((moduleItem) => (
          <article className="chapter13-card" key={moduleItem.moduleName}>
            <span className={`chapter13-pill chapter13-pill-${moduleItem.environment}`}>
              {moduleItem.environment}
            </span>
            <h3>{moduleItem.moduleName}</h3>
            <p>{moduleItem.reason}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**代码逐行解释：**
- `client-component-boundary-panel` 先声明本节模型或数据结构，决定这个机制的 owner。
- component 或 pure function 再把模型转换为可观察输出，避免把规则藏在 prose 里。
- render 只展示模型；真实 Next.js API 没有在当前 Vite 项目中执行。

**执行过程：** Vite 路由 `/react/chapter-13` lazy-load `Chapter13PracticeRoot`，该入口渲染本节 panel。真实 Next.js 项目中，request 先进入 App Router，segment 选择 layout/page/loading/error/not-found，然后 server output 和 client reference 被发送给 browser。

**变量、引用、state snapshot、server output、client first render、serialized props、route segment、module graph、request object、response object、cache key、hydration target 的变化：** 本节把这些运行时实体压缩成显式对象字段或 React state。对象字段代表 server/request/module/cache/hydration 的证据；state 只代表当前 Vite 页面中的交互筛选或 after-hydration 更新。

**为什么得到这个结果：** 因为 owner 先于代码形态存在；同样是 TSX，放在 Server Component、Client Component、Route Handler、Proxy 或 browser effect 中，运行环境和可用 API 都不同。

**对比写法：** 错误写法是只看 JSX 表面或 URL path；正确写法是先判断 request/server/client/browser/tooling/deployment owner，再决定数据能否跨边界。

**常见错误违反了哪条规则：** 违反 server/client boundary、serializable props、first client render consistency、browser-only API guard、Route Handler non-component 或 Proxy authorization limit。

**如何识别类似错误：** 查找 server 文件中的 browser API、client graph 中的 server-only import、first render 中的 time/random/storage、不可序列化 props、或只靠 redirect 保护敏感数据的写法。

**与 SellerHub 的关系：** Catalog、ProductDetail、SellerOrders、Checkout、Login、Orders API 和 auth redirect 都需要这个边界模型来决定 first output、interactive island、BFF 和 quality gate。

**与当前 React 学习主线的关系：** 本节承接 props、state、forms、effects、reducers、async data、routing、performance 和 testing，把它们放进 Next.js framework boundary。

**本节最终记忆模型：** "use client" 标记 module entry 和 client dependency graph。

**机制证据链：** 用户访问 URL 或触发 client event；Next.js App Router 选择 segment、layout、page、loading、error 或 not-found；Server Component 生成 HTML/RSC payload 和 serialized props；Client Component module graph 进入 client bundle；browser hydration 匹配 server output 和 first client render；TypeScript 检查 source relation 但不验证外部 runtime data；错误会落成 boundary violation、serialization error、hydration mismatch、browser-only API crash 或 auth redirect bug。
<a id="section-9-6"></a>

### 9.6 Server -> Client props serialization boundary

**结论：** Server -> Client props 是数据通道，不是对象引用通道。

**本节解决的问题：** 防止 function、Map、Set、Date instance 等 runtime object 跨环境。

**技术意义：** 这节把 serializable props, plain object, normalized date 放进可运行的 Vite 练习，帮助你在写 SellerHub 前先识别 owner、boundary 和 failure mode。

**新关键字和新概念：** serializable props, plain object, normalized date。

**边界拆分：** React Server Component 负责 server output；React Client Component 负责 hydrated interaction；Next.js App Router 负责 segment 和 fixed file convention；server rendering 负责 HTML/RSC payload；hydration 发生在 browser；Node/Edge runtime 决定 server API surface；TypeScript 只做 compile-time relation check；bundler 负责 module graph；deployment 决定请求入口。

**底层机制：** server output 把 props 放入可传输 payload，client first render 只能读取稳定数据形状。

**API / 语法规则：** 本节没有在当前 Vite 项目中运行 Next.js API，重点是 Next.js server/client boundary 和架构机制；如果出现 React API，则只用于让机制练习在 Vite 中可运行。

**固定文件名 / 固定方法名 / 参数签名：** 本节真实文件是 `src/learning/react/chapter-13-nextjs-ssr-rsc/06-serialization-boundary/serializable-props-boundary.ts`, `src/learning/react/chapter-13-nextjs-ssr-rsc/06-serialization-boundary/serializable-props-panel.tsx`。Next.js 概念文件名只作为学习结构出现，不代表当前项目根目录。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/06-serialization-boundary/serializable-props-boundary.ts</span>
  </div>

```ts
export type SerializableCheckResult = {
  label: string
  valueKind: string
  allowed: boolean
  reason: string
}

const unsafeConstructors = new Set(['Date', 'Map', 'Set', 'WeakMap', 'WeakSet'])

export function describeSerializableProp(label: string, value: unknown): SerializableCheckResult {
  const valueKind = getValueKind(value)
  const allowed = isProjectSafeSerializableValue(value)

  return {
    label,
    valueKind,
    allowed,
    reason: allowed
      ? 'The value can cross the server to client prop boundary in this project model.'
      : 'Convert this value to a plain string, number, boolean, null, array, or plain object first.',
  }
}

function isProjectSafeSerializableValue(value: unknown, seen = new WeakSet<object>()): boolean {
  if (value === null) {
    return true
  }

  const valueType = typeof value

  if (valueType === 'string' || valueType === 'number' || valueType === 'boolean') {
    return true
  }

  if (valueType === 'function' || valueType === 'symbol' || valueType === 'bigint') {
    return false
  }

  if (valueType === 'undefined') {
    return false
  }

  if (Array.isArray(value)) {
    return value.every((item) => isProjectSafeSerializableValue(item, seen))
  }

  if (valueType === 'object') {
    const objectValue = value as Record<string, unknown>
    const constructorName = objectValue.constructor?.name ?? 'Object'

    if (unsafeConstructors.has(constructorName)) {
      return false
    }

    if (seen.has(objectValue)) {
      return false
    }

    seen.add(objectValue)

    return Object.values(objectValue).every((item) =>
      isProjectSafeSerializableValue(item, seen),
    )
  }

  return false
}

function getValueKind(value: unknown): string {
  if (value === null) {
    return 'null'
  }

  if (Array.isArray(value)) {
    return 'array'
  }

  if (typeof value === 'object') {
    return value.constructor?.name ?? 'object'
  }

  return typeof value
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/06-serialization-boundary/serializable-props-panel.tsx</span>
  </div>

```tsx
import { describeSerializableProp } from './serializable-props-boundary'

const propChecks = [
  describeSerializableProp('Product title', 'Desk lamp'),
  describeSerializableProp('Product price', 42),
  describeSerializableProp('Filter list', ['active', 'draft']),
  describeSerializableProp('Normalized date', '2026-06-26T00:00:00.000Z'),
  describeSerializableProp('Raw Date object', new Date('2026-06-26T00:00:00.000Z')),
  describeSerializableProp('Callback prop', () => undefined),
  describeSerializableProp('Map instance', new Map([['sku', 'lamp-01']])),
]

export function SerializablePropsPanel() {
  return (
    <section className="chapter13-panel" aria-labelledby="serialization-title">
      <p className="chapter13-kicker">Serializable props</p>
      <h2 id="serialization-title">Server to Client props need a serializable shape</h2>
      <p>
        This project uses a strict JSON-like model to keep the learning boundary visible.
        Convert special runtime objects before they cross into a Client Component.
      </p>
      <div className="chapter13-grid">
        {propChecks.map((check) => (
          <article className="chapter13-card" key={check.label}>
            <span
              className={`chapter13-pill ${
                check.allowed ? 'chapter13-pill-allowed' : 'chapter13-pill-blocked'
              }`}
            >
              {check.allowed ? 'allowed' : 'blocked'}
            </span>
            <h3>{check.label}</h3>
            <p>{check.valueKind}</p>
            <p>{check.reason}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**代码逐行解释：**
- `serializable-props-boundary` 先声明本节模型或数据结构，决定这个机制的 owner。
- component 或 pure function 再把模型转换为可观察输出，避免把规则藏在 prose 里。
- render 只展示模型；真实 Next.js API 没有在当前 Vite 项目中执行。

**执行过程：** Vite 路由 `/react/chapter-13` lazy-load `Chapter13PracticeRoot`，该入口渲染本节 panel。真实 Next.js 项目中，request 先进入 App Router，segment 选择 layout/page/loading/error/not-found，然后 server output 和 client reference 被发送给 browser。

**变量、引用、state snapshot、server output、client first render、serialized props、route segment、module graph、request object、response object、cache key、hydration target 的变化：** 本节把这些运行时实体压缩成显式对象字段或 React state。对象字段代表 server/request/module/cache/hydration 的证据；state 只代表当前 Vite 页面中的交互筛选或 after-hydration 更新。

**为什么得到这个结果：** 因为 owner 先于代码形态存在；同样是 TSX，放在 Server Component、Client Component、Route Handler、Proxy 或 browser effect 中，运行环境和可用 API 都不同。

**对比写法：** 错误写法是只看 JSX 表面或 URL path；正确写法是先判断 request/server/client/browser/tooling/deployment owner，再决定数据能否跨边界。

**常见错误违反了哪条规则：** 违反 server/client boundary、serializable props、first client render consistency、browser-only API guard、Route Handler non-component 或 Proxy authorization limit。

**如何识别类似错误：** 查找 server 文件中的 browser API、client graph 中的 server-only import、first render 中的 time/random/storage、不可序列化 props、或只靠 redirect 保护敏感数据的写法。

**与 SellerHub 的关系：** Catalog、ProductDetail、SellerOrders、Checkout、Login、Orders API 和 auth redirect 都需要这个边界模型来决定 first output、interactive island、BFF 和 quality gate。

**与当前 React 学习主线的关系：** 本节承接 props、state、forms、effects、reducers、async data、routing、performance 和 testing，把它们放进 Next.js framework boundary。

**本节最终记忆模型：** Server -> Client props 是数据通道，不是对象引用通道。

**机制证据链：** 用户访问 URL 或触发 client event；Next.js App Router 选择 segment、layout、page、loading、error 或 not-found；Server Component 生成 HTML/RSC payload 和 serialized props；Client Component module graph 进入 client bundle；browser hydration 匹配 server output 和 first client render；TypeScript 检查 source relation 但不验证外部 runtime data；错误会落成 boundary violation、serialization error、hydration mismatch、browser-only API crash 或 auth redirect bug。
<a id="section-9-7"></a>

### 9.7 SSR、CSR、SSG、ISR 与 dynamic rendering

**结论：** rendering strategy 决定 first output owner，hydration 决定交互 owner。

**本节解决的问题：** 为 SellerHub catalog、orders、checkout 选择不同首屏策略。

**技术意义：** 这节把 SSR, SSG, ISR, dynamic rendering, CSR 放进可运行的 Vite 练习，帮助你在写 SellerHub 前先识别 owner、boundary 和 failure mode。

**新关键字和新概念：** SSR, SSG, ISR, dynamic rendering, CSR。

**边界拆分：** React Server Component 负责 server output；React Client Component 负责 hydrated interaction；Next.js App Router 负责 segment 和 fixed file convention；server rendering 负责 HTML/RSC payload；hydration 发生在 browser；Node/Edge runtime 决定 server API surface；TypeScript 只做 compile-time relation check；bundler 负责 module graph；deployment 决定请求入口。

**底层机制：** request/build/cache/browser 分别可能成为 first output source，client interaction 仍在 hydration 后发生。

**API / 语法规则：** 本节没有在当前 Vite 项目中运行 Next.js API，重点是 Next.js server/client boundary 和架构机制；如果出现 React API，则只用于让机制练习在 Vite 中可运行。

**固定文件名 / 固定方法名 / 参数签名：** 本节真实文件是 `src/learning/react/chapter-13-nextjs-ssr-rsc/07-rendering-strategies/rendering-strategy-matrix.ts`, `src/learning/react/chapter-13-nextjs-ssr-rsc/07-rendering-strategies/rendering-strategy-panel.tsx`。Next.js 概念文件名只作为学习结构出现，不代表当前项目根目录。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/07-rendering-strategies/rendering-strategy-matrix.ts</span>
  </div>

```ts
export type RenderingStrategy = {
  name: 'SSR' | 'SSG' | 'ISR' | 'Dynamic Rendering' | 'CSR'
  firstOutputOwner: string
  interactionOwner: string
  sellerHubFit: string
}

export const renderingStrategies: RenderingStrategy[] = [
  {
    name: 'SSR',
    firstOutputOwner: 'Server request render',
    interactionOwner: 'Hydrated Client Components',
    sellerHubFit: 'Personalized seller orders and checkout shell.',
  },
  {
    name: 'SSG',
    firstOutputOwner: 'Build-time prerender',
    interactionOwner: 'Hydrated Client Components',
    sellerHubFit: 'Marketing pages and mostly stable category pages.',
  },
  {
    name: 'ISR',
    firstOutputOwner: 'Cached static output with timed regeneration',
    interactionOwner: 'Hydrated Client Components',
    sellerHubFit: 'Catalog pages that can tolerate stale data windows.',
  },
  {
    name: 'Dynamic Rendering',
    firstOutputOwner: 'Server request render with dynamic inputs',
    interactionOwner: 'Hydrated Client Components',
    sellerHubFit: 'Dashboard summary with cookies, auth, or request-specific data.',
  },
  {
    name: 'CSR',
    firstOutputOwner: 'Browser JavaScript after boot',
    interactionOwner: 'Client React tree',
    sellerHubFit: 'Highly interactive internal widgets after an initial shell.',
  },
]
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/07-rendering-strategies/rendering-strategy-panel.tsx</span>
  </div>

```tsx
import { renderingStrategies } from './rendering-strategy-matrix'

export function RenderingStrategyPanel() {
  return (
    <section className="chapter13-panel" aria-labelledby="rendering-strategy-title">
      <p className="chapter13-kicker">Rendering strategies</p>
      <h2 id="rendering-strategy-title">SSR, SSG, ISR, dynamic rendering, and CSR own different moments</h2>
      <div className="chapter13-table" role="table" aria-label="Rendering strategies">
        <div role="row" className="chapter13-table-row chapter13-table-head">
          <span role="columnheader">Strategy</span>
          <span role="columnheader">First output</span>
          <span role="columnheader">SellerHub fit</span>
        </div>
        {renderingStrategies.map((strategy) => (
          <div role="row" className="chapter13-table-row" key={strategy.name}>
            <span role="cell">{strategy.name}</span>
            <span role="cell">{strategy.firstOutputOwner}</span>
            <span role="cell">{strategy.sellerHubFit}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
```
</div>

**代码逐行解释：**
- `rendering-strategy-matrix` 先声明本节模型或数据结构，决定这个机制的 owner。
- component 或 pure function 再把模型转换为可观察输出，避免把规则藏在 prose 里。
- render 只展示模型；真实 Next.js API 没有在当前 Vite 项目中执行。

**执行过程：** Vite 路由 `/react/chapter-13` lazy-load `Chapter13PracticeRoot`，该入口渲染本节 panel。真实 Next.js 项目中，request 先进入 App Router，segment 选择 layout/page/loading/error/not-found，然后 server output 和 client reference 被发送给 browser。

**变量、引用、state snapshot、server output、client first render、serialized props、route segment、module graph、request object、response object、cache key、hydration target 的变化：** 本节把这些运行时实体压缩成显式对象字段或 React state。对象字段代表 server/request/module/cache/hydration 的证据；state 只代表当前 Vite 页面中的交互筛选或 after-hydration 更新。

**为什么得到这个结果：** 因为 owner 先于代码形态存在；同样是 TSX，放在 Server Component、Client Component、Route Handler、Proxy 或 browser effect 中，运行环境和可用 API 都不同。

**对比写法：** 错误写法是只看 JSX 表面或 URL path；正确写法是先判断 request/server/client/browser/tooling/deployment owner，再决定数据能否跨边界。

**常见错误违反了哪条规则：** 违反 server/client boundary、serializable props、first client render consistency、browser-only API guard、Route Handler non-component 或 Proxy authorization limit。

**如何识别类似错误：** 查找 server 文件中的 browser API、client graph 中的 server-only import、first render 中的 time/random/storage、不可序列化 props、或只靠 redirect 保护敏感数据的写法。

**与 SellerHub 的关系：** Catalog、ProductDetail、SellerOrders、Checkout、Login、Orders API 和 auth redirect 都需要这个边界模型来决定 first output、interactive island、BFF 和 quality gate。

**与当前 React 学习主线的关系：** 本节承接 props、state、forms、effects、reducers、async data、routing、performance 和 testing，把它们放进 Next.js framework boundary。

**本节最终记忆模型：** rendering strategy 决定 first output owner，hydration 决定交互 owner。

**机制证据链：** 用户访问 URL 或触发 client event；Next.js App Router 选择 segment、layout、page、loading、error 或 not-found；Server Component 生成 HTML/RSC payload 和 serialized props；Client Component module graph 进入 client bundle；browser hydration 匹配 server output 和 first client render；TypeScript 检查 source relation 但不验证外部 runtime data；错误会落成 boundary violation、serialization error、hydration mismatch、browser-only API crash 或 auth redirect bug。
<a id="section-9-8"></a>

### 9.8 Hydration 与 hydration mismatch

**结论：** hydration 要求 server output 和 first client render 匹配。

**本节解决的问题：** 定位时间、随机数、storage、locale 差异造成的首帧问题。

**技术意义：** 这节把 hydrateRoot, server output, first client render, mismatch 放进可运行的 Vite 练习，帮助你在写 SellerHub 前先识别 owner、boundary 和 failure mode。

**新关键字和新概念：** hydrateRoot, server output, first client render, mismatch。

**边界拆分：** React Server Component 负责 server output；React Client Component 负责 hydrated interaction；Next.js App Router 负责 segment 和 fixed file convention；server rendering 负责 HTML/RSC payload；hydration 发生在 browser；Node/Edge runtime 决定 server API surface；TypeScript 只做 compile-time relation check；bundler 负责 module graph；deployment 决定请求入口。

**底层机制：** browser 收到 HTML，client bundle 做第一次 render，React 对齐已有 DOM 并绑定事件。

**API / 语法规则：** 本节没有在当前 Vite 项目中运行 Next.js API，重点是 Next.js server/client boundary 和架构机制；如果出现 React API，则只用于让机制练习在 Vite 中可运行。

**固定文件名 / 固定方法名 / 参数签名：** 本节真实文件是 `src/learning/react/chapter-13-nextjs-ssr-rsc/08-hydration-mismatch/hydration-mismatch-lab.ts`, `src/learning/react/chapter-13-nextjs-ssr-rsc/08-hydration-mismatch/hydration-mismatch-panel.tsx`。Next.js 概念文件名只作为学习结构出现，不代表当前项目根目录。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/08-hydration-mismatch/hydration-mismatch-lab.ts</span>
  </div>

```ts
export type HydrationCase = {
  name: string
  serverOutput: string
  clientFirstOutput: string
  cause: string
}

export type HydrationComparison = HydrationCase & {
  isMismatch: boolean
  diagnosis: string
}

export const hydrationCases: HydrationCase[] = [
  {
    name: 'Stable product count',
    serverOutput: 'Products: 12',
    clientFirstOutput: 'Products: 12',
    cause: 'Both sides use serialized server props.',
  },
  {
    name: 'Time during first render',
    serverOutput: 'Rendered at 08:00',
    clientFirstOutput: 'Rendered at 08:01',
    cause: 'The first client render reads a different clock value.',
  },
  {
    name: 'Browser storage branch',
    serverOutput: 'Theme: system',
    clientFirstOutput: 'Theme: dark',
    cause: 'The first client render reads localStorage before hydration completes.',
  },
  {
    name: 'Random badge',
    serverOutput: 'Badge: A',
    clientFirstOutput: 'Badge: B',
    cause: 'Math.random creates different markup on each environment.',
  },
]

export function compareHydrationOutput(caseItem: HydrationCase): HydrationComparison {
  const isMismatch = caseItem.serverOutput !== caseItem.clientFirstOutput

  return {
    ...caseItem,
    isMismatch,
    diagnosis: isMismatch
      ? 'Fix the first client render so it matches the server snapshot.'
      : 'Hydration can attach event logic to the existing HTML snapshot.',
  }
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/08-hydration-mismatch/hydration-mismatch-panel.tsx</span>
  </div>

```tsx
import {
  compareHydrationOutput,
  hydrationCases,
} from './hydration-mismatch-lab'

export function HydrationMismatchPanel() {
  const comparisons = hydrationCases.map(compareHydrationOutput)

  return (
    <section className="chapter13-panel" aria-labelledby="hydration-title">
      <p className="chapter13-kicker">Hydration</p>
      <h2 id="hydration-title">Hydration requires matching server and first client output</h2>
      <div className="chapter13-grid">
        {comparisons.map((comparison) => (
          <article className="chapter13-card" key={comparison.name}>
            <span
              className={`chapter13-pill ${
                comparison.isMismatch ? 'chapter13-pill-blocked' : 'chapter13-pill-allowed'
              }`}
            >
              {comparison.isMismatch ? 'mismatch' : 'match'}
            </span>
            <h3>{comparison.name}</h3>
            <p>Server: {comparison.serverOutput}</p>
            <p>Client: {comparison.clientFirstOutput}</p>
            <p>{comparison.cause}</p>
            <strong>{comparison.diagnosis}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**代码逐行解释：**
- `hydration-mismatch-lab` 先声明本节模型或数据结构，决定这个机制的 owner。
- component 或 pure function 再把模型转换为可观察输出，避免把规则藏在 prose 里。
- render 只展示模型；真实 Next.js API 没有在当前 Vite 项目中执行。

**执行过程：** Vite 路由 `/react/chapter-13` lazy-load `Chapter13PracticeRoot`，该入口渲染本节 panel。真实 Next.js 项目中，request 先进入 App Router，segment 选择 layout/page/loading/error/not-found，然后 server output 和 client reference 被发送给 browser。

**变量、引用、state snapshot、server output、client first render、serialized props、route segment、module graph、request object、response object、cache key、hydration target 的变化：** 本节把这些运行时实体压缩成显式对象字段或 React state。对象字段代表 server/request/module/cache/hydration 的证据；state 只代表当前 Vite 页面中的交互筛选或 after-hydration 更新。

**为什么得到这个结果：** 因为 owner 先于代码形态存在；同样是 TSX，放在 Server Component、Client Component、Route Handler、Proxy 或 browser effect 中，运行环境和可用 API 都不同。

**对比写法：** 错误写法是只看 JSX 表面或 URL path；正确写法是先判断 request/server/client/browser/tooling/deployment owner，再决定数据能否跨边界。

**常见错误违反了哪条规则：** 违反 server/client boundary、serializable props、first client render consistency、browser-only API guard、Route Handler non-component 或 Proxy authorization limit。

**如何识别类似错误：** 查找 server 文件中的 browser API、client graph 中的 server-only import、first render 中的 time/random/storage、不可序列化 props、或只靠 redirect 保护敏感数据的写法。

**与 SellerHub 的关系：** Catalog、ProductDetail、SellerOrders、Checkout、Login、Orders API 和 auth redirect 都需要这个边界模型来决定 first output、interactive island、BFF 和 quality gate。

**与当前 React 学习主线的关系：** 本节承接 props、state、forms、effects、reducers、async data、routing、performance 和 testing，把它们放进 Next.js framework boundary。

**本节最终记忆模型：** hydration 要求 server output 和 first client render 匹配。

**机制证据链：** 用户访问 URL 或触发 client event；Next.js App Router 选择 segment、layout、page、loading、error 或 not-found；Server Component 生成 HTML/RSC payload 和 serialized props；Client Component module graph 进入 client bundle；browser hydration 匹配 server output 和 first client render；TypeScript 检查 source relation 但不验证外部 runtime data；错误会落成 boundary violation、serialization error、hydration mismatch、browser-only API crash 或 auth redirect bug。
<a id="section-9-9"></a>

### 9.9 Browser-only API guard：window、localStorage、time、random

**结论：** browser API guard 既要防 server crash，也要防 first-frame mismatch。

**本节解决的问题：** 让 storage/theme/search preference 不破坏 hydration。

**技术意义：** 这节把 window, localStorage, useEffect, fallback 放进可运行的 Vite 练习，帮助你在写 SellerHub 前先识别 owner、boundary 和 failure mode。

**新关键字和新概念：** window, localStorage, useEffect, fallback。

**边界拆分：** React Server Component 负责 server output；React Client Component 负责 hydrated interaction；Next.js App Router 负责 segment 和 fixed file convention；server rendering 负责 HTML/RSC payload；hydration 发生在 browser；Node/Edge runtime 决定 server API surface；TypeScript 只做 compile-time relation check；bundler 负责 module graph；deployment 决定请求入口。

**底层机制：** server 和 first client render 使用同一 fallback，effect 后再读取 browser storage 并更新。

**API / 语法规则：** 本节没有在当前 Vite 项目中运行 Next.js API，重点是 Next.js server/client boundary 和架构机制；如果出现 React API，则只用于让机制练习在 Vite 中可运行。

**固定文件名 / 固定方法名 / 参数签名：** 本节真实文件是 `src/learning/react/chapter-13-nextjs-ssr-rsc/09-browser-api-guard/browser-api-guard-model.ts`, `src/learning/react/chapter-13-nextjs-ssr-rsc/09-browser-api-guard/browser-api-guard-panel.tsx`。Next.js 概念文件名只作为学习结构出现，不代表当前项目根目录。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/09-browser-api-guard/browser-api-guard-model.ts</span>
  </div>

```ts
export type StorageReader = {
  getItem: (key: string) => string | null
}

export type BrowserPreferenceResult = {
  phase: 'server-render' | 'first-client-render' | 'after-hydration'
  value: string
  source: string
}

export function readBrowserPreferenceSafely(
  storage: StorageReader | null,
  key: string,
  fallbackValue: string,
): BrowserPreferenceResult {
  if (!storage) {
    return {
      phase: 'server-render',
      value: fallbackValue,
      source: 'fallback',
    }
  }

  const storedValue = storage.getItem(key)

  return {
    phase: 'after-hydration',
    value: storedValue ?? fallbackValue,
    source: storedValue ? 'storage' : 'fallback',
  }
}

export function createFirstRenderPlan(fallbackValue: string): BrowserPreferenceResult[] {
  return [
    {
      phase: 'server-render',
      value: fallbackValue,
      source: 'fallback',
    },
    {
      phase: 'first-client-render',
      value: fallbackValue,
      source: 'fallback',
    },
  ]
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/09-browser-api-guard/browser-api-guard-panel.tsx</span>
  </div>

```tsx
import { useEffect, useState } from 'react'
import {
  createFirstRenderPlan,
  readBrowserPreferenceSafely,
} from './browser-api-guard-model'

export function BrowserApiGuardPanel() {
  const [storedPreference, setStoredPreference] = useState('system')
  const firstRenderPlan = createFirstRenderPlan('system')

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      const result = readBrowserPreferenceSafely(
        window.localStorage,
        'sellerhub-theme',
        'system',
      )

      setStoredPreference(result.value)
    }, 0)

    return () => window.clearTimeout(timerId)
  }, [])

  return (
    <section className="chapter13-panel" aria-labelledby="browser-guard-title">
      <p className="chapter13-kicker">Browser API guard</p>
      <h2 id="browser-guard-title">Browser-only APIs belong after hydration or inside client logic</h2>
      <p>
        The first server output and first client render both use the same fallback.
        Storage can update the UI after React has attached to the HTML.
      </p>
      <div className="chapter13-grid">
        {firstRenderPlan.map((step) => (
          <article className="chapter13-card" key={step.phase}>
            <h3>{step.phase}</h3>
            <p>Value: {step.value}</p>
            <p>Source: {step.source}</p>
          </article>
        ))}
        <article className="chapter13-card">
          <h3>after-hydration</h3>
          <p>Value: {storedPreference}</p>
          <p>Source: browser effect</p>
        </article>
      </div>
    </section>
  )
}
```
</div>

**代码逐行解释：**
- `browser-api-guard-model` 先声明本节模型或数据结构，决定这个机制的 owner。
- component 或 pure function 再把模型转换为可观察输出，避免把规则藏在 prose 里。
- render 只展示模型；真实 Next.js API 没有在当前 Vite 项目中执行。

**执行过程：** Vite 路由 `/react/chapter-13` lazy-load `Chapter13PracticeRoot`，该入口渲染本节 panel。真实 Next.js 项目中，request 先进入 App Router，segment 选择 layout/page/loading/error/not-found，然后 server output 和 client reference 被发送给 browser。

**变量、引用、state snapshot、server output、client first render、serialized props、route segment、module graph、request object、response object、cache key、hydration target 的变化：** 本节把这些运行时实体压缩成显式对象字段或 React state。对象字段代表 server/request/module/cache/hydration 的证据；state 只代表当前 Vite 页面中的交互筛选或 after-hydration 更新。

**为什么得到这个结果：** 因为 owner 先于代码形态存在；同样是 TSX，放在 Server Component、Client Component、Route Handler、Proxy 或 browser effect 中，运行环境和可用 API 都不同。

**对比写法：** 错误写法是只看 JSX 表面或 URL path；正确写法是先判断 request/server/client/browser/tooling/deployment owner，再决定数据能否跨边界。

**常见错误违反了哪条规则：** 违反 server/client boundary、serializable props、first client render consistency、browser-only API guard、Route Handler non-component 或 Proxy authorization limit。

**如何识别类似错误：** 查找 server 文件中的 browser API、client graph 中的 server-only import、first render 中的 time/random/storage、不可序列化 props、或只靠 redirect 保护敏感数据的写法。

**与 SellerHub 的关系：** Catalog、ProductDetail、SellerOrders、Checkout、Login、Orders API 和 auth redirect 都需要这个边界模型来决定 first output、interactive island、BFF 和 quality gate。

**与当前 React 学习主线的关系：** 本节承接 props、state、forms、effects、reducers、async data、routing、performance 和 testing，把它们放进 Next.js framework boundary。

**本节最终记忆模型：** browser API guard 既要防 server crash，也要防 first-frame mismatch。

**机制证据链：** 用户访问 URL 或触发 client event；Next.js App Router 选择 segment、layout、page、loading、error 或 not-found；Server Component 生成 HTML/RSC payload 和 serialized props；Client Component module graph 进入 client bundle；browser hydration 匹配 server output 和 first client render；TypeScript 检查 source relation 但不验证外部 runtime data；错误会落成 boundary violation、serialization error、hydration mismatch、browser-only API crash 或 auth redirect bug。
<a id="section-9-10"></a>

### 9.10 Suspense streaming 与 segment-level pending UI

**结论：** Suspense boundary 让 pending UI 有明确替换点。

**本节解决的问题：** 理解 loading.tsx 与 segment streaming 的关系。

**技术意义：** 这节把 Suspense, streaming, fallback, loading.tsx 放进可运行的 Vite 练习，帮助你在写 SellerHub 前先识别 owner、boundary 和 failure mode。

**新关键字和新概念：** Suspense, streaming, fallback, loading.tsx。

**边界拆分：** React Server Component 负责 server output；React Client Component 负责 hydrated interaction；Next.js App Router 负责 segment 和 fixed file convention；server rendering 负责 HTML/RSC payload；hydration 发生在 browser；Node/Edge runtime 决定 server API surface；TypeScript 只做 compile-time relation check；bundler 负责 module graph；deployment 决定请求入口。

**底层机制：** server work 未完成时可先输出 fallback，内容 ready 后替换，client entries 再 hydration。

**API / 语法规则：** 本节没有在当前 Vite 项目中运行 Next.js API，重点是 Next.js server/client boundary 和架构机制；如果出现 React API，则只用于让机制练习在 Vite 中可运行。

**固定文件名 / 固定方法名 / 参数签名：** 本节真实文件是 `src/learning/react/chapter-13-nextjs-ssr-rsc/10-suspense-streaming-boundary/streaming-boundary-model.tsx`。Next.js 概念文件名只作为学习结构出现，不代表当前项目根目录。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/10-suspense-streaming-boundary/streaming-boundary-model.tsx</span>
  </div>

```tsx
import { lazy, Suspense } from 'react'
import type { ComponentType } from 'react'

const SegmentPreview = lazy(() =>
  Promise.resolve<{ default: ComponentType }>({
    default: function SegmentPreviewContent() {
      return (
        <article className="chapter13-card">
          <h3>catalog/page.tsx</h3>
          <p>Segment content replaces the loading boundary when it is ready.</p>
        </article>
      )
    },
  }),
)

export function StreamingBoundaryModel() {
  return (
    <section className="chapter13-panel" aria-labelledby="streaming-title">
      <p className="chapter13-kicker">Suspense streaming</p>
      <h2 id="streaming-title">Suspense gives the route segment a pending boundary</h2>
      <p>
        The Vite demo uses React lazy to show the shape of a boundary. In Next.js,
        loading.tsx maps to a segment-level Suspense boundary while server work streams.
      </p>
      <Suspense
        fallback={
          <article className="chapter13-card">
            <h3>catalog/loading.tsx</h3>
            <p>Pending segment shell</p>
          </article>
        }
      >
        <SegmentPreview />
      </Suspense>
    </section>
  )
}
```
</div>

**代码逐行解释：**
- `streaming-boundary-model` 先声明本节模型或数据结构，决定这个机制的 owner。
- component 或 pure function 再把模型转换为可观察输出，避免把规则藏在 prose 里。
- render 只展示模型；真实 Next.js API 没有在当前 Vite 项目中执行。

**执行过程：** Vite 路由 `/react/chapter-13` lazy-load `Chapter13PracticeRoot`，该入口渲染本节 panel。真实 Next.js 项目中，request 先进入 App Router，segment 选择 layout/page/loading/error/not-found，然后 server output 和 client reference 被发送给 browser。

**变量、引用、state snapshot、server output、client first render、serialized props、route segment、module graph、request object、response object、cache key、hydration target 的变化：** 本节把这些运行时实体压缩成显式对象字段或 React state。对象字段代表 server/request/module/cache/hydration 的证据；state 只代表当前 Vite 页面中的交互筛选或 after-hydration 更新。

**为什么得到这个结果：** 因为 owner 先于代码形态存在；同样是 TSX，放在 Server Component、Client Component、Route Handler、Proxy 或 browser effect 中，运行环境和可用 API 都不同。

**对比写法：** 错误写法是只看 JSX 表面或 URL path；正确写法是先判断 request/server/client/browser/tooling/deployment owner，再决定数据能否跨边界。

**常见错误违反了哪条规则：** 违反 server/client boundary、serializable props、first client render consistency、browser-only API guard、Route Handler non-component 或 Proxy authorization limit。

**如何识别类似错误：** 查找 server 文件中的 browser API、client graph 中的 server-only import、first render 中的 time/random/storage、不可序列化 props、或只靠 redirect 保护敏感数据的写法。

**与 SellerHub 的关系：** Catalog、ProductDetail、SellerOrders、Checkout、Login、Orders API 和 auth redirect 都需要这个边界模型来决定 first output、interactive island、BFF 和 quality gate。

**与当前 React 学习主线的关系：** 本节承接 props、state、forms、effects、reducers、async data、routing、performance 和 testing，把它们放进 Next.js framework boundary。

**本节最终记忆模型：** Suspense boundary 让 pending UI 有明确替换点。

**机制证据链：** 用户访问 URL 或触发 client event；Next.js App Router 选择 segment、layout、page、loading、error 或 not-found；Server Component 生成 HTML/RSC payload 和 serialized props；Client Component module graph 进入 client bundle；browser hydration 匹配 server output 和 first client render；TypeScript 检查 source relation 但不验证外部 runtime data；错误会落成 boundary violation、serialization error、hydration mismatch、browser-only API crash 或 auth redirect bug。
<a id="section-9-11"></a>

### 9.11 Server fetch、cache、revalidate 与 client fetch 的区别

**结论：** server fetch/cache/revalidate 管 server output，client fetch 管 hydrated lifecycle。

**本节解决的问题：** 避免把第 9 章 useEffect fetch 误当 Next.js server cache。

**技术意义：** 这节把 server fetch, cache key, revalidate, client fetch 放进可运行的 Vite 练习，帮助你在写 SellerHub 前先识别 owner、boundary 和 failure mode。

**新关键字和新概念：** server fetch, cache key, revalidate, client fetch。

**边界拆分：** React Server Component 负责 server output；React Client Component 负责 hydrated interaction；Next.js App Router 负责 segment 和 fixed file convention；server rendering 负责 HTML/RSC payload；hydration 发生在 browser；Node/Edge runtime 决定 server API surface；TypeScript 只做 compile-time relation check；bundler 负责 module graph；deployment 决定请求入口。

**底层机制：** route request 生成 server cache key，serialized props 进入 client，revalidate 影响后续请求。

**API / 语法规则：** 本节没有在当前 Vite 项目中运行 Next.js API，重点是 Next.js server/client boundary 和架构机制；如果出现 React API，则只用于让机制练习在 Vite 中可运行。

**固定文件名 / 固定方法名 / 参数签名：** 本节真实文件是 `src/learning/react/chapter-13-nextjs-ssr-rsc/11-server-fetch-cache/server-fetch-cache-model.ts`, `src/learning/react/chapter-13-nextjs-ssr-rsc/11-server-fetch-cache/server-fetch-cache-panel.tsx`。Next.js 概念文件名只作为学习结构出现，不代表当前项目根目录。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/11-server-fetch-cache/server-fetch-cache-model.ts</span>
  </div>

```ts
export type FetchBoundaryStep = {
  step: string
  owner: string
  cacheKey: string
  output: string
}

export const serverFetchCacheSteps: FetchBoundaryStep[] = [
  {
    step: 'Route request',
    owner: 'Next.js App Router',
    cacheKey: '/catalog?category=lighting',
    output: 'Segment match and render plan',
  },
  {
    step: 'Server fetch',
    owner: 'Server Component',
    cacheKey: 'GET /products?category=lighting',
    output: 'Product rows and serialized props',
  },
  {
    step: 'Client interaction',
    owner: 'Client Component',
    cacheKey: 'local search draft',
    output: 'Filtered visible list after hydration',
  },
  {
    step: 'Revalidate',
    owner: 'Framework cache policy',
    cacheKey: 'catalog products tag',
    output: 'Fresh server output for later requests',
  },
]
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/11-server-fetch-cache/server-fetch-cache-panel.tsx</span>
  </div>

```tsx
import { serverFetchCacheSteps } from './server-fetch-cache-model'

export function ServerFetchCachePanel() {
  return (
    <section className="chapter13-panel" aria-labelledby="server-fetch-title">
      <p className="chapter13-kicker">Server fetch and cache</p>
      <h2 id="server-fetch-title">Server fetch is not the same boundary as client effect fetch</h2>
      <div className="chapter13-timeline">
        {serverFetchCacheSteps.map((step) => (
          <article className="chapter13-card" key={step.step}>
            <h3>{step.step}</h3>
            <p>Owner: {step.owner}</p>
            <p>Cache key: {step.cacheKey}</p>
            <p>Output: {step.output}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**代码逐行解释：**
- `server-fetch-cache-model` 先声明本节模型或数据结构，决定这个机制的 owner。
- component 或 pure function 再把模型转换为可观察输出，避免把规则藏在 prose 里。
- render 只展示模型；真实 Next.js API 没有在当前 Vite 项目中执行。

**执行过程：** Vite 路由 `/react/chapter-13` lazy-load `Chapter13PracticeRoot`，该入口渲染本节 panel。真实 Next.js 项目中，request 先进入 App Router，segment 选择 layout/page/loading/error/not-found，然后 server output 和 client reference 被发送给 browser。

**变量、引用、state snapshot、server output、client first render、serialized props、route segment、module graph、request object、response object、cache key、hydration target 的变化：** 本节把这些运行时实体压缩成显式对象字段或 React state。对象字段代表 server/request/module/cache/hydration 的证据；state 只代表当前 Vite 页面中的交互筛选或 after-hydration 更新。

**为什么得到这个结果：** 因为 owner 先于代码形态存在；同样是 TSX，放在 Server Component、Client Component、Route Handler、Proxy 或 browser effect 中，运行环境和可用 API 都不同。

**对比写法：** 错误写法是只看 JSX 表面或 URL path；正确写法是先判断 request/server/client/browser/tooling/deployment owner，再决定数据能否跨边界。

**常见错误违反了哪条规则：** 违反 server/client boundary、serializable props、first client render consistency、browser-only API guard、Route Handler non-component 或 Proxy authorization limit。

**如何识别类似错误：** 查找 server 文件中的 browser API、client graph 中的 server-only import、first render 中的 time/random/storage、不可序列化 props、或只靠 redirect 保护敏感数据的写法。

**与 SellerHub 的关系：** Catalog、ProductDetail、SellerOrders、Checkout、Login、Orders API 和 auth redirect 都需要这个边界模型来决定 first output、interactive island、BFF 和 quality gate。

**与当前 React 学习主线的关系：** 本节承接 props、state、forms、effects、reducers、async data、routing、performance 和 testing，把它们放进 Next.js framework boundary。

**本节最终记忆模型：** server fetch/cache/revalidate 管 server output，client fetch 管 hydrated lifecycle。

**机制证据链：** 用户访问 URL 或触发 client event；Next.js App Router 选择 segment、layout、page、loading、error 或 not-found；Server Component 生成 HTML/RSC payload 和 serialized props；Client Component module graph 进入 client bundle；browser hydration 匹配 server output 和 first client render；TypeScript 检查 source relation 但不验证外部 runtime data；错误会落成 boundary violation、serialization error、hydration mismatch、browser-only API crash 或 auth redirect bug。
<a id="section-9-12"></a>

### 9.12 Route Handlers、Proxy / Middleware、Metadata 与 deployment runtime

**结论：** Route Handler、Proxy、Metadata 和 runtime config 都不是 React component。

**本节解决的问题：** 把 BFF、redirect、head 和 Node/Edge API surface 放到正确层。

**技术意义：** 这节把 route.ts, GET(request), proxy.ts, middleware, metadata, edge runtime 放进可运行的 Vite 练习，帮助你在写 SellerHub 前先识别 owner、boundary 和 failure mode。

**新关键字和新概念：** route.ts, GET(request), proxy.ts, middleware, metadata, edge runtime。

**边界拆分：** React Server Component 负责 server output；React Client Component 负责 hydrated interaction；Next.js App Router 负责 segment 和 fixed file convention；server rendering 负责 HTML/RSC payload；hydration 发生在 browser；Node/Edge runtime 决定 server API surface；TypeScript 只做 compile-time relation check；bundler 负责 module graph；deployment 决定请求入口。

**底层机制：** request 先经 Proxy，再进入 route/component 或 route handler，metadata 在 server 层生成 head。

**API / 语法规则：** 本节没有在当前 Vite 项目中运行 Next.js API，重点是 Next.js server/client boundary 和架构机制；如果出现 React API，则只用于让机制练习在 Vite 中可运行。

**固定文件名 / 固定方法名 / 参数签名：** 本节真实文件是 `src/learning/react/chapter-13-nextjs-ssr-rsc/12-route-runtime-boundaries/route-runtime-boundary-map.tsx`。Next.js 概念文件名只作为学习结构出现，不代表当前项目根目录。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/12-route-runtime-boundaries/route-runtime-boundary-map.tsx</span>
  </div>

```tsx
const runtimeBoundaries = [
  {
    boundary: 'Route Handler',
    fileName: 'app/api/orders/route.ts',
    functionName: 'GET(request: Request)',
    runtime: 'Node or Edge, depending on route config and deployment adapter.',
    sellerHubRisk: 'It returns API data. It is not a React component.',
  },
  {
    boundary: 'Proxy',
    fileName: 'proxy.ts',
    functionName: 'proxy(request: NextRequest)',
    runtime: 'Runs before route rendering. Next.js 16 renamed Middleware to Proxy.',
    sellerHubRisk: 'Use it for redirects, not for complete authorization.',
  },
  {
    boundary: 'Metadata',
    fileName: 'app/catalog/[productId]/page.tsx',
    functionName: 'generateMetadata({ params })',
    runtime: 'Server render metadata boundary.',
    sellerHubRisk: 'It changes head data. It does not manage client state.',
  },
  {
    boundary: 'Runtime config',
    fileName: 'page.tsx or route.ts',
    functionName: "export const runtime = 'edge'",
    runtime: 'Edge has a smaller API surface than Node.',
    sellerHubRisk: 'Avoid Node-only libraries when a segment targets Edge.',
  },
]

export function RouteRuntimeBoundaryMap() {
  return (
    <section className="chapter13-panel" aria-labelledby="route-runtime-title">
      <p className="chapter13-kicker">Route runtime</p>
      <h2 id="route-runtime-title">Route Handlers, Proxy, Metadata, and runtime config are not UI state</h2>
      <div className="chapter13-grid">
        {runtimeBoundaries.map((boundary) => (
          <article className="chapter13-card" key={boundary.boundary}>
            <h3>{boundary.boundary}</h3>
            <dl>
              <dt>File</dt>
              <dd>{boundary.fileName}</dd>
              <dt>Signature</dt>
              <dd>{boundary.functionName}</dd>
              <dt>Runtime</dt>
              <dd>{boundary.runtime}</dd>
              <dt>Risk</dt>
              <dd>{boundary.sellerHubRisk}</dd>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
```
</div>

**代码逐行解释：**
- `route-runtime-boundary-map` 先声明本节模型或数据结构，决定这个机制的 owner。
- component 或 pure function 再把模型转换为可观察输出，避免把规则藏在 prose 里。
- render 只展示模型；真实 Next.js API 没有在当前 Vite 项目中执行。

**执行过程：** Vite 路由 `/react/chapter-13` lazy-load `Chapter13PracticeRoot`，该入口渲染本节 panel。真实 Next.js 项目中，request 先进入 App Router，segment 选择 layout/page/loading/error/not-found，然后 server output 和 client reference 被发送给 browser。

**变量、引用、state snapshot、server output、client first render、serialized props、route segment、module graph、request object、response object、cache key、hydration target 的变化：** 本节把这些运行时实体压缩成显式对象字段或 React state。对象字段代表 server/request/module/cache/hydration 的证据；state 只代表当前 Vite 页面中的交互筛选或 after-hydration 更新。

**为什么得到这个结果：** 因为 owner 先于代码形态存在；同样是 TSX，放在 Server Component、Client Component、Route Handler、Proxy 或 browser effect 中，运行环境和可用 API 都不同。

**对比写法：** 错误写法是只看 JSX 表面或 URL path；正确写法是先判断 request/server/client/browser/tooling/deployment owner，再决定数据能否跨边界。

**常见错误违反了哪条规则：** 违反 server/client boundary、serializable props、first client render consistency、browser-only API guard、Route Handler non-component 或 Proxy authorization limit。

**如何识别类似错误：** 查找 server 文件中的 browser API、client graph 中的 server-only import、first render 中的 time/random/storage、不可序列化 props、或只靠 redirect 保护敏感数据的写法。

**与 SellerHub 的关系：** Catalog、ProductDetail、SellerOrders、Checkout、Login、Orders API 和 auth redirect 都需要这个边界模型来决定 first output、interactive island、BFF 和 quality gate。

**与当前 React 学习主线的关系：** 本节承接 props、state、forms、effects、reducers、async data、routing、performance 和 testing，把它们放进 Next.js framework boundary。

**本节最终记忆模型：** Route Handler、Proxy、Metadata 和 runtime config 都不是 React component。

**机制证据链：** 用户访问 URL 或触发 client event；Next.js App Router 选择 segment、layout、page、loading、error 或 not-found；Server Component 生成 HTML/RSC payload 和 serialized props；Client Component module graph 进入 client bundle；browser hydration 匹配 server output 和 first client render；TypeScript 检查 source relation 但不验证外部 runtime data；错误会落成 boundary violation、serialization error、hydration mismatch、browser-only API crash 或 auth redirect bug。
<a id="section-9-13"></a>

### 9.13 SellerHub Next.js architecture mapping

**结论：** SellerHub 要先画 server/client/runtime 边界图，再实现页面。

**本节解决的问题：** 把 catalog、product detail、orders、checkout、login 和 API 映射到具体 owner。

**技术意义：** 这节把 SellerHub architecture, BFF, auth redirect, quality gate 放进可运行的 Vite 练习，帮助你在写 SellerHub 前先识别 owner、boundary 和 failure mode。

**新关键字和新概念：** SellerHub architecture, BFF, auth redirect, quality gate。

**边界拆分：** React Server Component 负责 server output；React Client Component 负责 hydrated interaction；Next.js App Router 负责 segment 和 fixed file convention；server rendering 负责 HTML/RSC payload；hydration 发生在 browser；Node/Edge runtime 决定 server API surface；TypeScript 只做 compile-time relation check；bundler 负责 module graph；deployment 决定请求入口。

**底层机制：** URL 进入 request boundary，segment 选 layout/page，server owner 取数据，client owner 处理交互，quality gates 验证行为。

**API / 语法规则：** 本节没有在当前 Vite 项目中运行 Next.js API，重点是 Next.js server/client boundary 和架构机制；如果出现 React API，则只用于让机制练习在 Vite 中可运行。

**固定文件名 / 固定方法名 / 参数签名：** 本节真实文件是 `src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/sellerhub-nextjs-boundary-map.ts`。Next.js 概念文件名只作为学习结构出现，不代表当前项目根目录。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/sellerhub-nextjs-boundary-map.ts</span>
  </div>

```ts
export type ArchitectureBoundary = {
  scenario: string
  serverOwner: string
  clientOwner: string
  risk: string
  qualityGate: string
}

export const sellerHubArchitectureBoundaries: ArchitectureBoundary[] = [
  {
    scenario: 'Catalog search',
    serverOwner: 'Server Component fetches initial products.',
    clientOwner: 'Client filter controls own search draft after hydration.',
    risk: 'Reading localStorage during first render can create a mismatch.',
    qualityGate: 'Component tests verify visible filters. Build verifies module boundaries.',
  },
  {
    scenario: 'Product detail',
    serverOwner: 'Dynamic segment resolves productId and can raise not-found.',
    clientOwner: 'Client island handles wishlist or compare interaction later.',
    risk: 'Returning an empty page hides missing product problems.',
    qualityGate: 'Route logic tests cover missing IDs and fallback mapping.',
  },
  {
    scenario: 'Seller orders',
    serverOwner: 'Server fetch loads initial order rows with auth context.',
    clientOwner: 'Status filter and sorting run in a hydrated island.',
    risk: 'Proxy redirect is not final authorization for sensitive data.',
    qualityGate: 'Integration tests cover protected route behavior.',
  },
  {
    scenario: 'Checkout',
    serverOwner: 'Server page can prepare stable shell and metadata.',
    clientOwner: 'Form state, validation errors, pending state, and submit events.',
    risk: 'Server Component event handlers are invalid.',
    qualityGate: 'Form behavior tests cover submit branches.',
  },
  {
    scenario: 'Order API',
    serverOwner: 'Route Handler owns Request and Response.',
    clientOwner: 'Client component consumes normalized JSON only.',
    risk: 'Route Handler is not a React component and cannot render JSX.',
    qualityGate: 'Network-boundary tests mock Request and Response behavior.',
  },
]
```
</div>

**代码逐行解释：**
- `sellerhub-nextjs-boundary-map` 先声明本节模型或数据结构，决定这个机制的 owner。
- component 或 pure function 再把模型转换为可观察输出，避免把规则藏在 prose 里。
- render 只展示模型；真实 Next.js API 没有在当前 Vite 项目中执行。

**执行过程：** Vite 路由 `/react/chapter-13` lazy-load `Chapter13PracticeRoot`，该入口渲染本节 panel。真实 Next.js 项目中，request 先进入 App Router，segment 选择 layout/page/loading/error/not-found，然后 server output 和 client reference 被发送给 browser。

**变量、引用、state snapshot、server output、client first render、serialized props、route segment、module graph、request object、response object、cache key、hydration target 的变化：** 本节把这些运行时实体压缩成显式对象字段或 React state。对象字段代表 server/request/module/cache/hydration 的证据；state 只代表当前 Vite 页面中的交互筛选或 after-hydration 更新。

**为什么得到这个结果：** 因为 owner 先于代码形态存在；同样是 TSX，放在 Server Component、Client Component、Route Handler、Proxy 或 browser effect 中，运行环境和可用 API 都不同。

**对比写法：** 错误写法是只看 JSX 表面或 URL path；正确写法是先判断 request/server/client/browser/tooling/deployment owner，再决定数据能否跨边界。

**常见错误违反了哪条规则：** 违反 server/client boundary、serializable props、first client render consistency、browser-only API guard、Route Handler non-component 或 Proxy authorization limit。

**如何识别类似错误：** 查找 server 文件中的 browser API、client graph 中的 server-only import、first render 中的 time/random/storage、不可序列化 props、或只靠 redirect 保护敏感数据的写法。

**与 SellerHub 的关系：** Catalog、ProductDetail、SellerOrders、Checkout、Login、Orders API 和 auth redirect 都需要这个边界模型来决定 first output、interactive island、BFF 和 quality gate。

**与当前 React 学习主线的关系：** 本节承接 props、state、forms、effects、reducers、async data、routing、performance 和 testing，把它们放进 Next.js framework boundary。

**本节最终记忆模型：** SellerHub 要先画 server/client/runtime 边界图，再实现页面。

**机制证据链：** 用户访问 URL 或触发 client event；Next.js App Router 选择 segment、layout、page、loading、error 或 not-found；Server Component 生成 HTML/RSC payload 和 serialized props；Client Component module graph 进入 client bundle；browser hydration 匹配 server output 和 first client render；TypeScript 检查 source relation 但不验证外部 runtime data；错误会落成 boundary violation、serialization error、hydration mismatch、browser-only API crash 或 auth redirect bug。


## 10. API / 语法索引

| API / 文件约定 | 所属层 | 固定形式 | 本章边界 |
| --- | --- | --- | --- |
| `layout.tsx` | Next.js App Router | fixed file name | shared shell |
| `page.tsx` | Next.js App Router | fixed file name | leaf UI |
| `loading.tsx` | Next.js / Suspense | fixed file name | segment pending UI |
| `error.tsx` | Next.js | fixed file name | segment error fallback |
| `not-found.tsx` | Next.js | fixed file name | route-level not found |
| `"use client"` | React / bundler | file-top directive | client module entry |
| `<Suspense fallback={...}>` | React | component API | pending boundary |
| `hydrateRoot(domNode, reactNode)` | React DOM | function call | hydration existing HTML |
| `GET(request: Request)` | Route Handler | Web Request signature | BFF/API boundary |
| `proxy(request: NextRequest)` | Next.js Proxy | request function | redirect/rewrite before render |
| `generateMetadata()` | Next.js Metadata | server function | head/SEO boundary |
| `window.localStorage` | Browser Web API | browser property | not available during server render |

## 11. 常见错误表

| 错误 | 违反的规则 | 如何识别 | 修正方向 |
| --- | --- | --- | --- |
| 把 Next.js 当 React Router 文件版 | framework boundary 被压扁 | 只讨论 URL，不讨论 server/client graph | 先画 request -> segment -> server output -> hydration |
| Server Component 使用 `useState` / `useEffect` | Server Component 没有 hydrated instance | server file 同时处理 click | 拆出 Client Component |
| 根 layout 写 `"use client"` | client module boundary 过大 | 大量 server-only code 进 client graph | 只标记交互入口 |
| Server -> Client 传 function / Map / Set | props 不可序列化 | TS 通过但 runtime boundary 不稳定 | 转成 plain data |
| render 中读 time/random/storage | first client render 不匹配 | hydration warning 或 UI 闪变 | 用 server props 或 effect 后更新 |
| Route Handler 返回 JSX | Request/Response 不是 UI | `route.ts` 像 component | 返回 `Response` 或 JSON |
| Proxy/Middleware 做完整权限 | redirect 不等于 authorization | 只隐藏 UI，API 仍泄露 | server data boundary 校验 |
| 在 Vite 项目安装 Next.js | 项目定位被破坏 | package 增加 `next` 或 root 出现 `app/` | 本章只做机制模拟 |

## 12. 最终小项目

最终小项目只用于整合本章机制，不替代前面的分节教学。

### 12.1 项目目标

`SellerHub Next.js Architecture Lab` 用真实 Vite 源码模拟 conceptual app router tree、layout/page/loading/error/not-found mapping、server component data boundary、client component interaction boundary、`"use client"` module boundary、serialized props、hydration mismatch、browser API guard、Route Handler BFF、Proxy/Middleware redirect、Metadata、Node/Edge runtime 和 Chapter 12 quality gate。

### 12.2 最终小项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终小项目结构</span>
  </div>

```txt
src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/
  sellerhub-nextjs-route-tree.ts
  sellerhub-nextjs-boundary-map.ts
  sellerhub-nextjs-architecture-lab.tsx
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: conceptual SellerHub App Router tree</span>
  </div>

```txt
Conceptual only. Do not create these files at D:/vite_ts root.
app/layout.tsx
app/page.tsx
app/catalog/page.tsx
app/catalog/[productId]/page.tsx
app/catalog/loading.tsx
app/catalog/error.tsx
app/seller/layout.tsx
app/seller/orders/page.tsx
app/checkout/page.tsx
app/login/page.tsx
app/not-found.tsx
app/api/orders/route.ts
proxy.ts
middleware.ts historical name in older docs
```
</div>

### 12.3 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/sellerhub-nextjs-route-tree.ts</span>
  </div>

```ts
export type SellerHubRouteKind =
  | 'layout'
  | 'page'
  | 'loading'
  | 'error'
  | 'not-found'
  | 'route-handler'
  | 'proxy'
  | 'metadata'

export type SellerHubRouteNode = {
  conceptualPath: string
  kind: SellerHubRouteKind
  owner: string
  boundary: string
}

export const sellerHubRouteTree: SellerHubRouteNode[] = [
  {
    conceptualPath: 'app/layout.tsx',
    kind: 'layout',
    owner: 'Server Component',
    boundary: 'Application shell and shared metadata defaults.',
  },
  {
    conceptualPath: 'app/page.tsx',
    kind: 'page',
    owner: 'Server Component',
    boundary: 'Public landing route.',
  },
  {
    conceptualPath: 'app/catalog/page.tsx',
    kind: 'page',
    owner: 'Server Component',
    boundary: 'Initial product list fetch and serialized filter defaults.',
  },
  {
    conceptualPath: 'app/catalog/loading.tsx',
    kind: 'loading',
    owner: 'Route segment',
    boundary: 'Instant pending UI while catalog content streams.',
  },
  {
    conceptualPath: 'app/catalog/error.tsx',
    kind: 'error',
    owner: 'Client Component',
    boundary: 'Unexpected catalog segment fallback and retry.',
  },
  {
    conceptualPath: 'app/catalog/[productId]/page.tsx',
    kind: 'page',
    owner: 'Server Component',
    boundary: 'Dynamic product route with productId params.',
  },
  {
    conceptualPath: 'app/catalog/[productId]/not-found.tsx',
    kind: 'not-found',
    owner: 'Route segment',
    boundary: 'Missing product UI.',
  },
  {
    conceptualPath: 'app/seller/layout.tsx',
    kind: 'layout',
    owner: 'Server Component',
    boundary: 'Seller workspace shell and nested route outlet.',
  },
  {
    conceptualPath: 'app/seller/orders/page.tsx',
    kind: 'page',
    owner: 'Server Component',
    boundary: 'Initial seller orders fetch and serialized summary props.',
  },
  {
    conceptualPath: 'app/checkout/page.tsx',
    kind: 'page',
    owner: 'Client Component island',
    boundary: 'Checkout form draft and event handlers.',
  },
  {
    conceptualPath: 'app/login/page.tsx',
    kind: 'page',
    owner: 'Client Component island',
    boundary: 'Login form interaction and redirect target.',
  },
  {
    conceptualPath: 'app/api/orders/route.ts',
    kind: 'route-handler',
    owner: 'BFF route boundary',
    boundary: 'Request and Response API for order data.',
  },
  {
    conceptualPath: 'proxy.ts',
    kind: 'proxy',
    owner: 'Request boundary',
    boundary: 'Redirect unauthenticated seller paths before route render.',
  },
  {
    conceptualPath: 'generateMetadata()',
    kind: 'metadata',
    owner: 'Server metadata boundary',
    boundary: 'Product title, description, and social preview data.',
  },
]
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/sellerhub-nextjs-boundary-map.ts</span>
  </div>

```ts
export type ArchitectureBoundary = {
  scenario: string
  serverOwner: string
  clientOwner: string
  risk: string
  qualityGate: string
}

export const sellerHubArchitectureBoundaries: ArchitectureBoundary[] = [
  {
    scenario: 'Catalog search',
    serverOwner: 'Server Component fetches initial products.',
    clientOwner: 'Client filter controls own search draft after hydration.',
    risk: 'Reading localStorage during first render can create a mismatch.',
    qualityGate: 'Component tests verify visible filters. Build verifies module boundaries.',
  },
  {
    scenario: 'Product detail',
    serverOwner: 'Dynamic segment resolves productId and can raise not-found.',
    clientOwner: 'Client island handles wishlist or compare interaction later.',
    risk: 'Returning an empty page hides missing product problems.',
    qualityGate: 'Route logic tests cover missing IDs and fallback mapping.',
  },
  {
    scenario: 'Seller orders',
    serverOwner: 'Server fetch loads initial order rows with auth context.',
    clientOwner: 'Status filter and sorting run in a hydrated island.',
    risk: 'Proxy redirect is not final authorization for sensitive data.',
    qualityGate: 'Integration tests cover protected route behavior.',
  },
  {
    scenario: 'Checkout',
    serverOwner: 'Server page can prepare stable shell and metadata.',
    clientOwner: 'Form state, validation errors, pending state, and submit events.',
    risk: 'Server Component event handlers are invalid.',
    qualityGate: 'Form behavior tests cover submit branches.',
  },
  {
    scenario: 'Order API',
    serverOwner: 'Route Handler owns Request and Response.',
    clientOwner: 'Client component consumes normalized JSON only.',
    risk: 'Route Handler is not a React component and cannot render JSX.',
    qualityGate: 'Network-boundary tests mock Request and Response behavior.',
  },
]
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-13-nextjs-ssr-rsc/sellerhub-nextjs-architecture-lab/sellerhub-nextjs-architecture-lab.tsx</span>
  </div>

```tsx
import { sellerHubArchitectureBoundaries } from './sellerhub-nextjs-boundary-map'
import { sellerHubRouteTree } from './sellerhub-nextjs-route-tree'

export function SellerHubNextjsArchitectureLab() {
  return (
    <section className="chapter13-panel chapter13-final-project" aria-labelledby="sellerhub-lab-title">
      <p className="chapter13-kicker">Final mini project</p>
      <h2 id="sellerhub-lab-title">SellerHub Next.js Architecture Lab</h2>
      <p>
        This lab is an architecture simulation inside the Vite learning project. It
        does not create a real Next.js app, install Next.js, or add a root app directory.
      </p>

      <div className="chapter13-section-split">
        <article className="chapter13-card">
          <h3>Conceptual route tree</h3>
          <ul className="chapter13-list">
            {sellerHubRouteTree.map((routeNode) => (
              <li key={routeNode.conceptualPath}>
                <strong>{routeNode.conceptualPath}</strong>
                <span>{routeNode.kind}</span>
                <span>{routeNode.boundary}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="chapter13-card">
          <h3>Server and client boundary map</h3>
          <ul className="chapter13-list">
            {sellerHubArchitectureBoundaries.map((boundary) => (
              <li key={boundary.scenario}>
                <strong>{boundary.scenario}</strong>
                <span>{boundary.serverOwner}</span>
                <span>{boundary.clientOwner}</span>
                <span>{boundary.risk}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
```
</div>

### 12.4 核心执行流程

Vite route `/react/chapter-13` 加载 `Chapter13PracticeRoot`，最终小项目读取 `sellerHubRouteTree` 和 `sellerHubArchitectureBoundaries` 并渲染 route tree 与 boundary map。真实 Next.js 项目中，对应流程是 Proxy 处理 request，App Router 匹配 segment，Server Component 获取初始数据，Client Component 接管交互 island，Route Handler 处理 BFF request，Metadata 输出 head。

### 12.5 Runtime、类型与工具链边界

JavaScript runtime 执行数组映射和 component function；React 渲染当前 Vite UI；browser 承载 DOM、event 和 storage；TypeScript 检查 `SellerHubRouteNode` 与 `ArchitectureBoundary`；Vite/ESLint/Vitest/build 验证当前练习。Next.js 的 RSC payload、Route Handler、Proxy 和 Metadata 在本章是机制模拟。

### 12.6 验证步骤

运行 `npm run lint`、`npm run typecheck`、`npm run test` 和 `npm run build`。本章不新增依赖，也不创建真实 Next.js 根项目。

## 13. 额外速查表

| 判断问题 | 快速答案 |
| --- | --- |
| 这是当前 Vite 根项目真实 Next.js app 吗？ | 不是。 |
| `"use client"` 是否让整个 app 变 client？ | 不是，只标记 module entry 和依赖图。 |
| Hydration mismatch 的核心原因是什么？ | server output 和 first client render 不一致。 |
| `typeof window` 是否总能解决 mismatch？ | 不能，只防 crash，不保证第一帧一致。 |
| Route Handler 是否返回 JSX？ | 不应返回 JSX。 |
| Proxy/Middleware 是否等于权限安全？ | 不等于，敏感数据仍要 server 校验。 |

## 14. 工程迁移与代码审查要点

### Code review questions

- 这段代码运行在 server、client、edge，还是 build-time？
- 跨 server/client 边界的数据是否可序列化？
- browser API 是否被 client boundary 或 effect guard 包住？

### Migration checks

- 从 Vite 迁移到 Next.js 前，先画出 route segment、server data 和 client interaction 边界。
- 不要把每个组件都加 `'use client'`；先定位真正需要交互或 browser API 的叶子。
- 把 framework-only API 标为边界知识，不在 Vite 示例里伪造运行。

### Production risk signals

- hydration warning，检查时间、随机数、localStorage、window 读取。
- server component 报 hook 错误，检查 client boundary。
- bundle 变大，检查是否过度扩大 client component 范围。

## 15. 如何转换成个人笔记

把每节压缩为 `owner -> boundary rule -> SellerHub risk -> evidence file`。不要只背文件名，要写出 server output、client first render、serialized props 和 hydration target 如何变化。

## 16. 必须能回答的问题

1. Next.js 为什么不是 React Router 的文件版本？
2. `layout.tsx`、`page.tsx`、`loading.tsx`、`error.tsx`、`not-found.tsx` 分别表达什么？
3. Server Component 为什么不能使用 state、effect、event handler 或 browser API？
4. `"use client"` 的 module boundary 到底影响什么？
5. Server -> Client props 为什么需要可序列化？
6. SSR、SSG、ISR、dynamic rendering 和 CSR 的 first output owner 有什么区别？
7. Hydration mismatch 为什么发生？
8. Route Handler、Proxy/Middleware、Metadata、Node/Edge runtime 分别属于哪一层？
9. SellerHub catalog、product detail、seller orders、checkout、login 和 orders API 如何分配 owner？

## 17. 最终记忆模型

Next.js App Router 的核心链路是 request 进入 framework boundary，segment 和 fixed file 生成 server render plan，Server Component 产出 HTML/RSC payload，Client Component 通过 `"use client"` 进入 browser bundle，props 必须可序列化，browser hydration 用 first client render 接管 server HTML。任何读取 browser-only API、生成随机/时间输出、传不可序列化对象、混淆 Route Handler 与 component、或把 Proxy 当完整权限安全的写法，都会破坏这条链。

## 18. 官方文档阅读清单

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Next.js Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Next.js `use client` Directive](https://nextjs.org/docs/app/api-reference/directives/use-client)
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Next.js `loading.js`](https://nextjs.org/docs/app/api-reference/file-conventions/loading)
- [Next.js `error.js`](https://nextjs.org/docs/app/api-reference/file-conventions/error)
- [Next.js `not-found.js`](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
- [Next.js Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers)
- [Next.js Proxy file convention](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)
- [Next.js Middleware compatibility page](https://nextjs.org/docs/app/api-reference/file-conventions/middleware)
- [Next.js Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Next.js Caching and Revalidating](https://nextjs.org/docs/app/getting-started/caching-and-revalidating)
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [React `use client`](https://react.dev/reference/rsc/use-client)
- [React DOM `hydrateRoot`](https://react.dev/reference/react-dom/client/hydrateRoot)
- [React `Suspense`](https://react.dev/reference/react/Suspense)
- [TypeScript Handbook: The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [MDN `Window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- Local supporting reference: `references/books/react/full-stack-react-projects.pdf` includes older SSR/hydration topics; it is supporting material only.
- Local supporting reference: `references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf` had no relevant `Next.js` / `SSR` / `hydration` hits in the first 80 pages checked for this chapter.
