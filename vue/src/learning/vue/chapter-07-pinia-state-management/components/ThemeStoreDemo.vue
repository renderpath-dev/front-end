<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useThemeStore } from "../stores/themeStore";
import type { ThemeMode } from "../stores/storeTypes";

const themeStore = useThemeStore();
const { mode, themeClass, isDark } = storeToRefs(themeStore);

const modes: ReadonlyArray<ThemeMode> = ["light", "dark", "system"];
</script>

<template>
  <section class="panel" :class="themeClass">
    <p class="eyebrow">Persisted global client state</p>
    <h2>Theme store</h2>
    <p>Mode: {{ mode }} · Resolved: {{ isDark ? "dark" : "light" }}</p>
    <div class="actions">
      <button
        v-for="modeOption in modes"
        :key="modeOption"
        type="button"
        @click="themeStore.setMode(modeOption)"
      >
        {{ modeOption }}
      </button>
      <button type="button" @click="themeStore.toggleMode">Toggle</button>
      <button type="button" @click="themeStore.$reset">Reset</button>
    </div>
  </section>
</template>

<style scoped>
.panel {
  padding: 1.25rem;
  border: 2px solid #10b981;
  border-radius: 1rem;
  transition:
    color 160ms ease,
    background 160ms ease;
}

.theme-light {
  color: #0f172a;
  background: #ecfdf5;
}

.theme-dark {
  color: #f8fafc;
  background: #0f172a;
}

.eyebrow {
  margin: 0;
  font-weight: 800;
  text-transform: uppercase;
}

h2 {
  margin: 0.35rem 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

button {
  padding: 0.45rem 0.7rem;
  border: 1px solid currentColor;
  border-radius: 0.5rem;
  color: inherit;
  background: transparent;
  cursor: pointer;
}
</style>
