export type IncidentTriageRecord = {
  affectedRoute: string
  affectedVersion: string
  evidence: string[]
  mitigation: string
  reproductionPath: string
  scope: string
  symptom: string
}

export type IncidentTriageValidation = {
  missingFields: string[]
  readyForTriage: boolean
}

const requiredTextFields: Array<keyof Omit<IncidentTriageRecord, 'evidence'>> = [
  'affectedRoute',
  'affectedVersion',
  'mitigation',
  'reproductionPath',
  'scope',
  'symptom',
]

export function validateIncidentTriageRecord(
  record: IncidentTriageRecord,
): IncidentTriageValidation {
  const missingFields: string[] = requiredTextFields.filter(
    (field) => record[field].trim() === '',
  )

  if (record.evidence.length === 0) {
    missingFields.push('evidence')
  }

  return {
    missingFields,
    readyForTriage: missingFields.length === 0,
  }
}
