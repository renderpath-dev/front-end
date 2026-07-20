import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { app } from "../src/app.js";
import { integrationTestsEnabled } from "./helpers/database.js";

test("SSE endpoint requires authentication", { skip: !integrationTestsEnabled() }, async () => {
  const response = await request(app).get("/events");
  assert.equal(response.status, 401);
});
