<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "../stores/cartStore";

const cartStore = useCartStore();
const { products, items, itemCount, subtotal, isEmpty, updatedAt } =
  storeToRefs(cartStore);

const cartRows = computed(() =>
  items.value.map((item) => {
    const product = products.value.find(
      (candidate) => candidate.id === item.productId,
    );

    return {
      ...item,
      name: product?.name ?? "Unknown product",
      lineTotal: (product?.price ?? 0) * item.quantity,
    };
  }),
);
</script>

<template>
  <section class="panel">
    <p class="eyebrow">Collection state</p>
    <h2>Cart store</h2>
    <div class="catalog">
      <button
        v-for="product in products"
        :key="product.id"
        type="button"
        @click="cartStore.addItem(product.id)"
      >
        Add {{ product.name }} · ${{ product.price.toFixed(2) }}
      </button>
    </div>
    <p v-if="isEmpty">The cart is empty.</p>
    <ul v-else>
      <li v-for="row in cartRows" :key="row.productId">
        <span>{{ row.name }} × {{ row.quantity }}</span>
        <span>${{ row.lineTotal.toFixed(2) }}</span>
        <button type="button" @click="cartStore.decrement(row.productId)">
          -
        </button>
        <button type="button" @click="cartStore.increment(row.productId)">
          +
        </button>
        <button type="button" @click="cartStore.removeItem(row.productId)">
          Remove
        </button>
      </li>
    </ul>
    <p>Items: {{ itemCount }} · Subtotal: ${{ subtotal.toFixed(2) }}</p>
    <small>Updated: {{ updatedAt ?? "not yet" }}</small>
    <div>
      <button type="button" @click="cartStore.clearCart">Clear cart</button>
    </div>
  </section>
</template>

<style scoped>
.panel {
  padding: 1.25rem;
  border: 1px solid #93c5fd;
  border-radius: 1rem;
  background: #eff6ff;
}

.eyebrow {
  margin: 0;
  color: #1d4ed8;
  font-weight: 800;
  text-transform: uppercase;
}

h2 {
  margin: 0.35rem 0;
}

.catalog,
li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

li {
  margin-bottom: 0.6rem;
}

button {
  padding: 0.4rem 0.65rem;
  border: 1px solid #2563eb;
  border-radius: 0.5rem;
  background: #ffffff;
  cursor: pointer;
}
</style>
