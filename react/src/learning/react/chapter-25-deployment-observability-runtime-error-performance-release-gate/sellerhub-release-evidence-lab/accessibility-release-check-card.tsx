const checks = [
  'Main heading is visible',
  'Buttons have accessible names',
  'Status messages use role status',
  'Manual keyboard smoke remains required',
]

export function AccessibilityReleaseCheckCard() {
  return (
    <section className="release-evidence-card" aria-labelledby="accessibility-check-card-title">
      <h3 id="accessibility-check-card-title">Accessibility release check card</h3>
      <ul>
        {checks.map((check) => (
          <li key={check}>{check}</li>
        ))}
      </ul>
    </section>
  )
}
