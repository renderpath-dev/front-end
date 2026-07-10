<script setup lang="ts">
import ProductsTablePage from "../tables/ProductsTablePage.vue";
import FileUploadPanel from "../upload/FileUploadPanel.vue";
</script>

<template>
  <div class="product-page">
    <ProductsTablePage />
    <FileUploadPanel />
  </div>
</template>

<style scoped>
.product-page {
  display: grid;
  gap: 1rem;
}
</style>
