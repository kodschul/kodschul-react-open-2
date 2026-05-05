const obj = {
  name: "abc",
  age: 20,
};

const ob2 = { ...obj };

console.log(obj.name == ob2.name);
