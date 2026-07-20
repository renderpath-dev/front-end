import assert from "node:assert/strict";
import test from "node:test";
import { createAuthenticatedNote, resetDatabase } from "./helpers/database.js";
import { createFixtureDirectory, removeFixtureDirectory, writePngFixture } from "./helpers/files.js";

test("downloads attachment only after owner authorization", async () => {
  await resetDatabase();
  const fixtureDirectory = await createFixtureDirectory();
  const { agent, csrfToken, note } = await createAuthenticatedNote();
  const pngPath = await writePngFixture(fixtureDirectory);

  const uploadResponse = await agent
    .post(`/notes/${note.id}/attachments`)
    .set("x-csrf-token", csrfToken)
    .attach("file", pngPath, { filename: "diagram.png", contentType: "image/png" });

  const attachmentId = uploadResponse.body.data.id as string;
  const downloadResponse = await agent.get(`/attachments/${attachmentId}/download`);

  assert.equal(downloadResponse.status, 200);
  assert.equal(downloadResponse.headers["content-type"], "image/png");
  assert.equal(downloadResponse.headers["x-content-type-options"], "nosniff");
  assert.match(downloadResponse.headers["content-disposition"], /attachment/);
  assert.match(downloadResponse.headers.etag, /^"sha256-[a-f0-9]{64}"$/);

  await removeFixtureDirectory(fixtureDirectory);
});
