import { useReducer } from 'react'
import { PrimitiveButton } from '../sellerhub-capstone-app/design-system/primitive-button'
import {
  cartReducer,
  deriveCartSummary,
  emptyCartState,
} from '../sellerhub-capstone-app/features/cart/cart-model'

export function CartReducerPersistencePanel() {
  const [cart, dispatch] = useReducer(cartReducer, emptyCartState)
  const summary = deriveCartSummary(cart)

  return (
    <section className="chapter16-panel" aria-labelledby="cart-reducer-title">
      <p className="chapter16-eyebrow">9.8 Cart reducer and persistence</p>
      <h2 id="cart-reducer-title">Separate transitions, derivation, and browser storage</h2>
      <p>
        Snapshot: {summary.itemCount} items, {summary.subtotalInCents} cents
      </p>
      <div className="chapter16-actions">
        <PrimitiveButton
          onClick={() =>
            dispatch({
              type: 'product-added',
              line: {
                productId: 'evidence-lamp',
                name: 'Evidence Lamp',
                unitPriceInCents: 5200,
              },
            })
          }
        >
          Dispatch product-added
        </PrimitiveButton>
        <PrimitiveButton
          onClick={() => dispatch({ type: 'cart-cleared' })}
          tone="secondary"
        >
          Clear snapshot
        </PrimitiveButton>
      </div>
    </section>
  )
}
