type RequiredLessonProps = {
  title: string
  durationMinutes: number
}

function RequiredLesson({ title, durationMinutes }: RequiredLessonProps) {
  return (
    <article className="props-card">
      <h2>{title}</h2>
      <p>{durationMinutes} minutes</p>
    </article>
  )
}

export function RequiredPropsDemo() {
  return (
    <section className="props-panel">
      <RequiredLesson title="Props object" durationMinutes={18} />
    </section>
  )
}
