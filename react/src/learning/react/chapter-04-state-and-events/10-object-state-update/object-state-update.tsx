import { useState } from 'react'

type LearnerProfile = {
  name: string
  track: string
  isAvailable: boolean
}

const initialProfile: LearnerProfile = {
  name: 'Mia Chen',
  track: 'React foundations',
  isAvailable: true,
}

export function ObjectStateUpdate() {
  const [profile, setProfile] = useState(initialProfile)

  function handleToggleAvailability() {
    setProfile((currentProfile) => ({
      ...currentProfile,
      isAvailable: !currentProfile.isAvailable,
    }))
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.10 Object replacement</p>
      <h2>Object state update</h2>
      <div className="profile-preview">
        <strong>{profile.name}</strong>
        <span>{profile.track}</span>
        <span>{profile.isAvailable ? 'Available' : 'Unavailable'}</span>
      </div>
      <button className="practice-button" onClick={handleToggleAvailability} type="button">
        Toggle availability
      </button>
    </section>
  )
}
