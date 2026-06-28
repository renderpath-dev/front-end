import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CrashingSellerWidget, RenderErrorBoundary } from './render-error-boundary'

describe('RenderErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders fallback UI for render-time errors', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <RenderErrorBoundary>
        <CrashingSellerWidget />
      </RenderErrorBoundary>,
    )

    expect(screen.getByRole('alert')).toHaveTextContent(
      'SellerHub section failed to render.',
    )
  })
})
