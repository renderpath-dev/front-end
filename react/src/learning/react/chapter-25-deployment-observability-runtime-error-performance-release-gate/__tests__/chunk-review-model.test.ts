import { describe, expect, it } from 'vitest'
import {
  countChunksNeedingReview,
  reviewRouteChunks,
} from '../10-bundle-chunk-review/chunk-review-model'

describe('chunk review model', () => {
  it('flags oversized or unowned route chunks', () => {
    const reviews = reviewRouteChunks([
      { ownerRoute: '/react/chapter-25', sizeKb: 42, url: '/assets/ch25.js' },
      { sizeKb: 260, url: '/assets/vendor.js' },
    ])

    expect(reviews[0].status).toBe('pass')
    expect(reviews[1].issues).toEqual([
      'Chunk is over the route budget.',
      'Chunk does not have an owning route.',
    ])
    expect(countChunksNeedingReview(reviews)).toBe(1)
  })
})
