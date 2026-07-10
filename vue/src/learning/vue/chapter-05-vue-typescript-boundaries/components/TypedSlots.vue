<script setup lang="ts">
import type { Product, ProductId } from "../contracts/productContract";

type Props = {
  products: ReadonlyArray<Product>;
};

defineProps<Props>();

defineSlots<{
  row(props: { product: Product; index: number }): unknown;
  actions(props: { productId: ProductId }): unknown;
}>();
</script>

<template>
  <article class="demo-card">
    <p class="topic">Typed slots</p>
    <h3>Parent Render Contract</h3>
    <ul>
      <li v-for="(product, index) in products" :key="product.id">
        <div>
          <slot name="row" :product="product" :index="index">
            {{ product.name }}
          </slot>
        </div>
        <div>
          <slot name="actions" :product-id="product.id" />
        </div>
      </li>
    </ul>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.1rem;
  border: 1px solid #ccd9e0;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #3c6b80;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.65rem;
}

ul {
  display: grid;
  gap: 0.5rem;
  padding: 0;
  list-style: none;
}

li {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.6rem;
  border-radius: 0.45rem;
  background: #f3f7f9;
}
</style>
