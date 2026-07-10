# Vue 概念比较表模板

## `ref` 与 `reactive`

| Dimension | `ref` | `reactive` | Decision Rule |
| --- | --- | --- | --- |
| Core shape | ref object with `.value` | Proxy of an object | 需要整体替换或 primitive 时优先 `ref` |
| Script read/write | `count.value` | `state.count` | 根据 owner 和更新方式选择 |
| Template read | top-level ref is unwrapped | property access | 不把 template unwrapping 误认为 script behavior |
| Replacement | assign `.value` | mutate properties; replacing binding disconnects existing consumers | 需要替换整个值时用 `ref` 更明确 |
| Destructuring | keep ref identity | plain destructuring can lose reactive access | 需要解构时使用 `toRefs` 或保留 object access |
| TypeScript | `Ref<T>` | inferred unwrapped Proxy shape | 不推荐用 generic 强行描述 `reactive()` 返回类型 |

## `computed` 与 `watch`

| Dimension | `computed` | `watch` | Decision Rule |
| --- | --- | --- | --- |
| Purpose | derive a value | run a side effect | 能表达为纯派生值时用 `computed` |
| Result | computed ref | stop handle | 需要被 template/logic 读取时用 `computed` |
| Dependency | read inside getter | explicit source | 需要明确同步某个 source 时用 `watch` |
| Execution | lazy/cached by dependencies | callback after observed change according to flush behavior | 需要 I/O、logging 或 persistence 时用 `watch` |
| Avoid | mutation or async side effects in getter | using callback to maintain redundant derived state | 不用 `watch` 手工复制可计算状态 |

## props 与 emits

| Dimension | props | emits | Decision Rule |
| --- | --- | --- | --- |
| Direction | parent to child | child to parent listener | 输入用 props，事件通知用 emits |
| Owner | parent owns value | child creates event payload | child 不直接修改 parent-owned prop |
| Contract | prop name and value type | event name and payload type | 使用 `defineProps` / `defineEmits` 表达边界 |
| Runtime | child reads passed value | parent handler receives payload | 类型声明不等于运行时数据验证 |

## `v-if` 与 `v-show`

| Dimension | `v-if` | `v-show` | Decision Rule |
| --- | --- | --- | --- |
| Runtime behavior | mounts and unmounts subtree | toggles CSS display | 低频切换用 `v-if`，高频切换用 `v-show` |
| Initial cost | skipped when false | always renders initially | 大型且很少显示的区域优先 `v-if` |
| Lifecycle | hooks run on mount/unmount | instance remains mounted | 需要保留 local state 时考虑 `v-show` |
| Limitation | works with `<template>` groups | requires an actual element | 根据 DOM structure 选择 |

## `v-for` key 选择

| Key Choice | Identity Quality | Safe When | Risk |
| --- | --- | --- | --- |
| `item.id` | stable domain identity | id is unique among siblings | lowest risk |
| compound stable key | stable derived identity | components form a documented unique identity | collision if composition is incomplete |
| array index | position identity | static append-only display with no local state | wrong reuse after insert, delete, or reorder |

结论：`key` 表达 sibling identity，不是为了消除 warning 随便填写的字段。
