import type { ReactNode } from 'react'
import { ProfileAvatar } from './profile-avatar'
import { ProfileBadge } from './profile-badge'

type ProfileCardProps = {
  name: string
  role: string
  initials: string
  completedLessons: number
  isFeatured?: boolean
  badgeLabel?: string
  children: ReactNode
}

export function ProfileCard({
  name,
  role,
  initials,
  completedLessons,
  isFeatured = false,
  badgeLabel,
  children,
}: ProfileCardProps) {
  return (
    <article className="profile-card">
      <header className="profile-card-header">
        <ProfileAvatar initials={initials} name={name} />
        <div>
          <h2>{name}</h2>
          <p>{role}</p>
        </div>
      </header>

      <ProfileBadge label={badgeLabel} isFeatured={isFeatured} />

      <p className="profile-progress">
        {completedLessons} completed lessons
      </p>

      <div className="profile-card-children">{children}</div>
    </article>
  )
}
