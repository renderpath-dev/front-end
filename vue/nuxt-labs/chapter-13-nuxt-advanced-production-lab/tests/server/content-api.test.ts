import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const contentFiles = [
  "content/docs/getting-started.md",
  "content/docs/rendering-boundary.md",
  "content/docs/server-boundary.md",
  "content/blog/first-post.md",
  "content/blog/image-performance.md",
] as const;

describe("content source boundary", () => {
  it("keeps required content files present", () => {
    for (const file of contentFiles) {
      expect(existsSync(resolve(process.cwd(), file))).toBe(true);
    }
  });

  it("keeps content metadata in frontmatter", () => {
    const source = readFileSync(
      resolve(process.cwd(), "content/docs/getting-started.md"),
      "utf-8",
    );

    expect(source).toContain("title: Getting Started");
    expect(source).toContain("description:");
    expect(source).toContain("navigation: true");
  });
});
