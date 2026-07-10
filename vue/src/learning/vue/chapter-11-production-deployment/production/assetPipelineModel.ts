export type AssetPipelineOwner =
  "source-import" | "public-directory" | "remote-url";

export interface AssetPipelineRecord {
  readonly owner: AssetPipelineOwner;
  readonly sourcePattern: string;
  readonly buildBehavior: string;
  readonly cacheBehavior: string;
  readonly bestUse: string;
}

export const assetPipelineRecords: ReadonlyArray<AssetPipelineRecord> = [
  {
    owner: "source-import",
    sourcePattern: "import logoUrl from './logo.svg'",
    buildBehavior: "Vite rewrites the import to a generated asset URL",
    cacheBehavior: "Hashed file can use a long immutable cache",
    bestUse: "Assets referenced by components or CSS",
  },
  {
    owner: "public-directory",
    sourcePattern: "public/favicon.svg",
    buildBehavior: "Vite copies the file to the dist root",
    cacheBehavior: "Cache policy depends on whether the name is versioned",
    bestUse: "Files that must keep a stable public path",
  },
  {
    owner: "remote-url",
    sourcePattern: "https://cdn.example.com/image.png",
    buildBehavior: "Vite leaves the external URL as runtime data",
    cacheBehavior: "Owned by the remote server or CDN",
    bestUse: "External media or runtime-provided assets",
  },
];
