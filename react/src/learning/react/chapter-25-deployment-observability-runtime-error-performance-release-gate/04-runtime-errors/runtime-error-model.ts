export type RuntimeDiagnosticSource =
  | 'error-boundary'
  | 'unhandled-rejection'
  | 'window-error'

export type RuntimeDiagnosticInput = {
  componentStack?: string
  correlationId: string
  error?: unknown
  message?: string
  reason?: unknown
  releaseId: string
  route: string
  source: RuntimeDiagnosticSource
  stack?: string
}

export type RuntimeDiagnosticEvent = {
  componentStack?: string
  correlationId: string
  message: string
  name: string
  releaseId: string
  route: string
  sanitizedStack?: string
  source: RuntimeDiagnosticSource
  userFacingMessage: string
}

export function normalizeWindowErrorEvent(
  input: Omit<RuntimeDiagnosticInput, 'source'>,
): RuntimeDiagnosticEvent {
  return normalizeRuntimeDiagnostic({ ...input, source: 'window-error' })
}

export function normalizeUnhandledRejection(
  input: Omit<RuntimeDiagnosticInput, 'source'>,
): RuntimeDiagnosticEvent {
  return normalizeRuntimeDiagnostic({ ...input, source: 'unhandled-rejection' })
}

export function normalizeErrorBoundaryLog(
  input: Omit<RuntimeDiagnosticInput, 'source'>,
): RuntimeDiagnosticEvent {
  return normalizeRuntimeDiagnostic({ ...input, source: 'error-boundary' })
}

export function normalizeRuntimeDiagnostic(
  input: RuntimeDiagnosticInput,
): RuntimeDiagnosticEvent {
  const errorLike = getErrorLike(input.error ?? input.reason)
  const message = input.message ?? errorLike.message
  const stack = input.stack ?? errorLike.stack

  return {
    componentStack: sanitizeComponentStack(input.componentStack),
    correlationId: input.correlationId,
    message: sanitizeDiagnosticText(message),
    name: errorLike.name,
    releaseId: input.releaseId,
    route: input.route,
    sanitizedStack: stack ? sanitizeDiagnosticText(stack) : undefined,
    source: input.source,
    userFacingMessage: 'Something went wrong. The release diagnostic was recorded locally.',
  }
}

export function sanitizeDiagnosticText(value: string): string {
  return value
    .replace(/([?&](token|session|password|secret)=)[^&\s]+/gi, '$1[redacted]')
    .replace(/Bearer\s+[A-Za-z0-9._-]+/gi, 'Bearer [redacted]')
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted-email]')
}

function sanitizeComponentStack(value: string | undefined): string | undefined {
  if (!value) {
    return undefined
  }

  return sanitizeDiagnosticText(value)
}

function getErrorLike(error: unknown): { message: string; name: string; stack?: string } {
  if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
      stack: error.stack,
    }
  }

  if (typeof error === 'string') {
    return {
      message: error,
      name: 'NonErrorThrow',
    }
  }

  return {
    message: 'Unknown runtime failure',
    name: 'UnknownError',
  }
}
