# Next.js + Vercel + 现代工具链精通路线图：从 Routing 到生产级全栈部署

> 目标：这份路线图用于 `nextjs learning` 项目。它不是普通 Next.js API 清单，而是把 Next.js 官方能力边界、Vercel 生产部署、现代前端工具链、全栈 API、测试、观测、缓存、性能和求职标准合并成一个可执行学习路径。  
> 核心判断：Next.js 不是“React 路由库”，而是一个 React full-stack framework。精通 Next.js 的关键不是会写 `page.tsx`，而是能解释代码运行在 server、client、edge、build time、request time、cache layer、CDN 还是 deployment platform，并能把这些边界做成稳定项目。

---

## 目录

- [0. 路线图定位](#0-路线图定位)
- [1. 最终能力目标](#1-最终能力目标)
- [2. 三个判断维度](#2-三个判断维度)
- [3. Next.js 精通分级标准](#3-nextjs-精通分级标准)
- [4. 能力地图：从 Routing 到 Deployment](#4-能力地图从-routing-到-deployment)
- [5. 工具链层级：从会用到精通](#5-工具链层级从会用到精通)
- [6. 总体学习路径](#6-总体学习路径)
- [7. Phase 1：Next.js 定位、项目结构与运行边界](#7-phase-1nextjs-定位项目结构与运行边界)
- [8. Phase 2：App Router、Routing 与 Layout 架构](#8-phase-2app-routerrouting-与-layout-架构)
- [9. Phase 3：Server Components、Client Components 与 Hydration](#9-phase-3server-componentsclient-components-与-hydration)
- [10. Phase 4：Rendering、Streaming、Suspense 与页面生成策略](#10-phase-4renderingstreamingsuspense-与页面生成策略)
- [11. Phase 5：Data Fetching、Caching 与 Revalidation](#11-phase-5data-fetchingcaching-与-revalidation)
- [12. Phase 6：Mutations、Server Actions、Forms 与 Optimistic UI](#12-phase-6mutationsserver-actionsforms-与-optimistic-ui)
- [13. Phase 7：Route Handlers、BFF 与全栈 API 边界](#13-phase-7route-handlersbff-与全栈-api-边界)
- [14. Phase 8：Auth、Session、Cookies、Middleware / Proxy 与安全边界](#14-phase-8authsessioncookiesmiddleware--proxy-与安全边界)
- [15. Phase 9：Database、ORM、External Services 与运行时选择](#15-phase-9databaseormexternal-services-与运行时选择)
- [16. Phase 10：Metadata、SEO、Images、Fonts、Scripts 与 Web 性能](#16-phase-10metadataseoimagesfontsscripts-与-web-性能)
- [17. Phase 11：Error、Loading、Not Found、Unauthorized 与用户状态边界](#17-phase-11errorloadingnot-foundunauthorized-与用户状态边界)
- [18. Phase 12：Testing、Mocking、CI 与质量门禁](#18-phase-12testingmockingci-与质量门禁)
- [19. Phase 13：Vercel 部署、Preview Workflow、Environment 与 Rollback](#19-phase-13vercel-部署preview-workflowenvironment-与-rollback)
- [20. Phase 14：Observability、Web Vitals、Logs、Tracing 与线上排查](#20-phase-14observabilityweb-vitalslogstracing-与线上排查)
- [21. Phase 15：现代工具链、Turbopack、Bundle、Monorepo 与 Turborepo](#21-phase-15现代工具链turbopackbundlemonorepo-与-turborepo)
- [22. Phase 16：高级架构：Microfrontends、Multi-zones、Edge、CDN 与平台化](#22-phase-16高级架构microfrontendsmulti-zonesedgecdn-与平台化)
- [23. 最终项目路线](#23-最终项目路线)
- [24. 面试验收题库](#24-面试验收题库)
- [25. 简历表达标准](#25-简历表达标准)
- [26. 每周学习节奏](#26-每周学习节奏)
- [27. 学习指导文件生成规则](#27-学习指导文件生成规则)
- [28. 资料使用顺序](#28-资料使用顺序)
- [29. 最终验收标准](#29-最终验收标准)

---

## 0. 路线图定位

这份路线图服务于一个目标：

```txt
把 Next.js 从“会写页面和部署”学到“能设计、交付、部署、优化、排查生产级全栈 React 应用”。
```

Next.js 学习的核心不是背 API，而是建立六个边界：

```txt
Routing boundary:
  URL 如何映射到页面、布局、slot、modal、route handler。

Rendering boundary:
  页面是在 build time、request time、server streaming 还是 client runtime 生成。

Server / Client boundary:
  哪些代码只在 server，哪些代码进入 browser bundle。

Data / Cache boundary:
  数据从哪里来，缓存在哪里，什么时候失效。

API / Mutation boundary:
  Server Action、Route Handler、BFF、独立后端分别负责什么。

Deployment / Tooling boundary:
  Vercel、CI、env、logs、rollback、bundle、monorepo 如何让项目可交付。
```

---

## 1. 最终能力目标

学完这条路线后，你应该达到：

```txt
1. 能解释 Next.js 的定位：React full-stack framework，不是普通 SPA 脚手架。
2. 能设计 App Router 项目结构，包括 route segment、layout、template、route group、dynamic route、parallel route、intercepting route。
3. 能区分 Server Component、Client Component、Route Handler、Server Action、Middleware / Proxy、Node runtime、Edge runtime。
4. 能解释 RSC payload、hydration、streaming、Suspense boundary、static rendering、dynamic rendering、partial prerendering。
5. 能设计 data fetching、mutation、cache、revalidation、tag invalidation 和 optimistic UI。
6. 能实现全栈 API，包括 BFF、webhook、public API、server-only service、database repository、runtime validation。
7. 能实现 auth、session、cookie、permission boundary、protected route、server-side authorization。
8. 能处理 SEO、metadata、Open Graph、sitemap、robots、Image、Font、Script 和 Web Vitals。
9. 能写 component test、server action test、route handler test、E2E test、CI pipeline。
10. 能部署到 Vercel，管理 preview / production environment、environment variables、logs、rollback、domain、build errors。
11. 能使用现代工具链：TypeScript strict、ESLint、Turbopack、Webpack fallback、bundle analysis、pnpm workspace、Turborepo、monorepo shared packages。
12. 能做线上排查：runtime logs、build logs、Web Vitals、tracing、OpenTelemetry、cache miss、slow function、hydration mismatch。
13. 能在简历和面试中证明你理解 Next.js 的运行边界、缓存边界、部署边界和工具链边界。
```

---

## 2. 三个判断维度

### 2.1 官方文档维度

官方文档决定 Next.js 的真实能力边界。必须覆盖：

| 官方能力区 | 需要掌握的内容 | 为什么重要 |
|---|---|---|
| App Router | `app/`、route segment、layout、page、route group、dynamic segment | 决定项目结构和 URL 到 UI 的映射 |
| Server / Client Components | RSC、`"use client"`、client boundary、server-only code | 决定代码运行位置和 bundle 大小 |
| Rendering | static、dynamic、streaming、PPR、SSR、CSR | 决定首屏、SEO、缓存和交互体验 |
| Data Fetching | server fetch、parallel fetch、request memoization、waterfall 避免 | 决定页面数据加载性能 |
| Caching | Data Cache、Full Route Cache、Router Cache、CDN cache | 决定性能、成本和数据新鲜度 |
| Revalidation | `revalidatePath`、`revalidateTag`、tag-based invalidation | 决定 mutation 后如何更新页面 |
| Mutation | Server Actions、forms、redirect、error handling、optimistic UI | 决定用户提交如何进入 server |
| Route Handlers | `GET`、`POST`、`NextRequest`、`NextResponse`、webhook | 决定全栈 API 和 BFF 边界 |
| Metadata | static metadata、dynamic metadata、OG image、sitemap、robots | 决定 SEO 和分享体验 |
| Deployment | Vercel、self-hosting、adapter、environment、runtime | 决定生产环境可用性 |
| Tooling | TypeScript、ESLint、Turbopack、CLI、testing、OpenTelemetry | 决定团队开发和排错能力 |

### 2.2 市场情况维度

市场需要的不是单独的 Next.js，而是完整组合：

```txt
React
TypeScript
Next.js App Router
Vercel
Tailwind CSS
Prisma / Drizzle
PostgreSQL
Auth.js / Clerk / custom auth
TanStack Query
React Hook Form
zod
Vitest / Jest
React Testing Library
Playwright
MSW
Docker
CI/CD
Observability
SEO
Web performance
Monorepo
```

### 2.3 招聘需求维度

招聘不会只问：

```txt
Next.js 怎么写动态路由？
```

更常问：

```txt
Server Component 和 Client Component 的边界是什么？
"use client" 影响什么？
static rendering 和 dynamic rendering 如何判断？
Next.js fetch 为什么会影响缓存？
Data Cache、Full Route Cache、Router Cache 有什么区别？
Server Action 和 Route Handler 怎么选？
auth 应该在哪个 boundary 检查？
为什么 Prisma 不适合直接跑在 Edge runtime？
Vercel preview 和 production env 怎么区分？
线上 500 怎么看 logs？
如何 rollback production？
bundle 过大怎么查？
LCP 和 INP 怎么优化？
如何设计 monorepo 里的 shared UI package？
```

---

## 3. Next.js 精通分级标准

### Level 1：会用 Next.js

可以做到：

```txt
创建 Next.js 项目
写 app/page.tsx
写 app/layout.tsx
写 Link 和 Image
写 dynamic route
写 metadata
部署到 Vercel
```

简历只能写：

```txt
熟悉 Next.js 基础路由、页面开发和 Vercel 部署。
```

### Level 2：能做 Next.js 项目

可以做到：

```txt
使用 App Router 写完整页面
区分 Server Component 和 Client Component
写 loading、error、not-found
写 Route Handler
写 Server Action
接数据库
做登录注册
部署到 Vercel production
```

简历可以写：

```txt
熟练使用 Next.js App Router、React、TypeScript 构建全栈 Web 应用，具备 Server Component、Route Handler、Server Action 和 Vercel 部署经验。
```

### Level 3：理解 Next.js 机制

可以做到：

```txt
解释 RSC payload
解释 hydration
解释 static rendering 和 dynamic rendering
解释 streaming 和 Suspense
解释 cache layer
解释 revalidation
解释 route segment config
解释 Node runtime 和 Edge runtime
解释 server-only / client-only boundary
解释 Next.js 如何影响 browser bundle
```

简历可以写：

```txt
深入理解 Next.js App Router、React Server Components、rendering strategy、caching、revalidation、streaming 与 server/client boundary。
```

### Level 4：生产级 Next.js

可以做到：

```txt
设计大型 App Router 项目结构
设计 auth 和 permission boundary
设计 data fetching 和 mutation strategy
设计 cache invalidation
处理 SEO 和 metadata
处理 error/loading/not-found/unauthorized boundary
处理 Web Vitals
处理 Vercel preview / production workflow
处理 env 和 secret
处理 logs、metrics、traces
写 component / integration / E2E tests
做 CI/CD
做 bundle analysis
处理 security headers 和 CSP
```

简历可以写：

```txt
具备生产级 Next.js + TypeScript 应用架构设计、缓存策略、性能优化、测试、Vercel 部署和线上问题排查经验。
```

### Level 5：高级 Next.js + Vercel + 工具链

可以做到：

```txt
设计 BFF 架构
设计 multi-zone / microfrontend
设计 monorepo apps/packages
设计 shared UI package
设计 Vercel deployment workflow
设计 CDN cache strategy
设计 OpenTelemetry instrumentation
设计 feature flag / preview workflow
处理 serverless cold start 和 function duration
处理 Edge runtime 限制
处理 database connection pooling
处理 ISR / PPR / streaming tradeoff
处理 Turborepo remote cache
处理 package bundling 和 transpilePackages
处理团队级 lint / typecheck / test / build pipeline
```

简历可以写：

```txt
具备高级 Next.js / Vercel 工程化能力，能够设计全栈 React 架构、部署流水线、缓存与渲染策略、monorepo 工具链和生产级 observability。
```

---

## 4. 能力地图：从 Routing 到 Deployment

| 能力区 | 入门标准 | 熟练标准 | 精通标准 |
|---|---|---|---|
| Routing | 会写 `page.tsx` 和动态路由 | 会设计 nested layouts、route group、parallel route | 能为复杂 dashboard、modal、auth flow 设计 URL 和 UI 状态结构 |
| Rendering | 知道 SSR / SSG / CSR | 能判断 static / dynamic / streaming | 能做 PPR / Suspense / cache / CDN 的综合取舍 |
| RSC | 知道 Server / Client Component | 能拆 server-only 和 client interaction | 能控制 bundle、hydration、data boundary 和 security boundary |
| Data Fetching | 会在 Server Component 里 fetch | 能避免 waterfall，做并行加载 | 能设计请求去重、缓存策略、错误边界和性能预算 |
| Cache | 知道 revalidate | 能使用 path/tag revalidation | 能解释 Data Cache、Full Route Cache、Router Cache、CDN cache 的关系 |
| Mutation | 会写 Server Action | 能处理表单、redirect、validation、error | 能设计 optimistic UI、事务、cache invalidation、权限检查 |
| API | 会写 Route Handler | 能做 BFF、webhook、typed response | 能设计 API contract、runtime validation、rate limit、public/private API boundary |
| Auth | 会登录注册 | 能使用 session/cookie 保护页面 | 能把权限检查放在 server boundary，并避免 client-only auth |
| Deployment | 会点 Vercel deploy | 能管理 preview / production / env / logs | 能做 rollback、promote、custom domain、build cache、incident workflow |
| Tooling | 会 `npm run dev` | 能配置 TS、ESLint、tests、CI | 能做 monorepo、bundle analysis、Turbopack/Webpack 排错、remote cache |
| Observability | 会看控制台 | 能看 Vercel logs 和 Web Vitals | 能用 tracing、OpenTelemetry、alerts 定位慢页面和慢函数 |

---

## 5. 工具链层级：从会用到精通

### 5.1 TypeScript

| 层级 | 需要掌握 | 精通标准 |
|---|---|---|
| 基础 | props、params、searchParams、form data 类型 | 不把外部输入直接信任成业务类型 |
| 熟练 | route params、Server Action input、Route Handler response、zod schema | 能让 API contract、UI state、form state、server response 类型一致 |
| 精通 | typed routes、type-only imports、server-only boundary、shared package types | 能在 monorepo 中维护跨 app / package 的类型边界 |

### 5.2 ESLint / Formatting

| 层级 | 需要掌握 | 精通标准 |
|---|---|---|
| 基础 | ESLint script、Prettier | 代码风格一致 |
| 熟练 | React hooks rules、a11y rules、import order、no floating promise | PR 进入前自动失败 |
| 精通 | package-level shared config、CI gating、rule exception policy | 团队级规范可维护 |

### 5.3 Build / Bundler

| 层级 | 需要掌握 | 精通标准 |
|---|---|---|
| 基础 | `next dev`、`next build`、`next start` | 能区分 dev 和 production 行为 |
| 熟练 | Turbopack、Webpack fallback、bundle analyzer | 能查 bundle 大小、依赖重复、client bundle 泄漏 |
| 精通 | `next.config.ts`、`transpilePackages`、`serverExternalPackages`、monorepo package bundling | 能解决大型项目构建和包边界问题 |

### 5.4 Testing

| 层级 | 需要掌握 | 精通标准 |
|---|---|---|
| 基础 | Vitest / Jest、React Testing Library | 能测试组件渲染和交互 |
| 熟练 | MSW、Route Handler test、Server Action test、Playwright | 能覆盖 API、form、auth flow、E2E |
| 精通 | CI test matrix、preview deployment E2E、test database、visual regression | 能让生产发布前自动验证关键路径 |

### 5.5 Vercel CLI

| 命令 | 必须理解的用途 |
|---|---|
| `vercel dev` | 在本地模拟 Vercel deployment environment |
| `vercel pull` | 同步远端 project settings 和 environment variables 到本地 |
| `vercel env pull` | 拉取环境变量文件 |
| `vercel build` | 在本地或 CI 中构建 Vercel project |
| `vercel deploy` | 创建 deployment |
| `vercel deploy --prod` | 创建 production deployment |
| `vercel logs` | 查看 runtime logs |
| `vercel inspect` | 查看 deployment 信息 |
| `vercel promote` | 把已有 deployment 提升为当前 deployment |
| `vercel rollback` | 回滚 production deployment |
| `vercel cache` | 管理 CDN cache 和 Data Cache |
| `vercel domains` / `vercel dns` | 管理 domain 和 DNS |
| `vercel target` | 管理 custom environments 和 target deployment |

---

## 6. 总体学习路径

推荐顺序：

```txt
Phase 1: Next.js positioning, project structure, and execution boundary
Phase 2: App Router, routing, layouts, and navigation architecture
Phase 3: Server Components, Client Components, and hydration
Phase 4: Rendering, streaming, Suspense, and prerendering strategy
Phase 5: Data fetching, caching, and revalidation
Phase 6: Mutations, Server Actions, forms, and optimistic UI
Phase 7: Route Handlers, BFF, and full-stack API boundaries
Phase 8: Auth, session, cookies, middleware/proxy, and security boundary
Phase 9: Database, ORM, external services, and runtime choice
Phase 10: Metadata, SEO, images, fonts, scripts, and web performance
Phase 11: Error, loading, not-found, unauthorized, and user state boundaries
Phase 12: Testing, mocking, CI, and quality gates
Phase 13: Vercel deployment, preview workflow, environments, and rollback
Phase 14: Observability, Web Vitals, logs, tracing, and production debugging
Phase 15: Modern tooling, Turbopack, bundle analysis, monorepo, and Turborepo
Phase 16: Advanced architecture: microfrontends, multi-zones, edge, CDN, and platformization
```

学习方式：

```txt
每一章：
  1. 先判断运行边界。
  2. 再写最小可运行代码。
  3. 再写错误示例。
  4. 再观察 build / runtime / browser / network 行为。
  5. 再补缓存、权限、错误和测试。
  6. 最后做阶段小项目和 cheatsheet。
```

---

## 7. Phase 1：Next.js 定位、项目结构与运行边界

### 7.1 目标

建立 Next.js 的第一性原理：

```txt
Next.js 是 React full-stack framework。
Next.js 把 React UI、server rendering、routing、data fetching、caching、API、build、deployment 连接起来。
Next.js 项目不是所有代码都在 browser 运行。
Next.js 的核心能力来自清楚区分 server、client、edge、build、request、cache、CDN。
```

### 7.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Next.js 是什么 | 能区分 React library、Next.js framework、Vercel platform |
| Project Structure | 理解 `app/`、`public/`、`src/`、`next.config.ts`、`instrumentation.ts` |
| Execution Boundary | 能判断代码运行在 server、client、edge、build time、request time |
| File Conventions | 理解 `page.tsx`、`layout.tsx`、`route.ts`、`loading.tsx`、`error.tsx` |
| Environment | 理解 `.env.local`、server-only env、`NEXT_PUBLIC_` |
| Dev vs Build vs Start | 理解 `next dev`、`next build`、`next start` 的差别 |

### 7.3 推荐练习文件

```txt
practices/01-next-boundary/
  01-project-structure/
    app-router-file-map.md
    next-config-reading.md

  02-execution-boundary/
    server-component-env-read.tsx
    client-component-browser-api.tsx
    invalid-localstorage-server.tsx
    build-time-vs-request-time.md

  03-commands/
    next-dev-build-start.md
    package-scripts.md
```

### 7.4 小项目

```txt
next-boundary-lab
```

功能：

```txt
1. 创建 Next.js App Router 项目。
2. 输出 server component render time。
3. 输出 client component hydration time。
4. 读取 server-only env。
5. 故意在 Server Component 读取 localStorage 并记录错误。
6. 写一份 execution boundary report。
```

### 7.5 验收标准

你必须能回答：

```txt
Next.js 和 React 的关系是什么？
Next.js 和 Vercel 的关系是什么？
为什么 page.tsx 默认不是 Client Component？
什么代码会进入 browser bundle？
NEXT_PUBLIC_ 有什么含义？
next dev、next build、next start 分别做什么？
为什么开发环境行为不能完全代表生产环境？
```

---

## 8. Phase 2：App Router、Routing 与 Layout 架构

### 8.1 目标

掌握 Next.js 从 URL 到 UI 的核心映射。

### 8.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Route Segment | 文件夹即 route segment |
| Page | `page.tsx` 定义可访问 route |
| Layout | `layout.tsx` 包裹子路由并保留状态 |
| Template | 每次导航重新创建实例 |
| Dynamic Segment | `[id]`、`[...slug]`、`[[...slug]]` |
| Route Group | `(marketing)`、`(dashboard)` 只组织结构不影响 URL |
| Parallel Routes | 同时渲染多个 slot |
| Intercepting Routes | modal route、详情页拦截 |
| Navigation | `Link`、prefetch、`useRouter`、redirect |
| Search Params | URL state 和 UI state 的边界 |

### 8.3 推荐练习文件

```txt
practices/02-routing-layouts/
  01-basic-routing/
    app/page.tsx
    app/about/page.tsx
    app/products/page.tsx

  02-dynamic-routes/
    app/products/[productId]/page.tsx
    app/docs/[...slug]/page.tsx

  03-layouts/
    app/layout.tsx
    app/(marketing)/layout.tsx
    app/(dashboard)/layout.tsx

  04-advanced-routing/
    app/@modal/default.tsx
    app/@modal/(.)products/[productId]/page.tsx
    app/products/[productId]/page.tsx
```

### 8.4 小项目

```txt
dashboard-routing-lab
```

功能：

```txt
1. Marketing 路由组。
2. Dashboard 路由组。
3. Product 动态详情页。
4. Modal intercepting route。
5. Sidebar layout 状态保留。
6. URL search params 控制筛选条件。
```

### 8.5 验收标准

```txt
route group 为什么不影响 URL？
layout 和 template 的区别是什么？
为什么 layout 能保留状态？
parallel route 解决什么问题？
intercepting route 为什么适合 modal？
URL search params 和 React local state 应该怎么分工？
```

---

## 9. Phase 3：Server Components、Client Components 与 Hydration

### 9.1 目标

理解现代 Next.js 的核心边界：哪些代码在 server 执行，哪些代码进入 client bundle。

### 9.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Server Component | 默认组件，可以访问 server data，不使用 browser-only API |
| Client Component | 通过 `"use client"` 建立 client boundary |
| Client Graph | `"use client"` 文件导入的依赖会进入 client graph |
| RSC Payload | server render 的中间表示 |
| Hydration | browser 将 server HTML 和 client JS 连接起来 |
| Browser API Boundary | `window`、`document`、`localStorage` 只能在 client side 使用 |
| Props Boundary | Server Component 可以传 serializable props 给 Client Component |
| Bundle Boundary | 把交互组件尽量下沉，减少 client JS |

### 9.3 推荐练习文件

```txt
practices/03-rsc-client-boundary/
  01-server-component/
    server-data-card.tsx
    server-env-access.tsx

  02-client-component/
    interactive-counter.tsx
    local-storage-preference.tsx

  03-boundary-mistakes/
    invalid-server-use-state.tsx
    invalid-client-secret-import.tsx
    non-serializable-prop.tsx

  04-bundle-boundary/
    server-shell-client-button.tsx
    client-boundary-report.md
```

### 9.4 小项目

```txt
rsc-boundary-lab
```

功能：

```txt
1. Server Component 读取数据库 mock。
2. Client Component 处理交互。
3. Server Component 包裹 Client Component。
4. 故意传函数 prop 到 Client Component 并观察错误。
5. 记录 browser bundle 中哪些组件进入 client。
```

### 9.5 验收标准

```txt
"use client" 的真实含义是什么？
Server Component 为什么不能用 useState？
Client Component 能不能被 Server Component 渲染？
Server Component 能不能导入 Client Component？
Client Component 能不能直接导入 server-only module？
hydration mismatch 是怎么产生的？
如何减少 client bundle？
```

---

## 10. Phase 4：Rendering、Streaming、Suspense 与页面生成策略

### 10.1 目标

掌握页面什么时候生成、在哪里生成、是否缓存、如何流式返回。

### 10.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Static Rendering | build time 或缓存后复用 |
| Dynamic Rendering | request time 执行 |
| Streaming | HTML 分块发送，提高可见速度 |
| Suspense Boundary | 控制等待和 fallback |
| Loading UI | `loading.tsx` 自动创建 boundary |
| Partial Prerendering | 静态 shell + 动态 islands |
| Route Segment Config | `dynamic`、`revalidate`、`runtime`、`preferredRegion` |
| Rendering Decision | 数据、cookies、headers、search params、cache 设置如何影响 rendering |

### 10.3 推荐练习文件

```txt
practices/04-rendering-strategy/
  01-static-dynamic/
    static-products-page.tsx
    dynamic-user-page.tsx
    cookies-force-dynamic.tsx

  02-streaming-suspense/
    app/products/loading.tsx
    slow-product-list.tsx
    nested-suspense-boundary.tsx

  03-route-config/
    runtime-node-page.tsx
    runtime-edge-page.tsx
    segment-revalidate-page.tsx
```

### 10.4 小项目

```txt
rendering-strategy-lab
```

功能：

```txt
1. 一个静态 marketing page。
2. 一个动态 dashboard page。
3. 一个 stream 产品列表。
4. 一个 cookie-dependent user page。
5. 写 rendering decision report。
```

### 10.5 验收标准

```txt
static rendering 和 dynamic rendering 如何判断？
什么操作会让 route 变成 dynamic？
streaming 和 Suspense 如何配合？
loading.tsx 解决什么问题？
PPR 的技术意义是什么？
什么时候不应该把页面做成动态渲染？
```

---

## 11. Phase 5：Data Fetching、Caching 与 Revalidation

### 11.1 目标

掌握 Next.js 中最难也最重要的能力：数据新鲜度、性能和缓存层级。

### 11.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Server Fetch | 在 Server Component 中获取数据 |
| Request Memoization | 同一次 render 中去重相同请求 |
| Parallel Fetching | 避免 waterfall |
| Data Cache | 数据级缓存 |
| Full Route Cache | route 结果缓存 |
| Router Cache | client navigation cache |
| CDN Cache | Vercel / edge cache |
| Revalidation | time-based 和 on-demand |
| `revalidatePath` | 按路径刷新 |
| `revalidateTag` | 按 tag 刷新 |
| Cache Tags | 按业务资源组织缓存 |
| No Store | 对强实时数据禁用缓存 |

### 11.3 推荐练习文件

```txt
practices/05-data-cache-revalidation/
  01-data-fetching/
    sequential-fetch-page.tsx
    parallel-fetch-page.tsx
    request-memoization-page.tsx

  02-cache/
    cached-products.ts
    no-store-user-dashboard.ts
    tagged-product-fetch.ts

  03-revalidation/
    revalidate-products-action.ts
    revalidate-product-detail-action.ts
    cache-layer-report.md
```

### 11.4 小项目

```txt
product-cache-lab
```

功能：

```txt
1. 产品列表使用 tag cache。
2. 产品详情使用单独 tag。
3. 创建产品后 revalidateTag。
4. 修改产品后刷新列表和详情。
5. 用户 dashboard 使用 no-store。
6. 写 Data Cache / Full Route Cache / Router Cache 对比报告。
```

### 11.5 验收标准

```txt
Next.js 的 fetch 和普通 fetch 有什么不同？
Data Cache、Full Route Cache、Router Cache 分别缓存什么？
revalidatePath 和 revalidateTag 怎么选？
为什么用户私有数据不能随便缓存？
如何避免请求 waterfall？
为什么缓存策略是业务设计，不只是性能优化？
```

---

## 12. Phase 6：Mutations、Server Actions、Forms 与 Optimistic UI

### 12.1 目标

掌握用户提交如何安全地进入 server，并让 UI 更新和缓存失效保持一致。

### 12.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Server Action | UI 触发，server 执行 |
| `"use server"` | 标记 server function 或 server action file |
| Form Action | 原生 form 和 action 结合 |
| `useActionState` | 管理 action state |
| `useFormStatus` | 管理提交状态 |
| `useOptimistic` | 乐观更新 UI |
| Runtime Validation | FormData / payload 必须验证 |
| Redirect | mutation 成功后重定向 |
| Cache Invalidation | mutation 后 revalidatePath / revalidateTag |
| Transaction | 数据库写入需要原子性 |
| Authorization | server action 内部必须检查权限 |

### 12.3 推荐练习文件

```txt
practices/06-actions-forms/
  01-basic-actions/
    create-product-action.ts
    product-form.tsx

  02-validation/
    product-form-schema.ts
    action-state-model.ts

  03-optimistic-ui/
    optimistic-comment-list.tsx
    optimistic-update-action.ts

  04-cache-invalidation/
    create-product-with-revalidate.ts
    update-product-with-transaction.ts
```

### 12.4 小项目

```txt
server-action-form-lab
```

功能：

```txt
1. 创建产品表单。
2. 使用 zod 验证 FormData。
3. 使用 useActionState 显示错误。
4. 使用 useFormStatus 显示 pending。
5. 使用 useOptimistic 做评论乐观更新。
6. 写入数据库 mock 后 revalidateTag。
```

### 12.5 验收标准

```txt
Server Action 和 client event handler 有什么区别？
"use server" 标记的边界是什么？
FormData 为什么不能直接信任？
useActionState 解决什么问题？
useOptimistic 为什么需要失败回滚策略？
Server Action 和 Route Handler 怎么选？
mutation 后为什么必须考虑缓存失效？
权限检查为什么必须在 server action 内部做？
```

---

## 13. Phase 7：Route Handlers、BFF 与全栈 API 边界

### 13.1 目标

掌握 Next.js 作为全栈框架时的 API 能力和边界。

### 13.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Route Handler | `app/api/**/route.ts` |
| HTTP Methods | `GET`、`POST`、`PUT`、`PATCH`、`DELETE` |
| Request / Response | `Request`、`Response`、`NextRequest`、`NextResponse` |
| BFF | Backend for Frontend，给当前前端服务的聚合 API |
| Webhook | 第三方回调需要 Route Handler |
| Public API | 非 React 客户端调用的 API |
| Runtime Validation | body、query、params 都是外部输入 |
| Error Model | 统一错误响应 |
| Rate Limit | 防止 API 滥用 |
| CORS | 是否允许跨站调用 |
| Streaming Response | SSE、streaming body |
| API Contract | OpenAPI 或 typed client |

### 13.3 推荐练习文件

```txt
practices/07-route-handlers-api/
  01-basic-route-handler/
    app/api/health/route.ts
    app/api/products/route.ts

  02-bff/
    app/api/dashboard-summary/route.ts
    dashboard-summary-service.ts

  03-webhook/
    app/api/webhooks/stripe/route.ts
    webhook-signature-verify.ts

  04-api-contract/
    api-error-model.ts
    typed-api-response.ts
    openapi-contract.md
```

### 13.4 小项目

```txt
next-bff-api-lab
```

功能：

```txt
1. GET /api/health。
2. GET /api/products。
3. POST /api/products。
4. GET /api/dashboard-summary 聚合多个 service。
5. POST /api/webhooks/payment 模拟 webhook。
6. 统一 API response / error shape。
7. 写 API contract 文档。
```

### 13.5 验收标准

```txt
Route Handler 和 Server Action 的区别是什么？
什么时候应该写 Route Handler？
什么时候应该用独立 Node backend？
NextRequest 和 Web Request 有什么关系？
webhook 为什么不适合 Server Action？
BFF 解决什么问题？
如何设计统一 API error response？
API body 为什么必须 runtime validation？
```

---

## 14. Phase 8：Auth、Session、Cookies、Middleware / Proxy 与安全边界

### 14.1 目标

把认证和授权放在正确的运行边界中。

### 14.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Cookie | httpOnly、secure、sameSite |
| Session | server-side session、database session、JWT session |
| Auth Boundary | server-side check 优先 |
| Protected Route | 页面、layout、route handler、server action 都要检查 |
| Middleware / Proxy | 请求进入页面前的轻量处理 |
| Redirect | 未登录跳转 |
| Permission | RBAC / ABAC |
| CSRF | cookie auth 时必须考虑 |
| XSS | token 不应放 localStorage |
| Security Headers | CSP、HSTS、X-Frame-Options |
| Data Security | 不把 secret 或 private data 发到 client bundle |

### 14.3 推荐练习文件

```txt
practices/08-auth-security/
  01-session-cookie/
    session-cookie-model.md
    get-current-user.ts

  02-protected-routes/
    app/(dashboard)/layout.tsx
    require-auth.ts
    require-role.ts

  03-server-action-auth/
    update-profile-action.ts
    admin-only-action.ts

  04-proxy/
    proxy.ts
    auth-redirect-policy.md

  05-security/
    security-headers.ts
    csrf-risk-report.md
```

### 14.4 小项目

```txt
auth-boundary-lab
```

功能：

```txt
1. 登录设置 httpOnly cookie。
2. Dashboard layout 检查 session。
3. Admin page 检查 role。
4. Server Action 内部重复权限检查。
5. Route Handler 检查 session。
6. Proxy 做轻量 redirect。
7. 写 auth boundary report。
```

### 14.5 验收标准

```txt
为什么不能只在 client 判断登录状态？
httpOnly cookie 解决什么问题？
CSRF 和 cookie session 有什么关系？
Proxy 适合做什么？不适合做什么？
权限检查应该放在哪些 server boundary？
为什么 Server Action 内仍然要检查权限？
如何避免 secret 进入 client bundle？
```

---

## 15. Phase 9：Database、ORM、External Services 与运行时选择

### 15.1 目标

理解 Next.js 全栈项目中的数据库、第三方服务和 runtime 约束。

### 15.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| PostgreSQL | schema、index、transaction、connection pool |
| Prisma / Drizzle | ORM / query builder 与 SQL 的关系 |
| Server-only Repository | 数据库访问只在 server side |
| Runtime Choice | Node runtime vs Edge runtime |
| Connection Pooling | serverless 下的连接管理 |
| External Services | payment、email、storage、CMS、AI API |
| Webhook | 第三方事件进入系统 |
| File Upload | Vercel Blob / S3 / object storage |
| Background Jobs | Next.js 不适合长任务时要引入 worker / queue |
| Secret Handling | API keys 不能进入 browser bundle |

### 15.3 推荐练习文件

```txt
practices/09-database-runtime/
  01-database/
    db-client.ts
    product-repository.ts
    transaction-demo.ts

  02-runtime/
    node-runtime-route.ts
    edge-runtime-route.ts
    runtime-choice-report.md

  03-external-services/
    payment-webhook-route.ts
    email-service.ts
    file-upload-service.ts

  04-server-only/
    server-only-db-import.ts
    invalid-client-db-import.tsx
```

### 15.4 小项目

```txt
next-database-runtime-lab
```

功能：

```txt
1. PostgreSQL 产品表。
2. Prisma 或 Drizzle repository。
3. Server Action 写入数据库。
4. Route Handler 查询数据库。
5. Webhook 更新订单状态。
6. 比较 Node runtime 和 Edge runtime 限制。
7. 写 connection pooling report。
```

### 15.5 验收标准

```txt
数据库访问为什么必须是 server-only？
Prisma / Drizzle 怎么选？
serverless 下 connection pooling 为什么重要？
Edge runtime 为什么不适合所有数据库客户端？
第三方 webhook 为什么要验签？
长任务为什么不适合直接放 Server Action？
文件上传为什么要用 object storage？
```

---

## 16. Phase 10：Metadata、SEO、Images、Fonts、Scripts 与 Web 性能

### 16.1 目标

让 Next.js 项目不只是能用，还要能被搜索、分享、快速加载、稳定交互。

### 16.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Metadata API | static metadata、dynamic metadata |
| Open Graph | 社交分享图和标题 |
| Sitemap | 搜索引擎发现页面 |
| Robots | 控制爬虫访问 |
| JSON-LD | 结构化数据 |
| Image | responsive image、priority、sizes、remote patterns |
| Font | font optimization、防止 layout shift |
| Script | third-party script loading strategy |
| Web Vitals | LCP、CLS、INP、TTFB |
| Bundle | client bundle size、code splitting |
| Prefetch | Link prefetch 和 router cache |
| Accessibility | 可访问性和语义 HTML |

### 16.3 推荐练习文件

```txt
practices/10-seo-performance/
  01-metadata/
    app/products/[productId]/page.tsx
    generate-product-metadata.ts
    app/sitemap.ts
    app/robots.ts

  02-media-optimization/
    optimized-product-image.tsx
    font-layout-shift-demo.tsx
    third-party-script-demo.tsx

  03-web-vitals/
    web-vitals-report.ts
    lcp-optimization-report.md
    bundle-analysis-report.md
```

### 16.4 小项目

```txt
seo-performance-lab
```

功能：

```txt
1. Product detail dynamic metadata。
2. Open Graph image。
3. Sitemap。
4. Robots。
5. Image optimization。
6. Font optimization。
7. Third-party script strategy。
8. Web Vitals report。
```

### 16.5 验收标准

```txt
metadata 和 generateMetadata 的区别是什么？
动态 metadata 什么时候会影响渲染策略？
sitemap 和 robots 分别解决什么问题？
Image priority 应该什么时候用？
Font 为什么会影响 CLS？
第三方脚本为什么会影响 INP？
如何优化 LCP？
如何查 client bundle 过大？
```

---

## 17. Phase 11：Error、Loading、Not Found、Unauthorized 与用户状态边界

### 17.1 目标

掌握用户在加载、错误、空数据、无权限、找不到资源时看到什么。

### 17.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| `loading.tsx` | segment loading UI |
| `error.tsx` | segment error boundary |
| `global-error.tsx` | root-level error |
| `not-found.tsx` | 404 boundary |
| `unauthorized.tsx` | 未授权 UI |
| `forbidden.tsx` | 禁止访问 UI |
| `notFound()` | server-side 触发 404 |
| `redirect()` | server-side 重定向 |
| Error Model | user-facing error vs internal error |
| Retry | recoverable error 的重试 |
| Empty State | 空数据不是错误 |

### 17.3 推荐练习文件

```txt
practices/11-ui-boundaries/
  01-loading/
    app/products/loading.tsx
    nested-loading-report.md

  02-error/
    app/products/error.tsx
    throw-product-error.tsx

  03-not-found/
    app/products/[productId]/not-found.tsx
    product-not-found-page.tsx

  04-auth-boundary/
    app/(dashboard)/unauthorized.tsx
    app/(dashboard)/forbidden.tsx
```

### 17.4 小项目

```txt
ui-boundary-lab
```

功能：

```txt
1. Loading skeleton。
2. Product not found。
3. Permission forbidden。
4. Server error boundary。
5. Retry button。
6. Empty state。
7. 写 UI state boundary report。
```

### 17.5 验收标准

```txt
loading.tsx 和 Suspense boundary 的关系是什么？
error.tsx 为什么通常需要 Client Component？
notFound() 和返回空数组有什么区别？
unauthorized 和 forbidden 应该怎么区分？
用户可见错误和内部日志错误有什么区别？
empty state 为什么不是 error state？
```

---

## 18. Phase 12：Testing、Mocking、CI 与质量门禁

### 18.1 目标

让 Next.js 项目从“本地能跑”变成“可自动验证”。

### 18.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Unit Test | utility、schema、service |
| Component Test | React Testing Library |
| Server Action Test | validation、permission、database mock |
| Route Handler Test | request / response |
| E2E Test | Playwright 用户路径 |
| MSW | mock API boundary |
| Test Database | integration test isolation |
| CI Pipeline | lint、typecheck、test、build |
| Preview E2E | 对 Vercel preview deployment 跑 E2E |
| Visual Regression | 关键 UI 变更检测 |
| Accessibility Test | a11y 自动检查 |

### 18.3 推荐练习文件

```txt
practices/12-testing-ci/
  01-unit/
    product-schema.test.ts
    product-service.test.ts

  02-component/
    product-card.test.tsx
    product-form.test.tsx

  03-server/
    create-product-action.test.ts
    products-route-handler.test.ts

  04-e2e/
    product-flow.spec.ts
    auth-flow.spec.ts

  05-ci/
    github-actions-ci.yml
    preview-e2e-workflow.md
```

### 18.4 小项目

```txt
next-quality-gate-lab
```

功能：

```txt
1. Vitest unit tests。
2. React Testing Library component tests。
3. Route Handler tests。
4. Server Action tests。
5. Playwright E2E tests。
6. GitHub Actions: lint + typecheck + test + build。
7. Preview deployment E2E checklist。
```

### 18.5 验收标准

```txt
Next.js 项目里哪些逻辑应该 unit test？
Server Action 怎么测试？
Route Handler 怎么构造 Request？
E2E test 应该覆盖哪些业务路径？
MSW 解决什么边界？
CI 为什么必须跑 next build？
为什么 preview deployment 适合跑 E2E？
```

---

## 19. Phase 13：Vercel 部署、Preview Workflow、Environment 与 Rollback

### 19.1 目标

掌握 Vercel 作为生产平台，而不是只会点 Deploy。

### 19.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Git Integration | push / PR 自动触发 deployment |
| Preview Deployment | 每个 PR 独立预览 |
| Production Deployment | 主环境 |
| Environment Variables | development、preview、production 分环境 |
| Sensitive Env | secret rotation、不能进入 client |
| Build Logs | build failure 排查 |
| Runtime Logs | function runtime error 排查 |
| Domain / DNS | custom domain、HTTPS |
| Promote | 把已有 deployment 提升为 production |
| Rollback | 生产事故回滚 |
| Deployment Protection | preview 或私有环境保护 |
| Vercel CLI | 本地和 CI 中操作 deployment |
| Vercel Cache | CDN cache 和 Data Cache 管理 |
| Rolling Release | 渐进发布策略 |

### 19.3 推荐练习文件

```txt
practices/13-vercel-deployment/
  01-deploy/
    vercel-link-project.md
    vercel-preview-production.md

  02-env/
    env-development-preview-production.md
    env-secret-boundary.md

  03-cli/
    vercel-cli-commands.md
    local-vercel-build.md

  04-incident/
    build-error-debugging.md
    runtime-log-debugging.md
    rollback-playbook.md
```

### 19.4 小项目

```txt
vercel-production-workflow-lab
```

功能：

```txt
1. GitHub connected deployment。
2. PR preview deployment。
3. Preview env 和 production env 区分。
4. 本地使用 vercel pull 同步配置。
5. 本地 vercel build。
6. 通过 CLI 部署 preview。
7. 查看 runtime logs。
8. 模拟坏版本并 rollback。
9. 写 incident playbook。
```

### 19.5 必会命令

```bash
vercel dev
vercel pull
vercel env pull
vercel build
vercel build --prod
vercel deploy
vercel deploy --prod
vercel logs
vercel inspect
vercel promote
vercel rollback
vercel cache purge
```

### 19.6 验收标准

```txt
Preview deployment 和 Production deployment 的区别是什么？
为什么环境变量要分 development / preview / production？
NEXT_PUBLIC_ 变量为什么会暴露给 client？
build logs 和 runtime logs 查的问题有什么区别？
vercel pull 解决什么问题？
vercel build 为什么适合放进 CI？
如何 promote preview 到 production？
如何 rollback production？
如何写一次生产事故回滚流程？
```

---

## 20. Phase 14：Observability、Web Vitals、Logs、Tracing 与线上排查

### 20.1 目标

让项目上线后能被观察、被解释、被修复。

### 20.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Runtime Logs | API / function 运行日志 |
| Build Logs | 构建过程日志 |
| Web Vitals | LCP、CLS、INP、TTFB |
| Speed Insights | 前端体验指标 |
| Analytics | 访问行为 |
| Tracing | 请求链路追踪 |
| OpenTelemetry | 标准化 instrumentation |
| Error Rate | 错误比例 |
| Slow Function | 慢函数定位 |
| Cache Miss | 缓存未命中分析 |
| Hydration Error | client/server markup 不一致 |
| Alert | 关键指标告警 |
| Incident Report | 故障复盘文档 |

### 20.3 推荐练习文件

```txt
practices/14-observability/
  01-web-vitals/
    web-vitals-client.ts
    web-vitals-dashboard-report.md

  02-logs/
    structured-runtime-log.ts
    request-id-log.ts

  03-tracing/
    instrumentation.ts
    route-handler-trace.ts

  04-debugging/
    slow-function-debug-report.md
    hydration-mismatch-report.md
    cache-miss-report.md
```

### 20.4 小项目

```txt
next-observability-lab
```

功能：

```txt
1. 添加 request id。
2. Route Handler 输出结构化日志。
3. 记录 Web Vitals。
4. 添加 instrumentation。
5. 制造一个慢 API。
6. 制造一个 hydration mismatch。
7. 写 slow function 和 hydration debugging report。
```

### 20.5 验收标准

```txt
Web Vitals 里 LCP、CLS、INP 分别代表什么？
runtime logs 和 tracing 有什么区别？
如何定位一个慢页面？
如何定位一个慢 Route Handler？
如何判断是 cache miss 还是数据库慢？
hydration mismatch 怎么查？
为什么线上错误需要 request id？
incident report 应该包含什么？
```

---

## 21. Phase 15：现代工具链、Turbopack、Bundle、Monorepo 与 Turborepo

### 21.1 目标

掌握现代 Next.js 项目的工程规模化能力。

### 21.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Package Manager | npm / pnpm / yarn、lockfile、workspace |
| TypeScript Config | app-level、package-level、shared config |
| ESLint Config | app-specific 和 shared config |
| Turbopack | dev / build 加速和限制 |
| Webpack Fallback | 兼容性和自定义配置 |
| Bundle Analysis | client bundle 大小、依赖泄漏 |
| Dynamic Import | lazy loading |
| `next.config.ts` | images、headers、redirects、rewrites、transpilePackages |
| Monorepo | `apps/web`、`packages/ui`、`packages/config` |
| Turborepo | task pipeline、cache、remote cache |
| Shared UI Package | 组件库边界 |
| Shared Types Package | API contract 边界 |
| CI Cache | 依赖缓存、build cache |
| Dependency Risk | peer dependency、重复依赖、package size |

### 21.3 推荐练习文件

```txt
practices/15-tooling-monorepo/
  01-next-config/
    next-config-options.md
    security-headers-config.ts
    remote-image-patterns.md

  02-bundle/
    bundle-analysis-report.md
    client-bundle-leak-demo.tsx
    dynamic-import-demo.tsx

  03-monorepo/
    apps-web-structure.md
    packages-ui-structure.md
    packages-config-structure.md

  04-turborepo/
    turbo-pipeline.md
    remote-cache-report.md
```

### 21.4 小项目

```txt
next-monorepo-tooling-lab/
  apps/
    web/
      app/
      package.json
      next.config.ts

  packages/
    ui/
      src/
      package.json

    config/
      eslint/
      typescript/

    api-contract/
      src/
      package.json

  turbo.json
  pnpm-workspace.yaml
  package.json
```

功能：

```txt
1. web app 使用 packages/ui。
2. packages/config 提供 ESLint 和 TypeScript config。
3. packages/api-contract 提供 shared API types。
4. 使用 Turborepo task pipeline。
5. 生成 bundle analysis report。
6. 发现并修复 client bundle 泄漏。
```

### 21.5 验收标准

```txt
pnpm workspace 解决什么问题？
Turborepo 的 task pipeline 怎么工作？
remote cache 为什么能加速 CI？
shared UI package 应该怎么设计？
为什么 package 里要区分 source 和 build output？
transpilePackages 解决什么问题？
如何判断某个 server-only 依赖进入了 client bundle？
bundle analysis 应该看哪些指标？
```

---

## 22. Phase 16：高级架构：Microfrontends、Multi-zones、Edge、CDN 与平台化

### 22.1 目标

从单个 Next.js 应用升级到大型团队、多应用、多区域、多运行时的架构能力。

### 22.2 必学主题

| 主题 | 必须理解到什么程度 |
|---|---|
| Multi-zones | 多个 Next.js app 组成一个站点 |
| Microfrontends | 多团队独立交付前端 |
| Monorepo vs Multi-repo | 代码组织取舍 |
| Edge Runtime | 低延迟、轻计算、API 限制 |
| Node Runtime | 完整 Node API、数据库、复杂后端 |
| CDN Strategy | 静态资源、HTML、API cache |
| ISR / PPR | 静态和动态混合 |
| Feature Flags | preview、rollout、A/B test |
| Rolling Release | 渐进发布 |
| BFF Architecture | frontend-oriented backend |
| Platform Boundary | Next.js、Vercel、独立 Node backend、queue、worker 的职责 |
| Cost Awareness | function duration、cold start、bandwidth、cache hit rate |
| Migration Strategy | 从 React SPA / Pages Router / legacy app 迁移 |

### 22.3 推荐练习文件

```txt
practices/16-advanced-architecture/
  01-multi-zone/
    multi-zone-design.md
    rewrite-routing-map.md

  02-microfrontend/
    microfrontend-boundary.md
    shared-design-system-contract.md

  03-edge-cdn/
    edge-runtime-use-cases.md
    node-runtime-use-cases.md
    cdn-cache-strategy.md

  04-platform/
    bff-vs-backend-report.md
    next-vercel-worker-boundary.md
    rollout-playbook.md
```

### 22.4 小项目

```txt
next-platform-architecture-lab
```

功能：

```txt
1. Marketing app 和 Dashboard app 分成两个 zones。
2. 使用 rewrites 组合路由。
3. Edge runtime 做轻量地理重定向。
4. Node runtime 做数据库 API。
5. Vercel preview 做功能验证。
6. 写 CDN cache strategy。
7. 写 rollout / rollback playbook。
```

### 22.5 验收标准

```txt
什么时候需要 multi-zones？
microfrontend 解决什么问题，又引入什么成本？
Edge runtime 和 Node runtime 怎么选？
CDN cache 和 Next.js Data Cache 有什么关系？
ISR、PPR、streaming 怎么取舍？
什么时候 Next.js 不应该承担后端职责？
什么时候需要独立 worker / queue？
如何设计渐进发布和回滚？
```

---

## 23. 最终项目路线

### Project 1：Next Boundary Lab

目标：

```txt
证明你理解 server/client/build/request/runtime boundary。
```

包含：

```txt
Server Component
Client Component
environment variables
browser API mistake
hydration mismatch
boundary report
```

简历价值：

```txt
适合作为学习仓库，不适合作为主简历项目。
```

---

### Project 2：App Router Dashboard

目标：

```txt
证明你能设计复杂 routing 和 layout。
```

包含：

```txt
route groups
dynamic routes
parallel routes
intercepting modal routes
nested layouts
URL search params
loading / error / not-found boundaries
```

简历价值：

```txt
可以作为 Next.js routing 深度补充项目。
```

---

### Project 3：Next Full-stack Commerce API

目标：

```txt
证明你具备全栈 API、Server Action、Route Handler、缓存和数据库能力。
```

技术栈：

```txt
Next.js App Router
TypeScript
PostgreSQL
Prisma or Drizzle
zod
Server Actions
Route Handlers
revalidateTag
httpOnly cookie auth
Playwright
Vercel
```

功能：

```txt
product catalog
admin product management
cart
order
payment webhook mock
auth
RBAC
cache invalidation
API contract
```

简历价值：

```txt
主简历项目候选。
```

---

### Project 4：Production Next.js Platform

目标：

```txt
证明你具备生产部署、工具链、测试、观测和排查能力。
```

包含：

```txt
Vercel preview deployment
production deployment
environment variables
rollback
runtime logs
Web Vitals
OpenTelemetry
CI pipeline
bundle analysis
security headers
E2E tests
incident report
```

简历价值：

```txt
高级差异化项目。
```

---

### Project 5：Next.js Monorepo SaaS

目标：

```txt
证明你具备大型项目架构能力。
```

结构：

```txt
apps/web
apps/admin
packages/ui
packages/api-contract
packages/config
packages/database
```

包含：

```txt
Turborepo
pnpm workspace
shared UI package
shared TypeScript config
shared ESLint config
Next.js web app
admin app
typed API contract
preview deployment
remote build cache
```

简历价值：

```txt
高级全栈前端 / full-stack product engineer 项目。
```

---

## 24. 面试验收题库

### Routing

```txt
App Router 和 Pages Router 有什么区别？
layout 和 template 有什么区别？
route group 为什么不影响 URL？
parallel route 解决什么问题？
intercepting route 适合什么场景？
URL search params 和 client state 应该怎么分工？
```

### Server / Client Boundary

```txt
Server Component 和 Client Component 的边界是什么？
"use client" 是不是表示只在浏览器运行？
为什么 Server Component 不能用 useState？
Client Component 能不能导入 Server Component？
如何避免 server-only 代码进入 client bundle？
hydration mismatch 怎么产生？
```

### Rendering

```txt
static rendering 和 dynamic rendering 如何判断？
什么操作会让 route 变成 dynamic？
streaming 和 Suspense 如何配合？
loading.tsx 和 Suspense boundary 有什么关系？
PPR 解决什么问题？
SSR、SSG、ISR、PPR 怎么取舍？
```

### Data / Cache

```txt
Next.js fetch 和普通 fetch 有什么区别？
Data Cache、Full Route Cache、Router Cache 有什么区别？
revalidatePath 和 revalidateTag 怎么选？
为什么用户私有数据不能随便缓存？
如何避免 request waterfall？
cache miss 怎么定位？
```

### Mutation / API

```txt
Server Action 和 Route Handler 怎么选？
Server Action 为什么仍然要做权限检查？
FormData 为什么必须 runtime validation？
webhook 为什么适合 Route Handler？
BFF 解决什么问题？
什么时候应该使用独立 Node backend？
```

### Auth / Security

```txt
为什么不能只在 client 判断登录状态？
httpOnly cookie 解决什么问题？
CSRF 和 cookie auth 有什么关系？
Proxy 适合做什么？不适合做什么？
如何防止 secret 进入 client bundle？
CSP 和 security headers 解决什么问题？
```

### Vercel

```txt
Preview deployment 和 production deployment 的区别是什么？
Vercel environment variables 如何按环境管理？
vercel pull 解决什么问题？
vercel build 在 CI 中有什么价值？
如何查看 runtime logs？
如何 rollback production？
promote preview to production 的使用场景是什么？
Vercel CDN cache 和 Next.js cache 有什么关系？
```

### Tooling

```txt
Turbopack 和 Webpack 的关系是什么？
next.config.ts 常见配置项有哪些？
transpilePackages 解决什么问题？
如何做 bundle analysis？
pnpm workspace 和 Turborepo 分别解决什么问题？
shared UI package 应该如何设计？
CI pipeline 应该至少包含哪些步骤？
```

### Observability

```txt
LCP、CLS、INP 分别代表什么？
如何定位慢页面？
如何定位慢 Route Handler？
logs、metrics、traces 有什么区别？
OpenTelemetry 在 Next.js 项目里解决什么问题？
incident report 应该包含什么？
```

---

## 25. 简历表达标准

### 不建议写

```txt
精通 Next.js
```

如果项目和面试不能支撑，这句话风险很高。

### 基础阶段写法

```txt
熟悉 Next.js App Router 基础，能够开发页面、动态路由、布局和基础 Vercel 部署。
```

### 项目阶段写法

```txt
熟练使用 Next.js App Router、React、TypeScript 构建全栈 Web 应用，具备 Server Component、Route Handler、Server Action、数据库集成和 Vercel 部署经验。
```

### 机制阶段写法

```txt
深入理解 Next.js App Router、React Server Components、server/client boundary、rendering strategy、caching、revalidation 与 streaming 机制。
```

### 生产阶段写法

```txt
具备生产级 Next.js + TypeScript 应用架构设计、认证授权、缓存策略、性能优化、测试、Vercel Preview/Production 工作流和线上问题排查经验。
```

### 高级阶段写法

```txt
具备高级 Next.js / Vercel 工程化能力，能够设计全栈 React 架构、BFF API、部署流水线、缓存与渲染策略、monorepo 工具链、observability 和生产事故回滚流程。
```

### 项目描述模板

```txt
基于 Next.js App Router + TypeScript + PostgreSQL 构建全栈电商管理平台，采用 Server Components 负责 server-side data fetching，Client Components 负责交互状态，后端使用 Route Handlers 和 Server Actions 实现 BFF API、表单提交、权限检查和缓存失效。项目接入 Vercel Preview/Production 部署流程，配置分环境变量、CI typecheck/lint/test/build、Playwright E2E、Web Vitals、runtime logs、rollback playbook，并通过 revalidateTag、Image/Font optimization、bundle analysis 优化性能与可维护性。
```

---

## 26. 每周学习节奏

### 每周固定节奏

```txt
Day 1:
  阅读官方文档和本地参考资料，整理运行边界和核心概念。

Day 2:
  写正确示例，跑通 dev 和 build。

Day 3:
  写错误示例，观察 TypeScript、build、runtime、browser console、network 的错误差异。

Day 4:
  做小练习或 mini lab。

Day 5:
  补测试、错误边界、缓存边界和安全边界。

Day 6:
  部署到 Vercel preview，观察 logs、Web Vitals、build output。

Day 7:
  复盘、补漏洞、做面试题、整理 cheatsheet。
```

### 每章输出物

每章至少输出：

```txt
1. chapter-learning-guide.md
2. practices/
3. mini-project/
4. cheatsheet.md
5. interview-questions.md
6. boundary-report.md
```

---

## 27. 学习指导文件生成规则

每一章指导文件必须包含：

```txt
本章解决什么问题
前置概念
学习目标
学习顺序
核心术语表
底层心智模型
推荐目录结构
运行方式
分节教学与练习
API / 语法索引
常见错误表
最终小项目
额外速查表
最终文件清单
如何转换成个人笔记
必须能回答的问题
最终记忆模型
官方文档阅读清单
```

每个非平凡代码示例必须包含：

```txt
正确示例
错误示例
逐行解释
执行过程
运行边界
缓存边界
server/client/bundle 影响
为什么得到这个输出
违反了什么规则
如何修正
如何识别类似错误
```

Next.js 学习文件额外必须包含：

```txt
这段代码运行在哪里。
这段代码什么时候运行。
这段代码是否进入 client bundle。
这段代码是否读取 request-bound data。
这段代码是否影响 static/dynamic rendering。
这段代码是否参与 caching。
mutation 后如何 revalidate。
部署到 Vercel 后行为是否改变。
```

---

## 28. 资料使用顺序

推荐资料顺序：

```txt
1. Official Next.js documentation
2. Official React documentation
3. Official Vercel documentation
4. Official Vercel CLI documentation
5. Official TypeScript documentation
6. MDN Web documentation
7. Node.js official documentation
8. Local React / Node / Next.js reference books
9. Existing project notes
```

使用原则：

```txt
官方文档负责事实正确性。
React 文档负责 Server Components、Actions、Hydration 等 React 机制。
Vercel 文档负责部署、平台、CLI、日志、回滚、缓存、观测。
本地旧 Next.js 资料只作为历史参考，不能替代现代 App Router 文档。
项目练习负责把知识变成能力。
```

重点官方阅读清单：

```txt
Next.js Docs:
  https://nextjs.org/docs

Next.js App Router:
  https://nextjs.org/docs/app

Next.js Project Structure:
  https://nextjs.org/docs/app/getting-started/project-structure

Next.js Server and Client Components:
  https://nextjs.org/docs/app/getting-started/server-and-client-components

Next.js Fetching Data:
  https://nextjs.org/docs/app/getting-started/fetching-data

Next.js Mutating Data:
  https://nextjs.org/docs/app/getting-started/mutating-data

Next.js Caching:
  https://nextjs.org/docs/app/getting-started/caching

Next.js Revalidating:
  https://nextjs.org/docs/app/getting-started/revalidating

Next.js Route Handlers:
  https://nextjs.org/docs/app/getting-started/route-handlers

Next.js Deploying:
  https://nextjs.org/docs/app/getting-started/deploying

Vercel Docs:
  https://vercel.com/docs

Vercel CLI:
  https://vercel.com/docs/cli
```

---

## 29. 最终验收标准

完成这条路线后，你应该能独立完成：

```txt
1. 用 Next.js App Router + TypeScript 搭建完整项目。
2. 设计 routing、layout、route group、dynamic route、parallel route、intercepting route。
3. 区分 Server Component、Client Component、Server Action、Route Handler、Proxy、Node runtime、Edge runtime。
4. 解释 RSC payload、hydration、streaming、static/dynamic rendering、PPR。
5. 设计 server-side data fetching、parallel fetching、cache tags、revalidation。
6. 使用 Server Actions 处理 forms、validation、auth、transaction、optimistic UI。
7. 使用 Route Handlers 设计 BFF、webhook、public API、typed error response。
8. 实现 auth、session、httpOnly cookie、RBAC、protected layouts、server-side authorization。
9. 接 PostgreSQL + Prisma / Drizzle，并处理 server-only repository 和 runtime constraints。
10. 处理 metadata、Open Graph、sitemap、robots、Image、Font、Script、Web Vitals。
11. 处理 loading、error、not-found、unauthorized、forbidden、empty state。
12. 写 Vitest / Jest unit tests、React Testing Library component tests、Route Handler tests、Server Action tests、Playwright E2E tests。
13. 配置 lint、typecheck、test、build 的 CI pipeline。
14. 部署到 Vercel，并管理 preview / production env。
15. 使用 Vercel CLI 完成 pull、build、deploy、logs、promote、rollback。
16. 使用 Vercel logs、Web Vitals、tracing、OpenTelemetry 排查线上问题。
17. 做 bundle analysis，避免 server-only dependency 进入 client bundle。
18. 设计 pnpm workspace + Turborepo monorepo，包含 shared UI、shared config、shared API contract。
19. 理解 Edge runtime、Node runtime、CDN cache、serverless function、database connection pooling 的取舍。
20. 在面试中解释项目中每个关键模块运行在哪里、什么时候运行、是否缓存、如何失效、如何部署、如何排查。
```

如果这些都能做到，你可以把 Next.js 能力定位为：

```txt
深入理解 Next.js App Router、RSC、server/client boundary、rendering、caching、full-stack API、Vercel deployment 与现代工具链，具备生产级全栈 React 应用设计、实现、测试、部署、优化和排查能力。
```

这才是“精通 Next.js + Vercel + 现代工具链”在官方文档、市场情况和招聘需求三个维度下都站得住的标准。
