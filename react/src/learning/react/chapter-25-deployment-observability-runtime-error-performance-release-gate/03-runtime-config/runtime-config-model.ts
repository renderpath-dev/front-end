export type RuntimeEnvironment = 'development' | 'preview' | 'staging' | 'production'

export type RuntimeFeatureFlag = {
  defaultEnabled: boolean
  key: string
}

export type RuntimeConfigInput = {
  appVersion: string
  baseUrl: string
  buildId: string
  environment: RuntimeEnvironment
  featureFlags: RuntimeFeatureFlag[]
  publicConfig: Record<string, string>
}

export type RuntimeConfigSnapshot = {
  appVersion: string
  baseUrl: string
  buildId: string
  environment: RuntimeEnvironment
  featureFlagKeys: string[]
  publicKeys: string[]
  secretIssues: string[]
}

const secretKeyPattern = /(secret|token|password|private|credential|cookie|session)/i
const secretValuePattern = /(sk-|bearer\s+|private_key|-----BEGIN|eyJ[a-zA-Z0-9_-]+)/i

export function createRuntimeConfigSnapshot(
  input: RuntimeConfigInput,
): RuntimeConfigSnapshot {
  const publicKeys = Object.keys(input.publicConfig).sort()

  return {
    appVersion: input.appVersion,
    baseUrl: input.baseUrl,
    buildId: input.buildId,
    environment: input.environment,
    featureFlagKeys: input.featureFlags.map((flag) => flag.key).sort(),
    publicKeys,
    secretIssues: findPublicClientConfigIssues(input.publicConfig),
  }
}

export function findPublicClientConfigIssues(
  publicConfig: Record<string, string>,
): string[] {
  return Object.entries(publicConfig).flatMap(([key, value]) => {
    const issues: string[] = []

    if (secretKeyPattern.test(key)) {
      issues.push(`${key} looks like a secret-bearing public config key.`)
    }

    if (secretValuePattern.test(value)) {
      issues.push(`${key} contains a value that looks secret-like.`)
    }

    return issues
  })
}

export function isRuntimeConfigReleaseReady(input: RuntimeConfigInput): boolean {
  const snapshot = createRuntimeConfigSnapshot(input)

  return (
    snapshot.appVersion.length > 0 &&
    snapshot.buildId.length > 0 &&
    snapshot.baseUrl.length > 0 &&
    snapshot.secretIssues.length === 0
  )
}
