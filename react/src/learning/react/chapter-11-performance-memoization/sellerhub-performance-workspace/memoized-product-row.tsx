import { memo } from 'react'
import type { PerformanceProduct } from './sellerhub-performance-data'

type MemoizedProductRowProps = {
  product: PerformanceProduct
  onSelect: (productId: string) => void
}

export const MemoizedProductRow = memo(function ProductRow({
  product,
  onSelect,
}: MemoizedProductRowProps) {
  return (
    <li className="sellerhub-performance-row">
      <div>
        <strong>{product.name}</strong>
        <span>{product.category} / {product.inventory} in stock</span>
      </div>
      <span>${product.price}</span>
      <button onClick={() => onSelect(product.id)} type="button">
        Inspect
      </button>
    </li>
  )
})
