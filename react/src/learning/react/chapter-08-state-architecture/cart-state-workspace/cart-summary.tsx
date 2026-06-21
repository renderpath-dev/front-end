import { useCartDispatch, useCartState } from './use-cart-state'

export function CartSummary() {
  const { items } = useCartState()
  const dispatch = useCartDispatch()
  const totalCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  )

  return (
    <aside className="cart-summary" aria-labelledby="cart-summary-title">
      <p className="project-eyebrow">Derived during render</p>
      <h3 id="cart-summary-title">Cart summary</h3>
      <dl>
        <div>
          <dt>Total items</dt>
          <dd>{totalCount}</dd>
        </div>
        <div>
          <dt>Subtotal</dt>
          <dd>${subtotal.toFixed(2)}</dd>
        </div>
      </dl>
      <div className="summary-actions">
        <button type="button" onClick={() => dispatch({ type: 'cart_cleared' })}>
          Clear cart
        </button>
        <button type="button" onClick={() => dispatch({ type: 'cart_reset' })}>
          Restore sample cart
        </button>
      </div>
    </aside>
  )
}
