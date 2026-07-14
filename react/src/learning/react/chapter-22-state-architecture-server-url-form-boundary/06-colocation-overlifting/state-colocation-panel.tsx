import { useState } from 'react'

export function StateColocationPanel() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [sharedView, setSharedView] = useState('summary')

  return (
    <article className="state-card">
      <p className="state-card-kicker">9.6 colocation</p>
      <h3>State colocation vs over-lifting</h3>
      <button type="button" onClick={() => setIsMenuOpen((current) => !current)}>
        {isMenuOpen ? 'Close local menu' : 'Open local menu'}
      </button>
      {isMenuOpen ? <p>The dropdown flag stays inside the dropdown owner.</p> : null}
      <div className="state-button-row" role="group" aria-label="Shared dashboard view">
        {['summary', 'risk'].map((view) => (
          <button
            aria-pressed={sharedView === view}
            key={view}
            type="button"
            onClick={() => setSharedView(view)}
          >
            {view}
          </button>
        ))}
      </div>
      <p>Parent-owned view: {sharedView}</p>
    </article>
  )
}
