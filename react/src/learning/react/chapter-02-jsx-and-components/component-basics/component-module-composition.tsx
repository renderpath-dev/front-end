type TopicSummaryProps = {
  title: string
  summary: string
}

function TopicSummary({ title, summary }: TopicSummaryProps) {
  return (
    <article className="topic-summary">
      <h2>{title}</h2>
      <p>{summary}</p>
    </article>
  )
}

export function ComponentModuleComposition() {
  return (
    <section className="practice-panel">
      <h1>Component module composition</h1>
      <TopicSummary summary="JSX describes UI from JavaScript values." title="JSX" />
      <TopicSummary
        summary="Components are functions with React naming and return conventions."
        title="Components"
      />
    </section>
  )
}
