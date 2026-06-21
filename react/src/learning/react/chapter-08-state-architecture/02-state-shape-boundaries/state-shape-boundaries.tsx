import { useState } from 'react'

type ProductStatus = 'draft' | 'review' | 'published'

const products = [
  { id: 'sku-101', name: 'Desk lamp' },
  { id: 'sku-102', name: 'Monitor stand' },
]

export function StateShapeBoundaries() {
  const [status, setStatus] = useState<ProductStatus>('draft')
  const [selectedProductId, setSelectedProductId] = useState(products[0].id)
  const selectedProduct = products.find((product) => product.id === selectedProductId)

  return (
    <article className="practice-card">
      <p className="practice-label">State shape</p>
      <h3>Store one source of truth</h3>
      <label>
        Product
        <select
          value={selectedProductId}
          onChange={(event) => setSelectedProductId(event.target.value)}
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
      <div className="practice-stack">
        {(['draft', 'review', 'published'] as const).map((nextStatus) => (
          <button key={nextStatus} onClick={() => setStatus(nextStatus)}>
            {nextStatus}
          </button>
        ))}
      </div>
      <p>
        {selectedProduct?.name} is {status}.
      </p>
    </article>
  )
}
