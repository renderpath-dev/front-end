<script setup lang="ts">
import { nuxtModuleSelectionItems } from "../models/nuxtModuleSelectionModel";
</script>

<template>
  <section class="chapter-card">
    <h3>Module selection boundary</h3>
    <ul>
      <li v-for="item in nuxtModuleSelectionItems" :key="item.name">
        <strong>{{ item.name }}</strong>
        <span>{{ item.role }}</span>
        <small>{{ item.boundary }}</small>
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

small {
  color: #587064;
}
</style>
