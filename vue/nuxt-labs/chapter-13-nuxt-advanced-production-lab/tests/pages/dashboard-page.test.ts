import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("protected page smoke contracts", () => {
  it("dashboard uses client middleware and server API data", () => {
    const source = readFileSync(
      resolve(process.cwd(), "app/pages/dashboard.vue"),
      "utf-8",
    );

    expect(source).toContain('middleware: ["authenticated"]');
    expect(source).toContain("useAccountProfile");
  });

  it("admin page uses admin middleware and protected report data", () => {
    const source = readFileSync(
      resolve(process.cwd(), "app/pages/admin/index.vue"),
      "utf-8",
    );

    expect(source).toContain('middleware: ["authenticated", "admin-only"]');
    expect(source).toContain("useAdminReport");
  });
});
