import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { SellerRouteWorkspace } from './seller-route-workspace'

describe('SellerRouteWorkspace', () => {
  it('renders a route using an initial location', () => {
    render(
      <MemoryRouter initialEntries={['/seller/orders/1001']}>
        <SellerRouteWorkspace isAuthenticated />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Order detail 1001' })).toBeInTheDocument()
  })

  it('renders the protected route guard with redirect context', async () => {
    render(
      <MemoryRouter initialEntries={['/seller/orders']}>
        <SellerRouteWorkspace />
      </MemoryRouter>,
    )

    expect(await screen.findByRole('heading', { name: 'Login route' })).toBeInTheDocument()
    expect(screen.getByText('Redirect target: /seller/orders')).toBeInTheDocument()
  })
})
