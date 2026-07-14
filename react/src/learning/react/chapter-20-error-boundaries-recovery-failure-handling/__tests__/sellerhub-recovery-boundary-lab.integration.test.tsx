import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SellerHubRecoveryBoundaryLab } from '../sellerhub-recovery-boundary-lab/sellerhub-recovery-boundary-lab'

describe('SellerHubRecoveryBoundaryLab', () => {
  test('renders the major recovery lab sections', () => {
    render(<SellerHubRecoveryBoundaryLab />)

    expect(
      screen.getByRole('heading', { name: /sellerhub recovery boundary lab/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /catalog crash lab/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /orders retry panel/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /dashboard widget boundary/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /plugin isolation panel/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /suspense and error boundary composition/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /error log preview/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /recovery decision table/i }),
    ).toBeInTheDocument()
  })
})
