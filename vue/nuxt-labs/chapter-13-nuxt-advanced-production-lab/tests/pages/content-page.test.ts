import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("content page smoke contracts", () => {
  it("docs index queries docs collection", () => {
    const source = readFileSync(
      resolve(process.cwd(), "app/pages/docs/index.vue"),
      "utf-8",
    );

    expect(source).toContain('queryCollection("docs")');
    expect(source).toContain("<ContentCard");
  });

  it("blog slug page renders selected content", () => {
    const source = readFileSync(
      resolve(process.cwd(), "app/pages/blog/[slug].vue"),
      "utf-8",
    );

    expect(source).toContain('queryCollection("blog")');
    expect(source).toContain("<ContentRenderer");
  });
});
