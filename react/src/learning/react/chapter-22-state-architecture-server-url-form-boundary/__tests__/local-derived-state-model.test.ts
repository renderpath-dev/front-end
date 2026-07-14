import { describe, expect, test } from 'vitest'
import { deriveLocalProductState } from '../02-local-derived-state/local-derived-state-model'
import { sellerHubProducts } from '../sellerhub-state-boundary-lab/sellerhub-state-boundary-data'

describe('deriveLocalProductState', () => {
  test('derives visible count from source products instead of redundant state', () => {
    const model = deriveLocalProductState(sellerHubProducts, 'lamp')

    expect(model.hasRedundantCountState).toBe(false)
    expect(model.visibleProducts).toHaveLength(1)
    expect(model.visibleCount).toBe(model.visibleProducts.length)
    expect(model.totalCount).toBe(sellerHubProducts.length)
  })

  test('recalculates derived output when the source query changes', () => {
    const firstModel = deriveLocalProductState(sellerHubProducts, 'lamp')
    const secondModel = deriveLocalProductState(sellerHubProducts, 'mug')

    expect(firstModel.visibleProducts[0]?.name).toBe('Aurora Desk Lamp')
    expect(secondModel.visibleProducts[0]?.name).toBe('Northstar Travel Mug')
  })
})
