import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { HelpDeskDialog } from '../sellerhub-accessibility-interaction-lab/help-desk-dialog'

describe('HelpDeskDialog', () => {
  test('opens, moves focus, closes with Escape, and restores opener focus', async () => {
    const user = userEvent.setup()

    render(<HelpDeskDialog />)

    const opener = screen.getByRole('button', { name: /open help desk dialog/i })

    await user.click(opener)

    const dialog = screen.getByRole('dialog', { name: /sellerhub help desk/i })
    const closeButton = screen.getByRole('button', { name: /close help desk dialog/i })

    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(closeButton).toHaveFocus()

    await user.keyboard('{Escape}')

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    await waitFor(() => expect(opener).toHaveFocus())
  })

  test('closes with the visible close button', async () => {
    const user = userEvent.setup()

    render(<HelpDeskDialog />)

    await user.click(screen.getByRole('button', { name: /open help desk dialog/i }))
    await user.click(screen.getByRole('button', { name: /close help desk dialog/i }))

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })
})
