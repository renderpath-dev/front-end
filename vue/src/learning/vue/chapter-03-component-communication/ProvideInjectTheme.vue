<script setup lang="ts">
import ThemeProviderPanel from "./ThemeProviderPanel.vue";
</script>

<template>
  <article class="practice-card">
    <p class="topic">Provide and inject</p>
    <h3>Typed Theme Context</h3>
    <p>
      The provider owns the ref and exposes a readonly value plus an explicit
      mutation function.
    </p>
    <ThemeProviderPanel />
  </article>
</template>

<style scoped>
.practice-card {
  padding: 1.25rem;
  border: 1px solid #cbdccf;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #36724f;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.5rem;
}
</style>
