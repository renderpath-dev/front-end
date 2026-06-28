import { useState } from 'react'
import type { FormEvent } from 'react'

type SellerFilterValues = {
  query: string
  status: 'all' | 'active' | 'archived'
  inStockOnly: boolean
}

type SellerFilterFormProps = {
  onApply: (values: SellerFilterValues) => void
}

export function SellerFilterForm({ onApply }: SellerFilterFormProps) {
  const [values, setValues] = useState<SellerFilterValues>({
    query: '',
    status: 'all',
    inStockOnly: false,
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    onApply(values)
  }

  return (
    <form className="practice-panel" onSubmit={handleSubmit}>
      <p className="skill-pill">Controlled form test</p>
      <h2>Catalog filter</h2>

      <label className="field-label" htmlFor="catalog-query">
        Search products
      </label>
      <input
        className="text-input"
        id="catalog-query"
        onChange={(event) => {
          const query = event.currentTarget.value

          setValues((currentValues) => ({
            ...currentValues,
            query,
          }))
        }}
        value={values.query}
      />

      <label className="field-label" htmlFor="catalog-status">
        Product status
      </label>
      <select
        id="catalog-status"
        onChange={(event) => {
          const status = event.currentTarget.value as SellerFilterValues['status']

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

      <label className="checkbox-row">
        <input
          checked={values.inStockOnly}
          onChange={(event) => {
            const inStockOnly = event.currentTarget.checked

            setValues((currentValues) => ({
              ...currentValues,
              inStockOnly,
            }))
          }}
          type="checkbox"
        />
        In stock only
      </label>

      <button type="submit">Apply filters</button>
    </form>
  )
}
