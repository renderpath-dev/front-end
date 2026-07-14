import { describe, expect, it } from 'vitest'
import {
  classifyAbortableRequestError,
  createAbortError,
  createAbortableRequestController,
} from '../07-abort-controller/abortable-fetch-model'

describe('abortable fetch model', () => {
  it('creates a fresh controller and signal per request', () => {
    const first = createAbortableRequestController()
    const second = createAbortableRequestController()

    expect(first.controller).not.toBe(second.controller)
    expect(first.signal).not.toBe(second.signal)
  })

  it('classifies AbortError separately from other failures', () => {
    expect(classifyAbortableRequestError(createAbortError())).toBe('aborted')
    expect(classifyAbortableRequestError(new Error('Network failed'))).toBe('failed')
  })
})
