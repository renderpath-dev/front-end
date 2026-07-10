export type DistArtifactKind =
  | "entry-html"
  | "hashed-javascript"
  | "hashed-css"
  | "static-asset"
  | "public-asset"
  | "bundle-report";

export interface DistArtifactRecord {
  readonly kind: DistArtifactKind;
  readonly expectedPath: string;
  readonly producedBy: string;
  readonly cacheOwner: string;
  readonly verification: string;
}

export const distOutputMap: ReadonlyArray<DistArtifactRecord> = [
  {
    kind: "entry-html",
    expectedPath: "dist/index.html",
    producedBy: "vite build",
    cacheOwner: "Static host and CDN with short cache",
    verification: "verifyDistFiles.mjs checks that the file exists",
  },
  {
    kind: "hashed-javascript",
    expectedPath: "dist/assets/*.js",
    producedBy: "Vite production chunk graph",
    cacheOwner: "Browser and CDN immutable asset cache",
    verification: "verifyDistFiles.mjs lists JavaScript assets",
  },
  {
    kind: "hashed-css",
    expectedPath: "dist/assets/*.css",
    producedBy: "Vite CSS extraction",
    cacheOwner: "Browser and CDN immutable asset cache",
    verification: "verifyDistFiles.mjs lists CSS assets",
  },
  {
    kind: "static-asset",
    expectedPath: "dist/assets/*",
    producedBy: "Imported assets in source modules",
    cacheOwner: "Browser and CDN immutable asset cache",
    verification: "Filename should include a content hash",
  },
  {
    kind: "public-asset",
    expectedPath: "dist/*",
    producedBy: "Vite public directory copy",
    cacheOwner: "Static host policy based on file purpose",
    verification: "Check copied files when public assets exist",
  },
  {
    kind: "bundle-report",
    expectedPath: "dist/stats.html",
    producedBy: "build:analyze",
    cacheOwner: "Local review artifact",
    verification: "Only exists after analyze mode build",
  },
];
