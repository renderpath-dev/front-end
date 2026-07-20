process.env.NODE_ENV = "test";
process.env.DATABASE_URL ??= "postgresql://postgres:postgres@localhost:5432/redis_job_notes_api_test?schema=public";
process.env.REDIS_URL ??= "redis://localhost:6379";
process.env.CORS_ALLOWED_ORIGINS ??= "http://localhost:5173";
process.env.SESSION_COOKIE_NAME ??= "redis_job_notes_session";
process.env.COOKIE_SECURE ??= "false";
process.env.CACHE_TTL_SECONDS ??= "30";
process.env.EXPORT_RATE_LIMIT_MAX ??= "2";
process.env.EXPORT_RATE_LIMIT_WINDOW_SECONDS ??= "60";
process.env.RATE_LIMIT_FAILURE_POLICY ??= "open";

import assert from "node:assert/strict";
import { after, beforeEach, describe, it } from "node:test";
import request from "supertest";

const { app } = await import("../src/app.js");
const { prisma } = await import("../src/db/prisma.js");
const { processExportNotesJob } = await import("../src/jobs/export-notes-job.js");
const { resetTestDatabase } = await import("./helpers/database.js");
const { resetTestRedis, closeTestRedis } = await import("./helpers/redis.js");
const { hashPassword } = await import("../src/shared/auth/password-hashing.js");

async function createAuthenticatedAgent(email: string) {
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: await hashPassword("shared-passphrase-2026")
    }
  });

  const agent = request.agent(app);
  await agent.post("/auth/login").send({ email, password: "shared-passphrase-2026" }).expect(200);
  const csrf = await agent.get("/auth/csrf").expect(200);
  return { agent, csrfToken: csrf.body.data.csrfToken, user };
}

describe("notes export job status", () => {
  beforeEach(async () => {
    await resetTestDatabase();
    await resetTestRedis();
  });

  after(async () => {
    await closeTestRedis();
    await prisma.$disconnect();
  });

  it("creates a durable status row and lets the worker complete it idempotently", async () => {
    const alice = await createAuthenticatedAgent("alice@example.com");
    const notebook = await prisma.notebook.create({ data: { ownerId: alice.user.id, name: "Work" } });
    await prisma.note.create({
      data: {
        ownerId: alice.user.id,
        notebookId: notebook.id,
        title: "Exported",
        body: "Job payload",
        status: "ACTIVE"
      }
    });

    const response = await alice.agent
      .post("/exports/notes")
      .set("x-csrf-token", alice.csrfToken)
      .send({ notebookId: notebook.id, format: "JSON" })
      .expect(202);

    const exportId = response.body.data.exportId;
    await processExportNotesJob({
      data: {
        exportId,
        ownerId: alice.user.id,
        requestedNotebookId: notebook.id,
        format: "JSON"
      },
      attemptsMade: 0
    } as never);

    await processExportNotesJob({
      data: {
        exportId,
        ownerId: alice.user.id,
        requestedNotebookId: notebook.id,
        format: "JSON"
      },
      attemptsMade: 1
    } as never);

    const status = await alice.agent.get("/exports/" + exportId).expect(200);
    assert.equal(status.body.data.status, "COMPLETED");
    assert.equal(status.body.data.result.count, 1);
  });
});
