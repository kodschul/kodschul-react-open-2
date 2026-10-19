import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Counter from "./m09-l03-counter";

describe("Counter", () => {
  it("starts at 100", () => {
    render(<Counter />);
    expect(screen.getByTestId("countValue")).toHaveTextContent("100");
  });

  // TODO: Klick auf "+" simulieren (fireEvent.click) und 101 erwarten; ebenso "–" und "Reset"
  it.todo("increments on click on +");
});
