import type { CategoryOption, Product } from './product-list-types'

export const productListSeedData: ReadonlyArray<Product> = [
  {
    id: 'product-mechanical-keyboard',
    name: 'Mechanical Keyboard',
    category: 'electronics',
    price: 129,
    stock: 12,
    description: 'Hot-swappable switches with a compact layout.',
  },
  {
    id: 'product-studio-headphones',
    name: 'Studio Headphones',
    category: 'electronics',
    price: 189,
    stock: 0,
    description: 'Closed-back monitoring headphones for focused work.',
  },
  {
    id: 'product-ergonomic-chair',
    name: 'Ergonomic Chair',
    category: 'office',
    price: 349,
    stock: 4,
    description: 'Adjustable lumbar support and breathable mesh.',
  },
  {
    id: 'product-desk-organizer',
    name: 'Desk Organizer',
    category: 'office',
    price: 42,
    stock: 18,
    description: 'Modular trays for stationery and small devices.',
  },
]

export const productCategoryOptions: ReadonlyArray<CategoryOption> = [
  { value: 'all', label: 'All products' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'office', label: 'Office' },
  { value: 'home', label: 'Home' },
]
