<script setup lang="ts">
import { dataFetchingEntries } from "../models/nuxtDataFetchingModel";
</script>

<template>
  <section class="panel">
    <h3>Data fetching boundaries</h3>
    <div class="fetch-grid">
      <article v-for="entry in dataFetchingEntries" :key="entry.api">
        <h4>{{ entry.api }}</h4>
        <p>{{ entry.owner }}</p>
        <span>{{ entry.bestUse }}</span>
        <small>{{ entry.payloadBehavior }}</small>
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

.fetch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}

article {
  display: grid;
  gap: 0.45rem;
  padding: 0.9rem;
  border-radius: 0.8rem;
  background: #f8fbf9;
}

h4,
p {
  margin: 0;
}

h4 {
  color: #18794e;
}

small {
  color: #5f6f66;
  line-height: 1.5;
}
</style>
