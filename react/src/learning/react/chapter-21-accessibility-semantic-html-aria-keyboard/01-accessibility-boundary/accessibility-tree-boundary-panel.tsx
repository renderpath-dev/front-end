import { useState } from 'react'

export function AccessibilityTreeBoundaryPanel() {
  const [nativeCount, setNativeCount] = useState(0)
  const [customCount, setCustomCount] = useState(0)

  function activateCustomButton() {
    setCustomCount((currentCount) => currentCount + 1)
  }

  return (
    <section className="a11y-card" aria-labelledby="accessibility-boundary-title">
      <p className="a11y-card-kicker">9.1</p>
      <h3 id="accessibility-boundary-title">Accessibility tree boundary</h3>
      <p>
        React renders DOM. The browser derives semantics, names, states, and focus behavior
        from that DOM into the accessibility tree.
      </p>
      <div className="a11y-example-pair">
        <article className="a11y-example-card">
          <h4>Native button</h4>
          <button type="button" onClick={() => setNativeCount((count) => count + 1)}>
            Native button clicks: {nativeCount}
          </button>
          <p>Role, keyboard activation, and focus behavior come from the platform.</p>
        </article>
        <article className="a11y-example-card">
          <h4>Custom role button boundary</h4>
          <div
            className="a11y-custom-button"
            onClick={activateCustomButton}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                activateCustomButton()
              }
            }}
            role="button"
            tabIndex={0}
          >
            Custom role button activations: {customCount}
          </div>
          <p>ARIA adds semantics, but JavaScript must add keyboard behavior.</p>
        </article>
      </div>
    </section>
  )
}
