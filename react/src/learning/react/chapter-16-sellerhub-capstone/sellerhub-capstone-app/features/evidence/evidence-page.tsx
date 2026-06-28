const evidenceDocuments = [
  {
    path: 'docs/product-requirements.md',
    title: 'Product requirements',
    summary: 'User journeys, acceptance criteria, non-goals, and local mock boundary.',
  },
  {
    path: 'docs/architecture-decision-record.md',
    title: 'Architecture decision record',
    summary: 'Route, contract, state ownership, design-system, and dependency decisions.',
  },
  {
    path: 'docs/release-checklist.md',
    title: 'Release checklist',
    summary: 'Quality gates, manual smoke checks, accessibility, and rollback evidence.',
  },
  {
    path: 'docs/portfolio-evidence.md',
    title: 'Portfolio evidence',
    summary: 'Problem statement, tradeoffs, test evidence, and honest production limits.',
  },
] as const

export function EvidencePage() {
  return (
    <section aria-labelledby="sellerhub-evidence-title">
      <p className="sellerhub-eyebrow">Review packet</p>
      <h2 id="sellerhub-evidence-title">Portfolio evidence</h2>
      <p>
        The capstone is reviewable through code, behavior, tests, decisions, and explicit
        non-production boundaries.
      </p>
      <div className="sellerhub-evidence-grid">
        {evidenceDocuments.map((document) => (
          <article className="sellerhub-card" key={document.path}>
            <h3>{document.title}</h3>
            <p>{document.summary}</p>
            <code>{document.path}</code>
          </article>
        ))}
      </div>
    </section>
  )
}
