export type SellerHubOrderStatus = 'open' | 'paid' | 'shipped' | 'cancelled'

export type SellerHubOrder = {
  id: string
  customer: string
  status: SellerHubOrderStatus
  total: number
}

export type OrderPayloadParseResult =
  | {
      type: 'valid'
      orders: SellerHubOrder[]
    }
  | {
      type: 'invalid'
      issue: string
    }

const allowedStatuses: readonly SellerHubOrderStatus[] = [
  'open',
  'paid',
  'shipped',
  'cancelled',
]

export function parseOrdersPayload(input: unknown): OrderPayloadParseResult {
  if (!isRecord(input)) {
    return { type: 'invalid', issue: 'Payload must be an object' }
  }

  if (!Array.isArray(input.rows)) {
    return { type: 'invalid', issue: 'Payload rows must be an array' }
  }

  const orders: SellerHubOrder[] = []

  for (const row of input.rows) {
    if (!isRecord(row)) {
      return { type: 'invalid', issue: 'Each row must be an object' }
    }

    if (typeof row.id !== 'string' || row.id.length === 0) {
      return { type: 'invalid', issue: 'Order id must be a non-empty string' }
    }

    if (typeof row.customer !== 'string' || row.customer.length === 0) {
      return { type: 'invalid', issue: 'Order customer must be a non-empty string' }
    }

    if (!isOrderStatus(row.status)) {
      return { type: 'invalid', issue: 'Order status is outside the allowed domain' }
    }

    if (typeof row.total !== 'number' || !Number.isFinite(row.total)) {
      return { type: 'invalid', issue: 'Order total must be a finite number' }
    }

    orders.push({
      id: row.id,
      customer: row.customer,
      status: row.status,
      total: row.total,
    })
  }

  return { type: 'valid', orders }
}

function isOrderStatus(value: unknown): value is SellerHubOrderStatus {
  return typeof value === 'string' && allowedStatuses.includes(value as SellerHubOrderStatus)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
