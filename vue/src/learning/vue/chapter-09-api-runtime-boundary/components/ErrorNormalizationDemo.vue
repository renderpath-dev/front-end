<script setup lang="ts">
import { ref, shallowRef } from "vue";
import type { NormalizedApiError } from "../api/apiErrors";
import {
  mockBackendScenarios,
  type MockBackendScenario,
} from "../api/mockBackendScenarios";
import { useApiErrorPresenter } from "../composables/useApiErrorPresenter";
import { listProducts } from "../services/productApi";

const scenario = ref<MockBackendScenario>("networkError");
const error = shallowRef<NormalizedApiError | null>(null);
const { present } = useApiErrorPresenter();

const selectableScenarios = mockBackendScenarios.filter(
  (value) => value !== "success" && value !== "slow",
);

async function runScenario(): Promise<void> {
  const result = await listProducts(
    {
      keyword: "",
      page: 1,
      pageSize: 2,
      sort: "id",
      order: "ascending",
    },
    { scenario: scenario.value, timeout: 300 },
  );
  error.value = result.ok ? null : result.error;
}
</script>

<template>
  <ElCard header="Error normalization" shadow="never">
    <div class="actions">
      <ElSelect v-model="scenario" aria-label="Error scenario">
        <ElOption
          v-for="option in selectableScenarios"
          :key="option"
          :label="option"
          :value="option"
        />
      </ElSelect>
      <ElButton type="primary" @click="runScenario">Run scenario</ElButton>
    </div>
    <ElAlert
      v-if="error"
      class="result"
      :title="present(error).title"
      :description="`${present(error).description} ${present(error).suggestedAction}`"
      :type="present(error).severity"
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

.result {
  margin-top: 1rem;
}
</style>
