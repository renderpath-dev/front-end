<script setup lang="ts">
import { ref } from "vue";
import {
  toProductListResult,
  type ApiError,
  type ProductListResponse,
  type Result,
} from "../contracts/apiContract";

const validJson = JSON.stringify({
  items: [
    {
      id: "runtime-1",
      name: "Runtime Guarded Product",
      price: 18,
      status: "active",
      category: "tool",
      tags: ["runtime"],
    },
  ],
  total: 1,
});

const invalidJson = JSON.stringify({
  items: [{ id: "runtime-2", name: "Invalid Price", price: "free" }],
  total: 1,
});

const result = ref<Result<ProductListResponse, ApiError> | null>(null);

function parsePayload(json: string): void {
  try {
    const rawValue: unknown = JSON.parse(json);
    result.value = toProductListResult(rawValue);
  } catch {
    result.value = {
      ok: false,
      error: {
        code: "INVALID_JSON",
        message: "The local JSON string could not be parsed.",
      },
    };
  }
}
</script>

<template>
  <article class="demo-card">
    <p class="topic">Static versus runtime</p>
    <h3>Unknown Payload Narrowing</h3>
    <div class="actions">
      <button type="button" @click="parsePayload(validJson)">
        Parse valid payload
      </button>
      <button type="button" @click="parsePayload(invalidJson)">
        Parse invalid payload
      </button>
    </div>
    <p v-if="result?.ok">
      Guard accepted {{ result.data.total }} product.
    </p>
    <p v-else-if="result" class="error">
      {{ result.error.code }}: {{ result.error.message }}
    </p>
    <p v-else>No runtime value checked yet.</p>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.1rem;
  border: 1px solid #dfceca;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #94554a;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.65rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #b47b70;
  border-radius: 0.4rem;
  background: #fff8f6;
  cursor: pointer;
}

.error {
  color: #b42318;
}
</style>
