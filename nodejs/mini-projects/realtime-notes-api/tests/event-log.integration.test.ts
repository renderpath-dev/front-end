import test from "node:test";
import assert from "node:assert/strict";
import { RealtimeEventType, RealtimeResourceType } from "../src/generated/prisma/client.js";
import { appendRealtimeEvent, findEventsAfter } from "../src/realtime/event-log.repository.js";
import { integrationTestsEnabled, resetDatabase } from "./helpers/database.js";
import { prisma } from "../src/db/prisma.js";
import { hashPassword } from "../src/shared/auth/password-hashing.js";

test("event replay reads owned events after a sequence", { skip: !integrationTestsEnabled() }, async () => {
  await resetDatabase();
  const user = await prisma.user.create({
    data: {
      email: "event-log@example.com",
      passwordHash: hashPassword("password-12345")
    }
  });

  const event = await appendRealtimeEvent({
    ownerId: user.id,
    resourceType: RealtimeResourceType.NOTE,
    resourceId: "00000000-0000-4000-8000-000000000001",
    eventType: RealtimeEventType.NOTE_UPDATED,
    payload: { noteId: "00000000-0000-4000-8000-000000000001" }
  });

  const replayed = await findEventsAfter({ ownerId: user.id, afterSequence: "0", limit: 10 });
  assert.equal(replayed[0]?.sequence, event.sequence);
});
