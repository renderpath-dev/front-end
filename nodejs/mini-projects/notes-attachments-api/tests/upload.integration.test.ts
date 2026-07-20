import assert from "node:assert/strict";
import test from "node:test";
import { createAuthenticatedNote, resetDatabase } from "./helpers/database.js";
import { createFixtureDirectory, removeFixtureDirectory, writeInvalidFixture, writePngFixture } from "./helpers/files.js";

test("uploads one validated png attachment", async () => {
  await resetDatabase();
  const fixtureDirectory = await createFixtureDirectory();
  const { agent, csrfToken, note } = await createAuthenticatedNote();
  const pngPath = await writePngFixture(fixtureDirectory);

  const response = await agent
    .post(`/notes/${note.id}/attachments`)
    .set("x-csrf-token", csrfToken)
    .attach("file", pngPath, { filename: "diagram.png", contentType: "image/png" });

  assert.equal(response.status, 201);
  assert.equal(response.body.data.originalName, "diagram.png");
  assert.equal(response.body.data.detectedMimeType, "image/png");
  assert.equal(response.body.data.storageKey, undefined);

  await removeFixtureDirectory(fixtureDirectory);
});

test("rejects extension and bytes mismatch", async () => {
  await resetDatabase();
  const fixtureDirectory = await createFixtureDirectory();
  const { agent, csrfToken, note } = await createAuthenticatedNote();
  const invalidPath = await writeInvalidFixture(fixtureDirectory);

  const response = await agent
    .post(`/notes/${note.id}/attachments`)
    .set("x-csrf-token", csrfToken)
    .attach("file", invalidPath, { filename: "fake.png", contentType: "image/png" });

  assert.equal(response.status, 415);
  await removeFixtureDirectory(fixtureDirectory);
});
