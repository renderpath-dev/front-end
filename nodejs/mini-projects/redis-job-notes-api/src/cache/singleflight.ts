const inFlightLoads = new Map<string, Promise<unknown>>();

export async function runSingleflight<T>(key: string, load: () => Promise<T>): Promise<T> {
  const existing = inFlightLoads.get(key) as Promise<T> | undefined;
  if (existing) {
    return existing;
  }

  const promise = load().finally(() => {
    inFlightLoads.delete(key);
  });

  inFlightLoads.set(key, promise);
  return promise;
}
