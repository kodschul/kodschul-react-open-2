import { describe, beforeEach, it, expect } from "vitest";
import { render } from "@testing-library/react";

import CounterApp from "../../src/state/app-with-state";

import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe("counter", () => {
  it("should render", () => {
    const { getByText, getByTestId } = render(<CounterApp />);
    const incBtn = getByText("+ CountUp");
    const initialCount = getByTestId("countValue");
    expect(initialCount.textContent).toBe("100");
    expect(incBtn).toBeDefined();
  });
});
