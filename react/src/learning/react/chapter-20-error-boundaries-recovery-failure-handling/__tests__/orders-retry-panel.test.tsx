import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { OrdersRetryPanel } from '../sellerhub-recovery-boundary-lab/orders-retry-panel'

describe('OrdersRetryPanel', () => {
  test('shows request failure recovery UI and recovers through retry', async () => {
    const user = userEvent.setup()

    render(<OrdersRetryPanel />)

    expect(screen.getByText('Orders panel ready.')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /simulate orders failure/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('Orders request failed.')

    await user.click(screen.getByRole('button', { name: /retry orders request/i }))

    expect(screen.getByText('Orders recovered after retry.')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
