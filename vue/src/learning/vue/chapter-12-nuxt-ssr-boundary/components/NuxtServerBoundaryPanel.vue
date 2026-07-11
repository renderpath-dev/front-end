<script setup lang="ts">
import { serverBoundaryEntries } from "../models/nuxtServerBoundaryModel";
</script>

<template>
  <section class="panel">
    <h3>Nitro server boundary</h3>
    <div class="server-grid">
      <article v-for="entry in serverBoundaryEntries" :key="entry.pathPattern">
        <h4>{{ entry.layer }}</h4>
        <code>{{ entry.pathPattern }}</code>
        <p>{{ entry.runtime }}</p>
        <span>{{ entry.authority }}</span>
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

.server-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 0.75rem;
}

article {
  display: grid;
  gap: 0.45rem;
  padding: 0.9rem;
  border-radius: 0.8rem;
  background: #f5f7f9;
}

h4,
p {
  margin: 0;
}

code {
  color: #18794e;
  font-weight: 800;
}

span {
  color: #5f6f66;
}
</style>
