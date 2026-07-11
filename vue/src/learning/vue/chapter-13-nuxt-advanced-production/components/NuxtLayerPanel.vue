<script setup lang="ts">
import { nuxtLayerBoundaryItems } from "../models/nuxtLayerModel";
</script>

<template>
  <section class="chapter-card">
    <h3>Layer boundary</h3>
    <ul>
      <li v-for="item in nuxtLayerBoundaryItems" :key="item.concept">
        <strong>{{ item.concept }}</strong>
        <span>{{ item.meaning }}</span>
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
