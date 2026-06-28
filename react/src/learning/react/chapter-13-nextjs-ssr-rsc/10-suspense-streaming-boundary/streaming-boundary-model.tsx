import { lazy, Suspense } from 'react'
import type { ComponentType } from 'react'

const SegmentPreview = lazy(() =>
  Promise.resolve<{ default: ComponentType }>({
    default: function SegmentPreviewContent() {
      return (
        <article className="chapter13-card">
          <h3>catalog/page.tsx</h3>
          <p>Segment content replaces the loading boundary when it is ready.</p>
        </article>
      )
    },
  }),
)

export function StreamingBoundaryModel() {
  return (
    <section className="chapter13-panel" aria-labelledby="streaming-title">
      <p className="chapter13-kicker">Suspense streaming</p>
      <h2 id="streaming-title">Suspense gives the route segment a pending boundary</h2>
      <p>
        The Vite demo uses React lazy to show the shape of a boundary. In Next.js,
        loading.tsx maps to a segment-level Suspense boundary while server work streams.
      </p>
      <Suspense
        fallback={
          <article className="chapter13-card">
            <h3>catalog/loading.tsx</h3>
            <p>Pending segment shell</p>
          </article>
        }
      >
        <SegmentPreview />
      </Suspense>
    </section>
  )
}
