const accessibilityEvidence = [
  'Role and accessible name checks',
  'Keyboard path smoke test',
  'Focus restore review',
  'Live region status review',
  'Manual accessibility tree inspection boundary',
]

export function AccessibilityReleaseEvidencePanel() {
  return (
    <section className="release-evidence-card" aria-labelledby="accessibility-release-title">
      <p className="release-evidence-card__eyebrow">9.12</p>
      <h2 id="accessibility-release-title">Accessibility release evidence</h2>
      <p>
        Automated checks provide useful evidence, but they do not prove complete
        accessibility. Release review combines tests, keyboard checks, focus behavior, and
        manual inspection.
      </p>
      <ul>
        {accessibilityEvidence.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
