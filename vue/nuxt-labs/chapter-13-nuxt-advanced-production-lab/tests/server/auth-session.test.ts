import { describe, expect, it } from "vitest";
import { findDemoUser } from "../../server/utils/mockUsers";
import { createSessionPayload } from "../../server/utils/sessionPolicy";
import { parseLoginBody } from "../../server/utils/serverValidation";

describe("auth session boundary", () => {
  it("validates login body before session lookup", () => {
    const payload = parseLoginBody({
      email: "learner@example.com",
      password: "learn-nuxt-13",
    });

    expect(payload.email).toBe("learner@example.com");
  });

  it("rejects invalid login body", () => {
    expect(() => parseLoginBody({ email: "bad", password: "short" })).toThrow();
  });

  it("projects a safe user into session payload", () => {
    const user = findDemoUser("admin@example.com", "admin-nuxt-13");

    expect(user).not.toBeNull();
    expect(user?.role).toBe("admin");

    if (user) {
      const payload = createSessionPayload(user);
      expect(payload.user.email).toBe("admin@example.com");
      expect("password" in payload.user).toBe(false);
    }
  });
});
