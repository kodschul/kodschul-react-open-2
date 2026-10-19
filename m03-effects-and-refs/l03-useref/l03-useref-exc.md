# Lab 3.3 – Übung: useRef – Werte merken ohne Re-Render

**Dauer:** ca. 20 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m03-l03-input-and-counter.tsx`

## Vorbereitung

- `npm run dev` läuft in `output/project/`, die Browser-Konsole ist geöffnet.
- Kopiere `src/starters/m03-l03-input-and-counter.tsx` nach `src/playground/App.tsx`. Der Starter enthält die Input-App und den Counter als Layout ohne Logik.

## Aufgaben

1. Verbinde das Eingabefeld mit State, wie in Lab 2.3: `value`, `onChange`, dazu eine Zeile „Eingabe: …“ und ein Button „Clear“, der das Feld leert.
2. Lege einen Ref `inputRef` an (Typ `HTMLInputElement`, Startwert `null`) und hänge ihn an das `<input>`.
3. Fokussiere das Eingabefeld beim Start automatisch. Lade die Seite neu: Der Cursor steht ohne Klick im Feld.
4. Verbinde den Counter mit State und den Buttons „+“ und „–“.
5. Lege einen zweiten Ref `clickCountRef` mit Startwert `0` an. Erhöhe ihn in den Klick-Handlern beider Buttons und logge die Zahl dort in die Konsole.
6. Füge den Button „Nur zählen“ hinzu, der ausschließlich den Ref erhöht und loggt. Ergänze `console.log("Render")` im Komponentenkörper und prüfe, bei welchen Klicks „Render“ erscheint.
7. Verschiebe das Klick-Log probehalber in den Komponentenkörper und beachte die Meldung des Linters (`npm run lint` oder Editor-Hinweis). Stelle danach die Variante im Handler wieder her.

## Checkpoint

- Nach dem Laden steht der Cursor im Eingabefeld.
- Die Konsole zählt bei jedem Klick auf „+“, „–“ und „Nur zählen“ hoch („Klicks insgesamt: 1, 2, 3, …“).
- „Nur zählen“ erzeugt kein „Render“, „+“ und „–“ schon.
- Der Linter meldet den Zugriff auf `ref.current` im Render.

## Abschlusskriterien

- Autofokus funktioniert über `inputRef` und einen Effekt, ohne `document.getElementById`.
- Der Klickzähler ist ein Ref und wird nur in Event-Handlern gelesen und geschrieben.
- Im Komponentenkörper steht kein Zugriff auf `ref.current`.
