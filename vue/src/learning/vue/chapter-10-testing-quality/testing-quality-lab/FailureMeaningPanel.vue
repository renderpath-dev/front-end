<script setup lang="ts">
import { testFailureCatalog } from "../quality/testFailureCatalog";
</script>

<template>
  <article class="failure-panel">
    <h4>What a failure means</h4>
    <details v-for="failure in testFailureCatalog" :key="failure.signal">
      <summary>{{ failure.signal }}</summary>
      <p>{{ failure.meaning }}</p>
      <small>{{ failure.nextStep }}</small>
    </details>
  </article>
</template>

<style scoped>
.failure-panel {
  display: grid;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #dbe5df;
  border-radius: 0.7rem;
}

.failure-panel h4,
.failure-panel p {
  margin: 0;
}

.failure-panel details {
  padding: 0.55rem 0;
  border-bottom: 1px solid #e6ece8;
}
</style>
