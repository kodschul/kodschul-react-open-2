"use client";

import React, { useEffect, useState } from "react";

import TodoItem from "@/app/todos/components/TodoItem";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/app/state/rtlk/state/store";
import {
  addTodo,
  removeTodo,
  setDraftText,
} from "@/app/state/rtlk/state/todosSlice";

const TodoCounter = () => {
  const count = useSelector((state) => state.todos.items.length);

  console.log("RE_RENDER_TodoCounter");
  return <div>{count} Todos</div>;
};

const TodoContainer = () => {
  const { items: todos, todoText } = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      dispatch(addTodo());
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
          onChange={(e) => dispatch(setDraftText(e.target.value))}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div style={{ marginTop: 30 }}>
        {todos.map((todo, i) => (
          <TodoItem
            key={todo + i}
            text={todo}
            onRemove={() => dispatch(removeTodo(todo))}
          />
        ))}
      </div>
    </div>
  );
};

export default function AppContainerWithRedux() {
  return (
    <>
      <Provider store={store}>
        <TodoContainer />
      </Provider>
    </>
  );
}
