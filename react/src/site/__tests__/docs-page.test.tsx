import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'
import { DocsPage } from '../pages/DocsPage'

function renderDocsRoute(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<DocsPage />} path="/docs/:chapterSlug" />
      </Routes>
    </MemoryRouter>,
  )
}

describe('DocsPage', () => {
  it('renders the same sixteen chapters and marks the active chapter', async () => {
    const { container } = renderDocsRoute('/docs/chapter-07-effects-and-refs')
    const desktopNavigation = screen.getAllByRole('navigation', { name: 'Chapters' })[0]

    expect(within(desktopNavigation).getAllByRole('link')).toHaveLength(16)
    expect(within(desktopNavigation).getByRole('link', { current: 'page' })).toHaveAttribute(
      'href',
      '/docs/chapter-07-effects-and-refs',
    )

    await waitFor(() => {
      expect(container.querySelector('[data-chapter-id="react-07"]')).toBeInTheDocument()
    }, { timeout: 5000 })
  })

  it('renders a useful state for an invalid chapter slug', () => {
    renderDocsRoute('/docs/not-a-real-chapter')

    expect(
      screen.getByRole('heading', {
        name: 'That chapter is not in the sixteen-chapter guide.',
      }),
    ).toBeInTheDocument()
  })

  it('opens and closes mobile chapter navigation and restores trigger focus', async () => {
    const user = userEvent.setup()
    renderDocsRoute('/docs/chapter-01-react-introduction')
    const trigger = screen.getByRole('button', { name: 'Open chapter navigation' })

    await user.click(trigger)
    expect(screen.getByText('Chapter navigation')).toBeInTheDocument()
    expect(screen.getAllByRole('navigation', { name: 'Chapters' })).toHaveLength(2)

    await user.click(screen.getAllByRole('button', { name: 'Close chapter navigation' })[1])
    await waitFor(() => expect(trigger).toHaveFocus())
    expect(screen.queryByText('Chapter navigation')).not.toBeInTheDocument()
  })
})
