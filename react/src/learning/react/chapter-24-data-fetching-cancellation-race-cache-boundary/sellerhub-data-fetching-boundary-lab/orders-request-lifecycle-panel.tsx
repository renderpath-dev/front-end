import { useMemo, useReducer } from 'react'
import { initialOrdersResourceState, reduceOrdersResourceState } from './orders-resource-reducer'
import { createSellerHubDemoApiClient } from './sellerhub-demo-api-client'
import { AsyncStatusRegion } from './async-status-region'

export function OrdersRequestLifecyclePanel() {
  const client = useMemo(() => createSellerHubDemoApiClient(), [])
  const [state, dispatch] = useReducer(
    reduceOrdersResourceState,
    initialOrdersResourceState,
  )

  function loadOrders(): void {
    const requestId = `orders:${Date.now()}`
    const controller = new AbortController()
    dispatch({ requestId, type: 'start' })

    void client.getOrdersResource(controller.signal).then((orders) => {
      dispatch({ data: orders, requestId, type: 'resolve' })
    })
  }

  return (
    <section className="data-fetching-card" aria-labelledby="orders-lifecycle-title">
      <h3 id="orders-lifecycle-title">Orders request lifecycle panel</h3>
      <p>
        This panel keeps request lifecycle state separate from the last confirmed orders
        array.
      </p>
      <button onClick={loadOrders} type="button">
        Load orders
      </button>
      <AsyncStatusRegion label="Orders request" state={state} />
      {state.status === 'success' ? (
        <ul>
          {state.data.map((order) => (
            <li key={order.id}>
              {order.customer} - {order.status}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
