import { describe, expect, it } from 'vitest'
import { qualityGateCommands, summarizeQualityGate } from './quality-gate-command-model'

describe('quality gate command model', () => {
  it('keeps lint, typecheck, test, and build as separate gates', () => {
    expect(summarizeQualityGate(qualityGateCommands)).toBe(
      'lint -> typecheck -> test -> build',
    )
  })

  it('documents the behavior verified by the test gate', () => {
    expect(qualityGateCommands.find((command) => command.name === 'test')).toMatchObject({
      command: 'npm run test',
      verifies: 'Runtime behavior and user-visible outcomes',
    })
  })
})
