import type { ContentCardItem } from "../../shared/types/content";

export function useContentNavigation(items: ReadonlyArray<ContentCardItem>) {
  const visibleItems = computed(() =>
    items.filter((item) => item.title.trim().length > 0),
  );

  return {
    visibleItems,
  };
}
