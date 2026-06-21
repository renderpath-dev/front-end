import { useState } from 'react'

type SortableOrder = {
  id: string
  label: string
}

const initialOrders: SortableOrder[] = [
  { id: 'order-401', label: 'Order 401' },
  { id: 'order-402', label: 'Order 402' },
  { id: 'order-403', label: 'Order 403' },
]

function EditableOrderRow({ order }: { order: SortableOrder }) {
  const [note, setNote] = useState('')

  return (
    <li className="identity-row">
      <label>
        <span>{order.label}</span>
        <input
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Type an order note"
        />
      </label>
    </li>
  )
}

export function IndexKeyMistake() {
  const [orders, setOrders] = useState(initialOrders)

  function handleReverse() {
    setOrders((currentOrders) => [...currentOrders].reverse())
  }

  function handleRemoveFirst() {
    setOrders((currentOrders) => currentOrders.slice(1))
  }

  function handleReset() {
    setOrders(initialOrders.map((order) => ({ ...order })))
  }

  return (
    <article className="practice-panel practice-panel-wide">
      <p className="practice-kicker">06 · Index key mistake</p>
      <h2>Position identity breaks when order changes</h2>
      <p>Enter different notes in both lists, then reverse or remove the first order.</p>
      <div className="practice-actions">
        <button type="button" onClick={handleReverse}>
          Reverse
        </button>
        <button type="button" onClick={handleRemoveFirst} disabled={orders.length === 0}>
          Remove first
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="identity-comparison">
        <section>
          <h3>Index key</h3>
          <p>Notes follow positions after a reorder.</p>
          <ul className="identity-list">
            {orders.map((order, index) => (
              <EditableOrderRow key={index} order={order} />
            ))}
          </ul>
        </section>
        <section>
          <h3>Stable ID key</h3>
          <p>Notes stay attached to order IDs.</p>
          <ul className="identity-list">
            {orders.map((order) => (
              <EditableOrderRow key={order.id} order={order} />
            ))}
          </ul>
        </section>
      </div>
    </article>
  )
}
