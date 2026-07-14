import { describe, expect, it } from 'vitest'
import { classifyRuntimeFailure } from '../05-error-classification/error-classifier'

describe('error classifier', () => {
  it('separates render, chunk, request, parse, abort, timeout, and unknown failures', () => {
    expect(classifyRuntimeFailure({ source: 'render' }).kind).toBe('render')
    expect(classifyRuntimeFailure({ message: 'Loading chunk failed' }).kind).toBe('chunk')
    expect(classifyRuntimeFailure({ message: 'fetch failed due to network' }).kind).toBe(
      'network',
    )
    expect(classifyRuntimeFailure({ status: 500 }).kind).toBe('http')
    expect(classifyRuntimeFailure({ message: 'JSON parse failed' }).kind).toBe('parse')
    expect(classifyRuntimeFailure({ name: 'AbortError' }).kind).toBe('abort')
    expect(classifyRuntimeFailure({ name: 'TimeoutError' }).kind).toBe('timeout')
    expect(classifyRuntimeFailure({}).kind).toBe('unknown')
  })
})
