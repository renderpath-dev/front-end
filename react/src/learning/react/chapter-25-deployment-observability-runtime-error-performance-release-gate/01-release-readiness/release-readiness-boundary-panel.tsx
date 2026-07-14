const readinessEvidence = [
  'Build artifact exists and can be inspected.',
  'Runtime config contains release metadata without secrets.',
  'Runtime failures have a sanitized diagnostic path.',
  'Release gate treats UNKNOWN as not ready.',
]

export function ReleaseReadinessBoundaryPanel() {
  return (
    <section className="release-evidence-card" aria-labelledby="release-readiness-title">
      <p className="release-evidence-card__eyebrow">9.1</p>
      <h2 id="release-readiness-title">Release readiness boundary</h2>
      <p>
        Release confidence is not a feeling. It is a set of reviewable evidence rows
        across build, runtime, smoke, accessibility, performance, rollback, and triage
        boundaries.
      </p>
      <ul>
        {readinessEvidence.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
