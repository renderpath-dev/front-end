import { describe, expect, test } from 'vitest'
import { describeUrlOwnership, parseUrlLocation } from '../02-url-anatomy/url-location-model'

describe('parseUrlLocation', () => {
  test('parses pathname, search, hash, segments, and search entries', () => {
    const parsedLocation = parseUrlLocation(
      '/sellerhub/catalog/product-201?channel=online&sort=margin#reviews',
    )

    expect(parsedLocation.pathname).toBe('/sellerhub/catalog/product-201')
    expect(parsedLocation.search).toBe('?channel=online&sort=margin')
    expect(parsedLocation.hash).toBe('#reviews')
    expect(parsedLocation.routeSegments).toEqual(['sellerhub', 'catalog', 'product-201'])
    expect(parsedLocation.searchEntries).toEqual([
      ['channel', 'online'],
      ['sort', 'margin'],
    ])
  })

  test('summarizes ownership boundaries from a URL', () => {
    expect(describeUrlOwnership('/sellerhub/orders/order-501?status=open')).toBe(
      'page=/sellerhub/orders/order-501; entity=order-501; search=status; hash=none',
    )
  })
})
