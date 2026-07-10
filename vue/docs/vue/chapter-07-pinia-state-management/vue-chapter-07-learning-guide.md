# Vue 第 7 章：Pinia State Management 与 Store Boundaries

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

.macos-code-dot-red {
  background: #ff5f57;
}

.macos-code-dot-yellow {
  background: #febc2e;
}

.macos-code-dot-green {
  background: #28c840;
}

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
  - [9.1 Store boundary mental model：local state、global client state、server state 与 URL state](#section-9-1)
  - [9.2 Pinia installation：createPinia、app.use(pinia)、single root store 与 plugin order](#section-9-2)
  - [9.3 defineStore：store id、useXxxStore naming、Option Store 与 Setup Store](#section-9-3)
  - [9.4 state：state factory、declared state keys、direct mutation 与 TypeScript inference](#section-9-4)
  - [9.5 getters：computed-like derived state、this-bound getters 与 return type boundary](#section-9-5)
  - [9.6 actions：business mutation API、async action boundary 与 no mutations layer](#section-9-6)
  - [9.7 storeToRefs：store reactive wrapper、destructuring problem 与 action binding](#section-9-7)
  - [9.8 $patch and $reset：grouped mutation、devtools entry、Option Store reset 与 Setup Store custom reset](#section-9-8)
  - [9.9 Pinia plugins：pinia.use、store extension、$subscribe 与 local persistence](#section-9-9)
  - [9.10 persisted state：localStorage boundary、unknown JSON parse、allowlist 与 security limit](#section-9-10)
  - [9.11 stores outside components：active pinia、route guards、useStore(pinia) 与 import-order bug](#section-9-11)
  - [9.12 SSR-safe state：state factory、per-app store instance 与 global reactive object risk](#section-9-12)
  - [9.13 auth store migration：从 Chapter 06 module-local authSession 迁移到 Pinia](#section-9-13)
  - [9.14 permission store：cross-store composition、route meta access checks 与 backend authorization boundary](#section-9-14)
  - [9.15 theme and preferences stores：global client UI state 与 safe persistence](#section-9-15)
  - [9.16 cart and selection stores：collection state、derived totals、selection ownership 与 over-globalization](#section-9-16)
  - [9.17 testing stores：setActivePinia、createPinia、plugin test setup 与 action assertions](#section-9-17)
  - [9.18 Chapter integration：Router guards、dynamic menu 与 Pinia stores 如何协作](#section-9-18)
  - [9.19 Final integration：vue-pinia-admin-state-lab 如何组织 admin global client state](#section-9-19)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标与章节适配](#121-项目目标与章节适配)
  - [12.2 文件结构与状态所有权](#122-文件结构与状态所有权)
  - [12.3 Store、persistence、Router 与 testing maps](#123-storepersistence-router-与-testing-maps)
  - [12.4 核心完整代码](#124-核心完整代码)
  - [12.5 运行方式、预期行为与安全边界](#125-运行方式预期行为与安全边界)
  - [12.6 常见错误与扩展任务](#126-常见错误与扩展任务)
- [13. 额外速查表](#13-额外速查表)
- [14. 最终文件清单](#14-最终文件清单)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标 | 真实文件 | 类型 | 对应章节 |
| --- | --- | --- | --- |
| 创建唯一 Pinia root 并安装 plugin | `src/learning/vue/chapter-07-pinia-state-management/stores/pinia.ts` | runtime root | 9.2、9.9 |
| 统一 role、permission、cart 与 persistence 类型 | `stores/storeTypes.ts` | domain contract | 9.3、9.10、9.13 |
| 用 Option Store 管理 client auth state | `stores/authStore.ts` | Option Store | 9.3–9.6、9.13 |
| 用 Setup Store 组合 auth permission logic | `stores/permissionStore.ts` | Setup Store | 9.3、9.14 |
| 管理可安全持久化的 theme state | `stores/themeStore.ts` | Option Store | 9.5、9.8、9.15 |
| 管理可安全持久化的 preferences | `stores/preferenceStore.ts` | Option Store | 9.10、9.15 |
| 练习 collection getters、actions 与 `$patch` | `stores/cartStore.ts` | Option Store | 9.4–9.8、9.16 |
| 练习 serializable selection state | `stores/selectionStore.ts` | Option Store | 9.16 |
| 区分 layout state 与 route state | `stores/sidebarStore.ts` | Option Store | 9.1、9.16 |
| 实现 allowlist persistence | `stores/piniaPersistencePlugin.ts` | local Pinia plugin | 9.9–9.10 |
| 观察 state/getter reactive destructuring | `components/StoreToRefsDemo.vue` | focused SFC | 9.7 |
| 观察 object patch、function patch 与 reset | `components/PatchResetDemo.vue` | focused SFC | 9.8 |
| 观察 plugin snapshots 与清理 | `components/PiniaPluginDemo.vue` | focused SFC | 9.9–9.10 |
| 解释 component、form、Pinia、Router、API、backend owner | `components/StoreBoundaryPanel.vue`、`StateClassificationPanel.vue` | boundary panels | 9.1 |
| 解释 outside-component access | `components/StoreOutsideComponentDemo.vue` | focused SFC | 9.11 |
| 解释 per-app SSR state boundary | `components/SsrSafeStateDemo.vue` | focused SFC | 9.12 |
| 保留 Chapter 06 API 并把 owner 指向 Pinia | `src/learning/vue/chapter-06-vue-router-permission/router/authSession.ts` | compatibility adapter | 9.13、9.18 |
| 让 auth guard 读取 Pinia | `router/authGuard.ts` | Router adapter | 9.11、9.13、9.18 |
| 让 permission guard 读取 Pinia | `router/permissionGuard.ts` | Router adapter | 9.11、9.14、9.18 |
| 让 dynamic menu 读取 Pinia | `router/dynamicMenu.ts` | Router/menu adapter | 9.14、9.18 |
| 使用 fresh Pinia 测试 stores | `tests/*.test.ts`、`tests/piniaStoreTest.ts` | store unit tests | 9.17 |
| 整合 admin global client state | `pinia-lab/VuePiniaAdminStateLab.vue` | final lab | 9.19、12 |
| 在既有 app 注册 Pinia | `src/learning/vue/chapter-01-application-boundary/main.ts` | real entry | 9.2 |
| 保留 Chapter 01–06 并渲染 Chapter 07 | `src/learning/vue/chapter-01-application-boundary/App.vue` | root shell | 9.19 |

上述省略前缀的 `stores/`、`components/`、`tests/` 与 `pinia-lab/` 路径，都相对 `src/learning/vue/chapter-07-pinia-state-management/`；省略前缀的 `router/` 路径，都相对 `src/learning/vue/chapter-06-vue-router-permission/`。

## 0. 文件定位

本章指南位于 `docs/vue/chapter-07-pinia-state-management/vue-chapter-07-learning-guide.md`。可运行代码位于 `src/learning/vue/chapter-07-pinia-state-management/`。真实应用仍由 Chapter 01 的 `main.ts` 创建唯一 Vue app；Pinia 在该入口先于 Router 安装，Chapter 07 不创建第二个 app、第二个 runtime Pinia 或第二个 Router。

Chapter 06 的 route records、views 与 Router instance 保留。只把临时 `authSession.ts` 的真实 state owner 迁移到 `authStore.ts`，并让 guard/menu adapter 在函数执行时显式传入 `pinia`。这让 Chapter 06 既有组件继续通过 compatibility API 工作，同时不再维护第二份 auth state。

## 1. 本章解决的问题

Chapter 02 已建立 `ref`、`reactive`、`computed` 和解构边界；Chapter 03 已说明 component state ownership；Chapter 04 已展示 composable 与 module-scope shared state；Chapter 05 已定义 typed store contract 但未安装 Pinia；Chapter 06 已用临时 module-local session 驱动 guards。现在要解决的问题是：

1. 哪些值确实属于跨组件、跨页面的 global client state，哪些仍应留在 component、form、URL、API cache 或 backend。
2. `defineStore` 如何把 state、getters、actions、plugins、devtools identity、SSR 与 testing boundary 组织在同一个 store contract 中。
3. 为什么 store instance 是 reactive object，直接解构会失去 reactive connection，而 `storeToRefs()` 能保持连接。
4. 为什么 persistence 是 browser convenience，不是 runtime validation、安全存储或 backend authorization。
5. Router guard、dynamic menu、component 与 unit test 如何读取同一个 store，而不依赖 import order 或重复 state。

Pinia 不负责 API cache 的 stale/refetch/invalidation policy，不负责 URL matching，不负责 backend authorization，也不会让 TypeScript 类型自动验证 localStorage、API response 或用户输入。

## 2. 前置概念

- JavaScript module binding、function closure、object reference、array methods、`JSON.parse` 与 `localStorage`。
- Chapter 02 的 reactive Proxy、ref、computed、render effect 与 destructuring connection。
- Chapter 03 的 owner、props/emits contract 与“local state 不默认上移”原则。
- Chapter 04 的 composable factory、module-scope shared state、cleanup 与 browser side effect。
- Chapter 05 的 literal union、`unknown` narrowing、type erasure 与 `vue-tsc` boundary。
- Chapter 06 的 route record、route meta、guard result、Router installation order 与 frontend/backend permission boundary。

## 3. 学习目标

- 能按 local、form、global client、server、URL 与 backend security 对 state 分类。
- 能解释 Pinia root、store definition、store instance、state、getter、action 与 plugin 的运行关系。
- 能分别实现 Option Store 与 Setup Store，并说明选择理由。
- 能正确使用 direct mutation、action、`$patch`、`$reset`、`$subscribe` 与 `storeToRefs`。
- 能把 persisted JSON 当作 `unknown`，只恢复 allowlisted、已声明的 state key。
- 能在 Router guard 中显式使用 `useStore(pinia)`，避免 inactive Pinia/import-order bug。
- 能用 `setActivePinia(createPinia())` 隔离纯 store unit tests。
- 能明确 frontend permission 只控制 UI/navigation，backend 才能保护操作与数据。

## 4. 推荐学习顺序

1. 先做 owner classification，再决定是否创建 store。
2. 建立唯一 Pinia root，理解 `app.use(pinia)` 与 store creation timing。
3. 学 Option Store 的 state/getters/actions，再学 Setup Store 的 refs/computed/functions。
4. 观察 store reactive wrapper、`storeToRefs`、direct mutation、`$patch` 与 reset。
5. 实现 plugin、subscription、allowlist persistence 与 `unknown` boundary。
6. 把 store 带到 component 外部：Router guard、dynamic menu 和 tests。
7. 最后整合 auth、permission、theme、preferences、cart、selection、sidebar 与 final lab。

## 5. 核心术语表

| Concept | Layer | 本章中的具体含义 | 常见误解 |
| --- | --- | --- | --- |
| Pinia root | Pinia runtime | `createPinia()` 产生、由 app 安装的 store registry/root state | 每个 feature 都创建一个 |
| store definition | JavaScript / Pinia | `defineStore()` 返回的 `useXxxStore` function | 定义时就创建了 store |
| store instance | Pinia / Vue reactivity | `useXxxStore(pinia)` 对某 root 返回的 reactive store | 普通 frozen object |
| state | reactive source | 由 factory 声明、可序列化或可追踪的 source value | 任意临时变量都应进入 state |
| getter | derived state | computed-like read，从 state/other getters 派生 | 用于产生 side effect |
| action | mutation API | 可同步或异步执行、通过 `this` 或 setup refs 改 state | 必须另有 mutation layer |
| `storeToRefs` | reactivity utility | 把 state/getters 转成 refs，跳过 actions | 对 actions 也必须使用 |
| `$patch` | Pinia mutation | object 或 function 形式的 grouped state change | 所有赋值都必须 patch |
| `$reset` | state lifecycle | Option Store 重新调用 state factory；Setup Store 需自定义 | Setup Store 自动拥有 |
| plugin | Pinia extension | `pinia.use()` 注册，对之后创建的 stores 执行 | Vue component plugin |
| persisted envelope | browser boundary | version/storeId/savedAt/state 的 runtime object | TypeScript 类型保证磁盘内容可信 |
| active Pinia | injection context | `useStore()` 能发现的当前 root | import store definition 就已 active |
| frontend permission | client UX | menu visibility、navigation redirect、button visibility | 可以保护 backend API |

## 6. 底层心智模型

本章的主链不是“全局变量 → 任意地方修改”，而是：

owner decision → `defineStore` definition → `useXxxStore(pinia)` → root registry 中的唯一 instance → component/guard/test 读取 state/getter → action/direct/patch mutation → Vue dependency trigger → getter/render/computed 重新执行 → DOM 或 navigation result。

Plugin 是旁路观察者：Pinia 在 store creation 时调用 plugin；persistence plugin 先读取 allowlisted browser snapshot，将 `JSON.parse` 结果作为 `unknown` 检查 envelope，再只 patch 已声明 key；随后 `$subscribe` 观察 mutation 并写回。Router URL、server cache 与 backend authorization 始终保持独立 owner。

## 7. 推荐目录结构

目录按 roadmap 的 Phase 7 practice files 展开，并为 final admin state lab 增加分类、adapter 与 focused panels。以下都是真实路径：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management</span>
  </div>

```txt
chapter-07-pinia-state-management/
  PiniaChapterApp.vue
  stores/
    pinia.ts
    storeTypes.ts
    authStore.ts
    permissionStore.ts
    themeStore.ts
    preferenceStore.ts
    cartStore.ts
    selectionStore.ts
    sidebarStore.ts
    piniaPersistencePlugin.ts
  components/
    StoreBoundaryPanel.vue
    StateClassificationPanel.vue
    AuthStoreDemo.vue
    PermissionStoreDemo.vue
    ThemeStoreDemo.vue
    PreferenceStoreDemo.vue
    CartStoreDemo.vue
    SelectionStoreDemo.vue
    StoreToRefsDemo.vue
    PatchResetDemo.vue
    PiniaPluginDemo.vue
    StoreOutsideComponentDemo.vue
    SsrSafeStateDemo.vue
  pinia-lab/
    VuePiniaAdminStateLab.vue
    PiniaAdminHeader.vue
    PiniaAdminSidebar.vue
    PiniaAdminDashboard.vue
    PiniaCartPanel.vue
    PiniaPreferencePanel.vue
    PiniaStoreTestPanel.vue
  tests/
    authStore.test.ts
    permissionStore.test.ts
    themeStore.test.ts
    cartStore.test.ts
    piniaStoreTest.ts
```
</div>

## 8. 示例运行方式

开发服务器用于交互观察，`vue-tsc` 负责 SFC/type graph，Vitest 负责 store behavior，production build 同时执行 typecheck 与 Vite bundle。四者不是同一个 gate。

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
npm run test:unit
npm run build
```
</div>

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 Store boundary mental model：local state、global client state、server state 与 URL state

**结论：**

先判断 state owner，再判断是否需要 Pinia。modal open 属于单个 component，product draft 属于 form flow，auth/theme/cart 属于 global client state，filter/page 属于 Router URL，remote products 需要 server cache policy，protected operation 由 backend authorization 决定。

**本节解决的问题：**

“多个位置看见同一个值”不自动等于“放进 store”。例如一个页面内重复显示 modal 状态，owner 仍是该页面；订单筛选需要刷新、复制链接和浏览器前进后退时保持，则 owner 是 query，不是 Pinia。

**技术意义：**

正确分类可避免双 source of truth：若 query 和 store 各存一份 page，navigation 与 store mutation 会互相覆盖；若 API list 当作普通 Pinia array，又会缺少 stale、refetch、dedupe、retry 与 invalidation 规则。

**概念解释：**

`StateClassificationPanel.vue` 把 example、classification、owner 做成静态教学表；`StoreBoundaryPanel.vue` 不修改 store，因为分类规则本身不是 global reactive state。Pinia 只接管需要跨 component/page 保持的 client-owned values。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

component/form 用 component refs 或 composables；global client 用 Pinia；server state 留给后续 API cache policy；URL state 由 Router；Pinia store 仍由 Vue reactivity 驱动；TypeScript 只检查分类后建立的 contract；Vite 只转换/打包；storage 只保存 allowlist convenience；backend 独立授权。

**store 机制证据链：**

1 owner：modal→component、draft→form、theme→Pinia、page→Router、products→API cache、permission enforcement→backend；2 `useThemeStore()` 只实例化真正 global 的 theme；3 它使用 entry 安装的唯一 `pinia`；4 `mode/accent/systemPreference` 预先声明；5 `themeClass/isDark` 读取 theme state；6 `toggleMode` 修改 mode；7 mutation 走 action；8 component 通过 `storeToRefs` 读；9 plain destructuring 会快照化；10 persistence plugin 只观察 allowlist；11 storage JSON 进入 `unknown`；12 StoreBoundaryPanel 是 component consumer 的分类入口；13 setup 中 active pinia 可注入；14 TS 检查 owner 对应 store API；15 TS 不验证状态是否真的应全局化；16 frontend 控制显示与 client flow；17 backend 控制受保护资源；18 若同一 query/filter 在 Router 与 store 双写，就是 owner 错误的识别信号。

**TypeScript 编译期过程：**

`ThemeMode`、`DemoUserRole`、`DemoPermission` 和 `PersistedStoreId` 形成 literal unions；`vue-tsc` 检查调用参数，但不会从产品需求推导 owner，也不会验证 API/localStorage runtime value。

**JavaScript / Pinia / Vue 运行时过程：**

分类 panels 创建普通 readonly arrays；真正的 stores 只在 component setup 或 adapter function 调用 `useXxxStore` 时对 root 注册。template render 读取 store state/getters 后，后续 mutation 才触发相应 component update。

**API / 语法规则：**

没有“重复两次就全局”的 API 规则。决策规则是生命周期、共享范围、可分享 URL、远程一致性和安全 authority；Pinia 只覆盖 global client state。

**文件结构：**

分类证据位于 `components/StoreBoundaryPanel.vue` 与 `components/StateClassificationPanel.vue`；具体 global owners 位于 `stores/`，URL owner 仍在 Chapter 06 Router。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: state owner decision</span>
  </div>

```ts
const stateOwners = {
  modalOpen: "component",
  productDraft: "form",
  themeMode: "pinia",
  currentPage: "router",
  remoteProducts: "api-cache",
  protectedWrite: "backend",
} as const;
```
</div>

**逐行解释：**

每个 key 是具体 value；每个 literal value 表示唯一 owner。`as const` 只收窄 TypeScript literal，不会在 runtime 创建 store、router 或 cache。

**执行过程：**

需求出现 → 判断生命周期与共享范围 → 选择 owner → 只在需要时定义 store → consumer 读取对应 source → mutation 由 owner API 执行 → Vue/Router/API/backend 各自处理结果。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

本节不产生 mutation；它决定后续哪些值进入 state/getters/actions。分类错误会让 plugin/subscription 持久化不该保存的值，或让 guard 读取与 URL/backend 冲突的副本。

**为什么得到这个结果：**

state consistency 取决于单一 authority。Pinia 能共享 client state，但不能自动提供 URL history、remote cache semantics 或 server security。

**对比写法：**

把 `route.query.page` 复制到 `sidebarStore.page` 会形成两份可写 state；正确写法是 component 直接读取 route query，把 sidebar store 只用于 collapsed/pinned。

**常见错误为什么错：**

“所有 form draft 都放 Pinia”会把一次编辑流程延长为 app lifetime，离开页面仍残留脏数据。只有明确跨步骤/跨页面且需要恢复的 form flow 才考虑 store，并仍要有 reset policy。

**与真实项目的关系：**

中后台最常见的状态 bug 不是少了 store，而是 owner 不清：URL filter、server list、selection、permission 和 layout state 混在一个 giant store。

**与当前学习主线的关系：**

本节直接继承 Chapter 03 ownership、Chapter 04 shared-state boundary 和 Chapter 06 URL state，并为 Chapter 09 API cache policy 保留位置。

**最终记忆模型：**

先问“谁有权拥有与修改这个值”，再问“是否需要 Pinia”。

<a id="section-9-2"></a>

### 9.2 Pinia installation：createPinia、app.use(pinia)、single root store 与 plugin order

**结论：**

runtime app 只创建一个 `pinia`，先 `pinia.use(piniaPersistencePlugin)`，再 `app.use(pinia)`，然后 `app.use(router)`，最后 mount。

**本节解决的问题：**

若 store 在 root 尚未 active 时被 module top-level 调用，会出现 inactive Pinia 或错误 root；若创建多个 runtime Pinia，同名 store 会产生彼此隔离的 instances。

**技术意义：**

single root 让 component、guard、menu 与 adapter 对相同 store id 得到同一 instance，也为 plugin application、devtools identity、tests 与未来 SSR per-app root 建立明确边界。

**概念解释：**

`createPinia()` 创建 root store registry；`pinia.use()` 登记 store-creation plugin；`app.use(pinia)` 把 root 注入 app context 并设为 active；`useAuthStore(pinia)` 可绕过隐式 injection，明确选择 root。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

安装只建立 Pinia runtime，不移动 component/form/server/URL/backend state。Vue app plugin system 执行 install；Router 仍有自己的 instance；Vite 解析 imports；TypeScript 检查 plugin/Pinia types；storage plugin 只在 browser 存在时工作。

**store 机制证据链：**

1 owner：global client state 才进入 root；2 `useAuthStore(pinia)` 按需实例化 auth；3 root 是 `stores/pinia.ts` 的 export；4 auth keys 由 state factory 声明；5 getters 在同一 instance 读取；6 actions 写同一 instance；7 auth 使用 action mutation；8 components 可 direct/storeToRefs 读取；9 direct destructuring 仍会断开；10 persistence plugin 在 store creation 时检查 id；11 restored JSON 是 `unknown`；12 component/guard/test 可选择 implicit/explicit root；13 main 激活 root，guards仍显式传入；14 TS 检查 `Pinia` 与 plugin context；15 TS 不保证 install order；16 frontend root 控制 client state；17 backend 不读取此 root 作为 authorization；18 若两个 panels显示不同 auth user，应先查是否创建了两个 Pinia roots。

**TypeScript 编译期过程：**

imports 建立静态 module graph；`app.use(pinia)` 的 parameter type 必须满足 Vue Plugin contract。类型检查不会执行 module，也无法证明 mount 前安装顺序。

**JavaScript / Pinia / Vue 运行时过程：**

module evaluation 创建 root并登记 persistence plugin；main 创建 Vue app；`app.use(pinia)` 安装 root；Router registration 后 initial navigation 才执行 guards；mount 创建 components，setup 中 `useStore()` 得到 active root。

**API / 语法规则：**

runtime root 使用 `createPinia()` 一次；plugins 在目标 stores 创建前通过 `pinia.use()` 注册；app mount 前 `app.use(pinia)`；outside-component code 可显式 `useStore(pinia)`。

**文件结构：**

root 在 `stores/pinia.ts`；registration 在 Chapter 01 `main.ts`；Router instance 保留在 Chapter 06 `router/index.ts`。

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
import { pinia } from "../chapter-07-pinia-state-management/stores/pinia";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");
```
</div>

**逐行解释：**

imports只取得 module exports；`createApp` 创建 app instance；first `use` 安装 root；second `use` 安装 Router；`mount` 才创建 root component tree。

**执行过程：**

evaluate modules → create Pinia root/register local plugin → create app → install Pinia → install Router/initial navigation → mount components → call stores。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

安装阶段尚未修改业务 state；它使后续 store creation 能运行 plugin、restore snapshot、建立 subscription。Router guard在 initial navigation 时显式读取同一个 root，component render随后读取同一 references。

**为什么得到这个结果：**

Pinia store identity由 `(pinia root, store id)` 共同决定，不仅由 import path 决定。

**对比写法：**

在每个 feature `createPinia()` 会让 auth guard和header分别看到不同 auth store；test中创建fresh root是隔离策略，runtime中则不是。

**常见错误为什么错：**

`app.mount()` 后再 `app.use(pinia)` 违反 Vue plugin registration timing，已创建 components 无法按正常 app context 获得 Pinia。

**与真实项目的关系：**

bootstrap file 应保持小而明确：创建 app、按顺序安装 infrastructure plugins、mount；feature stores不负责创建 root。

**与当前学习主线的关系：**

延续 Chapter 01 的 single `createApp` 与 Chapter 06 Router plugin boundary，只新增第一个 real Pinia root。

**最终记忆模型：**

一个 app → 一个 runtime Pinia root → 多个按 id 注册的 stores。

<a id="section-9-3"></a>

### 9.3 defineStore：store id、useXxxStore naming、Option Store 与 Setup Store

**结论：**

`defineStore` 返回 use-function，不立刻创建 store。`auth` 使用 Option Store 展示 state/getters/actions；`permissions` 使用 Setup Store组合 auth，并返回所有属于 store 的 refs/computed/functions。

**本节解决的问题：**

需要区分 definition、instance 与 root：import `useAuthStore` 不是 auth instance；调用 `useAuthStore(pinia)` 才在指定 root 上取得或创建 id 为 `auth` 的 instance。

**技术意义：**

唯一 id连接 store registry/devtools/plugin；`useXxxStore` 命名让调用点可识别；Option/Setup 只是两种定义语法，不代表不同 state system。

**概念解释：**

Option Store 的 state factory产生 state，getters 类似 computed，actions类似 methods。Setup Store 的 refs成为 state、computed成为 getters、functions成为 actions；所有属于 store 的 state必须 return，不能伪造 private reactive state。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

definition只描述 global client store；它不捕获 component/form state，不返回 route object，不存 server cache/backend authority。Pinia用Vue refs/computed/reactive wrapper；TS推断 public API；Vite处理module；plugin按id决定 persistence。

**store 机制证据链：**

1 owner：auth/permission是Pinia；2 `useAuthStore()` 和 `usePermissionStore()` 分别实例化；3 两者共享active/explicit root；4 auth声明currentUser/status/lastRole，permission不复制它们；5 auth getters读auth state，permission computed读auth store；6 auth actions写auth state，permission functions只判断；7 mutation集中在auth action；8 components direct或storeToRefs读；9 destructure state必须转refs；10 plugin看见store id但auth不在persist allowlist；11因此auth不跨storage unknown boundary；12 permission可在component/guard调用；13 guard显式传pinia；14 TS检查id definition public API；15 TS不保证id语义唯一；16 frontend permission控制UX；17 backend独立授权；18若permission store出现currentUser字段，就是跨store state duplication信号。

**TypeScript 编译期过程：**

Option Store通过 state return type与getter/action `this` 推断public store；Setup Store根据return object推断refs/computed/functions。`DemoUserRole`等literal union限制调用。

**JavaScript / Pinia / Vue 运行时过程：**

`defineStore`执行时创建 use-function和definition metadata；首次`useXxxStore`查root registry，无instance则运行setup/options、包装reactive store并应用plugin；后续调用返回同一instance。

**API / 语法规则：**

id在app内唯一；export名采用`useXxxStore`；Option Store传options object；Setup Store传setup function；Setup Store返回全部store-owned state。

**文件结构：**

`stores/authStore.ts` 是 Option Store；`stores/permissionStore.ts` 是 Setup Store；shared domain types在 `storeTypes.ts`，避免stores互相声明重复类型。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: Option Store and Setup Store</span>
  </div>

```ts
export const useAuthStore = defineStore("auth", {
  state: () => ({ currentUser: null }),
  getters: {
    isSignedIn: (state) => state.currentUser !== null,
  },
  actions: {
    signOut() {
      this.currentUser = null;
    },
  },
});

export const usePermissionStore = defineStore("permissions", () => {
  const authStore = useAuthStore();
  const canViewOrders = computed(() =>
    authStore.permissions.includes("orders:view"),
  );

  return { canViewOrders };
});
```
</div>

**逐行解释：**

两个string是root registry ids；Option object分别声明source/derived/mutation；Setup function组合auth instance，用computed暴露derived permission，不复制currentUser。

**执行过程：**

module定义use-functions → component调用permission use-function → permission setup调用auth use-function → root创建/复用两个instances → computed读取auth getter → auth mutation触发permission consumer更新。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

definition阶段无state mutation；instance创建后auth state与permission computed形成dependency。auth不持久化；theme/preferences/cart会被plugin订阅。guard调用permission function时读取当前auth instance。

**为什么得到这个结果：**

Setup Store可以组合另一个store的public API，Pinia root保证调用得到同一auth instance。

**对比写法：**

在permission store复制 `currentUser` 会需要watch同步；正确做法是直接组合auth store并派生判断。

**常见错误为什么错：**

Setup Store创建 `const secretState = ref()` 却不return，会破坏SSR/devtools/plugin完整state model；真正private非reactive helper可保留，但store-owned reactive state必须公开。

**与真实项目的关系：**

Option Store适合明确的领域state/getter/action表；Setup Store适合跨store composition、computed与composable，但SSR和隐式副作用要更谨慎。

**与当前学习主线的关系：**

Chapter 05 的typed store contract现在由真实`defineStore`实现；Chapter 04的setup/composable经验用于理解Setup Store。

**最终记忆模型：**

`defineStore`定义工厂；`useXxxStore(root)`取得该root上的唯一instance。

<a id="section-9-4"></a>

### 9.4 state：state factory、declared state keys、direct mutation 与 TypeScript inference

**结论：**

Option Store的`state`必须是factory并声明初始key；Pinia允许直接写state，但跨多个字段或表达业务意图时优先action/patch。

**本节解决的问题：**

为什么不能在运行中临时添加 `store.newField`？Pinia、SSR serialization、devtools、plugins和TypeScript都需要在state factory阶段知道完整state shape。

**技术意义：**

factory让每个Pinia/app/test能得到独立初始object；declared keys让reset、hydration、persistence和type inference一致。

**概念解释：**

`cartStore`预先声明products/items/updatedAt。`items`保存最小productId/quantity，product details由products lookup，itemCount/subtotal不再复制进state，而作为getters派生。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

state factory只建立client source values；form draft/query/API cache/backend data不因“可声明”而自动进入。Vue将nestedarray/object reactive；TS推断shape；plugin可序列化allowlist；Router/backend保持独立。

**store 机制证据链：**

1 owner：cart跨panels所以Pinia；2 `useCartStore()`实例化cart；3使用single root；4 products/items/updatedAt全部声明；5 itemCount/subtotal/isEmpty读取它们；6 add/remove/increment actions修改items/updatedAt；7既有direct、object patch、function patch；8component用storeToRefs读derived refs；9direct destructure会冻结primitive snapshot；10persistence plugin观察cart；11restoredcart envelope先unknown检查；12cart用于component/test/plugin；13component隐式active，testfresh root；14TS检查CartItem/CartProduct；15TS不验证storage price或quantity业务合法性；16frontend控制cart UI；17backend仍校验真实product/price/order；18若runtime新增key却reset/persistence丢失，就是未声明state信号。

**TypeScript 编译期过程：**

`CartState`固定三个keys；state factory return必须满足它。array element operations受`CartItem`/`CartProduct`检查，类型擦除后不再验证外部值。

**JavaScript / Pinia / Vue 运行时过程：**

首次store创建调用factory得到fresh object；Pinia把state接入root reactive state。template/getters读取array/property产生dependencies；push/filter/assignment触发相关consumers。

**API / 语法规则：**

所有state keys在`state()`初始化；可直接`store.field = value`；`$state` assignment内部等价patch，不是普通root object replacement；derived values使用getters而非duplicated state。

**文件结构：**

`stores/cartStore.ts`展示collection state；`authStore.ts`展示nullable domain state；`preferenceStore.ts`展示simple persisted state。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/stores/cartStore.ts</span>
  </div>

```ts
type CartState = {
  products: Array<CartProduct>;
  items: Array<CartItem>;
  updatedAt: string | null;
};

state: (): CartState => ({
  products: initialProducts.map((product) => ({ ...product })),
  items: [],
  updatedAt: null,
}),
```
</div>

**逐行解释：**

type固定key与element shape；factory每次clone catalog，避免test/root共享mutable array；empty items与nullabletimestamp显式提供初始类型。

**执行过程：**

create store → call factory → attach state to root → getters/render read properties → action mutates declared property → Vue triggers dependency → UI updates。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

state mutation会invalidate getters与render；cart subscription生成envelope；auth/permission guards不读cart，因此不会因cart mutation重新决策。

**为什么得到这个结果：**

reactive tracking按实际property reads建立，而不是“任何store变化都重渲染所有组件”。

**对比写法：**

把subtotal存进state要求每次items mutation手动同步；getter让subtotal始终从当前products/items派生。

**常见错误为什么错：**

`store.discount = 0`若未在factory声明，既不在完整state contract中，也无法被reset/hydration/plugin可靠处理。

**与真实项目的关系：**

清晰state shape是debug、migration、persist、SSR和test fixture的共同基础，但remote API response仍应在runtime边界验证。

**与当前学习主线的关系：**

延续Chapter02 reactive source与Chapter05 explicit types，把它们放入Pinia root lifecycle。

**最终记忆模型：**

state factory声明完整source shape；getter派生；action/direct/patch修改已声明key。

<a id="section-9-5"></a>

### 9.5 getters：computed-like derived state、this-bound getters 与 return type boundary

**结论：**

getter表达纯derived state，直接读state的arrow getter可推断；使用`this`访问其他getter时显式写return type。

**本节解决的问题：**

`subtotal`、`isDark`、`displayName`不应由actions手动同步。它们只依赖当前state，应像computed一样按dependency派生。

**技术意义：**

getter消除duplicated state并让dependency graph可观察；同一个state mutation可让多个getter与component render按需重新求值。

**概念解释：**

`cartStore.subtotal`读取items，再按productId读取products price；`themeStore.isDark()`通过`this.resolvedMode`组合另一个getter，因此显式返回`boolean`；getter不写state、不访问backend。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

getter只派生Pinia client state，可读取其他stores但不应复制URL/server/backend authority。Vue把getter实现为computed-like value；TS检查returns；storage保存state而不是computed output。

**store 机制证据链：**

1 owner：subtotal是cart derived state；2 `useCartStore()`取得store；3single root提供instance；4source是products/items；5subtotal读取两者并returnnumber；6add/incrementactions改items；7mutation可direct/patch；8component用storeToRefs取subtotal ref；9plain destructure得到stale number；10plugin观察state不存getter；11restoredstate经unknown；12getter用于component/test；13rootactive或explicit；14TS检查number return和`this` getter annotation；15TS不验证prices来自可信backend；16frontend显示estimatedsubtotal；17backend重算订单价格；18若action到处写subtotal，就是duplicated derived state信号。

**TypeScript 编译期过程：**

arrow getter的state parameter和return由function推断；method getter使用`this`组合其他getters时，TypeScript限制要求显式return type以稳定`this` inference。

**JavaScript / Pinia / Vue 运行时过程：**

getter创建computed-like effect；首次consumer读取时计算并收集items/products dependencies；相关mutation使cache dirty；下次读取重新计算。

**API / 语法规则：**

getter必须return derived value；无副作用；需要参数时可return function但其per-argument结果不等同普通computed cache；`this` getter写显式return type。

**文件结构：**

`cartStore.ts`展示state-parameter getters；`themeStore.ts`展示`this`组合getters；`authStore.ts`展示nullable fallback getters。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/stores/themeStore.ts</span>
  </div>

```ts
getters: {
  resolvedMode: (state): ResolvedTheme =>
    state.mode === "system" ? state.systemPreference : state.mode,
  themeClass(): string {
    return `theme-${this.resolvedMode} accent-${this.accent}`;
  },
  isDark(): boolean {
    return this.resolvedMode === "dark";
  },
},
```
</div>

**逐行解释：**

`resolvedMode`直接读state；`themeClass`和`isDark`通过store-bound`this`读getter/state，显式return types避免recursive `this` inference问题。

**执行过程：**

render读themeClass/isDark → getter读resolvedMode → resolvedMode读mode/systemPreference → setMode mutation → computed dirty → render再次读取 → new class/text → DOM patch。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

mode是persisted state；getter output不进入snapshot。toggle action写mode，subscription写state envelope，render使用updatedgetter；Router guards不依赖theme。

**为什么得到这个结果：**

getter依赖由实际runtime reads建立，pure formula可以从source重建，无需持久化或手动同步。

**对比写法：**

把`isDark`作为boolean state并在setMode/toggle/reset/restore四处维护，容易与mode不一致；getter只有一个公式。

**常见错误为什么错：**

getter中写`this.mode = "dark"`会让read产生mutation，可能形成循环与不可预测dependency；mutation应放action。

**与真实项目的关系：**

金额汇总、display labels、permission summary、filtered collection都适合getter；昂贵remote query lifecycle不因放进getter而成为cache。

**与当前学习主线的关系：**

它把Chapter02 computed机制扩展到跨component store instance，并保持Chapter05 return type boundary。

**最终记忆模型：**

getter = store上的pure computed-like view；只读source，返回derived result。

<a id="section-9-6"></a>

### 9.6 actions：business mutation API、async action boundary 与 no mutations layer

**结论：**

Pinia没有独立mutations layer；direct state write合法，但有业务规则、多字段协调、复用或async flow时用action提供明确mutation API。

**本节解决的问题：**

`cart.addItem`不仅push item，还要检查catalog、合并已有quantity、更新时间；若每个component自行完成，规则会分散且难以单测。

**技术意义：**

action把“允许怎样改变store”集中成domain operation，同时仍保留Pinia direct mutation适合简单UI state的能力。

**概念解释：**

Option Store action使用method syntax获得typed `this`；不要用依赖`this`的arrow function。actions可以`async`/`await`，但仅有async action仍不提供cache key、stale time、dedupe、refetch、cancel、retry和invalidation policy。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

actions修改global client state；component/form可保留local handlers；Router用navigation API改URL；Chapter09再定义API lifecycle；backend校验最终operation。Pinia记录action/mutation，Vue传播state change，TS检查parameters，storage订阅state。

**store 机制证据链：**

1 owner：cart operation属于cart Pinia；2 `useCartStore()`取得instance；3single root复用；4items/updatedAt已声明；5itemCount/subtotal读取items；6addItem修改items/updatedAt；7用function patch分组；8component通过store/storeToRefs读；9不解构state primitive；10plugin订阅cart；11persisted cart恢复前unknown；12action被component/test调用；13componentactive/testfresh；14TS检查productId与action return；15TS不验证远程product真实性；16frontend action控制clientcart；17backend重算inventory/price；18若多个components复制同一add logic，就是需要action的信号。

**TypeScript 编译期过程：**

method parameter与`this`由store definition推断；`void`明确同步action结果。未来async action可返回typed Promise，但类型不等同runtime validation或cache。

**JavaScript / Pinia / Vue 运行时过程：**

button listener调用bound action；action查找product/item；`$patch` callback同步修改reactive state；getters invalidated；subscription与render被scheduler处理。

**API / 语法规则：**

依赖`this`的Option Store action用method；action可接收任意typed args、return value或Promise；simple direct write合法；business mutation优先action。

**文件结构：**

`authStore.ts`提供sign-in/out actions；`cartStore.ts`提供collection actions；`selectionStore.ts`提供idempotent selection actions。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/stores/cartStore.ts</span>
  </div>

```ts
addItem(productId: string): void {
  const productExists = this.products.some(
    (product) => product.id === productId,
  );

  if (!productExists) {
    return;
  }

  this.$patch((state) => {
    const item = state.items.find(
      (candidate) => candidate.productId === productId,
    );
    if (item) item.quantity += 1;
    else state.items.push({ productId, quantity: 1 });
    state.updatedAt = new Date().toISOString();
  });
},
```
</div>

**逐行解释：**

parameter是domain id；catalog guard拒绝unknown id；function patch取得typed state；existing item保持object identity并增量，否则push；timestamp与collection mutation被归为一次业务操作。

**执行过程：**

click → bound action → guard → lookup → patch callback → state writes → getters/subscription/render schedule → subtotal与row DOM更新。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

items与updatedAt变化；itemCount/subtotal重新计算；cart subscription写snapshot；CartStoreDemo与lab render更新；auth/permission guard不受影响。

**为什么得到这个结果：**

Pinia action对store instance已绑定，内部writes仍是Vue reactive writes，不需要额外mutation object。

**对比写法：**

`cartStore.items.push(...)`在component中技术上可行，但会绕过catalog guard、timestamp和复用意图；简单`sidebar.collapsed = true`则可接受。

**常见错误为什么错：**

`signOut: () => { this.currentUser = null }`中的lexical `this`不是store；依赖store `this`必须用method syntax。

**与真实项目的关系：**

actions适合登录状态转换、购物车规则、selection normalization、preference policy；网络数据仍需独立request/cache/error设计。

**与当前学习主线的关系：**

继承Chapter03 event→owner mutation与Chapter04 function API，并为Chapter09 async/request boundary预留位置。

**最终记忆模型：**

direct write是能力；action是可命名、可复用、可测试的业务mutation boundary。

<a id="section-9-7"></a>

### 9.7 storeToRefs：store reactive wrapper、destructuring problem 与 action binding

**结论：**

store instance被`reactive`包装；直接解构state/getter取得当前普通值并失去后续property reads，`storeToRefs(store)`为reactive properties创建refs；actions已绑定，可直接解构。

**本节解决的问题：**

`const { mode } = themeStore`为何toggle后template仍显示旧mode？解构只执行一次property read，把string复制到local binding，render以后不再读取store property。

**技术意义：**

它把Chapter02 reactive destructuring边界带到Pinia，防止store state看似可用但UI停止更新。

**概念解释：**

`StoreToRefsDemo.vue`故意保留`staleModeSnapshot`作为失败证据，同时用`mode/themeClass` refs显示正确更新；`toggleMode`从store直接解构仍可用，因为Pinia绑定action receiver。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

问题属于JavaScript destructuring与Vue reactive connection；不改变state owner、Router URL、storage/backend。TS只知道snapshot/ref types，不会诊断“你期待它继续reactive”的语义。

**store 机制证据链：**

1 owner：mode仍由theme Pinia；2 `useThemeStore()`取得instance；3single root；4mode/accent/systemPreference声明；5themeClass/isDark读取state；6toggleMode写mode；7action mutation；8component通过storeToRefs读mode/getter；9plainstale snapshot断开；10plugin仍观察theme state；11restoreunknown不影响ref rule；12componentconsumer展示两种read；13setup使用activepinia；14TS区分string与Ref；15TS不判断stale intent；16frontend更新theme UI；17backend无关；18若action执行但destructuredtext不变、直接storeproperty会变，就是reactivity destructuring bug。

**TypeScript 编译期过程：**

plain `mode`推断为`ThemeMode`；`storeToRefs`返回`Ref<ThemeMode>`/getter ref。在template自动解包，在script读取需要`.value`。

**JavaScript / Pinia / Vue 运行时过程：**

setup时plain destructuring读一次string；storeToRefs建立toRef-like links；initial render读取refs；toggle action写store property；linked refs触发render，plain string不变。

**API / 语法规则：**

state/getters要么保持`store.x`读取，要么`storeToRefs(store)`；actions可`const { action } = store`；不要用storeToRefs提取actions。

**文件结构：**

核心演示在 `components/StoreToRefsDemo.vue`；Chapter02的`ReactiveDestructureMistake.vue`是前置对照。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/components/StoreToRefsDemo.vue</span>
  </div>

```vue
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useThemeStore } from "../stores/themeStore";

const themeStore = useThemeStore();
const staleModeSnapshot = themeStore.mode;
const { mode, themeClass } = storeToRefs(themeStore);
const { toggleMode } = themeStore;
</script>
```
</div>

**逐行解释：**

use-function取得reactive store；snapshot只保存当前string；storeToRefs为state/getter生成refs；action destructuring保留store binding。

**执行过程：**

setup captures snapshot/refs/action → render reads all → click callsaction → modewrite → linkedref/render trigger → reactive rows change，snapshot row stays。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

state与getter output变化；linked refs传递trigger；plugin订阅并persist；component部分DOMpatch；guard只在navigation时重新读取auth/permission，不因theme变化运行。

**为什么得到这个结果：**

dependency tracking需要render期间读取reactive getter/ref；plain primitive binding没有后续get trap。

**对比写法：**

`const mode = computed(() => themeStore.mode)`也保持连接，但storeToRefs批量处理state/getters并跳过actions。

**常见错误为什么错：**

把`toggleMode`传给storeToRefs会得到不存在的ref，因为utility只处理reactive properties；action应从store直接取。

**与真实项目的关系：**

destructuring常出现在page setup与composable return；code review看到`const { loading } = store`应立即检查是否使用storeToRefs。

**与当前学习主线的关系：**

直接连接Chapter02的reactive destructuring与Chapter04的plain object of refs return convention。

**最终记忆模型：**

store property read需要持续发生；state/getters转refs，actions直接解构。

<a id="section-9-8"></a>

### 9.8 $patch and $reset：grouped mutation、devtools entry、Option Store reset 与 Setup Store custom reset

**结论：**

`$patch({...})`适合partial object changes，`$patch(state => ...)`适合集合内多步mutation；Option Store自动`$reset()`，Setup Store需返回自定义reset action。

**本节解决的问题：**

如何让items与updatedAt作为一个可读mutation group变化？如何回到factory initial state？为什么permission Setup Store没有自动reset？

**技术意义：**

patch表达“同一业务操作的多个state writes”，subscription对function patch只收到一次；reset明确state lifecycle，但不等于清除browser persisted snapshot。

**概念解释：**

`cartStore.removeItem`用object patch替换items/timestamp；`addItem`用function patch执行find/push/increment；`themeStore.$reset()`重新调用Option state factory。Setup Store若有mutable refs必须自行实现reset并return。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

patch/reset只作用Pinia state；不替换route/query、API cache或backend data。Vue照常trigger；TS检查partial/callback state；persistence subscription可能在reset后写新initial snapshot。

**store 机制证据链：**

1 owner：cart/theme是Pinia；2useCart/useTheme实例化；3single root；4declared keys可patch/reset；5getters读取patched state；6actions/click handlers调用patch/reset；7object/function/direct三类可区分；8component refs读取；9storeToRefs保reactive；10plugin订阅patch；11restoredstateunknown；12PatchResetDemo与tests调用；13active/testfresh roots；14TS检查patch keys/callback types；15TS不验证业务quantity；16frontend reset UI state；17backend records不被reset；18若Setup Store调用`$reset`时报错，就是误以为自动支持的信号。

**TypeScript 编译期过程：**

object patch仅接受deep partial state keys；function callback收到typed state。Option Store public type包含`$reset`；Setup Store需要自己return同名/其他reset function。

**JavaScript / Pinia / Vue 运行时过程：**

patch执行同步writes并生成mutation record；Vue invalidatesdependencies；`$subscribe`回调一次；reset调用state factory并patch current state。

**API / 语法规则：**

简单单字段可direct；多个plain replacements用object patch；array Map/Set-like changes用function patch；不要用`$state =`期待普通reference replacement。

**文件结构：**

`components/PatchResetDemo.vue`显示三种操作；`cartStore.ts`包含两种patch；`themeStore.ts`使用Option reset。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/components/PatchResetDemo.vue</span>
  </div>

```ts
cartStore.$patch({
  items: [{ productId: "keyboard", quantity: 2 }],
  updatedAt: new Date().toISOString(),
});

cartStore.$patch((state) => {
  state.items.push({ productId: "mouse", quantity: 1 });
  state.updatedAt = new Date().toISOString();
});

themeStore.$reset();
```
</div>

**逐行解释：**

first patch提供partial replacements；second callback保留array并push；reset不接参数，从theme factory重建initial values。

**执行过程：**

button → handler → patch/reset → mutation record → subscription → getter/render update → persisted envelope write。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

cart items/timestamp或theme state变化；derivedvalues与refs更新；subscription写一次；guards不读取这些stores。

**为什么得到这个结果：**

Pinia把grouped writes包装为single mutation entry，但底层仍是Vue reactive state changes。

**对比写法：**

多次direct assignments也能工作，但mutation intent分散；对清晰的单字段assignment无需强行patch。

**常见错误为什么错：**

把`$patch`当作唯一允许的mutation会增加无意义ceremony；Pinia明确允许direct mutation。

**与真实项目的关系：**

适合cart batch update、preference reset、wizard restore；server transaction仍必须由backend实现，client patch不是atomic database operation。

**与当前学习主线的关系：**

连接Chapter02 grouped reactive writes与后续devtools/testing，且不引入旧式mutations layer。

**最终记忆模型：**

patch组织多次state write；reset恢复factory；二者都不是backend transaction。

<a id="section-9-9"></a>

### 9.9 Pinia plugins：pinia.use、store extension、$subscribe 与 local persistence

**结论：**

Pinia plugin是store-creation hook；本章在single root上注册local persistence plugin，它按store id allowlist恢复state并用`$subscribe`观察后续mutation。

**本节解决的问题：**

跨多个stores重复“读取storage、parse、subscribe、write”会散落side effects；plugin把横切能力集中，同时必须限制作用范围与runtime边界。

**技术意义：**

理解plugin context、creation timing与subscription，避免把第三方持久化包当黑盒；也说明plugin不是任意全局代码。

**概念解释：**

`pinia.use(piniaPersistencePlugin)`登记function。store创建时context提供store；plugin若id不在`theme/preferences/cart`立即return；在allowlist内才read/patch/subscribe。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

plugin只扩展/观察Pinia stores；localStorage是browser API并有guard；不持久化URL/server/backend state，不把frontend snapshot变成authorization。TS检查context，但runtime storage仍unknown。

**store 机制证据链：**

1 owner：persistence policy属于Pinia infrastructure；2theme/preferences/cart use-functions创建stores；3single root调用plugin；4plugin只处理declared state；5getters不被persist；6actions/patch触发state writes；7mutation type由Pinia记录；8components读取store/refs；9destructuring rule不变；10plugin观察allowlisted ids并subscribe；11JSON.parse result显式unknown；12plugin与PiniaPluginDemo/tests消费；13root安装后plugin应用；14TS检查PiniaPluginContext/envelope；15TS不验证disk bytes；16frontend恢复convenience state；17backend不信任snapshot；18若auth或任意store自动出现在storage，就是allowlist失效信号。

**TypeScript 编译期过程：**

context的`store.$id/$patch/$subscribe`受Pinia types约束；type guard将unknown缩窄为envelope。编译后interfaces消失，runtime guard必须保留。

**JavaScript / Pinia / Vue 运行时过程：**

store creation → plugin receives context → check id/browser → read/parse/validate → patch declared keys → register detached subscription → later mutation → serialize envelope → localStorage write。

**API / 语法规则：**

plugin通过`pinia.use(fn)`注册；只对之后创建且root已安装的stores生效；`$subscribe`可在plugin中调用；side effects需browser/allowlist/error guards。

**文件结构：**

registration在`stores/pinia.ts`；implementation在`stores/piniaPersistencePlugin.ts`；UI inspection在`components/PiniaPluginDemo.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/stores/pinia.ts</span>
  </div>

```ts
import { createPinia } from "pinia";
import { piniaPersistencePlugin } from "./piniaPersistencePlugin";

export const pinia = createPinia();

pinia.use(piniaPersistencePlugin);
```
</div>

**逐行解释：**

create function来自official package；local function是本章实现；export root供main/guards/tests外部adapter使用；use只登记plugin，不立即遍历stores。

**执行过程：**

module creates root → registers plugin → app installs root → first allowlisted store creation invokesplugin → restore/subscribe → future mutations write。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

plugin restore会在first render前patch state；getters/refs初次读取即看到restored values；later action triggers subscription/write；auth guards不被persist plugin影响。

**为什么得到这个结果：**

plugin lifecycle围绕store creation，不是围绕每个component；同一store被多处使用仍只建立一次plugin subscription。

**对比写法：**

每个component watch store再写storage会产生重复subscriptions与unmount lifecycle问题；plugin在store boundary集中一次。

**常见错误为什么错：**

无allowlist对所有stores订阅会把auth或未来sensitive/large state写入storage，扩大安全与性能风险。

**与真实项目的关系：**

plugin可做logging、instrumentation、persistence、dependency injection；每项都需要明确适用stores、error policy与SSR/browser boundary。

**与当前学习主线的关系：**

复用Chapter04 side-effect/cleanup思维和Chapter05 runtime narrowing，为Chapter10 plugin test setup提供最小样本。

**最终记忆模型：**

`pinia.use`登记横切策略；plugin按store id决定是否观察、恢复或扩展。

<a id="section-9-10"></a>

### 9.10 persisted state：localStorage boundary、unknown JSON parse、allowlist 与 security limit

**结论：**

localStorage内容不可信；先browser guard，再把`JSON.parse`结果视为`unknown`，验证version/storeId/savedAt/state envelope，仅恢复allowlisted stores与已声明keys；永不保存token。

**本节解决的问题：**

用户、旧版本、浏览器扩展或手工DevTools可改变storage。`JSON.parse(raw) as ThemeState`只欺骗compiler，不验证runtime shape。

**技术意义：**

持久化必须同时有schema/version boundary、allowlist、error handling与security limit；它提供刷新后convenience，不提供confidentiality、integrity或authorization。

**概念解释：**

本章persist `theme/preferences/cart`，不persist `auth/permissions/sidebar/selection`。envelope最小验证后，`patchDeclaredState`只写current state已有key，避免注入未声明properties。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

storage只保存safe global client subset；form/query/server/backend保持独立。Pinia patch恢复reactive state；TS guard协助narrowing但不验证业务语义；Vite不管理data migration。

**store 机制证据链：**

1 owner：theme/preferences/cart是safe Pinia subset；2their use-functions create stores；3single root plugin restores；4onlydeclared keys patched；5getters derive after restore；6later actions mutate；7patch function applies restored values；8components refs render restored state；9destructuring risk unchanged；10plugin allowlist/subscription performs persistence；11parse result is unknown thenguarded；12plugin/demo/test exercise boundary；13plugin needs installed root；14TS checksenvelope fields afterguard；15TS cannot trustlocalStorage；16frontend uses snapshot convenience；17backend rejects client snapshot asauthority；18unexpectedkey/token/auth entry instorage signals policy breach。

**TypeScript 编译期过程：**

`PersistedStoreId`限制allowlist；`PersistedStateEnvelope`描述narrowed result；`isRecord/isPersistedStateEnvelope`提供runtime predicates。类型擦除后predicate code才真正保护branch。

**JavaScript / Pinia / Vue 运行时过程：**

read string → JSON.parse to unknown value → inspect object fields → patch declaredkeys → initialrender; mutation → buildenvelope → JSON.stringify → write。read/parse/write exceptions记录为`PersistenceError`。

**API / 语法规则：**

`typeof window` guard；try/catch storage and parse；validate beforepatch；allowlist store ids；version envelope；never persistcredentials；clear action只移除chapter keys。

**文件结构：**

types在`storeTypes.ts`；implementation/helpers在`piniaPersistencePlugin.ts`；raw snapshot UI在`PiniaPluginDemo.vue`；plugin test在`themeStore.test.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/stores/piniaPersistencePlugin.ts</span>
  </div>

```ts
let parsedValue: unknown;

try {
  parsedValue = JSON.parse(rawValue) as unknown;
} catch (error: unknown) {
  recordPersistenceError({
    code: "parse-failed",
    storeId,
    message: error instanceof Error ? error.message : "JSON parse failed",
  });
  return null;
}

if (!isPersistedStateEnvelope(parsedValue, storeId)) {
  return null;
}
```
</div>

**逐行解释：**

variable明确unknown；parse可能throw；catch value也是unknown并narrow；invalid envelope停止restore；只有guard success branch获得typed envelope。

**执行过程：**

store creation → browser/storage check → parse → envelopeguard → patch declaredkeys → subscribe → mutation → serialize/write。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

valid snapshot在initial component render前改变allowlisted state；invalid snapshot不patch；subscription只跟踪后续state；auth/permission guard始终从nonpersisted auth state读取。

**为什么得到这个结果：**

browser storage是外部runtime boundary；TypeScript source annotation无法改变其中bytes。

**对比写法：**

`const saved = JSON.parse(raw) as AuthState`既无validation又可能持久化secret；本章只接受minimal envelope并排除auth。

**常见错误为什么错：**

localStorage对同源JavaScript可读、用户可改，不是secure vault；token/authorization不能依赖这里。

**与真实项目的关系：**

真实项目还需version migration、per-field validation、quota/privacy policy、cross-tab sync与logout cleanup；本章只教最小plugin mechanism。

**与当前学习主线的关系：**

兑现Chapter05 `unknown → guard`原则；Chapter09会把同一原则扩展到API response/runtime schema。

**最终记忆模型：**

persisted bytes永远是unknown；allowlist + guard + declared-key patch只提供可恢复的client convenience。

<a id="section-9-11"></a>

### 9.11 stores outside components：active pinia、route guards、useStore(pinia) 与 import-order bug

**结论：**

component setup可从app context隐式取得active Pinia；guard、plain module function、test与SSR context应在执行函数内调用store，并在边界不明确时显式传`pinia`。

**本节解决的问题：**

module top-level `const auth = useAuthStore()`可能在main尚未`app.use(pinia)`前执行，结果取决于import order；显式`useAuthStore(pinia)`把root选择变成代码事实。

**技术意义：**

Router guard成为可预测consumer，而不是隐式依赖“恰好先安装”。未来SSR也能为每个app/request传正确root。

**概念解释：**

Chapter 06 `evaluateAuthGuard`每次navigation执行时调用`useAuthStore(pinia)`；definition import安全，instance acquisition延后。`StoreOutsideComponentDemo`用button触发同一显式模式。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

Router触发guard，Pinia提供auth state，Vue reactivity维护store，TypeScript检查guard return；Vite import evaluation order不等于plugin installation；backend authorization不受client guard替代。

**store 机制证据链：**

1 owner：auth属于Pinia、navigation属于Router；2guard运行时调用`useAuthStore(pinia)`；3explicit root是app root；4currentUser/status声明；5isSignedIn getter读取；6sign-in/out action改变；7action mutation；8guard direct读getter，component可refs；9guard不destructure snapshot；10auth不被pluginpersist；11无authstorage boundary；12store用于guard/plainfunction；13root显式传入；14TS检查NavigationGuardReturn；15TS不证明call timing/identity；16frontend redirectlogin；17backend仍鉴权；18若错误只在cold import/initialnavigation出现，优先查top-level useStore。

**TypeScript 编译期过程：**

`useAuthStore(pinia)` parameter type保证传入Pinia；`NavigationGuardReturn`约束true/redirect等result。类型系统不执行import graph，不检测inactive runtime context。

**JavaScript / Pinia / Vue 运行时过程：**

modules先加载definitions/root/guard function但不取store；Router navigation调用function；function从explicit root取instance、读getter并return true或location。

**API / 语法规则：**

outside component：defer `useStore` inside function；必要时显式传root。tests每case激活fresh root；SSR每app/request使用对应root。

**文件结构：**

real guard在`chapter-06.../router/authGuard.ts`；plain demo在`components/StoreOutsideComponentDemo.vue`；root export在`stores/pinia.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/authGuard.ts</span>
  </div>

```ts
export function evaluateAuthGuard(
  to: RouteLocationNormalized,
): NavigationGuardReturn {
  const authStore = useAuthStore(pinia);

  if (to.meta.requiresAuth && !authStore.isSignedIn) {
    return {
      name: routeNames.login,
      query: { redirect: to.fullPath },
    };
  }

  return true;
}
```
</div>

**逐行解释：**

function boundary推迟instance acquisition；explicit root避免injection ambiguity；meta与getter共同决定redirect；redirect保留target URL。

**执行过程：**

navigation starts → beforeEach calls evaluator → obtain auth store from root → read current getter → return true/redirect → Router confirms or restartsnavigation。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

guard只读auth getter，不mutation；若redirect，route state变化并驱动RouterView；auth component render从同一store显示signed-out状态。

**为什么得到这个结果：**

explicit root使store identity不依赖active injection，函数执行时Pinia与Router都已由main注册。

**对比写法：**

module top-level `const authStore = useAuthStore()`可能先于app install；definition top-level `export const useAuthStore = defineStore(...)`则安全，因为未创建instance。

**常见错误为什么错：**

把store instance缓存到guard module top-level会把SPA import order或SSR request identity隐藏起来。

**与真实项目的关系：**

Router guards、HTTP interceptors、background jobs、tests和SSR code都应明确root/context来源。

**与当前学习主线的关系：**

直接改造Chapter06 guard，并为Chapter12 SSR per-request以及Chapter10 test isolation建立规则。

**最终记忆模型：**

component setup可注入；component外部要延迟调用，最好显式root。

<a id="section-9-12"></a>

### 9.12 SSR-safe state：state factory、per-app store instance 与 global reactive object risk

**结论：**

SSR下每个app/request必须拥有独立Pinia root与store instances；随意export module-global reactive object会让并发requests共享用户状态。

**本节解决的问题：**

browser SPA只有一个长期process context时module global看似可用；server process同时处理多个用户，global object可能把request A user暴露给request B。

**技术意义：**

state factory + per-app root把state生命周期绑定到application/request；这也是Pinia比“export reactive({})”更完整的原因之一。

**概念解释：**

本workspace仍是SPA，不创建SSR files。`SsrSafeStateDemo.vue`只展示顺序：request create app → create Pinia → install → use stores → render/serialize safely → discard instances。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

server runtime与browser runtime必须区分；Pinia root per app；Router也需per app；browser localStorage不在server可用；TS不阻止cross-request singleton；backend/session authority不应由shared client state模拟。

**store 机制证据链：**

1 owner：request client-state snapshot属于per-app Pinia；2request内`useAuthStore(requestPinia)`；3root每request新建；4state factory返回fresh fields；5getters只读requeststate；6actions只改requeststore；7mutation方式不改变isolation；8SSR component读取store；9destructuring仍需refs；10plugins按requestroot执行；11hydratedserialized state是runtime unknown/security boundary；12store用于SSR component/guard；13explicit request pinia；14TS checksPinia parameter；15TS不检测global leak；16SSRfrontend HTML/state影响client view；17backend auth仍server authority；18两个users偶发看到相同state是singleton leakage信号。

**TypeScript 编译期过程：**

factory和Pinia types可描述每次create return，但`const state = reactive(...)`也能通过类型检查；cross-request安全属于runtime architecture。

**JavaScript / Pinia / Vue 运行时过程：**

server request handler创建app/root，stores绑定root，render读取；state serialization需escape；client hydration在使用stores前装载对应root state；request完成后references释放。

**API / 语法规则：**

SSR每app `createPinia()`；outside setup传该root；serialize/escape state；browser-only APIs加guard；不要module-global user-specific reactive singleton。

**文件结构：**

本章只有`components/SsrSafeStateDemo.vue`解释边界；真正SSR implementation留给后续SSR章节。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: per-request Pinia factory</span>
  </div>

```ts
export function createRequestState() {
  const app = createSSRApp(App);
  const requestPinia = createPinia();

  app.use(requestPinia);

  return { app, requestPinia };
}
```
</div>

**逐行解释：**

每次function call创建新app/root；install只连接该pair；return把request context显式传给router/render，不导出user-specific singleton。

**执行过程：**

request A create pair A；request B create pair B；相同store id在不同roots生成不同instances；各自render/serialize；互不读取state。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

每root有独立state/getters/actions/plugin subscriptions；server通常不用localStorage；guards传对应root；render只订阅当前app state。

**为什么得到这个结果：**

store identity包含root；factory每次返回freshstate object，从结构上隔离request。

**对比写法：**

`export const session = reactive({ user: null })`只有一个module object，server requests共享同一reference。

**常见错误为什么错：**

仅把global object改名为store不会创建per-request boundary；必须有factory/root/application lifecycle。

**与真实项目的关系：**

任何SSR auth、cart、locale、feature flags都需要request isolation与safe hydration；XSS-safe serialization同样重要。

**与当前学习主线的关系：**

扩展Chapter04 shared module state风险；完整SSR、hydration与server/client runtime将在后续章节实现。

**最终记忆模型：**

SSR安全的关键不是API名称，而是每个request拥有自己的root与state graph。

<a id="section-9-13"></a>

### 9.13 auth store migration：从 Chapter 06 module-local authSession 迁移到 Pinia

**结论：**

`authStore.ts`成为current user、sign-in status、last role的唯一owner；Chapter06 `authSession.ts`只保留compatibility functions/computed，所有读写委托给explicit Pinia store。

**本节解决的问题：**

既要迁移source of truth，又不能重写Chapter06全部views/components。adapter保留`currentUser/signInAs/signOut/hasRole/hasPermission` imports，但不再创建module `ref`。

**技术意义：**

渐进迁移避免big-bang rewrite；new guards/menu直接依赖Pinia，legacy UI经adapter也读同一instance，消除两套auth state。

**概念解释：**

auth store用Option Store：state包含`currentUser/signInStatus/lastSignInRole`；getters提供`isSignedIn/displayName/role/permissions`；actions提供`signInAs/signOut/$reset`。没有token/backend call。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

demo user是client auth display state；Router guard只控制navigation；auth store不persist token；backend仍需session/token validation与authorization。TS确保role/permission literals但不证明identity。

**store 机制证据链：**

1 owner：auth user迁到Pinia；2adapter/guards call`useAuthStore(pinia)`；3single runtime root；4currentUser/status/lastRole声明；5isSignedIn/displayName/role/permissions读取；6signInAs/signOut mutate；7actions directassign；8newcomponents storeToRefs，legacy computed adapter；9adapter不snapshot；10auth excluded persistence plugin；11noauth storage unknown；12component/guard/adapter/test consume；13explicit pinia outsidecomponent；14TS syncsDemoUserRole/permissions；15TS不验证real login；16frontend controlsnavigation/UI；17backend authority独立；18若legacy view与new header显示不同user，说明adapter仍保留second state。

**TypeScript 编译期过程：**

adapter re-export `DemoUser` type并接受Chapter06 `RouteRole`；guest branch调用signOut，其余literal结构与DemoUserRole兼容。computed return type固定`DemoUser | null`。

**JavaScript / Pinia / Vue 运行时过程：**

legacy login调用adapter → adapter从explicit root取authstore → action writesstate → adapter computed与new store consumers同时trigger → guards下一次navigation读取sameinstance。

**API / 语法规则：**

compatibility layer只delegate，不own state；new infrastructure code直接用Pinia；auth不persist secrets；`$reset`只用于demo client state。

**文件结构：**

owner在`stores/authStore.ts`；adapter在Chapter06 `router/authSession.ts`；auth guard在`router/authGuard.ts`；UI在`AuthStoreDemo.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/authSession.ts</span>
  </div>

```ts
export const currentUser = computed<DemoUser | null>(
  () => useAuthStore(pinia).currentUser,
);

export function signInAs(role: RouteRole): void {
  const authStore = useAuthStore(pinia);

  if (role === "guest") authStore.signOut();
  else authStore.signInAs(role);
}

export function signOut(): void {
  useAuthStore(pinia).signOut();
}
```
</div>

**逐行解释：**

computed getter延迟取得store并保持reactive read；functions每次执行取得同root instance；guest映射为signed-out而非fake user。

**执行过程：**

legacy role button → adapter function → auth action → state mutation → computed/store refs/render updates → route push → guard reads newgetter → allow/redirect。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

只有auth store state变化；adapter computed和Pinia refs共享dependency；auth不触发persistence；guards/menu在调用时读current values。

**为什么得到这个结果：**

adapter没有自己的ref，只是把旧API映射到新owner，因此不存在同步window。

**对比写法：**

保留old `currentUserState`并watch Pinia双向同步会形成loop/race；delegate是单向ownership迁移。

**常见错误为什么错：**

迁移guard却让dynamic menu仍读old ref，会出现guard允许但menu隐藏；所有policy consumers必须指向同owner。

**与真实项目的关系：**

兼容adapter适合逐步替换legacy modules，但应标注owner并避免长期堆叠双API。

**与当前学习主线的关系：**

兑现Chapter06明确留下的temporary session迁移点，并保持其route/visual teaching files完整。

**最终记忆模型：**

adapter保留调用面；Pinia store独占state ownership。

<a id="section-9-14"></a>

### 9.14 permission store：cross-store composition、route meta access checks 与 backend authorization boundary

**结论：**

permission Setup Store组合auth store，不复制user；`hasRole/hasPermission/canAccessRouteMeta`统一client access policy，dynamic menu与guard共享它；backend必须独立授权。

**本节解决的问题：**

guard、menu、badge若分别实现permission logic，会出现every/some、empty requirements、signed-out handling不一致。

**技术意义：**

cross-store composition建立single policy API；route meta仍是route policy input，auth store是identity input，permission store产生derived decision。

**概念解释：**

empty roles/permissions返回true；requiresAuth且signed-out返回false；required permissions全部满足才通过。`visiblePermissionSummary`是computed display getter，不是security proof。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

route meta由Router records拥有；auth identity由Pinia拥有；permission decision是frontend UX；TypeScript检查structural meta contract；backend对每个API重新认证授权；storage不保存auth。

**store 机制证据链：**

1 owner：identity authstore、routepolicy Router、decision permissionstore；2`usePermissionStore`内部`useAuthStore`；3same root composition；4permission不声明duplicateuser state；5summary computed读auth getters；6auth actions change inputs；7action/direct/patch发生在auth；8components direct read summary/computed；9storeToRefs可提getter；10plugin seespermission id but skips；11no persisted permission snapshot；12guard/menu/component/test consume functions；13guards explicitroot；14TS checksRouteAccessMeta literals；15TS不验证backend grants；16frontend hides/redirects；17backend enforcesoperation；18guard/menu disagree signals duplicated policy or differentroot。

**TypeScript 编译期过程：**

`RouteAccessMeta`用readonly role/permission arrays形成structural contract；Chapter06 RouteMeta具有兼容literal fields，可直接传给function而无需runtime cast。

**JavaScript / Pinia / Vue 运行时过程：**

permission store setup取得auth instance；function call读取当前auth getters和meta arrays；returnsboolean；auth mutation使summary computed/render更新，guard在nextnavigation重新调用。

**API / 语法规则：**

Setup Store组合另一个store；不return route object；checks接受readonly arrays；empty requirements allow；frontend result不可当backend authorization。

**文件结构：**

policy在`stores/permissionStore.ts`；guard在Chapter06 `permissionGuard.ts`；menu在`dynamicMenu.ts`；visual proof在`PermissionStoreDemo.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/stores/permissionStore.ts</span>
  </div>

```ts
function canAccessRouteMeta(meta: RouteAccessMeta): boolean {
  if (meta.requiresAuth && !authStore.isSignedIn) {
    return false;
  }

  return (
    hasRole(meta.requiredRoles) &&
    hasPermission(meta.requiredPermissions)
  );
}
```
</div>

**逐行解释：**

auth requirement先短路signed-out；role/permission helpers处理empty arrays和currentuser；finalboolean只是client decision。

**执行过程：**

route target matched → guard passes mergedmeta → permissionstore reads auth → returnsboolean → Router allow/redirect；menu对records调用同policy → visibleitems更新。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

permission store没有duplicated mutable identity；auth action变化触发summary/menu computed render；guard只在navigation运行；plugin不persistauth/permission。

**为什么得到这个结果：**

所有consumers调用同一function并读取同一authstore，policy没有同步副本。

**对比写法：**

在menu单独写`role === "admin"`会忽略permission arrays；derivation应统一由permission store完成。

**常见错误为什么错：**

隐藏menu或redirect 403不能阻止用户直接调用API；client code和storage都可被修改。

**与真实项目的关系：**

frontend policy改善navigation/visibility；backend authorization按session/token/resource ownership重新判断并返回403。

**与当前学习主线的关系：**

复用Chapter06 typed meta/guards，并为Chapter08 button permission UI保留同一client policy API。

**最终记忆模型：**

route meta是要求，auth store是事实，permission store是client decision，backend是最终authority。

<a id="section-9-15"></a>

### 9.15 theme and preferences stores：global client UI state 与 safe persistence

**结论：**

theme与preferences是适合Pinia和localStorage的global client state：跨页面使用、无secret、可由default重建；component只应用class/controls，不让store直接操纵DOM。

**本节解决的问题：**

theme header、final lab、table density和compact layout需要共享且刷新后保留；把document DOM mutation塞进store会把state owner与render side effect混合。

**技术意义：**

store暴露serializable source与derived class，component template负责class binding，保持Vue render boundary清晰。

**概念解释：**

theme state有mode/accent/systemPreference，getter输出resolvedMode/themeClass/isDark；preferences有compactLayout/tableDensity/dismissedTips。两者在allowlist中，无credentials。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

UI preference属于Pinia；temporary hover/modal不进入；URL filter不复制；server profile sync未实现；storage是local convenience；backend authorization无关。

**store 机制证据链：**

1 owner：theme/preferences Pinia；2useTheme/usePreference stores；3single root；4all UI fields declared；5theme getters read mode/accent/system；6actions set/toggle/reset preferences；7direct/action/reset mutations；8components storeToRefs/template direct；9refs preserve destructuring；10plugin allowlists both；11snapshots parse unknown；12component/plugin/test consumers；13active root；14TS checksmode/density unions；15TS notvalidatestorage semantics；16frontend appliesclasses/layout；17backend notauthorized bytheme；18refresh resets unexpectedly indicates plugin/allowlist/envelope problem。

**TypeScript 编译期过程：**

`ThemeMode`与density union拒绝unknown literals；getter returns固定string/boolean。storage恢复仍需runtime guards。

**JavaScript / Pinia / Vue 运行时过程：**

action writesmode/preference → getters dirty → template class/text rerender → subscription writes envelope；reload first store creation restoresstate → first render usesrestored values。

**API / 语法规则：**

store return derived class而非query DOM；safe state才allowlist；Option `$reset`恢复factory；component用class binding执行render。

**文件结构：**

`themeStore.ts`、`preferenceStore.ts`、对应demo与lab panels，以及persistence plugin共同形成闭环。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: theme render boundary</span>
  </div>

```vue
<script setup lang="ts">
const themeStore = useThemeStore();
const { themeClass } = storeToRefs(themeStore);
</script>

<template>
  <section :class="themeClass">
    <button type="button" @click="themeStore.toggleMode">
      Toggle theme
    </button>
  </section>
</template>
```
</div>

**逐行解释：**

store ownsmode；ref exposesderived class reactively；template ownsDOM class application；button callsaction而不手改DOM。

**执行过程：**

click → action → modewrite → getter invalidation → component render → class patch → plugin subscription/write。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

theme/preference state变化；refs/getters/render更新；allowlisted snapshots更新；route/guards/auth不变化。

**为什么得到这个结果：**

template render effect实际读取themeClass ref，因此state dependency最终连接到DOM class。

**对比写法：**

store内`document.body.className = ...`难以SSR/test且绕过component render；store输出value，component应用更清晰。

**常见错误为什么错：**

把access token和theme一起persist因为“都是global”混淆了共享范围与安全等级；auth secrets不能进入本plugin。

**与真实项目的关系：**

locale、density、dismissed hints也常适合safe persistence；account-level server preferences需要API sync/conflict policy。

**与当前学习主线的关系：**

为Chapter08 admin UI/theme/form capability提供client store，不提前引入UI library。

**最终记忆模型：**

Pinia保存可重建的UI preference；getter给render value；component负责DOM。

<a id="section-9-16"></a>

### 9.16 cart and selection stores：collection state、derived totals、selection ownership 与 over-globalization

**结论：**

cart跨panels/pages并需持久化，适合Pinia；selection只有在多个admin panels协调时才全局化，否则留在table component。两者都用serializable arrays，不把derived totals复制进state。

**本节解决的问题：**

同为array，为什么cart通常global而单页checkbox selection常local？决定因素是共享范围、页面切换后的生命周期与业务owner，不是数据结构。

**技术意义：**

collection state需要stable ids、normalized actions、derived getters与明确reset；同时避免把每个table selection都升级成global lifetime。

**概念解释：**

cart state保存products/items/updatedAt，getters产生itemCount/subtotal/isEmpty；selection保存availableItems/selectedIds，并用select/unselect/toggle/selectMany/clear维护unique ids。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

cart/跨panel selection属于client Pinia；product catalog在真实项目可能是server cache，本章用静态demo；URL filter仍在Router；backend确认价格/库存/可操作rows；cart被persist，selection不persist。

**store 机制证据链：**

1 owner：cart Pinia，selection按sharing决定；2useCart/useSelection instantiate；3single root；4collections/timestamps declared；5cart getters derivecount/total；6actions add/remove/toggle/select；7direct/object/function patch组合；8components storeToRefs；9plain array/primitive destructure risks stale/replacement；10plugin onlycart；11cart snapshot unknown；12components/tests/plugin use；13active/test roots；14TS checksitem/product/id shapes；15TS notvalidateprice/row access；16frontend showscart/selection；17backend validatesorder/bulk operation；18selection leaking between unrelated pages signals over-globalization。

**TypeScript 编译期过程：**

`CartItem/CartProduct/SelectionItem`约束collection elements；readonly action inputs阻止consumer修改参数array；types不验证id是否来自runtime API。

**JavaScript / Pinia / Vue 运行时过程：**

actions find/filter/push arrays；Vue tracksarray length/items/properties；getters recompute totals；templates keyed bystable ids patchrows；cart subscription persistsstate。

**API / 语法规则：**

store collection只保留source fields；totals用getters；IDs保持serializable array；Set-like uniqueness用`Set`临时计算后返回array；unknown item guarded/ignored。

**文件结构：**

`stores/cartStore.ts`、`selectionStore.ts`，focused demos与final lab cart/dashboard共同消费。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/stores/selectionStore.ts</span>
  </div>

```ts
selectMany(ids: ReadonlyArray<string>): void {
  this.selectedIds = [
    ...new Set(
      ids.filter((id) =>
        this.availableItems.some((item) => item.id === id),
      ),
    ),
  ];
},
```
</div>

**逐行解释：**

input readonly；filter只保留available ids；Set去重；spread恢复serializable array；single assignment触发selectedIds consumers。

**执行过程：**

select-all click → action receives ids → validate/filter/dedupe → replace selectedIds → dashboard count/checkbox render update。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

selection replacement只更新selection consumers且不persist；cart changes update getters, two cart panels, dashboard and persistence；guards/menu不依赖这些stores。

**为什么得到这个结果：**

Pinia root共享instance使focused demo与final lab看到同一cart；selection同样共享，因此必须谨慎选择global owner。

**对比写法：**

单个table的selectedIds用local ref更短且自动随unmount释放；只有跨toolbar/panel/page coordination才需要store。

**常见错误为什么错：**

把API product list直接作为永久cart product source会混淆server cache与client cart；本章静态catalog只是demo fixture。

**与真实项目的关系：**

cart、compare list、multi-panel selection适合此模式；server inventory和bulk authorization仍由后端判断。

**与当前学习主线的关系：**

综合Chapter02 collections、Chapter03 ownership、Chapter04 composable boundary，并为Chapter09 API data separation铺路。

**最终记忆模型：**

collection结构不决定owner；共享生命周期决定，derived totals永远从source重建。

<a id="section-9-17"></a>

### 9.17 testing stores：setActivePinia、createPinia、plugin test setup 与 action assertions

**结论：**

每个store unit test用fresh `createPinia()`并`setActivePinia()`；测试action后的state/getter。需要plugin时创建empty app并`app.use(testPinia)`，因为plugin在root安装后才应用。

**本节解决的问题：**

若tests共享runtime pinia，前一test state会污染后一test；若只`createPinia().use(plugin)`但不安装到app，plugin可能未执行。

**技术意义：**

store unit tests无需mount component、Vue Test Utils或browser E2E，能直接验证state transition、derived result与persistence boundary。

**概念解释：**

`piniaStoreTest.ts`提供`activateFreshPinia`和in-memory `Storage`；四个`.test.ts`分别验证auth、permission composition、theme/plugin、cart collection。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

测试只覆盖Pinia stores/local plugin；不mount components、不发API、不跑Router E2E、不证明backend security。Vitest运行test modules；TS检查tests；fake storage替代browser API。

**store 机制证据链：**

1 owner：test state属于fresh test Pinia；2test调用target useStore；3beforeEach creates/activates root；4factory producesinitial fields；5assert getters；6call actions；7observe direct/patch results；8no component refs needed；9destructuring avoided；10plugin test installs plugin/app；11fake storage raw value remains runtime string/unknown in plugin；12store used in test；13active or explicit testpinia；14TS checks assertions/calls；15TS notprove behavior；16tests verifyfrontend state only；17backend untested；18order-dependent failures signal shared root/state leakage。

**TypeScript 编译期过程：**

Vitest imports提供typed`describe/it/expect`; helper returnsPinia; MemoryStorage implementsDOM Storage interface。compiler不执行assertions。

**JavaScript / Pinia / Vue 运行时过程：**

Vitest beforeEach createsroot → useStore invokesfactory → action mutatesreactive state synchronously → expect readsstate/getter；plugin test awaits`nextTick` forsubscription write then createssecondroot to restore。

**API / 语法规则：**

pure store tests：`setActivePinia(createPinia())` each test；plugin tests install root intoapp；no component mount dependencies；assert bothsource andderived results。

**文件结构：**

`tests/authStore.test.ts`、`permissionStore.test.ts`、`themeStore.test.ts`、`cartStore.test.ts`与`piniaStoreTest.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/tests/authStore.test.ts</span>
  </div>

```ts
describe("auth store", () => {
  beforeEach(() => {
    activateFreshPinia();
  });

  it("signs in with the selected demo role", () => {
    const authStore = useAuthStore();
    authStore.signInAs("manager");

    expect(authStore.isSignedIn).toBe(true);
    expect(authStore.role).toBe("manager");
  });
});
```
</div>

**逐行解释：**

suite描述domain；beforeEach隔离root；test取得fresh instance、调用public action、断言state-derived getters。

**执行过程：**

Vitest discovers file → beforeEach active root → test creates store → action mutation → computed/getter read → assertions pass/fail → next test newroot。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

tests直接观察state/getters/actions；无component render/Router guard。theme plugin test额外观察subscription与secondroot restore。

**为什么得到这个结果：**

Pinia store不要求component实例；active Pinia足以提供root context。

**对比写法：**

仅运行`npm run dev`证明页面模块可加载，不会执行Vitest assertions；必须运行`npm run test:unit`。

**常见错误为什么错：**

在module top-level创建一次test store让所有tests共享mutable instance，结果受执行顺序影响。

**与真实项目的关系：**

store unit tests是快速state policy gate；component interaction、Router integration、E2E、MSW、coverage和CI留给Chapter10。

**与当前学习主线的关系：**

把Chapter05 type contract和Chapter06 policy迁移变成可执行behavior assertions，不提前建立完整test architecture。

**最终记忆模型：**

每test一个fresh root；调用public action；断言source与derived result。

<a id="section-9-18"></a>

### 9.18 Chapter integration：Router guards、dynamic menu 与 Pinia stores 如何协作

**结论：**

main先安装Pinia再安装Router；auth/permission guards和dynamic menu在函数执行时显式取同一root stores；route records仍唯一拥有menu/meta/URL信息。

**本节解决的问题：**

迁移auth后如何防止route policy、menu tree、auth store三处重复？records保留path/name/meta；stores只提供identity与access decision；menu从records派生。

**技术意义：**

同一auth action能同时改变header、legacy Chapter06 views、permission summary和dynamic menu；navigation时guard读相同decision API。

**概念解释：**

`authGuard`读`authStore.isSignedIn`；`permissionGuard`调用`permissionStore.canAccessRouteMeta(to.meta)`；`dynamicMenu`遍历routeRecords并调用同一permission function，不创建second menu configuration。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

Pinia ownsauth client state；Router ownsURL/records/meta/navigation；Vue rendersmenu/outlets；TS checksstructural contracts；Vite loads modules/routes；storage excludesauth；backend remainssecurity authority。

**store 机制证据链：**

1 owner：auth/permission Pinia、route/menu config Router；2guards/menu calluseAuth/usePermission；3explicit sharedroot；4auth fieldsdeclared；5permission getters/functionsread auth；6login actionchangesauth；7action mutation；8menu component computed reads generated items；9no stale destructuring；10plugin skipsauth；11noauth persisted unknown；12stores used inguard/menu/component；13explicit pinia outsidecomponent；14TS checksmeta/route names/store API；15TS notvalidateidentity/backend；16frontend redirects/hidesmenu；17backend authorizesAPI；18guard/menu mismatch signals duplicated route tree, policy, or root。

**TypeScript 编译期过程：**

RouteMeta augmentation suppliesrequired fields；store structural `RouteAccessMeta` accepts them；DynamicMenuItem route name usestyped literal union；compiler does not runmatching/guard.

**JavaScript / Pinia / Vue 运行时过程：**

sign-in action writesauth → DynamicMenuPanel computed reruns becausegeneration reads auth getters → links change；navigation click → matcher buildsmeta → guards read same stores → returndecision → RouterView update。

**API / 语法规则：**

Pinia installed beforeRouter; stores obtained inside functions; route records remainmenu source; permission store no route copies; adapter onlylegacy bridge。

**文件结构：**

integration crossesChapter01 `main.ts`、Chapter06 guards/menu/records、Chapter07 auth/permission stores和`PiniaAdminSidebar.vue`。

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
  const authStore = useAuthStore(pinia);
  const permissionStore = usePermissionStore(pinia);

  return collectMenuItems(records, authStore, permissionStore);
}
```
</div>

**逐行解释：**

records由Router caller提供；function execution取得explicit root stores；collector只从records/meta加policy派生items，不保存第二份tree。

**执行过程：**

component computed calls generator → stores read → records filtered/sorted → linksrender；auth action triggerscomputed update；link click entersguard pipeline。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

auth state mutation改变permission reads和menu render；guard不自动运行直到navigation；Router route改变后RouterView更新；auth仍不persist。

**为什么得到这个结果：**

menu computed执行期间读取authstore reactive properties，因此建立dependency；guard是imperative navigation hook，按navigation重新读取。

**对比写法：**

另建`adminMenuStore.items`复制route names/meta会与routes漂移；派生函数保持records single source。

**常见错误为什么错：**

只迁移authGuard、忘记permissionGuard/dynamicMenu会造成同一user在不同client surfaces被不同policy判断。

**与真实项目的关系：**

清晰边界支持真实session/API替换：auth action可换成validated backend response，Router records与consumers无需重写ownership。

**与当前学习主线的关系：**

这是Chapter05 typed boundary、Chapter06 Router与Chapter07 Pinia的直接汇合。

**最终记忆模型：**

Pinia提供identity/policy；Router提供URL/records/meta；menu与guard在需要时组合两者。

<a id="section-9-19"></a>

### 9.19 Final integration：vue-pinia-admin-state-lab 如何组织 admin global client state

**结论：**

final lab用同一Pinia root组合auth、permission、theme、preferences、cart、selection、sidebar、persistence、Router-derived menu与store tests说明，不创建second app/root/router。

**本节解决的问题：**

验证多个stores组合后仍有清晰owner：header读auth/theme，sidebar读layout并从routes派生menu，dashboard读derived summaries，cart/preferences panels共享state，test panel只说明quality boundary。

**技术意义：**

整合目标不是制造giant admin app，而是证明store boundaries、cross-store composition、persistence、Router adapter和tests能同时成立。

**概念解释：**

`VuePiniaAdminStateLab`只负责layout composition与theme/compact classes；child panels各调用所需stores。PiniaChapterApp渲染focused demos后再渲染final lab，保证项目不替代分节学习。

**边界：component local state、form state、global client state、server state、URL state、Pinia runtime、Vue reactivity、Vue Router、TypeScript、Vite tooling、browser storage、backend authorization：**

local panel rendering留在components；global client stores共享；Router menu/links保持URL owner；remote data未实现；storage只allowlist；backend security明确排除；TS/vue-tsc/Vitest/Vite分别有独立gate。

**store 机制证据链：**

1 owner：每个domain/layout store独立，URL/backend外置；2child panels calluseXxxStore；3all useinstalled single root；4each store declaresfields；5dashboard/theme/cart/permission gettersreadstate；6header/cart/preferences/sidebar actionsmutate；7direct/action/patch/reset all demonstrated；8storeToRefs for classes/counts；9no stale destructuring except intentional demo；10persistence plugin observes3ids；11snapshots unknown；12stores used components/guards/tests/plugin；13componentsactive, guards explicit, testsfresh；14TS/vue-tsc checkgraph；15runtime external values stillneedguards；16frontend controlsadmin UX；17backend authority independent；18cross-panel disagreement points toowner/root/destructuring error。

**TypeScript 编译期过程：**

SFC imports、store public APIs、template expressions、RouterLink names和component bindings由`vue-tsc`检查；Vitest test types单独参与同一TS graph。

**JavaScript / Pinia / Vue 运行时过程：**

app mount创建Chapter07 tree；each use-function从root复用instances；render readsrefs/getters；user actions mutate stores；Vue scheduler更新所有dependent panels；plugin writesallowlisted snapshots；Router links走guards。

**API / 语法规则：**

composition component不创建store root；child按需要调用stores；theme/preferences/cart persisted；auth/permission/sidebar/selection不persist；route menu派生；tests不在browser UI中执行。

**文件结构：**

host在`PiniaChapterApp.vue`；final root在`pinia-lab/VuePiniaAdminStateLab.vue`；六个lab child components各有单一职责。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/pinia-lab/VuePiniaAdminStateLab.vue</span>
  </div>

```vue
<template>
  <section
    class="admin-lab"
    :class="[themeClass, { compact: compactLayout }]"
  >
    <PiniaAdminHeader />
    <div class="admin-body">
      <PiniaAdminSidebar />
      <div class="admin-content">
        <PiniaAdminDashboard />
        <div class="feature-grid">
          <PiniaCartPanel />
          <PiniaPreferencePanel />
          <PiniaStoreTestPanel />
        </div>
      </div>
    </div>
  </section>
</template>
```
</div>

**逐行解释：**

root section只应用derivedclasses；header/sidebar/dashboard/panels各自消费明确stores；没有store data作为manual props层层传递，也没有在host复制state。

**执行过程：**

mount → child setups obtain stores → first render → sign-in/theme/cart/preference/sidebar actions → shared store mutation → dependent child renders → DOM patch/persistence；route link另进入Router pipeline。

**state、getters、actions、refs、plugins、subscriptions、persistence、router guards 与 component render 的变化：**

每次action只改对应state；cross-store computed按reads更新；allowlistedstores写snapshot；auth mutation改变menu/permission但不persist；guard在navigation读取currentstate。

**为什么得到这个结果：**

所有features共享root但不共享一个giantstate object；Pinia按store id分区，Vue按propertydependency更新。

**对比写法：**

把所有fields放`useAdminStore`会混合auth、layout、cart和preferences lifecycle，测试/reset/persistence权限难以分离。

**常见错误为什么错：**

final host创建second Pinia会让其children与main/guards分裂；root只在bootstrap创建并安装。

**与真实项目的关系：**

这是admin state architecture的最小可运行骨架；真实API、UI library、forms、runtime validation与全面tests分别属于后续章节。

**与当前学习主线的关系：**

汇合Chapters01–07，并为Chapter08 admin UI/form、Chapter09 API boundary、Chapter10 testing architecture提供清晰接口。

**最终记忆模型：**

一个root，多store owner；components组合view，Router拥有URL，backend拥有security。

## 10. API / 语法索引

| API / Syntax | Layer | Input | Output | Runtime Effect | TypeScript Boundary |
| --- | --- | --- | --- | --- | --- |
| `createPinia()` | Pinia runtime | 无 | Pinia root | 创建store registry/root state | 返回`Pinia`，不证明安装顺序 |
| `app.use(pinia)` | Vue app | Pinia root | app | 安装并提供active root | 检查Plugin contract |
| `pinia.use(plugin)` | Pinia runtime | `PiniaPlugin` | Pinia root | 登记store-creation hook | 检查plugin context |
| `defineStore(id, options)` | Pinia definition | unique id、options | use-function | 定义Option Store | 推断state/getters/actions |
| `defineStore(id, setup)` | Pinia definition | unique id、setup function | use-function | 定义Setup Store | 从return object推断public API |
| `useXxxStore()` | component setup | active Pinia | store instance | 从app context取得root | 若runtime无active root仍会失败 |
| `useXxxStore(pinia)` | outside component | explicit root | store instance | 从指定root取得/创建store | 检查Pinia parameter |
| `storeToRefs(store)` | Vue/Pinia reactivity | reactive store | refs object | state/getters保持reactive link | actions被跳过 |
| direct mutation | Pinia state | assignment | new state | 触发Vue dependencies | 检查field/value type |
| `$patch(object)` | Pinia state | deep partial | void | grouped partial replacement | 只允许state keys |
| `$patch(function)` | Pinia state | typed callback | void | grouped collection mutation | callback state被typed |
| `$reset()` | Option Store | 无 | void | 重新应用state factory | Setup Store不会自动提供 |
| `$state` | Pinia state | state object | state view | assignment内部使用patch | 不是普通reference replacement |
| `$subscribe()` | Pinia subscription | callback/options | unsubscribe function | 观察direct/patch mutations | state与mutation metadata typed |
| `setActivePinia()` | test/runtime context | Pinia | Pinia | 设置当前root | 不自动安装plugins到app |
| `computed()` in Setup Store | Vue reactivity | getter | ComputedRef | 作为Pinia getter暴露 | return type可推断/显式 |
| `localStorage.getItem()` | browser API | key | string/null | 读取外部持久值 | 返回string不等于typed state |
| `JSON.parse()` | JavaScript runtime | string | runtime value | 可能throw，shape不可信 | 本章接为`unknown` |

## 11. 常见错误表

| Wrong code | Error type or observed bug | Violated rule | Why it fails | Correct code | Recognition method |
| --- | --- | --- | --- | --- | --- |
| `useUiStore().value = repeatedValue` | global state abuse | 重复使用不等于global owner | 生命周期可能仍属于单个component | `const value = ref(initialValue)` | 只有一个component需要且unmount后应消失 |
| `export const state = reactive({ user: null })` | hidden singleton / SSR leak | per-app state graph | server requests共享module object，且缺少store/plugin/test identity | `defineStore("auth", { state: () => ({ currentUser: null }) })` | 无`useXxxStore`、root或factory |
| `useModalStore()`管理单页面modal | over-globalization | local UI state留在owner | state寿命被扩展到整个app | `const isOpen = ref(false)` | store只被一个component消费 |
| 所有form draft写入`useFormStore` | stale draft / reset bug | form state不默认global | 页面离开后仍保留脏值 | local form composable或明确跨页store+reset | unrelated routes共享草稿 |
| `filterStore.page = Number(route.query.page)` | dual source of truth | URL state由Router拥有 | query与store会互相漂移 | 直接从`route.query.page`派生 | refresh/back后页面与store不一致 |
| `productStore.products = await fetch(...)`且无policy | stale server data | Pinia不自动等于API cache | 缺cache key/refetch/invalidation/cancel | Chapter09 API cache policy | 多页面各自fetch且不知道何时失效 |
| module top-level `const auth = useAuthStore()` | inactive Pinia/import-order bug | outside component延迟或显式root | import可能先于`app.use(pinia)` | function内`useAuthStore(pinia)` | cold start/initial navigation才失败 |
| feature内`const pinia = createPinia()` | split store instances | runtime一个root | 同id在不同roots是不同store | import shared `pinia` | header/guard显示不同user |
| 只安装Router，不`app.use(pinia)` | runtime injection failure | root必须安装 | setup无法发现active Pinia | `app.use(pinia)` | first `useStore()`抛错 |
| `app.mount("#app"); app.use(pinia)` | late plugin registration | plugins在mount前安装 | component tree已开始创建 | use Pinia/Router后再mount | initial render拿不到store |
| `store.newKey = value` | undeclared state | keys在`state()`声明 | reset/SSR/plugin/types不知道key | 在state factory初始化 | refresh/reset后字段消失 |
| `const { mode } = themeStore` | stale snapshot | reactive properties不直接解构 | primitive只读取一次 | `const { mode } = storeToRefs(themeStore)` | action成功但local text不变 |
| `const { toggleMode } = storeToRefs(themeStore)` | missing action ref | storeToRefs跳过actions | utility只提取reactive properties | `const { toggleMode } = themeStore` | destructured action是undefined |
| `signOut: () => { this.currentUser = null }` | wrong `this` | Option action依赖method `this` | arrow捕获lexical this | `signOut() { this.currentUser = null }` | runtime this undefined/TS diagnostic |
| `fullLabel() { return this.label + this.count }`无return type | getter TS inference error | this-based getter显式return type | recursive `this` inference受限 | `fullLabel(): string { ... }` | `vue-tsc`指向getter return |
| `store.$state = nextState`期待new reference | incorrect replacement model | Pinia保持reactivity并内部patch | root state不能按普通object替换 | `store.$patch(nextState)` | reference identity与预期不同 |
| 每个单字段写都`$patch({ ... })` | unnecessary ceremony | direct mutation合法 | 可读性下降且隐藏简单意图 | `store.collapsed = true`或action | patch payload只有一个直白字段 |
| `setupStore.$reset()`未自定义 | missing runtime method | Setup Store自定义reset | automatic reset只属于Option Store | return explicit `reset()` | method不存在或类型报错 |
| `localStorage.setItem("token", token)` | credential exposure | persistence不是secure storage | 同源脚本与用户可读/改 | 不在本chapter persist token | storage中出现credential |
| `JSON.parse(raw) as ThemeState` | trusted external value | parse结果先视为unknown | assertion不做runtime validation | `const value: unknown = JSON.parse(raw)` + guard | malformed storage导致state异常 |
| plugin对所有`store.$id`订阅 | data exposure/performance | persistence allowlist | auth/large/transient stores全被写入 | check `PersistedStoreId` | storage出现未批准store ids |
| `permissionStore.canEdit`作为API安全 | authorization bypass | frontend不保护backend | client code/state可修改 | backend每request授权 | 直接API call绕过UI |
| 维护独立`menuItems`store复制routes | configuration drift | menu从route records/meta派生 | path/name/meta变化需双写 | `generateDynamicMenu(routeRecords)` | route可访问但menu缺失 |
| tests直接`useAuthStore()`无beforeEach | shared/inactive test root | 每test fresh active Pinia | state污染或inactive error | `setActivePinia(createPinia())` | tests单独过、一起失败 |
| 只运行`npm run dev`就声称tests通过 | unexecuted quality gate | dev/type/test/build独立 | Vite不会执行Vitest assertions | `npm run test:unit` | terminal没有Vitest test counts |

## 12. 最终小项目

最终小项目只整合本章已经分节解释的机制，不替代9.1–9.19。项目名为 `vue-pinia-admin-state-lab`，真实root component是 `src/learning/vue/chapter-07-pinia-state-management/pinia-lab/VuePiniaAdminStateLab.vue`。

### 12.1 项目目标与章节适配

项目在一个既有Vue app中展示：

- auth Option Store、permission Setup Store与cross-store composition。
- theme、preferences、cart、selection、sidebar的清晰owner。
- Router records/meta拥有menu与URL，Pinia只提供identity/client policy。
- allowlisted theme/preferences/cart persistence与`unknown` parse boundary。
- focused pure store unit tests，不引入component/E2E architecture。
- frontend permission只控制client UX，backend仍是安全authority。

它适合Chapter07，因为所有交互都围绕state ownership、store instance、getter/action、patch/reset、plugin、outside-component access与tests；没有引入UI library、API client、schema validator、real backend或Chapter08内容。

### 12.2 文件结构与状态所有权

| State / responsibility | Owner | Primary file | Persistence | Consumer |
| --- | --- | --- | --- | --- |
| current demo user/status/last role | auth Pinia store | `stores/authStore.ts` | 否 | header、guards、legacy adapter |
| role/permission decision | permission Pinia store | `stores/permissionStore.ts` | 否 | guard、menu、demo |
| theme mode/accent/system preference | theme Pinia store | `stores/themeStore.ts` | 是 | chapter demo、lab root/header |
| compact layout/table density/tips | preference Pinia store | `stores/preferenceStore.ts` | 是 | preference panels、lab root |
| cart items/catalog fixture/timestamp | cart Pinia store | `stores/cartStore.ts` | 是 | cart demos、dashboard |
| coordinated selected ids | selection Pinia store | `stores/selectionStore.ts` | 否 | selection demo、dashboard |
| collapsed/pinned layout | sidebar Pinia store | `stores/sidebarStore.ts` | 否 | lab sidebar |
| URL/query/route params/records/meta | Vue Router | Chapter06 `router/` | 浏览器history | links、guards、RouterView |
| remote server data/cache lifecycle | future API layer | Chapter09 | 未实现 | 未实现 |
| protected operation authorization | backend | server | server policy | 不由本lab实现 |

### 12.3 Store、persistence、Router 与 testing maps

**State classification map：**

modal→component；product draft→form；auth/theme/cart→Pinia；filter/page→Router URL；remote products→API cache；protected write→backend。

**Auth store map：**

`currentUser/signInStatus/lastSignInRole` → `isSignedIn/displayName/role/permissions` → `signInAs/signOut/$reset`。

**Permission store map：**

auth store public getters + `RouteAccessMeta` → `hasRole/hasPermission/canAccessRouteMeta` → guard/menu/client visibility。

**Theme and preference map：**

serializable safe state → getters/actions → `storeToRefs` → class/control render → persistence plugin。

**Cart and selection map：**

source arrays → normalized actions/patches → derived count/subtotal → focused demo与final lab共享；selection只有跨panels时才global。

**Persistence map：**

allowlisted id → browser guard → storage string → `unknown` parse → envelope guard → declared-key patch → `$subscribe` → versioned envelope write。

**Router guard migration map：**

Chapter06 route meta → guard evaluator → `useAuthStore(pinia)` / `usePermissionStore(pinia)` → true或redirect；legacy session API仅delegate。

**Dynamic menu integration map：**

route records/meta + currentauth/permission decision → filter/sort → typed menu items；没有second menu tree。

**Testing map：**

Vitest `beforeEach` → fresh active Pinia → use store → call action/patch → assert state/getter；plugin test再加empty app与MemoryStorage。

### 12.4 核心完整代码

以下code windows给出core stores、local plugin、Chapter06 adapter、关键component与final lab的完整代码。样式与其余focused panels保留在真实文件中，最终文件清单列出全部路径。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/stores/storeTypes.ts</span>
  </div>

```ts
export type DemoUserRole = "admin" | "manager" | "operator";

export type DemoPermission =
  | "dashboard:view"
  | "users:view"
  | "users:detail"
  | "roles:view"
  | "orders:view";

export type DemoUser = {
  id: string;
  displayName: string;
  role: DemoUserRole;
  permissions: ReadonlyArray<DemoPermission>;
};

export type ThemeMode = "light" | "dark" | "system";

export type SidebarState = {
  collapsed: boolean;
  pinned: boolean;
};

export type PreferenceState = {
  compactLayout: boolean;
  tableDensity: "comfortable" | "compact";
  dismissedTips: Array<string>;
};

export type CartProduct = {
  id: string;
  name: string;
  price: number;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type SelectionItem = {
  id: string;
  label: string;
};

export type PersistedStoreId = "theme" | "preferences" | "cart";

export type PersistedStateEnvelope = {
  version: 1;
  storeId: PersistedStoreId;
  savedAt: string;
  state: Record<string, unknown>;
};

export type PersistenceError = {
  code: "read-failed" | "parse-failed" | "invalid-envelope" | "write-failed";
  storeId: PersistedStoreId;
  message: string;
};

export type RouteAccessMeta = {
  requiresAuth?: boolean;
  requiredRoles?: ReadonlyArray<DemoUserRole | "guest">;
  requiredPermissions?: ReadonlyArray<DemoPermission>;
};
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/stores/pinia.ts</span>
  </div>

```ts
import { createPinia } from "pinia";
import { piniaPersistencePlugin } from "./piniaPersistencePlugin";

export const pinia = createPinia();

pinia.use(piniaPersistencePlugin);
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/stores/authStore.ts</span>
  </div>

```ts
import { defineStore } from "pinia";
import type {
  DemoPermission,
  DemoUser,
  DemoUserRole,
} from "./storeTypes";

type SignInStatus = "signed-out" | "signed-in";

type AuthState = {
  currentUser: DemoUser | null;
  signInStatus: SignInStatus;
  lastSignInRole: DemoUserRole | null;
};

const demoUsers = {
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
} satisfies Record<DemoUserRole, DemoUser>;

function clonePermissions(
  permissions: ReadonlyArray<DemoPermission>,
): Array<DemoPermission> {
  return [...permissions];
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    currentUser: null,
    signInStatus: "signed-out",
    lastSignInRole: null,
  }),
  getters: {
    isSignedIn: (state): boolean =>
      state.signInStatus === "signed-in" && state.currentUser !== null,
    displayName: (state): string =>
      state.currentUser?.displayName ?? "Signed out",
    role: (state): DemoUserRole | null =>
      state.currentUser?.role ?? null,
    permissions: (state): ReadonlyArray<DemoPermission> =>
      state.currentUser?.permissions ?? [],
  },
  actions: {
    signInAs(role: DemoUserRole): void {
      const user = demoUsers[role];

      this.currentUser = {
        ...user,
        permissions: clonePermissions(user.permissions),
      };
      this.signInStatus = "signed-in";
      this.lastSignInRole = role;
    },
    signOut(): void {
      this.currentUser = null;
      this.signInStatus = "signed-out";
    },
  },
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/stores/permissionStore.ts</span>
  </div>

```ts
import { computed } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";
import type {
  DemoPermission,
  DemoUserRole,
  RouteAccessMeta,
} from "./storeTypes";

export const usePermissionStore = defineStore("permissions", () => {
  const authStore = useAuthStore();

  function hasRole(
    requiredRoles: ReadonlyArray<DemoUserRole | "guest"> | undefined,
  ): boolean {
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    if (requiredRoles.includes("guest") && !authStore.isSignedIn) {
      return true;
    }

    return (
      authStore.role !== null &&
      requiredRoles.includes(authStore.role)
    );
  }

  function hasPermission(
    requiredPermissions: ReadonlyArray<DemoPermission> | undefined,
  ): boolean {
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    return requiredPermissions.every((permission) =>
      authStore.permissions.includes(permission),
    );
  }

  function canAccessRouteMeta(meta: RouteAccessMeta): boolean {
    if (meta.requiresAuth && !authStore.isSignedIn) {
      return false;
    }

    return (
      hasRole(meta.requiredRoles) &&
      hasPermission(meta.requiredPermissions)
    );
  }

  const visiblePermissionSummary = computed(() => {
    if (!authStore.isSignedIn) {
      return "No active permissions";
    }

    return `${authStore.role}: ${authStore.permissions.join(", ")}`;
  });

  return {
    hasRole,
    hasPermission,
    canAccessRouteMeta,
    visiblePermissionSummary,
  };
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/stores/themeStore.ts</span>
  </div>

```ts
import { defineStore } from "pinia";
import type { ThemeMode } from "./storeTypes";

type ResolvedTheme = "light" | "dark";
type ThemeAccent = "emerald" | "indigo" | "amber";

type ThemeState = {
  mode: ThemeMode;
  accent: ThemeAccent;
  systemPreference: ResolvedTheme;
};

export const useThemeStore = defineStore("theme", {
  state: (): ThemeState => ({
    mode: "system",
    accent: "emerald",
    systemPreference: "light",
  }),
  getters: {
    resolvedMode: (state): ResolvedTheme =>
      state.mode === "system" ? state.systemPreference : state.mode,
    themeClass(): string {
      return `theme-${this.resolvedMode} accent-${this.accent}`;
    },
    isDark(): boolean {
      return this.resolvedMode === "dark";
    },
  },
  actions: {
    setMode(mode: ThemeMode): void {
      this.mode = mode;
    },
    setAccent(accent: ThemeAccent): void {
      this.accent = accent;
    },
    toggleMode(): void {
      this.mode = this.isDark ? "light" : "dark";
    },
  },
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/stores/preferenceStore.ts</span>
  </div>

```ts
import { defineStore } from "pinia";
import type { PreferenceState } from "./storeTypes";

export const usePreferenceStore = defineStore("preferences", {
  state: (): PreferenceState => ({
    compactLayout: false,
    tableDensity: "comfortable",
    dismissedTips: [],
  }),
  actions: {
    toggleCompactLayout(): void {
      this.compactLayout = !this.compactLayout;
    },
    setTableDensity(density: PreferenceState["tableDensity"]): void {
      this.tableDensity = density;
    },
    dismissTip(tipId: string): void {
      if (!this.dismissedTips.includes(tipId)) {
        this.dismissedTips.push(tipId);
      }
    },
    resetPreferences(): void {
      this.$reset();
    },
  },
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/stores/cartStore.ts</span>
  </div>

```ts
import { defineStore } from "pinia";
import type { CartItem, CartProduct } from "./storeTypes";

type CartState = {
  products: Array<CartProduct>;
  items: Array<CartItem>;
  updatedAt: string | null;
};

const initialProducts: Array<CartProduct> = [
  { id: "keyboard", name: "Mechanical Keyboard", price: 89 },
  { id: "mouse", name: "Precision Mouse", price: 49 },
  { id: "stand", name: "Laptop Stand", price: 65 },
];

function nowLabel(): string {
  return new Date().toISOString();
}

export const useCartStore = defineStore("cart", {
  state: (): CartState => ({
    products: initialProducts.map((product) => ({ ...product })),
    items: [],
    updatedAt: null,
  }),
  getters: {
    itemCount: (state): number =>
      state.items.reduce((total, item) => total + item.quantity, 0),
    subtotal: (state): number =>
      state.items.reduce((total, item) => {
        const product = state.products.find(
          (candidate) => candidate.id === item.productId,
        );
        return total + (product?.price ?? 0) * item.quantity;
      }, 0),
    isEmpty: (state): boolean => state.items.length === 0,
  },
  actions: {
    addItem(productId: string): void {
      const productExists = this.products.some(
        (product) => product.id === productId,
      );

      if (!productExists) {
        return;
      }

      const existingItem = this.items.find(
        (item) => item.productId === productId,
      );

      this.$patch((state) => {
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ productId, quantity: 1 });
        }
        state.updatedAt = nowLabel();
      });
    },
    removeItem(productId: string): void {
      this.$patch({
        items: this.items.filter((item) => item.productId !== productId),
        updatedAt: nowLabel(),
      });
    },
    increment(productId: string): void {
      const item = this.items.find(
        (candidate) => candidate.productId === productId,
      );

      if (item) {
        item.quantity += 1;
        this.updatedAt = nowLabel();
      }
    },
    decrement(productId: string): void {
      const item = this.items.find(
        (candidate) => candidate.productId === productId,
      );

      if (!item) {
        return;
      }

      if (item.quantity === 1) {
        this.removeItem(productId);
        return;
      }

      item.quantity -= 1;
      this.updatedAt = nowLabel();
    },
    clearCart(): void {
      this.$patch({
        items: [],
        updatedAt: nowLabel(),
      });
    },
    replaceProducts(products: ReadonlyArray<CartProduct>): void {
      this.$patch((state) => {
        state.products = products.map((product) => ({ ...product }));
        state.items = state.items.filter((item) =>
          state.products.some((product) => product.id === item.productId),
        );
        state.updatedAt = nowLabel();
      });
    },
  },
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/stores/selectionStore.ts</span>
  </div>

```ts
import { defineStore } from "pinia";
import type { SelectionItem } from "./storeTypes";

type SelectionState = {
  availableItems: Array<SelectionItem>;
  selectedIds: Array<string>;
};

export const useSelectionStore = defineStore("selection", {
  state: (): SelectionState => ({
    availableItems: [
      { id: "order-101", label: "Order 101" },
      { id: "order-102", label: "Order 102" },
      { id: "order-103", label: "Order 103" },
    ],
    selectedIds: [],
  }),
  actions: {
    select(id: string): void {
      if (!this.selectedIds.includes(id)) {
        this.selectedIds.push(id);
      }
    },
    unselect(id: string): void {
      this.selectedIds = this.selectedIds.filter(
        (selectedId) => selectedId !== id,
      );
    },
    toggle(id: string): void {
      if (this.selectedIds.includes(id)) {
        this.unselect(id);
      } else {
        this.select(id);
      }
    },
    clear(): void {
      this.selectedIds = [];
    },
    selectMany(ids: ReadonlyArray<string>): void {
      this.selectedIds = [
        ...new Set(
          ids.filter((id) =>
            this.availableItems.some((item) => item.id === id),
          ),
        ),
      ];
    },
  },
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/stores/sidebarStore.ts</span>
  </div>

```ts
import { defineStore } from "pinia";
import type { SidebarState } from "./storeTypes";

export const useSidebarStore = defineStore("sidebar", {
  state: (): SidebarState => ({
    collapsed: false,
    pinned: true,
  }),
  actions: {
    toggleCollapsed(): void {
      this.collapsed = !this.collapsed;
    },
    setPinned(pinned: boolean): void {
      this.pinned = pinned;
    },
    reset(): void {
      this.$reset();
    },
  },
});
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/stores/piniaPersistencePlugin.ts</span>
  </div>

```ts
import type { PiniaPluginContext, StateTree } from "pinia";
import type {
  PersistedStateEnvelope,
  PersistedStoreId,
  PersistenceError,
} from "./storeTypes";

export const persistedStoreIds = [
  "theme",
  "preferences",
  "cart",
] as const satisfies ReadonlyArray<PersistedStoreId>;

const storageKeyPrefix = "vue-chapter-07";
const persistenceErrors: Array<PersistenceError> = [];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPersistedStoreId(value: unknown): value is PersistedStoreId {
  return (
    typeof value === "string" &&
    persistedStoreIds.some((storeId) => storeId === value)
  );
}

function isPersistedStateEnvelope(
  value: unknown,
  expectedStoreId: PersistedStoreId,
): value is PersistedStateEnvelope {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.version === 1 &&
    value.storeId === expectedStoreId &&
    isPersistedStoreId(value.storeId) &&
    typeof value.savedAt === "string" &&
    isRecord(value.state)
  );
}

function getStorageKey(storeId: PersistedStoreId): string {
  return `${storageKeyPrefix}:${storeId}`;
}

function recordPersistenceError(error: PersistenceError): void {
  persistenceErrors.push(error);
}

function readPersistedEnvelope(
  storeId: PersistedStoreId,
): PersistedStateEnvelope | null {
  if (typeof window === "undefined") {
    return null;
  }

  let rawValue: string | null;

  try {
    rawValue = window.localStorage.getItem(getStorageKey(storeId));
  } catch (error: unknown) {
    recordPersistenceError({
      code: "read-failed",
      storeId,
      message: error instanceof Error ? error.message : "Storage read failed",
    });
    return null;
  }

  if (rawValue === null) {
    return null;
  }

  let parsedValue: unknown;

  try {
    parsedValue = JSON.parse(rawValue) as unknown;
  } catch (error: unknown) {
    recordPersistenceError({
      code: "parse-failed",
      storeId,
      message: error instanceof Error ? error.message : "JSON parse failed",
    });
    return null;
  }

  if (!isPersistedStateEnvelope(parsedValue, storeId)) {
    recordPersistenceError({
      code: "invalid-envelope",
      storeId,
      message: "Persisted value does not match the required envelope",
    });
    return null;
  }

  return parsedValue;
}

function patchDeclaredState(
  state: StateTree,
  persistedState: Record<string, unknown>,
): void {
  for (const [key, value] of Object.entries(persistedState)) {
    if (Object.hasOwn(state, key)) {
      Reflect.set(state, key, value);
    }
  }
}

function writePersistedEnvelope(
  storeId: PersistedStoreId,
  state: StateTree,
): void {
  if (typeof window === "undefined") {
    return;
  }

  const envelope: PersistedStateEnvelope = {
    version: 1,
    storeId,
    savedAt: new Date().toISOString(),
    state: { ...state },
  };

  try {
    window.localStorage.setItem(
      getStorageKey(storeId),
      JSON.stringify(envelope),
    );
  } catch (error: unknown) {
    recordPersistenceError({
      code: "write-failed",
      storeId,
      message: error instanceof Error ? error.message : "Storage write failed",
    });
  }
}

export function piniaPersistencePlugin({
  store,
}: PiniaPluginContext): void {
  if (!isPersistedStoreId(store.$id)) {
    return;
  }

  const envelope = readPersistedEnvelope(store.$id);

  if (envelope) {
    store.$patch((state) => {
      patchDeclaredState(state, envelope.state);
    });
  }

  store.$subscribe(
    (_mutation, state) => {
      writePersistedEnvelope(store.$id, state);
    },
    { detached: true },
  );
}

export function getRawPersistenceSnapshots(): ReadonlyArray<{
  storeId: PersistedStoreId;
  rawValue: string | null;
}> {
  return persistedStoreIds.map((storeId) => ({
    storeId,
    rawValue:
      typeof window === "undefined"
        ? null
        : window.localStorage.getItem(getStorageKey(storeId)),
  }));
}

export function clearPersistedState(): void {
  if (typeof window === "undefined") {
    return;
  }

  for (const storeId of persistedStoreIds) {
    window.localStorage.removeItem(getStorageKey(storeId));
  }
}

export function getPersistenceErrors(): ReadonlyArray<PersistenceError> {
  return [...persistenceErrors];
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/authSession.ts</span>
  </div>

```ts
import { computed } from "vue";
import { pinia } from "../../chapter-07-pinia-state-management/stores/pinia";
import { useAuthStore } from "../../chapter-07-pinia-state-management/stores/authStore";
import { usePermissionStore } from "../../chapter-07-pinia-state-management/stores/permissionStore";
import type { DemoUser } from "../../chapter-07-pinia-state-management/stores/storeTypes";
import type {
  RoutePermission,
  RouteRole,
} from "./routeMeta";

export type { DemoUser };

export const currentUser = computed<DemoUser | null>(
  () => useAuthStore(pinia).currentUser,
);

export function signInAs(role: RouteRole): void {
  const authStore = useAuthStore(pinia);

  if (role === "guest") {
    authStore.signOut();
  } else {
    authStore.signInAs(role);
  }
}

export function signOut(): void {
  useAuthStore(pinia).signOut();
}

export function hasRole(
  requiredRoles: readonly RouteRole[] | undefined,
): boolean {
  return usePermissionStore(pinia).hasRole(requiredRoles);
}

export function hasPermission(
  requiredPermissions: readonly RoutePermission[] | undefined,
): boolean {
  return usePermissionStore(pinia).hasPermission(requiredPermissions);
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
import { pinia } from "../../chapter-07-pinia-state-management/stores/pinia";
import { useAuthStore } from "../../chapter-07-pinia-state-management/stores/authStore";
import { routeNames } from "./routeNames";

export function evaluateAuthGuard(
  to: RouteLocationNormalized,
): NavigationGuardReturn {
  const authStore = useAuthStore(pinia);

  if (
    to.meta.requiresAuth &&
    !authStore.isSignedIn &&
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
import { pinia } from "../../chapter-07-pinia-state-management/stores/pinia";
import { usePermissionStore } from "../../chapter-07-pinia-state-management/stores/permissionStore";
import { routeNames } from "./routeNames";

export function evaluatePermissionGuard(
  to: RouteLocationNormalized,
): NavigationGuardReturn {
  const permissionStore = usePermissionStore(pinia);
  const accessAllowed = permissionStore.canAccessRouteMeta(to.meta);

  if (
    to.meta.requiresAuth &&
    !accessAllowed &&
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
    <span class="macos-code-title">src/learning/vue/chapter-06-vue-router-permission/router/dynamicMenu.ts</span>
  </div>

```ts
import type { RouteRecordRaw } from "vue-router";
import { pinia } from "../../chapter-07-pinia-state-management/stores/pinia";
import { useAuthStore } from "../../chapter-07-pinia-state-management/stores/authStore";
import { usePermissionStore } from "../../chapter-07-pinia-state-management/stores/permissionStore";
import {
  isAppRouteName,
  type AppRouteName,
} from "./routeNames";

export type DynamicMenuItem = {
  routeName: AppRouteName;
  label: string;
  order: number;
  children: ReadonlyArray<DynamicMenuItem>;
};

type AuthStore = ReturnType<typeof useAuthStore>;
type PermissionStore = ReturnType<typeof usePermissionStore>;

function canDisplayRoute(
  record: RouteRecordRaw,
  authStore: AuthStore,
  permissionStore: PermissionStore,
): boolean {
  if (!record.meta?.showInMenu) {
    return false;
  }

  if (record.meta.requiresAuth && !authStore.isSignedIn) {
    return false;
  }

  return permissionStore.canAccessRouteMeta(record.meta);
}

function collectMenuItems(
  records: readonly RouteRecordRaw[],
  authStore: AuthStore,
  permissionStore: PermissionStore,
): Array<DynamicMenuItem> {
  return records
    .flatMap((record) => {
      const children = record.children
        ? collectMenuItems(record.children, authStore, permissionStore)
        : [];

      if (
        !canDisplayRoute(record, authStore, permissionStore) ||
        !isAppRouteName(record.name)
      ) {
        return children;
      }

      return [
        {
          routeName: record.name,
          label: record.meta?.menuLabel ?? String(record.name),
          order: record.meta?.menuOrder ?? 0,
          children,
        },
      ];
    })
    .sort((left, right) => left.order - right.order);
}

export function generateDynamicMenu(
  records: readonly RouteRecordRaw[],
): ReadonlyArray<DynamicMenuItem> {
  const authStore = useAuthStore(pinia);
  const permissionStore = usePermissionStore(pinia);

  return collectMenuItems(records, authStore, permissionStore);
}
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/components/StoreToRefsDemo.vue</span>
  </div>

```vue
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useThemeStore } from "../stores/themeStore";

const themeStore = useThemeStore();
const staleModeSnapshot = themeStore.mode;
const { mode, themeClass } = storeToRefs(themeStore);
const { toggleMode } = themeStore;
</script>

<template>
  <section class="panel">
    <p class="eyebrow">Reactive destructuring</p>
    <h2>storeToRefs</h2>
    <p>Plain destructured snapshot: {{ staleModeSnapshot }}</p>
    <p>Reactive mode ref: {{ mode }}</p>
    <p>Reactive getter ref: {{ themeClass }}</p>
    <button type="button" @click="toggleMode">Toggle with bound action</button>
    <small>
      State and getters need storeToRefs. Actions are already bound and may be
      destructured directly.
    </small>
  </section>
</template>

<style scoped>
.panel {
  display: grid;
  gap: 0.65rem;
  padding: 1.25rem;
  border: 1px solid #67e8f9;
  border-radius: 1rem;
  background: #ecfeff;
}

.eyebrow {
  margin: 0;
  color: #0e7490;
  font-weight: 800;
  text-transform: uppercase;
}

h2,
p {
  margin: 0;
}

button {
  width: fit-content;
  padding: 0.45rem 0.7rem;
  border: 1px solid #0891b2;
  border-radius: 0.5rem;
  background: #ffffff;
  cursor: pointer;
}
</style>
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/PiniaChapterApp.vue</span>
  </div>

```vue
<script setup lang="ts">
import AuthStoreDemo from "./components/AuthStoreDemo.vue";
import CartStoreDemo from "./components/CartStoreDemo.vue";
import PatchResetDemo from "./components/PatchResetDemo.vue";
import PermissionStoreDemo from "./components/PermissionStoreDemo.vue";
import PiniaPluginDemo from "./components/PiniaPluginDemo.vue";
import PreferenceStoreDemo from "./components/PreferenceStoreDemo.vue";
import SelectionStoreDemo from "./components/SelectionStoreDemo.vue";
import SsrSafeStateDemo from "./components/SsrSafeStateDemo.vue";
import StateClassificationPanel from "./components/StateClassificationPanel.vue";
import StoreBoundaryPanel from "./components/StoreBoundaryPanel.vue";
import StoreOutsideComponentDemo from "./components/StoreOutsideComponentDemo.vue";
import StoreToRefsDemo from "./components/StoreToRefsDemo.vue";
import ThemeStoreDemo from "./components/ThemeStoreDemo.vue";
import VuePiniaAdminStateLab from "./pinia-lab/VuePiniaAdminStateLab.vue";
</script>

<template>
  <section class="chapter-section" aria-labelledby="chapter-07-title">
    <header class="chapter-hero">
      <p class="eyebrow">Vue Chapter 07</p>
      <h2 id="chapter-07-title">
        Pinia State Management and Store Boundaries
      </h2>
      <p>
        Classify state before globalizing it, compose typed stores, migrate
        Router guards to one Pinia root, persist an allowlist, and unit-test
        store behavior.
      </p>
    </header>

    <StoreBoundaryPanel />
    <StateClassificationPanel />

    <div class="demo-grid">
      <AuthStoreDemo />
      <PermissionStoreDemo />
      <ThemeStoreDemo />
      <PreferenceStoreDemo />
      <CartStoreDemo />
      <SelectionStoreDemo />
      <StoreToRefsDemo />
      <PatchResetDemo />
      <PiniaPluginDemo />
      <StoreOutsideComponentDemo />
      <SsrSafeStateDemo />
    </div>

    <VuePiniaAdminStateLab />
  </section>
</template>

<style scoped>
.chapter-section {
  display: grid;
  gap: 1rem;
}

.chapter-hero {
  padding: 2rem;
  border: 1px solid #99f6e4;
  border-radius: 1rem;
  background:
    linear-gradient(135deg, rgba(204, 251, 241, 0.96), rgba(238, 242, 255, 0.96));
}

.eyebrow {
  margin: 0;
  color: #0f766e;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h2 {
  margin: 0.45rem 0;
  font-size: clamp(1.8rem, 4vw, 3rem);
}

.chapter-hero p:last-child {
  max-width: 780px;
  line-height: 1.65;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
}
</style>
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/pinia-lab/VuePiniaAdminStateLab.vue</span>
  </div>

```vue
<script setup lang="ts">
import { storeToRefs } from "pinia";
import PiniaAdminDashboard from "./PiniaAdminDashboard.vue";
import PiniaAdminHeader from "./PiniaAdminHeader.vue";
import PiniaAdminSidebar from "./PiniaAdminSidebar.vue";
import PiniaCartPanel from "./PiniaCartPanel.vue";
import PiniaPreferencePanel from "./PiniaPreferencePanel.vue";
import PiniaStoreTestPanel from "./PiniaStoreTestPanel.vue";
import { usePreferenceStore } from "../stores/preferenceStore";
import { useThemeStore } from "../stores/themeStore";

const preferenceStore = usePreferenceStore();
const themeStore = useThemeStore();
const { compactLayout } = storeToRefs(preferenceStore);
const { themeClass } = storeToRefs(themeStore);
</script>

<template>
  <section
    class="admin-lab"
    :class="[themeClass, { compact: compactLayout }]"
  >
    <PiniaAdminHeader />
    <div class="admin-body">
      <PiniaAdminSidebar />
      <div class="admin-content">
        <PiniaAdminDashboard />
        <div class="feature-grid">
          <PiniaCartPanel />
          <PiniaPreferencePanel />
          <PiniaStoreTestPanel />
        </div>
      </div>
    </div>
    <footer>
      Pinia controls client state and presentation. Vue Router owns the URL.
      The backend remains the authorization authority.
    </footer>
  </section>
</template>

<style scoped>
.admin-lab {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #0f766e;
  border-radius: 1.1rem;
  background: #ecfdf5;
}

.admin-lab.theme-dark {
  color: #e2e8f0;
  background: #020617;
}

.admin-lab.compact {
  gap: 0.55rem;
  padding: 0.6rem;
}

.admin-body {
  display: flex;
  gap: 1rem;
}

.admin-content {
  display: grid;
  flex: 1;
  gap: 1rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.8rem;
}

footer {
  padding: 0.8rem;
  border-radius: 0.6rem;
  color: #134e4a;
  background: #ccfbf1;
}

@media (max-width: 760px) {
  .admin-body {
    flex-direction: column;
  }
}
</style>
```
</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-07-pinia-state-management/components/PatchResetDemo.vue</span>
  </div>

```vue
<script setup lang="ts">
import { ref } from "vue";
import { useCartStore } from "../stores/cartStore";
import { useThemeStore } from "../stores/themeStore";

const cartStore = useCartStore();
const themeStore = useThemeStore();
const mutationLabel = ref("No patch applied");

function applyObjectPatch(): void {
  cartStore.$patch({
    items: [{ productId: "keyboard", quantity: 2 }],
    updatedAt: new Date().toISOString(),
  });
  mutationLabel.value = "Object patch replaced two state fields";
}

function applyFunctionPatch(): void {
  cartStore.$patch((state) => {
    state.items.push({ productId: "mouse", quantity: 1 });
    state.updatedAt = new Date().toISOString();
  });
  mutationLabel.value = "Function patch grouped collection changes";
}

function resetOptionStore(): void {
  themeStore.$reset();
  mutationLabel.value = "Option Store reset from its state factory";
}
</script>

<template>
  <section class="panel">
    <p class="eyebrow">Grouped mutations</p>
    <h2>$patch and $reset</h2>
    <p>{{ mutationLabel }}</p>
    <div class="actions">
      <button type="button" @click="applyObjectPatch">Object patch</button>
      <button type="button" @click="applyFunctionPatch">Function patch</button>
      <button type="button" @click="resetOptionStore">Reset theme</button>
    </div>
    <small>
      Option Stores receive $reset automatically. Setup Stores need an explicit
      reset action when reset behavior is required.
    </small>
  </section>
</template>

<style scoped>
.panel {
  padding: 1.25rem;
  border: 1px solid #fdba74;
  border-radius: 1rem;
  background: #fff7ed;
}

.eyebrow {
  margin: 0;
  color: #c2410c;
  font-weight: 800;
  text-transform: uppercase;
}

h2 {
  margin: 0.35rem 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

button {
  padding: 0.45rem 0.7rem;
  border: 1px solid #ea580c;
  border-radius: 0.5rem;
  background: #ffffff;
  cursor: pointer;
}
</style>
```
</div>

### 12.5 运行方式、预期行为与安全边界

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
npm run test:unit
npm run build
```
</div>

预期交互：

1. auth focused demo、Chapter06 legacy UI与final header显示同一用户。
2. role变化后permission summary、role/orders access结果与route-derived menu同步更新。
3. theme与compact preferences同时影响focused demo与final lab；刷新后allowlisted state恢复。
4. cart focused demo与final cart panel共享items/count/subtotal。
5. storeToRefs demo中plain snapshot保持初始值，reactive ref随toggle变化。
6. patch/reset demo显示object patch、function patch和Option reset。
7. raw persistence panel只出现theme/preferences/cart keys，不出现auth token或credentials。
8. `npm run test:unit`独立执行store assertions；browser panel不会冒充test runner。

安全边界：所有user/role/permission都是demo client state。menu隐藏、403 redirect与button visibility只改善UX；真实backend必须认证request、检查role/permission/resource ownership并拒绝越权操作。localStorage可读可改，不能作为credential或authorization evidence。

### 12.6 常见错误与扩展任务

集成时优先检查：

- main中是否只注册一个Pinia并位于mount前。
- guard/menu是否在function内显式`useStore(pinia)`。
- authSession adapter是否仍有自己的`ref`。
- route records/meta是否仍是menu/URL的single source。
- persistence是否严格allowlist并排除auth。
- Setup Store是否返回全部store-owned state。
- component是否对state/getters使用storeToRefs而不是plain destructuring。
- tests是否每case创建fresh Pinia。

可选扩展仅限本章机制：为persistence增加version migration与每store field validator；为permission helper补充更多pure unit tests；为selection增加明确page ownership reset。不要在本章添加UI library、API client、runtime schema library、component testing、E2E、MSW或real token flow。

## 13. 额外速查表

本节用于复习，不替代前面的owner判断、运行过程和错误分析。

### 13.1 一句话结论

Pinia为Vue app提供按root与store id组织的reactive global client state；它不拥有component/form/URL/server state，也不替代backend authorization。

### 13.2 核心API、运行边界与项目用途

| Concept | Layer | Syntax / identifier | Runtime behavior | Decision rule |
| --- | --- | --- | --- | --- |
| Pinia | state library | `pinia` | 管理root/store/plugin | global client state才使用 |
| createPinia | Pinia runtime | `createPinia()` | 创建root registry | runtime app一次，test/request各自创建 |
| app.use(pinia) | Vue app | plugin install | 提供active root | mount前 |
| defineStore | definition | `defineStore(id, ...)` | 返回use-function | 每个store独立文件/id |
| store id | identity | `"auth"` | root内唯一registry key | app内唯一且稳定 |
| useXxxStore | access | `useAuthStore()` | 取得/创建instance | setup中隐式root |
| Option Store | definition | state/getters/actions object | 清晰映射三个概念 | 简单domain store优先 |
| Setup Store | definition | refs/computed/functions | 灵活composition | 返回全部store state |
| state | Vue reactivity | `state: () => ({...})` | source values | 所有keys预先声明 |
| state factory | lifecycle | `state: () => ...` | 每root/test新object | 不用共享mutable object |
| getter | derived state | `getters: {...}` | computed-like cache | pure formula，不写state |
| action | mutation API | `actions: {...}` | bound sync/async method | 业务规则/多字段/复用 |
| store instance | Pinia/Vue | `useStore(pinia)` | reactive wrapper | identity由root+id决定 |
| direct mutation | state write | `store.count++` | 合法并触发update | 简单明确单字段 |
| $patch object | grouped write | `$patch({ ... })` | partial grouped replace | 多个plain fields |
| $patch function | grouped write | `$patch(state => ...)` | grouped collection changes | push/splice/多步 |
| $reset | lifecycle | `store.$reset()` | Option Store回factory | Setup Store自定义 |
| $state | state view | `store.$state` | assignment内部patch | 不期待普通replace |
| $subscribe | side effect | `store.$subscribe(cb)` | 观察mutation | persistence/logging |
| storeToRefs | reactivity | `storeToRefs(store)` | state/getters转refs | 解构reactive property |
| plugin | extension | `(context) => ...` | store creation hook | 横切且适用范围明确 |
| pinia.use | registration | `pinia.use(plugin)` | 登记plugin | store creation前 |
| persisted state | browser data | envelope | 刷新后恢复client state | convenience，不是security |
| localStorage | browser API | `window.localStorage` | string key/value storage | browser guard与try/catch |
| unknown persisted JSON | runtime boundary | `let value: unknown` | guard后才能patch | assertion不等于validation |
| stores outside components | context boundary | guard/plain function | 无自动component injection | 延迟call或explicit root |
| active pinia | context | `setActivePinia` / app install | implicit useStore来源 | 不依赖import order |
| useStore(pinia) | explicit access | `useAuthStore(pinia)` | 选择指定root | guard/SSR/test适用 |
| SSR-safe state | server architecture | per-app root | request isolation | 不导出user global reactive |
| setActivePinia | test API | `setActivePinia(root)` | 设置test current root | beforeEach |
| createPinia in tests | isolation | `createPinia()` | fresh state graph | 每test或suite setup |
| global client state | ownership | auth/theme/cart | 跨component/page client value | Pinia候选 |
| local state | ownership | modal open | component lifecycle | `ref`留在owner |
| form state | ownership | draft fields | form flow lifecycle | 不默认global |
| server state | ownership | remote products | cache/refetch/invalidation | Chapter09 policy |
| URL state | ownership | params/query/page | history/share/refresh | Vue Router |
| frontend permission | client UX | guard/menu/button | 可被用户绕过 | 只做体验控制 |
| backend authorization | security | server policy | 保护data/operation | 每request执行 |
| API cache | remote state policy | cache keys/stale/retry | 管理server snapshots | 不等于普通Pinia array |

### 13.3 相似概念对比

| Question | Option A | Option B | Decision rule |
| --- | --- | --- | --- |
| state放哪里 | component ref | Pinia store | 是否跨owner/lifetime共享 |
| filter放哪里 | Router query | Pinia | 是否需要share/back/refresh |
| remote list怎么管 | plain store array | API cache policy | 是否有stale/refetch/invalidation |
| mutation怎么写 | direct write | action | 是否表达业务规则/复用 |
| grouped update | object patch | function patch | plain replacements vs collection operations |
| store syntax | Option Store | Setup Store | 显式map vs composition flexibility |
| 解构store | plain destructure | storeToRefs | state/getters必须保reactive |
| outside setup | implicit active root | explicit root | context是否保证 |
| permission | frontend decision | backend authorization | UX vs security authority |

### 13.4 常见错误类型

| Error type | Symptom | Root cause | First check |
| --- | --- | --- | --- |
| inactive Pinia | useStore runtime error | top-level call/install order | call site与main order |
| split root | panels state不一致 | multiple createPinia | root exports |
| stale destructuring | action后text不变 | primitive snapshot | storeToRefs |
| duplicated state | manual sync/watch | getter或owner复制 | source of truth |
| persistence corruption | refresh后shape异常 | trusted JSON | unknown guard |
| security confusion | direct API仍成功 | frontend-only permission | backend policy |
| test pollution | order-dependent tests | shared active root | beforeEach fresh Pinia |

### 13.5 最小可复制模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: minimal Pinia store</span>
  </div>

```ts
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubled: (state): number => state.count * 2,
  },
  actions: {
    increment(): void {
      this.count += 1;
    },
  },
});
```
</div>

## 14. 最终文件清单

| Path | Role | Status |
| --- | --- | --- |
| `docs/vue/chapter-07-pinia-state-management/vue-chapter-07-learning-guide.md` | Chapter07完整指南 | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/PiniaChapterApp.vue` | Chapter07组合入口 | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/stores/pinia.ts` | single runtime Pinia root | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/stores/storeTypes.ts` | shared domain/store/persistence types | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/stores/authStore.ts` | auth Option Store | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/stores/permissionStore.ts` | permission Setup Store | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/stores/themeStore.ts` | persisted theme store | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/stores/preferenceStore.ts` | persisted preferences store | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/stores/cartStore.ts` | cart collection store | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/stores/selectionStore.ts` | admin selection store | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/stores/sidebarStore.ts` | layout state store | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/stores/piniaPersistencePlugin.ts` | allowlisted local persistence plugin | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/components/StoreBoundaryPanel.vue` | owner decision panel | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/components/StateClassificationPanel.vue` | state classification table | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/components/AuthStoreDemo.vue` | auth store interactions | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/components/PermissionStoreDemo.vue` | permission composition | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/components/ThemeStoreDemo.vue` | theme store/render boundary | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/components/PreferenceStoreDemo.vue` | preferences store | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/components/CartStoreDemo.vue` | cart getters/actions | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/components/SelectionStoreDemo.vue` | selection ownership | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/components/StoreToRefsDemo.vue` | destructuring evidence | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/components/PatchResetDemo.vue` | patch/reset evidence | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/components/PiniaPluginDemo.vue` | persistence snapshots | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/components/StoreOutsideComponentDemo.vue` | explicit root evidence | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/components/SsrSafeStateDemo.vue` | SSR boundary explanation | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/pinia-lab/VuePiniaAdminStateLab.vue` | final lab root | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/pinia-lab/PiniaAdminHeader.vue` | auth/theme header | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/pinia-lab/PiniaAdminSidebar.vue` | sidebar + route-derived menu | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/pinia-lab/PiniaAdminDashboard.vue` | derived store summaries | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/pinia-lab/PiniaCartPanel.vue` | shared cart panel | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/pinia-lab/PiniaPreferencePanel.vue` | shared preference panel | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/pinia-lab/PiniaStoreTestPanel.vue` | test scope panel | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/tests/authStore.test.ts` | auth unit tests | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/tests/permissionStore.test.ts` | permission unit tests | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/tests/themeStore.test.ts` | theme/plugin unit tests | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/tests/cartStore.test.ts` | cart unit tests | 新建 |
| `src/learning/vue/chapter-07-pinia-state-management/tests/piniaStoreTest.ts` | fresh Pinia/storage test helpers | 新建 |
| `src/learning/vue/chapter-01-application-boundary/main.ts` | install Pinia before Router/mount | 更新 |
| `src/learning/vue/chapter-01-application-boundary/App.vue` | preserve Chapters01–06 and render Chapter07 | 更新 |
| `src/learning/vue/chapter-06-vue-router-permission/router/authSession.ts` | Pinia compatibility adapter | 更新 |
| `src/learning/vue/chapter-06-vue-router-permission/router/authGuard.ts` | direct Pinia auth guard | 更新 |
| `src/learning/vue/chapter-06-vue-router-permission/router/permissionGuard.ts` | direct Pinia permission guard | 更新 |
| `src/learning/vue/chapter-06-vue-router-permission/router/dynamicMenu.ts` | Pinia-aware route-derived menu | 更新 |
| `package.json` | Pinia/Vitest dependencies与test script | 更新 |
| `package-lock.json` | npm dependency lock | 更新 |
| `README.md` | Chapter07状态、入口与test command | 更新 |

## 15. 如何转换成个人笔记

建议保留五张卡：

1. owner card：component/form/Pinia/Router/API cache/backend六分类。
2. instance card：definition → `useStore(root)` → `(root,id)` identity。
3. reactivity card：store reactive wrapper → storeToRefs → action mutation → getter/render。
4. persistence card：allowlist → unknown → guard → patch → subscribe。
5. integration card：auth Pinia + route meta → permission decision → menu/guard；backend独立。

熟练后可删去重复UI代码，但不要删owner判断、outside-component timing、SSR isolation、frontend/backend permission与test fresh-root证据。

## 16. 必须能回答的问题

1. Pinia与export一个global `reactive` object的区别是什么？
2. 为什么SSR不能随意共享module-global user state？
3. `defineStore`何时定义、`useXxxStore`何时创建instance？
4. store id与Pinia root如何共同决定instance identity？
5. Option Store和Setup Store各自如何映射state/getters/actions？
6. Setup Store为什么必须返回全部store-owned state？
7. 为什么Pinia允许direct mutation，却仍然需要actions？
8. getter如何像computed一样建立dependency，为什么不应有side effect？
9. `this` getter为什么显式写return type，依赖`this`的action为什么不能用arrow？
10. 直接解构store为何失去reactivity？`storeToRefs`如何修复？actions为何可直接解构？
11. object patch、function patch与direct write分别适合什么？
12. Option Store与Setup Store的reset差异是什么？
13. plugin何时运行，`$subscribe`观察什么？
14. localStorage为何必须经过`unknown`与runtime guard？
15. 哪些stores被allowlist，为什么auth不在其中？
16. component外部调用store为何要延迟或显式传pinia？
17. Chapter06 auth migration如何保持legacy components工作又不产生第二owner？
18. dynamic menu为何从route records派生而不是进入store？
19. 为什么Pinia不等于API cache？
20. 前端permission store能控制什么，backend必须控制什么？
21. store tests为何每次创建fresh Pinia，plugin tests为何还要安装到app？

## 17. 最终记忆模型

完整机制链：

state ownership decision → unique store definition → single app Pinia root → `useXxxStore` instance → declared state → pure getters → direct/action/patch mutation → Vue dependency trigger → storeToRefs/component render → allowlisted subscription/persistence。

跨边界链：

Router URL/records/meta + Pinia auth/permission → guard/menu client decision → RouterView/UI result；API cache管理remote state；backend authorization保护真实data/operation。

测试与SSR链：

runtime app一个root；unit test每case fresh root；SSR每request/app独立root。相同store id只有在同一root中才表示同一instance。

## 18. 官方文档阅读清单

- [Pinia Introduction](https://pinia.vuejs.org/introduction.html)
- [Pinia Getting Started](https://pinia.vuejs.org/getting-started.html)
- [Pinia Defining a Store](https://pinia.vuejs.org/core-concepts/)
- [Pinia State](https://pinia.vuejs.org/core-concepts/state.html)
- [Pinia Getters](https://pinia.vuejs.org/core-concepts/getters.html)
- [Pinia Actions](https://pinia.vuejs.org/core-concepts/actions.html)
- [Pinia Plugins](https://pinia.vuejs.org/core-concepts/plugins.html)
- [Pinia Stores outside components](https://pinia.vuejs.org/core-concepts/outside-component-usage.html)
- [Pinia Server Side Rendering](https://pinia.vuejs.org/ssr/)
- [Pinia Testing Stores](https://pinia.vuejs.org/cookbook/testing.html)
- [Vue Router Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
- [Vue Router Route Meta Fields](https://router.vuejs.org/guide/advanced/meta.html)
- [Vue Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Vue TypeScript with Composition API](https://vuejs.org/guide/typescript/composition-api.html)
- [Vitest Getting Started](https://vitest.dev/guide/)
