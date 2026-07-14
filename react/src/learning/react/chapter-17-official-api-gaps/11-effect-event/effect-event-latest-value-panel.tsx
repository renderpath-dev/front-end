import { useEffect, useEffectEvent, useState } from 'react'

const auditEventName = 'chapter-17-audit-ping'

export function EffectEventLatestValuePanel() {
  const [channel, setChannel] = useState('catalog')
  const [draftNote, setDraftNote] = useState('margin check')
  const [auditLog, setAuditLog] = useState<string[]>([])

  const writeAuditEntry = useEffectEvent((reason: string) => {
    setAuditLog((currentLog) => [
      `${reason}: ${channel} / ${draftNote || 'empty note'}`,
      ...currentLog,
    ])
  })

  useEffect(() => {
    function handleAuditPing() {
      writeAuditEntry('window audit ping')
    }

    window.addEventListener(auditEventName, handleAuditPing)

    return () => {
      window.removeEventListener(auditEventName, handleAuditPing)
    }
  }, [])

  function triggerAuditPing() {
    window.dispatchEvent(new Event(auditEventName))
  }

  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">useEffectEvent</p>
      <h3>Latest value inside an effect</h3>
      <form className="api-gap-form">
        <label htmlFor="effect-event-channel">Audit channel</label>
        <select
          id="effect-event-channel"
          onChange={(event) => setChannel(event.currentTarget.value)}
          value={channel}
        >
          <option value="catalog">Catalog</option>
          <option value="orders">Orders</option>
          <option value="dashboard">Dashboard</option>
        </select>
        <label htmlFor="effect-event-note">Draft note</label>
        <input
          id="effect-event-note"
          onChange={(event) => setDraftNote(event.currentTarget.value)}
          value={draftNote}
        />
      </form>
      <button className="api-gap-button" onClick={triggerAuditPing} type="button">
        Dispatch audit event
      </button>
      <ul className="api-gap-list" aria-label="Effect event audit log">
        {auditLog.length === 0 ? <li>No audit events yet</li> : null}
        {auditLog.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ul>
    </article>
  )
}
