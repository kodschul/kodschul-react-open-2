const obj = {
  name: "abc",
  age: 20,
};

const obj2 = { ...obj };

obj2.name = "TEST_OVERWRITE";

console.log(obj2 == obj);

console.log(obj, obj2);
// const ob2 = { ...obj };

// console.log(obj.name == ob2.name);
