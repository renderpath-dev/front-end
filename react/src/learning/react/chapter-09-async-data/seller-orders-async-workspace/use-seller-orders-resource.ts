import { useEffect, useReducer, useState } from 'react'
import { parseSellerOrdersResponse } from './seller-order-response-guard'
import { requestSellerOrders } from './seller-order-request'
import type { SellerOrderCriteria, SellerOrdersResource } from './seller-order-types'
import { initialSellerOrdersState, sellerOrdersReducer } from './seller-orders-reducer'

export function useSellerOrdersResource(): SellerOrdersResource {
  const [criteria, setCriteriaState] = useState<SellerOrderCriteria>('all')
  const [requestVersion, setRequestVersion] = useState(0)
  const [state, dispatch] = useReducer(sellerOrdersReducer, initialSellerOrdersState)

  useEffect(() => {
    const controller = new AbortController()
    let ignore = false

    requestSellerOrders(criteria, controller.signal)
      .then((body) => parseSellerOrdersResponse(body))
      .then((orders) => {
        if (!ignore) dispatch({ type: 'request_succeeded', orders })
      })
      .catch((error: unknown) => {
        if (ignore || (error instanceof DOMException && error.name === 'AbortError')) return
        dispatch({
          type: 'request_failed',
          message: error instanceof Error ? error.message : 'Unknown seller orders error',
        })
      })

    return () => {
      ignore = true
      controller.abort()
    }
  }, [criteria, requestVersion])

  function setCriteria(nextCriteria: SellerOrderCriteria) {
    dispatch({ type: 'request_started' })
    setCriteriaState(nextCriteria)
  }

  function retry() {
    dispatch({ type: 'request_started' })
    setRequestVersion((current) => current + 1)
  }

  return { criteria, state, setCriteria, retry }
}
