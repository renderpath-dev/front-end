import { useCallback, useMemo, useState } from 'react'
import { buildCatalogResourceKey } from '../10-query-driven-requests/resource-key-model'
import { useSellerHubResource } from '../09-custom-hook/use-sellerhub-resource'
import { parseCatalogPayload } from './catalog-resource-codec'
import { createSellerHubDemoApiClient } from './sellerhub-demo-api-client'
import type { CatalogProduct } from './sellerhub-data-fetching-data'
import { AsyncStatusRegion } from './async-status-region'

export function CatalogQueryResourcePanel() {
  const [query, setQuery] = useState('lamp')
  const client = useMemo(() => createSellerHubDemoApiClient(), [])
  const criteria = useMemo(
    () => ({
      channel: 'all' as const,
      query,
      sellerId: 'seller-42',
      sort: 'revenue' as const,
    }),
    [query],
  )
  const resourceKey = buildCatalogResourceKey(criteria)
  const codecResult = parseCatalogPayload({
    products: [
      { channel: 'retail', id: 'product-101', name: 'Desk Lamp Pro', revenue: 12840 },
    ],
  })
  const fetcher = useCallback(
    (activeCriteria: typeof criteria, signal: AbortSignal) =>
      client.getCatalogResource(activeCriteria.query, signal),
    [client],
  )
  const isEmpty = useCallback((products: readonly CatalogProduct[]) => products.length === 0, [])
  const resource = useSellerHubResource({
    criteria,
    fetcher,
    isEmpty,
    resourceKey,
  })

  return (
    <section className="data-fetching-card" aria-labelledby="catalog-query-panel-title">
      <h3 id="catalog-query-panel-title">Catalog query resource panel</h3>
      <label>
        Catalog query
        <input
          onChange={(event) => setQuery(event.currentTarget.value)}
          value={query}
        />
      </label>
      <code>{resource.resourceKey}</code>
      <AsyncStatusRegion label="Catalog request" state={resource.state} />
      {resource.state.status === 'success' || resource.state.status === 'refetching' ? (
        <ul>
          {resource.state.data.map((product) => (
            <li key={product.id}>
              {product.name} - {product.channel}
            </li>
          ))}
        </ul>
      ) : null}
      <button onClick={resource.refetch} type="button">
        Refetch catalog
      </button>
      <article className="data-fetching-nested-panel" aria-labelledby="catalog-codec-title">
        <h4 id="catalog-codec-title">Catalog resource key / codec panel</h4>
        <p>
          Resource key includes seller, query, channel, sort, and cursor. Runtime codec
          result: <strong>{codecResult.type}</strong>.
        </p>
      </article>
    </section>
  )
}
