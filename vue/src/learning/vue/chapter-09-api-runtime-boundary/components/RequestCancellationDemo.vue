<script setup lang="ts">
import { useCancelableRequest } from "../composables/useCancelableRequest";
import { listProducts } from "../services/productApi";

const request = useCancelableRequest((signal) =>
  listProducts(
    {
      keyword: "",
      page: 1,
      pageSize: 2,
      sort: "id",
      order: "ascending",
    },
    { signal, scenario: "slow", timeout: 2_000 },
  ),
);
</script>

<template>
  <ElCard header="Request cancellation" shadow="never">
    <div class="actions">
      <ElButton type="primary" @click="request.execute">
        Start slow request
      </ElButton>
      <ElButton type="danger" @click="request.cancel">
        Cancel current request
      </ElButton>
    </div>
    <ElAlert
      v-if="request.error.value"
      :title="request.error.value.kind"
      :description="request.error.value.message"
      :type="request.isCanceled.value ? 'info' : 'error'"
      :closable="false"
      show-icon
    />
  </ElCard>
</template>

<style scoped>
.actions {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
</style>
