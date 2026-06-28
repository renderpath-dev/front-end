import { useState } from 'react'
import { PrimitiveButton } from '../sellerhub-capstone-app/design-system/primitive-button'
import {
  emptyCheckoutValues,
  validateCheckoutValues,
} from '../sellerhub-capstone-app/features/checkout/checkout-model'

export function CheckoutWorkflowPanel() {
  const [validationCount, setValidationCount] = useState(0)

  return (
    <section className="chapter16-panel" aria-labelledby="checkout-workflow-title">
      <p className="chapter16-eyebrow">9.9 Checkout workflow</p>
      <h2 id="checkout-workflow-title">Treat validation and submission as separate phases</h2>
      <p>{validationCount} validation errors in the empty form snapshot.</p>
      <PrimitiveButton
        onClick={() =>
          setValidationCount(Object.keys(validateCheckoutValues(emptyCheckoutValues)).length)
        }
      >
        Validate snapshot
      </PrimitiveButton>
    </section>
  )
}
