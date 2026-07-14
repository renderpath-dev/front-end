import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'

export function FlushSyncScrollPanel() {
  const [events, setEvents] = useState(['Initial seller note'])
  const [status, setStatus] = useState('No forced scroll has run.')
  const latestEventRef = useRef<HTMLLIElement>(null)

  function addEventAndScroll(): void {
    flushSync(() => {
      setEvents((currentEvents) => [
        ...currentEvents,
        `Seller escalation ${currentEvents.length + 1}`,
      ])
    })

    latestEventRef.current?.scrollIntoView({ block: 'nearest' })
    setStatus('flushSync forced the note to commit before scrollIntoView.')
  }

  return (
    <section className="dom-boundary-card" aria-labelledby="flush-sync-scroll-title">
      <p className="dom-boundary-kicker">Escape hatch</p>
      <h3 id="flush-sync-scroll-title">FlushSync scroll measurement</h3>
      <p>
        This is an emergency bridge for DOM timing. It is not a normal state update pattern.
      </p>
      <button className="dom-boundary-button" onClick={addEventAndScroll} type="button">
        Add event and force scroll
      </button>
      <ul className="dom-boundary-list">
        {events.map((event, index) => (
          <li key={event} ref={index === events.length - 1 ? latestEventRef : undefined}>
            {event}
          </li>
        ))}
      </ul>
      <p className="dom-boundary-warning">{status}</p>
    </section>
  )
}
