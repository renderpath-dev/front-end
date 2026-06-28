type GovernanceGate = {
  artifact: string
  requiredFields: string[]
  decisionOwner: string
  status: 'ready' | 'needs-evidence'
}

const governanceGates: GovernanceGate[] = [
  {
    artifact: 'Architecture decision record',
    requiredFields: ['context', 'decision', 'alternatives', 'consequences', 'follow-up'],
    decisionOwner: 'frontend architecture group',
    status: 'ready',
  },
  {
    artifact: 'Code review checklist',
    requiredFields: ['state owner', 'effect necessity', 'accessibility', 'security', 'tests'],
    decisionOwner: 'peer reviewer',
    status: 'ready',
  },
  {
    artifact: 'Release checklist',
    requiredFields: ['lint', 'typecheck', 'test', 'build', 'rollback'],
    decisionOwner: 'release owner',
    status: 'needs-evidence',
  },
]

export function GovernanceEvidencePanel() {
  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.14 ADR, review, and governance</p>
      <h2>Governance artifacts turn decisions into executable gates</h2>
      <div className="chapter15-grid">
        {governanceGates.map((gate) => (
          <article className="chapter15-card" key={gate.artifact}>
            <h3>{gate.artifact}</h3>
            <p>Owner: {gate.decisionOwner}</p>
            <p>Fields: {gate.requiredFields.join(', ')}</p>
            <strong
              className={gate.status === 'ready' ? 'chapter15-pass' : 'chapter15-warn'}
            >
              {gate.status}
            </strong>
          </article>
        ))}
      </div>
    </section>
  )
}
