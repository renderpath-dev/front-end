type LessonCardProps = {
  title: string
  summary: string
}

function LessonCardWithObject(props: LessonCardProps) {
  return (
    <article className="props-card">
      <h2>{props.title}</h2>
      <p>{props.summary}</p>
    </article>
  )
}

function LessonCardWithDestructuring({ title, summary }: LessonCardProps) {
  return (
    <article className="props-card">
      <h2>{title}</h2>
      <p>{summary}</p>
    </article>
  )
}

export function PropsDestructuringDemo() {
  return (
    <section className="props-panel">
      <LessonCardWithObject
        summary="Read properties from the props object."
        title="Object parameter"
      />
      <LessonCardWithDestructuring
        summary="Bind properties as local variables."
        title="Destructured parameter"
      />
    </section>
  )
}
