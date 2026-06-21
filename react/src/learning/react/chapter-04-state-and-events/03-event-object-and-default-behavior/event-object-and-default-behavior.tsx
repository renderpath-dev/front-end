import { useState, type FormEvent, type MouseEvent } from 'react'

export function EventObjectAndDefaultBehavior() {
  const [eventLog, setEventLog] = useState<string[]>([])

  function appendLog(entry: string) {
    setEventLog((currentLog) => [...currentLog, entry])
  }

  function handlePanelClick() {
    appendLog('Parent panel received a bubbled click.')
  }

  function handleButtonClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    appendLog('Button stopped click propagation.')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    appendLog('Form prevented the browser submit navigation.')
  }

  return (
    <section className="practice-panel" onClick={handlePanelClick}>
      <p className="practice-kicker">9.3 Browser event boundary</p>
      <h2>Event object and default behavior</h2>
      <div className="practice-actions">
        <button className="practice-button" onClick={handleButtonClick} type="button">
          Stop propagation
        </button>
        <form onSubmit={handleSubmit}>
          <button className="practice-button secondary" type="submit">
            Prevent submit default
          </button>
        </form>
      </div>
      <ol className="event-log" aria-live="polite">
        {eventLog.map((entry, index) => (
          <li key={`${entry}-${index}`}>{entry}</li>
        ))}
      </ol>
    </section>
  )
}
