import { useState, type KeyboardEvent } from "react";
import TodoItem from "./TodoItem";

const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState(["essen", "trinken", "coden"]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTodos([todoText, ...todos]);
      setTodoText("");
    }
  };

  const handleRemove = (todo: string) => {
    setTodos(todos.filter((el) => el !== todo));
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-blue-700 pt-12 text-white">
      <h1 className="text-3xl font-bold">Todo App</h1>
      <input
        className="mt-8 rounded border-2 border-white bg-transparent px-3 py-2 text-2xl focus:border-yellow-300 focus:outline-none"
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="mt-8 w-80 space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo} text={todo} onRemove={handleRemove} />
        ))}
        {todos.length === 0 && <div className="text-center text-xl text-white/80">Alles erledigt</div>}
      </div>
    </div>
  );
};

export default App;
