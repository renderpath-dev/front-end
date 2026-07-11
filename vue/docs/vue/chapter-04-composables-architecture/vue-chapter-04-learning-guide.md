# Vue 第 4 章：Composition API 与 Composables Architecture

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
  - [9.1 composable 的本质：普通函数、stateful logic 与 Composition API](#section-9-1)
  - [9.2 setup function 与 script setup：active component instance、同步调用与 lifecycle registration](#section-9-2)
  - [9.3 useXxx naming：命名约定、返回值约定与可读性边界](#section-9-3)
  - [9.4 useCounter 与 useToggle：最小 per-instance reactive logic](#section-9-4)
  - [9.5 usePagination：derived state、boundary guards 与 page mutation API](#section-9-5)
  - [9.6 useLocalStorage：browser storage side effect、serialization 与 cleanup boundary](#section-9-6)
  - [9.7 useAsyncState：loading、error、data、execute 与 stale result boundary](#section-9-7)
  - [9.8 useDebouncedSearch 与 customRef：debounced input、track、trigger 与 delayed update](#section-9-8)
  - [9.9 useClickOutside 与 useEventListener：DOM event listener、template ref input 与 resource cleanup](#section-9-9)
  - [9.10 lifecycle inside composables：onMounted、onUnmounted、onScopeDispose 的使用条件](#section-9-10)
  - [9.11 shared state vs per-instance state：module-scope state、factory state 与隐藏全局状态风险](#section-9-11)
  - [9.12 effectScope：捕获 computed / watch / watchEffect 并统一 stop](#section-9-12)
  - [9.13 composable inputs：plain value、ref、getter、MaybeRefOrGetter 与 toValue tracking](#section-9-13)
  - [9.14 composable return values：plain object of refs、destructuring safety 与 reactive wrapping](#section-9-14)
  - [9.15 Chapter integration：从 Chapter 03 component library 抽取 useModal、usePermission、useFormState](#section-9-15)
  - [9.16 Final integration：vue-composables-kit 如何组织可复用业务逻辑](#section-9-16)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标](#121-项目目标)
  - [12.2 项目结构与职责](#122-项目结构与职责)
  - [12.3 核心 composables 完整代码](#123-核心-composables-完整代码)
  - [12.4 Final demo 完整代码](#124-final-demo-完整代码)
  - [12.5 运行方式与预期结果](#125-运行方式与预期结果)
  - [12.6 API、输入、返回值与 state ownership maps](#126-api输入返回值与-state-ownership-maps)
  - [12.7 Cleanup、async、shared state 与 resource lifecycle maps](#127-cleanupasyncshared-state-与-resource-lifecycle-maps)
  - [12.8 常见错误与扩展任务](#128-常见错误与扩展任务)
- [13. 额外速查表](#13-额外速查表)
- [14. 真实项目判断模型](#14-真实项目判断模型)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标 | 真实文件 | 类型 | 章节 |
| --- | --- | --- | --- |
| 整合全部第 4 章练习 | `src/learning/vue/chapter-04-composables-architecture/ComposablesChapterApp.vue` | 章节入口 | 7、9.16 |
| 最小 per-call reactive logic | `composables/useCounter.ts`、`useToggle.ts` | 路线图练习 | 9.1、9.3、9.4 |
| derived pagination | `composables/usePagination.ts` | 路线图练习 / final kit | 9.5、9.13、12 |
| browser storage side effect | `composables/useLocalStorage.ts` | 路线图练习 | 9.6、9.10 |
| async state 与 stale protection | `composables/useAsyncState.ts` | 路线图练习 / final kit | 9.7、12 |
| debounced search | `composables/useDebouncedSearch.ts` | 路线图练习 | 9.8 |
| custom ref | `composables/useDebouncedRef.ts` | final kit / official API | 9.8、12 |
| DOM listener 与 cleanup | `composables/useEventListener.ts`、`useClickOutside.ts` | 路线图练习 / official pattern | 9.9、9.10 |
| manual effect scope | `composables/useScopedTicker.ts` | Phase 4 required mechanism | 9.10、9.12 |
| modal transitions | `composables/useModal.ts` | final kit | 9.15、12 |
| permission display rules | `composables/usePermission.ts` | final kit | 9.13、9.15、12 |
| form state | `composables/useFormState.ts` | final kit | 9.14、9.15、12 |
| local query serialization | `composables/useQueryState.ts` | final kit | 9.13、12 |
| independent calls | `demos/CounterComposableDemo.vue` | runnable demo | 9.4 |
| shared state contrast | `demos/SharedVsPerInstanceDemo.vue` | runnable demo | 9.11 |
| scope start/stop | `demos/EffectScopeDemo.vue` | runnable demo | 9.12 |
| final integration | `demos/ComposablesKitDemo.vue` | final project | 9.16、12 |
| 保留前三章并挂载第 4 章 | `src/learning/vue/chapter-01-application-boundary/App.vue` | application shell | 9.15 |

上表中未带完整前缀的 `composables/` 和 `demos/` 路径均相对 `src/learning/vue/chapter-04-composables-architecture/`。

## 0. 本章机制边界

本章研究的是 Composition API logic extraction，不是创建“工具函数文件夹”。`useCounter.ts`、`useToggle.ts` 展示每次调用创建独立 refs；`usePagination.ts` 把 current page owner、computed indexes 和 guard actions 放在同一个 composable；`useLocalStorage.ts`、`useEventListener.ts`、`useClickOutside.ts` 把 browser resource 绑定到 component/effect scope；`useAsyncState.ts` 用 request id 处理 stale Promise；`useDebouncedRef.ts` 借 `customRef` 控制 `track` / `trigger`；`useScopedTicker.ts` 展示 manual `effectScope().stop()`。

执行 owner 分两层：JavaScript function closure 决定每次 call 拥有哪份 refs、timers、AbortController 或 listener handle；Vue runtime 提供当前 component instance / effect scope，使 `onMounted`、`onUnmounted`、`onScopeDispose`、watcher 与 computed 能在正确生命周期里注册和清理。TypeScript 能描述 `MaybeRefOrGetter<T>`、return refs/functions、generic pagination input 和 form state shape，但不能清理 timer、移除 DOM listener、取消旧 Promise，也不能防止 module-scope ref 被无意共享。

跨边界的值包括 caller 传入的 ref/getter/plain value、composable closure 中创建的 reactive source、returned refs/functions、DOM element ref、storage key、serialized JSON、request sequence number、scope stop handle。它纠正的误解是“composable 等于公共函数”或“抽出去就自动复用安全”。本章不处理全局 store、Router URL、API schema、UI library form contract 或 SSR request state；如果一个 concern 需要跨页面唯一 owner，它应该进入 Pinia 或后续 server/cache 边界。

## 1. 本章解决的问题

第 2 章把 `ref`、`computed`、`watch`、`watchEffect` 和 effect timing 放在单个组件内；第 3 章把值通过 props、emits、models、slots、injection 与 refs 跨越组件边界。组件变大后，新的问题不是“如何再写一个 API”，而是：

1. 如何把 count、pagination、async state、form transitions 等 stateful logic 从 template component 中抽出？
2. 为什么普通 formatter function 不需要 Vue context，而包含 lifecycle hook 的 composable 需要 active component instance？
3. 每次调用应创建独立 state，还是故意读取 module-scope shared state？
4. watcher、listener、interval、timeout 和 Promise 的 lifetime 由谁结束？
5. 如何接受 plain value、ref、getter，同时保证 `toValue()` 的 reactive read 被正确追踪？
6. 为什么 return plain object of refs 比 return reactive object 更适合 destructuring？

本章的主链是：**component setup 同步调用 composable → function 创建 refs/effects/resources → return object 暴露 refs 与 mutation API → component render读取 returned refs → mutation/event/Promise 更新 source → dependent computed/watcher/render执行 → scope stop 或 component unmount 清理 effects/resources**。

## 2. 前置概念

| 前置概念 | 本章使用方式 |
| --- | --- |
| 第 2 章 `ref` / `computed` | 成为 composable 创建和返回的 state / derived state |
| 第 2 章 `watch` / `watchEffect` | 放入 reusable function，并由 active scope自动关联 disposal |
| 第 2 章 destructuring boundary | 解释 plain object of refs 与 reactive return object |
| 第 3 章 component API | 判断逻辑应留在 component 还是 composable |
| 第 3 章 lifecycle / template ref | DOM composable在 mount后注册，并接收 element ref而非查询固定 selector |
| JavaScript closure / module scope | 区分 per-call binding 与 intentionally shared binding |
| Promise / timer / EventTarget | 解释 async ordering、stale result与 cleanup |
| TypeScript generic / union | 描述有限的 reusable input/output，不做泛型专题 |
| browser runtime | `window`、`document`、`localStorage` 不是类型系统提供的 runtime guarantee |

## 3. 学习目标

- 能区分 ordinary stateless utility 与 encapsulates stateful Vue logic 的 composable。
- 能解释 `<script setup>` 每个 component instance 执行一次，以及 active instance 对 lifecycle/effect disposal 的作用。
- 能设计稳定的 `useXxx` inputs、plain object of refs/functions return surface。
- 能实现 pagination、storage、async、debounce、click outside 等单一职责 composables。
- 能解释 `customRef(track, trigger)`、`effectScope().run()`、`scope.stop()` 与 `onScopeDispose()`。
- 能区分 per-instance factory state 与 deliberate module-scope shared state。
- 能识别 browser runtime、JSON parse、user input 与 TypeScript 静态检查之间的缺口。
- 能判断重复代码是否真的形成 stateful reusable concern，避免过度抽象。

## 4. 核心机制证据链总览

1. `CounterComposableDemo.vue` 调用两次 `useCounter()`：每次进入 function body 都创建新的 `ref` 和 closures，所以两个 counter 不共享 state；如果把 ref 提到 module scope，就变成 `SharedVsPerInstanceDemo.vue` 的隐藏全局状态。
2. `usePagination.ts` 只让 `currentPage` 可写，`totalPages`、`startIndex`、`endIndex` 和 `canGoNext` 都是 computed；越界 guard 写在 action 中，而不是散落在 caller template。
3. `useLocalStorage.ts` 在 browser boundary 内 parse `localStorage`，把 JSON result 当 unknown-like value 处理，watch state 后再 serialize；parse 失败回 fallback，不能把 storage 当可信数据库。
4. `useAsyncState.ts` 每次 `execute()` 增加 request id；旧 Promise resolve 时如果 id 不等于 latest id，就不能覆盖 `data` / `error`。失败信号是快速切换查询后旧结果闪回。
5. `useDebouncedRef.ts` 的 `customRef` getter 调 `track()`，setter 延迟后调 `trigger()`；如果漏掉 track，computed/template 不订阅；如果立刻 trigger，就失去 debounce 意义。
6. `useEventListener.ts` 和 `useClickOutside.ts` 接收 element ref/getter，mounted 后注册 listener，scope dispose 时用同一 target/listener/options 移除；失败信号是组件卸载后点击仍触发 handler。
7. `useScopedTicker.ts` 用 `effectScope().run()` 捕获 computed/watch/watchEffect，再用 `scope.stop()` 一次停止；适合非组件级 effect bundle，不适合替代普通 component lifecycle。
8. `ComposablesKitDemo.vue` 把 `useModal`、`usePermission`、`useFormState`、`useQueryState` 等组合到一个页面，但每个 composable 仍只拥有自己的 source、side effect 和 cleanup policy。

## 5. 核心术语表

| Concept | Layer | 本章精确定义 | 常见误解 |
| --- | --- | --- | --- |
| composable | JavaScript function + Vue Composition API | 封装并复用 stateful logic 的函数 | 任何 `use` 开头函数都是 composable |
| active component instance | Vue runtime | setup同步执行期间 Vue 可关联 hooks/effects 的当前 instance | 普通 JS 函数调用始终有 instance |
| per-instance state | closure + ref | composable body每次调用创建的新 ref | import同一个函数就共享 state |
| module-scope shared state | ESM module binding | function外创建、所有 callers读取同一 ref | shared state天然等于可维护 store |
| effect scope | Vue reactivity | 捕获其中创建的 computed/watch/watchEffect并统一 stop | 能自动清理任意 browser resource |
| scope cleanup | Vue reactivity | 当前 effect scope停止时执行 callback | 只等于 component `onUnmounted` |
| custom ref | Vue reactivity | caller控制 dependency track 与 trigger时机的 Ref | 普通 getter/setter不需要 track/trigger |
| MaybeRefOrGetter | TypeScript utility type | plain value、Ref 或 getter的静态 union | 它会运行时验证 input |
| stale result | Promise ordering | 较早 request较晚 resolve并覆盖新结果 | `await` 自动按点击顺序 commit |

## 6. 底层心智模型

1. ESM import 只共享 function definition；`useCounter()` body 中的 `ref()` 每次执行都会创建新 ref object。
2. `<script setup>` 内容编译为 component `setup()` 内容，每个 instance 创建时执行一次；同步调用的 composable能看到当前 active instance/effect scope。
3. component template读取 returned refs，component render effect订阅它们；composable本身不 render DOM。
4. computed/watch/watchEffect在哪个 active effect scope创建，就由该 scope持有；component unmount会 stop其 setup scope。
5. DOM listener、timer、storage、Promise是 JavaScript/browser resources；Vue不会仅因它们出现在 composable就自动清理，必须注册 cleanup或使用 stale token。
6. `onScopeDispose` 绑定当前 effect scope；`onUnmounted` 绑定 component instance。前者更适合不直接耦合 component lifecycle名称的 reusable composition function。
7. TypeScript检查 input/return shape；JSON parse、storage contents、DOM availability、Promise rejection和permission security仍是 runtime concerns。

## 7. 推荐目录结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Chapter 04 directory tree</span>
  </div>

```txt
src/learning/vue/chapter-04-composables-architecture/
  ComposablesChapterApp.vue
  composables/
    useCounter.ts
    useToggle.ts
    usePagination.ts
    useLocalStorage.ts
    useAsyncState.ts
    useDebouncedSearch.ts
    useClickOutside.ts
    useDebouncedRef.ts
    useModal.ts
    usePermission.ts
    useFormState.ts
    useQueryState.ts
    useEventListener.ts
    useScopedTicker.ts
  demos/
    CounterComposableDemo.vue
    ToggleComposableDemo.vue
    PaginationComposableDemo.vue
    LocalStorageComposableDemo.vue
    AsyncStateComposableDemo.vue
    DebouncedSearchComposableDemo.vue
    ClickOutsideComposableDemo.vue
    SharedVsPerInstanceDemo.vue
    EffectScopeDemo.vue
    ComposablesKitDemo.vue
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
npm install
npm run dev
```

</div>

浏览器打开 Vite 输出的 local URL，滚动到 Chapter 04。静态类型与 production bundling 分别通过以下实际 scripts验证：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run typecheck
npm run build
```

</div>

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 composable 的本质：普通函数、stateful logic 与 Composition API

**结论：** composable 首先是 JavaScript function；它因调用 Vue Composition API 来封装可随时间变化的 stateful logic而成为 composable。

**本节解决的问题：** `formatLabel(value)` 立即 return string，不管理 reactive source；`useCounter()` 创建 `Ref<number>` 并提供跨时间调用的 mutations，两者复用对象不同。

**技术意义：** 把 logic 从 component template/setup移出，但不增加额外 component instance或隐藏 data owner。

**概念解释：** function definition在 module中共享；function body每调用一次创建新的 closure、ref与 functions。component仍负责 render，composable负责 reactive logic。

**边界：JavaScript function、Vue active instance、Vue reactivity、lifecycle scope、TypeScript、browser API、SFC compiler、Vite tooling：** JS负责调用/closure；Vue reactivity负责 ref；本例不需要 lifecycle/browser；TS检查 return shape；SFC compiler只让 setup bindings进入 template；Vite resolve module。

**composable 机制证据链：**

1. `CounterComposableDemo` 调用 `useCounter()` 两次。
2. 两次调用都在 function body创建 per-instance state，无 module-scope count。
3. concrete values 是两个不同 `Ref<number>`、三个 mutation closures和 plain return objects。
4. Vue APIs 只有 `ref`。
5. `useCounter` 不依赖 active instance，因此普通 scope也可调用；但 demo在 setup调用。
6. component template分别读取 `firstCounter.count` 与 `secondCounter.count`。
7. component render effect订阅两个 ref。
8. click调用某一 closure，只 mutation对应 ref。
9. 无 external resource，scope stop只停止 component render effects。
10. TS检查 `CounterState` 的 ref/functions。
11. TS不验证 caller传入的 runtime number是否来自可信来源。
12. first increment不改变 second UI，因为 ref identity不同。
13. 把 count移到 function外会违反 per-call ownership。
14. 两个使用点互相影响时，先检查 state是否在 module scope。

**API / 语法规则：** composable命名以 `use` 开头是约定，不是 compiler macro；普通 utility无需强行改名。

**文件结构：** `composables/useCounter.ts` 只含 counter state machine；`demos/CounterComposableDemo.vue` 负责 UI。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/useCounter.ts</span>
  </div>

```ts
export function useCounter(initialValue = 0): CounterState {
  const count = ref(initialValue);

  function increment(): void {
    count.value += 1;
  }

  return { count, increment, decrement, reset };
}
```

</div>

**逐行解释：** call argument进入 closure；`ref` 创建 reactive source；increment捕获同一 ref；plain object公开 ref与稳定 mutation names。

**执行过程：** component setup调用 function → 创建 ref/closures → template读取 ref → click执行 mutation → Vue scheduler安排 component update → DOM patch。

**变量、refs、watchers、effects、cleanup 与返回值变化：** ref object不变，inner number递增；本例无 watcher/cleanup；return object只在调用时创建一次。

**为什么得到这个结果：** dependency按 ref identity追踪，而不是按 function name追踪。

**对比写法：** `function add(a, b) { return a + b }` 是 stateless utility；它没有长期 state、effect或cleanup。

**常见错误为什么错：** 只因函数叫 `useFormatDate` 就称它 composable，会掩盖它其实是纯 utility，降低命名信息量。

**与真实项目的关系：** counters只是最小模型；selection、pagination、modal、form workflow都可用同一 extraction判断。

**与当前学习主线的关系：** 第 2 章 reactive primitives被组织进 reusable function；第 3 章 component仍保留 visual boundary。

**最终记忆模型：** call composable → create/capture reactive state → return explicit refs/actions → component render consumes。

<a id="section-9-2"></a>

### 9.2 setup function 与 script setup：active component instance、同步调用与 lifecycle registration

**结论：** `<script setup>` 内容编译为每个 instance的 `setup()` 内容；需要 lifecycle/effect disposal的 composable通常必须在其中同步调用。

**本节解决的问题：** 为什么 `useEventListener()` 在 component setup可注册 `onMounted`，而延迟到任意 Promise callback后调用可能失去 current instance。

**技术意义：** 让 Vue知道 hook属于哪个 instance、setup创建的 watcher应在谁 unmount时停止。

**概念解释：** active component instance是 Vue runtime在 setup同步执行期间维护的当前 owner；不是一个可随意长期保存的全局 variable。

**边界：JavaScript function、Vue active instance、Vue reactivity、lifecycle scope、TypeScript、browser API、SFC compiler、Vite tooling：** JS同步 call stack承载 context；Vue关联 hooks/scope；compiler把 script setup转为 setup；top-level await有compiler恢复context的特殊规则；TS/Vite不创建 instance。

**composable 机制证据链：**

1. `ClickOutsideComposableDemo` 在 `<script setup>` 顶层调用 `useClickOutside`。
2. click-outside本身不创建业务 state，listener registration属于当前 component scope。
3. values 是 component instance、effect scope、mounted callback和dispose callback。
4. APIs 是 `onMounted`、`onScopeDispose`、`useTemplateRef`。
5. 它依赖 active instance/scope。
6. mounted callback读取 target getter；event callback读取 current element ref。
7. lifecycle registry与scope持有 callbacks，不是 render effect读取。
8. mount触发 add listener；pointerdown触发 callback；unmount触发 dispose。
9. `onScopeDispose(stop)` 移除同一 listener。
10. TS检查 target getter与 listener类型。
11. TS不能证明调用时存在 active instance。
12. 正常 setup调用使 listener仅在 mounted期间有效。
13. 在普通 async callback中首次注册 hook违反 synchronous setup registration rule。
14. 出现“hook called when there is no active component instance” warning时检查调用时机。

**API / 语法规则：** 官方要求 composables通常只在 `<script setup>` / `setup()` 同步调用；`<script setup>` top-level await是compiler特殊处理，不应泛化到任意 async function。

**文件结构：** `useEventListener.ts` 包含 lifecycle registration；`useCounter.ts` 不需要 instance-dependent API。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/demos/ClickOutsideComposableDemo.vue</span>
  </div>

```ts
const popoverElement =
  useTemplateRef<HTMLElement>("click-outside-popover");

useClickOutside(popoverElement, closePopover);
```

</div>

**逐行解释：** static ref name由SFC/template连接；composable在 setup同步执行；传入的是 ref，不是当时可能为 null的 snapshot。

**执行过程：** instance setup开始 → 调 composable → register hooks → initial render/patch → mounted hook注册 document listener。

**变量、refs、watchers、effects、cleanup 与返回值变化：** element ref从 null到 HTMLElement；active listener保存实际 target；dispose后target清空。

**为什么得到这个结果：** Vue能在同步 setup call stack中确定 hook owner。

**对比写法：** 普通 setup function必须显式 return bindings给 template；`<script setup>` top-level bindings由compiler直接暴露。

**常见错误为什么错：** `setTimeout(() => useClickOutside(...))` 使首次 composable call脱离 setup context，hook无法可靠关联 instance。

**与真实项目的关系：** 凡 composable内部注册 hook/watch/resource，都要审查 call timing。

**与当前学习主线的关系：** 第 1 章SFC compiler boundary与第 3 章component lifecycle在这里成为 reusable logic的owner context。

**最终记忆模型：** synchronous setup call提供 owner；owner持有 hooks/effects；unmount结束owner scope。

<a id="section-9-3"></a>

### 9.3 useXxx naming：命名约定、返回值约定与可读性边界

**结论：** `useXxx` 告诉读者“此函数可能组合 Vue state/effects/lifecycle”；稳定 return names告诉 caller可以读取什么、如何 mutation。

**本节解决的问题：** 避免 `helper()`、`data()`、`handle()` 等名称隐藏 reactive ownership和mutation意图。

**技术意义：** import、destructuring和call site本身即可形成最小 API 文档。

**概念解释：** naming是人类约定，不触发 Vue runtime行为；`useToggle` 返回 `value/toggle/setTrue/setFalse/setValue`，每个 mutation name有单一语义。

**边界：JavaScript function、Vue active instance、Vue reactivity、lifecycle scope、TypeScript、browser API、SFC compiler、Vite tooling：** JavaScript和TS保存 identifier；Vue不解析 `use` prefix；compiler/Vite也不据此自动注册；browser无关。

**composable 机制证据链：**

1. `ToggleComposableDemo` 调用 `useToggle(true)`。
2. body创建 per-instance boolean ref。
3. values 是 `Ref<boolean>` 和四个 named closures。
4. API 是 `ref`。
5. 不依赖 active component instance。
6. template读取 `panelVisible`。
7. component render effect依赖 boolean ref。
8. button分别调用确定 mutation。
9. 无 resource cleanup。
10. TS检查 `setValue(boolean)`。
11. TS不验证 mutation是否符合业务流程。
12. 每个 button结果可由 function name预测。
13. return `set`/`doIt` 违反 readable stable API原则。
14. caller频繁打开实现文件确认返回值含义，说明命名不足。

**API / 语法规则：** composable function用 camelCase `useXxx`；refs与actions使用具体 domain name；避免每次call动态改变return keys。

**文件结构：** 文件名、export name、guide mapping一致：`useToggle.ts` → `useToggle`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/useToggle.ts</span>
  </div>

```ts
return {
  value,
  toggle,
  setTrue,
  setFalse,
  setValue,
};
```

</div>

**逐行解释：** `value` 是read surface；`toggle`是relative transition；`setTrue/setFalse/setValue`是explicit transitions。

**执行过程：** caller destructure并可 rename `value` → template read → named action mutation → render update。

**变量、refs、watchers、effects、cleanup 与返回值变化：** return keys固定；ref identity固定；只有 `.value` transition。

**为什么得到这个结果：** closure actions都捕获同一个 local ref。

**对比写法：** 返回 `[value, toggle]` 虽可行，但位置含义在多返回值时更弱；本章统一 plain object。

**常见错误为什么错：** 根据 runtime condition return不同keys会让 caller contract与TS narrowing复杂化。

**与真实项目的关系：** 稳定 names让大型 component setup可按logical concern读取。

**与当前学习主线的关系：** 第 3 章设计component props/emits；本章用同等严谨度设计logic API。

**最终记忆模型：** name reveals concern；return keys reveal state/actions；Vue不因名称施加魔法。

<a id="section-9-4"></a>

### 9.4 useCounter 与 useToggle：最小 per-instance reactive logic

**结论：** function body中的 `ref()` 是factory state；每次 call获得独立 source与mutation closures。

**本节解决的问题：** 同一 component中两个counter为什么互不影响，以及如何稳定reset到各自 initial value。

**技术意义：** 建立后续 pagination/form/modal的最小 owner model。

**概念解释：** `initialValue` 是每次调用自己的 parameter binding；`reset` closure捕获该值。它不是 prop copy，也不是 module singleton。

**边界：JavaScript function、Vue active instance、Vue reactivity、lifecycle scope、TypeScript、browser API、SFC compiler、Vite tooling：** JS创建closure；Vue ref追踪；component render订阅；TS检查 number/boolean；无 lifecycle/browser；compiler template自动解包refs。

**composable 机制证据链：**

1. `CounterComposableDemo` 调用 `useCounter()` 与 `useCounter(10)`。
2. 每次创建独立 local state。
3. values 是 initial bindings 0/10、两个 ref objects、独立 reset closures。
4. API 是 `ref`。
5. 不依赖 active instance。
6. template分别读取两个 count。
7. 同一 component render effect订阅两个 sources。
8. first button只写 first count。
9. unmount后render effect停止，无 manual cleanup。
10. TS阻止 `useCounter("10")`。
11. TS不限制 number为负；这是业务guard决定。
12. reset分别回到0/10，因为 closure捕获不同 initial binding。
13. function外 `const count = ref(0)` 会变成shared。
14. reset回到错误默认值时检查 closure是否捕获per-call input。

**API / 语法规则：** initial parameter是创建时配置；returned mutation functions是唯一推荐write surface。

**文件结构：** `useCounter.ts` / `useToggle.ts` 与两个独立 demo component。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/demos/CounterComposableDemo.vue</span>
  </div>

```ts
const firstCounter = useCounter();
const secondCounter = useCounter(10);
```

</div>

**逐行解释：** first call创建initial 0 closure；second call创建initial 10 closure；imported function definition相同，runtime objects不同。

**执行过程：** setup执行两次factory → render读取两refs → click first increment → first ref trigger → component rerender显示1/10。

**变量、refs、watchers、effects、cleanup 与返回值变化：** first inner value 0→1；second维持10；无watcher/resource。

**为什么得到这个结果：** lexical scope与ref identity在每次 function invocation独立创建。

**对比写法：** component内直接写两组refs能工作，但重复 state transition logic；composable复用logic而不复用visual layout。

**常见错误为什么错：** 把 `initialValue` 本身当reactive input不会自动跟随外部变化；若需要reactive input应接受 ref/getter并track。

**与真实项目的关系：** tab state、popover state、draft state通常默认per-instance。

**与当前学习主线的关系：** 将第 2 章 state primitives与第 3 章 component实例一一对应。

**最终记忆模型：** same function definition + different calls = different closures + different refs。

<a id="section-9-5"></a>

### 9.5 usePagination：derived state、boundary guards 与 page mutation API

**结论：** pagination只拥有 current page；total pages、indexes和guard flags都是由reactive inputs推导的 computed refs。

**本节解决的问题：** total items或page size变化时，如何避免散落在component中的重复公式与越界page。

**技术意义：** 把pure derivation与guarded mutation集中，同时不接管外部items array。

**概念解释：** `totalItems` / `pageSize` 接受 plain/ref/getter；`toValue` 在computed getter中normalize并track；`watch(totalPages)`只负责clamp existing page。

**边界：JavaScript function、Vue active instance、Vue reactivity、lifecycle scope、TypeScript、browser API、SFC compiler、Vite tooling：** JS执行floor/ceil/min/max；Vue computed cache与watch；TS用`MaybeRefOrGetter<number>`；无browser API；SFC只消费return refs；Vite不计算page。

**composable 机制证据链：**

1. `PaginationComposableDemo` 和 final kit调用 `usePagination`。
2. currentPage是per-call state；inputs归caller。
3. concrete values是23 items、page size 5、currentPage ref、computed indexes。
4. APIs是 `ref`、`computed`、`watch`、`toValue`。
5. watcher在setup scope创建并自动随component disposal。
6. computed读取totalItems/pageSize/currentPage。
7. component render与visibleItems computed依赖returned computed refs；clamp watcher依赖totalPages。
8. next/goToPage或totalItems变化触发新derivations。
9. component scope stop时watch停止；无browser resource。
10. TS检查input与`PaginationState`。
11. TS不保证runtime number finite/positive，所以实现仍normalize。
12. page 3得到slice indexes 10–15，因为zero-based start与exclusive end。
13. 直接允许page 0违反guard invariant。
14. empty list后仍停留高page、显示空白时检查clamp。

**API / 语法规则：** composable不mutate caller array；`endIndex` 是exclusive boundary，适合 `slice(startIndex, endIndex)`。

**文件结构：** `usePagination.ts` 负责机制；`PaginationComposableDemo.vue` 负责local items/render。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/usePagination.ts</span>
  </div>

```ts
const totalPages = computed(() =>
  Math.max(
    1,
    Math.ceil(normalizedTotalItems.value / normalizedPageSize.value),
  ),
);

function goToPage(page: number): void {
  const safePage = Number.isFinite(page) ? Math.floor(page) : 1;
  currentPage.value = Math.min(
    Math.max(safePage, 1),
    totalPages.value,
  );
}
```

</div>

**逐行解释：** computed读取normalized sources；至少1页让control contract稳定；goToPage先处理NaN/decimal，再clamp上下界。

**执行过程：** click next → goToPage读取totalPages → 写currentPage → start/end/guards invalidated → visibleItems computed rerun → DOM patch。

**变量、refs、watchers、effects、cleanup 与返回值变化：** currentPage ref inner value改变；computed objects不替换；watch只在totalPages变化时执行。

**为什么得到这个结果：** computed依赖图把page/input reads连接到derived values，component无需手工同步多个refs。

**对比写法：** 用watch分别写totalPages/start/end会复制derived state并产生同步顺序问题。

**常见错误为什么错：** 在composable内部sort/splice items扩张了职责并mutate external ownership。

**与真实项目的关系：** client list、table pager、carousel index都适合guarded index state；server pagination将在API章节加入request boundary。

**与当前学习主线的关系：** 第 2 章computed成为可复用derived API；不重复其底层track实现。

**最终记忆模型：** inputs normalize → computed derives → actions guard one mutable page ref。

<a id="section-9-6"></a>

### 9.6 useLocalStorage：browser storage side effect、serialization 与 cleanup boundary

**结论：** storage是browser side effect，不是reactive database；mount时读取，watch state写JSON，parse失败回fallback。

**本节解决的问题：** reusable draft state如何跨reload保存，同时不在SSR-sensitive setup阶段假设`localStorage`存在。

**技术意义：** 把serialization、runtime errors与watch cleanup集中在一个明确browser boundary。

**概念解释：** `value` 是Vue source；localStorage string只是外部副本。JSON parse得到unknown runtime value，本章仅fallback，不声称schema validation。

**边界：JavaScript function、Vue active instance、Vue reactivity、lifecycle scope、TypeScript、browser API、SFC compiler、Vite tooling：** JSON stringify/parse属于JS；storage属于browser；onMounted保证client timing；watch监听ref；TS generic会擦除；Vite不验证stored string。

**composable 机制证据链：**

1. `LocalStorageComposableDemo` 调用 `useLocalStorage`。
2. 每个call创建local ref，但相同storage key可在browser层互相影响。
3. values是key string、Ref<T>、stored JSON string、Error ref、watch stop handle。
4. APIs是 `ref`、`watch`、`onMounted`、`onScopeDispose`。
5. 依赖active component scope，因为注册mounted/dispose。
6. write watcher读取`value`。
7. watcher依赖deep value changes；render读取value/error。
8. input mutation触发JSON write；mount触发read；invalid JSON触发catch。
9. scope dispose调用stopWriting。
10. TS检查caller使用的T与return Ref<T>。
11. TS不验证JSON.parse结果确实是T。
12. valid stored JSON替换initial value；parse error保留fallback并显示Error。
13. setup顶层直接读取localStorage违反SSR/browser runtime boundary。
14. server build或test出现`localStorage is not defined`时检查access timing。

**API / 语法规则：** generic只是static model；需要安全external data时必须另加runtime parser，属于后续API boundary章节。

**文件结构：** `useLocalStorage.ts` 不知道input DOM；demo选择draft title与storage key。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/useLocalStorage.ts</span>
  </div>

```ts
onMounted(() => {
  browserReady = true;
  const savedValue = localStorage.getItem(key);

  if (savedValue !== null) {
    const parsedValue: unknown = JSON.parse(savedValue);
    value.value = parsedValue as T;
  }
});
```

</div>

**逐行解释：** mounted callback只在client mount执行；flag允许后续write；getItem返回string/null；unknown明确暴露parse boundary；assertion不等于validation。

**执行过程：** setup创建ref/watch但write被flag挡住 → mount读取storage → state更新 → render显示stored draft → user input触发watch写新JSON。

**变量、refs、watchers、effects、cleanup 与返回值变化：** `browserReady`普通boolean false→true；value可能initial→parsed；error按catch更新；dispose停止watch。

**为什么得到这个结果：** watcher跟踪ref，而storage本身不reactive；仅composable显式读写建立连接。

**对比写法：** computed适合pure derived value，不适合执行storage write side effect。

**常见错误为什么错：** 把`JSON.parse(saved) as T`称为runtime validation隐藏了malformed shape仍可进入state。

**与真实项目的关系：** theme preference、draft、table density适合；credentials与security-sensitive data不适合。

**与当前学习主线的关系：** 第 2 章watch side effect被封装；第 3 章component不再承担storage details。

**最终记忆模型：** Vue ref是source → watcher序列化副本 → mount恢复副本 → runtime parse仍需防护。

<a id="section-9-7"></a>

### 9.7 useAsyncState：loading、error、data、execute 与 stale result boundary

**结论：** async composable必须暴露status/data/error/execute，并用request id阻止older Promise覆盖newer result。

**本节解决的问题：** slow request先开始、fast request后开始却先resolve时，最终UI应保留fast result。

**技术意义：** 把Promise lifecycle与race handling从page component抽出，但不绑定network library。

**概念解释：** 每次execute递增`latestRequestId`；resolution只有id仍是latest才能commit。`loading`是status的computed，不是独立可冲突boolean。

**边界：JavaScript function、Vue active instance、Vue reactivity、lifecycle scope、TypeScript、browser API、SFC compiler、Vite tooling：** Promise ordering属于JS；refs/computed属于Vue；本实现不需active instance/browser fetch；TS generic描述result；Vite无关。

**composable 机制证据链：**

1. `AsyncStateComposableDemo` 与 final kit调用 `useAsyncState`。
2. 每次call创建独立 request counter与refs。
3. values是operation closure、Promise<T>、requestId number、data/error/status refs。
4. APIs是 `ref`、`computed`。
5. 不依赖active component instance；operation可能由component state closure提供。
6. loading computed读取status；template读取全部refs。
7. component render effect依赖data/error/status/loading。
8. execute写loading；Promise resolve/reject写success/error；new execute使旧id stale。
9. 无external listener；reset通过递增id使pending result失效。
10. TS检查`operation: () => Promise<T>`和`Ref<T|null>`。
11. TS不保证Promise成功或Error来源。
12. slow→fast时slow resolution被id comparison忽略。
13. 无stale guard时违反“latest user intent owns result”业务rule。
14. UI偶尔倒退到旧query result时检查overlapping Promise commits。

**API / 语法规则：** caught value是unknown并normalize为Error；本实现通过error ref报告，不throw给template event handler。

**文件结构：** composable无URL/fetch；demo使用local delayed Promise。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/useAsyncState.ts</span>
  </div>

```ts
const requestId = latestRequestId + 1;
latestRequestId = requestId;
status.value = "loading";

const result = await operation();

if (requestId !== latestRequestId) {
  return null;
}

data.value = result;
status.value = "success";
```

</div>

**逐行解释：** local id冻结本次identity；global latest记录当前owner；await让出call stack；resolve后先比较再commit。

**执行过程：** click slow → id1 loading → click fast → id2 loading → id2 resolve commit → id1 resolve sees latest2 and exits。

**变量、refs、watchers、effects、cleanup 与返回值变化：** status idle→loading→success/error；data仅latest更新；error每次execute先清空；无watcher。

**为什么得到这个结果：** Promise completion order不保证start order，explicit id建立commit ordering。

**对比写法：** async component加载component module；`useAsyncState`管理任意Promise data/result，不是同一机制。

**常见错误为什么错：** `catch (error) { errorRef.value = String(error) }` 丢失Error stack/name与structured detail。

**与真实项目的关系：** search、details、save operations都需要loading/error/data与race policy；真实network validation留到后续章节。

**与当前学习主线的关系：** 第 3 章async component code loading与本节async data state被明确分开。

**最终记忆模型：** execute assigns identity → Promise settles → only latest identity may commit。

<a id="section-9-8"></a>

### 9.8 useDebouncedSearch 与 customRef：debounced input、track、trigger 与 delayed update

**结论：** `customRef` getter必须`track()`，setter在delay后更新value并`trigger()`；debounced search用它推迟dependent computed invalidation。

**本节解决的问题：** immediate input每次keystroke变化，但filter result只在停止输入400ms后更新。

**技术意义：** 展示custom dependency timing，同时把search list保持为local in-memory input。

**概念解释：** customRef不是延迟DOM event；它延迟ref内部value commit与trigger。`useDebouncedSearch` 用watch把immediate ref写入debounced custom ref。

**边界：JavaScript function、Vue active instance、Vue reactivity、lifecycle scope、TypeScript、browser API、SFC compiler、Vite tooling：** setTimeout属于JS/browser timer；customRef track/trigger属于Vue；scope cleanup清timer；TS generic检查value；SFC v-model写immediate ref。

**composable 机制证据链：**

1. `DebouncedSearchComposableDemo` 调用 `useDebouncedSearch`。
2. immediate/debounced state均per-call。
3. values是query strings、timeout id、custom ref、watcher、items array、results computed。
4. APIs是 `ref`、`watch`、`customRef`、`computed`、`toValue`、`onScopeDispose`。
5. search watcher在component scope；debouncedRef仅在active scope存在时注册timer cleanup。
6. watcher读取immediateQuery；results computed读取debouncedQuery/items。
7. watcher依赖immediate；computed/render依赖debounced/result。
8. input触发watch；setter重置timer；latest timeout commit并trigger。
9. scope dispose清pending timeout；watch自动停止。
10. TS检查SearchItem与Ref<string>。
11. TS不保证delay合理或items来自validated source。
12. immediate UI先变，debounced/result后变。
13. get不track导致consumer永不订阅；set不trigger导致更新不可见。
14. ref值已内部改变但UI不更新时检查customRef trigger path。

**API / 语法规则：** customRef getter避免每次返回新object identity，否则parent unrelated rerender可能造成child prop churn。

**文件结构：** `useDebouncedRef.ts` 只处理delayed ref；`useDebouncedSearch.ts` 组合它与filtering。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/useDebouncedRef.ts</span>
  </div>

```ts
const debouncedRef = customRef<T>((track, trigger) => ({
  get() {
    track();
    return currentValue;
  },
  set(nextValue) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      currentValue = nextValue;
      trigger();
    }, delay);
  },
}));
```

</div>

**逐行解释：** factory接收Vue提供的track/trigger；get建立dependency；set取消旧任务；latest timer写closure value并通知effects。

**执行过程：** native input → immediate ref mutation → watch调用custom setter → timer替换 → delay结束trigger → results computed invalidated → DOM list patch。

**变量、refs、watchers、effects、cleanup 与返回值变化：** immediate每键变化；debounced保持旧值直到timer；results随后替换array；pending timer在dispose清除。

**为什么得到这个结果：** Vue effect只有在trigger调用后才被通知custom ref invalidation。

**对比写法：** 普通ref + watcher timeout也能debounce；customRef把delay语义封装到ref read/write contract。

**常见错误为什么错：** getter每次`return { value: currentValue }`创建新identity，可能让child props在parent unrelated rerender时被视为改变。

**与真实项目的关系：** local filtering、autosave input、expensive preview可使用；network cancellation仍需async policy。

**与当前学习主线的关系：** 第 2 章dependency tracking在本节通过explicit track/trigger成为可配置ref。

**最终记忆模型：** get tracks now；set schedules later；latest timeout mutates and triggers once。

<a id="section-9-9"></a>

### 9.9 useClickOutside 与 useEventListener：DOM event listener、template ref input 与 resource cleanup

**结论：** DOM composable接收element ref/getter，不查询固定selector；listener在mounted注册，并用同一target/listener/options在scope dispose移除。

**本节解决的问题：** popover布局属于component，但document pointer listener与contains判断可复用。

**技术意义：** 复用resource lifecycle而不让composable隐式依赖某个class/id/DOM hierarchy。

**概念解释：** `useClickOutside`组合`useEventListener`；每次pointerdown时调用`toValue(target)`取得当前element，再用`contains`判断event target。

**边界：JavaScript function、Vue active instance、Vue reactivity、lifecycle scope、TypeScript、browser API、SFC compiler、Vite tooling：** EventTarget/Node/PointerEvent属于browser；template ref由Vue patch赋值；hooks关联scope；TS narrowing检查DOM types；Vite不管理listeners。

**composable 机制证据链：**

1. `ClickOutsideComposableDemo` 调用 `useClickOutside`。
2. popoverOpen是per-call toggle state；listener状态保存在per-call closure。
3. values是HTMLElement ref、document、PointerEvent、Node target、callback、activeTarget。
4. APIs是 `useTemplateRef`、`toValue`、`onMounted`、`onScopeDispose`。
5. event listener composable依赖active component instance/scope。
6. pointer callback读取element ref；template读取open ref。
7. render依赖open；listener不是reactive effect。
8. outside pointerdown调用close并mutation open。
9. dispose执行removeEventListener并清activeTarget。
10. TS检查HTMLElement/null与PointerEvent callback。
11. TS不保证event target是Node，所以runtime `instanceof`必要。
12. inside click因contains为true保持open，outside click关闭。
13. `document.querySelector(".popover")` 违反不依赖specific UI structure原则。
14. 多个instances互相关闭错误时检查selector/global element coupling。

**API / 语法规则：** remove必须使用相同event name、listener identity和capture options；target getter让mounted时解析browser target。

**文件结构：** `useEventListener.ts` 管resource；`useClickOutside.ts` 管outside predicate；demo管popover markup。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/useClickOutside.ts</span>
  </div>

```ts
useEventListener(
  () => (typeof document === "undefined" ? null : document),
  "pointerdown",
  (event) => {
    const element = toValue(target);

    if (
      element &&
      event instanceof PointerEvent &&
      event.target instanceof Node &&
      !element.contains(event.target)
    ) {
      callback(event);
    }
  },
);
```

</div>

**逐行解释：** target getter保护non-browser runtime；listener每次读取current element；runtime guards缩窄event/target；outside predicate后调用caller callback。

**执行过程：** setup注册mounted/dispose → mount后add on document → pointer event dispatch → contains check → close ref mutation → component patch → unmount remove。

**变量、refs、watchers、effects、cleanup 与返回值变化：** element ref随v-if为HTMLElement/null；activeTarget在start/stop变化；function返回void，因为caller只需自动lifecycle。

**为什么得到这个结果：** document接收所有pointerdown，contains把global event映射到具体caller element boundary。

**对比写法：** component prop/emits适合declarative communication；click outside需要browser event resource，composable更合适。

**常见错误为什么错：** add时使用inline function、remove时创建另一个inline function，identity不同导致listener残留。

**与真实项目的关系：** dropdown、context menu、popover适用；focus management与accessibility仍由component负责。

**与当前学习主线的关系：** 第 3 章template ref作为input传入，不被composable替代或自行查询。

**最终记忆模型：** component supplies element → composable owns document resource → event calls explicit callback → scope disposes resource。

<a id="section-9-10"></a>

### 9.10 lifecycle inside composables：onMounted、onUnmounted、onScopeDispose 的使用条件

**结论：** DOM access在`onMounted`；component-specific cleanup可用`onUnmounted`；reusable effect/resource cleanup优先绑定current scope的`onScopeDispose`。

**本节解决的问题：** 同一个listener composable既要随component unmount结束，也应能解释为何scope cleanup比硬编码component hook更通用。

**技术意义：** resource lifetime与owner scope对齐，避免leak和outside-setup warning。

**概念解释：** 每个component setup运行在effect scope；因此scope disposal通常发生于unmount。manually created effect scope也能触发`onScopeDispose`，不要求component DOM。

**边界：JavaScript function、Vue active instance、Vue reactivity、lifecycle scope、TypeScript、browser API、SFC compiler、Vite tooling：** mounted/unmounted属于component lifecycle；scope dispose属于reactivity scope；browser resource仍需explicit stop；TS不能检测遗漏cleanup。

**composable 机制证据链：**

1. `LocalStorageComposableDemo`、`ClickOutsideComposableDemo`、`EffectScopeDemo`调用含lifecycle/scope APIs的composables。
2. reactive state per-call；resource handles per-call。
3. values是mounted callback、watch stop、listener target、interval id、dispose callback。
4. APIs是 `onMounted`、`onScopeDispose`，对比`onUnmounted`。
5. 注册依赖active instance/scope。
6. watcher读取storage value；interval写ticks；listener读取target。
7. watch/render/effect分别依赖其sources。
8. mount/event/timer/state mutation推动变化。
9. component unmount或manual scope.stop调用cleanup。
10. TS检查callback signatures。
11. TS不证明cleanup被注册或执行顺序满足业务。
12. unmount后listener/timer不再触发state。
13. scope外调用`onScopeDispose`违反active scope requirement并warning。
14. 页面离开后log/requests/ticks继续增长时检查resource ownership。

**API / 语法规则：** lifecycle hooks同步注册；`onScopeDispose`若无active scope会warning。Vue 3.5可用第二参数抑制，但本章用`getCurrentScope()`显式判断。

**文件结构：** `useEventListener.ts` mount/start + scope/stop；`useDebouncedRef.ts` 只在current scope存在时登记timeout cleanup。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/useEventListener.ts</span>
  </div>

```ts
onMounted(start);
onScopeDispose(stop);
```

</div>

**逐行解释：** start需要rendered/client target所以延后到mount；stop只依赖resource closure，绑定scope termination。

**执行过程：** setup registration → mount start → resource events → component unmount stops setup scope → dispose stop。

**变量、refs、watchers、effects、cleanup 与返回值变化：** activeTarget null→EventTarget→null；cleanup具有幂等stop行为。

**为什么得到这个结果：** component setup scope是effect scope，unmount会dispose其中注册的effects/callbacks。

**对比写法：** `onUnmounted(stop)` 也能处理component-only case；`onScopeDispose`可同样服务manual effect scope。

**常见错误为什么错：** composable可能被普通script调用却无conditional scope guard，导致lifecycle registration warning。

**与真实项目的关系：** listener、observer、timer、subscription、worker都需要acquire/release pair。

**与当前学习主线的关系：** 第 3 章在component写hooks；本节将resource pair提取但不改变lifecycle语义。

**最终记忆模型：** acquire at valid runtime phase；register release on owner scope；never leave resource owner implicit。

<a id="section-9-11"></a>

### 9.11 shared state vs per-instance state：module-scope state、factory state 与隐藏全局状态风险

**结论：** function内`ref()`默认per-call；module-scope `ref()`故意shared。shared不是错误，但必须显式命名、文档化owner与reset策略。

**本节解决的问题：** 为什么两个`useCounter()`独立，而两个`useDeliberatelySharedCounter()`显示同一个number。

**技术意义：** 防止“extract到文件外”时无意把local state升级为application-lifetime singleton。

**概念解释：** ESM module通常只初始化一次；module binding中的sharedCount只有一个。factory body每次call则创建新binding/object。

**边界：JavaScript function、Vue active instance、Vue reactivity、lifecycle scope、TypeScript、browser API、SFC compiler、Vite tooling：** shared lifetime来自ESM，不是Vue magic；ref仍reactive；Vite复用module graph；component unmount不会自动销毁module ref；TS只检查shape。

**composable 机制证据链：**

1. `SharedVsPerInstanceDemo` 调用两种counter各两次。
2. `useCounter` per-call；`sharedCount` module-scope intentionally shared。
3. values是四个return objects、三个actual ref objects（两个local+一个shared）。
4. API是 `ref`。
5. 两种都不依赖active instance。
6. template读取local refs与同一个shared ref两次。
7. render effect订阅这些sources。
8. increment shared mutation同一ref，因此两个display都变。
9. unmount停止render effect，但module ref继续存在。
10. TS检查SharedCounterState。
11. TS不标记module scope state的architectural lifetime。
12. shared显示同步值来自identity相同。
13. 未命名的module ref违反显式ownership原则。
14. new component mount看到旧值时检查module singleton。

**API / 语法规则：** shared state需要deliberate name、limited API和clear lifetime；更复杂application state留到Pinia章节。

**文件结构：** teaching shared ref只存在`SharedVsPerInstanceDemo.vue`的normal module script，不污染通用`useCounter.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/demos/SharedVsPerInstanceDemo.vue</span>
  </div>

```ts
const sharedCount = ref(0);

function useDeliberatelySharedCounter(): SharedCounterState {
  function increment(): void {
    sharedCount.value += 1;
  }

  return { count: sharedCount, increment };
}
```

</div>

**逐行解释：** ref在setup function外/module evaluation创建一次；每次function call返回同一ref与new closure。

**执行过程：** module load创建sharedCount → component setup call twice → render reads same source twice → one increment triggersone source → both expressions update。

**变量、refs、watchers、effects、cleanup 与返回值变化：** shared ref identity始终相同；return objects/functions可不同；无auto reset。

**为什么得到这个结果：** JavaScript module cache复用binding，Vue dependency按同一ref追踪。

**对比写法：** `useCounter` 把`const count=ref()`放function body，每次call有新identity。

**常见错误为什么错：** 为“避免重复创建”把所有state移到module scope，会让instance isolation消失。

**与真实项目的关系：** tiny singleton可表达connection status等，但认证/复杂业务state更适合明确store architecture。

**与当前学习主线的关系：** 这是第 3 章provide/inject与后续Pinia之间的ownership判断，不把composable当隐藏store。

**最终记忆模型：** creation location determines lifetime：function body = per call；module body = shared module lifetime。

<a id="section-9-12"></a>

### 9.12 effectScope：捕获 computed / watch / watchEffect 并统一 stop

**结论：** `effectScope().run()` 捕获其中创建的computed/watch/watchEffect；`scope.stop()`统一停止，并执行内部`onScopeDispose` callbacks。

**本节解决的问题：** ticker应能手动start/stop，而不必等待整个component unmount。

**技术意义：** 为一组effects建立比component lifetime更短的manual lifetime。

**概念解释：** `useScopedTicker` 每次start创建new scope，因为stopped scope不能restart；interval虽不是reactive effect，但在inner scope注册dispose来一起清理。

**边界：JavaScript function、Vue active instance、Vue reactivity、lifecycle scope、TypeScript、browser API、SFC compiler、Vite tooling：** interval是JS/browser resource；watchEffect和scope属于Vue；outer component scope在unmount调用stop；TS检查EffectScope/null。

**composable 机制证据链：**

1. `EffectScopeDemo` 调用 `useScopedTicker`。
2. refs per-call；每次start创建new manual effect scope。
3. values是ticks/observed/running refs、EffectScope、interval id、watchEffect、dispose callback。
4. APIs是 `effectScope`、`watchEffect`、`onScopeDispose`、`getCurrentScope`。
5. start可在event时调用；outer auto-cleanup注册需要active setup scope。
6. inner watchEffect读取ticks。
7. watchEffect依赖ticks；component render读取returned refs。
8. interval写ticks，触发watchEffect与render。
9. manual stop停止watchEffect并clear interval；unmount outer dispose也调用stop。
10. TS检查scope与returned API。
11. TS不证明interval已clear。
12. stop后ticks不再增长，observed保持最后值。
13. 只stop watcher不clear interval违反external resource cleanup。
14. manual stop后CPU/ticks仍运行时检查non-reactive resources。

**API / 语法规则：** `scope.run()` inactive时返回undefined；stopped scope不复用，start需create new scope。

**文件结构：** `useScopedTicker.ts` 封装manual scope；demo只调用start/stop/reset。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/useScopedTicker.ts</span>
  </div>

```ts
tickerScope = effectScope();
tickerScope.run(() => {
  const intervalId = setInterval(() => {
    ticks.value += 1;
  }, intervalMs);

  watchEffect(() => {
    observedTick.value = ticks.value;
  });

  onScopeDispose(() => {
    clearInterval(intervalId);
  });
});
```

</div>

**逐行解释：** scope成为effects owner；interval writes source；watchEffect同步初次读取并subscribe；dispose把non-reactive timer并入scope lifetime。

**执行过程：** click start → create/run scope → interval starts/watchEffect initial run → ticks trigger effects → click stop → scope.stop → watcher stop+timer clear。

**变量、refs、watchers、effects、cleanup 与返回值变化：** scope null→active→null；running对应manual state；ticks可reset；stop后observed不再被watchEffect同步。

**为什么得到这个结果：** Vue记录scope.run期间创建的effects与dispose callbacks。

**对比写法：** component setup scope只能随unmount整体停止；manual scope提供feature-level stop。

**常见错误为什么错：** 在scope外先创建watchEffect再调用scope.run，effect不会被该scope捕获。

**与真实项目的关系：** temporary preview、feature session、batch watchers适合manual scope；普通component effects无需额外scope。

**与当前学习主线的关系：** 把第 2 章effects从自动component lifetime推进到explicit grouped lifetime。

**最终记忆模型：** create scope → create effects/resources inside run → stop once → dispose group together。

<a id="section-9-13"></a>

### 9.13 composable inputs：plain value、ref、getter、MaybeRefOrGetter 与 toValue tracking

**结论：** `MaybeRefOrGetter<T>` 让caller传plain/ref/getter；需要reactive rerun时，必须在computed/watch/watchEffect的tracking callback内调用`toValue()`。

**本节解决的问题：** final kit如何把`() => filteredRecords.value.length`传给pagination，并在filter变化时自动重新计算total pages。

**技术意义：** 提供flexible input而不强迫caller创建特定wrapper，也不丢失getter内部dependency。

**概念解释：** `toValue` 对plain原样返回、对ref读取`.value`、对getter调用function；`unref`不会调用普通function。

**边界：JavaScript function、Vue active instance、Vue reactivity、lifecycle scope、TypeScript、browser API、SFC compiler、Vite tooling：** TS union描述allowed shapes；JS normalization执行getter；Vue只追踪active effect内发生的reactive reads；无browser dependence。

**composable 机制证据链：**

1. `ComposablesKitDemo` 调用`usePagination({ totalItems: () => filteredRecords.value.length })`。
2. pagination state per-call；filteredRecords归component。
3. values是getter function、ComputedRef array、normalized number。
4. APIs是 `toValue`、`computed`。
5. 不直接依赖component instance，但computed进入current scope。
6. pagination computed内`toValue(totalItems)`调用getter，getter读取filteredRecords。
7. normalized/totalPages computed依赖该read，render/slice依赖returned values。
8. search/query mutation改变filteredRecords，触发pagination recompute。
9. component scope stop时computeds停止被消费；无manual resource。
10. TS检查MaybeRefOrGetter<number>。
11. TS不保证getter runtime返回finite number。
12. filter减少items时totalPages更新并watch clamp page。
13. setup外先`const total = toValue(input)`只得到snapshot，违反tracking placement。
14. ref/getter input改变但composable不更新时检查toValue调用位置。

**API / 语法规则：** reactive input effect使用`watch(() => toValue(source), ...)`或在computed/watchEffect中normalize。

**文件结构：** `usePagination.ts`、`usePermission.ts`、`useDebouncedSearch.ts` 都按实际需要接受 MaybeRefOrGetter。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/usePagination.ts</span>
  </div>

```ts
const normalizedTotalItems = computed(() =>
  Math.max(0, Math.floor(toValue(totalItems))),
);
```

</div>

**逐行解释：** computed callback建立tracking context；toValue可能读取ref或调用getter；floor/max同时建立runtime invariant。

**执行过程：** initial computed demand → getter reads filteredRecords → dependency recorded → search trigger → filteredRecords invalidated → total normalization/totalPages invalidated。

**变量、refs、watchers、effects、cleanup 与返回值变化：** input identity不变；getter每次effect rerun返回current length；computed cached number更新。

**为什么得到这个结果：** dependency来自getter执行时读取的reactive source，而不是MaybeRefOrGetter type。

**对比写法：** `unref(() => count.value)` 返回function本身；`toValue`会调用getter并返回number。

**常见错误为什么错：** 用`toValue`一次后存普通const，再期待reactive updates，忽略了effect tracking只能发生在effect执行期间。

**与真实项目的关系：** pagination、permission、async key、filter source可接受flexible input；public API仍应避免不必要union。

**与当前学习主线的关系：** 第 2 章dependency reads现在通过composable input contract跨function boundary。

**最终记忆模型：** flexible static type + normalization inside effect = tracked current value。

<a id="section-9-14"></a>

### 9.14 composable return values：plain object of refs、destructuring safety 与 reactive wrapping

**结论：** 官方推荐composable返回plain non-reactive object containing refs/functions；destructure后refs仍保持连接。

**本节解决的问题：** 为什么`const { count } = useCounter()`仍reactive，而destructure reactive object property可能得到普通snapshot。

**技术意义：** caller能明确看到bindings来源、rename冲突项，并安全destructure。

**概念解释：** plain return object本身无需reactive；每个Ref携带自己的dependency identity。若caller偏好property access，可`reactive(useFeature())`让refs按property自动unwrap。

**边界：JavaScript function、Vue active instance、Vue reactivity、lifecycle scope、TypeScript、browser API、SFC compiler、Vite tooling：** JS destructuring复制property value；复制Ref仍复制object reference；复制reactive primitive property得到number/string；TS不改变runtime identity；template unwrap refs。

**composable 机制证据链：**

1. 所有demo调用composables并destructure或保留return object。
2. state per-call，return plain object per-call。
3. values是Ref objects、ComputedRef objects、functions、plain container。
4. APIs是 `ref`、`computed`；对比`reactive`/`toRefs`。
5. return pattern不依赖active instance。
6. component template读取destructured ref。
7. render effect依赖ref本身。
8. returned action或input mutation触发source。
9. scope disposal停止effects，plain object无需cleanup。
10. TS检查property names/types。
11. TS不阻止caller绕过action直接写mutable ref。
12. destructured refs继续更新UI，因为identity保留。
13. destructure reactive object primitive违反proxy property connection。
14. value log变化但destructured local不更新时检查return container。

**API / 语法规则：** actions显式命名；需要readonly surface时可return `readonly(ref)`，但本章需要input-like mutations的 APIs保留可写refs。

**文件结构：** `useFormState.ts` return `values/touched/errors` refs与mutation functions，而不是一个大reactive object。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/useFormState.ts</span>
  </div>

```ts
return {
  values,
  touched,
  errors,
  setFieldValue,
  setFieldTouched,
  validateForm,
  reset,
};
```

</div>

**逐行解释：** 三个refs分别代表state surfaces；functions代表write/validation transitions；container不需要proxy。

**执行过程：** setup destructure refs/functions → template reads refs → input handler调用setFieldValue → values ref nested property mutation → render/validation读取current object。

**变量、refs、watchers、effects、cleanup 与返回值变化：** refs identity稳定；reset替换inner objects；plain return object不参与tracking。

**为什么得到这个结果：** Vue tracks `.value`/reactive nested object，not plain container property access。

**对比写法：** 若return `reactive({ count: 0 })` 后`const { count }=...`，count是普通number snapshot；可用`toRefs`修复，但plain refs更直接。

**常见错误为什么错：** return每次computed getter创建新API object会导致identity churn；composable应在call时创建一次stable surface。

**与真实项目的关系：** form、async、pagination均适合state refs + named actions；caller可选择destructure或namespace object。

**与当前学习主线的关系：** 复用第 2 章reactive destructuring结论，不重复Proxy底层解释。

**最终记忆模型：** plain container can destructure；refs carry reactivity；functions carry mutation intent。

<a id="section-9-15"></a>

### 9.15 Chapter integration：从 Chapter 03 component library 抽取 useModal、usePermission、useFormState

**结论：** component保留markup/props/emits/slots；composable抽取与特定visual tree无关的state transitions和business rules。

**本节解决的问题：** `BaseModal` 应继续render dialog和model contract，但open/close/toggle transitions可由`useModal`复用；form/permission也不应绑死specific page。

**技术意义：** 防止composable取代component，或component积累难测试logic。

**概念解释：** final demo把`isOpen` ref传给Chapter 03 `BaseModal v-model`；useModal不知道BaseModal存在。permission接收role/permissions inputs；form接收initial values/validator。

**边界：JavaScript function、Vue active instance、Vue reactivity、lifecycle scope、TypeScript、browser API、SFC compiler、Vite tooling：** composables管理refs/functions；component template/compiler管理DOM/render；v-model连接二者；TS检查contracts；无Router/Pinia。

**composable 机制证据链：**

1. `ComposablesKitDemo` 调用useModal/usePermission/useFormState。
2. 三组state均per-instance；无module hidden state。
3. values是boolean ref、role/permissions refs、form object refs、validator function。
4. APIs是 `ref`、`toValue`，并复用useToggle。
5. 不需lifecycle active instance。
6. BaseModal/render读取isOpen；permission functions读取inputs；form handlers读取/write refs。
7. component render effect依赖这些refs；permission functions在render中被调用并读取role/permissions。
8. click/model update/select/input触发mutations。
9. 无external resource cleanup。
10. TS检查PermissionName/UserRole/FormValues/FormErrors。
11. TS不验证user input或提供security authorization。
12. modal UI、permission labels、form errors跟owner state一致。
13. permission composable被当server security违反client display boundary。
14. reusable logic import component或query fixed selector时说明层次反转。

**API / 语法规则：** composable不import concrete component；component可以import composable。UI authorization不替代server authorization。

**文件结构：** Chapter 04 final demo只复用Chapter 03 `BaseModal.vue`；没有修改Chapter 03 source。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/demos/ComposablesKitDemo.vue</span>
  </div>

```vue
<script setup lang="ts">
const { isOpen, open, close } = useModal();
</script>

<template>
<BaseModal v-model="isOpen">
  <p>Rendering stays in the component.</p>
  <template #footer>
    <button type="button" @click="close">Close</button>
  </template>
</BaseModal>
</template>
```

</div>

**逐行解释：** useModal owns transitions；isOpen ref进入component model contract；BaseModal owns structure/slots；footer callback调用logic action。

**执行过程：** open click → composable ref true → BaseModal model prop true → dialog render；close click → ref false → dialog unmount。

**变量、refs、watchers、effects、cleanup 与返回值变化：** isOpen false/true；no duplicated modal state；permission/form refs独立。

**为什么得到这个结果：** v-model contract读取并更新同一ref，composable不需要知道emitted event细节。

**对比写法：** `useModal` 返回dialog vnode或查询`.modal`会绑定specific UI structure，降低复用。

**常见错误为什么错：** 把all Chapter 03 component behavior抽成composable会丢失props/emits/slots提供的visual API。

**与真实项目的关系：** page/component负责layout/accessibility；composable负责selection/filter/form/resource logic。

**与当前学习主线的关系：** 直接桥接Chapter 03 component boundary与Chapter 04 logic boundary。

**最终记忆模型：** reuse visual contract with component；reuse stateful logic with composable；connect via explicit refs/actions。

<a id="section-9-16"></a>

### 9.16 Final integration：vue-composables-kit 如何组织可复用业务逻辑

**结论：** final kit把七个logic concerns组合在一个component中，但每个composable只拥有自己的state/derived values/resource policy。

**本节解决的问题：** search、query、pagination、async、modal、permission、form如何互相传入明确values，而不形成hidden global object。

**技术意义：** 验收“能把page logic抽出、能测试pure API、能识别over-abstraction”。

**概念解释：** component owns local record list和composition wiring；search/query决定filteredRecords；getter把length交给pagination；async operation读取current filtered count；modal/form/permission相互独立。

**边界：JavaScript function、Vue active instance、Vue reactivity、lifecycle scope、TypeScript、browser API、SFC compiler、Vite tooling：** JS arrays/Promise/URLSearchParams；Vue refs/computed/watch；SFC template render；TS domain unions；Vite module graph；无network/Router/store。

**composable 机制证据链：**

1. `ComposablesKitDemo` 调用七个final features。
2. 全部state per-component instance。
3. values是records array、search custom ref、QueryState ref、pagination computeds、Promise、boolean、permissions、form refs。
4. APIs是 ref/computed/watch/customRef/toValue。
5. 当前final features不依赖lifecycle hooks；customRef cleanup在scope存在时登记。
6. filteredRecords读取search/query；pagination读取filtered length；template读取all outputs。
7. computed/render/watch形成依赖图。
8. input/select/click/Promise settlement触发state changes。
9. scope dispose清debounce timeout和watch；无listener/interval。
10. TS检查DemoRecord、UserRole、PermissionName、DemoFormValues。
11. TS不验证user email、URLSearchParams contents或security。
12. UI各panel可由对应owner/trigger解释。
13. 把全部refs藏进一个module singleton违反explicit ownership。
14. 修改一个feature引发unrelated state side effects时检查composable responsibility过宽。

**API / 语法规则：** cross-composable communication通过arguments/returned refs；没有隐式property injection。

**文件结构：** `ComposablesKitDemo.vue` 只做wiring/render；14 composables仍是独立modules。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/demos/ComposablesKitDemo.vue</span>
  </div>

```ts
const filteredRecords = computed(() => {
  const search = searchQuery.value.trim().toLowerCase();
  const category = query.value.category ?? "all";
  return records.filter((record) =>
    record.name.toLowerCase().includes(search) &&
    (category === "all" || record.category === category),
  );
});

const pagination = usePagination({
  totalItems: () => filteredRecords.value.length,
  pageSize: 3,
});
```

</div>

**逐行解释：** component ownsrecords/composition；computed建立search/query dependencies；pagination getter显式读取filtered length；page API不接触array。

**执行过程：** search delayed trigger → filteredRecords invalidated → totalItems getter返回new length → totalPages/watch clamp → visible slice/render patch。

**变量、refs、watchers、effects、cleanup 与返回值变化：** search/query refs改变；filtered array/computed value替换；currentPage可能clamp；其他form/modal refs不受影响。

**为什么得到这个结果：** concerns只通过显式reactive values连接，dependency graph按reads传播。

**对比写法：** 单一`useAdminPage()`返回几十项会把unrelated concerns绑在一起，属于over-abstraction。

**常见错误为什么错：** 为了“composable化”抽取一次性两行pureexpression会增加indirection而无stateful reuse收益。

**与真实项目的关系：** admin page可沿query/list/permission/form/resource拆concerns；Router/Pinia/API adapters在各自后续章节接入。

**与当前学习主线的关系：** 为Chapter 05深入Vue+TypeScript boundaries准备真实generic/union/runtime gaps。

**最终记忆模型：** component wires concerns；each composable owns one logic lifecycle；explicit refs/functions connect them。

## 10. API / 语法索引

| API / syntax | Layer | Input | Output / effect | Runtime boundary |
| --- | --- | --- | --- | --- |
| `ref()` | Vue reactivity | initial value | mutable Ref | 每call创建新ref取决于调用位置 |
| `computed()` | Vue reactivity | pure getter | cached ComputedRef | 只由tracked reads invalidated |
| `watch()` | Vue reactivity | explicit source | callback + stop handle | side effect，scope disposal |
| `watchEffect()` | Vue reactivity | effect callback | auto-tracked effect | 只跟踪同步执行期间reads |
| `customRef()` | Vue reactivity | `(track, trigger) => get/set` | Ref | caller控制track/trigger timing |
| `effectScope()` | Vue reactivity | optional detached flag | EffectScope | 捕获scope.run内effects |
| `onScopeDispose()` | Vue reactivity | cleanup callback | registration | 要求active effect scope |
| `getCurrentScope()` | Vue reactivity | none | scope/undefined | 用于conditional cleanup registration |
| `onMounted()` | component lifecycle | callback | post-mount registration | active component instance |
| `onUnmounted()` | component lifecycle | callback | post-unmount callback | component-specific lifetime |
| `toValue()` | Vue utility | value/ref/getter | normalized current value | getter在effect内调用才被追踪 |
| `unref()` | Vue utility | value/ref | value | 普通function不被调用 |
| `MaybeRef<T>` | TypeScript | value or Ref | static union | runtime无validation |
| `MaybeRefOrGetter<T>` | TypeScript | value/ref/getter | static union | 配合toValue |
| `<script setup>` | SFC compiler | top-level code | per-instance setup content | compile-time syntax sugar |

## 11. 常见错误表

| # | Wrong code | 错误类型 / 现象 | 违反规则 | 为什么失败 | Correct code | 后续识别方法 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `if (ready) useFeature()` 或 timer后首次调用 | hook context warning / disposal丢失 | instance-dependent composable应在setup同步调用 | Vue不能可靠确定active owner | setup顶层调用，用reactive input控制行为 | 搜索conditional/async composable call |
| 2 | `const { count } = reactiveReturn` | count不再更新 | reactive property destructuring | destructuring得到primitive snapshot | return/destructure refs，或`toRefs` | source变但local不变 |
| 3 | function外无意写`const state = ref()` | instances互相影响 | ownership必须显式 | ESM binding只初始化一次 | state放composable body | remount仍看到其他instance值 |
| 4 | add listener/timer/watch无stop | leak / duplicate callbacks | external resources必须cleanup | browser继续持有callback | `onScopeDispose(stop)` | mount次数越多触发越多 |
| 5 | 可在普通utility调用的函数内部无条件`onMounted` | no active instance warning | lifecycle composable usage restriction | caller未必在setup | 分离pure core与lifecycle wrapper | CLI/test普通调用出现warning |
| 6 | setup顶层直接`window.localStorage` | SSR/non-browser crash | browser runtime boundary | server没有window/document | DOM/storage access放mounted或guard | `is not defined`只在server/test出现 |
| 7 | `document.querySelector(".page-menu")` | 多instance取错element | composable不绑定specific layout | selector隐藏UI依赖 | 接受element ref/getter | rename class导致logic失效 |
| 8 | watch把a/b相加写到total ref | redundant sync state | pure derived应使用computed | 多source与target可能不同步 | `computed(() => a.value + b.value)` | watcher只为复制derived value |
| 9 | watchEffect读取整个large object | unexpected reruns | implicit dependency应可审计 | 同步读取全部成为dependencies | explicit `watch(source, callback)` | 不相关field变化也触发 |
| 10 | `const value = toValue(source)` 在effect外 | reactive input不更新 | tracking context requirement | 只得到一次snapshot | `computed(() => toValue(source))` | ref变而normalized const不变 |
| 11 | custom get不`track`或set不`trigger` | consumer不更新 | customRef dependency contract | effect未subscribe或未通知 | get调用track，commit后trigger | internal值变但DOM不变 |
| 12 | custom getter `return { value }` | child prop identity churn | stable getter result原则 | 每read创建new object | return stable value/object | unrelated parent render触发child |
| 13 | 每个Promise resolve都写data | stale result覆盖新结果 | latest intent commit policy | completion order不等于start order | request id / abort policy | search结果偶尔倒退 |
| 14 | `error.value = String(cause)` | Error details丢失 | unknown应normalize而非扁平化 | stack/name/cause被丢弃 | `cause instanceof Error` | UI/日志只有`[object Object]` |
| 15 | `JSON.parse(saved) as T` 被视为验证 | malformed state进入UI | TS type erasure | assertion不检查runtime shape | parser/schema或safe fallback | storage被手改后shape异常 |
| 16 | `usePermission().can()` 被当安全控制 | unauthorized action仍可调用 | client display不等于server auth | browser code可被绕过 | server/API必须再次授权 | 只隐藏button却不保护operation |
| 17 | 两行只使用一次的表达式都抽composable | indirection增加 | abstraction需stateful concern | 没有复用/lifecycle/testability收益 | 保留local code直到concern清晰 | 文件跳转多于logic价值 |
| 18 | Chapter 04 composable import Router/store | scope creep / hidden dependency | 当前chapter dependency boundary | 提前耦合未建立的architecture | 接受explicit refs/getters | function只能在某page/store工作 |
| 19 | return `doIt` / dynamic keys | caller contract不清 | stable named API | mutation意图不可读 | `open`、`reset`、`goToPage` | caller必须读实现理解 |
| 20 | interface后直接信任user/JSON | runtime invalid value | TypeScript非runtime validator | types被erase | runtime check + Error state | typecheck过但browser仍crash |

## 12. 最终小项目

最终小项目只整合前文已解释的机制，不替代16个核心教学小节。

### 12.1 项目目标

`vue-composables-kit` 在一个可运行component中组合：

1. `usePagination`
2. `useQueryState`
3. `useDebouncedRef`
4. `useAsyncState`（作为路线图 `useAsyncResource` 的实现）
5. `useModal`
6. `usePermission`
7. `useFormState`

它适合Chapter 04，因为UI保持在component，stateful logic通过explicit inputs/refs/actions组合；没有network、Router、Pinia、UI library或test framework。

### 12.2 项目结构与职责

| File | Responsibility | Explicit non-responsibility |
| --- | --- | --- |
| `ComposablesKitDemo.vue` | local records、wiring、render | reusable transition internals |
| `usePagination.ts` | indexes/pages/guards | arrays与server requests |
| `useQueryState.ts` | local QueryState + URLSearchParams serialization | browser route |
| `useDebouncedRef.ts` | delayed Ref trigger | search filtering |
| `useAsyncState.ts` | Promise state + stale guard | network transport |
| `useModal.ts` | boolean transitions | dialog DOM |
| `usePermission.ts` | client display predicates | security enforcement |
| `useFormState.ts` | values/touched/errors/transitions | form markup/library |

### 12.3 核心 composables 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/usePagination.ts</span>
  </div>

```ts
import {
  computed,
  ref,
  toValue,
  watch,
  type ComputedRef,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";

export type PaginationInput = {
  totalItems: MaybeRefOrGetter<number>;
  pageSize?: MaybeRefOrGetter<number>;
  initialPage?: number;
};

export type PaginationState = {
  currentPage: Ref<number>;
  totalPages: ComputedRef<number>;
  startIndex: ComputedRef<number>;
  endIndex: ComputedRef<number>;
  canGoPrevious: ComputedRef<boolean>;
  canGoNext: ComputedRef<boolean>;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
};

export function usePagination({
  totalItems,
  pageSize = 5,
  initialPage = 1,
}: PaginationInput): PaginationState {
  const currentPage = ref(Math.max(1, Math.floor(initialPage)));
  const normalizedTotalItems = computed(() =>
    Math.max(0, Math.floor(toValue(totalItems))),
  );
  const normalizedPageSize = computed(() =>
    Math.max(1, Math.floor(toValue(pageSize))),
  );
  const totalPages = computed(() =>
    Math.max(
      1,
      Math.ceil(normalizedTotalItems.value / normalizedPageSize.value),
    ),
  );
  const startIndex = computed(
    () => (currentPage.value - 1) * normalizedPageSize.value,
  );
  const endIndex = computed(() =>
    Math.min(
      startIndex.value + normalizedPageSize.value,
      normalizedTotalItems.value,
    ),
  );
  const canGoPrevious = computed(() => currentPage.value > 1);
  const canGoNext = computed(
    () => currentPage.value < totalPages.value,
  );

  function goToPage(page: number): void {
    const safePage = Number.isFinite(page) ? Math.floor(page) : 1;
    currentPage.value = Math.min(
      Math.max(safePage, 1),
      totalPages.value,
    );
  }

  function nextPage(): void {
    goToPage(currentPage.value + 1);
  }

  function previousPage(): void {
    goToPage(currentPage.value - 1);
  }

  watch(totalPages, () => {
    goToPage(currentPage.value);
  });

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    canGoPrevious,
    canGoNext,
    nextPage,
    previousPage,
    goToPage,
  };
}
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/useQueryState.ts</span>
  </div>

```ts
import { computed, ref, type ComputedRef, type Ref } from "vue";

export type QueryState = Record<string, string>;

export type QueryStateApi = {
  query: Ref<QueryState>;
  serializedQuery: ComputedRef<string>;
  setQueryParam: (key: string, value: string) => void;
  removeQueryParam: (key: string) => void;
  replaceFromString: (queryString: string) => void;
  reset: () => void;
};

function parseQueryString(queryString: string): QueryState {
  const parameters = new URLSearchParams(queryString);
  return Object.fromEntries(parameters.entries());
}

export function useQueryState(
  initialQuery: QueryState = {},
): QueryStateApi {
  const query = ref<QueryState>({ ...initialQuery });
  const serializedQuery = computed(() => {
    const entries = Object.entries(query.value).filter(
      ([, value]) => value.length > 0,
    );
    return new URLSearchParams(entries).toString();
  });

  function setQueryParam(key: string, value: string): void {
    query.value = { ...query.value, [key]: value };
  }

  function removeQueryParam(key: string): void {
    const nextQuery = { ...query.value };
    delete nextQuery[key];
    query.value = nextQuery;
  }

  function replaceFromString(queryString: string): void {
    query.value = parseQueryString(queryString);
  }

  function reset(): void {
    query.value = { ...initialQuery };
  }

  return {
    query,
    serializedQuery,
    setQueryParam,
    removeQueryParam,
    replaceFromString,
    reset,
  };
}
```

</div>

`useQueryState` 只把 `URLSearchParams` 当local serialization model；它不读写当前route URL。真实route query sync属于后续Router章节。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/useDebouncedRef.ts</span>
  </div>

```ts
import {
  customRef,
  getCurrentScope,
  onScopeDispose,
  type Ref,
} from "vue";

export function useDebouncedRef<T>(
  initialValue: T,
  delay = 300,
): Ref<T> {
  let currentValue = initialValue;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debouncedRef = customRef<T>((track, trigger) => ({
    get() {
      track();
      return currentValue;
    },
    set(nextValue) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        currentValue = nextValue;
        timeoutId = undefined;
        trigger();
      }, Math.max(0, delay));
    },
  }));

  if (getCurrentScope()) {
    onScopeDispose(() => {
      clearTimeout(timeoutId);
    });
  }

  return debouncedRef;
}
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/useAsyncState.ts</span>
  </div>

```ts
import {
  computed,
  ref,
  type ComputedRef,
  type Ref,
} from "vue";

export type AsyncStatus = "idle" | "loading" | "success" | "error";

export type AsyncState<T> = {
  data: Ref<T | null>;
  error: Ref<Error | null>;
  status: Ref<AsyncStatus>;
  loading: ComputedRef<boolean>;
  execute: () => Promise<T | null>;
  reset: () => void;
};

function toError(cause: unknown): Error {
  return cause instanceof Error
    ? cause
    : new Error("Unknown asynchronous operation error");
}

export function useAsyncState<T>(
  operation: () => Promise<T>,
  initialData: T | null = null,
): AsyncState<T> {
  const data = ref(initialData) as Ref<T | null>;
  const error = ref<Error | null>(null);
  const status = ref<AsyncStatus>("idle");
  const loading = computed(() => status.value === "loading");
  let latestRequestId = 0;

  async function execute(): Promise<T | null> {
    const requestId = latestRequestId + 1;
    latestRequestId = requestId;
    status.value = "loading";
    error.value = null;

    try {
      const result = await operation();

      if (requestId !== latestRequestId) {
        return null;
      }

      data.value = result;
      status.value = "success";
      return result;
    } catch (cause: unknown) {
      if (requestId !== latestRequestId) {
        return null;
      }

      error.value = toError(cause);
      status.value = "error";
      return null;
    }
  }

  function reset(): void {
    latestRequestId += 1;
    data.value = initialData;
    error.value = null;
    status.value = "idle";
  }

  return {
    data,
    error,
    status,
    loading,
    execute,
    reset,
  };
}
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/useModal.ts</span>
  </div>

```ts
import { type Ref } from "vue";
import { useToggle } from "./useToggle";

export type ModalState = {
  isOpen: Ref<boolean>;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export function useModal(initiallyOpen = false): ModalState {
  const {
    value: isOpen,
    toggle,
    setTrue: open,
    setFalse: close,
  } = useToggle(initiallyOpen);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/usePermission.ts</span>
  </div>

```ts
import { toValue, type MaybeRefOrGetter } from "vue";

export type PermissionName =
  | "records:read"
  | "records:edit"
  | "records:delete";

export type UserRole = "viewer" | "editor" | "admin";

export type PermissionInput = {
  role: MaybeRefOrGetter<UserRole>;
  permissions: MaybeRefOrGetter<readonly PermissionName[]>;
};

export type PermissionState = {
  can: (permission: PermissionName) => boolean;
  canAny: (permissions: readonly PermissionName[]) => boolean;
  canAll: (permissions: readonly PermissionName[]) => boolean;
};

export function usePermission({
  role,
  permissions,
}: PermissionInput): PermissionState {
  function can(permission: PermissionName): boolean {
    return (
      toValue(role) === "admin" ||
      toValue(permissions).includes(permission)
    );
  }

  function canAny(requiredPermissions: readonly PermissionName[]): boolean {
    return requiredPermissions.some(can);
  }

  function canAll(requiredPermissions: readonly PermissionName[]): boolean {
    return requiredPermissions.every(can);
  }

  return {
    can,
    canAny,
    canAll,
  };
}
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/composables/useFormState.ts</span>
  </div>

```ts
import { ref, type Ref } from "vue";

export type FormValues = Record<string, string>;
export type FormErrors = Partial<Record<string, string>>;
export type TouchedFields<T extends FormValues> = Partial<
  Record<keyof T, boolean>
>;

export type FormState<T extends FormValues> = {
  values: Ref<T>;
  touched: Ref<TouchedFields<T>>;
  errors: Ref<FormErrors>;
  setFieldValue: <Key extends keyof T>(
    field: Key,
    value: T[Key],
  ) => void;
  setFieldTouched: (field: keyof T) => void;
  validateForm: () => boolean;
  reset: () => void;
};

export function useFormState<T extends FormValues>(
  initialValues: T,
  validate: (values: T) => FormErrors = () => ({}),
): FormState<T> {
  const values = ref({ ...initialValues }) as Ref<T>;
  const touched = ref<TouchedFields<T>>({});
  const errors = ref<FormErrors>({});

  function setFieldValue<Key extends keyof T>(
    field: Key,
    value: T[Key],
  ): void {
    values.value[field] = value;
  }

  function setFieldTouched(field: keyof T): void {
    touched.value[field] = true;
  }

  function validateForm(): boolean {
    const nextErrors = validate(values.value);
    errors.value = nextErrors;
    return Object.keys(nextErrors).length === 0;
  }

  function reset(): void {
    values.value = { ...initialValues };
    touched.value = {};
    errors.value = {};
  }

  return {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    validateForm,
    reset,
  };
}
```

</div>

这些core files分别约束single concern：pagination不拥有records，query state不拥有route，permission不提供security，form state不render controls，modal不render dialog，async state不决定transport。

### 12.4 Final demo 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-04-composables-architecture/demos/ComposablesKitDemo.vue</span>
  </div>

```vue
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import BaseModal from "../../chapter-03-component-communication/component-library-lab/BaseModal.vue";
import { useAsyncState } from "../composables/useAsyncState";
import { useDebouncedRef } from "../composables/useDebouncedRef";
import {
  useFormState,
  type FormErrors,
} from "../composables/useFormState";
import { useModal } from "../composables/useModal";
import { usePagination } from "../composables/usePagination";
import {
  usePermission,
  type PermissionName,
  type UserRole,
} from "../composables/usePermission";
import { useQueryState } from "../composables/useQueryState";

type DemoRecord = {
  id: number;
  name: string;
  category: "component" | "reactivity" | "tooling";
};

type DemoFormValues = {
  name: string;
  email: string;
};

const records: DemoRecord[] = [
  { id: 1, name: "Props boundary", category: "component" },
  { id: 2, name: "Emit payload", category: "component" },
  { id: 3, name: "Scoped slots", category: "component" },
  { id: 4, name: "Reactive refs", category: "reactivity" },
  { id: 5, name: "Computed values", category: "reactivity" },
  { id: 6, name: "Watch cleanup", category: "reactivity" },
  { id: 7, name: "Effect scopes", category: "reactivity" },
  { id: 8, name: "SFC compiler", category: "tooling" },
  { id: 9, name: "Vite module graph", category: "tooling" },
  { id: 10, name: "vue-tsc diagnostics", category: "tooling" },
];

const searchQuery = useDebouncedRef("", 300);
const {
  query,
  serializedQuery,
  setQueryParam,
  reset: resetQuery,
} = useQueryState({ category: "all" });

const filteredRecords = computed(() => {
  const normalizedSearch = searchQuery.value.trim().toLowerCase();
  const selectedCategory = query.value.category ?? "all";

  return records.filter((record) => {
    const matchesSearch = record.name
      .toLowerCase()
      .includes(normalizedSearch);
    const matchesCategory =
      selectedCategory === "all" ||
      record.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
});

const {
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  canGoPrevious,
  canGoNext,
  previousPage,
  nextPage,
  goToPage,
} = usePagination({
  totalItems: () => filteredRecords.value.length,
  pageSize: 3,
});

const visibleRecords = computed(() =>
  filteredRecords.value.slice(startIndex.value, endIndex.value),
);

watch(
  [searchQuery, () => query.value.category],
  () => {
    goToPage(1);
  },
);

const { isOpen, open, close } = useModal();

const role = ref<UserRole>("editor");
const permissions = ref<PermissionName[]>([
  "records:read",
  "records:edit",
]);
const { can, canAny, canAll } = usePermission({
  role,
  permissions,
});

function validateForm(values: DemoFormValues): FormErrors {
  const nextErrors: FormErrors = {};

  if (values.name.trim().length < 2) {
    nextErrors.name = "Name must contain at least two characters.";
  }

  if (!values.email.includes("@")) {
    nextErrors.email = "Email must contain an at sign.";
  }

  return nextErrors;
}

const {
  values,
  touched,
  errors,
  setFieldValue,
  setFieldTouched,
  validateForm: validateCurrentForm,
  reset: resetForm,
} = useFormState<DemoFormValues>(
  {
    name: "",
    email: "",
  },
  validateForm,
);

const formStatus = ref("Form has not been submitted.");

function updateFormField(
  field: keyof DemoFormValues,
  event: Event,
): void {
  const input = event.currentTarget;

  if (input instanceof HTMLInputElement) {
    setFieldValue(field, input.value);
  }
}

function submitForm(): void {
  setFieldTouched("name");
  setFieldTouched("email");
  formStatus.value = validateCurrentForm()
    ? `Saved ${values.value.name}.`
    : "Fix validation errors before saving.";
}

function wait(duration: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

const {
  data: resourceSummary,
  error: resourceError,
  status: resourceStatus,
  execute: loadResource,
} = useAsyncState(async () => {
  await wait(350);
  return `${filteredRecords.value.length} local records are available.`;
});

function updateCategory(event: Event): void {
  const select = event.currentTarget;

  if (select instanceof HTMLSelectElement) {
    setQueryParam("category", select.value);
  }
}
</script>

<template>
  <section class="kit" aria-labelledby="composables-kit-title">
    <header>
      <p class="topic">Final integration</p>
      <h3 id="composables-kit-title">Vue Composables Kit</h3>
      <p>
        Components keep rendering responsibility while composables own
        reusable state transitions, derived values, and resource lifecycles.
      </p>
    </header>

    <div class="control-grid">
      <label>
        Debounced search
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search local records"
        />
      </label>

      <label>
        Query category
        <select
          :value="query.category"
          @change="updateCategory"
        >
          <option value="all">All</option>
          <option value="component">Component</option>
          <option value="reactivity">Reactivity</option>
          <option value="tooling">Tooling</option>
        </select>
      </label>
    </div>

    <p>Serialized query: {{ serializedQuery || "(empty)" }}</p>
    <button type="button" @click="resetQuery">Reset query state</button>

    <ul class="record-list">
      <li v-for="record in visibleRecords" :key="record.id">
        <strong>{{ record.name }}</strong>
        <span>{{ record.category }}</span>
      </li>
    </ul>

    <div class="pagination">
      <button
        type="button"
        :disabled="!canGoPrevious"
        @click="previousPage"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button type="button" :disabled="!canGoNext" @click="nextPage">
        Next
      </button>
    </div>

    <section class="panel">
      <h4>Permission display logic</h4>
      <label>
        Current role
        <select v-model="role">
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <p>Can edit: {{ can("records:edit") }}</p>
      <p>
        Can read or delete:
        {{ canAny(["records:read", "records:delete"]) }}
      </p>
      <p>
        Can read and delete:
        {{ canAll(["records:read", "records:delete"]) }}
      </p>
    </section>

    <section class="panel">
      <h4>Form state</h4>
      <label>
        Name
        <input
          :value="values.name"
          type="text"
          @input="updateFormField('name', $event)"
          @blur="setFieldTouched('name')"
        />
      </label>
      <p v-if="touched.name && errors.name" class="error">
        {{ errors.name }}
      </p>
      <label>
        Email
        <input
          :value="values.email"
          type="email"
          @input="updateFormField('email', $event)"
          @blur="setFieldTouched('email')"
        />
      </label>
      <p v-if="touched.email && errors.email" class="error">
        {{ errors.email }}
      </p>
      <div class="actions">
        <button type="button" @click="submitForm">Validate form</button>
        <button type="button" @click="resetForm">Reset form</button>
      </div>
      <p>{{ formStatus }}</p>
    </section>

    <section class="panel">
      <h4>Async resource state</h4>
      <p>Status: {{ resourceStatus }}</p>
      <p v-if="resourceSummary">{{ resourceSummary }}</p>
      <p v-if="resourceError" class="error">
        {{ resourceError.message }}
      </p>
      <button type="button" @click="loadResource">
        Load local summary
      </button>
    </section>

    <button type="button" class="modal-action" @click="open">
      Open modal through useModal
    </button>

    <BaseModal v-model="isOpen">
      <template #header>
        <h4 id="library-modal-title">Logic extracted from the component</h4>
      </template>
      <p>
        BaseModal still owns rendering and model communication.
        useModal owns reusable open, close, and toggle transitions.
      </p>
      <template #footer>
        <button type="button" @click="close">Close</button>
      </template>
    </BaseModal>
  </section>
</template>

<style scoped>
.kit {
  display: grid;
  gap: 1rem;
  padding: 1.4rem;
  border: 2px solid #72977e;
  border-radius: 1rem;
  background: #f5faf6;
}

.topic {
  margin: 0;
  color: #286c45;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.5rem;
}

h4 {
  margin: 0 0 0.65rem;
}

.control-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}

label {
  display: grid;
  gap: 0.35rem;
  font-weight: 700;
}

input,
select {
  width: 100%;
  padding: 0.55rem;
  border: 1px solid #88a591;
  border-radius: 0.4rem;
  background: #ffffff;
}

button {
  width: fit-content;
  padding: 0.48rem 0.7rem;
  border: 1px solid #568567;
  border-radius: 0.42rem;
  background: #ffffff;
  color: #285b3a;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.record-list {
  display: grid;
  gap: 0.45rem;
  min-height: 8rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.record-list li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.65rem;
  border-radius: 0.45rem;
  background: #ffffff;
}

.pagination,
.actions {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.panel {
  padding: 1rem;
  border: 1px solid #c9d9cd;
  border-radius: 0.65rem;
  background: #ffffff;
}

.panel label + p {
  margin-bottom: 0.35rem;
}

.error {
  color: #b42318;
}

.modal-action {
  background: #2f7048;
  color: #ffffff;
}
</style>
```

</div>

### 12.5 运行方式与预期结果

运行 `npm run dev` 后：

1. search input使用customRef，record list在300ms后更新。
2. category change更新local QueryState与serialized string，不修改browser route。
3. filter结果数量通过getter进入pagination，page boundary自动clamp。
4. role change立即改变`can/canAny/canAll`显示；这只是client UI logic。
5. invalid form显示errors；valid form更新status；reset恢复initial values。
6. local async summary显示idle/loading/success，未发network request。
7. `useModal` ref通过Chapter 03 BaseModal model contract控制dialog。

### 12.6 API、输入、返回值与 state ownership maps

**Composable API map**

| Composable | Input | Return | Primary owner |
| --- | --- | --- | --- |
| usePagination | total/page-size plain/ref/getter | page/index/guards/actions | caller instance |
| useQueryState | initial QueryState | query/serialized/actions | caller instance |
| useDebouncedRef | initial value/delay | Ref | caller instance |
| useAsyncState | Promise factory/initial data | data/error/status/loading/execute/reset | caller instance |
| useModal | initial boolean | isOpen/open/close/toggle | caller instance |
| usePermission | role/permissions plain/ref/getter | can/canAny/canAll | inputs remain caller-owned |
| useFormState | initial values/validator | values/touched/errors/actions | caller instance |

**Input map**

| Input style | Example | Tracking rule |
| --- | --- | --- |
| plain | `pageSize: 3` | fixed unless caller reinvokes |
| Ref | `role` | functions read current `.value` through `toValue` |
| getter | `() => filteredRecords.value.length` | call inside computed/effect to track |
| callback | async operation / validator | invoked at explicit transition |

**Return map**

| Return category | Examples | Mutation policy |
| --- | --- | --- |
| mutable refs | isOpen、query、values | caller/component inputs may write or use actions |
| computed refs | totalPages、serializedQuery、loading | readonly derived state |
| actions | goToPage、execute、close、reset | stable named mutation surface |
| predicates | can、canAny、canAll | read current inputs, no hidden write |

**State ownership map**

| State | Owner | Dependent readers | Writer |
| --- | --- | --- | --- |
| records | final demo | filteredRecords | static demo |
| searchQuery | useDebouncedRef call | filteredRecords/template | input model |
| query | useQueryState call | filter/serialized/template | query actions |
| currentPage | usePagination call | visible slice/template | pagination actions/watch clamp |
| async refs | useAsyncState call | resource panel | execute/reset |
| isOpen | useModal call | BaseModal | open/close/model |
| role/permissions | final demo | permission predicates/template | select/demo initialization |
| form refs | useFormState call | form panel | field/validate/reset actions |

### 12.7 Cleanup、async、shared state 与 resource lifecycle maps

**Cleanup map**

| Resource/effect | Registration | Cleanup |
| --- | --- | --- |
| search→page watch | component setup scope | automatic scope stop |
| debounce timeout | customRef setter | next setter or `onScopeDispose` |
| async stale result | execute request id | newer execute/reset invalidates commit |
| final kit | no DOM listener/interval | no extra browser resource |

**Async state map**

| Phase | status | data | error | Commit rule |
| --- | --- | --- | --- | --- |
| initial/reset | idle | initial/null | null | reset increments latest id |
| execute | loading | previous value | null | assign new id |
| latest resolve | success | result | null | id must equal latest |
| latest reject | error | previous value | Error | id must equal latest |
| stale settle | unchanged | unchanged | unchanged | return null |

**Shared vs per-instance map**

所有final kit composables都在`ComposablesKitDemo` setup中创建state，因此每个component instance独立。只有`SharedVsPerInstanceDemo.vue`的`sharedCount`位于module scope，且名称明确标注`DeliberatelyShared`。本章未把composables作为hidden global store。

**Resource lifecycle map**

| Boundary | Acquire | Active use | Release |
| --- | --- | --- | --- |
| component scope | setup | refs/computeds/watch | unmount scope stop |
| debounce timer | custom setter | pending delay | replace/disable scope |
| async operation | execute | pending Promise | stale commit invalidation |
| manual ticker scope | start | interval + watchEffect | stop/unmount |
| DOM listener demo | mounted | pointer events | scope dispose |

### 12.8 常见错误与扩展任务

Final kit最常见失败是：把query误写入browser route、把permission当security、把form markup移进composable、让pagination mutate records、让async older result覆盖newer result。

安全扩展：

- 给useQueryState增加allowed-key parser，但仍不接Router。
- 给useFormState增加per-field validator map，不引入form library。
- 给useAsyncState增加AbortSignal adapter，但保留request-id fallback。
- 为composables设计未来test cases；本章不创建test framework/files。

Chapter 05将深入Vue + TypeScript boundaries；本章不提前扩展成generics/type utilities专题。

## 13. 额外速查表

### 一句话结论

Composable是调用Vue Composition API封装stateful logic的JavaScript function；它应有explicit inputs、plain object of refs/functions output，以及与owner scope匹配的cleanup。

### 概念与边界

| Concept | 最短结论 | Runtime / architecture boundary |
| --- | --- | --- |
| composable | encapsulates reusable stateful logic | 仍是普通function |
| ordinary utility function | input→immediate output | 通常无ref/effect/lifecycle |
| stateful logic | state随时间/事件改变 | 需要owner/lifetime |
| useXxx naming | camelCase + `use` convention | 无runtime magic |
| setup | per-instance initialization function | returned bindings供template |
| script setup | compile-time setup sugar | 每instance执行 |
| active component instance | current hook/effect owner | setup同步context |
| per-instance state | ref在function body创建 | 每call独立 |
| module-scope shared state | ref在module body创建 | module lifetime共享 |
| plain object of refs | recommended return | destructure保持ref identity |
| reactive return object | proxy container | primitive destructure断连接 |
| ref return | explicit mutable source | `.value` in script |
| computed return | readonly derived source | cached by dependencies |
| watch inside composable | explicit side effect source | owner scope disposal |
| watchEffect inside composable | implicit synchronous reads | dependency可能过宽 |
| onMounted | post-DOM acquire | component instance required |
| onUnmounted | component teardown callback | component-coupled |
| onScopeDispose | effect scope teardown | reusable cleanup |
| effectScope | group effects | manual stop |
| customRef | custom track/trigger | getter/setter contract |
| track | subscribe active effect | usually custom get |
| trigger | notify subscribers | after actual commit |
| toValue | value/ref/getter normalize | getter is invoked |
| unref | value/ref normalize | function stays function |
| MaybeRef | value or Ref type | static only |
| MaybeRefOrGetter | value/ref/getter type | static only |
| cleanup | release resource/effect | must pair with acquire |
| browser side effect | storage/listener/DOM/timer | runtime availability |
| async loading/error/data | explicit Promise state | error is runtime |
| stale Promise result | old request settles late | require commit policy |
| localStorage | string persistence API | parse is not validation |
| template ref input | caller supplies element | null before/after mount |
| DOM event listener | EventTarget resource | same identity to remove |
| over-abstraction | indirection exceeds benefit | keep local until concern clear |

### 相似概念对比

| Question | Option A | Option B | Decision rule |
| --- | --- | --- | --- |
| utility or composable | stateless function | Vue stateful function | 是否管理ref/effect/lifetime |
| per-call or shared | function-body ref | module-body ref | 是否应跨instances共享 |
| computed or watch | pure derived | side effect | 是否需要write/external effect |
| onUnmounted or onScopeDispose | component hook | scope callback | cleanup是否应脱离component名称 |
| unref or toValue | unwrap Ref | unwrap Ref + invoke getter | input是否允许getter |
| component or composable | visual/render contract | logic contract | 是否复用UI结构 |

### 常见 error types

| Signal | Likely cause | First check |
| --- | --- | --- |
| no active component warning | late/conditional lifecycle composable call | call site timing |
| state leaks across instances | accidental module ref | creation location |
| ref input does not update | toValue outside tracking effect | normalization location |
| duplicate browser callbacks | missing/incorrect cleanup identity | add/remove pair |
| old async result appears | missing stale guard | request id/abort |
| destructured value freezes | reactive object property snapshot | return refs/toRefs |

### 最小代码模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: minimal-composable.ts</span>
  </div>

```ts
import { computed, ref, type ComputedRef, type Ref } from "vue";

type FeatureState = {
  value: Ref<number>;
  doubled: ComputedRef<number>;
  increment: () => void;
};

export function useFeature(initialValue = 0): FeatureState {
  const value = ref(initialValue);
  const doubled = computed(() => value.value * 2);

  function increment(): void {
    value.value += 1;
  }

  return { value, doubled, increment };
}
```

</div>

复制前先判断是否真的有stateful concern、复用或独立lifecycle收益。

## 14. 真实项目判断模型

| 要抽取的逻辑 | 应使用 composable | 不应使用 composable | 工作证据 | 风险信号 / 后续 owner |
| --- | --- | --- | --- | --- |
| 多组件复用的局部 state transition | `useCounter`、`useToggle`、`usePagination` 这类 per-call factory | 只有一个组件使用且抽取后更难读 | 每次调用 state 隔离，return surface 小而稳定 | 到处传入大对象 config；考虑保留在 component |
| Browser resource | `useEventListener`、`useClickOutside`、`useLocalStorage` | 没有 cleanup 策略或运行环境不一定有 `window` | unmount 后 listener/timer/storage watch 停止 | resource 泄漏；SSR/client-only 边界交给 Nuxt chapters |
| Async request orchestration | `useAsyncState` 处理 loading/error/stale result | 需要跨页面 server cache、dedupe、revalidation policy | 旧 Promise 不能覆盖新结果，cancel/error 可观察 | 变成 API cache；Chapter 09 或未来 cache layer 接管 |
| 输入兼容性 | `MaybeRefOrGetter` + `toValue` 在 tracking callback 内读取 | 只为炫技接受所有输入形态 | plain/ref/getter 都能触发预期更新 | caller 不知道何时被追踪，API 过宽 |
| Global client state | 仅抽取无全局 owner 的行为 | auth/theme/cart/sidebar 等跨页面唯一状态 | 无需跨页面共享或持久化 | module-scope shared ref 出现；Chapter 07 Pinia 接管 |

## 15. 如何转换成个人笔记

每个composable保留六项：caller、creation location、reactive sources、dependent effects、trigger、cleanup。再补input/return contract和一个wrong case。已经熟练的template markup可删，但不要删除stale result、module scope、tracking context、runtime validation等边界。

## 16. 必须能回答的问题

1. composable与普通function有什么区别？——composable用Composition API封装stateful logic；普通utility通常立即input→output。
2. 为什么能复用reactive logic？——function每call创建/组合refs/effects/closures，并返回explicit surface。
3. 什么时候能用lifecycle hooks？——通常在setup/script setup同步调用且有active instance时注册。
4. shared与per-instance差别？——ref创建在module body还是function body。
5. 为什么不应绑定specific page structure？——会让logic无法在其他component/layout独立使用。
6. 为什么return plain object of refs？——destructure仍保留ref identity/reactivity。
7. `onScopeDispose`与`onUnmounted`差别？——前者绑定effect scope，后者绑定component lifecycle。
8. effectScope stop什么？——scope.run内captured computed/watch/watchEffect及scope dispose callbacks。
9. customRef为何需要track/trigger？——前者建立dependency，后者在实际commit时通知。
10. toValue为何放effect内？——getter/ref read只有在active tracking context执行才形成dependency。
11. async stale result如何发生？——older Promise later resolves；必须用id/abort决定commit owner。
12. usePermission为何不是security？——browser UI predicate可绕过，server仍必须authorize。

## 17. 最终记忆模型

先判断要复用的是visual structure还是stateful logic：

- visual structure、props、emits、slots：component。
- refs、derived state、transitions、watchers、resources：composable。
- immediate pure transformation：ordinary utility。

然后追踪：

**component setup caller → composable invocation → per-call/module source creation → effect reads → returned refs/actions → event/mutation/Promise/resource trigger → computed/watch/render update → scope stop/unmount cleanup**。

creation location决定state lifetime；effect creation location决定disposal owner；toValue execution location决定dependency tracking；Promise identity决定谁能commit；TypeScript只描述static contract，不验证JSON、user input、DOM、permission或async runtime。

## 18. 官方文档阅读清单

本章写作时已核对以下当前官方Vue页面：

1. [Composables](https://vuejs.org/guide/reusability/composables.html)
2. [Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
3. [Reactivity API: Core](https://vuejs.org/api/reactivity-core.html)
4. [Reactivity API: Utilities](https://vuejs.org/api/reactivity-utilities.html)
5. [Reactivity API: Advanced](https://vuejs.org/api/reactivity-advanced.html)
6. [Composition API: Lifecycle Hooks](https://vuejs.org/api/composition-api-lifecycle.html)
7. [`<script setup>`](https://vuejs.org/api/sfc-script-setup.html)
8. [TypeScript with Composition API](https://vuejs.org/guide/typescript/composition-api.html)

重点核对结论：official composable定义与`use` naming；plain object of refs return convention；synchronous setup/active instance restriction；toValue在tracking context使用；customRef track/trigger与new-object getter caveat；effectScope capture；onScopeDispose scope relation；mounted/unmounted resource guidance。当前项目Vue 3.5.39支持本章使用的APIs。
