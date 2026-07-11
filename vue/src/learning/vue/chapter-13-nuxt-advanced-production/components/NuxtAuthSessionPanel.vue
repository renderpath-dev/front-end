<script setup lang="ts">
import { nuxtAuthSessionBoundaryItems } from "../models/nuxtAuthSessionModel";
</script>

<template>
  <section class="chapter-card">
    <h3>Auth session boundary</h3>
    <article v-for="item in nuxtAuthSessionBoundaryItems" :key="item.flow">
      <h4>{{ item.flow }}</h4>
      <p>{{ item.serverRule }}</p>
      <p>{{ item.clientRule }}</p>
    </article>
  </section>
</template>

<style scoped>
.chapter-card {
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

h3,
h4 {
  margin-top: 0;
}

article + article {
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  border-top: 1px solid #e7efea;
}

p {
  margin: 0.25rem 0;
  color: #496358;
}
</style>
