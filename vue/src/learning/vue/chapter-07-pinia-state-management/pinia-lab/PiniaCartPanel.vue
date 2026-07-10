<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCartStore } from "../stores/cartStore";

const cartStore = useCartStore();
const { products, itemCount, subtotal } = storeToRefs(cartStore);
</script>

<template>
  <section class="panel">
    <h3>Shared cart</h3>
    <div class="actions">
      <button
        v-for="product in products"
        :key="product.id"
        type="button"
        @click="cartStore.addItem(product.id)"
      >
        Add {{ product.name }}
      </button>
    </div>
    <p>{{ itemCount }} items · ${{ subtotal.toFixed(2) }}</p>
    <button type="button" @click="cartStore.clearCart">Clear cart</button>
  </section>
</template>

<style scoped>
.panel {
  padding: 1rem;
  border: 1px solid #93c5fd;
  border-radius: 0.9rem;
  background: #eff6ff;
}

h3 {
  margin-top: 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

button {
  padding: 0.4rem 0.6rem;
  border: 1px solid #2563eb;
  border-radius: 0.45rem;
  background: #ffffff;
  cursor: pointer;
}
</style>
