import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

export type ErrorBoundaryFallbackProps = {
  boundaryName: string
  error: Error
  resetErrorBoundary: () => void
}

type ErrorBoundaryProps = {
  boundaryName: string
  children: ReactNode
  fallback?: ReactNode
  fallbackRender?: (props: ErrorBoundaryFallbackProps) => ReactNode
  onError?: (error: Error, info: ErrorInfo) => void
  onReset?: () => void
  resetButtonLabel?: string
  resetKeys?: readonly unknown[]
}

type ErrorBoundaryState = {
  error: Error | null
}

function toError(error: unknown): Error {
  if (error instanceof Error) {
    return error
  }

  return new Error(String(error))
}

function resetKeysChanged(
  previousResetKeys: readonly unknown[] | undefined,
  nextResetKeys: readonly unknown[] | undefined,
): boolean {
  if (previousResetKeys === nextResetKeys) {
    return false
  }

  if (!previousResetKeys || !nextResetKeys) {
    return Boolean(previousResetKeys || nextResetKeys)
  }

  if (previousResetKeys.length !== nextResetKeys.length) {
    return true
  }

  return previousResetKeys.some(
    (previousKey, index) => !Object.is(previousKey, nextResetKeys[index]),
  )
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { error: toError(error) }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info)
  }

  componentDidUpdate(
    previousProps: ErrorBoundaryProps,
    previousState: ErrorBoundaryState,
  ): void {
    if (
      this.state.error &&
      previousState.error &&
      resetKeysChanged(previousProps.resetKeys, this.props.resetKeys)
    ) {
      this.resetErrorBoundary()
    }
  }

  resetErrorBoundary = (): void => {
    this.props.onReset?.()
    this.setState({ error: null })
  }

  render() {
    const { boundaryName, children, fallback, fallbackRender, resetButtonLabel } =
      this.props
    const { error } = this.state

    if (!error) {
      return children
    }

    if (fallbackRender) {
      return fallbackRender({
        boundaryName,
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      })
    }

    if (fallback) {
      return fallback
    }

    return (
      <section aria-live="assertive" className="recovery-boundary-fallback" role="alert">
        <p className="recovery-card-kicker">{boundaryName}</p>
        <h3>Something failed while rendering this section.</h3>
        <p>{error.message}</p>
        <button type="button" onClick={this.resetErrorBoundary}>
          {resetButtonLabel ?? 'Try again'}
        </button>
      </section>
    )
  }
}
