<script setup lang="ts">
import { onMounted } from "vue";
import { useProducts } from "../composables/useProducts";

const productsState = useProducts();

onMounted(() => {
  void productsState.reload();
});
</script>

<template>
  <ElCard header="Validated pagination response" shadow="never">
    <ElTable
      v-loading="productsState.isLoading.value"
      :data="productsState.products.value"
      row-key="id"
      stripe
    >
      <ElTableColumn prop="name" label="Product" />
      <ElTableColumn prop="price" label="Price" />
      <ElTableColumn prop="status" label="Status" />
    </ElTable>
    <ElPagination
      :current-page="productsState.query.value.page"
      :page-size="productsState.query.value.pageSize"
      :total="productsState.meta.value?.total ?? 0"
      layout="total, prev, pager, next"
      @update:current-page="productsState.setPage"
    />
  </ElCard>
</template>
