import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "../msw/msw-server";
import { resetMswScenario } from "../msw/msw-scenarios";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  server.resetHandlers();
  resetMswScenario();
  document.body.innerHTML = "";
  vi.clearAllMocks();
  vi.clearAllTimers();
  vi.useRealTimers();
});

afterAll(() => {
  server.close();
});
