import { createSellerHubErrorReporter } from '../sellerhub-capstone-app/shared/observability/error-reporter'

const reporter = createSellerHubErrorReporter()
reporter.report(
  {
    feature: 'chapter-evidence',
    privacy: 'no-sensitive-payload',
    release: '16.0.0-local',
    route: '/react/chapter-16/evidence',
  },
  {
    kind: 'service',
    code: 'CAPSTONE_EVIDENCE',
    message: 'Local evidence event',
  },
)

export function AppContextObservabilityPanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="context-observability-title">
      <p className="chapter16-eyebrow">9.11 Context and operations</p>
      <h2 id="context-observability-title">
        Share stable cross-cutting services without hiding feature state
      </h2>
      <p>{reporter.read().length} normalized event is available to the review surface.</p>
      <p>
        Locale, role, release metadata, feature flags, and the reporter belong to the app
        boundary. Catalog criteria remain in the URL.
      </p>
    </section>
  )
}
