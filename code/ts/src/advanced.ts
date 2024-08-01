function add<InputType>(x: InputType, y: InputType): any {
  console.log(x, y);
}

let result: number = add<number>(5, 10);

interface IAnimal {
  name: string;
  speak(): void;
}

interface IDog {
  name: string;

  bark(): void;
}

class Animal implements IAnimal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): void {
    console.log(`${this.name} macht Geräusche.`);
  }
}

class Dog extends Animal implements IDog {
  bark(): void {}
}

let dog = new Animal("Bello");
dog.speak();

function abc() {}

enum Status {
  ACTIVE,
  INACTIVE,
  PREPARING,
  TEST,
}

let aStatus: Status = Status.ACTIVE;
