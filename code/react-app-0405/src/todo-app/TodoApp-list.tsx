import React, { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState(["Coden", "Lernen", "Schreiben"]);
  const [draftTodo, setDraftTodo] = useState("");

  const addTodo = () => {
    setTodos([...todos, draftTodo]);
    setDraftTodo("");
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div> You are typing: {draftTodo}</div>
      <input
        value={draftTodo}
        onChange={(e) => setDraftTodo(e.target.value)}
        type="text"
      />
      <button onClick={addTodo}>Add</button>

      <h2>Tasks</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
