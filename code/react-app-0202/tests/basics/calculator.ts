class Calculator {
  private value: number = 0;

  add(x: number): number {
    this.value += x;
    return this.value;
  }

  sub(x: number): number {
    this.value -= x;
    return this.value;
  }

  ans(): number {
    return this.value;
  }

  reset(): number {
    this.value = 0;
    return this.value;
  }
}

export default Calculator;
