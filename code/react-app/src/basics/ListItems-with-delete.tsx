import React, { useState } from "react";

const ListItems = () => {
  const items = ["Apple", "Orange", "Pineapple", "Banana", "Lemon"];

  const [state, setState] = useState<string[]>([]);

  const renderItem = (item: string) => {
    return (
      <li style={{ padding: 10, fontSize: 18, fontWeight: "600" }}>{item}</li>
    );
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        color: "white",
        background: "rgb(0, 0, 46)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>List Items</h1>

      {/* <ul>{items.map(renderItem)} </ul> */}

      <ul>
        {items.map((item, i) => (
          <li
            key={i.toString()}
            style={{ padding: 10, fontSize: 18, fontWeight: "600" }}
          >
            {item}

            <button onClick={() => null}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListItems;
