<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<template>
  <section class="loaded-panel">
    <strong>Async component loaded.</strong>
    <p>{{ message }}</p>
  </section>
</template>

<style scoped>
.loaded-panel {
  padding: 0.85rem;
  border: 1px solid #91b6c8;
  border-radius: 0.65rem;
  background: #eef8fc;
}

.loaded-panel p {
  margin-bottom: 0;
}
</style>
