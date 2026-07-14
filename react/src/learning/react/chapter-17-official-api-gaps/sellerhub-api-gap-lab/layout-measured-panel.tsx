import { useLayoutEffect, useRef, useState } from 'react'

export function LayoutMeasuredPanel() {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [sizeLabel, setSizeLabel] = useState('0 x 0')

  useLayoutEffect(() => {
    const panel = panelRef.current

    if (!panel) {
      return
    }

    const rect = panel.getBoundingClientRect()
    setSizeLabel(`${Math.round(rect.width)} x ${Math.round(rect.height)}`)
  }, [expanded])

  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">Final lab · useLayoutEffect</p>
      <h3>Layout measured panel</h3>
      <button
        className="api-gap-button api-gap-button-secondary"
        onClick={() => setExpanded((currentValue) => !currentValue)}
        type="button"
      >
        Toggle measured width
      </button>
      <div
        className="api-gap-measured-box"
        data-density={expanded ? 'wide' : 'compact'}
        ref={panelRef}
      >
        <strong>Measurement target</strong>
        <p>Layout effect reads this DOM box after commit.</p>
      </div>
      <span className="api-gap-pill">Measured size {sizeLabel}</span>
    </article>
  )
}
