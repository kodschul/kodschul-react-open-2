# Lab 3.4 – Übung: Countdown-Timer bauen

**Dauer:** ca. 20 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m03-l04-countdown.tsx`

## Vorbereitung

- `npm run dev` läuft in `output/project/`, die Browser-Konsole ist geöffnet.
- Kopiere `src/starters/m03-l04-countdown.tsx` nach `src/playground/App.tsx`. Der Starter zeigt Layout, Zahleneingabe und die Buttons „Start“ und „Stop“ ohne Logik.

## Aufgaben

1. Lege drei States an: `inputSecs` (Startwert 10), `secsLeft` (Startwert 10) und `isRunning` (Startwert `false`).
2. Verbinde das Zahlenfeld mit `inputSecs` über `value` und `onChange` (`e.target.valueAsNumber`). Zeige `secsLeft` groß an.
3. Der Button „Start“ setzt `secsLeft` auf den Eingabewert und `isRunning` auf `true`. Der Button „Stop“ setzt `isRunning` auf `false`.
4. Berechne `isTicking` als abgeleiteten Wert aus `isRunning` und `secsLeft` (Intervall nur, solange Zeit übrig ist).
5. Schreibe einen Effekt, der bei `isTicking` ein Intervall startet, `secsLeft` jede Sekunde per funktionalem Update um 1 senkt und per Cleanup aufräumt. Logge zum Prüfen „Tick“ im Intervall.
6. Färbe den Hintergrund rot, sobald `secsLeft` 0 ist. Berechne den Wert direkt im Render, ohne weiteren State und ohne weiteren Effekt.
7. Teste mit 3 Sekunden: Der Countdown erreicht 0, der Hintergrund wird rot, die Konsole zeigt danach keine Ticks mehr. Teste „Stop“ mitten im Lauf.
8. Ersetze das funktionale Update probehalber durch `setSecsLeft(secsLeft - 1)` und beobachte die Anzeige. Stelle danach das funktionale Update wieder her.

## Checkpoint

- „Start“ mit 3 zeigt nacheinander 3, 2, 1, 0.
- Bei 0 ist der Hintergrund rot und der Zähler wird nicht negativ.
- Nach 0 erscheint kein „Tick“ mehr in der Konsole.
- „Stop“ hält den Zähler an, die Konsole bleibt still.
- Mit `setSecsLeft(secsLeft - 1)` bleibt die Anzeige nach dem ersten Tick stehen.

## Abschlusskriterien

- Genau ein Effekt steuert das Intervall, sein Dependency-Array enthält `isTicking`.
- Hintergrundfarbe und „läuft“-Zustand sind berechnete Werte, kein zusätzlicher State.
- `npm run lint` meldet für die Datei keine Fehler.

## Erweiterung

Optional: Ergänze einen Button „Fortsetzen“, der den Countdown nach „Stop“ beim aktuellen Wert weiterlaufen lässt, ohne `secsLeft` zurückzusetzen. Der Button ist deaktiviert, solange der Countdown läuft.
