# Lab 4.1 – Lösung: Komponenten und Props – TodoItem auslagern

## Aufgabe 1: Ausgangsstand prüfen

Der Starter zeigt „Todo App“, ein Eingabefeld und drei Einträge (essen, trinken, coden). Enter fügt oben einen Eintrag ein, ein Klick entfernt ihn.

## Aufgabe 2: TodoItem.tsx anlegen

```tsx
// src/playground/TodoItem.tsx
type TodoItemProps = {
  text: string;
};

const TodoItem = ({ text }: TodoItemProps) => {
  return <div style={{ fontSize: 30, marginTop: 10, cursor: "pointer" }}>{text}</div>;
};

export default TodoItem;
```

Der Typ `TodoItemProps` benennt, was die Komponente erwartet. Das Destructuring im Parameter hält den Code kurz.

## Aufgabe 3: Einbinden in App.tsx

```tsx
import TodoItem from "./TodoItem";

{todos.map((todo) => (
  <TodoItem key={todo} text={todo} />
))}
```

Das `key` bleibt am `<TodoItem>` im `map`, weil React es dort zum Zuordnen der Listeneinträge braucht. Der Eintrag `item` im `styles`-Objekt der App ist danach ungenutzt und kann entfernt werden.

## Aufgabe 4: Callback-Prop onRemove

```tsx
// TodoItem.tsx
type TodoItemProps = {
  text: string;
  onRemove: (todo: string) => void;
};

// App.tsx
<TodoItem key={todo} text={todo} onRemove={handleRemove} />
```

`handleRemove` hat die Signatur `(todo: string) => void` und passt damit zum Typ.

## Aufgabe 5: Lokaler State und Klick-Logik

```tsx
// src/playground/TodoItem.tsx
import { useState } from "react";

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
      style={{
        fontSize: 30,
        marginTop: 10,
        cursor: "pointer",
        textDecoration: isDone ? "line-through" : "none",
      }}
      onClick={handleClick}
    >
      {text}
    </div>
  );
};

export default TodoItem;
```

`isDone` gehört nur diesem Item, deshalb liegt es als State im Item. Die Liste ändert nur die App, deshalb geht das Entfernen per `onRemove` nach oben.

## Aufgabe 6: React Developer Tools

- Reiter „Components“: Baum `App` → mehrere `TodoItem`.
- Rechts bei `TodoItem`: Props `text` und `onRemove` (Funktion), darunter die Hooks mit `State: false/true` für `isDone`.
- Ein Umschalten von `isDone` im Panel streicht den Eintrag sofort durch; der Wert ist derselbe State wie beim Klick.

## Aufgabe 7: Fehlendes Pflicht-Prop

Ohne `onRemove` meldet TypeScript: „Property 'onRemove' is missing in type '{ text: string; }' but required in type 'TodoItemProps'“. Der Fehler erscheint im Editor, bevor die App im Browser geladen wird.

## Erweiterung: UserCard

```tsx
// src/playground/UserCard.tsx
type User = { id: number; name: string; role: string };

type UserCardProps = { user: User };

const UserCard = ({ user }: UserCardProps) => (
  <div style={{ padding: 16, marginTop: 12, border: "2px solid white", borderRadius: 8, width: 260 }}>
    <div style={{ fontSize: 22, fontWeight: "bold" }}>{user.name}</div>
    <div>{user.role}</div>
  </div>
);

export type { User };
export default UserCard;
```

```tsx
// Verwendung
import UserCard, { type User } from "./UserCard";

const users: User[] = [
  { id: 1, name: "Rick Sanchez", role: "Wissenschaftler" },
  { id: 2, name: "Morty Smith", role: "Schüler" },
  { id: 3, name: "Summer Smith", role: "Schülerin" },
];

{users.map((user) => <UserCard key={user.id} user={user} />)}
```

Die `id` des Objekts dient als `key`: Die ID ist eindeutig und ändert sich nie.

## Gültige Alternative

Statt Destructuring im Parameter geht `const TodoItem = (props: TodoItemProps) => …` mit `props.text` und `props.onRemove` – so steht es in älteren Beispielen. Beide Varianten verhalten sich gleich.

Referenz-App: `src/examples/m04-components-and-styling/l01-components-and-props/index.tsx` (Komponente: `TodoItem.tsx`, Erweiterung: `app-user-cards.tsx`, `ref` als Prop: `app-ref-as-prop.tsx`)
