import { expect, test } from "@playwright/test";

test("submits a contract-valid product form", async ({ page }) => {
  await page.goto("/");
  const chapter = page.locator('[aria-labelledby="chapter-09-title"]');
  const formCard = chapter
    .locator(".el-card")
    .filter({ hasText: "Product form submit" });
  const nameInput = formCard.getByLabel("Name");

  await nameInput.fill("");
  await formCard.getByRole("button", { name: "Validate and submit" }).click();
  await expect(formCard.getByText("Validation", { exact: true })).toBeVisible();

  await nameInput.fill("Contract Lab Product");
  await formCard.getByRole("button", { name: "Validate and submit" }).click();

  await expect(
    formCard.getByText("Product created", { exact: true }),
  ).toBeVisible();
  await expect(
    formCard.getByText("Contract Lab Product", { exact: true }),
  ).toBeVisible();
});
