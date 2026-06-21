import { useState } from 'react'
import { CartItemRow } from './cart-item-row'
import { CartStateProvider } from './cart-state-provider'
import { CartSummary } from './cart-summary'
import { CheckoutDraft } from './checkout-draft'
import { useCartState } from './use-cart-state'
import './cart-state-workspace.css'

function CartWorkspaceContent() {
  const { items } = useCartState()
  const [checkoutSessionId, setCheckoutSessionId] = useState(1)

  return (
    <section className="cart-workspace" aria-labelledby="cart-workspace-title">
      <header className="cart-workspace-header">
        <div>
          <p className="project-eyebrow">Final mini project</p>
          <h2 id="cart-workspace-title">Cart State Workspace</h2>
          <p>
            One reducer owns source state while descendants read and dispatch through typed
            context hooks.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCheckoutSessionId((current) => current + 1)}
        >
          Reset checkout draft
        </button>
      </header>

      <div className="cart-workspace-grid">
        <div className="cart-item-list">
          {items.length > 0 ? (
            items.map((item) => <CartItemRow key={item.id} item={item} />)
          ) : (
            <p className="empty-cart-message">The sample cart is empty.</p>
          )}
        </div>
        <CartSummary />
      </div>

      <CheckoutDraft key={checkoutSessionId} sessionId={checkoutSessionId} />
    </section>
  )
}

export function CartStateWorkspace() {
  return (
    <CartStateProvider>
      <CartWorkspaceContent />
    </CartStateProvider>
  )
}
