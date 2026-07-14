import { describe, expect, it } from 'vitest'
import {
  confirmOptimisticNote,
  createOptimisticNote,
  rollbackOptimisticNote,
} from '../14-optimistic-rollback/optimistic-note-model'

describe('optimistic note model', () => {
  it('supports pending, confirm, and rollback flows', () => {
    const pendingNotes = createOptimisticNote([], 'Call customer', 'temp-1')
    const confirmedNotes = confirmOptimisticNote(pendingNotes, 'temp-1', {
      id: 'note-900',
      kind: 'confirmed',
      message: 'Call customer',
    })
    const rolledBackNotes = rollbackOptimisticNote(pendingNotes, 'temp-1')

    expect(pendingNotes[0]).toMatchObject({ id: 'temp-1', kind: 'pending' })
    expect(confirmedNotes[0]).toMatchObject({ id: 'note-900', kind: 'confirmed' })
    expect(rolledBackNotes).toEqual([])
  })
})
