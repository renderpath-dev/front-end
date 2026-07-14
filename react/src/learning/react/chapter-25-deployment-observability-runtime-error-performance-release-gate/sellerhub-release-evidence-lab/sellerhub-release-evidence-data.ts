import type { BuildAsset } from '../02-build-artifact/build-artifact-model'
import type { RuntimeConfigInput } from '../03-runtime-config/runtime-config-model'
import type { RuntimeDiagnosticEvent } from '../04-runtime-errors/runtime-error-model'
import { normalizeErrorBoundaryLog } from '../04-runtime-errors/runtime-error-model'
import type { RouteChunkInput } from '../10-bundle-chunk-review/chunk-review-model'
import type { RequestDiagnosticInput } from '../11-async-observability/request-observability-model'
import type { ReleaseGateCheck } from '../14-release-gates/release-gate-model'
import type { FeatureFlagReleaseInput } from '../15-rollback-feature-flag/feature-flag-model'
import type { IncidentTriageRecord } from '../16-incident-triage/incident-triage-model'

export const chapter25ReleaseId = 'sellerhub-2026.07.14T0800Z'

export const sellerHubBuildAssets: BuildAsset[] = [
  {
    fileName: 'assets/index-Cd8a19q.js',
    hashed: true,
    kind: 'entry',
    sizeKb: 86,
  },
  {
    fileName: 'assets/chapter-25-release-lab-Dm42a9.js',
    hashed: true,
    kind: 'route-chunk',
    route: '/react/chapter-25',
    sizeKb: 42,
  },
  {
    fileName: 'assets/sellerhub-dashboard-Bp17fd.js',
    hashed: true,
    kind: 'route-chunk',
    route: '/react/chapter-16/dashboard',
    sizeKb: 126,
  },
]

export const sellerHubRuntimeConfig: RuntimeConfigInput = {
  appVersion: '25.0.0-lab',
  baseUrl: '/',
  buildId: chapter25ReleaseId,
  environment: 'preview',
  featureFlags: [
    { defaultEnabled: false, key: 'sellerhub.releaseEvidenceLab' },
    { defaultEnabled: false, key: 'sellerhub.dashboardMetricsV2' },
  ],
  publicConfig: {
    VITE_APP_VERSION: '25.0.0-lab',
    VITE_RELEASE_CHANNEL: 'learning-preview',
    VITE_RELEASE_ID: chapter25ReleaseId,
  },
}

export const sellerHubRuntimeDiagnostic: RuntimeDiagnosticEvent =
  normalizeErrorBoundaryLog({
    componentStack: 'in SellerHubDashboard\nin SellerHubShell',
    correlationId: 'corr-release-25-001',
    error: new Error('Dashboard metric calculation failed'),
    releaseId: chapter25ReleaseId,
    route: '/react/chapter-25',
  })

export const sellerHubRouteChunks: RouteChunkInput[] = [
  {
    ownerRoute: '/react/chapter-25',
    sizeKb: 42,
    url: '/assets/chapter-25-release-lab-Dm42a9.js',
  },
  {
    ownerRoute: '/react/chapter-16/dashboard',
    sizeKb: 126,
    url: '/assets/sellerhub-dashboard-Bp17fd.js',
  },
  {
    sizeKb: 230,
    url: '/assets/unowned-reporting-vendor-Cb87da.js',
  },
]

export const sellerHubRequestDiagnostics: RequestDiagnosticInput[] = [
  {
    payload: { filter: 'open', userEmail: 'seller@example.com' },
    requestId: 'orders:release-25:001',
    resourceKey: 'sellerhub:orders?status=open',
    route: '/react/chapter-25',
    status: 'success',
  },
  {
    requestId: 'dashboard:release-25:002',
    resourceKey: 'sellerhub:dashboard:metrics',
    route: '/react/chapter-25',
    status: 'cache-hit',
  },
]

export const sellerHubReleaseGateChecks: ReleaseGateCheck[] = [
  { evidence: 'eslint completed', name: 'lint', status: 'PASS' },
  { evidence: 'tsc project build completed', name: 'typecheck', status: 'PASS' },
  { evidence: 'vitest model and integration tests completed', name: 'test', status: 'PASS' },
  { evidence: 'vite build completed', name: 'build', status: 'PASS' },
  { evidence: 'manual preview smoke must be repeated before deploy', name: 'preview smoke', status: 'UNKNOWN' },
]

export const sellerHubFeatureFlag: FeatureFlagReleaseInput = {
  defaultEnabled: false,
  disablePath: 'Set sellerhub.releaseEvidenceLab to false and redeploy config.',
  fallbackRoute: '/react/chapter-24',
  flagKey: 'sellerhub.releaseEvidenceLab',
  owner: 'SellerHub release owner',
}

export const sellerHubIncidentRecord: IncidentTriageRecord = {
  affectedRoute: '/react/chapter-25',
  affectedVersion: '25.0.0-lab',
  evidence: [
    'corr-release-25-001',
    'Error Boundary componentStack',
    'route-ready measure 84ms',
  ],
  mitigation: 'Disable the release evidence lab flag and route users to stable learning home.',
  reproductionPath: 'Open /react/chapter-25 and run the dashboard metric simulator.',
  scope: 'Learning lab route only',
  symptom: 'Dashboard metric panel falls back after render-time calculation failure.',
}

export const sellerHubReadinessRows = [
  {
    evidence: 'Build artifact has hashed entry and route chunks.',
    owner: 'build',
    scenario: 'catalog route smoke',
    status: 'ready',
  },
  {
    evidence: 'Runtime config has release id and public flags only.',
    owner: 'runtime config',
    scenario: 'public env review',
    status: 'ready',
  },
  {
    evidence: 'Preview smoke is marked UNKNOWN until a human checks the built app.',
    owner: 'release gate',
    scenario: 'route smoke',
    status: 'needs-review',
  },
]
