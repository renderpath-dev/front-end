<script setup lang="ts">
import { deploymentOutputEntries } from "../models/nuxtDeploymentOutputModel";
</script>

<template>
  <section class="panel">
    <h3>Nuxt output differs from Vite dist</h3>
    <div class="output-grid">
      <article v-for="entry in deploymentOutputEntries" :key="entry.command">
        <code>{{ entry.command }}</code>
        <p>{{ entry.output }}</p>
        <span>{{ entry.meaning }}</span>
      </article>
    </div>
  </section>
</template>

<style scoped>
.panel {
  padding: 1.25rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

.output-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 0.75rem;
}

article {
  display: grid;
  gap: 0.35rem;
  padding: 0.9rem;
  border-radius: 0.8rem;
  background: #f5f7f9;
}

code {
  color: #18794e;
  font-weight: 800;
}

p {
  margin: 0;
  font-weight: 700;
}

span {
  color: #5f6f66;
}
</style>
