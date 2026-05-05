import React, { useEffect, useLayoutEffect, useState } from "react";

function UseEffectApp() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    console.log("This should RUN ONLY ONCE!");
  }, []);

  useEffect(() => {
    console.log("Something changed!");
    // setCount2(count2 + 1);
  });

  useEffect(() => {
    console.log("Count2: Something changed!");
  }, [count2]);

  return (
    <div id="main-div" _style={{ backgroundColor: "red" }}>
      UseEffectApp
      <button onClick={() => setCount(count + 1)}>Click me: {count}</button>
      <button onClick={() => setCount2(count2 + 1)}>Click me2: {count2}</button>
    </div>
  );
}

export default UseEffectApp;
