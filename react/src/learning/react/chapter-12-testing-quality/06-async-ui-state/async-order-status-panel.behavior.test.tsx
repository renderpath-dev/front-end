import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AsyncOrderStatusPanel } from './async-order-status-panel'

describe('AsyncOrderStatusPanel', () => {
  it('waits for loading to become success output', async () => {
    const user = userEvent.setup()
    const deferredOrders = createDeferred([{ id: 'order-1001', label: 'Order 1001' }])
    const loadOrders = vi.fn(() => deferredOrders.promise)

    render(<AsyncOrderStatusPanel loadOrders={loadOrders} />)

    await user.click(screen.getByRole('button', { name: 'Load orders' }))

    expect(screen.getByRole('status')).toHaveTextContent('Loading orders...')

    deferredOrders.resolve()

    expect(await screen.findByText('Order 1001')).toBeInTheDocument()
    expect(loadOrders).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('renders an error branch when the promise rejects', async () => {
    const user = userEvent.setup()
    const loadOrders = vi.fn(() => Promise.reject(new Error('Network failed')))

    render(<AsyncOrderStatusPanel loadOrders={loadOrders} />)

    await user.click(screen.getByRole('button', { name: 'Load orders' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Orders could not be loaded.',
    )
  })
})

function createDeferred<TValue>(value: TValue) {
  let resolvePromise!: () => void
  const promise = new Promise<TValue>((resolve) => {
    resolvePromise = () => resolve(value)
  })

  return {
    promise,
    resolve: resolvePromise,
  }
}
