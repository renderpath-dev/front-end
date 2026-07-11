<script setup lang="ts">
defineProps<{
  title: string;
  status: string;
}>();
</script>

<template>
  <section class="protected-panel">
    <p class="eyebrow">{{ status }}</p>
    <h2>{{ title }}</h2>
    <slot />
  </section>
</template>

<style scoped>
.protected-panel {
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

.eyebrow {
  margin: 0;
  color: #18794e;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
</style>
