<script setup lang="ts">
import type { ProductCardProps } from "../contracts/productContract";

defineProps<ProductCardProps>();
</script>

<template>
  <article class="demo-card">
    <p class="topic">Type-based props</p>
    <h3>{{ product.name }}</h3>
    <p>{{ product.category }} · {{ product.status }}</p>
    <p>${{ product.price.toFixed(2) }}</p>
    <ul v-if="badges?.length">
      <li v-for="badge in badges" :key="badge">{{ badge }}</li>
    </ul>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.1rem;
  border: 1px solid #cbd8e6;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #38658f;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.65rem;
}

ul {
  display: flex;
  gap: 0.4rem;
  padding: 0;
  list-style: none;
}

li {
  padding: 0.2rem 0.45rem;
  border-radius: 999px;
  background: #edf4fb;
}
</style>
