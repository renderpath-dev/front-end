import { reviewRouteChunks } from './chunk-review-model'
import { sellerHubRouteChunks } from '../sellerhub-release-evidence-lab/sellerhub-release-evidence-data'

const chunkReviews = reviewRouteChunks(sellerHubRouteChunks)

export function BundleChunkReviewPanel() {
  return (
    <section className="release-evidence-card" aria-labelledby="bundle-chunk-title">
      <p className="release-evidence-card__eyebrow">9.10</p>
      <h2 id="bundle-chunk-title">Bundle and chunk review</h2>
      <p>
        Chunk evidence reviews route ownership, lazy boundaries, and asset size. It is a
        release signal, not final proof of field performance.
      </p>
      <ul>
        {chunkReviews.map((chunk) => (
          <li key={chunk.url}>
            {chunk.url}: {chunk.status}
          </li>
        ))}
      </ul>
    </section>
  )
}
