type ReadonlyProfileProps = {
  profile: {
    name: string
    role: string
  }
}

function ReadonlyProfile({ profile }: ReadonlyProfileProps) {
  const displayName = profile.name.toUpperCase()

  return (
    <article className="props-card">
      <h2>{displayName}</h2>
      <p>{profile.role}</p>
    </article>
  )
}

export function PropsReadonlyMistake() {
  const profile = {
    name: 'Mia',
    role: 'React learner',
  }

  return (
    <section className="props-panel">
      <ReadonlyProfile profile={profile} />
    </section>
  )
}
