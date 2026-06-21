type ProfileAvatarProps = {
  initials: string
  name: string
}

export function ProfileAvatar({ initials, name }: ProfileAvatarProps) {
  return (
    <div className="profile-avatar" aria-label={`${name} avatar`}>
      {initials}
    </div>
  )
}
