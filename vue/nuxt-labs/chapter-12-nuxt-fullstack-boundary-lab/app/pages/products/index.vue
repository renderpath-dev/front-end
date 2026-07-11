<script setup lang="ts">
const { data, error, refresh, status } = await useProductList();

const products = computed(() => {
  if (!data.value?.ok) {
    return [];
  }

  return data.value.data.products;
});

function refreshProducts(): Promise<void> {
  return refresh();
}

const payloadNotes: ReadonlyArray<string> = [
  "useFetch runs during server rendering for the first request.",
  "Nuxt serializes the resolved data into payload.",
  "Hydration reuses payload data instead of fetching the same list again.",
];
</script>

<template>
  <section class="page-card">
    <p class="eyebrow">Products</p>
    <h2>SSR-compatible product list</h2>
    <p>
      This page loads product data through a composable that wraps useFetch and
      calls the local Nitro API endpoint.
    </p>

    <ServerResultPanel
      label="useFetch status"
      :status="status"
      description="The list is fetched through Nuxt data fetching and can enter payload."
    />

    <p v-if="error" class="error-message">{{ error.message }}</p>

    <div class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <button type="button" @click="refreshProducts">Refresh products</button>
    <PayloadInspector title="Payload transfer notes" :items="payloadNotes" />
  </section>
</template>

<style scoped>
.page-card {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

h2,
p {
  margin: 0;
}

p {
  line-height: 1.65;
}

.eyebrow {
  color: #18794e;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

button {
  width: fit-content;
  padding: 0.7rem 0.9rem;
  border: 0;
  border-radius: 0.7rem;
  background: #18794e;
  color: #ffffff;
  font-weight: 800;
  cursor: pointer;
}

.error-message {
  color: #b42318;
  font-weight: 800;
}
</style>
