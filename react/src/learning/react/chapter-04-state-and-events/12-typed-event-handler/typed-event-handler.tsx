import { useState, type ChangeEvent, type FormEvent } from 'react'

export function TypedEventHandler() {
  const [searchTerm, setSearchTerm] = useState('')
  const [submittedTerm, setSubmittedTerm] = useState('Nothing submitted yet.')

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.currentTarget.value)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmittedTerm(searchTerm.trim() || 'Empty search')
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.12 Type boundary</p>
      <h2>Typed event handler</h2>
      <form className="typed-form" onSubmit={handleSubmit}>
        <label htmlFor="chapter-search">Search term</label>
        <input
          id="chapter-search"
          onChange={handleChange}
          placeholder="Type a topic"
          type="text"
          value={searchTerm}
        />
        <button className="practice-button" type="submit">
          Submit
        </button>
      </form>
      <p className="practice-result" aria-live="polite">
        {submittedTerm}
      </p>
    </section>
  )
}
