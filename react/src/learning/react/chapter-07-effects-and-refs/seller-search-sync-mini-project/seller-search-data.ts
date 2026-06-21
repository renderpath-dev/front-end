import type { SellerProduct, SellerProductCategory } from './seller-search-types'

export const sellerProductCategories: SellerProductCategory[] = [
  'all',
  'accessories',
  'lighting',
  'workspace',
]

export const sellerProducts: SellerProduct[] = [
  {
    id: 'product-keyboard',
    name: 'Mechanical Keyboard',
    category: 'accessories',
    price: 89,
    stock: 24,
  },
  {
    id: 'product-hub',
    name: 'USB-C Hub',
    category: 'accessories',
    price: 54,
    stock: 11,
  },
  {
    id: 'product-lamp',
    name: 'Adjustable Desk Lamp',
    category: 'lighting',
    price: 42,
    stock: 8,
  },
  {
    id: 'product-stand',
    name: 'Aluminum Monitor Stand',
    category: 'workspace',
    price: 68,
    stock: 16,
  },
]
