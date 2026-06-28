import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AccessibleLoginForm } from './accessible-login-form'

describe('AccessibleLoginForm', () => {
  it('exposes fields and actions through accessible names', () => {
    render(<AccessibleLoginForm />)

    expect(screen.getByRole('heading', { name: 'Seller login' })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeEnabled()
  })

  it('lets the test observe error feedback through an alert role', () => {
    render(<AccessibleLoginForm errorMessage="Invalid credentials" />)

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials')
  })
})
