import { describe, expect, it } from 'vitest'
import { createRequestSequenceGuard } from '../06-race-conditions/request-sequence-guard'

describe('request sequence guard', () => {
  it('only allows the latest request to commit', () => {
    const guard = createRequestSequenceGuard()
    const firstRequestId = guard.startRequest()
    const secondRequestId = guard.startRequest()

    expect(guard.completeIfLatest(firstRequestId, 'first')).toBeNull()
    expect(guard.completeIfLatest(secondRequestId, 'second')).toBe('second')
  })
})
