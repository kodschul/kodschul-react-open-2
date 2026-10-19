import { useState } from "react";

// Eigener Hook: Name beginnt mit "use", innen laufen normale Hooks.
export const useTodos = (initialTodos: string[] = ["essen", "trinken", "coden"]) => {
  const [todos, setTodos] = useState<string[]>(initialTodos);

  // Doppelte Einträge werden ignoriert, damit der Text als key taugt.
  const addTodo = (text: string) =>
    setTodos((prev) => (prev.includes(text) ? prev : [text, ...prev]));
  const removeTodo = (todo: string) => setTodos((prev) => prev.filter((el) => el !== todo));
  const removeAll = () => setTodos([]);

  return { todos, addTodo, removeTodo, removeAll };
};
