import { createContext, useContext, useReducer } from 'react'
import type { Dispatch, ReactNode } from 'react'

type NoteState = {
  notes: string[]
}

type NoteAction =
  | { type: 'add'; text: string }
  | { type: 'clear' }

const NoteStateContext = createContext<NoteState | null>(null)
const NoteDispatchContext = createContext<Dispatch<NoteAction> | null>(null)

function noteReducer(state: NoteState, action: NoteAction): NoteState {
  switch (action.type) {
    case 'add': {
      return { notes: [...state.notes, action.text] }
    }

    case 'clear': {
      return { notes: [] }
    }

    default: {
      return assertNever(action)
    }
  }
}

function NoteProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(noteReducer, { notes: ['Review cache key owner'] })

  return (
    <NoteStateContext value={state}>
      <NoteDispatchContext value={dispatch}>{children}</NoteDispatchContext>
    </NoteStateContext>
  )
}

function useNoteState(): NoteState {
  const state = useContext(NoteStateContext)

  if (state === null) {
    throw new Error('useNoteState must be used inside NoteProvider.')
  }

  return state
}

function useNoteDispatch(): Dispatch<NoteAction> {
  const dispatch = useContext(NoteDispatchContext)

  if (dispatch === null) {
    throw new Error('useNoteDispatch must be used inside NoteProvider.')
  }

  return dispatch
}

function NotePanel() {
  const state = useNoteState()
  const dispatch = useNoteDispatch()

  return (
    <>
      <button type="button" onClick={() => dispatch({ type: 'add', text: 'Keep reducer local' })}>
        Add review note
      </button>
      <ul>
        {state.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </>
  )
}

export function ReducerContextBoundaryPanel() {
  return (
    <article className="state-card">
      <p className="state-card-kicker">9.9 reducer plus context</p>
      <h3>Reducer plus context domain boundary</h3>
      <NoteProvider>
        <NotePanel />
      </NoteProvider>
    </article>
  )
}

function assertNever(value: never): never {
  throw new Error(`Unsupported note action: ${JSON.stringify(value)}`)
}
