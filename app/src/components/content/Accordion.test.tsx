import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Accordion } from "@/components/content/Accordion";

describe("Accordion", () => {
  it("toggles disclosure with aria-expanded", async () => {
    const user = userEvent.setup();

    render(
      <Accordion
        items={[
          { id: "q1", title: "Is food included?", content: <p>Yes, home-style meals.</p> },
          { id: "q2", title: "Who is the Tour Manager?", content: <p>A dedicated manager.</p> },
        ]}
      />,
    );

    const first = screen.getByRole("button", { name: /is food included/i });
    expect(first).toHaveAttribute("aria-expanded", "false");

    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/home-style meals/i)).toBeVisible();

    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "false");
  });

  it("supports exclusive mode so only one panel stays open", async () => {
    const user = userEvent.setup();

    render(
      <Accordion
        exclusive
        items={[
          { id: "a", title: "Question A", content: <p>Answer A</p> },
          { id: "b", title: "Question B", content: <p>Answer B</p> },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: /question a/i }));
    await user.click(screen.getByRole("button", { name: /question b/i }));

    expect(screen.getByRole("button", { name: /question a/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.getByRole("button", { name: /question b/i })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });
});
