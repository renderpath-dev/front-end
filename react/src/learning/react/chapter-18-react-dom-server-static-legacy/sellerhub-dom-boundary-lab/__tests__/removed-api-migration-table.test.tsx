import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RemovedApiMigrationTable } from '../removed-api-migration-table'

describe('RemovedApiMigrationTable', () => {
  it('shows removed React DOM APIs with modern replacements', () => {
    render(<RemovedApiMigrationTable />)

    expect(screen.getByText('ReactDOM.render')).toBeInTheDocument()
    expect(screen.getByText('createRoot(container).render(<App />)')).toBeInTheDocument()
    expect(screen.getByText('findDOMNode')).toBeInTheDocument()
    expect(screen.getByText('Explicit refs')).toBeInTheDocument()
    expect(screen.getByText('unmountComponentAtNode')).toBeInTheDocument()
    expect(screen.getByText('root.unmount()')).toBeInTheDocument()
  })
})
