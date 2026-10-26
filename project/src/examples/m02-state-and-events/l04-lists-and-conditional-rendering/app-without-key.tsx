import { useEffect, useRef, useState, type CSSProperties } from "react";

// Fehlerbild: map ohne key. Die Konsole warnt: Each child in a list should have a unique "key" prop.
const App = () => {
  const [todos, setTodos] = useState(["essen", "trinken", "coden"]);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus?.();
  }, []);

  useEffect(() => {
    if (todos.length > 4) {
      setTodos([]);
    }
  }, [todos]);

  const isInputEmpty = inputValue?.trim?.()?.length < 1;
  const addNewItem = () => {
    if (isInputEmpty) {
      return;
    }

    setTodos([...todos, inputValue.trim()]);
    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNewItem();
    }
  };

  const removeTodo = (todoText: string, todoIndex: number) => {
    setTodos(todos.filter((x, i) => !(todoIndex == i && todoText == x)));
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Todo App (ohne key)</h1>
      <input
        ref={inputRef}
        placeholder="Value"
        type="text"
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button disabled={isInputEmpty} onClick={addNewItem}>
        Add new item
      </button>
      <ul style={styles.list}>
        {todos.map((todo, i) => (
          <li
            onClick={() => removeTodo(todo, i)}
            style={{
              backgroundColor: "white",
              color: "black",
              margin: 10,
              padding: 10,
            }}
          >
            {todo}
          </li>
        ))}
      </ul>
    </main>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    padding: 32,
    minHeight: "100vh",
    boxSizing: "border-box",
    backgroundColor: "#0a52c6",
    color: "white",
  },
  title: { fontSize: 30, margin: 0 },
  list: { listStyle: "none", padding: 0, margin: 0, fontSize: 24 },
} satisfies Record<string, CSSProperties>;

export default App;
