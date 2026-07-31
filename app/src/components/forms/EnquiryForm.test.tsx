import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EnquiryForm } from "@/components/forms/EnquiryForm";

const packageOptions = [{ value: "pkg-1", label: "Leh Ladakh" }];

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^name/i), "Priya Sharma");
  await user.tab();
  await user.type(screen.getByLabelText(/mobile number/i), "8983365332");
  await user.tab();
  await user.type(screen.getByLabelText(/^email/i), "priya@example.com");
  await user.tab();
  await user.type(screen.getByLabelText(/^city/i), "Nagpur");
  await user.tab();
  await user.selectOptions(screen.getByLabelText(/package interested in/i), "pkg-1");
  await user.tab();
  await user.selectOptions(screen.getByLabelText(/number of travellers/i), "2");
  await user.tab();
  await user.type(screen.getByLabelText(/preferred travel date/i), "2026-10-12");
  await user.tab();
}

describe("EnquiryForm", () => {
  it("shows success confirmation when submit resolves ok", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue({
      ok: true,
      receipt: { received: true },
    });

    render(<EnquiryForm packageOptions={packageOptions} onSubmit={onSubmit} />);

    await fillRequiredFields(user);

    const submit = screen.getByRole("button", { name: /send enquiry/i });
    await waitFor(() => expect(submit).toBeEnabled());
    await user.click(submit);

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/enquiry received/i);
    });
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it("shows error feedback when submit fails", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue({
      ok: false,
      message: "We couldn't send your enquiry. Please try again or WhatsApp us.",
    });

    render(<EnquiryForm packageOptions={packageOptions} onSubmit={onSubmit} />);

    await fillRequiredFields(user);
    const submit = screen.getByRole("button", { name: /send enquiry/i });
    await waitFor(() => expect(submit).toBeEnabled());
    await user.click(submit);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/couldn't send your enquiry/i);
    });
  });

  it("keeps submit disabled until required fields are valid", () => {
    render(<EnquiryForm packageOptions={packageOptions} onSubmit={vi.fn()} />);

    expect(screen.getByRole("button", { name: /^send enquiry$/i })).toBeDisabled();
  });
});
