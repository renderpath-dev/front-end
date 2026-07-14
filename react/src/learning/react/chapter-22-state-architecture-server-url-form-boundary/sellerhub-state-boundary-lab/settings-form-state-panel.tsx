import { useState } from 'react'
import type { FormEvent } from 'react'
import { defaultSellerSettings } from './sellerhub-state-boundary-data'
import type { SellerSettings } from './sellerhub-state-boundary-data'

const alternateSellerSettings: SellerSettings = {
  sellerId: 'seller-84',
  storeName: 'SellerHub Outlet',
  supportEmail: 'outlet@example.com',
}

const settingsBySeller: Record<string, SellerSettings> = {
  [defaultSellerSettings.sellerId]: defaultSellerSettings,
  [alternateSellerSettings.sellerId]: alternateSellerSettings,
}

type SettingsDraft = {
  storeName: string
  supportEmail: string
}

export function SettingsFormStatePanel() {
  const [sellerId, setSellerId] = useState(defaultSellerSettings.sellerId)
  const selectedSettings = settingsBySeller[sellerId]

  return (
    <section className="state-lab-card" aria-labelledby="settings-form-title">
      <p className="state-card-kicker">Final lab part 4</p>
      <h3 id="settings-form-title">Settings form state panel</h3>
      <label className="state-field">
        Seller identity
        <select value={sellerId} onChange={(event) => setSellerId(event.currentTarget.value)}>
          {Object.values(settingsBySeller).map((settings) => (
            <option key={settings.sellerId} value={settings.sellerId}>
              {settings.sellerId}
            </option>
          ))}
        </select>
      </label>
      <SettingsDraftForm key={sellerId} initialSettings={selectedSettings} />
    </section>
  )
}

function SettingsDraftForm({ initialSettings }: { initialSettings: SellerSettings }) {
  const [draft, setDraft] = useState<SettingsDraft>({
    storeName: initialSettings.storeName,
    supportEmail: initialSettings.supportEmail,
  })
  const [touched, setTouched] = useState<Record<keyof SettingsDraft, boolean>>({
    storeName: false,
    supportEmail: false,
  })
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const storeNameError =
    (touched.storeName || submitAttempted) && draft.storeName.trim().length < 3
      ? 'Store name must contain at least 3 characters.'
      : ''
  const supportEmailError =
    (touched.supportEmail || submitAttempted) && !draft.supportEmail.includes('@')
      ? 'Support email must contain @.'
      : ''
  const isDirty =
    draft.storeName !== initialSettings.storeName ||
    draft.supportEmail !== initialSettings.supportEmail
  const hasErrors = storeNameError.length > 0 || supportEmailError.length > 0

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    setSubmitAttempted(true)
  }

  return (
    <form className="state-form" onSubmit={handleSubmit}>
      {submitAttempted && hasErrors ? (
        <div className="state-error" role="alert">
          Review settings state errors.
        </div>
      ) : null}
      <label className="state-field">
        Store name
        <input
          aria-invalid={storeNameError.length > 0}
          value={draft.storeName}
          onBlur={() => setTouched((currentTouched) => ({ ...currentTouched, storeName: true }))}
          onChange={(event) => {
            const storeName = event.currentTarget.value

            setDraft((currentDraft) => ({
              ...currentDraft,
              storeName,
            }))
          }}
        />
      </label>
      {storeNameError ? <p className="state-error">{storeNameError}</p> : null}
      <label className="state-field">
        Support email
        <input
          aria-invalid={supportEmailError.length > 0}
          value={draft.supportEmail}
          onBlur={() =>
            setTouched((currentTouched) => ({ ...currentTouched, supportEmail: true }))
          }
          onChange={(event) => {
            const supportEmail = event.currentTarget.value

            setDraft((currentDraft) => ({
              ...currentDraft,
              supportEmail,
            }))
          }}
        />
      </label>
      {supportEmailError ? <p className="state-error">{supportEmailError}</p> : null}
      <p role="status">Dirty state: {isDirty ? 'dirty' : 'clean'}</p>
      <div className="state-button-row">
        <button type="submit">Save settings</button>
        <button
          type="button"
          onClick={() => {
            setDraft({
              storeName: initialSettings.storeName,
              supportEmail: initialSettings.supportEmail,
            })
            setTouched({ storeName: false, supportEmail: false })
            setSubmitAttempted(false)
          }}
        >
          Reset draft
        </button>
      </div>
    </form>
  )
}
