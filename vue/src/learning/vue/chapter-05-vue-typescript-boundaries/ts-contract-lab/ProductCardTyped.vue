<script setup lang="ts">
import type {
  Product,
  ProductId,
} from "../contracts/productContract";

type Props = {
  product: Product;
};

defineProps<Props>();

const emit = defineEmits<{
  edit: [productId: ProductId];
  archive: [payload: { productId: ProductId; previousStatus: Product["status"] }];
}>();
</script>

<template>
  <article class="product-card">
    <p class="status">{{ product.status }} · {{ product.category }}</p>
    <h4>{{ product.name }}</h4>
    <p>${{ product.price.toFixed(2) }}</p>
    <div class="actions">
      <button type="button" @click="emit('edit', product.id)">Edit</button>
      <button
        type="button"
        :disabled="product.status === 'archived'"
        @click="
          emit('archive', {
            productId: product.id,
            previousStatus: product.status,
          })
        "
      >
        Archive
      </button>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  padding: 0.75rem;
  border: 1px solid #ced9e3;
  border-radius: 0.6rem;
  background: #ffffff;
}

.status {
  margin: 0;
  color: #42657e;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h4 {
  margin: 0.35rem 0;
}

.actions {
  display: flex;
  gap: 0.4rem;
}

button {
  padding: 0.4rem 0.6rem;
  border: 1px solid #7696ac;
  border-radius: 0.4rem;
  background: #f5f9fb;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
