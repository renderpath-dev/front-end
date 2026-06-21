import type { CartItem } from './cart-types'

type CartSummaryProps = {
  items: CartItem[]
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function CartSummary({ items }: CartSummaryProps) {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const merchandiseTotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  return (
    <aside className="cart-summary" aria-labelledby="cart-summary-heading">
      <p className="cart-label">Derived state</p>
      <h3 id="cart-summary-heading">Order summary</h3>
      <dl>
        <div>
          <dt>Units</dt>
          <dd>{itemCount}</dd>
        </div>
        <div>
          <dt>Merchandise</dt>
          <dd>{currencyFormatter.format(merchandiseTotal)}</dd>
        </div>
        <div className="summary-total">
          <dt>Total</dt>
          <dd>{currencyFormatter.format(merchandiseTotal)}</dd>
        </div>
      </dl>
      <p className="summary-note">
        Totals are calculated during render instead of stored as duplicate state.
      </p>
    </aside>
  )
}
