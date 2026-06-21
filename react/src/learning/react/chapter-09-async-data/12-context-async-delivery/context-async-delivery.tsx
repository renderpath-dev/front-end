import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type DeliveryState =
  | { status: 'idle'; orders: string[] }
  | { status: 'pending'; orders: string[] }
  | { status: 'success'; orders: string[] }
  | { status: 'error'; orders: string[]; message: string }

type DeliveryContextValue = {
  state: DeliveryState
  refresh: () => void
}

const DeliveryContext = createContext<DeliveryContextValue | null>(null)

function useDeliveryContext() {
  const value = useContext(DeliveryContext)
  if (value === null) throw new Error('useDeliveryContext must be used within DeliveryProvider')
  return value
}

function requestOrders(): Promise<string[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(['ORD-1201', 'ORD-1202']), 450)
  })
}

function DeliveryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DeliveryState>({ status: 'idle', orders: [] })

  async function refresh() {
    setState((current) => ({ status: 'pending', orders: current.orders }))

    try {
      const orders = await requestOrders()
      setState({ status: 'success', orders })
    } catch (error: unknown) {
      setState((current) => ({
        status: 'error',
        orders: current.orders,
        message: error instanceof Error ? error.message : 'Unknown delivery error',
      }))
    }
  }

  return <DeliveryContext value={{ state, refresh }}>{children}</DeliveryContext>
}

function DeepOrderStatus() {
  const { state, refresh } = useDeliveryContext()

  return (
    <div>
      <button type="button" onClick={refresh}>Refresh deep order data</button>
      <p>{state.status}: {state.orders.join(', ') || 'no orders'}</p>
    </div>
  )
}

export function ContextAsyncDelivery() {
  return (
    <article className="practice-card">
      <p className="practice-label">Context delivery</p>
      <h3>Deliver async state without hiding ownership</h3>
      <DeliveryProvider>
        <section>
          <DeepOrderStatus />
        </section>
      </DeliveryProvider>
    </article>
  )
}
