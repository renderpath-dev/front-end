import { describe, expect, it } from 'vitest'
import {
  isProductionServingBoundary,
  summarizeBuildArtifact,
} from '../02-build-artifact/build-artifact-model'

describe('build artifact model', () => {
  it('distinguishes build output, preview, and production host', () => {
    const summary = summarizeBuildArtifact({
      assets: [
        {
          fileName: 'assets/index-Ab12cd.js',
          hashed: true,
          kind: 'entry',
          sizeKb: 80,
        },
        {
          fileName: 'assets/chapter-25-Cd34ef.js',
          hashed: true,
          kind: 'route-chunk',
          route: '/react/chapter-25',
          sizeKb: 40,
        },
      ],
      basePath: '/',
      distPath: 'dist',
      mode: 'local-preview',
    })

    expect(summary.environmentLabel).toBe('Local Vite preview')
    expect(summary.previewIsProduction).toBe(false)
    expect(summary.hasHashedAssets).toBe(true)
    expect(summary.hasRouteChunks).toBe(true)
    expect(isProductionServingBoundary('production-host')).toBe(true)
  })
})
