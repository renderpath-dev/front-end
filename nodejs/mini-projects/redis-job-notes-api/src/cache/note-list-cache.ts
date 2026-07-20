import { z } from "zod";
import { getRedisClient } from "../redis/redis-client.js";
import { parseCacheValue, serializeCacheValue, type CacheReadResult } from "../redis/cache-json.js";
import { cacheBypassReason, cacheTtlSeconds } from "../redis/cache-policy.js";
import { userNotebookNotesKey, userNotebookNotesPattern } from "../redis/redis-keys.js";
import type { NoteDto, NoteStatus } from "../modules/notes/notes.types.js";

type NoteListQuery = {
  status?: NoteStatus;
  limit: number;
  offset: number;
};

const noteDtoSchema = z.object({
  id: z.string(),
  notebookId: z.string(),
  title: z.string(),
  body: z.string(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

const noteListSchema = z.array(noteDtoSchema);

export async function readNoteListCache(userId: string, notebookId: string, query: NoteListQuery): Promise<CacheReadResult<NoteDto[]>> {
  const key = userNotebookNotesKey(userId, notebookId, query);
  try {
    const redis = await getRedisClient();
    return parseCacheValue(await redis.get(key), noteListSchema);
  } catch (error) {
    return { status: "BYPASS", reason: cacheBypassReason(error) };
  }
}

export async function writeNoteListCache(userId: string, notebookId: string, query: NoteListQuery, notes: NoteDto[]): Promise<void> {
  try {
    const redis = await getRedisClient();
    await redis.set(userNotebookNotesKey(userId, notebookId, query), serializeCacheValue(notes), { EX: cacheTtlSeconds() });
  } catch {
  }
}

export async function deleteNoteListCaches(userId: string, notebookId: string): Promise<void> {
  try {
    const redis = await getRedisClient();
    const keys: string[] = [];
    for await (const key of redis.scanIterator({ MATCH: userNotebookNotesPattern(userId, notebookId), COUNT: 100 })) {
      keys.push(String(key));
    }

    if (keys.length > 0) {
      await redis.del(keys);
    }
  } catch {
  }
}
