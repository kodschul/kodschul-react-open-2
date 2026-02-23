import { useState } from "react";

const useTodos = (initialState = ["essen", "trinken", "coden"]) => {
  const [todos, setTodos] = useState(initialState);

  const addTodo = (todoText: string) => setTodos([todoText, ...todos]);
  const removeTodo = (todo: string) =>
    setTodos(todos.filter((el) => el != todo));
  const removeAll = () => setTodos([]);

  return { todos, addTodo, removeTodo, removeAll };
};

export default useTodos;
