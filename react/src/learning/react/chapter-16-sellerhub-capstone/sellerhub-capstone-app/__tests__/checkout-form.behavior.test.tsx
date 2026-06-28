import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { SellerHubAppContext } from '../app/sellerhub-app-context'
import { CheckoutForm } from '../features/checkout/checkout-form'

const initialCart = {
  lines: [
    {
      productId: 'product-lamp',
      name: 'Focus Lamp',
      unitPriceInCents: 4599,
      quantity: 1,
    },
  ],
}

function renderCheckout() {
  return render(
    <SellerHubAppContext initialCart={initialCart}>
      <CheckoutForm />
    </SellerHubAppContext>,
  )
}

describe('checkout form behavior', () => {
  it('shows field validation before calling the gateway', async () => {
    const user = userEvent.setup()
    renderCheckout()

    await user.click(screen.getByRole('button', { name: 'Place local order' }))

    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
    expect(screen.getByText('Enter a complete shipping address.')).toBeInTheDocument()
    expect(screen.getByText('Accept the local demo terms.')).toBeInTheDocument()
  })

  it('shows a known conflict and then accepts a valid local order', async () => {
    const user = userEvent.setup()
    renderCheckout()

    await user.type(screen.getByLabelText('Email'), 'blocked@example.com')
    await user.type(
      screen.getByLabelText('Shipping address'),
      '16 Evidence Street',
    )
    await user.click(screen.getByLabelText('Accept local demo terms'))
    await user.click(screen.getByRole('button', { name: 'Place local order' }))

    expect(await screen.findByText('Checkout requires review')).toBeInTheDocument()

    await user.clear(screen.getByLabelText('Email'))
    await user.type(screen.getByLabelText('Email'), 'buyer@example.com')
    await user.click(screen.getByRole('button', { name: 'Place local order' }))

    expect(await screen.findByRole('heading', { name: 'Order accepted' })).toBeInTheDocument()
  })
})
