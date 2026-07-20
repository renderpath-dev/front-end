import assert from "node:assert/strict";
import { after, beforeEach, describe, it } from "node:test";
import request from "supertest";

process.env.NODE_ENV = "test";
process.env.DATABASE_URL ??= "postgresql://postgres:postgres@localhost:5432/secure_notes_auth_api_test?schema=public";
process.env.CORS_ALLOWED_ORIGINS ??= "http://localhost:5173";
process.env.SESSION_COOKIE_NAME ??= "secure_notes_session";
process.env.COOKIE_SECURE ??= "false";

const { app } = await import("../src/app.js");
const { prisma } = await import("../src/db/prisma.js");
const { resetTestDatabase } = await import("./helpers/database.js");
const { hashPassword } = await import("../src/shared/auth/password-hashing.js");

async function createAuthenticatedAgent(email: string, role: "USER" | "ADMIN" = "USER") {
  await prisma.user.create({
    data: {
      email,
      role,
      passwordHash: await hashPassword("shared-passphrase-2026")
    }
  });

  const agent = request.agent(app);
  await agent
    .post("/auth/login")
    .send({ email, password: "shared-passphrase-2026" })
    .expect(200);

  const csrfResponse = await agent.get("/auth/csrf").expect(200);
  return {
    agent,
    csrfToken: csrfResponse.body.data.csrfToken
  };
}

describe("protected notes and role authorization", () => {
  beforeEach(async () => {
    await resetTestDatabase();
  });

  after(async () => {
    await prisma.$disconnect();
  });

  it("rejects protected writes without CSRF and accepts writes with the session token", async () => {
    const alice = await createAuthenticatedAgent("alice@example.com");

    await alice.agent.post("/notebooks").send({ name: "Work" }).expect(403);

    const notebookResponse = await alice.agent
      .post("/notebooks")
      .set("x-csrf-token", alice.csrfToken)
      .send({ name: "Work" })
      .expect(201);

    const noteResponse = await alice.agent
      .post("/notebooks/" + notebookResponse.body.data.id + "/notes")
      .set("x-csrf-token", alice.csrfToken)
      .send({ title: "Boundary", body: "Owned note", status: "ACTIVE" })
      .expect(201);

    assert.equal(noteResponse.body.data.title, "Boundary");

    const topLevelResponse = await alice.agent
      .get("/notes/" + noteResponse.body.data.id)
      .expect(200);

    assert.equal(topLevelResponse.body.data.id, noteResponse.body.data.id);
  });

  it("rejects cross-user notebook access at the owner boundary", async () => {
    const alice = await createAuthenticatedAgent("alice@example.com");
    const bob = await createAuthenticatedAgent("bob@example.com");

    const notebookResponse = await alice.agent
      .post("/notebooks")
      .set("x-csrf-token", alice.csrfToken)
      .send({ name: "Private" })
      .expect(201);

    await bob.agent.get("/notebooks/" + notebookResponse.body.data.id).expect(403);
  });

  it("contrasts USER and ADMIN role authorization", async () => {
    const alice = await createAuthenticatedAgent("alice@example.com", "USER");
    const admin = await createAuthenticatedAgent("admin@example.com", "ADMIN");

    await alice.agent.get("/admin/users").expect(403);

    const adminResponse = await admin.agent.get("/admin/users").expect(200);
    assert.ok(Array.isArray(adminResponse.body.data.users));
  });
});
