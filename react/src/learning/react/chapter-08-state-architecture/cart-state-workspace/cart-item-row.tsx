import type { CartItem } from './cart-state-model'
import { useCartDispatch } from './use-cart-state'

type CartItemRowProps = {
  item: CartItem
}

export function CartItemRow({ item }: CartItemRowProps) {
  const dispatch = useCartDispatch()

  return (
    <article className="cart-item-row">
      <div>
        <h3>{item.name}</h3>
        <p>${item.unitPrice.toFixed(2)} each</p>
      </div>
      <div className="quantity-controls" aria-label={`Quantity for ${item.name}`}>
        <button
          type="button"
          onClick={() =>
            dispatch({
              type: 'quantity_changed',
              itemId: item.id,
              nextQuantity: item.quantity - 1,
            })
          }
          disabled={item.quantity === 1}
        >
          -
        </button>
        <output>{item.quantity}</output>
        <button
          type="button"
          onClick={() =>
            dispatch({
              type: 'quantity_changed',
              itemId: item.id,
              nextQuantity: item.quantity + 1,
            })
          }
        >
          +
        </button>
      </div>
      <button
        className="text-button"
        type="button"
        onClick={() => dispatch({ type: 'item_removed', itemId: item.id })}
      >
        Remove
      </button>
    </article>
  )
}
