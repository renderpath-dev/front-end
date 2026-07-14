import { describe, expect, it } from 'vitest'
import {
  normalizeErrorBoundaryLog,
  normalizeUnhandledRejection,
  normalizeWindowErrorEvent,
} from '../04-runtime-errors/runtime-error-model'

describe('runtime error model', () => {
  it('normalizes window error and unhandled rejection events', () => {
    const windowError = normalizeWindowErrorEvent({
      correlationId: 'corr-1',
      error: new Error('Failed for seller@example.com?token=abc'),
      releaseId: 'release-25',
      route: '/react/chapter-25',
    })
    const rejection = normalizeUnhandledRejection({
      correlationId: 'corr-2',
      reason: 'Async failure',
      releaseId: 'release-25',
      route: '/react/chapter-25',
    })

    expect(windowError.message).toContain('[redacted-email]')
    expect(windowError.message).toContain('token=[redacted]')
    expect(rejection.source).toBe('unhandled-rejection')
  })

  it('keeps Error Boundary component stack as diagnostic evidence', () => {
    const diagnostic = normalizeErrorBoundaryLog({
      componentStack: 'in SellerHubDashboard',
      correlationId: 'corr-3',
      error: new Error('Render failed'),
      releaseId: 'release-25',
      route: '/react/chapter-25',
    })

    expect(diagnostic.source).toBe('error-boundary')
    expect(diagnostic.componentStack).toBe('in SellerHubDashboard')
  })
})
