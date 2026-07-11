<script setup lang="ts">
const unstableValue = Math.random().toFixed(5);
</script>

<template>
  <section class="warning-card">
    <h3>Intentional mismatch example</h3>
    <p>Random initial value: {{ unstableValue }}</p>
  </section>
</template>

<style scoped>
.warning-card {
  padding: 1rem;
  border: 1px solid #ffd6a4;
  border-radius: 1rem;
  background: #fff8ed;
}

h3,
p {
  margin: 0 0 0.5rem;
}
</style>
