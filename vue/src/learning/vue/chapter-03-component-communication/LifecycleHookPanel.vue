<script setup lang="ts">
import { onMounted, onUnmounted, onUpdated, ref } from "vue";

const localCount = ref(0);
const resizeCount = ref(0);
const lifecycleStatus = ref("Setup complete; mount is pending.");

function recordResize(): void {
  resizeCount.value += 1;
}

onMounted(() => {
  lifecycleStatus.value = "Mounted: DOM nodes now exist.";
  window.addEventListener("resize", recordResize);
  console.log("LifecycleHookPanel mounted.");
});

onUpdated(() => {
  console.log("LifecycleHookPanel updated.");
});

onUnmounted(() => {
  window.removeEventListener("resize", recordResize);
  console.log("LifecycleHookPanel unmounted and cleaned up.");
});
</script>

<template>
  <article class="practice-card">
    <p class="topic">Lifecycle hooks</p>
    <h3>Component Instance Timeline</h3>
    <p>{{ lifecycleStatus }}</p>
    <p>Local updates: {{ localCount }}</p>
    <p>Window resize events while mounted: {{ resizeCount }}</p>
    <button type="button" @click="localCount += 1">
      Trigger component update
    </button>
  </article>
</template>

<style scoped>
.practice-card {
  padding: 1.25rem;
  border: 1px solid #dfd2be;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #8a5b16;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.8rem;
}

button {
  padding: 0.55rem 0.75rem;
  border: 1px solid #ba8c49;
  border-radius: 0.5rem;
  background: #fff7eb;
  color: #754a0c;
  cursor: pointer;
}
</style>
