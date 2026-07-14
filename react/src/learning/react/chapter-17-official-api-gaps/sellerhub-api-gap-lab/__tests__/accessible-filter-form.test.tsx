import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AccessibleFilterForm } from '../accessible-filter-form'

describe('AccessibleFilterForm', () => {
  it('connects labels and generated descriptions through accessible fields', () => {
    render(<AccessibleFilterForm />)

    const queryField = screen.getByLabelText('Product query')
    const stageField = screen.getByLabelText('Product stage')

    expect(queryField).toHaveAccessibleDescription(
      'The query field uses a generated description ID that remains separate from list keys.',
    )
    expect(stageField).toBeInTheDocument()
  })
})
