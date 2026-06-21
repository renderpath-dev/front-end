import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'

export function TypedRefsEffects() {
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null)
  const [draftName, setDraftName] = useState('Desk Lamp')
  const [savedName, setSavedName] = useState('Desk Lamp')

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  function handleDraftChange(event: ChangeEvent<HTMLInputElement>): void {
    const nextName = event.currentTarget.value
    setDraftName(nextName)

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setSavedName(nextName)
    }, 500)
  }

  return (
    <section className="practice-card">
      <p className="practice-label">TypeScript boundary</p>
      <h3>Type DOM and timer refs explicitly</h3>
      <label>
        Draft product name
        <input ref={inputRef} onChange={handleDraftChange} value={draftName} />
      </label>
      <button onClick={() => inputRef.current?.focus()}>Focus typed input</button>
      <p>Last delayed save: {savedName || 'Empty draft'}</p>
    </section>
  )
}
