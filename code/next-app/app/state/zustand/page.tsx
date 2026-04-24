"use client";

import React, { useEffect, useState } from "react";

import useTodoStore from "./useTodoStore";
import TodoItem from "@/app/todos/components/TodoItem";

const TodoCounter = () => {
  const count = useTodoStore((state) => state.todos.length);

  console.log("RE_RENDER_TodoCounter");
  return <div>{count} Todos</div>;
};

const TodoContainer = () => {
  const { todoText, todos, addTodo, removeTodo, setTodoDraft } = useTodoStore();

  // const [todoText, setTodoText] = useState("");
  // const [todos, setTodos] = useState(["essen", "trinken", "coden"]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      addTodo();
      // setTodos([todoText, ...todos]);
      // setTodoText("");
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
      <TodoCounter />

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
          onChange={(e) => setTodoDraft(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div style={{ marginTop: 30 }}>
        {todos.map((todo, i) => (
          <TodoItem
            key={todo + i}
            text={todo}
            onRemove={() => removeTodo(todo)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoContainer;
