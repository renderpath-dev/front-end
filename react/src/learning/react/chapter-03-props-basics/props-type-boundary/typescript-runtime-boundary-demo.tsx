type RuntimeBoundaryProfileProps = {
  name: string
  completedLessons: number
}

function RuntimeBoundaryProfile({
  name,
  completedLessons,
}: RuntimeBoundaryProfileProps) {
  return (
    <article className="props-card">
      <h2>{name}</h2>
      <p>{completedLessons} completed lessons</p>
    </article>
  )
}

export function TypeScriptRuntimeBoundaryDemo() {
  const profile = {
    name: 'Mia',
    completedLessons: 3,
  }

  return (
    <section className="props-panel">
      <RuntimeBoundaryProfile
        name={profile.name}
        completedLessons={profile.completedLessons}
      />
    </section>
  )
}
