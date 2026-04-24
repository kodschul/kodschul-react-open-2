"use client";

import React, { useEffect, useReducer, useState } from "react";

import todoReducer, { todoActions, initialState } from "./todoReducer";
import TodoItem from "@/app/todos/components/TodoItem";

const TodoCounter = () => {
  const [{ todoText, todos }, dispatch] = useReducer(todoReducer, initialState);
  return <div>{todos.length} Todos</div>;
};

const TodoContainer = () => {
  const [{ todoText, todos }, dispatch] = useReducer(todoReducer, initialState);

  // const [todoText, setTodoText] = useState("");
  // const [todos, setTodos] = useState(["essen", "trinken", "coden"]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      dispatch(todoActions.addTodo());
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
      <div style={{ paddingTop: "5%" }}>
        <div style={{ fontSize: 30, fontWeight: "bold" }}>Todo App</div>
      </div>

      <TodoCounter />

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
          onChange={(e) => dispatch(todoActions.setTodoDraft(e.target.value))}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div style={{ marginTop: 30 }}>
        {todos.map((todo, i) => (
          <TodoItem
            key={todo + i}
            text={todo}
            onRemove={() => dispatch(todoActions.removeTodo(todo))}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoContainer;
