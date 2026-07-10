import { expect, test } from "@playwright/test";

test("shows only the menus allowed for an operator", async ({ page }) => {
  await page.goto("/");
  const chapter = page.locator('[aria-labelledby="chapter-08-title"]');

  await chapter.getByRole("button", { name: "Sign in as operator" }).click();

  await expect(chapter.getByRole("menuitem", { name: "Orders" })).toBeVisible();
  await expect(chapter.getByRole("menuitem", { name: "Users" })).toHaveCount(0);
  await expect(chapter.getByRole("menuitem", { name: "Roles" })).toHaveCount(0);
});
