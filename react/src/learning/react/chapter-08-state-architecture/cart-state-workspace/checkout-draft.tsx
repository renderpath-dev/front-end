import { useState } from 'react'
import { useCartState } from './use-cart-state'

type CheckoutDraftProps = {
  sessionId: number
}

export function CheckoutDraft({ sessionId }: CheckoutDraftProps) {
  const [deliveryNote, setDeliveryNote] = useState('')
  const { items } = useCartState()

  return (
    <section className="checkout-draft" aria-labelledby="checkout-draft-title">
      <div>
        <p className="project-eyebrow">Keyed local state</p>
        <h3 id="checkout-draft-title">Checkout draft #{sessionId}</h3>
      </div>
      <label>
        Delivery note
        <textarea
          value={deliveryNote}
          onChange={(event) => setDeliveryNote(event.target.value)}
          placeholder="Add delivery instructions"
        />
      </label>
      <p>{items.length} product lines are available to this checkout draft.</p>
    </section>
  )
}
