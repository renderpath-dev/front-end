export type CartItem = {
  id: string
  name: string
  unitPrice: number
  quantity: number
}

export type CartState = {
  items: CartItem[]
}

export type CartAction =
  | { type: 'quantity_changed'; itemId: string; nextQuantity: number }
  | { type: 'item_removed'; itemId: string }
  | { type: 'cart_cleared' }
  | { type: 'cart_reset' }

export function createInitialCartState(): CartState {
  return {
    items: [
      { id: 'sku-keyboard', name: 'Mechanical keyboard', unitPrice: 89, quantity: 1 },
      { id: 'sku-mouse', name: 'Wireless mouse', unitPrice: 45, quantity: 2 },
      { id: 'sku-stand', name: 'Monitor stand', unitPrice: 64, quantity: 1 },
    ],
  }
}
