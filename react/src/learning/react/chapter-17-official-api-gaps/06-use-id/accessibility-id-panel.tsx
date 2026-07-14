import { useId, useState } from 'react'

export function AccessibilityIdPanel() {
  const fieldId = useId()
  const descriptionId = useId()
  const [query, setQuery] = useState('')

  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">useId</p>
      <h3>Accessibility ID boundary</h3>
      <form className="api-gap-form">
        <label htmlFor={fieldId}>Accessible seller query</label>
        <input
          aria-describedby={descriptionId}
          id={fieldId}
          onChange={(event) => setQuery(event.currentTarget.value)}
          value={query}
        />
        <p className="api-gap-muted" id={descriptionId}>
          The generated ID connects this input to its help text without using list keys.
        </p>
      </form>
      <span className="api-gap-pill">Current query: {query || 'empty'}</span>
    </article>
  )
}
