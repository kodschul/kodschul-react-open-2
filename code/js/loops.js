let cars = ["bmw", "benz", "vw"];

for (const index in cars) {
  console.log(cars[index]);
}

let z = 10;
for (const car of cars) {
  console.log(car);
  z = 11;
}

cars.forEach(async (car) => {
  await console.log(car);
});
console.log(z);

let i = 10;
while (i < 5) {
  console.log("Iteration " + i);
  i++;
}

let x = 10;
do {
  console.log("Iteration " + x);
  x++;
} while (x < 5);

for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    console.log(i + " ist eine gerade Zahl.");
  } else {
    console.log(i + " ist eine ungerade Zahl.");
  }
}
