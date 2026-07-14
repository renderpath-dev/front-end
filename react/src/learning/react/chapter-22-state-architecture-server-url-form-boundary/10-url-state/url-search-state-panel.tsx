import { useSearchParams } from 'react-router'
import {
  encodeCatalogFilters,
  mergeCatalogFilterPatch,
  parseCatalogFilters,
} from '../11-url-search-params/search-param-codec'

export function UrlSearchStatePanel() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = parseCatalogFilters(searchParams)

  function updateQuery(query: string): void {
    const nextFilters = mergeCatalogFilterPatch(filters, { query })
    setSearchParams(encodeCatalogFilters(nextFilters), { replace: true })
  }

  return (
    <article className="state-card">
      <p className="state-card-kicker">9.10 URL owner</p>
      <h3>URL state and search params</h3>
      <label className="state-field">
        Shareable catalog query
        <input value={filters.query} onChange={(event) => updateQuery(event.currentTarget.value)} />
      </label>
      <p>
        Search string owner: <code>{searchParams.toString() || 'empty search'}</code>
      </p>
    </article>
  )
}
