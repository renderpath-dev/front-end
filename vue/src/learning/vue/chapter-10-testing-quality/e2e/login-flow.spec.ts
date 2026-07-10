import { expect, test } from "@playwright/test";

test("signs in to the local admin learning shell", async ({ page }) => {
  await page.goto("/");
  const chapter = page.locator('[aria-labelledby="chapter-08-title"]');

  await chapter.getByRole("button", { name: "Sign in as admin" }).click();

  await expect(chapter.getByText("Avery Admin / admin")).toBeVisible();
  await expect(
    chapter.getByRole("menuitem", { name: "Dashboard" }),
  ).toBeVisible();
});
