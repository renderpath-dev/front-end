import { useState } from 'react'

const ownerRows = [
  ['Catalog query draft', 'Catalog search form'],
  ['Shareable filters', 'URL search params'],
  ['Orders data', 'Remote orders source'],
  ['Dashboard tab', 'Dashboard panel'],
] as const

export function StateOwnerBoundaryPanel() {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="state-card">
      <p className="state-card-kicker">9.1 owner first</p>
      <h3>State owner boundary</h3>
      <p>
        Start with who can change the value and who must observe the same snapshot before
        choosing a hook or storage location.
      </p>
      <button type="button" onClick={() => setExpanded((current) => !current)}>
        {expanded ? 'Hide owner map' : 'Show owner map'}
      </button>
      {expanded ? (
        <ul className="state-owner-list">
          {ownerRows.map(([stateName, owner]) => (
            <li key={stateName}>
              <span>{stateName}</span>
              <strong>{owner}</strong>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}
