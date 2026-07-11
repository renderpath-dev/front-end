<script setup lang="ts">
import { hydrationBoundaryRisks } from "../models/hydrationBoundaryModel";
</script>

<template>
  <section class="panel">
    <h3>Hydration boundary risks</h3>
    <ul>
      <li v-for="risk in hydrationBoundaryRisks" :key="risk.source">
        <strong>{{ risk.source }}</strong>
        <span>{{ risk.risk }}</span>
        <em>{{ risk.safePattern }}</em>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.panel {
  padding: 1.25rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

ul {
  display: grid;
  gap: 0.75rem;
  padding: 0;
  list-style: none;
}

li {
  display: grid;
  gap: 0.3rem;
  padding: 0.9rem;
  border-radius: 0.8rem;
  background: #f8fbf9;
}

strong {
  color: #18794e;
}

em {
  color: #5f6f66;
  font-style: normal;
}
</style>
