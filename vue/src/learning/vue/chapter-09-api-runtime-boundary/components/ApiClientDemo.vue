<script setup lang="ts">
import { computed, ref, shallowRef } from "vue";
import { requestUnknown } from "../api/httpClient";
import type { ApiRawResponse } from "../api/httpTypes";
import { productListResponseSchema } from "../validators/productValidator";

const rawResponse = shallowRef<ApiRawResponse | null>(null);
const status = ref<"idle" | "loading" | "success" | "error">("idle");

const validation = computed(() =>
  rawResponse.value
    ? productListResponseSchema.safeParse(rawResponse.value.data)
    : null,
);

async function runRequest(): Promise<void> {
  status.value = "loading";
  try {
    rawResponse.value = await requestUnknown({
      method: "GET",
      url: "/products",
      params: {
        keyword: "",
        page: 1,
        pageSize: 2,
        sort: "id",
        order: "ascending",
      },
      scenario: "success",
      meta: { endpointName: "products:list" },
    });
    status.value = "success";
  } catch {
    status.value = "error";
  }
}
</script>

<template>
  <ElCard header="Central API client" shadow="never">
    <ElButton
      type="primary"
      :loading="status === 'loading'"
      @click="runRequest"
    >
      Request raw products
    </ElButton>
    <ElDescriptions v-if="rawResponse" :column="1" border class="result">
      <ElDescriptionsItem label="HTTP status">
        {{ rawResponse.status }}
      </ElDescriptionsItem>
      <ElDescriptionsItem label="Request id">
        {{ rawResponse.requestId }}
      </ElDescriptionsItem>
      <ElDescriptionsItem label="Runtime validation">
        {{ validation?.success ? "passed" : "failed" }}
      </ElDescriptionsItem>
      <ElDescriptionsItem label="Raw payload">
        <pre>{{ JSON.stringify(rawResponse.data, null, 2) }}</pre>
      </ElDescriptionsItem>
    </ElDescriptions>
  </ElCard>
</template>

<style scoped>
.result {
  margin-top: 1rem;
}

pre {
  overflow: auto;
  margin: 0;
  white-space: pre-wrap;
}
</style>
