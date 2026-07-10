import { expect, test } from "@playwright/test";

test("deletes a user from the local CRUD collection", async ({ page }) => {
  await page.goto("/");
  const chapter = page.locator('[aria-labelledby="chapter-08-title"]');

  await chapter.getByRole("button", { name: "Sign in as admin" }).click();
  await chapter.getByRole("menuitem", { name: "Users" }).click();
  const userRow = chapter.getByRole("row").filter({ hasText: "Avery Stone" });
  await expect(userRow).toBeVisible();
  await userRow.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "OK" }).click();

  await expect(
    page.getByText("User deleted from the local collection"),
  ).toBeVisible();
  await expect(userRow).toHaveCount(0);
});
