<script setup lang="ts">
import { onMounted } from "vue";
import { mockBackendScenarios } from "../api/mockBackendScenarios";
import { useProducts } from "../composables/useProducts";
import ApiErrorPanel from "./ApiErrorPanel.vue";

const state = useProducts();

onMounted(() => {
  void state.reload();
});
</script>

<template>
  <ElCard header="Product API panel" shadow="never">
    <div class="toolbar">
      <ElSelect v-model="state.scenario.value" aria-label="Product scenario">
        <ElOption
          v-for="scenario in mockBackendScenarios"
          :key="scenario"
          :label="scenario"
          :value="scenario"
        />
      </ElSelect>
      <ElButton
        type="primary"
        :loading="state.isLoading.value"
        @click="state.reload"
      >
        Reload
      </ElButton>
      <ElButton @click="state.cancel">Cancel</ElButton>
      <ElTag>{{ state.status.value }}</ElTag>
    </div>
    <ApiErrorPanel :error="state.error.value" />
    <ElTable :data="state.products.value" row-key="id" stripe>
      <ElTableColumn prop="name" label="Product" />
      <ElTableColumn prop="category" label="Category" />
      <ElTableColumn prop="price" label="Price" />
      <ElTableColumn prop="status" label="Status" />
    </ElTable>
    <ElPagination
      :current-page="state.query.value.page"
      :page-size="state.query.value.pageSize"
      :total="state.meta.value?.total ?? 0"
      layout="total, prev, pager, next"
      @update:current-page="state.setPage"
    />
  </ElCard>
</template>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
</style>
