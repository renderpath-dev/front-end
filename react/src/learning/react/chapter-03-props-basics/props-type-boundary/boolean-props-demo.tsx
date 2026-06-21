type BooleanBadgeProps = {
  label: string
  isFeatured?: boolean
}

function BooleanBadge({ label, isFeatured = false }: BooleanBadgeProps) {
  return (
    <article className="props-card">
      <h2>{label}</h2>
      <p>{isFeatured ? 'Featured profile' : 'Standard profile'}</p>
    </article>
  )
}

export function BooleanPropsDemo() {
  return (
    <section className="props-panel">
      <BooleanBadge label="Mia" isFeatured />
      <BooleanBadge label="Noah" isFeatured={false} />
      <BooleanBadge label="Ava" />
    </section>
  )
}
