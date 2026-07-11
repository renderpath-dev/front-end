<script setup lang="ts">
import type { TestBoundaryItem } from "../../shared/types/test";

defineProps<{
  items: ReadonlyArray<TestBoundaryItem>;
}>();
</script>

<template>
  <section class="test-panel">
    <h2>Test boundaries</h2>
    <ul>
      <li v-for="item in items" :key="item.name">
        <strong>{{ item.name }}</strong>
        <span>{{ item.status }} — {{ item.evidence }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.test-panel {
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

h2 {
  margin-top: 0;
}

ul {
  display: grid;
  gap: 0.6rem;
  padding-left: 1.2rem;
}

li {
  display: grid;
  gap: 0.2rem;
}
</style>
