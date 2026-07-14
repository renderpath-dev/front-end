import { describe, expect, it } from 'vitest'
import {
  hasSensitiveTelemetryValue,
  sanitizeTelemetryPayload,
} from '../13-security-privacy/telemetry-payload-model'

describe('telemetry payload model', () => {
  it('strips PII and tokens', () => {
    const payload = sanitizeTelemetryPayload({
      email: 'seller@example.com',
      nested: { token: 'secret-token' },
      route: '/react/chapter-25',
    })

    expect(payload).toEqual({
      email: '[redacted]',
      nested: { token: '[redacted]' },
      route: '/react/chapter-25',
    })
    expect(hasSensitiveTelemetryValue({ token: 'secret-token' })).toBe(true)
  })
})
