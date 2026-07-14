import { useEffect, useEffectEvent, useState } from 'react'

const sellerHubAuditEventName = 'sellerhub-api-gap-audit'

export function EffectEventAuditPanel() {
  const [scope, setScope] = useState('catalog')
  const [note, setNote] = useState('ready for review')
  const [entries, setEntries] = useState<string[]>([])

  const appendAuditEntry = useEffectEvent((source: string) => {
    setEntries((currentEntries) => [`${source}: ${scope} / ${note}`, ...currentEntries])
  })

  useEffect(() => {
    function handleAuditEvent() {
      appendAuditEntry('effect subscription')
    }

    window.addEventListener(sellerHubAuditEventName, handleAuditEvent)

    return () => {
      window.removeEventListener(sellerHubAuditEventName, handleAuditEvent)
    }
  }, [])

  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">Final lab · useEffectEvent</p>
      <h3>Effect event audit panel</h3>
      <form className="api-gap-form">
        <label htmlFor="audit-scope">Audit scope</label>
        <select id="audit-scope" onChange={(event) => setScope(event.currentTarget.value)} value={scope}>
          <option value="catalog">Catalog</option>
          <option value="orders">Orders</option>
          <option value="dashboard">Dashboard</option>
        </select>
        <label htmlFor="audit-note">Audit note</label>
        <input id="audit-note" onChange={(event) => setNote(event.currentTarget.value)} value={note} />
      </form>
      <button
        className="api-gap-button"
        onClick={() => window.dispatchEvent(new Event(sellerHubAuditEventName))}
        type="button"
      >
        Emit audit event
      </button>
      <ul className="api-gap-list" aria-label="SellerHub audit entries">
        {entries.length === 0 ? <li>No audit entries yet</li> : null}
        {entries.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ul>
    </article>
  )
}
