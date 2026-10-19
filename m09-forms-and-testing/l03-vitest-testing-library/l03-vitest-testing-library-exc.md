# Lab 9.3 – Übung: Tests mit Vitest und Testing Library

**Dauer:** ca. 30 Minuten
**Arbeitsdatei:** `src/playground/m09-l03-calculator.test.ts` und `src/playground/m09-l03-counter.test.tsx`
**Starter:** `src/starters/m09-l03-calculator.ts`, `m09-l03-calculator.test.ts`, `m09-l03-counter.tsx`, `m09-l03-counter.test.tsx`

## Vorbereitung

- Kopiere die vier Starter-Dateien unter gleichem Namen nach `src/playground/`.
- Führe im Ordner `project/` `npx vitest run src/playground` aus.
- Die Ausgabe zeigt 3 bestandene Tests und 2 offene (`todo`).

## Aufgaben

**Teil a: Calculator**

1. Öffne `m09-l03-calculator.test.ts` und ersetze `it.todo("resets to 0")` durch einen Test für `reset()`: Wert addieren, zurücksetzen, Rückgabewert und `ans()` prüfen.
2. Ergänze einen Test für `sub`: Ein Rechner ohne vorherige Aktion ergibt nach `sub(3)` den Wert -3.
3. Führe `npx vitest run src/playground` aus; alle Calculator-Tests laufen grün.

**Teil b: Counter**

4. Öffne `m09-l03-counter.test.tsx` und ersetze `it.todo("increments on click on +")` durch einen Test: Klick auf „+“ (über `getByRole`) zeigt 101 im Element mit `data-testid="countValue"`.
5. Ergänze einen Test für „–“ (Ergebnis 99).
6. Ergänze einen Test für „Reset“: zweimal „+“, dann „Reset“, Ergebnis 100.
7. Ändere testweise im Counter `setCount(count + 1)` zu `setCount(count + 2)`, führe die Tests aus und lies die Fehlermeldung. Mache die Änderung rückgängig.
8. Starte `npx vitest` (Watch-Modus), ändere den Startwert des Counters und beobachte, wie die Tests sofort neu laufen. Stelle den Startwert wieder her und beende den Watch-Modus mit `q`.

## Checkpoint

- Nach Teil a: `npx vitest run src/playground/m09-l03-calculator.test.ts` meldet 4 bestandene Tests.
- Nach Teil b: `npx vitest run src/playground` meldet 8 bestandene Tests und keine offenen.
- Der Fehler aus Aufgabe 7 nennt erwarteten und erhaltenen Wert (`101` gegen `102`).

## Abschlusskriterien

- Mindestens vier Tests sind grün, darunter ein Calculator-Test für `reset` und ein Counter-Test für „+“.
- Der Counter wird über `getByRole` und `getByTestId` angesprochen, Klicks über `fireEvent`.
- Kein `it.todo` bleibt übrig; die Testdateien enden auf `.test.ts` bzw. `.test.tsx`.
