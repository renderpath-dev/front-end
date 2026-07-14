import { useSearchParams } from 'react-router'

export function SearchParamRoutePanel() {
  const [searchParams, setSearchParams] = useSearchParams()
  const channel = searchParams.get('channel') ?? 'all'

  function setChannel(nextChannel: string): void {
    const nextParams = new URLSearchParams(searchParams)

    if (nextChannel === 'all') {
      nextParams.delete('channel')
    } else {
      nextParams.set('channel', nextChannel)
    }

    setSearchParams(nextParams, { replace: true })
  }

  return (
    <section className="route-lab-card" aria-labelledby="search-param-title">
      <p className="route-card-kicker">Part 7</p>
      <h2 id="search-param-title">Search params and shareable URL state</h2>
      <p>
        Search params own shareable filter state. The setter creates a navigation; direct
        mutation of the existing URLSearchParams object is not enough.
      </p>
      <p>
        Current channel: <code className="route-code">{channel}</code>
      </p>
      <div className="route-button-row">
        <button type="button" onClick={() => setChannel('all')}>
          All channels
        </button>
        <button type="button" onClick={() => setChannel('online')}>
          Online channel
        </button>
        <button type="button" onClick={() => setChannel('retail')}>
          Retail channel
        </button>
      </div>
    </section>
  )
}
