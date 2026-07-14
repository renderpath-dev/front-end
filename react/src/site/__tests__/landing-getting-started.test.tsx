import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { GettingStartedPage } from '../pages/GettingStartedPage'
import { LandingPage } from '../pages/LandingPage'

describe('LandingPage', () => {
  it('connects all primary actions and renders the three local technology icons', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /Get Started/ })).toHaveAttribute(
      'href',
      '/getting-started',
    )
    expect(screen.getByRole('link', { name: /Explore Tutorial/ })).toHaveAttribute(
      'href',
      '/tutorial',
    )
    expect(screen.getByRole('link', { name: /Read the chapter docs/ })).toHaveAttribute(
      'href',
      '/docs',
    )
    expect(screen.getByRole('img', { name: 'React' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'TypeScript' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Vite' })).toBeInTheDocument()
    expect(screen.getByText('LearningPath.tsx')).toBeInTheDocument()
  })

  it('keeps the full page content rendered when reduced motion is requested', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Your learning workflow' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'A typed path you can inspect' })).toBeVisible()
  })
})

describe('GettingStartedPage', () => {
  it('shows only real project commands and routes learners onward', () => {
    const { container } = render(
      <MemoryRouter>
        <GettingStartedPage />
      </MemoryRouter>,
    )

    const pageText = container.textContent ?? ''
    expect(pageText).toContain('npm install')
    expect(pageText).toContain('npm run dev')
    expect(pageText).toContain('npm run lint')
    expect(pageText).toContain('npm run typecheck')
    expect(pageText).toContain('npm run test')
    expect(pageText).toContain('npm run build')
    expect(pageText).toContain('npm run preview')
    expect(pageText).not.toContain('cd react')
    expect(screen.getByRole('link', { name: 'Open Tutorial' })).toHaveAttribute(
      'href',
      '/tutorial',
    )
    expect(screen.getByRole('link', { name: 'Read Docs' })).toHaveAttribute('href', '/docs')
  })
})
