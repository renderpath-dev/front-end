import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SellerHubReleaseEvidenceLab } from '../sellerhub-release-evidence-lab/sellerhub-release-evidence-lab'

describe('SellerHub Release Evidence Lab', () => {
  it('renders the major release evidence sections', () => {
    render(<SellerHubReleaseEvidenceLab />)

    expect(screen.getByRole('heading', { name: /SellerHub Release Evidence Lab/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Release metadata card/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Runtime error simulator/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Error Boundary log preview/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Performance mark lab/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /React Profiler sample panel/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Web Vitals threshold card/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Bundle and chunk review card/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Async observability card/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Accessibility release check card/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Security and privacy review card/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Release gate checklist/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Rollback decision panel/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Incident triage card/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Release readiness review table/i })).toBeInTheDocument()
  })
})
