import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { SellerHubMemoryRouterLab } from '../sellerhub-route-boundary-lab/sellerhub-memory-router-lab'

describe('SellerHubMemoryRouterLab', () => {
  test('renders a nested product detail route from initial entries', () => {
    render(<SellerHubMemoryRouterLab initialEntries={['/sellerhub/catalog/product-201']} />)

    expect(
      screen.getByRole('heading', { name: 'Product route param detail' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Route-aware desk lamp/)).toBeInTheDocument()
  })

  test('link click changes visible route content', async () => {
    const user = userEvent.setup()
    render(<SellerHubMemoryRouterLab initialEntries={['/sellerhub/catalog']} />)

    await user.click(screen.getByRole('link', { name: 'Orders' }))

    expect(screen.getByRole('heading', { name: 'Orders route boundary' })).toBeInTheDocument()
  })

  test('protected route redirects unauthenticated users to login', () => {
    render(<SellerHubMemoryRouterLab initialEntries={['/sellerhub/settings']} />)

    expect(screen.getByRole('heading', { name: 'Login route boundary' })).toBeInTheDocument()
    expect(screen.getByText(/Redirect return path:/)).toHaveTextContent('/sellerhub/settings')
  })

  test('unknown routes render recovery UI', () => {
    render(<SellerHubMemoryRouterLab initialEntries={['/sellerhub/unknown']} />)

    expect(
      screen.getByRole('heading', { name: 'SellerHub not found route boundary' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Recover to catalog' })).toBeInTheDocument()
  })
})
