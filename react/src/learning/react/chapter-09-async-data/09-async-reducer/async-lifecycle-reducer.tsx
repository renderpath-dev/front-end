import { useReducer } from 'react'

type AsyncOrdersState =
  | { status: 'idle'; orders: string[] }
  | { status: 'pending'; orders: string[] }
  | { status: 'success'; orders: string[] }
  | { status: 'empty'; orders: string[] }
  | { status: 'error'; orders: string[]; message: string }

type AsyncOrdersAction =
  | { type: 'request_started' }
  | { type: 'request_succeeded'; orders: string[] }
  | { type: 'request_failed'; message: string }

function ordersReducer(state: AsyncOrdersState, action: AsyncOrdersAction): AsyncOrdersState {
  switch (action.type) {
    case 'request_started':
      return { status: 'pending', orders: state.orders }
    case 'request_succeeded':
      return action.orders.length === 0
        ? { status: 'empty', orders: [] }
        : { status: 'success', orders: action.orders }
    case 'request_failed':
      return { status: 'error', orders: state.orders, message: action.message }
  }
}

function requestOrders(shouldFail: boolean): Promise<string[]> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Order request failed'))
        return
      }
      resolve(['ORD-901', 'ORD-902'])
    }, 450)
  })
}

export function AsyncLifecycleReducer() {
  const [state, dispatch] = useReducer(ordersReducer, { status: 'idle', orders: [] })

  async function handleRequest(shouldFail: boolean) {
    dispatch({ type: 'request_started' })

    try {
      const orders = await requestOrders(shouldFail)
      dispatch({ type: 'request_succeeded', orders })
    } catch (error: unknown) {
      dispatch({
        type: 'request_failed',
        message: error instanceof Error ? error.message : 'Unknown order error',
      })
    }
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Async reducer</p>
      <h3>Centralize lifecycle transitions</h3>
      <div className="practice-actions">
        <button type="button" onClick={() => handleRequest(false)}>Load orders</button>
        <button type="button" onClick={() => handleRequest(true)}>Fail request</button>
      </div>
      <p>Status: {state.status}</p>
      <p>{state.orders.join(', ') || 'No retained orders'}</p>
    </article>
  )
}
