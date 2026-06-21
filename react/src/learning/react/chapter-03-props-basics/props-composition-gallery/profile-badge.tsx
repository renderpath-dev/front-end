type ProfileBadgeProps = {
  label?: string
  isFeatured?: boolean
}

export function ProfileBadge({
  label = 'Learning',
  isFeatured = false,
}: ProfileBadgeProps) {
  const className = isFeatured ? 'profile-badge featured-badge' : 'profile-badge'

  return <span className={className}>{label}</span>
}
