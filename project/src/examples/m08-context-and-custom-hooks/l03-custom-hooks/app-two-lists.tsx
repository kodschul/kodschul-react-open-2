import { useTodos } from "./useTodos";

type TodoListProps = {
  title: string;
  initialTodos: string[];
};

// Jeder Aufruf von useTodos() erzeugt einen eigenen State: Die beiden Listen teilen nichts.
const TodoList = ({ title, initialTodos }: TodoListProps) => {
  const { todos, addTodo, removeTodo } = useTodos(initialTodos);

  return (
    <section className="rounded border p-4">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <button className="mb-2 rounded border px-2 py-1 text-sm" onClick={() => addTodo(`Neu ${todos.length + 1}`)}>
        Eintrag hinzufügen
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo} className="cursor-pointer hover:line-through" onClick={() => removeTodo(todo)}>
            {todo}
          </li>
        ))}
      </ul>
    </section>
  );
};

const App = () => {
  return (
    <main className="mx-auto grid max-w-2xl grid-cols-2 gap-4 p-8">
      <TodoList title="Liste A" initialTodos={["essen", "trinken"]} />
      <TodoList title="Liste B" initialTodos={["coden"]} />
    </main>
  );
};

export default App;
