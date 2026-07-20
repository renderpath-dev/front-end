type Cache = Map<string, string>;

const cache: Cache = new Map();
const database = new Map([["user_123:notebooks", JSON.stringify([{ id: "notebook_1", name: "Work" }])]]);

async function readNotebookList(userId: string): Promise<{ source: "HIT" | "MISS"; value: unknown }> {
  const key = `cache:user:${userId}:notebooks:v1`;
  const cached = cache.get(key);
  if (cached) {
    return { source: "HIT", value: JSON.parse(cached) };
  }

  const databaseValue = database.get(`${userId}:notebooks`) ?? "[]";
  cache.set(key, databaseValue);
  return { source: "MISS", value: JSON.parse(databaseValue) };
}

console.log(await readNotebookList("user_123"));
console.log(await readNotebookList("user_123"));
