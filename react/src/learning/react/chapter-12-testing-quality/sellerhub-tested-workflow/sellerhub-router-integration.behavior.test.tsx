import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { SellerAuthProvider } from './sellerhub-auth-provider'
import { SellerHubTestedWorkflowRoutes } from './sellerhub-workflow-routes'

describe('SellerHubTestedWorkflowRoutes', () => {
  it('redirects an unauthenticated seller route to login UI', async () => {
    render(
      <SellerAuthProvider>
        <MemoryRouter initialEntries={['/seller/orders']}>
          <SellerHubTestedWorkflowRoutes />
        </MemoryRouter>
      </SellerAuthProvider>,
    )

    expect(await screen.findByRole('heading', { name: 'Login required' })).toBeInTheDocument()
    expect(screen.getByText('Redirect target: /seller/orders')).toBeInTheDocument()
  })

  it('renders the protected orders route when the provider supplies auth state', () => {
    render(
      <SellerAuthProvider initialSellerName="Mina">
        <MemoryRouter initialEntries={['/seller/orders']}>
          <SellerHubTestedWorkflowRoutes />
        </MemoryRouter>
      </SellerAuthProvider>,
    )

    expect(screen.getByRole('heading', { name: 'Seller orders' })).toBeInTheDocument()
  })
})
