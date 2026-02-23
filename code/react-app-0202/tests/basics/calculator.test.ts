import { describe, beforeEach, it, expect } from "vitest";

import Calculator from "./calculator";

let calculator = new Calculator();
describe("calculator", () => {
  beforeEach(() => {
    calculator = new Calculator();
  });

  it("should add", () => {
    calculator.add(2);
    expect(calculator.ans()).toBe(2);
  });

  it("should add and sub", () => {
    calculator.add(2);
    calculator.sub(1);
    expect(calculator.ans()).toBe(1);
  });
});
