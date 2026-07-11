<script setup lang="ts">
defineProps<{
  readonly label: string;
  readonly status: string;
  readonly description: string;
}>();
</script>

<template>
  <section class="server-result">
    <p class="status">{{ status }}</p>
    <h3>{{ label }}</h3>
    <p>{{ description }}</p>
  </section>
</template>

<style scoped>
.server-result {
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

h3,
p {
  margin: 0 0 0.5rem;
}

.status {
  color: #18794e;
  font-weight: 800;
  text-transform: uppercase;
}
</style>
