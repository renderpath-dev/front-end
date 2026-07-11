<script setup lang="ts">
const route = useRoute();
const productId = computed(() => String(route.params.id ?? ""));
const { data, error, status } = await useProductDetail(productId.value);

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode ?? 500,
    statusMessage: error.value.statusMessage ?? "Product request failed",
  });
}

const product = computed(() => {
  if (!data.value?.ok) {
    return null;
  }

  return data.value.data.product;
});
</script>

<template>
  <section class="page-card">
    <p class="eyebrow">Product detail</p>
    <ServerResultPanel
      label="Dynamic route fetch"
      :status="status"
      :description="`Route param ${productId} selects a server API record.`"
    />

    <ProductCard v-if="product" :product="product" />
    <p v-else>Product data is not available.</p>
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

.eyebrow {
  margin: 0;
  color: #18794e;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
</style>
