import { expect, test } from "@playwright/test";

test.describe("Package discovery & detail", () => {
  test("domestic and international listings show empty states when catalog has no packages", async ({
    page,
  }) => {
    for (const path of ["/domestic", "/international"] as const) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("status")).toContainText(/new departures|being added/i);
      await expect(page.getByRole("link", { name: /whatsapp us/i }).first()).toBeVisible();
    }
  });

  test("unknown package slug returns a not-found experience", async ({ page }) => {
    await page.goto("/packages/does-not-exist-yet");
    await expect(page.getByText(/404|not found|couldn't find|could not find/i).first()).toBeVisible();
  });
});
