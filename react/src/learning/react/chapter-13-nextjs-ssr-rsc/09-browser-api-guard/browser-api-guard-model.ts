export type StorageReader = {
  getItem: (key: string) => string | null
}

export type BrowserPreferenceResult = {
  phase: 'server-render' | 'first-client-render' | 'after-hydration'
  value: string
  source: string
}

export function readBrowserPreferenceSafely(
  storage: StorageReader | null,
  key: string,
  fallbackValue: string,
): BrowserPreferenceResult {
  if (!storage) {
    return {
      phase: 'server-render',
      value: fallbackValue,
      source: 'fallback',
    }
  }

  const storedValue = storage.getItem(key)

  return {
    phase: 'after-hydration',
    value: storedValue ?? fallbackValue,
    source: storedValue ? 'storage' : 'fallback',
  }
}

export function createFirstRenderPlan(fallbackValue: string): BrowserPreferenceResult[] {
  return [
    {
      phase: 'server-render',
      value: fallbackValue,
      source: 'fallback',
    },
    {
      phase: 'first-client-render',
      value: fallbackValue,
      source: 'fallback',
    },
  ]
}
