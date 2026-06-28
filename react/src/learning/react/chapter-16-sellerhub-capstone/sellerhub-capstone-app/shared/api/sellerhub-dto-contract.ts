export type ProductStatusDto = 'ACTIVE' | 'ARCHIVED'

export type ProductDto = {
  id: string
  name: string
  description: string
  priceInCents: number
  inventoryCount: number
  status: ProductStatusDto
}

export type ProductListDto = {
  items: ProductDto[]
}

export type OrderStatusDto = 'PAID' | 'PACKING' | 'SHIPPED'

export type OrderDto = {
  id: string
  customerName: string
  totalInCents: number
  status: OrderStatusDto
}

export type OrderListDto = {
  items: OrderDto[]
}

export type CheckoutResultDto = {
  orderId: string
  acceptedAt: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isProductStatus(value: unknown): value is ProductStatusDto {
  return value === 'ACTIVE' || value === 'ARCHIVED'
}

function isProductDto(value: unknown): value is ProductDto {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.description === 'string' &&
    typeof value.priceInCents === 'number' &&
    typeof value.inventoryCount === 'number' &&
    isProductStatus(value.status)
  )
}

function isOrderStatus(value: unknown): value is OrderStatusDto {
  return value === 'PAID' || value === 'PACKING' || value === 'SHIPPED'
}

function isOrderDto(value: unknown): value is OrderDto {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.customerName === 'string' &&
    typeof value.totalInCents === 'number' &&
    isOrderStatus(value.status)
  )
}

export function assertProductListDto(value: unknown): asserts value is ProductListDto {
  if (!isRecord(value) || !Array.isArray(value.items) || !value.items.every(isProductDto)) {
    throw new Error('Invalid product list response')
  }
}

export function assertProductDto(value: unknown): asserts value is ProductDto {
  if (!isProductDto(value)) {
    throw new Error('Invalid product response')
  }
}

export function assertOrderListDto(value: unknown): asserts value is OrderListDto {
  if (!isRecord(value) || !Array.isArray(value.items) || !value.items.every(isOrderDto)) {
    throw new Error('Invalid order list response')
  }
}

export function assertOrderDto(value: unknown): asserts value is OrderDto {
  if (!isOrderDto(value)) {
    throw new Error('Invalid order response')
  }
}

export function assertCheckoutResultDto(value: unknown): asserts value is CheckoutResultDto {
  if (
    !isRecord(value) ||
    typeof value.orderId !== 'string' ||
    typeof value.acceptedAt !== 'string'
  ) {
    throw new Error('Invalid checkout response')
  }
}
