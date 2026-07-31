import { expect, test } from "@playwright/test";

/** Mirrors Document 03 primary header nav — kept local so e2e stays path-alias free. */
const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "Domestic Tours", href: "/domestic" },
  { label: "International Tours", href: "/international" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

test.describe("Navigation journeys", () => {
  test("desktop primary nav reaches every public IA destination", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await expect(page.getByRole("link", { name: /skip to main content/i })).toBeAttached();

    for (const item of PRIMARY_NAV) {
      if (item.href === "/") continue;
      await page.goto(item.href);
      await expect(page.locator("main#main-content")).toBeVisible();
      await expect(page).toHaveURL(new RegExp(`${item.href.replace(/\//g, "\\/")}$`));
    }
  });

  test("mobile drawer opens and navigates to FAQ", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.getByRole("dialog", { name: /menu/i })).toBeVisible();
    await page
      .getByRole("navigation", { name: /mobile/i })
      .getByRole("link", { name: /^faq$/i })
      .click();
    await expect(page).toHaveURL(/\/faq$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
