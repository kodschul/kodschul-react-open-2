# Lab 4.1: Komponenten und Props – TodoItem auslagern

**Leitfragen:**

<details>
<summary>Wo soll die Liste leben: in der App oder im Item?</summary>

In der App. Die App besitzt die Daten und muss Einträge hinzufügen und entfernen. Das Item kennt nur seinen eigenen Text und seinen lokalen Zustand `isDone`.

</details>

<details>
<summary>Wie sagt ein Kind dem Elternteil, dass etwas passiert ist?</summary>

Über eine Callback-Prop, z. B. `onRemove`. Das Elternteil übergibt eine Funktion, das Kind ruft sie auf.

</details>

<details>
<summary>Wann lohnt sich eine eigene Komponente?</summary>

Wenn ein Teil wiederholt vorkommt, eigenen State oder eigene Logik hat oder die Datei unübersichtlich wird.

</details>

- Eine Komponente ist eine Funktion mit großem Anfangsbuchstaben, die JSX zurückgibt; Props sind ihre Parameter.
- Daten fließen als Props nach unten, Ereignisse als Callback-Props nach oben.

## Komponente auslagern und einbinden

Die Todo-App aus Lab 2.4 hat die Item-Darstellung noch inline. Ausgelagert entsteht eine eigene Datei, die per `import` eingebunden wird (`src/examples/m04-components-and-styling/l01-components-and-props/`):

```tsx
// TodoItem.tsx
const TodoItem = ({ text }: { text: string }) => {
  return <div style={{ fontSize: 30, marginTop: 10 }}>{text}</div>;
};

export default TodoItem;
```

```tsx
// index.tsx – Verwendung
import TodoItem from "./TodoItem";

{todos.map((todo) => (
  <TodoItem key={todo} text={todo} onRemove={handleRemove} />
))}
```

- Komponentennamen beginnen mit einem Großbuchstaben. `<todoItem />` würde als HTML-Element behandelt.
- `key` bleibt an der Stelle im `map`, wo die Komponente verwendet wird. Es erscheint nicht in den Props der Komponente.

## Props mit TypeScript-Typ

Props sind das Argument der Komponente, ein Objekt mit den Attributen aus dem JSX. Ein `type` beschreibt sie:

```tsx
type TodoItemProps = {
  text: string;                       // Pflicht
  onRemove: (todo: string) => void;   // Callback: Funktion mit einem String-Parameter
  priority?: number;                  // optional
};

// Destructuring im Parameter; Standardwerte stehen hier
const TodoItem = ({ text, onRemove, priority = 0 }: TodoItemProps) => { /* … */ };
```

TypeScript meldet fehlende Pflicht-Props, falsche Typen und Tippfehler bereits im Editor.

| | Props | State |
| --- | ----- | ----- |
| Woher? | vom Elternteil übergeben | von der Komponente selbst verwaltet (`useState`) |
| Änderbar? | nein, nur lesbar | ja, über den Setter |
| Änderung löst Re-Render aus? | ja, wenn das Elternteil neue Werte übergibt | ja |
| Beispiel | `text`, `onRemove` | `isDone` im `TodoItem`, `todos` in der App |

## Callback-Props und Namenskonvention

Das Kind darf die Liste nicht ändern, sie gehört dem Elternteil. Es meldet das Ereignis über eine Funktion, die als Prop kommt:

```tsx
// Kind: erster Klick streicht durch, zweiter Klick meldet "entfernen"
const TodoItem = ({ text, onRemove }: TodoItemProps) => {
  const [isDone, setDone] = useState(false); // lokaler State des Items

  const handleClick = () => {
    if (!isDone) {
      setDone(true);
    } else {
      onRemove(text); // Ereignis nach oben
    }
  };

  return (
    <div
      style={{ fontSize: 30, marginTop: 10, textDecoration: isDone ? "line-through" : "none" }}
      onClick={handleClick}
    >
      {text}
    </div>
  );
};
```

```tsx
// Elternteil: besitzt die Liste und bekommt das Ereignis
const handleRemove = (todo: string) => {
  setTodos(todos.filter((el) => el !== todo));
};
```

| Rolle | Präfix | Beispiel |
| ----- | ------ | -------- |
| Prop, die eine Funktion erwartet (Schnittstelle der Komponente) | `on` | `onRemove`, `onChange`, `onSelect` |
| Funktion, die ein Ereignis behandelt (Implementierung) | `handle` | `handleClick`, `handleRemove`, `handleKeyDown` |

Üblich ist die Kombination: `<TodoItem onRemove={handleRemove} />`.

## Datenfluss: Daten nach unten, Ereignisse nach oben

```mermaid
flowchart TD
  A["App (State: todos)"] -->|Props: text, onRemove| B["TodoItem (State: isDone)"]
  B -->|Aufruf: onRemove(text)| A
```

- Der State `todos` lebt in der App, `isDone` im jeweiligen Item. Jedes Item hat seinen eigenen `isDone`-Zustand.
- Props fließen nur in eine Richtung (Elternteil → Kind). Das Kind verändert sie nie, sondern meldet Wünsche per Callback.
- `key={todo}` setzt eindeutige Texte voraus. Gleiche Texte würden sich den State teilen; in echten Projekten ist eine ID üblich (`key={todo.id}`).

## Objekte als Props: Liste von Komponenten

Props können beliebige Werte sein: Zahlen, Objekte, Funktionen. `app-user-cards.tsx` übergibt ein Objekt pro Karte:

```tsx
type User = { id: number; name: string; role: string };

const UserCard = ({ user }: { user: User }) => (
  <div>
    <div>{user.name}</div>
    <div>{user.role}</div>
  </div>
);

{users.map((user) => <UserCard key={user.id} user={user} />)}
```

## `ref` als Prop in React 19

Seit React 19 ist `ref` ein normales Prop von Funktionskomponenten. `forwardRef` ist nicht mehr nötig und taucht nur noch in älterem Code auf (`app-ref-as-prop.tsx`):

```tsx
type FancyInputProps = {
  placeholder: string;
  ref?: Ref<HTMLInputElement>; // type Ref aus "react"
};

const FancyInput = ({ placeholder, ref }: FancyInputProps) => (
  <input ref={ref} placeholder={placeholder} />
);

// Elternteil: <FancyInput ref={inputRef} placeholder="…" />
```

## Komponenten in den React Developer Tools

Die Browser-Erweiterung React Developer Tools (Chrome, Firefox, Edge; kostenlos im Erweiterungsstore) fügt den Reiter „Components“ hinzu.

| Funktion | Nutzen |
| -------- | ------ |
| Komponentenbaum | zeigt `App > TodoItem` und die Verschachtelung |
| Auswahl einer Komponente | rechts erscheinen Props und Hooks (State, Refs) mit ihren aktuellen Werten |
| Werte bearbeiten | State oder Props im Panel ändern und die Wirkung sofort sehen |
| Suchfeld | Komponente nach Namen finden |

> **Merksatz:** Props fließen nach unten, Callbacks nach oben. State lebt dort, wo ihn alle Nutzer erreichen.

## Fazit

- Eine Komponente pro Datei, Name mit Großbuchstaben, Import per `import … from`.
- Props sind lesbar und typisiert; Ereignisse nach oben laufen über Callback-Props (`onXyz`, Implementierung `handleXyz`).
- Die React Developer Tools zeigen Komponentenbaum, Props und State zur Laufzeit.

In der Übung wird `TodoItem` aus der Todo-App ausgelagert und mit Callback und lokalem State versehen.
