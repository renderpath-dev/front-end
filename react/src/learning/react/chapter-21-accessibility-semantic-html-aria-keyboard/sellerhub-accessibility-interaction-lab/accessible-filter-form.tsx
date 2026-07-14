import { useId, useState } from 'react'
import type { FormEvent } from 'react'

export function AccessibleFilterForm() {
  const searchId = useId()
  const helpId = `${searchId}-help`
  const statusId = `${searchId}-status`
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('Search filters are ready.')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedQuery = query.trim()
    setStatus(
      trimmedQuery
        ? `Catalog filters applied for ${trimmedQuery}.`
        : 'Catalog filters cleared.',
    )
  }

  return (
    <section className="a11y-card" aria-labelledby="filter-form-title">
      <h3 id="filter-form-title">Accessible filter form</h3>
      <p>
        The visible label, help text, input value, and status update are all owned by
        the form instead of being only visual styling.
      </p>
      <form className="a11y-form" onSubmit={handleSubmit}>
        <label htmlFor={searchId}>Catalog search</label>
        <input
          aria-describedby={helpId}
          id={searchId}
          name="catalogSearch"
          onChange={(event) => setQuery(event.currentTarget.value)}
          type="search"
          value={query}
        />
        <p id={helpId}>Search by product name, SKU, or seller note.</p>
        <button type="submit">Apply filters</button>
      </form>
      <p aria-live="polite" id={statusId} role="status">
        {status}
      </p>
    </section>
  )
}
