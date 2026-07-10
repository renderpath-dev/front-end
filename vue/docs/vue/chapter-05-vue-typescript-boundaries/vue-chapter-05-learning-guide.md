# Vue 第 5 章：Vue + TypeScript Type Boundaries

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
  - [9.1 Vue + TypeScript 边界：static type、runtime value、compiler macro 与 tooling](#section-9-1)
  - [9.2 lang="ts"：SFC script、template expression 与 TypeScript checking](#section-9-2)
  - [9.3 defineProps：runtime declaration、type-based declaration 与 compiled output](#section-9-3)
  - [9.4 withDefaults 与 Reactive Props Destructure：default value、optional flag 与 per-instance mutable default](#section-9-4)
  - [9.5 defineEmits：event name、named tuple payload 与 parent listener contract](#section-9-5)
  - [9.6 defineModel：typed model ref、modelValue / update:modelValue 与 default desynchronization](#section-9-6)
  - [9.7 defineSlots：slot name、slot props type 与 parent render contract](#section-9-7)
  - [9.8 PropType：runtime prop declaration 中的 complex type boundary](#section-9-8)
  - [9.9 InjectionKey：Symbol key、provider / consumer type sync 与 undefined injection](#section-9-9)
  - [9.10 defineExpose 与 template refs：public instance shape、InstanceType 与 ComponentPublicInstance](#section-9-10)
  - [9.11 generic components：script setup generic、typed options 与 GenericSelect](#section-9-11)
  - [9.12 typed composables：generic return、MaybeRefOrGetter input、Ref / ComputedRef boundary](#section-9-12)
  - [9.13 typed API response：unknown boundary、type guard、Result state 与 runtime validation limit](#section-9-13)
  - [9.14 typed store contract：state、getter、action shape 与 future Pinia boundary](#section-9-14)
  - [9.15 typed route meta contract：RouteMeta augmentation concept 与 future Router boundary](#section-9-15)
  - [9.16 vue-tsc：Vite transpilation-only、SFC type checking 与 CI gate](#section-9-16)
  - [9.17 Chapter integration：Product type、ProductForm、ProductFilter 如何贯穿组件与 composable](#section-9-17)
  - [9.18 Final integration：vue-ts-contract-lab 如何建立完整类型契约](#section-9-18)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标](#121-项目目标)
  - [12.2 为什么它适合本章](#122-为什么它适合本章)
  - [12.3 文件结构与职责](#123-文件结构与职责)
  - [12.4 核心 contract 完整代码](#124-核心-contract-完整代码)
  - [12.5 关键组件契约](#125-关键组件契约)
  - [12.6 最终组合组件完整代码](#126-最终组合组件完整代码)
  - [12.7 运行方式、预期行为与边界地图](#127-运行方式预期行为与边界地图)
  - [12.8 常见错误与扩展任务](#128-常见错误与扩展任务)
- [13. 额外速查表](#13-额外速查表)
- [14. 最终文件清单](#14-最终文件清单)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标 | 真实文件 / snippet | 类型 | 章节 |
| --- | --- | --- | --- |
| 整合全部Chapter 05 demos | `src/learning/vue/chapter-05-vue-typescript-boundaries/VueTypeScriptChapterApp.vue` | Chapter入口 | 7、9.18 |
| shared domain types | `contracts/productContract.ts` | runtime-free contract | 9.1、9.17、12 |
| unknown API boundary | `contracts/apiContract.ts` | runtime guard + types | 9.13、12 |
| typed injection | `contracts/injectionKey.ts` | InjectionKey contract | 9.9 |
| future store shape | `contracts/storeContract.ts` | pure TS preparation | 9.14 |
| future route meta shape | `contracts/routeMetaContract.ts` | pure TS preparation | 9.15 |
| typed product logic | `composables/useTypedProducts.ts` | typed composable | 9.12、9.13 |
| key-safe form mutation | `composables/useProductForm.ts` | typed composable | 9.12、9.17 |
| props / emits / defaults | `components/TypedProps.vue`、`TypedEmits.vue`、`PropsWithDefaults.vue` | roadmap practices | 9.3–9.5 |
| typed model / slots | `components/TypedVModel.vue`、`TypedSlots.vue` | roadmap practices | 9.6–9.7 |
| generic SFC | `components/GenericSelect.vue` | roadmap practice | 9.11 |
| provider / consumer sync | `components/InjectionProvider.vue`、`InjectionConsumer.vue` | typed injection demo | 9.9 |
| exposed public instance | `components/ExposedProductEditor.vue`、`DefineExposeDemo.vue` | component ref demo | 9.10 |
| DOM ref null boundary | `components/TypedTemplateRefDemo.vue` | typed DOM ref demo | 9.10 |
| static/runtime contrast | `components/TypeRuntimeBoundaryDemo.vue` | unknown narrowing demo | 9.1、9.13 |
| Vite / vue-tsc boundary | `components/VueTscBoundaryDemo.vue` | tooling demo | 9.16 |
| final contract lab | `ts-contract-lab/VueTsContractLab.vue` | final project | 9.18、12 |
| conceptual Router augmentation | `Snippet: vue-router-route-meta-augmentation.d.ts` | guide-only | 9.15 |
| 保留前四章并挂载Chapter 05 | `src/learning/vue/chapter-01-application-boundary/App.vue` | application shell | 9.18 |

未带完整前缀的 `contracts/`、`composables/`、`components/`、`ts-contract-lab/` 均相对 `src/learning/vue/chapter-05-vue-typescript-boundaries/`。

## 0. 文件定位

指南位于 `docs/vue/chapter-05-vue-typescript-boundaries/vue-chapter-05-learning-guide.md`。可运行文件位于 `src/learning/vue/chapter-05-vue-typescript-boundaries/`。应用继续使用第1章既有`main.ts`；`App.vue`依次render Chapters 01–05。

依赖审计显示：当前仅有`vue` runtime dependency，没有`pinia`或`vue-router`。因此：

- `storeContract.ts` 是pure TypeScript state/getter/action contract，不import Pinia。
- `routeMetaContract.ts` 是pure TypeScript route meta preparation，不import Vue Router。
- 真正`declare module "vue-router"`仅作为`Snippet:`解释。
- Chapter 06实现Router；Chapter 07实现Pinia；Chapter 09实现完整API runtime validation。

路线图映射：

| Roadmap | Actual file |
| --- | --- |
| `typed-props.vue` | `components/TypedProps.vue` |
| `typed-emits.vue` | `components/TypedEmits.vue` |
| `props-with-defaults.vue` | `components/PropsWithDefaults.vue` |
| `typed-v-model.vue` | `components/TypedVModel.vue` |
| `typed-slots.vue` | `components/TypedSlots.vue` |
| `generic-select.vue` | `components/GenericSelect.vue` |
| `injection-key.ts` | `contracts/injectionKey.ts` |
| `typed-composable.ts` | `composables/useTypedProducts.ts` |
| `api-contract.ts` | `contracts/apiContract.ts` |

## 1. 本章解决的问题

前四章已经建立reactivity、component API与composable architecture。本章不重讲TypeScript基础，而是回答一个更锋利的问题：**某个类型在哪一层有约束力，到了runtime还剩下什么？**

1. `defineProps<ProductCardProps>()`的type parameter在browser里还存在吗？
2. SFC compiler能从type-based declaration生成哪些runtime props options，哪些复杂类型超出AST-based conversion？
3. `withDefaults`如何同时生成runtime default并移除returned props type的optional flag？
4. `defineEmits`、`defineModel`、`defineSlots`、`InjectionKey`和`defineExpose`分别约束哪条component boundary？
5. `unknown` API payload如何经过runtime guard变成typed `Result`？
6. 为什么Vite dev可正常显示页面，却不能证明整个SFC graph type-safe？

主链是：**source type declaration → SFC/compiler/TypeScript static analysis → emitted JavaScript type erasure → Vue receives runtime props/events/values → browser receives ordinary JavaScript objects → external unknown requires runtime narrowing → vue-tsc checks full TS + SFC graph**。

## 2. 前置概念

| 前置章节 | 本章复用内容 |
| --- | --- |
| Chapter 01 | SFC compiler、Vite module transform、browser runtime分层 |
| Chapter 02 | Ref/ComputedRef runtime object与static generic distinction |
| Chapter 03 | props/emits/model/slots/injection/template ref实际data flow |
| Chapter 04 | composable input/return ownership、unknown resource boundaries |
| TypeScript基础 | union、generic、keyof、indexed access、discriminated union |

本章把这些机制加上precision types，但不把type annotation当成runtime parser。

## 3. 学习目标

- 能解释`lang="ts"`、Vue compiler macros、type erasure与runtime value之间的边界。
- 能为props、emits、model、slots、injection、exposed instance和generic SFC建立static contracts。
- 能区分runtime props options与type-based declaration。
- 能用`unknown`、type guard和`Result<T,E>`处理local simulated API boundary。
- 能用`keyof` / indexed access写type-safe form mutation。
- 能在无dependencies时为future store/route meta建立pure TS contracts。
- 能解释Vite transpilation-only与`vue-tsc --noEmit`的差别。
- 能避免`any`、unsafe external assertions和premature Router/Pinia imports。

## 4. 推荐学习顺序

1. 先看`TypeRuntimeBoundaryDemo.vue`，把type erased与runtime unknown分开。
2. 顺序运行TypedProps、Defaults、Emits、VModel、Slots。
3. 运行InjectionProvider与DefineExposeDemo，观察cross-component type sync。
4. 运行GenericSelect，确认generic parameter影响caller inference但runtime只收到items/model。
5. 读取useProductForm/useTypedProducts，追踪key-safe mutation与unknown response。
6. 读取pure store/route contracts，理解它们只是future framework adapters的shape。
7. 执行`npm run typecheck`再执行build，不把dev display当typecheck。
8. 最后审查VueTsContractLab的type boundary map。

## 5. 核心术语表

| Concept | Layer | 精确定义 | 常见误解 |
| --- | --- | --- | --- |
| static type | TypeScript | compile-time model/diagnostic | browser会验证它 |
| runtime value | JavaScript/Vue | 实际存在的object/string/ref/payload | annotation能改变其shape |
| compiler macro | SFC compiler | compile-time special syntax | 普通runtime function |
| type erasure | TypeScript emit | type-only syntax不进入JS | interface可用于instanceof |
| runtime props option | Vue runtime | type/required/default/validator metadata | 深度schema validation |
| unknown boundary | TypeScript + runtime | 禁止未narrow直接访问的external value | unknown等于any |
| type guard | JavaScript + TS control flow | runtime boolean check并narrow type | 完整schema/semantic validation |
| Result union | static + runtime discriminant | `{ok:true,data}`或`{ok:false,error}` | try/catch的同义词 |
| vue-tsc | tooling | 支持Vue SFC graph的TS CLI wrapper | Vite build alias |

## 6. 底层心智模型

1. `.vue`中的`<script setup lang="ts">`先由SFC/compiler tooling理解，types用于diagnostics和macro conversion。
2. `defineProps<T>()`的`T`被erase；compiler基于AST尽力生成runtime props declaration。复杂conditional whole-object type不等于完整type analysis。
3. browser不认识`Product`、`ProductForm`或`Result<T,E>`；它只接收ordinary objects和discriminant properties。
4. `defineEmits`/`defineSlots` type parameters改善caller/IDE/vue-tsc contract，但不在browser执行payload/slot schema validation。
5. `InjectionKey<T>`把Symbol identity与static T配对；runtime仍可能找不到provider。
6. external JSON从`unknown`开始；runtime guard逐property检查后，TypeScript control flow才允许typed access。
7. Vite转译并bundle modules；`vue-tsc`才执行完整SFC typecheck。二者是串联gate，不是同一个阶段。

## 7. 推荐目录结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Chapter 05 directory tree</span>
  </div>

```txt
src/learning/vue/chapter-05-vue-typescript-boundaries/
  VueTypeScriptChapterApp.vue
  contracts/
    productContract.ts
    apiContract.ts
    storeContract.ts
    routeMetaContract.ts
    injectionKey.ts
  composables/
    useTypedProducts.ts
    useProductForm.ts
  components/
    TypedProps.vue
    TypedEmits.vue
    PropsWithDefaults.vue
    TypedVModel.vue
    TypedSlots.vue
    GenericSelect.vue
    InjectionProvider.vue
    InjectionConsumer.vue
    ExposedProductEditor.vue
    DefineExposeDemo.vue
    TypedTemplateRefDemo.vue
    TypeRuntimeBoundaryDemo.vue
    VueTscBoundaryDemo.vue
  ts-contract-lab/
    VueTsContractLab.vue
    ProductCardTyped.vue
    ProductFormTyped.vue
    ProductFilterTyped.vue
    ProductTableTyped.vue
    ProductStoreContractDemo.vue
    ProductApiContractDemo.vue
```

</div>

### 7.1 关键组件完整代码预览

`ProductCardTyped.vue` 证明 readonly prop 与 typed intent event；`ProductFormTyped.vue` 证明 typed model 不会自动验证 DOM 字符串；`ProductTableTyped.vue` 证明 readonly collection 与 typed slot props。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/ts-contract-lab/ProductCardTyped.vue</span>
  </div>

```vue
<script setup lang="ts">
import type {
  Product,
  ProductId,
} from "../contracts/productContract";

type Props = {
  product: Product;
};

defineProps<Props>();

const emit = defineEmits<{
  edit: [productId: ProductId];
  archive: [payload: { productId: ProductId; previousStatus: Product["status"] }];
}>();
</script>

<template>
  <article class="product-card">
    <p class="status">{{ product.status }} · {{ product.category }}</p>
    <h4>{{ product.name }}</h4>
    <p>${{ product.price.toFixed(2) }}</p>
    <div class="actions">
      <button type="button" @click="emit('edit', product.id)">Edit</button>
      <button
        type="button"
        :disabled="product.status === 'archived'"
        @click="
          emit('archive', {
            productId: product.id,
            previousStatus: product.status,
          })
        "
      >
        Archive
      </button>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  padding: 0.75rem;
  border: 1px solid #ced9e3;
  border-radius: 0.6rem;
  background: #ffffff;
}

.status {
  margin: 0;
  color: #42657e;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h4 {
  margin: 0.35rem 0;
}

.actions {
  display: flex;
  gap: 0.4rem;
}

button {
  padding: 0.4rem 0.6rem;
  border: 1px solid #7696ac;
  border-radius: 0.4rem;
  background: #f5f9fb;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/ts-contract-lab/ProductFormTyped.vue</span>
  </div>

```vue
<script setup lang="ts">
import type {
  ProductCategory,
  ProductForm,
  ProductStatus,
} from "../contracts/productContract";

const form = defineModel<ProductForm>({ required: true });

const emit = defineEmits<{
  submit: [form: ProductForm];
  reset: [];
}>();

function updateTextField(
  field: "name" | "price",
  event: Event,
): void {
  const input = event.currentTarget;

  if (input instanceof HTMLInputElement) {
    form.value = {
      ...form.value,
      [field]: input.value,
    };
  }
}

function updateStatus(event: Event): void {
  const select = event.currentTarget;

  if (
    select instanceof HTMLSelectElement &&
    (select.value === "draft" ||
      select.value === "active" ||
      select.value === "archived")
  ) {
    const status: ProductStatus = select.value;
    form.value = { ...form.value, status };
  }
}

function updateCategory(event: Event): void {
  const select = event.currentTarget;

  if (
    select instanceof HTMLSelectElement &&
    (select.value === "course" || select.value === "tool")
  ) {
    const category: ProductCategory = select.value;
    form.value = { ...form.value, category };
  }
}

function submitForm(): void {
  emit("submit", {
    ...form.value,
    tags: [...form.value.tags],
  });
}
</script>

<template>
  <form class="product-form" @submit.prevent="submitForm">
    <label>
      Name
      <input
        :value="form.name"
        type="text"
        @input="updateTextField('name', $event)"
      />
    </label>
    <label>
      Price
      <input
        :value="form.price"
        inputmode="decimal"
        @input="updateTextField('price', $event)"
      />
    </label>
    <label>
      Status
      <select :value="form.status" @change="updateStatus">
        <option value="draft">Draft</option>
        <option value="active">Active</option>
        <option value="archived">Archived</option>
      </select>
    </label>
    <label>
      Category
      <select :value="form.category" @change="updateCategory">
        <option value="course">Course</option>
        <option value="tool">Tool</option>
      </select>
    </label>
    <div class="actions">
      <button type="submit">Submit typed form</button>
      <button type="button" @click="emit('reset')">Reset</button>
    </div>
  </form>
</template>

<style scoped>
.product-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 0.7rem;
}

label {
  display: grid;
  gap: 0.3rem;
  font-weight: 700;
}

input,
select {
  padding: 0.5rem;
  border: 1px solid #8ca3b2;
  border-radius: 0.4rem;
}

.actions {
  display: flex;
  align-items: end;
  gap: 0.45rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #718fa3;
  border-radius: 0.4rem;
  background: #f5f9fb;
  cursor: pointer;
}
</style>
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/ts-contract-lab/ProductTableTyped.vue</span>
  </div>

```vue
<script setup lang="ts">
import type {
  Product,
  ProductId,
} from "../contracts/productContract";

type Props = {
  products: ReadonlyArray<Product>;
};

defineProps<Props>();

defineSlots<{
  row(props: { product: Product; index: number }): unknown;
  actions(props: { productId: ProductId; product: Product }): unknown;
}>();
</script>

<template>
  <div class="table-list">
    <article
      v-for="(product, index) in products"
      :key="product.id"
      class="table-row"
    >
      <div>
        <slot name="row" :product="product" :index="index">
          {{ product.name }}
        </slot>
      </div>
      <div>
        <slot
          name="actions"
          :product-id="product.id"
          :product="product"
        />
      </div>
    </article>
    <p v-if="products.length === 0">No products match the typed filter.</p>
  </div>
</template>

<style scoped>
.table-list {
  display: grid;
  gap: 0.55rem;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
  align-items: center;
  padding: 0.65rem;
  border: 1px solid #d6dee5;
  border-radius: 0.55rem;
  background: #f9fbfc;
}
</style>
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

`npm run dev`用于interactive module serving；`npm run typecheck`执行`vue-tsc --noEmit`；`npm run build`先typecheck再Vite production bundle。只有实际执行后才能声明结果。

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 Vue + TypeScript 边界：static type、runtime value、compiler macro 与 tooling

**结论：** `Product`只在static analysis存在；browser里存在的是plain object，必须由runtime guard确认unknown payload。

**本节解决的问题：** 防止把type annotation、compiler macro、Vue runtime option和runtime validation混成同一层。

**技术意义：** 每个boundary都能回答“谁检查、何时检查、runtime剩什么”。

**概念解释：** `const rawValue: unknown = JSON.parse(...)`的runtime值是object；`ProductListResponse`只是model；`isProductListResponse`是实际执行的JavaScript。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** type syntax供TS；macro供SFC compiler；emitted JS无interfaces；Vue接收ordinary values；Vite转译；vue-tsc全图检查。

**类型边界证据链：**

1. runtime存在parsed object。
2. `ProductListResponse`建模目标shape。
3. `toProductListResult`接收unknown。
4. type aliases在emit后erase。
5. 本段无macro；SFC compiler保留component runtime calls。
6. Vue ref接收Result object。
7. IDE/vue-tsc检查narrowing后property access。
8. Vite dev不执行full typecheck。
9. JSON value始终untrusted。
10. type guard/fallback必须runtime执行。
11. `as ProductListResponse`制造false safety。
12. API variable直接annotate response type是识别信号。

**TypeScript 编译期过程：** unknown禁止`.items`；guard返回type predicate后control-flow narrowing允许typed access。

**JavaScript / Vue 运行时过程：** JSON.parse创建object → guard逐property检查 → Result写入ref → render按`ok`分支。

**API / 语法规则：** external value先unknown；assertion不验证；discriminated union用runtime `ok` property分支。

**文件结构：** `contracts/apiContract.ts` + `components/TypeRuntimeBoundaryDemo.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/components/TypeRuntimeBoundaryDemo.vue</span>
  </div>

```ts
const rawValue: unknown = JSON.parse(json);
result.value = toProductListResult(rawValue);
```

</div>

**逐行解释：** parse结果被主动收窄到unknown；第二行只通过runtime guard产生success/failure Result。

**执行过程：** click → parse → guard → Result assignment → render effect读取`result.ok` → DOM patch。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** static unknown被control flow narrowed；runtime object不因annotation改变；result ref从null到union member。

**为什么得到这个结果：** 类型系统只约束source usage，guard才观察runtime properties。

**对比写法：** `const response: ProductListResponse = JSON.parse(json)`只给checker承诺，不检查实际JSON。

**常见错误为什么错：** `as Product`绕过unknown protection，runtime missing field仍会crash。

**与真实项目的关系：** fetch/localStorage/postMessage都应以unknown或validated adapter进入domain。

**与当前学习主线的关系：** Chapter 04 async state现在得到明确unknown-to-domain gate。

**最终记忆模型：** type models; guard observes; runtime decides; vue-tsc diagnoses usage。

<a id="section-9-2"></a>

### 9.2 lang="ts"：SFC script、template expression 与 TypeScript checking

**结论：** `lang="ts"`让SFC script与template expressions进入TypeScript-aware tooling；它不让browser执行TypeScript。

**本节解决的问题：** 为什么template中的`product.price.toFixed()`可被检查，以及为何dev display仍不是full graph typecheck。

**技术意义：** 把SFC script/template diagnostics与runtime rendering明确分层。

**概念解释：** Vue language tooling把template expressions映射到可检查的virtual TypeScript context；browser最终只执行compiled render logic。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** lang标记source language；compiler生成render；Vite transpiles；vue-tsc检查script和template graph。

**类型边界证据链：**

1. runtime value是Product object/number price。
2. Product type建模fields。
3. `TypedProps.vue`使用`<script setup lang="ts">`。
4. type在JS中erase。
5. compiler把template expression编为render access。
6. Vue receives price number atruntime。
7. vue-tsc检查toFixed存在于number。
8. Vite dev只转译/serve。
9. caller runtime仍可被untyped code误用。
10. public external value仍需runtime guard。
11. 缺`lang="ts"`会降低预期TS context。
12. template method拼错但页面某分支未render时，必须靠vue-tsc发现。

**TypeScript 编译期过程：** SFC tooling合并script bindings与template usage，检查property/method compatibility。

**JavaScript / Vue 运行时过程：** render读取product.price并调用number method，生成text vnode。

**API / 语法规则：** 每个Chapter 05 SFC使用`<script setup lang="ts">`；normal HTML不认识该attribute。

**文件结构：** 所有`components/*.vue`、`ts-contract-lab/*.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/components/TypedProps.vue</span>
  </div>

```vue
<script setup lang="ts">
import type { ProductCardProps } from "../contracts/productContract";
defineProps<ProductCardProps>();
</script>

<template>
  <p>${{ product.price.toFixed(2) }}</p>
</template>
```

</div>

**逐行解释：** import type无runtime import；macro type argument声明props；template tooling知道price:number。

**执行过程：** SFC parse → macro/template transform → TypeScript/vue-tsc diagnostics → Vite transform → Vue render。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** props static surface确定；runtime只传object；template读取number。

**为什么得到这个结果：** language tooling根据SFC binding生成type context，而不是browser理解TS。

**对比写法：** plain `<script setup>`仍可运行JavaScript，但不会获得相同strict annotations。

**常见错误为什么错：** 页面能通过Vite显示就声称template type-safe，混淆transpile与check。

**与真实项目的关系：** template property rename、event handler type和component props都依赖SFC type tooling。

**与当前学习主线的关系：** Chapter 01 tooling boundary在此进入strict SFC检查。

**最终记忆模型：** lang selects source checking; compiler removes types; browser runs JS。

<a id="section-9-3"></a>

### 9.3 defineProps：runtime declaration、type-based declaration 与 compiled output

**结论：** runtime declaration把options object交给Vue；type-based declaration由compiler基于AST尽力生成runtime options；两者不能在同一call混用。

**本节解决的问题：** `defineProps<ProductCardProps>()`既能check caller，为什么又不能验证external nested Product。

**技术意义：** 为component input同时理解static contract与runtime metadata limits。

**概念解释：** `ProductCardProps`包含Product/readonly badges；compiler可从可分析type生成required/type metadata，但不会生成完整nested schema。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** generic是TS；macro由SFC编译；runtime receive props options/value；vue-tsc检查caller；Vite不深验。

**类型边界证据链：**

1. runtime存在product object。
2. ProductCardProps建模它。
3. defineProps type-based boundary使用type。
4. type erased。
5. compiler AST conversion生成best-effort runtime props。
6. Vue runtime接收prop value并提供readonly surface。
7. vue-tsc检查required product/badges type。
8. Vite dev不检查whole graph。
9. external product仍untrusted。
10. API guard应在进入component前执行。
11. mixed declaration是macro compile error。
12. props typed正确但runtime field malformed时检查upstream boundary。

**TypeScript 编译期过程：** imported Props可被3.3+ compiler AST使用；whole-object conditional types仍受conversion limits。

**JavaScript / Vue 运行时过程：** parent vnode提供object → Vue resolve props → child render读取fields。

**API / 语法规则：** 选择`defineProps<T>()`或`defineProps({...})`之一；readonly是child surface，不是deep runtime validator。

**文件结构：** `TypedProps.vue`使用type-based；`ProductStoreContractDemo.vue`后续展示runtime + PropType。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/components/TypedProps.vue</span>
  </div>

```ts
import type { ProductCardProps } from "../contracts/productContract";

defineProps<ProductCardProps>();
```

</div>

**逐行解释：** import只供type system/compiler；macro声明input，无runtime function import。

**执行过程：** compile analyzes Props → emits runtime component options/render → caller passesProduct → child displays。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** Product type消失；runtime object identity保留；props surface为readonly。

**为什么得到这个结果：** macro运行在compile stage，type system不随object进入browser。

**对比写法：** runtime `{ product: { type: Object, required:true } }`在JS存在，但Object只检查top-level constructor。

**常见错误为什么错：** 在同一defineProps同时传generic与options制造two sources of truth，Vue禁止。

**与真实项目的关系：** internal typed callers优先type-based；public runtime warning也不能替代API validation。

**与当前学习主线的关系：** Chapter 03 props flow现在增加compiled/static layers。

**最终记忆模型：** type-based tells compiler; compiler emits options; Vue receives values; guard external source separately。

<a id="section-9-4"></a>

### 9.4 withDefaults 与 Reactive Props Destructure：default value、optional flag 与 per-instance mutable default

**结论：** `withDefaults`为type-based props生成runtime defaults并移除对应optional flags；mutable defaults用factory确保per-instance value。

**本节解决的问题：** optional labels/settings在child内部如何变为defined，并避免多个instances共享same array/object。

**技术意义：** default value同时满足runtime isolation与static non-undefined access。

**概念解释：** Vue 3.5也支持Reactive Props Destructure defaults；真实component只使用withDefaults，避免两种机制混写。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** optional flags是TS；withDefaults compiler生成default options；factory runtime每instance调用；3.5 destructure由compiler改写reactive access。

**类型边界证据链：**

1. runtime caller可omit title/labels/settings。
2. Props optional types建模 omission。
3. withDefaults macro配对defaults。
4. types/default syntax在emit后转为options/functions。
5. compiler检查default compatibility并移除returned optional。
6. Vue runtime每instance调用array/object factories。
7. vue-tsc允许`settings.dense`无需undefined guard。
8. Vite dev不证明default type correctness。
9. external nested settings仍未深验。
10. complexexternal data仍需guard。
11. mutable literal default可能造成shared mutation。
12. 两instances labels互相变化时检查default factory。

**TypeScript 编译期过程：** default keys必须匹配Props；对应properties在returned props type中变required。

**JavaScript / Vue 运行时过程：** missing prop → Vue执行factory → instance得到own array/object → template读取。

**API / 语法规则：** withDefaults mutable default使用`() => value`；Reactive Props Destructure 3.5+可用native defaults且不需要factory。

**文件结构：** `components/PropsWithDefaults.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/components/PropsWithDefaults.vue</span>
  </div>

```ts
withDefaults(defineProps<Props>(), {
  title: "Default type boundary title",
  labels: () => ["props", "defaults"],
  settings: () => ({
    dense: false,
    showStatus: true,
  }),
});
```

</div>

**逐行解释：** primitive default直接写；array/object factories延迟创建；compiler关联Props keys。

**执行过程：** component instance create → prop missing → Vue resolve defaults → template render。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** optional caller input变为defined child prop；每instance reference不同。

**为什么得到这个结果：** compiler生成runtime default option，factory由Vue按instance调用。

**对比写法：** Vue 3.5 `const { labels = [] } = defineProps<Props>()`由Reactive Props Destructure处理；版本要求不同。

**常见错误为什么错：** 假设3.4及以下默认启用reactive destructure会导致版本不一致。

**与真实项目的关系：** component options、labels、display settings常需safe defaults。

**与当前学习主线的关系：** Chapter 03 optional props现在解释static flag与runtime default的双层结果。

**最终记忆模型：** optional at caller → compiler-checked default → defined per-instance runtime value。

<a id="section-9-5"></a>

### 9.5 defineEmits：event name、named tuple payload 与 parent listener contract

**结论：** named tuple `defineEmits`限制event literals与payload shapes；runtime仍是child调用parent listener function。

**本节解决的问题：** select只传ProductId，archive传结构化payload，submit传ProductForm，避免event API含义漂移。

**技术意义：** child output与parent listener在IDE/vue-tsc共享同一static contract。

**概念解释：** `archive: [payload: {...}]`创建typed emit signature；named tuple label改善readability，不进入runtime payload。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** tuple是TS；macro编译event metadata；Vue runtime匹配listener；Vite不校验payload；vue-tsc检查两端。

**类型边界证据链：**

1. runtime值是ProductId string或payload object。
2. ProductId/ProductForm/payload type建模。
3. defineEmits type boundary使用它们。
4. tuple labels/types erase。
5. compiler生成emits-related runtime component code。
6. Vue把actual payload传给direct parent listener。
7. vue-tsc检查name/argument count/types。
8. Vite dev不做full SFC listener check。
9. payload中的user string仍runtime。
10. business validation由owner/guard处理。
11. typo event或wrong payload产生static diagnostic。
12. handler never called先比对literal names。

**TypeScript 编译期过程：** emit function overload由event-key→tuple生成；parent template listener参数可被推断。

**JavaScript / Vue 运行时过程：** button click → emit(name,payload) → parent vnode listener同步调用 → parent ref update。

**API / 语法规则：** component events不冒泡；payload应最小、明确、typed。

**文件结构：** `components/TypedEmits.vue`；final `ProductCardTyped.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/components/TypedEmits.vue</span>
  </div>

```ts
const emit = defineEmits<{
  select: [productId: ProductId];
  archive: [payload: { productId: ProductId; reason: string }];
  submit: [form: ProductForm];
}>();
```

</div>

**逐行解释：** keys是allowed names；tuple positions是runtime arguments；labels仅供static readability。

**执行过程：** caller render listener → child click → emit typed payload → parent function receives actual JS value。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** event type消失；payload object存在；parent eventLog ref改变。

**为什么得到这个结果：** compiler/runtime按name连接listener，type checker按signature限制source usage。

**对比写法：** runtime emit validator可在dev runtime检查，但type declaration提供更细caller inference；仍非external schema guard。

**常见错误为什么错：** `emit("archive", product.id)`不符合object payload tuple，vue-tsc报错。

**与真实项目的关系：** save/delete/select/filter events都应形成稳定output API。

**与当前学习主线的关系：** Chapter 03 events-up flow增加static listener contract。

**最终记忆模型：** event key + tuple type check source; actual payload drives runtime listener。

<a id="section-9-6"></a>

### 9.6 defineModel：typed model ref、modelValue / update:modelValue 与 default desynchronization

**结论：** `defineModel<T>({required:true})`返回`Ref<T>`；未required时通常是`Ref<T|undefined>`；default且parent omitted会产生parent/child初值不同步风险。

**本节解决的问题：** default title和named status models如何typed round-trip，同时避开hidden default mismatch。

**技术意义：** 将component v-model contract精确为prop/event/ref三层。

**概念解释：** default model展开为`modelValue` + `update:modelValue`；named status展开为`status` + `update:status`。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** T决定Ref type；compiler生成prop/event；runtime setter emits；browser input仍string；vue-tsc检查model binding。

**类型边界证据链：**

1. runtime存在title/status strings。
2. string/ProductStatus建模。
3. defineModel default/named boundaries。
4. type argumentserase。
5. compiler生成model props/update events。
6. Vue model ref setter发actual event value。
7. vue-tsc检查parent ref compatible。
8. Vite不证明model type。
9. select.value是untrusted string relative to union。
10. runtime literal guard后assign ProductStatus。
11. child default + undefined parent导致desync bug。
12. child显示值而parent仍undefined时检查default。

**TypeScript 编译期过程：** required option移除undefined；named model key影响generated prop/event names。

**JavaScript / Vue 运行时过程：** DOM event → guard currentTarget/value → model ref assignment → update listener → parent ref mutation。

**API / 语法规则：** 需要同步时parent提供initial binding；不要依赖child default填充parent ref。

**文件结构：** `components/TypedVModel.vue`；final ProductForm/Filter components。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/components/TypedVModel.vue</span>
  </div>

```ts
const title = defineModel<string>({ required: true });
const status = defineModel<ProductStatus>("status", { required: true });
```

</div>

**逐行解释：** first maps default model；second names status model；required使script无需undefined guard。

**执行过程：** parent passes refs → child model refs read → user input → runtime guard → update events → parent rerender。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** Ref types static；inner strings runtime；parent/child point throughmodel contract。

**为什么得到这个结果：** compiler turns model macro into standardprops/emits wiring。

**对比写法：** pre-3.4 explicit defineProps/defineEmits语义相同；只有样板不同。

**常见错误为什么错：** `defineModel({default:"x"})`且parent ref undefined，使child x而parent undefined。

**与真实项目的关系：** input、status selector、filter object、modal visibility常用model。

**与当前学习主线的关系：** Chapter 03 model flow现在增加undefined/default/static union分析。

**最终记忆模型：** typed model ref is compiled prop+event; required controls undefined; runtime input still needs guard。

<a id="section-9-7"></a>

### 9.7 defineSlots：slot name、slot props type 与 parent render contract

**结论：** `defineSlots`只接受type parameter，无runtime argument；它检查slot names/props，不在runtime验证slot content或return type。

**本节解决的问题：** table child如何告诉parent row slot收到Product/index，actions slot收到ProductId。

**技术意义：** parent-provided render function获得precise autocomplete与diagnostics。

**概念解释：** child runtime仍传plain slot props object；type literal仅描述function signatures。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** slot signature是TS；macro provides hints；Vue调用runtime slot function；return type当前不参与runtime validation。

**类型边界证据链：**

1. runtime值是product/index/productId。
2. Product/ProductId建模。
3. defineSlots signatures使用types。
4. signatureserase。
5. compiler生成slot-related render calls/hints。
6. Vue调用parent slot function with object。
7. vue-tsc检查parent destructuring/property use。
8. Vite不检查slot contract。
9. external product仍需upstream guard。
10. slot content semantics/accessibility需runtime/design review。
11. wrong slot prop name是tooling diagnostic。
12. parent destructure undefined时检查child slot API。

**TypeScript 编译期过程：** slot key→function signature；first argument定义slot props；return `unknown`仅静态placeholder。

**JavaScript / Vue 运行时过程：** child iterates products → creates props object → callsparent slot function → vnodes inserted。

**API / 语法规则：** `defineSlots<...>()`无runtime object；slot return type目前不做content validation。

**文件结构：** `components/TypedSlots.vue`；final `ProductTableTyped.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/components/TypedSlots.vue</span>
  </div>

```ts
defineSlots<{
  row(props: { product: Product; index: number }): unknown;
  actions(props: { productId: ProductId }): unknown;
}>();
```

</div>

**逐行解释：** named keys匹配`#row/#actions`；function parameter是parent slot scope。

**执行过程：** child render readsproducts → slot invocation → parent render uses typed props → DOM patch。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** types disappear；slot props object exists per invocation；product identity unchanged。

**为什么得到这个结果：** tooling knows compile-time function contract，Vue runtime只调用functions。

**对比写法：** ordinary slot无props，parent不能访问child data；scoped typed slot explicitly passes it。

**常见错误为什么错：** 认为defineSlots runtime拒绝wrong markup，混淆type hints与runtime validation。

**与真实项目的关系：** table rows、list items、form controls和layout regions受益。

**与当前学习主线的关系：** Chapter 03 scoped slot rendering获得type contract。

**最终记忆模型：** child defines slot signature; parent supplies render; runtime passes plain props。

<a id="section-9-8"></a>

### 9.8 PropType：runtime prop declaration 中的 complex type boundary

**结论：** `PropType<T>`让runtime declaration与complex static T关联；runtime `Object`仍只做shallow constructor check，不深验T。

**本节解决的问题：** final store demo使用runtime props option时，如何让`store`在script/template中获得ProductStoreContract类型。

**技术意义：** 解释runtime declaration与static complex type的桥，而不夸大validator能力。

**概念解释：** `Object as PropType<ProductStoreContract>`是Vue官方pattern；assertion告诉TS该constructor承载的static type，runtime仍是Object。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** PropType仅type helper；`Object`和required option进入JS；Vue dev检查top-level；nested actions/getters未被深验。

**类型边界证据链：**

1. runtime值是store object。
2. ProductStoreContract建模shape。
3. PropType连接runtime option与static type。
4. generic T erase，Object constructor remains。
5. compiler保留runtime props object。
6. Vue runtime接收store并检查Object/required。
7. vue-tsc检查template methods/fields。
8. Vite不深验store。
9. untrusted object仍可缺nested methods。
10. external store adapter需runtime construction/guard。
11. 认为PropType深验nested shape制造false safety。
12. runtime method undefined而typecheck pass时检查untyped caller。

**TypeScript 编译期过程：** assertion使props.store推断为ProductStoreContract而不是object/unknown。

**JavaScript / Vue 运行时过程：** caller passes store → Vue checkstop-level Object → component invokesgetter/action。

**API / 语法规则：** PropType用于runtime declarations complex types；对external payload不要用assertion替代guard。

**文件结构：** `ts-contract-lab/ProductStoreContractDemo.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/ts-contract-lab/ProductStoreContractDemo.vue</span>
  </div>

```ts
const props = defineProps({
  store: {
    type: Object as PropType<ProductStoreContract>,
    required: true,
  },
});
```

</div>

**逐行解释：** runtime object exists；PropType annotation improvesstatic surface；required affectsruntime missing prop warning。

**执行过程：** compile preservesoptions → Vue resolves prop → template calls typed contract methods。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** T erased；Object remains；store object reference unchanged。

**为什么得到这个结果：** assertion operates only inTypeScript，Vue runtime only seesconstructor/options。

**对比写法：** type-based `defineProps<{store:ProductStoreContract}>()` avoids assertion but does not demonstrate runtime declaration。

**常见错误为什么错：** 把`Object as PropType<Product>`用于API JSON后直接信任，仍没有runtime nested checks。

**与真实项目的关系：** runtime component options/Options API complex props常用PropType。

**与当前学习主线的关系：** Chapter 03 runtime props validation在本章得到type/runtimelimit说明。

**最终记忆模型：** PropType types the source; Object validates shallow runtime category; schema guard validates data shape。

<a id="section-9-9"></a>

### 9.9 InjectionKey：Symbol key、provider / consumer type sync 与 undefined injection

**结论：** `InjectionKey<T>`把Symbol identity与provider/consumer static type同步；`inject(key)`仍返回`T|undefined`。

**本节解决的问题：** descendant如何得到readonly selected id与typed select function，同时安全处理missing provider。

**技术意义：** 消除string-key typo/unknown type，但不伪造runtime provider guarantee。

**概念解释：** provider owns mutable ref并provide readonly view + action；consumer optional chaining。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** InjectionKey是type extendingSymbol；Symbol runtime identity存在；Vue沿component chain查找；undefined是runtime可能。

**类型边界证据链：**

1. runtime值是Symbol/context object/ref/function。
2. ProductSelectionContext建模。
3. provide/inject使用same typed key。
4. context typeerased，Symbol remains。
5. SFC compiler不生成provider guarantee。
6. Vue runtime ancestor lookup返回object/undefined。
7. vue-tsc检查provide shape和consumer use。
8. Vite不检查provider presence。
9. component可脱离provider使用。
10. consumer guard/default必要。
11. non-null assertion可制造runtime crash。
12. provider内正常、storybook/test独立失败时检查undefined。

**TypeScript 编译期过程：** key generic把provide value和inject return关联成同一T。

**JavaScript / Vue 运行时过程：** provider setup registersSymbol→context；consumer setup lookup；actionwritesprovider ref。

**API / 语法规则：** key放shared file；mutation保留provider；consumer处理undefined。

**文件结构：** `contracts/injectionKey.ts`、InjectionProvider/Consumer。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/contracts/injectionKey.ts</span>
  </div>

```ts
export const productSelectionKey: InjectionKey<ProductSelectionContext> =
  Symbol("product-selection");
```

</div>

**逐行解释：** annotation不需要unsafe assertion；runtime Symbol唯一；generic只供static sync。

**执行过程：** provider creates ref → provide key/context → consumer injects → button action → ref update → both renders。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** injected ref readonly surface；inner id changes throughaction；missing path yieldsundefined。

**为什么得到这个结果：** static key pairing和runtime ancestor lookup是两套互补mechanisms。

**对比写法：** string key需`inject<T>("key")`且typo不会sync provider type。

**常见错误为什么错：** `inject(key)!`删除static undefined但不创建provider。

**与真实项目的关系：** form context、theme、toast、selection适合；security state不因typed injection安全。

**与当前学习主线的关系：** Chapter 03 provide/inject flow获得cross-file type sync。

**最终记忆模型：** Symbol identifies runtime channel; InjectionKey syncs static T; guard missing provider。

<a id="section-9-10"></a>

### 9.10 defineExpose 与 template refs：public instance shape、InstanceType 与 ComponentPublicInstance

**结论：** `<script setup>` component默认closed；`defineExpose`只公开selected methods；non-generic component ref可用`InstanceType<typeof Component>`。

**本节解决的问题：** parent只调用focus/reset/snapshot，而不能直接修改child internal form refs。

**技术意义：** 给imperative escape hatch建立minimal typed public surface。

**概念解释：** `useTemplateRef` runtime先null后instance/element；exposed refs在public instance上自动unwrap。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** defineExpose是macro；InstanceType是TS utility；Vue builds public instance；browser focus实际执行。

**类型边界证据链：**

1. runtime值是child instance/HTMLInputElement/null。
2. EditorInstance/HTMLInputElement建模。
3. defineExpose/component template ref使用types。
4. InstanceType/return typeserase。
5. compiler records exposed keys。
6. Vue assigns public instance toparent ref。
7. vue-tsc检查method availability。
8. Vite不验证ref timing。
9. DOM target可能unmounted。
10. optional chaining/null guard必要。
11. exposing all refs breaks encapsulation。
12. parent method missing diagnostic说明not exposed/renamed。

**TypeScript 编译期过程：** `InstanceType<typeof ExposedProductEditor>` extracts public instance type including exposed methods。

**JavaScript / Vue 运行时过程：** child mount → Vue setscomponent ref → parent click → exposed method → DOM ref focus/reset。

**API / 语法规则：** generic component ref不能可靠用InstanceType；官方建议ComponentExposed helper，但本章不安装dependency。

**文件结构：** ExposedProductEditor、DefineExposeDemo、TypedTemplateRefDemo。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/components/DefineExposeDemo.vue</span>
  </div>

```ts
type EditorInstance = InstanceType<typeof ExposedProductEditor>;
const editor = useTemplateRef<EditorInstance>("product-editor");

editor.value?.focusNameInput();
```

</div>

**逐行解释：** typeof capturescomponent constructor type；InstanceType extracts instance surface；optional chain handlesnull。

**执行过程：** setup createsnull ref → mount assigns public instance → click invokes exposed method → child inputfocus。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** ref null→instance；public surface includes three methods，internal refs stayclosed。

**为什么得到这个结果：** SFC compiler usesdefineExpose metadata when constructing public instance。

**对比写法：** `ComponentPublicInstance` only guaranteescommon members like`$el` when exactcomponent type unavailable。

**常见错误为什么错：** reading ref withoutnull guard violatesmount/unmount timing regardless ofstatic instance type。

**与真实项目的关系：** focus/reset/measure合理；business state应优先props/models。

**与当前学习主线的关系：** Chapter 03 refs/expose获得precise public instance shape。

**最终记忆模型：** closed by default → expose minimal methods → InstanceType checks parent → null guard runtime timing。

<a id="section-9-11"></a>

### 9.11 generic components：script setup generic、typed options 与 GenericSelect

**结论：** `<script setup generic="T extends ...">`让一个SFC按caller items/model推断T；runtime没有T，只接收objects。

**本节解决的问题：** GenericSelect如何保留option额外fields并让model精确为`T|null`。

**技术意义：** reusable visual component不需要把all domain options降级为base type或unknown。

**概念解释：** constraint保证id/label；caller的SelectOption仍保留description；selectItem(item:T)写typed model。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** generic attribute供SFC/TS；runtime只循环items；vue-tsc在caller推断；Vite erases generic。

**类型边界证据链：**

1. runtime值是SelectOption objects。
2. caller SelectOption与generic T建模。
3. generic props/model使用T。
4. T erases。
5. SFC compiler handlesgeneric setup signature。
6. Vue receivesitems array/model value。
7. vue-tsc checksselected model compatibility。
8. Vite不验证items shape。
9. external items仍需guard。
10. base id/label runtime requirement必须由trusted source保证。
11. wrong model type producesstatic error。
12. inference失败时可用`@vue-generic` guide directive。

**TypeScript 编译期过程：** T inferred from items/model，constraint允许template access id/label。

**JavaScript / Vue 运行时过程：** v-for iterates objects → click passesobject → model update sends object。

**API / 语法规则：** generic component ref不能用InstanceType；本章不增加external helper。

**文件结构：** `components/GenericSelect.vue`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/components/GenericSelect.vue</span>
  </div>

```vue
<script
  setup
  lang="ts"
  generic="T extends { id: string; label: string }"
>
const selectedItem = defineModel<T | null>({ required: true });
</script>
```

</div>

**逐行解释：** generic attribute mirrorsTS parameter list；constraint guaranteesrender fields；model trackswhole T。

**执行过程：** caller inference → compile/typecheck → runtime list render → click update parent model。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** T only static；selected runtime object preservesfull fields。

**为什么得到这个结果：** generic parameter propagates throughprops/model atcompile time，object identity at runtime。

**对比写法：** fixed `SelectOptionBase` model losescaller-specificfields；generic retains them。

**常见错误为什么错：** generic component ref withInstanceType is unsupported because one constructor representsmany instantiations。

**与真实项目的关系：** selects/tables/autocomplete list renderers use generic item contracts。

**与当前学习主线的关系：** Chapter 03 reusable component API加上caller-specific type inference。

**最终记忆模型：** constraint guarantees minimum; caller infers T; runtime receives ordinary items。

<a id="section-9-12"></a>

### 9.12 typed composables：generic return、MaybeRefOrGetter input、Ref / ComputedRef boundary

**结论：** typed composable应明确input与plain return surface；`Ref`表示mutable source，`ComputedRef`表示derived readonly output。

**本节解决的问题：** product data/filter/status/error与filtered result如何跨function boundary保持类型和ownership。

**技术意义：** component只组合render，logic contract可单独检查。

**概念解释：** useTypedProducts domain-specific；useProductForm使用`keyof ProductForm`和indexed access保证key/value配对。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** composable types由TS检查；runtime refs/computed真实存在；无macro；vue-tsc检查SFC caller；Vite只transpile。

**类型边界证据链：**

1. runtime值是arrays/filter object/form strings。
2. Product/ProductFilter/ProductForm types建模。
3. composable input/return APIs使用types。
4. generic/keyof typeserase。
5. 无macro generation。
6. Vue runtime createsRef/ComputedRef objects。
7. vue-tsc checkscaller/destructure/setter calls。
8. Vite不check full graph。
9. raw response/user input remainsuntrusted。
10. response guard/form validation needed。
11. returning any destroyscontract。
12. wrong key/value pair atsetter isdiagnostic。

**TypeScript 编译期过程：** `<Key extends keyof ProductForm>(key:Key,value:ProductForm[Key])` couples field and value type。

**JavaScript / Vue 运行时过程：** setter receivesactual string/array → writesreactive object → computed/render update。

**API / 语法规则：** return namedrefs/functions；avoid any；MaybeRefOrGetter适用于真正需要flexible reactive input的public composable。

**文件结构：** `useTypedProducts.ts`、`useProductForm.ts`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/composables/useProductForm.ts</span>
  </div>

```ts
function setFieldValue<Key extends keyof ProductForm>(
  key: Key,
  value: ProductForm[Key],
): void {
  values.value[key] = value;
}
```

</div>

**逐行解释：** Key restricted toactual fields；indexed access selects matching value type；runtime assignment isordinary property write。

**执行过程：** component eventguard → typedsetter → ref nested mutation → validation/render readsupdated value。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** static key/value relation checked；runtime input remainsstring；values ref retainsidentity。

**为什么得到这个结果：** generic inference usesactual key literal to determineallowed value type。

**对比写法：** `setFieldValue(key:string,value:any)` discardsfield set and value relationship。

**常见错误为什么错：** `reactive<T>()` generic may obscure nested ref unwrapping; typeinitial object/return surface instead。

**与真实项目的关系：** filters/forms/async resources benefit from explicit Ref/ComputedRef/action contracts。

**与当前学习主线的关系：** Chapter 04 composable architecture现在加static inputs/outputs与runtime guard boundaries。

**最终记忆模型：** type inputs/returns; Vue ownsref runtime; validateuser/external values separately。

<a id="section-9-13"></a>

### 9.13 typed API response：unknown boundary、type guard、Result state 与 runtime validation limit

**结论：** API response type描述accepted shape；raw payload必须先是unknown，再由runtime guard产出`Result<ProductListResponse,ApiError>`。

**本节解决的问题：** local Promise返回wrong price string时，如何拒绝payload而不是让typed UI调用`toFixed`crash。

**技术意义：** 在不引入validation library前，证明static/runtime boundary。

**概念解释：** `isProduct`逐field检查；`isProductListResponse`检查items/total；这只是minimal guard，不处理coercion、rich errors、all semantic rules。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** predicate signature narrowsTS；function body runtime executes；Result discriminant exists；no macro；Vite/typecheck不validate response。

**类型边界证据链：**

1. runtime值是local unknown object。
2. ProductListResponse/ApiError/Result建模。
3. useTypedProducts/API demo callguard。
4. typeserase，`ok` property remains。
5. no SFC macro inference。
6. Vue refs receiveactual Result/data/error。
7. vue-tsc enforcesbranch narrowing。
8. Vite cannot knowpayload。
9. simulated response remainsuntrusted。
10. guard/fallback required。
11. direct annotation/assertion createsfalse safety。
12. production errors only onmalformed payload indicate missingguard。

**TypeScript 编译期过程：** type predicate tellscontrol flow thatsuccess branch value conforms afterboolean true。

**JavaScript / Vue 运行时过程：** Promise resolvesunknown → guard iterates fields/items → Result object → refs/status update。

**API / 语法规则：** useunknown；never`as Product` for external value；full schema validation deferred toChapter09。

**文件结构：** `apiContract.ts`、useTypedProducts、TypeRuntimeBoundaryDemo、ProductApiContractDemo。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/contracts/apiContract.ts</span>
  </div>

```ts
export function isProductListResponse(
  value: unknown,
): value is ProductListResponse {
  return (
    isRecord(value) &&
    Array.isArray(value.items) &&
    value.items.every(isProduct) &&
    typeof value.total === "number"
  );
}
```

</div>

**逐行解释：** unknown input；predicate return；record guard enablesproperties；array/every recurse；total checkedruntime。

**执行过程：** load → wait → unknown response → Result conversion → success setdata or failure seterror。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** unknown narrows onlytrue branch；runtime object unchanged；data/error refs diverge byResult。

**为什么得到这个结果：** control-flow narrowing followsactual guard result，not annotation。

**对比写法：** full schema library can produce richerpath errors/coercion; this guard intentionallysmall。

**常见错误为什么错：** type guard that only checks`typeof value==="object"` falsely claims deep ProductListResponse。

**与真实项目的关系：** API adapter should be single ingress fromunknown to domain。

**与当前学习主线的关系：** Chapter 04 async state gains runtime-safe response transition。

**最终记忆模型：** unknown in → runtime guard → Result → typed domain or ApiError。

<a id="section-9-14"></a>

### 9.14 typed store contract：state、getter、action shape 与 future Pinia boundary

**结论：** 当前无Pinia，因此只建pure TS state/getter/action contract与local object `satisfies`；真实store implementation留Chapter07。

**本节解决的问题：** 在不安装dependency、不伪造store architecture时，先定义domain-facing shape。

**技术意义：** future Pinia adapter有明确state/action types，current lab仍可运行。

**概念解释：** ProductStoreContract separates mutable state, derived getter functions, action parameters；local reactive object只用于demo。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** contracts erase；local object/methodsruntime exist；reactive wraps state；no Pinia runtime/import。

**类型边界证据链：**

1. runtime值是storeState/object/functions。
2. ProductStore* types model。
3. `satisfies ProductStoreContract` checkslocal object。
4. interfaces/typeserase。
5. no store macro/compiler。
6. Vue reactive receivesinitialstate。
7. vue-tsc checksgetter/action signatures。
8. Vite seesordinary module。
9. future persisted/API data stilluntrusted。
10. adapter/runtime guard needed at ingress。
11. importingmissingPinia breaksresolution/scope。
12. dependency not package yet imported isrecognition signal。

**TypeScript 编译期过程：** satisfies checkscontract without replacing specific inferred object type。

**JavaScript / Vue 运行时过程：** actions mutate reactive state；getters read current state；component rerenders。

**API / 语法规则：** Pinia official model maps state/getters/actions；real defineStore waitsChapter07。

**文件结构：** `storeContract.ts`、ProductStoreContractDemo、VueTsContractLab local store。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/contracts/storeContract.ts</span>
  </div>

```ts
export type ProductStoreContract = {
  state: ProductStoreState;
  getters: ProductStoreGetters;
  actions: ProductStoreActions;
};
```

</div>

**逐行解释：** three surfacescompose; each nested type names its inputs/returns。

**执行过程：** lab createsinitial state → reactive → object satisfiescontract → actions/getters used bydemo。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** contract disappears；runtime object stays；reactive state changes。

**为什么得到这个结果：** satisfies iscompile-time check, notfactory/store runtime。

**对比写法：** real Pinia infers state fromstate factory, getters ascomputed-like, actions asmethods；not installed now。

**常见错误为什么错：** treating clienttyped store permission assecurity; types cannot authorize server action。

**与真实项目的关系：** contract clarifiesdomain beforechoosing adapter。

**与当前学习主线的关系：** Chapter 04 warns againsthidden global composables; Chapter07 introducesexplicit Pinia ownership。

**最终记忆模型：** define shape now; instantiate local demo; adopt Pinia later without premature dependency。

<a id="section-9-15"></a>

### 9.15 typed route meta contract：RouteMeta augmentation concept 与 future Router boundary

**结论：** 当前无Vue Router，因此real file只定义local RouteMetaContract；official module augmentation仅guide snippet，Chapter06再实现。

**本节解决的问题：** requiresAuth/requiredPermissions/title如何先形成type contract而不创建router config。

**技术意义：** 让future routes/guards共享meta shape，同时尊重dependency boundary。

**概念解释：** local route record是ordinary object checked bysatisfies；official Router允许augment`RouteMeta` interface once package exists。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** local typeserase；route objectruntime exists；module augmentation仅affectsTS；no router runtime/navigation。

**类型边界证据链：**

1. runtime值是productRouteContract object。
2. RouteMetaContract/RouteRecordContract model。
3. satisfies checksobject。
4. typeserase。
5. no SFC macro。
6. Vue onlyrendersobject fields。
7. vue-tsc checksrequired meta keys。
8. Vite doesn't performrouting。
9. user auth/permissions untrusted anddynamic。
10. server authorization stillrequired。
11. importingvue-router absentdependency failsmodule resolution。
12. `declare module` in source beforepackage exists isscope violation。

**TypeScript 编译期过程：** local objectchecked againstrecord/meta; future augmentation mergesinterface globally。

**JavaScript / Vue 运行时过程：** current lab simplyreadsobject; no navigation guard or route match。

**API / 语法规则：** actual augmentation only whenvue-router installed; route meta typing isnot security。

**文件结构：** `routeMetaContract.ts`; snippet only below。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: vue-router-route-meta-augmentation.d.ts</span>
  </div>

```ts
import "vue-router";

export {};

declare module "vue-router" {
  interface RouteMeta {
    title: string;
    requiresAuth: boolean;
    requiredPermissions: readonly string[];
  }
}
```

</div>

**逐行解释：** import activatesmodule; export ensuresmodule context; declaration merges official interface。此snippet本章不创建。

**执行过程：** future TS compile includesaugmentation → route definitions/`to.meta` checked；runtime object remainsordinary meta。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** augmentation only static；route meta object runtime；permissions do notgrant access。

**为什么得到这个结果：** declaration merging changeschecker environment, not router runtime behavior。

**对比写法：** current local contract avoidsunresolved import and stillteaches shape。

**常见错误为什么错：** addingmodule augmentation withoutinstalled package violatescurrent project dependency graph。

**与真实项目的关系：** Chapter06 routes/guards will consume typed meta; backend stillauthorizes。

**与当前学习主线的关系：** Chapter05 preparesboundary only; no navigation implementation。

**最终记忆模型：** local contract now; module augmentation withRouter later; meta guides UI, notsecurity。

<a id="section-9-16"></a>

### 9.16 vue-tsc：Vite transpilation-only、SFC type checking 与 CI gate

**结论：** Vite dev/bundler aretranspilation-only；`vue-tsc --noEmit`检查TS + Vue SFC graph；本项目build串联vue-tsc和Vite。

**本节解决的问题：** 页面能dev render为什么仍可能有template/props/type errors。

**技术意义：** 把fast transform与full static analysis作为separate gates。

**概念解释：** Vite按module转换以保持speed；vue-tsc基于TS+Vue language tooling检查SFC；IDE diagnostics是另一个interactive process。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** Vite emits/runs JS；vue-tsc noEmit diagnostics；browser只执行output；macros需SFC-aware checker。

**类型边界证据链：**

1. runtime值是transformed modules。
2. TS types modelsource。
3. all SFC APIs participate。
4. typeserase duringtransform。
5. SFC compiler outputsrender/setup code。
6. Vue runtime executes output。
7. vue-tsc checksfull graph。
8. Vite dev explicitlydoes not。
9. runtime API data stillunknown。
10. runtime guards remainneeded afterPASS。
11. dev success falsely claimed typecheck isprocess error。
12. CI failures absentlocally indicate skippedvue-tsc。

**TypeScript 编译期过程：** `vue-tsc --noEmit` resolvesTS/SFC imports andtemplate virtual types withoutwritingJS。

**JavaScript / Vue 运行时过程：** Vite transforms modules; browser runsVue app independent oftype diagnostics。

**API / 语法规则：** actual script: `typecheck: vue-tsc --noEmit`; build: `vue-tsc --noEmit && vite build`。

**文件结构：** `package.json`; visible explanation inVueTscBoundaryDemo。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run typecheck
npm run build
```

</div>

**逐行解释：** first checksonly；second rechecks thenbundles becausepackage scriptuses`&&`。

**执行过程：** CLI → vue-tsc module graph diagnostics → if success, Vite production transform/bundle。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** no runtime values changed bynoEmit；build createsassets；types do notenterassets。

**为什么得到这个结果：** project intentionally separatesanalysis andtransformation。

**对比写法：** relying onlyIDE can missunsaved/disabled/editor-specific state; CLI isreproducible gate。

**常见错误为什么错：** `npm run dev` no error isnot evidence thatvue-tsc ran。

**与真实项目的关系：** local checks andCI should runvue-tsc; runtime tests/validation remainseparate。

**与当前学习主线的关系：** Chapter01 Vite boundary becomesexplicit quality gate for typedSFCs。

**最终记忆模型：** IDE fast feedback; vue-tsc full static gate; Vite runtime bundle; guards runtime data。

<a id="section-9-17"></a>

### 9.17 Chapter integration：Product type、ProductForm、ProductFilter 如何贯穿组件与 composable

**结论：** 同一个领域契约应由 `contracts/productContract.ts` 集中定义，再通过 type-only import 进入组件、composable 与最终实验；这样修改字段时，`vue-tsc` 能沿依赖图指出所有不一致位置。

**本节解决的问题：** 避免每个组件各写一份“看起来相同”的产品类型，并明确展示数据展示形态、表单输入形态与筛选形态为什么不能混成一个类型。

**技术意义：** `Product.price` 是已进入领域层的 `number`，`ProductForm.price` 是浏览器输入框产生的 `string`，`ProductFilter` 则描述查询条件。三个类型分开后，解析与转换发生在可见边界，而不是藏在类型断言中。

**概念解释：** `Product` 是已确认领域对象；`ProductForm` 保存编辑过程；`ProductFilter` 保存列表查询条件。`useTypedProducts` 消费筛选契约，`useProductForm` 消费表单契约，产品组件只接收其职责需要的最小类型。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** `type`、literal union、indexed access 与 `satisfies` 属于 TypeScript；`defineProps`、`defineEmits`、`defineModel` 属于 SFC 编译宏；类型擦除后，Vue 收到普通 props、emits、ref 与对象；浏览器输入仍是字符串；Vite 转换模块，`vue-tsc` 检查跨文件契约。

**类型边界证据链：**

1. 运行时存在的是产品对象、表单对象、筛选对象和 DOM 输入字符串。
2. `Product`、`ProductForm`、`ProductFilter` 分别描述三个运行时形态。
3. props、emits、model 与两个 composable 使用这些共享类型。
4. 三个 type alias 在输出 JavaScript 中全部擦除。
5. SFC 编译器根据宏参数生成 props、emits、model 的运行时代码并为模板建立类型信息。
6. Vue runtime 实际接收 reactive object、prop value、event payload 和 model ref。
7. IDE 与 `vue-tsc` 能发现错误字段、错误 literal、错误事件 payload 与错误 model 形状。
8. Vite dev server 不负责完整检查这些跨 SFC 契约。
9. JSON 和表单输入仍是外部或用户产生的未可信运行时值。
10. API 需要 guard；DOM event 需要元素检查；价格提交前需要业务校验和转换。
11. 用一个类型同时表示 API 产品与表单，会诱发字符串价格断言或过早解析。
12. 真实项目中出现同名字段却到处强制转换，通常说明边界类型没有按生命周期拆分。

**TypeScript 编译期过程：** 编译器解析 `import type`，将 `ProductForm[Key]` 与 `keyof ProductForm` 等关系加入检查图；`satisfies` 检查初始对象但保留其更精确的 literal 信息。

**JavaScript / Vue 运行时过程：** 初始对象仍会输出为普通对象；composable 将它复制进 ref；组件通过 props、事件和 model 在运行时传递对象；提交函数显式执行 `Number(form.price)`。

**API / 语法规则：** 共享契约使用 `export type`；只作类型用途的依赖使用 `import type`；只读输入使用 `ReadonlyArray<T>`；可编辑表单使用独立的可变数组。

**文件结构：** `contracts/productContract.ts` 是领域词汇源，`composables/` 管理复用状态，`components/` 展示单一边界，`ts-contract-lab/` 负责组合。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/contracts/productContract.ts</span>
  </div>

```ts
export type ProductStatus = "draft" | "active" | "archived";

export type Product = {
  id: string;
  name: string;
  price: number;
  status: ProductStatus;
  tags: ReadonlyArray<string>;
};

export type ProductForm = {
  name: string;
  price: string;
  status: ProductStatus;
  tags: Array<string>;
};

export type ProductFilter = {
  search: string;
  status: ProductStatus | "all";
};
```

</div>

**逐行解释：** literal union 限制状态词汇；`Product` 的价格已是数值且标签对消费者只读；`ProductForm` 保留输入框字符串；`ProductFilter` 额外允许只属于筛选语义的 `"all"`。

**执行过程：** API payload 经 guard 成为 `Product` → composable 保存列表 → filter 计算派生列表 → table 通过 typed slot 交给 card → form model 收集字符串 → submit 校验并转换为新 `Product`。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** `Product` 贯穿 props、slot props、事件 payload、store state；`ProductForm` 贯穿 model 与 submit；`ProductFilter` 贯穿 model 与 computed；类型只在检查期存在，运行时仍是对象和 ref。

**为什么得到这个结果：** 类型按运行时阶段建模，使转换点显式；共享定义又让所有边界使用相同领域词汇。

**对比写法：** 把 `price` 永远写成 `number | string` 看似省事，却让每个消费者都要重复缩窄；边界类型分层后，只有输入到领域对象的转换点负责处理。

**常见错误为什么错：** 用 `as Product` 把 `ProductForm` 变成产品，会掩盖 `price` 仍是字符串，也绕过运行时校验。

**与真实项目的关系：** 表单 DTO、API DTO、领域对象和查询条件经常只是部分字段相似；生产项目应按来源与生命周期命名，而不是按视觉相似度合并。

**与当前学习主线的关系：** 第 2 章的 reactive value、第 3 章的组件通信和第 4 章的 composable，现在由共享类型契约连接；后续 Router、Pinia 与验证层可复用这些领域类型。

**最终记忆模型：** 同一领域词汇，共享一处定义；不同运行时阶段，使用不同边界类型；所有转换都在可见位置完成。

<a id="section-9-18"></a>

### 9.18 Final integration：vue-ts-contract-lab 如何建立完整类型契约

**结论：** `VueTsContractLab.vue` 不是“类型展示墙”，而是一条可运行的数据链：unknown payload → guard → Result → composable state → typed props/slots/events/models → local store contract。

**本节解决的问题：** 验证前面分散的宏和工具能否在一个真实交互中协作，并防止“每个文件单独正确，组合后契约断裂”。

**技术意义：** 最终实验把静态契约与运行时保护分开：`vue-tsc` 证明调用关系一致，hand-written guard 只证明本章示例所检查的 payload 形状，表单校验处理用户输入，纯 TS store/route contract 为后续章节预留边界。

**概念解释：** 组合根拥有协调逻辑；子组件拥有各自 UI 边界；composable 拥有可复用状态；contract 文件拥有共享词汇。Pinia 与 Router 尚未安装，因此 store 和 route 只建模，不伪装成已经存在的框架实现。

**边界：TypeScript syntax、TypeScript type system、SFC compiler macro、emitted JavaScript、Vue runtime、browser runtime、Vite tooling、vue-tsc tooling：** `satisfies ProductStoreContract` 是静态检查；宏生成 Vue 运行时选项；watch、computed、reactive 与 ref 在浏览器运行；guard 检查实际 JSON 值；Vite 构建资产；`vue-tsc` 负责静态 gate。

**类型边界证据链：**

1. 运行时存在本地 payload、产品数组、筛选值、表单值、事件对象和 store object。
2. API、产品、表单、筛选、store 与 route 类型分别描述它们。
3. guard、composable、props、emits、slots、model 和 `satisfies` 使用这些类型。
4. 所有 type-only 声明在构建产物中擦除。
5. SFC 编译器把组件宏转成 props、emits、slots 与 model 相关运行时代码。
6. Vue runtime 执行 ref 读写、computed 过滤、watch 同步与事件派发。
7. `vue-tsc` 可检查所有组件绑定、slot props 和函数签名。
8. 仅启动 Vite 无法证明完整类型图通过。
9. 模拟 payload 与 DOM 输入在运行时仍不可信。
10. payload 走 guard，DOM 走 `instanceof`，表单走 `validateForm` 和显式数值转换。
11. 直接把 payload 注解为响应类型会制造静态安全假象；漏掉 guard 后浏览器仍可能收到错误形状。
12. 真实项目中“类型检查通过但线上数据崩溃”通常意味着外部边界从未执行运行时验证。

**TypeScript 编译期过程：** `satisfies` 检查 local store 是否具备 state/getters/actions；component bindings 根据宏声明交叉检查；`Result` 的 `ok` 判别字段驱动控制流缩窄。

**JavaScript / Vue 运行时过程：** mounted hook 加载本地 Promise；guard 产生成功或失败 Result；watch 同步产品到 local store；用户过滤、选择、归档或提交后，Vue 更新响应式依赖并 patch DOM。

**API / 语法规则：** 不导入 Pinia、Router 或请求库；不发网络请求；外部形态以 `unknown` 开始；父组件拥有产品集合的 mutation；子组件只发出 typed intent。

**文件结构：** `ts-contract-lab/VueTsContractLab.vue` 是组合根，六个相邻组件分别承接 card、form、filter、table、store 与 API 边界。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/ts-contract-lab/VueTsContractLab.vue</span>
  </div>

```ts
const initialStoreState: ProductStoreState = {
  products: [],
  selectedProductId: null,
  loading: false,
};

const storeState = reactive(initialStoreState);

const store = {
  state: storeState,
  getters: {
    activeProducts: () =>
      storeState.products.filter((product) => product.status === "active"),
    selectedProduct: () =>
      storeState.products.find(
        (product) => product.id === storeState.selectedProductId,
      ) ?? null,
  },
  actions: {
    setProducts: (products: ReadonlyArray<Product>) => {
      storeState.products = [...products];
    },
    selectProduct: (productId: ProductId) => {
      storeState.selectedProductId = productId;
    },
    archiveProduct: (productId: ProductId) => {
      storeState.products = storeState.products.map((product) =>
        product.id === productId
          ? { ...product, status: "archived" }
          : product,
      );
    },
  },
} satisfies ProductStoreContract;
```

</div>

**逐行解释：** 先注解普通初始 state，再交给 `reactive`，避免用 `reactive<T>()` 强压嵌套 ref 解包模型；getter 明确返回派生值；action 明确参数；`satisfies` 检查完整 contract 但不改变对象运行时形态。

**执行过程：** `onMounted` → `loadAndSync(false)` → `toProductListResult` → data/store 更新 → computed filter → slot render；按钮事件再进入 owner action；invalid 按钮则进入失败 Result 并清空列表。

**类型、props、emits、slots、model、injection、refs、API data 与 runtime value 的变化：** Product 经 API guard 进入 ref/store，再经 readonly prop 与 slot 到 card；编辑/归档通过 typed emit 返回 owner；form/filter 通过 model 双向同步；injection demo 独立证明共享上下文；运行时对象不会携带 TypeScript 标签。

**为什么得到这个结果：** 每条数据流都有一个静态契约和一个明确 owner；外部值另有运行时检查，所以静态检查和运行时安全没有相互冒充。

**对比写法：** 若把所有状态、guard、表单和 UI 塞进一个组件，类型仍可能通过，但边界责任不可观察，也无法为后续 Pinia、Router 或 schema validator 平滑替换。

**常见错误为什么错：** `reactive<ProductStoreState>(...)` 可能忽略 Vue 对嵌套 ref 的解包类型差异；本实验使用已注解初始值再推断 reactive 返回类型。

**与真实项目的关系：** 这套边界可把本地 Promise 替换为 API adapter、把 local store contract 实现替换为 Pinia、把 local route contract 接入 Router，而展示组件的领域契约保持稳定。

**与当前学习主线的关系：** 本章只完成类型边界。第 6 章实现 Router，第 7 章实现 Pinia，第 9 章引入完整 schema 运行时验证；后续测试与 CI 会检查行为和 gate。

**最终记忆模型：** 静态契约约束调用；运行时 guard 检查外部值；owner 执行 mutation；Vue 响应式系统传播变化；tooling 独立验证整个 SFC 图。

## 10. API / 语法索引

| API / 语法 | 所属层 | 本章用途 | 运行时是否存在 |
| --- | --- | --- | --- |
| `<script setup lang="ts">` | SFC compiler / TypeScript | 开启 SFC script 与 template 的 TS 分析 | 属性本身不进入业务运行时 |
| `defineProps<T>()` | SFC compiler macro | 检查父到子 prop 契约 | 类型参数擦除，生成 props runtime code |
| `withDefaults()` | SFC compiler macro | 为 type-based props 提供默认值 | 默认值逻辑存在 |
| Reactive Props Destructure | SFC compiler transform | Vue 3.5+ 解构 props 并给默认值 | 编译为 props 访问 |
| `defineEmits<T>()` | SFC compiler macro | 检查事件名与 payload | 生成 emit 相关代码 |
| `defineModel<T>()` | SFC compiler macro | 建模 prop + update event 的 ref | model prop、event 与 ref 存在 |
| `defineSlots<T>()` | SFC compiler macro | 检查 slot 名与 slot props | 类型参数擦除 |
| `PropType<T>` | Vue runtime typing bridge | runtime declaration 中表达复杂静态类型 | constructor/check 配置存在，泛型擦除 |
| `InjectionKey<T>` | Vue + TypeScript | 同步 provider/consumer 类型 | Symbol key 存在，泛型擦除 |
| `defineExpose()` | SFC compiler macro | 声明父 ref 可访问的公共实例面 | 暴露的方法存在 |
| `useTemplateRef<T>()` | Vue runtime API | 表达 mount 前后可空 DOM/component ref | ref 存在 |
| `generic="T ..."` | SFC compiler / TypeScript | 泛型 SFC 参数 | 类型参数擦除 |
| `MaybeRefOrGetter<T>` | Vue utility type | composable 输入可接受 value/ref/getter | 类型擦除 |
| `toValue()` | Vue runtime API | 统一读取 value/ref/getter | 函数调用存在 |
| `unknown` | TypeScript type system | 标记未经验证的外部值 | 类型擦除 |
| type predicate | TypeScript + JavaScript | guard 返回结果驱动缩窄 | guard 条件实际运行 |
| `Result<T, E>` | TypeScript type system | 用判别联合表达成功/失败 | 对象和 `ok` 字段存在 |
| `satisfies` | TypeScript type system | 检查对象契约并保留推断 | 操作符擦除，对象保留 |
| `vue-tsc --noEmit` | tooling | 检查 TS 与 Vue SFC 图 | 不生成运行时资产 |
| Vite | tooling | 转换、服务、构建模块 | 产出浏览器可执行资产 |

## 11. 常见错误表

| # | 错误写法 | 错误类型或现象 | 违反的规则 | 为什么失败 | 正确写法 | 以后如何识别 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `const payload: Product = JSON.parse(raw)` | 静态安全假象、运行时崩溃 | `defineProps<T>()` 和 TS 注解都不是运行时验证 | 类型不会检查 JSON 实际字段 | `const payload: unknown = JSON.parse(raw)` 后执行 guard | 外部值一进入系统就直接获得领域类型 |
| 2 | `defineProps<{ item: Product }>({ item: Object })` | SFC 编译错误 | 一次调用不能混合 runtime 与 type-based declaration | 宏的两种声明模式互斥 | 二选一：`defineProps<Props>()` 或 runtime object | `defineProps` 同时出现泛型和参数对象 |
| 3 | `<script setup>` 中写 TS 类型 | parser/diagnostic 错误，template 检查不完整 | TS SFC 必须声明 `lang="ts"` | 编译器按普通 JavaScript 解析 script | `<script setup lang="ts">` | 文件有类型语法但 script 标签没有 lang |
| 4 | `withDefaults(defineProps<Props>(), { tags: [] })` | 多实例共享可变默认值风险 | 可变默认值应由 factory 创建 | 同一个数组可能被多个实例复用 | `{ tags: () => [] }` | default 中直接出现数组或对象 literal |
| 5 | 假定所有版本都支持 `const { count = 0 } = defineProps<Props>()` 的 reactive 行为 | 版本相关行为差异 | Reactive Props Destructure 是版本敏感编译能力 | 较早版本的解构会丢失同样的响应式语义 | 当前项目确认 Vue 3.5+；否则用 `withDefaults`/props 访问 | 示例依赖编译器版本却没有检查 package |
| 6 | `emit("archive", 42)` | `vue-tsc` payload 错误 | 事件名和 payload 必须匹配 `defineEmits` | `archive` 约定的是产品 id/对象，不是 number | 按 named tuple 传递正确 payload | emit 调用与声明分散，改名后出现红线 |
| 7 | child 使用 `defineModel({ default: 1 })`，parent 不绑定 | 父子值不同步 | model 默认值不会自动创建父状态 | 子初值存在，父 ref 仍为 `undefined` | parent 始终绑定，或使用 required contract | child 显示值但 parent 日志为空 |
| 8 | 认为 `defineSlots` 会拒绝运行时错误 slot 内容 | 静态安全假象 | slot 类型只参与编译期检查 | 运行时不会附加 schema validator | 对不可信 slot 数据另做运行时处理 | 浏览器仍可接收来自 JS consumer 的错误值 |
| 9 | `Object as PropType<Product>` 后认为嵌套字段已验证 | 深层错误 payload 通过 | `PropType<T>` 是静态 bridge，不是深层 validator | Vue runtime 只看到构造器级别信息 | 外部 payload 先走 guard/schema validator | props warning 只说 object，却未检查内部字段 |
| 10 | `provide("selection", context)` | provider/consumer 类型漂移 | 应使用 `InjectionKey<T>` | string key 不携带共享泛型契约，也易碰撞 | `provide(productSelectionKey, context)` | key 和 context type 分散在不同文件 |
| 11 | `inject(productSelectionKey).selectProduct(id)` | 可能读取 `undefined` | ancestor provider 不保证存在 | 组件可被移到 provider 外 | 保存返回值并先判断 | IDE 提示 object possibly undefined |
| 12 | `defineExpose({ everyInternalRef, mutateEverything })` | 封装泄漏 | 只暴露最小 imperative surface | parent 与 child 内部实现强耦合 | 只暴露 focus/reset/snapshot 等稳定方法 | parent 直接修改 child 私有 ref |
| 13 | `inputRef.value.focus()` | mount 前或卸载后崩溃 | template ref 具有 null 边界 | DOM 节点不是始终存在 | `inputRef.value?.focus()` | ref 来自模板却被声明为永久非空 |
| 14 | 对 generic SFC ref 直接写 `InstanceType<typeof GenericSelect>` | 类型无法准确实例化 | generic component instance 需要专门处理 | `InstanceType` 无法保存具体泛型实例参数 | 避免不必要 imperative ref；需要时使用官方建议的泛型组件 ref helper | component 自身有 `generic` 属性且 ref 类型报错 |
| 15 | composable 返回 `any` | 调用方检查链中断 | reusable boundary 必须保留输入/返回类型 | any 会把不安全访问传播到所有 consumer | 返回明确 object type 或让安全推断工作 | 调用方对任意属性都不报错 |
| 16 | `reactive<ProductStoreState>({ ... })` 并假定返回值完全等于 `ProductStoreState` | 嵌套 ref 解包类型被忽略 | 不建议用 generic 强制 reactive 返回类型 | Vue 的深层 unwrapping 会改变推断表面 | 先注解普通初值，再调用 `reactive(initialState)` | reactive 泛型与实际嵌套 ref 行为冲突 |
| 17 | `const response: ProductListResponse = await source()` | 未验证输入被信任 | API response 应从 `unknown` 开始 | TS 注解不会改变服务器值 | `const response: unknown = await source()` 后 guard | API adapter 没有 unknown 或 validator |
| 18 | `const product = payload as Product` | 错误被静默 | assertion 不是验证 | 不生成任何运行时检查 | `if (isProduct(payload)) { ... }` | assertion 紧邻 JSON、storage、message 或 fetch 边界 |
| 19 | `requiredPermissions` 被当成真正授权 | 安全漏洞 | client meta 只能控制界面/导航提示 | 用户可修改客户端代码和请求 | 服务端执行授权；前端类型只改善一致性 | 权限判断只存在浏览器 |
| 20 | 本章直接 `import { defineStore } from "pinia"` 或 `import { createRouter } from "vue-router"` | 依赖解析失败、越界 | 未安装依赖不能导入，且实现属于后续章节 | package graph 中不存在模块 | 当前只写纯 TS contract | package 未声明依赖，源码却 import |
| 21 | “`npm run dev` 没报错，所以 typecheck 通过” | 错误结论 | Vite dev 是 transpilation/serving，不是完整 SFC typecheck | dev server 为速度不执行完整检查 | 单独运行 `npm run typecheck` | 证据只有浏览器能打开 |
| 22 | 只看 IDE diagnostics | 环境相关漏检 | 可复现 gate 应使用 CLI | 编辑器设置、缓存和打开文件范围不同 | 本地/CI 运行 `vue-tsc --noEmit` | 没有可复制的检查命令和退出码 |

## 12. 最终小项目

### 12.1 项目目标

`vue-ts-contract-lab` 用本地 mock data 建立一条完整契约：产品领域类型、表单类型、筛选类型、API Result、typed composable、typed props/emits/slots/model、纯 TS store contract 和纯 TS route meta contract。它不发网络请求，也不提前实现 Router、Pinia 或完整 schema validation。

### 12.2 为什么它适合本章

项目覆盖路线图 Phase 5 的全部边界，并让静态检查与运行时验证同时可见：错误的组件调用由 `vue-tsc` 拦截，错误的本地 payload 由 guard 转成失败 Result。两条机制互补，谁也不替代谁。

### 12.3 文件结构与职责

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Chapter 05 project tree</span>
  </div>

```text
chapter-05-vue-typescript-boundaries/
├─ contracts/
│  ├─ productContract.ts
│  ├─ apiContract.ts
│  ├─ injectionKey.ts
│  ├─ storeContract.ts
│  └─ routeMetaContract.ts
├─ composables/
│  ├─ useTypedProducts.ts
│  └─ useProductForm.ts
└─ ts-contract-lab/
   ├─ VueTsContractLab.vue
   ├─ ProductCardTyped.vue
   ├─ ProductFormTyped.vue
   ├─ ProductFilterTyped.vue
   ├─ ProductTableTyped.vue
   ├─ ProductStoreContractDemo.vue
   └─ ProductApiContractDemo.vue
```

</div>

| 文件 | 单一职责 |
| --- | --- |
| `productContract.ts` | 领域对象、表单、筛选和 literal unions |
| `apiContract.ts` | API shape、unknown narrowing、Result |
| `injectionKey.ts` | provider/consumer 的 typed Symbol key |
| `storeContract.ts` | state/getter/action 的未来 Pinia 边界 |
| `routeMetaContract.ts` | meta 与 permission 的未来 Router 边界 |
| `useTypedProducts.ts` | 本地加载、Result 状态和过滤 |
| `useProductForm.ts` | key-safe 表单 mutation 与运行时校验 |
| `VueTsContractLab.vue` | 组合所有边界，不吞并子组件职责 |

### 12.4 核心 contract 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/contracts/productContract.ts</span>
  </div>

```ts
export type ProductId = string;

export type ProductStatus = "draft" | "active" | "archived";

export type ProductCategory = "course" | "tool";

export type Product = {
  id: ProductId;
  name: string;
  price: number;
  status: ProductStatus;
  category: ProductCategory;
  tags: ReadonlyArray<string>;
};

export type ProductForm = {
  name: string;
  price: string;
  status: ProductStatus;
  category: ProductCategory;
  tags: Array<string>;
};

export type ProductFilter = {
  search: string;
  status: ProductStatus | "all";
  category: ProductCategory | "all";
};

export type ProductCardProps = {
  product: Product;
  badges?: ReadonlyArray<string>;
};

export const emptyProductForm = {
  name: "",
  price: "",
  status: "draft",
  category: "course",
  tags: [],
} satisfies ProductForm;

export const emptyProductFilter = {
  search: "",
  status: "all",
  category: "all",
} satisfies ProductFilter;
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/contracts/apiContract.ts</span>
  </div>

```ts
import type { Product } from "./productContract";

export type ProductListResponse = {
  items: Array<Product>;
  total: number;
};

export type ProductDetailResponse = {
  item: Product;
};

export type ApiError = {
  code: string;
  message: string;
};

export type Result<Value, Failure> =
  | { ok: true; data: Value }
  | { ok: false; error: Failure };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isProductStatus(value: unknown): boolean {
  return (
    value === "draft" ||
    value === "active" ||
    value === "archived"
  );
}

function isProductCategory(value: unknown): boolean {
  return value === "course" || value === "tool";
}

export function isProduct(value: unknown): value is Product {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.price === "number" &&
    isProductStatus(value.status) &&
    isProductCategory(value.category) &&
    Array.isArray(value.tags) &&
    value.tags.every((tag) => typeof tag === "string")
  );
}

export function isProductListResponse(
  value: unknown,
): value is ProductListResponse {
  return (
    isRecord(value) &&
    Array.isArray(value.items) &&
    value.items.every(isProduct) &&
    typeof value.total === "number"
  );
}

export function toProductListResult(
  value: unknown,
): Result<ProductListResponse, ApiError> {
  if (isProductListResponse(value)) {
    return {
      ok: true,
      data: value,
    };
  }

  return {
    ok: false,
    error: {
      code: "INVALID_PRODUCT_LIST",
      message: "The product list payload failed the local type guard.",
    },
  };
}
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/contracts/injectionKey.ts</span>
  </div>

```ts
import type { InjectionKey, Ref } from "vue";
import type { ProductId } from "./productContract";

export type ProductSelectionContext = {
  selectedProductId: Readonly<Ref<ProductId | null>>;
  selectProduct: (productId: ProductId) => void;
};

export const productSelectionKey: InjectionKey<ProductSelectionContext> =
  Symbol("product-selection");
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/contracts/storeContract.ts</span>
  </div>

```ts
import type { Product, ProductId } from "./productContract";

export type ProductStoreState = {
  products: Array<Product>;
  selectedProductId: ProductId | null;
  loading: boolean;
};

export type ProductStoreGetters = {
  activeProducts: () => ReadonlyArray<Product>;
  selectedProduct: () => Product | null;
};

export type ProductStoreActions = {
  setProducts: (products: ReadonlyArray<Product>) => void;
  selectProduct: (productId: ProductId) => void;
  archiveProduct: (productId: ProductId) => void;
};

export type ProductStoreContract = {
  state: ProductStoreState;
  getters: ProductStoreGetters;
  actions: ProductStoreActions;
};
```

</div>

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/contracts/routeMetaContract.ts</span>
  </div>

```ts
export type RoutePermission =
  | "products:read"
  | "products:edit"
  | "products:archive";

export type RouteMetaContract = {
  title: string;
  requiresAuth: boolean;
  requiredPermissions: ReadonlyArray<RoutePermission>;
};

export type RouteRecordContract = {
  path: string;
  name: string;
  meta: RouteMetaContract;
};

export const productRouteContract = {
  path: "/products",
  name: "products",
  meta: {
    title: "Products",
    requiresAuth: true,
    requiredPermissions: ["products:read"],
  },
} satisfies RouteRecordContract;
```

</div>

### 12.5 关键组件契约

第 7.1 节已给出 `ProductCardTyped.vue`、`ProductFormTyped.vue` 与 `ProductTableTyped.vue` 的完整可运行代码。三者在最终项目中的连接如下：

| 组件 | 输入边界 | 输出边界 | 运行时保护 |
| --- | --- | --- | --- |
| `ProductCardTyped.vue` | `product: Product` | `edit` 与 `archive` typed emits | 禁止归档已归档产品的 UI 操作 |
| `ProductFormTyped.vue` | `defineModel<ProductForm>` | `submit` 与 `reset` | `instanceof HTMLInputElement/HTMLSelectElement` 与 literal 检查 |
| `ProductTableTyped.vue` | `ReadonlyArray<Product>` | `row` 与 `actions` typed slots | stable `product.id` key；空集合 fallback |

### 12.6 最终组合组件完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/vue/chapter-05-vue-typescript-boundaries/ts-contract-lab/VueTsContractLab.vue</span>
  </div>

```vue
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { emptyProductForm } from "../contracts/productContract";
import type {
  Product,
  ProductFilter,
  ProductForm,
  ProductId,
} from "../contracts/productContract";
import { productRouteContract } from "../contracts/routeMetaContract";
import type {
  ProductStoreContract,
  ProductStoreState,
} from "../contracts/storeContract";
import { useProductForm } from "../composables/useProductForm";
import { useTypedProducts } from "../composables/useTypedProducts";
import ProductApiContractDemo from "./ProductApiContractDemo.vue";
import ProductCardTyped from "./ProductCardTyped.vue";
import ProductFilterTyped from "./ProductFilterTyped.vue";
import ProductFormTyped from "./ProductFormTyped.vue";
import ProductStoreContractDemo from "./ProductStoreContractDemo.vue";
import ProductTableTyped from "./ProductTableTyped.vue";

const {
  data,
  error,
  status,
  filter,
  filteredProducts,
  loadProducts,
  setFilter,
} = useTypedProducts();

const filterModel = computed<ProductFilter>({
  get: () => filter.value,
  set: setFilter,
});

const {
  values: productForm,
  errors: formErrors,
  validate: validateForm,
  reset: resetForm,
} = useProductForm(emptyProductForm);

const initialStoreState: ProductStoreState = {
  products: [],
  selectedProductId: null,
  loading: false,
};
const storeState = reactive(initialStoreState);

const store = {
  state: storeState,
  getters: {
    activeProducts: () =>
      storeState.products.filter(
        (product) => product.status === "active",
      ),
    selectedProduct: () =>
      storeState.products.find(
        (product) => product.id === storeState.selectedProductId,
      ) ?? null,
  },
  actions: {
    setProducts: (products: ReadonlyArray<Product>) => {
      storeState.products = [...products];
    },
    selectProduct: (productId: ProductId) => {
      storeState.selectedProductId = productId;
    },
    archiveProduct: (productId: ProductId) => {
      storeState.products = storeState.products.map((product) =>
        product.id === productId
          ? { ...product, status: "archived" }
          : product,
      );
    },
  },
} satisfies ProductStoreContract;

const eventLog = ref("No typed lab action yet.");

watch(
  data,
  (products) => {
    store.actions.setProducts(products);
  },
  { immediate: true },
);

async function loadAndSync(simulateInvalid: boolean): Promise<void> {
  storeState.loading = true;
  const result = await loadProducts(simulateInvalid);
  storeState.loading = false;

  if (result.ok) {
    store.actions.setProducts(result.data.items);
    eventLog.value = `Loaded ${result.data.total} typed products.`;
  } else {
    store.actions.setProducts([]);
    eventLog.value = result.error.message;
  }
}

function handleEdit(productId: ProductId): void {
  store.actions.selectProduct(productId);
  eventLog.value = `Edit intent: ${productId}`;
}

function handleArchive(payload: {
  productId: ProductId;
  previousStatus: Product["status"];
}): void {
  store.actions.archiveProduct(payload.productId);
  eventLog.value =
    `Archive intent: ${payload.productId} from ${payload.previousStatus}`;
}

function submitProduct(form: ProductForm): void {
  if (!validateForm()) {
    eventLog.value = formErrors.value.name ??
      formErrors.value.price ??
      "Form validation failed.";
    return;
  }

  const product: Product = {
    id: `local-${storeState.products.length + 1}`,
    name: form.name.trim(),
    price: Number(form.price),
    status: form.status,
    category: form.category,
    tags: [...form.tags],
  };

  store.actions.setProducts([...storeState.products, product]);
  eventLog.value = `Submitted ${product.name}.`;
  resetForm();
}

onMounted(() => {
  void loadAndSync(false);
});
</script>

<template>
  <section class="contract-lab" aria-labelledby="contract-lab-title">
    <header>
      <p class="topic">Final integration</p>
      <h3 id="contract-lab-title">Vue TS Contract Lab</h3>
      <p>
        One Product contract crosses props, emits, models, slots,
        composables, an unknown API boundary, and a future store boundary.
      </p>
    </header>

    <div class="load-actions">
      <button type="button" @click="loadAndSync(false)">
        Load valid local payload
      </button>
      <button type="button" @click="loadAndSync(true)">
        Load invalid local payload
      </button>
      <span>Status: {{ status }}</span>
    </div>

    <p v-if="error" class="error">
      {{ error.code }}: {{ error.message }}
    </p>

    <ProductFilterTyped v-model="filterModel" />

    <ProductTableTyped :products="filteredProducts">
      <template #row="{ product }">
        <ProductCardTyped
          :product="product"
          @edit="handleEdit"
          @archive="handleArchive"
        />
      </template>
      <template #actions="{ productId }">
        <button type="button" @click="store.actions.selectProduct(productId)">
          Select in store contract
        </button>
      </template>
    </ProductTableTyped>

    <section class="panel">
      <h4>Typed ProductForm model</h4>
      <ProductFormTyped
        v-model="productForm"
        @submit="submitProduct"
        @reset="resetForm"
      />
      <p v-if="formErrors.name" class="error">{{ formErrors.name }}</p>
      <p v-if="formErrors.price" class="error">{{ formErrors.price }}</p>
    </section>

    <div class="contract-grid">
      <ProductStoreContractDemo :store="store" />
      <ProductApiContractDemo />
    </div>

    <section class="panel">
      <h4>Future route meta contract</h4>
      <p>
        {{ productRouteContract.path }} ·
        auth: {{ productRouteContract.meta.requiresAuth }} ·
        permissions:
        {{ productRouteContract.meta.requiredPermissions.join(", ") }}
      </p>
    </section>

    <p class="event-log">{{ eventLog }}</p>
  </section>
</template>

<style scoped>
.contract-lab {
  display: grid;
  gap: 1rem;
  padding: 1.4rem;
  border: 2px solid #6e8ea5;
  border-radius: 1rem;
  background: #f4f8fb;
}

.topic {
  margin: 0;
  color: #386780;
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

.load-actions,
.contract-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-items: center;
}

.contract-grid > * {
  flex: 1 1 280px;
}

.panel {
  padding: 0.9rem;
  border: 1px solid #cbd8e1;
  border-radius: 0.65rem;
  background: #ffffff;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #7293a8;
  border-radius: 0.4rem;
  background: #ffffff;
  color: #345c73;
  cursor: pointer;
}

.error {
  color: #b42318;
}

.event-log {
  margin: 0;
  padding: 0.7rem;
  border-radius: 0.45rem;
  background: #eaf1f6;
}
</style>
```

</div>

### 12.7 运行方式、预期行为与边界地图

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run dev
npm run typecheck
npm run build
```

</div>

预期行为：页面加载 valid local payload 后显示产品；筛选器更新 computed 结果；card 发出 edit/archive intent；form 在提交前校验并把价格字符串转换为 number；invalid payload 按钮显示 `INVALID_PRODUCT_LIST`；store contract 和 route meta contract 都可见，但没有框架级全局状态或导航行为。

| 地图 | 起点 | 终点 | 静态检查 | 运行时责任 |
| --- | --- | --- | --- | --- |
| type boundary | unknown payload | `Result<ProductListResponse, ApiError>` | predicate narrowing | guard 逐字段检查 |
| props | owner `Product` | card/table | `defineProps` | Vue 传普通值 |
| emits | child intent | owner handler | named tuple | Vue 派发事件 |
| slots | table product | parent slot template | `defineSlots` | parent 执行 render function |
| model | parent ref/computed | form/filter | `defineModel` | prop + update event |
| injection | provider context | consumer | `InjectionKey<T>` | Symbol lookup，可能 undefined |
| composable input/return | initial filter/form | refs、computed、functions | explicit domain contracts | Vue reactivity 执行 |
| API unknown-to-result | local raw object | success/failure union | control-flow narrowing | guard 与 fallback |
| store contract | local object | state/getters/actions consumer | `satisfies` | 普通 reactive object |
| route meta contract | route record object | future route consumer | local interface | 当前只读对象，不导航 |
| tooling | TS/SFC source | diagnostics/assets | `vue-tsc` | Vite 转换与构建 |

### 12.8 常见错误与扩展任务

常见错误优先回看第 11 节：尤其是把 API 直接注解成响应类型、把 `PropType` 当深层验证、漏掉 `inject`/template ref 的 undefined/null、以及用 Vite dev 成功冒充 typecheck 成功。

建议按后续章节扩展，不在本章提前实现：

1. 第 6 章安装并实现 Vue Router，把 local meta contract 迁移到 `RouteMeta` augmentation 和 route guards。
2. 第 7 章安装并实现 Pinia，把 local store contract 迁移到真实 store，同时保持组件 props/emits 不变。
3. 第 9 章引入完整 schema validator，替换本章教学用的浅层 hand-written guard，并处理错误路径与版本迁移。
4. 后续测试章节为 valid/invalid Result、表单转换和组件事件补行为测试。
5. 生产 CI 同时运行 typecheck、tests 和 build；不要把任一阶段当作其余阶段的替代品。

## 13. 额外速查表

### 13.1 SFC 宏与组件边界

| 项目 | 最短记忆 | 关键限制 |
| --- | --- | --- |
| `lang="ts"` | 让 SFC script 按 TS 分析 | 不会产生运行时验证 |
| `script setup` | 每个组件实例执行 setup scope | 宏只能在其编译上下文使用 |
| `defineProps` runtime declaration | Vue 运行时拿到构造器/options | complex nested shape 不会深验 |
| `defineProps` type-based declaration | 从类型推导静态与有限 runtime 信息 | 泛型擦除；转换基于 AST，有边界 |
| `withDefaults` | type-based props 的默认值与 optional flag 调整 | 可变默认值用 factory |
| Reactive Props Destructure | Vue 3.5+ reactive 解构默认值 | 版本敏感 |
| `defineEmits` | 限制事件名与 payload | 不能验证外部 runtime payload |
| named tuple emits | `save: [id: string]` | tuple 顺序和数量属于契约 |
| `defineModel` | typed model ref | 非 required 时通常包含 undefined |
| `modelValue` | 默认 model prop | 运行时普通 prop |
| `update:modelValue` | 默认 model update event | parent 必须绑定才能同步 owner |
| `defineSlots` | 检查 slot 名和 slot props | 无 runtime 参数；不做 runtime validation |
| `PropType` | runtime prop declaration 的复杂静态类型 bridge | 不是深层 schema |
| `InjectionKey` | typed Symbol provider/consumer key | 泛型擦除，Symbol 保留 |
| inject undefined | ancestor provider 不保证存在 | guard 或提供明确 fallback |
| `defineExpose` | 声明 child public instance surface | 只暴露最小 API |

### 13.2 refs、泛型与 composable

| 项目 | 最短记忆 | 关键限制 |
| --- | --- | --- |
| template ref | DOM/component 只在 mount 后可用 | `v-if` 卸载后可再次为 null |
| component ref | 访问 exposed public instance | `<script setup>` 默认 closed |
| `InstanceType` | 非泛型组件 constructor 的 instance type | generic SFC ref 不直接适用 |
| `ComponentPublicInstance` | 只关心通用 public properties 时使用 | 不等于 child 的全部内部 state |
| generic component | `generic` 属性连接 props/model 的类型参数 | 运行时没有泛型参数 |
| typed composable | 输入、状态、派生值、动作都有契约 | runtime input 仍需缩窄/校验 |
| `Ref<T>` | 可写响应式容器 | `.value` 是运行时 API |
| `ComputedRef<T>` | readonly 派生容器 | getter 依赖变化才重算 |
| `MaybeRef<T>` | value 或 ref | 不包含 getter |
| `MaybeRefOrGetter<T>` | value、ref 或 getter | 用 `toValue()` 统一读取 |

### 13.3 外部数据、工具与后续框架边界

| 项目 | 最短记忆 | 关键限制 |
| --- | --- | --- |
| `unknown` | 值存在，但使用前必须证明形状 | 比 assertion 更诚实 |
| type guard | runtime boolean + TS predicate | 只验证写进 guard 的规则 |
| Result union | `ok` 判别成功/失败 | runtime 需要真实 `ok` 字段 |
| `satisfies` | 检查对象契约并保留精确推断 | 不转换 runtime value |
| `import type` | 明确 type-only dependency | 编译后移除 |
| type erasure | type/interface/generic 不进入 JS | 浏览器无法读取 TS 类型 |
| runtime validation | 对实际值执行检查 | 与 static checking 分开 |
| `vue-tsc` | 检查 TS + Vue SFC graph | `--noEmit` 不构建资产 |
| Vite transpilation-only | dev 优先快速转换与服务 | dev 成功不等于 typecheck 成功 |
| typed store contract | 先定义 state/getter/action surface | 当前不是 Pinia implementation |
| typed route meta | 先定义 title/auth/permissions shape | 当前不是 Router，也不是安全授权 |

### 13.4 最小模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span><span class="macos-code-dot macos-code-dot-yellow"></span><span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: typed-boundary-component.vue</span>
  </div>

```vue
<script setup lang="ts">
type Item = {
  id: string;
  label: string;
};

const props = defineProps<{
  item: Item;
}>();

const emit = defineEmits<{
  select: [itemId: string];
}>();

function selectItem(): void {
  emit("select", props.item.id);
}
</script>

<template>
  <button type="button" @click="selectItem">
    {{ item.label }}
  </button>
</template>
```

</div>

## 14. 最终文件清单

| 实际路径 | 作用 | 状态 |
| --- | --- | --- |
| `docs/vue/chapter-05-vue-typescript-boundaries/vue-chapter-05-learning-guide.md` | 本章完整中文学习指南 | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/VueTypeScriptChapterApp.vue` | Chapter 05 组合入口 | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/contracts/productContract.ts` | 产品领域/表单/筛选契约 | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/contracts/apiContract.ts` | API、guard 与 Result | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/contracts/storeContract.ts` | 纯 TS store contract | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/contracts/routeMetaContract.ts` | 纯 TS route meta contract | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/contracts/injectionKey.ts` | typed injection key | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/composables/useTypedProducts.ts` | typed product loading/filtering | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/composables/useProductForm.ts` | key-safe typed form state | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/components/TypedProps.vue` | type-based props | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/components/TypedEmits.vue` | named tuple emits | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/components/PropsWithDefaults.vue` | withDefaults | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/components/TypedVModel.vue` | typed default/named model | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/components/TypedSlots.vue` | typed slots | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/components/GenericSelect.vue` | generic SFC | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/components/InjectionProvider.vue` | typed context owner | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/components/InjectionConsumer.vue` | safe optional inject | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/components/ExposedProductEditor.vue` | minimal exposed child API | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/components/DefineExposeDemo.vue` | typed component ref consumer | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/components/TypedTemplateRefDemo.vue` | nullable DOM template ref | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/components/TypeRuntimeBoundaryDemo.vue` | unknown/guard runtime proof | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/components/VueTscBoundaryDemo.vue` | tooling boundary UI | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/ts-contract-lab/VueTsContractLab.vue` | 最终组合实验 | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/ts-contract-lab/ProductCardTyped.vue` | typed product props/emits | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/ts-contract-lab/ProductFormTyped.vue` | typed ProductForm model | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/ts-contract-lab/ProductFilterTyped.vue` | typed ProductFilter model | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/ts-contract-lab/ProductTableTyped.vue` | readonly list/typed slots | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/ts-contract-lab/ProductStoreContractDemo.vue` | local store contract consumer | 新建 |
| `src/learning/vue/chapter-05-vue-typescript-boundaries/ts-contract-lab/ProductApiContractDemo.vue` | unknown-to-Result demo | 新建 |
| `src/learning/vue/chapter-01-application-boundary/App.vue` | 保留前四章并挂载 Chapter 05 | 更新 |
| `README.md` | 增加 Chapter 05 状态与入口 | 更新 |

## 15. 如何转换成个人笔记

建议每个 API 只保留五项：它解决的问题、静态层做什么、运行时剩什么、最小正确例子、最容易混淆的反例。然后用自己的话画出一条 `unknown → guard → Result → ref → prop/slot → event → owner mutation` 数据流，并把 `vue-tsc` 与 Vite 放在两条独立工具线上。

不要只抄 API 签名。若无法说明“这个类型何时被擦除”“浏览器实际收到什么”“外部值由谁验证”，就还没有掌握边界。

## 16. 必须能回答的问题

1. `defineProps<Product>()` 的类型参数在 runtime 还存在吗？不存在；编译器只根据可分析语法生成有限 runtime 信息。
2. `withDefaults` 解决什么？为 type-based props 声明默认值、校验默认值类型，并移除相应返回 props 的 optional flag。
3. `defineEmits` 如何约束 payload？事件 literal 对应 named tuple/call signature，调用和 parent listener 在检查期匹配。
4. `InjectionKey<T>` 为什么比 string key 安全？Symbol 避免碰撞，泛型让 provide/inject 共享 context type；但 inject 仍可能 undefined。
5. type checking 与 runtime validation 有何不同？前者分析源码并在 emit 前报错；后者对浏览器实际收到的值执行条件检查。
6. 为什么 Vite dev 不等于 `vue-tsc`？Vite dev 以快速转换和服务模块为目标，不运行完整 Vue SFC 类型图检查。
7. `defineModel<T>()` 何时包含 undefined？未声明 required/default 能保证值时；默认值还可能在 parent 未绑定时造成父子不同步。
8. `defineSlots` 能验证什么？检查 slot 名和 slot props 的静态调用关系；不能验证 runtime content。
9. `PropType<T>` 为什么不是 schema validator？泛型擦除，Vue runtime 通常只拿到构造器级别配置。
10. 为什么 API response 必须从 `unknown` 开始？服务器、storage、JSON 或消息值不会因本地注解而改变，必须先证明形状。
11. 本章 store/route 文件为什么只是 contract？当前依赖图没有 Pinia/Router，真实实现分别属于第 7 章和第 6 章。
12. `vue-tsc` 通过后还需要 guard 吗？需要；静态检查不能检查未来到达的外部 runtime value。

## 17. 最终记忆模型

1. TypeScript 描述并检查源码关系，类型随后擦除。
2. SFC compiler 识别宏并生成 Vue 可执行代码，但 type-to-runtime 推导受 AST 能力限制。
3. Vue runtime 接收 props、event payload、slot functions、model refs、injection values 与普通对象。
4. 浏览器 API 和外部数据只提供运行时值；`unknown`、guard、fallback 和业务校验守住入口。
5. `vue-tsc` 检查完整 TS/SFC 契约；Vite 转换、服务和构建；两者职责不同。
6. 领域类型集中共享，表单/API/filter 等不同阶段使用不同边界类型。
7. Router、Pinia 与完整 schema validation 只消费本章准备好的契约，不在本章提前实现。

## 18. 官方文档阅读清单

以下页面已按本章使用范围核对：

1. [Vue：Using Vue with TypeScript](https://vuejs.org/guide/typescript/overview.html)
2. [Vue：TypeScript with Composition API](https://vuejs.org/guide/typescript/composition-api.html)
3. [Vue：`<script setup>`](https://vuejs.org/api/sfc-script-setup.html)
4. [Vue：Component `v-model`](https://vuejs.org/guide/components/v-model.html)
5. [Vue：Provide / Inject](https://vuejs.org/guide/components/provide-inject.html)
6. [Vue：Utility Types](https://vuejs.org/api/utility-types.html)
7. [Vue Router：Route Meta Fields](https://router.vuejs.org/guide/advanced/meta.html)
8. [Pinia：State](https://pinia.vuejs.org/core-concepts/state.html)
9. [Pinia：Getters](https://pinia.vuejs.org/core-concepts/getters.html)
10. [Pinia：Actions](https://pinia.vuejs.org/core-concepts/actions.html)

阅读时始终追问：这是 TypeScript type、SFC compiler behavior、Vue runtime API、browser API 还是 tooling behavior？同一个名字跨层出现时，不要假定它们承担相同职责。
