import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SellerHubViteBoundaryLab } from '../sellerhub-vite-boundary-lab/sellerhub-vite-boundary-lab'

describe('SellerHubViteBoundaryLab', () => {
  it('renders the major Vite boundary lab sections', () => {
    render(<SellerHubViteBoundaryLab />)

    expect(
      screen.getByRole('heading', { name: /sellerhub vite boundary lab/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /module graph inspector/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /hmr lifecycle card/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /env exposure auditor/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /asset import lab/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /worker metric panel/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /glob content reader/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /dynamic chunk boundary card/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /build\/deploy decision table/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /tooling review checklist/i })).toBeInTheDocument()
  })
})
