# Lab 4.1 – Übung: Komponenten und Props – TodoItem auslagern

**Dauer:** ca. 30 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`, `src/playground/TodoItem.tsx`
**Starter:** `src/starters/m04-l01-todo-app.tsx`

## Vorbereitung

- `npm run dev` läuft in `output/project/`, die React Developer Tools sind im Browser installiert.
- Kopiere `src/starters/m04-l01-todo-app.tsx` nach `src/playground/App.tsx`. Der Starter ist die Todo-App aus Lab 2.4 in einer einzigen Komponente.

## Aufgaben

1. Öffne `/playground` und prüfe, dass Hinzufügen per Enter und Entfernen per Klick funktionieren.
2. Lege `src/playground/TodoItem.tsx` an. Verschiebe die Darstellung eines einzelnen Eintrags dorthin und gib die Komponente per `export default` frei. Beschreibe die Props mit einem Typ `TodoItemProps` (zunächst nur `text`).
3. Binde `TodoItem` in `src/playground/App.tsx` per `import` ein und ersetze das bisherige `<div>` im `map` durch die Komponente. Das `key` bleibt im `map`.
4. Ergänze in `TodoItemProps` die Callback-Prop `onRemove` (Funktion mit einem String-Parameter, ohne Rückgabewert). Übergib aus der App die vorhandene Funktion `handleRemove`.
5. Ergänze in `TodoItem` einen lokalen State `isDone`. Der erste Klick streicht den Text durch (`textDecoration`), der zweite Klick ruft `onRemove` mit dem Text auf. Benenne die Klick-Funktion nach der `handle…`-Konvention.
6. Öffne die React Developer Tools, Reiter „Components“. Wähle ein `TodoItem` und lies dessen Props und den Hook-Eintrag für `isDone`. Schalte `isDone` im Panel um und beobachte das Durchstreichen.
7. Entferne probehalber `onRemove` im JSX von `App.tsx` und lies die TypeScript-Meldung im Editor. Stelle die Zeile danach wieder her.

## Checkpoint

- Nach Aufgabe 3 sieht die App wie vorher aus, die Items kommen aus `TodoItem.tsx`.
- Der erste Klick streicht einen Eintrag durch, der zweite entfernt ihn aus der Liste.
- Zwei Einträge haben getrennten Zustand: Das Durchstreichen eines Eintrags verändert den anderen nicht.
- Die DevTools zeigen `App` und darunter mehrere `TodoItem` mit den Props `text` und `onRemove`.
- TypeScript meldet das fehlende Pflicht-Prop `onRemove`.

## Abschlusskriterien

- `TodoItem` liegt in einer eigenen Datei und hat einen benannten Props-Typ.
- Die Liste und `handleRemove` bleiben in `App`, `isDone` liegt im Item.
- `npm run lint` und `npx tsc -p tsconfig.app.json --noEmit` melden für die Dateien keine Fehler.

## Erweiterung

Optional: Lege `src/playground/UserCard.tsx` an. Eine `UserCard` zeigt Name und Rolle eines Benutzers und bekommt ein Objekt `user` als Prop. Rendere in einer eigenen App eine Liste aus einem Array mit drei Benutzerobjekten.
