export type BuildAssetKind = 'entry' | 'route-chunk' | 'style' | 'asset'

export type BuildServingMode = 'build-output' | 'local-preview' | 'production-host'

export type BuildAsset = {
  fileName: string
  hashed: boolean
  kind: BuildAssetKind
  route?: string
  sizeKb: number
}

export type BuildArtifactInput = {
  assets: BuildAsset[]
  basePath: string
  distPath: string
  htmlCachePolicy?: string
  mode: BuildServingMode
}

export type BuildArtifactSummary = {
  basePathReady: boolean
  environmentLabel: string
  hasHashedAssets: boolean
  hasRouteChunks: boolean
  issues: string[]
  previewIsProduction: boolean
  routeChunkCount: number
}

const productionHtmlCachePolicy = 'no-cache'

export function summarizeBuildArtifact(input: BuildArtifactInput): BuildArtifactSummary {
  const routeChunks = input.assets.filter((asset) => asset.kind === 'route-chunk')
  const hasHashedAssets = input.assets.some((asset) => asset.hashed)
  const basePathReady = input.basePath.startsWith('/')
  const issues: string[] = []

  if (!input.distPath.endsWith('dist')) {
    issues.push('Build output should point to the dist artifact folder.')
  }

  if (!hasHashedAssets) {
    issues.push('Production artifact should contain hashed static assets.')
  }

  if (routeChunks.length === 0) {
    issues.push('Route chunk evidence is missing for lazy route boundaries.')
  }

  if (!basePathReady) {
    issues.push('Base path should be explicit before static hosting.')
  }

  if (
    input.mode === 'production-host' &&
    input.htmlCachePolicy !== productionHtmlCachePolicy
  ) {
    issues.push('Production HTML should be reviewed with no-cache semantics.')
  }

  return {
    basePathReady,
    environmentLabel: getServingModeLabel(input.mode),
    hasHashedAssets,
    hasRouteChunks: routeChunks.length > 0,
    issues,
    previewIsProduction: false,
    routeChunkCount: routeChunks.length,
  }
}

export function getServingModeLabel(mode: BuildServingMode): string {
  if (mode === 'build-output') {
    return 'Static artifact'
  }

  if (mode === 'local-preview') {
    return 'Local Vite preview'
  }

  return 'Production host'
}

export function isProductionServingBoundary(mode: BuildServingMode): boolean {
  return mode === 'production-host'
}
