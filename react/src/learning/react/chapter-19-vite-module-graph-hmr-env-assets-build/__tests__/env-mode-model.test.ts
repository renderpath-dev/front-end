import { describe, expect, it } from 'vitest'
import {
  auditEnvEntries,
  classifyEnvKey,
  isUnsafePublicEnvKey,
  parseViteBoolean,
} from '../06-env-modes/env-mode-model'

describe('env mode model', () => {
  it('parses string booleans without accepting unrelated values', () => {
    expect(parseViteBoolean('true')).toBe(true)
    expect(parseViteBoolean('false')).toBe(false)
    expect(parseViteBoolean('1')).toBeNull()
    expect(parseViteBoolean(undefined)).toBeNull()
  })

  it('classifies VITE_ keys as client-exposed and other keys as server-private', () => {
    expect(classifyEnvKey('VITE_PUBLIC_API_BASE')).toBe('client-exposed')
    expect(classifyEnvKey('DATABASE_PASSWORD')).toBe('server-private')
  })

  it('flags public-prefix secret names as unsafe for the client bundle', () => {
    expect(isUnsafePublicEnvKey('VITE_PRIVATE_TOKEN')).toBe(true)
    expect(isUnsafePublicEnvKey('VITE_PUBLIC_API_BASE')).toBe(false)

    expect(
      auditEnvEntries([
        {
          exampleValue: 'do not ship',
          key: 'VITE_PRIVATE_TOKEN',
          purpose: 'Unsafe fixture',
        },
      ])[0]?.safeForClientBundle,
    ).toBe(false)
  })
})
