export type ProductCategory = 'electronics' | 'office' | 'home'

export type CategoryFilter = 'all' | ProductCategory

export type Product = Readonly<{
  id: string
  name: string
  category: ProductCategory
  price: number
  stock: number
  description: string
}>

export type CategoryOption = Readonly<{
  value: CategoryFilter
  label: string
}>
