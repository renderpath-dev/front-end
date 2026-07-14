export type RequestDiagnosticInput = {
  payload?: unknown
  requestId: string
  resourceKey: string
  route: string
  status: 'aborted' | 'cache-hit' | 'failed' | 'pending' | 'success'
}

export type RequestDiagnosticEvent = Omit<RequestDiagnosticInput, 'payload'> & {
  payloadSummary: string
}

export function createRequestDiagnosticEvent(
  input: RequestDiagnosticInput,
): RequestDiagnosticEvent {
  return {
    requestId: input.requestId,
    resourceKey: input.resourceKey,
    route: input.route,
    status: input.status,
    payloadSummary: summarizePayload(input.payload),
  }
}

export function summarizePayload(payload: unknown): string {
  if (payload === undefined) {
    return 'none'
  }

  if (Array.isArray(payload)) {
    return `array:${payload.length}`
  }

  if (payload !== null && typeof payload === 'object') {
    return `object:${Object.keys(payload).length}:redacted`
  }

  return `${typeof payload}:redacted`
}
