import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { KeyboardDisclosureFilter } from '../sellerhub-accessibility-interaction-lab/keyboard-disclosure-filter'

describe('KeyboardDisclosureFilter', () => {
  test('toggles with keyboard activation and updates aria-expanded', async () => {
    const user = userEvent.setup()

    render(<KeyboardDisclosureFilter />)

    const button = screen.getByRole('button', { name: /toggle advanced filters/i })
    button.focus()

    expect(button).toHaveAttribute('aria-expanded', 'false')

    await user.keyboard('{Enter}')

    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByLabelText(/minimum rating/i)).toBeInTheDocument()

    await user.tab()
    await user.keyboard('{Escape}')

    expect(button).toHaveAttribute('aria-expanded', 'false')
  })
})
