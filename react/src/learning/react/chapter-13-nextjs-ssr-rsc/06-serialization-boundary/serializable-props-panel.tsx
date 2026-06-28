import { describeSerializableProp } from './serializable-props-boundary'

const propChecks = [
  describeSerializableProp('Product title', 'Desk lamp'),
  describeSerializableProp('Product price', 42),
  describeSerializableProp('Filter list', ['active', 'draft']),
  describeSerializableProp('Normalized date', '2026-06-26T00:00:00.000Z'),
  describeSerializableProp('Raw Date object', new Date('2026-06-26T00:00:00.000Z')),
  describeSerializableProp('Callback prop', () => undefined),
  describeSerializableProp('Map instance', new Map([['sku', 'lamp-01']])),
]

export function SerializablePropsPanel() {
  return (
    <section className="chapter13-panel" aria-labelledby="serialization-title">
      <p className="chapter13-kicker">Serializable props</p>
      <h2 id="serialization-title">Server to Client props need a serializable shape</h2>
      <p>
        This project uses a strict JSON-like model to keep the learning boundary visible.
        Convert special runtime objects before they cross into a Client Component.
      </p>
      <div className="chapter13-grid">
        {propChecks.map((check) => (
          <article className="chapter13-card" key={check.label}>
            <span
              className={`chapter13-pill ${
                check.allowed ? 'chapter13-pill-allowed' : 'chapter13-pill-blocked'
              }`}
            >
              {check.allowed ? 'allowed' : 'blocked'}
            </span>
            <h3>{check.label}</h3>
            <p>{check.valueKind}</p>
            <p>{check.reason}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
