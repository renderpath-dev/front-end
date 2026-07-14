import { describe, expect, it } from 'vitest'
import {
  createRuntimeConfigSnapshot,
  findPublicClientConfigIssues,
  isRuntimeConfigReleaseReady,
} from '../03-runtime-config/runtime-config-model'

describe('runtime config model', () => {
  it('rejects secrets in public client config', () => {
    const issues = findPublicClientConfigIssues({
      VITE_API_TOKEN: 'sk-secret',
      VITE_RELEASE_ID: 'release-25',
    })

    expect(issues).toEqual([
      'VITE_API_TOKEN looks like a secret-bearing public config key.',
      'VITE_API_TOKEN contains a value that looks secret-like.',
    ])
  })

  it('creates a release config snapshot', () => {
    const snapshot = createRuntimeConfigSnapshot({
      appVersion: '25.0.0',
      baseUrl: '/',
      buildId: 'release-25',
      environment: 'preview',
      featureFlags: [{ defaultEnabled: false, key: 'sellerhub.releaseEvidenceLab' }],
      publicConfig: { VITE_RELEASE_ID: 'release-25' },
    })

    expect(snapshot.featureFlagKeys).toEqual(['sellerhub.releaseEvidenceLab'])
    expect(isRuntimeConfigReleaseReady({
      appVersion: '25.0.0',
      baseUrl: '/',
      buildId: 'release-25',
      environment: 'preview',
      featureFlags: [],
      publicConfig: { VITE_RELEASE_ID: 'release-25' },
    })).toBe(true)
  })
})
