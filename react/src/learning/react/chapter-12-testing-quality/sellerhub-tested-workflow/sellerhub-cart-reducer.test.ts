import { describe, expect, it } from 'vitest'
import { parseCatalogFilterQuery, sellerCartReducer } from './sellerhub-cart-rules'
import type { CartState } from './sellerhub-testing-types'

describe('sellerCartReducer', () => {
  it('normalizes catalog filter query before a visible result test uses it', () => {
    expect(parseCatalogFilterQuery('  Desk   Lamp  ')).toBe('desk lamp')
  })

  it('adds and updates cart lines as pure transitions', () => {
    const initialState: CartState = { lines: [] }

    const withLine = sellerCartReducer(initialState, {
      type: 'addLine',
      line: { id: 'lamp', name: 'Desk Lamp', quantity: 1 },
    })
    const withQuantity = sellerCartReducer(withLine, {
      type: 'setQuantity',
      lineId: 'lamp',
      quantity: 3,
    })

    expect(initialState.lines).toHaveLength(0)
    expect(withLine.lines).toHaveLength(1)
    expect(withQuantity.lines[0]?.quantity).toBe(3)
  })
})
