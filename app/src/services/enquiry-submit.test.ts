import { describe, expect, it } from "vitest";

import { submitPackageEnquiry } from "@/services/enquiry-submit";

describe("submitPackageEnquiry integration", () => {
  it("returns a failure result when no enquiry backend is connected", async () => {
    const result = await submitPackageEnquiry({
      name: "Priya Sharma",
      mobileNumber: "8983365332",
      email: "priya@example.com",
      city: "Nagpur",
      packageInterestedIn: "pkg-1",
      numberOfTravellers: "2",
      preferredTravelDate: "2026-10-12",
      message: "Looking for family dates",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.message).toMatch(/not connected|couldn't|try again|whatsapp/i);
    }
  });
});
