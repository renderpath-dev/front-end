import { useState } from 'react'

export function LiftedStateOwnerPanel() {
  const [selectedRegion, setSelectedRegion] = useState('North')

  return (
    <article className="state-card">
      <p className="state-card-kicker">9.5 closest common owner</p>
      <h3>Lifted state owner</h3>
      <p>
        Two controls must agree on one region, so the parent owns the selected value and passes
        controlled props down.
      </p>
      <div className="state-button-row" role="group" aria-label="Region selector">
        {['North', 'South', 'West'].map((region) => (
          <button
            aria-pressed={selectedRegion === region}
            key={region}
            type="button"
            onClick={() => setSelectedRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>
      <p>Catalog filter reads {selectedRegion}.</p>
      <p>Orders report reads {selectedRegion}.</p>
    </article>
  )
}
