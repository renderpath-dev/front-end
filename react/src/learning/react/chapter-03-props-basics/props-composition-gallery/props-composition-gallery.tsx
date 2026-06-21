import { profileCards } from './profile-card-data'
import { ProfileCardGrid } from './profile-card-grid'
import './props-composition-gallery.css'

export function PropsCompositionGallery() {
  return (
    <main className="props-gallery-shell">
      <header className="props-gallery-header">
        <p className="props-gallery-eyebrow">React Chapter 03</p>
        <h1>Props Composition Gallery</h1>
        <p>
          A static component tree for practicing typed props, default values,
          boolean props, children, and parent-to-child data flow.
        </p>
      </header>

      <ProfileCardGrid profiles={profileCards} />
    </main>
  )
}
