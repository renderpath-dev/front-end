import { useImperativeHandle, useRef, useState } from 'react'
import type { Ref } from 'react'

type ImperativeSearchHandle = {
  focusSearch: () => void
  resetSearch: () => void
  scrollToResults: () => void
}

type ImperativeSearchInputProps = {
  onQueryChange: (nextQuery: string) => void
  query: string
  ref?: Ref<ImperativeSearchHandle>
}

export function ImperativeSearchPanel() {
  const searchHandleRef = useRef<ImperativeSearchHandle | null>(null)
  const [query, setQuery] = useState('dock')

  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">useImperativeHandle</p>
      <h3>Imperative search handle</h3>
      <ImperativeSearchInput onQueryChange={setQuery} query={query} ref={searchHandleRef} />
      <div className="api-gap-button-row">
        <button
          className="api-gap-button api-gap-button-secondary"
          onClick={() => searchHandleRef.current?.focusSearch()}
          type="button"
        >
          Focus search
        </button>
        <button
          className="api-gap-button api-gap-button-secondary"
          onClick={() => searchHandleRef.current?.resetSearch()}
          type="button"
        >
          Reset search
        </button>
        <button
          className="api-gap-button api-gap-button-secondary"
          onClick={() => searchHandleRef.current?.scrollToResults()}
          type="button"
        >
          Scroll to results
        </button>
      </div>
    </article>
  )
}

function ImperativeSearchInput({ onQueryChange, query, ref }: ImperativeSearchInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const resultsRef = useRef<HTMLDivElement | null>(null)

  useImperativeHandle(
    ref,
    () => ({
      focusSearch() {
        inputRef.current?.focus()
      },
      resetSearch() {
        onQueryChange('')
        inputRef.current?.focus()
      },
      scrollToResults() {
        resultsRef.current?.scrollIntoView({ block: 'nearest' })
      },
    }),
    [onQueryChange],
  )

  return (
    <>
      <form className="api-gap-form">
        <label htmlFor="imperative-search-query">Imperative seller search</label>
        <input
          id="imperative-search-query"
          onChange={(event) => onQueryChange(event.currentTarget.value)}
          ref={inputRef}
          value={query}
        />
      </form>
      <div className="api-gap-metric" ref={resultsRef}>
        <span>Parent-visible command result</span>
        <strong>{query || 'empty'}</strong>
      </div>
    </>
  )
}
