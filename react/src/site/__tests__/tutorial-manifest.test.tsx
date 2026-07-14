import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { tutorialEntries } from '../data/learning-manifest'
import { TutorialPage } from '../pages/TutorialPage'

describe('TutorialPage', () => {
  it('renders exactly the shared sixteen-card curriculum in manifest order', () => {
    render(
      <MemoryRouter>
        <TutorialPage />
      </MemoryRouter>,
    )

    const cards = screen.getAllByTestId('tutorial-card')
    expect(cards).toHaveLength(16)

    cards.forEach((card, index) => {
      const entry = tutorialEntries[index]
      expect(within(card).getByRole('heading', { name: entry.title })).toBeInTheDocument()
      expect(within(card).getByRole('link')).toHaveAttribute('href', entry.href)
    })
  })

  it('keeps Sudoku separate and does not expose Chapter 17 as a Tutorial card', () => {
    render(
      <MemoryRouter>
        <TutorialPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Daily Sudoku' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Play Daily Sudoku/ })).toHaveAttribute(
      'href',
      '/sudoku',
    )
    expect(screen.queryByText('Chapter 17')).not.toBeInTheDocument()
  })
})
