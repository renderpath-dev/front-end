import type { SellerOrder, SellerOrderStatus } from './seller-order-types'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isSellerOrderStatus(value: unknown): value is SellerOrderStatus {
  return value === 'pending' || value === 'shipped'
}

function isSellerOrder(value: unknown): value is SellerOrder {
  if (!isRecord(value)) return false

  return (
    typeof value.id === 'string' &&
    typeof value.customerName === 'string' &&
    isSellerOrderStatus(value.status) &&
    typeof value.total === 'number'
  )
}

export function parseSellerOrdersResponse(value: unknown): SellerOrder[] {
  if (!isRecord(value) || !Array.isArray(value.orders) || !value.orders.every(isSellerOrder)) {
    throw new Error('Seller orders response has an invalid shape')
  }

  return value.orders
}
