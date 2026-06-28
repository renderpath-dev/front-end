import { useState } from 'react'
import type { FormEvent } from 'react'
import type { CatalogFilterValues } from './sellerhub-testing-types'

type SellerHubCatalogFilterProps = {
  onApply: (values: CatalogFilterValues) => void
}

export function SellerHubCatalogFilter({ onApply }: SellerHubCatalogFilterProps) {
  const [values, setValues] = useState<CatalogFilterValues>({
    query: '',
    status: 'all',
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    onApply(values)
  }

  return (
    <form className="workflow-card" onSubmit={handleSubmit}>
      <h3>Catalog filter</h3>
      <label className="field-label" htmlFor="workflow-catalog-query">
        Search catalog
      </label>
      <input
        className="text-input"
        id="workflow-catalog-query"
        onChange={(event) => {
          const query = event.currentTarget.value

          setValues((currentValues) => ({
            ...currentValues,
            query,
          }))
        }}
        value={values.query}
      />

      <label className="field-label" htmlFor="workflow-catalog-status">
        Catalog status
      </label>
      <select
        id="workflow-catalog-status"
        onChange={(event) => {
          const status = event.currentTarget.value as CatalogFilterValues['status']

          setValues((currentValues) => ({
            ...currentValues,
            status,
          }))
        }}
        value={values.status}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="archived">Archived</option>
      </select>

      <button type="submit">Apply catalog filter</button>
    </form>
  )
}
