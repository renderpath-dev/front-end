import { useState } from 'react'

type CatalogItem = {
  id: string
  name: string
}

const catalogItems: CatalogItem[] = [
  { id: 'lamp-101', name: 'Arc Desk Lamp' },
  { id: 'chair-204', name: 'Mesh Task Chair' },
  { id: 'light-305', name: 'Studio Floor Light' },
]

function CatalogDraftRow({ item }: { item: CatalogItem }) {
  const [draftLabel, setDraftLabel] = useState(item.name)

  return (
    <li className="performance-list-row">
      <code>{item.id}</code>
      <input
        aria-label={`Draft label for ${item.name}`}
        onChange={(event) => setDraftLabel(event.currentTarget.value)}
        value={draftLabel}
      />
    </li>
  )
}

export function ReconciliationKeyIdentity() {
  const [isReversed, setIsReversed] = useState(false)
  const [keyMode, setKeyMode] = useState<'stable' | 'index'>('stable')
  const visibleItems = isReversed ? [...catalogItems].reverse() : catalogItems

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">03 / Reconciliation identity</p>
      <h2>Type, position, and key determine which state is preserved</h2>
      <div className="performance-control-row">
        <button onClick={() => setIsReversed((reversed) => !reversed)} type="button">
          Reverse rows
        </button>
        <label>
          Key mode
          <select
            onChange={(event) => setKeyMode(event.currentTarget.value as 'stable' | 'index')}
            value={keyMode}
          >
            <option value="stable">Stable domain ID</option>
            <option value="index">Array index</option>
          </select>
        </label>
      </div>
      <ul className="performance-list">
        {visibleItems.map((item, index) => (
          <CatalogDraftRow item={item} key={keyMode === 'stable' ? item.id : index} />
        ))}
      </ul>
      <p className="performance-practice-note">
        Edit a row, then reverse it. Index keys preserve state by position instead of product ID.
      </p>
    </article>
  )
}
