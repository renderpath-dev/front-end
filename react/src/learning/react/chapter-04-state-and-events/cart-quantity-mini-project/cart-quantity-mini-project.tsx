import { useState } from 'react'
import { CartItemRow } from './cart-item-row'
import { cartSeedItems } from './cart-seed-data'
import { CartSummary } from './cart-summary'
import type { CartItem } from './cart-types'
import './cart-quantity-mini-project.css'

function createInitialCartItems() {
  return cartSeedItems.map((item) => ({
    ...item,
    product: { ...item.product },
  }))
}

export function CartQuantityMiniProject() {
  const [cartItems, setCartItems] = useState<CartItem[]>(createInitialCartItems)
  const [lastAction, setLastAction] = useState('No quantity update has been queued.')

  function handleIncrement(productId: string) {
    const snapshotItem = cartItems.find((item) => item.product.id === productId)

    if (snapshotItem) {
      setLastAction(
        `Event snapshot: ${snapshotItem.product.name} quantity was ${snapshotItem.quantity}.`,
      )
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, item.product.stock),
            }
          : item,
      ),
    )
  }

  function handleDecrement(productId: string) {
    const snapshotItem = cartItems.find((item) => item.product.id === productId)

    if (snapshotItem) {
      setLastAction(
        `Event snapshot: ${snapshotItem.product.name} quantity was ${snapshotItem.quantity}.`,
      )
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.max(item.quantity - 1, 1),
            }
          : item,
      ),
    )
  }

  function handleRemove(productId: string) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    )
    setLastAction('The array update returned a filtered cart.')
  }

  function handleReset() {
    setCartItems(createInitialCartItems())
    setLastAction('The cart was replaced with a fresh seed array.')
  }

  return (
    <div className="cart-project-shell">
      <div className="cart-project-header">
        <div>
          <p className="cart-label">SellerHub learning connection</p>
          <h2>Cart Quantity Panel</h2>
          <p>
            Quantity is state. Subtotals and the order total are derived during each
            render.
          </p>
        </div>
        <button className="reset-cart-button" onClick={handleReset} type="button">
          Reset cart
        </button>
      </div>

      <p className="snapshot-status" aria-live="polite">
        {lastAction}
      </p>

      <div className="cart-layout">
        <div className="cart-items" aria-label="Cart items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItemRow
                item={item}
                key={item.product.id}
                onDecrement={handleDecrement}
                onIncrement={handleIncrement}
                onRemove={handleRemove}
              />
            ))
          ) : (
            <div className="empty-cart">
              <h3>Your learning cart is empty.</h3>
              <p>Reset the cart to continue practicing state updates.</p>
            </div>
          )}
        </div>
        <CartSummary items={cartItems} />
      </div>
    </div>
  )
}
