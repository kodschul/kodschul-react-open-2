import { useState } from "react";

const TodoApp = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<string[]>(["Code", "Read"]);
  // logic

  //   const updateTodoText

  const clearInput = () => {
    setTodoText("");
  };

  const addTodo = () => {
    if (todoText == "") {
      return;
    }

    setTodos([...todos, todoText]);
    clearInput();
  };

  const deleteTodo = (todo) => {
    let newTodos = todos.filter((x) => x != todo);

    setTodos(newTodos);
  };

  const renderTodo = (todo) => (
    <div style={styles.todoItem}>
      <span style={{ flex: 1 }}>{todo}</span>
      <div onClick={() => deleteTodo(todo)} style={styles.deleteItemBtn}>
        x
      </div>
    </div>
  );

  let isLoading = false;
  if (isLoading) {
    return <div>Loading...</div>;
  }

  let isLoadingTodos = false;

  return (
    <div style={styles.main}>
      {1 + 1 == 2 ? (
        <>
          <h1>FormApp</h1>
          <input
            type="text"
            placeholder="Enter To-do"
            style={styles.input}
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />{" "}
          <p>You are typing: {todoText} </p>
          <hr />
          <button onClick={clearInput}>Clear input</button>
          <button onClick={addTodo}>Add</button>
          <hr />
          <hr />
          {isLoadingTodos ? "Loading todos..." : todos.map(renderTodo)}
        </>
      ) : null}
    </div>
  );
};

const styles: any = {
  main: {
    height: "100vh",
    width: "100vw",
    color: "white",
    background: "rgb(0, 0, 46)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  input: {
    fontSize: 24,
    background: "transparent",
    color: "white",
  },
  todoItem: {
    minWidth: 300,
    padding: 10,
    margin: 10,
    fontSize: 18,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "white",
    borderStyle: "solid",
    display: "flex",
    alignItems: "center",
  },
  deleteItemBtn: {
    cursor: "pointer",
    userSelect: "none",

    fontSize: 30,
    fontWeight: "500",
    padding: 5,
  },
};

export default TodoApp;
