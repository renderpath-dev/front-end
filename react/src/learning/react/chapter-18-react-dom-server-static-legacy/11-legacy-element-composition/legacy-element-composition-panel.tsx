import { Children, cloneElement, createElement, isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'

function Badge({ label }: { label: string }) {
  return <span className="dom-boundary-pill">{label}</span>
}

function HighlightedChild({ children }: { children: ReactNode }) {
  const firstChild = Children.toArray(children)[0]

  if (!isValidElement<{ className?: string }>(firstChild)) {
    return <p>No valid React element was provided.</p>
  }

  const element = firstChild as ReactElement<{ className?: string }>

  return cloneElement(element, {
    className: [element.props.className, 'dom-boundary-highlight'].filter(Boolean).join(' '),
  })
}

export function LegacyElementCompositionPanel() {
  const generatedBadge = createElement(Badge, { label: 'createElement output' })

  return (
    <article className="dom-boundary-card">
      <p className="dom-boundary-kicker">9.11 legacy element composition</p>
      <h3>Element objects, Children, and cloneElement</h3>
      <p>
        These APIs help when a library receives unknown React elements. New application code
        should prefer explicit props or context before prop injection.
      </p>
      <div className="dom-boundary-stack">
        {generatedBadge}
        <HighlightedChild>
          <span>cloneElement adds presentation at a library boundary</span>
        </HighlightedChild>
      </div>
    </article>
  )
}
