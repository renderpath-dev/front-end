export type AbortableRequestController = {
  abort: () => void
  controller: AbortController
  signal: AbortSignal
}

export type AbortableRequestErrorKind = 'aborted' | 'failed'

export function createAbortableRequestController(): AbortableRequestController {
  const controller = new AbortController()

  return {
    abort: () => controller.abort(),
    controller,
    signal: controller.signal,
  }
}

export function classifyAbortableRequestError(error: unknown): AbortableRequestErrorKind {
  return isAbortLikeError(error) ? 'aborted' : 'failed'
}

export function isAbortLikeError(error: unknown): boolean {
  return (
    error instanceof DOMException && error.name === 'AbortError'
  ) || (
    error instanceof Error && error.name === 'AbortError'
  )
}

export function createAbortError(): DOMException {
  return new DOMException('The operation was aborted', 'AbortError')
}

export function createTimeoutError(): DOMException {
  return new DOMException('The operation timed out', 'TimeoutError')
}
