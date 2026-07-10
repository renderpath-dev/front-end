<script setup lang="ts">
import { qualityGateChecklist } from "../quality/qualityGateChecklist";
</script>

<template>
  <article class="command-panel">
    <h4>Local quality commands</h4>
    <code v-for="gate in qualityGateChecklist" :key="gate.command">
      {{ gate.command }}
    </code>
  </article>
</template>

<style scoped>
.command-panel {
  display: grid;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.7rem;
  background: #13231b;
  color: #ffffff;
}

.command-panel h4 {
  margin: 0;
}

.command-panel code {
  color: #9ee6c4;
}
</style>
