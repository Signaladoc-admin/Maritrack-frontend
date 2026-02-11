import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Switch } from "./switch";

describe("Switch", () => {
  it("renders correctly", () => {
    render(<Switch aria-label="toggle" />);
    expect(screen.getByRole("switch", { name: /toggle/i })).toBeInTheDocument();
  });

  it("toggles state", () => {
    render(<Switch aria-label="toggle" />);
    const switchEl = screen.getByRole("switch", { name: /toggle/i });
    expect(switchEl).not.toBeChecked();
    fireEvent.click(switchEl);
    expect(switchEl).toBeChecked();
  });

  it("can be disabled", () => {
    render(<Switch disabled aria-label="toggle" />);
    const switchEl = screen.getByRole("switch", { name: /toggle/i });
    expect(switchEl).toBeDisabled();
  });
});
