<script setup lang="ts">
defineProps<{
  privateConfigAvailable: boolean;
}>();
</script>

<template>
  <section class="secret-panel">
    <h2>Private runtime config boundary</h2>
    <p>
      Server confirmed private config:
      {{ privateConfigAvailable ? "available" : "missing" }}
    </p>
    <p>The private value itself is not returned to the client.</p>
  </section>
</template>

<style scoped>
.secret-panel {
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #f8fbf9;
}

h2 {
  margin-top: 0;
}
</style>
