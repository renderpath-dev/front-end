# Vue {{topic}} 速查表

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

- [0. 使用范围](#0-使用范围)
- [1. 核心结论](#1-核心结论)
- [2. 概念与层级](#2-概念与层级)
- [3. API 与语法](#3-api-与语法)
- [4. 相似概念比较](#4-相似概念比较)
- [5. 常见错误](#5-常见错误)
- [6. 最小代码模板](#6-最小代码模板)
- [7. 项目决策](#7-项目决策)
- [8. 官方来源](#8-官方来源)

## 0. 使用范围

说明主题、适用 Vue 版本、读者前置知识和不覆盖内容。首次学习机制时转到对应完整指南。

## 1. 核心结论

用三到五条可操作结论概括最重要的选择规则和错误边界。

## 2. 概念与层级

| Concept | Layer | Source / Owner | Read Behavior | Update Trigger | Result |
| --- | --- | --- | --- | --- | --- |
| `ref` | Reactivity | ref object | `.value` in script; unwrapped in template | assign `.value` | dependent effects update |
| `reactive` | Reactivity | Proxy object | property access | mutate tracked property | dependent effects update |
| `<script setup>` | SFC compiler | component setup scope | top-level binding in template | component instance creation | compiled setup/render integration |
| `vue-tsc` | Tooling | project and SFC type graph | static analysis | explicit command or watch | diagnostics only |

## 3. API 与语法

| API / Syntax | Input | Return / Contract | Runtime Behavior | TypeScript Behavior | Common Use |
| --- | --- | --- | --- | --- | --- |
| `ref(value)` | any value | `Ref<T>` | tracks `.value` reads and writes | infers `T` | replaceable reactive value |
| `computed(getter)` | reactive getter | `ComputedRef<T>` | caches derived value by dependencies | infers getter return | pure derived state |
| `watch(source, callback)` | explicit source | stop handle | runs side-effect callback after source change | checks source/callback types | synchronization |
| `v-model` | value/update contract | bound value | coordinates prop and update event | checks component contract with SFC tooling | form/component binding |

## 4. 相似概念比较

使用 `comparison-table-template.md`，保留 owner、dependency、trigger、cost 和 decision rule。

## 5. 常见错误

使用 `error-table-template.md`。每行必须说明 wrong code、error type、violated rule、correction 和 recognition method。

## 6. 最小代码模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: script setup reactive state</span>
  </div>

```vue
<script setup lang="ts">
import { computed, ref } from "vue";

const firstName = ref("Ada");
const lastName = ref("Lovelace");
const fullName = computed(() => `${firstName.value} ${lastName.value}`);
</script>

<template>
  <p>{{ fullName }}</p>
</template>
```
</div>

适用：从多个 reactive sources 派生纯值。不适用：需要请求、日志或 storage synchronization 的 side effect。

## 7. 项目决策

| Situation | Prefer | Reason | Avoid |
| --- | --- | --- | --- |
| Primitive or replaceable value | `ref` | explicit container and replacement | unnecessary object wrapper |
| Pure derived value | `computed` | cached dependency-based result | side effects in getter |
| External synchronization | `watch` | explicit source and callback | deriving render-only state |
| Frequent visibility toggle | `v-show` | keeps element mounted | large rarely shown subtree |
| Infrequent conditional subtree | `v-if` | creates only when needed | rapid repeated toggles |

## 8. 官方来源

只列实际使用的页面：

- [Vue official docs](https://vuejs.org/)
- {{topic-specific-official-url}}
