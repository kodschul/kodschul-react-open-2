import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./m09-l03-counter";

describe("Counter", () => {
  beforeEach(() => {
    render(<Counter />);
  });

  it("starts at 100", () => {
    expect(screen.getByTestId("countValue").textContent).toBe("100");
  });

  // TODO: Klick auf "+" simulieren (fireEvent.click) und 101 erwarten; ebenso "–" und "Reset"
  it.only("increments on click on +", () => {
    expect(screen.getByTestId("countValue").textContent).toBe("100");
    const addBtn = screen.getByText("+");
    fireEvent.click(addBtn);
    expect(screen.getByTestId("countValue").textContent).toBe("101");
  });
});
