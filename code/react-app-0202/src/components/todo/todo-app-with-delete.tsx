import React, { useEffect, useState, useRef } from "react";

const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState(["essen", "trinken", "coden"]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      setTodos([todoText, ...todos]);
      setTodoText("");
    }
  };

  const removeTodo = (todo) => {
    setTodos(todos.filter((el) => el != todo));
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#0a52c6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
      }}
    >
      <div style={{ paddingTop: "5%" }}>
        <div style={{ fontSize: 30, fontWeight: "bold" }}>Todo App</div>
      </div>

      <div
        style={{
          paddingTop: "5%",
          display: "flex",
          alignItems: "center",
          fontSize: 100,
        }}
      >
        <input
          value={todoText}
          type="text"
          style={{
            fontSize: 30,
            backgroundColor: "transparent",
            color: "white",
          }}
          onChange={(e) => setTodoText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div style={{ marginTop: 30 }}>
        {todos.map((todo) => (
          <div
            style={{ fontSize: 30, fontWeight: "semibold", marginTop: 10 }}
            onClick={() => removeTodo(todo)}
          >
            {todo}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
