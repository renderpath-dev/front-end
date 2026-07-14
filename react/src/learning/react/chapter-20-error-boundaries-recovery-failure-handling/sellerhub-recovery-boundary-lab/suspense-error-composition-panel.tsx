import { lazy, Suspense, useState } from 'react'
import type { ComponentType } from 'react'
import { SellerHubErrorBoundary } from './sellerhub-error-boundary'

const LazyRecoveryPreview = lazy(() =>
  Promise.resolve<{ default: ComponentType }>({
    default: function RecoveryPreview() {
      return <p className="recovery-success-note">Lazy recovery preview loaded.</p>
    },
  }),
)

function FailedLazyPreview({ shouldFail }: { shouldFail: boolean }) {
  if (shouldFail) {
    throw new Error('Lazy route chunk rejected before rendering the preview.')
  }

  return <LazyRecoveryPreview />
}

export function SuspenseErrorCompositionPanel() {
  const [shouldFail, setShouldFail] = useState(false)

  return (
    <section className="recovery-card" aria-labelledby="suspense-error-title">
      <h3 id="suspense-error-title">Suspense and Error Boundary composition</h3>
      <p>
        Suspense owns pending UI. Error Boundaries own rejected or thrown failures. This
        panel keeps the two fallbacks visually distinct.
      </p>
      <SellerHubErrorBoundary
        boundaryName="Lazy preview error boundary"
        fallbackTitle="Lazy preview failed."
        onReset={() => setShouldFail(false)}
        resetButtonLabel="Reset lazy preview"
        resetKeys={[shouldFail]}
      >
        <Suspense fallback={<p role="status">Loading lazy preview...</p>}>
          <FailedLazyPreview shouldFail={shouldFail} />
        </Suspense>
      </SellerHubErrorBoundary>
      <button type="button" onClick={() => setShouldFail(true)}>
        Simulate lazy failure
      </button>
    </section>
  )
}
