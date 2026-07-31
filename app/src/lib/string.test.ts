import { describe, expect, it } from "vitest";

import { digitsOnly, normalizeWhitespace, slugify } from "@/lib/string";
import { isActivePath } from "@/lib/navigation";

describe("string helpers", () => {
  it("normalizes whitespace", () => {
    expect(normalizeWhitespace("  Sangam   Tours  ")).toBe("Sangam Tours");
  });

  it("slugifies destination names", () => {
    expect(slugify("Leh Ladakh Circuit!")).toBe("leh-ladakh-circuit");
  });

  it("extracts digits only for tel/wa.me", () => {
    expect(digitsOnly("+91 89833-65332")).toBe("918983365332");
  });
});

describe("isActivePath", () => {
  it("matches home only exactly", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/about", "/")).toBe(false);
  });

  it("matches nested package paths under listing roots", () => {
    expect(isActivePath("/domestic", "/domestic")).toBe(true);
    expect(isActivePath("/packages/leh", "/domestic")).toBe(false);
    expect(isActivePath("/about/team", "/about")).toBe(true);
  });
});
