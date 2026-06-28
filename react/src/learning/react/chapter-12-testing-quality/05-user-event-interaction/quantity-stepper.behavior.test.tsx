import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { QuantityStepper } from './quantity-stepper'

describe('QuantityStepper', () => {
  it('updates quantity through a realistic click sequence', async () => {
    const user = userEvent.setup()

    render(<QuantityStepper initialQuantity={1} maxQuantity={3} />)

    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))
    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))
    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))

    expect(screen.getByLabelText('Quantity')).toHaveDisplayValue('3')
    expect(screen.getByText('Current quantity: 3')).toBeInTheDocument()
  })

  it('updates quantity through typed input', async () => {
    const user = userEvent.setup()

    render(<QuantityStepper initialQuantity={2} maxQuantity={5} />)

    const input = screen.getByLabelText('Quantity')

    await user.clear(input)
    await user.type(input, '4')

    expect(input).toHaveDisplayValue('4')
    expect(screen.getByText('Current quantity: 4')).toBeInTheDocument()
  })
})
