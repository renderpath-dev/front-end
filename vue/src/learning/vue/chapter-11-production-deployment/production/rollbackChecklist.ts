export type RollbackArtifact =
  "dist" | "docker-image" | "index-html" | "asset-cache" | "cdn-cache";

export interface RollbackChecklistItem {
  readonly artifact: RollbackArtifact;
  readonly action: string;
  readonly risk: string;
  readonly verification: string;
}

export const rollbackChecklist: ReadonlyArray<RollbackChecklistItem> = [
  {
    artifact: "dist",
    action: "Restore the previous complete dist artifact",
    risk: "Restoring only one file can mix asset hashes",
    verification: "Open the restored index and inspect asset URLs",
  },
  {
    artifact: "docker-image",
    action: "Run the previous image tag",
    risk: "The tag must point to the exact previous build",
    verification: "Check container image digest and HTTP response",
  },
  {
    artifact: "index-html",
    action: "Restore the matching entry file",
    risk: "Old index may reference assets already purged",
    verification: "Request index with no-cache headers",
  },
  {
    artifact: "asset-cache",
    action: "Keep previous hashed assets until no index references them",
    risk: "Purged assets can create blank pages for cached index files",
    verification: "Request old asset URLs from browser or CDN cache",
  },
  {
    artifact: "cdn-cache",
    action: "Purge or revalidate the entry path deliberately",
    risk: "Edge nodes can serve mixed versions",
    verification: "Check cache status from multiple paths when available",
  },
];
