import { computed, ref } from "vue";
import type { MockBackendScenario } from "../api/mockBackendScenarios";
import type { Order, OrderListQuery } from "../contracts/orderContract";
import { listOrders } from "../services/orderApi";
import { useApiResource } from "./useApiResource";

export function useOrders() {
  const query = ref<OrderListQuery>({
    status: "",
    page: 1,
    pageSize: 5,
    sort: "createdAt",
    order: "descending",
  });
  const scenario = ref<MockBackendScenario>("success");
  const resource = useApiResource(() =>
    listOrders(query.value, { scenario: scenario.value }),
  );

  const orders = computed<ReadonlyArray<Order>>(
    () => resource.data.value?.rows ?? [],
  );
  const meta = computed(() => resource.data.value?.meta ?? null);

  function setScenario(value: MockBackendScenario): void {
    scenario.value = value;
  }

  return {
    ...resource,
    orders,
    meta,
    query,
    scenario,
    reload: resource.execute,
    setScenario,
  };
}
