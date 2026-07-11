<script setup lang="ts">
import { boundaryComparisonRows } from "../models/nuxtVsViteSpaModel";
</script>

<template>
  <section class="panel">
    <h3>Vite SPA vs Nuxt app</h3>
    <table>
      <thead>
        <tr>
          <th>Topic</th>
          <th>Vite SPA</th>
          <th>Nuxt app</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in boundaryComparisonRows" :key="row.topic">
          <td>{{ row.topic }}</td>
          <td>{{ row.viteSpa }}</td>
          <td>{{ row.nuxtApp }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.panel {
  overflow-x: auto;
  padding: 1.25rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem;
  border-bottom: 1px solid #d8e4de;
  text-align: left;
  vertical-align: top;
}

th {
  color: #18794e;
}
</style>
