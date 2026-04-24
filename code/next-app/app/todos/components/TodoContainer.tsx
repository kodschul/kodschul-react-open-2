"use client";

import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import axios from "axios";

const TodoContainer = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState(["essen", "trinken", "coden"]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      setTodos([todoText, ...todos]);
      setTodoText("");
    }
  };

  const fetchTodos = async () => {
    const res = await axios.get("/api/todos");
    const todoItems = res.data;

    setTodos(todoItems.map((todo) => todo.text));
  };
  const storeTodo = async () => {};
  const deleteTodo = async () => {};

  const removeTodo = (todo: string) => {
    setTodos(todos.filter((el) => el != todo));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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
