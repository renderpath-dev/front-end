export type SellerProductCategory = 'all' | 'accessories' | 'lighting' | 'workspace'

export type SellerProduct = {
  id: string
  name: string
  category: Exclude<SellerProductCategory, 'all'>
  price: number
  stock: number
}

export type SearchSyncStatus = 'pending' | 'success'
