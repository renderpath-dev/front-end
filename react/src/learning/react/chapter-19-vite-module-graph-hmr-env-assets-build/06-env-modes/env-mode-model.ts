export type EnvExposureKind = 'client-exposed' | 'server-private'

export type EnvAuditEntry = {
  key: string
  exampleValue: string
  purpose: string
}

export type EnvAuditResult = EnvAuditEntry & {
  exposure: EnvExposureKind
  safeForClientBundle: boolean
}

export type ViteEnvSnapshot = {
  mode: string
  baseUrl: string
  dev: boolean
  prod: boolean
  ssr: boolean
}

export function parseViteBoolean(value: string | undefined): boolean | null {
  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  return null
}

export function classifyEnvKey(key: string): EnvExposureKind {
  return key.startsWith('VITE_') ? 'client-exposed' : 'server-private'
}

export function isUnsafePublicEnvKey(key: string): boolean {
  return key.startsWith('VITE_') && /(SECRET|TOKEN|PASSWORD|PRIVATE|KEY)$/i.test(key)
}

export function auditEnvEntries(entries: EnvAuditEntry[]): EnvAuditResult[] {
  return entries.map((entry) => {
    const exposure = classifyEnvKey(entry.key)

    return {
      ...entry,
      exposure,
      safeForClientBundle: exposure === 'client-exposed' && !isUnsafePublicEnvKey(entry.key),
    }
  })
}

export function readCurrentViteEnv(): ViteEnvSnapshot {
  return {
    baseUrl: import.meta.env.BASE_URL,
    dev: import.meta.env.DEV,
    mode: import.meta.env.MODE,
    prod: import.meta.env.PROD,
    ssr: import.meta.env.SSR,
  }
}
