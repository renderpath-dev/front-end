export type SellerHubProduct = {
  id: string
  name: string
  channel: 'marketplace' | 'direct' | 'retail'
  margin: number
  inStock: boolean
}

export type SellerHubOrder = {
  id: string
  buyer: string
  total: number
  status: 'new' | 'packed' | 'shipped'
}

export type SellerSettings = {
  sellerId: string
  storeName: string
  supportEmail: string
}

export const sellerHubProducts: SellerHubProduct[] = [
  {
    id: 'prd-101',
    name: 'Aurora Desk Lamp',
    channel: 'marketplace',
    margin: 28,
    inStock: true,
  },
  {
    id: 'prd-102',
    name: 'Mesa Storage Basket',
    channel: 'direct',
    margin: 18,
    inStock: true,
  },
  {
    id: 'prd-103',
    name: 'Northstar Travel Mug',
    channel: 'retail',
    margin: 34,
    inStock: false,
  },
]

export const sellerHubOrders: SellerHubOrder[] = [
  { id: 'ord-7001', buyer: 'Harbor Supply', total: 184, status: 'new' },
  { id: 'ord-7002', buyer: 'Cedar Studio', total: 96, status: 'packed' },
  { id: 'ord-7003', buyer: 'Northwind Market', total: 232, status: 'shipped' },
]

export const defaultSellerSettings: SellerSettings = {
  sellerId: 'seller-42',
  storeName: 'SellerHub Demo Store',
  supportEmail: 'support@example.com',
}
