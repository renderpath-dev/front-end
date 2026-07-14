import { useState } from 'react'

type PendingOrderNote = {
  id: string
  text: string
  status: 'confirmed' | 'pending'
}

export function OptimisticOrderNotePanel() {
  const [notes, setNotes] = useState<PendingOrderNote[]>([
    { id: 'note-1', text: 'Customer confirmed delivery window', status: 'confirmed' },
  ])

  function addPendingNote(): void {
    setNotes((currentNotes) => [
      ...currentNotes,
      {
        id: `pending-${currentNotes.length + 1}`,
        text: 'Warehouse will add fragile label',
        status: 'pending',
      },
    ])
  }

  function confirmPendingNotes(): void {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.status === 'pending' ? { ...note, status: 'confirmed' } : note,
      ),
    )
  }

  function rollbackPendingNotes(): void {
    setNotes((currentNotes) => currentNotes.filter((note) => note.status === 'confirmed'))
  }

  return (
    <section className="state-lab-card" aria-labelledby="optimistic-note-title">
      <p className="state-card-kicker">Final lab part 6</p>
      <h3 id="optimistic-note-title">Optimistic order note panel</h3>
      <div className="state-button-row">
        <button type="button" onClick={addPendingNote}>
          Add pending note
        </button>
        <button type="button" onClick={confirmPendingNotes}>
          Confirm notes
        </button>
        <button type="button" onClick={rollbackPendingNotes}>
          Roll back pending notes
        </button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.text} ({note.status})
          </li>
        ))}
      </ul>
    </section>
  )
}
