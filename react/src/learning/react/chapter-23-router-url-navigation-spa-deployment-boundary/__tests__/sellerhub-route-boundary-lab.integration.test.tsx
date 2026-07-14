import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SellerHubRouteBoundaryLab } from '../sellerhub-route-boundary-lab/sellerhub-route-boundary-lab'

describe('SellerHubRouteBoundaryLab', () => {
  test('renders the major final lab sections', async () => {
    render(<SellerHubRouteBoundaryLab />)

    expect(
      screen.getByRole('heading', { name: 'SellerHub Route Boundary Lab' }),
    ).toBeInTheDocument()
    expect(
      await screen.findByRole('heading', { name: 'SellerHub route shell' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Catalog route boundary' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'SellerHub deployment boundary card' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'SellerHub route review table' }),
    ).toBeInTheDocument()
  })
})
