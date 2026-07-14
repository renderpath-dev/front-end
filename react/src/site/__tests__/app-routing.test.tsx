import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from '../../App'

function renderAt(pathname: string) {
  window.history.replaceState(null, '', pathname)
  return render(<App />)
}

describe('application routing', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/')
  })

  it('renders the landing page', () => {
    renderAt('/')
    expect(
      screen.getByRole('heading', { name: 'Understand React from runtime to production.' }),
    ).toBeInTheDocument()
  })

  it('renders Getting Started and Tutorial product routes', async () => {
    renderAt('/getting-started')
    expect(
      await screen.findByRole(
        'heading',
        { name: 'Start with the real workspace.' },
        { timeout: 5000 },
      ),
    ).toBeInTheDocument()
  })

  it('renders the Tutorial route with sixteen cards', async () => {
    renderAt('/tutorial')
    expect(
      await screen.findByRole('heading', { name: 'Tutorial' }, { timeout: 5000 }),
    ).toBeInTheDocument()
    expect(screen.getAllByTestId('tutorial-card')).toHaveLength(16)
  })

  it('renders a useful product not-found route', () => {
    renderAt('/missing-product-route')
    expect(
      screen.getByRole('heading', { name: 'This route is outside the learning map.' }),
    ).toBeInTheDocument()
  })

  it('keeps an ordinary chapter practice route reachable', async () => {
    renderAt('/react/chapter-01')
    expect(
      await screen.findByRole(
        'heading',
        { name: 'React describes UI with components' },
        { timeout: 5000 },
      ),
    ).toBeInTheDocument()
  })

  it('keeps Sudoku reachable as a separate application', async () => {
    renderAt('/sudoku')
    expect(
      await screen.findByRole('heading', { name: 'Daily Sudoku' }, { timeout: 5000 }),
    ).toBeInTheDocument()
  })

  it('keeps the routing-focused workspace reachable', async () => {
    renderAt('/practice')
    expect(
      await screen.findByRole(
        'heading',
        { name: 'Routing, URL State, and Navigation' },
        { timeout: 5000 },
      ),
    ).toBeInTheDocument()
  })

  it('keeps the performance nested route reachable', async () => {
    renderAt('/react/chapter-11/practice')
    expect(
      await screen.findByRole(
        'heading',
        { name: 'Performance, Memoization, and Code Splitting' },
        { timeout: 5000 },
      ),
    ).toBeInTheDocument()
  })

  it('keeps the capstone nested route reachable', async () => {
    renderAt('/react/chapter-16/catalog')
    expect(
      await screen.findByRole(
        'heading',
        { name: 'SellerHub Capstone and Production Feature Delivery' },
        { timeout: 5000 },
      ),
    ).toBeInTheDocument()
  })

  it('preserves the unlisted Chapter 17 practice route', async () => {
    renderAt('/react/chapter-17')
    expect(
      await screen.findByRole(
        'heading',
        { name: 'Official API Gaps, Escape Hatches, and External Store Boundary' },
        { timeout: 5000 },
      ),
    ).toBeInTheDocument()
  })
})
