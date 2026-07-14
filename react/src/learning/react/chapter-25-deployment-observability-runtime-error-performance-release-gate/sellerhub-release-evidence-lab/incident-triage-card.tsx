import { validateIncidentTriageRecord } from '../16-incident-triage/incident-triage-model'
import { sellerHubIncidentRecord } from './sellerhub-release-evidence-data'

const triageValidation = validateIncidentTriageRecord(sellerHubIncidentRecord)

export function IncidentTriageCard() {
  return (
    <section className="release-evidence-card" aria-labelledby="incident-triage-card-title">
      <h3 id="incident-triage-card-title">Incident triage card</h3>
      <p role="status">
        Triage ready: {triageValidation.readyForTriage ? 'yes' : 'no'}
      </p>
      <p>{sellerHubIncidentRecord.symptom}</p>
    </section>
  )
}
