import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import type { ReactElement } from 'react'
import { describe, expect, test, vi } from 'vitest'
import { SellerHubErrorBoundary } from '../sellerhub-recovery-boundary-lab/sellerhub-error-boundary'

function silenceExpectedReactError() {
  return vi.spyOn(console, 'error').mockImplementation(() => undefined)
}

function ThrowingSellerWidget(): ReactElement {
  throw new Error('Seller widget render crash')
}

function HealthySellerWidget() {
  return <p>Seller widget recovered.</p>
}

function RetryBoundaryHarness() {
  const [shouldCrash, setShouldCrash] = useState(true)

  return (
    <SellerHubErrorBoundary
      boundaryName="Seller widget boundary"
      onReset={() => setShouldCrash(false)}
      resetButtonLabel="Retry seller widget"
    >
      {shouldCrash ? <ThrowingSellerWidget /> : <HealthySellerWidget />}
    </SellerHubErrorBoundary>
  )
}

describe('SellerHubErrorBoundary', () => {
  test('catches a render crash and shows fallback UI', () => {
    const restoreConsole = silenceExpectedReactError()

    try {
      render(
        <SellerHubErrorBoundary boundaryName="Seller widget boundary">
          <ThrowingSellerWidget />
        </SellerHubErrorBoundary>,
      )

      expect(screen.getByRole('alert')).toHaveTextContent(
        'This SellerHub section stopped rendering.',
      )
      expect(screen.getByText(/Seller widget render crash/i)).toBeInTheDocument()
    } finally {
      restoreConsole.mockRestore()
    }
  })

  test('reset clears fallback after the crash cause is removed', async () => {
    const user = userEvent.setup()
    const restoreConsole = silenceExpectedReactError()

    try {
      render(<RetryBoundaryHarness />)

      expect(screen.getByRole('alert')).toHaveTextContent(
        'This SellerHub section stopped rendering.',
      )

      await user.click(screen.getByRole('button', { name: /retry seller widget/i }))

      expect(screen.getByText('Seller widget recovered.')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    } finally {
      restoreConsole.mockRestore()
    }
  })
})
