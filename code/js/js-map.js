let arr = [1, 2, 3, 4];
let arrWiithItems = [];

for (const item of arr) {
  arrWiithItems.push(`Item ${item}`);
}

let arrWithItems2 = arr.map((item) => `Item ${item}`);

// console.log(arr, arrWiithItems, arrWithItems2);

let unevenNumsArr = [];

for (const item of arr) {
  if (item % 2 != 0) {
    unevenNumsArr.push(item);
  }
}

let arr2 = arr.filter((item) => item % 2 == 0);
console.log(arr, unevenNumsArr, arr2);
