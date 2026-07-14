import { describe, expect, it } from 'vitest'
import {
  createInitialRequestState,
  reduceRequestState,
} from '../04-request-lifecycle/request-state-reducer'

describe('request state reducer', () => {
  it('transitions through pending and success', () => {
    const pendingState = reduceRequestState(createInitialRequestState<string[]>(), {
      requestId: 'catalog:1',
      type: 'start',
    })
    const successState = reduceRequestState(pendingState, {
      data: ['Desk Lamp Pro'],
      requestId: 'catalog:1',
      type: 'resolve',
    })

    expect(pendingState.status).toBe('pending')
    expect(successState.status).toBe('success')
    expect(successState.lastSuccessfulData).toEqual(['Desk Lamp Pro'])
  })

  it('keeps last successful data during refetching and stale errors', () => {
    const successState = reduceRequestState(
      reduceRequestState(createInitialRequestState<string[]>(), {
        requestId: 'catalog:1',
        type: 'start',
      }),
      {
        data: ['Desk Lamp Pro'],
        requestId: 'catalog:1',
        type: 'resolve',
      },
    )
    const refetchingState = reduceRequestState(successState, {
      requestId: 'catalog:2',
      type: 'start',
    })
    const ignoredState = reduceRequestState(refetchingState, {
      error: { message: 'Stale', reason: 'network' },
      requestId: 'catalog:1',
      type: 'reject',
    })

    expect(refetchingState.status).toBe('refetching')
    expect(ignoredState).toBe(refetchingState)
  })
})
