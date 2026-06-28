import { describe, expect, it } from 'vitest'
import {
  cartReducer,
  deriveCartSummary,
  emptyCartState,
  readCartState,
  writeCartState,
} from '../features/cart/cart-model'

class MemoryStorage implements Storage {
  private values = new Map<string, string>()

  get length() {
    return this.values.size
  }

  clear() {
    this.values.clear()
  }

  getItem(key: string) {
    return this.values.get(key) ?? null
  }

  key(index: number) {
    return [...this.values.keys()][index] ?? null
  }

  removeItem(key: string) {
    this.values.delete(key)
  }

  setItem(key: string, value: string) {
    this.values.set(key, value)
  }
}

describe('cart model', () => {
  it('adds, updates, removes, and derives totals without mutating prior state', () => {
    const added = cartReducer(emptyCartState, {
      type: 'product-added',
      line: {
        productId: 'product-lamp',
        name: 'Focus Lamp',
        unitPriceInCents: 4599,
      },
    })
    const updated = cartReducer(added, {
      type: 'quantity-updated',
      productId: 'product-lamp',
      quantity: 3,
    })
    const removed = cartReducer(updated, {
      type: 'product-removed',
      productId: 'product-lamp',
    })

    expect(added).not.toBe(emptyCartState)
    expect(deriveCartSummary(updated)).toEqual({
      itemCount: 3,
      subtotalInCents: 13797,
    })
    expect(removed).toEqual(emptyCartState)
  })

  it('round-trips valid state through the browser storage boundary', () => {
    const storage = new MemoryStorage()
    const state = {
      lines: [
        {
          productId: 'product-desk',
          name: 'Seller Desk',
          unitPriceInCents: 32900,
          quantity: 1,
        },
      ],
    }

    writeCartState(storage, 'cart-test', state)

    expect(readCartState(storage, 'cart-test')).toEqual(state)
  })
})
