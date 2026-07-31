import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EmptyState } from "@/components/feedback/EmptyState";

describe("EmptyState", () => {
  it("exposes a status landmark with title and description", () => {
    render(
      <EmptyState
        title="No tours match your filters right now"
        description="Try clearing filters to see all packages in this category."
      />,
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /no tours match/i })).toBeInTheDocument();
    expect(screen.getByText(/clearing filters/i)).toBeInTheDocument();
  });

  it("renders a resolving action when provided", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();

    render(
      <EmptyState
        title="Nothing here yet"
        action={
          <button type="button" onClick={onClear}>
            Clear filters
          </button>
        }
      />,
    );

    await user.click(screen.getByRole("button", { name: /clear filters/i }));
    expect(onClear).toHaveBeenCalledOnce();
  });
});
