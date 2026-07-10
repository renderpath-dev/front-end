<script setup lang="ts">
import { computed, ref } from "vue";
import FilterPanel from "./FilterPanel.vue";
import ProductCard from "./ProductCard.vue";

type ProductFilter = "all" | "learning" | "tooling";

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

const products = ref<Product[]>([
  {
    id: 1,
    name: "Vue Component Workbook",
    category: "learning",
    price: 28,
    favorite: false,
  },
  {
    id: 2,
    name: "TypeScript Contract Cards",
    category: "learning",
    price: 16,
    favorite: true,
  },
  {
    id: 3,
    name: "SFC Inspection Toolkit",
    category: "tooling",
    price: 42,
    favorite: false,
  },
]);
const currentFilter = ref<ProductFilter>("all");
const selectedProductName = ref("No product selected.");

const filteredProducts = computed(() => {
  if (currentFilter.value === "all") {
    return products.value;
  }

  return products.value.filter(
    (product) => product.category === currentFilter.value,
  );
});

function updateFilter(filter: ProductFilter): void {
  currentFilter.value = filter;
}

function selectProduct(payload: ProductActionPayload): void {
  const product = products.value.find(
    (currentProduct) => currentProduct.id === payload.productId,
  );

  selectedProductName.value = product
    ? `Selected: ${product.name}`
    : "Product not found.";
}

function toggleFavorite(payload: ProductActionPayload): void {
  const product = products.value.find(
    (currentProduct) => currentProduct.id === payload.productId,
  );

  if (product) {
    product.favorite = !product.favorite;
  }
}
</script>

<template>
  <article class="practice-card">
    <p class="topic">Props down, events up</p>
    <h3>Product List</h3>
    <p>
      The parent owns products, filtering, selection, and favorite mutations.
    </p>

    <FilterPanel
      :current-filter="currentFilter"
      @change="updateFilter"
    />

    <div class="product-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @select="selectProduct"
        @favorite="toggleFavorite"
      />
    </div>

    <p class="status" aria-live="polite">{{ selectedProductName }}</p>
  </article>
</template>

<style scoped>
.practice-card {
  padding: 1.25rem;
  border: 1px solid #c9ddd3;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #18794e;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.5rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.status {
  margin-bottom: 0;
  padding: 0.7rem;
  border-radius: 0.55rem;
  background: #eef8f3;
  font-weight: 700;
}
</style>
