import {
  encodeCatalogFilters,
  parseCatalogFilters,
} from './search-param-codec'

const sampleParams = new URLSearchParams(
  'q=lamp&minMargin=28&inStock=true&channel=marketplace&channel=unknown&sort=price-desc',
)

export function UrlSearchParamsParsingPanel() {
  const parsedFilters = parseCatalogFilters(sampleParams)
  const encodedFilters = encodeCatalogFilters(parsedFilters)

  return (
    <article className="state-card">
      <p className="state-card-kicker">9.11 string boundary</p>
      <h3>URLSearchParams parsing and serialization</h3>
      <p>
        Parsed query: <strong>{parsedFilters.query}</strong>
      </p>
      <p>Channels kept: {parsedFilters.channels.join(', ') || 'none'}</p>
      <p>
        Encoded filters: <code>{encodedFilters.toString()}</code>
      </p>
    </article>
  )
}
