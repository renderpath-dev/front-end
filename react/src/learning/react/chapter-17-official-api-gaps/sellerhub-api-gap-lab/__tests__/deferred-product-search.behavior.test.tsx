import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { DeferredProductSearch } from '../deferred-product-search'

describe('DeferredProductSearch', () => {
  it('filters products from the accessible search input', async () => {
    const user = userEvent.setup()

    render(<DeferredProductSearch />)

    await user.type(screen.getByRole('textbox', { name: 'Search products' }), 'Studio')

    expect(await screen.findByText('Studio Light Kit')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByText('USB-C Seller Dock')).not.toBeInTheDocument()
    })
  })
})
