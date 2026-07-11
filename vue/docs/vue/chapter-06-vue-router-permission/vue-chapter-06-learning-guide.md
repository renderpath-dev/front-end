# Vue 第 6 章：Vue Router 与 Permission Routing

<style>
.macos-code-window {
  margin: 1.25rem 0;
  overflow: hidden;
  border: 1px solid #30363d;
  border-radius: 10px;
  background: #0d1117;
}

.macos-code-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 14px;
  background: #21262d;
}

.macos-code-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.macos-code-dot-red { background: #ff5f57; }
.macos-code-dot-yellow { background: #febc2e; }
.macos-code-dot-green { background: #28c840; }

.macos-code-title {
  margin-left: 6px;
  color: #c9d1d9;
  font: 600 0.82rem/1.2 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.macos-code-titlebar + pre {
  margin: 0;
  border: 0;
  border-radius: 0;
}

.macos-code-titlebar + pre code {
  display: block;
  padding: 1rem;
}
</style>

## 目录

- [0. 本章机制边界](#0-本章机制边界)
- [1. 本章解决的问题](#1-本章解决的问题)
- [2. 前置概念](#2-前置概念)
- [3. 学习目标](#3-学习目标)
- [4. 核心机制证据链总览](#4-核心机制证据链总览)
- [5. 核心术语表](#5-核心术语表)
- [6. 底层心智模型](#6-底层心智模型)
- [7. 推荐目录结构](#7-推荐目录结构)
- [8. 示例运行方式](#8-示例运行方式)
- [9. 分节教学与练习](#9-分节教学与练习)
  - [9.1 SPA routing mental model：URL、history、router instance 与 no full reload](#section-9-1)
  - [9.2 router installation：createRouter、createWebHistory、app.use(router) 与 initial route resolution](#section-9-2)
  - [9.3 RouterLink vs a：client navigation、href generation、active state 与 full reload boundary](#section-9-3)
  - [9.4 RouterView：matched route record、view component 与 nested outlet](#section-9-4)
  - [9.5 route records：path、name、component、children、redirect、alias 与 matching order](#section-9-5)
  - [9.6 dynamic routes：params、route reuse、onBeforeRouteUpdate 与 per-route validation](#section-9-6)
  - [9.7 query state：route.query、router.push / replace 与 URL-owned UI state](#section-9-7)
  - [9.8 named routes and programmatic navigation：routeNames、params、query 与 navigation failures](#section-9-8)
  - [9.9 route meta：typed RouteMeta、auth fields、menu fields 与 breadcrumb fields](#section-9-9)
  - [9.10 global guards：beforeEach、beforeResolve、afterEach 与 guard pipeline](#section-9-10)
  - [9.11 per-route and in-component guards：beforeEnter、onBeforeRouteLeave、onBeforeRouteUpdate](#section-9-11)
  - [9.12 permission routing：auth guard、permission guard、403 redirect 与 backend authorization boundary](#section-9-12)
  - [9.13 dynamic menu：route records to menu items、meta filtering 与 role-based visibility](#section-9-13)
  - [9.14 lazy loading routes：dynamic import、route chunks 与 bundle boundary](#section-9-14)
  - [9.15 scroll behavior：savedPosition、top reset、hash selector 与 history boundary](#section-9-15)
  - [9.16 typed routes：RouteRecordInfo、TypesConfig、route names 与 params type boundary](#section-9-16)
  - [9.17 404, redirect, alias：catch-all route、legacy route redirect 与 alias matching](#section-9-17)
  - [9.18 Chapter integration：从 Chapter 05 route meta contract 迁移到真实 Vue Router](#section-9-18)
  - [9.19 Final integration：vue-admin-router-lab 如何组织 admin routing、guards、menu 与 pages](#section-9-19)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标与章节适配](#121-项目目标与章节适配)
  - [12.2 文件结构与路由表](#122-文件结构与路由表)
  - [12.3 边界地图](#123-边界地图)
  - [12.4 核心 Router 完整代码](#124-核心-router-完整代码)
  - [12.5 关键 View 与最终 Lab 完整代码](#125-关键-view-与最终-lab-完整代码)
  - [12.6 运行、预期行为、安全边界与扩展](#126-运行预期行为安全边界与扩展)
- [13. 额外速查表](#13-额外速查表)
- [14. 真实项目判断模型](#14-真实项目判断模型)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标 | 真实文件 | 类型 | 对应章节 |
| --- | --- | --- | --- |
| Router 创建与注册 | `src/learning/vue/chapter-06-vue-router-permission/router/index.ts` | Router instance | 9.1–9.2 |
| 路由表与 matching | `src/learning/vue/chapter-06-vue-router-permission/router/routes.ts` | route records | 9.4–9.6、9.17 |
| typed meta | `src/learning/vue/chapter-06-vue-router-permission/router/routeMeta.ts` | module augmentation | 9.9、9.18 |
| typed names / params | `src/learning/vue/chapter-06-vue-router-permission/router/routeNames.ts`、`typedRoutes.ts` | type contract | 9.8、9.16 |
| auth simulation | `src/learning/vue/chapter-06-vue-router-permission/router/authSession.ts` | module-local reactive state | 9.12 |
| guards | `router/authGuard.ts`、`permissionGuard.ts`、`guardPipeline.ts` | navigation control | 9.10–9.12 |
| guard trace | `src/learning/vue/chapter-06-vue-router-permission/router/navigationTrace.ts` | learning state | 9.10 |
| dynamic menu | `src/learning/vue/chapter-06-vue-router-permission/router/dynamicMenu.ts` | route-derived menu | 9.13 |
| lazy boundaries | `src/learning/vue/chapter-06-vue-router-permission/router/lazyRoutes.ts` | dynamic imports | 9.14 |
| scroll behavior | `src/learning/vue/chapter-06-vue-router-permission/router/scrollBehavior.ts` | browser navigation behavior | 9.15 |
| nested outlet | `src/learning/vue/chapter-06-vue-router-permission/layouts/AdminRouterLayout.vue` | layout route component | 9.4 |
| params / query / component guards | `src/learning/vue/chapter-06-vue-router-permission/views/UserDetailView.vue` | dynamic route view | 9.6–9.7、9.11 |
| final project | `src/learning/vue/chapter-06-vue-router-permission/router-lab/VueAdminRouterLab.vue` | integration lab | 9.19、12 |
| application plugin boundary | `src/learning/vue/chapter-01-application-boundary/main.ts` | existing app entry | 9.2 |

未带完整前缀的 `router/` 路径均相对 `src/learning/vue/chapter-06-vue-router-permission/`。

## 0. 本章机制边界

本章的边界是 Vue Router 如何把 browser URL 解析成 route records，再驱动 component rendering 和 client-side permission UX。`router/index.ts` 用 `createRouter`、`createWebHistory` 创建 router instance；`routes.ts` 保存 path/name/component/children/redirect/alias；`routeMeta.ts` 为 auth、menu、breadcrumb 建 typed meta；`authGuard.ts`、`permissionGuard.ts`、`guardPipeline.ts` 控制 navigation；`dynamicMenu.ts` 从同一 records/meta tree 派生菜单；`AdminRouterLayout.vue`、`UserDetailView.vue`、lazy route views 和 `VueAdminRouterLab.vue` 展示 `RouterView`、params、query、lazy component 与 trace。

执行 owner 是 Router runtime 与 browser history：URL 先进入 history adapter，matcher 产出 matched route records，guards 决定 allow/redirect/cancel，confirmed route 更新 reactive `route` object，`RouterView` 按 depth 渲染对应 component。TypeScript 能约束 route names、部分 params helper、RouteMeta shape 和 guard function return，但不能验证用户手输 URL 的语义，不能证明 query 是合法业务值，更不能替代 backend authorization。

跨边界的值包括 URL path/search/hash、history state、route params/query、route record meta、guard return value、lazy import Promise、current route object、menu item、breadcrumb 和 component instance reuse signal。它纠正的误解是“Router guard 就是安全权限”或“URL 只是显示文本”。本章必须把后端授权、token/session 真实性、server route protection 和持久 auth 放在外部；Chapter 07 可接管 client auth state，真实 security 仍由 backend/server API 判断。

## 1. 本章解决的问题

第 5 章只能定义纯 TypeScript `RouteMetaContract`，因为 Router 尚未安装。本章第一次建立真实 URL → route record → guard → `RouterView` → route component 数据流，并回答：

1. 为什么点击内部链接可以改变 URL 和页面组件，却不重新请求整份 document？
2. `/router/users/u-100?tab=security` 如何产生 params、query、matched records 和 merged meta？
3. 全局、per-route 与 in-component guards 分别在哪个阶段运行？
4. 为什么菜单隐藏和前端 403 都不能替代 backend authorization？
5. dynamic import、history mode、typed routes 分别属于 bundling、browser platform 和 TypeScript 哪一层？

## 2. 前置概念

| 前置章节 | 本章连接 |
| --- | --- |
| Chapter 01 | `createApp`、plugin registration、Vite entry；现在加入 `app.use(router)` |
| Chapter 02 | `route` 是 reactive object；只 watch 具体 param/query |
| Chapter 03 | route components 仍是普通 Vue components，由 `RouterView` 选择 |
| Chapter 04 | `useRouter`、`useRoute` 与 component guards 是 Router composables |
| Chapter 05 | local route meta type 迁移为真实 `RouteMeta` / `TypesConfig` augmentation |
| Browser | URL、History API、document request、back/forward 与 scroll |

## 3. 学习目标

- 能从 browser URL 追踪 matched records、params、query、meta、guard result 和 rendered component。
- 能配置 nested、dynamic、named、redirect、alias、404 和 lazy routes。
- 能实现 auth/permission guard，并保留登录前目标 URL。
- 能从 route records 与 typed meta 生成 role-aware menu。
- 能解释 route reuse、`onBeforeRouteUpdate` 和 `onBeforeRouteLeave`。
- 能使用 `RouteRecordInfo` / `TypesConfig` 检查 route name 和 params。
- 能区分 frontend navigation control 与 backend authorization。
- 能说明 `createWebHistory()` 的 production fallback 边界。

## 4. 核心机制证据链总览

| Route mechanism | Chapter evidence | Runtime trace | Concrete failure |
| --- | --- | --- | --- |
| URL entry | `/admin/users/42?tab=orders` in `VueAdminRouterLab.vue` | `createWebHistory` 接收 path/search/hash | server refresh 未 fallback 时连 Router 都无法启动 |
| Matcher | `routes.ts` records with `children` and `name` | matcher 生成 `route.matched` 与 params strings | record order 错误导致 catch-all 抢先匹配 |
| View rendering | `AdminRouterLayout.vue` + nested `RouterView` | top view 渲染 layout，nested view 渲染 child record component | child route 有 record 但 layout 缺 outlet，页面空白 |
| URL-owned state | `UserDetailView.vue` reads params and query | param change may reuse same component instance; query push/replace changes history | 没有处理 `onBeforeRouteUpdate` 时显示旧 user |
| Meta contract | `routeMeta.ts` augments `RouteMeta` | records carry `requiresAuth`、roles、menu、breadcrumb | meta 字段拼写漂移，menu/guard/breadcrumb 读不同约定 |
| Guard pipeline | `beforeEach` in `authGuard.ts` / `permissionGuard.ts` | auth check then permission check returns allow/redirect/cancel | redirect loop、afterEach 误做阻止、403 route 丢失 |
| Dynamic menu | `dynamicMenu.ts` consumes route records + session access | menu visibility is derived navigation UI | 菜单隐藏被误当授权，直接输入 URL 仍要 guard/backend |
| Lazy component | `lazyRoutes.ts` `component: () => import(...)` | confirmed navigation loads chunk then `RouterView` renders | chunk load error 被误诊为 guard failure |
| Backend boundary | permission routing section + final lab | client guard only changes navigation UX | API 仍返回 200 给无权用户说明真正授权缺失 |

## 5. 核心术语表

| Concept | Layer | 精确定义 | 常见误解 |
| --- | --- | --- | --- |
| router instance | Vue Router runtime | 保存 matcher、history、guards 和 current route 的对象 | 新 Vue app |
| route record | Router configuration | path 到 component/meta/children 的配置记录 | 当前 route object |
| current route | reactive runtime value | 当前 URL 解析后的 normalized location | router instance |
| matched records | Router matcher | 从 parent 到 child 的匹配记录数组 | 只会有一条 |
| RouterView | Vue component | 按当前 depth 渲染对应 matched component | 自动生成页面 |
| params | URL path state | dynamic segment 提取的字符串值 | 任意对象存储 |
| query | URL search state | 可选 filter/tab/page 状态 | route identity 必需字段 |
| route meta | record metadata | auth、menu、breadcrumb 等导航信息 | backend security |
| navigation guard | Router runtime hook | allow、redirect、cancel 或 throw | 页面组件 lifecycle 本身 |
| navigation failure | Router runtime Error | aborted、cancelled、duplicated 等结果 | 所有 redirect 都是 failure |
| typed route | TypeScript contract | route name/path/raw params/normalized params map | runtime URL validator |

## 6. 底层心智模型

一次 `/router/users/u-100?tab=security` 导航的主链：

1. `RouterLink` 或 `router.push()` 请求一个 location。
2. Router 解析 URL，匹配 `/router` parent 和 `users/:userId` child。
3. normalized route 得到 `params.userId === "u-100"`、`query.tab === "security"`。
4. parent/child meta 形成当前 `route.meta`；`route.matched` 保留两条记录。
5. existing component leave guard、global `beforeEach`、reuse update guard、`beforeEnter`、lazy component resolution、`beforeResolve` 依次参与。
6. navigation 被确认后 current route reactive value 改变，依赖它的 renders/computed/watchers 重新执行。
7. top-level `RouterView` 渲染 `AdminRouterLayout`，nested `RouterView` 渲染 `UserDetailView`。
8. `afterEach` 记录成功或 failure，但不能改变已经确认的导航。
9. Vite 只在第一次访问对应 lazy boundary 时请求其 chunk。
10. TypeScript 检查 route names/params/meta；浏览器实际 URL 和 backend access 仍需各自的 runtime checks。

## 7. 推荐目录结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Chapter 06 real file structure</span>
  </div>

```text
chapter-06-vue-router-permission/
  VueRouterChapterApp.vue
  router/
    index.ts
    routes.ts
    routeNames.ts
    routeMeta.ts
    typedRoutes.ts
    authSession.ts
    authGuard.ts
    permissionGuard.ts
    guardPipeline.ts
    dynamicMenu.ts
    lazyRoutes.ts
    scrollBehavior.ts
    navigationTrace.ts
  layouts/
    AdminRouterLayout.vue
  views/
    LoginView.vue
    DashboardView.vue
    UserListView.vue
    UserDetailView.vue
    RoleListView.vue
    OrderListView.vue
    ForbiddenView.vue
    NotFoundView.vue
  components/
    RouterConceptPanel.vue
    RouterLinkVsAnchor.vue
    ParamsQueryPanel.vue
    DynamicMenuPanel.vue
    GuardTracePanel.vue
    RouteMetaPanel.vue
    BreadcrumbTrail.vue
    PermissionBadge.vue
  router-lab/
    VueAdminRouterLab.vue
    RouterLabHomePanel.vue
    RouterLabScenarioPanel.vue
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/routes.ts</span>
  </div>

```ts
import type { RouteRecordRaw } from "vue-router";
import { lazyRouteComponents } from "./lazyRoutes";
import { routeNames } from "./routeNames";

const knownUserIds = new Set(["u-100", "u-200", "u-300"]);

export const routeRecords: Array<RouteRecordRaw> = [
  {
    path: "/router",
    component: lazyRouteComponents.adminLayout,
    redirect: {
      name: routeNames.dashboard,
    },
    meta: {
      title: "Router Admin",
      requiresAuth: true,
      requiredRoles: [],
      requiredPermissions: [],
      showInMenu: false,
      menuLabel: "Router Admin",
      menuOrder: 0,
      layout: "admin",
      breadcrumb: ["Router"],
    },
    children: [
      {
        path: "dashboard",
        alias: "/router/home",
        name: routeNames.dashboard,
        component: lazyRouteComponents.dashboard,
        meta: {
          title: "Dashboard",
          requiresAuth: true,
          requiredRoles: ["admin", "manager", "operator"],
          requiredPermissions: ["dashboard:view"],
          showInMenu: true,
          menuLabel: "Dashboard",
          menuOrder: 10,
          layout: "admin",
          breadcrumb: ["Dashboard"],
        },
      },
      {
        path: "users",
        name: routeNames.users,
        component: lazyRouteComponents.users,
        meta: {
          title: "User Management",
          requiresAuth: true,
          requiredRoles: ["admin", "manager"],
          requiredPermissions: ["users:view"],
          showInMenu: true,
          menuLabel: "Users",
          menuOrder: 20,
          layout: "admin",
          breadcrumb: ["Users"],
        },
      },
      {
        path: "users/:userId",
        name: routeNames.userDetail,
        component: lazyRouteComponents.userDetail,
        beforeEnter: (to) => {
          const userId = to.params.userId;

          if (
            typeof userId !== "string" ||
            !knownUserIds.has(userId)
          ) {
            return {
              name: routeNames.notFound,
              params: {
                pathMatch: to.path
                  .split("/")
                  .filter((segment) => segment.length > 0),
              },
            };
          }

          return true;
        },
        meta: {
          title: "User Detail",
          requiresAuth: true,
          requiredRoles: ["admin", "manager"],
          requiredPermissions: ["users:detail"],
          showInMenu: false,
          menuLabel: "User Detail",
          menuOrder: 21,
          layout: "admin",
          breadcrumb: ["Users", "Detail"],
        },
      },
      {
        path: "roles",
        name: routeNames.roles,
        component: lazyRouteComponents.roles,
        meta: {
          title: "Role Management",
          requiresAuth: true,
          requiredRoles: ["admin"],
          requiredPermissions: ["roles:view"],
          showInMenu: true,
          menuLabel: "Roles",
          menuOrder: 30,
          layout: "admin",
          breadcrumb: ["Roles"],
        },
      },
      {
        path: "orders",
        name: routeNames.orders,
        component: lazyRouteComponents.orders,
        meta: {
          title: "Order Management",
          requiresAuth: true,
          requiredRoles: ["admin", "manager", "operator"],
          requiredPermissions: ["orders:view"],
          showInMenu: true,
          menuLabel: "Orders",
          menuOrder: 40,
          layout: "admin",
          breadcrumb: ["Orders"],
        },
      },
    ],
  },
  {
    path: "/router/login",
    name: routeNames.login,
    component: lazyRouteComponents.login,
    meta: {
      title: "Router Login",
      requiresAuth: false,
      requiredRoles: [],
      requiredPermissions: [],
      showInMenu: false,
      menuLabel: "Login",
      menuOrder: 90,
      layout: "public",
      breadcrumb: ["Login"],
    },
  },
  {
    path: "/router/403",
    name: routeNames.forbidden,
    component: lazyRouteComponents.forbidden,
    meta: {
      title: "Forbidden",
      requiresAuth: false,
      requiredRoles: [],
      requiredPermissions: [],
      showInMenu: false,
      menuLabel: "Forbidden",
      menuOrder: 91,
      layout: "public",
      breadcrumb: ["Forbidden"],
    },
  },
  {
    path: "/router/legacy-users",
    redirect: {
      name: routeNames.users,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: routeNames.notFound,
    component: lazyRouteComponents.notFound,
    meta: {
      title: "Not Found",
      requiresAuth: false,
      requiredRoles: [],
      requiredPermissions: [],
      showInMenu: false,
      menuLabel: "Not Found",
      menuOrder: 99,
      layout: "public",
      breadcrumb: ["Not Found"],
    },
  },
];
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
npm run typecheck
npm run build
```

</div>

启动后可直接访问 `/router/login`。先以不同角色登录，再访问 `/router/dashboard`、`/router/users/u-100?tab=security`、`/router/roles`、`/router/orders?status=pending&page=1`、`/router/home` 和 `/router/legacy-users`，观察 URL、trace、menu 与两个 `RouterView`。

`npm run dev` 只启动 Vite module server；静态契约必须由 `npm run typecheck` 验证。`createWebHistory()` 的 production refresh 还要求 server fallback，本章不创建 deployment config。

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 SPA routing mental model：URL、history、router instance 与 no full reload

**结论：** Vue Router 把 browser URL 映射到 Vue component tree；client navigation 使用 History API 更新 URL，再改变 reactive current route，因此不必重新下载整份 document。

**本节解决的问题：** 解释从 `/router/login` 到 `/router/dashboard` 时，为什么 address bar 与页面内容变化，但 root app instance 没有重新创建。

**技术意义：** URL 成为可复制、可前进后退的应用状态入口，页面选择仍由 Vue render/update 完成。

**概念解释：** router instance 持有 history adapter、matcher、guard list 和 current route；URL 变化后 matcher 选择 records，`RouterView` 把 record component 接入现有 component tree。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** History API 管 URL；Router 管匹配与导航；Vue 管 component render；TS 管源码关系；Vite 管 modules/chunks；backend 独立授权。

**路由机制证据链：**

1. 当前 URL 是 `/router/login`。
2. matcher 命中 `router-login` record。
3. params 为空，query 可包含 `redirect`。
4. meta 表明 `requiresAuth: false`。
5. global guards 返回 `true`。
6. navigation 被确认。
7. top-level `RouterView` 渲染 `LoginView`。
8. 从其他 public view 进入时创建新的 login instance。
9. TS 检查 route name 与 query location shape。
10. TS 不验证 address bar 中的 redirect 是否安全。
11. Vite lazy-loads `LoginView` chunk。
12. frontend 可选择 view 和导航结果。
13. backend 仍必须验证真实登录与 API token。
14. 若 URL 改了但 view 不变，检查 route record 和 `RouterView`。

**TypeScript 编译期过程：** `TypesConfig.RouteNamedMap` 让 `{ name: routeNames.login }` 参与 name/params 检查，但不会执行导航。

**JavaScript / Vue Router 运行时过程：** `router.push` 调用 history adapter，guards 与 matcher 运行，current route 更新，依赖 current route 的 render effects 再执行。

**API / 语法规则：** `createRouter` 创建 router；`createWebHistory` 连接 browser history；`router.push` 产生新 history entry。

**文件结构：** `router/index.ts` 组合 history、records、scroll 和 guard pipeline。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/index.ts</span>
  </div>

```ts
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeRecords,
  scrollBehavior,
});

registerGuardPipeline(router);
```

</div>

**逐行解释：** `createWebHistory` 创建 browser adapter；records 提供 URL mapping；scroll 只处理确认后的页面位置；pipeline 在 initial resolution 前注册。

**执行过程：** click → resolved location → guards → lazy component resolution → current route mutation → `RouterView` render → DOM patch。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** URL 与 current route 改变；matched 从 login record 变为 admin parent + child；对应 view instance 被替换或复用。

**为什么得到这个结果：** navigation 没有请求新 document，而是在同一 JavaScript runtime 中改变 router 的 reactive state。

**对比写法：** 普通 internal anchor 会让 browser 发起 document navigation；`RouterLink` 默认委托 router 完成 client navigation。

**常见错误为什么错：** 把 SPA routing 解释成“隐藏/显示组件”会遗漏 URL、history、matching、guards 和 nested outlet。

**与真实项目的关系：** admin SPA、知识库和 dashboard 都需要可分享 URL 与 browser history，而不是只有 component-local tab state。

**与当前学习主线的关系：** Chapter 01 的 application instance 保持不变，Chapter 02 的 reactive update 机制现在由 current route mutation 触发。

**最终记忆模型：** location request → history/matcher/guards → reactive route → RouterView → Vue patch，不重新创建 app。

<a id="section-9-2"></a>

### 9.2 router installation：createRouter、createWebHistory、app.use(router) 与 initial route resolution

**结论：** Router 必须在既有 app 上、`mount` 前注册；`app.use(router)` 安装全局 components/properties/composables，并触发 initial route resolution。

**本节解决的问题：** 说明为什么不能另建一个 `createApp`，以及为什么本项目修改实际 entry 而不是创建不存在的 `src/main.ts`。

**技术意义：** 一个 DOM root 对应一个 application context，Router 与所有章节共享同一 provide/plugin/component tree。

**概念解释：** plugin installation 把 `RouterLink`、`RouterView`、`$router`、`$route` 和 injection keys 放入 app context；组件 setup 才能通过 `useRouter`/`useRoute` 读取。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** install 是 Vue application boundary；history 读取初始 URL；guards 在 mount 周期前后解析；与 backend 无关。

**路由机制证据链：**

1. browser 初始 URL 例如 `/router/orders`。
2. records 命中 admin parent 与 orders child。
3. params 为空，query 可能含 status/page。
4. meta 合并为 orders access contract。
5. `beforeEach` 在 initial navigation 运行。
6. signed-out session 被 redirect 到 login。
7. top-level outlet 最终渲染 `LoginView`。
8. app mount 一次，route component 随 navigation 创建。
9. TS 检查 router plugin import 与 route records。
10. TS 不确认 server 是否支持直接 refresh。
11. Vite eagerly bundles entry/router core，views 仍 lazy。
12. frontend redirect 改善未登录体验。
13. backend 仍拒绝未授权 order API。
14. `useRoute()` injection missing 通常说明 plugin 未注册或注册太晚。

**TypeScript 编译期过程：** module augmentation 在整个 app compilation 中合并 `RouteMeta`/`TypesConfig`；`app.use` 参数被检查为 plugin。

**JavaScript / Vue Router 运行时过程：** app 创建 → router module 创建 instance/guards → `app.use(router)` 安装 → router 解析 current location → app mount。

**API / 语法规则：** `use()` 必须在 `mount()` 前；只创建一个 app；本项目 entry 由 `index.html` 决定。

**文件结构：** 真实 entry 是 `src/learning/vue/chapter-01-application-boundary/main.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-01-application-boundary/main.ts</span>
  </div>

```ts
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "../chapter-06-vue-router-permission/router";

const app = createApp(App);

app.use(router);
app.mount("#app");
```

</div>

**逐行解释：** imports 连接同一 module graph；`createApp` 只调用一次；Router plugin 先进入 app context；最后 mount root。

**执行过程：** Vite 加载 entry → ES modules 初始化 router → guards 注册 → plugin install → initial route resolution → root render。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** initial URL 在 app 首次 render 前被解析；最终 matched/redirected route 决定 outlet 首次 component。

**为什么得到这个结果：** `useRoute` 依赖 router 提供的 injection context，context 只能通过同一 app 的 plugin install 建立。

**对比写法：** 第二个 `createApp` 会创建隔离的 context 和另一个 root 生命周期，不会“给原 app 补一个 Router”。

**常见错误为什么错：** `createApp(App).mount(...); app.use(router)` 已经晚于 component setup，且 mounted app 变量也不存在。

**与真实项目的关系：** state、i18n、Router、error handlers 等 application plugins 都应在统一 bootstrap 中排序。

**与当前学习主线的关系：** 直接扩展 Chapter 01 的 plugin boundary，不重写既有 entry 或 previous chapter components。

**最终记忆模型：** one entry → one app → install router → resolve initial URL → mount。

<a id="section-9-3"></a>

### 9.3 RouterLink vs a：client navigation、href generation、active state 与 full reload boundary

**结论：** `RouterLink` 生成真实 href，但对可处理的内部 click 调用 Router navigation；普通 `<a>` 默认把 URL 交给 browser document navigation。

**本节解决的问题：** 解释两者都渲染链接时，为何 lifecycle、network 与 app state 结果不同。

**技术意义：** 内部导航保留 SPA runtime、执行 guards、支持 named route encoding 与 active classes，同时仍保留可访问的 link semantics。

**概念解释：** `RouterLink` 的 `to` 接受与 `router.push` 相同的 location；Router resolve 计算 href，click handler 在合适条件下阻止默认 document request。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** anchor default 属于 browser；RouterLink intercept 属于 Router；component update 属于 Vue；external/download/new-tab 等 browser intent 不应被错误拦截。

**路由机制证据链：**

1. 当前 URL 是 `/router/login`。
2. 点击 dashboard named location 匹配 admin/dashboard records。
3. params/query 为空。
4. dashboard meta 要求 auth/permission。
5. `beforeEach` 执行。
6. signed-out 被 redirect；admin 被允许。
7. outlet 渲染 login 或 nested dashboard。
8. RouterLink navigation 保留 root app instance。
9. TS 检查 `to.name` 与 params。
10. TS 不判断用户实际是否登录。
11. dashboard view chunk 按需加载。
12. frontend 控制导航与 active state。
13. backend 控制 dashboard data access。
14. 若内部 click 导致整页白屏/network document，检查是否误用 anchor。

**TypeScript 编译期过程：** typed route map 让 `:to="{ name: routeNames.dashboard }"` 拒绝不存在的 name 或多余 required params。

**JavaScript / Vue Router 运行时过程：** RouterLink resolve href；click 调用 `router.push`；guards/async components 完成后 current route 改变。

**API / 语法规则：** internal declarative navigation 用 `RouterLink`；普通 anchor 仍适合真正 document navigation。

**文件结构：** `components/RouterLinkVsAnchor.vue` 并列展示两种行为。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/components/RouterLinkVsAnchor.vue</span>
  </div>

```vue
<RouterLink :to="{ name: routeNames.dashboard }">
  RouterLink to dashboard
</RouterLink>
<a href="/router/dashboard">
  Anchor to dashboard
</a>
```

</div>

**逐行解释：** 第一项通过 route name 解析 href 并进入 Router pipeline；第二项只给 browser 一个 href。

**执行过程：** RouterLink click → prevent default → resolve/navigation；anchor click → browser document request → server must return app entry。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** 两者目标 URL 可相同，但 RouterLink 保留 app/context；anchor 可能销毁所有 instances 后从 entry 重建。

**为什么得到这个结果：** browser 与 Router 对 click 的 ownership 不同。

**对比写法：** 用 path string 可以工作，但 named location 能由 Router 负责 encoding，并减少 path duplication。

**常见错误为什么错：** 把所有 anchor 都替换为 RouterLink 也不对；真实 external/document navigation 不属于 client matcher。

**与真实项目的关系：** sidebar、breadcrumb、pagination link 通常使用 RouterLink；文件下载和跨站 link 继续使用 anchor。

**与当前学习主线的关系：** Chapter 03 的 component prop 现在承载 typed route location，click intent 进入 Router 而不是直接 emit 给 parent。

**最终记忆模型：** RouterLink = anchor semantics + Router-resolved href + client navigation。

<a id="section-9-4"></a>

### 9.4 RouterView：matched route record、view component 与 nested outlet

**结论：** 每个 `RouterView` 按自身 depth 渲染 `route.matched[depth]` 对应 component；nested records 需要 nested outlets。

**本节解决的问题：** 解释 `/router/users` 为什么同时出现 admin layout 和 user list，而不是只渲染一个扁平组件。

**技术意义：** URL segments 与 component layout hierarchy 对齐，shared sidebar/header 不需要复制到每个 page。

**概念解释：** top-level outlet depth 0 渲染 admin parent；`AdminRouterLayout` 内的 outlet depth 1 渲染 users child；两者都是普通 Vue components。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** matcher 产生 matched array；RouterView 注入 depth；Vue 创建/复用 instances；layout 不承担授权。

**路由机制证据链：**

1. URL 是 `/router/users`。
2. matched 为 `/router` parent + `users` child。
3. params/query 为空。
4. route.meta 以 child fields 为主，matched 保留两层 breadcrumb。
5. auth/permission guards 返回 true。
6. navigation confirmed。
7. top outlet 渲染 layout，nested outlet 渲染 `UserListView`。
8. dashboard → users 时 layout instance 复用，child instance 替换。
9. TS 检查 child route/component record shape。
10. TS 不验证 component runtime render 成功。
11. layout 与 users 都通过 lazy imports 加载并缓存。
12. frontend layout/menu 可隐藏入口。
13. backend users API 必须再次授权。
14. URL 匹配但页面空白时，检查对应 depth 是否有 RouterView。

**TypeScript 编译期过程：** `RouteRecordRaw.children` 与 lazy component functions 被检查；template 中 `RouterView` 由 plugin/global types 识别。

**JavaScript / Vue Router 运行时过程：** matcher 创建 two-record chain；RouterView 读取 current route 和 injected depth；render effect 创建正确 component vnode。

**API / 语法规则：** child path 不以 `/` 开头时相对 parent；parent route component 必须包含 nested outlet 才显示 child。

**文件结构：** top outlet 在 `VueAdminRouterLab.vue`，nested outlet 在 `AdminRouterLayout.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/layouts/AdminRouterLayout.vue</span>
  </div>

```vue
<div class="admin-body">
  <aside>
    <DynamicMenuPanel />
  </aside>
  <main class="route-outlet">
    <RouterView />
  </main>
</div>
```

</div>

**逐行解释：** aside 属于 parent layout；nested RouterView 是 child insertion point；child route change 只替换 main 内部 instance。

**执行过程：** current route changes → both RouterViews re-render → depth 0 record remains → depth 1 component vnode changes → Vue patches nested subtree。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** matched depth 决定 component tree；layout identity 不变时被复用，child route component 按 record identity 创建/卸载。

**为什么得到这个结果：** nested routes 不是字符串分组，而是 matcher record hierarchy 与 RouterView depth 的对应关系。

**对比写法：** 只有 children 没有 parent RouterView 会匹配成功但无位置渲染 child。

**常见错误为什么错：** 在每个 page 复制 sidebar 绕开 nested outlet，会造成 layout state/markup drift。

**与真实项目的关系：** admin shell、account settings、project workspace 常使用 stable parent layout + changing child page。

**与当前学习主线的关系：** Chapter 03 的 slot/component tree 认知扩展为 Router 根据 URL 选择动态 child component。

**最终记忆模型：** matched record index ↔ RouterView depth ↔ component instance。

<a id="section-9-5"></a>

### 9.5 route records：path、name、component、children、redirect、alias 与 matching order

**结论：** route record 是 URL matching contract；`path` 定模式，`name` 定稳定 identity，`component` 定 view，`children` 定 hierarchy，redirect 与 alias 改变匹配方式但语义不同。

**本节解决的问题：** 避免把 route table 当普通 menu list，并明确 `/router`、`/router/home`、`/router/legacy-users` 与 catch-all 的不同结果。

**技术意义：** 单一 records tree 同时驱动 matcher、guards、meta、menu 与 typed navigation，减少平行配置漂移。

**概念解释：** redirect 启动新目标 navigation，URL 指向 target；alias 保留 alias URL，却按原 record 匹配；catch-all 接住未匹配 location。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** record 是配置；matcher 在 runtime 排序匹配；component 由 Vue render；redirect/alias 不改变 backend policy。

**路由机制证据链：**

1. URL 可为 `/router/home`。
2. alias 匹配 dashboard child 与 admin parent。
3. params/query 为空。
4. dashboard meta 被读取。
5. global guards 执行 target access checks。
6. navigation 保留 `/router/home` 并被允许或 redirected。
7. outlets 渲染 layout + dashboard。
8. 从 `/router/dashboard` 到 alias 可能复用 same route component。
9. TS 检查 record fields 和 named locations。
10. TS 不检查生产服务器 fallback。
11. Vite 根据 component import eager/lazy bundling。
12. frontend records 控制 visible page structure。
13. backend authorization 不读取这些 client records。
14. legacy URL 行为错误时检查 redirect/alias 是否混用。

**TypeScript 编译期过程：** `Array<RouteRecordRaw>` 检查 record union；typed route map 限制 names 与 params。

**JavaScript / Vue Router 运行时过程：** matcher 编译 path patterns；location resolve 返回 matched records；redirect record 丢弃当前 navigation 并创建目标 navigation。

**API / 语法规则：** nested parent 同时有 redirect/children 时仍需 component；absolute alias 以 `/` 开头；catch-all 使用 `/:pathMatch(.*)*`。

**文件结构：** 全部 records 集中在 `router/routes.ts`，catch-all 是数组最后一项。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/routes.ts</span>
  </div>

```ts
{
  path: "/router",
  component: lazyRouteComponents.adminLayout,
  redirect: { name: routeNames.dashboard },
  children: [
    {
      path: "dashboard",
      alias: "/router/home",
      name: routeNames.dashboard,
      component: lazyRouteComponents.dashboard,
    },
  ],
}
```

</div>

**逐行解释：** parent 建立 layout depth；redirect 处理 exact `/router`；relative child 组成 `/router/dashboard`；absolute alias 保持 `/router/home`。

**执行过程：** location parse → path matcher → redirect/alias normalization → guard pipeline → component resolution → outlet render。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** redirect 改 URL/target records；alias 保留 URL 但得到 dashboard records；children 增加 matched depth。

**为什么得到这个结果：** Router 区分“目标 location 重写”和“另一个 path 指向同一 record”。

**对比写法：** 独立复制一个 `/router/home` component record 会产生不同 record identity/meta，容易与 dashboard 漂移。

**常见错误为什么错：** catch-all 放在配置意图上应最后，便于审查 unmatched fallback；过早的宽泛 matcher 会遮蔽具体设计错误。

**与真实项目的关系：** product migrations 用 redirect；alternate public URL 用 alias；stable name 供 navigation；children 表达 layout。

**与当前学习主线的关系：** Chapter 05 的 plain route contract 现在成为 Router 真正消费的 runtime records。

**最终记忆模型：** path 匹配、name 导航、component 渲染、children 嵌套、redirect 换目标、alias 保留 URL。

<a id="section-9-6"></a>

### 9.6 dynamic routes：params、route reuse、onBeforeRouteUpdate 与 per-route validation

**结论：** `:userId` 把 path segment 解析成 string param；同一 record 的 param 改变通常复用 component instance，因此必须观察具体 param 或使用 update guard。

**本节解决的问题：** 解释 `/router/users/u-100` 到 `u-200` 时为什么 setup 不重跑，以及如何在 route entry 与 reused update 两条路径验证 id。

**技术意义：** route identity 与 resource identity 分开：同一 page component 可展示不同 user，同时保留 instance-local state。

**概念解释：** `beforeEnter` 适合首次进入 record，但官方行为是不因同一 record 的 params/query/hash 改变而再次运行；本例同时在 `onBeforeRouteUpdate` 检查 known IDs。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** matcher 产生 string param；Router 决定 reuse；component guard 可 cancel/redirect；API existence 仍由 backend 确认。

**路由机制证据链：**

1. URL 从 `/router/users/u-100` 变为 `/router/users/u-200`。
2. parent 和 `router-user-detail` records 不变。
3. `params.userId` 从 `u-100` 变为 `u-200`。
4. user detail meta 不变。
5. `onBeforeRouteUpdate` 运行；同-record `beforeEnter` 不重跑。
6. known ID 返回 `true`；unknown ID redirect 404。
7. nested outlet 继续渲染 `UserDetailView`。
8. component instance 被复用，setup/local ref 保留。
9. TS 约束 raw/normalized userId 为 string。
10. TS 不验证 ID 是否真实存在。
11. Vite 不重复加载已缓存的 view chunk。
12. frontend 可阻止明显无效 route。
13. backend 必须确认 user exists 且 caller 可读。
14. param 变了但 data 不变时，检查是否只依赖 initial setup。

**TypeScript 编译期过程：** `RouteRecordInfo` 规定 `router-user-detail` 必须携带 `{ userId: string }`，`useRoute(routeNames.userDetail)` 提供 normalized param type。

**JavaScript / Vue Router 运行时过程：** matcher 提取 segment；update guard 在 reused component 上运行；current route 确认后 watcher 更新 `visibleUserId`。

**API / 语法规则：** dynamic segment 以 `:` 开头；params 适合 route/resource identity；同-record reuse 不能依赖 remount。

**文件结构：** `routes.ts` 有 per-route `beforeEnter`，`UserDetailView.vue` 有 watcher、update/leave guards。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/views/UserDetailView.vue</span>
  </div>

```ts
watch(
  () => route.params.userId,
  (userId) => {
    visibleUserId.value = userId;
  },
);

onBeforeRouteUpdate((to) => {
  const userId = to.params.userId;
  return typeof userId === "string" && knownUserIds.has(userId)
    ? true
    : { name: routeNames.notFound };
});
```

</div>

**逐行解释：** watcher 只订阅具体 param；update guard 读取 target param 并决定 allow/redirect；两者职责分别是 state sync 与 navigation decision。

**执行过程：** push new param → global guards → reused component update guard → confirmation → route param reactive mutation → watcher callback → render patch。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** 只有 param/current route value 改变；matched、meta、outlet depth 和 instance identity 保持。

**为什么得到这个结果：** Vue Router 以 matched record/component type 判断 reuse，不以每个 param 值创建新 component type。

**对比写法：** 给 RouterView 添加 arbitrary key 强制 remount 会丢掉 local state，通常不如明确处理 param update。

**常见错误为什么错：** 只在 `onMounted` 读取 param 会把 reactive route 当一次性 input。

**与真实项目的关系：** user/profile/order detail 等 resource routes 经常在同一 component instance 中切换 ID。

**与当前学习主线的关系：** Chapter 02 的 specific-source watch 与 Chapter 04 composable input 现在作用于 reactive route property。

**最终记忆模型：** same record + new param → reuse instance → update guard/watch specific param。

<a id="section-9-7"></a>

### 9.7 query state：route.query、router.push / replace 与 URL-owned UI state

**结论：** query 适合 tab、filter、page 等可选 UI state；`push` 增加 history entry，`replace` 更新当前 entry。

**本节解决的问题：** 区分 `/router/users/u-100` 中的 identity param 与 `?tab=security` 的 optional presentation state。

**技术意义：** filter/tab/page 可复制、刷新恢复、back/forward，避免只藏在 component-local ref。

**概念解释：** query values 来自 URL，normalized 类型可能是 string、string array 或 null；读取时必须缩窄，写入时决定保留、删除和 history semantics。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** query 属于 URL；replace 对应 history replace；route reactive update 驱动 computed/render；query 不是可信 backend filter。

**路由机制证据链：**

1. URL 是 `/router/orders?status=pending&page=1`。
2. records 命中 admin + orders。
3. params 为空，query 提供两个 strings。
4. orders meta 决定 access/menu。
5. guards 不因 query 内容改变 permission。
6. valid session navigation allowed。
7. nested outlet 渲染 `OrderListView`。
8. query-only change 复用 order component。
9. TS 检查 location query value types。
10. TS 不证明 `page` 是正整数。
11. orders chunk 已加载时不再请求。
12. frontend 可根据 query filter local rows。
13. backend 必须验证真实 API query 与权限。
14. refresh 后 filter 丢失说明 state 未写入 URL。

**TypeScript 编译期过程：** `route.query.page` 需要 runtime narrowing；`router.replace({ query })` 检查可序列化 query shape。

**JavaScript / Vue Router 运行时过程：** replace serializes query，调用 History API 替换 entry，current route 更新，computed filters 重新求值。

**API / 语法规则：** params 表示 path identity；query 表示 optional state；`undefined` 可移除 query key。

**文件结构：** `ParamsQueryPanel.vue` 和 `OrderListView.vue` 展示 read/replace/preserve。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/views/OrderListView.vue</span>
  </div>

```ts
async function setStatus(status: string): Promise<void> {
  await router.replace({
    query: {
      ...route.query,
      status: status === "all" ? undefined : status,
      page: "1",
    },
  });
}
```

</div>

**逐行解释：** await 等待 navigation；spread 保留无关 query；all 删除 status；filter 变化把 page 重置；replace 不新增 back-stack entry。

**执行过程：** button click → replace location → query stringify → guards/update hooks → current route query mutation → computed list rerun → DOM list patch。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** records/meta/instance 不变；query 和依赖它的 computed/render 改变。

**为什么得到这个结果：** query 不参与 record identity，却属于 normalized current route 的 reactive fields。

**对比写法：** `push` 适合用户期望 back 回到上一 filter 的状态；频繁 tab/filter 可用 replace 避免污染 history。

**常见错误为什么错：** 把对象塞进 query 会经过字符串序列化，不能保留 JavaScript reference 或 class instance。

**与真实项目的关系：** table filter、search、pagination、selected tab 常以 query 表达。

**与当前学习主线的关系：** Chapter 04 的 local `URLSearchParams` model 现在接入真实 Router-owned URL。

**最终记忆模型：** params 选 route/resource；query 描述 optional view state；push/replace 决定 history。

<a id="section-9-8"></a>

### 9.8 named routes and programmatic navigation：routeNames、params、query 与 navigation failures

**结论：** named route 让 Router 生成/encode path；programmatic navigation 返回 Promise，结果可能是 success、redirect 或 navigation failure。

**本节解决的问题：** 消除散落 path string，并正确处理 duplicated、aborted、cancelled 等“仍停留原页面”的情况。

**技术意义：** route rename 集中在 records/name contract，调用方以 name + params 表达 intent；异步结果可驱动 menu/dialog UX。

**概念解释：** `router.push` 类似 RouterLink navigation 并新增 history entry；resolved falsy 通常表示成功或 redirect，NavigationFailure 表示 navigation 被阻止。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** named location 属于 Router；Promise/failure 属于 runtime；TypesConfig 只检查编译期；backend 不接受 route success 作为授权证明。

**路由机制证据链：**

1. 当前 URL 可能是 `/router/dashboard`。
2. push roles 匹配 admin + roles records。
3. params/query 为空。
4. roles meta 要求 admin/roles permission。
5. permission guard 对 operator 返回 403 redirect。
6. original navigation redirected，新 navigation 成功。
7. outlets 最终渲染 `ForbiddenView`。
8. dashboard child 被卸载，public forbidden replaces top view。
9. TS 检查 `routeNames.roles` 和 params absence。
10. TS 不知道当前 runtime role。
11. roles 或 forbidden chunk 按最终 target 加载。
12. frontend 可呈现 403 UX。
13. backend 必须独立拒绝 role mutation。
14. click 后 UI 没关闭时检查是否 await navigation result。

**TypeScript 编译期过程：** `routeNames as const` 产生 literal union；`TypesConfig` 把 route name 映射到 raw params。

**JavaScript / Vue Router 运行时过程：** push resolve target、run guards、await async components，并返回 undefined 或 failure object。

**API / 语法规则：** name + params 由 Router encoding；path + params 时 params 会被忽略；用 `isNavigationFailure` 判断 failure。

**文件结构：** `routeNames.ts` 集中 names；`RouterLabScenarioPanel.vue` await push result。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router-lab/RouterLabScenarioPanel.vue</span>
  </div>

```ts
const result = await router.push({
  name: routeNames.roles,
});

resultMessage.value = isNavigationFailure(result)
  ? `Navigation failure type: ${result.type}`
  : "Navigation completed or redirected.";
```

</div>

**逐行解释：** await 等待 pipeline；failure predicate 缩窄 Error subtype；redirect 不等同于 aborted failure。

**执行过程：** handler → named resolve → guards → target/redirect resolution → Promise settles → status ref mutation → component render update。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** final URL 取决于 guard；failure 时 current route/instances 保持，redirect 时转到新 records。

**为什么得到这个结果：** Router 将“requested navigation”和“最终 current route”分开建模。

**对比写法：** 立即执行 post-navigation UI cleanup 会在 aborted navigation 时也关闭 UI；await 后再判断更准确。

**常见错误为什么错：** `{ path: "/router/users", params: { userId } }` 不会自动拼 dynamic segment。

**与真实项目的关系：** login redirect、wizard step、mobile menu、save-and-leave 都需要等待 navigation。

**与当前学习主线的关系：** Chapter 05 的 literal unions 和 Result-like control flow 现在用于 route identity 与 failure branching。

**最终记忆模型：** name + params → Router builds URL；await push → success/redirect/failure。

<a id="section-9-9"></a>

### 9.9 route meta：typed RouteMeta、auth fields、menu fields 与 breadcrumb fields

**结论：** route meta 是附着在 records 上的导航/展示 metadata；module augmentation 让每条真实 record 的 meta fields 保持一致。

**本节解决的问题：** 把 auth、roles、permissions、menu、layout、breadcrumb 从散落条件集中到 route source of truth。

**技术意义：** guards、menu、breadcrumb 和 title 读取同一 record metadata，减少重复配置；但它仍是 client data。

**概念解释：** nested match 产生 `route.matched`；`route.meta` 是 parent 到 child 的 non-recursive merge，breadcrumb 需要遍历 matched records 才能保留两层数组。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** meta 在 runtime 是 ordinary object；augmentation 只影响 TS；guards/menu 消费它；backend 不信任它。

**路由机制证据链：**

1. URL 是 `/router/users`。
2. matched 是 admin parent + users child。
3. params/query 为空。
4. child meta 要求 manager/admin 和 users:view。
5. auth/permission guards 读取 merged meta。
6. allowed 或 redirect 403。
7. allowed 时 outlets 渲染 layout + list。
8. layout persists between admin children。
9. TS 要求 meta fields 的 literal unions/arrays。
10. TS 不验证 current user 来自可信 identity。
11. meta objects 与 route config eager bundle。
12. frontend 用 meta 控制 menu/breadcrumb。
13. backend 用 server identity/policy 授权 users data。
14. menu 与 guard 不一致时检查是否来自两套 metadata。

**TypeScript 编译期过程：** `interface RouteMeta extends AppRouteMeta` 合并 library interface；每个 meta object 检查 required fields 和 unions。

**JavaScript / Vue Router 运行时过程：** records 初始化 ordinary meta objects；matcher 创建 matched array 和 merged meta；components/guards reactive read current route meta。

**API / 语法规则：** meta 适合 navigation/display policy，不放 secrets、large mutable state 或 backend authorization result。

**文件结构：** `routeMeta.ts` 定 types/augmentation，`routes.ts` 提供 values，多个 consumers 读取。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/routeMeta.ts</span>
  </div>

```ts
export type AppRouteMeta = {
  title: string;
  requiresAuth: boolean;
  requiredRoles: ReadonlyArray<RouteRole>;
  requiredPermissions: ReadonlyArray<RoutePermission>;
  showInMenu: boolean;
  menuLabel: string;
  menuOrder: number;
  layout: RouteLayout;
  breadcrumb: ReadonlyArray<string>;
};

declare module "vue-router" {
  interface RouteMeta extends AppRouteMeta {}
}
```

</div>

**逐行解释：** meta contract 明确每个 consumer 需要的字段；readonly arrays 阻止 consumer mutation；augmentation 把 contract 接入 official type。

**执行过程：** compile checks records → runtime matcher exposes meta → guard/menu/breadcrumb computed reads → current route change triggers re-render。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** URL 决定 matched；matched 决定 merged meta；meta 决定 guard/menu，但不直接创建 component。

**为什么得到这个结果：** meta 与 record identity 绑定，所有 consumers 共享 matcher 已选中的 metadata。

**对比写法：** 另建 hard-coded menu roles list 会与 route guard fields 漂移。

**常见错误为什么错：** 把 `requiredPermissions` 当 security rule 忽略 client 可被修改。

**与真实项目的关系：** title、layout、breadcrumbs、feature labels、navigation policy 都可由 typed meta 统一表达。

**与当前学习主线的关系：** Chapter 05 的 local `RouteMetaContract` 在 dependency 安装后迁移成 real module augmentation。

**最终记忆模型：** record owns meta；matcher exposes meta；client consumers coordinate UX；server owns authorization。

<a id="section-9-10"></a>

### 9.10 global guards：beforeEach、beforeResolve、afterEach 与 guard pipeline

**结论：** `beforeEach` 做早期 auth/permission decision；`beforeResolve` 在 async components/in-component guards 解析后执行；`afterEach` 只能观察结果。

**本节解决的问题：** 避免把所有逻辑塞进一个 hook，或误以为 afterEach 能 cancel navigation。

**技术意义：** 明确 pipeline stage 让 access decision、readiness work、title/trace 等 side effects 可预测。

**概念解释：** guards 按注册/official resolution flow 运行；return `false` cancels，route location redirects，`true`/undefined allows，throw produces error。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** guards 在 Router runtime；beforeResolve 等待 lazy components；afterEach 可收到 failure；none secures API。

**路由机制证据链：**

1. 当前 URL `/router/login`，target `/router/orders`。
2. target 匹配 admin + orders。
3. target query 可含 status。
4. orders meta 要求 auth/roles/orders:view。
5. beforeEach 先 auth 后 permission。
6. allow 后 lazy resolve、beforeResolve、confirmation、afterEach。
7. outlets 渲染 layout + orders。
8. public login instance 被卸载。
9. TS 检查 guard return types/to/from types。
10. TS 不证明 runtime session authentic。
11. Vite loads target async components before beforeResolve。
12. frontend guard controls navigation UX。
13. backend rechecks order authorization。
14. trace order 异常时对照 beforeEach/update/beforeEnter/resolve flow。

**TypeScript 编译期过程：** Router hook callback 参数为 normalized locations；return 被约束为 `NavigationGuardReturn`。

**JavaScript / Vue Router 运行时过程：** each hook receives target/from; redirect drops current attempt and starts another; afterEach receives optional failure。

**API / 语法规则：** 本章使用 return-style guards，不混用 optional `next`；afterEach 不返回 decision。

**文件结构：** `guardPipeline.ts` 注册三类 global hooks；decision 分解到 auth/permission modules。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/guardPipeline.ts</span>
  </div>

```ts
router.beforeEach((to, from) => {
  const authResult = evaluateAuthGuard(to);
  return authResult === true
    ? evaluatePermissionGuard(to)
    : authResult;
});

router.beforeResolve(() => true);

router.afterEach((to, _from, failure) => {
  if (!failure) {
    document.title = `${to.meta.title} | Vue Router Lab`;
  }
});
```

</div>

**逐行解释：** beforeEach short-circuits auth redirect；permission 只在 auth pass 后运行；beforeResolve 表示 final readiness stage；afterEach 只执行 confirmed side effect。

**执行过程：** navigation trigger → leave guards → beforeEach → update/beforeEnter → lazy resolution → beforeResolve → confirmation → afterEach → DOM update。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** before hooks 基于 target values；只有确认后 current route/RouterView instance tree 才切换。

**为什么得到这个结果：** Router 把 pending target 与 confirmed current route 分开，guards 在 commit 前控制结果。

**对比写法：** afterEach 中 return 403 location 没有效果，因为 navigation 已经确认。

**常见错误为什么错：** 同一 branch 同时调用 `next()` 又 return location 会产生 conflicting resolution；return-style 更清晰。

**与真实项目的关系：** auth、feature readiness、analytics/title/a11y announcement 应按 hook stage 分工。

**与当前学习主线的关系：** Chapter 04 的 function composition 现在用于 Router pipeline，但 demo session 仍明确不是 store。

**最终记忆模型：** beforeEach 决策 → resolve phase 完成 → beforeResolve final gate → afterEach 观察。

<a id="section-9-11"></a>

### 9.11 per-route and in-component guards：beforeEnter、onBeforeRouteLeave、onBeforeRouteUpdate

**结论：** `beforeEnter` 属于 record entry policy；update/leave guards 属于当前 route component instance 的 reuse 与 unsaved-state policy。

**本节解决的问题：** 决定 userId format validation、param reuse 和 unsaved changes 分别放在哪里。

**技术意义：** guard 与拥有相关信息的边界靠近：record 验证 path contract，component 验证 local instance state。

**概念解释：** `beforeEnter` 不因同-record param/query change 重跑；`onBeforeRouteUpdate` 能访问 reused setup state；`onBeforeRouteLeave` 可根据 local ref return false。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** record guard 无 component state；component guards 有 setup closure；window.confirm 是 browser API；backend 验证 resource existence。

**路由机制证据链：**

1. URL 是 `/router/users/u-100?tab=profile`。
2. matched 为 admin + user detail。
3. param `u-100`、query tab profile。
4. detail meta 要求 users:detail。
5. leave/update/beforeEnter 按 navigation type 运行。
6. false cancels；invalid ID redirects；valid returns true。
7. nested outlet 保持或替换 detail view。
8. param change reuse；leaving to orders unmounts after confirmation。
9. TS 检查 guard return location/boolean。
10. TS 不知道 user edited form or ID exists。
11. view chunk 已缓存。
12. frontend 避免 accidental navigation。
13. backend 确认 user access/existence。
14. guard “没运行”时先判断是不是同-record param change。

**TypeScript 编译期过程：** `to.params.userId` 受 normalized map 检查；leave callback closure 读取 `Ref<boolean>`。

**JavaScript / Vue Router 运行时过程：** pending navigation 调用 active component guards；return false 恢复 current URL；true 继续 pipeline。

**API / 语法规则：** record-specific initial validation 用 `beforeEnter`；reuse 用 `onBeforeRouteUpdate`；local dirty state 用 `onBeforeRouteLeave`。

**文件结构：** route guard 在 `routes.ts`，instance guards 在 `UserDetailView.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/views/UserDetailView.vue</span>
  </div>

```ts
onBeforeRouteLeave(() => {
  if (!hasUnsavedChanges.value) {
    return true;
  }

  return window.confirm(
    "Discard the local unsaved changes and leave this route?",
  );
});
```

</div>

**逐行解释：** guard closure 读取同一 component instance 的 ref；clean state allows；dirty state 把 decision 交给 temporary browser confirmation。

**执行过程：** target requested → active leave guard reads ref → false cancels or true continues → only confirmed navigation unmounts instance。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** cancelled 时全部保持；allowed leave 时 URL/records/outlet 更新并卸载 detail instance。

**为什么得到这个结果：** leave decision 依赖尚未卸载的 component-local state，所以必须在 instance guard 阶段读取。

**对比写法：** global guard 无法自然读取每个 editor 的 private dirty ref；把它提升为 global mutable state会破坏 ownership。

**常见错误为什么错：** production 直接依赖 `window.confirm` UX 有限；本章只把它作为最小 browser demo。

**与真实项目的关系：** multi-step form、editor、upload page 常需要 leave guard 和 custom modal policy。

**与当前学习主线的关系：** Chapter 03 component-local state 与 Chapter 04 lifecycle composable 现在参与 Router navigation lifecycle。

**最终记忆模型：** record policy 用 beforeEnter；reused instance 用 update guard；local exit policy 用 leave guard。

<a id="section-9-12"></a>

### 9.12 permission routing：auth guard、permission guard、403 redirect 与 backend authorization boundary

**结论：** auth guard 解决“是否有 demo session”，permission guard 解决“role/permission 是否允许进入 route”；二者只控制 client navigation，不提供 security。

**本节解决的问题：** 未登录保留目标并跳 login、已登录无权限跳 403，同时避免 login/403 infinite redirect。

**技术意义：** 把身份缺失和权限不足分为不同 UX，并使 guard decision 可测试、可追踪、可迁移到 Chapter 07 store。

**概念解释：** module-local `currentUser` 是 deterministic simulation；meta arrays 描述 client policy；backend identity/token/policy 不存在于本章。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** session ref 在 browser 可修改；guards 读取它并 redirect；backend API 必须完全独立授权。

**路由机制证据链：**

1. signed-out 用户请求 `/router/orders?status=pending`。
2. target 匹配 admin + orders。
3. query status 保留在 `to.fullPath`。
4. meta requires auth/roles/orders:view。
5. auth guard 返回 login location + redirect query。
6. original navigation dropped，login navigation allowed。
7. top outlet 渲染 `LoginView`。
8. admin layout 未创建。
9. TS 检查 roles/permissions literals。
10. TS 不验证 session authenticity。
11. login chunk 被加载，orders 可暂不加载。
12. frontend 控制 route/menu visibility。
13. backend 必须验证每个 order request。
14. login loop 通常来自未排除 login route。

**TypeScript 编译期过程：** `RouteRole`/`RoutePermission` unions 检查 meta 与 mock users；guard return type 检查 redirect shape。

**JavaScript / Vue Router 运行时过程：** readonly session ref 被 sign-in functions mutation；guards 每次 navigation 读取 current value；login 安全读取 internal redirect。

**API / 语法规则：** redirect target 用 `to.fullPath`；消费前只接受 `/router/` internal path；403 自身不要求 auth，避免 loop。

**文件结构：** `authSession.ts`、`authGuard.ts`、`permissionGuard.ts` 分离 state 与 decisions。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/authGuard.ts</span>
  </div>

```ts
if (
  to.meta.requiresAuth &&
  currentUser.value === null &&
  to.name !== routeNames.login
) {
  return {
    name: routeNames.login,
    query: { redirect: to.fullPath },
  };
}

return true;
```

</div>

**逐行解释：** 三个 conditions 分别检查 protected target、missing session、loop exclusion；redirect 保存完整 params/query/hash path。

**执行过程：** beforeEach → auth result → redirect creates new navigation → login meta allows → current route commits → sign-in reads safe redirect → replace original target。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** protected target 暂不 commit；login 成为 current route；sign-in 后重新解析原 fullPath。

**为什么得到这个结果：** guard return location 表示放弃当前 attempt 并创建新 navigation，而不是直接修改 component。

**对比写法：** menu-only filtering 没有阻止用户手输 URL；guard 提供 navigation control，但仍不是 server authorization。

**常见错误为什么错：** 任意使用 `redirect` query 会形成 open redirect；本例只接受 local `/router/` path。

**与真实项目的关系：** Chapter 07 会用 Pinia 替换 demo session；production 还需 token lifecycle、backend 403、refresh 和 policy versioning。

**与当前学习主线的关系：** Chapter 04 的 `usePermission` 概念和 Chapter 05 unions 现在进入真实 navigation pipeline。

**最终记忆模型：** auth absence → login + preserved target；permission absence → 403；API security → backend。

<a id="section-9-13"></a>

### 9.13 dynamic menu：route records to menu items、meta filtering 与 role-based visibility

**结论：** menu 应从同一 route records/meta tree 派生，按 session access 过滤并按 `menuOrder` 排序；它是 navigation UI，不是 authorization。

**本节解决的问题：** 避免 route table 和 hard-coded sidebar 两套结构长期漂移。

**技术意义：** route name、label、order、visibility、roles 和 permissions 只有一个 source of truth。

**概念解释：** computed menu 调用 `generateDynamicMenu(routeRecords)`；函数递归 children，隐藏 public/error/detail records，保留 allowed named records。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** records 是 runtime configuration；computed 依赖 currentUser ref；RouterLink 执行 navigation；hidden item 不保护 API。

**路由机制证据链：**

1. 当前 URL 可为任意 lab route。
2. menu 遍历全部 route records，不只 current matched。
3. menu item 本身不产生 params/query。
4. 读取 showInMenu/menuLabel/order/access fields。
5. click 后正常 guard pipeline 才执行。
6. hidden/denied item 不进入 menu；手输 URL 仍由 guard decision。
7. selected link 对应 outlet page。
8. session role change 只重算 menu，不自动 remount page。
9. TS 检查 `AppRouteName` 和 menu shape。
10. TS 不保证 record meta 是 trusted policy。
11. menu generator eager bundle，无 view eager load。
12. frontend 控制 discoverability。
13. backend 控制 operation permission。
14. sidebar 和 guards 不一致时查找 duplicated config。

**TypeScript 编译期过程：** type guard `isAppRouteName` 把 runtime record name 缩窄到 literal union；readonly children 限制 consumer mutation。

**JavaScript / Vue Router 运行时过程：** computed render 读取 `currentUser`；signIn/signOut mutation 触发 computed invalidation 与 menu DOM patch。

**API / 语法规则：** menu only includes `showInMenu` + named + allowed records；order numeric sort；RouterLink 使用 names。

**文件结构：** generator 在 `dynamicMenu.ts`，consumer 在 `DynamicMenuPanel.vue`，records 仍在 `routes.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/dynamicMenu.ts</span>
  </div>

```ts
export function generateDynamicMenu(
  records: readonly RouteRecordRaw[],
): ReadonlyArray<DynamicMenuItem> {
  return collectMenuItems(records);
}
```

</div>

**逐行解释：** public API 只接受 records 并返回 readonly items；recursion/filter/sort 封装在 internal function，调用方不维护第二棵 tree。

**执行过程：** component render → computed reads session → generator traverses records → filtered items → RouterLink vnodes → DOM list；role mutation 重复该链。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** menu derivation 不改变 URL/current route；只有 click 才产生 target/guards/outlet change。

**为什么得到这个结果：** Vue computed tracking 捕获 generator 内对 `currentUser.value` 的读取。

**对比写法：** 单独写 `const menu = [...]` 会重复 name/label/role，新增 route 时容易漏改。

**常见错误为什么错：** `display:none` 隐藏 link 不能阻止直接调用 protected API。

**与真实项目的关系：** admin sidebar、mobile nav、breadcrumb candidate 都可共享 route metadata adapter。

**与当前学习主线的关系：** Chapter 02 computed 与 Chapter 05 readonly/literal types 现在驱动 Router UI。

**最终记忆模型：** records/meta → access filter → order → typed RouterLinks；visibility 不是 security。

<a id="section-9-14"></a>

### 9.14 lazy loading routes：dynamic import、route chunks 与 bundle boundary

**结论：** route `component: () => import(...)` 建立 async component boundary；Vite 可把 views 分到独立 chunks，Router 首次进入时加载并缓存。

**本节解决的问题：** 防止所有管理页面进入 initial bundle，同时不把“越多 chunks 越好”当规则。

**技术意义：** 以 page navigation 作为合理 code-splitting 边界，降低 initial JavaScript，但引入首次访问 latency 和 chunk failure policy。

**概念解释：** dynamic import 返回 Promise/module；Router 在 navigation resolution 中等待 component；`beforeResolve` 位于 async components resolved 之后。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** Router 调 loader；Vite 生成 chunks；browser 请求 asset；TS 检查 import module；permission 与 bundle secrecy 无关。

**路由机制证据链：**

1. target URL 是首次 `/router/orders`。
2. records 命中 admin + orders。
3. query status/page 先被解析。
4. meta guards 先检查 access。
5. allowed 后 Router resolves async components。
6. chunk load success 后 beforeResolve/confirmation；failure throws。
7. outlets 创建 layout/orders instances。
8. second visit reuse cached modules but new view instance may mount。
9. TS 检查 imported SFC module type。
10. TS 不保证 network chunk request succeeds。
11. Vite emits route-level assets。
12. frontend can defer unauthorized/unvisited UI code。
13. backend still protects data even if chunk is downloaded。
14. navigation 卡在 loading/error 时检查 chunk request 和 error handling。

**TypeScript 编译期过程：** import path 和 SFC module declaration 被检查；loader return type满足 route component option。

**JavaScript / Vue Router 运行时过程：** loader function only invoked on entering target；Promise settles before view creation；module cache avoids repeated fetch。

**API / 语法规则：** route component 使用 function returning dynamic import；本章不引入 file-based route generation 或 manual chunk plugin。

**文件结构：** `lazyRoutes.ts` 集中 loaders，`routes.ts` 引用函数而不执行。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/lazyRoutes.ts</span>
  </div>

```ts
export const lazyRouteComponents = {
  dashboard: () => import("../views/DashboardView.vue"),
  users: () => import("../views/UserListView.vue"),
  roles: () => import("../views/RoleListView.vue"),
  orders: () => import("../views/OrderListView.vue"),
} as const;
```

</div>

**逐行解释：** object centralizes loader identities；functions 延迟 import execution；`as const` 保留 readonly keys，不执行 imports。

**执行过程：** navigation allowed → loader invoked → browser requests chunk → SFC module evaluated → beforeResolve → component vnode/instance → DOM。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** pending target 已解析但 current outlet 暂不 commit；chunk ready 后 current route 与 instances 一起更新。

**为什么得到这个结果：** async component resolution 是 official navigation flow 的一部分。

**对比写法：** top-level static import 在 entry module evaluation 时进入 eager graph，即使用户从未访问 page。

**常见错误为什么错：** 每个微小 child 都单独 lazy 可能产生过多 requests 与 loading complexity；应以用户导航/feature boundary 决策。

**与真实项目的关系：** admin modules、reports、settings 常是 route-level split candidates；production 还需 error/retry/monitoring。

**与当前学习主线的关系：** Chapter 01 Vite build graph 与 Chapter 03 async component 概念现在对齐 route navigation。

**最终记忆模型：** dynamic import defers code → Router awaits → Vite/browser load chunk → component mounts。

<a id="section-9-15"></a>

### 9.15 scroll behavior：savedPosition、top reset、hash selector 与 history boundary

**结论：** router-level `scrollBehavior` 在 confirmed browser navigation 后返回 scroll target；back/forward 优先恢复 `savedPosition`，普通导航回顶部，hash 可定位元素。

**本节解决的问题：** 页面切换后滚动位置为何保留/重置，以及为什么它只在支持 History API 的 browser 中有意义。

**技术意义：** 将页面级 scroll policy 与 individual views 分离，并保留 browser back/forward 预期。

**概念解释：** `savedPosition` 仅在 popstate 类 navigation 可用；returned object 交给 browser scrolling；hash selector 要对应实际 DOM。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** scroll 是 browser UI；Router 调 policy；DOM element readiness影响 hash；与 TS/backend permission 无关。

**路由机制证据链：**

1. 当前 URL 从 orders back 到 dashboard。
2. records 匹配 dashboard。
3. params/query 根据 history entry 恢复。
4. dashboard meta read。
5. guards 仍运行。
6. navigation confirmed 后 scroll behavior receives saved position。
7. outlets render dashboard。
8. route instances 按正常规则 replace/reuse。
9. TS 检查 RouterScrollBehavior return shape。
10. TS 不知道 selector 是否存在。
11. Vite bundling 不改变 scroll policy。
12. frontend controls viewport position。
13. backend 与 scrolling 无关。
14. scroll 不执行时检查 navigation 是否 confirmed 和 browser history support。

**TypeScript 编译期过程：** `RouterScrollBehavior` 检查参数和 `{ top, left, el, behavior }` return values。

**JavaScript / Vue Router 运行时过程：** after navigation confirmation，Router calls function；savedPosition/hash/top branch returns browser scroll instruction。

**API / 语法规则：** saved position 优先；hash uses `to.hash`；fallback `{ top: 0, left: 0 }`。

**文件结构：** `scrollBehavior.ts` export，`router/index.ts` 注入 createRouter options。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/scrollBehavior.ts</span>
  </div>

```ts
if (savedPosition) {
  return savedPosition;
}

if (to.hash) {
  return { el: to.hash, behavior: "smooth" };
}

return { top: 0, left: 0 };
```

</div>

**逐行解释：** popstate recovery first；hash navigation second；all other confirmed navigations start at top-left。

**执行过程：** history navigation → guards/components resolve → current route commit → DOM update/scroll scheduling → browser scroll。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** scroll policy 不改变任何 route data；只在 route transition 后改变 viewport。

**为什么得到这个结果：** scroll behavior 是 createRouter 的 browser integration callback，不是 component render effect。

**对比写法：** 每个 view `onMounted(() => scrollTo(0,0))` 无法自然恢复 back/forward saved position。

**常见错误为什么错：** 期待 cancelled navigation 触发 scroll 错误，因为 current route 从未 commit。

**与真实项目的关系：** content pages、catalog、anchor docs 需要统一 scroll policy；virtual lists 可能需更专门 state restoration。

**与当前学习主线的关系：** Chapter 01 browser platform boundary 在此接入 Router lifecycle。

**最终记忆模型：** confirmed navigation → saved/hash/top decision → browser viewport update。

<a id="section-9-16"></a>

### 9.16 typed routes：RouteRecordInfo、TypesConfig、route names 与 params type boundary

**结论：** manual typed route map 连接 name、path、raw params、normalized params 和 child names；它检查源码 navigation，但不验证用户手输 URL。

**本节解决的问题：** 让 `router-user-detail` 必须携带 userId，同时让 dashboard/login 不接受无意义 params。

**技术意义：** route rename/param changes 能沿 RouterLink、push 和 useRoute 调用链产生 diagnostics，减少 string drift。

**概念解释：** `RouteRecordInfo` 的 raw params 描述 navigation input，normalized params 描述 URL parse output；`TypesConfig` module augmentation 把 map 接入 Router generics。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** typed map 仅 TS；matcher 仍 parse runtime URL；beforeEnter/guards 仍做 runtime checks；backend仍验 resource/access。

**路由机制证据链：**

1. source 请求 named user detail。
2. name map 指向 `/router/users/:userId` record。
3. raw userId 必填，normalized userId 为 string。
4. meta type 来自另一个 augmentation。
5. runtime guards 仍运行。
6. invalid known-list ID redirect 404。
7. valid target 渲染 detail view。
8. param change reuse 不由 type map决定。
9. TS 拦截 missing/wrong route params。
10. TS 不拦截 address bar `/router/users/bad`。
11. Vite erases interfaces/generics。
12. frontend types improve authoring。
13. backend validates actual ID and caller。
14. route name有 autocomplete 但 runtime 404 时检查 map 与 records 是否漂移。

**TypeScript 编译期过程：** interface map 合并进 `TypesConfig`; Router exported generic types derive named location and `useRoute` results。

**JavaScript / Vue Router 运行时过程：** types erased；runtime only retains routeNames strings、records 与 params object。

**API / 语法规则：** small manual map适合本章；larger systems should avoid hand-maintained duplication and use supported generation strategy。

**文件结构：** `routeNames.ts` 保存 runtime literals，`typedRoutes.ts` 保存 type map。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/typedRoutes.ts</span>
  </div>

```ts
export interface RouteNamedMap {
  "router-user-detail": RouteRecordInfo<
    "router-user-detail",
    "/router/users/:userId",
    { userId: string },
    { userId: string },
    never
  >;
}

declare module "vue-router" {
  interface TypesConfig {
    RouteNamedMap: RouteNamedMap;
  }
}
```

</div>

**逐行解释：** key/name 必须一致；path用于 autocomplete；第三项是 caller raw params；第四项是 normalized route params；no child names；augmentation启用 map。

**执行过程：** vue-tsc builds module graph → merges types → checks RouterLink/push/useRoute → emit removes type declarations → Router runtime uses ordinary strings。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** typing 不改变 runtime flow；它只在源代码产生 target location 前约束 name/params。

**为什么得到这个结果：** TypeScript structural analysis 不参与 browser matcher execution。

**对比写法：** 只有 `AppRouteName` union 能检查 name，却不能表达某个 name 需要哪些 params；RouteRecordInfo map补全关系。

**常见错误为什么错：** typed map 中 path/name 与 real records 不一致会给 IDE 虚假契约；必须把 map 与 route table一起审查。

**与真实项目的关系：** route-heavy app 可减少 broken links；但 generated/file-based routing 是不同架构，本章不安装 plugin。

**与当前学习主线的关系：** Chapter 05 的 TypeScript erasure/runtime validation boundary 在 Router names/params 上落地。

**最终记忆模型：** RouteRecordInfo checks authored locations；matcher/guards check runtime locations。

<a id="section-9-17"></a>

### 9.17 404, redirect, alias：catch-all route、legacy route redirect 与 alias matching

**结论：** catch-all 显示 unmatched 404；redirect 把旧 location 改为目标 location；alias 保留当前 URL但匹配原 record。

**本节解决的问题：** 正确处理未知 URL、旧 users URL 和 dashboard alternate URL，并避免三种机制混淆。

**技术意义：** 404 让 invalid route 可观察；redirect 支持 URL migration；alias 支持同一 record 的替代入口。

**概念解释：** `/router/legacy-users` 最终 URL 是 `/router/users`；`/router/home` 保持不变但匹配 dashboard；未知 path 被最后 catch-all 捕获。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** matcher/redirect/alias 属于 client；history记录 final URL；server refresh fallback 与 client 404 是不同层。

**路由机制证据链：**

1. URL 例为 `/router/legacy-users`。
2. redirect record 命中后转到 users named record。
3. params/query按目标处理。
4. users meta在目标 navigation读取。
5. guards应用于目标 record。
6. final navigation allowed或redirect login/403。
7. outlets渲染 layout + users。
8. legacy redirect record无 component instance。
9. TS检查 redirect named target。
10. TS不检查 server fallback。
11. users lazy chunk按最终 target加载。
12. frontend维护 legacy UX。
13. backend不应依赖 client redirect保护 endpoint。
14. URL未变化但 view是dashboard时识别为 alias。

**TypeScript 编译期过程：** redirect location和alias field由 RouteRecordRaw检查；catch-all params在 typed map中建模。

**JavaScript / Vue Router 运行时过程：** matcher先找到redirect/alias/catch-all；redirect creates new navigation；alias resolves same record；catch-all supplies pathMatch。

**API / 语法规则：** catch-all path为 `/:pathMatch(.*)*` 并保持route table最后；redirect record不需 component；absolute alias以 `/` 开头。

**文件结构：** 三种配置都在 `routes.ts`，`NotFoundView.vue` 渲染 current unmatched URL。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/routes.ts</span>
  </div>

```ts
{
  path: "/router/legacy-users",
  redirect: { name: routeNames.users },
},
{
  path: "/:pathMatch(.*)*",
  name: routeNames.notFound,
  component: lazyRouteComponents.notFound,
  meta: notFoundMeta,
},
```

</div>

**逐行解释：** first record只迁移旧 URL；second record捕获余下路径、具名并渲染真实 404 component；实际文件内 meta展开为完整 typed object。

**执行过程：** parse URL → specific matcher/redirect或catch-all → target guard pipeline → component resolve → history/current route commit。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** redirect改变 target URL/records；alias只改变 displayed URL；404创建 not-found record/view。

**为什么得到这个结果：** redirect 和 alias在 matcher中表达不同的 location identity semantics。

**对比写法：** server 404发生在 app entry都没返回时；client catch-all 只有 JavaScript app已加载后才能运行。

**常见错误为什么错：** 认为 client catch-all能修复 direct refresh 404，会忽略 `createWebHistory` server fallback requirement。

**与真实项目的关系：** URL migrations、marketing aliases、deleted pages都需要选择正确机制与 server policy。

**与当前学习主线的关系：** Chapter 01 browser/server entry boundary在 history mode与 client matcher之间再次出现。

**最终记忆模型：** redirect换 location；alias保留 location映射同 record；catch-all渲染 client 404。

<a id="section-9-18"></a>

### 9.18 Chapter integration：从 Chapter 05 route meta contract 迁移到真实 Vue Router

**结论：** Chapter 05 的纯 TS preparation 现在拆成真实 `RouteMeta` augmentation、runtime records、guards 与 consumers；type contract本身仍不执行 permission check。

**本节解决的问题：** 展示“先建 contract、再接 framework”如何迁移，而不是另写一套无关联类型。

**技术意义：** domain literals可复用，framework adapter在 dependency出现后接管 route-specific generics/runtime behavior。

**概念解释：** 第5章 local record只被 `satisfies`检查；本章 module augmentation影响Vue Router API，routes产生real matching，meta被guards/menu/breadcrumb读取。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** Chapter 05只有 TS/object；Chapter 06新增Router runtime/history/component flow；backend边界不变。

**路由机制证据链：**

1. URL现在实际由Router读取。
2. real records匹配URL。
3. params/query由matcher产生。
4. typed meta在runtime records上存在。
5. guards实际读取meta。
6. navigation可allow/redirect/cancel。
7. RouterView实际渲染views。
8. instance reuse由record matching决定。
9. TS augmentation检查Router APIs。
10. types仍不验证runtime identity。
11. Vite bundles Router与lazy views。
12. frontend permissions成为真实UX control。
13. backend authorization仍独立。
14. 若仍只有type file无Router behavior，说明adapter未接入entry/records。

**TypeScript 编译期过程：** local interfaces迁移为official module interfaces；route name/params和meta同时进入vue-tsc SFC graph。

**JavaScript / Vue Router 运行时过程：** route meta values、records、guards、router instance保留；interfaces/unions/generics擦除。

**API / 语法规则：** dependency存在后才允许import/augment `vue-router`；Chapter 05 source保持历史学习边界，不回写。

**文件结构：** migration落在Chapter 06 `routeMeta.ts`、`typedRoutes.ts`、`routes.ts`、guards。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/routeMeta.ts</span>
  </div>

```ts
declare module "vue-router" {
  interface RouteMeta extends AppRouteMeta {}
}

export {};
```

</div>

**逐行解释：** declaration merging扩展installed library interface；empty export确保文件是module；runtime没有对应extend call。

**执行过程：** vue-tsc merges declaration → routes/guards/components receive types → Vite erases declarations → router runtime reads actual meta objects。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** augmentation不改变任何runtime value；real Router modules才建立完整导航变化。

**为什么得到这个结果：** type adapter和runtime adapter是两条需要同时存在的层。

**对比写法：** 继续使用unconnected local `RouteMetaContract`会让official `to.meta`仍然缺少fields，且无法检查route records。

**常见错误为什么错：** 迁移后删除runtime checks、只保留strong types，会重新制造Chapter 05已解释的static/runtime错觉。

**与真实项目的关系：** dependency/architecture逐章引入时，domain types可稳定，framework integration可替换。

**与当前学习主线的关系：** 这是Chapter 05 typed boundary的直接兑现；Chapter 07再把module-local session迁移到Pinia。

**最终记忆模型：** types describe Router contracts；records/guards/history execute Router behavior。

<a id="section-9-19"></a>

### 9.19 Final integration：vue-admin-router-lab 如何组织 admin routing、guards、menu 与 pages

**结论：** final lab把URL、typed records、session、guard pipeline、dynamic menu、top/nested RouterViews、lazy pages和trace组成可观察的admin routing system。

**本节解决的问题：** 验证单个Router API在组合后仍有清晰owner，且没有把session模拟伪装成production store/security。

**技术意义：** 通过admin/manager/operator/signed-out scenarios同时观察navigation decision、menu visibility、403/login redirect和component rendering。

**概念解释：** `VueAdminRouterLab`只host panels和top outlet；router modules ownrecords/guards；layout ownsnested outlet；views ownpage-specific query/guards。

**边界：browser URL、History API、Vue Router runtime、Vue component tree、route record、route meta、navigation guard、TypeScript、Vite tooling、backend authorization：** 每层均有单一owner；final UI显示client behavior并重复backend boundary。

**路由机制证据链：**

1. 用户从lab点击pending orders。
2. records匹配admin/orders。
3. query得到status/page。
4. meta给出roles/orders:view/menu label。
5. beforeEach auth/permission，beforeResolve trace，afterEach result。
6. signed-out→login；operator/admin/manager→allow。
7. top outlet layout，nested outlet orders。
8. admin layout在children间复用。
9. TS检查named links/meta/params/hooks。
10. TS不验证session、query semantics或API。
11. Vite按route动态加载views。
12. frontend控制links/menu/navigation。
13. backend必须控制orders/users/rolesoperations。
14. bug可从visible trace定位目标、phase和outcome。

**TypeScript 编译期过程：** all SFC templates、route map、meta、menu items和guard returns由vue-tsc交叉检查。

**JavaScript / Vue Router 运行时过程：** role button mutatesmodule ref；computed menu reruns；navigation goes through guards；RouterViews根据confirmedroute更新component tree。

**API / 语法规则：** lab不创建second router/app，不import Pinia，不fetch backend；所有paths通过real router instance。

**文件结构：** host `VueAdminRouterLab.vue` + scenario/home panels + route modules/layout/views/components。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router-lab/VueAdminRouterLab.vue</span>
  </div>

```vue
<GuardTracePanel />

<section class="top-level-outlet">
  <p class="outlet-label">Top-level RouterView</p>
  <RouterView />
</section>
```

</div>

**逐行解释：** trace读取pipeline learning state；label明确outlet depth；RouterView把current top-level record转成component vnode。

**执行过程：** scenario click → router promise → guard trace mutations → target confirmation → route reactive mutation → panel/outlet render effects → DOM patch。

**URL、route record、matched records、params、query、meta、guard result、component instance 与 RouterView 的变化：** final lab同时展示这些值；每次scenario只通过Router navigation改变currentroute，不直接切component。

**为什么得到这个结果：** composition root只连接明确modules，navigation state仍由single router owner管理。

**对比写法：** 用`v-if currentPage`手动切views没有URL matcher、history、guards、nestedrecords或navigation failures。

**常见错误为什么错：** 把local session放进名为store的composable会掩盖temporary ownership；本章明确module-local demo，Chapter07再迁移。

**与真实项目的关系：** 结构可扩展为真实admin shell，但production还需Pinia session、API adapters、tests、observability和server fallback。

**与当前学习主线的关系：** 汇合Chapters01–05，并为Chapter07 state ownership、Chapter09 runtime/API boundaries、Chapter10 tests、Chapter11 deployment准备接口。

**最终记忆模型：** URL intent → typed matcher → guard policy → lazy resolve → RouterView tree → role-aware UI；server authorization独立。

## 10. API / 语法索引

| API / Syntax | Layer | Input | Output / effect | TypeScript / runtime boundary |
| --- | --- | --- | --- | --- |
| `createRouter` | Router runtime | history、records、scroll | router instance | options静态检查；runtime创建matcher/guards/current route |
| `createWebHistory` | Router/browser | base URL | HTML5 history adapter | clean URL；production refresh需server fallback |
| `app.use(router)` | Vue app | Router plugin | globals/injections/initial resolve | 必须在mount前 |
| `RouterLink` | Vue Router component | route location | href + client navigation | typed `to`；click时仍运行guards |
| `RouterView` | Vue Router component | current matched depth | route component vnode | 不创建records，只消费current route |
| `useRouter` | Router composable | app injection | router instance | 仅在installed app component scope可用 |
| `useRoute` | Router composable | optional typed name | reactive normalized route | watch具体property |
| `router.push` | Router runtime | target location | new history entry + Promise | path/name/params规则 |
| `router.replace` | Router runtime | target location | replace current entry + Promise | 适合filter/tab更新 |
| `beforeEach` | global guard | to/from | allow/redirect/cancel/error | early access decision |
| `beforeResolve` | global guard | resolved target | final pre-confirm decision | async components之后 |
| `afterEach` | after hook | to/from/failure | observation only | 不能改变navigation |
| `beforeEnter` | route record guard | target | record entry decision | params/query change同record时不重跑 |
| `onBeforeRouteUpdate` | component guard | reused target | update decision | 可访问setup closure |
| `onBeforeRouteLeave` | component guard | leaving target | leave decision | 适合dirty state |
| `RouteMeta` augmentation | TypeScript | AppRouteMeta | typed `meta` | 类型擦除，values仍runtime object |
| `RouteRecordInfo` | TypeScript | name/path/raw/normalized params | named route map entry | 不验证address bar |
| `TypesConfig` | TypeScript augmentation | RouteNamedMap | typed Router API | 与real records需保持一致 |
| `isNavigationFailure` | Router runtime | push result | failure narrowing | redirect不等于aborted failure |
| dynamic `import()` | JS/Vite | module path | Promise + route chunk | network/runtime可失败 |
| `scrollBehavior` | Router/browser | to/from/savedPosition | scroll position | 只在browser history navigation |

## 11. 常见错误表

| # | 错误写法 | 错误类型或现象 | 违反的规则 | 为什么失败 | 正确写法 | 后续识别方法 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 安装包后不执行 `app.use(router)` | injection missing、RouterView不工作 | Router必须注册plugin | app context没有Router提供物 | mount前`app.use(router)` | `useRoute`/RouterLink全局不可用 |
| 2 | 为Router再调用一次`createApp` | 两个隔离app/context | 一个entry/root只保留既有app | plugin装到错误app | 在既有app注册 | DOM出现两个roots或state不共享 |
| 3 | internal route使用普通`a` | full document reload | internal SPA navigation交给Router | browser执行默认navigation | 使用`RouterLink` | Network出现document request |
| 4 | 有records却没有`RouterView` | URL变化页面空白 | matched component需要outlet | matcher不自动插DOM | 添加对应depth outlet | route matched但无view |
| 5 | 宽泛404配置意图放在specific routes前 | review/matching混乱 | fallback应明确最后 | 难判断哪些route被遗漏 | catch-all最后 | 新route总落404 |
| 6 | 到处写`"/router/users"` | path drift | stable navigation应优先name | rename需全局替换 | `routeNames.users` | 同一路径多处literal |
| 7 | 把tab传入params | URL或type错误 | params来自dynamic path | record没有该param | tab放query | named routeparams红线 |
| 8 | params保存object | 值被stringify | URL param是string/number序列 | reference不能跨URL | 只传ID | refresh后object丢失 |
| 9 | `watch(route, ...)` | 过度触发 | watch具体预期property | route含多项reactive fields | watch getter | query无关变化也执行 |
| 10 | 只在mounted读dynamic param | reused page显示旧数据 | same record可复用instance | setup不重跑 | update guard/watch param | URL ID变、内容不变 |
| 11 | auth guard总redirect login | infinite redirect | login必须排除 | login navigation再次触发same branch | 检查route name | URL/trace反复login |
| 12 | 登录后固定dashboard | intended destination丢失 | auth redirect应保留fullPath | params/query被丢掉 | safe redirect query + replace | deep link登录后回错页 |
| 13 | meta当作secure policy | 安全漏洞 | client config可修改 | backend不读取可信client state | server授权每个operation | API只靠menu/guard |
| 14 | 单独维护menu array | menu/route drift | menu应derive records/meta | 两套name/roles/order | generator读取records | 页面存在但sidebar缺失 |
| 15 | hidden menu等于protected API | 越权风险 | visibility不是authorization | 用户可直接request | backend authorization | 隐藏按钮仍可调API |
| 16 | return-style与`next`混用 | duplicate resolution/hanging | 一个guard一次decision | overlapping branches | 统一return-style | warning或navigation不结束 |
| 17 | 把beforeResolve当beforeEach | access decision太晚 | early access放beforeEach | async component已解析 | auth/permission在beforeEach | 未授权也加载page chunk |
| 18 | guard中fetch且无loading/error/cancel policy | pending/error UX | async guard需明确policy | navigation可长期pending | 本章不fetch；后续设计policy | route卡住无反馈 |
| 19 | 所有tiny route都lazy | 过多chunks/latency | splitting需按feature边界 | request overhead增加 | route/feature粒度权衡 | build产生大量微小assets |
| 20 | production只配置web history client | direct refresh server 404 | clean URL需server fallback | server不知道SPA route | Chapter11配置fallback | click正常、refresh 404 |
| 21 | 期待cancelled navigation触发scroll | viewport不变 | scroll只在confirmed navigation | current route未commit | confirmation后处理 | guard cancel后scroll没执行 |
| 22 | typed map与real names不同 | false autocomplete/runtime miss | type map必须同步records | types被擦除不修runtime | 同时审查map/records | vue-tsc过但runtime 404 |
| 23 | Chapter06引入Pinia | scope/dependency越界 | session暂为module-local demo | 抢占Chapter07 architecture | 保持`authSession.ts` | package/import出现pinia |
| 24 | `npm run dev`当作typecheck | 错误质量结论 | Vite dev不是完整SFC检查 | transpile/serve优先 | 运行`npm run typecheck` | 无CLI exit code证据 |

## 12. 最终小项目

最终小项目只整合9.1–9.19已解释的机制，不替代分节教学。

### 12.1 项目目标与章节适配

`vue-admin-router-lab` 提供login、dashboard、users、roles、orders、403、404；按role生成menu；未登录保留目标并转login；无权限转403；params/query、nested outlets、lazy chunks、scroll、typed routes和guard trace均可观察。

它适合Chapter06，因为state owner仍是Router和temporary session module；没有提前引入Pinia、API、tests、UI framework或deployment config。

### 12.2 文件结构与路由表

项目结构与第7节完全一致。核心route table：

| Path | Name | Component | Access | Menu | 特殊行为 |
| --- | --- | --- | --- | --- | --- |
| `/router` | — | `AdminRouterLayout` | auth | hidden | redirect dashboard |
| `/router/dashboard` | `router-dashboard` | `DashboardView` | admin/manager/operator | 10 | alias `/router/home` |
| `/router/users` | `router-users` | `UserListView` | admin/manager | 20 | named links |
| `/router/users/:userId` | `router-user-detail` | `UserDetailView` | admin/manager | hidden | beforeEnter/update/leave |
| `/router/roles` | `router-roles` | `RoleListView` | admin | 30 | permission boundary |
| `/router/orders` | `router-orders` | `OrderListView` | all signed roles | 40 | query filters |
| `/router/login` | `router-login` | `LoginView` | public | hidden | safe redirect |
| `/router/403` | `router-forbidden` | `ForbiddenView` | public | hidden | denied target |
| `/router/legacy-users` | — | — | target policy | hidden | redirect users |
| `/:pathMatch(.*)*` | `router-not-found` | `NotFoundView` | public | hidden | last catch-all |

### 12.3 边界地图

| Map | Source | Runtime transition | Consumer / result |
| --- | --- | --- | --- |
| guard pipeline | target normalized route | leave → beforeEach → update/beforeEnter → resolve → afterEach | allow/redirect/cancel/trace |
| auth session | module-local `Ref<DemoUser \| null>` | signIn/signOut mutation | guards/menu/header |
| permission | meta roles/permissions + session | `hasRole` / `hasPermission` | menu visibility + 403 |
| dynamic menu | route records/meta | recursive filter/sort | typed RouterLinks |
| params/query | URL | matcher/parser | detail ID、tab/filter/page |
| RouterView nesting | matched[0..n] | depth injection | layout + child view |
| lazy loading | record loader | dynamic import Promise | route chunk/component |
| scroll | confirmed navigation | saved/hash/top branch | browser viewport |
| typed routes | RouteNamedMap | vue-tsc only | name/params diagnostics |
| security | backend identity/policy | server request authorization | actual protected operation |

### 12.4 核心 Router 完整代码

以下文件是final lab的核心Router runtime/type boundaries。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/index.ts</span>
  </div>

```ts
import "./routeMeta";
import "./typedRoutes";
import {
  createRouter,
  createWebHistory,
} from "vue-router";
import { registerGuardPipeline } from "./guardPipeline";
import { routeRecords } from "./routes";
import { scrollBehavior } from "./scrollBehavior";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeRecords,
  scrollBehavior,
});

registerGuardPipeline(router);
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/routeMeta.ts</span>
  </div>

```ts
export type RouteRole =
  | "guest"
  | "admin"
  | "manager"
  | "operator";

export type RoutePermission =
  | "dashboard:view"
  | "users:view"
  | "users:detail"
  | "roles:view"
  | "orders:view";

export type RouteLayout = "public" | "admin";

export type AppRouteMeta = {
  title: string;
  requiresAuth: boolean;
  requiredRoles: ReadonlyArray<RouteRole>;
  requiredPermissions: ReadonlyArray<RoutePermission>;
  showInMenu: boolean;
  menuLabel: string;
  menuOrder: number;
  layout: RouteLayout;
  breadcrumb: ReadonlyArray<string>;
};

declare module "vue-router" {
  interface RouteMeta extends AppRouteMeta {}
}

export {};
```

</div>

完整 `routes.ts` 已在第7节真实目录后给出；它与这里的Router instance和meta augmentation构成最终项目的核心route source of truth。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/authSession.ts</span>
  </div>

```ts
import { readonly, ref } from "vue";
import type {
  RoutePermission,
  RouteRole,
} from "./routeMeta";

export type DemoUser = {
  id: string;
  displayName: string;
  role: Exclude<RouteRole, "guest">;
  permissions: ReadonlyArray<RoutePermission>;
};

const mockUsers = {
  admin: {
    id: "admin-100",
    displayName: "Avery Admin",
    role: "admin",
    permissions: [
      "dashboard:view",
      "users:view",
      "users:detail",
      "roles:view",
      "orders:view",
    ],
  },
  manager: {
    id: "manager-200",
    displayName: "Morgan Manager",
    role: "manager",
    permissions: [
      "dashboard:view",
      "users:view",
      "users:detail",
      "orders:view",
    ],
  },
  operator: {
    id: "operator-300",
    displayName: "Owen Operator",
    role: "operator",
    permissions: ["dashboard:view", "orders:view"],
  },
} satisfies Record<Exclude<RouteRole, "guest">, DemoUser>;

const currentUserState = ref<DemoUser | null>(null);

export const currentUser = readonly(currentUserState);

export function signInAs(role: RouteRole): void {
  currentUserState.value =
    role === "guest" ? null : mockUsers[role];
}

export function signOut(): void {
  currentUserState.value = null;
}

export function hasRole(
  requiredRoles: readonly RouteRole[],
): boolean {
  if (requiredRoles.length === 0) {
    return true;
  }

  return (
    currentUserState.value !== null &&
    requiredRoles.includes(currentUserState.value.role)
  );
}

export function hasPermission(
  requiredPermissions: readonly RoutePermission[],
): boolean {
  if (requiredPermissions.length === 0) {
    return true;
  }

  return (
    currentUserState.value !== null &&
    requiredPermissions.every((permission) =>
      currentUserState.value?.permissions.includes(permission),
    )
  );
}
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/authGuard.ts</span>
  </div>

```ts
import type {
  NavigationGuardReturn,
  RouteLocationNormalized,
} from "vue-router";
import { currentUser } from "./authSession";
import { routeNames } from "./routeNames";

export function evaluateAuthGuard(
  to: RouteLocationNormalized,
): NavigationGuardReturn {
  if (
    to.meta.requiresAuth &&
    currentUser.value === null &&
    to.name !== routeNames.login
  ) {
    return {
      name: routeNames.login,
      query: {
        redirect: to.fullPath,
      },
    };
  }

  return true;
}
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/permissionGuard.ts</span>
  </div>

```ts
import type {
  NavigationGuardReturn,
  RouteLocationNormalized,
} from "vue-router";
import {
  hasPermission,
  hasRole,
} from "./authSession";
import { routeNames } from "./routeNames";

export function evaluatePermissionGuard(
  to: RouteLocationNormalized,
): NavigationGuardReturn {
  const roleAllowed = hasRole(to.meta.requiredRoles);
  const permissionAllowed = hasPermission(
    to.meta.requiredPermissions,
  );

  if (
    to.meta.requiresAuth &&
    (!roleAllowed || !permissionAllowed) &&
    to.name !== routeNames.forbidden
  ) {
    return {
      name: routeNames.forbidden,
      query: {
        from: to.fullPath,
      },
    };
  }

  return true;
}
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/guardPipeline.ts</span>
  </div>

```ts
import type { Router } from "vue-router";
import { evaluateAuthGuard } from "./authGuard";
import { evaluatePermissionGuard } from "./permissionGuard";
import { recordNavigationTrace } from "./navigationTrace";

export function registerGuardPipeline(router: Router): void {
  router.beforeEach((to, from) => {
    const authResult = evaluateAuthGuard(to);

    if (authResult !== true) {
      recordNavigationTrace({
        phase: "beforeEach",
        from: from.fullPath,
        to: to.fullPath,
        outcome: "auth redirect or cancellation",
      });
      return authResult;
    }

    const permissionResult = evaluatePermissionGuard(to);

    recordNavigationTrace({
      phase: "beforeEach",
      from: from.fullPath,
      to: to.fullPath,
      outcome:
        permissionResult === true
          ? "navigation allowed"
          : "permission redirect or cancellation",
    });

    return permissionResult;
  });

  router.beforeResolve((to, from) => {
    recordNavigationTrace({
      phase: "beforeResolve",
      from: from.fullPath,
      to: to.fullPath,
      outcome: "route components resolved",
    });

    return true;
  });

  router.afterEach((to, from, failure) => {
    recordNavigationTrace({
      phase: "afterEach",
      from: from.fullPath,
      to: to.fullPath,
      outcome: failure
        ? `navigation failure: ${failure.type}`
        : "navigation confirmed",
    });

    if (!failure) {
      document.title = `${to.meta.title} | Vue Router Lab`;
    }
  });
}
```

</div>

### 12.5 关键 View 与最终 Lab 完整代码

`LoginView.vue` 展示auth redirect恢复，`UserDetailView.vue` 展示params/query/reuse/leave guards；其他views沿用同一route component边界。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/views/LoginView.vue</span>
  </div>

```vue
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import {
  currentUser,
  signInAs,
  signOut,
} from "../router/authSession";
import type { RouteRole } from "../router/routeMeta";
import { routeNames } from "../router/routeNames";

const route = useRoute(routeNames.login);
const router = useRouter();

function readSafeRedirect(): string | null {
  const redirect = route.query.redirect;

  if (
    typeof redirect === "string" &&
    redirect.startsWith("/router/") &&
    redirect !== "/router/login"
  ) {
    return redirect;
  }

  return null;
}

async function signIn(role: RouteRole): Promise<void> {
  signInAs(role);

  const redirect = readSafeRedirect();

  if (redirect) {
    await router.replace(redirect);
    return;
  }

  await router.replace({
    name: routeNames.dashboard,
  });
}
</script>

<template>
  <section class="login-view">
    <p class="topic">Public route</p>
    <h2>Router Lab Login</h2>
    <p>
      Current session:
      {{ currentUser?.displayName ?? "Signed out" }}
    </p>
    <p v-if="route.query.redirect">
      Intended destination: {{ route.query.redirect }}
    </p>
    <div class="actions">
      <button type="button" @click="signIn('admin')">
        Sign in as admin
      </button>
      <button type="button" @click="signIn('manager')">
        Sign in as manager
      </button>
      <button type="button" @click="signIn('operator')">
        Sign in as operator
      </button>
      <button
        v-if="currentUser"
        type="button"
        class="secondary"
        @click="signOut"
      >
        Sign out
      </button>
    </div>
    <p class="boundary">
      This deterministic session is local to the learning module. It does
      not authenticate a backend request.
    </p>
  </section>
</template>

<style scoped>
.login-view {
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #175cd3;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h2,
p {
  margin: 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

button {
  padding: 0.5rem 0.7rem;
  border: 1px solid #175cd3;
  border-radius: 0.45rem;
  background: #175cd3;
  color: #ffffff;
  cursor: pointer;
}

button.secondary {
  background: #ffffff;
  color: #175cd3;
}

.boundary {
  color: #7a2e0e;
  font-weight: 700;
}
</style>
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/views/UserDetailView.vue</span>
  </div>

```vue
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
  useRoute,
  useRouter,
} from "vue-router";
import { routeNames } from "../router/routeNames";

const knownUserIds = new Set(["u-100", "u-200", "u-300"]);
const route = useRoute(routeNames.userDetail);
const router = useRouter();
const visibleUserId = ref(route.params.userId);
const hasUnsavedChanges = ref(false);
const updateMessage = ref("Initial route instance.");

const activeTab = computed(() => {
  const tab = route.query.tab;
  return typeof tab === "string" ? tab : "profile";
});

watch(
  () => route.params.userId,
  (userId) => {
    visibleUserId.value = userId;
  },
);

onBeforeRouteUpdate((to) => {
  const userId = to.params.userId;

  if (
    typeof userId !== "string" ||
    !knownUserIds.has(userId)
  ) {
    return {
      name: routeNames.notFound,
      params: {
        pathMatch: to.path
          .split("/")
          .filter((segment) => segment.length > 0),
      },
    };
  }

  updateMessage.value = `Reused component for ${userId}.`;
  hasUnsavedChanges.value = false;
  return true;
});

onBeforeRouteLeave(() => {
  if (!hasUnsavedChanges.value) {
    return true;
  }

  return window.confirm(
    "Discard the local unsaved changes and leave this route?",
  );
});

async function openUser(userId: string): Promise<void> {
  await router.push({
    name: routeNames.userDetail,
    params: {
      userId,
    },
    query: {
      ...route.query,
      tab: activeTab.value,
    },
  });
}

async function selectTab(tab: string): Promise<void> {
  await router.replace({
    query: {
      ...route.query,
      tab,
    },
  });
}
</script>

<template>
  <section class="user-detail-view">
    <p class="topic">Reused dynamic route component</p>
    <h2>User {{ visibleUserId }}</h2>
    <p>Active query tab: {{ activeTab }}</p>
    <p>{{ updateMessage }}</p>

    <div class="actions">
      <button type="button" @click="openUser('u-100')">u-100</button>
      <button type="button" @click="openUser('u-200')">u-200</button>
      <button type="button" @click="openUser('u-300')">u-300</button>
    </div>

    <div class="actions">
      <button type="button" @click="selectTab('profile')">
        Profile tab
      </button>
      <button type="button" @click="selectTab('security')">
        Security tab
      </button>
    </div>

    <label>
      <input v-model="hasUnsavedChanges" type="checkbox" />
      Block route leave with a local unsaved-change guard
    </label>
  </section>
</template>

<style scoped>
.user-detail-view {
  display: grid;
  gap: 0.8rem;
}

.topic {
  margin: 0;
  color: #175cd3;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h2,
p {
  margin: 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #84a4c5;
  border-radius: 0.45rem;
  background: #f7fbff;
  cursor: pointer;
}

label {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-weight: 700;
}
</style>
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router-lab/VueAdminRouterLab.vue</span>
  </div>

```vue
<script setup lang="ts">
import { RouterView } from "vue-router";
import DynamicMenuPanel from "../components/DynamicMenuPanel.vue";
import GuardTracePanel from "../components/GuardTracePanel.vue";
import ParamsQueryPanel from "../components/ParamsQueryPanel.vue";
import RouteMetaPanel from "../components/RouteMetaPanel.vue";
import RouterLinkVsAnchor from "../components/RouterLinkVsAnchor.vue";
import RouterLabHomePanel from "./RouterLabHomePanel.vue";
import RouterLabScenarioPanel from "./RouterLabScenarioPanel.vue";
</script>

<template>
  <section class="router-lab" aria-labelledby="router-lab-title">
    <header>
      <p class="topic">Final integration</p>
      <h3 id="router-lab-title">Vue Admin Router Lab</h3>
      <p>
        The current URL passes through typed route records and guards.
        The top-level RouterView then renders either a public page or the
        nested admin layout.
      </p>
    </header>

    <div class="panel-grid">
      <RouterLabHomePanel />
      <RouterLabScenarioPanel />
      <RouterLinkVsAnchor />
      <ParamsQueryPanel />
      <RouteMetaPanel />
      <DynamicMenuPanel />
    </div>

    <GuardTracePanel />

    <section class="top-level-outlet">
      <p class="outlet-label">Top-level RouterView</p>
      <RouterView />
    </section>
  </section>
</template>

<style scoped>
.router-lab {
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
  border: 2px solid #7ca1c8;
  border-radius: 1rem;
  background: #eef5fc;
}

.topic,
.outlet-label {
  margin: 0;
  color: #175cd3;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.5rem;
}

header p:last-child {
  margin-bottom: 0;
}

.panel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.8rem;
}

.top-level-outlet {
  display: grid;
  gap: 0.7rem;
  padding: 1rem;
  border: 1px dashed #6489b0;
  border-radius: 0.8rem;
  background: #ffffff;
}
</style>
```

</div>

### 12.6 运行、预期行为、安全边界与扩展

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run dev
npm run typecheck
npm run build
```

</div>

预期行为：

1. signed-out访问orders，转到`/router/login?redirect=...`。
2. admin登录后回到原orders query，可见四个menu items。
3. manager看不到roles；operator只能看到dashboard/orders。
4. operator直接访问roles被转到403。
5. user detail在u-100/u-200/u-300之间复用instance；dirty checkbox可cancel leave。
6. `/router/home`保持alias URL并渲染dashboard。
7. `/router/legacy-users`redirect到users。
8. 任意unknown URL渲染404。

安全边界：所有session、role、permission和menu仅存在browser，用户可修改。真实users/roles/orders API必须在server根据可信identity与policy重新授权。

扩展任务必须留在对应后续章节：Chapter07用Pinia实现auth/permission stores；Chapter09加入API authorization response与runtime validation；Chapter10加入route/store/component tests；Chapter11配置production history fallback、chunk policy和deployment。

## 13. 额外速查表

### 13.1 一句话结论

Vue Router把URL解析为matched route records，通过guards确认navigation，再由对应depth的RouterView渲染components；typed routes提高authoring correctness，backend authorization仍是独立security boundary。

### 13.2 创建、匹配与渲染

| Concept | Layer | Syntax / value | Runtime behavior | 常见错误 |
| --- | --- | --- | --- | --- |
| `createRouter` | Router runtime | options object | 创建matcher/current route/guard registry | 当成Vue app |
| `createWebHistory` | Browser integration | base | clean URL history | 忘记server fallback |
| `RouterLink` | Router component | `to` | href + client navigation | internal link用anchor |
| `RouterView` | Router component | current depth | render matched component | nested child无outlet |
| `useRouter` | composable | none | router instance | plugin未注册 |
| `useRoute` | composable | typed name optional | reactive current route | watch整个route |
| route record | config/runtime | object | matcher source | 当menu item |
| `path` | matcher | pattern | match URL | path + params一起用 |
| `name` | identity | literal | named navigation | 到处写string path |
| `component` | render boundary | component/loader | RouterView target | redirect也配无用component |
| `children` | hierarchy | records array | nested matched depth | parent无RouterView |
| `redirect` | navigation | location | creates target navigation | 和alias混淆 |
| `alias` | matching | alternate path | URL保留、匹配same record | 复制second record |
| dynamic segment | matcher | `:userId` | produces params | 把object当param |
| params | URL path | strings/arrays | route identity values | optional UI state放params |
| query | URL search | string-like values | tab/filter/page | 不做runtime parsing |
| route meta | record data | AppRouteMeta | guard/menu/breadcrumb input | 当backend security |

### 13.3 Guards、loading、typing与security

| Concept | Stage | Return / result | Decision rule |
| --- | --- | --- | --- |
| `beforeEach` | early global | NavigationGuardReturn | auth/permission |
| `beforeResolve` | final pre-confirm | NavigationGuardReturn | async components后readiness |
| `afterEach` | post-confirm | void + optional failure | title/trace/analytics |
| `beforeEnter` | entering record | NavigationGuardReturn | record-specific validation |
| `onBeforeRouteLeave` | active component | NavigationGuardReturn | local dirty state |
| `onBeforeRouteUpdate` | reused component | NavigationGuardReturn | param/resource switch |
| `NavigationGuardReturn` | TypeScript | void/error/boolean/location | 一个branch一个decision |
| navigation failure | runtime | Error subtype | aborted/cancelled/duplicated |
| lazy route | Router/Vite | loader function | route-level async boundary |
| dynamic import | JavaScript | Promise module | browser loads chunk |
| `scrollBehavior` | post-navigation | scroll position | saved/hash/top |
| `savedPosition` | browser history | coordinates | only back/forward |
| catch-all route | matcher fallback | pathMatch | keep last |
| typed routes | TypeScript | RouteNamedMap | authoring check, notruntime validation |
| `RouteRecordInfo` | TypeScript | name/path/raw/normalized/children | map one route |
| `TypesConfig` | augmentation | RouteNamedMap | connect map to Router |
| history fallback | server deployment | serve index.html | required for direct refresh |
| frontend permission | browser UX | menu/guard/403 | navigation andvisibility only |
| backend authorization | server security | trusted identity/policy | every protected operation |
| dynamic menu | Vue computed | records/meta/session | derive, filter, sort |

### 13.4 最小Router模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: minimal-router.ts</span>
  </div>

```ts
import {
  createRouter,
  createWebHistory,
} from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./HomeView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("./NotFoundView.vue"),
    },
  ],
});
```

</div>

## 14. 真实项目判断模型

| 决策点 | 使用方式 | 不要这样用 | 工作证据 | 排除 concern 的 owner |
| --- | --- | --- | --- | --- |
| route params | 表示 path identity，如 `userId`，由 named route 生成 path | 存放 tab/filter/page 等可选 UI state | refresh 同一路径能恢复同一资源视图 | API/service 验证资源是否存在 |
| route query | 保存 tab、filter、page、sort 等 URL-owned UI state | 保存 secret、large object、不可分享 draft | copy URL 后 UI state 可恢复，back/forward 合理 | Component/form state 负责未提交 draft |
| route meta | 声明 auth/menu/breadcrumb/layout hints | 存放实时用户权限或后端策略 | guard、menu、breadcrumb 读同一 records/meta | Pinia 保存 client session；backend 保存真实 policy |
| global guard | 登录态和页面级 permission UX redirect | 当作 API 安全边界或复杂业务 validator | trace 显示 allow/redirect/cancel 原因 | Server API / backend authorization |
| dynamic menu | 从 `routes.ts` + `route.meta` 派生可见导航 | 手写第二套路由菜单导致漂移 | menu item 与 route record name/path 对齐 | Design system 只负责展示样式 |
| lazy route | 大页面按 route chunk 拆分 | 用 lazy import 解决数据权限或 API loading | 首次进入加载 chunk，后续缓存/错误可观察 | Chapter 11 bundle/performance 分析 |

## 15. 如何转换成个人笔记

保留四张图即可复习：URL→matched/outlets、完整guard order、role→menu/route decision、TypeScript→runtime→backend三层boundary。每个route例子只记录一个具体URL和最终component tree，不要重新抄完整source。

若无法回答“当前URL匹配哪两条records、哪个guard return什么、哪个RouterView渲染谁、instance是否复用”，说明笔记仍停留在API名称。

## 16. 必须能回答的问题

1. Vue Router为什么能无刷新切换？它用History API改变URL并更新reactive current route，Vue在既有app内patch route component tree。
2. RouterLink和anchor差别？前者生成href并进入Router pipeline；后者默认发document request。
3. RouterView渲染谁？当前matched records中与自身depth对应的component。
4. params和query差别？params来自path identity；query表达optional URL-owned UI state。
5. meta放什么？title/layout/menu/breadcrumb/client navigation policy；不放可信security verdict。
6. beforeEach和beforeResolve差别？前者早期global decision；后者在in-component guards和async route components resolved后执行。
7. permission能只放前端吗？不能；前端只控制navigation/UI，backend必须授权每个operation。
8. lazy loading如何影响bundle？dynamic import创建route async boundary，Vite可emit独立chunks并在首次访问加载。
9. push和replace差别？push新增history entry；replace替换current entry。
10. redirect和alias差别？redirect改变target URL；alias保留URL并匹配原record。
11. typed routes验证什么？检查authoring name/params；不验证address bar、session、resource existence或backend。
12. clean history URL为什么refresh可能404？server先接收path，需fallback返回SPA entry。

## 17. 最终记忆模型

1. `app.use(router)`在single app mount前建立Router context并resolve initial URL。
2. URL由matcher转成normalized route、params、query、matched records和merged meta。
3. leave/global/update/per-route/resolve guards决定allow、redirect或cancel。
4. lazy components resolved后current route commit；RouterViews按depth创建或复用components。
5. route reactive mutation触发computed/watch/render；Vue scheduler patch DOM。
6. dynamic menu从records/meta/session派生，不能成为第二棵route tree。
7. typed routes和typed meta只在compile time约束source。
8. frontend guard/menu/403改善UX；backend authorization保护data与operations。
9. Vite负责module/chunk transformation，vue-tsc负责SFC type graph，server fallback负责direct refresh。

## 18. 官方文档阅读清单

本章已核对以下当前官方页面：

1. [Vue Router Getting Started](https://router.vuejs.org/guide/)
2. [Vue Router Installation](https://router.vuejs.org/installation.html)
3. [Dynamic Route Matching](https://router.vuejs.org/guide/essentials/dynamic-matching.html)
4. [Routes' Matching Syntax](https://router.vuejs.org/guide/essentials/route-matching-syntax.html)
5. [Nested Routes](https://router.vuejs.org/guide/essentials/nested-routes.html)
6. [Programmatic Navigation](https://router.vuejs.org/guide/essentials/navigation.html)
7. [Named Routes](https://router.vuejs.org/guide/essentials/named-routes.html)
8. [Redirect and Alias](https://router.vuejs.org/guide/essentials/redirect-and-alias.html)
9. [Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
10. [Route Meta Fields](https://router.vuejs.org/guide/advanced/meta.html)
11. [Composition API](https://router.vuejs.org/guide/advanced/composition-api.html)
12. [Lazy Loading Routes](https://router.vuejs.org/guide/advanced/lazy-loading.html)
13. [Scroll Behavior](https://router.vuejs.org/guide/advanced/scroll-behavior.html)
14. [Typed Routes](https://router.vuejs.org/guide/advanced/typed-routes.html)
15. [History Modes](https://router.vuejs.org/guide/essentials/history-mode.html)
16. [Navigation Failures](https://router.vuejs.org/guide/advanced/navigation-failures.html)

阅读时持续区分：browser URL/History API、Router runtime、Vue component/render、TypeScript diagnostics、Vite chunks和backend authorization不是同一层。
