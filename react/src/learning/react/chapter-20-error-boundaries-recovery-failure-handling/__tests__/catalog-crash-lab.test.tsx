import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import { CatalogCrashLab } from '../sellerhub-recovery-boundary-lab/catalog-crash-lab'

function silenceExpectedReactError() {
  return vi.spyOn(console, 'error').mockImplementation(() => undefined)
}

describe('CatalogCrashLab', () => {
  test('can trigger and recover from a catalog card render crash', async () => {
    const user = userEvent.setup()
    const restoreConsole = silenceExpectedReactError()

    try {
      render(<CatalogCrashLab />)

      expect(screen.getByText('Active listings are stable.')).toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: /crash catalog card/i }))

      expect(screen.getByRole('alert')).toHaveTextContent('Catalog card failed safely.')

      await user.click(screen.getByRole('button', { name: /recover catalog card/i }))

      expect(screen.getByText('Active listings are stable.')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    } finally {
      restoreConsole.mockRestore()
    }
  })
})
