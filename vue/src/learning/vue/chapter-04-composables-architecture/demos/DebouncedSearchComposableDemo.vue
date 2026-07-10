<script setup lang="ts">
import {
  useDebouncedSearch,
  type SearchItem,
} from "../composables/useDebouncedSearch";

const items: SearchItem[] = [
  { id: "props", label: "Component props" },
  { id: "effects", label: "Reactive effects" },
  { id: "scope", label: "Effect scope" },
  { id: "storage", label: "Local storage" },
  { id: "async", label: "Async state" },
];

const {
  immediateQuery,
  debouncedQuery,
  results,
  clear,
} = useDebouncedSearch(items, 400);
</script>

<template>
  <article class="demo-card">
    <p class="topic">Delayed invalidation</p>
    <h3>Debounced Local Search</h3>
    <label for="debounced-search">Search topics</label>
    <input
      id="debounced-search"
      v-model="immediateQuery"
      type="search"
      placeholder="Type a topic"
    />
    <p>Immediate: {{ immediateQuery || "(empty)" }}</p>
    <p>Debounced: {{ debouncedQuery || "(empty)" }}</p>
    <ul>
      <li v-for="item in results" :key="item.id">{{ item.label }}</li>
    </ul>
    <button type="button" @click="clear">Clear</button>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.2rem;
  border: 1px solid #d7cfe0;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #70508a;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.85rem;
}

label {
  display: block;
  margin-bottom: 0.35rem;
  font-weight: 700;
}

input {
  width: 100%;
  padding: 0.55rem;
  border: 1px solid #aa96b9;
  border-radius: 0.4rem;
}

ul {
  min-height: 5rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #9276a6;
  border-radius: 0.4rem;
  background: #f8f2fb;
  cursor: pointer;
}
</style>
