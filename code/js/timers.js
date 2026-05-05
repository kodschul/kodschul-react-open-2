let timerId;

let x = 1;

timerId = setInterval(() => {
  if (x == 5) {
    clearInterval(timerId);
  }

  x += 1;

  console.log("1 sec went by!");
}, 1000);

// setInterval(() => {
//   console.log("1 sec went by!");
// }, 1000);

// setTimeout(() => {
//   console.log("3 seconds went by!");
// }, 3000);
