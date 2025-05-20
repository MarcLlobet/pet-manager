import { test, expect } from "@playwright/test";

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders home page", async ({ page }) => {
    await expect(page.getByTestId("pets-dashboard-page")).toBeVisible();
  });

  test.describe("table", () => {
    test("data is sortable", async ({ page }) => {
      await page.getByRole("button", { name: "id sorted ascending" }).click();
      await expect(page.getByRole("button", { name: "id sorted descending" })).toBeVisible();
    });

    test("adds rows", async ({ page }) => {
      await expect(page.getByText("1–5 of")).toBeVisible();
      await page.getByRole("combobox", { name: "Rows per page:" }).click();
      await page.getByRole("option", { name: "10" }).click();
      await expect(page.getByText("–10 of 30")).toBeVisible();
    });

    test("moves to next page", async ({ page }) => {
      await expect(page.getByText("1–5 of")).toBeVisible();
      await page.getByRole("button", { name: "next page" }).click();
      await expect(page.getByText("–10 of 30")).toBeVisible();
    });

    test("moves to last page", async ({ page }) => {
      await expect(page.getByText("1–5 of")).toBeVisible();
      await page.getByRole("button", { name: "next page" }).click();
      await expect(page.getByText("–10 of 30")).toBeVisible();
      await page.getByRole("button", { name: "last page" }).click();
      await expect(page.getByText("–30 of 30")).toBeVisible();
    });
  });
});
