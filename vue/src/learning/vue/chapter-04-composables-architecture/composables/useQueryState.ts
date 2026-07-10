import { computed, ref, type ComputedRef, type Ref } from "vue";

export type QueryState = Record<string, string>;

export type QueryStateApi = {
  query: Ref<QueryState>;
  serializedQuery: ComputedRef<string>;
  setQueryParam: (key: string, value: string) => void;
  removeQueryParam: (key: string) => void;
  replaceFromString: (queryString: string) => void;
  reset: () => void;
};

function parseQueryString(queryString: string): QueryState {
  const parameters = new URLSearchParams(queryString);
  return Object.fromEntries(parameters.entries());
}

export function useQueryState(
  initialQuery: QueryState = {},
): QueryStateApi {
  const query = ref<QueryState>({ ...initialQuery });
  const serializedQuery = computed(() => {
    const entries = Object.entries(query.value).filter(
      ([, value]) => value.length > 0,
    );
    return new URLSearchParams(entries).toString();
  });

  function setQueryParam(key: string, value: string): void {
    query.value = {
      ...query.value,
      [key]: value,
    };
  }

  function removeQueryParam(key: string): void {
    const nextQuery = { ...query.value };
    delete nextQuery[key];
    query.value = nextQuery;
  }

  function replaceFromString(queryString: string): void {
    query.value = parseQueryString(queryString);
  }

  function reset(): void {
    query.value = { ...initialQuery };
  }

  return {
    query,
    serializedQuery,
    setQueryParam,
    removeQueryParam,
    replaceFromString,
    reset,
  };
}
