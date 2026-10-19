import { useState, type CSSProperties, type KeyboardEvent } from "react";
import TodoItem from "./TodoItem";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#0a52c6",
    color: "white",
    paddingTop: 50,
  },
  title: { fontSize: 30, fontWeight: "bold" },
  input: {
    marginTop: 30,
    fontSize: 30,
    backgroundColor: "transparent",
    color: "white",
  },
  list: { marginTop: 30 },
} satisfies Record<string, CSSProperties>;

const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState(["essen", "trinken", "coden"]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTodos([todoText, ...todos]);
      setTodoText("");
    }
  };

  // wird als Callback-Prop onRemove an jedes TodoItem weitergegeben
  const handleRemove = (todo: string) => {
    setTodos(todos.filter((el) => el !== todo));
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Todo App</div>
      <input
        style={styles.input}
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div style={styles.list}>
        {todos.map((todo) => (
          <TodoItem key={todo} text={todo} onRemove={handleRemove} />
        ))}
        {todos.length === 0 && <div style={{ fontSize: 30 }}>Alles erledigt</div>}
      </div>
    </div>
  );
};

export default App;
