import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { delay, http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { server } from '../sellerhub-tested-workflow/sellerhub-test-server'
import { SellerOrdersNetworkPanel } from './seller-orders-network-panel'

describe('SellerOrdersNetworkPanel', () => {
  it('uses MSW to mock the request boundary instead of component internals', async () => {
    const user = userEvent.setup()

    server.use(
      http.get('/api/testing/orders', async () => {
        await delay(50)
        return HttpResponse.json([{ id: 'order-2001', customer: 'Ava', total: 156 }])
      }),
    )

    render(<SellerOrdersNetworkPanel />)

    await user.click(screen.getByRole('button', { name: 'Load network orders' }))

    expect(screen.getByRole('status')).toHaveTextContent('Loading network orders...')
    expect(await screen.findByText('Ava: $156')).toBeInTheDocument()
  })
})
