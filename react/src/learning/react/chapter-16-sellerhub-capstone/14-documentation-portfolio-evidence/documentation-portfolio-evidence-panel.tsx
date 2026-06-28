const reviewDocuments = [
  'product-requirements.md',
  'architecture-decision-record.md',
  'release-checklist.md',
  'portfolio-evidence.md',
] as const

export function DocumentationPortfolioEvidencePanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="documentation-evidence-title">
      <p className="chapter16-eyebrow">9.14 Documentation and evidence</p>
      <h2 id="documentation-evidence-title">Make decisions and verification reviewable</h2>
      <ul className="chapter16-list">
        {reviewDocuments.map((document) => (
          <li key={document}>
            <code>sellerhub-capstone-app/docs/{document}</code>
          </li>
        ))}
      </ul>
    </section>
  )
}
