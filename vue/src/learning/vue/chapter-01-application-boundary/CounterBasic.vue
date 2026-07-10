<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);

function increment(): void {
  count.value += 1;
}

function reset(): void {
  count.value = 0;
}
</script>

<template>
  <article class="practice-card">
    <p class="topic">Minimal ref</p>
    <h2>Counter Basic</h2>
    <p class="count" aria-live="polite">Count: {{ count }}</p>

    <div class="actions">
      <button type="button" @click="increment">Increment</button>
      <button type="button" class="secondary" @click="reset">Reset</button>
    </div>
  </article>
</template>

<style scoped>
.practice-card {
  padding: 1.25rem;
  border: 1px solid #dce6e1;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #18794e;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h2 {
  margin: 0.35rem 0 1rem;
}

.count {
  font-size: 1.4rem;
  font-weight: 700;
}

.actions {
  display: flex;
  gap: 0.65rem;
}

button {
  padding: 0.65rem 0.9rem;
  border: 0;
  border-radius: 0.55rem;
  background: #18794e;
  color: #ffffff;
  cursor: pointer;
}

.secondary {
  background: #e8efeb;
  color: #213547;
}
</style>
