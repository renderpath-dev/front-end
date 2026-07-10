<script setup lang="ts">
import { usePreferenceStore } from "../stores/preferenceStore";
import { useThemeStore } from "../stores/themeStore";

const preferenceStore = usePreferenceStore();
const themeStore = useThemeStore();

function updateTableDensity(event: Event): void {
  const target = event.target;

  if (target instanceof HTMLSelectElement) {
    preferenceStore.setTableDensity(
      target.value === "compact" ? "compact" : "comfortable",
    );
  }
}
</script>

<template>
  <section class="panel">
    <h3>Persisted preferences</h3>
    <label>
      <input
        type="checkbox"
        :checked="preferenceStore.compactLayout"
        @change="preferenceStore.toggleCompactLayout"
      />
      Compact layout
    </label>
    <label>
      Table density
      <select
        :value="preferenceStore.tableDensity"
        @change="updateTableDensity"
      >
        <option value="comfortable">Comfortable</option>
        <option value="compact">Compact</option>
      </select>
    </label>
    <button type="button" @click="themeStore.toggleMode">
      Theme: {{ themeStore.mode }}
    </button>
  </section>
</template>

<style scoped>
.panel {
  display: grid;
  gap: 0.7rem;
  padding: 1rem;
  border: 1px solid #c4b5fd;
  border-radius: 0.9rem;
  background: #f5f3ff;
}

h3 {
  margin: 0;
}

label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

button,
select {
  width: fit-content;
  padding: 0.4rem 0.6rem;
  border: 1px solid #7c3aed;
  border-radius: 0.45rem;
  background: #ffffff;
}
</style>
