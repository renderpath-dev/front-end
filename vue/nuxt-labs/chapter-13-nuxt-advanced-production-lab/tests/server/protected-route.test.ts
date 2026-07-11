import { describe, expect, it } from "vitest";
import { hasRole, requireRole } from "../../server/utils/authorization";
import type { SafeUser } from "../../shared/types/auth";

const learner: SafeUser = {
  id: "u-100",
  email: "learner@example.com",
  name: "Learner User",
  role: "user",
};

const admin: SafeUser = {
  id: "u-900",
  email: "admin@example.com",
  name: "Admin User",
  role: "admin",
};

describe("protected route boundary", () => {
  it("allows admin role for admin boundary", () => {
    expect(hasRole(admin, "admin")).toBe(true);
    expect(() => requireRole(admin, "admin")).not.toThrow();
  });

  it("rejects non-admin role for admin boundary", () => {
    expect(hasRole(learner, "admin")).toBe(false);
    expect(() => requireRole(learner, "admin")).toThrow();
  });
});
