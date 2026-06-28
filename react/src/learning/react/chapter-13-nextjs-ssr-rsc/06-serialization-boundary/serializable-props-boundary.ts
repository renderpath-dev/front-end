export type SerializableCheckResult = {
  label: string
  valueKind: string
  allowed: boolean
  reason: string
}

const unsafeConstructors = new Set(['Date', 'Map', 'Set', 'WeakMap', 'WeakSet'])

export function describeSerializableProp(label: string, value: unknown): SerializableCheckResult {
  const valueKind = getValueKind(value)
  const allowed = isProjectSafeSerializableValue(value)

  return {
    label,
    valueKind,
    allowed,
    reason: allowed
      ? 'The value can cross the server to client prop boundary in this project model.'
      : 'Convert this value to a plain string, number, boolean, null, array, or plain object first.',
  }
}

function isProjectSafeSerializableValue(value: unknown, seen = new WeakSet<object>()): boolean {
  if (value === null) {
    return true
  }

  const valueType = typeof value

  if (valueType === 'string' || valueType === 'number' || valueType === 'boolean') {
    return true
  }

  if (valueType === 'function' || valueType === 'symbol' || valueType === 'bigint') {
    return false
  }

  if (valueType === 'undefined') {
    return false
  }

  if (Array.isArray(value)) {
    return value.every((item) => isProjectSafeSerializableValue(item, seen))
  }

  if (valueType === 'object') {
    const objectValue = value as Record<string, unknown>
    const constructorName = objectValue.constructor?.name ?? 'Object'

    if (unsafeConstructors.has(constructorName)) {
      return false
    }

    if (seen.has(objectValue)) {
      return false
    }

    seen.add(objectValue)

    return Object.values(objectValue).every((item) =>
      isProjectSafeSerializableValue(item, seen),
    )
  }

  return false
}

function getValueKind(value: unknown): string {
  if (value === null) {
    return 'null'
  }

  if (Array.isArray(value)) {
    return 'array'
  }

  if (typeof value === 'object') {
    return value.constructor?.name ?? 'object'
  }

  return typeof value
}
