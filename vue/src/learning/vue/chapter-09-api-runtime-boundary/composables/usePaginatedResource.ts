import { computed } from "vue";
import type { Ref } from "vue";
import type { ApiResult } from "../api/httpTypes";
import type {
  PaginatedResult,
  PaginationQuery,
} from "../contracts/paginationContract";
import { useApiResource } from "./useApiResource";

export function usePaginatedResource<Item>(
  query: Ref<PaginationQuery>,
  request: () => Promise<ApiResult<PaginatedResult<Item>>>,
) {
  const resource = useApiResource(request);
  const rows = computed<ReadonlyArray<Item>>(
    () => resource.data.value?.rows ?? [],
  );
  const meta = computed(() => resource.data.value?.meta ?? null);

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

  return {
    ...resource,
    rows,
    meta,
    reload: resource.execute,
    setPage,
    setPageSize,
  };
}
