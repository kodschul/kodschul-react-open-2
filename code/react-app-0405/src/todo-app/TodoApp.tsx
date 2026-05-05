import React, { useEffect, useRef, useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState(["Coden", "Lernen", "Schreiben"]);
  const [draftTodo, setDraftTodo] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus?.();
  }, []);

  const addTodo = () => {
    setTodos([...todos, draftTodo]);
    setDraftTodo("");
  };

  const addTodoOnEnter = (key: string) => {
    if (key == "Enter") {
      addTodo();
    }
  };

  const removeTodo = (todoToRemove: string) => {
    setTodos(todos.filter((todo) => todo != todoToRemove));
  };
  return (
    <div>
      <h1>Todo App</h1>
      <div> You are typing: {draftTodo}</div>
      <input
        ref={inputRef}
        value={draftTodo}
        onChange={(e) => setDraftTodo(e.target.value)}
        onKeyDown={(e) => addTodoOnEnter(e.key)}
        type="text"
      />
      <button onClick={addTodo}>Add</button>

      <h2>Tasks</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo}>
            {todo}
            <button onClick={() => removeTodo(todo)}>✅</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
