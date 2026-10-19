# Lab 2.4 – Lösung: Todo-App

## Aufgabe 1: Starter kopieren

`src/playground/App.tsx` zeigt die feste Liste „essen“, „trinken“, „coden“ und enthält `TODO`-Kommentare für die folgenden Schritte.

## Aufgabe 2: State und Rendern aus dem State

```tsx
import { useState } from "react";

const initialTodos = ["essen", "trinken", "coden"];

const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState(initialTodos);

  // im JSX
  // <ul>
  //   {todos.map((todo) => (
  //     <li key={todo}>{todo}</li>
  //   ))}
  // </ul>
};
```

Begründung: Die Liste und der Text im Eingabefeld sind unabhängige Werte und brauchen zwei States.

## Aufgabe 3: Controlled Input

```tsx
<input
  type="text"
  value={todoText}
  onChange={(e) => setTodoText(e.target.value)}
  placeholder="Eintrag + Enter"
/>
```

## Aufgabe 4: Enter fügt oben ein

```tsx
import type { KeyboardEvent } from "react";

const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    setTodos([todoText, ...todos]); // neues Array, neuer Eintrag vorne
    setTodoText("");
  }
};

// am Eingabefeld: onKeyDown={handleKeyDown}
```

Begründung: Spread erzeugt ein neues Array; React erkennt die neue Referenz und rendert neu.

## Aufgabe 5: Eintrag per Klick entfernen

```tsx
const removeTodo = (todo: string) => {
  setTodos(todos.filter((el) => el !== todo));
};

// im JSX
<li key={todo}>
  <button onClick={() => removeTodo(todo)}>{todo}</button>
</li>
```

Begründung: Die Arrow Function `() => removeTodo(todo)` ruft den Handler erst beim Klick auf und übergibt den Eintrag. `filter` liefert ein neues Array ohne den Eintrag.

Gültige Alternative: `onClick` direkt auf dem `<li>`. Ein `<button>` ist per Tastatur bedienbar und für Screenreader erkennbar.

## Aufgabe 6: Meldung bei leerer Liste

```tsx
{todos.length === 0 && <p>Alles erledigt</p>}
```

Gültige Alternative mit Ternary:

```tsx
{todos.length === 0 ? <p>Alles erledigt</p> : <ul>{/* Einträge */}</ul>}
```

Mit `todos.length && …` würde bei leerer Liste die Zahl `0` erscheinen; deshalb der Vergleich `=== 0`.

## Aufgabe 7: push statt neues Array

```tsx
if (e.key === "Enter") {
  todos.push(todoText); // verändert das bestehende Array
  setTodos(todos);      // gleiche Referenz
  setTodoText("");
}
```

Ergebnis: Der neue Text erscheint nicht in der Liste. Das Array wurde zwar verändert, aber React erkennt am gleichen Array keine Änderung und überspringt das Neuzeichnen der Liste. Die Aufgabe-4-Variante mit `[todoText, ...todos]` stellt das Verhalten wieder her. Referenz: `src/examples/m02-state-and-events/l04-lists-and-conditional-rendering/app-push-mutation.tsx`.

## Aufgabe 8: key entfernen und doppelte Einträge

Ohne `key` meldet die Konsole:

```text
Each child in a list should have a unique "key" prop.
```

Bei zweimal demselben Text (mit `key={todo}`):

```text
Encountered two children with the same key, `essen`. Keys should be unique so that components maintain their identity across updates. …
```

Außerdem entfernt ein Klick beide gleichen Einträge, weil `filter` über den Text vergleicht. Lösung: Einträge als Objekte mit eigener `id` (`{ id: crypto.randomUUID(), text }`), `key={todo.id}` und `filter((todo) => todo.id !== id)`. Referenz: `src/examples/m02-state-and-events/l04-lists-and-conditional-rendering/app-with-ids.tsx`.

## Erweiterung: leere Eingaben ignorieren

```tsx
const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  const text = todoText.trim();
  if (e.key === "Enter" && text !== "") {
    setTodos([text, ...todos]);
    setTodoText("");
  }
};
```

`trim()` entfernt Leerzeichen am Rand, sodass auch reine Leerzeichen-Eingaben ignoriert werden. Referenz: `src/examples/m02-state-and-events/l04-lists-and-conditional-rendering/app-ignore-empty.tsx`.

Referenz-App: `src/examples/m02-state-and-events/l04-lists-and-conditional-rendering/index.tsx`
