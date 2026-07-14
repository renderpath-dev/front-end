import { describe, expect, test } from 'vitest'
import {
  defaultCatalogFilters,
  encodeCatalogFilters,
  parseCatalogFilters,
} from '../11-url-search-params/search-param-codec'

describe('catalog search param codec', () => {
  test('parses defaults from empty search params', () => {
    expect(parseCatalogFilters(new URLSearchParams())).toEqual(defaultCatalogFilters)
  })

  test('parses numbers, booleans, arrays, unknown values, and invalid values', () => {
    const filters = parseCatalogFilters(
      new URLSearchParams(
        'q=lamp&minMargin=25.4&inStock=true&channel=marketplace&channel=unknown&channel=direct&sort=price-desc',
      ),
    )

    expect(filters).toEqual({
      query: 'lamp',
      minMargin: 25,
      inStockOnly: true,
      channels: ['marketplace', 'direct'],
      sort: 'price-desc',
    })
  })

  test('falls back for invalid boolean, number, and sort values', () => {
    const filters = parseCatalogFilters(
      new URLSearchParams('minMargin=-10&inStock=yes&sort=margin&channel=ghost'),
    )

    expect(filters).toEqual(defaultCatalogFilters)
  })

  test('serializes only meaningful URL state', () => {
    const params = encodeCatalogFilters({
      query: 'lamp',
      minMargin: 20,
      inStockOnly: true,
      channels: ['marketplace', 'retail'],
      sort: 'price-asc',
    })

    expect(params.toString()).toBe(
      'q=lamp&minMargin=20&inStock=true&channel=marketplace&channel=retail&sort=price-asc',
    )
  })
})
