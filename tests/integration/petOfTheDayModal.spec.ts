import { expect } from "@playwright/test";
import { test } from "../setup";

test.describe("Pet of the day modal", () => {
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
