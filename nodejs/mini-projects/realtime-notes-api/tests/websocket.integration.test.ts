import test from "node:test";
import assert from "node:assert/strict";
import WebSocket from "ws";
import { createRealtimeTestServer } from "./helpers/realtime.js";
import { integrationTestsEnabled } from "./helpers/database.js";

test("WebSocket upgrade rejects missing cookie session", { skip: !integrationTestsEnabled() }, async () => {
  const server = await createRealtimeTestServer();
  try {
    const result = await new Promise<"open" | "error">((resolve) => {
      const client = new WebSocket(server.wsUrl, { headers: { Origin: "http://localhost:3000" } });
      client.once("open", () => resolve("open"));
      client.once("error", () => resolve("error"));
    });
    assert.equal(result, "error");
  } finally {
    await server.close();
  }
});
