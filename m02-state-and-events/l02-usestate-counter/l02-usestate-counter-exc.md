# Lab 2.2 – Übung: Counter mit useState

**Dauer:** ca. 20 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m02-l02-counter.tsx`

## Vorbereitung

- Dev-Server läuft, `/playground` ist im Browser geöffnet, die Konsole ist sichtbar.

## Aufgaben

1. Kopiere den Inhalt von `src/starters/m02-l02-counter.tsx` nach `src/playground/App.tsx` und speichere.
2. Importiere `useState` aus `"react"`, ersetze `let count = 100;` durch einen State mit dem Startwert `100` und ändere beide Handler so, dass sie den Setter verwenden.
3. Klicke dreimal auf „+“ und beobachte Anzeige und Konsole. Notiere, welche Werte `UP` zeigt und wann `RENDERING` erscheint.
4. Entferne die erste Zeile der Datei (`eslint-disable …`) und führe `npx eslint src/playground/App.tsx` aus. Die Ausgabe soll leer sein.
5. Ergänze einen Button „Reset“, der den Zähler auf den Startwert zurücksetzt.
6. Sorge dafür, dass „–“ den Zähler nie unter 0 sinken lässt.
7. Öffne in den React Developer Tools den Tab „Components“, wähle `App` und ändere den State-Wert direkt auf eine beliebige Zahl.
8. Ersetze testweise in `handleCountUp` den Setter-Aufruf durch `count = count + 1;`, klicke auf „+“ und notiere die Meldung der Konsole. Mache die Änderung rückgängig.

## Checkpoint

- Die Zahl ändert sich bei „+“, „–“ und „Reset“ sofort.
- `UP` zeigt den Wert vor dem Klick, direkt danach folgt `RENDERING`.
- Die Zahl sinkt nie unter 0.
- Der Linter meldet keine Fehler.
- Der State-Eintrag in den Developer Tools folgt den Klicks, und eine Änderung dort ändert die Zahl auf der Seite.

## Abschlusskriterien

- Counter mit „+“, „–“ und „Reset“ läuft im Playground.
- Es gibt genau eine State-Variable für den Zählerstand und keine Zuweisung an `count`.

## Erweiterung (optional)

Ergänze ein Zahlenfeld für die Schrittweite (Startwert 1) als zweiten State. „+“ und „–“ ändern den Zähler um diese Schrittweite; die Untergrenze 0 bleibt bestehen.

## Fallback

Ohne React Developer Tools entfällt Aufgabe 7; die Anzeige auf der Seite und das Log zeigen den State ebenfalls.
