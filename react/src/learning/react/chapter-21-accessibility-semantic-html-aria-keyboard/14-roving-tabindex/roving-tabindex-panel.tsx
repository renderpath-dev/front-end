import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'

const tabLabels = ['Catalog', 'Orders', 'Dashboard'] as const

export function RovingTabindexPanel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  function moveToIndex(nextIndex: number) {
    const normalizedIndex = (nextIndex + tabLabels.length) % tabLabels.length
    setActiveIndex(normalizedIndex)
    tabRefs.current[normalizedIndex]?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveToIndex(activeIndex + 1)
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveToIndex(activeIndex - 1)
    }
  }

  return (
    <section className="a11y-card" aria-labelledby="roving-tabindex-title">
      <p className="a11y-card-kicker">9.14</p>
      <h3 id="roving-tabindex-title">Roving tabindex and composite widgets</h3>
      <p>
        Composite widgets should have one tab stop. Arrow keys move focus inside the
        widget while React state owns the active index.
      </p>
      <div aria-label="SellerHub workspace tabs" onKeyDown={handleKeyDown} role="tablist">
        {tabLabels.map((label, index) => (
          <button
            aria-controls={`chapter-21-panel-${label.toLowerCase()}`}
            aria-selected={index === activeIndex}
            id={`chapter-21-tab-${label.toLowerCase()}`}
            key={label}
            ref={(element) => {
              tabRefs.current[index] = element
            }}
            role="tab"
            tabIndex={index === activeIndex ? 0 : -1}
            type="button"
            onClick={() => setActiveIndex(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <p
        aria-labelledby={`chapter-21-tab-${tabLabels[activeIndex].toLowerCase()}`}
        id={`chapter-21-panel-${tabLabels[activeIndex].toLowerCase()}`}
        role="tabpanel"
      >
        {tabLabels[activeIndex]} panel is active.
      </p>
    </section>
  )
}
