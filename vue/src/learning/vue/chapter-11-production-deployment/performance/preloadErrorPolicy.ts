export interface PreloadErrorPolicyRecord {
  readonly eventName: "vite:preloadError";
  readonly likelyCause: string;
  readonly safeResponse: string;
  readonly risk: string;
}

export const preloadErrorPolicy: PreloadErrorPolicyRecord = {
  eventName: "vite:preloadError",
  likelyCause:
    "A cached index references a chunk removed by a newer deployment",
  safeResponse: "Show a reload prompt or perform one controlled reload",
  risk: "Repeated reloads can hide a broken artifact or bad cache policy",
};

export function createPreloadErrorMessage(chunkUrl: string): string {
  return `A deployed chunk failed to load: ${chunkUrl}`;
}
