import { buildCatalogResourceKey } from './resource-key-model'

export function QueryDrivenRequestPanel() {
  const resourceKey = buildCatalogResourceKey({
    channel: 'retail',
    cursor: 'page-2',
    query: 'Lamp',
    sellerId: 'seller-42',
    sort: 'revenue',
  })

  return (
    <section className="data-fetching-card" aria-labelledby="query-driven-title">
      <p className="data-fetching-card__eyebrow">9.10</p>
      <h2 id="query-driven-title">Query, filter, and resource identity</h2>
      <p>
        A request key must represent the resource identity. Seller id, query, channel,
        sort, and cursor are part of the resource boundary, not incidental component
        state.
      </p>
      <code>{resourceKey}</code>
    </section>
  )
}
