// import * as matchers from "@testing-library/react";

import { expect, test, it, describe } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./CounterApp";

import * as matchers from "@testing-library/jest-dom/matchers";
import userEvent from "@testing-library/user-event";
expect.extend(matchers);

describe("Counter", () => {
  // it("should render the component", () => {
  //   const { container } = render(<Counter />);
  //   expect(container).toMatchSnapshot();
  // });

  it("should increment", async () => {
    userEvent.setup();
    render(<Counter />);

    const el = screen.getByText("add");
    await userEvent.click(el);

    const elWithTwo = screen.getByText("Count: 11");
    expect(elWithTwo).toBeInTheDocument();
  });

  //   it("should increment the count by 1", () => {
  //     const { getByTestId } = render(<Counter />);
  //     const button = screen.getByText(/count is 0/i);

  //     fireEvent.click(button);

  //     const btn2 = screen.getByText("count is 1");

  //     expect(screen.getByText("count is 1")).toBeDefined();
  //   });
});
