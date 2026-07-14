import { describe, expect, it } from 'vitest'
import { evaluateReleaseGate } from '../14-release-gates/release-gate-model'

describe('release gate model', () => {
  it('treats UNKNOWN as not PASS', () => {
    const result = evaluateReleaseGate([
      { evidence: 'done', name: 'lint', status: 'PASS' },
      { evidence: 'not checked', name: 'preview smoke', status: 'UNKNOWN' },
    ])

    expect(result.status).toBe('UNKNOWN')
    expect(result.ready).toBe(false)
    expect(result.blockingChecks).toHaveLength(1)
  })
})
