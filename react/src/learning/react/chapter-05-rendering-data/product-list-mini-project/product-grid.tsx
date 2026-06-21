import { ProductCard } from './product-card'
import type { Product } from './product-list-types'

type ProductGridProps = {
  products: ReadonlyArray<Product>
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="product-empty-state">
        <p className="product-empty-state-label">Empty state</p>
        <h3>No products match this category.</h3>
        <p>Choose another category to return to the product grid.</p>
      </div>
    )
  }

  return (
    <div className="product-grid" aria-label="Visible products">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
