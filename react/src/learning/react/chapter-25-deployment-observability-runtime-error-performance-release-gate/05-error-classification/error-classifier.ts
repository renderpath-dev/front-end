export type RuntimeFailureKind =
  | 'abort'
  | 'chunk'
  | 'http'
  | 'network'
  | 'parse'
  | 'render'
  | 'timeout'
  | 'unknown'
  | 'user-action'

export type RuntimeFailureInput = {
  message?: string
  name?: string
  source?: 'event-handler' | 'render' | 'request' | 'router'
  status?: number
}

export type RuntimeFailureClassification = {
  kind: RuntimeFailureKind
  recoveryOwner: string
  triageSignal: string
}

export function classifyRuntimeFailure(
  input: RuntimeFailureInput,
): RuntimeFailureClassification {
  const message = input.message?.toLowerCase() ?? ''
  const name = input.name?.toLowerCase() ?? ''

  if (input.source === 'render') {
    return createClassification('render', 'Error Boundary', 'component stack')
  }

  if (message.includes('loading chunk') || message.includes('dynamic import')) {
    return createClassification('chunk', 'route reload or fallback', 'failed asset URL')
  }

  if (name === 'aborterror' || message.includes('aborted')) {
    return createClassification('abort', 'request owner', 'intentional cancellation')
  }

  if (name === 'timeouterror' || message.includes('timeout')) {
    return createClassification('timeout', 'request owner', 'elapsed time budget')
  }

  if (input.status && input.status >= 400) {
    return createClassification('http', 'API boundary', `HTTP ${input.status}`)
  }

  if (message.includes('json') || message.includes('parse')) {
    return createClassification('parse', 'response adapter', 'body parsing failure')
  }

  if (message.includes('network') || message.includes('fetch failed')) {
    return createClassification('network', 'request owner', 'network transport')
  }

  if (input.source === 'event-handler') {
    return createClassification('user-action', 'interaction handler', 'user action')
  }

  return createClassification('unknown', 'triage owner', 'uncategorized error')
}

function createClassification(
  kind: RuntimeFailureKind,
  recoveryOwner: string,
  triageSignal: string,
): RuntimeFailureClassification {
  return {
    kind,
    recoveryOwner,
    triageSignal,
  }
}
