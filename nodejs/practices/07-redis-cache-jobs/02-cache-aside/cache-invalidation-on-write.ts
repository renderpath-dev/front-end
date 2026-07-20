type Notebook = { id: string; ownerId: string; name: string };

const cache = new Map<string, string>();
const notebooks = new Map<string, Notebook>();

async function renameNotebook(userId: string, notebookId: string, name: string): Promise<void> {
  notebooks.set(notebookId, { id: notebookId, ownerId: userId, name });
  cache.delete(`cache:user:${userId}:notebooks:v1`);
}

cache.set("cache:user:user_123:notebooks:v1", JSON.stringify([{ id: "notebook_1", name: "Old" }]));
await renameNotebook("user_123", "notebook_1", "New");
console.log({ cacheHasOldList: cache.has("cache:user:user_123:notebooks:v1") });
