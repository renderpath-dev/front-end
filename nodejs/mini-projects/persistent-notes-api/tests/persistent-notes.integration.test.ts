import assert from "node:assert/strict";
import { after, beforeEach, describe, it } from "node:test";
import request from "supertest";
import { app } from "../src/app.js";
import { prisma } from "../src/db/prisma.js";
import { resetTestDatabase } from "./helpers/database.js";

describe("persistent notes api", () => {
  beforeEach(async () => {
    await resetTestDatabase();
  });

  after(async () => {
    await prisma.$disconnect();
  });

  it("creates a notebook and stores it in PostgreSQL", async () => {
    const response = await request(app)
      .post("/notebooks")
      .send({ name: "Work" })
      .expect(201);

    assert.equal(response.body.ok, true);
    assert.equal(response.body.data.name, "Work");

    const stored = await prisma.notebook.findUnique({
      where: { id: response.body.data.id }
    });

    assert.equal(stored?.name, "Work");
  });

  it("creates notes inside a notebook and reads them through the API", async () => {
    const notebookResponse = await request(app)
      .post("/notebooks")
      .send({ name: "Learning" })
      .expect(201);

    const noteResponse = await request(app)
      .post(`/notebooks/${notebookResponse.body.data.id}/notes`)
      .send({
        title: "Prisma boundary",
        body: "Prisma records are mapped before reaching the response.",
        status: "ACTIVE"
      })
      .expect(201);

    const listResponse = await request(app)
      .get(`/notebooks/${notebookResponse.body.data.id}/notes?status=ACTIVE&limit=10&offset=0`)
      .expect(200);

    assert.equal(noteResponse.body.data.title, "Prisma boundary");
    assert.equal(listResponse.body.data.length, 1);
    assert.equal(listResponse.body.data[0].id, noteResponse.body.data.id);
  });

  it("maps unique notebook names to public conflict errors", async () => {
    await request(app).post("/notebooks").send({ name: "Inbox" }).expect(201);

    const response = await request(app)
      .post("/notebooks")
      .send({ name: "Inbox" })
      .expect(409);

    assert.equal(response.body.ok, false);
    assert.equal(response.body.error.code, "NOTEBOOK_NAME_CONFLICT");
  });

  it("rejects invalid input before the repository boundary", async () => {
    const response = await request(app)
      .post("/notebooks")
      .send({ name: "" })
      .expect(400);

    assert.equal(response.body.ok, false);
    assert.equal(response.body.error.code, "VALIDATION_ERROR");
  });
});
