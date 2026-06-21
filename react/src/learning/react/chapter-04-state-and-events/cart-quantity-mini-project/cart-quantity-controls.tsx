type CartQuantityControlsProps = {
  productName: string
  quantity: number
  stock: number
  onDecrement: () => void
  onIncrement: () => void
}

export function CartQuantityControls({
  productName,
  quantity,
  stock,
  onDecrement,
  onIncrement,
}: CartQuantityControlsProps) {
  return (
    <div className="quantity-control" aria-label={`${productName} quantity`}>
      <button
        aria-label={`Decrease ${productName} quantity`}
        disabled={quantity <= 1}
        onClick={onDecrement}
        type="button"
      >
        -
      </button>
      <output aria-live="polite">{quantity}</output>
      <button
        aria-label={`Increase ${productName} quantity`}
        disabled={quantity >= stock}
        onClick={onIncrement}
        type="button"
      >
        +
      </button>
    </div>
  )
}
