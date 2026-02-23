import React, { useState } from "react";
import useTodos from "./useTodos";

const App = () => {
  const [todoText, setTodoText] = useState("");
  const { todos, addTodo, removeTodo, removeAll } = useTodos();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      addTodo(todoText);
      setTodoText("");
    }
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

      <button onClick={removeAll}>Reset all</button>

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
