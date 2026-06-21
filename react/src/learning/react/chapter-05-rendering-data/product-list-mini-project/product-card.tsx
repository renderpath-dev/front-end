import type { Product } from './product-list-types'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const isInStock = product.stock > 0

  return (
    <article className="product-card">
      <div className="product-card-heading">
        <p>{product.category}</p>
        <span className={isInStock ? 'stock-badge in-stock' : 'stock-badge out-of-stock'}>
          {isInStock ? `${product.stock} in stock` : 'Out of stock'}
        </span>
      </div>
      <h3>{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price}</p>
      <button type="button" disabled={!isInStock}>
        {isInStock ? 'View product' : 'Unavailable'}
      </button>
    </article>
  )
}
