export type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
}

export type CartItem = {
  product: Product
  quantity: number
}
