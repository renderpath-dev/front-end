import { Link } from 'react-router'
import { useSellerHubApp } from '../../app/sellerhub-app-state'
import { PrimitiveButton } from '../../design-system/primitive-button'
import { formatCurrency } from '../../shared/i18n/formatters'
import { sellerHubMessages } from '../../shared/i18n/messages'
import { deriveCartSummary } from './cart-model'

export function CartPanel() {
  const { cart, cartDispatch, locale } = useSellerHubApp()
  const summary = deriveCartSummary(cart)

  return (
    <section aria-labelledby="sellerhub-cart-title">
      <div className="sellerhub-section-heading">
        <div>
          <p className="sellerhub-eyebrow">Reducer state</p>
          <h2 id="sellerhub-cart-title">{sellerHubMessages[locale].cartTitle}</h2>
        </div>
        <p>{summary.itemCount} items</p>
      </div>

      {cart.lines.length === 0 ? (
        <div className="sellerhub-route-state">
          <h3>Your cart is empty</h3>
          <Link to="/react/chapter-16/catalog">Browse the catalog</Link>
        </div>
      ) : (
        <>
          <ul className="sellerhub-cart-list">
            {cart.lines.map((line) => (
              <li key={line.productId}>
                <div>
                  <strong>{line.name}</strong>
                  <span>{formatCurrency(line.unitPriceInCents, locale)} each</span>
                </div>
                <label>
                  Quantity
                  <input
                    aria-label={`Quantity for ${line.name}`}
                    min="1"
                    onChange={(event) =>
                      cartDispatch({
                        type: 'quantity-updated',
                        productId: line.productId,
                        quantity: Number(event.target.value),
                      })
                    }
                    type="number"
                    value={line.quantity}
                  />
                </label>
                <PrimitiveButton
                  onClick={() =>
                    cartDispatch({
                      type: 'product-removed',
                      productId: line.productId,
                    })
                  }
                  tone="danger"
                >
                  Remove
                </PrimitiveButton>
              </li>
            ))}
          </ul>
          <div className="sellerhub-cart-summary">
            <span>Subtotal</span>
            <strong>{formatCurrency(summary.subtotalInCents, locale)}</strong>
            <Link className="sellerhub-primary-link" to="/react/chapter-16/checkout">
              Continue to checkout
            </Link>
          </div>
        </>
      )}
    </section>
  )
}
