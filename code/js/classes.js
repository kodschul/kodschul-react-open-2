class BankAccount {
  balance = 0;

  constructor(name) {
    this.name = name;
  }

  showBalance = () => {
    console.log(`Hi ${this.name}, dein Kontostand ist: ${this.balance}€`);
  };
}

const bank = new BankAccount("Alice");
bank.showBalance();

class Animal {
  constructor(hhhjhj) {
    console.log("Hi I'm an Animal");
  }

  greet = () => {
    console.log("Wassup!");
  };

  sleep = () => {
    //
  };
}

class Dog extends Animal {}

class Cat extends Animal {
  greet = () => {
    console.log("Hi I'm a cat");
  };
}

const bobby = new Dog();

bobby.greet();

const myCat = new Cat();
myCat.greet();
