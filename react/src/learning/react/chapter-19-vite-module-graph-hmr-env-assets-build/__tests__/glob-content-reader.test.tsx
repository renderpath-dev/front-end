import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { GlobContentReader } from '../sellerhub-vite-boundary-lab/glob-content-reader'

describe('GlobContentReader', () => {
  it('renders content entries discovered by the Vite glob transform', () => {
    render(<GlobContentReader />)

    expect(screen.getByRole('heading', { name: /glob content reader/i })).toBeInTheDocument()
    expect(screen.getByText('Catalog workflow note')).toBeInTheDocument()
    expect(screen.getByText('Orders workflow note')).toBeInTheDocument()
  })
})
