# Vue 第 3 章：Component Communication 与 Component Boundary

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
  - [9.1 组件边界：parent state、child props、child emits 与 render tree](#section-9-1)
  - [9.2 defineProps：props declaration、one-way data flow 与 readonly boundary](#section-9-2)
  - [9.3 props validation：runtime declaration、type-based declaration 与 TypeScript 边界](#section-9-3)
  - [9.4 defineEmits：custom event、payload contract 与 parent listener](#section-9-4)
  - [9.5 Component v-model：defineModel、modelValue、update:modelValue 与双向绑定展开](#section-9-5)
  - [9.6 slots：slot outlet、parent scope 与内容分发](#section-9-6)
  - [9.7 scoped slots：slot props、child data exposure 与 render scope](#section-9-7)
  - [9.8 provide / inject：prop drilling、dependency provider 与 InjectionKey](#section-9-8)
  - [9.9 fallthrough attributes：未声明 props/emits 的 attribute 与 listener 继承](#section-9-9)
  - [9.10 template refs：DOM refs、component refs、mount timing 与 defineExpose](#section-9-10)
  - [9.11 lifecycle hooks：onMounted、onUpdated、onUnmounted 与组件实例生命周期](#section-9-11)
  - [9.12 async components：defineAsyncComponent、dynamic import 与 lazy component boundary](#section-9-12)
  - [9.13 Chapter integration：ProductList、FilterPanel、EditableTitle 如何串起父子通信](#section-9-13)
  - [9.14 Final integration：vue-component-library-lab 如何设计可复用组件 API](#section-9-14)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
- [13. 额外速查表](#13-额外速查表)
- [14. 真实项目判断模型](#14-真实项目判断模型)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标 | 真实文件 | 主要边界 |
| --- | --- | --- |
| 整合全部第 3 章练习 | `src/learning/vue/chapter-03-component-communication/ComponentsChapterApp.vue` | 高层编排 |
| props down、events up | `ProductList.vue`、`ProductCard.vue`、`FilterPanel.vue` | 父子状态所有权 |
| component v-model | `EditableTitle.vue` | `defineModel<string>()` |
| default / named slots | `ModalWithSlots.vue` | parent-owned content |
| scoped slot | `ScopedSlotTable.vue` | child data、parent rendering |
| typed provide / inject | `ProvideInjectTheme.vue`、`ThemeProviderPanel.vue`、`ThemeConsumerPanel.vue` | ancestor dependency |
| DOM 与 component ref | `TemplateRefFocus.vue`、`ComponentsChapterApp.vue` | imperative escape hatch |
| fallthrough attributes | `FallthroughAttributeButton.vue` | single-root inheritance |
| lifecycle cleanup | `LifecycleHookPanel.vue` | instance lifetime |
| lazy component boundary | `AsyncComponentDemo.vue`、`AsyncLoadedPanel.vue` | async wrapper |
| 最终组件库实验室 | `component-library-lab/ComponentLibraryLab.vue` | 综合 API 设计 |
| 保留前两章并挂载第 3 章 | `src/learning/vue/chapter-01-application-boundary/App.vue` | application shell |

## 0. 本章机制边界

本章的边界是 Vue component public contract，而不是“把一个页面拆成多个文件”。`ProductList.vue` 拥有 products、filter、selected product 等决策状态；`ProductCard.vue` 通过 props 读取 product，通过 `defineEmits` 把 select / favorite intent 交回 parent；`EditableTitle.vue` 使用 `defineModel<string>()` 展开 component `v-model`；`ModalWithSlots.vue` 和 `ScopedSlotTable.vue` 把内容 ownership 留给 parent；`ProvideInjectTheme.vue`、`ThemeProviderPanel.vue`、`ThemeConsumerPanel.vue` 用 `InjectionKey` 表示 ancestor context；`TemplateRefFocus.vue`、`AsyncComponentDemo.vue` 和 `AsyncLoadedPanel.vue` 分别展示 imperative ref 与 lazy component 边界。

真正执行这些行为的是 Vue component runtime：parent render effect 创建 child vnode，props 作为 child input，child `emit()` 同步调用 parent listener，slot 是 parent scope 中的 render function，provide/inject 通过 ancestor chain 查找，template ref 在 mount 后填入 DOM element 或 exposed component public surface。TypeScript 能检查 `defineProps<Props>()`、emit payload、`defineSlots` props、`InjectionKey<T>` 和 `defineExpose` 的 public shape，但不能阻止 parent 传入运行时非法外部数据，也不能保证 slot content 的业务语义。

跨过边界的值包括 `Product` prop、event payload、`modelValue` / `update:modelValue`、slot props、provided readonly theme state、template ref 的 nullable element/component instance、async component loader Promise。它纠正的误解是“子组件可以直接拥有父级业务状态”或“slot/provide/ref 都只是传值的同义词”。本章不把远距离共享状态升级为 Pinia，不处理 Router URL，不做 API validation，也不把 component ref 当常规数据通道。

## 1. 本章解决的问题

第 2 章已经说明一个组件内部的 ref、computed 与 DOM patch。第 3 章继续回答：值跨越组件实例后由谁拥有、谁只能读取、谁表达修改意图、谁决定 render 内容，以及何时需要跨层依赖或直接 DOM 访问。

核心链路是：**owner 创建响应式 source → parent render 把值变成 child prop / slot / injection → child 读取或发出 intent → owner mutation → Vue 调度相关 component render effect → patch DOM**。`emit()` 调用与 parent listener 执行处在当前同步调用链；由 listener 引起的 DOM patch 仍按 Vue 更新队列异步批处理。

## 2. 前置概念

| 前置知识 | 本章用途 |
| --- | --- |
| 第 1 章 native `v-model` | 对比 DOM input contract 与 component model contract |
| 第 2 章 `ref` / `reactive` / `computed` | 识别跨组件传递的实际 JavaScript value |
| 第 2 章 template ref / `nextTick` | 区分 state timing、mount timing 与 DOM patch timing |
| object reference | 理解 nested prop mutation 为什么会影响 parent object |
| function call 与 event listener | 理解 `emit()`、provided action 与 slot function |
| TypeScript structural typing | 理解静态契约不等于运行时数据验证 |
| SFC compiler | 理解 `defineProps`、`defineEmits`、`defineModel` 是 compiler macros |

## 3. 学习目标

- 能为每个 state 明确唯一 owner，并用 props down、events up 保持修改路径可追踪。
- 能区分 type-based props 与 runtime props validation。
- 能解释 component `v-model` 的 prop/event 展开和 `defineModel()` 返回 ref 的原因。
- 能解释 slot 在概念上是 parent 提供的 render function，以及 slot content 使用 parent scope。
- 能用 typed `InjectionKey<T>` 建立局部祖先依赖并处理 `undefined`。
- 能识别 fallthrough、DOM/component refs、lifecycle cleanup 和 async wrapper 的边界。
- 能从 props、emits、slots、model、injection 五张 API 图审查一个可复用组件。

## 4. 核心机制证据链总览

| 机制点 | 具体证据 | Vue runtime 发生什么 | 失败信号 |
| --- | --- | --- | --- |
| Parent state owner | `ProductList.vue` 持有 products/filter/selection | parent render 把 product slice 传给 `ProductCard` | child 内复制 product 后 parent filter 改变但 card 不同步 |
| Props down | `ProductCard.vue` 使用 `defineProps<Props>()` | child instance 接收 readonly prop，template 读取 prop 建立 render dependency | child 直接给 top-level prop 赋值触发 readonly warning |
| Events up | `ProductCard` `emit("select", product.id)` | emit 同步调用 `ProductList` listener，parent mutation 再触发 render | event name 或 payload 不匹配时 parent 完全不响应 |
| Component model | `EditableTitle.vue` `defineModel<string>()` | model ref 读写映射到 `modelValue` 和 `update:modelValue` | parent omitted 且 child default 造成初始值不同步 |
| Slot ownership | `ModalWithSlots.vue` / `ScopedSlotTable.vue` | child 决定 outlet，parent slot function 读取 parent scope 或接收 row slot props | slot 内访问 child local variable 失败，或 row rendering owner 混乱 |
| Ancestor context | `ProvideInjectTheme.vue` + `InjectionKey` | provider 写入 context，descendant inject 同一 Symbol key | missing provider 得到 `undefined`，或用 string key 丢失 type sync |
| Imperative escape | `TemplateRefFocus.vue` / `defineExpose` | mount 后 ref 才指向 element 或 exposed public surface | setup 同步阶段读 ref 得到 `null`，或访问未 expose 的 child method |
| Async boundary | `AsyncComponentDemo.vue` dynamic import `AsyncLoadedPanel.vue` | wrapper 延迟加载 component definition，resolved 后渲染真实 child | 把 async component 当 data fetching，导致 loading/error owner 错位 |

## 5. 核心术语表

| 术语 | 精确定义 |
| --- | --- |
| component boundary | 独立组件实例对输入、输出、内容扩展与环境依赖的公开边界 |
| prop | parent render 传给 child 的只读输入 |
| emit | child 对直接 parent listener 发出的命名意图与 payload |
| component model | 名为 `modelValue` / `update:modelValue` 的默认双向 contract |
| slot | parent 定义、child 通过 outlet 调用的内容 render function |
| scoped slot | child 调用 slot 时传入 slot props 的 slot |
| provide / inject | ancestor 向任意 descendant 暴露 dependency 的实例链查找机制 |
| fallthrough attribute | 未被 child 声明为 prop 或 emit 的 attribute / listener |
| template ref | render 后指向 DOM element 或 exposed component public instance 的 ref |
| async component | 延迟解析真实组件定义并转发 props/slots 的 wrapper |

## 6. 底层心智模型

1. 每次使用组件都会创建独立 component instance；同一 SFC 的两个实例不共享普通局部 state。
2. parent component render effect 读取 owner state，生成含 child props 和 slot functions 的 virtual node。
3. child instance 接收 props；Vue 阻止 child 对 top-level prop 的赋值，但 object prop 内部仍指向相同 JavaScript object。
4. child `emit(name, payload)` 查找当前 component vnode 上对应的 parent listener；custom event 不沿祖先树冒泡。
5. slot content 在 parent render scope 编译；child 只能通过 slot props 把自己的值作为参数交回这段 render logic。
6. injection 按 component ancestor chain 查找 key；它不是 DOM ancestor 查找，也不是天然 global store。
7. template ref、lifecycle 与 async wrapper 分别连接 DOM/public instance、实例时间轴和模块加载边界。

## 7. 推荐目录结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Chapter 03 directory tree</span>
  </div>

```text
src/learning/vue/chapter-03-component-communication/
├─ ComponentsChapterApp.vue
├─ ProductCard.vue
├─ ProductList.vue
├─ FilterPanel.vue
├─ EditableTitle.vue
├─ ModalWithSlots.vue
├─ ScopedSlotTable.vue
├─ ProvideInjectTheme.vue
├─ ThemeProviderPanel.vue
├─ ThemeConsumerPanel.vue
├─ TemplateRefFocus.vue
├─ FallthroughAttributeButton.vue
├─ LifecycleHookPanel.vue
├─ AsyncComponentDemo.vue
├─ AsyncLoadedPanel.vue
└─ component-library-lab/
   ├─ ComponentLibraryLab.vue
   ├─ BaseButton.vue
   ├─ BaseModal.vue
   ├─ BaseTabs.vue
   ├─ DataTable.vue
   ├─ FormField.vue
   ├─ BaseSelect.vue
   ├─ ToastProvider.vue
   ├─ ToastViewport.vue
   └─ theme-key.ts
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

浏览器打开 Vite 输出的 local URL，向下滚动到 Chapter 03。静态检查和生产构建使用：

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

### 9.1 组件边界：parent state、child props、child emits 与 render tree

**结论：** `ProductList` 是 product/filter/selection 的唯一 owner；`ProductCard` 只展示 prop 并 emit intent。

**本节解决的问题：** 避免 parent 和 child 同时写同一业务 state，造成修改来源不明。

**技术意义：** 清晰 owner 让组件可替换、event payload 可测试、更新链可追踪。

**概念解释：** component boundary 不是文件分隔，而是 instance 的公开 API：props 是输入，emits 是输出，slots 是 parent-controlled render extension。

**边界：template syntax、JavaScript runtime、Vue runtime、SFC compiler、TypeScript、Vite tooling：** template 的 `:product`/`@favorite` 建立绑定；JavaScript 传递 object 与 payload；Vue 建立实例与 render effect；SFC compiler 编译 template/macros；TypeScript 检查 shape；Vite 转换模块但不决定 state owner。

**组件通信证据链：**

1. source state 由 `ProductList` 的 `products`、`currentFilter`、`selectedProductId` refs 拥有。
2. `FilterPanel` 接收 `currentFilter`，`ProductCard` 接收具体 `product`。
3. concrete values 是 `"all"`、product object 和 `{ productId, source }` payload。
4. direction 是 parent-to-child props 与 child-to-parent events。
5. connection 使用 `defineProps`、`defineEmits`、`:key="product.id"`。
6. TypeScript 检查 prop/payload shape 与 listener 参数。
7. TypeScript 不验证未来从外部 JSON 得到的 product。
8. parent listener mutation 触发 computed 重新筛选和 component patch，所以 UI 改变。
9. child 直接写 `props.product = ...` 违反 readonly prop；nested mutation虽可能执行，却破坏 owner 规则。
10. 真实项目中可通过“某个值有几个 writer”识别边界混乱。

**API / 语法规则：** props 单向下传；custom event 只由直接 parent listener 接收；list key 使用稳定业务 id。

**文件结构：** `ProductList.vue` 负责 container，`FilterPanel.vue` 负责 filter intent，`ProductCard.vue` 负责 display/action intent。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/ProductList.vue</span>
  </div>

```vue
<ProductCard
  v-for="product in filteredProducts"
  :key="product.id"
  :product="product"
  @select="selectProduct"
  @favorite="toggleFavorite"
/>
```

</div>

**逐行解释：** `v-for` 读取 filtered result；`:key` 维持 instance identity；`:product` 输入 object；两个 listener 把 typed intent 交给 owner。

**执行过程：** click → child emit → parent handler 同步执行 → owner ref/object mutation → Vue queue render → DOM patch。

**变量、props、emits、slots 与 refs 的变化：** `product` prop 本身不变；payload 是新 object；parent 的 `selectedProductId` 或目标 product 的 `favorite` 改变。

**为什么得到这个结果：** template render 依赖这些响应式 property，因此 mutation 会 trigger 对应 component update。

**对比写法：** 把 `products` 复制进每个 card 会产生多个 source of truth；只传 id 又会迫使 child 隐式查全局数据。

**常见错误为什么错：** 使用 array index key 会在重排时把旧 instance state 错配给新 item。

**与真实项目的关系：** 商品列表、用户列表、设置面板都适用 container owns data、item emits intent。

**与当前学习主线的关系：** 第 2 章的 ref/computed 现在通过 component boundary 参与多个 render effects。

**最终记忆模型：** owner 写 state；child 读 props；child emit intent；owner 决策并更新。

<a id="section-9-2"></a>

### 9.2 defineProps：props declaration、one-way data flow 与 readonly boundary

**结论：** `defineProps<Props>()` 描述 child 可接收的输入；child 不能给 top-level prop 重新赋值。

**本节解决的问题：** 让 `ProductCard` 的依赖显式且由调用方提供。

**技术意义：** readonly surface 防止 child 偷走 parent ownership。

**概念解释：** prop 每次 parent update 都可能获得新值；它不是 child 创建的 local ref。object/array nested field 仍是共享 reference，所以“技术上可改”不等于“设计上应改”。

**边界：template syntax、JavaScript runtime、Vue runtime、SFC compiler、TypeScript、Vite tooling：** template 直接读取 `product.name`；JS object 保持 reference identity；Vue 提供 shallow readonly props proxy；compiler 从 type 生成可用的 runtime declaration；TS 检查静态使用；Vite 只运行 SFC pipeline。

**组件通信证据链：**

1. `ProductList` owns product object。
2. `ProductCard` receives it through `product` prop。
3. value 是 `{ id, name, category, price, favorite }`。
4. flow 是 parent-to-child。
5. mechanism 是 type-based `defineProps` 与 `withDefaults`。
6. TS 检查 required prop、union category、number price。
7. TS 不阻止恶意 runtime caller 或验证 server JSON。
8. card UI 来自当前 prop fields。
9. `props.product = other` 违反 readonly；`props.product.favorite = true` 绕过 top-level guard 但破坏 owner clarity。
10. 看到 child 修改 prop path 时应追问 mutation 是否应转成 emit。

**API / 语法规则：** type-based declaration 与 runtime object declaration不能在同一次 `defineProps()` 中混用；optional default 可用 `withDefaults`。

**文件结构：** `ProductCard.vue` 的 `Props` 仅包含 display needs。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/ProductCard.vue</span>
  </div>

```ts
type Props = {
  product: Product;
  showPrice?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  showPrice: true,
});
```

</div>

**逐行解释：** `product` required；`showPrice` optional；default 使组件内部获得确定 boolean；`props` 保存 compiler macro 生成的 prop access。

**执行过程：** parent render 创建 prop input → child setup 获取 props proxy → child render 读取 fields → parent mutation 使 child update。

**变量、props、emits、slots 与 refs 的变化：** `showPrice` 未传时解析为 `true`；product reference 仍属于 parent；本段不创建 local copy。

**为什么得到这个结果：** Vue 按声明识别 prop，并把 parent vnode 中对应值交给 child。

**对比写法：** `const local = ref(props.product)` 只复制 reference，并没有建立独立业务 owner。

**常见错误为什么错：** 静态 `price="10"` 是 string；需要 number 时应使用 `:price="10"`。

**与真实项目的关系：** 清晰 Props type 就是可复用组件的最小输入文档。

**与当前学习主线的关系：** 第 2 章内部 state 现在成为第 3 章跨实例的 readonly input。

**最终记忆模型：** props 是 parent snapshot-like input surface，不是 child mutation surface。

<a id="section-9-3"></a>

### 9.3 props validation：runtime declaration、type-based declaration 与 TypeScript 边界

**结论：** type-based props 优化开发期契约；runtime declaration 才能在运行时检查 constructor/validator，但仍不是完整 schema validation。

**本节解决的问题：** 不把 TypeScript diagnosis 误认为浏览器中的 external data validation。

**技术意义：** 能按边界选择静态类型、Vue dev warning 或真正的数据解析器。

**概念解释：** `ProductCard` 用 type-based declaration；`FallthroughAttributeButton` 故意用 runtime declaration展示 `type`、`default`、`validator`。两者属于两种声明风格。

**边界：template syntax、JavaScript runtime、Vue runtime、SFC compiler、TypeScript、Vite tooling：** TS types 会擦除；SFC compiler 能从可分析类型生成 best-effort runtime metadata；Vue runtime declaration 在开发期校验传值；Vite build 不把 TS type 变成通用 validator。

**组件通信证据链：**

1. caller owns `label`/`tone` values。
2. button receives runtime-declared props。
3. values 是 string `"primary"` / `"neutral"`。
4. direction 是 parent-to-child。
5. mechanism 是 runtime `defineProps({ ... })`。
6. TS 从 declaration 推断合法读取类型。
7. TS 不检查浏览器运行时动态拼装的未知 value。
8. valid tone 决定 CSS class；invalid tone 在 dev 产生 Vue warning。
9. 把 `defineProps<Props>()` 当 external validation 违反 static/runtime boundary。
10. API response 未经 parse 就断言成 interface 是同类风险。

**API / 语法规则：** runtime declaration支持 `type`、`required`、`default`、`validator`；mutable object/array default 应使用 factory。

**文件结构：** runtime 教学集中在 `FallthroughAttributeButton.vue`，其余文件优先 type-based declaration。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/FallthroughAttributeButton.vue</span>
  </div>

```ts
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  tone: {
    type: String as PropType<"primary" | "neutral">,
    default: "primary",
    validator: (value: string) =>
      value === "primary" || value === "neutral",
  },
});
```

</div>

**逐行解释：** constructor 验证 string；`required` 定义缺失警告；`PropType` 给 TS union；validator 检查允许值；default 处理未传情况。

**执行过程：** component 创建时 Vue resolve props → 应用 default → dev validation → setup/render 使用解析值。

**变量、props、emits、slots 与 refs 的变化：** 未提供 tone 时 prop 成为 `"primary"`；没有额外 ref 或 emit。

**为什么得到这个结果：** runtime object 在生成的 JavaScript 中真实存在，TS type 在 emit 后不存在。

**对比写法：** `defineProps<{ tone: "primary" | "neutral" }>()` 更精简，但 runtime unknown data 仍需单独验证。

**常见错误为什么错：** 同时传 type argument 和 runtime object 会混合两套 source of truth，macro 不允许。

**与真实项目的关系：** public library 可用 runtime warning；API boundary 仍需 schema/parser，不由 props 代替。

**与当前学习主线的关系：** 延续前两章的 TypeScript static checking 与 JavaScript runtime 分层。

**最终记忆模型：** TS 防开发期误用；runtime props 给有限警告；external data 需要运行时解析。

<a id="section-9-4"></a>

### 9.4 defineEmits：custom event、payload contract 与 parent listener

**结论：** `defineEmits` 声明 child 输出；`emit()` 同步调用直接 parent listener，但 DOM update 被 Vue 调度。

**本节解决的问题：** child 不拥有 state 时如何把用户意图交给 owner。

**技术意义：** event name 和 payload shape 构成稳定 output API。

**概念解释：** component event 与 DOM event 不同；它由 component instance 发出，不沿 component tree 冒泡。

**边界：template syntax、JavaScript runtime、Vue runtime、SFC compiler、TypeScript、Vite tooling：** child template click 调函数；JS 创建 payload；Vue 查找 vnode listener；compiler 暴露 macro；TS 校验 name/payload；Vite 不改变同步 emit 语义。

**组件通信证据链：**

1. `ProductList` owns favorite state。
2. `ProductCard` only receives product and emits intent。
3. payload 是 `{ productId: number, source: "favorite" }`。
4. direction 是 child-to-direct-parent。
5. mechanism 是 typed `defineEmits` 和 parent `@favorite`。
6. TS 检查 event literal 与 tuple payload。
7. TS 不保证 runtime caller 传来的 productId 对应现有 product。
8. handler 同步找到 product 并 mutation，随后 UI 在 update queue patch。
9. 期待 grandparent 自动收到 event 违反 non-bubbling rule。
10. event 发出但 handler 不运行时先比对名称和 direct parent。

**API / 语法规则：** 声明明确 event；payload 携带 owner 做决策所需的最小语义信息。

**文件结构：** `ProductCard.vue` 发出 `select` / `favorite`；`ProductList.vue` 监听并写 state。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/ProductCard.vue</span>
  </div>

```ts
const emit = defineEmits<{
  select: [payload: ProductActionPayload];
  favorite: [payload: ProductActionPayload];
}>();

emit("favorite", {
  productId: props.product.id,
  source: "favorite",
});
```

</div>

**逐行解释：** named tuple 同时记录 event 与 payload；emit name 必须匹配；id 让 parent 找到自己的 source object；source 让 intent 可诊断。

**执行过程：** native click handler → `emit()` → parent listener → parent mutation → batched render/patch。

**变量、props、emits、slots 与 refs 的变化：** payload 是一次性普通 object；child prop 未变；parent product field 改变。

**为什么得到这个结果：** listener 是 parent render 传到 child vnode 的函数，不需要 DOM bubbling。

**对比写法：** emit 整个可变 product object 会扩大耦合；只发 event 无 id 又无法标识目标。

**常见错误为什么错：** `emit("favourite")` 与 parent `@favorite` 名称不一致，listener 永远不匹配。

**与真实项目的关系：** `save`、`remove`、`select` 应表达 intent，不应让 reusable child 直接调用业务 store。

**与当前学习主线的关系：** reactive mutation 仍按第 2 章机制更新，只是 mutation 入口跨过了 event boundary。

**最终记忆模型：** emit 同步递交 intent；owner 同步改 state；Vue 异步批量 patch DOM。

<a id="section-9-5"></a>

### 9.5 Component v-model：defineModel、modelValue、update:modelValue 与双向绑定展开

**结论：** `v-model` 是 prop + update event 的语法协议；Vue 3.4+ 的 `defineModel()` 返回与该协议同步的 ref。

**本节解决的问题：** reusable editor 如何读取 parent value 并把编辑结果同步回 owner。

**技术意义：** 缩短标准 input-like component contract，同时不隐藏 state owner。

**概念解释：** `<EditableTitle v-model="editableTitle" />` 等价于 `:model-value="editableTitle"` 加 `@update:model-value="editableTitle = $event"`；child model ref assignment 会 emit update。

**边界：template syntax、JavaScript runtime、Vue runtime、SFC compiler、TypeScript、Vite tooling：** template 展开 directive；macro 编译为 prop/emits；JS event handler 写 model ref；Vue 连接 parent ref；TS 检查 string；Vite 版本不改变 contract。

**组件通信证据链：**

1. `ComponentsChapterApp` owns `editableTitle` ref。
2. `EditableTitle` receives model value。
3. value 是 string，child 中表现为 `Ref<string>`。
4. flow 是 parent-to-child value + child-to-parent update。
5. mechanism 是 component `v-model` / `defineModel`。
6. TS 检查 model type。
7. TS 不验证用户文本的业务合法性。
8. input event 写 child model → update event 改 parent ref → title UI patch。
9. 把 model 当纯 local state 违反“assignment 会更新 parent”的 contract。
10. 看到 reusable control 内部复制 prop 且不发 update 时可识别 sync bug。

**API / 语法规则：** default model 使用 `modelValue` 与 `update:modelValue`；named models 可用 argument；本章只需默认 model。

**文件结构：** `EditableTitle.vue` 是单一 model contract；final lab 的 `BaseModal`、`BaseTabs`、`BaseSelect` 复用同一机制。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/EditableTitle.vue</span>
  </div>

```ts
const title = defineModel<string>({ required: true });

function updateTitle(event: Event): void {
  const input = event.currentTarget;
  if (input instanceof HTMLInputElement) {
    title.value = input.value;
  }
}
```

</div>

**逐行解释：** macro 生成 model prop/emits；required 明确 caller 必须提供；DOM event 先做 runtime narrowing；assignment 请求 parent update。

**执行过程：** input → child model ref assignment → `update:modelValue` listener → parent ref assignment → parent/child render update。

**变量、props、emits、slots 与 refs 的变化：** DOM input value 变为 string；model ref 和 parent ref 最终同步；没有第二份业务 state。

**为什么得到这个结果：** model ref 的 setter 被 compiler/runtime 连接到 update event。

**对比写法：** Vue 3.4 前显式声明 `modelValue` prop 和 `update:modelValue` emit，语义相同，只是样板更多。

**常见错误为什么错：** `const local = ref(props.modelValue)` 只初始化一次，后续 parent update 不自动同步 local。

**与真实项目的关系：** input、select、modal open state、active tab 都适合 model contract；业务实体不应随意全部做双向 model。

**与当前学习主线的关系：** 第 1 章 native `v-model` 连接 DOM property/event；本节连接 component prop/event。

**最终记忆模型：** component `v-model` 没有第三种数据流，它只是标准化的 props down + update events up。

<a id="section-9-6"></a>

### 9.6 slots：slot outlet、parent scope 与内容分发

**结论：** slot 让 child 决定 outlet 位置，让 parent 决定内容；slot content 读取 parent scope。

**本节解决的问题：** modal 复用结构，但 header/body/footer 内容不能被固定 props 穷举。

**技术意义：** slot 扩展 render structure，props 传普通数据，两者职责不同。

**概念解释：** 在编译概念模型中，parent 将 slot content 变成函数交给 child；child render `<slot>` 时调用它。它既是内容分发，又可理解为受控 render callback，但应以 Vue slot API 为主。

**边界：template syntax、JavaScript runtime、Vue runtime、SFC compiler、TypeScript、Vite tooling：** parent template 定义 slot；compiler 生成 slot functions；Vue 在 child outlet 调用；函数 closure 捕获 parent bindings；TS 可由 `defineSlots` 检查接口；Vite 仅编译模块。

**组件通信证据链：**

1. `ComponentsChapterApp` owns `editableTitle` 与 modal content。
2. `ModalWithSlots` receives parent-provided slot functions。
3. concrete values 是 header vnode、body vnode、footer button handler。
4. flow 是 parent-provided content rendered inside child。
5. mechanism 是 default/named slot outlets。
6. TS 检查已声明 slot 时的 slot names/props。
7. TS 不验证 rendered HTML 的业务语义或 accessibility completeness。
8. body 能显示 parent title，因为 closure scope 属于 parent。
9. 期待 slot 直接读取 child local binding 违反 parent-scope rule。
10. slot 内变量 unresolved 时先判断它属于哪个 component setup scope。

**API / 语法规则：** unnamed content进入 default slot；`#header`/`#footer` 对应 named outlets。

**文件结构：** `ModalWithSlots.vue` owns shell/close event；caller owns content。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/ComponentsChapterApp.vue</span>
  </div>

```vue
<ModalWithSlots :open="showSlotModal" @close="showSlotModal = false">
  <template #header>
    <h3>Parent-provided header</h3>
  </template>
  <p>{{ editableTitle }}</p>
  <template #footer>
    <button type="button" @click="showSlotModal = false">Close</button>
  </template>
</ModalWithSlots>
```

</div>

**逐行解释：** open 是 prop；close 是 event；header/footer 是 named slots；中间 paragraph 是 default slot；所有表达式属于 caller。

**执行过程：** parent render 建 slot functions → child render outlets → functions 在 parent scope 求值 → resulting vnodes 插入 child layout。

**变量、props、emits、slots 与 refs 的变化：** modal open ref 由 parent 改；slot closure 每次 parent render 读取最新 title。

**为什么得到这个结果：** slot function 的 lexical render scope 在定义方，不因 DOM 出现在 child 内而改变。

**对比写法：** 把整个 header HTML 作为 string prop 会丢失 declarative vnode、event binding 与类型能力。

**常见错误为什么错：** 在 parent slot 写 `{{ childLocal }}` 无法访问 child setup binding。

**与真实项目的关系：** Modal、Card、Layout、FormField 常用 slots 暴露结构扩展点。

**与当前学习主线的关系：** props/emits 处理数据与意图，slot 增加 parent-controlled rendering channel。

**最终记忆模型：** content 在 parent 定义，在 child outlet 出现，在 parent scope 求值。

<a id="section-9-7"></a>

### 9.7 scoped slots：slot props、child data exposure 与 render scope

**结论：** scoped slot 是 child 调用 parent slot function 时传入参数；child owns data iteration，parent owns row rendering。

**本节解决的问题：** table 如何保持 traversal logic，却允许 caller 自定义每行/单元格视觉。

**技术意义：** 将 data mechanics 与 view policy 分开，不把业务 UI 固化在 generic component。

**概念解释：** `ScopedSlotTable` 迭代内部 rows，并用 `<slot :row="row" :index="index">` 暴露每次调用的数据。

**边界：template syntax、JavaScript runtime、Vue runtime、SFC compiler、TypeScript、Vite tooling：** slot props object 是真实函数参数；Vue 调 slot；compiler 生成函数；`defineSlots` 检查 shape；TS 不做 runtime row validation；Vite 不拥有 iteration。

**组件通信证据链：**

1. `ScopedSlotTable` owns rows。
2. parent slot receives `row`/`index`。
3. values 是 row object 与 number index。
4. flow 是 child data → parent-provided render function → child outlet。
5. mechanism 是 scoped slot props。
6. TS 检查 destructured slot prop shape。
7. TS 不验证动态 external row。
8. parent format 显示 concept/direction/owner，因为每次 slot invocation 接收当前 row。
9. 无 slot props 却期待 child value 违反 render scope。
10. generic table 出现大量 hard-coded business conditions 时应考虑 scoped slot。

**API / 语法规则：** slot prop 名是 child public API；应稳定、最小、语义化。

**文件结构：** 基础练习用 `ScopedSlotTable.vue`；final `DataTable.vue` 提供 `cell` scoped slot。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/ScopedSlotTable.vue</span>
  </div>

```vue
<li v-for="(row, index) in rows" :key="row.id">
  <slot name="row" :row="row" :index="index">
    {{ row.concept }}
  </slot>
</li>
```

</div>

**逐行解释：** child 选择 rows 顺序和 stable key；named slot 获得当前 row/index；fallback 在 caller 未提供 slot 时使用。

**执行过程：** child iteration → 为每行创建 props object → 调 parent slot function → parent formatting vnodes 返回 child render tree。

**变量、props、emits、slots 与 refs 的变化：** rows 不转移 ownership；slot props 是当前 render 调用的只读输入视图。

**为什么得到这个结果：** function argument 能把 callee 数据交给 caller-provided function，这正是 scoped slot 的编译概念模型。

**对比写法：** 普通 slot 没参数，只能读 parent scope；scoped slot 明确暴露 child value。

**常见错误为什么错：** 把 slot props 当可长期持有的业务 store 会混淆 render input 与 state ownership。

**与真实项目的关系：** table cell、list item、autocomplete result、virtual list renderer 都常用此模式。

**与当前学习主线的关系：** 从 value communication 扩展到 rendering responsibility communication。

**最终记忆模型：** child owns traversal/data；parent owns presentation；slot props 是桥。

<a id="section-9-8"></a>

### 9.8 provide / inject：prop drilling、dependency provider 与 InjectionKey

**结论：** provide/inject 适合稳定的 ancestor service/context；provider owns state 并提供 readonly value + explicit actions。

**本节解决的问题：** 深层 descendant 需要 theme/toast context，而中间组件不应仅为转发而声明 props。

**技术意义：** 减少 prop drilling，同时保留局部 provider boundary。

**概念解释：** `InjectionKey<T>` 是 typed symbol，统一 provider/consumer contract；inject 可能为 `undefined`，因为 descendant 可能脱离 provider 使用。

**边界：template syntax、JavaScript runtime、Vue runtime、SFC compiler、TypeScript、Vite tooling：** Symbol 是 JS identity；Vue 按 component ancestor chain 查找；readonly ref 在 runtime 阻止 consumer write surface；TS 同步 key/value type；compiler/Vite 不把 injection 变成 global state。

**组件通信证据链：**

1. `ThemeProviderPanel` owns `theme` ref；`ToastProvider` owns toasts。
2. consumer/viewport inject context。
3. values 是 readonly ref、toggle/add/dismiss functions、typed symbol key。
4. flow 是 ancestor-to-descendant dependency，actions 反向调用 owner function。
5. mechanism 是 `provide`/`inject` + `InjectionKey`。
6. TS 检查 key 对应 context shape。
7. TS 不能保证 runtime ancestor 一定 provide，所以 result 仍可能 undefined。
8. consumer 调 action → provider mutation → injected ref subscribers update。
9. 使用任意 string key、直接写 injected state、把所有业务 state 隐藏进去都破坏边界。
10. descendant 难以独立 render 或 dependency 来源难查时，说明 injection 被滥用。

**API / 语法规则：** mutation 尽量与 provider 共置；可 provide `readonly(state)` 与明确 action。

**文件结构：** `theme-key.ts` 共享 contracts；provider 和 consumer 分文件让 ancestor boundary 可见。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/ThemeProviderPanel.vue</span>
  </div>

```ts
const theme = ref<ThemeName>("light");

provide(themeKey, {
  theme: readonly(theme),
  toggleTheme: () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  },
});
```

</div>

**逐行解释：** provider 创建 source；key 绑定 ThemeContext type；readonly 限制 consumer write；action 把 mutation 留在 owner。

**执行过程：** provider setup 注册 context → descendant setup inject → template 读取 injected ref → action 写 provider ref → descendant update。

**变量、props、emits、slots 与 refs 的变化：** 同一 reactive source 通过 readonly wrapper 暴露；没有逐层 props；function call 回到 owner。

**为什么得到这个结果：** injected ref 保留响应性且不会自动解包为普通 snapshot。

**对比写法：** 只有一层 parent-child 时 props 更显式；应用级复杂 state 将在后续 Pinia 章节处理。

**常见错误为什么错：** `inject(themeKey)!.theme` 用非空断言隐藏 missing provider 风险。

**与真实项目的关系：** theme、form group、toast host、feature context 适合局部 provider。

**与当前学习主线的关系：** 这是跨多级 instance 的 dependency channel，不替代 props/emits 主路径。

**最终记忆模型：** nearby data 用 props；deep stable dependency 用 typed injection；mutation 回到 provider。

<a id="section-9-9"></a>

### 9.9 fallthrough attributes：未声明 props/emits 的 attribute 与 listener 继承

**结论：** 单 root component 默认把未声明 attributes/listeners 继承到 root；已声明 prop/emit 不属于 fallthrough。

**本节解决的问题：** wrapper button 如何接受 caller 的 `id`、`class`、`aria-label` 与 native `click`。

**技术意义：** 保留原生元素能力，避免为每个 HTML attribute 重复造 prop。

**概念解释：** `FallthroughAttributeButton` 声明 `label`/`tone` 与 `activate`，因此其他 attrs 落到 root button；class/style 会合并。

**边界：template syntax、JavaScript runtime、Vue runtime、SFC compiler、TypeScript、Vite tooling：** parent vnode 携带 attrs；Vue 根据 props/emits declaration 分类并 merge 到 root；TS 对 arbitrary attrs 的精度有限；multiple roots 无唯一目标；Vite 不参与继承规则。

**组件通信证据链：**

1. caller owns id/class/aria/native listener。
2. child root button receives fallthrough attrs。
3. values 是 strings、class token、click function。
4. flow 是 parent-to-child-root attribute/listener。
5. mechanism 是 single-root fallthrough。
6. TS 检查 declared props/emits，部分 DOM attrs由 template tooling 检查。
7. TS 不保证任意 attr 对最终 element 语义正确。
8. DOM inspector 能看到 merged id/class/aria；click 同时触发 native listener和 child activate。
9. multiple-root 未显式 `$attrs` binding 违反“无唯一继承目标”边界。
10. wrapper 导致 aria/id 消失时检查 root 数量与 `inheritAttrs`。

**API / 语法规则：** 需要控制落点时用 `defineOptions({ inheritAttrs: false })` 配合 `$attrs` / `useAttrs()` 手动绑定。

**文件结构：** `FallthroughAttributeButton.vue` 保持唯一 root button；`BaseButton.vue` 重用模式。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/ComponentsChapterApp.vue</span>
  </div>

```vue
<FallthroughAttributeButton
  id="fallthrough-action"
  class="parent-accent"
  aria-label="Run fallthrough attribute example"
  label="Inspect inherited attributes"
  @activate="recordFallthroughEvent('declared activate event')"
  @click="recordFallthroughEvent('native click listener')"
/>
```

</div>

**逐行解释：** id/class/aria 和 native click 未被 component 声明，继承到 button；activate 已声明，是 component listener。

**执行过程：** parent render 分类 props/listeners → child root vnode merge attrs → browser click → native listener + emit handler 执行。

**变量、props、emits、slots 与 refs 的变化：** attributes 进入 DOM；events 数组记录两条路径；label/tone 仍是 props。

**为什么得到这个结果：** Vue 把 undeclared attrs 默认应用到 single root。

**对比写法：** multi-root wrapper 必须选择实际 interactive element 并 `v-bind="$attrs"`。

**常见错误为什么错：** 把 `click` 声明为 component emit 后又期待它作为 native fallthrough，会改变 listener 分类。

**与真实项目的关系：** Button、Input、Link wrappers 必须保留 accessibility 和 testing attributes。

**与当前学习主线的关系：** component API 不止 props；未声明 surface 也会影响最终 DOM。

**最终记忆模型：** declared input/output 归 component；undeclared attrs 默认落 single root。

<a id="section-9-10"></a>

### 9.10 template refs：DOM refs、component refs、mount timing 与 defineExpose

**结论：** template ref 是 imperative escape hatch；首轮 mount 前为 `null`，DOM ref 指 element，component ref 只看到 public/exposed surface。

**本节解决的问题：** 何时安全 focus DOM，以及 parent 如何调用 child 主动暴露的方法。

**技术意义：** 将必要的 DOM/public-instance access 限制在明确边界，不替代 declarative state。

**概念解释：** Vue 3.5 的 `useTemplateRef()` 用 template ref name 建立 ref；`<script setup>` component 默认 closed，`defineExpose` 决定 parent 可见成员。

**边界：template syntax、JavaScript runtime、Vue runtime、SFC compiler、TypeScript、Vite tooling：** template `ref` 在 patch 时注册；Vue mount 后赋 element/instance；TS 推断或显式指定 element/public type；browser 执行 focus；compiler 处理 expose；Vite 不保证 mount timing。

**组件通信证据链：**

1. `TemplateRefFocus` owns DOM input ref；`ComponentsChapterApp` owns child component ref。
2. local hook receives DOM element，parent receives exposed child method。
3. values 是 `HTMLInputElement | null` 与 exposed `{ focusInput } | null`。
4. flow 是 direct DOM access / parent-to-child public instance call。
5. mechanism 是 `useTemplateRef`、`onMounted`、`defineExpose`。
6. TS 检查 element method和 exposed member。
7. TS 不保证当前 runtime branch 已 mount，所以 null handling仍需要。
8. mount 后 ref 被赋值，focus 成功；unmount 时回到 null。
9. setup 立即 `.focus()` 违反 mount timing；读取未 expose internals 违反 closed instance。
10. ref intermittently null 时检查 `v-if` 与 lifecycle。

**API / 语法规则：** DOM 操作放 `onMounted` 或 user event；优先 props/state 表达 UI；ref 用于 focus、measure、第三方 DOM integration。

**文件结构：** `TemplateRefFocus.vue` 暴露 `focusInput()`；`ComponentsChapterApp.vue` 通过 component ref 调用。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/TemplateRefFocus.vue</span>
  </div>

```ts
const focusInputElement =
  useTemplateRef<HTMLInputElement>("focus-input");

function focusInput(): void {
  focusInputElement.value?.focus();
}

onMounted(focusInput);
defineExpose({ focusInput });
```

</div>

**逐行解释：** generic 指明 DOM type；optional chaining处理 null；mounted 后 focus；expose 只开放一个 method。

**执行过程：** setup 创建 empty ref → render/patch input → Vue 写 element → mounted hook focus → parent ref 可调用 exposed method。

**变量、props、emits、slots 与 refs 的变化：** ref 从 null 到 element/instance；focus 改变 browser active element，不改变 business state。

**为什么得到这个结果：** DOM element 只有完成真实 DOM insertion 后才存在。

**对比写法：** Vue 3.5 前可用 `const input = ref<HTMLInputElement | null>(null)` 与 `ref="input"`。

**常见错误为什么错：** 用 ref 直接改 child DOM 来表达 open/selected，会绕过 declarative component API。

**与真实项目的关系：** autofocus、measurement、media playback、third-party widget 是合理用途。

**与当前学习主线的关系：** 第 2 章讲 ref/timing；本节增加跨 component public instance boundary。

**最终记忆模型：** render 前 null；mount 后 target；只 expose 最小 imperative API。

<a id="section-9-11"></a>

### 9.11 lifecycle hooks：onMounted、onUpdated、onUnmounted 与组件实例生命周期

**结论：** hooks 描述当前 instance 相对 render/DOM 的时间点；side effect 在 mounted 建立，在 unmounted 清理。

**本节解决的问题：** window listener 何时可注册、DOM 何时存在、组件移除时如何防止泄漏。

**技术意义：** side effect lifetime 与 component lifetime 对齐。

**概念解释：** `onMounted` 在 initial DOM 创建后；`onUpdated` 在 reactive update 导致 DOM patch 后；`onUnmounted` 在 instance 移除后执行 cleanup。

**边界：template syntax、JavaScript runtime、Vue runtime、SFC compiler、TypeScript、Vite tooling：** `v-if` 决定 instance create/destroy；browser 提供 window listener；Vue 调 hooks；TS 检查 callback；compiler/Vite 不替你 cleanup。

**组件通信证据链：**

1. `LifecycleHookPanel` owns count/status/resizeCount。
2. parent `ComponentsChapterApp` owns whether child exists。
3. values 是 boolean toggle、component refs、window callback。
4. flow 是 parent render controls instance；instance accesses browser lifecycle。
5. mechanism 是 `v-if` + lifecycle hooks。
6. TS 检查 listener/callback types。
7. TS 不检测忘记 remove listener 的 resource leak。
8. mount 注册；count update patch 后触发 updated；unmount 移除 listener。
9. 在 `onUpdated` 无条件改 render dependency 会造成 update loop。
10. 重复 mount 后 listener 次数增长说明 cleanup 缺失。

**API / 语法规则：** hooks 必须在 setup 同步注册；cleanup 使用与 add 相同 function reference。

**文件结构：** parent 提供 mount/unmount control，child 负责自己的 external resource。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/LifecycleHookPanel.vue</span>
  </div>

```ts
onMounted(() => {
  window.addEventListener("resize", recordResize);
});

onUpdated(() => {
  console.info("LifecycleHookPanel updated");
});

onUnmounted(() => {
  window.removeEventListener("resize", recordResize);
});
```

</div>

**逐行解释：** mounted 建 external subscription；updated 仅观察而不写依赖；unmounted 使用同一 callback cleanup。

**执行过程：** parent true → instance setup/render/mount → local state update → patch/updated → parent false → unmount/cleanup。

**变量、props、emits、slots 与 refs 的变化：** parent boolean 决定 instance；child refs 随实例消失；window 不再持有 callback。

**为什么得到这个结果：** `v-if` 删除的是 component instance，不只是隐藏 CSS。

**对比写法：** `v-show` 通常只切换 display，不触发反复 mount/unmount。

**常见错误为什么错：** anonymous add/remove callbacks不是同一 function identity，无法成功移除。

**与真实项目的关系：** subscriptions、observers、timers、third-party instances 都要绑定 lifetime。

**与当前学习主线的关系：** 第 2 章 update pipeline 现在放入完整 instance lifecycle。

**最终记忆模型：** setup 注册 hooks；mounted acquire；updated observe；unmounted release。

<a id="section-9-12"></a>

### 9.12 async components：defineAsyncComponent、dynamic import 与 lazy component boundary

**结论：** async component 延迟加载 component definition；它不是 API data fetching。

**本节解决的问题：** 非首屏组件如何到真正需要 render 时才请求对应 module chunk。

**技术意义：** 建立 component-level split point，减少 initial bundle 工作量。

**概念解释：** `defineAsyncComponent(() => import("./AsyncLoadedPanel.vue"))` 返回 wrapper；wrapper 管理 loading/error/delay/timeout，并在 resolved 后转发 props/slots。

**边界：template syntax、JavaScript runtime、Vue runtime、SFC compiler、TypeScript、Vite tooling：** JS dynamic import 返回 Promise；Vite/Rollup 生成 split chunk；Vue wrapper 管理状态；SFC compiler处理被加载组件；TS检查 prop；browser请求 chunk。

**组件通信证据链：**

1. `AsyncComponentDemo` owns `showPanel`。
2. async wrapper receives `message` prop，resolved panel receives forwarded prop。
3. values 是 boolean、import Promise、component module、message string。
4. flow 是 parent control → wrapper → resolved child。
5. mechanism 是 `defineAsyncComponent` + dynamic import。
6. TS 检查 import module与 known component prop。
7. TS 不保证 network/chunk load 成功。
8. first render wrapper 显示 loading，Promise resolve 后替换为 loaded panel。
9. 把 async component当 fetch business data 违反 module-loading boundary。
10. chunk request只在 toggle 后出现说明 lazy boundary生效。

**API / 语法规则：** loader 返回 Promise；可配 loading/error component、delay、timeout；本章不把 Suspense 作为主模型。

**文件结构：** `AsyncComponentDemo.vue` owns wrapper/control；`AsyncLoadedPanel.vue` 是独立 lazy module。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/AsyncComponentDemo.vue</span>
  </div>

```ts
const AsyncLoadingPanel = defineComponent({
  name: "AsyncLoadingPanel",
  setup() {
    return () =>
      h("p", { class: "loading-panel" }, "Loading the component chunk...");
  },
});

const AsyncLoadedPanel = defineAsyncComponent({
  loader: () => import("./AsyncLoadedPanel.vue"),
  loadingComponent: AsyncLoadingPanel,
  delay: 0,
  timeout: 5000,
});
```

</div>

**逐行解释：** loader 创建 split point；loading component 是 wrapper pending UI；delay 立即显示；timeout 定义等待上限。

**执行过程：** user toggle → wrapper mount → loader import → browser chunk request → module resolve → Vue mount real child。

**变量、props、emits、slots 与 refs 的变化：** showPanel 从 false 到 true；wrapper internal state pending→resolved；message prop 被转发。

**为什么得到这个结果：** dynamic import 只有执行 loader 时才开始 module loading。

**对比写法：** static import 会把 component 放在 eager module graph 中；fetch 则加载业务数据而非 component code。

**常见错误为什么错：** 在 setup 外先调用 import 并缓存结果可能提前开始加载，失去预期 lazy timing。

**与真实项目的关系：** 大型 editor、chart、设置页的非首屏 panel 常适合 async boundary。

**与当前学习主线的关系：** component API 不变，但 definition arrival time 变成异步。

**最终记忆模型：** async wrapper 延迟 code；resolved child 仍遵守普通 props/emits/slots。

<a id="section-9-13"></a>

### 9.13 Chapter integration：ProductList、FilterPanel、EditableTitle 如何串起父子通信

**结论：** integration layer 只安排 demo；业务 owner 留在最接近完整决策上下文的 parent。

**本节解决的问题：** 多种 communication channels 如何共存而不变成一个巨大 root component。

**技术意义：** 展示 container、display component、input-like component 的不同 API。

**概念解释：** `ComponentsChapterApp` 只拥有跨 demo 的 modal/title/toggle；`ProductList` 自己拥有 product feature state；`EditableTitle` 通过 model 接收 owner value。

**边界：template syntax、JavaScript runtime、Vue runtime、SFC compiler、TypeScript、Vite tooling：** imports 使 SFC bindings 在 template 可用；Vue 为每个 child 建 instance；TS 检查组合 API；Vite resolve module；root 不接管 child internal state。

**组件通信证据链：**

1. `ProductList` owns products；chapter app owns title/modal/lifecycle toggle。
2. children分别接收 props/model/slots。
3. values 是 arrays、filters、strings、booleans、payloads。
4. flow 包含 props down、events up、model round-trip、parent slots。
5. mechanism 是本章全部公开 API。
6. TS 检查每个 boundary 的 shape。
7. TS 不验证运行时用户输入业务规则。
8. 每个 owner mutation只重 render依赖它的 instance tree。
9. 把所有 child state提升到 chapter app 会违反最小 owner scope。
10. root props/emits爆炸时应把 feature owner下沉到 cohesive container。

**API / 语法规则：** state 提升到需要协调它的最近共同 ancestor，不是默认提升到 application root。

**文件结构：** `ComponentsChapterApp.vue` 是 chapter composition；各练习仍独立负责一个机制。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/ComponentsChapterApp.vue</span>
  </div>

```vue
<ProductList />
<EditableTitle v-model="editableTitle" />
<ProvideInjectTheme />
<AsyncComponentDemo />
<ComponentLibraryLab />
```

</div>

**逐行解释：** ProductList self-contained；EditableTitle 需要 parent owner；theme demo internally建立 provider；async demo管理 lazy wrapper；final lab聚合可复用 APIs。

**执行过程：** root render chapter app → child instances setup → 各自建立独立 dependencies → interaction只沿声明的 boundary传播。

**变量、props、emits、slots 与 refs 的变化：** 没有全局 shared mutable object；每组 demo state 有明确 owner。

**为什么得到这个结果：** component instance隔离 local bindings，只有显式 channel 连接它们。

**对比写法：** 巨型 `App.vue` 保存每个 button/modal/table细节，会削弱 feature boundary。

**常见错误为什么错：** 为了“统一管理”无条件提升所有 state，会制造 prop drilling 和无关 re-render dependencies。

**与真实项目的关系：** page/container 只协调跨 feature state；feature component owns local workflow。

**与当前学习主线的关系：** 前两章 application/reactivity基础现在变成可组合的 instance tree。

**最终记忆模型：** integration composes contracts，不吞并所有 ownership。

<a id="section-9-14"></a>

### 9.14 Final integration：vue-component-library-lab 如何设计可复用组件 API

**结论：** reusable component 的 API 应分别审查 props、emits、slots、model、injection，而不是只看外观。

**本节解决的问题：** Button、Modal、Tabs、DataTable、FormField、Select、Toast 如何在同一 lab 中保持清晰边界。

**技术意义：** 练习 production-style API discipline，但不扩展成完整 design system。

**概念解释：** `ComponentLibraryLab` owns demo state；base components只拥有结构或局部机制；ToastProvider owns contextual list；DataTable owns iteration而 caller owns cell formatting。

**边界：template syntax、JavaScript runtime、Vue runtime、SFC compiler、TypeScript、Vite tooling：** component contracts由 macros/types表达；Vue 连接 instances；JS functions传 intent；slot functions传 rendering；Vite build模块；没有 Router/store/UI library。

**组件通信证据链：**

1. lab owns modal/tab/select/input state；ToastProvider owns toast list。
2. base components通过 props/model/slots/inject接收所需数据。
3. values 是 refs、typed arrays、MouseEvent、slot props、toast context、HTMLElement ref。
4. flow 同时覆盖五类 component directions。
5. mechanism 是 props/emits/model/slots/provide-inject/fallthrough/ref/lifecycle。
6. TS 检查 TabItem/TableRow/SelectOption/ToastContext 与 event。
7. TS 不验证 dynamic external content 或 DOM runtime availability。
8. 每次 UI结果都能回溯到 owner mutation或 parent render function。
9. base component偷偷保存业务 entity、访问 global hidden singleton 都违反 reusable boundary。
10. API map无法说明 owner和writer时，组件仍未设计清楚。

**API / 语法规则：** prop表达输入；emit表达离散 intent；model表达单个受控 value；slot表达 render extension；injection表达 deep dependency。

**文件结构：** final lab 10 个文件按 component responsibility拆分，共享 context仅在 `theme-key.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/component-library-lab/ComponentLibraryLab.vue</span>
  </div>

```vue
<BaseTabs v-model="activeTabId" :tabs="tabs">
  <template #panel="{ activeTab }">
    <strong>{{ activeTab.label }}</strong>
  </template>
</BaseTabs>

<DataTable :columns="columns" :rows="rows">
  <template #cell="{ column, value }">
    <strong v-if="column.key === 'status'">{{ value }}</strong>
    <span v-else>{{ value }}</span>
  </template>
</DataTable>
```

</div>

**逐行解释：** tabs通过 model控制 active id并暴露 active tab；table通过 props接收数据、通过 cell slot交还 presentation。

**执行过程：** lab state进入 base props/model → base执行通用结构 → events/model updates回 owner → slots在 lab scope生成内容。

**变量、props、emits、slots 与 refs 的变化：** active id、selected option、modal boolean、toast array各有唯一 owner；root template ref只观察 mount。

**为什么得到这个结果：** 每个 component API只开放职责所需 channel。

**对比写法：** 一个接收几十个 style/business props的万能 component既不通用，也难验证。

**常见错误为什么错：** FormField 若自己拥有 input value，会与 slotted control/parent model产生竞争 ownership。

**与真实项目的关系：** 这是后续 admin UI、Router page、Pinia integration、component tests 的基础边界。

**与当前学习主线的关系：** 下一章 composables 会抽取 reusable logic；本章只处理 component instance communication。

**最终记忆模型：** 先画 owner与communication map，再写 component markup。

## 10. API / 语法索引

| API / syntax | 所属层 | 本章用途 | 关键边界 |
| --- | --- | --- | --- |
| `defineProps<T>()` | SFC compiler macro | type-based child input | 类型不是 runtime parser |
| `defineProps({ ... })` | SFC compiler + Vue runtime | runtime prop options | 不能与 type argument 同时使用 |
| `withDefaults()` | SFC compiler macro | type-based props default | mutable default 注意独立实例 |
| `defineEmits<T>()` | SFC compiler macro | custom event contract | event 不冒泡 |
| `defineModel<T>()` | SFC compiler macro | component model ref | assignment 会请求 parent update |
| `<slot>` | template / Vue runtime | slot outlet | content 属于 parent scope |
| `defineSlots<T>()` | SFC compiler macro | slot type contract | 不提供 runtime validation |
| `provide()` / `inject()` | Vue runtime | ancestor dependency | inject 可能 undefined |
| `InjectionKey<T>` | TypeScript + JS Symbol | key/value type同步 | Symbol identity必须共享 |
| `$attrs` / `useAttrs()` | Vue runtime | manual fallthrough handling | attrs object不是业务 store |
| `useTemplateRef()` | Vue runtime | DOM/component target | mount 前为 null |
| `defineExpose()` | SFC compiler macro | public component instance | `<script setup>` 默认 closed |
| lifecycle hooks | Vue runtime | side-effect lifetime | setup中同步注册 |
| `defineAsyncComponent()` | Vue runtime | async wrapper | 加载 component code |
| `import()` | JavaScript / Vite | Promise + split point | 不等于 API request |

## 11. 常见错误表

表中每行都同时给出 wrong code、observed bug、violated rule、原因、correct code 和以后识别方法。

| # | Wrong code | 错误或现象 | 违反规则 | 为什么失败 | Correct code | 以后如何识别 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `props.title = "Next"` | readonly warning / compile diagnosis | top-level prop readonly | child 不拥有 prop | `emit("rename", "Next")` | 搜索 child 中 prop assignment |
| 2 | `props.product.favorite = true` | parent state 被静默改变 | owner 单一写入口 | nested object 共享 reference | `emit("favorite", { productId })` | child 写 `props.x.y` |
| 3 | `<Card price="12" active="false" />` | 得到 string | dynamic binding | static attribute 是文本 | `<Card :price="12" :active="false" />` | boolean false 却表现 truthy |
| 4 | `defineProps<Product>()` 后直接信任 JSON | invalid runtime value | static/runtime 分层 | TS type 已擦除 | parse/validate external data | 看到 type assertion 代替 parser |
| 5 | `emit("favourite")` + `@favorite` | handler 不执行 | event name必须匹配 | listener lookup失败 | 两端统一 `favorite` | event发出但 direct parent无响应 |
| 6 | grandchild `emit("save")`，只在 grandparent监听 | 无响应 | component events不冒泡 | 只匹配直接 parent vnode listener | 中间转发或提升 contract | 把 custom event 当 DOM bubbling |
| 7 | `emit("change", value, index, mode)` | payload含义不清 | output API应语义化 | 顺序参数易错 | `emit("change", { id, value })` | handler参数名变成 `arg1` |
| 8 | 只写 `<Editor v-model="title" />` 而不理解 contract | custom component无法同步 | model prop/event协议 | child 未实现 model | `defineModel<string>()` | value显示但编辑不回 parent |
| 9 | `model.value = ""` 被当作 local reset | parent value也被清空 | model 是双向 contract | setter emits update | local draft用独立 ref并明确提交 | child assignment导致外层变化 |
| 10 | reusable input内部保存永久业务 value | parent与child state分叉 | input-like owner boundary | 两份 source of truth | parent owns + component model | reset/initial value不同步 |
| 11 | slot中写 `{{ childRows }}` | binding不存在 | slot parent scope | slot closure在 parent 编译 | child用 `:rows` slot props | slot位置在 child却读不到 child值 |
| 12 | slot表达式依赖 child local method | compile/runtime unresolved | render scope | DOM位置不改变 lexical scope | scoped slot显式暴露参数 | 把 DOM nesting 当 JS scope |
| 13 | 所有 feature state 都 `provide` | dependency隐藏 | injection用途边界 | caller看不出依赖 | nearby关系优先 props | component无法独立 render |
| 14 | `inject(key)!.theme` | missing provider时 crash | inject可 undefined | ancestor contract非 runtime必然 | fallback或显式 guard | consumer可在 provider外使用 |
| 15 | `provide("theme", value)` | typo/冲突且弱类型 | typed key | string不能同步 context generic | shared `InjectionKey<ThemeContext>` | provider/consumer分别拼字符串 |
| 16 | multi-root component依赖自动 attrs | id/listener丢失并有 warning | 无唯一 fallthrough root | Vue不知道绑定哪个 root | `inheritAttrs: false` + `v-bind="$attrs"` | wrapper有多个根节点 |
| 17 | setup顶层 `input.value.focus()` | null access | mount timing | element尚未创建 | `onMounted(() => input.value?.focus())` | 首次 render crash、之后正常 |
| 18 | 用 ref 直接改 child DOM表达 selected state | declarative UI失同步 | refs是 escape hatch | Vue state不知道 imperative change | prop/model驱动 selected | DOM与state显示不一致 |
| 19 | add listener却无 remove | repeated callbacks / leak | lifetime cleanup | browser继续持有 function | `onUnmounted(removeListener)` | mount次数越多触发越多 |
| 20 | async component loader里 fetch业务 records | code/data loading混淆 | async component加载定义 | wrapper等待的应是 component module | data request留在data layer | import chunk与API error state混在一起 |

## 12. 最终小项目

### 12.1 Project goal 与章节适配性

`vue-component-library-lab` 用最小可运行组件证明：可复用性来自清晰 communication contract，而不是视觉复杂度。它覆盖路线图要求的 Button、Modal、Tabs、DataTable、FormField、Select、Toast；没有加入 sorting、pagination、Router、store、request、UI library 或 tests。

### 12.2 文件结构与职责

| 文件 | 职责 | 不负责 |
| --- | --- | --- |
| `ComponentLibraryLab.vue` | demo state、composition、component ref/lifecycle | 通用组件内部实现 |
| `BaseButton.vue` | props、typed activate emit、default slot、fallthrough | 业务 action |
| `BaseModal.vue` | open model、shell、named/default slots | page state |
| `BaseTabs.vue` | tabs prop、active id model、panel scoped slot | route state |
| `DataTable.vue` | columns/rows、stable key、cell scoped slot | sort/page/filter |
| `FormField.vue` | label/error/hint/control composition | input value |
| `BaseSelect.vue` | options prop、selected model | option业务来源 |
| `ToastProvider.vue` | toast owner、provide actions、viewport placement | global store |
| `ToastViewport.vue` | inject/render/dismiss | toast ownership |
| `theme-key.ts` | typed context contracts/keys | runtime state |

### 12.3 核心组件完整通信代码

以下代码覆盖核心组件的完整 `script` 与 `template` 通信逻辑；真实文件还包含不改变 API 的 scoped presentation styles。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/component-library-lab/BaseButton.vue</span>
  </div>

```vue
<script setup lang="ts">
type Props = {
  variant?: "primary" | "secondary";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

withDefaults(defineProps<Props>(), {
  variant: "primary",
  disabled: false,
  type: "button",
});

const emit = defineEmits<{
  activate: [event: MouseEvent];
}>();
</script>

<template>
  <button
    :type="type"
    :class="['base-button', `base-button--${variant}`]"
    :disabled="disabled"
    @click="emit('activate', $event)"
  >
    <slot />
  </button>
</template>
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/component-library-lab/BaseModal.vue</span>
  </div>

```vue
<script setup lang="ts">
const open = defineModel<boolean>({ required: true });
</script>

<template>
  <div v-if="open" class="modal-backdrop" role="presentation">
    <section
      class="modal-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="library-modal-title"
    >
      <header class="modal-header">
        <slot name="header" />
        <button type="button" aria-label="Close modal" @click="open = false">
          Close
        </button>
      </header>
      <div class="modal-body"><slot /></div>
      <footer class="modal-footer"><slot name="footer" /></footer>
    </section>
  </div>
</template>
```

</div>

`defineModel<boolean>()` 的展开模型是：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: pre-3.4-model-contract.vue</span>
  </div>

```vue
<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();
</script>

<template>
  <button type="button" @click="emit('update:modelValue', false)">
    Close
  </button>
</template>
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/component-library-lab/BaseTabs.vue</span>
  </div>

```vue
<script setup lang="ts">
import { computed } from "vue";

type TabItem = { id: string; label: string };
const props = defineProps<{ tabs: TabItem[] }>();
const activeTabId = defineModel<string>({ required: true });
const activeTab = computed(
  () => props.tabs.find((tab) => tab.id === activeTabId.value) ?? null,
);
</script>

<template>
  <section>
    <div role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        role="tab"
        :aria-selected="activeTabId === tab.id"
        @click="activeTabId = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>
    <div v-if="activeTab" role="tabpanel">
      <slot name="panel" :active-tab="activeTab">
        {{ activeTab.label }}
      </slot>
    </div>
  </section>
</template>
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/component-library-lab/DataTable.vue</span>
  </div>

```vue
<script setup lang="ts">
type TableColumn = { key: string; label: string };
type TableRow = {
  id: string;
  [key: string]: string | number | boolean;
};

defineProps<{ columns: TableColumn[]; rows: TableRow[] }>();
defineSlots<{
  cell(props: {
    row: TableRow;
    column: TableColumn;
    value: string | number | boolean;
  }): unknown;
}>();
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td v-for="column in columns" :key="column.key">
          <slot
            name="cell"
            :row="row"
            :column="column"
            :value="row[column.key]"
          >
            {{ row[column.key] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/component-library-lab/FormField.vue</span>
  </div>

```vue
<script setup lang="ts">
type Props = {
  id: string;
  label: string;
  error?: string;
};

defineProps<Props>();
</script>

<template>
  <div class="form-field">
    <label :for="id">{{ label }}</label>
    <slot />
    <p v-if="error" class="error">{{ error }}</p>
    <p v-else class="hint"><slot name="hint" /></p>
  </div>
</template>
```

</div>

`FormField` 没有 value ref；caller 通过 default slot 传 control，避免 field wrapper 与 input 同时拥有 value。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/component-library-lab/BaseSelect.vue</span>
  </div>

```vue
<script setup lang="ts">
type SelectOption = { value: string; label: string };
type Props = {
  options: SelectOption[];
  id?: string;
  disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
  id: undefined,
  disabled: false,
});

const selectedValue = defineModel<string>({ required: true });

function updateValue(event: Event): void {
  const select = event.currentTarget;
  if (select instanceof HTMLSelectElement) {
    selectedValue.value = select.value;
  }
}
</script>

<template>
  <select
    :id="id"
    :value="selectedValue"
    :disabled="disabled"
    @change="updateValue"
  >
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/component-library-lab/ToastProvider.vue</span>
  </div>

```vue
<script setup lang="ts">
import { provide, readonly, ref } from "vue";
import ToastViewport from "./ToastViewport.vue";
import { toastKey, type ToastItem } from "./theme-key";

const toasts = ref<ToastItem[]>([]);
let nextToastId = 1;

function addToast(message: string): void {
  toasts.value.push({ id: nextToastId, message });
  nextToastId += 1;
}

function dismissToast(toastId: number): void {
  toasts.value = toasts.value.filter((toast) => toast.id !== toastId);
}

provide(toastKey, {
  toasts: readonly(toasts),
  addToast,
  dismissToast,
});

defineSlots<{
  default(props: { addToast: (message: string) => void }): unknown;
}>();
</script>

<template>
  <slot :add-toast="addToast" />
  <ToastViewport />
</template>
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-03-component-communication/component-library-lab/ToastViewport.vue</span>
  </div>

```vue
<script setup lang="ts">
import { computed, inject } from "vue";
import { toastKey } from "./theme-key";

const toastContext = inject(toastKey);
const visibleToasts = computed(() => toastContext?.toasts.value ?? []);
</script>

<template>
  <aside v-if="visibleToasts.length > 0" aria-live="polite">
    <article v-for="toast in visibleToasts" :key="toast.id">
      <span>{{ toast.message }}</span>
      <button
        type="button"
        @click="toastContext?.dismissToast(toast.id)"
      >
        Dismiss
      </button>
    </article>
  </aside>
</template>
```

</div>

### 12.4 Run command 与 expected behavior

执行 `npm run dev` 后：

1. BaseButton 的 inherited id/aria/class 到达 native root，`activate` 更新 status。
2. BaseModal 由 parent `modalOpen` 控制，内部 close 或 slotted footer 都更新同一 owner。
3. BaseTabs 更新 active id，parent scoped slot显示 active tab。
4. DataTable 保持 rows/columns traversal，parent突出 status cell。
5. FormField compose input/select，但 values 留在 lab。
6. Add toast 调 provider action；viewport通过 inject读取并 dismiss。
7. lab mount 后 template ref status 改为 mounted；update/unmount log进入 console。

### 12.5 Component API maps

**Props map**

| Component | Props |
| --- | --- |
| BaseButton | `variant?`、`disabled?`、`type?` |
| BaseTabs | `tabs: TabItem[]` |
| DataTable | `columns: TableColumn[]`、`rows: TableRow[]` |
| FormField | `id`、`label`、`error?` |
| BaseSelect | `options`、`id?`、`disabled?` |

**Emits map**

| Component | Emit | Payload |
| --- | --- | --- |
| BaseButton | `activate` | `MouseEvent` |
| BaseModal | `update:modelValue` | `boolean`（由 `defineModel` 生成） |
| BaseTabs | `update:modelValue` | `string`（由 `defineModel` 生成） |
| BaseSelect | `update:modelValue` | `string`（由 `defineModel` 生成） |

**Slots map**

| Component | Slots | Owner |
| --- | --- | --- |
| BaseButton | default | caller |
| BaseModal | header、default、footer | caller |
| BaseTabs | `panel({ activeTab })` | caller render / tabs exposes value |
| DataTable | `cell({ row, column, value })` | caller render / table exposes values |
| FormField | default、hint | caller |
| ToastProvider | `default({ addToast })` | caller |

**v-model map**

| Component | Parent source | Child ref | Expanded contract |
| --- | --- | --- | --- |
| BaseModal | `modalOpen` | `open` | `modelValue` + `update:modelValue` |
| BaseTabs | `activeTabId` | `activeTabId` | `modelValue` + `update:modelValue` |
| BaseSelect | `selectedBoundary` | `selectedValue` | `modelValue` + `update:modelValue` |

**Provide/inject map**

`ToastProvider` owns `Ref<ToastItem[]>`，通过 `toastKey: InjectionKey<ToastContext>` provide readonly list 与 add/dismiss actions；`ToastViewport` inject 并处理 missing provider。context 只在 provider subtree 内有效，不是 global store。

**Template ref / lifecycle usage**

`ComponentLibraryLab` 用 `useTemplateRef<HTMLElement>("lab-root")` 观察 root mount；`onMounted` 更新可见 status，`onUpdated` 记录 update，`onUnmounted` 记录 teardown。ref 不参与 modal/tab/select business state。

### 12.6 State ownership 与 communication flow

| State | Owner | Readers | Writer path |
| --- | --- | --- | --- |
| `modalOpen` | ComponentLibraryLab | BaseModal | model update |
| `activeTabId` | ComponentLibraryLab | BaseTabs、lab slot | model update |
| `selectedBoundary` | ComponentLibraryLab | BaseSelect、toast action | model update |
| `fieldValue` | ComponentLibraryLab | native input/FormField validation display | native v-model |
| `toasts` | ToastProvider | ToastViewport | provided add/dismiss actions |
| table rows | ComponentLibraryLab | DataTable、cell slot | static demo owner |

完整 flow：user interaction → native event → base emit/model/provided action → owner mutation → reactive scheduling → affected component render → slots/injected refs读取新值 → DOM patch。

### 12.7 常见错误与扩展任务

项目内应避免：把 modal visibility复制为 local ref、让 FormField拥有 slotted input value、让 DataTable提前实现业务 sorting、让 toast context越过 provider subtree、从 template ref改业务 DOM。

可在不进入下一章的前提下练习：

- 给 BaseButton 加 loading prop，但仍由 caller拥有 async state。
- 给 BaseModal 加 escape-key cleanup，严格在 mount/unmount管理 listener。
- 给 DataTable 加 empty named slot，不增加 sorting/pagination。
- 给 BaseSelect 加 disabled option contract，不引入 form library。

reusable logic extraction 和 composables 留到 Chapter 04。

## 13. 额外速查表

| 概念 | 最短形式 | 记忆边界 |
| --- | --- | --- |
| `defineProps` | `defineProps<Props>()` | child input macro |
| runtime props declaration | `defineProps({ count: Number })` | runtime options/warnings |
| type-based props declaration | `defineProps<{ count: number }>()` | static contract |
| `withDefaults` | `withDefaults(defineProps<Props>(), defaults)` | optional prop defaults |
| `defineEmits` | `defineEmits<{ save: [id: number] }>()` | named output |
| event payload | `emit("save", { id })` | intent data |
| component v-model | `<Editor v-model="title" />` | prop + update event |
| `defineModel` | `defineModel<string>()` | synchronized model ref |
| `modelValue` | `:model-value="title"` | default model prop |
| `update:modelValue` | `@update:model-value="title = $event"` | default model event |
| default slot | `<slot />` | unnamed parent content |
| named slot | `<slot name="header" />` | named outlet |
| scoped slot | `<slot :row="row" />` | child passes render argument |
| `provide` | `provide(key, context)` | ancestor registers dependency |
| `inject` | `inject(key)` | descendant lookup, maybe undefined |
| `InjectionKey` | `InjectionKey<Context>` | Symbol + type pairing |
| fallthrough attributes | single root auto inheritance | undeclared attrs/listeners |
| `useAttrs` | `const attrs = useAttrs()` | inspect/manual bind attrs |
| template ref | `ref="input"` | render target handle |
| `useTemplateRef` | `useTemplateRef("input")` | Vue 3.5+ ref API |
| `ref<Element \| null>` | `ref<HTMLInputElement \| null>(null)` | pre-3.5 fallback |
| `defineExpose` | `defineExpose({ focus })` | script-setup public surface |
| `onMounted` | `onMounted(start)` | DOM available/acquire |
| `onUpdated` | `onUpdated(observe)` | patch completed; avoid loops |
| `onUnmounted` | `onUnmounted(stop)` | release resources |
| `defineAsyncComponent` | `defineAsyncComponent(loader)` | lazy wrapper |
| dynamic import | `import("./Panel.vue")` | Promise + Vite split point |

## 14. 真实项目判断模型

| 需求 | 首选边界 | 不应选择 | 证明它工作 | 风险信号 / 未来 owner |
| --- | --- | --- | --- | --- |
| 父级拥有列表，子级只展示一行 | props down + emits up：`ProductList` / `ProductCard` | child 直接改 parent array 或复制完整列表 | parent mutation 后所有 cards 与 filter 同步 | props drilling 超过两三层时，评估 provide/inject 或 Pinia |
| 单个输入组件需要双向协议 | component `v-model` / `defineModel`：`EditableTitle` | 额外传 `value` + 自定义 event 且命名不统一 | parent 和 child 的 title 同步，event payload 可检查 | default desync；复杂表单 owner 交给 Chapter 08 |
| 组件需要可替换内容区域 | slots / scoped slots：`ModalWithSlots`、`ScopedSlotTable` | 用 props 传一堆 HTML-like config | parent scope 可读，child row data 通过 slot props 暴露 | slot 变成业务状态通道；跨页面状态交给 Pinia |
| 深层稳定上下文 | provide/inject + `InjectionKey`：theme service | 任意业务数据都塞进 inject | missing provider 有 fallback/错误，readonly + action surface 清楚 | 权限/auth/global client state 应进入 Chapter 07 Pinia |
| 聚焦、测量、调用公开方法 | template ref + `defineExpose` | 用 ref 读写 child private state | `onMounted` 后 ref 非空，只能看到 exposed surface | ref 调用链变成隐藏 API；回到 props/emits/slots 设计 |
| 延迟加载重组件 | `defineAsyncComponent` / dynamic import | 用它加载 API data 或控制权限 | chunk 加载状态可观察，resolved component contract 不变 | route-level lazy loading 归 Chapter 06 Router |

## 15. 如何转换成个人笔记

对每个 component 画五列：owner、input、output、render extension、environment dependency。然后用一个具体 interaction 写出同步 call stack 和后续 Vue update queue。不要只抄 API；至少保留一个 wrong case，并写清它违反的是 owner、scope、timing 还是 runtime/type boundary。

## 16. 必须能回答的问题

1. props 为什么是单向数据流？——source owner 在 parent，child 每次接收 parent render 的输入。
2. child 为什么不能直接修改 props？——它不拥有 top-level input；修改会产生多个 writer。
3. nested object prop 为什么仍可能被改？——shallow readonly不改变内部共享 object reference。
4. emit 同步还是异步？——`emit()` 调用 parent listener是同步的；reactive DOM patch被调度批处理。
5. custom event 会冒泡吗？——不会，只匹配直接 parent listener。
6. component `v-model` 展开成什么？——`modelValue` prop + `update:modelValue` event。
7. slot 是内容分发还是 function callback？——公开模型是内容分发；编译概念上是 parent-provided render function。
8. scoped slot 为什么能暴露 child data？——child 调用 slot function时把 slot props作为参数传入。
9. provide/inject 适合什么？——deep、stable、subtree-local dependency；不适合隐藏所有业务 state。
10. template ref 什么时候有值？——目标完成 mount/patch后；条件移除时回到 null。
11. fallthrough 为什么依赖 single root？——Vue需要唯一默认 attribute落点。
12. async component 与 data fetch 有何区别？——前者加载 component module，后者加载业务数据。

## 17. 最终记忆模型

先问“谁拥有值”，再选 channel：

- parent给 child 普通数据：props。
- child告诉 owner 发生了什么：emits。
- input-like value往返：component model。
- parent决定 child某区域如何 render：slots。
- child data交给 parent render：scoped slots。
- deep descendant需要 subtree dependency：provide/inject。
- wrapper保留 native surface：fallthrough attrs。
- 必须直接操作 DOM/public instance：template ref。
- side effect与 instance同时生灭：lifecycle。
- component code延迟到使用时：async component。

TypeScript 检查静态 contract；Vue runtime连接 component instances并调度 render；SFC compiler转换 macros/template；Vite处理 module graph和dynamic-import split；browser最终执行 DOM、event与network chunk loading。任何一层都不能替另一层完成全部工作。

## 18. 官方文档阅读清单

本章写作时按以下当前官方页面核对：

1. [Components Basics](https://vuejs.org/guide/essentials/component-basics.html)
2. [Props](https://vuejs.org/guide/components/props.html)
3. [Component Events](https://vuejs.org/guide/components/events.html)
4. [Component v-model](https://vuejs.org/guide/components/v-model.html)
5. [Slots](https://vuejs.org/guide/components/slots.html)
6. [Provide / Inject](https://vuejs.org/guide/components/provide-inject.html)
7. [Fallthrough Attributes](https://vuejs.org/guide/components/attrs.html)
8. [Template Refs](https://vuejs.org/guide/essentials/template-refs.html)
9. [Lifecycle Hooks](https://vuejs.org/guide/essentials/lifecycle.html)
10. [Async Components](https://vuejs.org/guide/components/async.html)
11. [TypeScript with Composition API](https://vuejs.org/guide/typescript/composition-api.html)
12. [`<script setup>`](https://vuejs.org/api/sfc-script-setup.html)

本地路线图 Phase 3 决定练习范围与最终项目；官方文档决定机制表述和版本边界。当前 workspace 使用 Vue 3.5，因此实现采用 `defineModel()` 与 `useTemplateRef()`；旧版本形式只作为明确标记的 conceptual snippet。
