import { useState } from 'react'

type SelectionIntent =
  | { type: 'order_selected'; orderId: string }
  | { type: 'selection_cleared' }

type OrderSelectorProps = {
  onIntent: (intent: SelectionIntent) => void
}

function OrderSelector({ onIntent }: OrderSelectorProps) {
  return (
    <div className="practice-stack">
      <button onClick={() => onIntent({ type: 'order_selected', orderId: 'ORD-204' })}>
        Select ORD-204
      </button>
      <button onClick={() => onIntent({ type: 'selection_cleared' })}>Clear</button>
    </div>
  )
}

export function CallbackIntentBoundary() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  function handleIntent(intent: SelectionIntent) {
    if (intent.type === 'order_selected') {
      setSelectedOrderId(intent.orderId)
      return
    }

    setSelectedOrderId(null)
  }

  return (
    <article className="practice-card">
      <p className="practice-label">Callback intent</p>
      <h3>Children report what happened</h3>
      <OrderSelector onIntent={handleIntent} />
      <p>Selection: {selectedOrderId ?? 'none'}</p>
    </article>
  )
}
