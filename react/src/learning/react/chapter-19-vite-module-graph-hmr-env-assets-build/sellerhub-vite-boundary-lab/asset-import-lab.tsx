import releaseNoteRaw from '../09-static-assets/raw-release-note.md?raw'
import releaseNoteUrl from '../09-static-assets/raw-release-note.md?url'

export function AssetImportLab() {
  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">Final lab</p>
      <h3>Asset import lab</h3>
      <p>
        The same markdown file can be imported as a URL for linking or as raw text for
        rendering a source-backed note.
      </p>
      <ul>
        <li>
          URL import: <code>{releaseNoteUrl}</code>
        </li>
        <li>Raw text preview: {releaseNoteRaw.split('\n')[0]}</li>
        <li>Public asset path example: /vite.svg</li>
      </ul>
    </article>
  )
}
