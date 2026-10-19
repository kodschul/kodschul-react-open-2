import { beforeEach, describe, expect, it } from "vitest";
import Calculator from "./calculator";

describe("Calculator", () => {
  let calculator: Calculator;

  // Vor jedem Test beginnt ein frischer Rechner: Die Tests beeinflussen sich nicht.
  beforeEach(() => {
    calculator = new Calculator();
  });

  it("starts at 0", () => {
    expect(calculator.ans()).toBe(0);
  });

  it("adds", () => {
    calculator.add(2);
    expect(calculator.ans()).toBe(2);
  });

  it("adds and subtracts", () => {
    calculator.add(2);
    calculator.sub(1);
    expect(calculator.ans()).toBe(1);
  });

  it("resets to 0", () => {
    calculator.add(5);
    expect(calculator.reset()).toBe(0);
    expect(calculator.ans()).toBe(0);
  });
});
