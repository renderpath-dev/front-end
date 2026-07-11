<script setup lang="ts">
const stableValue = useState<string>("stable-random-label", () => "stable-before-client");

onMounted(() => {
  stableValue.value = Math.random().toFixed(5);
});
</script>

<template>
  <section class="info-card">
    <h3>Fixed hydration pattern</h3>
    <p>Value: {{ stableValue }}</p>
  </section>
</template>

<style scoped>
.info-card {
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

h3,
p {
  margin: 0 0 0.5rem;
}
</style>
