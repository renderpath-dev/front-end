# Vue 第 2 章：Reactivity System 与 Update Mechanism

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
  - [9.1 ref：value container、script .value 与 template 自动解包](#section-9-1)
  - [9.2 reactive：Proxy object、property-level tracking 与 replacement boundary](#section-9-2)
  - [9.3 ref vs reactive：primitive、object、array、replacement、TypeScript 推断边界](#section-9-3)
  - [9.4 computed vs method：cached derived state、dependency tracking 与 pure getter](#section-9-4)
  - [9.5 watch：显式 source、old value、new value 与 external side effect boundary](#section-9-5)
  - [9.6 watchEffect：自动依赖收集、执行时机与误用边界](#section-9-6)
  - [9.7 nextTick：DOM patch timing、microtask 与更新后读取 DOM](#section-9-7)
  - [9.8 reactive destructuring mistake：为什么解构会丢失响应式连接](#section-9-8)
  - [9.9 toRef、toRefs、unref：保持响应式连接与统一读取 ref-like value](#section-9-9)
  - [9.10 readonly 与 shallowRef：只读边界、浅层追踪与 large object update](#section-9-10)
  - [9.11 Proxy mental model：get/set trap、Reflect、track、trigger、effect](#section-9-11)
  - [9.12 Chapter integration：VueReactivityLab 如何把响应式机制串起来](#section-9-12)
  - [9.13 From Chapter 01 to Chapter 02：把 TaskBoardBasic 的普通过滤函数升级为 computed](#section-9-13)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标](#121-项目目标)
  - [12.2 文件结构与职责](#122-文件结构与职责)
  - [12.3 完整代码](#123-完整代码)
  - [12.4 运行命令与预期行为](#124-运行命令与预期行为)
  - [12.5 执行流与状态所有权](#125-执行流与状态所有权)
  - [12.6 响应式与 computed 依赖图](#126-响应式与-computed-依赖图)
  - [12.7 watch、watchEffect 与 nextTick 边界](#127-watchwatcheffect-与-nexttick-边界)
  - [12.8 常见错误与扩展任务](#128-常见错误与扩展任务)
- [13. 额外速查表](#13-额外速查表)
- [14. 最终文件清单](#14-最终文件清单)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标 | 对应文件 | 类型 | 所在章节 |
| --- | --- | --- | --- |
| 组合并展示第 2 章全部练习 | `src/learning/vue/chapter-02-reactivity-system/ReactivityChapterApp.vue` | 真实章节组件 | 7、9.12 |
| 对比 primitive ref、object ref 与 reactive proxy | `src/learning/vue/chapter-02-reactivity-system/RefVsReactive.vue` | 真实练习组件 | 9.1、9.2、9.3 |
| 对比 template method 与 cached computed ref | `src/learning/vue/chapter-02-reactivity-system/ComputedVsMethod.vue` | 真实练习组件 | 9.4、9.13 |
| 观察显式 watch source 与 old/new value | `src/learning/vue/chapter-02-reactivity-system/WatchBasic.vue` | 真实练习组件 | 9.5 |
| 观察 watchEffect 的同步自动依赖收集 | `src/learning/vue/chapter-02-reactivity-system/WatchEffectDemo.vue` | 真实练习组件 | 9.6 |
| 在 DOM patch 后读取 element height | `src/learning/vue/chapter-02-reactivity-system/NextTickDom.vue` | 真实练习组件 | 9.7 |
| 观察 primitive destructuring 断开连接 | `src/learning/vue/chapter-02-reactivity-system/ReactiveDestructureMistake.vue` | 真实练习组件 | 9.8 |
| 观察 shallowRef 的 root replacement boundary | `src/learning/vue/chapter-02-reactivity-system/ShallowRefDemo.vue` | 真实练习组件 | 9.10 |
| 使用 toRef / toRefs 保持 property connection | `src/learning/vue/chapter-02-reactivity-system/ToRefToRefsDemo.vue` | 真实练习组件 | 9.9 |
| 区分 readonly write surface 与 unref normalized read | `src/learning/vue/chapter-02-reactivity-system/ReadonlyUnrefDemo.vue` | 真实练习组件 | 9.9、9.10 |
| 用原生 Proxy 建立简化 track/trigger 心智模型 | `src/learning/vue/chapter-02-reactivity-system/ProxyTrackTriggerMentalModel.vue` | 真实练习组件 | 9.11 |
| 整合购物车响应式依赖与 DOM timing | `src/learning/vue/chapter-02-reactivity-system/VueReactivityLab.vue` | 真实最终项目组件 | 9.12、12 |
| 保留第 1 章并挂载第 2 章 | `src/learning/vue/chapter-01-application-boundary/App.vue` | 真实 root component | 7、9.12 |
| 对照普通过滤函数 | `src/learning/vue/chapter-01-application-boundary/TaskBoardBasic.vue` | 第 1 章既有组件 | 9.13 |

## 0. 文件定位

本章指南位于：

- `docs/vue/chapter-02-reactivity-system/vue-chapter-02-learning-guide.md`

可运行练习位于：

- `src/learning/vue/chapter-02-reactivity-system/`

应用仍从第 1 章已有的 `main.ts` 启动。`src/learning/vue/chapter-01-application-boundary/App.vue` 保留第 1 章全部组件，并在清晰分隔线后 render `ReactivityChapterApp.vue`。这意味着本章没有创建第二个 application instance，也没有改变 `createApp(...).mount(...)` 边界。

## 1. 本章解决的问题

第 1 章已经证明：template 读取 `count`，event handler 写 `count.value`，DOM 会变化。但“Vue 会更新”仍缺少机制：

1. 普通局部变量的读取不能被 JavaScript 自动拦截，`ref` 为什么要提供 `.value`？
2. `reactive()` 返回的 Proxy 如何把某个 property read 与当前 reactive effect 连接？
3. `computed` 为什么可以缓存，而 template method 为什么随 render 再执行？
4. `watch`、`watchEffect` 和 computed 都能读取响应式值，为什么用途不同？
5. state mutation 发生后，DOM 为什么不是同步完成 patch？
6. 为什么从 reactive object 解构 primitive property 会得到不再更新的快照？
7. `readonly`、`shallowRef`、`toRef`、`toRefs`、`unref` 分别解决哪一种边界，而不是互相替代？

本章把 UI 更新表示为一条可验证链：**读取 reactive source → 当前 effect 订阅 dependency → mutation 触发 dependency → computed invalidation / watcher callback / component render effect 被调度 → render 产生新 virtual DOM → Vue patch 真实 DOM**。

## 2. 前置概念

| 前置概念 | 需要理解到什么程度 | 本章用途 |
| --- | --- | --- |
| JavaScript object / property | 区分 object identity、property read、property write | 理解 Proxy 的 target/key 粒度 |
| getter / setter | 知道 property access 可执行函数 | 理解 ref `.value` 的 track/trigger 入口 |
| Proxy / Reflect | 知道 Proxy trap 拦截 operation，Reflect 转发默认语义 | 建立 reactive mental model |
| closure | function 可捕获 ref/proxy binding | 理解 computed getter、watcher callback |
| array methods | 理解 `reduce`、`filter`、`find` 与 object reference | 追踪 cart 与 task derived state |
| Promise / microtask | 理解 `await` 会让出当前同步执行 | 理解 `nextTick()` 的等待边界 |
| DOM measurement | `offsetHeight` 读取当前已 patch layout | 比较 state 已变与 DOM 尚未更新 |
| TypeScript static checking | 类型只在开发/build 阶段提供诊断 | 区分 `Ref<T>` 与运行时数据验证 |
| 第 1 章 SFC 边界 | template 被编译，script setup binding 对 template 可见 | 确定 dependency read 发生在 render |

## 3. 学习目标

完成本章后，应能：

- 解释 `ref()` 返回的 value container、`.value` getter/setter 与 template top-level unwrapping。
- 解释 `reactive()` 返回 Proxy、为什么 property read 是依赖粒度，以及 whole-object replacement 为什么有连接风险。
- 为 primitive、object、array、可整体替换状态选择 `ref` 或 `reactive`。
- 用 `computed` 表达 pure derived state，并解释 cache invalidation。
- 用 `watch` 表达显式 source 的 side effect，用 `watchEffect` 表达同步读取自动收集的 effect。
- 在 state mutation 后使用 `await nextTick()` 读取已更新 DOM，同时不把它误认为网络等待。
- 识别 reactive destructuring bug，并用 direct property access、`toRef` 或 `toRefs` 保持连接。
- 解释 `readonly`、`shallowRef` 与 `unref` 的实际保护/追踪/读取边界。
- 用简化 Proxy demo 解释 `get → track`、`set → trigger`，并明确它不是 Vue source code。
- 区分 JavaScript runtime、Vue runtime、TypeScript、SFC compiler、Vite tooling 与 browser DOM 的职责。

## 4. 推荐学习顺序

1. 先运行 `RefVsReactive.vue`，确认 script `.value`、template unwrapping 和 Proxy property mutation。
2. 再运行 `ComputedVsMethod.vue`，观察 unrelated render 只增加 method call，不使 cached computed getter重新求值。
3. 分别运行 `WatchBasic.vue` 与 `WatchEffectDemo.vue`，比较 explicit source 和 implicit synchronous dependencies。
4. 运行 `NextTickDom.vue`，把 mutation time 与 DOM patch time 分开。
5. 运行 destructuring、toRef/toRefs、readonly/unref、shallowRef 三组边界练习。
6. 用 `ProxyTrackTriggerMentalModel.vue` 补齐 JavaScript interception vocabulary，但始终回到 Vue reactive effect。
7. 最后运行 `VueReactivityLab.vue`，从一次 cart quantity click 追踪到 computed、watchEffect、render effect 和 DOM measurement。

## 5. 核心术语表

| Concept | Layer | 本章中的具体含义 | 常见误解 |
| --- | --- | --- | --- |
| Reactive source | Vue reactivity | ref `.value`、reactive proxy property、computed ref 等可被追踪来源 | 任意 JavaScript 变量都会自动响应 |
| Reactive effect | Vue reactivity | 运行时读取 source 并被登记为 subscriber 的执行单元 | 所有普通 function 都自动成为 effect |
| Render effect | Vue runtime | 每个 component instance 用于 render/update DOM 的 reactive effect | 等于重新加载整个页面 |
| Dependency | Vue reactivity | source/property 与 subscriber effect 的关系 | 只是 import dependency |
| `track` | 概念 / Vue internals | 读取时把 active effect 登记到 target/key subscriber set | 用户业务代码必须手动调用 |
| `trigger` | 概念 / Vue internals | 写入时找到 target/key subscribers 并通知更新 | 立即同步 patch 全部 DOM |
| `ref` | Vue reactivity | 有 reactive `.value` property 的 value container | 只适合 primitive |
| `reactive` | Vue reactivity | object 的 deep reactive Proxy | 可以像 ref 一样安全替换整个 binding |
| `computed` | Vue reactivity | 用 pure getter 派生的 cached computed ref | watch 的简写 |
| `watch` | Vue reactivity | 显式 source 变化后执行 callback | 用于所有派生显示值 |
| `watchEffect` | Vue reactivity | 立即执行并收集同步 reactive reads 的 effect | 会自动收集 `await` 后的所有读取 |
| `nextTick` | Vue scheduler / DOM | 等待当前 pending DOM update flush 的 Promise | 通用 delay 或 network wait |
| `readonly` | Vue reactivity | 拦截通过 readonly proxy 的 write | 深度业务不可变或安全隔离 |
| `shallowRef` | Vue reactivity | 只让 `.value` access reactive，不深度转换 inner value | nested mutation 和 root replacement 同样 trigger |
| `toRef` / `toRefs` | Vue utilities | 建立到 reactive object property 的 ref connection | 对 primitive snapshot 再调用 `ref` 就等价 |
| `unref` | Vue utilities | ref 则读 `.value`，普通值则原样返回 | 创建新的响应式状态 |
| Reactivity Transform | 编译期实验边界 | Vue 响应式主体仍是 runtime；该实验方向未成为当前默认模型 | 当前 SFC 会自动删除 script 中所有 `.value` |

## 6. 底层心智模型

先把一次 quantity click 拆成七个阶段：

1. **JavaScript operation**：event handler 修改 `item.quantity` 或 `count.value`。
2. **Interception**：reactive object 经 Proxy `set`，ref 经 `.value` setter。
3. **Trigger lookup**：Vue 找到曾读取该 target/key 的 subscribers。
4. **Derived invalidation**：依赖这个 property 的 computed ref 先被标记需要重新计算。
5. **Effect scheduling**：watcher、watchEffect 或 component render effect 根据自己的 flush timing 进入队列；多次 mutation 可被批处理。
6. **Render and patch**：component render effect 重新读取必要 source，产生新的 virtual DOM，Vue patch 最小必要真实 DOM。
7. **Post-mutation observation**：同步代码此时可能仍看到旧 DOM；`await nextTick()` 后可读取本轮 pending patch 的结果。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: reactive update chain</span>
  </div>

```txt
user action
  -> JavaScript handler
  -> ref setter or Proxy set trap
  -> trigger subscribers
  -> invalidate computed dependencies
  -> schedule reactive effects
  -> run component render effect
  -> patch DOM
  -> resolve nextTick
```
</div>

官方文档的 `track` / `trigger` pseudo-code 是解释模型，不是完整实现。真实 Vue 还处理 nested proxies、collections、computed invalidation、effect cleanup、scheduler、batching 和 renderer。`ProxyTrackTriggerMentalModel.vue` 也遵守同一限制。

## 7. 推荐目录结构

以下均为本章完成后的真实路径：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Chapter 02 real file structure</span>
  </div>

```txt
docs/
  vue/
    chapter-02-reactivity-system/
      vue-chapter-02-learning-guide.md
src/
  learning/
    vue/
      chapter-01-application-boundary/
        App.vue
        TaskBoardBasic.vue
      chapter-02-reactivity-system/
        ReactivityChapterApp.vue
        RefVsReactive.vue
        ComputedVsMethod.vue
        WatchBasic.vue
        WatchEffectDemo.vue
        NextTickDom.vue
        ReactiveDestructureMistake.vue
        ShallowRefDemo.vue
        ToRefToRefsDemo.vue
        ReadonlyUnrefDemo.vue
        ProxyTrackTriggerMentalModel.vue
        VueReactivityLab.vue
```
</div>

`ReactivityChapterApp.vue` 只负责组件组合，不上提各 demo 的 local state。每个单概念组件拥有自己的 source、operation 和可观察结果；`VueReactivityLab.vue` 最后才整合这些机制。

## 8. 示例运行方式

启动已有 Vite dev server：

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

执行 Vue SFC command-line type checking：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run typecheck
```
</div>

执行 typecheck 并生成 production bundle：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run build
```
</div>

Vite dev server 和 bundler 执行 transpilation / module processing，不等于完整 type checking；本项目由 `vue-tsc --noEmit` 检查 `.ts` 与 `.vue` type graph。

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 ref：value container、script `.value` 与 template 自动解包

**结论：**

`ref(initialValue)` 返回一个保持 identity 的 ref object；script 通过 reactive `.value` property 读写 inner value，template 对 render context 中的 top-level ref 提供自动解包。

**本节解决的问题：**

`const count = ref(0)` 后，`count` 不是 number，而是 value container。若 script 直接写 `count += 1`，既尝试替换 `const` binding，又绕开 `.value` setter；正确 mutation 是 `count.value += 1`。

**技术意义：**

JavaScript 无法拦截 local number variable 的普通读取/赋值。把 value 放进 object property 后，Vue 可以在 `.value` getter 中 track、在 setter 中 trigger；ref 也能被传给其他 function 而保留最新值和响应式连接。

**概念解释：**

`RefVsReactive.vue` 中 `count` 保存 number，`profileRef` 保存 object。`profileRef.value = newProfile` 更换 inner object，但 `profileRef` binding 仍指向同一个 ref container。template 的 `{{ count }}`、`profileRef.name` 使用 top-level unwrapping；这个便利不表示 script 也能省略 `.value`，也不表示任意 nested ref expression都会同样解包。

**边界：语法、JavaScript runtime、Vue runtime、TypeScript、SFC compiler、Vite tooling：**

- JavaScript runtime 创建 ref object、调用 handler、执行 `.value` property read/write。
- Vue runtime 在 `.value` read 时记录 active effect，在 write 时通知 subscribers。
- SFC compiler 让 `<script setup>` top-level binding 可用于 template，并支持 template ref unwrapping。
- TypeScript 推断 `count` 为 `Ref<number>`，可诊断把 string 赋给 `count.value`；类型在运行时被擦除。
- Vite 转换 SFC/module，不负责决定 ref dependency。

**底层机制：**

初次 render 读取 `count.value` 的概念结果，当前 component render effect 因此订阅该 ref。button click 调用 `incrementCount`，setter 把 inner value 从 `0` 改为 `1`，trigger 使 render effect 进入更新队列；update 重新读取 inner value并 patch text。

**响应式证据链：**

1. 用户点击 `Increment count`。
2. JavaScript 调用 `incrementCount`，`count` binding 指向既有 ref object。
3. `count.value += 1` 先读后写 `.value`。
4. 初次 template render 已读取 count，因此 component render effect 依赖它。
5. `.value` 从 `0` 变为 `1` 触发该依赖。
6. 发生 component render scheduling 与 text DOM patch，不是 document reload。
7. TypeScript 检查 `Ref<number>` 与 number arithmetic。
8. TypeScript 不验证用户何时点击，也不执行 runtime update。
9. UI 显示 `1`，因为 update render 读到新的 inner number。
10. 真实项目出现“script 值变了但 UI 不动”时，先确认是否真正写了 ref `.value`，再确认 render 是否读取该 source。

**API / 语法规则：**

- `const count = ref(0)` 推断 `Ref<number>`。
- script：`count.value += 1`。
- template top-level ref：`{{ count }}`。
- object ref replacement：`profileRef.value = { ... }`。
- template unwrapping 有 top-level render-context caveat，不应把它概括成“template 永远不写 `.value`”。

**文件结构：**

本节对应 `src/learning/vue/chapter-02-reactivity-system/RefVsReactive.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: ref value container</span>
  </div>

```vue
<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);

function incrementCount(): void {
  count.value += 1;
}
</script>

<template>
  <button type="button" @click="incrementCount">
    Count: {{ count }}
  </button>
</template>
```
</div>

**逐行解释：**

`ref(0)` 创建 reactive container；handler 通过 `.value` setter 进入 Vue reactivity；template event 只在 click 后调用 handler；interpolation 在 render 中读取 top-level ref 的 inner value。

**执行过程：**

setup 创建 ref → initial render 读取 ref → button listener 注册 → click → handler → `.value` setter → effect scheduling → component update → DOM text patch。

**变量与引用变化：**

`count` binding 和 ref object identity 不变；只有 inner value `0 → 1`。若 `profileRef.value` 被替换，也是 ref identity 不变、inner object reference 更换。

**为什么得到这个结果：**

template 不是直接读取一个普通 local number，而是经 SFC/Vue render context 读取 ref；写入走同一 container 的 setter，所以之前订阅该 source 的 render effect会被通知。

**对比写法：**

普通 `let count = 0` 的 `count += 1` 只改 JavaScript local binding，Vue 没有 property interception 点。`reactive({ count: 0 })` 则通过 Proxy property `state.count` 提供 interception。

**常见错误为什么错：**

`count += 1` 违反 `count` 是 `const Ref<number>` binding 的规则；`{{ count.value }}` 对本例 top-level ref 是多余且会掩盖 template unwrapping 心智模型。识别方法是回到 source declaration：由 `ref()` 创建的 binding 在 script 读写 `.value`。

**与真实项目的关系：**

独立 primitive、可整体替换 object/array、可能传给后续 composable 的值通常适合 ref。外部输入仍需 runtime validation；`Ref<User>` 不能证明 runtime JSON 真是 User。

**与当前学习主线的关系：**

第 1 章只把 ref 当作交互工具；本节首次解释它为什么能被 track/trigger，并为 computed、watch 与 composable input 建立 value-container 模型。

**最终记忆模型：**

script `.value` read → track active effect；script `.value` write → trigger subscribers；template top-level binding → convenience unwrapping。

<a id="section-9-2"></a>

### 9.2 reactive：Proxy object、property-level tracking 与 replacement boundary

**结论：**

`reactive(target)` 返回与 raw target identity 不同的 deep reactive Proxy。对 `proxy.property` 的读取和写入可被 `get` / `set` trap 拦截，因此 dependency 以实际读取的 target/key 为核心；应持续使用 Proxy，并保持该 reactive binding 的连接。

**本节解决的问题：**

为什么 `profileReactive.level += 1` 能更新依赖 level 的 UI，而把变量重新赋给另一个 object 可能断开旧 Proxy 上建立的连接？前者经过同一 Proxy 的 property traps，后者改变的是 local binding 指向。

**技术意义：**

property-level tracking 让一个 component 只订阅 render 中实际读取的 reactive properties。它不是“object 任何变化都刷新整个 application”，而是 mutation 通知与相应 key 有关的 effects，再由 renderer 决定 patch。

**概念解释：**

`profileReactive` 是 Proxy，不是 raw object。template 分别读取 `.name` 与 `.level`。handler 修改这两个 properties，Proxy 可 intercept。`reactive()` 只接受 object/array/collection 等 object types，不能直接把 number 变成 reactive primitive binding。

**边界：语法、JavaScript runtime、Vue runtime、TypeScript、SFC compiler、Vite tooling：**

- JavaScript `Proxy` 定义 property interception，`Reflect` 可保持默认 get/set semantics。
- Vue runtime 在 Proxy trap 周围维护 dependency map 与 effects。
- template compiler 生成读取 `profileReactive.name` 的 render logic。
- TypeScript 推断 property shape，但不表示 object 在 runtime 一定由 Vue Proxy 创建。
- Vite 不参与每次 property get/set。

**底层机制：**

概念模型是 `get(target, "level") → track(target, "level")`；`set(target, "level", 2) → Reflect.set(...) → trigger(target, "level")`。真实实现包含更多边界，本章不会把 pseudo-code 当 source code。

**响应式证据链：**

1. 用户点击 `Mutate proxy properties`。
2. handler 读取 `profileReactive` Proxy binding，并读写 name/level。
3. initial render 已读取 `profileReactive.name` 和 `.level`。
4. 当前 component render effect 订阅这些 property reads。
5. Proxy `set` 观察到 property value 改变并触发 subscribers。
6. component render effect被调度，随后 patch 对应 text。
7. TypeScript 检查 name 为 string、level 为 number。
8. TypeScript 不证明 raw input 安全，也不创建 Proxy。
9. UI 同时显示新 name/level，因为 update render 重新经过 Proxy get。
10. 真实项目出现失联时，检查是否保留 Proxy、是否改写了 raw object、是否把 property 复制成 plain primitive。

**API / 语法规则：**

- `const state = reactive({ count: 0 })`。
- 读取/写入：`state.count`、`state.count += 1`，没有 `.value`。
- deep conversion 会在访问 nested object 时返回 reactive proxy。
- 应使用 returned Proxy，而不是继续 mutation raw target。
- whole-object replacement 需求优先放入 `ref.value`。

**文件结构：**

本节对应 `src/learning/vue/chapter-02-reactivity-system/RefVsReactive.vue`，底层词汇由 `ProxyTrackTriggerMentalModel.vue` 辅助。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: reactive property mutation</span>
  </div>

```ts
import { reactive } from "vue";

const profileReactive = reactive({
  name: "Lin",
  level: 1,
});

profileReactive.name = "Mina";
profileReactive.level += 1;
```
</div>

**逐行解释：**

`reactive` 接收 raw object，返回 Proxy；两次 assignment 都经过 Proxy `set`；`+=` 还先经过一次 `get`。没有 `.value`，因为 reactive object 自身就是 access surface。

**执行过程：**

raw object 创建 → Vue 创建/返回 Proxy → render property get → dependency subscription → handler property get/set → trigger → render/update → DOM patch。

**变量与引用变化：**

`profileReactive` 一直指向同一 Proxy；name string 和 level number property values 变化。raw object 与 Proxy `===` 不相等，但 Proxy 转发并管理对 target 的访问。

**为什么得到这个结果：**

Vue 可以观察 object property access，而不能观察脱离 object 的普通 local variable access。render 与 mutation 都经过同一个 Proxy，连接才完整。

**对比写法：**

`let state = reactive(...); state = reactive(...)` 会让 variable 改指向新 Proxy，旧订阅关系不会自动成为“对变量本身”的订阅。若业务语义是整体快照替换，`const state = ref(initial); state.value = next` 更明确。

**常见错误为什么错：**

继续写 raw object 或重新赋值 reactive binding，会绕开/丢失既有 Proxy access path。识别信号是 property mutation通过一个对象发生，而 template 读取的是另一个 Proxy/reference。

**与真实项目的关系：**

表单 object、局部 settings 与不会整体替换的 cohesive state 可用 reactive。若状态来自 immutable snapshot、cache result 或频繁整体替换，ref/shallowRef 通常更清楚。

**与当前学习主线的关系：**

本节建立 Vue 3 runtime reactivity 主轴。Reactivity Transform 是未成为当前默认方案的 compile-time 探索；本项目明确使用 `.value` 和 runtime Proxy。

**最终记忆模型：**

同一 Proxy 的 property get 建依赖，同一 Proxy 的 property set 触发依赖；替换 local binding 不是 property trigger。

<a id="section-9-3"></a>

### 9.3 ref vs reactive：primitive、object、array、replacement、TypeScript 推断边界

**结论：**

`ref` 是通用 value container，可保存 primitive、object、array 并支持整体 replacement；`reactive` 直接返回 object Proxy，适合围绕稳定 object identity 做 property mutation。当前官方指南推荐把 `ref()` 作为声明 reactive state 的主要 API，但选择仍应绑定实际 value lifetime。

**本节解决的问题：**

选择不是“简单值用 ref、复杂值用 reactive”这么粗糙。object/array 也能放进 ref 并被深度转换；真正需要比较的是访问语法、整体 replacement、destructuring、传参方式与 TypeScript inferred type。

**技术意义：**

错误选择会让团队频繁写不清楚的 replacement、复制 properties 或丢失连接。正确选择使 state owner、mutation surface 和函数 contract 一致。

**概念解释：**

`count` 必须用 ref，因为 `reactive(0)` 不合法；`profileRef` 支持 `.value = newProfile`；`profileReactive` 支持自然的 `.name` / `.level` property mutation。`ref<CartItem[]>` 适合 array 可能整体替换；`reactive<CartItem[]>` 适合保持 array Proxy 并直接 mutate items。

**边界：语法、JavaScript runtime、Vue runtime、TypeScript、SFC compiler、Vite tooling：**

- 语法差异是 script `.value` 与 Proxy direct property access。
- JavaScript runtime 的 ref 是 object，reactive 是 Proxy object。
- Vue 对 object ref 的 inner value也进行 deep reactive conversion；`shallowRef` 才跳过。
- TypeScript 可推断 `Ref<number>`、`Ref<Profile>` 与 reactive property shape，但不能执行 runtime validation。
- template 对 top-level ref 自动解包；reactive object 不需要 `.value`。
- Vite 不决定 API 选择。

**底层机制：**

ref 通过单一 `.value` access point 追踪 container；当 inner object 被深度转换时，nested property 仍由 Proxy 追踪。reactive 则直接以 target/property 为粒度。两者都进入 Vue dependency graph，但 replacement surface不同。

**响应式证据链：**

1. 用户选择 `Replace profileRef.value` 或 `Mutate proxy properties`。
2. 前者保持 ref object、替换 inner Profile reference；后者保持 Proxy、修改 properties。
3. template 分别读取 `profileRef` 解包后的 properties与 `profileReactive` properties。
4. component render effect 依赖 ref value和/或对应 Proxy properties。
5. ref setter 或 Proxy setters 触发相关 dependencies。
6. component update 重新 render 并 patch text。
7. TypeScript 检查 replacement object 必须符合 Profile shape。
8. TypeScript 不保证用户/runtime JSON 的 object shape，也不证明某对象是 reactive。
9. 两种 UI 都更新，但原因分别是 container replacement 与 property mutation。
10. 真实项目先问“是否需要整体替换/传递 ref”，再选 API，而不是按 object 大小决定。

**API / 语法规则：**

| 场景 | 推荐起点 | 原因 |
| --- | --- | --- |
| primitive | `ref` | `reactive` 需要 object target |
| 可整体替换 object/array | `ref` | replacement 通过稳定 `.value` setter |
| 稳定 cohesive object | `reactive` | direct property mutation 可读 |
| 大型 immutable/external snapshot | `shallowRef` | root replacement，避免 deep conversion |
| 需要 destructure property | `toRef` / `toRefs` | 保持 source property connection |

**文件结构：**

主要对照文件是 `src/learning/vue/chapter-02-reactivity-system/RefVsReactive.vue`；array 场景见 `ComputedVsMethod.vue` 与 `VueReactivityLab.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: replacement boundary</span>
  </div>

```ts
import { reactive, ref } from "vue";

const profileRef = ref({ name: "Ada", level: 1 });
const profileReactive = reactive({ name: "Lin", level: 1 });

profileRef.value = { name: "Grace", level: 2 };
profileReactive.name = "Mina";
profileReactive.level = 2;
```
</div>

**逐行解释：**

两个 API 都接收 object；ref 返回 container，因此整体 replacement 写 `.value`；reactive 返回 Proxy，因此保持 binding 并逐 property mutation。

**执行过程：**

API call 创建两种 access surfaces → render 读取 → button handler分别 replacement/mutation → dependency trigger → render effect → DOM patch。

**变量与引用变化：**

`profileRef` identity 不变，`.value` object identity 变化；`profileReactive` Proxy identity 不变，property primitive values 变化。

**为什么得到这个结果：**

依赖始终挂在可拦截的 access surface 上：ref `.value` 或 Proxy property。API 选择影响后续怎样保持这个 surface。

**对比写法：**

`ref(state.property)` 只把调用当时的 primitive value放进新 ref，并不会建立到原 property 的双向 connection；`toRef(state, "property")` 才是 property ref。

**常见错误为什么错：**

把 `reactive` 简化成“object 专用、永远优于 object ref”会忽略 replacement 与传递边界；把 ref 简化成“primitive 专用”会看不懂 object ref 的 deep reactivity。

**与真实项目的关系：**

筛选条件 object可用 reactive；API result snapshot 可用 ref；immutable editor document 可用 shallowRef；选择应与 state lifecycle 对齐。

**与当前学习主线的关系：**

这个判断会直接影响后续 composable return、Pinia store destructuring、form state 与 API state，但本章不提前引入这些系统。

**最终记忆模型：**

ref 固定 container、可换 value；reactive 固定 Proxy、改 properties；两者都响应，但连接边界不同。

<a id="section-9-4"></a>

### 9.4 computed vs method：cached derived state、dependency tracking 与 pure getter

**结论：**

`computed(getter)` 返回 computed ref。getter 第一次被读取时求值并自动追踪其中的 reactive dependencies；依赖未变化时再次读取复用 cache，依赖变化时先 invalidated，再在需要值时重新求值。template method 则在每次 render 调用表达式时执行。

**本节解决的问题：**

`subtotalMethod()` 与 `subtotalComputed` 都能得到购物车 subtotal，为什么点击只修改 `unrelatedCounter` 的按钮后，method call count 增加，而 computed getter evaluation count 不增加？因为 method 是 render 中的普通 function call；computed cache key 是它实际读取的 `cartItems` dependencies。

**技术意义：**

computed 适合从 source state 派生 display/query state，避免复制第二份 mutable source，也避免每次 render 重跑较重计算。getter 必须 pure：只读取输入并返回结果，不在其中发请求、写其他 refs 或操作 DOM。

**概念解释：**

`ComputedVsMethod.vue` 的 `subtotalMethod()` 在 template 中调用。`subtotalComputed` 的 getter执行同一 `reduce`，但返回 readonly computed ref。demo 用 `watch(subtotalComputed, ..., { immediate: true })` 观察 computed value 被求值/变化的次数；计数 mutation 在 watcher callback 中，不在 computed getter 中，因此 getter仍保持 pure。

**边界：语法、JavaScript runtime、Vue runtime、TypeScript、SFC compiler、Vite tooling：**

- JavaScript runtime 执行 `reduce`，method 本身没有 cache。
- Vue runtime 为 computed 建立 lazy/cached reactive effect，追踪 cart item price/quantity。
- component render effect读取 method result和 computed ref result。
- SFC compiler处理 template method call与 computed top-level unwrapping。
- TypeScript 推断 computed result为 number，只读 getter没有业务 runtime validation。
- Vite 不参与 cache invalidation。

**底层机制：**

computed getter运行时，Vue 把 computed effect设为 active effect；对 `cartItems.value`、array iteration、item price/quantity 的读取成为 dependencies。任何相关 mutation使 computed dirty，并通知读取它的 subscribers；unrelated ref不在 dependency set中，所以不会 invalidate。

**响应式证据链：**

1. 用户点击 `Trigger unrelated render`。
2. JavaScript 只把 `unrelatedCounter.value` 增加。
3. component render effect曾读取 unrelatedCounter，因此被调度；computed getter没有读取它。
4. update render调用 `subtotalMethod()`，method call count增加。
5. cart dependencies未 mutation，computed仍有 valid cache。
6. render读取 `subtotalComputed` 时复用 cached number，不重新运行 getter。
7. TypeScript检查 `reduce` accumulator与 item numeric fields。
8. TypeScript不检查 getter是否“业务上 pure”，这需要设计纪律和 review。
9. UI显示相同 totals，但 method count增加、computed evaluation count不变。
10. 真实项目遇到昂贵 filter/sort 每次 render重跑时，检查它是否应成为依赖明确的 computed。

**API / 语法规则：**

- readonly computed：`const total = computed(() => source.value * 2)`。
- script读取：`total.value`；template读取：`{{ total }}`。
- getter只做 pure computation。
- mutation写 source state；external side effect放 event handler或 watcher。
- non-reactive dependency 如 `Date.now()` 不会自己触发 computed更新。

**文件结构：**

本节对应 `src/learning/vue/chapter-02-reactivity-system/ComputedVsMethod.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: pure cached subtotal</span>
  </div>

```ts
import { computed } from "vue";

const subtotalComputed = computed(() =>
  cartItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  ),
);

function subtotalMethod(): number {
  return cartItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
}
```
</div>

**逐行解释：**

computed接收 getter并返回 computed ref；getter读取 cart array/item fields并返回 number，没有 mutation。method是普通 function，同样返回 number，但每次调用都执行 reduce。

**执行过程：**

initial render → computed首次读取并求值/track → method调用 → unrelated mutation → render rerun → method再调用 → computed cache read；cart mutation → computed invalidated →下次读取重新求值。

**变量与引用变化：**

`cartItems` ref identity不变；item quantity property可变化。computed ref identity始终不变，cached number snapshot随 dependency mutation重新产生。

**为什么得到这个结果：**

cache是否有效取决于 getter运行时记录的 reactive reads，而不是 component是否发生任意 render。method没有 reactive cache owner，所以调用即执行。

**对比写法：**

用 `watch(cartItems, () => subtotal.value = ...)` 复制 subtotal会制造可变 duplicate state；computed直接声明公式，让 source mutation驱动 derived snapshot。

**常见错误为什么错：**

在 getter内写 `auditCount.value += 1` 或发请求，会让读取 derived state本身产生 side effect，可能形成额外依赖、更新循环或不可预测执行次数。若要观察 getter，使用开发调试 hook或在受控 demo中从 getter外部观察。

**与真实项目的关系：**

filtered rows、cart totals、validation summary、permission-derived flags与 formatted labels都常用 computed；一次性 event calculation或明确不需要 cache的操作可用 method。

**与当前学习主线的关系：**

本节为第 1 章 `filteredTasks()` 提供升级方向，也为后续 store getters和性能分析建立“依赖决定 cache”的原则。

**最终记忆模型：**

method：render calls → function runs；computed：dependency read → cache → dependency mutation invalidates → next read recomputes。

<a id="section-9-5"></a>

### 9.5 watch：显式 source、old value、new value 与 external side effect boundary

**结论：**

`watch(source, callback)` 把“什么变化会触发”和“触发后做什么”分开。source可以是 ref、computed ref、getter、reactive object或这些 source的数组；callback默认 lazy，并可接收 current/new value和 previous/old value。

**本节解决的问题：**

coupon code变化后，需要记录前后字符串并更新local validation message。这是响应变化后的 effect，不是单纯由 coupon推导一个读取值；因此 demo使用显式 `watch(couponCode, ...)`。

**技术意义：**

watch适合 external synchronization和imperative side effect：storage、DOM integration、request orchestration、analytics或本例local audit message。纯 derived display优先 computed，避免用 watcher维持重复 state。

**概念解释：**

`WatchBasic.vue` 把 `couponCode` ref作为source。callback收到 `newValue`、`oldValue`，normalize string后写三个结果 refs。callback内部读取的其他响应式值不会自动变成 watch source；这就是它比 watchEffect更显式。

**边界：语法、JavaScript runtime、Vue runtime、TypeScript、SFC compiler、Vite tooling：**

- JavaScript runtime执行 trim/uppercase/branch并创建 strings。
- Vue runtime追踪显式 source，在source发生实际变化后调度 callback。
- callback写 validation refs，随后依赖它们的 render effect更新。
- TypeScript检查 callback values为 string。
- TypeScript不验证输入业务真实性；Vite不执行 validation。
- template compiler只处理 input `v-model` 和 result render。

**底层机制：**

watch内部为source建立reactive effect，但source tracking与callback side-effect读取分离。coupon ref setter trigger watcher；callback根据flush timing执行，写入其他 refs；这些写入再触发component render。

**响应式证据链：**

1. 用户在input中把空值改为 `VUE20`。
2. `v-model`写 `couponCode.value`，new string为 `VUE20`，old string为空。
3. watcher source显式读取/订阅 couponCode。
4. watcher effect依赖couponCode；component render另行依赖display refs。
5. input mutation触发 watcher callback。
6. callback属于 watcher side effect，写 validationMessage/old/new refs，随后component render和DOM patch。
7. TypeScript检查 newValue/oldValue string methods。
8. TypeScript不判断 `VUE20` 是否真实有效，也不提供安全验证。
9. UI显示 old/new和valid message，因为callback写入对应refs。
10. 真实项目出现“watch没触发”时，先检查source是否是ref/getter，而不是调用时就求值成plain primitive。

**API / 语法规则：**

- `watch(couponCode, callback)` 可直接watch ref。
- watch reactive property要用 getter：`watch(() => state.count, callback)`。
- 默认 lazy；`immediate: true` 可 eager执行。
- `oldValue` 对primitive replacement明确；deep object nested mutation时 old/new可能是同一object reference。
- watcher不是pure derived value的默认方案。

**文件结构：**

本节对应 `src/learning/vue/chapter-02-reactivity-system/WatchBasic.vue`，最终整合见 `VueReactivityLab.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-02-reactivity-system/WatchBasic.vue</span>
  </div>

```vue
<script setup lang="ts">
import { ref, watch } from "vue";

const couponCode = ref("");
const validationMessage = ref("Enter a local coupon code.");
const previousCoupon = ref("(none)");
const currentCoupon = ref("(none)");

watch(couponCode, (newValue, oldValue) => {
  const normalizedCode = newValue.trim().toUpperCase();

  previousCoupon.value = oldValue || "(empty)";
  currentCoupon.value = newValue || "(empty)";
  validationMessage.value =
    normalizedCode === "VUE20"
      ? "Coupon VUE20 is valid."
      : "Coupon is not recognized.";
});
</script>
```
</div>

**逐行解释：**

四个 refs分别拥有input与effect output；watch第一参数是明确source；callback参数由Vue在source变化时提供；writes集中在 side-effect callback。

**执行过程：**

input event → v-model write → watch source trigger → callback receives new/old → local validation → output refs writes → render effect → DOM patch。

**变量与引用变化：**

四个 ref identities不变；inner strings逐次替换。oldValue是上一次source primitive value，不是另一个reactive ref。

**为什么得到这个结果：**

watch订阅的是couponCode，而不是template是否读取它；callback显式把一次source transition转换为可显示的audit state。

**对比写法：**

若只需要 `normalizedCoupon` 或 `isCouponValid`，使用 computed更直接；若要把变化同步到外部系统或记录transition，watch更合适。

**常见错误为什么错：**

`watch(state.count, callback)` 会先读取并传入plain number，watch拿不到reactive source。修正为 `watch(() => state.count, callback)`。识别方法是看watch第一参数是否仍能在之后被读取，而不是已经求值。

**与真实项目的关系：**

搜索参数持久化、third-party widget同步、request取消/重发与audit logging都需要watch；需要cleanup的async effect后续还应使用watch cleanup contract。

**与当前学习主线的关系：**

本节建立side-effect boundary；后续API state会复用，但当前不发网络请求。

**最终记忆模型：**

明确 source变化 → watcher callback拿new/old → 执行side effect；纯公式仍交给computed。

<a id="section-9-6"></a>

### 9.6 watchEffect：自动依赖收集、执行时机与误用边界

**结论：**

`watchEffect(effect)` 立即运行effect，并把该次**同步执行期间**读取的reactive properties自动收集为dependencies；任一dependency变化时重新运行。async callback只收集第一个 `await` 之前的reads。

**本节解决的问题：**

quantity和unitPrice都参与一条summary log。watchEffect可以直接读取两者而无需重复维护source list，但当effect读到十几个状态时，触发原因会变得不透明。

**技术意义：**

watchEffect适合“side effect使用的值就是dependencies”的紧凑场景，也适合探索响应式连接；需要精确trigger control、old/new values或审计source list时，watch更清楚。

**概念解释：**

`WatchEffectDemo.vue` 的effect同步读取 `quantity.value`、`unitPrice.value`，然后写 `effectLog.value`。它没有读取effectLog，因此不会因自己的write形成self dependency。返回handle可stop后续执行。

**边界：语法、JavaScript runtime、Vue runtime、TypeScript、SFC compiler、Vite tooling：**

- JavaScript runtime构造number/string与closure。
- Vue runtime在effect运行时设置active effect并收集同步reads。
- watcher默认在component render前的pre timing执行，具体flush可配置。
- TypeScript检查数值运算和handle API，不显示隐式dependency graph。
- SFC compiler/Vite不决定effect读了哪些ref。

**底层机制：**

effect首次运行时，quantity/unitPrice getter看到active effect并track。任何setter trigger后，Vue调度同一effect；effect重新读取当前values并更新log。stop handle移除后续响应关系。

**响应式证据链：**

1. component setup调用watchEffect，或用户修改quantity。
2. JavaScript effect closure捕获quantity、unitPrice、effectLog refs。
3. effect同步读取quantity.value与unitPrice.value。
4. watchEffect reactive effect订阅这两个sources。
5. 任一source setter触发effect重新执行。
6. watcher effect写effectLog，component render effect随后patch log text。
7. TypeScript检查Ref<number>参与乘法。
8. TypeScript不列出runtime隐式dependencies，也不追踪await后的runtime read。
9. UI run log变化，因为effect重新计算并写string。
10. 真实项目中effect频繁意外运行时，审查callback所有同步reactive reads，必要时改为watch。

**API / 语法规则：**

- `watchEffect(callback)` 立即执行。
- dependencies来自callback同步执行时的reactive reads。
- `const stop = watchEffect(...); stop()` 停止。
- 默认flush为 `pre`；DOM读取通常不应假设此时owner DOM已patch。
- async effect只跟踪first await之前的reads。

**文件结构：**

本节对应 `src/learning/vue/chapter-02-reactivity-system/WatchEffectDemo.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: automatic effect dependencies</span>
  </div>

```ts
import { ref, watchEffect } from "vue";

const quantity = ref(2);
const unitPrice = ref(12);
const effectLog = ref("");

const stopEffect = watchEffect(() => {
  const currentQuantity = quantity.value;
  const currentUnitPrice = unitPrice.value;

  effectLog.value =
    `${currentQuantity} x ${currentUnitPrice} = ` +
    `${currentQuantity * currentUnitPrice}`;
});
```
</div>

**逐行解释：**

effect首次立即执行；两个local constants在同步阶段读取refs并成为dependencies；最后只写log，不把log读成dependency；stopEffect保存停止函数。

**执行过程：**

watchEffect registration → immediate run/track → input mutation → trigger → scheduled rerun → new log write → component update。

**变量与引用变化：**

source refs保持identity，inner numbers变化；每次effect run创建新的local numbers/string；effectLog inner string替换。

**为什么得到这个结果：**

dependency不是函数参数声明出来的，而是runtime执行路径实际读到的reactive properties。某个branch未执行，其中的read也不会进入本轮dependencies。

**对比写法：**

`watch([quantity, unitPrice], callback)` 显式列source并可访问old/new arrays；watchEffect更短，但source隐藏在callback body。

**常见错误为什么错：**

把大量unrelated refs放进同一个watchEffect会让任一read触发整段side effect；async时误以为await后read也会被收集，会造成“某值变化却不重跑”。识别方法是标出first await和所有同步reads。

**与真实项目的关系：**

小型同步integration、debug log和自动resource wiring可用watchEffect；复杂request orchestration通常需要显式watch source和cleanup。

**与当前学习主线的关系：**

watchEffect展示“active effect + runtime reads”的直接形式，为理解component render effect铺路。

**最终记忆模型：**

run effect → collect synchronous reads → source write → rerun；方便来自自动收集，风险也来自隐式收集。

<a id="section-9-7"></a>

### 9.7 nextTick：DOM patch timing、microtask 与更新后读取 DOM

**结论：**

reactive state mutation会安排DOM update，但不会同步完成patch。`await nextTick()` 等待当前pending DOM update flush结束；它返回Promise，因此await continuation进入microtask语义，但公共contract是“等待Vue pending DOM flush”，不是依赖某个内部scheduler实现细节。

**本节解决的问题：**

向items array push后立刻读 `offsetHeight`，拿到的可能仍是旧list DOM高度。必须先保存before value，再mutation，再 `await nextTick()`，最后读after value。

**技术意义：**

大多数UI不需要直接读DOM；当确实需要focus、selection、scroll或measurement时，必须区分“state已修改”和“对应DOM已patch”。

**概念解释：**

`NextTickDom.vue` 用 `ref<HTMLElement | null>` 保存template ref。初次render前它是null，mount后指向ul element。handler读取旧height，push新row，等待Vue flush，再读取新height。

**边界：语法、JavaScript runtime、Vue runtime、TypeScript、SFC compiler、Vite tooling：**

- browser DOM提供HTMLElement和offsetHeight。
- JavaScript async/await处理Promise continuation。
- Vue scheduler buffer component updates并在next tick flush。
- template ref由Vue在mount/patch boundary赋值。
- TypeScript要求null-safe access，但不保证element实际layout尺寸。
- Vite不控制runtime DOM timing。

**底层机制：**

push触发array dependency，render effect入队；同步handler继续运行，所以DOM仍可能旧。Vue完成queued render/patch后resolve nextTick Promise，await后的读取才观察本轮结果。它不等待fetch、timer或任意future work。

**响应式证据链：**

1. 用户点击 `Add row and measure`。
2. handler持有items ref和listPanel DOM ref。
3. component render此前读取items，依赖array contents。
4. render effect订阅array mutation；template ref本身提供DOM reference。
5. `items.value.push` trigger component update。
6. before read发生在patch前；await nextTick后发生DOM patch result read。
7. TypeScript检查 `HTMLElement | null`，要求optional chaining/null guard。
8. TypeScript不验证element已mount、height非零或layout环境。
9. after高度反映新增li，因为pending patch已经完成。
10. 真实项目DOM读值滞后时，定位mutation与measurement是否处于同一同步call stack。

**API / 语法规则：**

- template：`<ul ref="listPanel">`。
- script：`const listPanel = ref<HTMLElement | null>(null)`。
- mutation后：`await nextTick()`。
- nextTick可接callback或返回Promise；本章使用await。
- 不用nextTick替代network Promise、timer或通用retry。

**文件结构：**

本节对应 `src/learning/vue/chapter-02-reactivity-system/NextTickDom.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: DOM measurement after flush</span>
  </div>

```ts
import { nextTick, ref } from "vue";

const items = ref(["Initial row"]);
const listPanel = ref<HTMLElement | null>(null);

async function addItemAndMeasure(): Promise<number> {
  items.value.push(`Added row ${items.value.length + 1}`);
  await nextTick();
  return listPanel.value?.offsetHeight ?? 0;
}
```
</div>

**逐行解释：**

DOM ref包含null初始边界；handler先写reactive array；nextTick等待Vue flush；optional chaining防止异常生命周期下null dereference。

**执行过程：**

click → old DOM available → array push → render queued → synchronous function reachesawait → Vue flush/render/patch → Promise resolves → read updated offsetHeight。

**变量与引用变化：**

items ref与inner array identity因push保持，array length增加；listPanel ref identity保持，`.value`在mount后指向同一ul element，element children/layout变化。

**为什么得到这个结果：**

Vue batching避免同一tick多次mutation造成重复component patch；代价是mutation调用点不能假设DOM已同步完成。

**对比写法：**

`await Promise.resolve()` 不表达Vue contract；`setTimeout(..., 0)`等待范围更宽且语义模糊。需要Vue update完成时使用nextTick。

**常见错误为什么错：**

mutation后立即读取DOM违反“state write不保证同步patch”规则；忘记DOM ref可能为null违反mount lifecycle边界。识别信号是state值已新、DOM measurement仍旧或偶发null。

**与真实项目的关系：**

auto-scroll、focus newly rendered input、measure expanded panel与third-party DOM integration都需要正确timing；不涉及DOM时不要滥用nextTick。

**与当前学习主线的关系：**

本节把dependency trigger与renderer flush连接起来；更完整lifecycle hooks和template refs将在下一章展开。

**最终记忆模型：**

state mutation先schedule，DOM patch后flush；`await nextTick()`跨过的是Vue pending DOM update boundary。

<a id="section-9-8"></a>

### 9.8 reactive destructuring mistake：为什么解构会丢失响应式连接

**结论：**

从 reactive object解构primitive property时，local variable接收当时的plain value。后续读取该local variable不再经过source Proxy `get`，写它也不经过source Proxy `set`，因此连接断开。

**本节解决的问题：**

`const { theme } = settings` 后，点击切换 `settings.theme`，为什么 `theme` 仍显示 `light`，而 `settings.theme` 与 `themeRef` 显示 `dark`？因为 string按value复制，只有后两种访问仍连接source property。

**技术意义：**

这是Composition API中常见的“看起来只是重构变量，实际改变reactivity access path”问题。函数参数若接收 `settings.theme` plain primitive，也无法在函数内部跟踪source未来变化。

**概念解释：**

destructuring本身是JavaScript syntax，不是Vue API。它执行一次 property get，把结果绑定到local `theme`。`toRef(settings, "theme")` 则返回一个property ref，`.value` getter/setter继续代理到source property。

**边界：语法、JavaScript runtime、Vue runtime、TypeScript、SFC compiler、Vite tooling：**

- JavaScript destructuring创建local binding和plain string snapshot。
- Vue Proxy只能intercept对Proxy property的访问，不能intercept脱离后的local variable。
- TypeScript仍把snapshot推断为string，不会提示“响应式连接已断”。
- template compiler能render三个bindings，但不能恢复snapshot connection。
- Vite不改变标准JavaScript destructuring语义；当前项目不使用reactivity transform。

**底层机制：**

setup时解构执行一次 `settings.theme` Proxy get，但没有长期property ref；render读取local `theme`时不再触发Proxy。direct `settings.theme`和`themeRef.value`在每次render都到source，因此能track。

**响应式证据链：**

1. setup执行destructuring，之后用户点击toggle。
2. `theme`得到plain `"light"`；`themeRef`得到connected ref object。
3. render读取plain theme、Proxy property、property ref三种values。
4. render effect对后两者建立source dependency；plain local没有reactive getter。
5. handler写 `settings.theme = "dark"` 触发source property。
6. component render重新执行；direct/toRef读新值，snapshot仍为旧值。
7. TypeScript检查ThemeName/string assignment。
8. TypeScript不建模Vue runtime dependency connection。
9. UI出现一旧两新，正是access path差异。
10. 真实项目发现“解构后不更新”时，追溯变量是否来自reactive primitive property。

**API / 语法规则：**

- 错误快照：`const { theme } = settings`。
- 保持直接访问：`settings.theme`。
- 单property连接：`const themeRef = toRef(settings, "theme")`。
- 多property连接：`const { theme, fontSize } = toRefs(settings)`。
- destructured nested object reference仍可能让其内部mutation响应，但local binding本身与source property replacement依然不同。

**文件结构：**

本节对应 `src/learning/vue/chapter-02-reactivity-system/ReactiveDestructureMistake.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-02-reactivity-system/ReactiveDestructureMistake.vue</span>
  </div>

```ts
import { reactive, toRef } from "vue";

const settings = reactive({
  theme: "light",
  fontSize: 16,
});

const { theme } = settings;
const themeRef = toRef(settings, "theme");

settings.theme = "dark";
```
</div>

**逐行解释：**

reactive返回Proxy；destructuring立即读取一次string；toRef创建source property adapter；最后assignment经过Proxy set，只有direct/toRef path能读到新值。

**执行过程：**

Proxy创建 → one-time destructure → property ref创建 → render三种读取 → source mutation → trigger → render → snapshot不变、connected reads更新。

**变量与引用变化：**

`theme` local string不变；`settings` Proxy identity不变，theme property string替换；`themeRef` identity不变，其`.value`反映source current value。

**为什么得到这个结果：**

响应式不是给所有“来源相同的值”贴标签，而是依赖访问经过可拦截source。复制primitive后，访问路径已改变。

**对比写法：**

`ref(settings.theme)`同样只包装当时snapshot，形成独立ref；它不会自动双向同步。`toRef`明确连接source property。

**常见错误为什么错：**

把TypeScript推断正常误当响应式正常。静态type只说明两者都是string，不说明runtime read是否经过Proxy。

**与真实项目的关系：**

解构reactive form、store或settings时最容易出现。后续Pinia通常提供专用property-ref utility；本章先掌握通用toRef/toRefs机制。

**与当前学习主线的关系：**

本节把“property-level tracking”转化为可见bug，并为composable return boundary做准备。

**最终记忆模型：**

reactive connection属于access path，不属于primitive value本身；direct property或property ref保留path，plain destructuring切断path。

<a id="section-9-9"></a>

### 9.9 toRef、toRefs、unref：保持响应式连接与统一读取 ref-like value

**结论：**

`toRef(object, key)` 创建连接某一个source property的ref；`toRefs(object)` 为调用时可枚举properties逐一创建property refs；`unref(value)` 只负责统一读取 `T | Ref<T>`，若是ref返回 `.value`，否则原样返回。

**本节解决的问题：**

既想destructure settings，又不想丢失reactive connection时，不能复制primitive；需要把property access封装成ref。另一个function若允许plain string或ref string，可以用unref统一读取，而不是到处手写`isRef`分支。

**技术意义：**

property ref让state owner仍是原reactive object，同时允许把单property作为稳定reactive value传递。unref使consumer的读取contract更宽，但不会创建新dependency或验证输入。

**概念解释：**

`ToRefToRefsDemo.vue` 中 `themeRef`连接 `preferences.theme`，`fontSize`、`compactMode`来自toRefs；从任一方向写，另一侧读取同一source property。`ReadonlyUnrefDemo.vue` 的 `readValue` 接收 `string | Ref<string>`，unref只做normalization。

**边界：语法、JavaScript runtime、Vue runtime、TypeScript、SFC compiler、Vite tooling：**

- JavaScript destructuring仍按标准语义执行，但被解构的是ref objects而非plain primitives。
- Vue utility创建带getter/setter connection的property refs。
- unref在runtime判断ref并读取，不是compiler transform。
- TypeScript把unref结果归一为T；不会验证T的外部runtime真实性。
- template继续自动解包top-level property refs。
- Vite不提供这些runtime connections。

**底层机制：**

property ref `.value` read最终读取source Proxy property，因此active effect仍track source key；write最终设置同一source key并trigger。toRefs只批量调用同类连接。unref若遇到ref，会通过`.value` read参与tracking；plain value则没有reactive source。

**响应式证据链：**

1. 用户点击 `Write through toRef`。
2. handler持有themeRef object，它连接preferences Proxy的theme property。
3. template读取preferences.theme和themeRef。
4. component render effect通过两条path依赖同一source property。
5. `themeRef.value = ...` 最终触发preferences.theme mutation。
6. component render effect调度并patch两个显示位置。
7. TypeScript检查key属于preferences keys，并推断string ref。
8. TypeScript不证明runtime object是reactive，也不验证plain input业务语义。
9. source与property ref显示相同新theme，因为它们不是两份state。
10. 真实项目出现destructured state失联时，检查是否返回/使用property refs而不是plain values。

**API / 语法规则：**

- `toRef(state, "theme")`：单property、双向连接。
- `toRefs(state)`：只处理调用时存在且可枚举properties。
- optional/later property优先单独 `toRef`。
- `unref(input)` 等价于ref则 `.value`、否则input。
- `unref` 不接收getter normalization；需要getter的场景是更广的`toValue`，不属于本章核心。

**文件结构：**

本节对应 `ToRefToRefsDemo.vue` 与 `ReadonlyUnrefDemo.vue`，都位于 `src/learning/vue/chapter-02-reactivity-system/`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: connected property refs</span>
  </div>

```ts
import { reactive, toRef, toRefs, unref } from "vue";
import type { Ref } from "vue";

const preferences = reactive({
  theme: "light",
  fontSize: 16,
  compactMode: false,
});

const themeRef = toRef(preferences, "theme");
const { fontSize, compactMode } = toRefs(preferences);

function readLabel(input: string | Ref<string>): string {
  return unref(input);
}
```
</div>

**逐行解释：**

reactive object保留state ownership；toRef指定key；toRefs返回plain object但其values都是connected refs；type-only import不会产生runtime value；unref返回统一string。

**执行过程：**

source Proxy创建 → property refs创建 → template/ref consumer读取 → source property get/track → 任一方向write → Proxy set/trigger → consumers更新。

**变量与引用变化：**

preferences Proxy identity不变；property refs identity不变；source properties改变。unref返回当前value，不返回另一个ref。

**为什么得到这个结果：**

toRef/toRefs没有复制property value，而是保留了一个可再次访问source property的对象。unref只选择正确读取方式。

**对比写法：**

`const themeCopy = ref(preferences.theme)` 产生独立owner，之后两边不会自动同步；只有业务确实需要fork state时才应这样做。

**常见错误为什么错：**

认为toRefs会监控未来新增property会遗漏其“只处理调用时可枚举properties”的边界。认为unref会让plain value变响应式也错误：plain input没有getter可track。

**与真实项目的关系：**

composable return、局部utility input和store destructuring会大量遇到这类边界；下一阶段才正式抽composable。

**与当前学习主线的关系：**

本节给9.8的destructuring bug提供机制一致的修正，并为后续逻辑复用准备ref-like contract。

**最终记忆模型：**

toRef/toRefs保留property access path；unref统一读value；一个负责connection，一个负责normalization。

<a id="section-9-10"></a>

### 9.10 readonly 与 shallowRef：只读边界、浅层追踪与 large object update

**结论：**

`readonly(source)` 返回deep readonly Proxy，阻止通过该Proxy写入并在开发期警告，但原source仍可变化；`shallowRef(value)` 只让root `.value` access reactive，inner object按原样存储，nested mutation不会像deep ref那样trigger，root replacement会trigger。

**本节解决的问题：**

readonly是否等于业务数据永远不变？不是。shallowRef nested title已改变，为什么UI暂时不更新，而替换整个document后更新？因为两者分别定义write surface与tracking depth，不是安全/不可变魔法。

**技术意义：**

readonly适合向consumer表达“不应经此引用写”；shallowRef适合大型immutable snapshot或外部state object，通过root replacement明确通知变化并避免deep conversion成本。

**概念解释：**

`ReadonlyUnrefDemo.vue` 通过mutable `sourceState` 更新，readonly view同步读取新值；demo不执行故意readonly mutation，错误写法放在指南。`ShallowRefDemo.vue` 先nested mutate但不触发render，再replace `.value`，新root identity触发update。

**边界：语法、JavaScript runtime、Vue runtime、TypeScript、SFC compiler、Vite tooling：**

- readonly仍是runtime Proxy，不是Object.freeze的业务security contract。
- TypeScript将readonly proxy properties标为不可赋值，runtime Vue也会拦截/警告。
- shallowRef只track `.value` access，inner nested get/set没有Vue deep Proxy。
- template compiler只是读取结果；Vite不改变depth。
- browser UI只在component render effect被trigger后patch。

**底层机制：**

readonly Proxy get仍可参与tracking，source mutation可trigger依赖readonly view的effects；readonly set被拒绝。shallowRef getter track container，setter在root identity变化时trigger；nested property mutation绕过container setter。

**响应式证据链：**

1. 用户点击shallow demo的nested mutation或root replacement。
2. JavaScript持有shallow ref和plain inner DocumentState object。
3. render读取 `documentState.value`，依赖shallow ref root；nested object不是deep reactive。
4. component render effect订阅root `.value`。
5. nested set不触发root ref；root `.value = nextObject`触发。
6. 只有replacement调度component update并patchtitle/version。
7. TypeScript检查DocumentState shape与readonly assignment diagnostic。
8. TypeScript不提供runtime security，也不知道某nested mutation应触发UI。
9. UI在nested-only操作后保持旧render，在replacement后显示new snapshot。
10. 真实项目看到shallow state内部已变但UI未动时，检查是否遵守immutable root replacement protocol。

**API / 语法规则：**

- `readonly(source)`：通过returned proxy禁止write；source owner仍能write。
- readonly deep，但不是防止所有alias写入，也不是权限控制。
- `shallowRef(initial)`：只追踪 `.value`。
- 推荐以 `state.value = nextState` 发布新snapshot。
- 本章不使用 `triggerRef` 强制发布nested mutation，以保持root replacement模型。

**文件结构：**

本节对应 `ReadonlyUnrefDemo.vue` 与 `ShallowRefDemo.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: readonly and shallow root replacement</span>
  </div>

```ts
import { reactive, readonly, shallowRef } from "vue";

const source = reactive({ count: 0 });
const view = readonly(source);

source.count += 1;

const documentState = shallowRef({
  meta: { title: "Draft" },
  version: 1,
});

documentState.value = {
  meta: { title: "Published" },
  version: 2,
};
```
</div>

**逐行解释：**

readonly接收reactive source并返回保护视图；owner通过source合法mutation。shallowRef保存object as-is；整个`.value` replacement经过ref setter。

**执行过程：**

readonly view render track → source write trigger → view更新；shallow root render track → nested write无root trigger → root replacement trigger → component patch。

**变量与引用变化：**

source与view是不同Proxy/reference views；source property改变。shallow ref identity保持，inner object identity在replacement时改变。

**为什么得到这个结果：**

readonly控制“从哪个reference能写”，shallowRef控制“追踪到哪一层”。二者回答不同问题。

**对比写法：**

普通 `ref(object)` 会deep-convert nested objects，nested mutation可trigger；shallowRef要求root replacement。`Object.freeze`与readonly也不是同一Vue tracking contract。

**常见错误为什么错：**

`view.count += 1` 违反readonly write contract并产生diagnostic/warning；`documentState.value.meta.title = ...` 后期待立即rerender违反shallow tracking contract。

**与真实项目的关系：**

readonly可暴露配置读取面；shallowRef常用于editor document、external state machine snapshot或large immutable collection。

**与当前学习主线的关系：**

这些API说明“更多响应式”并非总是更好；后续性能与state architecture需要主动定义depth和write ownership。

**最终记忆模型：**

readonly限制write path；shallowRef限制tracking depth；immutability/security仍需更高层业务contract。

<a id="section-9-11"></a>

### 9.11 Proxy mental model：get/set trap、Reflect、track、trigger、effect

**结论：**

Vue 3 reactive object的核心概念可简化为：Proxy `get` 用 `Reflect.get` 取得值并关联active effect，Proxy `set` 用 `Reflect.set` 完成write并通知该target/key subscribers。`ProxyTrackTriggerMentalModel.vue` 只模拟interception log，不是Vue实现。

**本节解决的问题：**

“读取时收集、写入时通知”如何落到JavaScript operation？native Proxy能看到 `trackedState.count` 的get与set；Reflect把原property operation转发给target。真正的track/trigger还需要active effect与dependency map，demo刻意省略。

**技术意义：**

有了target/key/effect三元关系，就能解释为什么未被render读取的property通常不会让该render成为subscriber，也能理解destructuring为何切断trap path。

**概念解释：**

demo维护rawState、native Proxy和operationLog。`readCount()`产生get log；`trackedState.count += 1` 实际是一次get加一次set；随后为display再读一次。log refs本身由Vue管理，但Proxy计数器只是教育模型。

**边界：语法、JavaScript runtime、Vue runtime、TypeScript、SFC compiler、Vite tooling：**

- Proxy/Reflect属于JavaScript runtime。
- demo handler traps只log，不维护Vue dependency WeakMap。
- operationLog/displayedCount refs属于真实Vue reactivity。
- template compiler渲染log array。
- TypeScript检查CounterState property type，不证明handler语义完整。
- Vite不实现Proxy trap。

**底层机制：**

官方简化模型把dependencies存为 `WeakMap<target, Map<key, Set<effect>>>`。track在active effect存在时把它加入set；trigger按target/key取set并通知effects。computed effect、watcher effect和component render effect是不同subscriber用途，scheduler/cleanup等细节未在demo复刻。

**响应式证据链：**

1. 用户点击 `Write count`。
2. JavaScript执行 `trackedState.count += 1`，涉及Proxy、target、key、number。
3. 运算先触发get/count，再触发set/count；demo写operationLog ref。
4. 在真实Vue模型中，运行中的effect会在get时成为property subscriber。
5. set时对应target/key subscribers被trigger。
6. demo的log ref触发component render；真实reactive property则可触发computed/watcher/render effect。
7. TypeScript检查count为number与trap返回形状。
8. TypeScript不建立runtimesubscriber map，也不验证Reflect call是否符合业务。
9. UI log按operation顺序出现，因为trap同步push strings，随后Vue patch log list。
10. 真实项目调试unexpected update时，列出render/effect实际读取的target/key与mutation key。

**API / 语法规则：**

- `new Proxy(target, handlers)` 创建interception view。
- `Reflect.get(target, key, receiver)` / `Reflect.set(...)` 转发标准operation。
- `+=` 是read-modify-write，会产生get与set。
- `track`、`trigger`是Vue内部概念，不是本demo调用的public业务API。
- demo不声明等同Vue source code。

**文件结构：**

本节对应 `src/learning/vue/chapter-02-reactivity-system/ProxyTrackTriggerMentalModel.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: simplified native Proxy log</span>
  </div>

```ts
const rawState = { count: 0 };

const trackedState = new Proxy(rawState, {
  get(target, key, receiver) {
    const value = Reflect.get(target, key, receiver);
    console.log(`get/${String(key)}`);
    return value;
  },
  set(target, key, value, receiver) {
    const didSet = Reflect.set(target, key, value, receiver);
    console.log(`set/${String(key)}`);
    return didSet;
  },
});
```
</div>

**逐行解释：**

raw target保存property；Proxy不复制target；get/set traps接收operation信息；Reflect执行默认语义；log只证明interception发生，不证明dependency tracking已实现。

**执行过程：**

property expression → Proxy trap → Reflect operation → optional conceptual track/trigger → effect scheduling → component render/DOM patch。

**变量与引用变化：**

rawState与trackedState identities不同；它们转发到同一target data。count property number变化；trap functions保持。

**为什么得到这个结果：**

object property operation是JavaScript可拦截点；local primitive binding不是。Vue把这个语言能力与effect graph/scheduler结合，才形成framework reactivity。

**对比写法：**

只写Proxy log没有subscriber关系；只写effect list但无法观察read/write也不能自动维护dependency。两者结合才是简化reactive engine。

**常见错误为什么错：**

把十几行Proxy demo称为Vue source code，忽略collections、nested proxy、effect cleanup、computed、scheduler、renderer等关键系统。识别方法是看示例是否明确标注pseudo/simplified并列出遗漏。

**与真实项目的关系：**

通常不需要自己造reactivity engine；这个模型用于诊断失联、unexpected trigger、raw/proxy identity和destructuring。

**与当前学习主线的关系：**

本节补足JavaScript object model，但Vue component render effect仍是主角，不把章节扩成通用Proxy教程。

**最终记忆模型：**

Proxy让get/set可见；track/trigger让effects可订阅；scheduler/renderer把通知变成可控DOM update。

<a id="section-9-12"></a>

### 9.12 Chapter integration：VueReactivityLab 如何把响应式机制串起来

**结论：**

`VueReactivityLab.vue` 让同一组local cart state同时服务于computed totals、coupon watch、summary watchEffect、component render effect和nextTick measurement；每种effect有不同职责，state owner仍只有一个component instance。

**本节解决的问题：**

分散API如何在一次交互中协作？点击quantity button后，item property mutation invalidates subtotal chain，watchEffect重写summary log，render effect更新DOM，nextTick最后读取patch后高度；coupon变化则另外进入显式watch side-effect boundary。

**技术意义：**

整合重点不是堆API，而是避免owner混乱：cart items是source；subtotal/tax/total是derived snapshots；coupon watcher处理transition side effect；summaryLog是effect output；DOM height是post-patch observation。

**概念解释：**

cart使用stable reactive array Proxy，computed graph为 `cartItems → subtotal → discount/tax → total`。watch只监听couponCode，watchEffect同步读取cart length与computed refs。destructuring/shallowRef panels保留本章两个失败边界。

**边界：语法、JavaScript runtime、Vue runtime、TypeScript、SFC compiler、Vite tooling：**

- JavaScript handlers修改CartItem properties并执行number math。
- Vue reactivity维护Proxy property、computed和watcher dependencies。
- Vue scheduler批处理effects与component update。
- renderer patch template output；browser提供offsetHeight。
- TypeScript检查CartItem/CatalogSnapshot shape，不验证input number范围或coupon真实性。
- SFC compiler连接script bindings/template，Vite只处理module/build。

**底层机制：**

quantity handler持有reactive item Proxy。write quantity触发subtotal computed effect dirty；读取subtotal的discount/tax/total和watchEffect/render effect形成后续依赖。Vue在flush中重算需要的computed并patch；nextTick Promise在pending DOM update完成后resolve。

**响应式证据链：**

1. 用户点击某row的 `+`。
2. handler收到同一reactive CartItem Proxy reference和amount number。
3. computed getter、watchEffect、render曾读取item quantity/subtotal/tax/total。
4. computed effects与component/watchEffect subscribers形成dependency graph。
5. `item.quantity = ...` 触发quantity key。
6. computed invalidation、watchEffect rerun、component render与DOM patch依次协作；nextTick用于post-patch read。
7. TypeScript检查handler参数、CartItem fields、Promise<void>。
8. TypeScript不检查runtime number input是否NaN，也不验证coupon业务规则。
9. totals/log/row与height结果更新，因为它们分别消费同一source mutation的不同阶段。
10. 真实项目定位错误时，从source owner沿computed/watcher/render/DOM read逐边检查，不复制一份total去手动同步。

**API / 语法规则：**

- source state只在handlers/watch callback中mutation。
- computed getter只return derived number。
- watch显式监听couponCode。
- watchEffect只读summary dependencies并写log。
- DOM measurement只在mutation后await nextTick。
- destructuring和shallowRef panels故意保留可观察边界。

**文件结构：**

本节对应 `src/learning/vue/chapter-02-reactivity-system/VueReactivityLab.vue`，由 `ReactivityChapterApp.vue` render。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: lab dependency core</span>
  </div>

```ts
const subtotal = computed(() =>
  cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  ),
);
const tax = computed(() => subtotal.value * 0.08);
const total = computed(() => subtotal.value + tax.value);

watchEffect(() => {
  summaryLog.value =
    `subtotal ${subtotal.value.toFixed(2)} | ` +
    `tax ${tax.value.toFixed(2)} | ` +
    `total ${total.value.toFixed(2)}`;
});
```
</div>

**逐行解释：**

subtotal读取reactive array/items；tax依赖subtotal computed ref；total依赖subtotal/tax；watchEffect读取三者并生成side-effect log，未把mutation放进computed。

**执行过程：**

user event → CartItem mutation → computed dirty propagation → watchEffect/render scheduling → computed reads recompute → summary write → virtual DOM diff/patch → nextTick continuation measurement。

**变量与引用变化：**

cartItems Proxy identity不变，item property primitive变化；computed ref identities不变，cached numbers更新；summaryLog ref inner string替换。

**为什么得到这个结果：**

同一个source property可有多个subscribers，各自承担derived state、side effect或UI rendering；Vue根据runtime reads维护边。

**对比写法：**

若每次quantity change都手动写subtotal、tax、total和summary，任何漏写都会产生不一致。computed graph把公式集中，watcher只承担非公式effect。

**常见错误为什么错：**

在total computed里同时写coupon message或measure DOM，会把pure derived calculation与imperative timing混合；识别信号是“读取total”会产生额外mutation。

**与真实项目的关系：**

真实cart还会有server state、currency、validation与persistence，但本lab刻意只训练local reactive graph。

**与当前学习主线的关系：**

它是本章终点，并为composables、forms、API state、Pinia getter与performance debugging准备机制，不提前实现那些章节。

**最终记忆模型：**

一个source owner，多种subscriber职责；computed负责公式，watchers负责effects，render负责UI，nextTick负责post-patch observation。

<a id="section-9-13"></a>

### 9.13 From Chapter 01 to Chapter 02：把 TaskBoardBasic 的普通过滤函数升级为 computed

**结论：**

第1章的 `filteredTasks()` 是正确的普通function，但template每次render调用就会重新filter；第2章可把同一pure filtering formula声明为computed，让它按 `tasks` 和 `selectedFilter` dependencies缓存。

**本节解决的问题：**

为什么不直接改写第1章文件？第1章需要保留当时的学习边界。`ComputedVsMethod.vue` 增加独立task filter对照，让两个阶段都可运行和复盘。

**技术意义：**

迁移到computed不是为了少写括号，而是明确“filtered list是derived state”。mutation仍发生在add/toggle/filter handlers；computed getter只读取source并返回matching references。

**概念解释：**

第1章template两次调用 `filteredTasks()`（condition和v-for），每次call都执行branch/filter。第2章 `filteredLearningTasks` computed读取 `learningTasks.value` 与 `selectedTaskFilter.value`；unrelatedCounter不在dependency graph中。

**边界：语法、JavaScript runtime、Vue runtime、TypeScript、SFC compiler、Vite tooling：**

- filter仍是JavaScript array operation。
- computed effect缓存result array并追踪tasks/filter。
- template render读取computed ref并被compiler自动解包。
- TypeScript检查TaskFilter union与TaskItem shape。
- TypeScript不判断filter predicate业务正确性。
- Vite不优化或生成computed dependency。

**底层机制：**

首次render读取filteredLearningTasks使getter执行；getter中的selected filter和task properties被track。task/filter mutation invalidates；unrelatedCounter mutation只触发render，不invalidate filter computed。

**响应式证据链：**

1. 用户切换task filter或只点击unrelated render。
2. JavaScript values是task array、filter union、computed ref与普通method。
3. computed getter读取tasks/filter；render读取computed result。
4. computed effect依赖source，component render effect依赖computed ref。
5. task/filter mutation invalidates computed；unrelated mutation不invalidates。
6. filter变更时computed重新求值并触发keyed list patch；unrelated render复用cache。
7. TypeScript检查predicate中的completed boolean和filter union。
8. TypeScript不保证runtime ids唯一，也不检查getter purity。
9. visible tasks与filter匹配，因为getter返回source task references的derived array。
10. 真实项目遇到template多次调用pure filter/sort时，可评估computed；若函数需每次执行或带参数，method可能更合适。

**API / 语法规则：**

- computed getter不得mutation tasks或selectedFilter。
- filter result不是第二个source of truth，不应直接修改。
- event handler负责source mutation。
- template使用 `filteredLearningTasks`，不调用getter function。
- key仍来自task stable id。

**文件结构：**

对照源是 `src/learning/vue/chapter-01-application-boundary/TaskBoardBasic.vue`；第2章实现位于 `src/learning/vue/chapter-02-reactivity-system/ComputedVsMethod.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: Chapter 02 computed task filter</span>
  </div>

```ts
type TaskFilter = "all" | "active" | "completed";

const selectedTaskFilter = ref<TaskFilter>("all");

const filteredLearningTasks = computed(() => {
  if (selectedTaskFilter.value === "active") {
    return learningTasks.value.filter((task) => !task.completed);
  }

  if (selectedTaskFilter.value === "completed") {
    return learningTasks.value.filter((task) => task.completed);
  }

  return learningTasks.value;
});
```
</div>

**逐行解释：**

union定义合法filter；ref拥有current selection；computed getter按source reads返回original或filtered array，且不修改任何source。

**执行过程：**

initial computed read/filter → cache → unrelated render/cache reuse → filter click/ref write → computed invalidation → next render recompute → keyed list patch。

**变量与引用变化：**

learningTasks ref与source array保持；active/completed时返回新array，但item object references来自source。computed ref identity不变，cached array reference可随dependencies变化。

**为什么得到这个结果：**

computed把“输入tasks/filter → 输出visible tasks”的纯关系建成reactive graph；method只是每次调用执行同一关系。

**对比写法：**

把visible tasks存进另一个ref并在每个handler手动更新，会产生同步分支。保留一个source array并用computed派生更可靠。

**常见错误为什么错：**

在computed getter内执行 `tasks.value = tasks.value.filter(...)` 会mutation source并可能循环，同时把筛选变成删除。正确getter只return derived array。

**与真实项目的关系：**

table filter、search results、completed count与grouped options都符合相同模式；需要参数化查询时可组合多个source refs，而不是给computed传调用参数。

**与当前学习主线的关系：**

这一节形成第1章到第2章的明确桥梁：从“function能算出结果”升级为“Vue知道该结果依赖哪些reactive reads”。

**最终记忆模型：**

第1章method：render时算；第2章computed：依赖变化时失效、读取时算、其余render复用cache。

## 10. API / 语法索引

| API / Syntax | Layer | Input | Output / Runtime Effect | TypeScript Boundary |
| --- | --- | --- | --- | --- |
| `ref(value)` | Vue reactivity | 任意T | mutable `Ref<T>`；`.value` read track、write trigger | 推断/约束T，不验证runtime input |
| `reactive(object)` | Vue reactivity | object/array/collection | deep reactive Proxy | 推断property shape，不证明runtime proxy identity |
| `computed(getter)` | Vue reactivity | pure getter | readonly cached computed ref | 推断return type，不强制业务purity |
| `watch(source, callback)` | Vue reactivity | ref/getter/reactive/array | lazy explicit-source side effect | callback values有类型，不验证外部数据 |
| `watchEffect(effect)` | Vue reactivity | effect function | immediate run，自动收集同步reads | 检查函数体类型，不展示runtime dependency graph |
| `readonly(source)` | Vue reactivity | object/ref | deep readonly Proxy；write warning | readonly diagnostic，不是runtime security |
| `shallowRef(value)` | Vue reactivity | 任意T | 只追踪root `.value` | 保留T shape，不深度响应 |
| `toRef(object, key)` | Vue utility | source object + property key | 与source property连接的ref | key受 `keyof T` 约束 |
| `toRefs(object)` | Vue utility | reactive object | 每个当前可枚举property对应ref | mapped refs，不包含未来property |
| `unref(value)` | Vue utility | `T | Ref<T>` | ref则inner value，否则原值 | return normalized T |
| `nextTick()` | Vue global API | optional callback | pending DOM update flush后的Promise | Promise<void>，不证明DOM element存在 |
| template auto-unwrapping | SFC/Vue render | top-level ref binding | template expression读取inner value | tooling检查binding，不改变script规则 |
| `new Proxy` | JavaScript runtime | target + handlers | property operation interception | handler types，不等于Vue dependency system |
| `Reflect.get` / `Reflect.set` | JavaScript runtime | target/key/receiver/value | 转发标准property semantics | 不创建reactive effect |
| `track` | Vue内部概念 | target/key + active effect | 建立subscriber relationship | 非本章public业务API |
| `trigger` | Vue内部概念 | target/key | 通知subscriber effects | 非同步DOM patch保证 |
| render effect | Vue runtime | component render reads | component update subscriber | TypeScript不执行render |
| DOM patch | Vue renderer/browser | old/new virtual DOM | 更新必要真实DOM | 不属于type checking |

## 11. 常见错误表

以下每项都给出错误代码、错误/现象、违反规则、失败原因、修正和后续识别方法。表内是短小对照，不是伪装成真实文件的完整示例。

| # | Wrong Code | Error / Observed Bug | Violated Rule | Why It Fails | Correct Code | Recognition Method |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `const count = ref(0); count += 1;` | assignment/type diagnostic，UI不按预期 | script中的ref读写inner value要用`.value` | `count`是const ref object binding，不是number | `count.value += 1;` | declaration来自`ref()`且operation发生在script |
| 2 | template写`{{ count.value }}` | 对top-level ref多余，心智模型混乱 | template render context会自动解包top-level refs | 把script访问规则机械搬进template | `{{ count }}` | binding是`<script setup>` top-level ref |
| 3 | `let state = reactive(initial); state = reactive(next);` | 旧connection丢失 | reactive依赖基于Proxy property access，需保持access path | local binding改指向另一个Proxy | `const state = ref(initial); state.value = next;` | 需求是whole-object replacement |
| 4 | `const { theme } = reactiveSettings;` | theme停留在旧primitive | plain destructuring不保留Proxy property path | local string read不再经过Proxy get | `const theme = toRef(reactiveSettings, "theme");` | 解构来源是reactive primitive property |
| 5 | `computed(() => { audit.value += 1; return total.value; })` | extra update / loop / unpredictable count | computed getter应side-effect free | 读取derived value本身会mutation state | `computed(() => total.value)`，audit放watcher/debug tooling | getter内出现assignment、request或DOM write |
| 6 | `watch(price, () => total.value = price.value * quantity.value)` | duplicate derived source，易失步 | pure derived value优先computed | watcher维护第二份mutable state | `const total = computed(() => price.value * quantity.value);` | callback只是在同步公式结果 |
| 7 | 一个watchEffect读取大量unrelated refs | 意外频繁执行、source不透明 | watchEffect会收集所有同步reactive reads | 任一read变化都触发整段effect | 拆分effect或使用`watch([sourceA, sourceB], ...)` | 难以回答“什么会触发” |
| 8 | `items.value.push(item); measure(panel.value);` | height仍是旧DOM | state mutation不保证同步DOM patch | renderer update仍在pending queue | `items.value.push(item); await nextTick(); measure(panel.value);` | state新、DOM read旧且同一同步handler |
| 9 | `documentState.value.meta.title = "New";` 后期待shallow UI更新 | nested value变但render不触发 | shallowRef只追踪root `.value` | nested object未deep reactive | `documentState.value = { ...documentState.value, meta: { title: "New" } };` | source由`shallowRef()`创建 |
| 10 | `readonlyState.count += 1;` 或把readonly当权限控制 | TS diagnostic / runtime warning /错误安全假设 | readonly只阻止通过该Proxy write | 原source/其他alias仍可能写，不提供authorization | 通过owner source执行合法mutation，并用真正security boundary | 需求涉及业务immutability或权限而不只是API write surface |
| 11 | `const payload = input as CartItem;` | invalid runtime data被当可信 | TS assertion不执行runtime validation | types在运行前擦除 | 在boundary解析/校验unknown后再建模 | 外部JSON/用户输入未经runtime check |
| 12 | 把简化Proxy log称作Vue实现 | 错误架构判断 | 教学pseudo model省略大量实现细节 | 没有dependency map、cleanup、scheduler、renderer | 标注simplified model并查官方Reactivity in Depth | 十几行代码声称复刻完整Vue reactivity |

错误对照的核心判断：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: correct derived-state boundary</span>
  </div>

```ts
const total = computed(() => price.value * quantity.value);

watch(couponCode, (newCode, oldCode) => {
  couponAudit.value = `${oldCode} -> ${newCode}`;
});
```
</div>

第一行是pure formula；第二段记录transition side effect。区分标准是“只需要返回由sources决定的值”还是“变化后需要执行额外operation”。

## 12. 最终小项目

最终小项目只整合9.1–9.11已经解释的机制，不替代分节教学。它不添加Router、Pinia、API、external UI package或test framework。

### 12.1 项目目标

`VueReactivityLab.vue` 提供：

1. local shopping cart与quantity/price editing；
2. computed subtotal、discount、tax、total；
3. watch coupon code old/new transition与local validation；
4. watchEffect readable summary log；
5. quantity mutation后的nextTick DOM height；
6. visible reactive destructuring mistake；
7. visible shallowRef nested-mutation/root-replacement boundary。

### 12.2 文件结构与职责

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Final mini-project structure</span>
  </div>

```txt
src/
  learning/
    vue/
      chapter-02-reactivity-system/
        ReactivityChapterApp.vue
        VueReactivityLab.vue
```
</div>

- `ReactivityChapterApp.vue`：render最终lab，不拥有cart state。
- `VueReactivityLab.vue`：拥有cart、coupon、computed graph、effects、DOM ref和两个边界panel。

### 12.3 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-02-reactivity-system/VueReactivityLab.vue</span>
  </div>

```vue
<script setup lang="ts">
import {
  computed,
  nextTick,
  reactive,
  ref,
  shallowRef,
  toRef,
  watch,
  watchEffect,
} from "vue";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CatalogSnapshot = {
  label: string;
  version: number;
  meta: {
    status: string;
  };
};

const cartItems = reactive<CartItem[]>([
  { id: 1, name: "Vue Workbook", price: 30, quantity: 1 },
  { id: 2, name: "TypeScript Cards", price: 12, quantity: 2 },
]);
const couponCode = ref("");
const couponMessage = ref("No coupon applied.");
const couponTransition = ref("(none) -> (none)");
const discountRate = ref(0);
const summaryLog = ref("");
const summaryPanel = ref<HTMLElement | null>(null);
const heightBeforePatch = ref(0);
const heightAfterPatch = ref(0);

const subtotal = computed(() =>
  cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  ),
);
const discount = computed(() => subtotal.value * discountRate.value);
const taxableAmount = computed(() => subtotal.value - discount.value);
const tax = computed(() => taxableAmount.value * 0.08);
const total = computed(() => taxableAmount.value + tax.value);

watch(couponCode, (newValue, oldValue) => {
  const normalizedCode = newValue.trim().toUpperCase();

  couponTransition.value =
    `${oldValue || "(empty)"} -> ${newValue || "(empty)"}`;

  if (normalizedCode === "VUE20") {
    discountRate.value = 0.2;
    couponMessage.value = "VUE20 applies a 20% discount.";
  } else {
    discountRate.value = 0;
    couponMessage.value = normalizedCode
      ? "Coupon is not recognized."
      : "No coupon applied.";
  }
});

watchEffect(() => {
  summaryLog.value =
    `${cartItems.length} items | subtotal $${subtotal.value.toFixed(2)} | ` +
    `tax $${tax.value.toFixed(2)} | total $${total.value.toFixed(2)}`;
});

async function changeQuantity(
  item: CartItem,
  amount: number,
): Promise<void> {
  heightBeforePatch.value = summaryPanel.value?.offsetHeight ?? 0;
  item.quantity = Math.max(1, item.quantity + amount);

  await nextTick();

  heightAfterPatch.value = summaryPanel.value?.offsetHeight ?? 0;
}

function updatePrice(item: CartItem, event: Event): void {
  if (!(event.currentTarget instanceof HTMLInputElement)) {
    return;
  }

  const nextPrice = Number(event.currentTarget.value);

  if (Number.isFinite(nextPrice) && nextPrice >= 1) {
    item.price = nextPrice;
  } else {
    event.currentTarget.value = String(item.price);
  }
}

const cartPreferences = reactive({
  label: "Standard cart",
});
const { label: staleLabel } = cartPreferences;
const connectedLabel = toRef(cartPreferences, "label");

function renameCart(): void {
  cartPreferences.label =
    cartPreferences.label === "Standard cart"
      ? "Priority cart"
      : "Standard cart";
}

const catalogSnapshot = shallowRef<CatalogSnapshot>({
  label: "Catalog draft",
  version: 1,
  meta: {
    status: "draft",
  },
});

function mutateSnapshotNestedStatus(): void {
  catalogSnapshot.value.meta.status = "reviewed";
  console.log("Nested shallowRef mutation did not replace the root value.");
}

function replaceCatalogSnapshot(): void {
  catalogSnapshot.value = {
    label: `Catalog release ${catalogSnapshot.value.version + 1}`,
    version: catalogSnapshot.value.version + 1,
    meta: {
      status: "published",
    },
  };
}
</script>

<template>
  <article class="lab">
    <header>
      <p class="topic">Chapter 02 final integration</p>
      <h3>Vue Reactivity Lab</h3>
      <p>
        Local cart state connects computed totals, a coupon watcher, an
        automatic summary effect, DOM timing, destructuring, and shallow root
        replacement.
      </p>
    </header>

    <section class="cart-panel" aria-labelledby="cart-items-title">
      <h4 id="cart-items-title">Shopping cart</h4>
      <div v-for="item in cartItems" :key="item.id" class="cart-row">
        <div>
          <strong>{{ item.name }}</strong>
          <span>${{ item.price.toFixed(2) }} each</span>
        </div>
        <label>
          Price
          <input
            :value="item.price"
            type="number"
            min="1"
            step="1"
            @change="updatePrice(item, $event)"
          />
        </label>
        <div class="quantity-controls">
          <button type="button" @click="changeQuantity(item, -1)">-</button>
          <span>{{ item.quantity }}</span>
          <button type="button" @click="changeQuantity(item, 1)">+</button>
        </div>
      </div>
    </section>

    <section class="coupon-panel">
      <h4>Coupon watcher</h4>
      <label for="lab-coupon">
        Coupon code
        <input
          id="lab-coupon"
          v-model="couponCode"
          type="text"
          placeholder="Try VUE20"
        />
      </label>
      <p>{{ couponMessage }}</p>
      <p>Transition: {{ couponTransition }}</p>
    </section>

    <section ref="summaryPanel" class="summary-panel">
      <h4>Computed summary</h4>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>${{ subtotal.toFixed(2) }}</dd>
        </div>
        <div>
          <dt>Discount</dt>
          <dd>-${{ discount.toFixed(2) }}</dd>
        </div>
        <div>
          <dt>Tax</dt>
          <dd>${{ tax.toFixed(2) }}</dd>
        </div>
        <div>
          <dt>Total</dt>
          <dd>${{ total.toFixed(2) }}</dd>
        </div>
      </dl>
      <p class="effect-log">{{ summaryLog }}</p>
      <p>
        Height before patch: {{ heightBeforePatch }}px | after nextTick:
        {{ heightAfterPatch }}px
      </p>
    </section>

    <div class="boundary-grid">
      <section>
        <h4>Destructuring boundary</h4>
        <p>Snapshot: {{ staleLabel }}</p>
        <p>Direct source: {{ cartPreferences.label }}</p>
        <p>Connected ref: {{ connectedLabel }}</p>
        <button type="button" @click="renameCart">Rename source</button>
      </section>

      <section>
        <h4>shallowRef boundary</h4>
        <p>{{ catalogSnapshot.label }} | v{{ catalogSnapshot.version }}</p>
        <p>Status: {{ catalogSnapshot.meta.status }}</p>
        <button type="button" @click="mutateSnapshotNestedStatus">
          Mutate nested status
        </button>
        <button type="button" @click="replaceCatalogSnapshot">
          Replace snapshot
        </button>
      </section>
    </div>
  </article>
</template>

<style scoped>
.lab {
  padding: 1.5rem;
  border: 2px solid #2f8161;
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 0 1rem 2.5rem rgba(33, 53, 71, 0.08);
}

.topic {
  margin: 0;
  color: #18794e;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.5rem;
  font-size: 1.8rem;
}

h4 {
  margin-top: 0;
}

.cart-panel,
.coupon-panel,
.summary-panel,
.boundary-grid section {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #d7e2dc;
  border-radius: 0.75rem;
  background: #f9fcfa;
}

.cart-row {
  display: grid;
  grid-template-columns: minmax(180px, 1fr) 110px auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-top: 1px solid #e1e9e5;
}

.cart-row > div:first-child {
  display: grid;
  gap: 0.2rem;
}

label {
  display: grid;
  gap: 0.35rem;
  font-weight: 700;
}

input {
  min-width: 0;
  padding: 0.55rem;
  border: 1px solid #a9c0b5;
  border-radius: 0.45rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

button {
  padding: 0.5rem 0.7rem;
  border: 1px solid #9ebcad;
  border-radius: 0.5rem;
  background: #edf8f2;
  color: #185b3e;
  cursor: pointer;
}

dl {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.6rem;
}

dl div {
  padding: 0.65rem;
  border-radius: 0.55rem;
  background: #eaf6ef;
}

dt {
  color: #607067;
  font-size: 0.8rem;
}

dd {
  margin: 0.2rem 0 0;
  font-weight: 800;
}

.effect-log {
  padding: 0.65rem;
  border-radius: 0.55rem;
  background: #edf2f7;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.boundary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.boundary-grid section {
  margin-top: 0;
}

.boundary-grid button + button {
  margin-left: 0.4rem;
}

@media (max-width: 760px) {
  .cart-row,
  .boundary-grid {
    grid-template-columns: 1fr;
  }

  dl {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
```
</div>

### 12.4 运行命令与预期行为

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

预期交互：

- 初始subtotal为 `$54.00`，tax与total由computed graph得到。
- 修改price或quantity后，subtotal、discount、tax、total与summary log同步变化。
- 输入 `VUE20` 后，watch记录old/new transition并设置20% discount。
- 点击quantity button时，先保存当前summary panel高度；`await nextTick()` 后保存patch后高度。
- `Rename source` 后，snapshot label保持旧值，direct source与connected ref更新。
- shallowRef的nested mutation不会单独触发panel更新；root replacement会显示新label/version/status。

### 12.5 执行流与状态所有权

**状态所有权：**

`VueReactivityLab` component instance拥有全部local state。`ReactivityChapterApp`只组合children；root `App.vue`只组合章节。没有把cart复制到全局对象。

**Quantity flow：**

`button click → changeQuantity(item, amount) → read current DOM height → item.quantity write → computed invalidation → watchEffect/render scheduling → DOM patch → await nextTick resumes → read patched height`

**Price flow：**

`number input change → Event/currentTarget runtime check → Number conversion/range guard → item.price write → subtotal invalidation → discount/tax/total invalidation → render reads new computed snapshots → DOM patch`

**Coupon flow：**

`text input → couponCode.value → explicit watch callback → normalize code → discountRate/coupon messages → computed invalidation + render patch`

### 12.6 响应式与 computed 依赖图

| Source | Direct Subscriber | Downstream Result |
| --- | --- | --- |
| `item.price` / `item.quantity` | `subtotal` computed effect | subtotal cache invalidation |
| `subtotal` | `discount`、`taxableAmount`、template、watchEffect | discount/tax/summary更新 |
| `discountRate` | `discount` | coupon影响discount |
| `discount` | `taxableAmount` | taxable base更新 |
| `taxableAmount` | `tax`、`total` | tax/total更新 |
| `tax` | `total`、template、watchEffect | final total与log更新 |
| computed refs | component render effect | summary DOM patch |

这张图是runtime reads建立的关系，不是TypeScript type graph。getter分开写使依赖方向可读；Vue仍按实际执行时的reads建立subscription。

### 12.7 watch、watchEffect 与 nextTick 边界

- **watch side-effect boundary**：只把 `couponCode` 列为source；callback获取old/new并写validation/audit state。它不会因callback里偶然读取其他ref就自动扩大source。
- **watchEffect dependency collection**：同步读取 `cartItems.length`、subtotal、tax、total；任何这些source变化会重跑summary effect。它不提供old/new transition。
- **nextTick DOM timing**：quantity mutation已发生不等于summary DOM已patch；只有await pending flush后才读取post-patch element。

### 12.8 常见错误与扩展任务

集成时最常见的错误：

- 在computed getter写couponMessage，混合derived value和side effect。
- watchEffect读取自己随后又修改的source，形成反馈。
- 直接mutationshallow nested status后认为DOM一定刷新。
- 把DOM height当作source state并反向驱动同一layout，产生不稳定循环。
- number input可能在runtime产生边界值；TypeScript不能替代range/NaN validation。

完成本章后可选扩展：

1. 增加一个computed item count和empty-cart branch。
2. 给watchEffect拆出更小的两条summary effects并比较dependency clarity。
3. 使用Vue Devtools或development `onRenderTracked` / `onRenderTriggered` 检查依赖；不要把debug hook放进production feature logic。
4. 下一章再把cart row拆成props/emits component，不在本章提前实现。

## 13. 额外速查表

本节用于复习已解释机制，不替代9.x的证据链。

### 一句话结论

Vue runtime在可拦截的ref/property read上建立effect dependency，在write时通知subscriber；computed、watcher与component render effect只是不同职责的subscriber。

### 概念与边界

| Concept | Read / Write Surface | Tracking / Trigger | 适合场景 | 关键错误 |
| --- | --- | --- | --- | --- |
| `ref` | script `.value` | read track / write trigger | primitive或可整体替换值 | script忘记`.value` |
| `reactive` | Proxy property | property-level get/set | stable object/array identity | whole binding replacement |
| `computed` | computed ref `.value` | getter dependencies + cache | pure derived state | getter内side effect |
| `watch` | explicit source | source变化触发callback | transition/external effect | 用它维持纯公式 |
| `watchEffect` | callback同步reads | 自动收集并立即执行 | compact multi-read effect | dependency过多/隐式 |
| `readonly` | readonly Proxy | read仍track，write被拒绝 | protected consumer surface | 当作security |
| `shallowRef` | root `.value` | root read/write only | large immutable/external snapshot | nested mutate期待render |
| `toRef` | property ref `.value` | 连接单个source property | 传递/解构一个property | 用`ref(source.key)`替代 |
| `toRefs` | refs object | 连接当前可枚举properties | destructure多个properties | 期待未来properties自动出现 |
| `unref` | ref或plain value | ref时读取`.value` | normalize `T | Ref<T>` | 以为会创建reactivity |
| `nextTick` | Promise/callback | 等pending DOM flush | post-patch focus/measure | 当作network wait |
| `Proxy` | object property traps | 只提供interception能力 | 理解reactive objects | 等同完整Vue实现 |
| `track` | conceptual target/key read | active effect进入subscriber set | 理解dependency | 业务中手动乱调internal API |
| `trigger` | conceptual target/key write | 通知subscriber effects | 理解update start | 等同同步DOM patch |
| `effect` | function运行期间reads | read订阅，write重跑 | reactive work unit | 任意function都算effect |
| render effect | component render reads | source write schedule update | state到UI | 整页reload心智模型 |
| template auto-unwrapping | top-level ref in render context | 读取inner ref value | template convenience | 推广到script/nested所有场景 |
| reactive destructuring | plain local binding | primitive失去Proxy path | 识别连接断开 | TypeScript通过就认为reactive |
| Reactivity Transform | compile-time探索 | 当前非默认runtime模型 | 理解边界历史 | 假设`.value`已全面消失 |

### 相似概念对比

| Question | Option A | Option B | Decision Rule |
| --- | --- | --- | --- |
| state container | `ref` | `reactive` | 需要primitive/whole replacement/传ref选ref；稳定object property mutation可选reactive |
| derived value | `computed` | method | 依赖可追踪且需要cache选computed；每次call应执行选method |
| reactive side effect | `watch` | `watchEffect` | source/old-new要显式选watch；effect同步reads即source可选watchEffect |
| object depth | `ref` | `shallowRef` | nested mutation应响应选ref；immutable root replacement选shallowRef |
| property extraction | destructure primitive | `toRef` / `toRefs` | 需要保持连接就用property refs |
| state time vs DOM time | immediate read | `await nextTick()` | 需要已patch DOM就等待nextTick |

### 常见错误类型

| Symptom | Likely Cause | First Check |
| --- | --- | --- |
| script ref不更新 | 忘记`.value` | source declaration |
| destructured value停在初始值 | primitive snapshot | access是否仍经过Proxy |
| computed意外循环 | getter有mutation | 搜索getter assignment/request/DOM call |
| watcher不触发reactive property | 传入plain property value | 改用getter source |
| watchEffect意外频繁 | 同步reads过多 | 标出所有callback reads |
| DOM measurement旧 | pending patch未flush | mutation后await nextTick |
| shallow nested UI不动 | 只track root | 用root replacement |

### 最小代码模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: minimal computed state</span>
  </div>

```vue
<script setup lang="ts">
import { computed, ref } from "vue";

const quantity = ref(1);
const unitPrice = ref(10);
const total = computed(() => quantity.value * unitPrice.value);
</script>

<template>
  <button type="button" @click="quantity += 1">
    Total: {{ total }}
  </button>
</template>
```
</div>

## 14. 最终文件清单

| Path | Role | Status |
| --- | --- | --- |
| `docs/vue/chapter-02-reactivity-system/vue-chapter-02-learning-guide.md` | 第2章完整学习指南 | 已创建 |
| `src/learning/vue/chapter-01-application-boundary/App.vue` | 保留第1章并render第2章 | 已更新 |
| `src/learning/vue/chapter-02-reactivity-system/ReactivityChapterApp.vue` | 第2章组件组合 | 已创建 |
| `src/learning/vue/chapter-02-reactivity-system/RefVsReactive.vue` | ref/reactive/replacement练习 | 已创建 |
| `src/learning/vue/chapter-02-reactivity-system/ComputedVsMethod.vue` | computed/method与TaskBoard bridge | 已创建 |
| `src/learning/vue/chapter-02-reactivity-system/WatchBasic.vue` | explicit watch source练习 | 已创建 |
| `src/learning/vue/chapter-02-reactivity-system/WatchEffectDemo.vue` | automatic effect dependency练习 | 已创建 |
| `src/learning/vue/chapter-02-reactivity-system/NextTickDom.vue` | DOM patch timing练习 | 已创建 |
| `src/learning/vue/chapter-02-reactivity-system/ReactiveDestructureMistake.vue` | destructuring boundary练习 | 已创建 |
| `src/learning/vue/chapter-02-reactivity-system/ShallowRefDemo.vue` | shallow root replacement练习 | 已创建 |
| `src/learning/vue/chapter-02-reactivity-system/ToRefToRefsDemo.vue` | connected property refs练习 | 已创建 |
| `src/learning/vue/chapter-02-reactivity-system/ReadonlyUnrefDemo.vue` | readonly/unref边界练习 | 已创建 |
| `src/learning/vue/chapter-02-reactivity-system/ProxyTrackTriggerMentalModel.vue` | 简化Proxy/Reflect日志模型 | 已创建 |
| `src/learning/vue/chapter-02-reactivity-system/VueReactivityLab.vue` | 第2章最终整合项目 | 已创建 |

`Snippet:` 与 `Template:` code windows只用于机制解释，不是额外真实文件。

## 15. 如何转换成个人笔记

建议压缩成五张卡片：

1. **Access surface**：ref `.value` 与reactive Proxy property。
2. **Effect graph**：source read → active effect → subscriber set → source write → trigger。
3. **Derived vs side effect**：computed / method / watch / watchEffect决策表。
4. **Boundary bugs**：destructuring、whole replacement、shallow nested mutation、readonly alias。
5. **Timing**：mutation time、scheduler flush、render effect、DOM patch、nextTick continuation。

每张卡片至少保留一个真实变量名和一条failure signal。只写API定义会丢失“谁读取、谁订阅、谁写入、哪个effect重跑”的机制。

## 16. 必须能回答的问题

1. `ref()` 为什么需要value container，script为什么写`.value`？
2. template top-level ref auto-unwrapping的边界是什么？
3. `reactive()` 返回什么，raw object与Proxy identity有什么关系？
4. 为什么reactive dependency可以到property level？
5. ref object与reactive object的whole replacement边界有何不同？
6. object/array什么时候仍应使用ref？
7. computed返回什么，cache由什么invalidated？
8. 为什么computed getter必须pure？
9. method为什么会在unrelated component render时再次执行？
10. watch source有哪些形式？为什么watch reactive property常用getter？
11. old/new value对primitive与deep object mutation有什么差异？
12. watchEffect何时收集dependencies？first await有什么边界？
13. watch与watchEffect如何选择？
14. state已修改后为什么DOM仍可能旧？
15. nextTick等待什么，不等待什么？
16. reactive primitive destructuring为何断开连接？
17. toRef与`ref(state.property)`为何不同？
18. toRefs何时不会包含property？
19. readonly限制了什么，又没有解决什么？
20. shallowRef的root replacement protocol是什么？
21. unref对plain value和ref分别做什么？
22. Proxy get/set、Reflect、track、trigger与effect如何连接？
23. 为什么简化Proxy demo不是Vue source code？
24. TypeScript能检查哪些ref/property types，为什么不能验证runtime JSON或用户输入？
25. component render effect、computed effect与watcher effect职责如何区分？
26. 第1章 `filteredTasks()` 为什么适合在第2章对比computed？

## 17. 最终记忆模型

把本章压成一条完整链：

`user operation → JavaScript handler → ref .value setter / reactive Proxy set → trigger target/key subscribers → computed invalidation or watcher scheduling → component render effect rereads dependencies → virtual DOM comparison → real DOM patch → nextTick resolves → post-patch DOM read`

再补四条边界：

- ref连接在container `.value`；reactive连接在Proxy property。
- computed只派生；watch/watchEffect处理effects；event handler负责用户触发mutation。
- destructuring可能移除Proxy access path；toRef/toRefs保留path。
- TypeScript描述静态shape；Vue runtime维护dependency；browser提供真实DOM；Vite只做module/SFC tooling而非完整type checking。

下一章才进入props、emits、slots、component `v-model`、provide/inject、template refs与lifecycle hooks。本章只做必要前向说明，不生成第3章内容。

## 18. 官方文档阅读清单

本章按以下当前官方页面核对：

1. [Vue Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)：ref、reactive、template unwrapping、replacement/destructuring限制与DOM timing。
2. [Vue Computed Properties](https://vuejs.org/guide/essentials/computed.html)：computed ref、dependency cache、method对比与pure getter。
3. [Vue Watchers](https://vuejs.org/guide/essentials/watchers.html)：watch source、old/new、watchEffect同步依赖与flush timing。
4. [Vue Template Refs](https://vuejs.org/guide/essentials/template-refs.html)：DOM ref、mount前null与TypeScript边界。
5. [Vue Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html)：Proxy/getter/setter、track/trigger、effect、component render effect与runtime reactivity。
6. [Vue Global API: nextTick](https://vuejs.org/api/general.html#nexttick)：pending DOM update flush contract。
7. [Vue Reactivity API: Core](https://vuejs.org/api/reactivity-core.html)：ref、computed、reactive、readonly、watch、watchEffect signatures与runtime行为。
8. [Vue Reactivity API: Utilities](https://vuejs.org/api/reactivity-utilities.html)：unref、toRef、toRefs。
9. [Vue Reactivity API: Advanced](https://vuejs.org/api/reactivity-advanced.html#shallowref)：shallowRef root-only tracking。
10. [Using Vue with TypeScript](https://vuejs.org/guide/typescript/overview.html)：Vite transpilation-only边界、Vue - Official IDE support与vue-tsc command-line checking。

所有上述官方页面在本章编写时均可访问。官方Reactivity in Depth也明确说明Vue reactivity主要是runtime-based，并记录Reactivity Transform实验方向最终未成为项目默认方案。
