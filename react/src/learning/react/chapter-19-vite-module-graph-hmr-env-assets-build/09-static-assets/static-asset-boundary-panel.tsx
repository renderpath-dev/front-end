import releaseNoteRaw from './raw-release-note.md?raw'
import releaseNoteUrl from './raw-release-note.md?url'

export function StaticAssetBoundaryPanel() {
  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">9.9 assets</p>
      <h3>Static assets, public, ?url, and ?raw</h3>
      <p>
        Imported assets enter the transform graph and may be hashed during build. Public
        assets bypass source transforms and are referenced by root absolute paths.
      </p>
      <ul>
        <li>
          URL import result: <code>{releaseNoteUrl}</code>
        </li>
        <li>Raw import character count: {releaseNoteRaw.length}</li>
        <li>Public asset example: /vite.svg</li>
      </ul>
    </article>
  )
}
