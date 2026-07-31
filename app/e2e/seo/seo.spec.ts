import { expect, test } from "@playwright/test";

test.describe("SEO regression", () => {
  test("robots.txt allows public site and disallows admin", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.ok()).toBeTruthy();
    const body = await response.text();
    expect(body).toMatch(/Allow:\s*\//i);
    expect(body).toMatch(/Disallow:\s*\/admin/i);
    expect(body).toMatch(/Sitemap:\s*https?:\/\/.+\/sitemap\.xml/i);
  });

  test("sitemap.xml lists core IA routes", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBeTruthy();
    const body = await response.text();
    for (const path of ["/", "/domestic", "/international", "/contact", "/faq", "/gallery"]) {
      expect(body).toContain(path === "/" ? "https://" : path);
    }
  });

  test("public pages expose unique title, description, and canonical", async ({ page }) => {
    const samples = [
      { path: "/", title: /sangam tours/i },
      { path: "/about", title: /about/i },
      { path: "/contact", title: /contact/i },
      { path: "/faq", title: /faq|question/i },
    ] as const;

    const titles = new Set<string>();

    for (const sample of samples) {
      await page.goto(sample.path);
      const title = await page.title();
      expect(title).toMatch(sample.title);
      titles.add(title);

      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveAttribute("content", /.+/);

      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute("href", new RegExp(`${sample.path === "/" ? "" : sample.path}/?$`));

      const ogTitle = page.locator('meta[property="og:title"]');
      await expect(ogTitle).toHaveAttribute("content", /.+/);
    }

    expect(titles.size).toBe(samples.length);
  });

  test("root layout includes TravelAgency JSON-LD", async ({ page }) => {
    await page.goto("/");
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd.first()).toBeAttached();
    const raw = await jsonLd.first().textContent();
    expect(raw).toBeTruthy();
    expect(raw!).toMatch(/TravelAgency|WebSite/);
  });
});
