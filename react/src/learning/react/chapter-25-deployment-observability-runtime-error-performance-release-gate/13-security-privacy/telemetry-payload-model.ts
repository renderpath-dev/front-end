export type TelemetryPayload = Record<string, unknown>

const sensitiveKeyPattern =
  /(address|authorization|cookie|email|name|password|phone|secret|session|token|userId)/i

export function sanitizeTelemetryPayload(payload: TelemetryPayload): TelemetryPayload {
  return Object.entries(payload).reduce<TelemetryPayload>((sanitized, [key, value]) => {
    if (sensitiveKeyPattern.test(key)) {
      sanitized[key] = '[redacted]'
      return sanitized
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      sanitized[key] = sanitizeTelemetryPayload(value as TelemetryPayload)
      return sanitized
    }

    sanitized[key] = value
    return sanitized
  }, {})
}

export function hasSensitiveTelemetryValue(payload: TelemetryPayload): boolean {
  return JSON.stringify(sanitizeTelemetryPayload(payload)) !== JSON.stringify(payload)
}
