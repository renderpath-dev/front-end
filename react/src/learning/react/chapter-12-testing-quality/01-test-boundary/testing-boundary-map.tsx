const testingLayers = [
  {
    name: 'Unit test',
    target: 'Pure reducer, parser, and type guard rules',
    boundary: 'JavaScript values without React rendering',
  },
  {
    name: 'Component test',
    target: 'User-visible output and interaction',
    boundary: 'React render and jsdom DOM queries',
  },
  {
    name: 'Integration test',
    target: 'Router, provider, network mock, and UI states',
    boundary: 'Several frontend boundaries working together',
  },
  {
    name: 'E2E boundary',
    target: 'A real browser and real deployment surface',
    boundary: 'Documented for later work, not installed in this chapter',
  },
]

export function TestingBoundaryMap() {
  return (
    <section className="practice-panel" aria-labelledby="testing-boundary-title">
      <div className="topic-summary">
        <p className="skill-pill">Testing boundary</p>
        <h2 id="testing-boundary-title">Choose the smallest useful test layer</h2>
        <p>
          A quality gate should verify the rule at the layer that owns the behavior,
          not at the layer that happens to be easy to assert.
        </p>
      </div>

      <div className="testing-boundary-grid">
        {testingLayers.map((layer) => (
          <article className="topic-card" key={layer.name}>
            <h3>{layer.name}</h3>
            <p>{layer.target}</p>
            <span>{layer.boundary}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
