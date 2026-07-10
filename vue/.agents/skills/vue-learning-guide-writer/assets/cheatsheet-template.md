## 13. 额外速查表

本节用于复习本章已解释的机制，不替代首次学习。

### 一句话结论

{{one-sentence-conclusion}}

### 概念与边界

| Concept | Layer | Syntax Pattern | Runtime Behavior | TypeScript Behavior | Common Mistake | Project Usage |
| --- | --- | --- | --- | --- | --- | --- |
| {{concept}} | {{layer}} | `{{syntax-pattern}}` | {{runtime-behavior}} | {{typescript-behavior}} | {{common-mistake}} | {{project-usage}} |

### 相似概念对比

| Question | Option A | Option B | Decision Rule |
| --- | --- | --- | --- |
| {{comparison-question}} | {{option-a}} | {{option-b}} | {{decision-rule}} |

### 常见错误

| Wrong Form | Error Type | Violated Rule | Correction | Recognition Method |
| --- | --- | --- | --- | --- |
| `{{wrong-form}}` | {{error-type}} | {{violated-rule}} | `{{correction}}` | {{recognition}} |

### 最小代码模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: minimal reactive state</span>
  </div>

```vue
<script setup lang="ts">
import { ref } from "vue";

const message = ref("Ready");
</script>

<template>
  <p>{{ message }}</p>
</template>
```
</div>

复制前确认当前项目的 Vue、TypeScript 与 tooling 配置，并按本章真实 contract 调整名称和类型。
