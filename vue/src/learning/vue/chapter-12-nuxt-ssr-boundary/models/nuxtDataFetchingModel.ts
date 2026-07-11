export interface NuxtDataFetchingEntry {
  readonly api: "$fetch" | "useFetch" | "useAsyncData";
  readonly owner: string;
  readonly bestUse: string;
  readonly payloadBehavior: string;
}

export const dataFetchingEntries: ReadonlyArray<NuxtDataFetchingEntry> = [
  {
    api: "$fetch",
    owner: "Request utility",
    bestUse: "Event handlers and direct server calls",
    payloadBehavior: "Does not automatically serialize setup data into Nuxt payload",
  },
  {
    api: "useFetch",
    owner: "Nuxt composable",
    bestUse: "SSR-compatible URL-based data fetching in setup",
    payloadBehavior: "Serializes server result into payload to avoid duplicate hydration fetch",
  },
  {
    api: "useAsyncData",
    owner: "Nuxt composable",
    bestUse: "Custom async handlers with explicit cache keys",
    payloadBehavior: "Shares keyed data between server render and hydration",
  },
];
