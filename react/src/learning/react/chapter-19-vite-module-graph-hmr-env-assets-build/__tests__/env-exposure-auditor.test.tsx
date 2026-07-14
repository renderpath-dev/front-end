import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { EnvExposureAuditor } from '../sellerhub-vite-boundary-lab/env-exposure-auditor'

describe('EnvExposureAuditor', () => {
  it('renders public and private env boundary guidance', () => {
    render(
      <EnvExposureAuditor
        entries={[
          {
            exampleValue: 'https://api.example.test',
            key: 'VITE_PUBLIC_API_BASE',
            purpose: 'Public client API origin',
          },
          {
            exampleValue: 'hidden from client',
            key: 'DATABASE_PASSWORD',
            purpose: 'Server-only database credential',
          },
        ]}
      />,
    )

    expect(screen.getByRole('heading', { name: /env exposure auditor/i })).toBeInTheDocument()
    expect(screen.getByText('VITE_PUBLIC_API_BASE')).toBeInTheDocument()
    expect(screen.getByText('Public client value')).toBeInTheDocument()
    expect(screen.getByText('DATABASE_PASSWORD')).toBeInTheDocument()
    expect(screen.getByText('Private server-only value')).toBeInTheDocument()
  })
})
