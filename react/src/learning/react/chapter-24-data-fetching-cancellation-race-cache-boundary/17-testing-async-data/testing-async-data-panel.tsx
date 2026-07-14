export function TestingAsyncDataPanel() {
  return (
    <section className="data-fetching-card" aria-labelledby="testing-async-data-title">
      <p className="data-fetching-card__eyebrow">9.17</p>
      <h2 id="testing-async-data-title">Testing async data flows</h2>
      <p>
        Async data tests should prefer parsers, reducers, cache keys, race guards,
        injected fake fetchers, AbortController behavior, and visible role-based UI
        assertions over real network calls or arbitrary sleeps.
      </p>
    </section>
  )
}
