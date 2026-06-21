type ProfileSummaryProps = {
  name: string
  role: string
  lessonCount: number
}

function ProfileSummary(props: ProfileSummaryProps) {
  return (
    <article className="props-card">
      <h2>{props.name}</h2>
      <p>{props.role}</p>
      <p>{props.lessonCount} lessons completed</p>
    </article>
  )
}

export function PropsObjectRuntimeDemo() {
  return (
    <section className="props-panel">
      <ProfileSummary name="Mia" role="React learner" lessonCount={3} />
    </section>
  )
}
