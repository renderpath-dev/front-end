import { describe, expect, test } from 'vitest'
import {
  analyzeSpaDeployment,
  createGitHubPagesDeploymentExample,
} from '../14-spa-deployment/spa-deployment-model'

describe('analyzeSpaDeployment', () => {
  test('distinguishes BrowserRouter rewrite, base, basename, and preview boundaries', () => {
    const findings = analyzeSpaDeployment({
      routerMode: 'browser',
      hostHasRewrite: false,
      viteBase: '/front-end/',
      browserRouterBasename: '/',
      servedFromSubpath: '/front-end/',
      usesVitePreviewAsProduction: true,
    })

    expect(findings.map((finding) => finding.message)).toEqual(
      expect.arrayContaining([
        'vite preview is a local build preview, not a production server.',
        'BrowserRouter deep links need a host rewrite to index.html.',
        'BrowserRouter basename should match the app route subpath.',
      ]),
    )
  })

  test('marks HashRouter as a deployment workaround boundary', () => {
    const findings = analyzeSpaDeployment({
      routerMode: 'hash',
      hostHasRewrite: false,
      viteBase: '/',
      browserRouterBasename: '/',
      servedFromSubpath: '/',
      usesVitePreviewAsProduction: false,
    })

    expect(findings).toContainEqual({
      level: 'boundary',
      message: 'HashRouter avoids host rewrites by keeping the route after #.',
    })
  })

  test('creates a GitHub Pages subpath example', () => {
    expect(createGitHubPagesDeploymentExample('front-end').viteBase).toBe('/front-end/')
  })
})
