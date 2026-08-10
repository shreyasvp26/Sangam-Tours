import { expect, test } from "@playwright/test";

test.describe("Empty & error states", () => {
  test("terms page renders supplied policy; other legal pages stay empty", async ({ page }) => {
    await page.goto("/terms-and-conditions");
    await expect(page.getByRole("heading", { level: 1, name: /terms & conditions/i })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: /1\. booking confirmation/i })).toBeVisible();
    await expect(page.getByText(/governed by the laws of india/i)).toBeVisible();

    for (const path of ["/privacy-policy", "/cancellation-and-refund-policy"] as const) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("status")).toBeVisible();
    }
  });

  test("about page still presents company story with empty catalog media", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText(/1979|sangam/i).first()).toBeVisible();
  });
});
