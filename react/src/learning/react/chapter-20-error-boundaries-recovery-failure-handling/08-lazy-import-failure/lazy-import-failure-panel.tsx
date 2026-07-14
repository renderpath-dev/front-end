import { lazy, Suspense, useState } from 'react'
import type { ComponentType } from 'react'
import { ErrorBoundary } from '../02-error-boundary-class/error-boundary'

const FailedLazyImport = lazy(
  () =>
    Promise.reject(new Error('Dynamic import rejected while loading a route chunk.')) as Promise<{
      default: ComponentType
    }>,
)

function LazyImportFailureProbe({ shouldLoadFailedChunk }: { shouldLoadFailedChunk: boolean }) {
  if (!shouldLoadFailedChunk) {
    return <p className="recovery-success-note">No failed chunk requested.</p>
  }

  return <FailedLazyImport />
}

export function LazyImportFailurePanel() {
  const [shouldLoadFailedChunk, setShouldLoadFailedChunk] = useState(false)

  return (
    <section className="recovery-card" aria-labelledby="lazy-import-failure-title">
      <p className="recovery-card-kicker">9.8</p>
      <h3 id="lazy-import-failure-title">Lazy import failure boundary</h3>
      <p>
        A pending lazy import uses Suspense fallback. A rejected lazy import is an error
        and must reach the nearest Error Boundary.
      </p>
      <ErrorBoundary
        boundaryName="Lazy import boundary"
        onReset={() => setShouldLoadFailedChunk(false)}
        resetButtonLabel="Reset failed import"
      >
        <Suspense fallback={<p role="status">Loading lazy import...</p>}>
          <LazyImportFailureProbe shouldLoadFailedChunk={shouldLoadFailedChunk} />
        </Suspense>
      </ErrorBoundary>
      <button type="button" onClick={() => setShouldLoadFailedChunk(true)}>
        Simulate lazy import rejection
      </button>
    </section>
  )
}
