import { describe, expect, test } from 'vitest'
import { parseSellerHubEntityId } from '../06-route-params/route-param-parser'

describe('parseSellerHubEntityId', () => {
  test('accepts product and order ids with a numeric suffix', () => {
    expect(parseSellerHubEntityId('product-201')).toEqual({
      status: 'valid',
      entityId: 'product-201',
      numericId: 201,
    })
    expect(parseSellerHubEntityId('order-501')).toEqual({
      status: 'valid',
      entityId: 'order-501',
      numericId: 501,
    })
  })

  test('rejects invalid and missing route ids', () => {
    expect(parseSellerHubEntityId('product-x').status).toBe('invalid')
    expect(parseSellerHubEntityId(undefined).status).toBe('missing')
  })
})
