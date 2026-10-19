// Starter für Lab 9.3 (a): Klasse Calculator. Kopiere die Datei unter gleichem Namen nach src/playground/.
class Calculator {
  private value = 0;

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
