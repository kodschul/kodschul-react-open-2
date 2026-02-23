function sayHello() {
  console.log("Hallo");
}

const add = (a, b, c) => {
  return a + b + c;
};

console.log(add(1, 2, 3));

const sum = (...args) => {
  let _arg5 = args[4];
  console.log({ _arg5 });
  return 0;
  // return args.reduce((x, current) => current + x, 0);
};
console.log(sum(1, 2, 3, 4, "5 is 5", 7, 8, 9));

const inputs = [1, 2, 3];
console.log(sum(...inputs));

let itemsChange = items.map((x) => "Item: " + x);
console.log(itemsChange);

function greet(person) {
  return `Hello ${person.name}, du bist ${person.age} Jahre alt.`;
}

let greetMe = function (name) {
  return "Hello: " + name;
};

let greetMeBetter = (name) => "Hello: " + name;

let max = { name: "Max", age: 30 };
let alice = { name: "Alice", age: 25 };

let calculator = {
  x: 0,
  add: function (a, b) {
    this.x = 10;
    return a + b;
  },
  subtract: function (a, b) {
    return a - b;
  },
};

calculator.add(1, 2);

console.log(3 % 2 == 0);
