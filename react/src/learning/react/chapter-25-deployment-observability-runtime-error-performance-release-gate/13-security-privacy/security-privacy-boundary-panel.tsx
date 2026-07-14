import { sanitizeTelemetryPayload } from './telemetry-payload-model'

const sanitizedPayload = sanitizeTelemetryPayload({
  email: 'seller@example.com',
  releaseId: 'sellerhub-2026.07.14T0800Z',
  route: '/react/chapter-25',
  token: 'secret-token',
})

export function SecurityPrivacyBoundaryPanel() {
  return (
    <section className="release-evidence-card" aria-labelledby="security-privacy-title">
      <p className="release-evidence-card__eyebrow">9.13</p>
      <h2 id="security-privacy-title">Security and privacy boundary</h2>
      <p>
        Client release evidence must not expose secrets, cookies, tokens, or personal
        records. Telemetry examples are sanitized local data in this lab.
      </p>
      <code>{JSON.stringify(sanitizedPayload)}</code>
    </section>
  )
}
