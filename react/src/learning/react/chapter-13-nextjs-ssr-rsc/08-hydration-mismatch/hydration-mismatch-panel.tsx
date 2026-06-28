import {
  compareHydrationOutput,
  hydrationCases,
} from './hydration-mismatch-lab'

export function HydrationMismatchPanel() {
  const comparisons = hydrationCases.map(compareHydrationOutput)

  return (
    <section className="chapter13-panel" aria-labelledby="hydration-title">
      <p className="chapter13-kicker">Hydration</p>
      <h2 id="hydration-title">Hydration requires matching server and first client output</h2>
      <div className="chapter13-grid">
        {comparisons.map((comparison) => (
          <article className="chapter13-card" key={comparison.name}>
            <span
              className={`chapter13-pill ${
                comparison.isMismatch ? 'chapter13-pill-blocked' : 'chapter13-pill-allowed'
              }`}
            >
              {comparison.isMismatch ? 'mismatch' : 'match'}
            </span>
            <h3>{comparison.name}</h3>
            <p>Server: {comparison.serverOutput}</p>
            <p>Client: {comparison.clientFirstOutput}</p>
            <p>{comparison.cause}</p>
            <strong>{comparison.diagnosis}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}
