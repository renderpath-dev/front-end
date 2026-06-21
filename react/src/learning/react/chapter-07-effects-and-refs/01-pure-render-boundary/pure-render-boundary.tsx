import { useState } from 'react'

export function PureRenderBoundary() {
  const [quantity, setQuantity] = useState(2)
  const unitPrice = 48
  const totalPrice = quantity * unitPrice

  return (
    <section className="practice-card">
      <p className="practice-label">Pure render</p>
      <h3>Calculate UI without a side effect</h3>
      <p>
        {quantity} items at ${unitPrice} produce a render-time total of ${totalPrice}.
      </p>
      <button onClick={() => setQuantity((currentQuantity) => currentQuantity + 1)}>
        Add one item
      </button>
    </section>
  )
}
