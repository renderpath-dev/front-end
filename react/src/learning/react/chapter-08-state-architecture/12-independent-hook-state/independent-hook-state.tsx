import { useState } from 'react'

function useQuantity(initialQuantity: number) {
  const [quantity, setQuantity] = useState(initialQuantity)

  return {
    quantity,
    increase: () => setQuantity((current) => current + 1),
  }
}

function QuantityControl({ label }: { label: string }) {
  const control = useQuantity(0)

  return (
    <button onClick={control.increase}>
      {label}: {control.quantity}
    </button>
  )
}

export function IndependentHookState() {
  return (
    <article className="practice-card">
      <p className="practice-label">Hook call identity</p>
      <h3>Each hook call owns independent state</h3>
      <div className="practice-stack">
        <QuantityControl label="Cart A" />
        <QuantityControl label="Cart B" />
      </div>
    </article>
  )
}
