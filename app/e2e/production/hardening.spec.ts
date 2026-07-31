import { expect, test } from "@playwright/test";

test.describe("Production hardening", () => {
  test("security headers are present on HTML responses", async ({ request }) => {
    const response = await request.get("/");
    expect(response.ok()).toBeTruthy();
    const headers = response.headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"]).toMatch(/camera=\(\)/);
    expect(headers["strict-transport-security"]).toMatch(/max-age=/);
    expect(headers["x-powered-by"]).toBeUndefined();
  });

  test("health endpoint reports healthy without catalogue leakage", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["cache-control"]).toMatch(/no-store/i);
    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(body.status).toBe("healthy");
    expect(body).not.toHaveProperty("packages");
    expect(JSON.stringify(body)).not.toMatch(/8983365332|info@sangamtours/i);
  });
});
