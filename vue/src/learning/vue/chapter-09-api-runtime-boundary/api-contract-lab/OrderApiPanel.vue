<script setup lang="ts">
import { onMounted, ref, shallowRef } from "vue";
import type { NormalizedApiError } from "../api/apiErrors";
import type { MockBackendScenario } from "../api/mockBackendScenarios";
import { useOrders } from "../composables/useOrders";
import type { Order } from "../contracts/orderContract";
import { updateOrderStatus } from "../services/orderApi";
import ApiErrorPanel from "./ApiErrorPanel.vue";

const state = useOrders();
const mutationScenario = ref<MockBackendScenario>("success");
const mutationError = shallowRef<NormalizedApiError | null>(null);

onMounted(() => {
  void state.reload();
});

async function advanceOrder(order: Order): Promise<void> {
  const nextStatus =
    order.status === "pending" ? "processing" : "completed";
  const result = await updateOrderStatus(
    order.id,
    { status: nextStatus },
    { scenario: mutationScenario.value },
  );
  mutationError.value = result.ok ? null : result.error;
  if (result.ok) {
    await state.reload();
  }
}
</script>

<template>
  <ElCard header="Order API panel" shadow="never">
    <div class="toolbar">
      <ElSelect v-model="mutationScenario">
        <ElOption label="Success" value="success" />
        <ElOption label="Conflict" value="conflict" />
        <ElOption label="Forbidden" value="forbidden" />
        <ElOption label="Validation error" value="validationError" />
      </ElSelect>
      <ElButton type="primary" @click="state.reload">Reload orders</ElButton>
    </div>
    <ApiErrorPanel :error="mutationError ?? state.error.value" />
    <ElTable :data="state.orders.value" row-key="id" stripe>
      <ElTableColumn prop="customer" label="Customer" />
      <ElTableColumn prop="total" label="Total" />
      <ElTableColumn prop="status" label="Status" />
      <ElTableColumn label="Operation">
        <template #default="{ row }">
          <ElButton size="small" @click="advanceOrder(row)">
            Advance status
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
  </ElCard>
</template>

<style scoped>
.toolbar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
</style>
