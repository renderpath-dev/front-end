# Vue 最小代码模板

## SFC `<script setup>`、`ref`、`computed` 与 list key

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: reactive list summary</span>
  </div>

```vue
<script setup lang="ts">
import { computed, ref } from "vue";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const tasks = ref<Task[]>([
  { id: "learn-ref", title: "Learn ref", completed: true },
  { id: "learn-computed", title: "Learn computed", completed: false },
]);

const completedCount = computed(
  () => tasks.value.filter((task) => task.completed).length,
);
</script>

<template>
  <p>Completed: {{ completedCount }}</p>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      {{ task.title }}
    </li>
  </ul>
</template>
```
</div>

适用：SFC 中的 local reactive collection 和纯派生统计。不适用：需要把任务状态共享给整个应用时，应先判断 state owner，再决定是否需要 Pinia。

## props 与 emits

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: typed child contract</span>
  </div>

```vue
<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  select: [title: string];
}>();

function selectTitle(): void {
  emit("select", props.title);
}
</script>

<template>
  <button type="button" @click="selectTitle">
    {{ title }}
  </button>
</template>
```
</div>

适用：parent owns data，child 通过 event 报告用户操作。不适用：child 不应通过修改 props 取得“同步”效果。

## Custom component `v-model`

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: model value contract</span>
  </div>

```vue
<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

function updateValue(event: Event): void {
  const input = event.currentTarget as HTMLInputElement;
  emit("update:modelValue", input.value);
}
</script>

<template>
  <input :value="modelValue" @input="updateValue" />
</template>
```
</div>

适用：需要明确展示 custom component 的 prop/event contract。不适用：不要把 `v-model` 理解为 child 可以直接修改 parent variable。

## `v-if` 与 `v-show`

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: conditional visibility</span>
  </div>

```vue
<template>
  <HeavyReport v-if="shouldCreateReport" />
  <QuickPanel v-show="isPanelVisible" />
</template>
```
</div>

适用：用 mount cost 和 toggle frequency 做选择。不适用：不要只根据指令名称猜测行为。

## `vue-tsc` 类型检查

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npx vue-tsc --noEmit
```
</div>

该命令只有在项目安装并配置 `vue-tsc` 后才可用。当前基础设施任务不得执行或声称它已通过。
