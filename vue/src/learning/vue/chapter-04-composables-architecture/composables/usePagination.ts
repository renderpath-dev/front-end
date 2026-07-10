import {
  computed,
  ref,
  toValue,
  watch,
  type ComputedRef,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";

export type PaginationInput = {
  totalItems: MaybeRefOrGetter<number>;
  pageSize?: MaybeRefOrGetter<number>;
  initialPage?: number;
};

export type PaginationState = {
  currentPage: Ref<number>;
  totalPages: ComputedRef<number>;
  startIndex: ComputedRef<number>;
  endIndex: ComputedRef<number>;
  canGoPrevious: ComputedRef<boolean>;
  canGoNext: ComputedRef<boolean>;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
};

export function usePagination({
  totalItems,
  pageSize = 5,
  initialPage = 1,
}: PaginationInput): PaginationState {
  const currentPage = ref(Math.max(1, Math.floor(initialPage)));

  const normalizedTotalItems = computed(() =>
    Math.max(0, Math.floor(toValue(totalItems))),
  );
  const normalizedPageSize = computed(() =>
    Math.max(1, Math.floor(toValue(pageSize))),
  );
  const totalPages = computed(() =>
    Math.max(
      1,
      Math.ceil(normalizedTotalItems.value / normalizedPageSize.value),
    ),
  );
  const startIndex = computed(
    () => (currentPage.value - 1) * normalizedPageSize.value,
  );
  const endIndex = computed(() =>
    Math.min(
      startIndex.value + normalizedPageSize.value,
      normalizedTotalItems.value,
    ),
  );
  const canGoPrevious = computed(() => currentPage.value > 1);
  const canGoNext = computed(
    () => currentPage.value < totalPages.value,
  );

  function goToPage(page: number): void {
    const safePage = Number.isFinite(page) ? Math.floor(page) : 1;
    currentPage.value = Math.min(
      Math.max(safePage, 1),
      totalPages.value,
    );
  }

  function nextPage(): void {
    goToPage(currentPage.value + 1);
  }

  function previousPage(): void {
    goToPage(currentPage.value - 1);
  }

  watch(totalPages, () => {
    goToPage(currentPage.value);
  });

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    canGoPrevious,
    canGoNext,
    nextPage,
    previousPage,
    goToPage,
  };
}
