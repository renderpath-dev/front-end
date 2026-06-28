import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SellerFilterForm } from './seller-filter-form'

describe('SellerFilterForm', () => {
  it('submits the current controlled form values', async () => {
    const user = userEvent.setup()
    const handleApply = vi.fn()

    render(<SellerFilterForm onApply={handleApply} />)

    await user.type(screen.getByLabelText('Search products'), 'lamp')
    await user.selectOptions(screen.getByLabelText('Product status'), 'active')
    await user.click(screen.getByRole('checkbox', { name: 'In stock only' }))
    await user.click(screen.getByRole('button', { name: 'Apply filters' }))

    expect(handleApply).toHaveBeenCalledWith({
      query: 'lamp',
      status: 'active',
      inStockOnly: true,
    })
  })
})
