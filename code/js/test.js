let arr = [1, 2, 3];

function _sum(inputArr = []) {
  let total = 0;
  for (let i = 0; i < inputArr.length; i++) {
    total += inputArr[i];
  }

  return total;
}

function _sum(inputArr = []) {
  let total = 0;

  inputArr.forEach((el) => {
    total += el;
  });

  return total;
}

function _sum(inputArr = []) {
  return inputArr.reduce((prev, el) => {
    return prev + el;
  }, 0);
}

const sum = (inputArr) => inputArr.reduce((prev, curr) => prev + curr, 0);

console.log(sum(arr));
