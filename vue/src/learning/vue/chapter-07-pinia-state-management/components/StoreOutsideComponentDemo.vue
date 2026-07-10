<script setup lang="ts">
import { ref } from "vue";
import { pinia } from "../stores/pinia";
import { useAuthStore } from "../stores/authStore";
import { usePermissionStore } from "../stores/permissionStore";

const outsideSnapshot = ref("Not read yet");

function readWithExplicitPinia(): void {
  const authStore = useAuthStore(pinia);
  const permissionStore = usePermissionStore(pinia);

  outsideSnapshot.value =
    `${authStore.displayName} · ` +
    `${permissionStore.visiblePermissionSummary}`;
}
</script>

<template>
  <section class="panel">
    <p class="eyebrow">Outside component setup</p>
    <h2>Explicit Pinia instance</h2>
    <p>{{ outsideSnapshot }}</p>
    <button type="button" @click="readWithExplicitPinia">
      Read stores with pinia
    </button>
    <p>
      Chapter 06 guards and dynamic menu functions call useAuthStore(pinia) or
      usePermissionStore(pinia) inside their evaluation functions. No store is
      captured before the application installs Pinia.
    </p>
  </section>
</template>

<style scoped>
.panel {
  padding: 1.25rem;
  border: 1px solid #a5b4fc;
  border-radius: 1rem;
  background: #eef2ff;
}

.eyebrow {
  margin: 0;
  color: #4338ca;
  font-weight: 800;
  text-transform: uppercase;
}

h2 {
  margin: 0.35rem 0;
}

button {
  padding: 0.45rem 0.7rem;
  border: 1px solid #4f46e5;
  border-radius: 0.5rem;
  background: #ffffff;
  cursor: pointer;
}
</style>
