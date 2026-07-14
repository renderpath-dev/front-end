import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { SettingsFormStatePanel } from '../sellerhub-state-boundary-lab/settings-form-state-panel'

describe('SettingsFormStatePanel', () => {
  test('tracks draft, dirty state, validation, and reset behavior', async () => {
    const user = userEvent.setup()

    render(<SettingsFormStatePanel />)

    const storeNameInput = screen.getByRole('textbox', { name: /store name/i })

    await user.clear(storeNameInput)
    await user.type(storeNameInput, 'AB')

    expect(screen.getByRole('status')).toHaveTextContent('Dirty state: dirty')

    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('Review settings state errors.')
    expect(storeNameInput).toHaveAttribute('aria-invalid', 'true')

    await user.click(screen.getByRole('button', { name: /reset draft/i }))

    expect(screen.getByRole('status')).toHaveTextContent('Dirty state: clean')
    expect(storeNameInput).toHaveValue('SellerHub Demo Store')
  })

  test('resets the keyed draft when seller identity changes', async () => {
    const user = userEvent.setup()

    render(<SettingsFormStatePanel />)

    const sellerSelect = screen.getByRole('combobox', { name: /seller identity/i })

    await user.selectOptions(sellerSelect, 'seller-84')

    expect(screen.getByRole('textbox', { name: /store name/i })).toHaveValue('SellerHub Outlet')
  })
})
