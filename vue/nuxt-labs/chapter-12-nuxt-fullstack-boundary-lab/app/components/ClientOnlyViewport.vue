<script setup lang="ts">
const { viewport } = useBrowserViewport();
</script>

<template>
  <section class="info-card">
    <h3>Browser viewport</h3>
    <p v-if="viewport">
      Width {{ viewport.width }} px, height {{ viewport.height }} px
    </p>
    <p v-else>Waiting for browser mount</p>
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
