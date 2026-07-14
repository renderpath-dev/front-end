import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { AccessibleFilterForm } from '../sellerhub-accessibility-interaction-lab/accessible-filter-form'

describe('AccessibleFilterForm', () => {
  test('exposes label, description, and status feedback', async () => {
    const user = userEvent.setup()

    render(<AccessibleFilterForm />)

    const searchInput = screen.getByRole('searchbox', { name: /catalog search/i })

    expect(searchInput).toHaveAccessibleDescription(
      'Search by product name, SKU, or seller note.',
    )

    await user.type(searchInput, 'lamp')
    await user.click(screen.getByRole('button', { name: /apply filters/i }))

    expect(screen.getByRole('status')).toHaveTextContent('Catalog filters applied for lamp.')
  })
})
