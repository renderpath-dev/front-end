export type SellerOrderRecord = {
  id: string
  customer: string
  total: number
}

export async function fetchSellerOrders(status: string): Promise<SellerOrderRecord[]> {
  const response = await fetch(`/api/testing/orders?status=${status}`)

  if (!response.ok) {
    throw new Error(`Order request failed with status ${response.status}`)
  }

  const payload = (await response.json()) as unknown

  if (!Array.isArray(payload)) {
    throw new Error('Order response must be an array')
  }

  return payload.map(parseSellerOrderRecord)
}

function parseSellerOrderRecord(value: unknown): SellerOrderRecord {
  if (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'customer' in value &&
    'total' in value &&
    typeof value.id === 'string' &&
    typeof value.customer === 'string' &&
    typeof value.total === 'number'
  ) {
    return {
      id: value.id,
      customer: value.customer,
      total: value.total,
    }
  }

  throw new Error('Invalid seller order record')
}
