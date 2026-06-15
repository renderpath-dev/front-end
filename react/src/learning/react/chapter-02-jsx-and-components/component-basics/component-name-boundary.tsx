function TopicCard() {
  return (
    <article className="topic-card">
      <h2>Component naming</h2>
      <p>Custom components use PascalCase names.</p>
    </article>
  )
}

export function ComponentNameBoundary() {
  return (
    <section className="practice-panel">
      <TopicCard />
    </section>
  )
}
