# Lab 2.3 – Übung: Input App mit Controlled Input

**Dauer:** ca. 15 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m02-l03-input-app.tsx`

## Vorbereitung

- Dev-Server läuft, `/playground` ist im Browser geöffnet.

## Aufgaben

1. Kopiere den Inhalt von `src/starters/m02-l03-input-app.tsx` nach `src/playground/App.tsx` und speichere.
2. Lege einen State `inputValue` mit leerem Text als Startwert an (Import von `useState` nicht vergessen).
3. Ergänze unter der Überschrift ein Textfeld, dessen Wert aus `inputValue` kommt, ohne `onChange`. Tippe in das Feld und notiere Verhalten und Konsolenmeldung.
4. Ergänze `onChange`, sodass jede Eingabe im State landet.
5. Zeige unter dem Feld den Text „Eingegebener Text: …“ mit dem aktuellen Wert an.
6. Ergänze einen Button „Clear“, der das Feld leert, ohne das DOM direkt anzusprechen.
7. Öffne die React Developer Tools, wähle `App` und beobachte den State, während getippt wird.

## Checkpoint

- Nach Aufgabe 3 lässt sich nichts eintippen, und die Konsole warnt vor einem Feld mit `value` ohne `onChange`.
- Nach Aufgabe 4 und 5 erscheint jede Eingabe sofort unter dem Feld.
- „Clear“ leert Feld und Anzeige gleichzeitig.
- Der State in den Developer Tools entspricht dem Text im Feld.

## Abschlusskriterien

- Die Input App funktioniert, ohne `document.getElementById` oder Refs.
- Der Text im Feld und der angezeigte Text stammen aus demselben State.

## Fallback

Ohne React Developer Tools entfällt Aufgabe 7; die angezeigte Zeile unter dem Feld belegt den State.
