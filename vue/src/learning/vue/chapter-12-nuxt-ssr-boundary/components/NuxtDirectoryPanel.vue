<script setup lang="ts">
import { nuxtDirectoryEntries } from "../models/nuxtDirectoryModel";
</script>

<template>
  <section class="panel">
    <h3>Nuxt lab directory ownership</h3>
    <div class="entry-list">
      <article v-for="entry in nuxtDirectoryEntries" :key="entry.path">
        <code>{{ entry.path }}</code>
        <p>{{ entry.owner }}</p>
        <span>{{ entry.purpose }}</span>
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

.entry-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 0.75rem;
}

article {
  padding: 0.9rem;
  border-radius: 0.8rem;
  background: #f5f7f9;
}

code {
  color: #18794e;
  font-weight: 800;
}

p {
  margin: 0.55rem 0 0.25rem;
  font-weight: 700;
}

span {
  color: #5f6f66;
}
</style>
