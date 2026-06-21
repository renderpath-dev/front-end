export type ProfileCardData = {
  id: string
  name: string
  role: string
  initials: string
  completedLessons: number
  isFeatured?: boolean
  badgeLabel?: string
  focusAreas: string[]
}

export const profileCards: ProfileCardData[] = [
  {
    id: 'mia',
    name: 'Mia Chen',
    role: 'React learner',
    initials: 'MC',
    completedLessons: 3,
    isFeatured: true,
    badgeLabel: 'Featured',
    focusAreas: ['props', 'children', 'composition'],
  },
  {
    id: 'noah',
    name: 'Noah Smith',
    role: 'TypeScript beginner',
    initials: 'NS',
    completedLessons: 2,
    focusAreas: ['required props', 'optional props'],
  },
  {
    id: 'ava',
    name: 'Ava Patel',
    role: 'Frontend student',
    initials: 'AP',
    completedLessons: 4,
    isFeatured: false,
    badgeLabel: 'Practice',
    focusAreas: ['boolean props', 'default values'],
  },
]
