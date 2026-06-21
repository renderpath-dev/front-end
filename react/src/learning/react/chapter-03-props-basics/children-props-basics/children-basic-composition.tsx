import type { ReactNode } from 'react'

type LearningPanelProps = {
  title: string
  children: ReactNode
}

function LearningPanel({ title, children }: LearningPanelProps) {
  return (
    <article className="props-card">
      <h2>{title}</h2>
      <div>{children}</div>
    </article>
  )
}

export function ChildrenBasicComposition() {
  return (
    <section className="props-panel">
      <LearningPanel title="Children prop">
        <p>Nested JSX becomes the children prop.</p>
        <span className="props-pill">ReactNode</span>
      </LearningPanel>
    </section>
  )
}
