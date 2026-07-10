<script setup lang="ts">
import { useScopedTicker } from "../composables/useScopedTicker";

const {
  ticks,
  observedTick,
  running,
  start,
  stop,
  reset,
} = useScopedTicker(400);
</script>

<template>
  <article class="demo-card">
    <p class="topic">Manual effect lifetime</p>
    <h3>Scoped Ticker</h3>
    <p>Ticks: {{ ticks }}</p>
    <p>watchEffect observed: {{ observedTick }}</p>
    <p>Scope: {{ running ? "running" : "stopped" }}</p>
    <div class="actions">
      <button type="button" :disabled="running" @click="start">Start</button>
      <button type="button" :disabled="!running" @click="stop">Stop</button>
      <button type="button" @click="reset">Reset count</button>
    </div>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.2rem;
  border: 1px solid #c8d3e3;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #3c6194;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.85rem;
}

.actions {
  display: flex;
  gap: 0.45rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #7690b5;
  border-radius: 0.4rem;
  background: #f1f5fc;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
