import { describe, expect, it } from 'vitest'
import {
  buildCatalogResourceKey,
  buildProductDetailResourceKey,
} from '../10-query-driven-requests/resource-key-model'

describe('resource key model', () => {
  it('includes seller, query, filter, sort, cursor, and entity identity', () => {
    const catalogKey = buildCatalogResourceKey({
      channel: 'marketplace',
      cursor: 'cursor-2',
      query: '  Lamp ',
      sellerId: 'seller-42',
      sort: 'revenue',
    })
    const productKey = buildProductDetailResourceKey('seller-42', 'product-101')

    expect(catalogKey).toContain('sellerId=seller-42')
    expect(catalogKey).toContain('query=lamp')
    expect(catalogKey).toContain('channel=marketplace')
    expect(catalogKey).toContain('sort=revenue')
    expect(catalogKey).toContain('cursor=cursor-2')
    expect(productKey).toContain('productId=product-101')
  })
})
