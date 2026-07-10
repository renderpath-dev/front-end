<script setup lang="ts">
import { ref } from "vue";
import {
  toProductListResult,
  type ApiError,
  type ProductListResponse,
  type Result,
} from "../contracts/apiContract";

const result = ref<Result<ProductListResponse, ApiError> | null>(null);

function inspectPayload(valid: boolean): void {
  const rawPayload: unknown = valid
    ? {
        items: [
          {
            id: "api-1",
            name: "Guarded Local Product",
            price: 25,
            status: "active",
            category: "tool",
            tags: ["guarded"],
          },
        ],
        total: 1,
      }
    : {
        items: [{ id: "api-2", name: "Missing Runtime Fields" }],
        total: 1,
      };

  result.value = toProductListResult(rawPayload);
}
</script>

<template>
  <section class="contract-panel">
    <h4>Unknown-to-Result API Boundary</h4>
    <div class="actions">
      <button type="button" @click="inspectPayload(true)">
        Check valid payload
      </button>
      <button type="button" @click="inspectPayload(false)">
        Check invalid payload
      </button>
    </div>
    <p v-if="result?.ok">Accepted {{ result.data.total }} product.</p>
    <p v-else-if="result" class="error">
      {{ result.error.code }}: {{ result.error.message }}
    </p>
    <p v-else>No payload inspected.</p>
  </section>
</template>

<style scoped>
.contract-panel {
  padding: 0.85rem;
  border-radius: 0.6rem;
  background: #fff5f2;
}

h4 {
  margin: 0 0 0.6rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #b17d72;
  border-radius: 0.4rem;
  background: #ffffff;
  cursor: pointer;
}

.error {
  color: #b42318;
}
</style>
