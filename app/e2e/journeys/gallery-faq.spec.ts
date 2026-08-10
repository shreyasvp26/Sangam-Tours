import { expect, test } from "@playwright/test";

test.describe("Gallery & FAQ journeys", () => {
  test("gallery shows empty library state with WhatsApp path", async ({ page }) => {
    await page.goto("/gallery");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("status")).toBeVisible();
    await expect(page.getByRole("link", { name: /whatsapp us/i }).first()).toBeVisible();
  });

  test("faq lists published questions with category filters and contact CTA", async ({ page }) => {
    await page.goto("/faq");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("button", { name: /how do i book a tour/i })).toBeVisible();
    await expect(page.getByRole("group", { name: /category/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /contact/i }).first()).toBeVisible();
  });

  test("testimonials empty state is reachable from footer", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("contentinfo").getByRole("link", { name: /testimonials/i }).click();
    await expect(page).toHaveURL(/\/testimonials$/);
    await expect(page.getByRole("status")).toBeVisible();
  });
});
