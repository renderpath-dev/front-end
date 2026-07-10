<script setup lang="ts">
import { useToggle } from "../composables/useToggle";

const {
  value: panelVisible,
  toggle,
  setTrue: showPanel,
  setFalse: hidePanel,
  setValue,
} = useToggle(true);
</script>

<template>
  <article class="demo-card">
    <p class="topic">Boolean state machine</p>
    <h3>Stable Toggle Mutations</h3>
    <div class="actions">
      <button type="button" @click="toggle">Toggle</button>
      <button type="button" @click="showPanel">Show</button>
      <button type="button" @click="hidePanel">Hide</button>
      <button type="button" @click="setValue(true)">Set true</button>
    </div>
    <p v-if="panelVisible" class="panel">
      The composable owns this per-call boolean ref.
    </p>
    <p v-else>Panel is hidden.</p>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.2rem;
  border: 1px solid #d8cfdf;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #77508d;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 1rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #9675a9;
  border-radius: 0.4rem;
  background: #faf3fd;
  cursor: pointer;
}

.panel {
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: #f3eefa;
}
</style>
