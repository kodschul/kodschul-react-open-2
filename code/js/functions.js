function sayHello() {
  console.log("Hallo");
}

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

console.log(calculator);
