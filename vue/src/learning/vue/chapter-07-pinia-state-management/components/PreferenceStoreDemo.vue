<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePreferenceStore } from "../stores/preferenceStore";

const preferenceStore = usePreferenceStore();
const { compactLayout, tableDensity, dismissedTips } =
  storeToRefs(preferenceStore);
</script>

<template>
  <section class="panel">
    <p class="eyebrow">Safe persistence</p>
    <h2>Preference store</h2>
    <p>Layout: {{ compactLayout ? "compact" : "spacious" }}</p>
    <p>Table density: {{ tableDensity }}</p>
    <p>Dismissed tips: {{ dismissedTips.join(", ") || "none" }}</p>
    <div class="actions">
      <button type="button" @click="preferenceStore.toggleCompactLayout">
        Toggle layout
      </button>
      <button
        type="button"
        @click="preferenceStore.setTableDensity('comfortable')"
      >
        Comfortable table
      </button>
      <button
        type="button"
        @click="preferenceStore.setTableDensity('compact')"
      >
        Compact table
      </button>
      <button type="button" @click="preferenceStore.dismissTip('pinia-owner')">
        Dismiss owner tip
      </button>
      <button type="button" @click="preferenceStore.resetPreferences">
        Reset
      </button>
    </div>
  </section>
</template>

<style scoped>
.panel {
  padding: 1.25rem;
  border: 1px solid #c4b5fd;
  border-radius: 1rem;
  background: #f5f3ff;
}

.eyebrow {
  margin: 0;
  color: #6d28d9;
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
  border: 1px solid #7c3aed;
  border-radius: 0.5rem;
  background: #ffffff;
  cursor: pointer;
}
</style>
