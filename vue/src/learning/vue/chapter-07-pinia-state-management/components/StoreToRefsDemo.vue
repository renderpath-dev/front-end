<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useThemeStore } from "../stores/themeStore";

const themeStore = useThemeStore();
const staleModeSnapshot = themeStore.mode;
const { mode, themeClass } = storeToRefs(themeStore);
const { toggleMode } = themeStore;
</script>

<template>
  <section class="panel">
    <p class="eyebrow">Reactive destructuring</p>
    <h2>storeToRefs</h2>
    <p>Plain destructured snapshot: {{ staleModeSnapshot }}</p>
    <p>Reactive mode ref: {{ mode }}</p>
    <p>Reactive getter ref: {{ themeClass }}</p>
    <button type="button" @click="toggleMode">Toggle with bound action</button>
    <small>
      State and getters need storeToRefs. Actions are already bound and may be
      destructured directly.
    </small>
  </section>
</template>

<style scoped>
.panel {
  display: grid;
  gap: 0.65rem;
  padding: 1.25rem;
  border: 1px solid #67e8f9;
  border-radius: 1rem;
  background: #ecfeff;
}

.eyebrow {
  margin: 0;
  color: #0e7490;
  font-weight: 800;
  text-transform: uppercase;
}

h2,
p {
  margin: 0;
}

button {
  width: fit-content;
  padding: 0.45rem 0.7rem;
  border: 1px solid #0891b2;
  border-radius: 0.5rem;
  background: #ffffff;
  cursor: pointer;
}
</style>
