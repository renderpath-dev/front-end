import { CartQuantityControls } from './cart-quantity-controls'
import type { CartItem } from './cart-types'

type CartItemRowProps = {
  item: CartItem
  onDecrement: (productId: string) => void
  onIncrement: (productId: string) => void
  onRemove: (productId: string) => void
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function CartItemRow({ item, onDecrement, onIncrement, onRemove }: CartItemRowProps) {
  const { product, quantity } = item
  const subtotal = product.price * quantity

  return (
    <article className="cart-item-row">
      <div className="product-symbol" aria-hidden="true">
        {product.name
          .split(' ')
          .map((word) => word[0])
          .join('')}
      </div>
      <div className="product-copy">
        <p>{product.category}</p>
        <h3>{product.name}</h3>
        <span>{currencyFormatter.format(product.price)} each</span>
      </div>
      <CartQuantityControls
        onDecrement={() => onDecrement(product.id)}
        onIncrement={() => onIncrement(product.id)}
        productName={product.name}
        quantity={quantity}
        stock={product.stock}
      />
      <div className="line-total">
        <strong>{currencyFormatter.format(subtotal)}</strong>
        <span>{product.stock} in stock</span>
      </div>
      <button className="remove-item-button" onClick={() => onRemove(product.id)} type="button">
        Remove
      </button>
    </article>
  )
}
