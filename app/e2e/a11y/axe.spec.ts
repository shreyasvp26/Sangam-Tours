import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const CRITICAL_ROUTES = [
  "/",
  "/domestic",
  "/international",
  "/about",
  "/gallery",
  "/testimonials",
  "/faq",
  "/contact",
  "/privacy-policy",
] as const;

async function waitForMain(page: import("@playwright/test").Page) {
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("main", { name: /loading/i })).toHaveCount(0);
}

test.describe("Accessibility regression", () => {
  for (const route of CRITICAL_ROUTES) {
    test(`axe serious/critical violations on ${route}`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });
      await waitForMain(page);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();

      const blocking = results.violations.filter(
        (violation) => violation.impact === "critical" || violation.impact === "serious",
      );

      expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
    });
  }

  test("skip link is keyboard reachable on home", async ({ page }) => {
    await page.goto("/");
    await waitForMain(page);
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: /skip to main content/i });
    await expect(skip).toBeFocused();
  });
});
