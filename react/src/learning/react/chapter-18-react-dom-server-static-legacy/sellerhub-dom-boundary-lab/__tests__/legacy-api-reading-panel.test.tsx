import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LegacyApiReadingPanel } from '../legacy-api-reading-panel'

describe('LegacyApiReadingPanel', () => {
  it('displays migration guidance for legacy reading APIs', () => {
    render(<LegacyApiReadingPanel />)

    expect(screen.getByRole('heading', { name: /legacy api reading panel/i })).toBeInTheDocument()
    expect(screen.getByText('cloneElement')).toBeInTheDocument()
    expect(
      screen.getByText('Prefer explicit props, render props, or context before prop injection.'),
    ).toBeInTheDocument()
  })
})
