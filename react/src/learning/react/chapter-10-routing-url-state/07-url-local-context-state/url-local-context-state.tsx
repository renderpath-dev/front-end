import { createContext, useContext, useState } from 'react'
import { useSearchParams } from 'react-router'

type WorkspacePreferences = {
  currency: 'USD' | 'EUR'
}

const WorkspacePreferencesContext = createContext<WorkspacePreferences | null>(null)

function StateBoundaryContent() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [draftNote, setDraftNote] = useState('')
  const preferences = useContext(WorkspacePreferencesContext)
  const category = searchParams.get('category') ?? 'all'

  if (!preferences) {
    throw new Error('StateBoundaryContent requires WorkspacePreferencesContext')
  }

  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">07 / State ownership</p>
      <h2>URL, local state, and Context have different owners</h2>
      <label className="routing-field">
        <span>Shareable category</span>
        <select
          onChange={(event) => setSearchParams({ category: event.currentTarget.value })}
          value={category}
        >
          <option value="all">All</option>
          <option value="office">Office</option>
          <option value="lighting">Lighting</option>
        </select>
      </label>
      <label className="routing-field">
        <span>Private unsaved note</span>
        <input
          onChange={(event) => setDraftNote(event.currentTarget.value)}
          placeholder="Keep this out of the URL"
          value={draftNote}
        />
      </label>
      <dl className="routing-boundary-list">
        <div>
          <dt>URL state</dt>
          <dd>{category}</dd>
        </div>
        <div>
          <dt>Local draft</dt>
          <dd>{draftNote || 'empty'}</dd>
        </div>
        <div>
          <dt>Context preference</dt>
          <dd>{preferences.currency}</dd>
        </div>
      </dl>
    </article>
  )
}

export function UrlLocalContextState() {
  return (
    <WorkspacePreferencesContext.Provider value={{ currency: 'USD' }}>
      <StateBoundaryContent />
    </WorkspacePreferencesContext.Provider>
  )
}
