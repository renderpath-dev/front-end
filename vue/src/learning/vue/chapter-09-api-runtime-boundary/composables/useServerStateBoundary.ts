import { computed } from "vue";

const boundaryRows = [
  {
    state: "Request loading and error",
    owner: "API composable",
    reason: "It belongs to one request lifecycle.",
  },
  {
    state: "Auth role and theme",
    owner: "Pinia",
    reason: "It is global client state.",
  },
  {
    state: "Page, filter, and sort",
    owner: "Router query",
    reason: "It should survive navigation and sharing.",
  },
  {
    state: "Remote products and cache freshness",
    owner: "Future API cache",
    reason: "It needs deduplication, invalidation, and refetch policy.",
  },
] as const;

export function useServerStateBoundary() {
  const rows = computed(() => boundaryRows);
  return { rows };
}
