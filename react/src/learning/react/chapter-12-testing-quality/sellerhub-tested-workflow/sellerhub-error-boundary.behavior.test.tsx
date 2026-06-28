import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { BrokenWorkflowPanel, SellerHubErrorBoundary } from './sellerhub-error-boundary'

describe('SellerHubErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders fallback UI for render errors in a workflow section', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <SellerHubErrorBoundary>
        <BrokenWorkflowPanel />
      </SellerHubErrorBoundary>,
    )

    expect(screen.getByRole('alert')).toHaveTextContent(
      'SellerHub workflow failed to render.',
    )
  })
})
