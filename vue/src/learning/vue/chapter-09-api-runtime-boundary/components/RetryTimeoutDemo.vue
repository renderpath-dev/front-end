<script setup lang="ts">
import { shallowRef } from "vue";
import type { NormalizedApiError } from "../api/apiErrors";
import { useRetryableRequest } from "../composables/useRetryableRequest";
import { listProducts } from "../services/productApi";

const timeoutError = shallowRef<NormalizedApiError | null>(null);

const retryRequest = useRetryableRequest(
  "GET",
  (attempt) =>
    listProducts(
      {
        keyword: "",
        page: 1,
        pageSize: 2,
        sort: "id",
        order: "ascending",
      },
      { scenario: attempt === 1 ? "networkError" : "success" },
    ),
);

async function runTimeout(): Promise<void> {
  const result = await listProducts(
    {
      keyword: "",
      page: 1,
      pageSize: 2,
      sort: "id",
      order: "ascending",
    },
    { scenario: "timeout", timeout: 200 },
  );
  timeoutError.value = result.ok ? null : result.error;
}
</script>

<template>
  <ElCard header="Timeout and retry" shadow="never">
    <div class="actions">
      <ElButton type="primary" @click="retryRequest.execute">
        Retry safe GET
      </ElButton>
      <ElButton @click="runTimeout">Simulate timeout</ElButton>
    </div>
    <ul>
      <li v-for="event in retryRequest.timeline.value" :key="event">
        {{ event }}
      </li>
    </ul>
    <ElAlert
      v-if="timeoutError"
      :title="timeoutError.kind"
      :description="timeoutError.message"
      type="error"
      :closable="false"
      show-icon
    />
  </ElCard>
</template>

<style scoped>
.actions {
  display: flex;
  gap: 0.5rem;
}
</style>
