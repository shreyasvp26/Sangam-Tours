import { expect, test } from "@playwright/test";

test.describe("Contact & enquiry flow", () => {
  test("contact page exposes channels and offices", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("main")).toBeVisible();

    await expect(page.getByRole("heading", { level: 1, name: /contact/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /call/i }).first()).toBeVisible();
    await expect(page.getByText(/nagpur/i).first()).toBeVisible();
  });

  test("enquiry section degrades to Call/WhatsApp when no packages exist", async ({ page }) => {
    await page.goto("/contact");

    await expect(page.getByRole("heading", { name: /send an enquiry/i })).toBeVisible();
    await expect(
      page.getByRole("status").filter({ hasText: /enquiry form available when tours are listed/i }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /call now/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /whatsapp us/i }).first()).toBeVisible();
  });
});
