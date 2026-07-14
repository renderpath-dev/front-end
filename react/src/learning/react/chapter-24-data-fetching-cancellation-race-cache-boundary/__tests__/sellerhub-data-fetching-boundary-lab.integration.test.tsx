import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SellerHubDataFetchingBoundaryLab } from '../sellerhub-data-fetching-boundary-lab/sellerhub-data-fetching-boundary-lab'

describe('SellerHubDataFetchingBoundaryLab', () => {
  it('renders the major lab sections and visible async state UI', async () => {
    render(<SellerHubDataFetchingBoundaryLab />)

    expect(
      screen.getByRole('heading', { name: 'SellerHub Data Fetching Boundary Lab' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Catalog query resource panel' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Catalog resource key / codec panel' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Orders request lifecycle panel' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Abortable catalog search panel' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Race condition demo panel' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Cache key and dedupe panel' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Pagination load-more lab' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Optimistic order note mutation panel' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Async status region' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Data fetching review table' })).toBeInTheDocument()
    expect(screen.getAllByRole('status').length).toBeGreaterThan(0)

    expect(await screen.findByText(/Desk Lamp Pro/)).toBeInTheDocument()
  })
})
