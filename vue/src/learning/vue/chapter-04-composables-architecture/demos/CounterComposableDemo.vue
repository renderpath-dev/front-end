<script setup lang="ts">
import { useCounter } from "../composables/useCounter";

const firstCounter = useCounter();
const secondCounter = useCounter(10);
</script>

<template>
  <article class="demo-card">
    <p class="topic">Per-instance state</p>
    <h3>Two Independent Counter Calls</h3>

    <div class="counter-row">
      <strong>First: {{ firstCounter.count }}</strong>
      <button type="button" @click="firstCounter.decrement">-</button>
      <button type="button" @click="firstCounter.increment">+</button>
      <button type="button" @click="firstCounter.reset">Reset</button>
    </div>

    <div class="counter-row">
      <strong>Second: {{ secondCounter.count }}</strong>
      <button type="button" @click="secondCounter.decrement">-</button>
      <button type="button" @click="secondCounter.increment">+</button>
      <button type="button" @click="secondCounter.reset">Reset</button>
    </div>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.2rem;
  border: 1px solid #cdd8d1;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #24724d;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 1rem;
}

.counter-row {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 0.55rem;
}

.counter-row strong {
  min-width: 6rem;
}

button {
  padding: 0.4rem 0.65rem;
  border: 1px solid #6f9c82;
  border-radius: 0.4rem;
  background: #f1f8f4;
  cursor: pointer;
}
</style>
