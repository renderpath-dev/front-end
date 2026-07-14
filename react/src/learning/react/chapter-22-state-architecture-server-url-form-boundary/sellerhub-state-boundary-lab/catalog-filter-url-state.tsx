import { useSearchParams } from 'react-router'
import { sellerHubProducts } from './sellerhub-state-boundary-data'
import {
  catalogChannelOptions,
  encodeCatalogFilters,
  mergeCatalogFilterPatch,
  parseCatalogFilters,
} from './catalog-filter-codec'

export function CatalogFilterUrlState() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = parseCatalogFilters(searchParams)
  const filteredProducts = sellerHubProducts.filter((product) => {
    const matchesQuery =
      filters.query.length === 0 ||
      product.name.toLowerCase().includes(filters.query.toLowerCase())
    const matchesMargin = product.margin >= filters.minMargin
    const matchesStock = !filters.inStockOnly || product.inStock
    const matchesChannel =
      filters.channels.length === 0 || filters.channels.includes(product.channel)

    return matchesQuery && matchesMargin && matchesStock && matchesChannel
  })

  function updateFilters(patch: Partial<typeof filters>): void {
    const nextFilters = mergeCatalogFilterPatch(filters, patch)
    setSearchParams(encodeCatalogFilters(nextFilters), { replace: true })
  }

  return (
    <section className="state-lab-card" aria-labelledby="catalog-url-state-title">
      <p className="state-card-kicker">Final lab part 1</p>
      <h3 id="catalog-url-state-title">Catalog filter URL state</h3>
      <label className="state-field">
        Catalog search
        <input
          value={filters.query}
          onChange={(event) => updateFilters({ query: event.currentTarget.value })}
        />
      </label>
      <label className="state-field">
        Minimum margin
        <input
          min="0"
          type="number"
          value={filters.minMargin}
          onChange={(event) => updateFilters({ minMargin: Number(event.currentTarget.value) })}
        />
      </label>
      <label className="state-checkbox">
        <input
          checked={filters.inStockOnly}
          type="checkbox"
          onChange={(event) => updateFilters({ inStockOnly: event.currentTarget.checked })}
        />
        In-stock only
      </label>
      <div className="state-checkbox-group" aria-label="Sales channels">
        {catalogChannelOptions.map((channel) => (
          <label className="state-checkbox" key={channel}>
            <input
              checked={filters.channels.includes(channel)}
              type="checkbox"
              onChange={(event) => {
                const nextChannels = event.currentTarget.checked
                  ? [...filters.channels, channel]
                  : filters.channels.filter((currentChannel) => currentChannel !== channel)
                updateFilters({ channels: nextChannels })
              }}
            />
            {channel}
          </label>
        ))}
      </div>
      <p role="status">URL-backed results: {filteredProducts.length}</p>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  )
}
