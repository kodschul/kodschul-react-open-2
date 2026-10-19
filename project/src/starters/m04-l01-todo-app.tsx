import { useState, type CSSProperties, type KeyboardEvent } from "react";

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
  item: { fontSize: 30, marginTop: 10, cursor: "pointer" },
} satisfies Record<string, CSSProperties>;

// Todo-App aus Lab 2.4: Alles steckt noch in einer Komponente.
// TODO: Das einzelne Item als eigene Komponente in src/playground/TodoItem.tsx auslagern.
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
          <div key={todo} style={styles.item} onClick={() => handleRemove(todo)}>
            {todo}
          </div>
        ))}
        {todos.length === 0 && <div style={{ fontSize: 30 }}>Alles erledigt</div>}
      </div>
    </div>
  );
};

export default App;
