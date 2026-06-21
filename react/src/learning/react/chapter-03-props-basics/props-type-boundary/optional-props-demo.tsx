type OptionalLessonProps = {
  title: string
  summary?: string
}

function OptionalLesson({ title, summary }: OptionalLessonProps) {
  return (
    <article className="props-card">
      <h2>{title}</h2>
      {summary ? <p>{summary}</p> : <p>No summary provided.</p>}
    </article>
  )
}

export function OptionalPropsDemo() {
  return (
    <section className="props-panel">
      <OptionalLesson title="Required title" />
      <OptionalLesson title="Optional summary" summary="This card has more detail." />
    </section>
  )
}
