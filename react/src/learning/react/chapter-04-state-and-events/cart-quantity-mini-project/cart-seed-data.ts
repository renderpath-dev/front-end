import type { CartItem } from './cart-types'

export const cartSeedItems: CartItem[] = [
  {
    product: {
      id: 'wireless-keyboard',
      name: 'Wireless Keyboard',
      category: 'Desk setup',
      price: 79,
      stock: 4,
    },
    quantity: 1,
  },
  {
    product: {
      id: 'usb-c-dock',
      name: 'USB-C Dock',
      category: 'Connectivity',
      price: 129,
      stock: 3,
    },
    quantity: 2,
  },
  {
    product: {
      id: 'monitor-light',
      name: 'Monitor Light',
      category: 'Lighting',
      price: 54,
      stock: 6,
    },
    quantity: 1,
  },
]
