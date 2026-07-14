export type CatalogProduct = {
  channel: 'marketplace' | 'retail'
  id: string
  name: string
  revenue: number
}

export type OrderSummary = {
  customer: string
  id: string
  status: 'open' | 'paid' | 'shipped'
  total: number
}

export const sellerHubProducts: readonly CatalogProduct[] = [
  {
    channel: 'retail',
    id: 'product-101',
    name: 'Desk Lamp Pro',
    revenue: 12840,
  },
  {
    channel: 'marketplace',
    id: 'product-102',
    name: 'Cable Organizer Kit',
    revenue: 7420,
  },
  {
    channel: 'retail',
    id: 'product-103',
    name: 'Monitor Arm Flex',
    revenue: 21350,
  },
]

export const sellerHubOrders: readonly OrderSummary[] = [
  {
    customer: 'Northwind Studio',
    id: 'order-501',
    status: 'paid',
    total: 248,
  },
  {
    customer: 'Contoso Market',
    id: 'order-502',
    status: 'open',
    total: 129,
  },
  {
    customer: 'Fabrikam Labs',
    id: 'order-503',
    status: 'shipped',
    total: 612,
  },
]
