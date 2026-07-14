import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SellerHubAccessibilityInteractionLab } from '../sellerhub-accessibility-interaction-lab/sellerhub-accessibility-interaction-lab'

describe('SellerHubAccessibilityInteractionLab', () => {
  test('renders the major accessibility lab sections', () => {
    render(<SellerHubAccessibilityInteractionLab />)

    expect(
      screen.getByRole('heading', { name: /sellerhub accessibility interaction lab/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /accessible filter form/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /orders table accessibility panel/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /help desk dialog with focus management/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /dashboard status live region/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /keyboard disclosure filter/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /settings error summary/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /accessibility review table/i }),
    ).toBeInTheDocument()
  })
})
