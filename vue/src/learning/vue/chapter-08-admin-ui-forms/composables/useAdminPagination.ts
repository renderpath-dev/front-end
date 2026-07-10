import { computed, toValue } from "vue";
import type { MaybeRefOrGetter } from "vue";
import type { TablePaginationState } from "../contracts/tableContracts";

export function useAdminPagination<Row>(
  rows: MaybeRefOrGetter<ReadonlyArray<Row>>,
  pagination: MaybeRefOrGetter<TablePaginationState>,
) {
  const total = computed(() => toValue(rows).length);

  const visibleRows = computed(() => {
    const current = toValue(pagination);
    const start = (current.page - 1) * current.pageSize;
    return toValue(rows).slice(start, start + current.pageSize);
  });

  return {
    total,
    visibleRows,
  };
}
