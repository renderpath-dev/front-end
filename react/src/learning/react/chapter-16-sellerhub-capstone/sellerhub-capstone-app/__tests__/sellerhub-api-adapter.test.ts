import { describe, expect, it } from 'vitest'
import { adaptProductDto } from '../shared/api/sellerhub-adapters'
import {
  assertProductDto,
} from '../shared/api/sellerhub-dto-contract'

describe('SellerHub API adapter boundary', () => {
  it('validates an unknown response before adapting it', () => {
    const response: unknown = {
      id: 'product-lamp',
      name: ' Focus Lamp ',
      description: ' Task lighting ',
      priceInCents: 4599,
      inventoryCount: 12,
      status: 'ACTIVE',
    }

    assertProductDto(response)

    expect(adaptProductDto(response)).toEqual({
      id: 'product-lamp',
      name: 'Focus Lamp',
      description: 'Task lighting',
      unitPriceInCents: 4599,
      inventoryLabel: '12 available',
      status: 'active',
    })
  })

  it('rejects a response that only looks typed at compile time', () => {
    const response: unknown = {
      id: 'product-lamp',
      name: 'Focus Lamp',
      priceInCents: '4599',
    }

    expect(() => assertProductDto(response)).toThrow('Invalid product response')
  })
})
