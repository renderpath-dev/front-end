<script setup lang="ts">
import { boundaryComparisonRows } from "../models/nuxtVsViteSpaModel";
</script>

<template>
  <section class="chapter-card">
    <p class="eyebrow">Framework boundary</p>
    <h3>Nuxt is a separate application boundary</h3>
    <p>
      Chapter 12 keeps the Vite learning shell intact and places the Nuxt lab in
      its own subproject because Nuxt owns routing, server rendering, Nitro
      handlers, runtime config, and deployment output.
    </p>

    <div class="comparison-grid">
      <article v-for="row in boundaryComparisonRows" :key="row.topic">
        <h4>{{ row.topic }}</h4>
        <p><strong>Vite SPA:</strong> {{ row.viteSpa }}</p>
        <p><strong>Nuxt app:</strong> {{ row.nuxtApp }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.chapter-card {
  padding: 1.5rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 0 1rem 2rem rgba(33, 53, 71, 0.08);
}

.chapter-card h3 {
  margin: 0.25rem 0 0.75rem;
}

.chapter-card p {
  line-height: 1.65;
}

.eyebrow {
  margin: 0;
  color: #18794e;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.comparison-grid article {
  padding: 1rem;
  border: 1px solid #dce8e2;
  border-radius: 0.8rem;
  background: #f8fbf9;
}

.comparison-grid h4 {
  margin: 0 0 0.5rem;
}
</style>
