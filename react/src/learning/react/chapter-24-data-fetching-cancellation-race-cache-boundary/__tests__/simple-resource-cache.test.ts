import { describe, expect, it } from 'vitest'
import { createSimpleResourceCache } from '../11-cache-boundary/simple-resource-cache'

describe('simple resource cache', () => {
  it('dedupes in-flight requests by cache key', () => {
    const cache = createSimpleResourceCache<string[]>()
    let factoryCalls = 0

    const firstPromise = cache.getOrCreateInFlight('catalog?sellerId=seller-42', () => {
      factoryCalls += 1
      return Promise.resolve(['Desk Lamp Pro'])
    })
    const secondPromise = cache.getOrCreateInFlight('catalog?sellerId=seller-42', () => {
      factoryCalls += 1
      return Promise.resolve(['Desk Lamp Pro'])
    })

    expect(firstPromise).toBe(secondPromise)
    expect(factoryCalls).toBe(1)
  })
})
