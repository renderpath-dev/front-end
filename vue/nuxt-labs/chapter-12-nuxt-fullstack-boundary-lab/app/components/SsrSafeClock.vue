<script setup lang="ts">
const { label, updateNow } = useSafeNow();
</script>

<template>
  <section class="info-card">
    <h3>SSR-safe clock</h3>
    <p>{{ label }}</p>
    <button type="button" @click="updateNow">Refresh client time</button>
  </section>
</template>

<style scoped>
.info-card {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

h3,
p {
  margin: 0;
}

button {
  width: fit-content;
  padding: 0.65rem 0.8rem;
  border: 0;
  border-radius: 0.65rem;
  background: #18794e;
  color: #ffffff;
  font-weight: 800;
  cursor: pointer;
}
</style>
