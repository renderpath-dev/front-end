type DefaultLessonProps = {
  title: string
  level?: 'beginner' | 'intermediate'
}

function DefaultLesson({ title, level = 'beginner' }: DefaultLessonProps) {
  return (
    <article className="props-card">
      <h2>{title}</h2>
      <p>{level}</p>
    </article>
  )
}

export function DefaultPropValuesDemo() {
  return (
    <section className="props-panel">
      <DefaultLesson title="Default level" />
      <DefaultLesson title="Explicit level" level="intermediate" />
    </section>
  )
}
