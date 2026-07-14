export type ResourceCacheEntry<TData> =
  | {
      status: 'success'
      data: TData
      updatedAt: number
    }
  | {
      status: 'error'
      error: Error
      updatedAt: number
    }
  | {
      status: 'in-flight'
      promise: Promise<TData>
      updatedAt: number
    }

export type SimpleResourceCache<TData> = {
  clear: () => void
  getOrCreateInFlight: (key: string, createPromise: () => Promise<TData>) => Promise<TData>
  invalidateWhere: (predicate: (key: string) => boolean) => string[]
  read: (key: string) => ResourceCacheEntry<TData> | undefined
  rejectInFlight: (key: string, error: Error) => void
  resolveInFlight: (key: string, data: TData) => void
  writeError: (key: string, error: Error) => void
  writeSuccess: (key: string, data: TData) => void
}

export function createSimpleResourceCache<TData>(): SimpleResourceCache<TData> {
  const entries = new Map<string, ResourceCacheEntry<TData>>()

  return {
    clear() {
      entries.clear()
    },
    getOrCreateInFlight(key: string, createPromise: () => Promise<TData>): Promise<TData> {
      const existingEntry = entries.get(key)

      if (existingEntry?.status === 'in-flight') {
        return existingEntry.promise
      }

      const promise = createPromise()
      entries.set(key, {
        status: 'in-flight',
        promise,
        updatedAt: Date.now(),
      })

      return promise
    },
    invalidateWhere(predicate: (key: string) => boolean): string[] {
      const invalidatedKeys: string[] = []

      for (const key of entries.keys()) {
        if (predicate(key)) {
          entries.delete(key)
          invalidatedKeys.push(key)
        }
      }

      return invalidatedKeys
    },
    read(key: string): ResourceCacheEntry<TData> | undefined {
      return entries.get(key)
    },
    rejectInFlight(key: string, error: Error): void {
      entries.set(key, {
        status: 'error',
        error,
        updatedAt: Date.now(),
      })
    },
    resolveInFlight(key: string, data: TData): void {
      entries.set(key, {
        status: 'success',
        data,
        updatedAt: Date.now(),
      })
    },
    writeError(key: string, error: Error): void {
      entries.set(key, {
        status: 'error',
        error,
        updatedAt: Date.now(),
      })
    },
    writeSuccess(key: string, data: TData): void {
      entries.set(key, {
        status: 'success',
        data,
        updatedAt: Date.now(),
      })
    },
  }
}
