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
const { resetTestDatabase } = await import("./helpers/database.js");
const { resetTestRedis, closeTestRedis } = await import("./helpers/redis.js");
const { hashPassword } = await import("../src/shared/auth/password-hashing.js");

async function createAuthenticatedAgent(email: string) {
  await prisma.user.create({
    data: {
      email,
      passwordHash: await hashPassword("shared-passphrase-2026")
    }
  });

  const agent = request.agent(app);
  await agent.post("/auth/login").send({ email, password: "shared-passphrase-2026" }).expect(200);
  const csrf = await agent.get("/auth/csrf").expect(200);
  return { agent, csrfToken: csrf.body.data.csrfToken };
}

describe("redis fixed-window export limiter", () => {
  beforeEach(async () => {
    await resetTestDatabase();
    await resetTestRedis();
  });

  after(async () => {
    await closeTestRedis();
    await prisma.$disconnect();
  });

  it("returns 429 after the user exceeds the export window", async () => {
    const alice = await createAuthenticatedAgent("alice@example.com");

    await alice.agent.post("/exports/notes").set("x-csrf-token", alice.csrfToken).send({ format: "JSON" }).expect(202);
    await alice.agent.post("/exports/notes").set("x-csrf-token", alice.csrfToken).send({ format: "JSON" }).expect(202);
    const limited = await alice.agent.post("/exports/notes").set("x-csrf-token", alice.csrfToken).send({ format: "JSON" }).expect(429);

    assert.equal(limited.body.error.code, "EXPORT_RATE_LIMITED");
  });
});
