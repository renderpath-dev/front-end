<script setup lang="ts">
defineProps<{
  title: string;
  boundary: string;
  items: ReadonlyArray<string>;
}>();
</script>

<template>
  <article class="concept-panel">
    <p class="boundary">{{ boundary }}</p>
    <h3>{{ title }}</h3>
    <ul>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </article>
</template>

<style scoped>
.concept-panel {
  min-height: 100%;
  padding: 1.2rem;
  border: 1px solid #cddbd4;
  border-radius: 0.85rem;
  background: #ffffff;
}

.concept-panel h3 {
  margin: 0.3rem 0 0.75rem;
}

.concept-panel ul {
  display: grid;
  gap: 0.45rem;
  margin: 0;
  padding-left: 1.2rem;
  color: #40534a;
  line-height: 1.5;
}

.boundary {
  margin: 0;
  color: #18794e;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
