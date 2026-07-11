<script setup lang="ts">
import { runtimeConfigBoundaryEntries } from "../models/nuxtRuntimeConfigModel";
</script>

<template>
  <section class="panel">
    <h3>Runtime config visibility</h3>
    <ul>
      <li v-for="entry in runtimeConfigBoundaryEntries" :key="entry.key">
        <code>{{ entry.key }}</code>
        <strong>{{ entry.visibility }}</strong>
        <span>{{ entry.safeUse }}</span>
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
  gap: 0.35rem;
  padding: 0.9rem;
  border-radius: 0.8rem;
  background: #f8fbf9;
}

code {
  color: #18794e;
  font-weight: 800;
}

strong {
  text-transform: uppercase;
}

span {
  color: #5f6f66;
}
</style>
