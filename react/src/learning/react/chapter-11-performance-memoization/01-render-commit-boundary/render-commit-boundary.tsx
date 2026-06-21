import { useState } from 'react'

export function RenderCommitBoundary() {
  const [renderVersion, setRenderVersion] = useState(0)

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">01 / Render and commit</p>
      <h2>A re-render does not require rebuilding every DOM node</h2>
      <p data-render-version={renderVersion}>Rendered description version: {renderVersion}</p>
      <label className="performance-field">
        <span>Uncontrolled DOM value</span>
        <input defaultValue="Edit this value before rendering again" />
      </label>
      <button onClick={() => setRenderVersion((version) => version + 1)} type="button">
        Queue another render
      </button>
      <p className="performance-practice-note">
        The paragraph changes. The existing input node keeps its browser-owned edited value.
      </p>
    </article>
  )
}
