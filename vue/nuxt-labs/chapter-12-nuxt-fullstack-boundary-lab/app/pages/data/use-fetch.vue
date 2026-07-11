<script setup lang="ts">
import type { ApiResult } from "../../../shared/types/api";
import type { ProductListResponse } from "../../../shared/types/product";

const { data, error, refresh, status } = await useFetch<
  ApiResult<ProductListResponse>
>("/api/products", {
  key: "page:use-fetch-products",
});

function refreshProducts(): Promise<void> {
  return refresh();
}
</script>

<template>
  <section class="page-card">
    <p class="eyebrow">Data fetching</p>
    <h2>useFetch</h2>
    <p>
      useFetch wraps $fetch for setup-time SSR data fetching and payload
      transfer.
    </p>
    <ServerResultPanel
      label="useFetch request"
      :status="status"
      description="The server result can be serialized into the Nuxt payload."
    />
    <p v-if="error" class="error-message">{{ error.message }}</p>
    <ul v-if="data?.ok">
      <li v-for="product in data.data.products" :key="product.id">
        {{ product.name }} - {{ product.priceLabel }}
      </li>
    </ul>
    <button type="button" @click="refreshProducts">Refresh useFetch data</button>
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

.eyebrow {
  color: #18794e;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
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
}
</style>
