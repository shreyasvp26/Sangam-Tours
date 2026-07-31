import { expect, test } from "@playwright/test";

test.describe("Performance smoke", () => {
  test("home reaches usable content quickly with stable main landmark", async ({ page }) => {
    const started = Date.now();
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const elapsed = Date.now() - started;

    // Smoke threshold for local production build — not a lab CWV substitute.
    expect(elapsed).toBeLessThan(15_000);

    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
      const jsBytes = resources
        .filter((entry) => entry.name.includes("/_next/static/") && entry.name.endsWith(".js"))
        .reduce((sum, entry) => sum + (entry.transferSize || 0), 0);

      return {
        domContentLoaded: nav ? nav.domContentLoadedEventEnd - nav.startTime : null,
        jsTransferBytes: jsBytes,
      };
    });

    if (metrics.domContentLoaded !== null) {
      expect(metrics.domContentLoaded).toBeLessThan(10_000);
    }

    // Guardrail against accidental mega-bundles on first paint path.
    expect(metrics.jsTransferBytes).toBeLessThan(1_500_000);
  });

  test("contact form island does not block first paint of page chrome", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "networkidle" });
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
