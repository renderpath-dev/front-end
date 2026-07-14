export type ConfirmedOrderNote = {
  id: string
  kind: 'confirmed'
  message: string
}

export type PendingOrderNote = {
  id: string
  kind: 'pending'
  message: string
  temporaryId: string
}

export type OrderNote = ConfirmedOrderNote | PendingOrderNote

export function createOptimisticNote(
  notes: readonly OrderNote[],
  message: string,
  temporaryId: string,
): OrderNote[] {
  return [
    ...notes,
    {
      id: temporaryId,
      kind: 'pending',
      message,
      temporaryId,
    },
  ]
}

export function confirmOptimisticNote(
  notes: readonly OrderNote[],
  temporaryId: string,
  confirmedNote: ConfirmedOrderNote,
): OrderNote[] {
  return notes.map((note) => (note.id === temporaryId ? confirmedNote : note))
}

export function rollbackOptimisticNote(
  notes: readonly OrderNote[],
  temporaryId: string,
): OrderNote[] {
  return notes.filter((note) => note.id !== temporaryId)
}
