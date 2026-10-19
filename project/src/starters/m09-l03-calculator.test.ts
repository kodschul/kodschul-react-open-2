import { beforeEach, describe, expect, it } from "vitest";
import Calculator from "./m09-l03-calculator";

describe("Calculator", () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
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

  // TODO: Test für reset() schreiben und it.todo durch it ersetzen
  it.todo("resets to 0");
});
