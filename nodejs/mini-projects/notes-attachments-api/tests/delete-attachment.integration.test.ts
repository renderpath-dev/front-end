import assert from "node:assert/strict";
import test from "node:test";
import { createAuthenticatedNote, resetDatabase } from "./helpers/database.js";
import { createFixtureDirectory, removeFixtureDirectory, writePngFixture } from "./helpers/files.js";

test("soft deletes metadata and removes stored object", async () => {
  await resetDatabase();
  const fixtureDirectory = await createFixtureDirectory();
  const { agent, csrfToken, note } = await createAuthenticatedNote();
  const pngPath = await writePngFixture(fixtureDirectory);

  const uploadResponse = await agent
    .post(`/notes/${note.id}/attachments`)
    .set("x-csrf-token", csrfToken)
    .attach("file", pngPath, { filename: "diagram.png", contentType: "image/png" });

  const attachmentId = uploadResponse.body.data.id as string;
  const deleteResponse = await agent
    .delete(`/attachments/${attachmentId}`)
    .set("x-csrf-token", csrfToken);

  assert.equal(deleteResponse.status, 200);

  const getResponse = await agent.get(`/attachments/${attachmentId}`);
  assert.equal(getResponse.status, 404);

  await removeFixtureDirectory(fixtureDirectory);
});
