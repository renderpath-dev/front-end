export type SellerHubCategory = 'all' | 'lighting' | 'office'

export type SellerHubProduct = {
  id: string
  name: string
  category: Exclude<SellerHubCategory, 'all'>
  price: number
}

export type SellerOrderStatus = 'all' | 'pending' | 'shipped'

export const sellerHubProducts: SellerHubProduct[] = [
  { id: 'lamp-101', name: 'Arc Desk Lamp', category: 'lighting', price: 89 },
  { id: 'chair-204', name: 'Mesh Task Chair', category: 'office', price: 249 },
  { id: 'light-305', name: 'Studio Floor Light', category: 'lighting', price: 139 },
]

export const sellerOrderCounts: Record<Exclude<SellerOrderStatus, 'all'>, number> = {
  pending: 4,
  shipped: 11,
}
