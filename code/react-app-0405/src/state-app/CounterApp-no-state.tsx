function CounterApp() {
  console.log("FUNC WAS CALLED");
  let count = 10;

  const inc = () => {
    count++;
    console.log("INC", { count });
  };

  const dec = () => {
    count--;

    console.log("DEC", { count });
  };

  return (
    <div>
      <div>CounterApp</div>

      <button onClick={inc}>+</button>

      <div>Count: {count}</div>
      <button onClick={dec}>-</button>
    </div>
  );
}

export default CounterApp;
