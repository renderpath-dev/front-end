import { describe, expect, it } from 'vitest'
import { validateIncidentTriageRecord } from '../16-incident-triage/incident-triage-model'

describe('incident triage model', () => {
  it('requires symptom, scope, version, route, evidence, and mitigation', () => {
    const invalid = validateIncidentTriageRecord({
      affectedRoute: '',
      affectedVersion: '',
      evidence: [],
      mitigation: '',
      reproductionPath: '',
      scope: '',
      symptom: '',
    })
    const valid = validateIncidentTriageRecord({
      affectedRoute: '/react/chapter-25',
      affectedVersion: '25.0.0',
      evidence: ['corr-1'],
      mitigation: 'disable flag',
      reproductionPath: 'open route',
      scope: 'chapter route',
      symptom: 'fallback shown',
    })

    expect(invalid.readyForTriage).toBe(false)
    expect(invalid.missingFields).toContain('evidence')
    expect(valid.readyForTriage).toBe(true)
  })
})
