const inFlightLoads = new Map<string, Promise<string>>();
let databaseReads = 0;

async function loadFromDatabase(): Promise<string> {
  databaseReads += 1;
  return JSON.stringify([{ id: "notebook_1", name: "Work" }]);
}

async function singleflight(key: string): Promise<string> {
  const existing = inFlightLoads.get(key);
  if (existing) return existing;

  const load = loadFromDatabase().finally(() => {
    inFlightLoads.delete(key);
  });
  inFlightLoads.set(key, load);
  return load;
}

await Promise.all([
  singleflight("cache:user:user_123:notebooks:v1"),
  singleflight("cache:user:user_123:notebooks:v1")
]);
console.log({ databaseReads });
