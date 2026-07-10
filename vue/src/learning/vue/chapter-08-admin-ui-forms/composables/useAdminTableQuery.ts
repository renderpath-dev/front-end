import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { LocationQueryRaw, LocationQueryValue } from "vue-router";
import type {
  TableQueryState,
  TableSearchState,
  TableSortState,
} from "../contracts/tableContracts";

type QueryPrefix = "uiUser" | "uiProduct" | "uiOrder" | "uiRole";

function firstValue(
  value: LocationQueryValue | ReadonlyArray<LocationQueryValue>,
): LocationQueryValue {
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

function normalizeText(
  value: LocationQueryValue | ReadonlyArray<LocationQueryValue>,
): string {
  return firstValue(value)?.trim() ?? "";
}

function normalizePositiveInteger(
  value: LocationQueryValue | ReadonlyArray<LocationQueryValue>,
  fallback: number,
): number {
  const parsed = Number.parseInt(normalizeText(value), 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeOrder(value: string): TableSortState["order"] {
  return value === "ascending" || value === "descending" ? value : "";
}

export function useAdminTableQuery(prefix: QueryPrefix) {
  const route = useRoute();
  const router = useRouter();
  const keywordKey = `${prefix}Keyword`;
  const statusKey = `${prefix}Status`;
  const pageKey = `${prefix}Page`;
  const pageSizeKey = `${prefix}PageSize`;
  const sortKey = `${prefix}Sort`;
  const orderKey = `${prefix}Order`;

  const query = computed<TableQueryState>(() => ({
    search: {
      keyword: normalizeText(route.query[keywordKey]),
      status: normalizeText(route.query[statusKey]),
    },
    pagination: {
      page: normalizePositiveInteger(route.query[pageKey], 1),
      pageSize: normalizePositiveInteger(route.query[pageSizeKey], 5),
    },
    sorting: {
      sort: normalizeText(route.query[sortKey]),
      order: normalizeOrder(normalizeText(route.query[orderKey])),
    },
  }));

  function replaceQuery(patch: LocationQueryRaw): void {
    void router.replace({
      query: {
        ...route.query,
        ...patch,
      },
    });
  }

  function setSearch(search: TableSearchState): void {
    replaceQuery({
      [keywordKey]: search.keyword || undefined,
      [statusKey]: search.status || undefined,
      [pageKey]: "1",
    });
  }

  function setPage(page: number): void {
    replaceQuery({
      [pageKey]: String(Math.max(1, page)),
    });
  }

  function setPageSize(pageSize: number): void {
    replaceQuery({
      [pageSizeKey]: String(Math.max(1, pageSize)),
      [pageKey]: "1",
    });
  }

  function setSort(sorting: TableSortState): void {
    replaceQuery({
      [sortKey]: sorting.sort || undefined,
      [orderKey]: sorting.order || undefined,
      [pageKey]: "1",
    });
  }

  function reset(): void {
    replaceQuery({
      [keywordKey]: undefined,
      [statusKey]: undefined,
      [pageKey]: undefined,
      [pageSizeKey]: undefined,
      [sortKey]: undefined,
      [orderKey]: undefined,
    });
  }

  return {
    query,
    setSearch,
    setPage,
    setPageSize,
    setSort,
    reset,
  };
}
