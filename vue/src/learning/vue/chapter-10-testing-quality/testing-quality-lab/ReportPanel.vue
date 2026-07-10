<script setup lang="ts">
defineProps<{
  title: string;
  scope: string;
  evidence: string;
}>();
</script>

<template>
  <article class="report-panel">
    <span>Defined</span>
    <h4>{{ title }}</h4>
    <p>{{ scope }}</p>
    <small>{{ evidence }}</small>
  </article>
</template>

<style scoped>
.report-panel {
  padding: 1rem;
  border: 1px solid #dbe5df;
  border-radius: 0.7rem;
  background: #f9fcfa;
}

.report-panel span {
  color: #18794e;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
}

.report-panel h4 {
  margin: 0.3rem 0;
}

.report-panel p {
  margin: 0 0 0.5rem;
}

.report-panel small {
  color: #5d6f66;
}
</style>
