import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SellerAuthProvider } from './sellerhub-auth-provider'
import { useSellerAuth } from './sellerhub-auth-context'

describe('useSellerAuth', () => {
  it('is tested through a real component wrapper and provider boundary', () => {
    render(
      <SellerAuthProvider initialSellerName="Mina">
        <AuthProbe />
      </SellerAuthProvider>,
    )

    expect(screen.getByText('Signed in as Mina')).toBeInTheDocument()
  })
})

function AuthProbe() {
  const auth = useSellerAuth()

  return <p>{auth.sellerName ? `Signed in as ${auth.sellerName}` : 'Signed out'}</p>
}
