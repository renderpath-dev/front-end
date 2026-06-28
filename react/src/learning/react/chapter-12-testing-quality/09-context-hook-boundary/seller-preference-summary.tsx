import { useSellerPreferences } from './seller-preferences-context'

export function SellerPreferenceSummary() {
  const preferences = useSellerPreferences()

  return (
    <section className="practice-panel" aria-labelledby="seller-preference-title">
      <p className="skill-pill">Provider boundary</p>
      <h2 id="seller-preference-title">Seller preferences</h2>
      <p>Currency: {preferences.currency}</p>
      <p>Compact mode: {preferences.compactMode ? 'enabled' : 'disabled'}</p>
    </section>
  )
}
