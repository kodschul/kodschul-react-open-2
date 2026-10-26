let cars = [
  { name: "bmw", year: 2010 },
  { name: "benz", year: 2015 },
  { name: "vw", year: 2020 },
];

async function fetchCar(car) {
  await new Promise((r) => setTimeout(r, 2000));
  return car;
}

async function fetchAllCars() {
  const allCars = await Promise.all(cars.map(fetchCar));

  console.log("ALL_CARS FETCHED ");
  console.log(allCars);
}

fetchAllCars();

// process.exit(0);
