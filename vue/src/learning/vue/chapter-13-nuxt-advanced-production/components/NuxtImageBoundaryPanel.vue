<script setup lang="ts">
import { nuxtImageBoundaryItems } from "../models/nuxtImageModel";
</script>

<template>
  <section class="chapter-card">
    <h3>Image boundary</h3>
    <ul>
      <li v-for="item in nuxtImageBoundaryItems" :key="item.topic">
        <strong>{{ item.topic }}</strong>
        <span>{{ item.rule }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.chapter-card {
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

h3 {
  margin-top: 0;
}

ul {
  display: grid;
  gap: 0.75rem;
  padding-left: 1.2rem;
}

li {
  display: grid;
  gap: 0.2rem;
}
</style>
