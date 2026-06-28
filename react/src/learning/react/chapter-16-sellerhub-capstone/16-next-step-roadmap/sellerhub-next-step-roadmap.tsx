const nextSteps = [
  {
    condition: 'A real API contract and deployment environment exist.',
    step: 'Replace the mock gateway behind the existing adapter boundary.',
  },
  {
    condition: 'Server authorization and identity are available.',
    step: 'Move RBAC enforcement to the server and keep UI permission hints.',
  },
  {
    condition: 'A compliant payment flow is selected.',
    step: 'Delegate sensitive payment data to the provider boundary.',
  },
] as const

export function SellerHubNextStepRoadmap() {
  return (
    <section className="chapter16-panel" aria-labelledby="next-step-roadmap-title">
      <p className="chapter16-eyebrow">9.16 Next-step roadmap</p>
      <h2 id="next-step-roadmap-title">Sequence growth by prerequisite, not novelty</h2>
      <div className="chapter16-grid">
        {nextSteps.map((item) => (
          <article className="chapter16-card" key={item.step}>
            <h3>{item.step}</h3>
            <p>{item.condition}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
