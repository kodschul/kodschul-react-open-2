import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter", () => {
  it("starts at 100", () => {
    render(<Counter />);
    // getByTestId liefert das Element, toHaveTextContent kommt aus jest-dom (src/test-setup.ts).
    expect(screen.getByTestId("countValue")).toHaveTextContent("100");
  });

  it("increments on click on +", () => {
    render(<Counter />);
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByTestId("countValue")).toHaveTextContent("101");
  });

  it("decrements on click on –", () => {
    render(<Counter />);
    fireEvent.click(screen.getByRole("button", { name: "–" }));
    expect(screen.getByTestId("countValue")).toHaveTextContent("99");
  });

  it("resets to 100", () => {
    render(<Counter />);
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByTestId("countValue")).toHaveTextContent("100");
  });
});
