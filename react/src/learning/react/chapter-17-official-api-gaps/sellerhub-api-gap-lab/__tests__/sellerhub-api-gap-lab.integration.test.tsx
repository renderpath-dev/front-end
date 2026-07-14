import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SellerHubApiGapLab } from '../sellerhub-api-gap-lab'

describe('SellerHubApiGapLab', () => {
  it('renders the integrated API gap workspace', () => {
    render(<SellerHubApiGapLab />)

    expect(
      screen.getByRole('heading', { name: 'SellerHub API Gap Lab' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Deferred product search' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Inventory store view' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'API gap decision table' })).toBeInTheDocument()
  })
})
