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

describe("auth session api", () => {
  beforeEach(async () => {
    await resetTestDatabase();
  });

  after(async () => {
    await prisma.$disconnect();
  });

  it("registers a user, stores an Argon2id verifier, and sets a session cookie", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({ email: "alice@example.com", password: "alice-passphrase-2026" })
      .expect(201);

    assert.equal(response.body.ok, true);
    assert.equal(response.body.data.user.email, "alice@example.com");
    assert.match(response.headers["set-cookie"][0], /HttpOnly/);

    const stored = await prisma.user.findUnique({ where: { email: "alice@example.com" } });
    assert.ok(stored);
    assert.notEqual(stored.passwordHash, "alice-passphrase-2026");
    assert.match(stored.passwordHash, /^secure-notes\$argon2id\$/);
  });

  it("uses a generic login failure for unknown email and wrong password", async () => {
    await request(app)
      .post("/auth/register")
      .send({ email: "alice@example.com", password: "alice-passphrase-2026" })
      .expect(201);

    const missing = await request(app)
      .post("/auth/login")
      .send({ email: "missing@example.com", password: "alice-passphrase-2026" })
      .expect(401);

    const wrong = await request(app)
      .post("/auth/login")
      .send({ email: "alice@example.com", password: "wrong-passphrase-2026" })
      .expect(401);

    assert.equal(missing.body.error.code, "INVALID_CREDENTIALS");
    assert.equal(wrong.body.error.code, "INVALID_CREDENTIALS");
    assert.equal(missing.body.error.message, wrong.body.error.message);
  });

  it("issues a session-bound CSRF token and revokes the session on logout", async () => {
    const agent = request.agent(app);

    await agent
      .post("/auth/register")
      .send({ email: "alice@example.com", password: "alice-passphrase-2026" })
      .expect(201);

    await agent.get("/auth/me").expect(200);

    const csrfResponse = await agent.get("/auth/csrf").expect(200);
    const csrfToken = csrfResponse.body.data.csrfToken;

    await agent.post("/auth/logout").set("x-csrf-token", csrfToken).expect(200);
    await agent.get("/auth/me").expect(401);
  });

  it("emits credentialed CORS headers only for the allowlist", async () => {
    const response = await request(app)
      .get("/auth/me")
      .set("Origin", "http://localhost:5173")
      .expect(401);

    assert.equal(response.headers["access-control-allow-origin"], "http://localhost:5173");
    assert.equal(response.headers["access-control-allow-credentials"], "true");
  });
});
