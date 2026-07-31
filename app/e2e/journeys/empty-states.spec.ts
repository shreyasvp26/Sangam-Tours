import { expect, test } from "@playwright/test";

test.describe("Empty & error states", () => {
  test("legal pages render empty document state without CTA clutter", async ({ page }) => {
    for (const path of [
      "/terms-and-conditions",
      "/privacy-policy",
      "/cancellation-and-refund-policy",
    ] as const) {
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
