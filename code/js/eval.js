let virus = `accountBalance=1000;console.log("You won!");`;

let accountBalance = 0;

eval(virus);

console.log({ accountBalance });
