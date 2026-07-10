<script setup lang="ts">
type Product = {
  id: number;
  name: string;
  category: "learning" | "tooling";
  price: number;
  favorite: boolean;
};

type ProductActionPayload = {
  productId: number;
  source: "select" | "favorite";
};

type Props = {
  product: Product;
  showPrice?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  showPrice: true,
});

const emit = defineEmits<{
  select: [payload: ProductActionPayload];
  favorite: [payload: ProductActionPayload];
}>();

function requestSelection(): void {
  emit("select", {
    productId: props.product.id,
    source: "select",
  });
}

function requestFavorite(): void {
  emit("favorite", {
    productId: props.product.id,
    source: "favorite",
  });
}
</script>

<template>
  <article class="product-card" :class="{ favorite: product.favorite }">
    <p class="category">{{ product.category }}</p>
    <h4>{{ product.name }}</h4>
    <p v-if="showPrice" class="price">${{ product.price.toFixed(2) }}</p>
    <div class="actions">
      <button type="button" @click="requestSelection">Select</button>
      <button type="button" class="secondary" @click="requestFavorite">
        {{ product.favorite ? "Remove favorite" : "Add favorite" }}
      </button>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  padding: 1rem;
  border: 1px solid #ccd9d3;
  border-radius: 0.75rem;
  background: #ffffff;
}

.product-card.favorite {
  border-color: #c6922f;
  background: #fffaf0;
}

.category {
  margin: 0;
  color: #18794e;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h4 {
  margin: 0.35rem 0;
}

.price {
  font-weight: 800;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 0.7rem;
  border: 1px solid #18794e;
  border-radius: 0.45rem;
  background: #18794e;
  color: #ffffff;
  cursor: pointer;
}

button.secondary {
  background: #ffffff;
  color: #145c3a;
}
</style>
