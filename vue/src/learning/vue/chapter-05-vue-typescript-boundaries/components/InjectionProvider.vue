<script setup lang="ts">
import { provide, readonly, ref } from "vue";
import type { ProductId } from "../contracts/productContract";
import { productSelectionKey } from "../contracts/injectionKey";
import InjectionConsumer from "./InjectionConsumer.vue";

const selectedProductId = ref<ProductId | null>("product-1");

function selectProduct(productId: ProductId): void {
  selectedProductId.value = productId;
}

provide(productSelectionKey, {
  selectedProductId: readonly(selectedProductId),
  selectProduct,
});
</script>

<template>
  <article class="demo-card">
    <p class="topic">InjectionKey</p>
    <h3>Typed Provider and Consumer</h3>
    <p>Provider owns: {{ selectedProductId }}</p>
    <InjectionConsumer />
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.1rem;
  border: 1px solid #c8dacd;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #2f7550;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.65rem;
}
</style>
