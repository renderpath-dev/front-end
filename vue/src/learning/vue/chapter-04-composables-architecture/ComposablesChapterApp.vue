<script setup lang="ts">
import AsyncStateComposableDemo from "./demos/AsyncStateComposableDemo.vue";
import ClickOutsideComposableDemo from "./demos/ClickOutsideComposableDemo.vue";
import ComposablesKitDemo from "./demos/ComposablesKitDemo.vue";
import CounterComposableDemo from "./demos/CounterComposableDemo.vue";
import DebouncedSearchComposableDemo from "./demos/DebouncedSearchComposableDemo.vue";
import EffectScopeDemo from "./demos/EffectScopeDemo.vue";
import LocalStorageComposableDemo from "./demos/LocalStorageComposableDemo.vue";
import PaginationComposableDemo from "./demos/PaginationComposableDemo.vue";
import SharedVsPerInstanceDemo from "./demos/SharedVsPerInstanceDemo.vue";
import ToggleComposableDemo from "./demos/ToggleComposableDemo.vue";
</script>

<template>
  <section class="chapter" aria-labelledby="chapter-04-title">
    <header class="chapter-header">
      <p class="eyebrow">Chapter 04</p>
      <h2 id="chapter-04-title">
        Composition API and Composables Architecture
      </h2>
      <p>
        Extract reactive state, derived values, mutations, asynchronous work,
        and resource cleanup without coupling logic to a specific layout.
      </p>
    </header>

    <div class="demo-grid">
      <CounterComposableDemo />
      <ToggleComposableDemo />
      <PaginationComposableDemo />
      <LocalStorageComposableDemo />
      <AsyncStateComposableDemo />
      <DebouncedSearchComposableDemo />
      <ClickOutsideComposableDemo />
      <SharedVsPerInstanceDemo />
      <EffectScopeDemo />
    </div>

    <ComposablesKitDemo />
  </section>
</template>

<style scoped>
.chapter {
  display: grid;
  gap: 1rem;
}

.chapter-header {
  padding: 1.5rem;
  border: 1px solid #c8dccf;
  border-radius: 1rem;
  background: #eff8f2;
}

.chapter-header h2 {
  margin: 0.35rem 0 0.6rem;
  font-size: clamp(1.8rem, 4vw, 2.7rem);
}

.chapter-header p:last-child {
  max-width: 820px;
  margin-bottom: 0;
  line-height: 1.7;
}

.eyebrow {
  margin: 0;
  color: #2f7048;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1rem;
}

@media (max-width: 500px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
