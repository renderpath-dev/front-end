import { useLayoutEffect, useRef, useState } from 'react'

type Measurement = {
  width: number
  height: number
}

export function LayoutMeasurementPanel() {
  const measuredElementRef = useRef<HTMLDivElement | null>(null)
  const [density, setDensity] = useState<'compact' | 'wide'>('compact')
  const [measurement, setMeasurement] = useState<Measurement>({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const element = measuredElementRef.current

    if (!element) {
      return
    }

    const rect = element.getBoundingClientRect()
    setMeasurement({
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    })
  }, [density])

  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">useLayoutEffect</p>
      <h3>Layout measurement boundary</h3>
      <div className="api-gap-button-row">
        <button
          className="api-gap-button api-gap-button-secondary"
          onClick={() => setDensity((currentDensity) => (currentDensity === 'compact' ? 'wide' : 'compact'))}
          type="button"
        >
          Toggle layout density
        </button>
      </div>
      <div className="api-gap-measured-box" data-density={density} ref={measuredElementRef}>
        <strong>Measured panel</strong>
        <p>
          This panel is read after React commits the DOM and before the browser paints
          the next frame.
        </p>
      </div>
      <div className="api-gap-pill-row" aria-live="polite">
        <span className="api-gap-pill">Width: {measurement.width}px</span>
        <span className="api-gap-pill">Height: {measurement.height}px</span>
      </div>
    </article>
  )
}
