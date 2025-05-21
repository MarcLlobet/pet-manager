import { expect, test } from "@playwright/test";

test.describe("detail page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/1");
  });

  test("renders detail page", async ({ page }) => {
    await expect(page.getByTestId("pet-details-page")).toBeVisible();
  });
});
