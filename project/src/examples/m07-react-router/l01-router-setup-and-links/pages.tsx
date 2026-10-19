import { useEffect, useState } from "react";

// Kompakte Seiten für die Beispiele dieses Labs. In der Übung stehen hier die eigenen Tag-1-Apps.
export const HomePage = () => <h2 className="text-xl font-semibold">Startseite</h2>;

export const TodoPage = () => {
  const [todos, setTodos] = useState<string[]>(["Router lernen"]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, text.trim()]);
    setText("");
  };

  return (
    <section>
      <h2 className="mb-2 text-xl font-semibold">Todo</h2>
      <input
        className="mr-2 rounded border px-2 py-1"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button className="rounded bg-blue-600 px-3 py-1 text-white" onClick={addTodo}>
        Hinzufügen
      </button>
      <ul className="mt-2 list-disc pl-6">
        {todos.map((todo, index) => (
          <li key={`${todo}-${index}`}>{todo}</li>
        ))}
      </ul>
    </section>
  );
};

export const CountdownPage = () => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const id = setInterval(() => setSeconds((current) => Math.max(0, current - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section>
      <h2 className="mb-2 text-xl font-semibold">Countdown</h2>
      <p className="text-3xl">{seconds}</p>
    </section>
  );
};

export const CharactersPage = () => (
  <section>
    <h2 className="mb-2 text-xl font-semibold">Charaktere</h2>
    <ul className="list-disc pl-6">
      <li>Rick Sanchez</li>
      <li>Morty Smith</li>
      <li>Summer Smith</li>
    </ul>
  </section>
);
