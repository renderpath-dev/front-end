<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSelectionStore } from "../stores/selectionStore";

const selectionStore = useSelectionStore();
const { availableItems, selectedIds } = storeToRefs(selectionStore);
</script>

<template>
  <section class="panel">
    <p class="eyebrow">Serializable selection state</p>
    <h2>Selection store</h2>
    <label v-for="item in availableItems" :key="item.id">
      <input
        type="checkbox"
        :checked="selectedIds.includes(item.id)"
        @change="selectionStore.toggle(item.id)"
      />
      {{ item.label }}
    </label>
    <p>Selected ids: {{ selectedIds.join(", ") || "none" }}</p>
    <div class="actions">
      <button
        type="button"
        @click="selectionStore.selectMany(availableItems.map((item) => item.id))"
      >
        Select all
      </button>
      <button type="button" @click="selectionStore.clear">Clear</button>
    </div>
    <small>
      Keep this local when only one table needs it. Use a store when multiple
      admin panels coordinate the same selection.
    </small>
  </section>
</template>

<style scoped>
.panel {
  display: grid;
  gap: 0.65rem;
  padding: 1.25rem;
  border: 1px solid #f9a8d4;
  border-radius: 1rem;
  background: #fdf2f8;
}

.eyebrow {
  margin: 0;
  color: #be185d;
  font-weight: 800;
  text-transform: uppercase;
}

h2,
p {
  margin: 0;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.45rem 0.7rem;
  border: 1px solid #db2777;
  border-radius: 0.5rem;
  background: #ffffff;
  cursor: pointer;
}
</style>
