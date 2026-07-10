export type DeploymentTarget =
  "static-hosting" | "nginx" | "docker-nginx" | "cdn" | "object-storage-cdn";

export interface DeploymentTargetRecord {
  readonly target: DeploymentTarget;
  readonly servesIndex: string;
  readonly servesAssets: string;
  readonly fallbackOwner: string;
  readonly cacheOwner: string;
  readonly vendorBoundary: string;
}

export const deploymentTargets: ReadonlyArray<DeploymentTargetRecord> = [
  {
    target: "static-hosting",
    servesIndex: "Static site service",
    servesAssets: "Static site service",
    fallbackOwner: "Static host rewrite settings",
    cacheOwner: "Static host or browser",
    vendorBoundary: "Config names vary by host",
  },
  {
    target: "nginx",
    servesIndex: "Nginx root",
    servesAssets: "Nginx root",
    fallbackOwner: "try_files rule",
    cacheOwner: "Nginx headers",
    vendorBoundary: "Portable server config example",
  },
  {
    target: "docker-nginx",
    servesIndex: "Nginx container",
    servesAssets: "Nginx container",
    fallbackOwner: "Image-bundled Nginx config",
    cacheOwner: "Nginx headers inside the image",
    vendorBoundary: "Runs locally without cloud provider coupling",
  },
  {
    target: "cdn",
    servesIndex: "CDN edge or origin",
    servesAssets: "CDN edge",
    fallbackOwner: "CDN rewrite or origin fallback",
    cacheOwner: "CDN cache policy",
    vendorBoundary: "Provider-specific purge and rule syntax",
  },
  {
    target: "object-storage-cdn",
    servesIndex: "Storage bucket origin",
    servesAssets: "Storage bucket and CDN edge",
    fallbackOwner: "CDN fallback rule",
    cacheOwner: "Bucket metadata and CDN cache",
    vendorBoundary: "Do not assume a vendor in this chapter",
  },
];
