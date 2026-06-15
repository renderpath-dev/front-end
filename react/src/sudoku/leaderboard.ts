export interface LeaderboardEntry {
  id: string
  name: string
  seconds: number
  mistakes: number
  completedAt: string
}

const PLAYER_NAME_KEY = 'daily-sudoku-player-name'
const LEADERBOARD_PREFIX = 'daily-sudoku-leaderboard'
const MAX_LEADERBOARD_ENTRIES = 10

export function loadPlayerName(): string {
  if (!canUseStorage()) {
    return 'Player'
  }

  return window.localStorage.getItem(PLAYER_NAME_KEY) ?? 'Player'
}

export function savePlayerName(name: string): void {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(PLAYER_NAME_KEY, name)
}

export function sanitizePlayerName(name: string): string {
  const trimmedName = name.trim()

  if (trimmedName.length === 0) {
    return 'Anonymous'
  }

  return trimmedName.slice(0, 24)
}

export function loadLeaderboard(puzzleId: string): LeaderboardEntry[] {
  if (!canUseStorage()) {
    return []
  }

  const rawValue = window.localStorage.getItem(getLeaderboardKey(puzzleId))

  if (rawValue === null) {
    return []
  }

  try {
    const parsedValue: unknown = JSON.parse(rawValue)

    if (!Array.isArray(parsedValue)) {
      return []
    }

    return sortLeaderboard(parsedValue.filter(isLeaderboardEntry)).slice(
      0,
      MAX_LEADERBOARD_ENTRIES,
    )
  } catch {
    return []
  }
}

export function addLeaderboardEntry(
  puzzleId: string,
  currentEntries: LeaderboardEntry[],
  nextEntry: LeaderboardEntry,
): LeaderboardEntry[] {
  const nextEntries = sortLeaderboard([...currentEntries, nextEntry]).slice(
    0,
    MAX_LEADERBOARD_ENTRIES,
  )

  saveLeaderboard(puzzleId, nextEntries)

  return nextEntries
}

export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function saveLeaderboard(puzzleId: string, entries: LeaderboardEntry[]): void {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(getLeaderboardKey(puzzleId), JSON.stringify(entries))
}

function sortLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((leftEntry, rightEntry) => {
    if (leftEntry.mistakes !== rightEntry.mistakes) {
      return leftEntry.mistakes - rightEntry.mistakes
    }

    if (leftEntry.seconds !== rightEntry.seconds) {
      return leftEntry.seconds - rightEntry.seconds
    }

    return leftEntry.completedAt.localeCompare(rightEntry.completedAt)
  })
}

function isLeaderboardEntry(value: unknown): value is LeaderboardEntry {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const entry = value as Record<string, unknown>

  return (
    typeof entry.id === 'string' &&
    typeof entry.name === 'string' &&
    typeof entry.seconds === 'number' &&
    Number.isFinite(entry.seconds) &&
    typeof entry.mistakes === 'number' &&
    Number.isFinite(entry.mistakes) &&
    typeof entry.completedAt === 'string'
  )
}

function getLeaderboardKey(puzzleId: string): string {
  return `${LEADERBOARD_PREFIX}:${puzzleId}`
}

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}
