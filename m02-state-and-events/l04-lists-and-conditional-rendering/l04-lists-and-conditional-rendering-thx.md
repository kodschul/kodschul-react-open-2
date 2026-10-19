# Lab 2.4: Listen und bedingte Anzeige – Todo-App

**Leitfragen:**

<details>
<summary>Warum funktioniert <code>todos.push(text)</code> nicht?</summary>

`push` verändert das bestehende Array, die Referenz bleibt gleich. React vergleicht beim Setter nur die Referenz, sieht keine Änderung und rendert nicht neu. Ein neues Array (`[text, ...todos]`) löst das Rendern aus.

</details>

<details>
<summary>Welche Warnung zeigt die Konsole ohne <code>key</code>?</summary>

`Each child in a list should have a unique "key" prop.` React braucht den `key`, um Einträge bei Änderungen der Liste eindeutig zuzuordnen.

</details>

<details>
<summary>Wie zeigt man etwas nur unter einer Bedingung an?</summary>

Mit `&&` (`{todos.length === 0 && <p>…</p>}`) oder mit dem Ternary (`{bedingung ? <A /> : <B />}`) direkt im JSX. Alternativ entscheidet ein `if` vor dem `return`.

</details>

- `map` macht aus einem Array eine Liste von JSX-Elementen; jedes braucht einen eindeutigen `key`.
- State wird nie verändert, sondern durch ein neues Array oder Objekt ersetzt (Immutability).

## Listen mit map und key

`map` (Lab 1.2) liefert hier ein Array aus JSX-Elementen, das React nebeneinander anzeigt.

```tsx
const todos = ["essen", "trinken", "coden"];

<ul>
  {todos.map((todo) => (
    <li key={todo}>{todo}</li>  // key: eindeutig unter Geschwistern
  ))}
</ul>
```

Ohne `key` meldet die Konsole `Each child in a list should have a unique "key" prop.` (Beispiel: `src/examples/m02-state-and-events/l04-lists-and-conditional-rendering/app-without-key.tsx`).

| Regel für `key` | Begründung |
| --- | --- |
| eindeutig unter den Geschwistern | React ordnet Einträge über den `key` zu |
| stabil: gleicher Eintrag, gleicher `key` | sonst gehen State und DOM-Zustand verloren |
| keine Zufallswerte beim Rendern (`Math.random()`) | jeder Render erzeugt neue Einträge |
| Index nur bei Listen, die sich nie ändern | Einfügen und Entfernen verschiebt die Indizes |
| Text als `key` nur, wenn Texte eindeutig sind | doppelte Texte erzeugen doppelte Keys |

Wenn Einträge doppelt vorkommen dürfen, bekommen sie eine eigene `id` (Beispiel: `app-with-ids.tsx` im selben Ordner, `crypto.randomUUID()` beim Anlegen).

## Immutability: neue Arrays statt Änderungen

Immutability heißt: Daten werden nach dem Anlegen nicht verändert, Änderungen erzeugen Kopien. React vergleicht alten und neuen State per Referenz (`Object.is`). Gleiche Referenz bedeutet für React: nichts geändert.

```tsx
const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    todos.push(todoText); // Mutation: gleiche Referenz, React sieht keine Änderung
    setTodos(todos);      // kein Rendern, die Liste bleibt unverändert
  }
};
```

Die Beispiel-App dazu: `src/examples/m02-state-and-events/l04-lists-and-conditional-rendering/app-push-mutation.tsx`.

| Vorteil von Immutability | Bedeutung |
| --- | --- |
| Keine unerwarteten Seiteneffekte | andere Stellen mit derselben Liste ändern sich nicht heimlich |
| Nachvollziehbarkeit | jede Änderung ist ein expliziter Setter-Aufruf |
| Effiziente Änderungserkennung | Referenzvergleich statt Vergleich jedes einzelnen Elements |

| Statt (verändert das Original) | Besser (neue Kopie) |
| --- | --- |
| `todos.push(x)` | `setTodos([...todos, x])` |
| `todos.unshift(x)` | `setTodos([x, ...todos])` |
| `todos.splice(i, 1)` | `setTodos(todos.filter((t) => t !== todo))` |
| `todos[i] = x` | `setTodos(todos.map((t, j) => (j === i ? x : t)))` |
| `todos.sort()` | `setTodos([...todos].sort())` |
| `user.name = "Neu"` | `setUser({ ...user, name: "Neu" })` |
| `Object.assign(user, {…})` | `setUser(Object.assign({}, user, {…}))` oder `{ ...user, … }` |

Spread ist die übliche Schreibweise; `Object.assign` steht in älterem Code. Bibliotheken wie Immer oder Immutable.js vereinfachen verschachtelte Änderungen, werden im Kurs aber nicht benötigt.

> **Merksatz:** State nie ändern, immer ersetzen: neues Array oder Objekt, dann den Setter aufrufen.

## Daten an Handler übergeben

Ein Handler bekommt vom Event nur das Event-Objekt. Weitere Daten, etwa der angeklickte Eintrag, übergibt eine Arrow Function.

```tsx
const removeTodo = (todo: string) => {
  setTodos(todos.filter((el) => el !== todo));
};

{todos.map((todo) => (
  <li key={todo}>
    <button onClick={() => removeTodo(todo)}>{todo}</button>
  </li>
))}
```

| Schreibweise | Wirkung |
| --- | --- |
| `onClick={() => removeTodo(todo)}` | Aufruf beim Klick, mit dem Eintrag als Argument |
| `onClick={removeTodo(todo)}` | Fehler: Aufruf schon beim Rendern, das Ergebnis wird Handler |
| `onClick={removeTodo}` | `removeTodo` bekommt das Event-Objekt statt des Eintrags |

## Enter erkennen mit onKeyDown

`onKeyDown` liefert ein Event-Objekt mit der gedrückten Taste in `e.key`. Der Typ `KeyboardEvent<HTMLInputElement>` kommt aus `react`.

```tsx
import { useState, type KeyboardEvent } from "react";

const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    setTodos([todoText, ...todos]); // neues Array: neuer Eintrag steht vorne
    setTodoText("");                // Eingabefeld leeren
  }
};
```

## Bedingte Anzeige

Im JSX stehen nur Ausdrücke (Lab 1.3). Drei Wege decken fast alles ab.

| Muster | Beispiel | Einsatz |
| --- | --- | --- |
| `&&` | `{todos.length === 0 && <p>Alles erledigt</p>}` | etwas zeigen oder nichts |
| Ternary | `{todos.length === 0 ? <p>Alles erledigt</p> : <ul>…</ul>}` | zwischen zwei Varianten wählen |
| `if` vor dem `return` | `if (loading) return <p>Lädt …</p>;` | ganze Komponente austauschen |

Falle bei `&&`: `false`, `null` und `undefined` rendern nichts, die Zahl `0` rendert „0“. Deshalb vergleichen: `{todos.length > 0 && <ul>…</ul>}` statt `{todos.length && <ul>…</ul>}`.

## Die Todo-App im Ganzen

```tsx
import { useState, type KeyboardEvent } from "react";

const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState(["essen", "trinken", "coden"]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTodos([todoText, ...todos]);
      setTodoText("");
    }
  };

  const removeTodo = (todo: string) => {
    setTodos(todos.filter((el) => el !== todo));
  };

  return (
    <main>
      <h1>Todo App</h1>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Eintrag + Enter"
      />
      {todos.length === 0 && <p>Alles erledigt</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo}>
            <button onClick={() => removeTodo(todo)}>{todo}</button>
          </li>
        ))}
      </ul>
    </main>
  );
};
```

Die App mit Layout steht in `src/examples/m02-state-and-events/l04-lists-and-conditional-rendering/index.tsx`.

| Funktion | Technik |
| --- | --- |
| Liste anzeigen | `todos.map` mit `key` |
| Eintrag hinzufügen | `onKeyDown`, `[todoText, ...todos]` |
| Eintrag entfernen | `() => removeTodo(todo)`, `filter` |
| Meldung bei leerer Liste | `todos.length === 0 && …` |
| Eingabefeld | Controlled Input (Lab 2.3) |

Grenze: Bei doppelten Texten entfernt `filter` alle gleichen Einträge, und doppelte `key`-Werte erzeugen eine Warnung. Eine eigene `id` je Eintrag löst beides.

## Fazit

- `map` rendert Listen, `key` identifiziert die Einträge eindeutig und stabil.
- Immutability: neue Arrays und Objekte per Spread, `filter` und `map`; `push` und Zuweisungen am State führen zu keinem Rendern.
- `() => removeTodo(todo)` übergibt Daten an Handler; `onClick={removeTodo(todo)}` ruft zu früh auf.
- Bedingte Anzeige mit `&&`, Ternary oder `if` vor dem `return`.

Die Übung baut die Todo-App mit Hinzufügen, Entfernen und der Meldung „Alles erledigt“.
