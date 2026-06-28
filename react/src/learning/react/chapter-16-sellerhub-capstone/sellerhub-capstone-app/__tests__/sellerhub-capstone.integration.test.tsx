import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router'
import { describe, expect, it } from 'vitest'
import { SellerHubAppContext } from '../app/sellerhub-app-context'
import { SellerHubRouter } from '../app/sellerhub-router'

function LocationProbe() {
  const location = useLocation()
  return <output data-testid="location">{`${location.pathname}${location.search}`}</output>
}

describe('SellerHub capstone integration', () => {
  it('navigates, filters with URL state, and records an operations event', async () => {
    const user = userEvent.setup()

    render(
      <SellerHubAppContext initialCart={{ lines: [] }}>
        <MemoryRouter initialEntries={['/react/chapter-16/catalog']}>
          <SellerHubRouter />
          <LocationProbe />
        </MemoryRouter>
      </SellerHubAppContext>,
    )

    expect(
      await screen.findByRole('heading', { name: 'Product catalog' }),
    ).toBeInTheDocument()

    await user.type(screen.getByLabelText('Search products'), 'work')

    expect(screen.getByText('Seller Work Desk')).toBeInTheDocument()
    expect(screen.queryByText('Focus Desk Lamp')).not.toBeInTheDocument()
    expect(screen.getByTestId('location')).toHaveTextContent(
      '/react/chapter-16/catalog?query=work',
    )

    await user.click(screen.getByRole('link', { name: 'Operations' }))
    expect(
      await screen.findByRole('heading', { name: 'Operations and boundaries' }),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'Report local smoke event' }),
    )
    expect(screen.getByText(/1 normalized error events/)).toBeInTheDocument()
  })
})
