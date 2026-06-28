import { describe, expect, it } from 'vitest'
import {
  cartReducer,
  normalizeCatalogSearch,
  parsePositiveQuantity,
} from './cart-quality-rules'
import type { CartState } from './cart-quality-rules'

describe('cart quality rules', () => {
  it('normalizes catalog search input before filtering', () => {
    expect(normalizeCatalogSearch('  Desk    Lamp  ')).toBe('desk lamp')
  })

  it('parses only positive integer quantities', () => {
    expect(parsePositiveQuantity('3')).toBe(3)
    expect(parsePositiveQuantity('0')).toBeNull()
    expect(parsePositiveQuantity('2.5')).toBeNull()
    expect(parsePositiveQuantity('unknown')).toBeNull()
  })

  it('updates cart lines without mutating the previous state object', () => {
    const previousState: CartState = {
      lines: [{ id: 'lamp', name: 'Desk Lamp', unitPrice: 42, quantity: 1 }],
    }

    const nextState = cartReducer(previousState, {
      type: 'changeQuantity',
      lineId: 'lamp',
      quantity: 4,
    })

    expect(nextState).not.toBe(previousState)
    expect(nextState.lines[0]).toEqual({
      id: 'lamp',
      name: 'Desk Lamp',
      unitPrice: 42,
      quantity: 4,
    })
    expect(previousState.lines[0]?.quantity).toBe(1)
  })
})
