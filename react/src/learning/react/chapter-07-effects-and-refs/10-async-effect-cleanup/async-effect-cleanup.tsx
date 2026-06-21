import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'

const productNames = ['Desk Lamp', 'Mechanical Keyboard', 'Monitor Stand', 'USB-C Hub']

export function AsyncEffectCleanup() {
  const [query, setQuery] = useState('desk')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [status, setStatus] = useState<'pending' | 'success'>('pending')

  useEffect(() => {
    let ignore = false
    const timeoutId = window.setTimeout(() => {
      const nextSuggestions = productNames.filter((productName) =>
        productName.toLowerCase().includes(query.toLowerCase()),
      )

      if (!ignore) {
        setSuggestions(nextSuggestions)
        setStatus('success')
      }
    }, query.length % 2 === 0 ? 700 : 300)

    return () => {
      ignore = true
      window.clearTimeout(timeoutId)
    }
  }, [query])

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.currentTarget.value)
    setStatus('pending')
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Async cleanup</p>
      <h3>Ignore an obsolete async result</h3>
      <label>
        Suggestion query
        <input onChange={handleQueryChange} value={query} />
      </label>
      <p>{status === 'pending' ? 'Loading suggestions...' : `${suggestions.length} matches`}</p>
    </section>
  )
}
