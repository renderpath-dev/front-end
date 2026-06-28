export type SellerOrder = {
  id: string
  customer: string
  status: 'open' | 'shipped'
  total: number
}

export type LoginValues = {
  email: string
  password: string
}

export type CatalogFilterValues = {
  query: string
  status: 'all' | 'active' | 'archived'
}

export type SellerAuthValue = {
  isAuthenticated: boolean
  sellerName: string | null
  signIn: (sellerName: string) => void
  signOut: () => void
}

export type CartLine = {
  id: string
  name: string
  quantity: number
}

export type CartState = {
  lines: CartLine[]
}

export type CartAction =
  | { type: 'addLine'; line: CartLine }
  | { type: 'setQuantity'; lineId: string; quantity: number }
  | { type: 'removeLine'; lineId: string }
