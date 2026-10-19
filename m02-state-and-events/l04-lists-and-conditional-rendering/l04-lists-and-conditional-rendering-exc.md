# Lab 2.4 – Übung: Todo-App

**Dauer:** ca. 20 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m02-l04-todo-app.tsx`

## Vorbereitung

- Dev-Server läuft, `/playground` ist im Browser geöffnet, die Konsole ist sichtbar.
- Einzel- oder Paararbeit.

## Aufgaben

1. Kopiere den Inhalt von `src/starters/m02-l04-todo-app.tsx` nach `src/playground/App.tsx` und speichere. Der Playground zeigt eine feste Liste mit drei Einträgen.
2. Lege zwei State-Variablen an: die Liste der Todos (Startwert `initialTodos`) und den Text des Eingabefelds. Rendere die Liste aus dem State statt aus `initialTodos`.
3. Ergänze über der Liste ein Eingabefeld als Controlled Input.
4. Ergänze `onKeyDown`: Enter fügt den Text als neuen Eintrag oben in die Liste ein und leert das Feld. Verwende kein `push`.
5. Mache jeden Eintrag klickbar, sodass ein Klick genau diesen Eintrag entfernt. Übergib den Eintrag an den Handler.
6. Zeige „Alles erledigt“ an, solange die Liste leer ist.
7. Ersetze testweise die Zeile aus Aufgabe 4 durch `todos.push(todoText)` mit anschließendem `setTodos(todos)`, füge einen Eintrag hinzu und notiere das Ergebnis. Stelle die Lösung aus Aufgabe 4 wieder her.
8. Entferne testweise das Attribut `key` aus dem Listenelement und notiere die Konsolenmeldung. Füge den `key` wieder ein. Füge außerdem zweimal denselben Text hinzu und notiere die Konsolenmeldung.

## Checkpoint

- Enter fügt „neu“ ganz oben ein, das Feld ist danach leer.
- Ein Klick entfernt genau den angeklickten Eintrag.
- Bei leerer Liste erscheint „Alles erledigt“, mit dem ersten neuen Eintrag verschwindet die Meldung.
- Nach Aufgabe 7 bleibt die Liste unverändert.
- Nach Aufgabe 8 meldet die Konsole die fehlenden beziehungsweise doppelten `key`-Werte.

## Abschlusskriterien

- Todo-App mit Hinzufügen, Entfernen und Meldung läuft ohne Konsolenfehler.
- Jede Änderung der Liste erzeugt ein neues Array (kein `push`, kein `splice`).

## Erweiterung (optional)

Ignoriere leere Eingaben und Eingaben, die nur aus Leerzeichen bestehen: Enter fügt dann nichts hinzu.
