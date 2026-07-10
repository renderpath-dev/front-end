import { computed, ref } from "vue";
import type { Product } from "../contracts/productContract";
import type { ProductListQuery } from "../contracts/productContract";
import type { MockBackendScenario } from "../api/mockBackendScenarios";
import { listProducts } from "../services/productApi";
import { useApiResource } from "./useApiResource";

export function useProducts() {
  const query = ref<ProductListQuery>({
    keyword: "",
    page: 1,
    pageSize: 5,
    sort: "id",
    order: "ascending",
  });
  const scenario = ref<MockBackendScenario>("success");
  let controller: AbortController | null = null;

  const resource = useApiResource(() => {
    controller?.abort();
    controller = new AbortController();
    return listProducts(query.value, {
      scenario: scenario.value,
      signal: controller.signal,
    });
  });

  const products = computed<ReadonlyArray<Product>>(
    () => resource.data.value?.rows ?? [],
  );
  const meta = computed(() => resource.data.value?.meta ?? null);

  function setScenario(value: MockBackendScenario): void {
    scenario.value = value;
  }

  function setPage(page: number): void {
    query.value = { ...query.value, page: Math.max(1, page) };
    void resource.execute();
  }

  function setPageSize(pageSize: number): void {
    query.value = {
      ...query.value,
      page: 1,
      pageSize: Math.max(1, pageSize),
    };
    void resource.execute();
  }

  function cancel(): void {
    controller?.abort();
  }

  return {
    ...resource,
    products,
    meta,
    query,
    scenario,
    reload: resource.execute,
    setScenario,
    setPage,
    setPageSize,
    cancel,
  };
}
