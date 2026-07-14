import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, test } from 'vitest'
import { SellerHubStateBoundaryLab } from '../sellerhub-state-boundary-lab/sellerhub-state-boundary-lab'

describe('SellerHubStateBoundaryLab', () => {
  test('renders the major state boundary lab sections', () => {
    render(
      <MemoryRouter initialEntries={['/react/chapter-22?q=lamp&channel=marketplace']}>
        <SellerHubStateBoundaryLab />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /sellerhub state boundary lab/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /catalog filter url state/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /catalog filter codec/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /orders request state panel/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /settings form state panel/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /dashboard selection state panel/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /optimistic order note panel/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /state owner decision table/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /state architecture review card/i })).toBeInTheDocument()
  })
})
