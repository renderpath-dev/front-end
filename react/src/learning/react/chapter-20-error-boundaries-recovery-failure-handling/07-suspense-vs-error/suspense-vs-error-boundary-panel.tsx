import { lazy, Suspense, useState } from 'react'
import type { ComponentType } from 'react'
import { ErrorBoundary } from '../02-error-boundary-class/error-boundary'

const LazyHealthyPreview = lazy(() =>
  Promise.resolve<{ default: ComponentType }>({
    default: function HealthyPreview() {
      return <p className="recovery-success-note">Suspense loaded the healthy preview.</p>
    },
  }),
)

function ErrorPreview({ shouldCrash }: { shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error('Suspense does not handle this thrown render error.')
  }

  return <LazyHealthyPreview />
}

export function SuspenseVsErrorBoundaryPanel() {
  const [shouldCrash, setShouldCrash] = useState(false)

  return (
    <section className="recovery-card" aria-labelledby="suspense-vs-error-title">
      <p className="recovery-card-kicker">9.7</p>
      <h3 id="suspense-vs-error-title">Suspense fallback vs Error Boundary fallback</h3>
      <p>
        Suspense owns pending UI. Error Boundaries own thrown errors. Keeping those
        fallbacks separate prevents loading states from hiding real failures.
      </p>
      <ErrorBoundary
        boundaryName="Suspense composition boundary"
        onReset={() => setShouldCrash(false)}
        resetButtonLabel="Reset error fallback"
      >
        <Suspense fallback={<p role="status">Loading healthy preview...</p>}>
          <ErrorPreview shouldCrash={shouldCrash} />
        </Suspense>
      </ErrorBoundary>
      <button type="button" onClick={() => setShouldCrash(true)}>
        Throw after Suspense boundary
      </button>
    </section>
  )
}
