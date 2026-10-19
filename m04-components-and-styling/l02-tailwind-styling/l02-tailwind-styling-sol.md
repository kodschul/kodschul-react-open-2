# Lab 4.2 – Lösung: Styling mit Tailwind CSS

## Aufgabe 1: Ausgangsaussehen

Blauer Hintergrund, weiße Schrift, Eingabefeld mit transparentem Hintergrund, drei Einträge, Durchstreichen per Klick.

## Aufgabe 2: Tailwind-Einrichtung finden

| Datei | Zeile |
| ----- | ----- |
| `vite.config.ts` | `import tailwindcss from "@tailwindcss/vite";` und `plugins: [react(), …, tailwindcss()]` |
| `src/index.css` | `@import "tailwindcss";` |

`src/main.tsx` importiert `./index.css` einmal für die ganze App.

## Aufgabe 3: Container

```tsx
<div className="flex min-h-screen flex-col items-center bg-blue-700 pt-12 text-white">
```

`flex flex-col items-center` ersetzt `display: flex; flexDirection: column; alignItems: center`, `min-h-screen` die Höhe, `pt-12` den `paddingTop` (12 × 0,25 rem = 3 rem).

## Aufgabe 4: Eingabefeld

```tsx
<input
  className="mt-8 rounded border-2 border-white bg-transparent px-3 py-2 text-2xl focus:border-yellow-300 focus:outline-none"
  type="text"
  value={todoText}
  onChange={(e) => setTodoText(e.target.value)}
  onKeyDown={handleKeyDown}
/>
```

`focus:` gilt nur, solange das Feld den Fokus hat. `focus:outline-none` entfernt den Standardrahmen des Browsers, die Rahmenfarbe bleibt als Fokusanzeige.

## Aufgabe 5: Einträge als Karte

```tsx
<div className="mt-8 w-80 space-y-2">
  {todos.map((todo) => (
    <TodoItem key={todo} text={todo} onRemove={handleRemove} />
  ))}
</div>
```

```tsx
// im TodoItem
<div
  className="cursor-pointer rounded-lg bg-white/10 px-4 py-3 text-2xl shadow transition-colors hover:bg-white/20"
  onClick={handleClick}
>
  {text}
</div>
```

`space-y-2` setzt den Abstand zwischen den Karten, `bg-white/10` ist Weiß mit 10 % Deckkraft, `hover:bg-white/20` hellt es beim Überfahren auf.

## Aufgabe 6: Dynamische Klasse

```tsx
<div
  className={`cursor-pointer rounded-lg bg-white/10 px-4 py-3 text-2xl shadow transition-colors hover:bg-white/20 ${
    isDone ? "line-through opacity-60" : ""
  }`}
  onClick={handleClick}
>
```

Beide Zweige des Ternary sind vollständige Klassennamen, Tailwind findet sie beim Scannen.

## Aufgabe 7: Responsive Überschrift

```tsx
<h1 className="text-2xl font-bold md:text-4xl">Todo App</h1>
```

Unter 48 rem Breite gilt `text-2xl`, ab `md` greift `md:text-4xl`.

## Aufgabe 8: Aufräumen

Das `styles`-Objekt samt `satisfies Record<string, CSSProperties>` löschen. Im Import von `react` entfällt der Typ `CSSProperties`. `grep -n "style=" src/playground/App.tsx` liefert danach keine Treffer.

Vollständige Datei:

```tsx
import { useState, type KeyboardEvent } from "react";

type TodoItemProps = {
  text: string;
  onRemove: (todo: string) => void;
};

const TodoItem = ({ text, onRemove }: TodoItemProps) => {
  const [isDone, setDone] = useState(false);

  const handleClick = () => {
    if (!isDone) {
      setDone(true);
    } else {
      onRemove(text);
    }
  };

  return (
    <div
      className={`cursor-pointer rounded-lg bg-white/10 px-4 py-3 text-2xl shadow transition-colors hover:bg-white/20 ${
        isDone ? "line-through opacity-60" : ""
      }`}
      onClick={handleClick}
    >
      {text}
    </div>
  );
};

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
      <h1 className="text-2xl font-bold md:text-4xl">Todo App</h1>
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
```

## Gültige Alternative

Das Karten-Styling lässt sich auch in `src/index.css` mit `@apply` bündeln. Für wenige Klassen bleibt der Utility-String direkt im JSX übersichtlicher; bei vielen identischen Stellen hilft eine eigene Komponente mehr als `@apply`.

Referenz-App: `src/examples/m04-components-and-styling/l02-tailwind-styling/index.tsx` (Komponente: `TodoItem.tsx`, Vergleich der Styling-Wege: `app-styling-ways.tsx`, Responsive: `app-responsive-grid.tsx`)
