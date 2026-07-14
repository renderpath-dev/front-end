import { hasSensitiveTelemetryValue, sanitizeTelemetryPayload } from '../13-security-privacy/telemetry-payload-model'

const rawPayload = {
  email: 'seller@example.com',
  route: '/react/chapter-25',
  token: 'secret-token',
}

const sanitizedPayload = sanitizeTelemetryPayload(rawPayload)

export function SecurityPrivacyReviewCard() {
  return (
    <section className="release-evidence-card" aria-labelledby="security-review-card-title">
      <h3 id="security-review-card-title">Security and privacy review card</h3>
      <p>
        Sensitive telemetry detected: {hasSensitiveTelemetryValue(rawPayload) ? 'yes' : 'no'}
      </p>
      <code>{JSON.stringify(sanitizedPayload)}</code>
    </section>
  )
}
