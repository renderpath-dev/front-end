import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SellerPreferenceSummary } from './seller-preference-summary'
import { SellerPreferencesProvider } from './seller-preferences-provider'

describe('SellerPreferenceSummary', () => {
  it('reads custom hook output through the provider boundary', () => {
    render(
      <SellerPreferencesProvider value={{ compactMode: true, currency: 'EUR' }}>
        <SellerPreferenceSummary />
      </SellerPreferencesProvider>,
    )

    expect(screen.getByText('Currency: EUR')).toBeInTheDocument()
    expect(screen.getByText('Compact mode: enabled')).toBeInTheDocument()
  })
})
