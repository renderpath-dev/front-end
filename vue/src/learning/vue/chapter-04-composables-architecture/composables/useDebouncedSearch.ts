import {
  computed,
  ref,
  toValue,
  watch,
  type ComputedRef,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";
import { useDebouncedRef } from "./useDebouncedRef";

export type SearchItem = {
  id: string;
  label: string;
};

export type DebouncedSearchState = {
  immediateQuery: Ref<string>;
  debouncedQuery: Ref<string>;
  results: ComputedRef<readonly SearchItem[]>;
  clear: () => void;
};

export function useDebouncedSearch(
  items: MaybeRefOrGetter<readonly SearchItem[]>,
  delay = 300,
): DebouncedSearchState {
  const immediateQuery = ref("");
  const debouncedQuery = useDebouncedRef("", delay);

  watch(immediateQuery, (query) => {
    debouncedQuery.value = query;
  });

  const results = computed(() => {
    const normalizedQuery = debouncedQuery.value.trim().toLowerCase();
    const availableItems = toValue(items);

    if (!normalizedQuery) {
      return availableItems;
    }

    return availableItems.filter((item) =>
      item.label.toLowerCase().includes(normalizedQuery),
    );
  });

  function clear(): void {
    immediateQuery.value = "";
    debouncedQuery.value = "";
  }

  return {
    immediateQuery,
    debouncedQuery,
    results,
    clear,
  };
}
