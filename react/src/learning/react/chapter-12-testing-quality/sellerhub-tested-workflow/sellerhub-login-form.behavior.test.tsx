import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SellerHubLoginForm } from './sellerhub-login-form'

describe('SellerHubLoginForm', () => {
  it('blocks invalid credentials with visible validation feedback', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<SellerHubLoginForm onSubmit={handleSubmit} />)

    await user.type(screen.getByLabelText('Email'), 'seller@example.com')
    await user.type(screen.getByLabelText('Password'), '123')
    await user.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter a valid email and password.',
    )
    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('submits valid controlled values', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<SellerHubLoginForm onSubmit={handleSubmit} />)

    await user.type(screen.getByLabelText('Email'), 'seller@example.com')
    await user.type(screen.getByLabelText('Password'), 'secret1')
    await user.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'seller@example.com',
      password: 'secret1',
    })
  })
})
