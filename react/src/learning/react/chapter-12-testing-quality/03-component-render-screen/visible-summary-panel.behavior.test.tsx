import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VisibleSummaryPanel } from './visible-summary-panel'

describe('VisibleSummaryPanel', () => {
  it('renders user-visible summary output', () => {
    render(<VisibleSummaryPanel hasErrors={false} orderCount={2} productCount={5} />)

    expect(
      screen.getByRole('heading', { name: 'Visible SellerHub summary' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Visible products')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('SellerHub is ready.')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('renders the alert branch when the summary has errors', () => {
    render(<VisibleSummaryPanel hasErrors orderCount={0} productCount={0} />)

    expect(screen.getByRole('alert')).toHaveTextContent('SellerHub needs attention.')
  })
})
