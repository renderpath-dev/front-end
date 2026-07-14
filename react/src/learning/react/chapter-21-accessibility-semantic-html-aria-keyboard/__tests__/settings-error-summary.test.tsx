import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { SettingsErrorSummary } from '../sellerhub-accessibility-interaction-lab/settings-error-summary'

describe('SettingsErrorSummary', () => {
  test('shows an error summary and focuses the invalid field', async () => {
    const user = userEvent.setup()

    render(<SettingsErrorSummary />)

    const storeNameInput = screen.getByRole('textbox', { name: /store name/i })

    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('Review settings errors')
    expect(storeNameInput).toHaveAttribute('aria-invalid', 'true')
    expect(storeNameInput).toHaveFocus()
  })
})
