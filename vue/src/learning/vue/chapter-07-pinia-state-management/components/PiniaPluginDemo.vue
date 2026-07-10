<script setup lang="ts">
import { ref } from "vue";
import {
  clearPersistedState,
  getPersistenceErrors,
  getRawPersistenceSnapshots,
  persistedStoreIds,
} from "../stores/piniaPersistencePlugin";

const snapshots = ref(getRawPersistenceSnapshots());

function refreshSnapshots(): void {
  snapshots.value = [...getRawPersistenceSnapshots()];
}

function clearSnapshots(): void {
  clearPersistedState();
  refreshSnapshots();
}
</script>

<template>
  <section class="panel">
    <p class="eyebrow">Local Pinia plugin</p>
    <h2>Persistence allowlist</h2>
    <p>Allowlisted store ids: {{ persistedStoreIds.join(", ") }}</p>
    <ul>
      <li v-for="snapshot in snapshots" :key="snapshot.storeId">
        <strong>{{ snapshot.storeId }}</strong>
        <code>{{ snapshot.rawValue ?? "No saved snapshot" }}</code>
      </li>
    </ul>
    <p>Persistence errors: {{ getPersistenceErrors().length }}</p>
    <div class="actions">
      <button type="button" @click="refreshSnapshots">Refresh raw values</button>
      <button type="button" @click="clearSnapshots">Clear saved values</button>
    </div>
  </section>
</template>

<style scoped>
.panel {
  padding: 1.25rem;
  border: 1px solid #94a3b8;
  border-radius: 1rem;
  background: #f8fafc;
}

.eyebrow {
  margin: 0;
  color: #334155;
  font-weight: 800;
  text-transform: uppercase;
}

h2 {
  margin: 0.35rem 0;
}

li {
  display: grid;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
}

code {
  overflow-wrap: anywhere;
  color: #475569;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.45rem 0.7rem;
  border: 1px solid #475569;
  border-radius: 0.5rem;
  background: #ffffff;
  cursor: pointer;
}
</style>
