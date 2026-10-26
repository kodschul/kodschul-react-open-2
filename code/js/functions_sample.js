function greetMe(name) {
  console.log("Hello " + name);
}

const greetMeArr = (name) => console.log("Hello  " + name);

const callTheInnerFunc = (inner) => inner();

callTheInnerFunc(() => {
  console.log("This is the inner arrow func");
  throw new Error("something went wrong!");
});

// callTheInnerFunc(function () {
//   console.log("This is the inner named func");
// });

process.exit(0);

const anonymousFunc = function () {
  console.log("Anonymous Function says hi");
  throw new Error("something went wrong!");
};

greetMe("Jacqueline");
greetMeArr("Eva");
anonymousFunc();
