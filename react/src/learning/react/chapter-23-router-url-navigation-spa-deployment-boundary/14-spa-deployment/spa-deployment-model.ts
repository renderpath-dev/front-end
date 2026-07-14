export type RouterMode = 'browser' | 'hash'

export type SpaDeploymentInput = {
  routerMode: RouterMode
  hostHasRewrite: boolean
  viteBase: string
  browserRouterBasename: string
  servedFromSubpath: string
  usesVitePreviewAsProduction: boolean
}

export type SpaDeploymentFinding = {
  level: 'ok' | 'warning' | 'boundary'
  message: string
}

export function analyzeSpaDeployment(input: SpaDeploymentInput): SpaDeploymentFinding[] {
  const findings: SpaDeploymentFinding[] = []

  if (input.usesVitePreviewAsProduction) {
    findings.push({
      level: 'warning',
      message: 'vite preview is a local build preview, not a production server.',
    })
  }

  if (input.routerMode === 'browser' && !input.hostHasRewrite) {
    findings.push({
      level: 'warning',
      message: 'BrowserRouter deep links need a host rewrite to index.html.',
    })
  }

  if (input.routerMode === 'hash') {
    findings.push({
      level: 'boundary',
      message: 'HashRouter avoids host rewrites by keeping the route after #.',
    })
  }

  if (input.servedFromSubpath !== input.viteBase) {
    findings.push({
      level: 'warning',
      message: 'Vite base should match the public asset base path.',
    })
  }

  if (input.routerMode === 'browser' && input.browserRouterBasename !== input.servedFromSubpath) {
    findings.push({
      level: 'warning',
      message: 'BrowserRouter basename should match the app route subpath.',
    })
  }

  if (findings.length === 0) {
    findings.push({
      level: 'ok',
      message: 'BrowserRouter, Vite base, basename, and host rewrite boundaries align.',
    })
  }

  return findings
}

export function createGitHubPagesDeploymentExample(repositoryName: string): SpaDeploymentInput {
  const subpath = `/${repositoryName}/`

  return {
    routerMode: 'browser',
    hostHasRewrite: false,
    viteBase: subpath,
    browserRouterBasename: subpath,
    servedFromSubpath: subpath,
    usesVitePreviewAsProduction: false,
  }
}
