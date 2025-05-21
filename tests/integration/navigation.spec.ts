import { expect, test } from "@playwright/test";

test.describe("functionalities", () => {
  test("goes to details page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Jade" }).click();
    await expect(page.getByText("Jade")).toBeVisible();
    await expect(page.getByText("Description")).toBeVisible();
    await expect(page.getByTestId("pet-details-page")).toBeVisible();
  });

  test("keeps persistant state among pages", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "id sorted ascending" })).toBeVisible();
    await page.getByRole("button", { name: "id sorted ascending" }).click();
    await expect(page.getByRole("button", { name: "id sorted descending" })).toBeVisible();
    await page.getByRole("table").getByRole("link").first().click();
    await page.getByTestId("logo").click();
    await expect(page.getByRole("button", { name: "id sorted descending" })).toBeVisible();
  });
});
