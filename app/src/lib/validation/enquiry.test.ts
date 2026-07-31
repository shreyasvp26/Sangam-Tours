import { describe, expect, it } from "vitest";

import { enquiryFormSchema } from "@/lib/validation/enquiry";

describe("enquiryFormSchema", () => {
  const valid = {
    name: "Priya Sharma",
    mobileNumber: "8983365332",
    email: "priya@example.com",
    city: "Nagpur",
    packageInterestedIn: "pkg-1",
    numberOfTravellers: "2",
    preferredTravelDate: "2026-10-12",
    message: "",
  };

  it("accepts a complete valid enquiry", () => {
    const result = enquiryFormSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects missing required fields with plain-language messages", () => {
    const result = enquiryFormSchema.safeParse({
      ...valid,
      name: "",
      mobileNumber: "123",
      email: "not-an-email",
      packageInterestedIn: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      expect(messages).toContain("Please enter your name.");
      expect(messages).toContain("Please enter a valid mobile number.");
      expect(messages).toContain("Please enter a valid email address.");
      expect(messages).toContain("Please select a package.");
    }
  });

  it("allows an optional empty message", () => {
    const result = enquiryFormSchema.safeParse({ ...valid, message: "   " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.message).toBe("");
    }
  });
});
