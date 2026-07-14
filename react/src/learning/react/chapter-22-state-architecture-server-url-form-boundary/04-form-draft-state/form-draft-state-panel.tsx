import { useMemo, useState } from 'react'

type Draft = {
  storeName: string
  supportEmail: string
}

const initialDraft: Draft = {
  storeName: 'SellerHub Demo Store',
  supportEmail: 'support@example.com',
}

export function FormDraftStatePanel() {
  const [draft, setDraft] = useState(initialDraft)
  const [touched, setTouched] = useState<Record<keyof Draft, boolean>>({
    storeName: false,
    supportEmail: false,
  })
  const isDirty = draft.storeName !== initialDraft.storeName || draft.supportEmail !== initialDraft.supportEmail
  const emailError = useMemo(() => {
    if (!touched.supportEmail) {
      return ''
    }

    return draft.supportEmail.includes('@') ? '' : 'Enter a valid support email.'
  }, [draft.supportEmail, touched.supportEmail])

  return (
    <article className="state-card">
      <p className="state-card-kicker">9.4 form boundary</p>
      <h3>Form draft, touched, dirty, and validation</h3>
      <label className="state-field">
        Store name
        <input
          value={draft.storeName}
          onChange={(event) =>
            setDraft((currentDraft) => ({
              ...currentDraft,
              storeName: event.currentTarget.value,
            }))
          }
        />
      </label>
      <label className="state-field">
        Support email
        <input
          aria-invalid={emailError.length > 0}
          value={draft.supportEmail}
          onBlur={() =>
            setTouched((currentTouched) => ({ ...currentTouched, supportEmail: true }))
          }
          onChange={(event) =>
            setDraft((currentDraft) => ({
              ...currentDraft,
              supportEmail: event.currentTarget.value,
            }))
          }
        />
      </label>
      {emailError ? <p className="state-error">{emailError}</p> : null}
      <p>Dirty state: {isDirty ? 'draft changed' : 'draft matches initial settings'}</p>
    </article>
  )
}
