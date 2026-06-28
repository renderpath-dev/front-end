import { useState } from 'react'

type ErrorContext = {
  route: string
  feature: string
  release: string
  sessionId: string
}

type FrontendErrorEvent = ErrorContext & {
  eventId: string
  code: string
  message: string
  occurredAt: string
}

function createErrorEvent(error: unknown, context: ErrorContext): FrontendErrorEvent {
  const knownError = error instanceof Error ? error : new Error('Unknown client error')

  return {
    ...context,
    eventId: `event-${Date.now()}`,
    code: knownError.name.toUpperCase(),
    message: knownError.message,
    occurredAt: new Date().toISOString(),
  }
}

export function ObservabilityEventPanel() {
  const [events, setEvents] = useState<FrontendErrorEvent[]>([])

  function reportCatalogError(): void {
    const nextEvent = createErrorEvent(new Error('Catalog preview unavailable.'), {
      route: '/catalog',
      feature: 'catalog-preview',
      release: 'learning-2026.06',
      sessionId: 'session-anonymous',
    })

    setEvents((currentEvents) => [nextEvent, ...currentEvents].slice(0, 3))
  }

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.10 Observability and error reporting</p>
      <h2>An error event needs operational context, not raw console output</h2>
      <button className="chapter15-button" onClick={reportCatalogError} type="button">
        Report mock error
      </button>
      {events.length === 0 ? (
        <p className="chapter15-note">No mock events have been reported.</p>
      ) : (
        <ul className="chapter15-list">
          {events.map((event) => (
            <li key={event.eventId}>
              <strong>{event.code}</strong>
              <span>{event.message}</span>
              <code>
                {event.release} | {event.route} | {event.feature}
              </code>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
