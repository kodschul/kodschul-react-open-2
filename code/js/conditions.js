let num = 7;

if (num == 3) {
  console.log("num = 3");
} else if (num == 4) {
  console.log("num = 4");
} else if (num == 5) {
  console.log("num = 5");
} else {
  console.log("num neither 3, 4 nor 5");
}

let output;

if (1 + 1 == 2) output = "ok";
else output = "nein";

console.log({ output });

console.log(1 + 1 == 2 ? "Ok" : "Nein");

process.exit(0);
// --
if (num == 5) {
  console.log("num is greater than 5");
} else {
  console.log("num is less than / equal  5");
}

// if (num > 0) {
//   console.log("Die Zahl ist positiv.");
// } else if (num === 0) {
//   console.log("Die Zahl ist null.");
// } else {
//   console.log("Die Zahl ist negativ.");
// }

console.log(false == 0);
console.log(true === false);
