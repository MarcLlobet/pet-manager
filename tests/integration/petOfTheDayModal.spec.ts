import { expect, test } from "@playwright/test";

test.describe.skip("Pet of the day modal", () => {
  // test("opens modal", async ({ page }) => {
  //   await page.goto("/");
  //   await page.getByRole("button", { name: "Pet of the day" }).click();
  //   await expect(page.getByRole("heading", { name: "Pet of the Day" })).toBeVisible();
  // });

  test("opens modal", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Pet of the day" }).click();
    await expect(page.getByRole("heading", { name: "Pet of the Day" })).toBeVisible();
  });

  test("closes modal by clicking on the cross", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Pet of the day" }).click();
    await expect(page.getByRole("heading", { name: "Pet of the Day" })).toBeVisible();
    await page.getByRole("button", { name: "top-close" }).click();
    await expect(page.getByRole("heading", { name: "Pet of the Day" })).not.toBeVisible();
  });

  test("closes modal by clicking on the bottom button", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Pet of the day" }).click();
    await expect(page.getByRole("heading", { name: "Pet of the Day" })).toBeVisible();
    await page.getByRole("button", { name: "bottom-close" }).click();
    await expect(page.getByRole("heading", { name: "Pet of the Day" })).not.toBeVisible();
  });
});
