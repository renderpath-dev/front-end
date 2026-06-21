import { useRef } from 'react'

export function DomNodeRef() {
  const searchInputRef = useRef<HTMLInputElement>(null)

  function handleFocusSearch(): void {
    searchInputRef.current?.focus()
  }

  return (
    <section className="practice-card">
      <p className="practice-label">DOM ref</p>
      <h3>Call a browser API from an event</h3>
      <label>
        Product search
        <input ref={searchInputRef} placeholder="Search inventory" />
      </label>
      <button onClick={handleFocusSearch}>Focus search</button>
    </section>
  )
}
