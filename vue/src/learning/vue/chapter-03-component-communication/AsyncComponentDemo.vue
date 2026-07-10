<script setup lang="ts">
import { defineAsyncComponent, defineComponent, h, ref } from "vue";

const showPanel = ref(false);

const AsyncLoadingPanel = defineComponent({
  name: "AsyncLoadingPanel",
  setup() {
    return () =>
      h(
        "p",
        { class: "loading-panel" },
        "Loading the component chunk...",
      );
  },
});

const AsyncLoadedPanel = defineAsyncComponent({
  loader: () => import("./AsyncLoadedPanel.vue"),
  loadingComponent: AsyncLoadingPanel,
  delay: 0,
  timeout: 5000,
});
</script>

<template>
  <article class="practice-card">
    <p class="topic">Async component</p>
    <h3>Lazy Component Boundary</h3>
    <button type="button" @click="showPanel = !showPanel">
      {{ showPanel ? "Unmount async panel" : "Load async panel" }}
    </button>
    <AsyncLoadedPanel
      v-if="showPanel"
      message="The wrapper forwarded this prop to the loaded component."
    />
  </article>
</template>

<style scoped>
.practice-card {
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
  border: 1px solid #c9dbe4;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #276b8c;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: -0.4rem 0 0;
}

button {
  width: fit-content;
  padding: 0.55rem 0.75rem;
  border: 1px solid #6fa0b8;
  border-radius: 0.5rem;
  background: #eff8fc;
  color: #225c78;
  cursor: pointer;
}

:deep(.loading-panel) {
  padding: 0.75rem;
  border-radius: 0.55rem;
  background: #f1f5f7;
}
</style>
