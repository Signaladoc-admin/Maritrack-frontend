import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("renders correctly", () => {
    render(<Checkbox aria-label="agree" />);
    expect(screen.getByRole("checkbox", { name: /agree/i })).toBeInTheDocument();
  });

  it("toggles state", () => {
    render(<Checkbox aria-label="agree" />);
    const checkbox = screen.getByRole("checkbox", { name: /agree/i });
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("can be controlled", () => {
    // Note: Radix UI Checkbox controlled state requires onCheckedChange
    render(<Checkbox checked={true} aria-label="agree" onCheckedChange={() => {}} />);
    const checkbox = screen.getByRole("checkbox", { name: /agree/i });
    expect(checkbox).toBeChecked();
  });

  it("can be disabled", () => {
    render(<Checkbox disabled aria-label="agree" />);
    const checkbox = screen.getByRole("checkbox", { name: /agree/i });
    expect(checkbox).toBeDisabled();
  });
});
