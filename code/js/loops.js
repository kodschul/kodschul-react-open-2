let cars = ["bmw", "benz", "vw"];

let carsObjs = [
  { name: "bmw", year: 2010 },
  { name: "benz", year: 2015 },
  { name: "vw", year: 2020 },
];

for (const index in cars) {
  cars[index] = cars[index].toUpperCase();
}
console.log(cars);

let z = 10;
for (const car of cars) {
  car.name = car.toUpperCase();

  // console.log(car.name, car.year);
  z = 11;
}
console.log(carsObjs);

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
