import { describe, expect, it } from 'vitest'
import {
  createRequestDiagnosticEvent,
  summarizePayload,
} from '../11-async-observability/request-observability-model'

describe('request observability model', () => {
  it('redacts payload and preserves request id and resource key', () => {
    const event = createRequestDiagnosticEvent({
      payload: { email: 'seller@example.com', orderId: 'order-1' },
      requestId: 'orders:1',
      resourceKey: 'sellerhub:orders',
      route: '/react/chapter-25',
      status: 'success',
    })

    expect(event.requestId).toBe('orders:1')
    expect(event.resourceKey).toBe('sellerhub:orders')
    expect(event.payloadSummary).toBe('object:2:redacted')
    expect(summarizePayload(['a', 'b'])).toBe('array:2')
  })
})
