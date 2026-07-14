import { validateIncidentTriageRecord } from './incident-triage-model'
import { sellerHubIncidentRecord } from '../sellerhub-release-evidence-lab/sellerhub-release-evidence-data'

const validation = validateIncidentTriageRecord(sellerHubIncidentRecord)

export function IncidentTriagePanel() {
  return (
    <section className="release-evidence-card" aria-labelledby="incident-triage-title">
      <p className="release-evidence-card__eyebrow">9.16</p>
      <h2 id="incident-triage-title">Incident triage boundary</h2>
      <p>
        Triage starts with symptom, route, version, scope, evidence, reproduction, and
        mitigation. It should not start with guesses about root cause.
      </p>
      <p role="status">
        Triage record: {validation.readyForTriage ? 'ready' : 'incomplete'}
      </p>
    </section>
  )
}
