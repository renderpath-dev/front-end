type SellerHubArchitectureEvidence = {
  concern: string
  owner: string
  evidence: string
  resumeOutcome: string
}

const sellerHubEvidence: SellerHubArchitectureEvidence[] = [
  {
    concern: 'Catalog UI',
    owner: 'catalog feature',
    evidence: 'public API and token-driven product components',
    resumeOutcome: 'Defined feature and design-system boundaries.',
  },
  {
    concern: 'Orders data',
    owner: 'orders feature',
    evidence: 'DTO validation, adapter, and normalized errors',
    resumeOutcome: 'Protected UI from backend contract changes.',
  },
  {
    concern: 'Release quality',
    owner: 'delivery team',
    evidence: 'flags, performance budget, review, and rollback gates',
    resumeOutcome: 'Added measurable release governance.',
  },
  {
    concern: 'Operations',
    owner: 'frontend platform',
    evidence: 'error context, privacy boundary, and security checks',
    resumeOutcome: 'Improved production diagnosis and risk review.',
  },
]

export function SellerHubProductionMap() {
  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.15 SellerHub production mapping</p>
      <h2>Architecture claims require code, documents, and observable evidence</h2>
      <div className="chapter15-grid">
        {sellerHubEvidence.map((item) => (
          <article className="chapter15-card" key={item.concern}>
            <h3>{item.concern}</h3>
            <p>Owner: {item.owner}</p>
            <p>Evidence: {item.evidence}</p>
            <strong>{item.resumeOutcome}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}
