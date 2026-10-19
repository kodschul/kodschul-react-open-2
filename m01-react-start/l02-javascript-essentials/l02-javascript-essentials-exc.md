# Lab 1.2 – Übung: Einkaufsliste mit Spread, filter und map

**Dauer:** ca. 15 Minuten
**Arbeitsdatei:** `src/playground/shopping-list.js` (Node-Skript, keine Browser-Ansicht)
**Starter:** `src/starters/m01-l02-shopping-list.js`

## Vorbereitung

- Terminal im Ordner `project/` geöffnet (Dev-Server wird nicht benötigt).
- Referenzskript `src/examples/m01-react-start/l02-javascript-essentials/essentials.js` liegt im Repo.

## Aufgaben

1. Führe `node src/examples/m01-react-start/l02-javascript-essentials/essentials.js` aus und vergleiche die Ausgabe Zeile für Zeile mit den Kommentaren in der Datei.
2. Kopiere `src/starters/m01-l02-shopping-list.js` nach `src/playground/shopping-list.js` und führe sie mit `node src/playground/shopping-list.js` aus.
3. Bilde in `shopping-list.js` ein neues Array `withTea`, das „Tee“ vor den bisherigen Einträgen enthält (Spread), und gib es aus.
4. Bilde aus `withTea` ein neues Array `withoutBread` ohne „Brot“ (`filter`) und gib es aus.
5. Bilde aus `withoutBread` ein neues Array `shouting` mit allen Einträgen in Großbuchstaben (`map`) und gib es aus.
6. Gib am Ende die Originalliste `shoppingList` aus und prüfe, dass sie unverändert ist.
7. Weise in einer Testzeile `shoppingList = []` zu, führe das Skript aus, notiere die Fehlermeldung und entferne die Zeile wieder.

## Checkpoint

- Das Skript gibt vier Listen aus (Original, mit Tee, ohne Brot, in Großbuchstaben) plus die unveränderte Originalliste.
- Die Originalliste enthält am Ende weiterhin genau „Milch“, „Brot“, „Äpfel“.
- Aufgabe 7 endet mit einem `TypeError` zur Zuweisung an eine Konstante.

## Abschlusskriterien

- `node src/playground/shopping-list.js` läuft ohne Fehler durch.
- Jeder Schritt erzeugt ein neues Array; kein `push`, `splice` oder `sort` auf `shoppingList`.

## Erweiterung (optional)

Lege eine zweite Liste `detailedList` an, deren Einträge Objekte mit `name` und `amount` sind. Erzeuge per `map` Textzeilen der Form „2x Milch“ und entpacke `name` und `amount` direkt im Parameter der Funktion (Objekt-Destructuring).
