import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import request from "supertest";
import { app } from "../src/app.js";
import { notesRepository } from "../src/notes/notes.repository.js";

describe("typed notes API", () => {
  beforeEach(() => {
    notesRepository.reset();
  });

  it("creates and lists a note", async () => {
    const createResponse = await request(app)
      .post("/notes")
      .send({ title: "HTTP boundaries", content: "Validate at runtime." })
      .expect(201);

    assert.equal(createResponse.body.ok, true);
    assert.equal(createResponse.body.data.note.title, "HTTP boundaries");

    const listResponse = await request(app).get("/notes").expect(200);

    assert.equal(listResponse.body.ok, true);
    assert.equal(listResponse.body.data.notes.length, 1);
  });

  it("gets and updates a note by id", async () => {
    const createResponse = await request(app)
      .post("/notes")
      .send({ title: "Initial title", content: "Initial content" })
      .expect(201);
    const noteId = createResponse.body.data.note.id as string;

    const getResponse = await request(app)
      .get(`/notes/${noteId}`)
      .expect(200);
    assert.equal(getResponse.body.data.note.id, noteId);

    const updateResponse = await request(app)
      .patch(`/notes/${noteId}`)
      .send({ title: "Updated title" })
      .expect(200);
    assert.equal(updateResponse.body.data.note.title, "Updated title");
  });

  it("deletes a note and then reports it as missing", async () => {
    const createResponse = await request(app)
      .post("/notes")
      .send({ title: "Disposable", content: "Delete this note." })
      .expect(201);
    const noteId = createResponse.body.data.note.id as string;

    await request(app).delete(`/notes/${noteId}`).expect(204);

    const missingResponse = await request(app)
      .get(`/notes/${noteId}`)
      .expect(404);
    assert.deepEqual(missingResponse.body, {
      ok: false,
      error: {
        code: "NOTE_NOT_FOUND",
        message: "Note not found.",
        details: null
      }
    });
  });

  it("returns structured validation details", async () => {
    const response = await request(app)
      .post("/notes")
      .send({ title: "", content: "Invalid title" })
      .expect(422);

    assert.equal(response.body.ok, false);
    assert.equal(response.body.error.code, "VALIDATION_ERROR");
    assert.equal(response.body.error.details[0].path, "body.title");
  });

  it("rejects malformed ids before repository lookup", async () => {
    const response = await request(app).get("/notes/not-a-uuid").expect(422);

    assert.equal(response.body.ok, false);
    assert.equal(response.body.error.code, "VALIDATION_ERROR");
    assert.equal(response.body.error.details[0].path, "params.id");
  });

  it("returns a unified response for malformed JSON", async () => {
    const response = await request(app)
      .post("/notes")
      .set("Content-Type", "application/json")
      .send('{"title":')
      .expect(400);

    assert.deepEqual(response.body, {
      ok: false,
      error: {
        code: "INVALID_JSON",
        message: "Request body must contain valid JSON.",
        details: null
      }
    });
  });

  it("returns a unified response for unknown routes", async () => {
    const response = await request(app).get("/unknown").expect(404);

    assert.equal(response.body.ok, false);
    assert.equal(response.body.error.code, "ROUTE_NOT_FOUND");
  });
});
