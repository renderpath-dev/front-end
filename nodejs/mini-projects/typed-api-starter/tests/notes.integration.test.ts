import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import request from "supertest";
import { app } from "../src/app.js";
import { notesRepository } from "../src/modules/notes/notes.repository.js";
import { resetLoggerSink, setLoggerSink } from "../src/shared/logging/logger.js";

beforeEach(() => {
  notesRepository.reset();
  setLoggerSink(() => undefined);
});

afterEach(() => {
  resetLoggerSink();
});

describe("notes API", () => {
  it("lists notes from an empty repository", async () => {
    const response = await request(app)
      .get("/notes")
      .expect(200);

    assert.equal(response.body.ok, true);
    assert.deepEqual(response.body.data, []);
  });

  it("creates and reads a note", async () => {
    const created = await request(app)
      .post("/notes")
      .send({ title: "Typed API", body: "Layered Express project" })
      .expect(201);

    assert.equal(created.body.ok, true);
    assert.equal(created.body.data.title, "Typed API");
    assert.equal(created.body.data.body, "Layered Express project");
    assert.match(created.header["x-request-id"], /.+/);

    const fetched = await request(app)
      .get(`/notes/${created.body.data.id}`)
      .expect(200);

    assert.equal(fetched.body.ok, true);
    assert.equal(fetched.body.data.id, created.body.data.id);
  });

  it("updates a note", async () => {
    const created = await request(app)
      .post("/notes")
      .send({ title: "Before" })
      .expect(201);

    const updated = await request(app)
      .patch(`/notes/${created.body.data.id}`)
      .send({ title: "After" })
      .expect(200);

    assert.equal(updated.body.ok, true);
    assert.equal(updated.body.data.title, "After");
  });

  it("deletes a note", async () => {
    const created = await request(app)
      .post("/notes")
      .send({ title: "Delete me" })
      .expect(201);

    const deleted = await request(app)
      .delete(`/notes/${created.body.data.id}`)
      .expect(200);

    assert.equal(deleted.body.ok, true);
    assert.equal(deleted.body.data.id, created.body.data.id);

    const missing = await request(app)
      .get(`/notes/${created.body.data.id}`)
      .expect(404);

    assert.equal(missing.body.ok, false);
    assert.equal(missing.body.error.code, "NOTE_NOT_FOUND");
  });

  it("returns validation errors for invalid input", async () => {
    const response = await request(app)
      .post("/notes")
      .send({ title: "" })
      .expect(400);

    assert.equal(response.body.ok, false);
    assert.equal(response.body.error.code, "VALIDATION_ERROR");
    assert.ok(Array.isArray(response.body.error.details));
  });

  it("returns a structured not found response for unknown routes", async () => {
    const response = await request(app)
      .get("/missing")
      .set("x-request-id", "req_test_123")
      .expect(404);

    assert.equal(response.body.ok, false);
    assert.equal(response.body.error.code, "ROUTE_NOT_FOUND");
    assert.equal(response.header["x-request-id"], "req_test_123");
  });
});
