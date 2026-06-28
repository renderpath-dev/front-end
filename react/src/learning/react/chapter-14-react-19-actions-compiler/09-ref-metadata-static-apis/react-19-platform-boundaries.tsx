import { useRef } from 'react'
import type { Ref } from 'react'

type SearchInputProps = {
  label: string
  ref?: Ref<HTMLInputElement>
}

const platformBoundaries = [
  {
    feature: 'ref as prop',
    owner: 'React runtime and React DOM',
    currentProject: 'Runnable',
  },
  {
    feature: 'title and meta',
    owner: 'React DOM document output',
    currentProject: 'Runnable',
  },
  {
    feature: 'prerender and resume',
    owner: 'Framework or server build pipeline',
    currentProject: 'Mechanism model only',
  },
]

export function React19PlatformBoundaries() {
  const searchInputRef = useRef<HTMLInputElement>(null)

  function focusSearch(): void {
    searchInputRef.current?.focus()
  }

  return (
    <section className="chapter14-panel" aria-labelledby="platform-boundary-title">
      <title>React 19 Actions and Compiler Practice</title>
      <meta
        content="React 19 Actions, use API, and Compiler boundary practice."
        name="description"
      />
      <p className="chapter14-kicker">9.9 React 19 platform boundaries</p>
      <h2 id="platform-boundary-title">Ref, metadata, and static API ownership</h2>
      <SearchInput label="Seller search" ref={searchInputRef} />
      <button className="chapter14-button" onClick={focusSearch} type="button">
        Focus seller search
      </button>
      <div className="chapter14-grid">
        {platformBoundaries.map((boundary) => (
          <article className="chapter14-card" key={boundary.feature}>
            <h3>{boundary.feature}</h3>
            <p>{boundary.owner}</p>
            <span className="chapter14-pill">{boundary.currentProject}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function SearchInput({ label, ref }: SearchInputProps) {
  return (
    <label className="chapter14-field">
      {label}
      <input placeholder="Search orders" ref={ref} />
    </label>
  )
}
