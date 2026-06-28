import { readCatalogCriteria } from '../sellerhub-capstone-app/features/catalog/catalog-public-api'

const sampleSearch = new URLSearchParams(
  'query=desk&status=active&sort=price-desc',
)
const sampleCriteria = readCatalogCriteria(sampleSearch)

export function RouteUrlStatePanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="route-state-title">
      <p className="chapter16-eyebrow">9.3 Route and URL state</p>
      <h2 id="route-state-title">Make shareable criteria a router-owned boundary</h2>
      <dl className="chapter16-definition-list">
        <div>
          <dt>URL</dt>
          <dd>?{sampleSearch.toString()}</dd>
        </div>
        <div>
          <dt>Parsed query</dt>
          <dd>{sampleCriteria.query}</dd>
        </div>
        <div>
          <dt>Parsed status</dt>
          <dd>{sampleCriteria.status}</dd>
        </div>
        <div>
          <dt>Parsed sort</dt>
          <dd>{sampleCriteria.sort}</dd>
        </div>
      </dl>
    </section>
  )
}
