import type { ProfileCardData } from './profile-card-data'
import { ProfileCard } from './profile-card'

type ProfileCardGridProps = {
  profiles: ProfileCardData[]
}

export function ProfileCardGrid({ profiles }: ProfileCardGridProps) {
  return (
    <section className="profile-grid" aria-label="Profile cards">
      {profiles.map((profile) => (
        <ProfileCard
          badgeLabel={profile.badgeLabel}
          completedLessons={profile.completedLessons}
          initials={profile.initials}
          isFeatured={profile.isFeatured}
          key={profile.id}
          name={profile.name}
          role={profile.role}
        >
          <ul className="focus-list">
            {profile.focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </ProfileCard>
      ))}
    </section>
  )
}
