import { countChunksNeedingReview, reviewRouteChunks } from '../10-bundle-chunk-review/chunk-review-model'
import { sellerHubRouteChunks } from './sellerhub-release-evidence-data'

const reviewedChunks = reviewRouteChunks(sellerHubRouteChunks)

export function BundleChunkReviewCard() {
  return (
    <section className="release-evidence-card" aria-labelledby="bundle-chunk-card-title">
      <h3 id="bundle-chunk-card-title">Bundle and chunk review card</h3>
      <p>
        Route chunk review flags oversized or unowned chunks before a release gate decision.
      </p>
      <p role="status">Chunks needing review: {countChunksNeedingReview(reviewedChunks)}</p>
    </section>
  )
}
