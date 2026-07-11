# Vue 3 + TypeScript 学习路线图：掌握程度、工具链与项目能力

> 定位：这份路线图不是普通 Vue 入门清单，而是结合当前主线学习路径设计的 Vue 第二前端框架能力路线。  
> 目标：在 React / Next.js 作为主战场的前提下，把 Vue 学到能接手真实项目、能独立开发中后台系统、能解释 Vue 3 响应式机制，并在需要时升级到 Nuxt 全栈 Vue 能力。

---

## 目录

1. [路线图定位](#1-路线图定位)
2. [最终结论](#2-最终结论)
3. [Vue 掌握程度分级](#3-vue-掌握程度分级)
4. [Vue 和当前主线的关系](#4-vue-和当前主线的关系)
5. [学习前置能力](#5-学习前置能力)
6. [Vue 核心能力总表](#6-vue-核心能力总表)
7. [工具链能力总表](#7-工具链能力总表)
8. [项目能力总表](#8-项目能力总表)
9. [Phase 1：Vue 3 基础与 SFC](#9-phase-1vue-3-基础与-sfc)
10. [Phase 2：响应式系统与更新机制](#10-phase-2响应式系统与更新机制)
11. [Phase 3：组件通信与组件边界](#11-phase-3组件通信与组件边界)
12. [Phase 4：Composition API 与 composables 架构](#12-phase-4composition-api-与-composables-架构)
13. [Phase 5：Vue + TypeScript](#13-phase-5vue--typescript)
14. [Phase 6：Vue Router 与权限路由](#14-phase-6vue-router-与权限路由)
15. [Phase 7：Pinia 状态管理](#15-phase-7pinia-状态管理)
16. [Phase 8：UI、表单与中后台项目能力](#16-phase-8ui表单与中后台项目能力)
17. [Phase 9：接口、运行时验证与前后端边界](#17-phase-9接口运行时验证与前后端边界)
18. [Phase 10：测试、质量与工程化](#18-phase-10测试质量与工程化)
19. [Phase 11：性能、部署与生产优化](#19-phase-11性能部署与生产优化)
20. [Phase 12：Nuxt 全栈 Vue 能力](#20-phase-12nuxt-全栈-vue-能力)
21. [Phase 13：迁移、维护与架构重构](#21-phase-13迁移维护与架构重构)
22. [推荐项目结构](#22-推荐项目结构)
23. [最终项目路线](#23-最终项目路线)
24. [最终验收标准](#24-最终验收标准)
25. [面试题验收清单](#25-面试题验收清单)
26. [简历表达标准](#26-简历表达标准)
27. [常见误区](#27-常见误区)
28. [推荐学习节奏](#28-推荐学习节奏)
29. [官方资料阅读顺序](#29-官方资料阅读顺序)
30. [最终记忆模型](#30-最终记忆模型)

---

## 1. 路线图定位

这份路线图的核心判断是：

```txt
React / Next.js:
  主线深挖到生产级和架构级。

Vue:
  学到生产项目可用，能接手业务项目；
  重点理解 Vue 3 reactivity 和 Composition API；
  根据求职需要再补 Nuxt、SSR、部署和迁移。
```

Vue 对当前学习路线的作用不是替代 React，而是：

```txt
1. 扩展岗位覆盖面。
2. 能接手 Vue 3 + TypeScript 项目。
3. 能理解另一套主流 UI framework 的响应式更新模型。
4. 用 Vue 和 React 对比，加深对前端框架本质的理解。
5. 为中后台项目、企业后台、管理系统、国内 Vue 技术栈项目做准备。
```

---

## 2. 最终结论

### 2.1 当前阶段的目标

你应该把 Vue 学到：

```txt
Vue 3
+ Composition API
+ Single-File Components
+ TypeScript
+ Vue Router
+ Pinia
+ Vite
+ UI library
+ forms
+ route permission
+ API integration
+ testing
+ production build
```

这对应的简历表述是：

```txt
熟悉 Vue 3、TypeScript、Vue Router、Pinia、Vite，能够开发中后台管理系统，具备组件拆分、路由权限、状态管理、表单处理、接口集成和测试经验。
```

### 2.2 如果要写“精通 Vue”

必须继续达到：

```txt
Vue reactivity mechanism
+ compiler / template transform
+ rendering mechanism
+ component update tracking
+ composable architecture
+ Nuxt SSR / SSG / full-stack API
+ production deployment
+ migration from Vue 2 to Vue 3
```

对应的简历表述是：

```txt
深入理解 Vue 3 Composition API、响应式机制、组件渲染更新、Pinia 状态管理和 Vue Router 路由体系，具备 Vue + TypeScript 生产级项目开发、测试、性能优化、Nuxt SSR/SSG 和项目迁移经验。
```

---

## 3. Vue 掌握程度分级

### Level 1：会用 Vue

你能做到：

```txt
createApp
.vue 文件
template
ref
reactive
computed
v-if
v-for
v-bind
v-on
v-model
props
emit
basic form
basic API request
```

不能写：

```txt
熟练 Vue
精通 Vue
```

可以写：

```txt
了解 Vue 3 基础语法和组件开发。
```

---

### Level 2：能做 Vue 项目

你能做到：

```txt
Vue 3 + Vite + TypeScript 项目搭建
<script setup>
Vue Router
Pinia
API integration
UI library
中后台布局
登录注册
动态菜单
权限路由
表格
表单
详情页
文件上传
```

可以写：

```txt
熟悉 Vue 3、Vue Router、Pinia、Vite，能够开发常规业务页面和中后台管理系统。
```

---

### Level 3：理解 Vue 机制

你能做到：

```txt
解释 ref 和 reactive 的区别
解释 computed 和 watch 的区别
解释 watch 和 watchEffect 的区别
解释 nextTick 的作用
解释 Vue 3 为什么能追踪状态变化
解释 Proxy、track、trigger 的关系
解释 template 如何依赖 reactive state
解释组件为什么会重新渲染
解释 v-model 在组件上的展开机制
解释 slot 和 scoped slot 的本质
```

可以写：

```txt
熟练掌握 Vue 3 Composition API、响应式机制、组件通信、路由和状态管理。
```

---

### Level 4：生产级 Vue

你能做到：

```txt
大型 Vue 项目结构设计
feature-based modules
composables 分层
Pinia store 边界
权限路由
动态菜单
复杂表单
运行时验证
请求取消
错误处理
测试体系
性能分析
production build
CI
deployment
```

可以写：

```txt
具备 Vue 3 + TypeScript 生产级应用开发能力，能够设计组件架构、路由权限、状态管理、表单系统、测试和性能优化方案。
```

---

### Level 5：高级 Vue / Nuxt / 架构能力

你能做到：

```txt
Vue compiler mental model
template transform
render function
virtual DOM patch
reactivity debugging
effectScope
shallowRef
markRaw
toRaw
custom directives
plugins
SSR hydration
Nuxt routing
Nuxt server API
Nuxt middleware
Nuxt deployment
Vue 2 to Vue 3 migration
Vuex to Pinia migration
Options API to Composition API refactor
```

可以写：

```txt
深入理解 Vue 3 reactivity、compiler、rendering mechanism、Composition API 架构模式，并具备 Nuxt 全栈 Vue 应用设计、SSR/SSG、部署和迁移经验。
```

---

## 4. Vue 和当前主线的关系

### 4.1 和 JavaScript 的关系

Vue 的响应式系统依赖 JavaScript 的对象、Proxy、getter、setter、闭包、模块和异步更新机制。

必须关联到：

```txt
object
property
Proxy
Reflect
getter / setter
function closure
microtask
module import / export
```

如果 JavaScript 对象模型不清楚，Vue 的 `reactive()`、`ref()`、`toRef()`、`toRefs()`、`watch()` 都会学成“API 背诵”。

---

### 4.2 和 TypeScript 的关系

Vue + TypeScript 的核心不是多写类型，而是把这些边界建模清楚：

```txt
props boundary
emit payload boundary
slot props boundary
v-model value boundary
composable return boundary
router params boundary
Pinia store boundary
API response boundary
form data boundary
```

TypeScript 只在编译期检查，不会验证接口返回数据。接口返回值仍然需要运行时验证。

---

### 4.3 和 React 的关系

React 和 Vue 都是 UI framework，但更新模型不同：

```txt
React:
  setState -> schedule render -> component function re-executes.

Vue:
  reactive mutation -> trigger dependency -> component render effect re-runs.
```

React 更强调：

```txt
state snapshot
pure render
render / commit
explicit state update
```

Vue 更强调：

```txt
property-level dependency tracking
reactivity graph
template dependency collection
automatic DOM update
```

学 Vue 时要一直拿 React 对比，这会让两个框架都更清楚。

---

### 4.4 和 Next.js / Nuxt 的关系

Next.js 是 React 的 full-stack framework。  
Nuxt 是 Vue 的 full-stack framework。

二者都涉及：

```txt
file-based routing
server-side rendering
static generation
data fetching
server API
middleware
SEO
deployment
hydration
```

但不要把 Next.js 心智模型直接套到 Nuxt。Nuxt 的底层组合是：

```txt
Vue for frontend
Vite for bundling
Nitro for server engine
```

---

## 5. 学习前置能力

| 前置能力 | 必须理解到什么程度 | 不懂会影响什么 |
|---|---|---|
| HTML / CSS | 能写语义结构、表单、基础布局 | 看不懂 template 和组件 UI |
| JavaScript object | 知道对象由属性组成 | 会混淆 reactive object 和普通对象 |
| JavaScript Proxy | 知道 Proxy 可以拦截属性读取和写入 | 看不懂 Vue 3 reactivity |
| JavaScript module | 知道 import / export 和模块作用域 | 看不懂 composable 和 store 组织 |
| JavaScript async | 知道 Promise、async/await、microtask | 看不懂 nextTick、接口请求、异步渲染 |
| TypeScript object type | 能给 props、API response、form 建模 | Vue + TS 会变成 any |
| TypeScript generic | 能写泛型函数和泛型返回值 | 看不懂 typed composable |
| React component model | 知道组件、props、state、render | 有助于和 Vue 对比 |
| HTTP API | 知道 request / response / status code | 做项目时接口边界会混 |
| Node / backend basic | 知道后端负责鉴权和数据持久化 | 权限和接口安全会写错 |

---

## 6. Vue 核心能力总表

| 能力区 | 必须掌握 | 精通标准 |
|---|---|---|
| SFC | `.vue`、`script`、`template`、`style scoped` | 能解释 SFC 如何被构建工具处理 |
| Template | 插值、指令、事件、绑定、条件、列表 | 能解释 template 不是 HTML 字符串，而会被编译 |
| Reactivity | `ref`、`reactive`、`computed`、`watch` | 能解释 track / trigger / effect |
| Component | props、emit、slots、v-model、provide/inject | 能设计稳定组件 API |
| Lifecycle | `onMounted`、`onUpdated`、`onUnmounted` | 能解释 DOM update timing |
| Composable | `useXxx()` 复用逻辑 | 能设计可测试、低耦合 composable |
| Router | nested routes、guards、meta、lazy loading | 能设计权限路由和动态菜单 |
| State | Pinia state/getters/actions | 能区分 local/global/server/form state |
| TypeScript | defineProps、defineEmits、generic composable | 能写类型安全 Vue 组件体系 |
| UI Library | Element Plus / Naive UI / Ant Design Vue | 能做完整中后台业务 |
| Testing | Vitest、Vue Test Utils、Playwright | 能覆盖组件、store、路由和业务流 |
| Performance | lazy route、KeepAlive、bundle analysis | 能定位卡顿和不必要更新 |
| Nuxt | SSR、SSG、server API、middleware | 能做全栈 Vue 项目 |

---

## 7. 工具链能力总表

| 工具 | 必须掌握 | 精通标准 |
|---|---|---|
| Vite | dev、build、preview、env | 能解释 dev server 和 production build 的区别 |
| vue-tsc | `vue-tsc --noEmit` | 知道 Vite dev 不等于完整类型检查 |
| TypeScript | `tsconfig`、strict mode | 能维护 Vue + TS 类型边界 |
| ESLint | Vue rules、TS rules、import rules | 能把团队规范做成自动检查 |
| Prettier | 格式化 | 能统一项目风格 |
| Vitest | unit test | 能测 composable、store、utility |
| Vue Test Utils | component test | 能测 props、emit、slot、user interaction |
| Playwright | E2E test | 能测登录、权限、表单、页面跳转 |
| MSW | API mock | 能隔离前端测试和真实后端 |
| Pinia Devtools | state debugging | 能追踪 store action 和 mutation |
| Vue Devtools | component/reactivity debugging | 能定位 props、state、render 问题 |
| npm / pnpm | dependency、script、lockfile | 能处理依赖和脚本 |
| CI | lint、typecheck、test、build | 能给项目加质量门禁 |
| Bundle analysis | chunk、lazy loading | 能优化首屏和包体积 |
| Docker | production container | 能部署前端或 Nuxt server |

---

## 8. 项目能力总表

| 项目能力 | 必须做到 | 验收方式 |
|---|---|---|
| 中后台布局 | sidebar、topbar、breadcrumb、tabs | 能完成 admin shell |
| 登录认证 | login、logout、token/session | 刷新后状态正确 |
| 权限路由 | route meta、guard、dynamic menu | 不同角色看到不同页面 |
| 表格页面 | search、filter、pagination、sort | 能完成 CRUD list |
| 表单页面 | validation、submit、reset、error | 能完成复杂表单 |
| 详情页面 | route params、data fetching | 能处理 loading/error/not found |
| Pinia store | auth、permission、theme、cart | store 边界清晰 |
| API client | typed request、error handling | API 层不散落在组件里 |
| runtime validation | zod / valibot | 外部数据先验证再使用 |
| 文件上传 | upload、progress、error | 能处理真实业务 |
| 测试 | unit、component、E2E | CI 可跑 |
| 性能 | lazy routes、KeepAlive、bundle split | 首屏和交互可解释 |
| 部署 | env、build、preview、production | 可上线访问 |

---

## 9. Phase 1：Vue 3 基础与 SFC

### 目标

建立 Vue 3 的表层开发能力：能读写 `.vue` 文件，理解 template、script、style 三部分如何组成组件。

### 必学主题

```txt
createApp
Single-File Component
<script setup>
template syntax
style scoped
v-bind
v-on
v-if
v-for
v-model
event handling
form binding
class / style binding
```

### 练习目录

```txt
vue-learning/
  phase-01-vue-basics/
    counter-basic.vue
    template-binding.vue
    conditional-rendering.vue
    list-rendering.vue
    form-binding.vue
    class-style-binding.vue
```

### 必须能解释

```txt
.vue 文件为什么不是浏览器原生文件？
template 和普通 HTML 有什么区别？
<script setup> 为什么能让顶层变量直接用于 template？
v-bind 和 : 是什么关系？
v-on 和 @ 是什么关系？
v-model 在 input 上做了什么？
v-for 为什么必须给 key？
```

### 阶段小项目

```txt
vue-task-board-basic
```

功能：

```txt
1. 展示任务列表。
2. 支持新增任务。
3. 支持完成任务。
4. 支持按状态筛选。
5. 使用基础 SFC 和 template 指令完成。
```

### 验收标准

```txt
能不查文档写出一个基础 Vue 3 页面。
能解释每个 directive 的作用。
能解释数据变化为什么会更新视图。
```

---

## 10. Phase 2：响应式系统与更新机制

### 目标

理解 Vue 的核心：响应式（reactivity）不是语法糖，而是依赖追踪系统。

### 必学主题

```txt
ref
reactive
computed
watch
watchEffect
readonly
shallowRef
toRef
toRefs
unref
nextTick
reactivity transform boundary
Proxy
track
trigger
effect
```

### 底层机制

Vue 3 的响应式核心模型：

```txt
1. reactive object 通过 Proxy 包装。
2. 读取属性时触发 get trap。
3. get trap 调用 track 收集依赖。
4. 写入属性时触发 set trap。
5. set trap 调用 trigger 通知依赖。
6. 组件 render effect 重新运行。
7. 生成新的 virtual DOM。
8. patch 真实 DOM。
```

`ref()` 的心智模型：

```txt
ref value container:
  const count = ref(0)
  count.value stores the actual value
  reading count.value tracks dependency
  writing count.value triggers update
```

### 练习目录

```txt
phase-02-reactivity/
  ref-vs-reactive.vue
  computed-vs-method.vue
  watch-basic.vue
  watch-effect.vue
  next-tick-dom.vue
  reactive-destructure-mistake.vue
  shallow-ref-demo.vue
```

### 必须能解释

```txt
ref 和 reactive 的区别是什么？
为什么 ref 在 script 里要 .value？
为什么 template 里不用 .value？
computed 为什么应该保持 pure？
watch 适合什么场景？
watchEffect 和 watch 的区别是什么？
nextTick 等待的到底是什么？
为什么解构 reactive object 可能丢失响应式连接？
```

### 阶段小项目

```txt
vue-reactivity-lab
```

功能：

```txt
1. 做一个购物车总价计算。
2. 用 computed 计算 subtotal、tax、total。
3. 用 watch 监听优惠码变化。
4. 用 nextTick 在 DOM 更新后读取高度。
5. 写一个错误示例展示 reactive destructuring 问题。
```

### 验收标准

```txt
能用自己的话解释 track / trigger。
能区分 ref、reactive、computed、watch 的边界。
能说清楚 Vue 和 React 更新模型的差异。
```

---

## 11. Phase 3：组件通信与组件边界

### 目标

掌握 Vue 组件 API 设计：父子组件通信、插槽、双向绑定、跨层级注入。

### 必学主题

```txt
defineProps
defineEmits
props validation
emit payload
component v-model
defineModel
slots
scoped slots
provide
inject
fallthrough attributes
template refs
lifecycle hooks
async components
```

### 练习目录

```txt
phase-03-components/
  product-card.vue
  product-list.vue
  filter-panel.vue
  editable-title.vue
  modal-with-slots.vue
  scoped-slot-table.vue
  provide-inject-theme.vue
  template-ref-focus.vue
```

### 必须能解释

```txt
props 为什么是单向数据流？
子组件为什么不能直接修改 props？
emit 是同步还是异步？
组件 v-model 实际展开成什么？
slot 是内容分发还是函数回调？
scoped slot 为什么能把子组件数据暴露给父组件？
provide/inject 适合什么，不适合什么？
template ref 什么时候有值？
```

### 阶段小项目

```txt
vue-component-library-lab
```

功能：

```txt
1. Button
2. Modal
3. Tabs
4. DataTable
5. FormField
6. Select
7. Toast
```

要求：

```txt
1. 每个组件有清晰 props。
2. 每个组件有清晰 emits。
3. 至少两个组件支持 slots。
4. 至少一个组件支持 v-model。
5. 至少一个组件支持 provide/inject。
```

### 验收标准

```txt
能设计可复用组件 API。
能解释组件通信方式的适用边界。
能避免 props mutation 和 event 命名混乱。
```

---

## 12. Phase 4：Composition API 与 composables 架构

### 目标

把 Vue 从“写组件”升级到“组织业务逻辑”。

### 必学主题

```txt
setup function
<script setup>
composable
useXxx naming
effectScope
onScopeDispose
custom ref
shared state
business logic extraction
resource cleanup
```

### composable 设计原则

```txt
1. 一个 composable 只解决一个业务或机制问题。
2. 返回值要稳定、清晰、可测试。
3. 不要让 composable 隐式依赖具体 UI。
4. 涉及外部资源时必须清理。
5. 涉及 API 时要明确 loading / error / data 状态。
```

### 练习目录

```txt
phase-04-composables/
  use-counter.ts
  use-toggle.ts
  use-pagination.ts
  use-local-storage.ts
  use-async-state.ts
  use-debounced-search.ts
  use-click-outside.ts
```

### 必须能解释

```txt
composable 和普通函数有什么区别？
composable 为什么可以复用响应式逻辑？
composable 里什么时候可以用 lifecycle hook？
shared state 和 per-instance state 有什么区别？
为什么 composable 不应该直接绑定具体页面结构？
```

### 阶段小项目

```txt
vue-composables-kit
```

功能：

```txt
1. usePagination
2. useQueryState
3. useDebouncedRef
4. useAsyncResource
5. useModal
6. usePermission
7. useFormState
```

### 验收标准

```txt
能把页面逻辑从组件中抽出去。
能写可测试 composable。
能判断 composable 是否过度抽象。
```

---

## 13. Phase 5：Vue + TypeScript

### 目标

建立 Vue 项目的类型边界：props、emits、slots、composable、store、router、API 都要有清晰类型。

### 必学主题

```txt
lang="ts"
defineProps
defineEmits
withDefaults
defineModel
defineExpose
defineSlots
PropType
InjectionKey
generic components
typed composables
typed API response
typed Pinia store
typed route meta
vue-tsc
```

### 练习目录

```txt
phase-05-vue-typescript/
  typed-props.vue
  typed-emits.vue
  props-with-defaults.vue
  typed-v-model.vue
  typed-slots.vue
  generic-select.vue
  injection-key.ts
  typed-composable.ts
  api-contract.ts
```

### 必须能解释

```txt
defineProps 的类型参数在运行时还存在吗？
withDefaults 解决什么问题？
defineEmits 如何约束 payload？
InjectionKey 为什么比 string key 更安全？
Vue + TS 里的类型检查和运行时验证有什么区别？
为什么 vite dev 不等于 vue-tsc typecheck？
```

### 阶段小项目

```txt
vue-ts-contract-lab
```

功能：

```txt
1. Product 类型。
2. ProductForm 类型。
3. ProductFilter 类型。
4. Product API response 类型。
5. typed composable。
6. typed component props / emits。
7. typed store。
```

### 验收标准

```txt
能写出严格类型的 Vue 组件。
能避免 any。
能解释 TS 类型不会自动验证后端返回值。
```

---

## 14. Phase 6：Vue Router 与权限路由

### 目标

掌握 Vue SPA 的页面组织、URL 状态、路由守卫、权限路由和动态菜单。

### 必学主题

```txt
createRouter
createWebHistory
RouterLink
RouterView
route record
dynamic route
nested route
named route
redirect
alias
route params
query
route meta
beforeEach
beforeResolve
afterEach
per-route guard
in-component guard
lazy loading route
scroll behavior
typed routes
```

### 练习目录

```txt
phase-06-vue-router/
  router.ts
  routes.ts
  auth-guard.ts
  permission-guard.ts
  dynamic-menu.ts
  route-meta.ts
  lazy-routes.ts
  scroll-behavior.ts
```

### 必须能解释

```txt
Vue Router 为什么能无刷新切换页面？
RouterLink 和普通 a 标签有什么区别？
RouterView 渲染的是谁？
params 和 query 有什么区别？
route meta 适合放什么？
beforeEach 和 beforeResolve 有什么区别？
权限判断应该只放前端吗？
路由懒加载如何影响 bundle？
```

### 阶段小项目

```txt
vue-admin-router-lab
```

功能：

```txt
1. 登录页。
2. Dashboard。
3. 用户管理。
4. 角色管理。
5. 订单管理。
6. 根据角色动态生成菜单。
7. 未登录跳转登录。
8. 无权限跳转 403。
9. 未匹配路由显示 404。
```

### 验收标准

```txt
能设计中后台路由结构。
能写权限 guard。
能解释前端权限和后端权限的边界。
```

---

## 15. Phase 7：Pinia 状态管理

### 目标

掌握 Vue 官方推荐状态管理方案，能设计可维护的全局状态。

### 必学主题

```txt
defineStore
option store
setup store
state
getters
actions
storeToRefs
$patch
$reset
plugins
persisted state
stores outside components
SSR-safe state
testing stores
```

### 状态分类模型

```txt
local state:
  只属于一个组件。

form state:
  属于表单过程，不默认全局化。

global client state:
  auth user、theme、permission、sidebar、cart。

server state:
  来自 API 的远程数据，通常需要缓存、刷新、失效策略。

URL state:
  route params、query、filter、pagination。
```

### 练习目录

```txt
phase-07-pinia/
  auth-store.ts
  permission-store.ts
  theme-store.ts
  cart-store.ts
  store-to-refs-demo.vue
  patch-reset-demo.vue
  pinia-plugin-demo.ts
  pinia-store-test.ts
```

### 必须能解释

```txt
Pinia 和 reactive global object 有什么区别？
为什么 SSR 下不能随便导出全局 reactive object？
state、getter、action 分别解决什么问题？
storeToRefs 解决什么问题？
哪些状态不应该放进 Pinia？
Pinia 和 API cache 是一回事吗？
```

### 阶段小项目

```txt
vue-pinia-admin-state-lab
```

功能：

```txt
1. auth store
2. permission store
3. theme store
4. user preference store
5. cart or selection store
6. store persistence
7. store tests
```

### 验收标准

```txt
能设计清晰 store 边界。
能避免全局状态滥用。
能给 store 写测试。
```

---

## 16. Phase 8：UI、表单与中后台项目能力

### 目标

把 Vue 能力落到最常见的岗位场景：中后台管理系统。

### 必学主题

```txt
Element Plus
Naive UI
Ant Design Vue
layout
sidebar
topbar
breadcrumb
tabs
data table
search form
dialog form
drawer form
form validation
file upload
role permission
button permission
theme
i18n
```

### 练习目录

```txt
phase-08-admin-ui/
  admin-layout.vue
  data-table-page.vue
  search-form.vue
  edit-dialog.vue
  user-form.vue
  file-upload.vue
  permission-button.vue
  theme-switcher.vue
```

### 必须能解释

```txt
业务组件和 UI 组件怎么分层？
表格搜索条件应该放 URL、组件状态还是 store？
表单校验应该只靠前端吗？
弹窗表单如何重置状态？
文件上传失败怎么处理？
按钮权限和接口权限有什么关系？
```

### 阶段小项目

```txt
vue-admin-dashboard
```

功能：

```txt
1. 登录。
2. 用户管理。
3. 角色管理。
4. 商品管理。
5. 订单管理。
6. 搜索、分页、排序。
7. 新增、编辑、删除。
8. 文件上传。
9. 权限菜单。
10. 操作按钮权限。
```

### 验收标准

```txt
能独立完成一个常规中后台项目。
能把 UI library 用成工程组件，而不是复制 demo。
能处理真实业务状态。
```

---

## 17. Phase 9：接口、运行时验证与前后端边界

### 目标

避免 Vue 项目最常见的问题：组件里到处写请求、API 返回值直接信任、错误处理散落。

### 必学主题

```txt
API client
request interceptor
response interceptor
error normalization
unknown boundary
zod / valibot
runtime validation
pagination response
form payload
auth token / session
request cancellation
retry
timeout
```

### 推荐结构

```txt
src/
  api/
    http-client.ts
    product-api.ts
    user-api.ts
  contracts/
    product-contract.ts
    user-contract.ts
  validators/
    product-validator.ts
  composables/
    use-products.ts
```

### 必须能解释

```txt
为什么接口返回值不能直接 as Product？
TypeScript 类型和 runtime validation 有什么区别？
API client 为什么不要散落在组件里？
401、403、404、500 分别怎么处理？
接口错误应该如何统一成 UI 可用结构？
server state 是否应该放 Pinia？
```

### 阶段小项目

```txt
vue-api-contract-lab
```

功能：

```txt
1. typed API client。
2. zod / valibot response validation。
3. standardized API error。
4. request loading state。
5. request cancellation。
6. pagination composable。
7. form submit composable。
```

### 验收标准

```txt
能构建清晰的前后端接口边界。
能解释 unknown -> validated data 的过程。
能统一处理请求错误。
```

---

## 18. Phase 10：测试、质量与工程化

### 目标

让 Vue 项目从“能跑”变成“能维护”。

### 必学主题

```txt
Vitest
Vue Test Utils
Playwright
MSW
vue-tsc
ESLint
Prettier
Husky
lint-staged
CI
coverage
test database or mock server
```

### 测试层级

```txt
unit test:
  utility、composable、store。

component test:
  props、emit、slot、user interaction。

integration test:
  route + store + API mock。

E2E test:
  login、permission、form submit、CRUD flow。
```

### 练习目录

```txt
phase-10-testing-quality/
  use-pagination.test.ts
  auth-store.test.ts
  product-form.test.ts
  user-table.test.ts
  login-flow.spec.ts
  permission-flow.spec.ts
  msw-handlers.ts
```

### 必须能解释

```txt
Vitest 和 Playwright 测试目标有什么区别？
Vue Test Utils 挂载组件时发生什么？
为什么测试 composable 通常比测试页面更稳定？
MSW 解决什么问题？
为什么 CI 必须跑 vue-tsc？
```

### 推荐 CI 命令

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
npm run build
```

### 推荐 package scripts

```json
{
  "scripts": {
    "dev": "vite",
    "typecheck": "vue-tsc --noEmit",
    "lint": "eslint .",
    "test:unit": "vitest run",
    "test:e2e": "playwright test",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview"
  }
}
```

### 验收标准

```txt
能让项目每次提交前自动检查。
能给核心 composable、store、组件、E2E 流程写测试。
能解释测试失败说明了什么。
```

---

## 19. Phase 11：性能、部署与生产优化

### 目标

掌握 Vue 项目上线后的性能、构建和部署能力。

### 必学主题

```txt
production build
env variables
route lazy loading
code splitting
dynamic import
bundle analysis
KeepAlive
Teleport
Transition
virtual list
image optimization
caching
accessibility
security
CSP
Docker
static hosting
Nginx
CDN
```

### 性能关注点

```txt
initial bundle size
route chunk size
large dependency
table rendering cost
unnecessary reactive dependency
deep watcher cost
too much global state
large form render
slow API waterfall
```

### 练习目录

```txt
phase-11-performance-deployment/
  lazy-routes.ts
  keep-alive-dashboard.vue
  virtual-list-demo.vue
  bundle-analysis-notes.md
  nginx.conf
  Dockerfile
  deployment-checklist.md
```

### 必须能解释

```txt
Vite build 产物是什么？
SPA 部署为什么需要 history fallback？
route lazy loading 怎么影响 bundle？
KeepAlive 适合什么页面？
deep watcher 为什么可能有性能问题？
如何判断某个依赖是否让 bundle 变大？
静态部署和 SSR 部署有什么区别？
```

### 阶段小项目

```txt
vue-production-deployment-lab
```

功能：

```txt
1. 构建生产包。
2. 分析 bundle。
3. 配置路由懒加载。
4. 用 Docker 部署。
5. 用 Nginx 配置 SPA fallback。
6. 输出部署检查清单。
```

### 验收标准

```txt
能把 Vue SPA 正确部署上线。
能处理刷新 404 问题。
能解释性能优化不是只加 lazy loading。
```

---

## 20. Phase 12：Nuxt 全栈 Vue 能力

### 目标

在需要 Vue 全栈、SSR、SEO、内容站、电商站时，掌握 Nuxt。

### 必学主题

```txt
Nuxt project structure
pages
layouts
components auto import
composables
plugins
middleware
server/api
server/routes
useFetch
useAsyncData
runtimeConfig
SSR
CSR
SSG
hydration
SEO
Nitro
deployment
```

### Nuxt 和 Vue SPA 的边界

选择 Vue SPA：

```txt
中后台
强登录后系统
SEO 不重要
主要是业务操作界面
部署成静态资源即可
```

选择 Nuxt：

```txt
内容站
官网
电商商品页
SEO 重要
首屏性能重要
需要 SSR / SSG
需要 server API
需要 hybrid rendering
```

### 练习目录

```txt
phase-12-nuxt/
  nuxt-content-site/
  nuxt-dashboard/
  nuxt-api-demo/
  nuxt-auth-demo/
  nuxt-seo-demo/
```

### 必须能解释

```txt
Nuxt 为什么是 full-stack Vue framework？
Nuxt 的 pages 如何生成路由？
useFetch 和普通 fetch 有什么区别？
server/api 代码在哪里运行？
SSR 和 SSG 怎么选？
hydration mismatch 为什么会发生？
runtimeConfig 解决什么问题？
Nitro 是什么角色？
```

### 阶段小项目

```txt
nuxt-product-catalog
```

功能：

```txt
1. 商品列表。
2. 商品详情。
3. 分类页面。
4. SEO metadata。
5. server API。
6. useFetch 数据获取。
7. 静态页面和动态页面混合。
8. 部署。
```

### 验收标准

```txt
能用 Nuxt 做一个 SEO 友好的 Vue 项目。
能解释 client、server、build time、request time 的边界。
```

---

## 21. Phase 13：迁移、维护与架构重构

### 目标

真实工作里你很可能不是从 0 写 Vue，而是接手旧项目。

### 必学主题

```txt
Vue 2 to Vue 3
Options API to Composition API
Vuex to Pinia
webpack to Vite
JavaScript to TypeScript
legacy router guards
legacy global mixins
component refactor
large form refactor
dependency upgrade
```

### 练习目录

```txt
phase-13-migration-refactor/
  options-to-composition/
  vuex-to-pinia/
  js-to-ts/
  webpack-to-vite-notes.md
  legacy-component-refactor.md
```

### 必须能解释

```txt
为什么迁移不能一次性全改？
Options API 和 Composition API 的映射关系是什么？
Vuex mutation 为什么在 Pinia 里消失？
旧项目里 global mixin 有什么风险？
如何分阶段把 JS 项目迁移到 TS？
如何证明重构没有破坏业务？
```

### 阶段小项目

```txt
vue-legacy-migration-lab
```

功能：

```txt
1. 把 Options API 页面改成 Composition API。
2. 把 Vuex store 改成 Pinia。
3. 把一个 JS 组件改成 TS。
4. 给重构后的核心流程补测试。
5. 写迁移说明。
```

### 验收标准

```txt
能安全接手和维护 Vue 旧项目。
能把架构债务拆成可执行步骤。
能解释每次迁移的风险和验证方式。
```

---

## 22. 推荐项目结构

### 22.1 Vue SPA 项目结构

```txt
vue-admin-dashboard/
  package.json
  vite.config.ts
  tsconfig.json
  tsconfig.app.json
  tsconfig.node.json
  eslint.config.js
  index.html

  src/
    main.ts
    App.vue

    app/
      providers/
      layouts/
      router/
      stores/

    assets/
    styles/

    shared/
      api/
      components/
      composables/
      constants/
      types/
      utils/
      validators/

    features/
      auth/
        api/
        components/
        composables/
        pages/
        stores/
        types/
      users/
        api/
        components/
        pages/
        stores/
        types/
      products/
        api/
        components/
        pages/
        stores/
        types/
      orders/
        api/
        components/
        pages/
        stores/
        types/

    pages/
      dashboard/
      error/

  tests/
    unit/
    component/
    e2e/
```

### 22.2 Nuxt 项目结构

```txt
nuxt-product-catalog/
  nuxt.config.ts
  package.json

  app/
    app.vue
    pages/
    layouts/
    components/
    composables/
    plugins/
    middleware/

  server/
    api/
    routes/
    utils/

  shared/
    types/
    validators/
    constants/

  public/
  assets/
  tests/
```

---

## 23. 最终项目路线

### Project 1：Vue Admin Dashboard

目标：证明 Vue 3 + TS + Router + Pinia + UI library 项目能力。

功能：

```txt
1. 登录 / 登出。
2. 用户信息持久化。
3. 动态菜单。
4. 权限路由。
5. 用户管理 CRUD。
6. 商品管理 CRUD。
7. 订单管理 CRUD。
8. 复杂表单。
9. 文件上传。
10. 表格筛选、分页、排序。
11. Pinia store。
12. API client。
13. 运行时验证。
14. 单元测试。
15. 组件测试。
16. E2E 测试。
17. 生产构建和部署。
```

简历价值：

```txt
适合证明 Vue 中后台项目能力。
```

---

### Project 2：Vue Component + Composables Kit

目标：证明组件抽象和逻辑复用能力。

功能：

```txt
1. Button
2. Modal
3. DataTable
4. FormField
5. Select
6. usePagination
7. useAsyncResource
8. usePermission
9. useFormState
10. typed props / emits / slots
11. component tests
```

简历价值：

```txt
适合证明组件设计、TypeScript 建模和测试能力。
```

---

### Project 3：Nuxt Product Catalog

目标：证明 Nuxt、SSR/SSG、SEO、server API 能力。

功能：

```txt
1. 商品列表。
2. 商品详情。
3. 分类页面。
4. SEO metadata。
5. server API。
6. useFetch。
7. SSR / SSG 对比。
8. 图片优化。
9. 部署。
```

简历价值：

```txt
适合证明 Vue 全栈、SEO 和 Nuxt 项目能力。
```

---

## 24. 最终验收标准

你完成 Vue 路线后，必须能做到：

```txt
1. 独立搭建 Vue 3 + Vite + TypeScript 项目。
2. 熟练使用 <script setup>。
3. 熟练使用 ref、reactive、computed、watch、watchEffect。
4. 能解释 Vue 3 reactivity 的 Proxy、track、trigger。
5. 能解释 computed、watch、watchEffect 的区别。
6. 能解释 nextTick 和 DOM update timing。
7. 能设计 props、emits、slots、v-model。
8. 能写 composables 复用业务逻辑。
9. 能使用 Vue Router 设计复杂路由、权限、懒加载。
10. 能使用 Pinia 设计全局状态。
11. 能区分 local state、global client state、server state、form state、URL state。
12. 能写复杂表单和运行时验证。
13. 能使用 UI library 做中后台页面。
14. 能写 Vitest / Vue Test Utils / Playwright 测试。
15. 能使用 vue-tsc 做 SFC 类型检查。
16. 能配置 ESLint、Prettier、CI。
17. 能处理 production build、env、deployment。
18. 能分析性能问题和不必要更新。
19. 能解释 Vue 和 React 的更新模型差异。
20. 能接手 Vue 2 / Vuex 项目并迁移到 Vue 3 / Pinia。
21. 能用 Nuxt 做 SSR / SSG 项目。
```

---

## 25. 面试题验收清单

### Vue Core

```txt
ref 和 reactive 有什么区别？
为什么 ref 在 template 里不用 .value？
computed 和 method 有什么区别？
computed 和 watch 有什么区别？
watch 和 watchEffect 有什么区别？
nextTick 解决什么问题？
Vue 3 为什么用 Proxy？
track 和 trigger 的作用是什么？
为什么解构 reactive object 会有响应式问题？
```

### Component

```txt
props 为什么不应该被子组件修改？
emit 解决什么问题？
组件 v-model 如何展开？
slot 和 scoped slot 有什么区别？
provide / inject 适合什么场景？
template ref 什么时候可用？
Teleport 解决什么问题？
KeepAlive 适合哪些页面？
```

### Router / Pinia

```txt
Vue Router 如何实现无刷新切换？
RouterLink 和 a 标签有什么区别？
route params 和 query 有什么区别？
navigation guard 的执行顺序是什么？
Pinia 的 state、getter、action 分别是什么？
Pinia 和 Vuex 的区别是什么？
哪些状态不应该放 Pinia？
```

### TypeScript / Tooling

```txt
defineProps 如何做类型检查？
defineEmits 如何约束 payload？
withDefaults 解决什么问题？
vue-tsc 和 vite dev 有什么区别？
为什么接口返回值不能直接 as 类型？
如何给 composable 写泛型？
如何测试 Pinia store？
```

### Production

```txt
Vue SPA 刷新 404 怎么解决？
路由懒加载如何影响 bundle？
deep watcher 为什么可能慢？
如何定位组件不必要更新？
如何部署 Vue SPA？
Nuxt 和 Vue SPA 怎么选？
SSR hydration mismatch 为什么会发生？
```

---

## 26. 简历表达标准

### 不推荐

```txt
精通 Vue
```

如果没有机制、测试、工程化和项目支撑，这句话风险很高。

### 基础阶段

```txt
了解 Vue 3 基础语法和组件开发。
```

### 项目阶段

```txt
熟悉 Vue 3、TypeScript、Vue Router、Pinia、Vite，能够开发中后台管理系统，具备组件拆分、路由权限、状态管理、表单处理和接口集成经验。
```

### 生产阶段

```txt
熟练掌握 Vue 3 Composition API、响应式机制、组件通信、Pinia 状态管理和 Vue Router 路由体系，具备 Vue + TypeScript 生产级项目开发、测试和性能优化经验。
```

### Nuxt 阶段

```txt
具备 Nuxt 全栈 Vue 应用开发经验，理解 SSR、SSG、hydration、server API、middleware、SEO 和部署流程。
```

---

## 27. 常见误区

### 误区 1：Vue 简单，所以不用学机制

Vue 的 template 很友好，但底层是响应式依赖追踪、render effect、compiler、virtual DOM patch。只会 API 不够。

### 误区 2：ref 和 reactive 只是两种写法

`ref` 是 value container。  
`reactive` 是 Proxy object。  
两者影响 `.value`、解构、watch source、TypeScript 推断和组合逻辑设计。

### 误区 3：Pinia 里什么都能放

Pinia 适合跨组件、跨页面共享的 client state。  
不应该默认存放所有表单状态和所有接口数据。

### 误区 4：前端权限等于安全

前端权限只负责 UI 和导航体验。真正安全必须在后端接口鉴权。

### 误区 5：会 UI library 就会 Vue

复制 Element Plus demo 不等于掌握 Vue。真正能力在组件边界、状态模型、路由权限、API 边界和测试。

### 误区 6：Nuxt 就是 Vue 版 Next.js

方向相似，但实现不同。Nuxt 是 Vue + Vite + Nitro，不要直接套 Next.js 所有模型。

---

## 28. 推荐学习节奏

### 8 周版本

```txt
Week 1:
  Phase 1 + Phase 2

Week 2:
  Phase 3 + Phase 4

Week 3:
  Phase 5

Week 4:
  Phase 6 + Phase 7

Week 5:
  Phase 8

Week 6:
  Phase 9 + Phase 10

Week 7:
  Phase 11

Week 8:
  完成 Vue Admin Dashboard
```

### 12 周版本

```txt
Week 1:
  Vue 3 basics

Week 2:
  Reactivity

Week 3:
  Component boundary

Week 4:
  Composition API

Week 5:
  Vue + TypeScript

Week 6:
  Vue Router

Week 7:
  Pinia

Week 8:
  Admin UI

Week 9:
  API boundary

Week 10:
  Testing and tooling

Week 11:
  Performance and deployment

Week 12:
  Nuxt intro or final project polishing
```

---

## 29. 官方资料阅读顺序

### Vue 官方文档

```txt
1. Introduction
2. Essentials
3. Components In-Depth
4. Reusability
5. Built-in Components
6. Scaling Up
7. TypeScript
8. Extra Topics: Reactivity in Depth
9. Extra Topics: Rendering Mechanism
10. Best Practices
```

### Vue Router

```txt
1. Getting Started
2. Dynamic Route Matching
3. Nested Routes
4. Programmatic Navigation
5. Named Routes
6. Navigation Guards
7. Route Meta Fields
8. Lazy Loading Routes
```

### Pinia

```txt
1. Introduction
2. Defining a Store
3. State
4. Getters
5. Actions
6. Plugins
7. Stores outside of components
8. Testing
9. SSR
```

### Nuxt

```txt
1. Introduction
2. Routing
3. Layouts
4. Data Fetching
5. Server API
6. Middleware
7. SEO and Meta
8. Runtime Config
9. Deployment
10. Nitro
```

---

## 30. 最终记忆模型

```txt
Vue:
  template + reactive state + component system.

Vue runtime:
  state read -> dependency track
  state write -> dependency trigger
  component render effect -> virtual DOM
  virtual DOM -> DOM patch

Vue project:
  SFC + Composition API + Router + Pinia + TypeScript + Vite

Vue production:
  API boundary + route permission + testing + build + deployment + performance

Vue advanced:
  reactivity internals + rendering mechanism + Nuxt SSR/SSG + migration
```

最终路线判断：

```txt
React / Next.js:
  主线技能，用来冲生产级全栈前端能力。

Vue:
  第二框架能力，用来覆盖岗位、接手项目、理解另一套响应式框架模型。

Nuxt:
  求职或项目需要时升级，不建议在 Vue 基础不稳时过早深挖。
```
