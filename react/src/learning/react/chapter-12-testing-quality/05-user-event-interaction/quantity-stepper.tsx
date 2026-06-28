import { useState } from 'react'
import type { ChangeEvent } from 'react'

type QuantityStepperProps = {
  initialQuantity?: number
  maxQuantity?: number
}

export function QuantityStepper({
  initialQuantity = 1,
  maxQuantity = 5,
}: QuantityStepperProps) {
  const [quantityText, setQuantityText] = useState(String(initialQuantity))
  const quantity = parseQuantityText(quantityText)

  function decreaseQuantity(): void {
    setQuantityText((currentQuantityText) =>
      String(Math.max(1, parseQuantityText(currentQuantityText) - 1)),
    )
  }

  function increaseQuantity(): void {
    setQuantityText((currentQuantityText) =>
      String(Math.min(maxQuantity, parseQuantityText(currentQuantityText) + 1)),
    )
  }

  function handleQuantityInput(event: ChangeEvent<HTMLInputElement>): void {
    const nextQuantityText = event.currentTarget.value

    if (nextQuantityText === '') {
      setQuantityText('')
      return
    }

    const nextQuantity = Number(nextQuantityText)

    if (Number.isInteger(nextQuantity) && nextQuantity > 0) {
      setQuantityText(String(Math.min(maxQuantity, nextQuantity)))
    }
  }

  return (
    <section className="practice-panel" aria-labelledby="quantity-stepper-title">
      <p className="skill-pill">user-event</p>
      <h2 id="quantity-stepper-title">Cart quantity</h2>
      <div className="quantity-control">
        <button onClick={decreaseQuantity} type="button">
          Decrease quantity
        </button>
        <label className="field-label" htmlFor="cart-quantity">
          Quantity
        </label>
        <input
          className="text-input"
          id="cart-quantity"
          inputMode="numeric"
          onChange={handleQuantityInput}
          value={quantityText}
        />
        <button onClick={increaseQuantity} type="button">
          Increase quantity
        </button>
      </div>
      <p aria-live="polite">Current quantity: {quantity}</p>
    </section>
  )
}

function parseQuantityText(quantityText: string): number {
  const quantity = Number(quantityText)
  return Number.isInteger(quantity) && quantity > 0 ? quantity : 1
}
