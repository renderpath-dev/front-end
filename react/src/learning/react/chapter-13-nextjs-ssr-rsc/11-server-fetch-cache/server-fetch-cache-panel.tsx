import { serverFetchCacheSteps } from './server-fetch-cache-model'

export function ServerFetchCachePanel() {
  return (
    <section className="chapter13-panel" aria-labelledby="server-fetch-title">
      <p className="chapter13-kicker">Server fetch and cache</p>
      <h2 id="server-fetch-title">Server fetch is not the same boundary as client effect fetch</h2>
      <div className="chapter13-timeline">
        {serverFetchCacheSteps.map((step) => (
          <article className="chapter13-card" key={step.step}>
            <h3>{step.step}</h3>
            <p>Owner: {step.owner}</p>
            <p>Cache key: {step.cacheKey}</p>
            <p>Output: {step.output}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
