import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SellerHubDomBoundaryLab } from '../sellerhub-dom-boundary-lab'

describe('SellerHubDomBoundaryLab', () => {
  it('renders the major boundary sections', () => {
    render(<SellerHubDomBoundaryLab />)

    expect(
      screen.getByRole('heading', { name: /sellerhub dom boundary lab/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /portal help desk modal/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /flushSync scroll measurement/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /resource preload decision panel/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /server and static api boundary/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /removed api migration table/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /dom boundary decision table/i }),
    ).toBeInTheDocument()
  })
})
