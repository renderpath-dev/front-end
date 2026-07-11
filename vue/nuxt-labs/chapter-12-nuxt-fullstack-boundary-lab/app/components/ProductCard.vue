<script setup lang="ts">
import type { Product } from "../../shared/types/product";

defineProps<{
  readonly product: Product;
}>();
</script>

<template>
  <article class="product-card">
    <p class="status">{{ product.status }}</p>
    <h3>{{ product.name }}</h3>
    <p>{{ product.summary }}</p>
    <strong>{{ product.priceLabel }}</strong>
    <NuxtLink :to="`/products/${product.id}`">Open detail</NuxtLink>
  </article>
</template>

<style scoped>
.product-card {
  display: grid;
  gap: 0.55rem;
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

h3,
p {
  margin: 0;
}

.status {
  width: fit-content;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  background: #e7f8ef;
  color: #18794e;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

a {
  color: #18794e;
  font-weight: 800;
}
</style>
