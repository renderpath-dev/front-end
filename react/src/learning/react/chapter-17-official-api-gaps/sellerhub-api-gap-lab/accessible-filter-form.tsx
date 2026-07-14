import { useId, useState } from 'react'

export function AccessibleFilterForm() {
  const queryId = useId()
  const stageId = useId()
  const helpTextId = useId()
  const [query, setQuery] = useState('')
  const [stage, setStage] = useState('Ready')

  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">Final lab · useId</p>
      <h3>Accessible filter form</h3>
      <form className="api-gap-form">
        <label htmlFor={queryId}>Product query</label>
        <input
          aria-describedby={helpTextId}
          id={queryId}
          onChange={(event) => setQuery(event.currentTarget.value)}
          value={query}
        />
        <label htmlFor={stageId}>Product stage</label>
        <select id={stageId} onChange={(event) => setStage(event.currentTarget.value)} value={stage}>
          <option>Ready</option>
          <option>Review</option>
          <option>Blocked</option>
        </select>
        <p className="api-gap-muted" id={helpTextId}>
          The query field uses a generated description ID that remains separate from list keys.
        </p>
      </form>
      <p>
        Current filter: {query || 'empty'} · {stage}
      </p>
    </article>
  )
}
