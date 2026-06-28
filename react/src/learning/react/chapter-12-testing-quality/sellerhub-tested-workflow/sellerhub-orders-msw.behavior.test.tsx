import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { SellerHubOrdersPanel } from './sellerhub-orders-panel'
import { server } from './sellerhub-test-server'

describe('SellerHubOrdersPanel', () => {
  it('renders loading and success states through the MSW request boundary', async () => {
    const user = userEvent.setup()

    render(<SellerHubOrdersPanel />)

    await user.click(screen.getByRole('button', { name: 'Load seller orders' }))

    expect(screen.getByRole('status')).toHaveTextContent('Loading seller orders...')
    expect(await screen.findByText('Mina open $240')).toBeInTheDocument()
    expect(screen.getByText('Noah shipped $125')).toBeInTheDocument()
  })

  it('renders an error state when the mocked API returns a server error', async () => {
    const user = userEvent.setup()

    server.use(http.get('/api/seller/orders', () => HttpResponse.json(null, { status: 500 })))

    render(<SellerHubOrdersPanel />)

    await user.click(screen.getByRole('button', { name: 'Load seller orders' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unable to load seller orders.',
    )
  })
})
