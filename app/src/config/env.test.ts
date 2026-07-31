import { afterEach, describe, expect, it } from "vitest";

import { getAppEnv, resetAppEnvCache } from "@/config/env";

const originalNodeEnv = process.env.NODE_ENV;

describe("getAppEnv", () => {
  afterEach(() => {
    delete process.env.CONTENT_SOURCE;
    delete process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NODE_ENV = originalNodeEnv;
    resetAppEnvCache();
  });

  it("defaults to local content source", () => {
    resetAppEnvCache();
    expect(getAppEnv().contentSource).toBe("local");
  });

  it("accepts empty content source outside production", () => {
    process.env.CONTENT_SOURCE = "empty";
    process.env.NODE_ENV = "test";
    resetAppEnvCache();
    expect(getAppEnv().contentSource).toBe("empty");
  });

  it("rejects unknown content sources", () => {
    process.env.CONTENT_SOURCE = "cms";
    resetAppEnvCache();
    expect(() => getAppEnv()).toThrow(/Invalid environment configuration/i);
  });

  it("refuses empty content source in production", () => {
    process.env.CONTENT_SOURCE = "empty";
    process.env.NODE_ENV = "production";
    resetAppEnvCache();
    expect(() => getAppEnv()).toThrow(/not allowed in production/i);
  });
});
