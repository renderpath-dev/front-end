import { describe, expect, it } from 'vitest'
import { evaluateFeatureFlagRelease } from '../15-rollback-feature-flag/feature-flag-model'

describe('feature flag model', () => {
  it('requires fallback and disable path', () => {
    const incomplete = evaluateFeatureFlagRelease({
      defaultEnabled: false,
      flagKey: 'sellerhub.releaseEvidenceLab',
      owner: 'release owner',
    })
    const ready = evaluateFeatureFlagRelease({
      defaultEnabled: false,
      disablePath: 'set flag false',
      fallbackRoute: '/react/chapter-24',
      flagKey: 'sellerhub.releaseEvidenceLab',
      owner: 'release owner',
    })

    expect(incomplete.readyForRelease).toBe(false)
    expect(incomplete.requiredActions).toHaveLength(2)
    expect(ready.readyForRelease).toBe(true)
  })
})
