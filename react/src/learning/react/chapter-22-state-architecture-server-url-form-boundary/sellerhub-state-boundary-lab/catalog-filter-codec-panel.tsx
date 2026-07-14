import {
  encodeCatalogFilters,
  parseCatalogFilters,
} from './catalog-filter-codec'

const exampleSearchParams = new URLSearchParams(
  'q=lamp&minMargin=20&inStock=true&channel=marketplace&channel=retail',
)

export function CatalogFilterCodecPanel() {
  const parsedFilters = parseCatalogFilters(exampleSearchParams)
  const encodedFilters = encodeCatalogFilters(parsedFilters)

  return (
    <section className="state-lab-card" aria-labelledby="catalog-codec-title">
      <p className="state-card-kicker">Final lab part 2</p>
      <h3 id="catalog-codec-title">Catalog filter codec</h3>
      <p>Query: {parsedFilters.query}</p>
      <p>Minimum margin: {parsedFilters.minMargin}</p>
      <p>Channels: {parsedFilters.channels.join(', ')}</p>
      <p>
        Serialized search: <code>{encodedFilters.toString()}</code>
      </p>
    </section>
  )
}
