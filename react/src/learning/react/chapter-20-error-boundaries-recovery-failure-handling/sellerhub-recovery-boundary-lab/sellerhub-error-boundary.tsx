import { ErrorBoundary } from '../02-error-boundary-class/error-boundary'
import type { ErrorBoundaryFallbackProps } from '../02-error-boundary-class/error-boundary'
import type { ErrorInfo, ReactNode } from 'react'

type SellerHubErrorBoundaryProps = {
  boundaryName: string
  children: ReactNode
  fallbackTitle?: string
  onError?: (error: Error, info: ErrorInfo) => void
  onReset?: () => void
  resetButtonLabel?: string
  resetKeys?: readonly unknown[]
}

function SellerHubFallback({
  boundaryName,
  error,
  fallbackTitle,
  resetButtonLabel,
  resetErrorBoundary,
}: ErrorBoundaryFallbackProps & {
  fallbackTitle?: string
  resetButtonLabel?: string
}) {
  return (
    <section aria-live="assertive" className="recovery-boundary-fallback" role="alert">
      <p className="recovery-card-kicker">{boundaryName}</p>
      <h3>{fallbackTitle ?? 'This SellerHub section stopped rendering.'}</h3>
      <p>
        The surrounding workspace is still available. Use the recovery action after the
        failed input or widget state has been cleared.
      </p>
      <p className="recovery-error-note">Captured error: {error.message}</p>
      <button type="button" onClick={resetErrorBoundary}>
        {resetButtonLabel ?? 'Try again'}
      </button>
    </section>
  )
}

export function SellerHubErrorBoundary({
  boundaryName,
  children,
  fallbackTitle,
  onError,
  onReset,
  resetButtonLabel,
  resetKeys,
}: SellerHubErrorBoundaryProps) {
  return (
    <ErrorBoundary
      boundaryName={boundaryName}
      fallbackRender={(fallbackProps) => (
        <SellerHubFallback
          {...fallbackProps}
          fallbackTitle={fallbackTitle}
          resetButtonLabel={resetButtonLabel}
        />
      )}
      onError={onError}
      onReset={onReset}
      resetKeys={resetKeys}
    >
      {children}
    </ErrorBoundary>
  )
}
