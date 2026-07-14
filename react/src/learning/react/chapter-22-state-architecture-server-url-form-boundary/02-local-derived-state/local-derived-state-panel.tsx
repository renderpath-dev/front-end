import { useState } from 'react'
import { sellerHubProducts } from '../sellerhub-state-boundary-lab/sellerhub-state-boundary-data'
import { deriveLocalProductState } from './local-derived-state-model'

export function LocalDerivedStatePanel() {
  const [query, setQuery] = useState('lamp')
  const model = deriveLocalProductState(sellerHubProducts, query)

  return (
    <article className="state-card">
      <p className="state-card-kicker">9.2 derived render value</p>
      <h3>Local UI state and derived values</h3>
      <label className="state-field">
        Product query
        <input value={query} onChange={(event) => setQuery(event.currentTarget.value)} />
      </label>
      <p role="status">
        Showing {model.visibleCount} of {model.totalCount} products without storing a second count
        state.
      </p>
      <ul>
        {model.visibleProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </article>
  )
}
