import { describe, expect, test } from 'vitest'
import {
  initialOrdersRequestState,
  ordersRequestReducer,
} from '../sellerhub-state-boundary-lab/orders-request-reducer'
import { sellerHubOrders } from '../sellerhub-state-boundary-lab/sellerhub-state-boundary-data'

describe('ordersRequestReducer', () => {
  test('models pending and success without impossible boolean combinations', () => {
    const pendingState = ordersRequestReducer(initialOrdersRequestState, { type: 'start' })
    const successState = ordersRequestReducer(pendingState, {
      type: 'resolve',
      data: sellerHubOrders,
    })

    expect(pendingState).toEqual({ status: 'pending' })
    expect(successState).toEqual({ status: 'success', data: sellerHubOrders })
  })

  test('keeps last successful data as previous data during a refetch failure', () => {
    const successState = ordersRequestReducer(initialOrdersRequestState, {
      type: 'resolve',
      data: sellerHubOrders,
    })
    const refetchingState = ordersRequestReducer(successState, { type: 'start' })
    const errorState = ordersRequestReducer(refetchingState, {
      type: 'reject',
      message: 'Network error',
    })

    expect(refetchingState).toEqual({ status: 'refetching', data: sellerHubOrders })
    expect(errorState).toEqual({
      status: 'error',
      message: 'Network error',
      previousData: sellerHubOrders,
    })
  })

  test('represents empty results as a distinct state', () => {
    const emptyState = ordersRequestReducer({ status: 'pending' }, { type: 'resolve-empty' })

    expect(emptyState).toEqual({ status: 'empty' })
    expect('data' in emptyState).toBe(false)
  })
})
