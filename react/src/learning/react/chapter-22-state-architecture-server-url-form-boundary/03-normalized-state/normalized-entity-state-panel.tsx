import { useState } from 'react'
import { sellerHubProducts } from '../sellerhub-state-boundary-lab/sellerhub-state-boundary-data'

const productsById = Object.fromEntries(
  sellerHubProducts.map((product) => [product.id, product]),
)

export function NormalizedEntityStatePanel() {
  const [selectedProductId, setSelectedProductId] = useState(sellerHubProducts[0].id)
  const selectedProduct = productsById[selectedProductId]

  return (
    <article className="state-card">
      <p className="state-card-kicker">9.3 entity identity</p>
      <h3>Duplicated and normalized state</h3>
      <p>
        The selection stores an id. The product object remains owned by the entity collection.
      </p>
      <label className="state-field">
        Selected product
        <select
          value={selectedProductId}
          onChange={(event) => setSelectedProductId(event.currentTarget.value)}
        >
          {sellerHubProducts.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
      <p>
        Selected entity: <strong>{selectedProduct?.name}</strong>
      </p>
    </article>
  )
}
