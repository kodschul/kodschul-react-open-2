import { beforeEach, beforeAll, describe, expect, it } from "vitest";
import Calculator from "./m09-l03-calculator";

describe("Calculator", () => {
  const calc = new Calculator();

  beforeAll(() => {
    console.log("comes once: before all ");
  });

  beforeEach(() => {
    calc.reset();
  });

  it("can add", () => {
    calc.add(10);
    calc.add(20);
    expect(calc.ans()).toBe(30);
  });

  it("can add negatives", () => {
    calc.add(-100);
    calc.add(-100);

    expect(calc.ans()).toBe(-200);
  });
});
