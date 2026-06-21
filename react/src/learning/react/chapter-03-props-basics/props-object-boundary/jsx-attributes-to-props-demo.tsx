type LearningBadgeProps = {
  label: string
  tone: 'blue' | 'green'
}

function LearningBadge({ label, tone }: LearningBadgeProps) {
  return <span className={`props-pill props-pill-${tone}`}>{label}</span>
}

export function JsxAttributesToPropsDemo() {
  return (
    <section className="props-panel">
      <h2>JSX attributes to props</h2>
      <LearningBadge label="Required prop" tone="blue" />
      <LearningBadge label="Typed union" tone="green" />
    </section>
  )
}
