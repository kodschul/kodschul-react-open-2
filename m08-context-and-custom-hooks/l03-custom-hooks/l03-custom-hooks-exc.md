# Lab 8.3 – Übung: Eigene Hooks: useTodos und useCountdown

**Dauer:** ca. 35 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`, `src/playground/useTodos.ts` (Erweiterung: `src/playground/useCountdown.ts`, `src/playground/useCounter.ts`)
**Starter:** `src/starters/m08-l03-todo-app.tsx` (Erweiterung: `src/starters/m08-l03-countdown-app.tsx`)

## Vorbereitung

- `npm run dev` läuft im Ordner `project/`.
- Kopiere `src/starters/m08-l03-todo-app.tsx` nach `src/playground/App.tsx` und öffne `http://localhost:5173/playground`.
- Die Todo-App funktioniert bereits: Enter fügt oben ein, Klick auf einen Eintrag entfernt ihn, „Alle löschen“ leert die Liste.

## Aufgaben

1. Lege `src/playground/useTodos.ts` an und exportiere eine Funktion `useTodos`.
2. Verschiebe den State `todos` samt Startliste in den Hook. Mache die Startliste zu einem optionalen Parameter.
3. Verschiebe `addTodo`, `removeTodo` und `removeAll` in den Hook. Nutze funktionale Updates (`prev`).
4. Gib `todos`, `addTodo`, `removeTodo` und `removeAll` als Objekt zurück.
5. Rufe in `App` `useTodos()` auf und entferne die verschobenen Zeilen. Prüfe, dass die App wie zuvor funktioniert.
6. Rendere im Playground zusätzlich eine zweite Komponente, die ebenfalls `useTodos()` aufruft. Prüfe, ob eine Änderung in der einen Liste die andere verändert, und notiere die Beobachtung als Kommentar.

## Checkpoint

- Die Todo-App verhält sich unverändert.
- `App` enthält weder `setTodos` noch `useState` für die Liste; `useTodos.ts` enthält kein JSX.
- Zwei Komponenten mit `useTodos()` zeigen zwei voneinander unabhängige Listen.

## Abschlusskriterien

- Der Hook heißt `useTodos` und gibt ein Objekt zurück.
- Die Komponente `App` enthält nur Darstellung und das Eingabefeld.
- Alle Parameter und Rückgabewerte sind typisiert.

## Erweiterung

Optional, in dieser Reihenfolge:

**A. `useCountdown({ interval })`**

1. Sichere die Lösung von oben unter anderem Namen und kopiere `src/starters/m08-l03-countdown-app.tsx` nach `src/playground/App.tsx`.
2. Lege `src/playground/useCountdown.ts` an. Der Parameter ist ein Objekt mit `interval` (Standard 1000 Millisekunden) und hat einen eigenen Typ.
3. Verschiebe die States, den Effekt mit Cleanup sowie `start` und `stop` in den Hook. Prüfe das Dependency-Array des Effekts auf Vollständigkeit.
4. Gib `secsLeft`, `isRunning`, `start(duration)` und `stop` zurück und nutze den Hook in `App`.
5. Setze `interval` testweise auf `200` und beobachte das schnellere Zählen.

**B. `useCounter(initialValue)`**

1. Lege `src/playground/useCounter.ts` an, mit `count`, `increment`, `decrement` und `reset`.
2. Baue damit den Counter aus Lab 2.2 neu (Startwert 100, Untergrenze 0).

## Checkpoint Erweiterung

- Der Countdown läuft mit `interval: 1000` im Sekundentakt und stoppt bei 0 (Hintergrund rot).
- Die Komponenten enthalten weder `useEffect` noch `setInterval`.
- Der Counter funktioniert mit `useCounter`.
