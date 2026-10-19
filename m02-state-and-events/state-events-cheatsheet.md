# State-und-Events-Cheatsheet

Schnellreferenz für Modul 2 (Events, `useState`, Controlled Inputs, Listen).

## Event-Handler

| Syntax | Wirkung |
| --- | --- |
| `onClick={handleClick}` | ruft `handleClick` beim Klick auf |
| `onClick={() => handleAdd(5)}` | übergibt Daten an den Handler (Aufruf erst beim Klick) |
| `onClick={handleClick()}` | Fehler: Aufruf schon beim Rendern |
| `onChange={(e) => …}` | läuft bei jeder Änderung eines Eingabefelds |
| `onKeyDown={handleKeyDown}` | läuft bei jedem Tastendruck |
| `onSubmit={handleSubmit}` | läuft beim Abschicken eines Formulars |
| `e.preventDefault()` | verhindert das Standardverhalten (z. B. Neuladen beim Absenden) |
| `e.target.value` | aktueller Text des Eingabefelds (immer ein `string`) |
| `e.key === "Enter"` | prüft die gedrückte Taste |
| `handleXyz` / `onXyz` | Namenskonvention: Handler-Funktion / Callback-Prop |

## useState

| Syntax | Wirkung |
| --- | --- |
| `import { useState } from "react";` | Hook importieren |
| `const [count, setCount] = useState(100);` | State mit Startwert; `count` lesen, `setCount` zum Ändern |
| `setCount(count + 1)` | neuen Wert speichern, löst neues Rendern aus |
| `count = count + 1` | Fehler: `count` ist `const`, kein Rendern |
| `useState("")`, `useState(false)` | State vom Typ `string`, `boolean` |
| `useState<string[]>([])` | State mit explizitem Typ |
| `console.warn("UP", count)` im Handler | zeigt den Wert des aktuellen Renders (Schnappschuss) |

## Regeln der Hooks

| Regel | Wirkung |
| --- | --- |
| Hooks nur oben in der Komponente aufrufen | gleiche Reihenfolge bei jedem Render |
| keine Hooks in `if`, Schleifen oder verschachtelten Funktionen | verhindert falsche Zuordnung des States |
| Hooks nur in Funktionskomponenten und eigenen Hooks | React kennt nur dort den State |
| `react-hooks/rules-of-hooks` | Linter-Regel für diese Regeln |
| `react-hooks/immutability` | Linter-Regel: keine Variablenzuweisung nach dem Rendern |

## Controlled Input

| Syntax | Wirkung |
| --- | --- |
| `<input value={text} onChange={(e) => setText(e.target.value)} />` | Feld zeigt den State, Änderungen gehen in den State |
| `<input value={text} />` | Fehler: schreibgeschütztes Feld, Warnung in der Konsole |
| `<input defaultValue="Start" />` | Uncontrolled: DOM verwaltet den Wert |
| `setText("")` | Feld leeren |
| `<p>Text: {text}</p>` | State direkt unter dem Feld anzeigen |
| `const isTooLong = text.length > 10;` | Prüfung aus dem State ableiten, ohne eigenen State |
| `ChangeEvent<HTMLInputElement>` | Typ für das Change-Event (Import: `import type { ChangeEvent } from "react"`) |
| `KeyboardEvent<HTMLInputElement>` | Typ für Tastatur-Events |

## Listen und Immutability

| Syntax | Wirkung |
| --- | --- |
| `{todos.map((todo) => <li key={todo}>{todo}</li>)}` | Liste rendern, `key` eindeutig und stabil |
| `setTodos([text, ...todos])` | Eintrag oben einfügen (neues Array) |
| `setTodos([...todos, text])` | Eintrag unten anfügen |
| `setTodos(todos.filter((t) => t !== todo))` | Eintrag entfernen |
| `setTodos(todos.map((t) => (t.id === id ? { ...t, done: true } : t)))` | einen Eintrag ändern, Rest unverändert |
| `setUser({ ...user, name: "Neu" })` | Objekt im State ändern (Kopie) |
| `todos.push(x); setTodos(todos);` | Fehler: gleiche Referenz, kein Rendern |
| `onClick={() => removeTodo(todo)}` | Eintrag an den Handler übergeben |
| `key={todo.id}` mit `id: crypto.randomUUID()` | eindeutiger `key` auch bei doppelten Texten |
| `Each child in a list should have a unique "key" prop.` | Warnung bei fehlendem `key` |

## Bedingte Anzeige

| Syntax | Wirkung |
| --- | --- |
| `{todos.length === 0 && <p>Alles erledigt</p>}` | zeigt das Element nur bei wahr |
| `{todos.length === 0 ? <p>Leer</p> : <ul>…</ul>}` | wählt zwischen zwei Varianten |
| `if (loading) return <p>Lädt …</p>;` | tauscht vor dem `return` die ganze Anzeige aus |
| `{todos.length && …}` | Falle: bei Länge `0` erscheint „0“ |

## React Developer Tools

| Aktion | Wirkung |
| --- | --- |
| Tab „Components“ öffnen | Komponentenbaum der Seite |
| Komponente wählen → „hooks“ | zeigt die State-Werte |
| State-Wert ändern + Enter | rendert die Komponente mit dem neuen Wert |
