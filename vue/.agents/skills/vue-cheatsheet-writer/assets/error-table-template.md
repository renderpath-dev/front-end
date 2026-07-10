# Vue 常见错误表模板

| Wrong Code | Error Type | Violated Rule | Why It Fails | Correction | Recognition Method |
| --- | --- | --- | --- | --- | --- |
| `<li v-for="item in items">` | runtime warning / identity bug | `v-for` list items need stable sibling identity | reorder may reuse the wrong element or component instance | `<li v-for="item in items" :key="item.id">` | warning mentions key, or local state moves after reorder |
| `props.title = "Changed"` | compile diagnostic / runtime warning | props are readonly child inputs | child attempts to mutate parent-owned input | emit an event with the requested value | assignment target comes from `defineProps` |
| `const total = computed(() => { save(); return count.value; })` | logic error | computed getter should derive a value without side effects | getter evaluation becomes coupled to external mutation | move `save` into `watch` or an event handler | getter performs I/O, storage, logging, or mutation |
| `<input :value="modelValue">` without update event | stale UI | custom `v-model` requires value/prop plus update event contract | parent never receives the edited value | emit `update:modelValue` from the input handler | parent binding never changes after child input |
| `<li v-for="(item, index) in items" :key="index">` in reorderable list | identity bug | index represents position, not domain identity | inserting or sorting changes which item owns an existing instance | use `:key="item.id"` | component-local state follows a row position |
| `const { count } = reactiveState` followed by `count += 1` | stale value / assignment error | plain destructuring disconnects property access from the Proxy | local binding is not a tracked property access | use `reactiveState.count += 1` or `toRefs` | destructured primitive stops reflecting source changes |
| treating `npm run dev` as full SFC type checking | tooling error | Vite dev server is transpilation-oriented and not a full type checker | invalid SFC types may not stop the dev server | run `vue-tsc --noEmit` through the project typecheck script | browser works while IDE or CI reports type errors |

添加错误时必须保留完整因果链，不得只写“不要这样做”。
