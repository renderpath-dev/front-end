export type CachePolicyTarget =
  | "index-html"
  | "hashed-asset"
  | "public-asset"
  | "cdn-entry"
  | "browser-entry";

export interface CachePolicyRecord {
  readonly target: CachePolicyTarget;
  readonly recommendedHeader: string;
  readonly owner: string;
  readonly rollbackRisk: string;
}

export const cachePolicyRecords: ReadonlyArray<CachePolicyRecord> = [
  {
    target: "index-html",
    recommendedHeader: "Cache-Control: no-cache, no-store, must-revalidate",
    owner: "Static host and CDN",
    rollbackRisk: "Old index can point to missing or wrong hashed assets",
  },
  {
    target: "hashed-asset",
    recommendedHeader: "Cache-Control: public, max-age=31536000, immutable",
    owner: "Browser and CDN",
    rollbackRisk: "Safe when the matching index references the same hash",
  },
  {
    target: "public-asset",
    recommendedHeader: "Depends on whether the file name is versioned",
    owner: "Static host",
    rollbackRisk: "Stable names can keep stale content",
  },
  {
    target: "cdn-entry",
    recommendedHeader: "Provider-specific short TTL or explicit purge",
    owner: "CDN",
    rollbackRisk: "Edge nodes may keep a mixed build",
  },
  {
    target: "browser-entry",
    recommendedHeader: "Revalidation required",
    owner: "User browser",
    rollbackRisk: "Users can keep an old shell after deployment",
  },
];
