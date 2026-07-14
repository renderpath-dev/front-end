import { useDeferredValue, useMemo, useState, useTransition } from 'react'

const comparisonRows = [
  { id: 'row-1', title: 'Search value lag', kind: 'Value boundary' },
  { id: 'row-2', title: 'Tab content priority', kind: 'Update boundary' },
  { id: 'row-3', title: 'Pending indicator', kind: 'Update boundary' },
  { id: 'row-4', title: 'Stale list opacity', kind: 'Value boundary' },
]

export function DeferredVsTransitionPanel() {
  const [searchText, setSearchText] = useState('')
  const [activeKind, setActiveKind] = useState('Value boundary')
  const [visibleKind, setVisibleKind] = useState('Value boundary')
  const [isPending, startKindTransition] = useTransition()
  const deferredSearchText = useDeferredValue(searchText)

  const visibleRows = useMemo(() => {
    const normalizedSearchText = deferredSearchText.trim().toLowerCase()

    return comparisonRows.filter((row) => {
      const matchesText = row.title.toLowerCase().includes(normalizedSearchText)
      const matchesKind = row.kind === visibleKind

      return matchesText && matchesKind
    })
  }, [deferredSearchText, visibleKind])

  function selectKind(nextKind: string) {
    setActiveKind(nextKind)
    startKindTransition(() => {
      setVisibleKind(nextKind)
    })
  }

  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">Comparison</p>
      <h3>Deferred value vs transition</h3>
      <form className="api-gap-form">
        <label htmlFor="comparison-search">Search comparison rows</label>
        <input
          id="comparison-search"
          onChange={(event) => setSearchText(event.currentTarget.value)}
          value={searchText}
        />
        <label htmlFor="comparison-kind">Priority boundary</label>
        <select
          id="comparison-kind"
          onChange={(event) => selectKind(event.currentTarget.value)}
          value={activeKind}
        >
          <option>Value boundary</option>
          <option>Update boundary</option>
        </select>
      </form>
      <div className="api-gap-pill-row" aria-live="polite">
        <span className="api-gap-pill">
          Deferred text: {deferredSearchText || 'empty'}
        </span>
        <span className={`api-gap-pill${isPending ? ' api-gap-pill-warning' : ''}`}>
          {isPending ? 'Kind transition pending' : visibleKind}
        </span>
      </div>
      <ul className="api-gap-list" aria-label="Comparison rows">
        {visibleRows.map((row) => (
          <li key={row.id}>
            <strong>{row.title}</strong>
            <br />
            <span>{row.kind}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
