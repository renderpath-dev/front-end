export function EffectCleanupFetchPanel() {
  return (
    <section className="data-fetching-card" aria-labelledby="effect-cleanup-title">
      <p className="data-fetching-card__eyebrow">9.5</p>
      <h2 id="effect-cleanup-title">Effect cleanup and dependency ownership</h2>
      <p>
        Effect setup starts synchronization with the request boundary. Cleanup mirrors
        setup by aborting or ignoring the previous process before the next committed
        criteria starts a new process.
      </p>
      <ul>
        <li>Dependency values describe the committed request criteria.</li>
        <li>Cleanup prevents obsolete work from committing into current UI.</li>
        <li>An async function belongs inside the effect, not as the effect callback.</li>
      </ul>
    </section>
  )
}
