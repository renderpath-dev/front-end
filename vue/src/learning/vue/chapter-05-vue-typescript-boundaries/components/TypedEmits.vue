<script setup lang="ts">
import type {
  Product,
  ProductForm,
  ProductId,
} from "../contracts/productContract";

type Props = {
  product: Product;
};

defineProps<Props>();

const emit = defineEmits<{
  select: [productId: ProductId];
  archive: [payload: { productId: ProductId; reason: string }];
  submit: [form: ProductForm];
}>();

function submitDraft(): void {
  emit("submit", {
    name: "Typed draft",
    price: "42",
    status: "draft",
    category: "course",
    tags: ["typed"],
  });
}
</script>

<template>
  <article class="demo-card">
    <p class="topic">Named tuple emits</p>
    <h3>Typed Event Payloads</h3>
    <p>Event source: {{ product.name }}</p>
    <div class="actions">
      <button type="button" @click="emit('select', product.id)">
        Select
      </button>
      <button
        type="button"
        @click="
          emit('archive', {
            productId: product.id,
            reason: 'Learning demo',
          })
        "
      >
        Archive
      </button>
      <button type="button" @click="submitDraft">Submit draft</button>
    </div>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.1rem;
  border: 1px solid #d8cde2;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #73518a;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.65rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #9677a9;
  border-radius: 0.4rem;
  background: #f9f3fc;
  cursor: pointer;
}
</style>
